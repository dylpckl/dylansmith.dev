"use client";

import { CrosscheckCard } from "./projects/CrosscheckCard";
import { FighterCard } from "./projects/FighterCard";
import { RarebrewCard } from "./projects/RarebrewCard";

export function SideProjects() {
  return (
    <div className="mt-12 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="font-mono text-sm uppercase tracking-widest text-slate-400">
          Side projects
        </h3>
        <p className="max-w-[60ch] text-base text-slate-300 lg:text-lg">
          What I build after hours. Every demo below runs the project&apos;s own
          code. Go ahead and poke at them.
        </p>
      </div>

      <RarebrewCard />
      <FighterCard />
      <CrosscheckCard />
    </div>
  );
}
