"use server";

import {
  getSignInWithMagicLinkFormSchema,
  getSignInWithPasswordFormSchema,
} from "@/forms/Auth/SignIn/schema";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { authLinks } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";
import { getTranslations } from "next-intl/server";

export const signInWithPasswordFormAction = createServerAction()
  .input(async () =>
    getSignInWithPasswordFormSchema(await getTranslations("sign_in_form"))
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const signInResponse = await supabase.auth.signInWithPassword({
      email: input.e_mail,
      password: input.password,
    });

    if (signInResponse.error) {
      throw Error(signInResponse.error.message);
    }

    revalidatePath("/", "layout");

    return {
      data: {
        redirect_to: `${headers().get("origin")}${authLinks.dashboard}`,
      },
    };
  });

export const signInWithMagicLinkFormAction = createServerAction()
  .input(async () =>
    getSignInWithMagicLinkFormSchema(await getTranslations("sign_in_form"))
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const signInResponse = await supabase.auth.signInWithOtp({
      email: input.e_mail,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${headers().get("origin")}${
          authLinks.sign_up_confirm
        }`,
      },
    });

    if (signInResponse.error) {
      throw Error(signInResponse.error.message);
    }

    revalidatePath("/", "layout");
  });
