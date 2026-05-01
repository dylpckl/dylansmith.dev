import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: Props) {
  return (
    <span
      className={cn(
        "font-mono text-sm uppercase tracking-widest text-slate-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
