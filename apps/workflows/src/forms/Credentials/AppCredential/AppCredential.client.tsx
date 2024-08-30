import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { TAddCredentialFormSchema } from "@/forms/Credentials/AddCredential/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components";
import { getApps } from "@/utils/apps";
import { Button, TextInput } from "@mantine/core";
import { z } from "zod";
import { ReactNode } from "react";

interface AppCredentialClientProps {
  app: TAddCredentialFormSchema["app"];
}

export function AppCredentialClient({ app }: AppCredentialClientProps) {
  const t = useTranslations("app_credential_form");

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentApp = getApps(t).find((searchedApp) => searchedApp.id === app)!;

  const schema = z
    .object({
      name: z.string().min(1, { message: t("fields.name.messages.too_small") }),
    })
    .merge(currentApp.schema);

  const defaultValues: Record<string, string> = {};
  // Get app fields and set them empty string for react hook form defaultValues
  currentApp.fields.forEach((field) => (defaultValues[field.id] = ""));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      ...defaultValues,
    },
  });

  const onSubmit = () => {
    // console.log('')
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
      {currentApp?.fields.map((appField, key) => (
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
      <Button type="submit">{t("submit_button")}</Button>
    </Form>
  );
}
