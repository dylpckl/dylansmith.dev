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
import { TagGroup } from "@/components/Tag";
import { TechLogo } from "@/components/TechLogo";

type Principle = {
  icon: LucideIcon;
  title: string;
  claim: string;
  proof: { label: string; href: string };
};

const PRINCIPLES: Principle[] = [
  {
    icon: Search,
    title: "The details matter",
    claim:
      "Small details compound over large surfaces to make a big difference.",
    proof: {
      label: "In practice: the four-control build bar",
      href: "/blog/rare-brew#section-control-bar-redesign",
    },
  },
  {
    icon: Puzzle,
    title: "Solutions over tools",
    claim:
      "Work backwards from the blue-sky result. Systems support the solution, not the other way around.",
    proof: {
      label: "In practice: a stacked list beat a clever grid",
      href: "/blog/rare-brew#section-stacked-list-view",
    },
  },
  {
    icon: HeartHandshake,
    title: "Be kind to your future self",
    claim: "Document the why and leave clever breadcrumbs.",
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
    <div className="flex flex-col gap-10 md:gap-12">
      <blockquote className="flex flex-col gap-4 rounded-xl bg-card p-6 ring-1 ring-line/25 backdrop-blur-sm md:flex-row md:items-start md:gap-6">
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

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {PRINCIPLES.map((p, i) => (
          <PrincipleCard key={p.title} principle={p} measured={i === 0} />
        ))}
      </div>

      <Tools />
    </div>
  );
}

function PrincipleCard({
  principle: p,
  measured,
}: {
  principle: Principle;
  measured: boolean;
}) {
  const Icon = p.icon;
  const titleClass = "font-serif text-xl font-semibold text-ink lg:text-2xl";

  const title = measured ? (
    <Ruler as="h3" className={`w-fit ${titleClass}`}>
      <Ruler.Guideline edge="top" />
      <Ruler.Guideline edge="bottom" />
      <Ruler.Target edge="right" />
      {p.title}
    </Ruler>
  ) : (
    <h3 className={titleClass}>{p.title}</h3>
  );

  const body = (
    <>
      <Icon
        aria-hidden="true"
        className="h-6 w-6 shrink-0 text-accent"
        strokeWidth={1.5}
      />
      {title}
      <p className="text-sm leading-relaxed text-ink-2 lg:text-base xl:text-lg">
        {p.claim}
      </p>
      <Link
        href={p.proof.href}
        className="mt-1 w-fit font-mono text-xs uppercase tracking-widest text-accent transition hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {p.proof.label} →
      </Link>
    </>
  );

  return measured ? (
    <Canvas className="flex flex-col gap-3">{body}</Canvas>
  ) : (
    <div className="flex flex-col gap-3">{body}</div>
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
