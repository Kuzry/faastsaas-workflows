import { createSupabaseServerClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import { UpdateUserPasswordFormClient } from "@/forms/AccountSettings/UpdateUserPasswordForm/UpdateUserPasswordForm.client";

export function UpdateUserPasswordForm() {
  return (
    <Suspense fallback={<UpdateUserPasswordFormClient skeleton={true} />}>
      <UpdateUserPasswordFormServerAsync />
    </Suspense>
  );
}

export async function UpdateUserPasswordFormServerAsync() {
  const supabase = createSupabaseServerClient();

  await supabase.auth.getUser();

  return <UpdateUserPasswordFormClient skeleton={false} />;
}
