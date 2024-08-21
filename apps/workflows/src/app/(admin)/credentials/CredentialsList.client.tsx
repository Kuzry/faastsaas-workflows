"use client";

import { useTranslations } from "next-intl";
import { ActionIcon, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import { Trash2 } from "lucide-react";
import { useServerAction } from "zsa-react";
import { Tables } from "@/types/supabase";
import { notifications } from "@mantine/notifications";
import { deleteCredentialAction } from "@/forms/Credentials/action";

interface CredentialProps extends PropsWithChildren {
  credential: Tables<"credentials">;
}

export function CredentialRemove({ credential }: CredentialProps) {
  const t = useTranslations("credentials_page");

  const [opened, { open, close }] = useDisclosure(false);

  const { isPending, execute } = useServerAction(deleteCredentialAction);

  const onClickConfirm = async () => {
    const [, actionError] = await execute({
      id: credential.id,
    });

    if (actionError) {
      notifications.show({
        message: t("credentials_list.remove_credential_modal.error"),
        color: "red",
      });
    } else {
      notifications.show({
        message: t("credentials_list.remove_credential_modal.success"),
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
        title={t("credentials_list.remove_credential_modal.title")}
        opened={opened}
        onClose={close}
        classNames={{ body: "flex flex-col gap-4" }}
      >
        <div>
          {t("credentials_list.remove_credential_modal.description", {
            name: credential.name,
          })}
        </div>
        <div className="end flex justify-end gap-4">
          <Button variant="outline" onClick={close}>
            {t("credentials_list.remove_credential_modal.cancel")}
          </Button>
          <Button loading={isPending} onClick={onClickConfirm}>
            {t("credentials_list.remove_credential_modal.confirm")}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export function CredentialFormDialog({
  credential,
  children,
}: CredentialProps & PropsWithChildren) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="flex-1 cursor-pointer px-3.5 py-3" onClick={open}>
        {credential.name}
      </div>
      <Modal
        opened={opened}
        onClose={close}
        classNames={{
          inner: "md:pl-[250px]",
        }}
      >
        {children}
      </Modal>
    </>
  );
}
