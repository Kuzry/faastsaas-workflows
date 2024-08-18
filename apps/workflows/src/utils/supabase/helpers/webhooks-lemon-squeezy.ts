import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function insertWebhookLemonSqueezy(
  supabase: SupabaseClient<Database>,
  data: Database["public"]["Tables"]["webhooks_lemon_squeezy"]["Insert"]
) {
  const response = await supabase
    .from("webhooks_lemon_squeezy")
    .insert(data)
    .select()
    .maybeSingle();

  if (response.error) {
    throw Error(response.error.message);
  }

  return response.data;
}

export async function updateWebhookLemonSqueezy(
  supabase: SupabaseClient<Database>,
  data: Database["public"]["Tables"]["webhooks_lemon_squeezy"]["Update"]
) {
  const { id, ...dataWithoutId } = data;

  if (!id) {
    throw new Error("There is no id for webhooks_lemon_squeezy table");
  }

  const response = await supabase
    .from("webhooks_lemon_squeezy")
    .update(dataWithoutId)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (response.error) {
    throw Error(response.error.message);
  }

  return response.data;
}
