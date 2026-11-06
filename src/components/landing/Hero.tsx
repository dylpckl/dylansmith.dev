"use client";

import { FileText } from "lucide-react";
import { Canvas, Ruler } from "@/components/canvas";
import { Button } from "@/components/Button";
import { SocialLink } from "@/components/SocialLink";

import { RESUME_PATH as RESUME_HREF } from "@/lib/site";

export function Hero() {
  return (
    <Canvas className="flex flex-col gap-5 md:gap-8 md:pt-2">
      <h1 className="text-5xl font-bold tracking-tight text-ink lg:text-7xl">
        Dylan Smith
      </h1>

      <div className="max-w-[30ch] text-xl font-medium leading-snug text-ink-2 lg:text-3xl lg:leading-snug">
        I design{" "}
        <Ruler as="span" className="inline-block w-fit align-baseline">
          <Ruler.Guideline edge="bottom" />
          <Ruler.Guideline edge="right" />
          <Ruler.Target edge="top" />
          interfaces
        </Ruler>{" "}
        and build the systems under them.
      </div>

      <div className="text-base text-ink-3 lg:text-lg">
        Leading design at{" "}
        <a
          href="https://www.smartadvocate.com/"
          target="_blank"
          rel="noreferrer"
          className="group relative underline decoration-accent hover:decoration-accent-ink"
        >
          <span className="relative z-20 text-ink transition-colors duration-500 ease-in-out group-hover:text-accent-ink">
            SmartAdvocate.
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 z-10 w-0 bg-accent transition-all duration-500 ease-in-out group-hover:w-full"
          />
        </a>
      </div>

      {/* Mobile only: the sidebar carries these on desktop. */}
      <div className="flex flex-wrap items-center gap-3 lg:hidden">
        <Button href={RESUME_HREF} target="_blank" rel="noreferrer" variant="primary">
          <FileText aria-hidden="true" />
          Resume
        </Button>
        <SocialLink site="github" />
        <SocialLink site="linkedin" />
      </div>
    </Canvas>
  );
}
