import { Skeleton } from "@mantine/core";

export function DefaultSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-[75%]" />
      <Skeleton className="h-8 w-[50%]" />
      <Skeleton className="h-8 w-[25%]" />
    </div>
  );
}
