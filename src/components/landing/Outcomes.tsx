"use client";

import { Briefcase, FileText } from "lucide-react";
import { StatTile } from "@/components/bento/StatTile";
import { Feature } from "@/components/bento/Feature";
import { MiniSystemDemo } from "./visuals/MiniSystemDemo";
import { ScriptsToToolkit } from "./visuals/ScriptsToToolkit";

export function Outcomes() {
  return (
    <div className="grid w-full auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-12">
      <Feature
        tags={["Tokens", "Atomic", "WCAG"]}
        stat="2"
        statUnit="design systems"
        subtitle={
          <>
            Designed &amp; shipped end-to-end, from{" "}
            <span className="text-lav">token architecture</span> to{" "}
            <span className="text-warm">WCAG-compliant components</span>.
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
            Cut from <strong>3 months to 2 weeks</strong> across 12+ concurrent
            projects by{" "}
            <span className="text-accent">standardizing project structure</span>{" "}
            and building a{" "}
            <span className="text-warm">custom Python CLI package.</span>
          </>
        }
        graphic={<ScriptsToToolkit />}
        graphicPosition="below"
        className="col-span-2 md:col-span-6 lg:col-span-12"
      />
    </div>
  );
}
