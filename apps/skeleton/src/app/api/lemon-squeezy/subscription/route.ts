import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { authLinks } from "@/utils/auth";
import { getPrice } from "@lemonsqueezy/lemonsqueezy.js";
import { checkLemonSqueezySignature } from "@/utils/lemonsueezy/helpers";
import { configLemonSqueezy } from "@/utils/lemonsueezy/config";
import {
  insertWebhookLemonSqueezy,
  updateWebhookLemonSqueezy,
} from "@/utils/supabase/helpers/webhooks-lemon-squeezy";
import { selectPlanByVariantId } from "@/utils/supabase/helpers/plans";
import { upsertSubscription } from "@/utils/supabase/helpers/subscriptions";
import { selectUserByEMail } from "@/utils/supabase/helpers/users";
import { inviteUser } from "@/utils/auth/helpers";
import { createServerAction } from "zsa";
import { z } from "zod";

export const dynamic = "force-dynamic";

const action = createServerAction()
  .input(
    z.object({
      request: z.object({
        url: z.string(),
      }),
      meta: z.object({
        event_name: z.string(),
        custom_data: z
          .object({
            user_email: z.string(),
          })
          .optional(),
      }),
      data: z.object({
        id: z.string(),
        attributes: z.object({
          variant_id: z.number(),
          first_subscription_item: z.object({
            id: z.number(),
            price_id: z.number(),
            is_usage_based: z.boolean().optional(),
          }),
          user_email: z.string(),
          user_name: z.string(),
          order_id: z.number(),
          customer_id: z.number(),
          status: z.string(),
          pause: z.object({}).nullish(),
          renews_at: z.string(),
          ends_at: z.string().nullish(),
          trial_ends_at: z.string().nullish(),
        }),
      }),
    })
  )
  .handler(async ({ input }) => {
    configLemonSqueezy();

    const supabase = createSupabaseServerClient(true);

    const webhook = await insertWebhookLemonSqueezy(supabase, {
      event_name: input.meta.event_name,
      body: input,
      processed: false,
    });

    if (!webhook) {
      throw Error("The request cannot be processed");
    }

    try {
      // throw Error("para");
      if (webhook?.event_name.startsWith("subscription_payment_")) {
        // Testing
      } else if (webhook?.event_name.startsWith("subscription_")) {
        const plan = await selectPlanByVariantId(
          supabase,
          input.data.attributes.variant_id
        );

        if (!plan) {
          throw Error("There is no plan with this variant id");
        }

        const priceData = await getPrice(
          input.data.attributes.first_subscription_item.price_id
        );

        if (priceData.error) {
          throw Error("Failed to get the price data for the subscription.");
        }

        const price = input.data.attributes.first_subscription_item
          .is_usage_based
          ? priceData.data?.data.attributes.unit_price_decimal
          : priceData.data?.data.attributes.unit_price.toString();

        const user = await selectUserByEMail(
          supabase,
          input.meta.custom_data?.user_email
            ? input.meta.custom_data?.user_email
            : input.data.attributes.user_email
        );

        const userId = user
          ? user.user_id
          : (
              await inviteUser(
                supabase,
                input.data.attributes.user_email,
                input.data.attributes.user_name,
                `${new URL(input.request.url).origin}${authLinks.sign_up_confirm}`
              )
            ).id;

        await upsertSubscription(supabase, {
          user_id: userId,
          plan_id: plan.id,
          external_id: input.data.id,
          order_id: input.data.attributes.order_id.toString(),
          customer_id: input.data.attributes.customer_id.toString(),
          customer_name: input.data.attributes.user_name,
          customer_email: input.data.attributes.user_email,
          status: input.data.attributes.status,
          price: price ?? "",
          item_id: input.data.attributes.first_subscription_item.id.toString(),
          is_usage_based:
            input.data.attributes.first_subscription_item.is_usage_based,
          is_paused: input.data.attributes.pause !== null,
          renews_at: input.data.attributes.renews_at,
          ends_at: input.data.attributes.ends_at,
          trial_ends_at: input.data.attributes.trial_ends_at,
        });
      }

      await updateWebhookLemonSqueezy(supabase, {
        id: webhook.id,
        processed: true,
      });

      return {};
    } catch (error) {
      const err = error as Error;

      await updateWebhookLemonSqueezy(supabase, {
        id: webhook.id,
        error: err.message,
      });

      throw Error(err.message);
    }
  });

export async function POST(request: NextRequest) {
  const jsonBody = await request.clone().json();

  // If correct then request is from Lemon Squeezy
  if (
    !checkLemonSqueezySignature(
      await request.text(),
      request.headers.get("X-Signature") ?? ""
    )
  ) {
    throw Error("Incorrect signature");
  }

  const [data, error] = await action({
    ...jsonBody,
    request: {
      url: request.url,
    },
  });

  if (error) {
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json(data);
}
