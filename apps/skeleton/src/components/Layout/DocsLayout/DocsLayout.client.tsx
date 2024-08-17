"use client";

import { PropsWithChildren } from "react";
// import { useDisclosure } from "@mantine/hooks";

type DocsLayoutProps = PropsWithChildren;

export function DocsLayoutClient({ children }: DocsLayoutProps) {
  // const [opened, { toggle }] = useDisclosure();

  return <>{children}</>;
}
