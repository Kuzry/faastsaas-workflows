"use client";

import { Paper, PaperMain, Link } from "@/components";
import { Button } from "@mantine/core";
import { Tables } from "@/types/supabase";
import { useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";
import { LemonSqueezyOverlayButtonClient } from "@/components/LemonSqueezy/LemonSqueezyOverlayButton/LemonSqueezyOverlayButton.client";
import { User } from "@supabase/auth-js";

export function SubscriptionInfoPaperClient({
  activeSubscription,
  activeSubscriptionUrls,
  plans,
  user,
}: {
  activeSubscription: Tables<"subscriptions"> | null;
  activeSubscriptionUrls: Record<string, string> | null;
  plans: Tables<"plans">[] | null;
  user: User | null;
}) {
  const t = useTranslations("billing_page");

  const plan = plans?.find((plan) => plan.id === activeSubscription?.plan_id);

  return (
    <Paper>
      <PaperMain>
        <div className="flex flex-col gap-4">
          {activeSubscription === null ? (
            <div className="flex flex-col gap-4">
              <div className="font-bold">{t("no_subscription")}</div>
              <LemonSqueezyOverlayButtonClient
                userName={user?.user_metadata.name}
                userEMail={user?.email}
              >
                {t("buy_button")}
              </LemonSqueezyOverlayButtonClient>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span>
                  {t("your_plan_is")}:{" "}
                  <span className="font-bold">{plan?.variant_name}</span>
                </span>
                <span className="text-sm">
                  {t("next_renews")}:{" "}
                  <span className="font-bold">
                    {format(
                      parseISO(activeSubscription.renews_at),
                      "MMM dd, yyyy"
                    )}
                  </span>
                </span>
              </div>
              <Button
                component={Link}
                href={activeSubscriptionUrls?.customer_portal ?? ""}
                className="text-white"
                target="_blank"
              >
                {t("manage_subscription")}
              </Button>
            </div>
          )}
        </div>
      </PaperMain>
    </Paper>
  );
}
