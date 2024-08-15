import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { AdminLayout } from "@/components/Layout";

export default function AccountLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        admin_layout: messages["admin_layout"],
      }}
    >
      <AdminLayout>{children}</AdminLayout>
    </NextIntlClientProvider>
  );
}
