"use client";

import { Form } from "@/components";
import { Button, Skeleton, TextInput, Tooltip } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { Paper, PaperFooter, PaperHeader, PaperMain, Link } from "@/components";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserNameFormAction } from "./action";
import {
  getUpdateUserNameFormSchema,
  TUpdateUserNameFormSchema,
} from "@/forms/AccountSettings/UpdateUserNameForm/schema";
import { useServerAction } from "zsa-react";
import { notifications } from "@mantine/notifications";

interface UpdateUserNameFormClientProps {
  name?: string;
}

export function UpdateUserNameFormClient({
  name,
}: UpdateUserNameFormClientProps) {
  const t = useTranslations("update_user_name_form");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<TUpdateUserNameFormSchema>({
    resolver: zodResolver(getUpdateUserNameFormSchema(t)),
    defaultValues: {
      name,
    },
  });

  const { execute } = useServerAction(updateUserNameFormAction);

  async function onSubmit(data: TUpdateUserNameFormSchema) {
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
        autoClose: false,
      });
    } else {
      notifications.show({
        message: t("success"),
        color: "green",
      });

      reset({
        name: data.name,
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
          {name ? (
            <Controller
              control={control}
              name="name"
              defaultValue={name}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value ?? ""}
                  type="text"
                  placeholder="Enter your new e-mail"
                  error={errors.name?.message}
                />
              )}
            />
          ) : (
            <Skeleton className="h-[36px]" />
          )}
        </PaperMain>
        <PaperFooter>
          {name ? (
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
