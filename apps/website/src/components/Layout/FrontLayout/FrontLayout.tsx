import { PropsWithChildren } from "react";
import { FrontLayoutClient } from "@/components/Layout/FrontLayout/FrontLayout.client";

type FrontLayoutProps = PropsWithChildren;

export function FrontLayout({ children }: FrontLayoutProps) {
  return <FrontLayoutClient>{children}</FrontLayoutClient>;
}

export function FrontLayoutContainer({ children }: PropsWithChildren) {
  return <div className="container">{children}</div>;
}

export function FrontLayoutMain({ children }: PropsWithChildren) {
  return <div className="pt-14">{children}</div>;
}

export function FrontLayoutSection({ children }: PropsWithChildren) {
  return <div className="py-4 xl:py-8">{children}</div>;
}
