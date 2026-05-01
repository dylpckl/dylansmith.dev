"use client";

import {
  createContext,
  useContext,
  useRef,
  type ElementType,
  type PropsWithChildren,
} from "react";

import { useDimensions } from "@/lib/useDimensions";
import { cn } from "@/lib/utils";

import { Guideline } from "./Guideline";
import { Target } from "./Target";

type RulerDimensions = { width: number; height: number };

const RulerContext = createContext<RulerDimensions | null>(null);

export function useRuler(consumer: string): RulerDimensions {
  const ctx = useContext(RulerContext);
  if (!ctx) {
    throw new Error(`<${consumer}> must be rendered inside <Ruler>.`);
  }
  return ctx;
}

type RulerProps = PropsWithChildren<{
  as?: ElementType;
  className?: string;
}>;

function RulerRoot({ as: Tag = "div", className, children }: RulerProps) {
  const ref = useRef<HTMLElement>(null);
  const dims = useDimensions(ref);

  return (
    <Tag ref={ref} className={cn("relative", className)}>
      <RulerContext.Provider value={dims}>{children}</RulerContext.Provider>
    </Tag>
  );
}

export const Ruler = Object.assign(RulerRoot, {
  Guideline,
  Target,
});
