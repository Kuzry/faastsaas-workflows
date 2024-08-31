"use client";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { AddWorkflowFormClient } from "@/forms/Workflows/AddWorkflow/AddWorkflowForm.client";

export function AddWorkflowClient() {
  const t = useTranslations("workflows_page");

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} className="flex-1 xs:flex-none">
        {t("add_workflow.button")}
      </Button>
      <Modal
        title={t("add_workflow.add_modal.title")}
        opened={opened}
        onClose={close}
        classNames={{
          inner: "md:pl-[250px]",
        }}
      >
        <AddWorkflowFormClient />
      </Modal>
    </>
  );
}
