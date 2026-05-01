"use client";

import type { RefObject } from "react";
import {
  Quote,
  Search,
  Puzzle,
  HeartHandshake,
  Boxes,
  Workflow,
  Sparkles,
} from "lucide-react";
import VerticalText from "@/components/VerticalText";
import { TechLogo } from "@/components/TechLogo";
import { Tag } from "@/components/Tag";

type IntroProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const TOOLS: { name: string; label: string; brandColor: string }[] = [
  { name: "figma", label: "Figma", brandColor: "#F24E1E" },
  { name: "adobeillustrator", label: "Adobe Illustrator", brandColor: "#FF9A00" },
  { name: "typescript", label: "TypeScript", brandColor: "#3178C6" },
  { name: "react", label: "React", brandColor: "#61DAFB" },
  { name: "nextdotjs", label: "Next.js", brandColor: "#FFFFFF" },
  { name: "tailwindcss", label: "Tailwind CSS", brandColor: "#06B6D4" },
  { name: "graphql", label: "GraphQL", brandColor: "#E10098" },
  { name: "postgresql", label: "PostgreSQL", brandColor: "#4169E1" },
  { name: "microsoftsqlserver", label: "Microsoft SQL Server", brandColor: "#CC2927" },
  { name: "prisma", label: "Prisma", brandColor: "#5AF7B0" },
  { name: "supabase", label: "Supabase", brandColor: "#3FCF8E" },
  { name: "python", label: "Python", brandColor: "#FFD43B" },
  { name: "git", label: "Git", brandColor: "#F05032" },
  { name: "claude", label: "Claude", brandColor: "#D97757" },
];

const TAGS = [
  "Design Tokens",
  "Layout Systems",
  "Prototyping",
  "MCP",
  "Skills & Agents",
];

export function Intro({ sectionRef }: IntroProps) {
  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative flex flex-col px-6 pb-12 pt-16 md:px-12 md:pt-24 lg:flex-row lg:gap-6 lg:pt-16"
    >
      <VerticalText text="INTRO" />
      <h2 className="sr-only">Intro</h2>
      <div className="flex w-full flex-col gap-10 md:gap-14">
        <Principles />
        <Tools />
        {/* <Practices /> */}
      </div>
    </section>
  );
}

function Principles() {
  return (
    <div>
      {/* Pull-quote callout */}
      <blockquote className="flex flex-col gap-4 rounded-xl bg-slate-800/40 p-6 ring-1 ring-slate-700 backdrop-blur-sm md:flex-row md:items-start md:gap-6">
        <Quote
          aria-hidden="true"
          className="h-8 w-8 shrink-0 rotate-180 fill-teal-300/20 text-teal-300/60"
          strokeWidth={1.5}
        />
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-mono text-sm italic leading-relaxed text-slate-100 lg:text-base">
            &ldquo;You don&apos;t rise to the level of your goals, you fall to
            the level of your systems.&rdquo;
          </p>
          <span className="self-center font-mono text-[10px] uppercase tracking-widest text-slate-400">
            &mdash; James Clear
          </span>
        </div>
      </blockquote>

      {/* First Principles grid */}
      <div className="mt-12 md:mt-16">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
          First Principles
        </span>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 md:contents">
              <Search
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-teal-300"
                strokeWidth={1.5}
              />
              <h3 className="font-serif text-xl font-semibold text-slate-100 lg:text-2xl">
                The details matter
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Small details compound over large surfaces to make a big
              difference.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 md:contents">
              <Puzzle
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-teal-300"
                strokeWidth={1.5}
              />
              <h3 className="font-serif text-xl font-semibold text-slate-100 lg:text-2xl">
                Solutions over tools
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Work backwards from the blue-sky result. Systems support the
              solution, not the other way around.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 md:contents">
              <HeartHandshake
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-teal-300"
                strokeWidth={1.5}
              />
              <h3 className="font-serif text-xl font-semibold text-slate-100 lg:text-2xl">
                Be kind to your future self
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Document the why and leave clever breadcrumbs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tools() {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
        Tools &amp; Languages
      </span>
      <div className="mt-6 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-5 text-slate-300">
          {TOOLS.map((t) => (
            <TechLogo
              key={t.name}
              name={t.name}
              label={t.label}
              brandColor={t.brandColor}
              size={36}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {TAGS.map((t) => (
            <Tag
              key={t}
              size="md"
              className="transition-colors hover:text-slate-100 hover:ring-slate-500"
            >
              {t}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

function Practices() {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
        Practices
      </span>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Boxes
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-teal-300"
            strokeWidth={1.5}
          />
          <h3 className="font-serif text-xl font-semibold text-slate-100 lg:text-2xl">
            Token-driven systems
          </h3>
          <p className="text-sm leading-relaxed text-slate-300">
            Tokens are the contract. Components, states, and docs all derive
            from them &mdash; change the token, everything follows.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Workflow
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-teal-300"
            strokeWidth={1.5}
          />
          <h3 className="font-serif text-xl font-semibold text-slate-100 lg:text-2xl">
            Migration as infrastructure
          </h3>
          <p className="text-sm leading-relaxed text-slate-300">
            One-off scripts become a starter kit. Standardized structure plus a
            custom CLI turns months of bespoke work into weeks of repeatable
            runs.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Sparkles
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-teal-300"
            strokeWidth={1.5}
          />
          <h3 className="font-serif text-xl font-semibold text-slate-100 lg:text-2xl">
            AI-augmented workflow
          </h3>
          <p className="text-sm leading-relaxed text-slate-300">
            Custom Claude skills, MCP servers, agentic pipelines &mdash;
            adopted team-wide. Compound leverage on every task.
          </p>
        </div>
      </div>
    </div>
  );
}
