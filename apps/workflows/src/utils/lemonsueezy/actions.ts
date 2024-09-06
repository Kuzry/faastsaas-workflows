"use server";

import { configLemonSqueezy } from "@/utils/lemonsueezy/config";
import { getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { getUser } from "@/utils/auth/helpers";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function getSubscriptionUrls(id: string) {
  const supabase = createSupabaseServerClient();

  await getUser(supabase);

  configLemonSqueezy();

  const subscriptionResponse = await getSubscription(id);

  if (subscriptionResponse.error) {
    throw Error(subscriptionResponse.error.message);
  }

  return subscriptionResponse.data?.data.attributes.urls;
}
