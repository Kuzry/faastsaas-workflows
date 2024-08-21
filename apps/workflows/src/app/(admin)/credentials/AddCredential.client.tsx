"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AddCredentialFormClient } from "@/forms/Credentials/AddCredential/AddCredentialForm.client";
import { TAddCredentialFormSchema } from "@/forms/Credentials/AddCredential/schema";

export function AddCredentialClient() {
  const t = useTranslations("credentials_page");

  const [opened, { open, close }] = useDisclosure(false);

  const [selectedApp, setSelectedApp] =
    useState<TAddCredentialFormSchema["app"]>();

  useEffect(() => {
    if (opened) {
      setSelectedApp(undefined);
    }
  }, [opened]);

  return (
    <>
      <Button onClick={open} className="flex-1 xs:flex-none">
        {t("add_credential.button")}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        classNames={{
          inner: "md:pl-[250px]",
        }}
      >
        {selectedApp === undefined && (
          <AddCredentialFormClient
            onSubmit={(data) => setSelectedApp(data.app)}
          />
        )}
      </Modal>
    </>
  );
}
