import { PropsWithChildren, Suspense } from "react";
import {
  AdminLayoutClient,
  AdminLayoutClientTitle,
  AdminLayoutProvider,
  AdminLayoutClientUserButton,
  AdminLayoutClientTitleProps,
} from "@/components/Layout/AdminLayout/AdminLayout.client";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { Skeleton } from "@mantine/core";

type AdminLayoutProps = PropsWithChildren;

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminLayoutProvider>
      <AdminLayoutClient
        userButton={
          <Suspense fallback={<Skeleton className="h-[78px]" />}>
            <AdminLayoutUserButtonAsync />
          </Suspense>
        }
      >
        {children}
      </AdminLayoutClient>
    </AdminLayoutProvider>
  );
}

export function AdminLayoutContainer({ children }: PropsWithChildren) {
  return <div className="container max-w-[1200px] pb-8">{children}</div>;
}

export function AdminLayoutTitle({
  children,
  ...rest
}: AdminLayoutClientTitleProps) {
  return <AdminLayoutClientTitle {...rest}>{children}</AdminLayoutClientTitle>;
}

async function AdminLayoutUserButtonAsync() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AdminLayoutClientUserButton
      name={user?.user_metadata.name}
      eMail={user?.email ?? ""}
    />
  );
}

export function AdminLayoutSection({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
