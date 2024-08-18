import { PropsWithChildren } from "react";
import { cx } from "@/utils/cx";

export function Paper({ children }: PropsWithChildren) {
  return (
    <div className="min-w-full rounded border border-gray-3 bg-white font-normal shadow-[0_1px_3px_rgba(0,0,0,.01),0_1px_2px_rgba(0,0,0,.05)]">
      {children}
    </div>
  );
}

export function PaperHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-12 items-center justify-between rounded-t border-b border-b-gray-2 px-4 py-2 text-sm">
      {children}
    </div>
  );
}

interface PaperMainProps extends PropsWithChildren {
  className?: string;
}

export function PaperMain({ className, children }: PaperMainProps) {
  return (
    <div className={cx("flex flex-col overflow-scroll rounded p-4", className)}>
      {children}
    </div>
  );
}

export function PaperFooter({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-12 flex-row-reverse items-center rounded-b border-t border-t-gray-2 px-4 py-2 text-sm">
      {children}
    </div>
  );
}
