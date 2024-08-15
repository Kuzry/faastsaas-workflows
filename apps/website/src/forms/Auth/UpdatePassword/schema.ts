import { z } from "zod";
import { useTranslations } from "next-intl";

export const getUpdatePasswordFormSchema = (
  t: ReturnType<typeof useTranslations<"update_password_form">>
) =>
  z.object({
    password: z
      .string()
      .min(8, { message: t("fields.password.messages.too_small") }),
  });

export type TUpdatePasswordFormSchema = z.infer<
  ReturnType<typeof getUpdatePasswordFormSchema>
>;
