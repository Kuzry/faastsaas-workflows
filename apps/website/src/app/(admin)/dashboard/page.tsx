import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import {
  AdminLayoutContainer,
  AdminLayoutSection,
  AdminLayoutTitle,
} from "@/components/Layout";

export default function Dashboard() {
  const t = useTranslations("dashboard_page"),
    messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        dashboard_page: messages["dashboard_page"],
      }}
    >
      <AdminLayoutContainer>
        <AdminLayoutTitle>{t("title")}</AdminLayoutTitle>
        <AdminLayoutSection>...content...</AdminLayoutSection>
      </AdminLayoutContainer>
    </NextIntlClientProvider>
  );
}
