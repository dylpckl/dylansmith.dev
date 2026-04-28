"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  Star,
  Gauge,
  Users,
  Sparkles,
  Recycle,
  ArrowUpRight,
  ArrowRight,
  FileCode,
  Package,
  FileText,
  Quote,
  Terminal,
  CreditCard,
  Layers,
} from "lucide-react";

import { SocialLink } from "@/components/SocialLink";
import { Button } from "@/components/Button";
import MeasuredDiv from "@/components/MeasuredDiv";
import { useDimensions } from "@/lib/useDimensions";

import { Tile } from "@/components/bento/Tile";
import { StatTile } from "@/components/bento/StatTile";
import { CategoryTile } from "@/components/bento/CategoryTile";
import { Modal, type ModalContent } from "@/components/bento/Modal";
import { BeforeAfterReveal } from "@/components/bento/BeforeAfterReveal";
import { MiniTokenStrip } from "@/components/bento/MiniTokenStrip";
import { StateChips } from "@/components/bento/StateChips";

import bankRecLegacy from "/public/case-studies/bank-rec/legacy.png";
import bankRecSpire from "/public/case-studies/bank-rec/spire.png";
import rapidpayLegacy from "/public/case-studies/rapidpay/legacy.png";
import rapidpaySpire from "/public/case-studies/rapidpay/spire.png";

const MODAL_CONTENT: Record<string, ModalContent> = {
  designSystems: {
    title: "Design Systems — shipped from zero",
    body: (
      <>
        <p>
          Two organizations, two production design systems brought from a blank
          page to shipped product. At MDS, an atomic-design component library
          serving 1,000+ daily users. At SmartAdvocate, a token-architected
          system shipped into a legacy ASP.NET / DevExpress codebase via
          backwards-compatible CSS, JS, and C# &mdash; no regressions across
          existing surfaces.
        </p>
        <p>
          Both systems started with a token layer (color, type, spacing,
          elevation) as the shared source of truth between Figma and code, and
          documented interaction states for every component. WCAG-aligned
          accessibility was baked in from the first PR, not bolted on later.
        </p>
      </>
    ),
  },
  trackRecord: {
    title: "First-of-its-kind, twice",
    body: (
      <>
        <p>
          Neither MDS nor SmartAdvocate had a design system before I built one.
          Each rollout meant evangelizing the shift across design, engineering,
          and product &mdash; making the system the easy path AND the right
          path.
        </p>
        <p>
          That meant pairing the system with documentation, contribution
          standards, and a real adoption story tied to live product features.
          Twice over, the system became the team standard for new work.
        </p>
      </>
    ),
  },
  smartAdvocate: {
    title: "60% faster migration delivery",
    body: (
      <>
        <p>
          At SmartAdvocate I lead data conversion in parallel with design system
          work. Across 12+ concurrent migrations, I cut average turnaround by
          60% &mdash; not by working faster, but by treating each engagement as
          infrastructure work.
        </p>
        <p>
          I built and maintain a starter-kit monorepo (project boilerplate,
          curated migration scripts, shared tooling, CI/CD), a Python CLI for
          terminal-based DB ops and cloud deployments, and a suite of Claude
          Code skills for code-ready output. All adopted as team standards.
        </p>
      </>
    ),
  },
  crossFunctional: {
    title: "Collaboration",
    body: (
      <>
        <p>
          The work of a solo bridge between design and engineering: tokens
          conversation with engineering leads, handoff process design with PMs,
          accessibility decisions made jointly with QA, user research findings
          translated into both design and implementation choices.
        </p>
        <p>
          When you&apos;re the only one in the overlap, you don&apos;t get to
          throw work over the wall. Every decision has to make sense to both
          sides &mdash; and ideally make both sides&apos; jobs easier.
        </p>
      </>
    ),
  },
  aiWorkflow: {
    title: "Claude Code · MCP",
    body: (
      <>
        <p>
          A suite of Claude Code skills, custom agents, and MCP-driven workflows
          for code-ready output generation. Adopted across the team for both
          design system implementation (token-to-CSS pipelines, component
          scaffolding) and migration delivery (data shape inspection, script
          generation).
        </p>
        <p>
          AI tooling isn&apos;t a side experiment &mdash; it&apos;s how the team
          ships now.
        </p>
      </>
    ),
  },
  systemsThinking: {
    title: "One-off → reusable",
    body: (
      <>
        <p>
          Every project ships team-wide tooling, not throwaway scripts. The
          starter-kit monorepo, Python CLI, agentic workflows, and Claude
          skills all started as &ldquo;solve this one problem,&rdquo; and were
          re-shaped into team infrastructure during the same engagement.
        </p>
        <p>
          That&apos;s the systems thinking the Atomic Habits quote points at:
          you don&apos;t rise to the level of your goals, you fall to the level
          of your systems. Every one-off is an opportunity to invest in the
          system that ships the next one faster.
        </p>
      </>
    ),
  },
};

