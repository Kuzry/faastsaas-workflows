import { NextIntlClientProvider, useMessages } from "next-intl";
import { AuthLayoutMain } from "@/components/Layout";
import { UpdatePasswordForm } from "@/forms";

export default function UpdatePasswordPage() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        update_password_form: messages["update_password_form"],
      }}
    >
      <AuthLayoutMain>
        <UpdatePasswordForm />
      </AuthLayoutMain>
    </NextIntlClientProvider>
  );
}
