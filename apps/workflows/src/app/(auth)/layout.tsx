import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { AuthLayout } from "@/components/Layout";

export default function Layout({
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
      <AuthLayout>{children}</AuthLayout>
    </NextIntlClientProvider>
  );
}
