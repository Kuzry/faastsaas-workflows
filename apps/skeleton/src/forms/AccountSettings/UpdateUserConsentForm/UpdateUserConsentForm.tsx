import { createSupabaseServerClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import { UpdateUserConsentFormClient } from "./UpdateUserConsentForm.client";
import { Skeleton } from "@mantine/core";
import { Paper, PaperHeader, PaperMain } from "@/components";
import { useTranslations } from "next-intl";

export function UpdateUserConsentForm() {
  const t = useTranslations("update_user_consent_form");

  return (
    <Paper>
      <PaperHeader>
        <div className="w-full font-bold">{t("header")}</div>
      </PaperHeader>
      <PaperMain>
        <div className="pb-4">{t("description")}</div>
        <Suspense fallback={<Skeleton className="h-[20px] w-[42px]" />}>
          <UpdateUserConsentFormAsync />
        </Suspense>
      </PaperMain>
    </Paper>
  );
}

async function UpdateUserConsentFormAsync() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <UpdateUserConsentFormClient consent={user?.user_metadata.consent} />;
}
