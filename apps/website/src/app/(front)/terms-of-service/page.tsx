import { NextIntlClientProvider, useMessages } from "next-intl";
import { FrontLayout } from "@/components/Layout";

export default function TermsOfService() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        front_layout: messages["front_layout"],
      }}
    >
      <FrontLayout>
        <div className="container">
          <h1>Terms of Service</h1>
        </div>
      </FrontLayout>
    </NextIntlClientProvider>
  );
}
