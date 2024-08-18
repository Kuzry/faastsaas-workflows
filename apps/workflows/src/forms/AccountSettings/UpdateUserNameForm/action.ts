"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createServerAction } from "zsa";
import { getUpdateUserNameFormSchema } from "@/forms/AccountSettings/UpdateUserNameForm/schema";
import { getTranslations } from "next-intl/server";

export const updateUserNameFormAction = createServerAction()
  .input(async () =>
    getUpdateUserNameFormSchema(await getTranslations("update_user_name_form"))
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const updateUserResponse = await supabase.auth.updateUser({
      data: {
        name: input.name,
      },
    });

    if (updateUserResponse.error) {
      throw Error(updateUserResponse.error.message);
    }
  });
