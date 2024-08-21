"use server";

import { createServerAction } from "zsa";
import { getUpdateUserEMailFormSchema } from "@/forms/AccountSettings/UpdateUserEMailForm/schema";
import { getTranslations } from "next-intl/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const updateUserEMailFormAction = createServerAction()
  .input(async () =>
    getUpdateUserEMailFormSchema(
      await getTranslations("update_user_e_mail_form")
    )
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();
    const updateUserResponse = await supabase.auth.updateUser({
      email: input.e_mail,
    });

    if (updateUserResponse.error) {
      throw Error(updateUserResponse.error.message);
    }
  });