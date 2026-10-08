"use client";

import { useCallback, useMemo, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import dynamic from "next/dynamic";
import { TagGroup } from "@/components/Tag";
import { GitHubIcon } from "@/components/SocialLink";
import { SplitCard } from "./SplitCard";
import { CC_MONO, CC_SANS, CC_SERIF } from "./fonts";
import { PhonePlaceholder } from "./PhonePlaceholder";
import { useFinePointer } from "./useFinePointer";

const CrosscheckDemo = dynamic(() => import("./CrosscheckDemo").then((m) => m.CrosscheckDemo), {
  ssr: false,
  loading: PhonePlaceholder,
});


const CELL = 36;
// Black squares for the background grid, as [col, row]. Hand-placed so the
// pattern reads as a real puzzle rather than noise.
const BLACKS: [number, number][] = [
  [3, 0], [11, 0], [6, 1], [14, 1], [0, 2], [9, 2], [4, 3], [12, 3], [7, 4], [15, 4], [2, 5], [10, 5],
  [5, 6], [13, 6], [1, 7], [8, 7], [16, 7], [3, 8], [11, 8], [6, 9], [14, 9], [0, 10], [9, 10], [4, 11],
  [12, 11], [7, 12], [15, 12], [2, 13], [10, 13], [5, 14], [13, 14], [1, 15], [8, 15], [16, 15], [3, 16],
  [11, 16], [6, 17], [14, 17], [0, 18], [9, 18], [4, 19], [12, 19],
];

const BLACK_SET = new Set(BLACKS.map(([c, r]) => `${c},${r}`));

/**
 * Crossword-app cursor: over the grid behind the phone, the square under the
 * pointer becomes the active cell and its row the active word. Black squares
 * can't be selected, same as a real grid.
 */
function useActiveCell() {
  const enabled = useFinePointer();
  const [cell, setCell] = useState<{ c: number; r: number } | null>(null);
  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!enabled) return;
      const fig = e.currentTarget.querySelector("figure");
      if (!fig) return;
      const b = fig.getBoundingClientRect();
      const x = e.clientX - b.left;
      const y = e.clientY - b.top;
      if (x < 0 || y < 0 || x > b.width || y > b.height) return setCell(null);
      const c = Math.floor(x / CELL);
      const r = Math.floor(y / CELL);
      if (BLACK_SET.has(`${c},${r}`)) return;
      setCell((cur) => (cur?.c === c && cur?.r === r ? cur : { c, r }));
    },
    [enabled],
  );
  const onPointerLeave = useCallback(() => setCell(null), []);
  return { cell, onPointerMove, onPointerLeave };
}

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
  const { cell, onPointerMove, onPointerLeave } = useActiveCell();
  // Created once so active-cell renders don't re-render the demo subtree.
  const demo = useMemo(() => <CrosscheckDemo />, []);
  return (
    <SplitCard
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="rounded-md text-[#1B1B1B]"
      style={{ background: "#EFE9DD", fontFamily: CC_SANS }}
      masthead={
        <header className="mx-6 flex flex-col items-center gap-3 border-b-[3px] border-double border-[#1B1B1B] pb-4 pt-7 md:mx-8 lg:mx-10 lg:flex-row lg:justify-between lg:pt-8">
          <span className="order-2 text-[11px] uppercase tracking-[0.16em] text-[#5E5A50] lg:order-1 lg:w-56 lg:whitespace-nowrap">
            Mobile-first PWA
          </span>
          {/* Tiles flex to fit the column on narrow phones (10 fixed tiles
              overflowed at 320px), then settle at a fixed size from sm up. */}
          <h3 className="order-1 flex w-full max-w-[430px] gap-[2px] sm:w-auto sm:gap-1 lg:order-2" aria-label="crosscheck">
            {"CROSSCHECK".split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`grid aspect-[10/11] min-w-0 flex-1 place-items-center rounded-[4px] border border-b-[3px] text-[clamp(11px,4vw,15px)] font-bold sm:aspect-auto sm:h-11 sm:w-10 sm:flex-none sm:text-2xl ${
                  i === 5 ? "border-[#2B4C7E] bg-[#E3E9F3] text-[#2B4C7E]" : "border-[#D8D0BE] bg-[#FBF8F1]"
                }`}
                style={{ fontFamily: CC_MONO }}
              >
                {ch}
              </span>
            ))}
          </h3>
          {/* Balances the left label so the tiles stay centered. */}
          <span aria-hidden="true" className="order-3 hidden lg:block lg:w-56" />
        </header>
      }
      copyClassName="lg:border-r lg:border-[#D8D0BE] lg:my-8 lg:py-2"
      figureBackground={
        <>
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
        {cell && (
          <>
            <span
              className="absolute inset-x-0 bg-[#2B4C7E]/10 transition-[top] duration-75"
              style={{ top: cell.r * CELL, height: CELL + 1 }}
            />
            <span
              className="absolute box-border border-2 border-[#2B4C7E] bg-[#E3E9F3] transition-[left,top] duration-75"
              style={{ left: cell.c * CELL, top: cell.r * CELL, width: CELL + 1, height: CELL + 1 }}
            />
          </>
        )}
        </>
      }
      copy={
        <>
          <p className="text-xl leading-snug lg:text-2xl" style={{ fontFamily: CC_SERIF }}>
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
                <dd className="text-[15px] leading-relaxed" style={{ fontFamily: CC_SERIF }}>
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

          <div className="mt-auto flex items-center gap-3 border-t border-[#D8D0BE] pt-5">
            <a
              href="https://github.com/dylpckl/crosscheck"
              target="_blank"
              rel="noreferrer"
              aria-label="crosscheck on GitHub"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border-[1.5px] border-[#D8D0BE] bg-[#FBF8F1] text-[#2B4C7E] transition hover:border-[#2B4C7E] hover:bg-[#E3E9F3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C7E] [&>svg]:h-6 [&>svg]:w-6"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://dylpckl.github.io/crosscheck/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#2B4C7E] px-7 text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(43,76,126,.8)] transition hover:bg-[#1d3559] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C7E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFE9DD] sm:w-fit"
            >
              Try crosscheck ↗
            </a>
          </div>
        </>
      }
      demo={demo}
      caption="Live · real parser + corpus, live Datamuse"
      captionClassName="text-[#5E5A50]"
      dotClassName="bg-[#2B4C7E]"
    />
  );
}
