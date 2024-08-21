import {
  AdminLayoutContainer,
  AdminLayoutSection,
  AdminLayoutTitle,
} from "@/components/Layout";
import { NextIntlClientProvider } from "next-intl";
import { selectWorkflowById } from "@/utils/supabase/helpers/workflows";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";

export default async function Workflow({ params }: { params: { id: string } }) {
  const t = await getTranslations("workflow_page"),
    messages = await getMessages();

  const workflow = await selectWorkflowById(
    createSupabaseServerClient(),
    params.id
  );

  if (!workflow) {
    return notFound();
  }

  return (
    <NextIntlClientProvider
      messages={{
        workflow_page: messages["workflow_page"],
      }}
    >
      <AdminLayoutContainer>
        <AdminLayoutTitle>
          {t("title", {
            name: workflow.name,
          })}
        </AdminLayoutTitle>
        <AdminLayoutSection></AdminLayoutSection>
      </AdminLayoutContainer>
    </NextIntlClientProvider>
  );
}
