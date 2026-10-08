"use client";

import Image from "next/image";
import Link from "next/link";
import { Tile } from "@/components/bento/Tile";
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
  "relative h-72 w-full bg-paper md:h-[clamp(240px,calc(100svh_-_420px),520px)]";

const linkClass =
  "inline-flex w-fit items-center gap-1 rounded-md font-mono text-xs uppercase tracking-widest transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type TileLink = { label: string; href: string; primary?: boolean };

/** Every tile ends in at least one real destination. */
function TileLinks({ links }: { links: TileLink[] }) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
      {links.map((l) => {
        const cls = `${linkClass} ${
          l.primary ? "text-accent hover:text-ink" : "text-ink-2 hover:text-accent"
        }`;
        const external = l.href.startsWith("http");
        return external ? (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={cls}>
            {l.label} ↗
          </a>
        ) : (
          <Link key={l.href} href={l.href} className={cls}>
            {l.label} →
          </Link>
        );
      })}
    </div>
  );
}

function TileTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative w-fit">
      <h3 className="font-serif text-3xl font-semibold leading-tight text-ink lg:text-4xl">
        {children}
      </h3>
      <span
        aria-hidden="true"
        className="absolute left-0 top-full h-1 w-full max-w-0 bg-accent transition-all duration-300 group-hover:max-w-full"
      />
    </div>
  );
}

export function Work() {
  return (
    <div className="flex flex-col gap-4">
      <Tile tags={["Design System", "ASP.NET", "Tokens", "WCAG"]} decorative>
        <div className="flex flex-1 flex-col gap-4">
          <TileTitle>SmartAdvocate UI Refresh</TileTitle>
          <p className="text-md text-ink-2 lg:text-base">
            Sole designer &amp; developer on the site-wide UI refresh &mdash;
            first design system at the company, shipped into a legacy ASP.NET
            / DevExpress codebase with no regressions.
          </p>
          <div className="mt-2">
            <BeforeAfterReveal
              beforeLabel="Legacy"
              afterLabel="Refreshed"
              initial={75}
              before={
                <div className={SHOT}>
                  <Image
                    src="/case-studies/smartadvocate/legacy.png"
                    alt="Legacy SmartAdvocate case management UI"
                    fill
                    className="object-cover object-left-top"
                    sizes="100vw"
                  />
                </div>
              }
              after={
                <div className={SHOT}>
                  <Image
                    src="/case-studies/smartadvocate/refreshed.png"
                    alt="Refreshed SmartAdvocate case management UI"
                    fill
                    className="object-cover object-left-top"
                    sizes="100vw"
                  />
                </div>
              }
            />
          </div>
          <TileLinks
            links={[
              { label: "smartadvocate.com", href: "https://www.smartadvocate.com/", primary: true },
            ]}
          />
        </div>
      </Tile>

      <Tile decorative>
        <div className="flex flex-1 flex-col gap-4">
          <TileTitle>Bank Reconciliation</TileTitle>
          <p className="text-md text-ink-2 lg:text-base">
            Bringing the experience of reconciling bank statements into the
            21st century.
          </p>
          <div className="mt-2">
            <BeforeAfterReveal
              beforeLabel="Legacy"
              afterLabel="Refreshed"
              initial={62}
              before={
                <div className={SHOT}>
                  <Image
                    src={bankRecLegacy}
                    alt="Legacy bank reconciliation screen"
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              }
              after={
                <div className={SHOT}>
                  <Image
                    src={bankRecSpire}
                    alt="Refreshed bank reconciliation screen"
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              }
            />
          </div>
          <TileLinks
            links={[
              { label: "Shipped at MDS", href: "https://multidataservices.com/", primary: true },
            ]}
          />
        </div>
      </Tile>

      <Tile decorative>
        <div className="flex flex-1 flex-col gap-4">
          <TileTitle>RapidPay</TileTitle>
          <p className="text-md text-ink-2 lg:text-base">
            Two-panel design with a guided workflow for processing payments,
            replacing a disjointed legacy multi-step experience.
          </p>
          <div className="mt-2">
            <BeforeAfterReveal
              beforeLabel="Legacy"
              afterLabel="Refreshed"
              initial={32}
              before={
                <div className={SHOT}>
                  <Image
                    src={rapidpayLegacy}
                    alt="Legacy RapidPay screen"
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              }
              after={
                <div className={SHOT}>
                  <Image
                    src={rapidpaySpire}
                    alt="Refreshed RapidPay screen"
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              }
            />
          </div>
          <TileLinks
            links={[
              { label: "Shipped at MDS", href: "https://multidataservices.com/", primary: true },
            ]}
          />
        </div>
      </Tile>
    </div>
  );
}
