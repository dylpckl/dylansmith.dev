"use client";

import { CrosscheckCard } from "./projects/CrosscheckCard";
import { FighterCard } from "./projects/FighterCard";
import { RarebrewCard } from "./projects/RarebrewCard";

export function SideProjects() {
  return (
    <div className="flex flex-col gap-6">
      {/* The Frame's chip is the section heading; this is just the lede. */}
      <div className="flex flex-col gap-1">
        <p className="max-w-[60ch] text-base text-ink-2 lg:text-lg">
          What I build after hours. The prompt fighter and crosscheck demos run
          each project&apos;s own code; rarebrew&apos;s is a recreation built on my
          deck data. Go ahead and poke at them.
        </p>
      </div>

      <RarebrewCard />
      <FighterCard />
      <CrosscheckCard />
    </div>
  );
}
