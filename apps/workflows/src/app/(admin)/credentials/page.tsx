import { AddCredential } from "@/app/(admin)/credentials/AddCredential";
import {
  AdminLayoutContainer,
  AdminLayoutSection,
  AdminLayoutTitle,
} from "@/components/Layout";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { CredentialsList } from "@/app/(admin)/credentials/CredentialsList";

export default function Credentials() {
  const t = useTranslations("credentials_page"),
    messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        credentials_page: messages["credentials_page"],
        add_credential_form: messages["add_credential_form"],
        app_credential_form: messages["app_credential_form"],
        credentials: messages["credentials"],
      }}
    >
      <AdminLayoutContainer>
        <AdminLayoutTitle rightSection={<AddCredential />}>
          {t("title")}
        </AdminLayoutTitle>
        <AdminLayoutSection>
          <CredentialsList />
        </AdminLayoutSection>
      </AdminLayoutContainer>
    </NextIntlClientProvider>
  );
}
