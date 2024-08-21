import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function deleteCredentialById(
  supabase: SupabaseClient<Database>,
  id: Database["public"]["Tables"]["credentials"]["Row"]["id"]
) {
  const response = await supabase
    .from("credentials")
    .delete()
    .eq("id", id)
    .maybeSingle();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function selectCredentialById(
  supabase: SupabaseClient<Database>,
  id: Database["public"]["Tables"]["credentials"]["Row"]["id"]
) {
  const response = await supabase
    .from("credentials")
    .select()
    .eq("id", id)
    .maybeSingle();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function selectAllCredentialsOrderByCreatedAt(
  supabase: SupabaseClient<Database>
) {
  const response = await supabase
    .from("credentials")
    .select()
    .order("created_at");

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}
