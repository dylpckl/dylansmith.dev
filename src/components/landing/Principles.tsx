"use client";

import { Canvas, Ruler } from "@/components/canvas";

type Principle = { title: string; claim: string };

const PRINCIPLES: Principle[] = [
  {
    title: "The details matter",
    claim: "Small details compound across a big surface.",
  },
  {
    title: "Solutions over tools",
    claim:
      "Work backwards from the result. The system serves the solution, not the other way around.",
  },
  {
    title: "Be kind to your future self",
    claim: "Write down the why.",
  },
];

const TOOLS = [
  "Figma",
  "Illustrator",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "GraphQL",
  "Postgres",
  "SQL Server",
  "Prisma",
  "Supabase",
  "Python",
  "Claude",
];

export function Principles() {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <ol className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
        {PRINCIPLES.map((p, i) => (
          <PrincipleItem key={p.title} principle={p} index={i} />
        ))}
      </ol>

      <p className="text-sm leading-relaxed text-ink-3 md:text-base">
        <span className="font-medium text-ink">Tools: </span>
        {TOOLS.join(", ")}.
      </p>
    </div>
  );
}

function PrincipleItem({
  principle: p,
  index,
}: {
  principle: Principle;
  index: number;
}) {
  const titleClass = "text-lg font-semibold text-ink lg:text-2xl";
  // The first title carries the page's one dimension annotation.
  const title =
    index === 0 ? (
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
      <span className="pt-0.5 font-mono text-xs text-ink-3 md:pt-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-1 md:gap-2">
        {title}
        <p className="text-[15px] leading-relaxed text-ink-2 lg:text-lg">
          {p.claim}
        </p>
      </div>
    </>
  );
  const cls =
    "grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2 border-t border-line/20 py-4 last:border-b md:flex md:flex-col md:gap-3 md:py-0 md:pt-4 md:last:border-b-0";
  return (
    <li>
      {index === 0 ? (
        <Canvas className={cls}>{body}</Canvas>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
}
