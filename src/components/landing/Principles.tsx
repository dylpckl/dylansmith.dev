"use client";

import Link from "next/link";
import {
  HeartHandshake,
  Puzzle,
  Quote,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Canvas, Ruler } from "@/components/canvas";
import { CountUp } from "@/components/CountUp";
import { TagGroup } from "@/components/Tag";
import { TechLogo } from "@/components/TechLogo";
import { MiniSystemDemo } from "./visuals/MiniSystemDemo";
import { ScriptsToToolkit } from "./visuals/ScriptsToToolkit";

type Principle = {
  icon: LucideIcon;
  title: string;
  claim: string;
  stat: string;
  statUnit: string;
  tags: string[];
  proof: { label: string; href: string };
  graphic?: React.ReactNode;
};

const PRINCIPLES: Principle[] = [
  {
    icon: Search,
    title: "The details matter",
    claim:
      "Small details compound over large surfaces to make a big difference.",
    stat: "2",
    statUnit: "design systems, designed & shipped end-to-end",
    tags: ["Tokens", "Atomic", "WCAG"],
    proof: {
      label: "In practice: the four-control build bar",
      href: "/blog/rare-brew#section-control-bar-redesign",
    },
    graphic: <MiniSystemDemo />,
  },
  {
    icon: Puzzle,
    title: "Solutions over tools",
    claim:
      "Work backwards from the blue-sky result. Systems support the solution, not the other way around.",
    stat: "60%",
    statUnit: "faster data migrations, 3 months to 2 weeks",
    tags: ["Python", "Monorepo", "CI/CD"],
    proof: {
      label: "In practice: a stacked list replaced a too-clever grid",
      href: "/blog/rare-brew#section-stacked-list-view",
    },
    graphic: <ScriptsToToolkit />,
  },
  {
    icon: HeartHandshake,
    title: "Be kind to your future self",
    claim: "Document the why and leave clever breadcrumbs.",
    stat: "100+",
    statUnit: "pages of documentation authored",
    tags: ["Docs", "Skills & Agents"],
    proof: {
      label: "In practice: two shells, same data",
      href: "/blog/rare-brew#section-two-shells-same-data",
    },
  },
];

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

const SKILLS = [
  "Design Tokens",
  "Layout Systems",
  "Prototyping",
  "MCP",
  "Skills & Agents",
];

export function Principles() {
  return (
    <div className="flex flex-col gap-10">
      <blockquote className="flex flex-col gap-4 rounded-xl bg-surface/40 p-6 ring-1 ring-line/25 backdrop-blur-sm md:flex-row md:items-start md:gap-6">
        <Quote
          aria-hidden="true"
          className="h-8 w-8 shrink-0 rotate-180 fill-accent/20 text-accent/60"
          strokeWidth={1.5}
        />
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-mono text-sm italic leading-relaxed text-ink lg:text-base">
            &ldquo;You don&apos;t rise to the level of your goals, you fall to
            the level of your systems.&rdquo;
          </p>
          <span className="self-center font-mono text-[10px] uppercase tracking-widest text-ink-3">
            &mdash; James Clear
          </span>
        </div>
      </blockquote>

      <p className="max-w-[60ch] text-base leading-relaxed text-ink-2 lg:text-lg">
        <CountUp to="10+" className="font-semibold text-ink" /> years across
        design, development, and data engineering, distilled to three rules.
        Each one comes with a receipt.
      </p>

      <ol className="divide-y divide-line/20 border-y border-line/20">
        {PRINCIPLES.map((p, i) => (
          <PrincipleRow key={p.title} principle={p} measured={i === 0} />
        ))}
      </ol>

      <Tools />
    </div>
  );
}

function PrincipleRow({
  principle: p,
  measured,
}: {
  principle: Principle;
  measured: boolean;
}) {
  const Icon = p.icon;

  const title = measured ? (
    <Canvas className="w-fit">
      <Ruler
        as="h3"
        className="font-serif text-2xl font-semibold text-ink lg:text-3xl"
      >
        <Ruler.Guideline edge="top" />
        <Ruler.Guideline edge="bottom" />
        <Ruler.Target edge="right" />
        {p.title}
      </Ruler>
    </Canvas>
  ) : (
    <h3 className="font-serif text-2xl font-semibold text-ink lg:text-3xl">
      {p.title}
    </h3>
  );

  return (
    <li className="grid gap-6 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 md:py-10">
      <div className="flex flex-col gap-3">
        <Icon
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-accent"
          strokeWidth={1.5}
        />
        {title}
        <p className="max-w-[56ch] text-sm leading-relaxed text-ink-2 lg:text-base xl:text-lg">
          {p.claim}
        </p>
        <TagGroup tags={p.tags} size="xs" className="mt-1" />
        <Link
          href={p.proof.href}
          className="mt-2 w-fit font-mono text-xs uppercase tracking-widest text-accent transition hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {p.proof.label} →
        </Link>
      </div>

      <div className="flex flex-col md:items-end md:text-right">
        <CountUp
          to={p.stat}
          className="font-sans text-5xl font-bold leading-none text-ink lg:text-6xl xl:text-7xl"
        />
        <span className="mt-2 max-w-[22ch] text-sm leading-snug text-ink-3 lg:text-base">
          {p.statUnit}
        </span>
      </div>

      {p.graphic && <div className="md:col-span-2">{p.graphic}</div>}
    </li>
  );
}

function Tools() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-5 text-ink-2">
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
      <TagGroup tags={SKILLS} className="gap-3" />
    </div>
  );
}
