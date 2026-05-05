"use client";

import type { RefObject } from "react";
import { Briefcase, FileText } from "lucide-react";
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
            statUnit="design systems"
            subtitle={
              <>
                Designed & shipped end-to-end, from{" "}
                <span className="text-purple-200">token architecture</span> to{" "}
                <span className="text-orange-200">
                  WCAG-compliant components
                </span>
                .
              </>
            }
            graphic={<MiniSystemDemo />}
            graphicPosition="below"
            className="col-span-2 md:col-span-6 lg:col-span-8 lg:row-span-2"
          />

          <StatTile
            icon={FileText}
            number="100+"
            caption="pages of documentation authored"
            className="md:col-span-3 lg:col-span-4"
          />

          <StatTile
            icon={Briefcase}
            number="10+ years"
            caption="across design, development, and data engineering"
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
                <span className="text-orange-200">
                  custom Python CLI package.
                </span>
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
