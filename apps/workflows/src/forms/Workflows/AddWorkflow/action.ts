"use server";

import { createServerAction } from "zsa";
import { getAddWorkflowFormSchema } from "@/forms/Workflows/AddWorkflow/schema";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { insertWorkflow } from "@/utils/supabase/helpers/workflows";
import { getUser } from "@/utils/auth/helpers";
import { headers } from "next/headers";

export const addWorkflowAction = createServerAction()
  .input(async () =>
    getAddWorkflowFormSchema(await getTranslations("add_workflow_form"))
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const user = await getUser(supabase);

    const workflow = await insertWorkflow(supabase, {
      user_id: user?.id ?? "",
      name: input.name,
      data: {},
    });

    revalidatePath("/", "layout");

    return {
      data: {
        redirect_to: `${headers().get("origin")}/workflows/${workflow?.id}`,
      },
    };
  });
