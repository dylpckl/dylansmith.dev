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
    <Tag ref={ref} className={cn("relative", className)} {...rest}>
      <CanvasContext.Provider value={dims}>{children}</CanvasContext.Provider>
    </Tag>
  );
}
