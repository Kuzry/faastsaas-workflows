"use server";

import { createServerAction } from "zsa";
import { getTranslations } from "next-intl/server";
import { getResetPasswordFormSchema } from "@/forms/Auth/ResetPassword/schema";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/auth/helpers";

export const resetPasswordFormAction = createServerAction()
  .input(async () =>
    getResetPasswordFormSchema(await getTranslations("reset_password_form"))
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const resetPasswordResponse = await supabase.auth.resetPasswordForEmail(
      input.e_mail
    );

    if (resetPasswordResponse.error) {
      throw Error(resetPasswordResponse.error.message);
    }
  });
