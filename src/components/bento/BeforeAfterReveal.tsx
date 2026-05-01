"use client";

import { ReactNode, useCallback, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Tag } from "@/components/Tag";

type Props = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  initial?: number;
};

export function BeforeAfterReveal(props: Props) {
  const { className = "" } = props;
  return (
    <>
      <TapToggle {...props} className={`md:hidden ${className}`} />
      <DragReveal {...props} className={`hidden md:block ${className}`} />
    </>
  );
}

function TapToggle({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: Props) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <button
      type="button"
      onClick={() => setShowAfter((v) => !v)}
      aria-label={`Show ${showAfter ? beforeLabel : afterLabel}`}
      className={`relative block w-full select-none overflow-hidden rounded-lg text-left ring-1 ring-slate-700 ${className}`}
    >
      <div className="relative">{after}</div>
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none"
        style={{ opacity: showAfter ? 0 : 1 }}
        aria-hidden="true"
      >
        {before}
      </div>
      <Tag
        intent={showAfter ? "teal" : "orange"}
        className="pointer-events-none absolute left-2 top-2 z-20"
      >
        {showAfter ? afterLabel : beforeLabel}
      </Tag>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-800/60 text-slate-300 ring-1 ring-slate-700 backdrop-blur-sm"
      >
        <ArrowLeftRight className="h-[18px] w-[18px]" />
      </span>
    </button>
  );
}

function DragReveal({
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
        <Tag
          intent="teal"
          className="pointer-events-none absolute right-2 top-2 z-20"
        >
          {afterLabel}
        </Tag>
        {after}
      </div>

      {/* BEFORE layer (top, clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Tag
          intent="orange"
          className="pointer-events-none absolute left-2 top-2 z-20"
        >
          {beforeLabel}
        </Tag>
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
