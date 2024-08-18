"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createServerAction } from "zsa";
import { getUpdatePasswordFormSchema } from "@/forms/Auth/UpdatePassword/schema";
import { getTranslations } from "next-intl/server";

export const updatePasswordFormAction = createServerAction()
  .input(async () =>
    getUpdatePasswordFormSchema(await getTranslations("update_password_form"))
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const updatePasswordResponse = await supabase.auth.updateUser({
      password: input.password,
    });

    if (updatePasswordResponse.error) {
      throw Error(updatePasswordResponse.error.message);
    }
  });
