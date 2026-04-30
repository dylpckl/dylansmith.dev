"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CommonProps = {
  label: string;
  labelIcon?: LucideIcon;
  className?: string;
  children: ReactNode;
};

type TileProps =
  | (CommonProps & {
      onClickModal: () => void;
      href?: never;
      decorative?: never;
    })
  | (CommonProps & {
      href: string;
      external?: boolean;
      onClickModal?: never;
      decorative?: never;
    })
  | (CommonProps & { decorative: true; onClickModal?: never; href?: never });

const baseClasses =
  "group relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-slate-800/60 p-6 ring-1 ring-slate-700 backdrop-blur-sm";
const interactiveClasses =
  "transition-all duration-300 hover:bg-slate-800 hover:ring-teal-300/60 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-teal-300";

function TileHeader({ label, Icon }: { label: string; Icon?: LucideIcon }) {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      <span className="text-md font-mono uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export function Tile(props: TileProps) {
  const { label, labelIcon: Icon, className, children } = props;

  if ("decorative" in props && props.decorative) {
    return (
      <div className={cn(baseClasses, className)}>
        <TileHeader label={label} Icon={Icon} />
        {children}
      </div>
    );
  }

  if ("href" in props && props.href) {
    const isExternal = props.external ?? props.href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noreferrer"
          className={cn(baseClasses, interactiveClasses, className)}
        >
          <TileHeader label={label} Icon={Icon} />
          {children}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        className={cn(baseClasses, interactiveClasses, className)}
      >
        <TileHeader label={label} Icon={Icon} />
        {children}
      </Link>
    );
  }

  // onClickModal variant
  const onClick = (props as Extract<TileProps, { onClickModal: () => void }>)
    .onClickModal;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseClasses, interactiveClasses, "w-full", className)}
    >
      <TileHeader label={label} Icon={Icon} />
      {children}
    </button>
  );
}
