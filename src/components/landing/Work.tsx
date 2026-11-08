"use client";

import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { BeforeAfterReveal } from "@/components/bento/BeforeAfterReveal";
import { TokenCompare } from "./visuals/TokenCompare";

import bankRecLegacy from "/public/case-studies/bank-rec/legacy.png";
import bankRecSpire from "/public/case-studies/bank-rec/spire.png";
import rapidpayLegacy from "/public/case-studies/rapidpay/legacy.png";
import rapidpaySpire from "/public/case-studies/rapidpay/spire.png";

// SmartAdvocate copy uses verified facts only (see CLAUDE.md): every screen,
// one CSS token layer, WCAG AA contrast, no rewrite, no regressions, 100+
// pages of docs, migrations 3 months → 2 weeks. Don't add numbers.

// Screenshot height follows the viewport height on md+ so a whole entry fits
// on screen; capped so large screens don't balloon.
const SHOT =
  "relative h-60 w-full bg-paper md:h-[clamp(240px,calc(100svh_-_420px),520px)]";

const body = "max-w-[60ch] text-[15px] leading-relaxed text-ink-2 lg:text-base";

/** One employer: company as the heading, then its projects. */
function Company({
  name,
  subtitle,
  children,
}: {
  name: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 md:gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-3xl font-bold leading-tight tracking-tight text-ink lg:text-5xl">
          {name}
        </h3>
        {subtitle && (
          <p className="text-lg font-medium text-ink-2 lg:text-2xl">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Shot({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className={SHOT}>
      <Image src={src} alt={alt} fill className="object-cover object-top" sizes="100vw" />
    </div>
  );
}

type Study = {
  title: string;
  blurb: string;
  initial: number;
  legacy: StaticImageData;
  refreshed: StaticImageData;
};

const MDS: Study[] = [
  {
    title: "Bank Reconciliation",
    blurb:
      "Bringing the experience of reconciling bank statements into the 21st century.",
    initial: 62,
    legacy: bankRecLegacy,
    refreshed: bankRecSpire,
  },
  {
    title: "RapidPay",
    blurb:
      "Two panels and a guided workflow replace a disjointed multi-step payment flow.",
    initial: 32,
    legacy: rapidpayLegacy,
    refreshed: rapidpaySpire,
  },
];

export function Work() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <Company name="SmartAdvocate" subtitle="Style Refresh">
        <p className={body}>
          A CSS token layer integrated into a legacy ASP.NET codebase.
        </p>
        {/* Screenshot first: it's the proof; the bullets explain it. */}
        <TokenCompare />
        <ul className={`${body} list-disc space-y-1.5 pl-5 marker:text-ink-4`}>
          <li>Text contrast meets WCAG AA.</li>
          <li>Every screen restyled, with no rewrite and no regressions.</li>
          <li>Documented in 100+ pages.</li>
        </ul>
        <p className={body}>
          Data migrations went from 3 months to 2 weeks, with a standard
          project structure and a Python CLI to run them.
        </p>
      </Company>

      <Company name="MDS">
        <div className="flex flex-col gap-12 md:gap-16">
          {MDS.map((s) => (
            <article key={s.title} className="flex flex-col gap-3">
              <h4 className="text-lg font-medium text-ink-2 lg:text-2xl">{s.title}</h4>
              <p className={body}>{s.blurb}</p>
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
      </Company>
    </div>
  );
}
