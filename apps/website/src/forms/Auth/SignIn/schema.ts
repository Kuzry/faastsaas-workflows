import { z } from "zod";
import { useTranslations } from "next-intl";

export const getSignInWithPasswordFormSchema = (
  t: ReturnType<typeof useTranslations<"sign_in_form">>
) =>
  z.object({
    e_mail: z
      .string()
      .email({ message: t("fields.e_mail.messages.invalid_string") }),
    password: z
      .string()
      .min(1, { message: t("fields.password.messages.too_small") }),
  });

export type TSignInWithPasswordFormSchema = z.infer<
  ReturnType<typeof getSignInWithPasswordFormSchema>
>;

export const getSignInWithMagicLinkFormSchema = (
  t: ReturnType<typeof useTranslations<"sign_in_form">>
) =>
  z.object({
    e_mail: z
      .string()
      .email({ message: t("fields.e_mail.messages.invalid_string") }),
    password: z.string(),
  });

export type TSignInWithMagicLinkFormSchema = z.infer<
  ReturnType<typeof getSignInWithMagicLinkFormSchema>
>;
