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
import { encryptCredentialData } from "@/utils/credentials-crypto";
import {
  getCredentials,
  getZodObjectFromCredentialFieldsSchema,
} from "@/utils/credentials";

export const selectCredentialByIdAction = createServerAction()
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    await getUser(supabase);

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

    await getUser(supabase);

    await deleteCredentialById(supabase, input.id);

    revalidatePath("/credentials");
  });

export const upsertCredentialAction = createServerAction()
  .input(async () => {
    const t = await getTranslations("app_credential_form"),
      tCredentials = await getTranslations("credentials");

    let allCredentialsSchema = z.object({});

    getCredentials().forEach((credential) => {
      allCredentialsSchema = allCredentialsSchema.merge(
        getZodObjectFromCredentialFieldsSchema(
          credential.getFields(tCredentials)
        )
      );
    });

    // console.log("inputtttt");

    return getAppCredentialFormSchema(t).merge(allCredentialsSchema);
  })
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    // input.asd = "asd";

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
        data: encryptCredentialData(
          JSON.stringify({
            // username: input.username,
            // password: input.password,
            // url: input.url,
          })
        ),
      });
    }

    revalidatePath("/credentials");

    return {
      data: credential,
    };
  });
