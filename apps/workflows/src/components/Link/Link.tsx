import NextLink from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";
import { cx } from "@/utils/cx";
import { LinkProps } from "next/dist/client/link";

export const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, className, href, ...props }, ref) => {
  return (
    <NextLink
      ref={ref}
      {...props}
      className={cx("text-primary no-underline", className)}
      href={href}
    >
      {children}
    </NextLink>
  );
});
Link.displayName = "Link";
