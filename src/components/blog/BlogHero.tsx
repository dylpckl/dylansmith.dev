import { TagGroup } from "@/components/Tag";
import type { HeroStat } from "@/lib/blog/types";

type BlogHeroProps = {
  eyebrow?: string;
  title: string;
  summary: string;
  publishedAt: string;
  stats?: HeroStat[];
  tags?: string[];
};

function formatPublished(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogHero({
  eyebrow,
  title,
  summary,
  publishedAt,
  stats,
  tags,
}: BlogHeroProps) {
  return (
    <header className="flex flex-col gap-6 pb-10 pt-6 md:pt-10">
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-widest text-teal-300">
          {eyebrow}
        </span>
      )}
      <h1 className="font-serif text-4xl font-semibold leading-tight text-slate-100 md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="max-w-[60ch] text-lg leading-relaxed text-slate-300 md:text-xl">
        {summary}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
        <time
          dateTime={publishedAt}
          className="font-mono text-xs uppercase tracking-widest"
        >
          {formatPublished(publishedAt)}
        </time>
        {tags && tags.length > 0 && (
          <>
            <span className="text-slate-600">/</span>
            <TagGroup tags={tags} intent="default" size="xs" />
          </>
        )}
      </div>
      {stats && stats.length > 0 && (
        <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-slate-700/60 pt-6 md:grid-cols-3 md:gap-x-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                {s.label}
              </dt>
              <dd className="font-serif text-2xl font-semibold text-slate-100 md:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
