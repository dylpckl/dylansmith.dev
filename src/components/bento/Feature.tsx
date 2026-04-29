"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FeatureProps = {
  verb: string;
  tag: string;
  stat: string;
  statUnit?: string;
  subtitle: ReactNode;
  graphic?: ReactNode;
  graphicPosition?: "right" | "below";
  className?: string;
};

const baseClasses =
  "group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-slate-800/60 p-6 ring-1 ring-slate-700 backdrop-blur-sm transition-all duration-300 hover:ring-teal-300/60";

export function Feature({
  verb,
  tag,
  stat,
  statUnit,
  subtitle,
  graphic,
  graphicPosition = "right",
  className,
}: FeatureProps) {
  const isBelow = graphicPosition === "below";

  return (
    <div className={cn(baseClasses, className)}>
      <div className="flex items-start justify-between gap-4 text-slate-400">
        <span className="font-mono text-xs uppercase tracking-widest md:text-sm">
          {verb}
        </span>
        <span className="text-right font-mono text-xs uppercase tracking-widest md:text-sm">
          {tag}
        </span>
      </div>

      <div
        className={cn(
          "flex flex-1 gap-6",
          isBelow
            ? "flex-col"
            : "flex-col lg:flex-row lg:items-start lg:justify-between",
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-baseline gap-3">
            <span className="font-sans text-6xl font-bold leading-none text-slate-100 lg:text-7xl">
              {stat}
            </span>
            {statUnit && (
              <span className="font-sans text-2xl font-medium leading-none text-slate-300 lg:text-3xl">
                {statUnit}
              </span>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 lg:text-base">
            {subtitle}
          </p>
        </div>
        {graphic && (
          <div className={cn(isBelow ? "w-full" : "shrink-0 self-stretch")}>
            {graphic}
          </div>
        )}
      </div>
    </div>
  );
}
