import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { User } from "@supabase/auth-js";

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

export async function getUser(
  supabase: SupabaseClient<Database>
): Promise<User>;
export async function getUser(
  supabase: SupabaseClient<Database>,
  throwError?: boolean
): Promise<User | null>;
export async function getUser(
  supabase: SupabaseClient<Database>,
  throwError = true
) {
  const response = await supabase.auth.getUser();

  if (throwError && response.error) {
    throw new Error(response.error.message);
  }

  return response.data.user;
}
