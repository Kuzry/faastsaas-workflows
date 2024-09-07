"use client";

import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { z } from "zod";
import { ReactNode } from "react";
import {
  getCredentialByAppId,
  getZodObjectFromCredentialFieldsSchema,
} from "@/utils/credentials";
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

  const defaultValues: Record<string, string> = {};
  // Get app fields and set them empty string for react hook form defaultValues
  currentCredentialFields.forEach((field) => (defaultValues[field.id] = ""));

  const schema = getAppCredentialFormSchema(t).merge(
    getZodObjectFromCredentialFieldsSchema(currentCredentialFields)
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
      ...defaultValues,
    },
  });

  const id = watch("id");

  const { isPending, execute } = useServerAction(upsertCredentialAction);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // console.log("data------");
    // console.log(data);
    // console.log({
    //   ...data,
    //   id: data.id,
    //   credential_app_id: data.credential_app_id,
    //   name: data.name,
    // });
    const [actionData, actionError] = await execute({
      // ...data,
      id: data.id,
      credential_app_id: data.credential_app_id,
      name: data.name,
    });

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
      {currentCredential?.getFields(tCredentials).map((appField, key) => (
        <div key={key}>
          {appField.type === "text" && (
            <Controller
              control={control}
              name={appField.id}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={appField.label}
                  description={appField.description}
                  error={errors[appField.id]?.message as ReactNode}
                />
              )}
            />
          )}
          {appField.type === "password" && (
            <Controller
              control={control}
              name={appField.id}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label={appField.label}
                  description={appField.description}
                  error={errors[appField.id]?.message as ReactNode}
                />
              )}
            />
          )}
          {appField.type === "button" && (
            <Alert color="yellow">
              <Button variant="outline" color="yellow" className="w-full">
                {appField.label}
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
