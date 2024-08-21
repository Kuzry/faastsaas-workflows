import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function upsertSubscription(
  supabase: SupabaseClient<Database>,
  data: Database["public"]["Tables"]["subscriptions"]["Row"]
) {
  const response = await supabase
    .from("subscriptions")
    .upsert(data, { onConflict: "external_id" })
    .select()
    .maybeSingle();

  if (response.error) {
    throw Error(response.error.message);
  }

  return response.data;
}
