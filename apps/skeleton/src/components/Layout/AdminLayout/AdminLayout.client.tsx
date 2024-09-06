"use client";

import {
  createContext,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  ScrollArea,
  Menu as MantineMenu,
  UnstyledButton,
} from "@mantine/core";
import { Menu, MenuItem, MenuLink, Logo } from "@/components";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { authLinks } from "@/utils/auth";

const AdminLayoutContext = createContext<{
  opened: boolean;
  toggle: MouseEventHandler<HTMLButtonElement>;
  close: () => void;
}>({
  opened: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close: () => {},
});

const useAdminLayoutContext = () => {
  return useContext(AdminLayoutContext);
};

export const AdminLayoutProvider = ({ children }: PropsWithChildren) => {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AdminLayoutContext.Provider
      value={{
        opened,
        toggle,
        close,
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
};

type RootProps = {
  userButton: ReactNode;
} & PropsWithChildren;

export function AdminLayoutClient({ children, userButton }: RootProps) {
  const t = useTranslations("admin_layout");
  const { opened, toggle, close } = useAdminLayoutContext();

  const pathname = usePathname();

  useEffect(() => {
    close();
  }, [close, pathname]);

  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Navbar className="border-0 shadow-[1px_0_3px_rgba(0,0,0,.01),1px_0_2px_rgba(0,0,0,.03)] md:border-r">
        <AppShell.Section className="border-b border-b-gray-9/10">
          <div className="container flex min-h-14 items-center">
            <Burger
              opened={opened}
              hiddenFrom="md"
              size="sm"
              className="mr-4"
              onClick={toggle}
            />
            <Logo />
          </div>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <div className="flex w-full py-0.5">
            <Menu
              classNames={{
                root: "flex-col w-full gap-0.5",
                link: "py-2 px-2 mx-0.5 hover:bg-gray-3/50 rounded",
              }}
            >
              <MenuItem>
                <MenuLink href={authLinks.dashboard} hrefComparison="exact">
                  {t("menu.dashboard.label")}
                </MenuLink>
              </MenuItem>
            </Menu>
          </div>
        </AppShell.Section>
        <AppShell.Section className="border-t border-t-gray-9/10">
          <div className="flex items-center p-0.5">
            <MantineMenu
              withArrow
              offset={4}
              width={230}
              classNames={{
                arrow: "border border-gray-9/10",
                item: 'data-[hovered="true"]:bg-gray-3/50',
                dropdown: "w-[260px] border border-gray-9/10 p-0.5",
              }}
            >
              {userButton}
              <MantineMenu.Dropdown className="">
                <Menu
                  orientation="vertical"
                  classNames={{
                    root: "gap-0.5",
                    link: "rounded w-full p-2",
                  }}
                >
                  <MenuItem>
                    <MantineMenu.Item component={MenuLink} href="/settings">
                      {t("menu.settings.label")}
                    </MantineMenu.Item>
                  </MenuItem>
                  <MenuItem>
                    <MantineMenu.Item component={MenuLink} href="/billing">
                      {t("menu.billing.label")}
                    </MantineMenu.Item>
                  </MenuItem>
                  <MenuItem>
                    <MantineMenu.Divider />
                  </MenuItem>
                  <MenuItem>
                    <MantineMenu.Item
                      component={MenuLink}
                      href={authLinks.logout}
                      className='text-red hover:text-red data-[hovered="true"]:bg-red-2/50'
                    >
                      {t("menu.log_out.label")}
                    </MantineMenu.Item>
                  </MenuItem>
                </Menu>
              </MantineMenu.Dropdown>
            </MantineMenu>
          </div>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export type AdminLayoutClientTitleProps = {
  rightSection?: ReactNode;
  bottomSection?: ReactNode;
} & PropsWithChildren;

export function AdminLayoutClientTitle({
  children,
  rightSection,
  bottomSection,
}: AdminLayoutClientTitleProps) {
  const { toggle } = useAdminLayoutContext();

  return (
    <div className="mb-4 border-b border-gray-3">
      <div className="flex flex-col items-start xs:flex-row xs:items-center">
        <div className="flex h-14 items-center">
          <Burger hiddenFrom="md" size="sm" className="mr-4" onClick={toggle} />
          <div className="my-0 font-bold">{children}</div>
        </div>
        {rightSection && (
          <div className="mb-4 flex w-full flex-1 xs:mb-0 xs:w-auto xs:flex-row-reverse">
            {rightSection}
          </div>
        )}
      </div>
      {bottomSection && <div>{bottomSection}</div>}
    </div>
  );
}

export function AdminLayoutClientUserButton({
  name,
  eMail,
}: {
  name: string;
  eMail: string;
}) {
  return (
    <MantineMenu.Target>
      <UnstyledButton className='w-full rounded p-4 hover:bg-gray-3/50 data-[expanded="true"]:bg-gray-3/50'>
        <div className="font-bold">{name}</div>
        <div className="text-sm">{eMail}</div>
      </UnstyledButton>
    </MantineMenu.Target>
  );
}
