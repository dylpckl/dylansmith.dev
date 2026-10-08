"use client";

import { MiniTokenStrip } from "@/components/bento/MiniTokenStrip";
import { StateChips } from "@/components/bento/StateChips";

const SPACING_BARS = ["w-8", "w-16", "w-32"];

export function MiniSystemDemo() {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-4">
          Tokens
        </span>
        <MiniTokenStrip />
      </div>
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-4">
          States
        </span>
        <StateChips />
      </div>
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-4">
          Spacing
        </span>
        <div className="mt-3 flex items-center gap-4" aria-hidden="true">
          {SPACING_BARS.map((width) => (
            <span
              key={width}
              className={`h-10 ${width} rounded-md bg-lav/30 ring-1 ring-lav/60`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
