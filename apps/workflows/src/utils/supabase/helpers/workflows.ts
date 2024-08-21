import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function selectAllWorkflowsOrderByCreatedAt(
  supabase: SupabaseClient<Database>
) {
  const response = await supabase
    .from("workflows")
    .select()
    .order("created_at");

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function insertWorkflow(
  supabase: SupabaseClient<Database>,
  data: Database["public"]["Tables"]["workflows"]["Insert"]
) {
  const response = await supabase
    .from("workflows")
    .insert(data)
    .select()
    .maybeSingle();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function deleteWorkflowById(
  supabase: SupabaseClient<Database>,
  id: Database["public"]["Tables"]["workflows"]["Row"]["id"]
) {
  const response = await supabase
    .from("workflows")
    .delete()
    .eq("id", id)
    .maybeSingle();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function selectWorkflowById(
  supabase: SupabaseClient<Database>,
  id: Database["public"]["Tables"]["workflows"]["Row"]["id"]
) {
  const response = await supabase
    .from("workflows")
    .select()
    .eq("id", id)
    .maybeSingle();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}
