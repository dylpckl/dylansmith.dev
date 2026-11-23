import type { ReactNode } from "react";

import { Hero } from "@/components/landing/Hero";
import { Principles } from "@/components/landing/Principles";
import { Outcomes } from "@/components/landing/Outcomes";
import { Work } from "@/components/landing/Work";
import { RarebrewCard } from "@/components/landing/projects/RarebrewCard";
import { FighterCard } from "@/components/landing/projects/FighterCard";
import { CrosscheckCard } from "@/components/landing/projects/CrosscheckCard";
import { EMAIL } from "@/lib/site";

import { BkdFrame, ContactFrame, StackUpFrame } from "./LinkFrames";

export type FrameLink = { label: string; href: string };

export type FrameDef = {
  /** Anchor id, hash target and layer key. */
  id: string;
  label: string;
  kind: string;
  /** Where the thing lives; shown in the properties panel. */
  source: string;
  /** One line for the properties panel. */
  blurb: string;
  /** Width on the canvas, in px. Height is measured. */
  w: number;
  /** Content brings its own surface and padding (the side-project cards). */
  bare?: boolean;
  links: FrameLink[];
  /**
   * Created once at module scope so its identity never changes: panning and
   * zooming re-render the shell, and React skips these subtrees entirely.
   * The demos' cursor effects and autoplay depend on that.
   */
  content: ReactNode;
};

export type FrameRow = { id: string; label: string; frames: FrameDef[] };

export const ROWS: FrameRow[] = [
  {
    id: "row-intro",
    label: "Intro",
    frames: [
      {
        id: "intro",
        label: "Intro",
        kind: "Frame",
        source: "dylansmith.dev",
        blurb: "Who I am and what I do.",
        w: 920,
        links: [{ label: "Email", href: `mailto:${EMAIL}` }],
        content: <Hero />,
      },
      {
        id: "principles",
        label: "Principles",
        kind: "Notes",
        source: "dylansmith.dev",
        blurb: "Three principles, each with a proof link, plus tools.",
        w: 1120,
        links: [{ label: "Read the devlog", href: "/blog/rare-brew" }],
        content: <Principles />,
      },
      {
        id: "contact",
        label: "Contact",
        kind: "Frame",
        source: "dylansmith.dev",
        blurb: "Resume, email and the usual links.",
        w: 620,
        links: [{ label: "Email", href: `mailto:${EMAIL}` }],
        content: <ContactFrame />,
      },
    ],
  },
  {
    id: "row-projects",
    label: "After hours",
    frames: [
      {
        id: "stack-up",
        label: "Stack Up",
        kind: "Game",
        source: "nwld.party",
        blurb: "Links out to the playable demo.",
        w: 620,
        links: [{ label: "Play", href: "https://nwld.party/play/stack-up" }],
        content: <StackUpFrame />,
      },
      {
        id: "rarebrew",
        label: "rarebrew.gg",
        kind: "App",
        source: "rarebrew.gg",
        blurb: "Live demo: a recreation of the deck view on my deck data.",
        w: 1180,
        bare: true,
        links: [{ label: "Open", href: "https://rarebrew.gg" }],
        content: <RarebrewCard />,
      },
      {
        id: "prompt-fighter",
        label: "prompt fighter",
        kind: "Game",
        source: "prompt-fight.vercel.app",
        blurb: "Live demo: runs the project's own sim.",
        w: 1180,
        bare: true,
        links: [
          { label: "Play", href: "https://prompt-fight.vercel.app" },
          { label: "Source", href: "https://github.com/dylpckl/prompt-fighter" },
        ],
        content: <FighterCard />,
      },
      {
        id: "crosscheck",
        label: "crosscheck",
        kind: "Tool",
        source: "dylpckl.github.io",
        blurb: "Live demo: runs the project's own ranking code.",
        w: 1180,
        bare: true,
        links: [
          { label: "Open", href: "https://dylpckl.github.io/crosscheck/" },
          { label: "Source", href: "https://github.com/dylpckl/crosscheck" },
        ],
        content: <CrosscheckCard />,
      },
      {
        id: "bkd",
        label: "bkd",
        kind: "App",
        source: "bkd-blond.vercel.app",
        blurb: "Links out to the app.",
        w: 620,
        links: [{ label: "Open", href: "https://bkd-blond.vercel.app" }],
        content: <BkdFrame />,
      },
    ],
  },
  {
    id: "row-work",
    label: "Day job",
    frames: [
      {
        id: "outcomes",
        label: "SmartAdvocate",
        kind: "Work",
        source: "smartadvocate.com",
        blurb: "The token-layer story, with the before/after slider.",
        w: 1120,
        links: [{ label: "Visit", href: "https://www.smartadvocate.com/" }],
        content: <Outcomes />,
      },
      {
        id: "work",
        label: "MDS",
        kind: "Work",
        source: "multidataservices.com",
        blurb: "Bank Reconciliation and RapidPay, before and after.",
        w: 1000,
        links: [{ label: "Visit", href: "https://multidataservices.com/" }],
        content: <Work />,
      },
    ],
  },
];

export const FRAMES: FrameDef[] = ROWS.flatMap((r) => r.frames);
