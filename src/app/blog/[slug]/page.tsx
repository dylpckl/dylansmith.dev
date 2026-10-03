import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";
import { Header } from "@/components/Header";
import { BlogHero } from "@/components/blog/BlogHero";
import { SectionCard } from "@/components/blog/SectionCard";
import { getAllSlugs, getPostBySlug } from "@/lib/blog/posts";
import { parseBody } from "@/lib/blog/parse-body";

const SITE_URL = "https://dylansmith.dev";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} — Dylan Smith`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.publishedAt,
      authors: ["Dylan Smith"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const { intro, sections, outro } = parseBody(post.body, post.sections);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Dylan Smith" },
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex">
      <Header activeSection="blog" />

      <main className="w-full pb-20 lg:flex-1 lg:pb-32">
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/90" />

        <article className="relative mx-auto flex max-w-4xl flex-col gap-2 px-6 md:px-12">
          <BlogHero
            eyebrow={post.heroEyebrow}
            title={post.title}
            summary={post.summary}
            publishedAt={post.publishedAt}
            stats={post.heroStats}
            tags={post.tags}
          />

          {intro && (
            <div className="prose prose-invert prose-slate max-w-[68ch] prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-300">
              <Markdown>{intro}</Markdown>
            </div>
          )}

          <div className="mt-12 flex flex-col gap-6 md:gap-8">
            {sections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>

          {outro && (
            <div className="prose prose-invert prose-slate mt-12 max-w-[68ch] prose-p:text-slate-300 prose-p:leading-relaxed">
              <Markdown>{outro}</Markdown>
            </div>
          )}
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
    </div>
  );
}
