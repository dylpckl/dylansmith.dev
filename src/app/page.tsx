"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  FileCode,
  Package,
  FileText,
  Quote,
  Terminal,
  CreditCard,
  Layers,
  Sparkles,
  Compass,
  Search,
  Puzzle,
} from "lucide-react";

import { Header } from "@/components/Header";
import { SocialLink } from "@/components/SocialLink";
import { Button } from "@/components/Button";
import MeasuredDiv from "@/components/MeasuredDiv";
import VerticalText from "@/components/VerticalText";
import { useDimensions } from "@/lib/useDimensions";

import { Tile } from "@/components/bento/Tile";
import { StatTile } from "@/components/bento/StatTile";
import { Feature } from "@/components/bento/Feature";
import { Support } from "@/components/bento/Support";
import { BeforeAfterReveal } from "@/components/bento/BeforeAfterReveal";
import { MiniTokenStrip } from "@/components/bento/MiniTokenStrip";
import { StateChips } from "@/components/bento/StateChips";

import bankRecLegacy from "/public/case-studies/bank-rec/legacy.png";
import bankRecSpire from "/public/case-studies/bank-rec/spire.png";
import rapidpayLegacy from "/public/case-studies/rapidpay/legacy.png";
import rapidpaySpire from "/public/case-studies/rapidpay/spire.png";

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
          Spacing
        </span>
        <div className="mt-3 flex flex-col gap-6" aria-hidden="true">
          {[
            { label: "sm", gap: "gap-1" },
            { label: "md", gap: "gap-3" },
            { label: "lg", gap: "gap-6" },
          ].map(({ label, gap }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-6 font-mono text-[9px] uppercase tracking-widest text-slate-500">
                {label}
              </span>
              <MeasuredDiv
                guideline1={false}
                guideline1Props={{ edge: "bottom" }}
                guideline2={false}
                guideline2Props={{ edge: "bottom" }}
                measurement={true}
                measurementProps={{ edge: "bottom" }}
                className="inline-flex w-fit"
              >
                <div className={`flex ${gap}`}>
                  <span className="h-5 w-5 rounded-sm bg-teal-300/30 ring-1 ring-teal-300/60" />
                  <span className="h-5 w-5 rounded-sm bg-teal-300/30 ring-1 ring-teal-300/60" />
                </div>
              </MeasuredDiv>
            </div>
          ))}
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

function ScatteredFiles() {
  const files = [
    "script.sql",
    "migrate.py",
    "deploy.sh",
    "fix.sql",
    "notes.md",
    "utils.py",
    "backfill.sql",
    "audit.sql",
    "patches.sql",
  ];
  const styleFor = (name: string) => {
    if (name.endsWith(".sql"))
      return {
        cell: "bg-violet-500/10 ring-violet-300/40 text-violet-200",
        icon: "text-violet-300",
      };
    if (name.endsWith(".py"))
      return {
        cell: "bg-pink-500/10 ring-pink-300/40 text-pink-200",
        icon: "text-pink-300",
      };
    return {
      cell: "bg-slate-800 ring-slate-700 text-slate-300",
      icon: "text-slate-500",
    };
  };
  return (
    <div className="grid w-fit grid-cols-3 gap-2" aria-hidden="true">
      {files.map((name) => {
        const s = styleFor(name);
        return (
          <span
            key={name}
            className={`flex w-32 items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[11px] ring-1 ${s.cell}`}
          >
            <FileCode className={`h-3 w-3 shrink-0 ${s.icon}`} />
            {name}
          </span>
        );
      })}
    </div>
  );
}

