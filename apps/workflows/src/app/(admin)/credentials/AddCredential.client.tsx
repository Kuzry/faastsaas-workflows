"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddCredentialFormClient } from "@/forms/Credentials/AddCredential/AddCredentialForm.client";
import { TAddCredentialFormSchema } from "@/forms/Credentials/AddCredential/schema";
import { AppCredentialClient } from "@/forms/Credentials/AppCredential/AppCredential.client";

export function AddCredentialClient() {
  const t = useTranslations("credentials_page");

  const addCredentialFormDialog = useDisclosure(false),
    credentialFormDialog = useDisclosure(false);

  const [selectedApp, setSelectedApp] =
    useState<TAddCredentialFormSchema["app"]>();

  return (
    <>
      <Button
        onClick={addCredentialFormDialog[1].open}
        className="flex-1 xs:flex-none"
      >
        {t("add_credential.button")}
      </Button>
      <Modal
        opened={addCredentialFormDialog[0]}
        onClose={addCredentialFormDialog[1].close}
        classNames={{
          inner: "md:pl-[250px]",
        }}
      >
        <AddCredentialFormClient
          onSubmit={(data) => {
            setSelectedApp(data.app);
            addCredentialFormDialog[1].close();
            credentialFormDialog[1].open();
          }}
        />
      </Modal>
      <Modal
        opened={credentialFormDialog[0]}
        onClose={credentialFormDialog[1].close}
        classNames={{
          inner: "md:pl-[250px]",
        }}
      >
        <AppCredentialClient app={selectedApp ?? ""} />
      </Modal>
    </>
  );
}
