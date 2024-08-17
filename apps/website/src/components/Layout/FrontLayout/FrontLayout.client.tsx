"use client";

import { useTranslations } from "next-intl";
import { AppShell, Burger, Button } from "@mantine/core";
import { Link, Menu, MenuItem, MenuLink, Logo } from "@/components";
import { authLinks } from "@/utils/auth";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";

type RootProps = PropsWithChildren;

export function FrontLayoutClient({ children }: RootProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header>
        <div className="container">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="md"
                size="sm"
                className="mr-4"
              />
              <Logo />
              <div className="ml-8 hidden md:flex">
                <MainMenu toggle={toggle} />
              </div>
            </div>
            <div className="hidden gap-4 md:flex">
              <FrontLayoutClientAuthButtons />
            </div>
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar className="border-0">
        <div className="container flex flex-col gap-4 py-4">
          <MainMenu toggle={toggle} orientation="vertical" />
          <FrontLayoutClientAuthButtons />
        </div>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export function FrontLayoutClientAuthButtons() {
  const t = useTranslations("front_layout");

  return (
    <>
      <Button variant="outline" component={Link} href={authLinks.sign_in}>
        {t("special_button.sign_in")}
      </Button>
      <Button component={Link} href={authLinks.sign_up} className="text-white">
        {t("special_button.sign_up")}
      </Button>
    </>
  );
}

function MainMenu({
  toggle,
  orientation = "horizontal",
}: {
  toggle: () => void;
  orientation?: "vertical" | "horizontal";
}) {
  const t = useTranslations("front_layout");

  return (
    <Menu onLinkClick={() => toggle()} orientation={orientation}>
      <MenuItem>
        <MenuLink href="/">{t("menu.home.label")}</MenuLink>
      </MenuItem>
      <MenuItem>
        <MenuLink href="/docs/introduction" compareTo="/docs">
          {t("menu.docs.label")}
        </MenuLink>
      </MenuItem>
    </Menu>
  );
}
