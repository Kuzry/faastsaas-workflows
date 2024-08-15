"use client";

import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Link } from "@/components";
import { Alert, Button, TextInput } from "@mantine/core";
import { Info } from "lucide-react";
import {
  getResetPasswordFormSchema,
  TResetPasswordFormSchema,
} from "@/forms/Auth/ResetPassword/schema";
import { useServerAction } from "zsa-react";
import { resetPasswordFormAction } from "@/forms/Auth/ResetPassword/action";

export function ResetPasswordFormClient() {
  const t = useTranslations("reset_password_form");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordFormSchema>({
    resolver: zodResolver(getResetPasswordFormSchema(t)),
    defaultValues: {
      e_mail: "",
    },
  });

  const { isError, isSuccess, execute, error } = useServerAction(
    resetPasswordFormAction
  );

  const onSubmit = async (data: TResetPasswordFormSchema) =>
    await execute(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && (
        <Alert color="green" icon={<Info />}>
          <div>{t("success")}</div>
        </Alert>
      )}
      {isError && (
        <Alert color="red" icon={<Info />}>
          <div>
            {t.rich("error.p1", {
              error: () => <span>{error.message}</span>,
            })}
          </div>
          <div>
            {t.rich("error.p2", {
              customer_support_e_mail_link: (chunks) => (
                <Link
                  href={`mailto:${
                    process.env.NEXT_PUBLIC_APP_SUPPORT_E_MAIL as string
                  }`}
                >
                  {chunks}
                </Link>
              ),
            })}
          </div>
        </Alert>
      )}
      <Controller
        control={control}
        name="e_mail"
        render={({ field }) => (
          <TextInput
            {...field}
            label={t("fields.e_mail.label")}
            type="email"
            placeholder={t("fields.e_mail.placeholder")}
            error={errors.e_mail?.message}
          />
        )}
      />
      <Button type="submit" loading={isSubmitting}>
        {t("submit_button")}
      </Button>
    </Form>
  );
}
