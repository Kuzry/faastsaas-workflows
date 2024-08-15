"use client";

import { Loader, Switch } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUpdateUserConsentFormSchema,
  TUpdateUserConsentFormSchema,
} from "@/forms/AccountSettings/UpdateUserConsentForm/schema";
import { useServerAction } from "zsa-react";
import { updateUserConsentFormAction } from "@/forms/AccountSettings/UpdateUserConsentForm/action";
import { notifications } from "@mantine/notifications";
import { Form } from "@/components";

interface UpdateUserConsentFormProps {
  consent: boolean;
}

export function UpdateUserConsentFormClient({
  consent,
}: UpdateUserConsentFormProps) {
  const t = useTranslations("update_user_consent_form");

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<TUpdateUserConsentFormSchema>({
    resolver: zodResolver(getUpdateUserConsentFormSchema()),
    defaultValues: {
      consent,
    },
  });

  const { execute } = useServerAction(updateUserConsentFormAction);

  const onSubmit = async (data: TUpdateUserConsentFormSchema) => {
    const [, actionError] = await execute(data);
    if (actionError) {
      notifications.show({
        message: t("error"),
        color: "red",
      });
    } else {
      notifications.show({
        message: t("success"),
        color: "green",
      });
    }
  };

  return (
    <Form>
      <Controller
        control={control}
        name="consent"
        defaultValue={consent}
        render={({ field }) => (
          <div className="flex gap-2">
            <Switch
              disabled={isSubmitting}
              defaultChecked={field.value}
              checked={field.value}
              onChange={(event) => {
                field.onChange(event);
                handleSubmit(onSubmit)();
              }}
            />
            {isSubmitting && <Loader size={20} />}
          </div>
        )}
      />
    </Form>
  );
}
