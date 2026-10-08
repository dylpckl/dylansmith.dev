// Site-wide facts referenced from more than one component. Rename the resume
// PDF here, not in each link.
export const RESUME_PATH = "/Dylan Smith - UX Engineer - April 2026.docx.pdf";
export const EMAIL = "dylanjbsmith@gmail.com";

/** Landing sections, in page order — drives the sidebar, footer and scroll-spy. */
export const SECTIONS = ["intro", "outcomes", "work"] as const;
export type SectionId = (typeof SECTIONS)[number];
