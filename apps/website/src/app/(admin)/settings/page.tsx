import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import {
  UpdateUserConsentForm,
  UpdateUserEMailForm,
  UpdateUserNameForm,
  UpdateUserPasswordForm,
} from "@/forms";
import {
  AdminLayoutContainer,
  AdminLayoutSection,
  AdminLayoutTitle,
} from "@/components/Layout";

export default function Settings() {
  const t = useTranslations("settings_page"),
    messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        settings_page: messages["settings_page"],
        update_user_consent_form: messages["update_user_consent_form"],
        update_user_e_mail_form: messages["update_user_e_mail_form"],
        update_user_name_form: messages["update_user_name_form"],
        update_user_password_form: messages["update_user_password_form"],
      }}
    >
      <AdminLayoutContainer>
        <AdminLayoutTitle>{t("title")}</AdminLayoutTitle>
        <AdminLayoutSection>
          <UpdateUserNameForm />
          <UpdateUserEMailForm />
          <UpdateUserPasswordForm />
          <UpdateUserConsentForm />
        </AdminLayoutSection>
      </AdminLayoutContainer>
    </NextIntlClientProvider>
  );
}
