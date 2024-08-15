import { NextIntlClientProvider, useMessages } from "next-intl";
import { AuthLayoutMain } from "@/components/Layout";
import { SignInForm } from "@/forms";

export default function SignInPage() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        sign_in_form: messages["sign_in_form"],
      }}
    >
      <AuthLayoutMain>
        <SignInForm />
      </AuthLayoutMain>
    </NextIntlClientProvider>
  );
}
