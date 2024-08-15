import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function selectUserByEMail(
  supabase: SupabaseClient<Database>,
  eMail: string
) {
  const response = await supabase
    .from("users")
    .select()
    .eq("email", eMail)
    .maybeSingle();

  if (response.error) {
    throw Error(response.error.message);
  }

  return response.data;
}
