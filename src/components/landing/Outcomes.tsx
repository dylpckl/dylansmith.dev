"use client";

import type { RefObject } from "react";
import { FileText, Layers, Sparkles, Workflow } from "lucide-react";
import VerticalText from "@/components/VerticalText";
import { StatTile } from "@/components/bento/StatTile";
import { Feature } from "@/components/bento/Feature";
import { Support } from "@/components/bento/Support";
import { MiniSystemDemo } from "./visuals/MiniSystemDemo";
import { OneOffConsolidation } from "./visuals/OneOffConsolidation";

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
      <div className="grid w-full auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        <Feature
          verb="Designed & Developed"
          tags={["Tokens", "Atomic", "WCAG"]}
          stat="2"
          statUnit="design systems"
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
          className="md:col-span-6 lg:col-span-8 lg:row-span-2"
        />

        <StatTile
          label="Docs Contributor"
          labelIcon={FileText}
          number="#1"
          caption="Patterns, conventions, schemas — the docs the engineering team ships from."
          className="md:col-span-3 lg:col-span-4"
        />

        <Support icon={Sparkles} className="md:col-span-3 lg:col-span-4">
          Custom Claude skills, MCP workflows, agentic pipelines &mdash;
          adopted team-wide.
        </Support>

        <Feature
          verb="Faster data migrations"
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
          graphic={<OneOffConsolidation />}
          graphicPosition="below"
          className="md:col-span-6 lg:col-span-12"
        />

        <StatTile
          label="Time-to-ship"
          labelIcon={Workflow}
          number="50%"
          caption="Overhauled feature handoff with product owners — cut delivery time in half at MDS."
          className="md:col-span-3 lg:col-span-6"
        />

        <StatTile
          label="Daily Users"
          labelIcon={Layers}
          number="1,000+"
          caption="Daily users on keystone features I led from concept to production at MDS."
          className="md:col-span-3 lg:col-span-6"
        />
      </div>
    </section>
  );
}
