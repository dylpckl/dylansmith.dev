"use client";

import { Ruler } from "@/components/canvas";
import { MiniTokenStrip } from "@/components/bento/MiniTokenStrip";
import { StateChips } from "@/components/bento/StateChips";

const SPACING_ROWS = [
  { label: "sm", gap: "gap-1" },
  { label: "md", gap: "gap-3" },
  { label: "lg", gap: "gap-6" },
];

export function MiniSystemDemo() {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-lg bg-slate-900/70 p-4 ring-1 ring-slate-700 backdrop-blur-sm">
      <div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
          Tokens
        </span>
        <MiniTokenStrip />
      </div>
      <div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
          States
        </span>
        <StateChips />
      </div>
      <div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
          Spacing
        </span>
        <div className="mt-3 flex flex-col gap-6" aria-hidden="true">
          {SPACING_ROWS.map(({ label, gap }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-6 font-mono text-[9px] uppercase tracking-widest text-slate-500">
                {label}
              </span>
              <Ruler className="inline-flex w-fit">
                <Ruler.Target edge="bottom" />
                <div className={`flex ${gap}`}>
                  <span className="h-5 w-5 rounded-sm bg-teal-300/30 ring-1 ring-teal-300/60" />
                  <span className="h-5 w-5 rounded-sm bg-teal-300/30 ring-1 ring-teal-300/60" />
                </div>
              </Ruler>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
