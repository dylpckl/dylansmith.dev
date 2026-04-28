"use client";

// V3 PREVIEW — Bento mockup
// Stats + achievements + case studies in a tiled grid.
// Tiles either link to a full page (case studies, side projects) or open a
// popover (stats, achievements). Compare against / and /v2.

import { useState, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { SocialLink } from "@/components/SocialLink";
import { cn } from "@/lib/utils";

// ---------- Popover ----------

type PopoverContent = {
  title: string;
  body: ReactNode;
};

function Popover({
  open,
  onClose,
  content,
}: {
  open: boolean;
  onClose: () => void;
  content: PopoverContent | null;
}) {
  if (!open || !content) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-6 max-w-2xl rounded-2xl bg-slate-800 p-8 ring-1 ring-slate-600"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-teal-300">
          {content.title}
        </h3>
        <div className="text-lg text-slate-100">{content.body}</div>
      </div>
    </div>
  );
}

// ---------- Tile primitives ----------

function Tile({
  children,
  className,
  onClick,
  href,
  external,
  hoverable = true,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  hoverable?: boolean;
}) {
  const base = cn(
    "group relative flex flex-col overflow-hidden rounded-2xl bg-slate-800/60 p-6 ring-1 ring-slate-700 transition-all duration-300",
    hoverable && "hover:bg-slate-800 hover:ring-teal-300/50",
    className,
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={base}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} className={cn(base, "text-left")}>
        {children}
      </button>
    );
  }
  return <div className={cn(base, "cursor-default")}>{children}</div>;
}

function StatTile({
  number,
  label,
  detail,
  onOpen,
  className,
}: {
  number: string;
  label: string;
  detail: PopoverContent;
  onOpen: (c: PopoverContent) => void;
  className?: string;
}) {
  return (
    <Tile onClick={() => onOpen(detail)} className={className}>
      <span className="font-sans text-5xl font-bold leading-none text-teal-300 lg:text-6xl">
        {number}
      </span>
      <span className="mt-3 font-mono text-xs uppercase tracking-widest text-slate-300">
        {label}
      </span>
      <span className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-teal-300">
        + tap for detail
      </span>
    </Tile>
  );
}

function CaseStudyTile({
  label,
  title,
  blurb,
  href,
  className,
}: {
  label: string;
  title: string;
  blurb: string;
  href: string;
  className?: string;
}) {
  return (
    <Tile href={href} className={cn("justify-between", className)}>
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-teal-300">
          {label}
        </span>
        <h3 className="mt-3 text-2xl font-bold text-slate-100 lg:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm text-slate-300 lg:text-base">{blurb}</p>
      </div>
      <div className="mt-4 flex items-center justify-end">
        <ArrowUpRight className="h-6 w-6 text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-300" />
      </div>
    </Tile>
  );
}

function AchievementTile({
  text,
  detail,
  onOpen,
  className,
}: {
  text: string;
  detail: PopoverContent;
  onOpen: (c: PopoverContent) => void;
  className?: string;
}) {
  return (
    <Tile onClick={() => onOpen(detail)} className={className}>
      <span className="font-mono text-xs uppercase tracking-widest text-orange-300">
        achievement
      </span>
      <p className="mt-3 text-base font-medium text-slate-100 lg:text-lg">
        {text}
      </p>
      <span className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-teal-300">
        + tap for story
      </span>
    </Tile>
  );
}

function SideProjectTile({
  title,
  blurb,
  href,
  className,
}: {
  title: string;
  blurb: string;
  href: string;
  className?: string;
}) {
  return (
    <Tile href={href} external className={cn("justify-between", className)}>
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
          side project
        </span>
        <h3 className="mt-3 text-xl font-bold text-slate-100">{title}</h3>
        <p className="mt-3 text-sm text-slate-300">{blurb}</p>
      </div>
      <div className="mt-4 flex items-center justify-end">
        <ArrowUpRight className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-300" />
      </div>
    </Tile>
  );
}

// ---------- Page ----------

