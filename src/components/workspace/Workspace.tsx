"use client";

import { useRef, type ReactNode } from "react";
import { LeftRuler, TopRuler } from "./Rulers";

type WorkspaceProps = {
  children: ReactNode;
};

/**
 * The canvas column with its edge rulers. Furniture only: this is still a
 * page you scroll. Rulers are desktop-only; below `lg` the canvas is a
 * plain column ("preview mode").
 */
export function Workspace({ children }: WorkspaceProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex w-full min-w-0 flex-1 items-start">
      <LeftRuler />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopRuler canvasRef={canvasRef} />
        <div
          ref={canvasRef}
          className="flex flex-col gap-12 px-4 pb-16 pt-8 md:px-8 md:pb-24 lg:gap-16 lg:px-10 lg:pt-10"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
