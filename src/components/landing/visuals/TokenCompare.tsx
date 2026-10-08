import Image from "next/image";
import { BeforeAfterReveal } from "@/components/bento/BeforeAfterReveal";
import legacy from "/public/case-studies/smartadvocate/legacy.png";
import refreshed from "/public/case-studies/smartadvocate/refreshed.png";

// Where the token layer visibly changed something, as % of the refreshed
// screenshot (1971 × 1155). These ride on the "after" layer, so they're
// covered by the legacy screenshot until the handle passes them.
const CALLOUTS = [
  { label: "Color", note: "Brand header", x: 62, y: 2.4, side: "below" },
  { label: "Radius + border", note: "Toolbar buttons", x: 76, y: 14.1, side: "below" },
  { label: "Spacing", note: "Row rhythm", x: 72, y: 31, side: "right" },
  { label: "Surface", note: "Content in cards", x: 49.5, y: 65.6, side: "right" },
  { label: "Type scale", note: "Case title", x: 10.5, y: 10.2, side: "below" },
] as const;

function Callout({ label, note, x, y, side }: (typeof CALLOUTS)[number]) {
  return (
    <span className="pointer-events-none absolute z-10" style={{ left: `${x}%`, top: `${y}%` }}>
      {/* pin */}
      <span className="absolute -left-1.5 -top-1.5 block h-3 w-3 rounded-full bg-accent ring-2 ring-paper" />
      <span className="absolute -left-1.5 -top-1.5 block h-3 w-3 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
      {/* leader + chip (md+; on phones the pins alone mark the spots) */}
      <span
        className={`absolute hidden items-center md:flex ${
          side === "below" ? "left-0 top-1.5 flex-col items-start" : "left-1.5 top-0 -translate-y-1/2"
        }`}
      >
        <span className={side === "below" ? "ml-[-0.5px] h-5 w-px bg-accent" : "h-px w-5 bg-accent"} />
        <span className="flex flex-col whitespace-nowrap rounded-md bg-panel/95 px-2 py-1 shadow-lg ring-1 ring-accent/60 backdrop-blur-sm">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-panel-accent">
            {label}
          </span>
          <span className="text-[11px] leading-tight text-panel-ink-2">{note}</span>
        </span>
      </span>
    </span>
  );
}

export function TokenCompare() {
  return (
    <figure className="m-0 flex flex-col gap-3">
      <BeforeAfterReveal
        beforeLabel="Legacy"
        afterLabel="Token layer on"
        initial={42}
        before={
          <Image
            src={legacy}
            alt="SmartAdvocate case view before the refresh"
            className="block h-auto w-full"
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
        }
        after={
          // isolate: keeps the pins' z-index inside this layer, so the legacy
          // screenshot (clipped on top) still covers them until revealed.
          <div className="relative isolate">
            <Image
              src={refreshed}
              alt="The same case view with the token layer applied"
              className="block h-auto w-full"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
            {CALLOUTS.map((c) => (
              <Callout key={c.label} {...c} />
            ))}
          </div>
        }
      />
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
        <span className="hidden md:inline">Drag to compare. Pins mark what the token layer changed.</span>
        <span className="md:hidden">Tap to compare. Pins mark what the token layer changed.</span>
      </figcaption>
    </figure>
  );
}
