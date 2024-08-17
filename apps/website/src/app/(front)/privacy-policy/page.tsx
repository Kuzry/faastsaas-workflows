import { NextIntlClientProvider, useMessages } from "next-intl";
import { FrontLayout } from "@/components/Layout";

export default function PrivacyPolicy() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        front_layout: messages["front_layout"],
      }}
    >
      <FrontLayout>
        <div className="container">
          <h1>Privacy Policy</h1>
        </div>
      </FrontLayout>
    </NextIntlClientProvider>
  );
}