function MiniSystemDemo() {
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
          Pattern
        </span>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            aria-hidden="true"
            className="rounded-md bg-teal-300 px-3 py-1.5 text-xs font-semibold text-slate-900"
          >
            Save
          </span>
          <span
            aria-hidden="true"
            className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 ring-1 ring-slate-600"
          >
            Cancel
          </span>
          <span className="rounded-md bg-teal-400/15 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-teal-200 ring-1 ring-teal-300/50">
            WCAG AA
          </span>
        </div>
      </div>
    </div>
  );
}

function ManaCurve() {
  // Realistic mana-curve shape — 0, 1, 2, 3, 4, 5, 6, 7+ — peaks at 2-3 like a healthy commander deck.
  const buckets = [
    { label: "0", h: 12 },
    { label: "1", h: 28 },
    { label: "2", h: 64 },
    { label: "3", h: 88 },
    { label: "4", h: 56 },
    { label: "5", h: 36 },
    { label: "6", h: 20 },
    { label: "7+", h: 14 },
  ];
  return (
    <div className="mt-3 flex w-fit flex-col gap-1" aria-hidden="true">
      <div className="flex h-16 items-end gap-1">
        {buckets.map((b) => (
          <div
            key={b.label}
            className="w-5 rounded-t-sm bg-teal-300/80 ring-1 ring-teal-300/30"
            style={{ height: `${b.h}%` }}
          />
        ))}
      </div>
      <div className="flex gap-1">
        {buckets.map((b) => (
          <span
            key={b.label}
            className="w-5 text-center font-mono text-[9px] uppercase tracking-widest text-slate-500"
          >
            {b.label}
          </span>
        ))}
      </div>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate-500">
        mana curve · CMC distribution
      </span>
    </div>
  );
}

