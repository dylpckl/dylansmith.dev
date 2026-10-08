import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TagGroup } from "@/components/Tag";
import type { BlogPost } from "@/lib/blog/types";

type PostCardProps = {
  post: BlogPost;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-slate-800/60 p-6 ring-1 ring-slate-700 backdrop-blur-sm transition hover:bg-slate-800 hover:ring-teal-300/60 focus:outline-none focus:ring-2 focus:ring-teal-300 md:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-[10px] uppercase tracking-widest text-slate-400"
        >
          {formatDate(post.publishedAt)}
        </time>
        <ArrowUpRight
          className="h-5 w-5 text-slate-500 transition group-hover:text-teal-300"
          aria-hidden="true"
        />
      </div>

      <h2 className="font-serif text-2xl font-semibold leading-tight text-slate-100 md:text-3xl">
        {post.title}
      </h2>

      <p className="max-w-[60ch] text-base leading-relaxed text-slate-300">
        {post.summary}
      </p>

      {post.tags && post.tags.length > 0 && (
        <TagGroup tags={post.tags} intent="default" size="xs" className="mt-2" />
      )}
    </Link>
  );
}
