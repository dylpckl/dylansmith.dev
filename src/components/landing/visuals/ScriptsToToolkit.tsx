"use client";

import { ArrowRight, Package, Terminal } from "lucide-react";
import { Tag } from "@/components/Tag";
import { ScatteredFiles } from "./ScatteredFiles";

export function ScriptsToToolkit() {
  return (
    <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <ScatteredFiles />

      <ArrowRight
        aria-hidden="true"
        className="hidden h-8 w-8 shrink-0 text-accent lg:block"
        strokeWidth={2}
      />
      <div
        aria-hidden="true"
        className="self-center font-mono text-xs uppercase tracking-widest text-accent lg:hidden"
      >
        ↓ consolidates into
      </div>

      <div className="grid w-full shrink-0 grid-cols-1 gap-2 lg:w-fit">
        <span className="flex flex-col items-start gap-1.5 rounded-lg bg-accent/10 px-4 py-2.5 font-mono text-sm text-accent ring-1 ring-accent/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span className="flex items-center gap-2">
            <Package className="h-4 w-4 shrink-0" />
            migration-starter-kit
          </span>
          <Tag intent="teal" variant="tinted" size="xs">
            repository
          </Tag>
        </span>
        <span className="flex flex-col items-start gap-1.5 rounded-lg bg-warm/10 px-4 py-2.5 font-mono text-sm text-warm ring-1 ring-warm/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
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
