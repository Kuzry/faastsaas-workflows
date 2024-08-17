import { createSupabaseServerClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import { UpdateUserNameFormClient } from "@/forms/AccountSettings/UpdateUserNameForm/UpdateUserNameForm.client";

export function UpdateUserNameForm() {
  return (
    <Suspense fallback={<UpdateUserNameFormClient />}>
      <UpdateUserNameFormServerAsync />
    </Suspense>
  );
}

export async function UpdateUserNameFormServerAsync() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <UpdateUserNameFormClient name={user?.user_metadata.name} />;
}
