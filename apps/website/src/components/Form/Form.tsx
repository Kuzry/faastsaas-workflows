import { cx } from "@/utils/cx";
import { FormHTMLAttributes, forwardRef, PropsWithChildren } from "react";

export type FormProps = {
  className?: string;
} & PropsWithChildren;

export const Form = forwardRef<
  HTMLFormElement,
  FormProps & FormHTMLAttributes<HTMLFormElement>
>(({ className, children, ...props }, ref) => {
  return (
    <form className={cx("flex flex-col gap-4", className)} {...props} ref={ref}>
      {children}
    </form>
  );
});
Form.displayName = "Form";
