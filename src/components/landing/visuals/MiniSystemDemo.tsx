"use client";

import { MiniTokenStrip } from "@/components/bento/MiniTokenStrip";
import { StateChips } from "@/components/bento/StateChips";

export function MiniSystemDemo() {
  return (
    <div className="mt-4 flex flex-col gap-3">
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
    </div>
  );
}
