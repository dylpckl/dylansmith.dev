"use client";

import dynamic from "next/dynamic";
import { ProjectCard } from "./projects/ProjectCard";

// Demos are client-only and heavy-ish (a game engine, a 40KB clue corpus, ~100
// card images), so they load on their own chunks behind a same-size placeholder.
const PhonePlaceholder = () => (
  <div className="mx-auto h-[640px] w-full max-w-[340px] animate-pulse rounded-[2.75rem] bg-slate-900/80 ring-1 ring-slate-700 sm:h-[700px]" />
);

const RarebrewDemo = dynamic(() => import("./projects/RarebrewDemo").then((m) => m.RarebrewDemo), {
  ssr: false,
  loading: PhonePlaceholder,
});
const CrosscheckDemo = dynamic(() => import("./projects/CrosscheckDemo").then((m) => m.CrosscheckDemo), {
  ssr: false,
  loading: PhonePlaceholder,
});
const PromptFighterDemo = dynamic(
  () => import("./projects/PromptFighterDemo").then((m) => m.PromptFighterDemo),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto h-[600px] w-full max-w-[560px] animate-pulse rounded-md bg-slate-900/80 ring-1 ring-slate-700" />
    ),
  },
);

export function SideProjects() {
  return (
    <div className="mt-12 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-mono text-sm uppercase tracking-widest text-slate-400">
          Side projects
        </h3>
        <p className="max-w-[60ch] text-base text-slate-300 lg:text-lg">
          What I build after hours. Every demo below runs the project&apos;s own
          code. Go ahead and poke at them.
        </p>
      </div>

      <ProjectCard
        name="rarebrew.gg"
        kicker="Mobile-first PWA"
        status={{ label: "Live", intent: "teal" }}
        blurb="A Commander deckbuilder for paper Magic players, built phone first. It has a custom component library on design tokens, a Scryfall + EDHREC data layer, and insights meant to help you decide what to cut."
        notes={[
          {
            title: "The card is the row",
            body: "Each row is a cropped strip of the real card image, so the card's own name plate and mana cost do the work a table row would. Tap one to expand it in place. Double-faced cards get a flip.",
          },
          {
            title: "Tabs navigate, never filter",
            body: "The type strip follows your scroll and jumps between sections. Collapsing a group is the only way cards leave the screen. Tap the stats strip for insights, and drag the sheet down to dismiss it.",
          },
        ]}
        tags={["React", "Next.js", "TypeScript", "TailwindCSS", "Supabase", "PWA"]}
        links={[{ href: "https://rarebrew.gg", label: "Visit rarebrew.gg" }]}
        demo={<RarebrewDemo />}
        demoCaption="Recreated · my Light Party deck, real data"
      />

      <ProjectCard
        flip
        name="prompt fighter"
        kicker="LLM game"
        status={{ label: "Hosted app paused", intent: "orange" }}
        blurb="Build a fighter from four 80-character prompts. Claude turns them into stats, two moves, a flaw, and a 16×16 sprite, and then it fights a ghost that someone else built."
        notes={[
          {
            title: "The budget is the anti-cheat",
            body: "Prompts become stats that must total exactly 30 body points and 20 spirit points. Describe something invincible and you get a lopsided spread, not extra points. Open a fighter's stats to see it.",
          },
          {
            title: "The model picks, the engine decides",
            body: (
              <>
                Moves come from a fixed set of effects the engine already
                implements, so no prompt can invent &ldquo;instantly wins.&rdquo;
                Fights run on a seeded PRNG: hit <em>Replay seed</em> and you get
                the identical fight.
              </>
            ),
          },
        ]}
        tags={["Next.js", "Supabase", "Claude API", "Vitest"]}
        demo={<PromptFighterDemo />}
        demoCaption="Live · the real sim, six fighters from the pool"
      />

      <ProjectCard
        name="crosscheck"
        kicker="Mobile-first PWA"
        status={{ label: "Active", intent: "teal" }}
        blurb="Type a crossword clue, get candidate answers as letter tiles plus what the word means. It's installable and works offline, and there's no backend: every source is called straight from the browser."
        notes={[
          {
            title: "Convention over association",
            body: "Datamuse knows which words sit near a clue. Crosswords want the words setters actually use. A hand-curated corpus of crosswordese shows up instantly, and the network results merge in underneath it.",
          },
          {
            title: "Evidence, not padding",
            body: "Answers backed by published puzzles get top billing, and everything else is labeled as related words. When Datamuse pads its results with junk, the app shows nothing rather than looking broken.",
          },
        ]}
        tags={["TypeScript", "Vite", "PWA", "Vitest"]}
        links={[
          { href: "https://dylpckl.github.io/crosscheck/", label: "Try crosscheck" },
          { href: "https://github.com/dylpckl/crosscheck", label: "Source" },
        ]}
        demo={<CrosscheckDemo />}
        demoCaption="Live · real parser + corpus, live Datamuse"
      />
    </div>
  );
}