function OneOffConsolidation() {
  return (
    <div className="flex flex-col items-stretch gap-4 rounded-lg bg-slate-900/80 p-6 ring-1 ring-slate-700 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <ScatteredFiles />

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

      <div className="grid w-fit shrink-0 grid-cols-1 gap-2">
        <span className="flex flex-col items-start gap-1.5 whitespace-nowrap rounded-lg bg-teal-400/10 px-4 py-2.5 font-mono text-sm text-teal-200 ring-1 ring-teal-300/50 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <span className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            migration-starter-kit
          </span>
          <span className="rounded bg-teal-300/20 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
            repository
          </span>
        </span>
        <span className="flex flex-col items-start gap-1.5 whitespace-nowrap rounded-lg bg-orange-400/10 px-4 py-2.5 font-mono text-sm text-orange-200 ring-1 ring-orange-300/50 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <span className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />$ db-cli migrate
          </span>
          <span className="rounded bg-orange-300/20 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
            python cli
          </span>
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");

  const heroRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const caseStudiesRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(heroRef);

  useEffect(() => {
    const sections = [introRef, workRef, caseStudiesRef];
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

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex">
      <Header activeSection={activeSection} />

      <main className="w-full gap-10 pb-6 md:pb-14 lg:w-5/6 lg:pb-24">
        {/* Site-wide background layers (z stack: mountain -30, dotted -20, gradient overlay -10) */}
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/90" />

        {/* Hero */}
        <section
          ref={heroRef}
          id="hero"
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

        {/* Intro / Bento */}
        <section
          ref={introRef}
          id="intro"
          className="relative flex flex-col px-6 pb-12 pt-16 md:px-12 md:pt-24 lg:flex-row lg:gap-6 lg:pt-16"
        >
          <VerticalText text="INTRO" />
          <div className="grid w-full auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
            {/* 0 — FIRST PRINCIPLES (full-width; 3 principles) */}
            <Tile
              label="First Principles"
              labelIcon={Compass}
              className="md:col-span-6 lg:col-span-12"
              decorative
            >
              <div className="grid grid-cols-1 gap-6 px-2 py-4 md:grid-cols-3 md:gap-8">
                {/* James Clear — the systems-first quote */}
                <div className="flex flex-col gap-3">
                  <Quote
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 rotate-180 fill-teal-300/20 text-teal-300/60"
                    strokeWidth={1.5}
                  />
                  <p className="font-mono text-sm italic leading-relaxed text-slate-100 lg:text-base">
                    &ldquo;You don&apos;t rise to the level of your goals, you
                    fall to the level of your systems.&rdquo;
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    James Clear
                  </span>
                </div>

                {/* Details Matter */}
                <div className="flex flex-col gap-3">
                  <Search
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-teal-300"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-serif text-xl font-semibold text-slate-100 lg:text-2xl">
                    Details Matter
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Pixel-perfect isn&apos;t a slogan. Token-level spec,
                    state-by-state docs, schemas worth shipping from.
                  </p>
                </div>

                {/* Solutions First */}
                <div className="flex flex-col gap-3">
                  <Puzzle
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-teal-300"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-serif text-xl font-semibold text-slate-100 lg:text-2xl">
                    Solutions First
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Solve the problem before naming the system. Systems emerge
                    from solutions, not the other way around.
                  </p>
                </div>
              </div>
            </Tile>

            {/* 1 — FEATURE 1: DESIGN SYSTEMS (col-8 row-2) */}
            <Feature
              verb="Designed & Developed"
              tag="Tokens · Atomic · WCAG"
              stat="2"
              statUnit="design systems"
              subtitle={
                <>
                  First-of-their-kind at MDS and{" "}
                  <a
                    href="https://www.smartadvocate.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-slate-500 underline-offset-2 transition hover:decoration-teal-300"
                  >
                    SmartAdvocate
                  </a>
                  &mdash; both adopted as team standard.
                </>
              }
              graphic={<MiniSystemDemo />}
              graphicPosition="below"
              className="md:col-span-6 lg:col-span-8 lg:row-span-2"
            />

            {/* 2 — SUPPORT A: AI tooling */}
            <Support icon={Sparkles} className="md:col-span-3 lg:col-span-4">
              Custom Claude skills, MCP workflows, agentic pipelines &mdash;
              adopted team-wide.
            </Support>

            {/* 3 — SUPPORT B: Docs (stat tile) */}
            <StatTile
              label="Docs Contributor"
              labelIcon={FileText}
              number="#1"
              caption="Patterns, conventions, schemas — the docs the engineering team ships from."
              className="md:col-span-3 lg:col-span-4"
            />

            {/* 4 — FEATURE 2: FASTER MIGRATIONS (full row, restructured one-off) */}
            <Feature
              verb="Faster data migrations"
              tag="Python · Monorepo · CI/CD"
              stat="60%"
              statUnit="faster data migrations"
              subtitle={
                <>
                  Cut from <strong>3 months to 2 weeks</strong> by{" "}
                  <span className="text-teal-200">
                    standardizing project structure
                  </span>{" "}
                  and building a{" "}
                  <span className="text-orange-200">
                    custom Python CLI package.
                  </span>
                </>
              }
              graphic={<OneOffConsolidation />}
              graphicPosition="below"
              className="md:col-span-6 lg:col-span-12"
            />
          </div>
        </section>

        {/* Case Studies — separate section so the large drag-reveals don't intermix with the bento */}
        <section
          ref={workRef}
          id="work"
          className="relative flex flex-col px-6 pb-24 md:px-12 lg:flex-row lg:gap-6 lg:pt-32"
        >
          <VerticalText text="WORK" />
          <div className="flex w-full flex-col gap-4">
            {/* 8 — BANK REC */}
            <Tile
              label="Bank Rec"
              labelIcon={ArrowUpRight}
              className=""
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

            {/* 9 — RAPIDPAY (extra-large, full-width drag reveal) */}
            <Tile
              label="RapidPay"
              labelIcon={CreditCard}
              className=""
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
              className=""
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
    </div>
  );
}
