import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { SubscriptionInfoPaper } from "@/app/(admin)/billing/SubscriptionInfoPaper";
import {
  AdminLayoutContainer,
  AdminLayoutSection,
  AdminLayoutTitle,
} from "@/components/Layout";

export default function Billing() {
  const t = useTranslations("billing_page"),
    messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        billing_page: messages["billing_page"],
      }}
    >
      <AdminLayoutContainer>
        <AdminLayoutTitle>{t("title")}</AdminLayoutTitle>
        <AdminLayoutSection>
          <SubscriptionInfoPaper />
        </AdminLayoutSection>
      </AdminLayoutContainer>
    </NextIntlClientProvider>
  );
}
