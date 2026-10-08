import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { cn } from "@/lib/utils";
import { TagGroup } from "@/components/Tag";
import type { SectionWithProse } from "@/lib/blog/types";

const ACCENT_BORDER: Record<NonNullable<SectionWithProse["accent"]>, string> = {
  teal: "before:bg-teal-300/60",
  orange: "before:bg-orange-300/60",
  slate: "before:bg-slate-500/60",
};

type SectionCardProps = {
  section: SectionWithProse;
};

export function SectionCard({ section }: SectionCardProps) {
  return (
    <article
      id={`section-${section.id}`}
      className={cn(
        "relative scroll-mt-12 rounded-2xl bg-slate-800/40 p-6 ring-1 ring-slate-700 backdrop-blur-sm md:p-10",
        "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-[3px] before:rounded-r-full",
        ACCENT_BORDER[section.accent ?? "slate"],
      )}
    >
      <div className="flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
          {section.category}
        </span>

        <h2 className="font-serif text-2xl font-semibold leading-tight text-slate-100 md:text-3xl lg:text-4xl">
          {section.title}
        </h2>

        {section.tags && section.tags.length > 0 && (
          <TagGroup tags={section.tags} intent="default" size="xs" />
        )}
      </div>

      {section.prose && (
        <div className="prose prose-invert prose-slate mt-6 max-w-[68ch] prose-p:text-slate-300 prose-p:leading-relaxed md:mt-8">
          <Markdown>{section.prose}</Markdown>
        </div>
      )}

      {section.screenshot && (
        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900 ring-1 ring-slate-700">
          <Image
            src={section.screenshot}
            alt={`${section.title} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}
    </article>
  );
}
