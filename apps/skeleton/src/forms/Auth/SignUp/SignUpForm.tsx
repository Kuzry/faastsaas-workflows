import { SignUpFormClient } from "@/forms/Auth/SignUp/SignUpForm.client";
import { Paper, PaperFooter, PaperHeader, PaperMain, Link } from "@/components";
import { authLinks } from "@/utils/auth";
import { useTranslations } from "next-intl";

export function SignUpForm() {
  const t = useTranslations("sign_up_form");

  return (
    <Paper>
      <PaperHeader>
        <div className="w-full text-center font-bold">{t("header")}</div>
      </PaperHeader>
      <PaperMain>
        <SignUpFormClient />
      </PaperMain>
      <PaperFooter>
        <div className="w-full text-center">
          <Link href={authLinks.sign_in}>{t("has_account")}</Link>
        </div>
      </PaperFooter>
    </Paper>
  );
}
