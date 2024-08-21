"use client";

import { Tables } from "@/types/supabase";
import { Trash2 } from "lucide-react";
import { ActionIcon, Button, Modal } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useDisclosure } from "@mantine/hooks";
import { useServerAction } from "zsa-react";
import { deleteWorkflowAction } from "@/forms/Workflows/action";
import { notifications } from "@mantine/notifications";

interface WorkflowRemoveProps {
  workflow: Tables<"workflows">;
}

export function WorkflowRemove({ workflow }: WorkflowRemoveProps) {
  const t = useTranslations("workflows_page");

  const [opened, { open, close }] = useDisclosure(false);

  const { isPending, execute } = useServerAction(deleteWorkflowAction);

  const onClickConfirm = async () => {
    const [, actionError] = await execute({
      id: workflow.id,
    });

    if (actionError) {
      notifications.show({
        message: t("workflows_list.remove_workflow_modal.error"),
        color: "red",
      });
    } else {
      notifications.show({
        message: t("workflows_list.remove_workflow_modal.success"),
        color: "green",
      });
    }
  };

  return (
    <>
      <ActionIcon variant="transparent" className="text-gray" onClick={open}>
        <Trash2 size={16} />
      </ActionIcon>
      <Modal
        title={t("workflows_list.remove_workflow_modal.title")}
        opened={opened}
        onClose={close}
        classNames={{ body: "flex flex-col gap-4" }}
      >
        <div>
          {t("workflows_list.remove_workflow_modal.description", {
            name: workflow.name,
          })}
        </div>
        <div className="end flex justify-end gap-4">
          <Button variant="outline" onClick={close}>
            {t("workflows_list.remove_workflow_modal.cancel")}
          </Button>
          <Button loading={isPending} onClick={onClickConfirm}>
            {t("workflows_list.remove_workflow_modal.confirm")}
          </Button>
        </div>
      </Modal>
    </>
  );
}
