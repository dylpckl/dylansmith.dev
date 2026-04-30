"use client";

import type { RefObject } from "react";
import { FileText } from "lucide-react";
import { SocialLink } from "@/components/SocialLink";
import { Button } from "@/components/Button";
import MeasuredDiv from "@/components/MeasuredDiv";

type HeroProps = {
  sectionRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
};

export function Hero({ sectionRef, width, height }: HeroProps) {
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col gap-6 px-6 py-12 text-slate-200 md:px-12 md:py-20 lg:py-24"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <span className="text-5xl font-bold tracking-tight text-slate-100 lg:text-7xl">
          Dylan Smith
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <SocialLink site="github" />
          <SocialLink site="linkedin" />
          <SocialLink site="email" />
          <Button
            href="/Dylan-Smith-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            variant="primary"
          >
            <FileText aria-hidden="true" />
            Resume
          </Button>
        </div>
      </div>

      <div className="max-w-3xl text-lg font-medium leading-relaxed text-slate-200 lg:text-2xl">
        Designing &amp; developing{" "}
        <MeasuredDiv
          parentHeight={height}
          parentWidth={width}
          guideline1={true}
          guideline1Props={{ edge: "bottom" }}
          guideline2={true}
          guideline2Props={{ edge: "right" }}
          measurement={true}
          measurementProps={{ edge: "bottom" }}
          className="inline-block w-fit align-baseline"
        >
          pixel-perfect
        </MeasuredDiv>{" "}
        interfaces.
      </div>

      <div className="text-lg font-normal text-slate-200">
        Leading design at{" "}
        <a
          href="https://www.smartadvocate.com/"
          target="_blank"
          rel="noreferrer"
          className="group relative underline decoration-teal-300 hover:decoration-teal-900"
        >
          <span className="relative z-20 group-hover:text-teal-900">
            SmartAdvocate
          </span>
          {"."}
          <span className="absolute inset-0 z-10 w-0 bg-teal-300 duration-500 ease-in-out group-hover:w-full group-hover:transition-all" />
        </a>
      </div>
    </section>
  );
}
