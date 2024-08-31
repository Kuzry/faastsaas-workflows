import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { formatISO } from "date-fns";

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

export async function insertCredential(
  supabase: SupabaseClient<Database>,
  data: Database["public"]["Tables"]["credentials"]["Insert"]
) {
  const response = await supabase
    .from("credentials")
    .insert(data)
    .select()
    .maybeSingle();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function updateCredential(
  supabase: SupabaseClient<Database>,
  data: Database["public"]["Tables"]["credentials"]["Update"]
) {
  const { id, ...dataWithoutId } = data;

  if (!id) {
    throw new Error("There is no id for credentials table");
  }

  const response = await supabase
    .from("credentials")
    .update({
      ...dataWithoutId,
      updated_at: formatISO(new Date()),
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}
