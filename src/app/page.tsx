"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  Star,
  TrendingUp,
  Users,
  Sparkles,
  Recycle,
  ArrowUpRight,
  FileCode,
  Package,
  FileText,
  Quote,
  Terminal,
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
    title: "Co-owning decisions",
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

function SpeedBars() {
  return (
    <div className="mt-3 flex max-w-[220px] flex-col gap-1.5" aria-hidden="true">
      <div className="flex items-center gap-2">
        <span className="w-14 font-mono text-[9px] uppercase tracking-widest text-slate-500">
          Before
        </span>
        <div className="h-1.5 flex-1 rounded-sm bg-slate-700" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-14 font-mono text-[9px] uppercase tracking-widest text-teal-300">
          After
        </span>
        <div className="h-1.5 w-[40%] rounded-sm bg-teal-300" />
      </div>
      <span className="ml-16 mt-1 font-mono text-[9px] uppercase tracking-widest text-slate-500">
        Avg turnaround across 12+ migrations
      </span>
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

          <figure className="relative mx-auto mt-8 max-w-2xl rounded-md bg-slate-900/70 px-8 py-8 text-center font-mono text-sm text-slate-200 ring-1 ring-slate-700 backdrop-blur-sm md:px-12 md:py-10">
            <Quote
              aria-hidden="true"
              className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2 rotate-180 fill-teal-300/20 text-teal-300/40"
              strokeWidth={1.5}
            />
            <p className="text-base italic leading-relaxed text-slate-100 md:text-lg">
              &ldquo;You don&apos;t rise to the level of your goals, you fall to
              the level of your systems.&rdquo;
            </p>
            <figcaption className="mt-4 text-xs uppercase tracking-widest text-slate-400">
              James Clear · Atomic Habits
            </figcaption>
          </figure>
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
              <div className="flex flex-1 flex-col">
                <span className="font-sans text-5xl font-bold leading-none text-slate-100 lg:text-6xl">
                  2
                </span>
                <p className="mt-3 max-w-[40ch] text-sm text-slate-300 lg:text-base">
                  Shipped from zero — solo practitioner bridging design and
                  engineering at two organizations.
                </p>
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

            {/* 3 — SMARTADVOCATE 60% with speed bars */}
            <StatTile
              label="SmartAdvocate"
              labelIcon={TrendingUp}
              number="60%"
              caption="Faster migration delivery."
              className="md:col-span-3 lg:col-span-4"
              onClickModal={open("smartAdvocate")}
              visual={<SpeedBars />}
            />

            {/* 4 — CROSS-FUNCTIONAL */}
            <CategoryTile
              label="Cross-functional"
              labelIcon={Users}
              headline="Co-owning decisions"
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

            {/* 6 — SYSTEMS THINKING (full-width, drag reveal) */}
            <Tile
              label="Systems Thinking"
              labelIcon={Recycle}
              className="md:col-span-6 lg:col-span-12 lg:row-span-2"
              decorative
            >
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                  One-off → reusable
                </h3>
                <p className="max-w-[44ch] text-sm text-slate-300 lg:text-base">
                  Every project ships team-wide tooling, not throwaway scripts.
                  Drag the handle to see the shift.
                </p>
                <div className="mt-2">
                  <BeforeAfterReveal
                    before={
                      <div className="grid h-44 grid-cols-3 gap-2 bg-slate-900 p-4">
                        {[
                          "script.sql",
                          "migrate.py",
                          "deploy.sh",
                          "fix.sql",
                          "notes.md",
                          "utils.py",
                        ].map((name) => (
                          <span
                            key={name}
                            className="flex items-center gap-1 rounded bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-300 ring-1 ring-slate-700"
                          >
                            <FileCode className="h-3 w-3 text-slate-500" />
                            {name}
                          </span>
                        ))}
                      </div>
                    }
                    after={
                      <div className="flex h-44 flex-col items-center justify-center gap-2 bg-slate-900 p-4">
                        <span className="flex items-center gap-2 rounded-lg bg-teal-400/10 px-4 py-2.5 font-mono text-sm text-teal-200 ring-1 ring-teal-300/50">
                          <Package className="h-4 w-4" />
                          starter-kit
                          <span className="ml-2 rounded bg-teal-300/20 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
                            team standard
                          </span>
                        </span>
                        <span className="flex items-center gap-2 rounded-lg bg-orange-400/10 px-4 py-2.5 font-mono text-sm text-orange-200 ring-1 ring-orange-300/50">
                          <Terminal className="h-4 w-4" />
                          $ db-cli migrate
                          <span className="ml-2 rounded bg-orange-300/20 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
                            python cli
                          </span>
                        </span>
                      </div>
                    }
                  />
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
                      <div className="relative h-72 w-full bg-slate-900 md:h-96 lg:h-[480px]">
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
                      <div className="relative h-72 w-full bg-slate-900 md:h-96 lg:h-[480px]">
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
          </div>
        </section>
      </main>

      <Modal open={!!modal} onClose={() => setModal(null)} content={modal} />
    </div>
  );
}
