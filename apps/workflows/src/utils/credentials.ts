import { TCredential } from "@/types";
import { z } from "zod";

export function getCredentials() {
  return [getClickUpOAuth2ApiCredential(), getWordPressCredential()] as const;
}

export function getCredentialByAppId(
  id: ReturnType<typeof getCredentials>[number]["id"]
) {
  return getCredentials().find((credential) => credential.id === id);
}

export function getClickUpOAuth2ApiCredential(): TCredential {
  return {
    id: "clickUpOAuth2Api",
    name: "ClickUp",
    getFields: (t) => [
      {
        id: "something",
        type: "button",
        label: t("clickUpOAuth2Api.fields.something.label"),
        // schema: z.string().min(1, {
        //   message: t("clickUpOAuth2Api.fields.something.messages.too_small"),
        // }),
      },
    ],
    getFieldsSecureForDisplay: (data) => {
      return {
        ...data,
      };
    },
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
    // checkConnection: async () => {
    //   await fetch("asd");
    // },
  };
}

export function getWordPressCredential(): TCredential {
  return {
    id: "wordpress",
    name: "WordPress",
    getFields: (t) => [
      {
        id: "username",
        type: "text",
        label: t("wordpress.fields.username.label"),
        schema: z.string().min(1, {
          message: t("wordpress.fields.username.messages.too_small"),
        }),
      },
      {
        id: "password",
        type: "password",
        label: t("wordpress.fields.password.label"),
        description: t("wordpress.fields.password.description"),
        schema: z.string().min(1, {
          message: t("wordpress.fields.password.messages.too_small"),
        }),
      },
      {
        id: "url",
        type: "text",
        label: t("wordpress.fields.url.label"),
        description: t("wordpress.fields.url.description"),
        schema: z
          .string()
          .url({ message: t("wordpress.fields.url.messages.invalid_string") }),
      },
    ],
    getFieldsSecureForDisplay: (data) => {
      return {
        ...data,
        password: "__ENCRYPTED__",
      };
    },
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
