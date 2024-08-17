"use client";

import { Form, Link } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { authLinks } from "@/utils/auth";
import { Alert, Button, PasswordInput } from "@mantine/core";
import { Info } from "lucide-react";
import { updatePasswordFormAction } from "@/forms/Auth/UpdatePassword/action";
import {
  getUpdatePasswordFormSchema,
  TUpdatePasswordFormSchema,
} from "@/forms/Auth/UpdatePassword/schema";
import { useServerAction } from "zsa-react";

export function UpdatePasswordFormClient() {
  const t = useTranslations("update_password_form");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TUpdatePasswordFormSchema>({
    resolver: zodResolver(getUpdatePasswordFormSchema(t)),
    defaultValues: {
      password: "",
    },
  });

  const { isError, isSuccess, execute, error } = useServerAction(
    updatePasswordFormAction
  );

  const onSubmit = async (data: TUpdatePasswordFormSchema) =>
    await execute(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && (
        <Alert color="green" icon={<Info />}>
          <div>
            {t.rich("success", {
              dashboard_link: (chunks) => (
                <Link href={authLinks.dashboard}>{chunks}</Link>
              ),
            })}
          </div>
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
        name="password"
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t("fields.password.label")}
            type="password"
            placeholder={t("fields.password.placeholder")}
            error={errors.password?.message}
          />
        )}
      />
      <Button type="submit" loading={isSubmitting}>
        {t("submit_button")}
      </Button>
    </Form>
  );
}
