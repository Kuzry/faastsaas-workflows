"use client";

import { PropsWithChildren } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Logo } from "@/components";

type RootProps = PropsWithChildren;

export function AuthLayoutClient({ children }: RootProps) {
  const [opened] = useDisclosure();

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          desktop: true,
          mobile: !opened,
        },
      }}
    >
      <AppShell.Header>
        <div className="container">
          <div className="flex h-14 items-center justify-between">
            <div className="flex w-full items-center justify-center">
              <Logo />
            </div>
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
