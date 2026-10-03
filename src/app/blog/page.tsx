import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — Dylan Smith",
  description:
    "Long-form devlogs and project timelines. How things get built, told by the git history.",
  alternates: { canonical: "https://dylansmith.dev/blog" },
  openGraph: {
    title: "Blog — Dylan Smith",
    description:
      "Long-form devlogs and project timelines. How things get built, told by the git history.",
    type: "website",
    url: "https://dylansmith.dev/blog",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex">
      <Header activeSection="blog" />

      <main className="w-full pb-20 lg:flex-1 lg:pb-32">
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/90" />

        <section className="relative mx-auto flex max-w-4xl flex-col gap-10 px-6 pt-8 md:px-12 md:pt-12 lg:pt-20">
          <header className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-teal-300">
              Journal
            </span>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-slate-100 md:text-5xl">
              Project timelines
            </h1>
            <p className="max-w-[60ch] text-lg leading-relaxed text-slate-300">
              Long-form writeups of how the things on my work page actually got
              built — drawn from the commits, branches, and dead ends that
              shaped them.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-slate-400">No posts yet — check back soon.</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
