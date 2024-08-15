"use client";

import { useTranslations } from "next-intl";
import {
  Alert,
  Button,
  Divider,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { Form, Link } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { authLinks } from "@/utils/auth";
import { useRouter } from "next/navigation";
import {
  getSignInWithMagicLinkFormSchema,
  getSignInWithPasswordFormSchema,
  TSignInWithMagicLinkFormSchema,
  TSignInWithPasswordFormSchema,
} from "@/forms/Auth/SignIn/schema";
import { useServerAction } from "zsa-react";
import {
  signInWithMagicLinkFormAction,
  signInWithPasswordFormAction,
} from "@/forms/Auth/SignIn/action";
import { Info } from "lucide-react";

export function SignInFormClient() {
  const t = useTranslations("sign_in_form");

  const router = useRouter();

  const [formSchemaName, setFormSchemaName] = useState<
    "password" | "magic-link"
  >("password");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TSignInWithPasswordFormSchema | TSignInWithMagicLinkFormSchema>({
    resolver: (values, context, options) => {
      return zodResolver(
        formSchemaName === "password"
          ? getSignInWithPasswordFormSchema(t)
          : getSignInWithMagicLinkFormSchema(t)
      )(values, context, options);
    },
    defaultValues: {
      e_mail: "",
      password: "",
    },
  });

  const signInWithPasswordServerAction = useServerAction(
      signInWithPasswordFormAction
    ),
    signInWithMagicLinkServerAction = useServerAction(
      signInWithMagicLinkFormAction
    );

  const onSubmit = async (
    data: TSignInWithPasswordFormSchema | TSignInWithMagicLinkFormSchema
  ) => {
    signInWithMagicLinkServerAction.reset();
    signInWithPasswordServerAction.reset();

    if (formSchemaName === "magic-link") {
      await signInWithMagicLinkServerAction.execute(data);
    } else {
      const [actionData, actionError] =
        await signInWithPasswordServerAction.execute(data);

      if (!actionError) {
        router.push(actionData.data.redirect_to ?? "/");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {signInWithMagicLinkServerAction.isSuccess && (
        <Alert color="green" icon={<Info />}>
          <div>{t("success.magic_link.p1")}</div>
          <div>
            {t.rich("success.magic_link.p2", {
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
      {(signInWithPasswordServerAction.isError ||
        signInWithMagicLinkServerAction.isError) && (
        <Alert color="red" icon={<Info />}>
          <div>
            {t.rich("error.p1", {
              error: () => (
                <span className="font-bold">
                  {signInWithPasswordServerAction.error?.message}
                  {signInWithMagicLinkServerAction.error?.message}
                </span>
              ),
            })}
          </div>
          <div>{t("error.p2")}</div>
          <div>
            {t.rich("error.p3", {
              reset_password_link: (chunks) => (
                <Link href={authLinks.reset_password}>{chunks}</Link>
              ),
            })}
          </div>
          <div>
            {t.rich("error.p4", {
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
      <Button
        type="submit"
        loading={formSchemaName === "password" && isSubmitting}
        onClick={() => setFormSchemaName("password")}
      >
        {t("submit_button_with_password")}
      </Button>
      <div className="text-center text-sm">
        <Link href={authLinks.reset_password}>Forgot your password?</Link>
      </div>
      <Divider label="OR" />
      <Button
        type="submit"
        loading={formSchemaName === "magic-link" && isSubmitting}
        onClick={() => setFormSchemaName("magic-link")}
      >
        {t("submit_button_with_magic_link")}
      </Button>
    </Form>
  );
}
