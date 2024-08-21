import { Suspense } from "react";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { DefaultSkeleton, Link, Paper, PaperMain } from "@/components";
import { ActionIcon } from "@mantine/core";
import { Inbox } from "lucide-react";
import { selectAllWorkflowsOrderByCreatedAt } from "@/utils/supabase/helpers/workflows";
import { getTranslations } from "next-intl/server";
import { WorkflowRemove } from "./WorkflowsList.client";

export function WorkflowsList() {
  return (
    <Suspense fallback={<DefaultSkeleton />}>
      <WorkflowsListAsync />
    </Suspense>
  );
}

async function WorkflowsListAsync() {
  const t = await getTranslations("workflows_page");

  const workflows = await selectAllWorkflowsOrderByCreatedAt(
    createSupabaseServerClient()
  );

  return (
    <>
      {workflows?.length !== 0 ? (
        workflows.map((workflow, key) => (
          <Paper key={key}>
            <PaperMain className="flex-row items-center justify-between p-0">
              <Link
                className="flex-1 cursor-pointer px-3.5 py-3 text-gray-9"
                href={`/workflows/${workflow.id}`}
              >
                {workflow.name}
              </Link>
              <div className="flex items-center gap-1 pr-3.5">
                <WorkflowRemove workflow={workflow} />
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
          <div>{t("workflows_list.empty_state")}</div>
        </div>
      )}
    </>
  );
}
