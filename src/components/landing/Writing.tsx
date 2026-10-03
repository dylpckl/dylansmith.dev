"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type PostSummary = {
  slug: string;
  title: string;
  summary: string;
  category: string;
};

type WritingProps = {
  posts: PostSummary[];
};

export function Writing({ posts }: WritingProps) {
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-[60ch] text-base leading-relaxed text-ink-2 lg:text-lg">
        Feature-level notes on what I built and what it taught me. Short,
        specific, and opinionated.
      </p>

      {posts.length === 0 ? (
        <p className="font-mono text-xs uppercase tracking-widest text-ink-3">
          Nothing published yet.
        </p>
      ) : (
        <ul className="divide-y divide-line/20 border-y border-line/20">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-8"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {post.category}
                  </span>
                  <span className="font-serif text-xl font-semibold leading-tight text-ink transition group-hover:text-accent lg:text-2xl">
                    {post.title}
                  </span>
                  <span className="max-w-[60ch] text-sm leading-relaxed text-ink-3">
                    {post.summary}
                  </span>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="hidden h-5 w-5 text-ink-4 transition group-hover:text-accent md:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/blog"
        className="w-fit font-mono text-xs uppercase tracking-widest text-accent transition hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        All writing →
      </Link>
    </div>
  );
}
