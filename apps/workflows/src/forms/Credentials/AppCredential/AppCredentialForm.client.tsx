"use client";

import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { z, ZodTypeAny } from "zod";
import { ReactNode } from "react";
import { getCredentialByAppId } from "@/utils/credentials";
import { upsertCredentialAction } from "@/forms/Credentials/action";
import { useServerAction } from "zsa-react";
import { notifications } from "@mantine/notifications";
import { getAppCredentialFormSchema } from "@/forms/Credentials/AppCredential/schema";

interface AppCredentialClientProps {
  values: {
    credential_app_id: string;
    id?: string;
    name?: string;
    credential_app_data?: Record<string, string>;
  };
}

export function AppCredentialFormClient({ values }: AppCredentialClientProps) {
  const t = useTranslations("app_credential_form"),
    tCredentials = useTranslations("credentials");

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentCredential = getCredentialByAppId(values.credential_app_id)!,
    currentCredentialFields = currentCredential.getFields(tCredentials);

  const schema = getAppCredentialFormSchema(t).merge(
    z.object({
      credential_app_data: z.object(
        currentCredentialFields.reduce(
          (a, v) => ({ ...a, [v.id]: v.schema }),
          {}
        ) as Record<string, ZodTypeAny>
      ),
    })
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: values?.id ?? undefined,
      credential_app_id: values?.credential_app_id ?? "",
      name: values?.name ?? "",
      credential_app_data:
        values.credential_app_data ??
        currentCredentialFields.reduce((a, v) => ({ ...a, [v.id]: "" }), {}),
    },
  });

  const id = watch("id");

  const { isPending, execute } = useServerAction(upsertCredentialAction);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const [actionData, actionError] = await execute(data);

    if (actionError) {
      notifications.show({
        message: t("error", {
          credential: currentCredential.name,
        }),
        color: "red",
      });
    } else {
      if (id === undefined) {
        notifications.show({
          message: t("added", {
            credential: currentCredential.name,
          }),
          color: "green",
        });
      } else {
        notifications.show({
          message: t("updated", {
            credential: currentCredential.name,
          }),
          color: "green",
        });
      }

      reset({
        ...data,
        id: actionData.data?.id,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            {...field}
            label={t("fields.name.label")}
            type="text"
            error={errors.name?.message as ReactNode}
          />
        )}
      />
      {currentCredentialFields.map((credentialField, key) => (
        <div key={key}>
          {credentialField.type === "text" && (
            <Controller
              control={control}
              name={`credential_app_data.${credentialField.id}`}
              render={({ field }) => {
                const fieldErrors = field.name.split(".");

                return (
                  <TextInput
                    {...field}
                    label={credentialField.label}
                    description={credentialField.description}
                    error={
                      errors.credential_app_data?.[fieldErrors[1]]
                        ?.message as ReactNode
                    }
                  />
                );
              }}
            />
          )}
          {credentialField.type === "password" && (
            <Controller
              control={control}
              name={`credential_app_data.${credentialField.id}`}
              render={({ field }) => {
                const fieldErrors = field.name.split(".");

                return (
                  <PasswordInput
                    {...field}
                    label={credentialField.label}
                    description={credentialField.description}
                    error={
                      errors.credential_app_data?.[fieldErrors[1]]
                        ?.message as ReactNode
                    }
                  />
                );
              }}
            />
          )}
          {credentialField.type === "button" && (
            <Alert color="yellow">
              <Button variant="outline" color="yellow" className="w-full">
                {credentialField.label}
              </Button>
            </Alert>
          )}
        </div>
      ))}
      <Button type="submit" loading={isPending}>
        {t("submit_button")}
      </Button>
    </Form>
  );
}
