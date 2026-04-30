import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagIntent = "default" | "teal" | "orange";
type TagSize = "xs" | "sm" | "md";
type TagVariant = "solid" | "tinted";

type TagProps = {
  intent?: TagIntent;
  size?: TagSize;
  variant?: TagVariant;
  className?: string;
  children: ReactNode;
};

const BASE =
  "inline-flex items-center font-mono uppercase tracking-widest whitespace-nowrap";

const SIZE: Record<TagSize, string> = {
  xs: "rounded px-1.5 py-0.5 text-[10px]",
  sm: "rounded px-2 py-1 text-[10px]",
  md: "rounded-md px-3 py-1.5 text-xs",
};

// Solid: dark bg with intent-colored text + ring. Reads on busy backgrounds.
const SOLID: Record<TagIntent, string> = {
  default: "bg-slate-800 text-slate-300 ring-1 ring-slate-700",
  teal: "bg-slate-900/70 text-teal-200 ring-1 ring-teal-300/30",
  orange: "bg-slate-900/70 text-orange-200 ring-1 ring-orange-300/30",
};

// Tinted: translucent intent-colored bg, no ring. For nested labels inside an
// already-colored container.
const TINTED: Record<TagIntent, string> = {
  default: "bg-slate-700/40 text-slate-300",
  teal: "bg-teal-300/20 text-teal-200",
  orange: "bg-orange-300/20 text-orange-200",
};

export function Tag({
  intent = "default",
  size = "sm",
  variant = "solid",
  className,
  children,
}: TagProps) {
  const intentClasses = variant === "solid" ? SOLID[intent] : TINTED[intent];
  return (
    <span className={cn(BASE, SIZE[size], intentClasses, className)}>
      {children}
    </span>
  );
}

type TagGroupProps = {
  tags: string[];
  intent?: TagIntent;
  size?: TagSize;
  variant?: TagVariant;
  className?: string;
  tagClassName?: string;
};

export function TagGroup({
  tags,
  intent,
  size,
  variant,
  className,
  tagClassName,
}: TagGroupProps) {
  if (!tags.length) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {tags.map((t) => (
        <Tag
          key={t}
          intent={intent}
          size={size}
          variant={variant}
          className={tagClassName}
        >
          {t}
        </Tag>
      ))}
    </div>
  );
}
