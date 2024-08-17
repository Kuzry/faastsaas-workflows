"use client";

import { Button } from "@mantine/core";
import Script from "next/script";
import { PropsWithChildren } from "react";

export function LemonSqueezyOverlayButtonClient({
  userName,
  userEMail,
  children,
}: { userName?: string; userEMail?: string } & PropsWithChildren) {
  return (
    <>
      <Button
        onClick={() => {
          window.LemonSqueezy.Url.Open(
            `https://faast-saas.lemonsqueezy.com/buy/68d02336-ced0-4e49-af45-f8fb13e7522b?embed=1&checkout[email]=${userEMail}&checkout[name]=${userName}&checkout[custom][user_email]=${userEMail}`
          );
        }}
      >
        {children}
      </Button>{" "}
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        strategy="lazyOnload"
        onLoad={() => window.createLemonSqueezy()}
      />
    </>
  );
}
