"use server";

import { configLemonSqueezy } from "@/utils/lemonsueezy/config";
import { getSubscription } from "@lemonsqueezy/lemonsqueezy.js";

export async function getSubscriptionUrls(id: string) {
  configLemonSqueezy();

  const subscriptionResponse = await getSubscription(id);

  if (subscriptionResponse.error) {
    throw Error(subscriptionResponse.error.message);
  }

  return subscriptionResponse.data?.data.attributes.urls;
}
