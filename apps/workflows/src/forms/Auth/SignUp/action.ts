"use server";

import { getSignUpFormSchema } from "@/forms/Auth/SignUp/schema";
import { createServerAction } from "zsa";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const signUpFormAction = createServerAction()
  .input(async () => getSignUpFormSchema(await getTranslations("sign_up_form")))
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const signUpResponse = await supabase.auth.signUp({
      email: input.e_mail,
      password: input.password,
      options: {
        data: {
          name: input.name,
          consent: true,
        },
      },
    });

    if (signUpResponse.error) {
      throw Error(signUpResponse.error.message);
    }

    revalidatePath("/", "layout");
  });
