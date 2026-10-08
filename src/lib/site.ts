// Site-wide facts referenced from more than one component. Rename the resume
// PDF here, not in each link.
export const RESUME_PATH = "/Dylan Smith - UX Engineer - April 2026.docx.pdf";
export const EMAIL = "dylanjbsmith@gmail.com";

/** Landing frames, in page order — drives the sidebar, the footer and the scroll-spy. */
export const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "principles", label: "Principles" },
  { id: "outcomes", label: "Outcomes" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
] as const;
export type SectionId = (typeof SECTIONS)[number]["id"];
