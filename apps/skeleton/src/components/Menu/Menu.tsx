"use client";

import {
  createContext,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useContext,
  MouseEvent as ReactMouseEvent,
} from "react";
import { cx } from "@/utils/cx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

interface MenuContextProps {
  classNames?: {
    root?: string;
    item?: string;
    link?: string;
    dummyLink?: string;
  };
  onLinkClick?: () => void;
}

const MenuContext = createContext<MenuContextProps>({});

function useMenuContext() {
  return useContext(MenuContext);
}

function MenuContextProvider({
  classNames,
  onLinkClick,
  children,
}: PropsWithChildren<MenuContextProps>) {
  return (
    <MenuContext.Provider
      value={{
        classNames,
        onLinkClick,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

type RootProps = PropsWithChildren<{
  orientation?: "vertical" | "horizontal";
  className?: string;
}>;

export function Menu({
  children,
  classNames,
  onLinkClick,
  ...props
}: PropsWithChildren<RootProps & MenuContextProps>) {
  return (
    <MenuContextProvider classNames={classNames} onLinkClick={onLinkClick}>
      <RootInner {...props}>{children}</RootInner>
    </MenuContextProvider>
  );
}

function RootInner({
  orientation = "horizontal",
  className,
  children,
}: RootProps) {
  const menuContext = useMenuContext();

  return (
    <ul
      className={cx(
        "m-0 flex list-none gap-4 p-0",
        orientation === "vertical" && "flex-col",
        menuContext.classNames?.root,
        className
      )}
    >
      {children}
    </ul>
  );
}

export function MenuItem({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const menuContext = useMenuContext();
  return (
    <li className={cx("", menuContext.classNames?.item, className)}>
      {children}
    </li>
  );
}

export interface TMenuLink extends PropsWithChildren {
  href: string;
  icon?: ReactNode;
  hrefComparison?: "exact" | "startsWith";
  links?: TMenuLink[];
  target?: "_blank";
}

export const MenuLink = forwardRef<
  HTMLAnchorElement,
  {
    className?: string;
    onClick?: (e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    compareTo?: string;
  } & TMenuLink
>(
  (
    {
      href,
      target,
      hrefComparison = "startsWith",
      icon,
      className,
      children,
      compareTo,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();

    const isCurrentPage = () => {
      const h = compareTo ? compareTo : href;
      if (h !== "/" && hrefComparison === "startsWith") {
        return pathname.startsWith(h ?? "");
      }

      return pathname === h;
    };

    const menuContext = useMenuContext();

    return (
      <NextLink
        ref={ref}
        href={href}
        target={target}
        className={cx(
          isCurrentPage() && "active",
          "flex items-center gap-2 text-sm text-gray-9 no-underline transition [&.active]:text-primary-7",
          menuContext.classNames?.link,
          className
        )}
        {...props}
        onClick={(e) => {
          props.onClick?.(e);
          menuContext.onLinkClick?.();
        }}
      >
        {icon && <>{icon}</>}
        {children}
      </NextLink>
    );
  }
);
MenuLink.displayName = "MenuLink";

export function MenuDummyLink({
  icon,
  className,
  children,
}: { className?: string } & Omit<
  TMenuLink,
  "href" | "target" | "hrefComparison"
>) {
  const menuContext = useMenuContext();
  return (
    <div
      className={cx(
        "text-foreground flex items-center text-sm",
        menuContext.classNames?.dummyLink,
        className
      )}
    >
      {icon && <>{icon}</>}
      {children}
    </div>
  );
}
