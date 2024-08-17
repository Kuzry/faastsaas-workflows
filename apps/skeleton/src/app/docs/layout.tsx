import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { DocsLayout } from "@/components/Layout";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        front_layout: messages["front_layout"],
        docs_layout: messages["docs_layout"],
        doc_page: messages["doc_page"],
      }}
    >
      <DocsLayout>{children}</DocsLayout>
    </NextIntlClientProvider>
  );
}
