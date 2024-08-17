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

export const dynamic = "force-dynamic";

// export const { POST } = createRouteHandlersForAction(
//   createServerAction()
//     .input(
//       z.object({
//         meta: z.object({
//           event_name: z.string(),
//           custom_data: z
//             .object({
//               user_email: z.string(),
//             })
//             .optional(),
//         }),
//         data: z.object({
//           id: z.string(),
//           attributes: z.object({
//             variant_id: z.number(),
//             first_subscription_item: z.object({
//               id: z.number(),
//               price_id: z.number(),
//               is_usage_based: z.boolean().optional(),
//             }),
//             user_email: z.string(),
//             user_name: z.string(),
//             order_id: z.number(),
//             customer_id: z.number(),
//             status: z.string(),
//             pause: z.object({}).nullish(),
//             renews_at: z.string(),
//             ends_at: z.string().nullish(),
//             trial_ends_at: z.string().nullish(),
//           }),
//         }),
//       })
//     )
//     .handler(async ({ input, request }) => {
// if (!request) {
//   throw Error("There is no request object");
// }
//
// console.log("input=====");
// console.log(request.clone());
// console.log(JSON.stringify(input));
// console.log(
//   checkLemonSqueezySignature(
//     JSON.stringify(input),
//     request.headers.get("X-Signature") ?? ""
//   )
// );

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

  configLemonSqueezy();

  const supabase = createSupabaseServerClient(true);

  const webhook = await insertWebhookLemonSqueezy(supabase, {
    event_name: jsonBody.meta.event_name,
    body: jsonBody,
    processed: false,
  });

  if (!webhook) {
    throw Error("The request cannot be processed");
  }

  try {
    if (webhook?.event_name.startsWith("subscription_payment_")) {
      // Testing
    } else if (webhook?.event_name.startsWith("subscription_")) {
      const plan = await selectPlanByVariantId(
        supabase,
        jsonBody.data.attributes.variant_id
      );

      if (!plan) {
        throw Error("There is no plan with this variant id");
      }

      const priceData = await getPrice(
        jsonBody.data.attributes.first_subscription_item.price_id
      );

      if (priceData.error) {
        throw Error("Failed to get the price data for the subscription.");
      }

      const price = jsonBody.data.attributes.first_subscription_item
        .is_usage_based
        ? priceData.data?.data.attributes.unit_price_decimal
        : priceData.data?.data.attributes.unit_price.toString();

      const user = await selectUserByEMail(
        supabase,
        jsonBody.meta.custom_data?.user_email
          ? jsonBody.meta.custom_data?.user_email
          : jsonBody.data.attributes.user_email
      );

      const userId = user
        ? user.user_id
        : (
            await inviteUser(
              supabase,
              jsonBody.data.attributes.user_email,
              jsonBody.data.attributes.user_name,
              `${new URL(request.url).origin}${authLinks.sign_up_confirm}`
            )
          ).id;

      await upsertSubscription(supabase, {
        user_id: userId,
        plan_id: plan.id,
        external_id: jsonBody.data.id,
        order_id: jsonBody.data.attributes.order_id.toString(),
        customer_id: jsonBody.data.attributes.customer_id.toString(),
        customer_name: jsonBody.data.attributes.user_name,
        customer_email: jsonBody.data.attributes.user_email,
        status: jsonBody.data.attributes.status,
        price: price ?? "",
        item_id: jsonBody.data.attributes.first_subscription_item.id.toString(),
        is_usage_based:
          jsonBody.data.attributes.first_subscription_item.is_usage_based,
        is_paused: jsonBody.data.attributes.pause !== null,
        renews_at: jsonBody.data.attributes.renews_at,
        ends_at: jsonBody.data.attributes.ends_at,
        trial_ends_at: jsonBody.data.attributes.trial_ends_at,
      });
    }

    await updateWebhookLemonSqueezy(supabase, {
      id: webhook.id,
      processed: true,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    await updateWebhookLemonSqueezy(supabase, {
      id: webhook.id,
      error: (error as Error).message,
    });
  }

  return NextResponse.json({ success: false }, { status: 500 });
}
