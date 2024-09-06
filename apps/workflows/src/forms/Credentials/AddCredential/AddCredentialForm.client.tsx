"use client";

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
      credential_app_id: "",
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="credential_app_id"
        render={({ field }) => (
          <Select
            {...field}
            data={getCredentials().map((credential) => ({
              value: credential.id,
              label: credential.name,
            }))}
            data-autofocus={true}
            searchable={true}
            label={t("fields.credential_app_id.label")}
            placeholder={t("fields.credential_app_id.placeholder")}
            error={errors.credential_app_id?.message}
          />
        )}
      />
      <Button type="submit">{t("submit_button")}</Button>
    </Form>
  );
}
