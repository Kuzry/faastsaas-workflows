import { z } from "zod";
import { useTranslations } from "next-intl";

export const getSignUpFormSchema = (
  t: ReturnType<typeof useTranslations<"sign_up_form">>
) =>
  z.object({
    name: z.string().min(1, { message: t("fields.name.messages.too_small") }),
    e_mail: z
      .string()
      .email({ message: t("fields.e_mail.messages.invalid_string") }),
    password: z
      .string()
      .min(8, { message: t("fields.password.messages.too_small") }),
  });

export type TSignUpFormSchema = z.infer<ReturnType<typeof getSignUpFormSchema>>;
