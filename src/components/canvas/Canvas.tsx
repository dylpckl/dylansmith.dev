"use client";

import {
  createContext,
  useContext,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

import { useDimensions } from "@/lib/useDimensions";
import { cn } from "@/lib/utils";

type Dimensions = { width: number; height: number };

const CanvasContext = createContext<Dimensions | null>(null);

export function useCanvas(consumer: string): Dimensions {
  const ctx = useContext(CanvasContext);
  if (!ctx) {
    throw new Error(`<${consumer}> must be rendered inside <Canvas>.`);
  }
  return ctx;
}

type CanvasProps = {
  as?: ElementType;
  className?: string;
  id?: string;
  children: ReactNode;
};

export function Canvas({
  as: Tag = "div",
  className,
  children,
  ...rest
}: CanvasProps) {
  const ref = useRef<HTMLElement>(null);
  const dims = useDimensions(ref);

  return (
    // Guidelines span the canvas width centered on their ruler, so they can
    // poke past the viewport on a phone. `clip` (not `hidden`) trims that
    // without making a scroll container, so sticky children keep working.
    <Tag ref={ref} className={cn("relative [overflow-x:clip]", className)} {...rest}>
      <CanvasContext.Provider value={dims}>{children}</CanvasContext.Provider>
    </Tag>
  );
}
