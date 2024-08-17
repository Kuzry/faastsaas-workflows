import { z } from "zod";
import { useTranslations } from "next-intl";

export const getResetPasswordFormSchema = (
  t: ReturnType<typeof useTranslations<"reset_password_form">>
) =>
  z.object({
    e_mail: z
      .string()
      .email({ message: t("fields.e_mail.messages.invalid_string") }),
  });

export type TResetPasswordFormSchema = z.infer<
  ReturnType<typeof getResetPasswordFormSchema>
>;
