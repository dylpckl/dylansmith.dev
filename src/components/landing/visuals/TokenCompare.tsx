import Image from "next/image";
import { BeforeAfterReveal } from "@/components/bento/BeforeAfterReveal";
import legacy from "/public/case-studies/smartadvocate/legacy.png";
import refreshed from "/public/case-studies/smartadvocate/refreshed.png";

export function TokenCompare() {
  return (
    <figure className="m-0 flex flex-col gap-3">
      <BeforeAfterReveal
        // Full bleed on phones: cancel the workspace gutter.
        className="max-md:-mx-5 max-md:w-auto"
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
          <Image
            src={refreshed}
            alt="The same case view with the token layer applied"
            className="block h-auto w-full"
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
        }
      />
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
        <span className="hidden md:inline">Drag to compare</span>
        <span className="md:hidden">Tap to swap</span>
      </figcaption>
    </figure>
  );
}
