import { z } from "zod";
import { useTranslations } from "next-intl";
import { getCredentials } from "@/utils/credentials";

export const getAddCredentialFormSchema = (
  t: ReturnType<typeof useTranslations<"add_credential_form">>
) =>
  z.object({
    app: z
      .string()
      .refine((value) => getCredentials().some((app) => app.id === value), {
        message: t("fields.app.messages.custom"),
      }),
  });

export type TAddCredentialFormSchema = z.infer<
  ReturnType<typeof getAddCredentialFormSchema>
>;
