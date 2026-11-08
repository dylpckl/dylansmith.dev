// Site-wide facts referenced from more than one component. Rename the resume
// PDF here, not in each link.
export const RESUME_PATH = "/Dylan Smith - UX Engineer - April 2026.docx.pdf";
export const EMAIL = "dylanjbsmith@gmail.com";

/**
 * The blog is hidden until it has real posts: no links to it, nothing in the
 * sitemap, and /blog/* 404s (see app/blog/layout.tsx). Flip to bring it back.
 */
export const BLOG_ENABLED = false;

/** Landing frames, in page order — drives the sidebar, the footer and the scroll-spy. */
export const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  // { id: "writing", label: "Writing" }, — hidden for now (see Landing.tsx)
] as const;
export type SectionId = (typeof SECTIONS)[number]["id"];
