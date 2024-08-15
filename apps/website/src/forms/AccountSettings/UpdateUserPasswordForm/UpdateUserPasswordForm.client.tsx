"use client";

import {
  Form,
  Paper,
  PaperFooter,
  PaperHeader,
  PaperMain,
  Link,
} from "@/components";
import { Button, PasswordInput, Skeleton, Tooltip } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";
import { updatePasswordFormAction } from "@/forms/Auth/UpdatePassword/action";
import {
  getUpdatePasswordFormSchema,
  TUpdatePasswordFormSchema,
} from "@/forms/Auth/UpdatePassword/schema";
import { useServerAction } from "zsa-react";

interface UpdateUserPasswordFormClientProps {
  skeleton?: boolean;
}

export function UpdateUserPasswordFormClient({
  skeleton = true,
}: UpdateUserPasswordFormClientProps) {
  const t = useTranslations("update_user_password_form");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<TUpdatePasswordFormSchema>({
    resolver: zodResolver(getUpdatePasswordFormSchema(t)),
    defaultValues: {
      password: "",
    },
  });

  const { execute } = useServerAction(updatePasswordFormAction);

  async function onSubmit(data: TUpdatePasswordFormSchema) {
    const [, actionError] = await execute(data);

    if (actionError) {
      notifications.show({
        message: t.rich("error", {
          customer_support_e_mail_link: (chunks) => (
            <Link
              href={`mailto:${
                process.env.NEXT_PUBLIC_APP_SUPPORT_E_MAIL as string
              }`}
            >
              {chunks}
            </Link>
          ),
        }),
        color: "red",
      });
    } else {
      notifications.show({
        message: t("success"),
        color: "green",
      });

      reset({
        password: "",
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Paper>
        <PaperHeader>
          <div className="flex w-full items-center justify-between align-middle font-bold">
            {t("header")}
          </div>
        </PaperHeader>
        <PaperMain>
          <div className="pb-4">{t("description")}</div>
          {skeleton ? (
            <Skeleton className="h-[36px]" />
          ) : (
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  value={field.value ?? ""}
                  type="text"
                  placeholder={t("fields.password.placeholder")}
                  error={errors.password?.message}
                />
              )}
            />
          )}
        </PaperMain>
        <PaperFooter>
          {skeleton ? (
            <Skeleton className="h-[30px] w-[70px]" />
          ) : (
            <Tooltip
              label={t("submit_button_tooltip")}
              multiline={true}
              w={180}
            >
              <Button
                type="submit"
                disabled={!isDirty}
                loading={isSubmitting}
                size="xs"
              >
                {t("submit_button")}
              </Button>
            </Tooltip>
          )}
        </PaperFooter>
      </Paper>
    </Form>
  );
}
