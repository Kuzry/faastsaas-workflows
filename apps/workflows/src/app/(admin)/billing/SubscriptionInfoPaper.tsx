import { SubscriptionInfoPaperClient } from "./SubscriptionInfoPaper.client";
import { Suspense } from "react";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getSubscriptionUrls } from "@/utils/lemonsueezy/actions";
import { DefaultSkeleton } from "@/components";

export function SubscriptionInfoPaper() {
  return (
    <Suspense fallback={<DefaultSkeleton />}>
      <SubscriptionInfoPaperAsync />
    </Suspense>
  );
}

async function SubscriptionInfoPaperAsync() {
  const supabase = createSupabaseServerClient();

  const activeSubscriptionResponse = await supabase
    .from("subscriptions")
    .select()
    .eq("status", "active")
    .maybeSingle();

  const plansResponse = await supabase.from("plans").select();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const subscriptionUrls = activeSubscriptionResponse.data
    ? await getSubscriptionUrls(activeSubscriptionResponse.data?.external_id)
    : {};

  return (
    <SubscriptionInfoPaperClient
      activeSubscription={activeSubscriptionResponse.data}
      activeSubscriptionUrls={subscriptionUrls}
      plans={plansResponse.data}
      user={user}
    />
  );
}
