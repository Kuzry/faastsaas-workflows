"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Link } from "@/components";
import { Info } from "lucide-react";
import { authLinks } from "@/utils/auth";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { useTranslations } from "next-intl";
import {
  getSignUpFormSchema,
  TSignUpFormSchema,
} from "@/forms/Auth/SignUp/schema";
import { signUpFormAction } from "@/forms/Auth/SignUp/action";
import { useServerAction } from "zsa-react";

export function SignUpFormClient() {
  const t = useTranslations("sign_up_form");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpFormSchema>({
    resolver: zodResolver(getSignUpFormSchema(t)),
    defaultValues: {
      name: "",
      e_mail: "",
      password: "",
    },
  });

  const { isError, isSuccess, execute, error } =
    useServerAction(signUpFormAction);

  const onSubmit = async (data: TSignUpFormSchema) => {
    await execute(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && (
        <Alert color="green" icon={<Info />}>
          <div>{t("success.p1")}</div>
          <div>{t("success.p2")}</div>
        </Alert>
      )}
      {isError && (
        <Alert color="red" icon={<Info />}>
          <div>
            {t.rich("error.p1", {
              error: () => <span className="font-bold">{error?.message}</span>,
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
        name="name"
        render={({ field }) => (
          <TextInput
            {...field}
            label={t("fields.name.label")}
            type="text"
            placeholder={t("fields.name.placeholder")}
            error={errors.name?.message}
          />
        )}
      />
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
      <div className="text-center text-sm xs:px-16">
        {t.rich("terms", {
          privacy_policy_link: (chunks) => (
            <Link href={authLinks.privacy_policy}>{chunks}</Link>
          ),
          terms_of_service_link: (chunks) => (
            <Link href={authLinks.terms_of_service}>{chunks}</Link>
          ),
        })}
      </div>
      <Button type="submit" loading={isSubmitting}>
        {t("submit_button")}
      </Button>
    </Form>
  );
}
