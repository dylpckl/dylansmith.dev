"use client";

import { ArrowRight, Package, Terminal } from "lucide-react";
import { Tag } from "@/components/Tag";
import { ScatteredFiles } from "./ScatteredFiles";

export function ScriptsToToolkit() {
  return (
    <div className="flex flex-col items-stretch gap-4 rounded-lg bg-slate-900/80 p-6 ring-1 ring-slate-700 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <ScatteredFiles />

      <ArrowRight
        aria-hidden="true"
        className="hidden h-8 w-8 shrink-0 text-teal-300 lg:block"
        strokeWidth={2}
      />
      <div
        aria-hidden="true"
        className="self-center font-mono text-xs uppercase tracking-widest text-teal-300 lg:hidden"
      >
        ↓ consolidates into
      </div>

      <div className="grid w-full shrink-0 grid-cols-1 gap-2 lg:w-fit">
        <span className="flex flex-col items-start gap-1.5 rounded-lg bg-teal-400/10 px-4 py-2.5 font-mono text-sm text-teal-200 ring-1 ring-teal-300/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span className="flex items-center gap-2">
            <Package className="h-4 w-4 shrink-0" />
            migration-starter-kit
          </span>
          <Tag intent="teal" variant="tinted" size="xs">
            repository
          </Tag>
        </span>
        <span className="flex flex-col items-start gap-1.5 rounded-lg bg-orange-400/10 px-4 py-2.5 font-mono text-sm text-orange-200 ring-1 ring-orange-300/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span className="flex items-center gap-2">
            <Terminal className="h-4 w-4 shrink-0" />$ db-cli migrate
          </span>
          <Tag intent="orange" variant="tinted" size="xs">
            python cli
          </Tag>
        </span>
      </div>
    </div>
  );
}
