import { Form } from "@/components";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAddCredentialFormSchema, TAddCredentialFormSchema } from "./schema";
import { Button, Select } from "@mantine/core";
import { getApps } from "@/utils/apps";

interface AddCredentialFormClientProps {
  onSubmit: (data: TAddCredentialFormSchema) => void;
}

export function AddCredentialFormClient({
  onSubmit,
}: AddCredentialFormClientProps) {
  const t0 = useTranslations("app_credential_form"),
    t = useTranslations("add_credential_form");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TAddCredentialFormSchema>({
    resolver: zodResolver(getAddCredentialFormSchema(t, t0)),
    defaultValues: {
      app: "",
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="app"
        render={({ field }) => (
          <Select
            {...field}
            data={getApps(t0).map((app) => ({
              value: app.id,
              label: app.name,
            }))}
            data-autofocus={true}
            searchable={true}
            placeholder={t("fields.app.placeholder")}
            error={errors.app?.message}
          />
        )}
      />
      <Button type="submit">{t("submit_button")}</Button>
    </Form>
  );
}
