import { useTranslations } from "next-intl";
import { z } from "zod";
import { TApps } from "@/types";

export function getApps(
  t: ReturnType<typeof useTranslations<"app_credential_form">>
): TApps[] {
  return [
    {
      id: "clickUpOAuth2Api",
      name: "ClickUp",
      schema: z.object({
        something: z.string().min(1, {
          message: t(
            "apps.clickUpOAuth2Api.fields.something.messages.too_small"
          ),
        }),
      }),
      fields: [
        {
          id: "something",
          type: "text",
          label: t("apps.clickUpOAuth2Api.fields.something.label"),
        },
      ],
      triggers: [
        {
          id: "task.created",
          label: t("apps.clickUpOAuth2Api.triggers.task_created.label"),
          data: [
            {
              id: "name",
              label: t(
                "apps.clickUpOAuth2Api.triggers.task_created.data.name.label"
              ),
            },
          ],
        },
      ],
      actions: [
        {
          id: "task.create",
          label: t("apps.clickUpOAuth2Api.actions.create_task.label"),
          data: [
            {
              id: "name",
              label: t(
                "apps.clickUpOAuth2Api.actions.create_task.data.name.label"
              ),
            },
          ],
        },
      ],
    },
  ];
}
