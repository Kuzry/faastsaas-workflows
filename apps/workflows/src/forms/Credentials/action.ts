"use server";

import { createServerAction } from "zsa";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { deleteCredentialById } from "@/utils/supabase/helpers/credentials";

export const selectCredentialByIdAction = createServerAction()
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    const credential = await supabase
      .from("credentials")
      .select()
      .eq("id", input.id)
      .maybeSingle();

    revalidatePath("/account/credentials");

    return credential;
  });

export const deleteCredentialAction = createServerAction()
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    const supabase = createSupabaseServerClient();

    await deleteCredentialById(supabase, input.id);

    revalidatePath("/account/credentials");

    return {
      success: true,
    };
  });
