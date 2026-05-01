"use client";

import type { RefObject } from "react";
import VerticalText from "@/components/VerticalText";
import { SectionLabel } from "@/components/SectionLabel";
import { StatTile } from "@/components/bento/StatTile";
import { Feature } from "@/components/bento/Feature";
import { MiniSystemDemo } from "./visuals/MiniSystemDemo";
import { ScriptsToToolkit } from "./visuals/ScriptsToToolkit";

type OutcomesProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

export function Outcomes({ sectionRef }: OutcomesProps) {
  return (
    <section
      ref={sectionRef}
      id="outcomes"
      className="relative flex flex-col px-6 pb-12 pt-16 md:px-12 md:pt-24 lg:flex-row lg:gap-6 lg:pt-16"
    >
      <VerticalText text="outcomes" />
      <div className="flex w-full flex-col gap-6">
        <SectionLabel as="h2">Outcomes</SectionLabel>
        <div className="grid w-full auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-12">
        <Feature
          tags={["Tokens", "Atomic", "WCAG"]}
          stat="2"
          statUnit="design systems shipped"
          subtitle={
            <>
              First-of-their-kind at MDS and{" "}
              <a
                href="https://www.smartadvocate.com/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-slate-500 underline-offset-2 transition hover:decoration-teal-300"
              >
                SmartAdvocate
              </a>
              {" "}&mdash; both adopted as team standard.
            </>
          }
          graphic={<MiniSystemDemo />}
          graphicPosition="below"
          className="col-span-2 md:col-span-6 lg:col-span-8 lg:row-span-2"
        />

        <StatTile
          number="100+"
          caption="pages of documentation contributed — patterns, conventions, schemas — the docs the engineering team ships from."
          className="md:col-span-3 lg:col-span-4"
        />

        <StatTile
          number="10+ yrs"
          caption="across design, development, data engineering, and support — the full software lifecycle."
          className="md:col-span-3 lg:col-span-4"
        />

        <Feature
          tags={["Python", "Monorepo", "CI/CD"]}
          stat="60%"
          statUnit="faster data migrations"
          subtitle={
            <>
              Cut from <strong>3 months to 2 weeks</strong> across 12+
              concurrent projects by{" "}
              <span className="text-teal-200">
                standardizing project structure
              </span>{" "}
              and building a{" "}
              <span className="text-orange-200">custom Python CLI package.</span>
            </>
          }
          graphic={<ScriptsToToolkit />}
          graphicPosition="below"
          className="col-span-2 md:col-span-6 lg:col-span-12"
        />

        {/* <StatTile
          label="Daily Users"
          labelIcon={Layers}
          number="1,000+"
          caption="Daily users on keystone features I led from concept to production at MDS."
          className="md:col-span-3 lg:col-span-6"
        /> */}
        </div>
      </div>
    </section>
  );
}
