import { useTranslations } from "next-intl";
import { z } from "zod";

export const getAddWorkflowFormSchema = (
  t: ReturnType<typeof useTranslations<"add_workflow_form">>
) =>
  z.object({
    name: z.string().min(1, { message: t("fields.name.messages.too_small") }),
  });

export type TAddWorkflowFormSchema = z.infer<
  ReturnType<typeof getAddWorkflowFormSchema>
>;
