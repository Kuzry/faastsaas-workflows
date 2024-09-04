import { TCredential } from "@/types";
import { AnyZodObject, z } from "zod";

export function getCredentials() {
  return [getClickUpOAuth2ApiCredential()] as const;
}

export function getCredentialById(
  id: ReturnType<typeof getCredentials>[number]["id"]
) {
  return getCredentials().find((credential) => credential.id === id);
}

export function getZodObjectFromCredentialFieldsSchema(
  fields: ReturnType<TCredential["getFields"]>
): AnyZodObject {
  return z.object(fields.reduce((a, v) => ({ ...a, [v.id]: v.schema }), {}));
}

export function getClickUpOAuth2ApiCredential(): TCredential {
  return {
    id: "clickUpOAuth2Api",
    name: "ClickUp",
    getFields: (t) => [
      {
        id: "something",
        type: "text",
        label: t("clickUpOAuth2Api.fields.something.label"),
        schema: z.string().min(1, {
          message: t("clickUpOAuth2Api.fields.something.messages.too_small"),
        }),
      },
    ],
    getTriggers: (t) => [
      {
        id: "task.created",
        label: t("clickUpOAuth2Api.triggers.task_created.label"),
        data: [
          {
            id: "name",
            label: t("clickUpOAuth2Api.triggers.task_created.data.name.label"),
          },
        ],
      },
    ],
    getActions: (t) => [
      {
        id: "task.create",
        label: t("clickUpOAuth2Api.actions.task_create.label"),
        data: [
          {
            id: "name",
            label: t("clickUpOAuth2Api.actions.task_create.data.name.label"),
          },
        ],
      },
    ],
  };
}
