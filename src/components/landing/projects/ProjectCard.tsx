import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Tag, TagGroup } from "@/components/Tag";

export type ProjectLink = { href: string; label: string };

type ProjectCardProps = {
  name: string;
  kicker: string;
  status: { label: string; intent: "teal" | "orange" };
  blurb: ReactNode;
  /** Two or three design/engineering decisions worth calling out. */
  notes: { title: string; body: ReactNode }[];
  tags: string[];
  links?: ProjectLink[];
  /** The live demo. Rendered in the right column on lg, below the copy otherwise. */
  demo: ReactNode;
  demoCaption: string;
  /** Put the demo on the left on lg — alternate down the page. */
  flip?: boolean;
};

/**
 * Full-width side-project card: copy + decisions on one side, a working demo
 * on the other. Stacks on anything narrower than lg.
 */
export function ProjectCard({
  name,
  kicker,
  status,
  blurb,
  notes,
  tags,
  links = [],
  demo,
  demoCaption,
  flip = false,
}: ProjectCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 backdrop-blur-sm">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div
          className={`flex flex-col gap-5 p-6 md:p-8 lg:p-10 ${flip ? "lg:order-2" : ""}`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              {kicker}
            </span>
            <Tag intent={status.intent} variant="tinted" size="xs">
              {status.label}
            </Tag>
          </div>

          <div className="group relative w-fit">
            <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
              {name}
            </h3>
            <span
              aria-hidden="true"
              className="absolute left-0 top-full h-1 w-full max-w-0 bg-teal-300 transition-all duration-300 group-hover:max-w-full"
            />
          </div>

          <p className="max-w-[60ch] text-base leading-relaxed text-slate-300 lg:text-lg">
            {blurb}
          </p>

          <dl className="flex flex-col gap-4 border-l border-slate-700 pl-4">
            {notes.map((n) => (
              <div key={n.title} className="flex flex-col gap-1">
                <dt className="font-mono text-xs uppercase tracking-widest text-teal-300">
                  {n.title}
                </dt>
                <dd className="text-sm leading-relaxed text-slate-300 lg:text-base">
                  {n.body}
                </dd>
              </div>
            ))}
          </dl>

          <TagGroup tags={tags} className="gap-2" />

          {links.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md font-mono text-xs uppercase tracking-widest text-teal-300 transition hover:text-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        <figure
          className={`relative flex flex-col items-center justify-center gap-4 border-t border-slate-700/70 bg-slate-950/50 px-3 py-8 sm:px-8 lg:border-t-0 lg:py-10 ${
            flip ? "lg:order-1 lg:border-r" : "lg:border-l"
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgb(100_116_139/0.35)_1px,transparent_1px)] [background-size:18px_18px]"
          />
          <div className="relative w-full">{demo}</div>
          <figcaption className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300" aria-hidden="true" />
            {demoCaption}
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
