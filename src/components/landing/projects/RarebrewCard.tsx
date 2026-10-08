"use client";

/* eslint-disable @next/next/no-img-element -- Scryfall CDN art, same as the app */
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { TagGroup } from "@/components/Tag";
import { SplitCard } from "./SplitCard";
import { PhonePlaceholder } from "./PhonePlaceholder";
import { dmSans, spaceGrotesk } from "./fonts";
import { useFinePointer } from "./useFinePointer";

const RarebrewDemo = dynamic(() => import("./RarebrewDemo").then((m) => m.RarebrewDemo), {
  ssr: false,
  loading: PhonePlaceholder,
});

const art = (id: string, size: "art_crop" | "normal") =>
  `https://cards.scryfall.io/${size}/front/${id[0]}/${id[1]}/${id}.jpg`;

const COMMANDER_ART = art("743ee254-07f1-4d13-9ec7-6cb6358b9303", "art_crop");
// Five cards from the same deck, fanned behind the phone.
const FAN = [
  "866400d8-c94b-4b1a-ba5a-20f9d92476db", // Ardbert
  "2625c00d-0a51-4481-bf36-cf13a2546242", // Venat
  "743ee254-07f1-4d13-9ec7-6cb6358b9303", // The Destined Warrior
  "de95250d-294d-4a0e-8049-e0a877078e2e", // The Destined Thief
  "b65ffce4-bb58-418a-9bad-81533a5f2ba2", // Zenos
].map((id) => art(id, "normal"));

// Mostly toward the copy side, so the fan reads around the phone's left edge.
const FAN_ANGLES = [-42, -31, -20, -9, 6];

const NOTES = [
  {
    title: "The card is the row",
    body: "Each row is a cropped strip of the real card image, so the card's own name plate and mana cost do the work a table row would. Tap one to expand it in place. Double-faced cards get a flip.",
  },
  {
    title: "Tabs navigate, never filter",
    body: "The type strip follows your scroll and jumps between sections. Collapsing a group is the only way cards leave the screen. Tap the stats strip for insights, and drag the sheet down to dismiss it.",
  },
];

export function RarebrewCard() {
  const parallax = useFinePointer();
  return (
    <SplitCard
      // Parallax via CSS variables (no re-render): --px/--py run -1..1 from
      // the card's center; --pon eases the fan open while the cursor is here.
      onPointerMove={(e) => {
        if (!parallax) return;
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        el.style.setProperty("--pon", "1");
      }}
      onPointerLeave={(e) => {
        const el = e.currentTarget;
        el.style.setProperty("--px", "0");
        el.style.setProperty("--py", "0");
        el.style.setProperty("--pon", "0");
      }}
      overlay={<div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#E0A83C]" />}
      className={`${dmSans.className} rounded-2xl text-[#f2f2f2] ring-1 ring-[#E0A83C]/35`}
      style={{ background: "#121212" }}
      background={
        <>
          <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(224,168,60,.14)_1px,transparent_1px)] [background-size:22px_22px]" />
        </>
      }
      figureBackground={
        <>
          <img
            src={COMMANDER_ART}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[35%_50%] opacity-90 transition-transform duration-500 ease-out"
            style={{ transform: "translate3d(calc(var(--px, 0) * -16px), calc(var(--py, 0) * -10px), 0) scale(1.06)" }}
          />
          {/* Veil: the art bleeds out of the copy column — from the left at lg, from the top when stacked. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#121212_0%,rgba(18,18,18,.5)_22%,rgba(18,18,18,.15)_100%)] lg:hidden" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#121212_0%,rgba(18,18,18,.7)_16%,rgba(18,18,18,.2)_42%,rgba(18,18,18,.1)_100%)] lg:block" />
        </>
      }
      copy={
        <>

          <h3 className={`${spaceGrotesk.className} text-4xl font-bold leading-none tracking-tight min-[360px]:text-5xl lg:text-6xl`}>
            rarebrew<span className="text-[#E0A83C]">.gg</span>
          </h3>

          <p className="max-w-[60ch] text-base leading-relaxed text-[#d9d9d9] lg:text-lg">
            A Commander deckbuilder for paper Magic players, built phone first. It has a custom component library on
            design tokens, a Scryfall + EDHREC data layer, and insights meant to help you decide what to cut.
          </p>

          <dl className="grid gap-3 sm:grid-cols-2">
            {NOTES.map((n) => (
              <div key={n.title} className="flex flex-col gap-1.5 rounded-xl bg-[#1f1f1f]/90 p-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-[#E0A83C]">{n.title}</dt>
                <dd className="text-sm leading-relaxed text-[#bfbfbf]">{n.body}</dd>
              </div>
            ))}
          </dl>

          <TagGroup
            tags={["React", "Next.js", "TypeScript", "TailwindCSS", "Supabase", "PWA"]}
            className="gap-2"
            tagClassName="bg-[#1f1f1f] text-[#bfbfbf] ring-[#333333]"
          />

          <a
            href="https://rarebrew.gg"
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#E0A83C] px-7 text-base font-bold text-[#1a1304] shadow-[0_10px_30px_-10px_rgba(224,168,60,.6)] sm:w-fit transition hover:bg-[#F0BD52] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0BD52] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
          >
            Open rarebrew.gg
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </>
      }
      demo={
        <div data-demo className="relative mx-auto w-full max-w-[340px] lg:mr-0">
          <div aria-hidden="true" className="absolute left-1/2 top-[80%] -z-10 h-0 w-0">
            {FAN.map((src, i) => (
              <div
                key={src}
                className="absolute left-[-80px] top-[-112px] w-[160px] overflow-hidden rounded-[9px] shadow-[0_18px_40px_rgba(0,0,0,.75)] sm:left-[-95px] sm:top-[-132px] sm:w-[190px]"
                style={{
                  transformOrigin: "50% 210%",
                  // Opens ~25% wider while the cursor is on the card and leans
                  // toward it.
                  transform: `rotate(calc(${FAN_ANGLES[i]}deg * (1 + var(--pon, 0) * 0.25) + var(--px, 0) * 5deg))`,
                  transition: "transform 450ms cubic-bezier(.2,.8,.3,1)",
                }}
              >
                <img src={src} alt="" loading="lazy" decoding="async" className="block w-full max-w-none" />
              </div>
            ))}
          </div>
          <RarebrewDemo />
        </div>
      }
      caption="Recreated · my Light Party deck"
      captionClassName="text-[#a6a6a6] lg:self-end lg:pr-2"
      dotClassName="bg-[#E0A83C]"
    />
  );
}
