import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ as: Tag = "span", children, className }: Props) {
  return (
    <Tag
      className={cn(
        "font-mono text-sm uppercase tracking-widest text-slate-300",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
