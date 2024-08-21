import { z } from "zod";
import { apps } from "@/utils/apps";
import { useTranslations } from "next-intl";

export const getAddCredentialFormSchema = (
  t: ReturnType<typeof useTranslations<"add_credential_form">>
) =>
  z.object({
    app: z.string().refine((value) => apps.some((app) => app.id === value), {
      message: t("fields.app.messages.custom"),
    }),
  });

export type TAddCredentialFormSchema = z.infer<
  ReturnType<typeof getAddCredentialFormSchema>
>;
