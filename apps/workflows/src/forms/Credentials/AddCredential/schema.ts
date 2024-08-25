import { z } from "zod";
import { useTranslations } from "next-intl";
import { getApps } from "@/utils/apps";

export const getAddCredentialFormSchema = (
  t: ReturnType<typeof useTranslations<"add_credential_form">>,
  t2: ReturnType<typeof useTranslations<"app_credential_form">>
) =>
  z.object({
    app: z
      .string()
      .refine((value) => getApps(t2).some((app) => app.id === value), {
        message: t("fields.app.messages.custom"),
      }),
  });

export type TAddCredentialFormSchema = z.infer<
  ReturnType<typeof getAddCredentialFormSchema>
>;
