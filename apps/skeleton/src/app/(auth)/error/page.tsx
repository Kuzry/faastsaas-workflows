import { useTranslations } from "next-intl";
import { Paper, PaperFooter, PaperHeader, PaperMain, Link } from "@/components";
import { authLinks } from "@/utils/auth";
import { Info } from "lucide-react";
import { Alert } from "@mantine/core";
import { AuthLayoutMain } from "@/components/Layout";

export default function Error({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const t = useTranslations("auth_error_page");

  return (
    <AuthLayoutMain>
      <Paper>
        <PaperHeader>
          <div className="w-full text-center font-bold">{t("header")}</div>
        </PaperHeader>
        <PaperMain>
          <Alert color="red" icon={<Info />}>
            <div>{t("p1")}</div>
            {searchParams.error && <div>{searchParams.error}</div>}
            <div>
              {t.rich("p2", {
                customer_support_e_mail_link: (chunks) => (
                  <Link
                    href={`mailto:${
                      process.env.NEXT_PUBLIC_APP_SUPPORT_E_MAIL as string
                    }`}
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </div>
          </Alert>
        </PaperMain>
        <PaperFooter>
          <div className="w-full text-center">
            <Link href={authLinks.sign_in}>{t("go_to_sign_in")}</Link>
          </div>
        </PaperFooter>
      </Paper>
    </AuthLayoutMain>
  );
}
