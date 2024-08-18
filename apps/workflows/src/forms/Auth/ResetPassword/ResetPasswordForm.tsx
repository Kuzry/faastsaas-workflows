import { ResetPasswordFormClient } from "@/forms/Auth/ResetPassword/ResetPasswordForm.client";
import { Paper, PaperFooter, PaperHeader, PaperMain, Link } from "@/components";
import { authLinks } from "@/utils/auth";
import { useTranslations } from "next-intl";

export function ResetPasswordForm() {
  const t = useTranslations("reset_password_form");

  return (
    <Paper>
      <PaperHeader>
        <div className="w-full text-center font-bold">{t("header")}</div>
      </PaperHeader>
      <PaperMain>
        <ResetPasswordFormClient />
      </PaperMain>
      <PaperFooter>
        <div className="w-full text-center">
          <Link href={authLinks.sign_in}>{t("return_to_sign_in")}</Link>
        </div>
      </PaperFooter>
    </Paper>
  );
}
