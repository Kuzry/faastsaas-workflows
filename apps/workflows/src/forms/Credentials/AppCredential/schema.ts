import { z } from "zod";
import { useTranslations } from "next-intl";
import { getCredentials } from "@/utils/credentials";

export const getAppCredentialFormSchema = (
  t: ReturnType<typeof useTranslations<"app_credential_form">>
) =>
  z.object({
    id: z.string().uuid().optional(),
    credential_app_id: z
      .string()
      .refine((value) => getCredentials().some((app) => app.id === value)),
    name: z.string().min(1, { message: t("fields.name.messages.too_small") }),
  });
