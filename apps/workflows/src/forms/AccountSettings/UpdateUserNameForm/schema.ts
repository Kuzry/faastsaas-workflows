import { z } from "zod";
import { useTranslations } from "next-intl";

export const getUpdateUserNameFormSchema = (
  t: ReturnType<typeof useTranslations<"update_user_name_form">>
) =>
  z.object({
    name: z.string().min(1, { message: t("fields.name.messages.too_small") }),
  });

export type TUpdateUserNameFormSchema = z.infer<
  ReturnType<typeof getUpdateUserNameFormSchema>
>;
