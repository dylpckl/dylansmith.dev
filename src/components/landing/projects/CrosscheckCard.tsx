"use client";

import dynamic from "next/dynamic";
import { TagGroup } from "@/components/Tag";
import { SplitCard } from "./SplitCard";
import { PhonePlaceholder } from "./PhonePlaceholder";

const CrosscheckDemo = dynamic(() => import("./CrosscheckDemo").then((m) => m.CrosscheckDemo), {
  ssr: false,
  loading: PhonePlaceholder,
});

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = '-apple-system, "SF Pro Text", "Segoe UI", Roboto, system-ui, sans-serif';
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

const CELL = 36;
// Black squares for the background grid, as [col, row]. Hand-placed so the
// pattern reads as a real puzzle rather than noise.
const BLACKS: [number, number][] = [
  [3, 0], [11, 0], [6, 1], [14, 1], [0, 2], [9, 2], [4, 3], [12, 3], [7, 4], [15, 4], [2, 5], [10, 5],
  [5, 6], [13, 6], [1, 7], [8, 7], [16, 7], [3, 8], [11, 8], [6, 9], [14, 9], [0, 10], [9, 10], [4, 11],
  [12, 11], [7, 12], [15, 12], [2, 13], [10, 13], [5, 14], [13, 14], [1, 15], [8, 15], [16, 15], [3, 16],
  [11, 16], [6, 17], [14, 17], [0, 18], [9, 18], [4, 19], [12, 19],
];

const NOTES = [
  {
    title: "Convention over association",
    body: "Datamuse knows which words sit near a clue. Crosswords want the words setters actually use. A hand-curated corpus of crosswordese answers instantly, and the network results merge in underneath it.",
  },
  {
    title: "Evidence, not padding",
    body: "Answers backed by published puzzles get top billing, and everything else is labeled as related words. When Datamuse pads its results with junk, the app shows nothing rather than looking broken.",
  },
];

export function CrosscheckCard() {
  return (
    <SplitCard
      className="rounded-md text-[#1B1B1B]"
      style={{ background: "#EFE9DD", fontFamily: SANS }}
      masthead={
        <header className="mx-6 flex flex-col items-center gap-3 border-b-[3px] border-double border-[#1B1B1B] pb-4 pt-7 md:mx-8 lg:mx-10 lg:flex-row lg:justify-between lg:pt-8">
          <span className="order-2 text-[11px] uppercase tracking-[0.16em] text-[#5E5A50] lg:order-1 lg:w-56 lg:whitespace-nowrap">
            Mobile-first PWA · <span className="text-[#2F7A4C]">Active</span>
          </span>
          <h3 className="order-1 flex gap-[3px] sm:gap-1 lg:order-2" aria-label="crosscheck">
            {"CROSSCHECK".split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`grid h-[30px] w-[26px] place-items-center rounded-[4px] border border-b-[3px] text-[15px] font-bold sm:h-11 sm:w-10 sm:text-2xl ${
                  i === 5 ? "border-[#2B4C7E] bg-[#E3E9F3] text-[#2B4C7E]" : "border-[#D8D0BE] bg-[#FBF8F1]"
                }`}
                style={{ fontFamily: MONO }}
              >
                {ch}
              </span>
            ))}
          </h3>
          <span className="order-3 hidden text-right text-[11px] uppercase tracking-[0.16em] text-[#5E5A50] lg:block lg:w-56 lg:whitespace-nowrap">
            No backend · Works offline
          </span>
        </header>
      }
      copyClassName="lg:border-r lg:border-[#D8D0BE] lg:my-8 lg:py-2"
      figureBackground={
        <div className="absolute inset-0 opacity-60">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(#D8D0BE 1px, transparent 1px), linear-gradient(90deg, #D8D0BE 1px, transparent 1px)",
              backgroundSize: `${CELL}px ${CELL}px`,
            }}
          />
          {BLACKS.map(([c, r]) => (
            <span
              key={`${c}-${r}`}
              className="absolute bg-[#1B1B1B]"
              style={{ left: c * CELL, top: r * CELL, width: CELL + 1, height: CELL + 1 }}
            />
          ))}
        </div>
      }
      copy={
        <>
          <p className="text-xl leading-snug lg:text-2xl" style={{ fontFamily: SERIF }}>
            Type a crossword clue, get candidate answers as letter tiles plus what the word means.
          </p>
          <p className="max-w-[60ch] text-sm leading-relaxed text-[#5E5A50] lg:text-base">
            It&apos;s installable and works offline, and there&apos;s no backend: every source is called straight from
            the browser.
          </p>

          <dl className="flex flex-col gap-4">
            {NOTES.map((n) => (
              <div key={n.title} className="flex flex-col gap-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2B4C7E]">{n.title}</dt>
                <dd className="text-[15px] leading-relaxed" style={{ fontFamily: SERIF }}>
                  {n.body}
                </dd>
              </div>
            ))}
          </dl>

          <TagGroup
            tags={["TypeScript", "Vite", "PWA", "Vitest"]}
            className="gap-2"
            tagClassName="bg-[#FBF8F1] text-[#5E5A50] ring-[#D8D0BE]"
          />

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#D8D0BE] pt-5">
            <a
              href="https://dylpckl.github.io/crosscheck/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#2B4C7E] px-7 text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(43,76,126,.8)] transition hover:bg-[#1d3559] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C7E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFE9DD] sm:w-fit"
            >
              Try crosscheck ↗
            </a>
            <a
              href="https://github.com/dylpckl/crosscheck"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2B4C7E] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C7E]"
            >
              Source ↗
            </a>
          </div>
        </>
      }
      demo={<CrosscheckDemo />}
      caption="Live · real parser + corpus, live Datamuse"
      captionClassName="text-[#5E5A50]"
      dotClassName="bg-[#2B4C7E]"
    />
  );
}
