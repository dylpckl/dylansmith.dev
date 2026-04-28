"use client";

import { ReactNode, useCallback, useRef, useState } from "react";

type Props = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  initial?: number;
};

export function BeforeAfterReveal({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
  initial = 50,
}: Props) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateFromPointer = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, ratio)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromPointer(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromPointer(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden rounded-lg ring-1 ring-slate-700 ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* AFTER layer (bottom) */}
      <div className="relative">
        <div className="pointer-events-none absolute right-2 top-2 z-20 rounded bg-slate-900/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-teal-200">
          {afterLabel}
        </div>
        {after}
      </div>

      {/* BEFORE layer (top, clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="pointer-events-none absolute left-2 top-2 z-20 rounded bg-slate-900/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-orange-200">
          {beforeLabel}
        </div>
        {before}
      </div>

      {/* Handle */}
      <button
        type="button"
        role="slider"
        aria-label="Reveal handle"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        className={`absolute top-0 z-30 flex h-full w-1 cursor-ew-resize items-center justify-center bg-teal-300 focus:outline-none ${
          dragging ? "" : "motion-safe:transition-[left] motion-safe:duration-150"
        }`}
        style={{ left: `calc(${pos}% - 2px)` }}
      >
        <span className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-teal-300 text-slate-900 ring-2 ring-slate-900 shadow-lg">
          <span className="block h-3 w-px bg-slate-900" />
          <span className="ml-1 block h-3 w-px bg-slate-900" />
        </span>
      </button>
    </div>
  );
}
