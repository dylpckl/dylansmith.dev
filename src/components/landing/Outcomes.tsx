"use client";

import { Database } from "lucide-react";
import { TokenLayerStack } from "./visuals/TokenLayerStack";
import { TokenCompare } from "./visuals/TokenCompare";

// Facts here are the verified ones (see the career-facts note): every screen,
// one CSS token system, AA contrast, no regressions, no rewrite, 100+ pages of
// docs; migrations 3 months → 2 weeks. Don't add numbers that aren't on that list.

const label = "font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3";

export function Outcomes() {
  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      {/* Claim + how it worked */}
      {/* Claim above the diagram at every width: the diagram needs the full
          column to keep its labels and proof beside the planes. */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">SmartAdvocate</span>
            <span aria-hidden="true" className="h-px w-4 bg-line/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">UI refresh</span>
          </div>
          <h3 className="max-w-[24ch] text-3xl font-bold leading-[1.08] tracking-tight text-ink [text-wrap:balance] md:text-4xl">
            A CSS token layer for a legacy ASP.NET app.
          </h3>
          <p className="max-w-[52ch] text-base leading-relaxed text-ink-2">
            SmartAdvocate is built on DevExpress controls. I wrote a CSS token layer that sits on top of the
            existing styles and applied it to every screen. Contrast meets WCAG AA. No rewrite, no regressions.
          </p>
        </div>
        <TokenLayerStack />
      </div>

      {/* Proof */}
      <TokenCompare />

      {/* Supporting */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 border-t border-line/25 pt-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-0 md:pt-6">
        <div className="col-span-2 flex items-start gap-4 md:col-span-1 md:pr-7">
          <Database className="mt-0.5 h-5 w-5 shrink-0 text-warm" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className={label}>Data migrations</span>
              <span className="text-lg font-bold tracking-tight text-ink">3 months → 2 weeks</span>
            </div>
            <span className="text-sm leading-relaxed text-ink-2">
              Across 12+ concurrent projects, by standardizing the project structure and writing a Python CLI to
              run them.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:border-l md:border-line/25 md:px-6">
          <span className={label}>Before that</span>
          <span className="text-sm text-ink-2">Built a component library at MDS.</span>
        </div>
        <div className="flex flex-col gap-1 md:border-l md:border-line/25 md:pl-6">
          <span className={label}>10+ years</span>
          <span className="text-sm text-ink-2">Across design, front-end, and data.</span>
        </div>
      </div>
    </div>
  );
}
