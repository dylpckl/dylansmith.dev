import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function fileExists(absPath: string): Promise<boolean> {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function readPostFile(filename: string): Promise<BlogPost> {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const rawSections = (data.sections ?? []) as BlogPost["sections"];
  const sections = await Promise.all(
    rawSections.map(async (s) => {
      if (!s.screenshot) return s;
      const abs = path.join(PUBLIC_DIR, s.screenshot.replace(/^\//, ""));
      const exists = await fileExists(abs);
      return exists ? s : { ...s, screenshot: undefined };
    }),
  );

  return {
    slug: (data.slug as string) ?? slug,
    title: data.title as string,
    summary: data.summary as string,
    publishedAt: data.publishedAt as string,
    heroEyebrow: data.heroEyebrow as string | undefined,
    heroStats: data.heroStats,
    tags: data.tags,
    sections,
    body: content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }
  const mdFiles = files.filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(mdFiles.map(readPostFile));
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await readPostFile(`${slug}.md`);
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
