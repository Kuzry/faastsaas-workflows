import { NextIntlClientProvider, useMessages } from "next-intl";
import { AuthLayoutMain } from "@/components/Layout";
import { ResetPasswordForm } from "@/forms";

export default function ResetPasswordPage() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        reset_password_form: messages["reset_password_form"],
      }}
    >
      <AuthLayoutMain>
        <ResetPasswordForm />
      </AuthLayoutMain>
    </NextIntlClientProvider>
  );
}
