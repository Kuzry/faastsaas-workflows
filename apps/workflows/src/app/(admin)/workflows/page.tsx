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
import { WorkflowsList } from "@/app/(admin)/workflows/WorkflowsList";
import { AddWorkflow } from "@/app/(admin)/workflows/AddWorkflow";

export default function Workflows() {
  const t = useTranslations("workflows_page"),
    messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        workflows_page: messages["workflows_page"],
        add_workflow_form: messages["add_workflow_form"],
      }}
    >
      <AdminLayoutContainer>
        <AdminLayoutTitle rightSection={<AddWorkflow />}>
          {t("title")}
        </AdminLayoutTitle>
        <AdminLayoutSection>
          <WorkflowsList />
        </AdminLayoutSection>
      </AdminLayoutContainer>
    </NextIntlClientProvider>
  );
}
