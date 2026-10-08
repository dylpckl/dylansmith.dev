import { ArrowUp, FileText, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { SocialLink } from "@/components/SocialLink";

const RESUME = "/Dylan Smith - UX Engineer - April 2026.docx.pdf";
const EMAIL = "dylanjbsmith@gmail.com";

const SECTIONS = ["intro", "outcomes", "work"];

/**
 * Site footer. On mobile the sidebar is hidden, so this is where the resume and
 * socials live there; on desktop it closes the page with a direct ask.
 */
export default function Footer() {
  return (
    // Full-bleed: edge to edge of the window, above the fixed sidebar (z-30) so
    // the page ends on the footer. Inner content tracks the main column's
    // margins (see page.tsx) so it lines up with the cards.
    <footer className="relative z-30 border-t border-slate-700/80 bg-slate-950/90 backdrop-blur-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgb(100_116_139/0.3)_1px,transparent_1px)] [background-size:16px_16px]"
      />
      <div className="relative px-6 md:px-12 lg:ml-[max(var(--sidebar),calc((100vw_-_var(--content))/2))] lg:mr-[max(0px,calc((100vw_-_var(--content))/2))] lg:px-[120px]">

        <div className="relative grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Get in touch
            </span>
            <p className="max-w-[24ch] text-3xl font-semibold leading-tight text-slate-100 md:text-4xl">
              Building something that needs design and code to agree?
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex w-fit items-center gap-2 font-mono text-sm text-teal-300 transition hover:text-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 md:text-base"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="underline decoration-teal-300/40 underline-offset-4 group-hover:decoration-teal-200">
                {EMAIL}
              </span>
            </a>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button href={RESUME} target="_blank" rel="noreferrer" variant="primary">
                <FileText aria-hidden="true" />
                Resume
              </Button>
              <SocialLink site="github" />
              <SocialLink site="linkedin" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 font-mono text-sm">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-500">On this page</span>
              {SECTIONS.map((s) => (
                <a
                  key={s}
                  href={`/#${s}`}
                  className="w-fit uppercase text-slate-300 transition hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                >
                  {s}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-slate-500">Side projects</span>
              <a href="https://rarebrew.gg" target="_blank" rel="noreferrer" className="w-fit text-slate-300 transition hover:text-teal-300">
                rarebrew.gg ↗
              </a>
              <a href="https://dylpckl.github.io/crosscheck/" target="_blank" rel="noreferrer" className="w-fit text-slate-300 transition hover:text-teal-300">
                crosscheck ↗
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-3 border-t border-slate-700/80 py-5 font-mono text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Dylan Smith · Built with Next.js + Tailwind</span>
          <a
            href="#top"
            className="inline-flex w-fit items-center gap-1.5 uppercase tracking-widest text-slate-400 transition hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
