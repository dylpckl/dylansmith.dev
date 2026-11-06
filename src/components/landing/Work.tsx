"use client";

import Image, { type StaticImageData } from "next/image";
import { BeforeAfterReveal } from "@/components/bento/BeforeAfterReveal";

import bankRecLegacy from "/public/case-studies/bank-rec/legacy.png";
import bankRecSpire from "/public/case-studies/bank-rec/spire.png";
import rapidpayLegacy from "/public/case-studies/rapidpay/legacy.png";
import rapidpaySpire from "/public/case-studies/rapidpay/spire.png";

// Screenshot height follows the screen's height, not its width, so a whole
// tile fits in one viewport. The tile's chrome around the image (padding,
// tags, title, blurb, link row) measures ~250px on the tallest tile; 420px
// covers that plus the sticky 20px ruler and ~150px of breathing room.
// Measured: tallest tile 595 / 727 / 767px at 768 / 900 / 1080px tall.
// Capped at 520px so large screens don't balloon.
const SHOT =
  "relative h-60 w-full bg-paper md:h-[clamp(240px,calc(100svh_-_420px),520px)]";

type Study = {
  title: string;
  blurb: string;
  href: string;
  initial: number;
  legacy: StaticImageData;
  refreshed: StaticImageData;
};

const STUDIES: Study[] = [
  {
    title: "Bank Reconciliation",
    blurb:
      "Bringing the experience of reconciling bank statements into the 21st century.",
    href: "https://multidataservices.com/",
    initial: 62,
    legacy: bankRecLegacy,
    refreshed: bankRecSpire,
  },
  {
    title: "RapidPay",
    blurb:
      "Two-panel design with a guided workflow for processing payments, replacing a disjointed legacy multi-step experience.",
    href: "https://multidataservices.com/",
    initial: 32,
    legacy: rapidpayLegacy,
    refreshed: rapidpaySpire,
  },
];

function Shot({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className={SHOT}>
      <Image src={src} alt={alt} fill className="object-cover object-top" sizes="100vw" />
    </div>
  );
}

export function Work() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* SmartAdvocate lives in Outcomes (token-layer story + slider). */}
      {STUDIES.map((s) => (
        <article key={s.title} className="flex flex-col gap-3 md:gap-4">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-2xl font-bold tracking-tight text-ink lg:text-4xl">
              {s.title}
            </h3>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded font-mono text-xs uppercase tracking-widest text-accent transition hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="sr-only">{s.title}, shipped at </span>MDS ↗
            </a>
          </div>
          <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink-2 lg:text-base">
            {s.blurb}
          </p>
          <BeforeAfterReveal
            // Full bleed on phones: cancel the workspace gutter.
            className="mt-1 max-md:-mx-5 max-md:w-auto"
            beforeLabel="Legacy"
            afterLabel="Refreshed"
            initial={s.initial}
            before={<Shot src={s.legacy} alt={`Legacy ${s.title} screen`} />}
            after={<Shot src={s.refreshed} alt={`Refreshed ${s.title} screen`} />}
          />
        </article>
      ))}
    </div>
  );
}
