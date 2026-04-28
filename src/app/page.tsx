"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  Star,
  Palette,
  ToggleLeft,
  Accessibility,
  TrendingUp,
  Rocket,
  Users,
  Sparkles,
  Recycle,
  ArrowUpRight,
  FileCode,
  Package,
} from "lucide-react";

import { Header } from "@/components/Header";
import { SocialLink } from "@/components/SocialLink";
import MeasuredDiv from "@/components/MeasuredDiv";
import { useDimensions } from "@/lib/useDimensions";

import { Tile } from "@/components/bento/Tile";
import { StatTile } from "@/components/bento/StatTile";
import { CategoryTile } from "@/components/bento/CategoryTile";
import { Modal, type ModalContent } from "@/components/bento/Modal";
import { BeforeAfterReveal } from "@/components/bento/BeforeAfterReveal";
import { MiniTokenStrip } from "@/components/bento/MiniTokenStrip";
import { StateChips } from "@/components/bento/StateChips";

import bankRecImage from "/public/case-studies/bank-rec/spire.png";

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
  mds: {
    title: "50% faster feature time-to-ship",
    body: (
      <>
        <p>
          At MDS I overhauled the design&rarr;engineering handoff process in
          partnership with product owners, halving the time from spec to
          shipped feature.
        </p>
        <p>
          Tokens served as a shared source of truth between Figma and code,
          eliminating &ldquo;does this match the design?&rdquo; review cycles.
          User research findings (the team had no formal practice &mdash; I
          started one) drove the redesign of the flagship product&apos;s
          most-used page.
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

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");
  const [modal, setModal] = useState<ModalContent | null>(null);

  const introRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(introRef);

  useEffect(() => {
    const sections = [introRef, workRef];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25 },
    );
    sections.forEach((s) => s.current && observer.observe(s.current));
    return () => observer.disconnect();
  }, []);

  const open = (key: keyof typeof MODAL_CONTENT) => () =>
    setModal(MODAL_CONTENT[key]);

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex lg:gap-12">
      <Header activeSection={activeSection} />

      <main className="w-full pb-6 md:pb-14 lg:w-5/6 lg:pb-24">
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Intro / Hero */}
        <section
          ref={introRef}
          id="intro"
          className="relative flex flex-col gap-8 px-6 py-12 text-slate-200 md:px-12 md:py-20 lg:py-24"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-teal-300">
            Dylan Smith — UX Engineer
          </span>

          <span className="flex flex-col font-bold tracking-tight text-slate-200">
            <span className="text-5xl lg:text-7xl">Dylan Smith</span>
            <span className="mt-4 flex flex-wrap items-center gap-2 text-lg font-medium lg:text-2xl">
              Designing
              <MeasuredDiv
                parentHeight={height}
                parentWidth={width}
                guideline1={true}
                guideline1Props={{ edge: "bottom" }}
                guideline2={true}
                guideline2Props={{ edge: "right" }}
                measurement={true}
                measurementProps={{ edge: "bottom" }}
                className="w-fit"
              >
                pixel-perfect
              </MeasuredDiv>
              interfaces by day
            </span>
            <span className="mt-2 text-lg font-medium lg:text-2xl">
              & developing them by night.
            </span>
          </span>

          <div className="text-lg font-normal text-slate-200">
            Leading design for{" "}
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

          <figure className="max-w-xl border-l-2 border-teal-300/50 pl-4 font-mono text-sm text-slate-300">
            <p className="italic">
              &ldquo;You don&apos;t rise to the level of your goals, you fall to
              the level of your systems.&rdquo;
            </p>
            <figcaption className="mt-2 text-xs uppercase tracking-widest text-slate-400">
              James Clear · Atomic Habits
            </figcaption>
          </figure>

          <div className="flex gap-3">
            <SocialLink site="github" />
            <SocialLink site="linkedin" />
            <SocialLink site="email" />
          </div>
        </section>

        {/* Work / Bento */}
        <section
          ref={workRef}
          id="work"
          className="relative px-6 pb-24 md:px-12"
        >
          <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
            {/* 1 — DESIGN SYSTEMS */}
            <StatTile
              label="Design Systems"
              labelIcon={LayoutGrid}
              number="2"
              caption="Shipped from zero — solo practitioner bridging design and engineering at two organizations."
              className="md:col-span-6 lg:col-span-8 lg:row-span-2"
              onClickModal={open("designSystems")}
            />

            {/* 2 — TRACK RECORD */}
            <CategoryTile
              label="Track Record"
              labelIcon={Star}
              headline="First-of-its-kind"
              body="Both shipped systems were the first their organizations had ever built."
              className="md:col-span-6 lg:col-span-4 lg:row-span-2"
              onClickModal={open("trackRecord")}
            />

            {/* 3 — TOKENS */}
            <CategoryTile
              label="Tokens"
              labelIcon={Palette}
              headline="Color, type, spacing"
              body="Tokens as the shared source of truth between Figma and code."
              className="md:col-span-3 lg:col-span-4"
              visual={<MiniTokenStrip />}
            />

            {/* 4 — STATES */}
            <CategoryTile
              label="States"
              labelIcon={ToggleLeft}
              headline="Documented variants"
              body="Default, hover, focus, disabled — every interaction state defined."
              className="md:col-span-3 lg:col-span-4"
              visual={<StateChips />}
            />

            {/* 5 — A11Y */}
            <CategoryTile
              label="Accessibility"
              labelIcon={Accessibility}
              headline="Built in, not bolted on"
              body="WCAG AA · contrast · focus order · keyboard reachable."
              className="md:col-span-6 lg:col-span-4"
              visual={
                <span className="mt-2 inline-flex w-fit rounded-md bg-teal-400/15 px-2 py-1 font-mono text-xs uppercase tracking-widest text-teal-200 ring-1 ring-teal-300/50">
                  WCAG AA
                </span>
              }
            />

            {/* 6 — SMARTADVOCATE 60% */}
            <StatTile
              label="SmartAdvocate"
              labelIcon={TrendingUp}
              number="60%"
              caption="Faster migration delivery across 12+ concurrent projects."
              className="md:col-span-3 lg:col-span-4"
              onClickModal={open("smartAdvocate")}
            />

            {/* 7 — MDS 50% */}
            <StatTile
              label="MDS"
              labelIcon={Rocket}
              number="50%"
              caption="Faster feature time-to-ship after handoff process redesign."
              className="md:col-span-3 lg:col-span-4"
              onClickModal={open("mds")}
            />

            {/* 8 — CROSS-FUNCTIONAL */}
            <CategoryTile
              label="Cross-functional"
              labelIcon={Users}
              headline="Co-owning decisions"
              body="Across design, engineering, and product — the work of a solo bridge."
              className="md:col-span-6 lg:col-span-4"
              onClickModal={open("crossFunctional")}
            />

            {/* 9 — AI WORKFLOW */}
            <CategoryTile
              label="AI Workflow"
              labelIcon={Sparkles}
              headline="Claude Code · MCP"
              body="Custom skills, agents, and MCP workflows. Adopted across the team."
              className="md:col-span-6 lg:col-span-5"
              onClickModal={open("aiWorkflow")}
            />

            {/* 10 — SYSTEMS THINKING with drag slider (decorative tile + explicit More button — outer cannot be a button because slider handle is also a button) */}
            <Tile
              label="Systems Thinking"
              labelIcon={Recycle}
              className="md:col-span-6 lg:col-span-7 lg:row-span-2"
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
                      <div className="flex h-44 items-center justify-center bg-slate-900 p-4">
                        <span className="flex items-center gap-2 rounded-lg bg-teal-400/10 px-4 py-3 font-mono text-sm text-teal-200 ring-1 ring-teal-300/50">
                          <Package className="h-4 w-4" />
                          starter-kit
                          <span className="ml-2 rounded bg-teal-300/20 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
                            team standard
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

            {/* 11 — BANK REC link */}
            <CategoryTile
              label="Bank Rec"
              labelIcon={ArrowUpRight}
              headline="Bank Reconciliation"
              body="Case study — solo design under a one-week deadline. Read the deep dive →"
              className="md:col-span-6 lg:col-span-5"
              href="/work/bank-rec"
              visual={
                <Image
                  src={bankRecImage}
                  alt="Bank reconciliation case study preview"
                  className="mt-3 h-32 w-full rounded-md object-cover ring-1 ring-slate-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              }
            />
          </div>
        </section>
      </main>

      <Modal open={!!modal} onClose={() => setModal(null)} content={modal} />
    </div>
  );
}
