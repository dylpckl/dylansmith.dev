import { ArrowUp, FileText, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { EMAIL, RESUME_PATH, SECTIONS } from "@/lib/site";

const link =
  "w-fit text-panel-ink-2 transition hover:text-panel-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent";

/**
 * Site footer: full-bleed panel (graphite in Paper, deep slate in Slate, same
 * surface as the sidebar). The inner column mirrors the workspace canvas —
 * offset by the sidebar + left ruler, then a centered max-w-7xl column with
 * the canvas's padding — so its content lines up with the frames above.
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-line/20 bg-panel text-panel-ink">
      {/* Sidebar + left ruler offset, then the same centered max-w-7xl column as the canvas. */}
      <div className="lg:pl-[212px] xl:pl-[244px]">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
          <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs uppercase tracking-widest text-panel-ink-3">
                Get in touch
              </span>
              <p className="max-w-[24ch] text-3xl font-semibold leading-tight md:text-4xl">
                Building something that needs design and code to agree?
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex w-fit items-center gap-2 font-mono text-sm text-panel-accent transition focus:outline-none focus-visible:ring-2 focus-visible:ring-panel-accent md:text-base"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="underline decoration-panel-accent/40 underline-offset-4 group-hover:decoration-panel-accent">
                  {EMAIL}
                </span>
              </a>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  <FileText aria-hidden="true" />
                  Resume
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 font-mono text-sm">
              <nav aria-label="Footer" className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-panel-ink-3">
                  On this page
                </span>
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`/#${s.id}`}
                    className={`${link} uppercase`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-panel-ink-3">
                  Elsewhere
                </span>
                <a href="/blog" className={link}>
                  Blog
                </a>
                <a
                  href="https://github.com/dylpckl"
                  target="_blank"
                  rel="noreferrer"
                  className={link}
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/dylanjbsmith/"
                  target="_blank"
                  rel="noreferrer"
                  className={link}
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://rarebrew.gg"
                  target="_blank"
                  rel="noreferrer"
                  className={link}
                >
                  rarebrew.gg ↗
                </a>
                <a
                  href="https://prompt-fight.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className={link}
                >
                  prompt fighter ↗
                </a>
                <a
                  href="https://dylpckl.github.io/crosscheck/"
                  target="_blank"
                  rel="noreferrer"
                  className={link}
                >
                  crosscheck ↗
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line/20 py-5 font-mono text-xs text-panel-ink-3 sm:flex-row sm:items-center sm:justify-between">
            {/* The page prerenders at build time, so the year can tick over before
              the next build; the client value wins without a hydration error. */}
            <span suppressHydrationWarning>
              © {new Date().getFullYear()} Dylan Smith · Built with Next.js +
              Tailwind
            </span>
            <a
              href="#top"
              className={`${link} inline-flex items-center gap-1.5 uppercase tracking-widest`}
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