export default function V3Page() {
  const [popover, setPopover] = useState<PopoverContent | null>(null);
  const open = (c: PopoverContent) => setPopover(c);
  const close = () => setPopover(null);

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-100">
      <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_60%,transparent_100%)]" />

      {/* PREVIEW BANNER */}
      <div className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full bg-purple-400/20 px-4 py-2 text-xs font-mono uppercase text-purple-200 ring-1 ring-purple-400/40 backdrop-blur-sm">
        preview · v3 · bento · <a href="/" className="underline hover:text-teal-300">/</a> · <a href="/v2" className="underline hover:text-teal-300">/v2</a>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        {/* Bento grid */}
        <div className="grid grid-cols-12 auto-rows-[minmax(140px,auto)] gap-4">
          {/* HERO — 8x2 */}
          <div className="col-span-12 row-span-2 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 ring-1 ring-slate-700 lg:col-span-8 lg:p-10">
            <span className="font-mono text-xs uppercase tracking-widest text-teal-300">
              Dylan Smith — UX Engineer
            </span>
            <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-100 lg:text-6xl">
              The implementation layer between design and engineering.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Solutions-first systems builder turning one-off UI work into
              reusable, compounding system capabilities. Design systems shipped
              at two organizations, in legacy ASP.NET and modern React.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink site="github" />
              <SocialLink site="linkedin" />
            </div>
          </div>

          {/* HEADLINE STATS — 2 stacked tiles 4x1 each */}
          <StatTile
            number="10+"
            label="Years shipping"
            detail={{
              title: "10+ years in the overlap",
              body: (
                <p>
                  Living between product design, front-end development, and
                  database architecture since 2014. Started in software support,
                  shipped financial reports, then data migration, then design
                  leadership, then UX engineering. The throughline:
                  building tools and systems that make work easier for the team.
                </p>
              ),
            }}
            onOpen={open}
            className="col-span-6 lg:col-span-4"
          />
          <StatTile
            number="2"
            label="Design systems shipped"
            detail={{
              title: "Two design systems, two organizations",
              body: (
                <ul className="list-inside list-disc space-y-2">
                  <li>
                    <strong>SmartAdvocate (current):</strong> Architected the
                    org&apos;s first design system — token architecture,
                    component variants, documented interaction states, WCAG
                    from day one.
                  </li>
                  <li>
                    <strong>MDS (prior):</strong> Founded and scaled the
                    company&apos;s first design system using atomic
                    methodology; partnered with engineering on tokens as a
                    shared source of truth.
                  </li>
                </ul>
              ),
            }}
            onOpen={open}
            className="col-span-6 lg:col-span-4"
          />

          {/* TWO BIG CASE STUDIES */}
          <CaseStudyTile
            label="case study · current · systems"
            title="Site-wide UI Refresh"
            blurb="Refreshing an enterprise product end-to-end — and architecting the org's first design system underneath. Unveiled at the annual user conference."
            href="/work/design-system"
            className="col-span-12 row-span-2 lg:col-span-6"
          />
          <CaseStudyTile
            label="case study · current · ai tooling"
            title="AI Toolchain"
            blurb="Claude Code skills, agents, and MCP-driven workflows producing code-ready output. Adopted across teams for design system implementation and data migration."
            href="/work/ai-tooling"
            className="col-span-12 row-span-2 lg:col-span-6"
          />

          {/* IMPACT STATS ROW — 4 tiles */}
          <StatTile
            number="60%"
            label="Turnaround reduction"
            detail={{
              title: "60% faster turnaround across 12+ projects",
              body: (
                <p>
                  Treated each data migration engagement as an opportunity to
                  build reusable team infrastructure rather than ship one-off
                  scripts. Built a starter-kit monorepo (project boilerplate,
                  curated migration scripts, shared tooling, CI/CD) and a
                  Python CLI for terminal-based DB ops — both adopted as team
                  standards.
                </p>
              ),
            }}
            onOpen={open}
            className="col-span-6 lg:col-span-3"
          />
          <StatTile
            number="50%"
            label="Time-to-ship cut"
            detail={{
              title: "50% time-to-ship reduction at MDS",
              body: (
                <p>
                  Overhauled the feature handoff process in partnership with
                  product owners — reducing time-to-ship by 50% and improving
                  cross-surface cohesion. Co-owned decisions with engineering
                  rather than passing handoff loops back and forth.
                </p>
              ),
            }}
            onOpen={open}
            className="col-span-6 lg:col-span-3"
          />
          <StatTile
            number="1k+"
            label="Daily users served"
            detail={{
              title: "1,000+ daily users at MDS",
              body: (
                <p>
                  Led design from concept to production for several keystone
                  features serving 1,000+ daily users at MDS Property
                  Management — including UX research, UI design, stakeholder
                  feedback, and developer collaboration.
                </p>
              ),
            }}
            onOpen={open}
            className="col-span-6 lg:col-span-3"
          />
          <StatTile
            number="12+"
            label="Concurrent projects"
            detail={{
              title: "12+ concurrent migration projects",
              body: (
                <p>
                  Lead engineer on data migration projects for North
                  America&apos;s foremost property management firm (portfolio
                  worth $6B). Coordinated strategy meetings with external
                  decision makers; translated business logic into optimized SQL
                  database architecture.
                </p>
              ),
            }}
            onOpen={open}
            className="col-span-6 lg:col-span-3"
          />

          {/* PRIOR-ORG CASE STUDIES */}
          <CaseStudyTile
            label="case study · prior · feature"
            title="Bank Reconciliation"
            blurb="Redesigning an accountant's critical monthly task. Side-by-side data tables with tight visual hierarchy."
            href="/work/bank-rec"
            className="col-span-12 row-span-2 lg:col-span-6"
          />
          <CaseStudyTile
            label="case study · prior · feature"
            title="RapidPay"
            blurb="Streamlining a complex form for OCR-validated invoices. State-modeling for confidence, validation, and recovery."
            href="/work/rapidpay"
            className="col-span-12 row-span-2 lg:col-span-6"
          />

          {/* ACHIEVEMENT TILES + SOCIALS */}
          <AchievementTile
            text="WCAG-aligned accessibility considered from day one of the design system."
            detail={{
              title: "Accessibility from the start, not retrofit",
              body: (
                <p>
                  When you&apos;re building the org&apos;s first design system,
                  you&apos;re writing the rules everyone else will follow. I
                  wrote WCAG-aligned color contrast, focus states, keyboard
                  navigation, and ARIA conventions into the foundational
                  primitives — not as a compliance pass after launch.
                </p>
              ),
            }}
            onOpen={open}
            className="col-span-12 lg:col-span-4"
          />
          <AchievementTile
            text="Largest contributor to the internal Confluence knowledge base — evergreen docs for component patterns, conventions, and schemas."
            detail={{
              title: "Documentation-first",
              body: (
                <p>
                  A design system without docs is just a Figma file. I&apos;ve
                  authored hundreds of pages of evergreen technical
                  documentation — component patterns, system conventions,
                  database schemas — designed for teams to self-serve from
                  rather than ping me.
                </p>
              ),
            }}
            onOpen={open}
            className="col-span-12 lg:col-span-4"
          />
          <Tile className="col-span-12 justify-between lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                more
              </span>
              <p className="mt-3 text-base text-slate-200">
                Resume · GitHub · LinkedIn
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="/dylan-smith-resume.pdf"
                target="_blank"
                className="rounded-md bg-teal-300 px-4 py-2 font-mono text-xs uppercase text-teal-900 hover:bg-teal-400"
              >
                Resume
              </a>
              <SocialLink site="github" />
              <SocialLink site="linkedin" />
            </div>
          </Tile>

          {/* SIDE PROJECTS + SKILLS */}
          <SideProjectTile
            title="SteamParty"
            blurb="Find Steam games friends own. React, React Query, Tailwind."
            href="https://www.steamparty.io"
            className="col-span-12 lg:col-span-4"
          />
          <SideProjectTile
            title="encounter+"
            blurb="A customizable DM screen for tabletop RPG sessions. Next.js, Firebase."
            href="https://github.com/dylpckl/encounter-plus"
            className="col-span-12 lg:col-span-4"
          />
          <Tile className="col-span-12 lg:col-span-4">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              stack
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind",
                "Figma",
                "Design Tokens",
                "Claude Code",
                "MCP",
                "Python",
                "SQL Server",
                "PostgreSQL",
                "Prisma",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-700/60 px-2 py-1 font-mono text-xs text-slate-300 ring-1 ring-inset ring-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Tile>
        </div>
      </main>

      <Popover open={!!popover} onClose={close} content={popover} />
    </div>
  );
}
