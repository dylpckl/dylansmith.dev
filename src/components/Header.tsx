"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MaterialToggle } from "@/components/workspace/MaterialToggle";

export type NavSection = { id: string; label: string };

type HeaderProps = {
  /** Id of the section currently in view, or "blog" on blog pages. */
  activeSection?: string;
  /** Landing-page sections. Omit on pages that have none. */
  sections?: NavSection[];
};

const RESUME_HREF = "/Dylan Smith - UX Engineer - April 2026.docx.pdf";

const ELSEWHERE = [
  { id: "blog", label: "Blog", href: "/blog", mark: "" },
  { id: "resume", label: "Resume", href: RESUME_HREF, mark: "↓", external: true },
  { id: "github", label: "GitHub", href: "https://github.com/dylpckl", mark: "↗", external: true },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dylanjbsmith/",
    mark: "↗",
    external: true,
  },
];

const groupLabel =
  "mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4";

const rowBase =
  "flex items-center justify-between gap-3 py-1 font-mono text-xs transition-colors focus:outline-none focus-visible:text-accent";

function Row({
  href,
  label,
  mark,
  active,
  external,
}: {
  href: string;
  label: string;
  mark?: string;
  active?: boolean;
  external?: boolean;
}) {
  const className = cn(
    rowBase,
    active ? "text-accent" : "text-ink-2 hover:text-accent",
  );
  const inner = (
    <>
      <span className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className={cn("w-2 text-[10px]", active ? "opacity-100" : "opacity-0")}
        >
          ▸
        </span>
        {label}
      </span>
      {mark && (
        <span aria-hidden="true" className="text-ink-4">
          {mark}
        </span>
      )}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-current={active ? "page" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      aria-current={active ? "page" : undefined}
    >
      {inner}
    </Link>
  );
}

/**
 * Site nav. Desktop: a sticky left panel styled like a design tool's
 * sidebar. Mobile: a sticky top strip. Same links in both.
 */
export function Header({ activeSection, sections }: HeaderProps) {
  // The material toggle only appears where the material applies (the landing
  // page). Blog pages are pinned to Slate for now.
  const showMaterial = !!sections;
  return (
    <>
      {/* Mobile strip */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-line/20 bg-panel/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-ink focus:outline-none focus-visible:text-accent"
        >
          Dylan Smith
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className={cn(
              "font-mono text-xs uppercase tracking-widest",
              activeSection === "blog" ? "text-accent" : "text-ink-2",
            )}
          >
            Blog
          </Link>
          {showMaterial && <MaterialToggle className="w-auto" />}
        </div>
      </header>

      {/* Desktop panel */}
      <aside className="hidden shrink-0 border-r border-line/20 bg-panel/90 backdrop-blur-sm lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-48 lg:flex-col lg:px-5 lg:py-8 xl:w-56">
        <Link
          href="/"
          className="mb-8 text-base font-bold tracking-tight text-ink focus:outline-none focus-visible:text-accent"
        >
          Dylan Smith
        </Link>

        {sections && sections.length > 0 && (
          <nav aria-label="Sections" className="mb-7">
            <div className={groupLabel}>Sections</div>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <Row
                    href={`/#${s.id}`}
                    label={s.label}
                    active={activeSection === s.id}
                  />
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav aria-label="Elsewhere" className="mb-7">
          <div className={groupLabel}>Elsewhere</div>
          <ul>
            {ELSEWHERE.map((e) => (
              <li key={e.id}>
                <Row
                  href={e.href}
                  label={e.label}
                  mark={e.mark}
                  active={activeSection === e.id}
                  external={e.external}
                />
              </li>
            ))}
          </ul>
        </nav>

        {showMaterial && (
          <div className="mt-auto">
            <div className={groupLabel}>Material</div>
            <MaterialToggle />
          </div>
        )}
      </aside>
    </>
  );
}
