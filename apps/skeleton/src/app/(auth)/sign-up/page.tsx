import { NextIntlClientProvider, useMessages } from "next-intl";
import { AuthLayoutMain } from "@/components/Layout";
import { SignUpForm } from "@/forms";

export default function SignUpPage() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        sign_up_form: messages["sign_up_form"],
      }}
    >
      <AuthLayoutMain>
        <SignUpForm />
      </AuthLayoutMain>
    </NextIntlClientProvider>
  );
}
