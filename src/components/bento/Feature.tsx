"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/Tag";
import { CountUp } from "@/components/CountUp";

type FeatureProps = {
  tags: string[];
  stat: string;
  statUnit?: string;
  subtitle: ReactNode;
  graphic?: ReactNode;
  graphicPosition?: "right" | "below";
  className?: string;
};

const baseClasses =
  "group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-line/25 backdrop-blur-sm transition-all duration-300 hover:ring-accent/60";

export function Feature({
  tags,
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
      <div className="hidden flex-wrap justify-end gap-1.5 text-ink-3 md:flex">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div
        className={cn(
          "flex flex-1 gap-6",
          isBelow
            ? "flex-col justify-between"
            : "flex-col lg:flex-row lg:items-start lg:justify-between",
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-baseline gap-3">
            <CountUp
              to={stat}
              className="font-sans text-5xl font-bold leading-none text-ink lg:text-6xl xl:text-7xl 2xl:text-8xl"
            />
            {statUnit && (
              <span className="font-sans text-lg font-medium leading-none text-ink-2 lg:text-2xl xl:text-3xl 2xl:text-4xl">
                {statUnit}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
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
