import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { Link } from "@/components";

export function MDXComponent({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Component
      components={{
        Link,
      }}
    />
  );
}
