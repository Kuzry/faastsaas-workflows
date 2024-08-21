import { Form } from "@/components";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getAddWorkflowFormSchema,
  TAddWorkflowFormSchema,
} from "@/forms/Workflows/AddWorkflow/schema";
import { Button, TextInput } from "@mantine/core";
import { useServerAction } from "zsa-react";
import { addWorkflowAction } from "@/forms/Workflows/AddWorkflow/action";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export function AddWorkflowFormClient() {
  const t = useTranslations("add_workflow_form");

  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TAddWorkflowFormSchema>({
    resolver: zodResolver(getAddWorkflowFormSchema(t)),
    defaultValues: {
      name: "",
    },
  });

  const { execute } = useServerAction(addWorkflowAction);

  const onSubmit = async (formData: TAddWorkflowFormSchema) => {
    const [data, error] = await execute(formData);

    if (error) {
      notifications.show({
        message: "",
        color: "red",
      });
    } else {
      router.push(data.data.redirect_to);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            {...field}
            label={t("fields.name.label")}
            placeholder={t("fields.name.placeholder")}
            error={errors.name?.message}
          />
        )}
      />
      <Button type="submit" loading={isSubmitting}>
        {t("submit_button")}
      </Button>
    </Form>
  );
}
