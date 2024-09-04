import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components";
import { Button, TextInput } from "@mantine/core";
import { z } from "zod";
import { ReactNode } from "react";
import {
  getCredentialById,
  getZodObjectFromCredentialFieldsSchema,
} from "@/utils/credentials";
import { upsertClickUpCredentialsAction } from "@/forms/Credentials/action";
import { useServerAction } from "zsa-react";
import { notifications } from "@mantine/notifications";
import { getAppCredentialFormSchema } from "@/forms/Credentials/AppCredential/schema";

interface AppCredentialClientProps {
  values: {
    id?: string;
    credential_app_id: string;
    name?: string;
  };
}

export function AppCredentialFormClient({ values }: AppCredentialClientProps) {
  const t = useTranslations("app_credential_form"),
    tCredentials = useTranslations("credentials");

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentCredential = getCredentialById(values.credential_app_id)!,
    currentCredentialFields = currentCredential.getFields(tCredentials);

  const schema = getAppCredentialFormSchema(t).merge(
    getZodObjectFromCredentialFieldsSchema(currentCredentialFields)
  );

  const defaultValues: Record<string, string> = {};
  // Get app fields and set them empty string for react hook form defaultValues
  currentCredentialFields.forEach((field) => (defaultValues[field.id] = ""));

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

  const { isPending, execute } = useServerAction(
    upsertClickUpCredentialsAction
  );

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const [actionData, actionError] = await execute({
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
      {currentCredential
        ?.getFields(tCredentials)
        .map((appField, key) => (
          <div key={key}>
            {appField.type === "text" && (
              <Controller
                control={control}
                name={appField.id}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={appField.label}
                    error={errors[appField.id]?.message as ReactNode}
                  />
                )}
              />
            )}
          </div>
        ))}
      <Button type="submit" loading={isPending}>
        {t("submit_button")}
      </Button>
    </Form>
  );
}
