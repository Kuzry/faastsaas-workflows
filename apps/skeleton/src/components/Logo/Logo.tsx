import { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import { Link } from "@/components";

export interface LogoProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export function Logo({ href = "/", className, ...props }: LogoProps) {
  return (
    <Link
      href={href}
      className={cx(
        "items-center whitespace-nowrap font-bold text-gray-8 no-underline hover:text-gray-9",
        className
      )}
      {...props}
    >
      FaastSaas
      <span className="block text-[8px] font-normal leading-[0px]">
        Early Access
      </span>
    </Link>
  );
}
