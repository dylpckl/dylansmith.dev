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
        "inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-slate-300",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-teal-300" />
      {children}
    </Tag>
  );
}
