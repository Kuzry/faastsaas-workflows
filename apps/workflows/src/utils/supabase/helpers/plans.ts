import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

/**
 * @param supabase
 * @param variantId
 * @throws {Error}
 */
export async function selectPlanByVariantId(
  supabase: SupabaseClient<Database>,
  variantId: number
) {
  const response = await supabase
    .from("plans")
    .select()
    .eq("variant_id", variantId)
    .maybeSingle();

  if (response.error) {
    throw Error(response.error.message);
  }

  return response.data;
}
