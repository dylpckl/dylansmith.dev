import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { BLOG_ENABLED } from "@/lib/site";

const SITE_URL = "https://dylansmith.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1.0,
  };
  if (!BLOG_ENABLED) return [home];

  const posts = await getAllPosts();
  return [
    home,
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
