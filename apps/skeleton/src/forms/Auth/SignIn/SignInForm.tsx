import { SignInFormClient } from "@/forms/Auth/SignIn/SignInForm.client";
import { Paper, PaperFooter, PaperHeader, PaperMain, Link } from "@/components";
import { authLinks } from "@/utils/auth";
import { useTranslations } from "next-intl";

export function SignInForm() {
  const t = useTranslations("sign_in_form");

  return (
    <Paper>
      <PaperHeader>
        <div className="w-full text-center font-bold">{t("header")}</div>
      </PaperHeader>
      <PaperMain>
        <SignInFormClient />
      </PaperMain>
      <PaperFooter>
        <div className="w-full text-center">
          <Link href={authLinks.sign_up}>{t("not_have_account")}</Link>
        </div>
      </PaperFooter>
    </Paper>
  );
}
