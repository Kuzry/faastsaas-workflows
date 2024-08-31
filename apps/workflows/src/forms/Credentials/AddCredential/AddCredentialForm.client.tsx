import { Form } from "@/components";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAddCredentialFormSchema, TAddCredentialFormSchema } from "./schema";
import { Button, Select } from "@mantine/core";
import { getCredentials } from "@/utils/credentials";

interface AddCredentialFormClientProps {
  onSubmit: (data: TAddCredentialFormSchema) => void;
}

export function AddCredentialFormClient({
  onSubmit,
}: AddCredentialFormClientProps) {
  const t = useTranslations("add_credential_form");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TAddCredentialFormSchema>({
    resolver: zodResolver(getAddCredentialFormSchema(t)),
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
            data={getCredentials().map((credential) => ({
              value: credential.id,
              label: credential.name,
            }))}
            data-autofocus={true}
            searchable={true}
            label={t("fields.app.label")}
            placeholder={t("fields.app.placeholder")}
            error={errors.app?.message}
          />
        )}
      />
      <Button type="submit">{t("submit_button")}</Button>
    </Form>
  );
}
