"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddCredentialFormClient } from "@/forms/Credentials/AddCredential/AddCredentialForm.client";
import { TAddCredentialFormSchema } from "@/forms/Credentials/AddCredential/schema";
import { AppCredentialFormClient } from "@/forms/Credentials/AppCredential/AppCredentialForm.client";
import { getCredentialByAppId } from "@/utils/credentials";

export function AddCredentialClient() {
  const t = useTranslations("credentials_page");

  const addCredentialFormDialog = useDisclosure(false),
    credentialFormDialog = useDisclosure(false);

  const [selectedCredential, setSelectedCredential] =
    useState<TAddCredentialFormSchema>();

  const onSubmit = (data: TAddCredentialFormSchema) => {
    setSelectedCredential(data);
    addCredentialFormDialog[1].close();
    credentialFormDialog[1].open();
  };

  return (
    <>
      <Button
        onClick={addCredentialFormDialog[1].open}
        className="flex-1 xs:flex-none"
      >
        {t("add_credential.button")}
      </Button>
      <Modal
        title={t("add_credential.add_modal.title")}
        opened={addCredentialFormDialog[0]}
        onClose={addCredentialFormDialog[1].close}
        classNames={{
          inner: "md:pl-[250px]",
        }}
      >
        <AddCredentialFormClient onSubmit={onSubmit} />
      </Modal>
      <Modal
        title={t("add_credential.app_modal.title", {
          credential: getCredentialByAppId(
            selectedCredential?.credential_app_id ?? ""
          )?.name,
        })}
        opened={credentialFormDialog[0]}
        onClose={credentialFormDialog[1].close}
        classNames={{
          inner: "md:pl-[250px]",
        }}
      >
        <AppCredentialFormClient
          values={{
            credential_app_id: selectedCredential?.credential_app_id ?? "",
          }}
        />
      </Modal>
    </>
  );
}
