import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function inviteUser(
  supabase: SupabaseClient<Database>,
  eMail: string,
  name: string,
  redirectTo: string
) {
  const response = await supabase.auth.admin.inviteUserByEmail(eMail, {
    redirectTo: redirectTo,
    data: {
      name: name,
      consent: true,
    },
  });

  if (response.error) {
    throw Error(response.error.message);
  }

  return response.data.user;
}

export async function getUser(supabase: SupabaseClient<Database>) {
  const response = await supabase.auth.getUser();

  return response.data.user;
}
