"use client";

import { CrosscheckCard } from "./projects/CrosscheckCard";
import { FighterCard } from "./projects/FighterCard";
import { RarebrewCard } from "./projects/RarebrewCard";

export function SideProjects() {
  return (
    <div className="flex flex-col gap-8 md:gap-6">
      {/* The Frame's chip is the section heading; this is just the lede. */}
      <div className="flex flex-col gap-1">
        <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink-2 lg:text-lg">
          What I build after hours. Prompt fighter and crosscheck run their own
          code; rarebrew is a recreation on my deck data. Poke at them.
        </p>
      </div>

      <RarebrewCard />
      <FighterCard />
      <CrosscheckCard />
    </div>
  );
}
