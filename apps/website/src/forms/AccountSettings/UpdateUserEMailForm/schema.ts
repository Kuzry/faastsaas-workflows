import { z } from "zod";
import { useTranslations } from "next-intl";

export const getUpdateUserEMailFormSchema = (
  t: ReturnType<typeof useTranslations<"update_user_e_mail_form">>
) =>
  z.object({
    e_mail: z
      .string()
      .email({ message: t("fields.e_mail.messages.invalid_string") }),
  });

export type TUpdateUserEMailFormSchema = z.infer<
  ReturnType<typeof getUpdateUserEMailFormSchema>
>;
