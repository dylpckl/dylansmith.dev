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
  default: "bg-surface text-ink-2 ring-1 ring-line/25",
  teal: "bg-paper/70 text-accent ring-1 ring-accent/30",
  orange: "bg-paper/70 text-warm ring-1 ring-warm/30",
};

// Tinted: translucent intent-colored bg, no ring. For nested labels inside an
// already-colored container.
const TINTED: Record<TagIntent, string> = {
  default: "bg-surface-2/40 text-ink-2",
  teal: "bg-accent/20 text-accent",
  orange: "bg-warm/20 text-warm",
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
