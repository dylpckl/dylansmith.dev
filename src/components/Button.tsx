"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-teal-300 text-teal-900 hover:bg-teal-200 ring-1 ring-transparent",
  ghost:
    "bg-slate-800/60 text-slate-300 ring-1 ring-slate-700 hover:bg-slate-800 hover:text-teal-300 hover:ring-teal-300/60 backdrop-blur-sm",
};

const sizes = {
  // Square 40px icon button. Constrains nested SVGs to 18px regardless of source markup.
  icon: "h-10 w-10 [&>svg]:h-[18px] [&>svg]:w-[18px]",
  // Pill with text + optional icon — same 40px height as the icon variant.
  default: "h-10 px-3 [&>svg]:h-[18px] [&>svg]:w-[18px]",
};

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
};

export function Button({
  variant = "ghost",
  size = "default",
  className,
  children,
  href,
  target,
  rel,
  onClick,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-mono text-xs font-semibold uppercase tracking-widest transition focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-900",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
