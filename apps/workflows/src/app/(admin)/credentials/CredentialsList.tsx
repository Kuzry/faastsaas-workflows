import { Suspense } from "react";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { ActionIcon, Tooltip } from "@mantine/core";
import { CircleCheck, CircleX, Inbox, TriangleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Paper, PaperMain, DefaultSkeleton } from "@/components";
import {
  CredentialFormDialog,
  CredentialRemove,
} from "@/app/(admin)/credentials/CredentialsList.client";
import { TCredentialStatus, TCredentialStatusName } from "@/types";
import { selectAllCredentialsOrderByCreatedAt } from "@/utils/supabase/helpers/credentials";

export function CredentialsList() {
  return (
    <Suspense fallback={<DefaultSkeleton />}>
      <CredentialsListAsync />
    </Suspense>
  );
}

async function CredentialsListAsync() {
  const t = await getTranslations("credentials_page");

  const credentials = await selectAllCredentialsOrderByCreatedAt(
    createSupabaseServerClient()
  );

  return (
    <>
      {credentials?.length !== 0 ? (
        credentials.map((credential, key) => (
          <Paper key={key}>
            <PaperMain className="flex-row items-center justify-between p-0">
              <CredentialFormDialog credential={credential} />
              <div className="flex items-center gap-1 pr-3.5">
                <CredentialStatus
                  status={
                    (credential.status as unknown as TCredentialStatus).name
                  }
                />
                <CredentialRemove credential={credential} />
              </div>
            </PaperMain>
          </Paper>
        ))
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-gray">
          <ActionIcon
            size="xl"
            color="gray"
            variant="light"
            className="cursor-default"
          >
            <Inbox />
          </ActionIcon>
          <div>{t("credentials_list.empty_state")}</div>
        </div>
      )}
    </>
  );
}

async function CredentialStatus({ status }: { status: TCredentialStatusName }) {
  const t = await getTranslations("credentials_page");

  return (
    <>
      <Tooltip
        label={t(`credentials_list.credential_status.${status}`)}
        withArrow
      >
        <div>
          {status === "connected" && (
            <CircleCheck size={16} className="text-green" />
          )}
          {status === "not_connected" && (
            <TriangleAlert size={16} className="text-yellow" />
          )}
          {status === "error" && <CircleX size={16} className="text-red" />}
        </div>
      </Tooltip>
    </>
  );
}
