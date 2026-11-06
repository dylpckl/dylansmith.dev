import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { BLOG_ENABLED } from "@/lib/site";

/** Gate for every /blog route while the blog is hidden (see BLOG_ENABLED). */
export default function BlogLayout({ children }: { children: ReactNode }) {
  if (!BLOG_ENABLED) notFound();
  return children;
}
