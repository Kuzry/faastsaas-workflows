import { PropsWithChildren } from "react";
import { AuthLayoutClient } from "@/components/Layout/AuthLayout/AuthLayout.client";

type AuthLayoutProps = PropsWithChildren;

export function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}

export function AuthLayoutMain({ children }: PropsWithChildren) {
  return (
    <div className="container max-w-[500px] pb-8 pt-16 sm:pt-32">
      {children}
    </div>
  );
}
