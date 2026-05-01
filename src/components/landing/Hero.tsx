"use client";

import { FileText } from "lucide-react";
import { SocialLink } from "@/components/SocialLink";
import { Button } from "@/components/Button";
import { Canvas, Ruler } from "@/components/canvas";

export function Hero() {
  return (
    <Canvas
      as="section"
      id="hero"
      className="flex flex-col gap-8 px-6 py-12 text-slate-200 md:gap-10 md:px-12 md:py-20 lg:py-24"
    >
      <h1 className="text-5xl font-bold tracking-tight text-slate-100 lg:text-7xl">
        Dylan Smith
      </h1>

      <div className="max-w-3xl text-lg font-medium leading-loose text-slate-200 lg:text-2xl">
        Designing &amp; developing{" "}
        <Ruler as="span" className="inline-block w-fit align-baseline">
          <Ruler.Guideline edge="bottom" />
          <Ruler.Guideline edge="right" />
          <Ruler.Target edge="top" />
          pixel-perfect
        </Ruler>{" "}
        interfaces. Building reusable and scalable systems for the people who
        use them.
      </div>

      <div className="text-lg font-normal text-slate-200">
        Leading design at{" "}
        <a
          href="https://www.smartadvocate.com/"
          target="_blank"
          rel="noreferrer"
          className="group relative underline decoration-teal-300 transition-colors duration-500 ease-in-out hover:decoration-teal-900"
        >
          <span className="relative z-20 transition-colors duration-500 ease-in-out group-hover:text-teal-900">
            SmartAdvocate.
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-0.5 top-0 z-10 w-0 bg-teal-300 transition-all duration-500 ease-in-out group-hover:w-full"
          />
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-3 lg:hidden">
        <Button
          href="/Dylan-Smith-Resume.pdf"
          target="_blank"
          rel="noreferrer"
          variant="primary"
        >
          <FileText aria-hidden="true" />
          Resume
        </Button>
        <SocialLink site="github" />
        <SocialLink site="linkedin" />
      </div>
    </Canvas>
  );
}
