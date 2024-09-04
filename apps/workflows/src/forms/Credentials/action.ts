"use server";

import { createServerAction } from "zsa";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  deleteCredentialById,
  insertCredential,
  updateCredential,
} from "@/utils/supabase/helpers/credentials";
import { getTranslations } from "next-intl/server";
import { getUser } from "@/utils/auth/helpers";
import { getAppCredentialFormSchema } from "@/forms/Credentials/AppCredential/schema";

export const selectCredentialByIdAction = createServerAction()
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const credential = await supabase
      .from("credentials")
      .select()
      .eq("id", input.id)
      .maybeSingle();

    revalidatePath("/credentials");

    return credential;
  });

export const deleteCredentialAction = createServerAction()
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    await deleteCredentialById(supabase, input.id);

    revalidatePath("/credentials");
  });

export const upsertClickUpCredentialsAction = createServerAction()
  .input(async () => {
    const t = await getTranslations("app_credential_form");

    return getAppCredentialFormSchema(t);
  })
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const user = await getUser(supabase);

    let credential;

    if (input.id) {
      credential = await updateCredential(supabase, {
        id: input.id,
        name: input.name,
      });
    } else {
      credential = await insertCredential(supabase, {
        user_id: user.id,
        app: input.credential_app_id,
        name: input.name,
        status: {
          name: "not_connected",
        },
      });
    }

    revalidatePath("/credentials");

    return {
      data: credential,
    };
  });