function MigrationGrid() {
  // 12 migrations, delivery time trending down (60% faster over the run).
  const heights = [82, 76, 70, 64, 70, 56, 48, 52, 40, 36, 32, 32];
  return (
    <div
      className="mt-4 flex h-14 items-end gap-1.5"
      aria-hidden="true"
      title="12 concurrent migrations, delivery time trending faster"
    >
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-teal-300/80 ring-1 ring-teal-300/30"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [modal, setModal] = useState<ModalContent | null>(null);

  const introRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(introRef);

  const open = (key: keyof typeof MODAL_CONTENT) => () =>
    setModal(MODAL_CONTENT[key]);

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-2xl">
      <main className="w-full pb-6 md:pb-14 lg:pb-24">
        {/* Site-wide background layers (z stack: mountain -30, dotted -20, gradient overlay -10) */}
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/90" />

        {/* Intro / Hero */}
        <section
          ref={introRef}
          id="intro"
          className="relative flex flex-col gap-6 px-6 py-12 text-slate-200 md:px-12 md:py-20 lg:py-24"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <span className="text-5xl font-bold tracking-tight text-slate-100 lg:text-7xl">
              Dylan Smith
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <SocialLink site="github" />
              <SocialLink site="linkedin" />
              <SocialLink site="email" />
              <Button
                href="/Dylan-Smith-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                variant="primary"
              >
                <FileText aria-hidden="true" />
                Resume
              </Button>
            </div>
          </div>

          <div className="max-w-3xl text-lg font-medium leading-relaxed text-slate-200 lg:text-2xl">
            Designing &amp; developing{" "}
            <MeasuredDiv
              parentHeight={height}
              parentWidth={width}
              guideline1={true}
              guideline1Props={{ edge: "bottom" }}
              guideline2={true}
              guideline2Props={{ edge: "right" }}
              measurement={true}
              measurementProps={{ edge: "bottom" }}
              className="inline-block w-fit align-baseline"
            >
              pixel-perfect
            </MeasuredDiv>{" "}
            interfaces.
          </div>

          <div className="text-lg font-normal text-slate-200">
            Leading design at{" "}
            <a
              href="https://www.smartadvocate.com/"
              target="_blank"
              rel="noreferrer"
              className="group relative underline decoration-teal-300 hover:decoration-teal-900"
            >
              <span className="relative z-20 group-hover:text-teal-900">
                SmartAdvocate
              </span>
              {"."}
              <span className="absolute inset-0 z-10 w-0 bg-teal-300 duration-500 ease-in-out group-hover:w-full group-hover:transition-all" />
            </a>
          </div>

        </section>

        {/* Work / Bento */}
        <section id="work" className="relative px-6 pb-24 md:px-12">
          <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
            {/* 1 — DESIGN SYSTEMS (large, with inner mini-system demo) */}
            <Tile
              label="Design Systems"
              labelIcon={LayoutGrid}
              className="md:col-span-6 lg:col-span-8 lg:row-span-2"
              onClickModal={open("designSystems")}
            >
              <div className="flex flex-1 flex-row items-start justify-between gap-6">
                <div className="flex flex-col">
                  <span className="font-sans text-5xl font-bold leading-none text-slate-100 lg:text-6xl">
                    2
                  </span>
                  <p className="mt-3 max-w-[40ch] text-sm text-slate-300 lg:text-base">
                    Shipped from zero — solo practitioner bridging design and
                    engineering at two organizations.
                  </p>
                </div>
                <MiniSystemDemo />
              </div>
            </Tile>

            {/* 2 — TRACK RECORD */}
            <CategoryTile
              label="Track Record"
              labelIcon={Star}
              headline="First-of-its-kind"
              body="Both shipped systems were the first their organizations had ever built."
              className="md:col-span-6 lg:col-span-4 lg:row-span-2"
              onClickModal={open("trackRecord")}
            />

            {/* 3 — MIGRATION DELIVERY 60% with concurrent-migrations grid */}
            <StatTile
              label="Migration Delivery"
              labelIcon={Gauge}
              number="60%"
              caption="Faster turnaround across 12+ concurrent migrations."
              className="md:col-span-3 lg:col-span-4"
              onClickModal={open("smartAdvocate")}
              visual={<MigrationGrid />}
            />

            {/* 4 — CROSS-FUNCTIONAL */}
            <CategoryTile
              label="Cross-functional"
              labelIcon={Users}
              headline="Collaboration"
              body="Across design, engineering, and product — the work of a solo bridge."
              className="md:col-span-3 lg:col-span-4"
              onClickModal={open("crossFunctional")}
            />

            {/* 5 — AI WORKFLOW */}
            <CategoryTile
              label="AI Workflow"
              labelIcon={Sparkles}
              headline="Claude Code · MCP"
              body="Custom skills, agents, and MCP workflows. Adopted across the team."
              className="md:col-span-6 lg:col-span-4"
              onClickModal={open("aiWorkflow")}
            />

            {/* 6 — SYSTEMS THINKING (full-width, static one-off → reusable composition) */}
            <Tile
              label="Systems Thinking"
              labelIcon={Recycle}
              className="md:col-span-6 lg:col-span-12 lg:row-span-2"
              decorative
            >
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                  One-off → systems-builder
                </h3>
                <p className="max-w-[60ch] text-sm text-slate-300 lg:text-base">
                  Every project ships team-wide tooling, not throwaway scripts.
                </p>

                <div className="mt-2 flex flex-col items-stretch gap-4 rounded-lg bg-slate-900/80 p-6 ring-1 ring-slate-700 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                  {/* Scattered files */}
                  <div className="grid w-fit grid-cols-3 gap-2">
                    {[
                      "script.sql",
                      "migrate.py",
                      "deploy.sh",
                      "fix.sql",
                      "notes.md",
                      "utils.py",
                      "backfill.sql",
                      "audit.sql",
                      "patches.sql",
                    ].map((name) => (
                      <span
                        key={name}
                        className="flex w-32 items-center gap-1.5 rounded bg-slate-800 px-2.5 py-1.5 font-mono text-[11px] text-slate-300 ring-1 ring-slate-700"
                      >
                        <FileCode className="h-3 w-3 shrink-0 text-slate-500" />
                        {name}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
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

                  {/* Consolidated callouts — grid w-fit makes both stretch to the widest's content width */}
                  <div className="grid w-fit shrink-0 grid-cols-1 gap-2">
                    <span className="flex flex-col items-start gap-1.5 whitespace-nowrap rounded-lg bg-teal-400/10 px-4 py-2.5 font-mono text-sm text-teal-200 ring-1 ring-teal-300/50 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                      <span className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        migration-starter-kit
                      </span>
                      <span className="rounded bg-teal-300/20 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
                        boilerplate repo
                      </span>
                    </span>
                    <span className="flex flex-col items-start gap-1.5 whitespace-nowrap rounded-lg bg-orange-400/10 px-4 py-2.5 font-mono text-sm text-orange-200 ring-1 ring-orange-300/50 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                      <span className="flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        $ db-cli migrate
                      </span>
                      <span className="rounded bg-orange-300/20 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
                        python cli
                      </span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={open("systemsThinking")}
                  className="mt-2 inline-flex w-fit items-center gap-1 self-start rounded-md font-mono text-xs uppercase tracking-widest text-teal-300 transition hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  More on this →
                </button>
              </div>
            </Tile>

            {/* 7 — BANK REC (extra-large, full-width drag reveal: legacy → spire) */}
            <Tile
              label="Bank Rec"
              labelIcon={ArrowUpRight}
              className="md:col-span-6 lg:col-span-12 lg:row-span-3"
              decorative
            >
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                  Bank Reconciliation
                </h3>
                <p className="max-w-[40ch] text-sm text-slate-300 lg:text-base">
                  Solo design under a one-week deadline — legacy ASP screen
                  redesigned for the new SmartAdvocate UI. Drag to compare.
                </p>
                <div className="mt-2">
                  <BeforeAfterReveal
                    beforeLabel="Legacy"
                    afterLabel="Refreshed"
                    before={
                      <div className="relative h-72 w-full bg-slate-900 md:h-[520px] lg:h-[720px]">
                        <Image
                          src={bankRecLegacy}
                          alt="Legacy bank reconciliation screen"
                          fill
                          className="object-cover object-top"
                          sizes="100vw"
                        />
                      </div>
                    }
                    after={
                      <div className="relative h-72 w-full bg-slate-900 md:h-[520px] lg:h-[720px]">
                        <Image
                          src={bankRecSpire}
                          alt="Refreshed bank reconciliation screen"
                          fill
                          className="object-cover object-top"
                          sizes="100vw"
                        />
                      </div>
                    }
                  />
                </div>
                <Link
                  href="/work/bank-rec"
                  className="mt-2 inline-flex w-fit items-center gap-1 self-start rounded-md font-mono text-xs uppercase tracking-widest text-teal-300 transition hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  Read the case study →
                </Link>
              </div>
            </Tile>

            {/* 8 — ATOMIC HABITS QUOTE (philosophy break between case studies) */}
            <Tile
              label="Atomic Habits"
              labelIcon={Quote}
              className="md:col-span-6 lg:col-span-12"
              decorative
            >
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-6 text-center md:flex-row md:gap-8 md:py-8">
                <Quote
                  aria-hidden="true"
                  className="h-10 w-10 shrink-0 rotate-180 fill-teal-300/20 text-teal-300/50 md:h-14 md:w-14"
                  strokeWidth={1.5}
                />
                <p className="max-w-2xl font-mono text-base italic leading-relaxed text-slate-100 md:text-lg">
                  &ldquo;You don&apos;t rise to the level of your goals, you fall
                  to the level of your systems.&rdquo;
                </p>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-slate-400 md:text-xs">
                  James Clear
                </span>
              </div>
            </Tile>

            {/* 9 — RAPIDPAY (extra-large, full-width drag reveal) */}
            <Tile
              label="RapidPay"
              labelIcon={CreditCard}
              className="md:col-span-6 lg:col-span-12 lg:row-span-3"
              decorative
            >
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                  RapidPay
                </h3>
                <p className="max-w-[60ch] text-sm text-slate-300 lg:text-base">
                  Legacy ASP payment screen redesigned for the new SmartAdvocate
                  UI. Drag to compare.
                </p>
                <div className="mt-2">
                  <BeforeAfterReveal
                    beforeLabel="Legacy"
                    afterLabel="Refreshed"
                    before={
                      <div className="relative h-72 w-full bg-slate-900 md:h-[520px] lg:h-[720px]">
                        <Image
                          src={rapidpayLegacy}
                          alt="Legacy RapidPay screen"
                          fill
                          className="object-cover object-top"
                          sizes="100vw"
                        />
                      </div>
                    }
                    after={
                      <div className="relative h-72 w-full bg-slate-900 md:h-[520px] lg:h-[720px]">
                        <Image
                          src={rapidpaySpire}
                          alt="Refreshed RapidPay screen"
                          fill
                          className="object-cover object-top"
                          sizes="100vw"
                        />
                      </div>
                    }
                  />
                </div>
              </div>
            </Tile>

            {/* 9 — RAREBREW (side project — proves React+TS/Next.js production chops) */}
            <Tile
              label="Side Project"
              labelIcon={Layers}
              className="md:col-span-6 lg:col-span-12 lg:row-span-2"
              decorative
            >
              <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                    rarebrew.gg
                  </h3>
                  <p className="max-w-[60ch] text-base leading-snug text-slate-300 lg:text-lg">
                    A desktop-first PWA deckbuilder for Magic: The Gathering
                    Commander — custom component library on design tokens,
                    Recharts visualizations, Scryfall + EDHREC data layer.
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "TailwindCSS",
                      "Supabase",
                      "Recharts",
                      "PWA",
                    ].map((t) => (
                      <span
                        key={t}
                        className="rounded bg-slate-800 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-300 ring-1 ring-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://rarebrew.gg"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-1 self-start rounded-md font-mono text-xs uppercase tracking-widest text-teal-300 transition hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  >
                    Visit rarebrew.gg ↗
                  </a>
                </div>
                <ManaCurve />
              </div>
            </Tile>
          </div>
        </section>
      </main>

      <Modal open={!!modal} onClose={() => setModal(null)} content={modal} />
    </div>
  );
}
