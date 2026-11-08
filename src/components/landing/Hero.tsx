"use client";

import { Canvas, Ruler } from "@/components/canvas";
import { EMAIL, RESUME_PATH } from "@/lib/site";

// How I work: folded into the intro (it used to be its own frame).
const PRINCIPLES = [
  { title: "The details matter.", body: "Small details add up over time." },
  { title: "Focused on solutions.", body: "Work backwards from the result." },
  { title: "Be kind to your future self.", body: "Do it right the first time." },
];

const LINKS = [
  { label: "Resume", mark: "↓", href: RESUME_PATH },
  { label: "GitHub", mark: "↗", href: "https://github.com/dylpckl" },
  { label: "LinkedIn", mark: "↗", href: "https://www.linkedin.com/in/dylanjbsmith/" },
  { label: "Email", mark: "", href: `mailto:${EMAIL}` },
];

export function Hero() {
  return (
    <Canvas className="flex flex-col gap-4 md:gap-6 md:pt-2">
      <h1 className="text-[44px] font-bold leading-none tracking-tight text-ink lg:text-7xl">
        Dylan Smith
      </h1>

      {/* div, not p: Ruler renders divs. */}
      <div className="max-w-[34ch] pt-5 text-xl font-medium leading-snug text-ink-2 lg:text-3xl lg:leading-snug">
        I design{" "}
        <Ruler as="span" className="inline-block w-fit align-baseline">
          <Ruler.Guideline edge="bottom" />
          <Ruler.Guideline edge="right" />
          <Ruler.Target edge="top" />
          interfaces
        </Ruler>{" "}
        and build the systems under them. Leading design at{" "}
        <a
          href="https://www.smartadvocate.com/"
          target="_blank"
          rel="noreferrer"
          className="text-ink underline decoration-accent/60 underline-offset-4 transition hover:decoration-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          SmartAdvocate
        </a>
        .
      </div>

      <ul
        aria-label="How I work"
        className="mt-2 flex max-w-3xl flex-col gap-2.5 border-t border-dashed border-line/30 pt-4 text-[15px] leading-relaxed text-ink-3 lg:text-lg"
      >
        {PRINCIPLES.map((p) => (
          <li key={p.title}>
            <span className="font-semibold text-ink">{p.title}</span> {p.body}
          </li>
        ))}
      </ul>

      {/* Phones and tablets: the sidebar carries these on desktop. */}
      <nav aria-label="Links" className="flex flex-wrap gap-x-5 font-mono text-[13px] lg:hidden">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.href.startsWith("http") || l.href.endsWith(".pdf")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            className="py-3 text-ink transition hover:text-accent focus:outline-none focus-visible:text-accent"
          >
            {l.label}
            {l.mark && <span aria-hidden="true"> {l.mark}</span>}
          </a>
        ))}
      </nav>
    </Canvas>
  );
}
