"use client";

// External
import { useEffect, useState, useRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Utilities
import { cn } from "@/lib/utils";
import { useDimensions } from "@/lib/useDimensions";

// Icons
import {
  WrenchScrewdriverIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  QuestionMarkCircleIcon,
  ViewfinderCircleIcon,
  CommandLineIcon,
  CpuChipIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { Microscope, Sparkles, Bot } from "lucide-react";

// Components
import VerticalText from "@/components/VerticalText";
import { ReactNode } from "react";
import { Card } from "@/components/Card";
import MeasuredDiv from "@/components/MeasuredDiv";
import { Header } from "@/components/Header";

// Images
// TODO: drop hero + supporting images into /public/case-studies/ai-tooling/
//       then uncomment imports below.
// import Hero from "/public/case-studies/ai-tooling/hero.png";

const OVERVIEW_STATS = [
  {
    title: "roles",
    icon: UserIcon,
    content: (
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-orange-200">
          As the toolchain author, I was responsible for:
          <ul className="list-inside list-disc font-normal text-slate-100">
            <li>Skill, agent & MCP workflow design</li>
            <li>Prompt engineering</li>
            <li>Code-ready output generation</li>
            <li>Team rollout & docs</li>
          </ul>
        </span>
        <span className="font-semibold text-orange-200">
          Adopted by:
          <ul className="list-inside list-disc font-normal capitalize text-slate-100">
            <li>design system implementation team</li>
            <li>data migration team</li>
            <li>{"{TODO: any other teams}"}</li>
          </ul>
        </span>
      </div>
    ),
  },
  {
    title: "scope & constraints",
    icon: ViewfinderCircleIcon,
    content: (
      <div>
        <ol className="list-inside list-decimal">
          <li>
            <span className="font-semibold capitalize text-orange-200">
              timeline:
            </span>{" "}
            <span>{"{TODO: timeline}"}</span>
          </li>
          <li>
            <span className="font-semibold capitalize text-orange-200">
              output bar:
            </span>{" "}
            <span>code-ready, not just suggestions</span>
          </li>
          <li>
            <span className="font-semibold capitalize text-orange-200">
              team-first:
            </span>{" "}
            <span>built to be adopted, not just used by me</span>
          </li>
        </ol>
      </div>
    ),
  },
  {
    title: "tools & methods",
    icon: WrenchScrewdriverIcon,
    content: (
      <ul className="list-inside list-disc">
        <li>Claude Code (skills + agents)</li>
        <li>Model Context Protocol (MCP)</li>
        <li>Python / TypeScript</li>
        <li>{"{TODO: any other tools — Code Sandbox? Cursor?}"}</li>
      </ul>
    ),
  },
];

type CaseStudySectionProps = {
  number: number;
  title: string;
  className?: string;
  children: ReactNode;
};

const CaseStudySection = forwardRef<HTMLDivElement, CaseStudySectionProps>(
  function CaseStudySection({ number, title, className, children }, ref) {
    return (
      <section
        ref={ref}
        className={cn(
          "relative mx-auto mt-24 flex gap-12 px-6 py-12 md:px-12 md:py-20 lg:py-24 lg:pb-24",
          className,
        )}
      >
        <VerticalText caption={number} text={title} />
        {children}
      </section>
    );
  },
);

const ImagePlaceholder = ({ label }: { label: string }) => (
  <div className="flex h-96 w-full items-center justify-center rounded-lg border border-dashed border-slate-500 bg-slate-700/40 text-sm font-mono text-slate-400">
    {label}
  </div>
);

export default function Page() {
  const [activeSection, setActiveSection] = useState("");
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const originRef = useRef<HTMLDivElement | null>(null);
  const toolkitRef = useRef<HTMLDivElement | null>(null);
  const adoptionRef = useRef<HTMLDivElement | null>(null);
  const implementationRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(headlineRef);

  useEffect(() => {
    let sections = [
      overviewRef,
      originRef,
      toolkitRef,
      adoptionRef,
      implementationRef,
    ];

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections?.forEach((section) => {
      section.current && observer.observe(section.current);
    });
  }, []);

  return (
    <div className="mx-auto flex gap-16">
      <Header activeSection={activeSection} />
      <div className="w-full">
        {/* Hero */}
        <section className="mx-auto mt-16 flex min-h-[80vh] flex-col gap-12 px-6 py-12 md:px-12 md:py-20 lg:py-24 lg:pb-24">
          {/* Back Button */}
          <div className="flex items-center gap-6 text-teal-300">
            <Link href="/#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4 transition-transform duration-300 ease-in-out hover:-translate-x-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
            <div className="font-mono text-sm uppercase">
              <span className="font-semibold">AI 01 {" \\"}</span>
              <span className="ml-4">AI Toolchain for Design + Engineering</span>
            </div>
          </div>
          {/* Headline */}
          <div ref={headlineRef} className="mt-12 max-w-5xl text-slate-100">
            <h1 className="font-sans text-4xl font-bold capitalize leading-relaxed md:text-6xl">
              <MeasuredDiv
                guideline1={true}
                guideline1Props={{ edge: "left" }}
                guideline2={true}
                guideline2Props={{ edge: "right" }}
                parentHeight={height}
                parentWidth={width}
                measurement={true}
                measurementProps={{ edge: "bottom" }}
                className="w-fit"
              >
                Building
              </MeasuredDiv>
              an AI toolchain for code-ready output
            </h1>
          </div>
          {/* Hero Image */}
          <div className="relative mt-12 flex h-full w-full justify-center">
            <ImagePlaceholder label="hero image — drop into /public/case-studies/ai-tooling/hero.png" />
          </div>
        </section>

        {/* Overview */}
        <CaseStudySection number={1} title="overview" ref={overviewRef}>
          <div className="flex w-full flex-col gap-12">
            <div className="flex flex-col gap-6 md:flex-row">
              {OVERVIEW_STATS.map(({ title, content }, index) => (
                <Card
                  title={title}
                  divider={false}
                  key={index}
                  className="flex flex-col gap-4"
                >
                  {content}
                </Card>
              ))}
            </div>
            <Card
              title="the bet"
              icon={<QuestionMarkCircleIcon className="h-6 w-6" />}
              divider={true}
            >
              <div className="mt-6 text-lg">
                <h2 className="text-xl">
                  {"{TODO: 1-line thesis — why invest in AI tooling now}"}
                </h2>
                <p className="mt-4">
                  {
                    "{TODO: 2-4 sentences. The slope you're tracking. Why generic AI assistants weren't enough. What 'code-ready output' means to you.}"
                  }
                </p>
              </div>
            </Card>
            <Card
              title="outcome"
              divider={true}
              icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
            >
              <p className="mt-6 font-sans text-lg font-normal text-slate-100">
                {
                  "{TODO: outcome paragraph. Adoption rate, time saved, what kinds of work shifted from manual to automated. At least one concrete number — e.g. '60% turnaround reduction across 12+ projects'.}"
                }
              </p>
            </Card>
          </div>
        </CaseStudySection>

        {/* Origin */}
        <CaseStudySection number={2} title="origin" ref={originRef}>
          <div className="flex flex-col gap-12">
            <Card title="the gap" icon={<Microscope />} divider={true}>
              <p>
                {
                  "{TODO: what was happening before — engineers re-writing similar boilerplate, design tokens not surfacing in code suggestions, manual translation between Figma and components, etc.}"
                }
              </p>
            </Card>

            <Card
              title="design principle: code-ready output"
              icon={<CommandLineIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: the principle that drove the design — the bar isn't 'plausible suggestion,' it's 'paste-able into prod'. How you operationalized that into prompts, skill scopes, MCP server contracts.}"
                }
              </p>
            </Card>
          </div>
        </CaseStudySection>

        {/* The Toolkit */}
        <CaseStudySection number={3} title="the toolkit" ref={toolkitRef}>
          <div className="flex w-full flex-col gap-12">
            <Card
              title="skills"
              icon={<Sparkles />}
              divider={true}
            >
              <p>
                {
                  "{TODO: walk through 1-2 keystone skills. What they do, how they're scoped, what code-ready output they produce. (e.g. 'design-token-emit', 'component-from-figma'.)}"
                }
              </p>
              <div className="mt-6">
                <ImagePlaceholder label="skill demo — /public/case-studies/ai-tooling/skill-demo.png" />
              </div>
            </Card>
            <Card
              title="agents"
              icon={<Bot />}
              divider={true}
            >
              <p>
                {
                  "{TODO: 1-2 agents you built. Their job, their tools, what success looks like for each.}"
                }
              </p>
            </Card>
            <Card
              title="mcp workflows"
              icon={<CpuChipIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: which MCP servers you stood up or integrated — design system docs MCP? Figma MCP? Internal DB MCP? What the integration unlocked.}"
                }
              </p>
            </Card>
          </div>
        </CaseStudySection>

        {/* Adoption */}
        <CaseStudySection number={4} title="team adoption" ref={adoptionRef}>
          <div className="flex w-full flex-col gap-12">
            <Card
              title="how it spread"
              icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: how the toolchain went from your laptop to team standard. Onboarding, internal docs, the team-first design choices.}"
                }
              </p>
            </Card>
            <Card
              title="impact"
              icon={<Sparkles />}
              divider={true}
            >
              <p>
                {
                  "{TODO: numbers + stories. Concrete examples of work that got faster or higher-quality. Anything that's now possible that wasn't before.}"
                }
              </p>
            </Card>
          </div>
        </CaseStudySection>

        {/* Implementation */}
        <CaseStudySection
          number={5}
          title="implementation"
          ref={implementationRef}
        >
          <div className="flex w-full flex-col gap-12">
            <Card
              title="how it works under the hood"
              icon={<CodeBracketIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: technical detail for an engineering reader. Skill anatomy, agent tool wiring, MCP server contracts. Show one or two real prompts/configs if you can share them.}"
                }
              </p>
            </Card>
            <Card
              title="where this goes next"
              icon={<ViewfinderCircleIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: the slope. Where AI-powered design tooling is heading, and where this toolchain is positioned on it. (Cover letter material — also good here.)}"
                }
              </p>
            </Card>
          </div>
        </CaseStudySection>
      </div>
    </div>
  );
}
