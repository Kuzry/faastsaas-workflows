import { LemonSqueezyOverlayButtonClient } from "@/components/LemonSqueezy/LemonSqueezyOverlayButton/LemonSqueezyOverlayButton.client";
import { PropsWithChildren } from "react";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function LemonSqueezyOverlayButton({
  children,
}: PropsWithChildren) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <LemonSqueezyOverlayButtonClient
      userName={user?.user_metadata.name}
      userEMail={user?.email ?? ""}
    >
      {children}
    </LemonSqueezyOverlayButtonClient>
  );
}
