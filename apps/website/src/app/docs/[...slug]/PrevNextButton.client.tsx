"use client";

import { Link } from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@mantine/core";

interface PrevNextButtonProps {
  type: "prev" | "next";
  href: string;
  label: string;
  title: string;
}

export function PrevNextButtonClient({
  type,
  href,
  label,
  title,
}: PrevNextButtonProps) {
  return (
    <Button
      variant="outline"
      component={Link}
      href={href}
      className={`flex h-20 w-1/2 ${type === "prev" ? "justify-start" : "justify-end"}`}
      classNames={{
        label: `flex flex-col gap-1 justify-center ${type === "prev" ? "items-start" : "items-end"}`,
      }}
    >
      <div
        className={`flex items-center gap-0.5 text-left text-sm text-gray-7`}
      >
        {type === "prev" && <ChevronLeft size={14} />}
        {label}
        {type === "next" && <ChevronRight size={14} />}
      </div>
      <div className={`${type === "prev" ? "ml-1" : "mr-1"}`}>{title}</div>
    </Button>
  );
}
