"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/Tag";
import { CountUp } from "@/components/CountUp";
import { Canvas, Ruler } from "@/components/canvas";

type FeatureProps = {
  tags: string[];
  stat: string;
  statUnit?: string;
  subtitle: ReactNode;
  graphic?: ReactNode;
  graphicPosition?: "right" | "below";
  className?: string;
  measured?: boolean;
};

const baseClasses =
  "group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-slate-900/80 p-6 ring-1 ring-slate-700 backdrop-blur-sm transition-all duration-300 hover:ring-teal-300/60";

export function Feature({
  tags,
  stat,
  statUnit,
  subtitle,
  graphic,
  graphicPosition = "right",
  className,
  measured = false,
}: FeatureProps) {
  const isBelow = graphicPosition === "below";

  const statRow = measured ? (
    <Ruler className="flex w-fit items-baseline gap-3">
      <Ruler.Guideline edge="top" />
      <Ruler.Guideline edge="right" />
      <Ruler.Target edge="bottom" />
      <CountUp
        to={stat}
        className="font-sans text-4xl font-bold leading-none text-slate-100 xl:text-5xl 2xl:text-6xl"
      />
      {statUnit && (
        <span className="font-sans text-lg font-medium leading-none text-slate-300 xl:text-xl 2xl:text-2xl">
          {statUnit}
        </span>
      )}
    </Ruler>
  ) : (
    <div className="flex items-baseline gap-3">
      <CountUp
        to={stat}
        className="font-sans text-4xl font-bold leading-none text-slate-100 xl:text-5xl 2xl:text-6xl"
      />
      {statUnit && (
        <span className="font-sans text-lg font-medium leading-none text-slate-300 xl:text-xl 2xl:text-2xl">
          {statUnit}
        </span>
      )}
    </div>
  );

  const body = (
    <>
      <div className="hidden flex-wrap justify-end gap-1.5 text-slate-400 md:flex">
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
          {statRow}
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {subtitle}
          </p>
        </div>
        {graphic && (
          <div className={cn(isBelow ? "w-full" : "shrink-0 self-stretch")}>
            {graphic}
          </div>
        )}
      </div>
    </>
  );

  if (measured) {
    return <Canvas className={cn(baseClasses, className)}>{body}</Canvas>;
  }
  return <div className={cn(baseClasses, className)}>{body}</div>;
}
