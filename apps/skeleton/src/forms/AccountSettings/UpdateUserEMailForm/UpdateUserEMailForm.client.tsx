"use client";

import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components";
import { Button, Skeleton, TextInput, Tooltip } from "@mantine/core";
import { Paper, PaperFooter, PaperHeader, PaperMain, Link } from "@/components";
import { updateUserEMailFormAction } from "./action";
import { notifications } from "@mantine/notifications";
import {
  getUpdateUserEMailFormSchema,
  TUpdateUserEMailFormSchema,
} from "@/forms/AccountSettings/UpdateUserEMailForm/schema";
import { useServerAction } from "zsa-react";

interface UpdateUserEMailFormClientProps {
  eMail?: string;
}

export function UpdateUserEMailFormClient({
  eMail,
}: UpdateUserEMailFormClientProps) {
  const t = useTranslations("update_user_e_mail_form");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
  } = useForm<TUpdateUserEMailFormSchema>({
    resolver: zodResolver(getUpdateUserEMailFormSchema(t)),
    defaultValues: {
      e_mail: eMail,
    },
  });

  const { execute } = useServerAction(updateUserEMailFormAction);

  async function onSubmit(data: TUpdateUserEMailFormSchema) {
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
        autoClose: false,
      });
    } else {
      notifications.show({
        message: t("success", {
          old_e_mail: eMail,
          new_e_mail: watch("e_mail"),
        }),
        color: "green",
        autoClose: false,
      });

      reset({
        e_mail: eMail,
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
          {eMail ? (
            <Controller
              control={control}
              name="e_mail"
              defaultValue={eMail}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value ?? ""}
                  type="text"
                  placeholder={t("fields.e_mail.placeholder")}
                  error={errors.e_mail?.message}
                />
              )}
            />
          ) : (
            <Skeleton className="h-[36px]" />
          )}
        </PaperMain>
        <PaperFooter>
          {eMail ? (
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
          ) : (
            <Skeleton className="h-[30px] w-[70px]" />
          )}
        </PaperFooter>
      </Paper>
    </Form>
  );
}
