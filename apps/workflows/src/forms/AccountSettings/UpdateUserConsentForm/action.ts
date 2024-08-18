"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createServerAction } from "zsa";
import { getUpdateUserConsentFormSchema } from "@/forms/AccountSettings/UpdateUserConsentForm/schema";

export const updateUserConsentFormAction = createServerAction()
  .input(async () => getUpdateUserConsentFormSchema())
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const updateConsentResponse = await supabase.auth.updateUser({
      data: {
        consent: input.consent,
      },
    });

    if (updateConsentResponse.error) {
      throw Error(updateConsentResponse.error.message);
    }
  });
