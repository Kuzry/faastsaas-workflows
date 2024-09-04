import { z } from "zod";
import { useTranslations } from "next-intl";
import { getCredentials } from "@/utils/credentials";

export const getAddCredentialFormSchema = (
  t: ReturnType<typeof useTranslations<"add_credential_form">>
) =>
  z.object({
    credential_app_id: z
      .string()
      .refine((value) => getCredentials().some((app) => app.id === value), {
        message: t("fields.credential_app_id.messages.custom"),
      }),
  });

export type TAddCredentialFormSchema = z.infer<
  ReturnType<typeof getAddCredentialFormSchema>
>;
