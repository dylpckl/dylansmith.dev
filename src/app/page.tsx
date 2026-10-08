import { Landing } from "@/components/landing/Landing";
import type { PostSummary } from "@/components/landing/Writing";
import { getAllPosts } from "@/lib/blog/posts";

export default async function Home() {
  const posts = await getAllPosts();
  const summaries: PostSummary[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    category: p.sections[0]?.category ?? "Notes",
  }));

  return <Landing posts={summaries} />;
}
