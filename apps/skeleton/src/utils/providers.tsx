"use client";

import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";
import { mantine } from "@/utils/mantine";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
  mantineFontFamily: string;
} & PropsWithChildren;

export default function Providers({
  children,
  mantineFontFamily,
}: ProvidersProps) {
  mantine.theme.fontFamily = mantineFontFamily;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={mantine.theme}
        cssVariablesResolver={mantine.cssVariablesResolver}
      >
        <Notifications position="top-right" containerWidth={350} />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}
