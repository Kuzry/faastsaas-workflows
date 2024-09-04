"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { deleteWorkflowById } from "@/utils/supabase/helpers/workflows";
import { getUser } from "@/utils/auth/helpers";

export const deleteWorkflowAction = createServerAction()
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    await getUser(supabase);

    await deleteWorkflowById(supabase, input.id);

    revalidatePath("/workflows");
  });
