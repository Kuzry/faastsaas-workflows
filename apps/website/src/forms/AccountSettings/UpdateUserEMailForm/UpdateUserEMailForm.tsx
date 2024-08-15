import { Suspense } from "react";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { UpdateUserEMailFormClient } from "@/forms/AccountSettings/UpdateUserEMailForm/UpdateUserEMailForm.client";

export function UpdateUserEMailForm() {
  return (
    <Suspense fallback={<UpdateUserEMailFormClient />}>
      <UpdateUserEMailFormServerAsync />
    </Suspense>
  );
}

async function UpdateUserEMailFormServerAsync() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <UpdateUserEMailFormClient eMail={user?.email} />;
}
