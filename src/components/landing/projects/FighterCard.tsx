"use client";

import dynamic from "next/dynamic";
import { TagGroup } from "@/components/Tag";
import { ROSTER } from "@/lib/demos/prompt-fighter/roster";
import { SplitCard } from "./SplitCard";
import { PixelSprite } from "./PixelSprite";
import { pressStart } from "./fonts";

const PromptFighterDemo = dynamic(() => import("./PromptFighterDemo").then((m) => m.PromptFighterDemo), {
  ssr: false,
  loading: () => <div className="mx-auto h-[600px] w-full max-w-[560px] animate-pulse rounded-md bg-[#141417] ring-1 ring-[#2a2a31]" />,
});

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

// Stepped pixel corners — the cabinet bezel.
const BEZEL =
  "polygon(0 16px, 8px 16px, 8px 8px, 16px 8px, 16px 0, calc(100% - 16px) 0, calc(100% - 16px) 8px, calc(100% - 8px) 8px, calc(100% - 8px) 16px, 100% 16px, 100% calc(100% - 16px), calc(100% - 8px) calc(100% - 16px), calc(100% - 8px) calc(100% - 8px), calc(100% - 16px) calc(100% - 8px), calc(100% - 16px) 100%, 16px 100%, 16px calc(100% - 8px), 8px calc(100% - 8px), 8px calc(100% - 16px), 0 calc(100% - 16px))";

const champ = ROSTER.reduce((best, f) => (f.wins > best.wins ? f : best));

export function FighterCard() {
  return (
    <SplitCard
      flip
      className="text-[#e9e9ec]"
      style={{ background: "#0b0b0c", fontFamily: MONO, clipPath: BEZEL }}
      background={
        <>
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(42,42,49,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(42,42,49,.5)_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute inset-[6px] border-4 border-[#d9503c]" />
        </>
      }
      overlay={
        <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(0,0,0,.22)_0px,rgba(0,0,0,.22)_1px,transparent_1px,transparent_3px)]" />
      }
      copyClassName="lg:py-12 lg:pr-12"
      figureClassName="lg:py-12 lg:pl-12"
      copy={
        <>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#83838f]">
            <span>LLM game</span>
            <span className="bg-[#5aa86f]/15 px-2 py-0.5 text-[10px] tracking-[0.14em] text-[#7cc68f]">Live</span>
          </div>

          <h3 className={`${pressStart.className} text-2xl uppercase leading-[1.4] md:text-3xl`}>
            Prompt
            <br />
            <span className="text-[#d9503c]">Fighter</span>
          </h3>

          <p className="max-w-[60ch] text-sm leading-relaxed text-[#b9b9c2] lg:text-base">
            Build a fighter from four 80-character prompts. Claude turns them into stats, two moves, a flaw, and a
            16×16 sprite, and then it fights a ghost that someone else built.
          </p>

          <dl className="flex flex-col gap-3 border border-[#2a2a31] bg-[#141417] p-4">
            <div className="flex gap-2.5 text-sm leading-relaxed">
              <span className="text-[#d9503c]" aria-hidden="true">▶</span>
              <div>
                <dt className="inline font-bold text-[#e9e9ec]">The budget is the anti-cheat. </dt>
                <dd className="inline text-[#a3a3ad]">
                  Stats must total exactly 30 body and 20 spirit points. Describe something invincible and you get a
                  lopsided spread, not extra points.
                </dd>
              </div>
            </div>
            <div className="flex gap-2.5 text-sm leading-relaxed">
              <span className="text-[#d9503c]" aria-hidden="true">▶</span>
              <div>
                <dt className="inline font-bold text-[#e9e9ec]">The model picks, the engine decides. </dt>
                <dd className="inline text-[#a3a3ad]">
                  Moves come from a fixed set of effects, so no prompt can invent &ldquo;instantly wins.&rdquo; Same
                  seed, same fight, every time.
                </dd>
              </div>
            </div>
          </dl>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#83838f]">The roster · 6 of 84</span>
            <ul className="grid grid-cols-6 gap-1.5 sm:gap-2">
              {ROSTER.map((f, i) => (
                <li
                  key={f.id}
                  title={`${f.name}, ${f.wins}–${f.losses}`}
                  className={`grid aspect-square place-items-center border bg-[#141417] ${i < 2 ? "border-[#d9503c]" : "border-[#2a2a31]"}`}
                >
                  <PixelSprite sprite={f.sprite} className="h-[80%] w-[80%]" />
                  <span className="sr-only">
                    {f.name}, {f.wins} wins, {f.losses} losses
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className={`${pressStart.className} text-[10px] leading-relaxed tracking-wider text-[#e0bf4f]`}>
            HI-SCORE {champ.name.split(" ")[0].toUpperCase()} {champ.wins}–{champ.losses}
          </p>

          <TagGroup
            tags={["Next.js", "Supabase", "Claude API", "Vitest"]}
            className="gap-2"
            tagClassName="rounded-none bg-[#141417] text-[#a3a3ad] ring-[#2a2a31]"
          />

          <a
            href="https://prompt-fight.vercel.app"
            target="_blank"
            rel="noreferrer"
            className={`${pressStart.className} mt-auto inline-flex h-14 w-full items-center justify-center gap-3 bg-[#d9503c] px-7 text-xs uppercase tracking-wider text-white shadow-[4px_4px_0_#7a1f17] transition hover:-translate-y-px hover:bg-[#e2604c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e9e9ec] sm:w-fit sm:text-sm`}
          >
            Play prompt fighter ▶
          </a>
        </>
      }
      demo={<PromptFighterDemo />}
      caption="Replay · real generations, real sim"
      captionClassName="text-[#83838f]"
      dotClassName="rounded-none bg-[#d9503c]"
    />
  );
}
