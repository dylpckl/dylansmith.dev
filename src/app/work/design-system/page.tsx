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
  PuzzlePieceIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { Microscope, Frame, ScanSearch, Sparkles } from "lucide-react";

// Components
import VerticalText from "@/components/VerticalText";
import { ReactNode } from "react";
import { Card } from "@/components/Card";
import MeasuredDiv from "@/components/MeasuredDiv";
import { Header } from "@/components/Header";

// Images
// TODO: drop hero + supporting images into /public/case-studies/design-system/
//       then uncomment imports below.
// import Hero from "/public/case-studies/design-system/hero.png";
// import Tokens from "/public/case-studies/design-system/tokens.png";
// import Components from "/public/case-studies/design-system/components.png";

const OVERVIEW_STATS = [
  {
    title: "roles",
    icon: UserIcon,
    content: (
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-orange-200">
          As the sole designer & developer, I was responsible for:
          <ul className="list-inside list-disc font-normal text-slate-100">
            <li>Token architecture</li>
            <li>Component design & engineering</li>
            <li>Documentation</li>
            <li>Accessibility</li>
            <li>Production rollout</li>
          </ul>
        </span>
        <span className="font-semibold text-orange-200">
          In collaboration with:
          <ul className="list-inside list-disc font-normal capitalize text-slate-100">
            <li>front-end & back-end developers</li>
            <li>product managers</li>
            <li>end users at annual user conference</li>
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
            <span>{"{TODO: timeline — e.g. ~12 months}"}</span>
          </li>
          <li>
            <span className="font-semibold capitalize text-orange-200">
              legacy stack:
            </span>{" "}
            <span>
              ASP.NET / DevExpress production codebase, no regressions
              tolerated
            </span>
          </li>
          <li>
            <span className="font-semibold capitalize text-orange-200">
              first of its kind:
            </span>{" "}
            <span>
              No prior design system at the org — building from zero
            </span>
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
        <li>Figma (variables, components, variants)</li>
        <li>TypeScript / React / Tailwind</li>
        <li>{"{TODO: token pipeline tool — Style Dictionary? hand-sync?}"}</li>
        <li>Confluence (documentation)</li>
        <li>WCAG accessibility</li>
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
  const designProcessRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);
  const systemRef = useRef<HTMLDivElement | null>(null);
  const implementationRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(headlineRef);

  useEffect(() => {
    let sections = [
      overviewRef,
      designProcessRef,
      finalRef,
      systemRef,
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
              <span className="font-semibold">SYS 01 {" \\"}</span>
              <span className="ml-4">Site-wide UI Refresh</span>
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
                Refreshing
              </MeasuredDiv>
              an enterprise product &mdash; and the design system underneath
            </h1>
          </div>
          {/* Hero Image */}
          <div className="relative mt-12 flex h-full w-full justify-center">
            <ImagePlaceholder label="hero image — drop into /public/case-studies/design-system/hero.png" />
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
              title="the problem"
              icon={<QuestionMarkCircleIcon className="h-6 w-6" />}
              divider={true}
            >
              <div className="mt-6 text-lg">
                <h2 className="text-xl">
                  {"{TODO: 1-line framing — the product needed a refresh, but the org had no system to refresh it on}"}
                </h2>
                <p className="mt-4">
                  {
                    "{TODO: 2-4 sentences. Years of accumulated UI debt. Fragmented patterns across the legacy ASP.NET/DevExpress surface. Why a piecemeal rework wouldn't scale — and why the refresh and the design system had to ship together.}"
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
                  "{TODO: outcome paragraph. The refresh was unveiled at the annual user conference. Lead with what shipped — surfaces refreshed, components in production, regressions avoided. Include at least one concrete number.}"
                }
              </p>
            </Card>
          </div>
        </CaseStudySection>

        {/* Design Process */}
        <CaseStudySection
          number={2}
          title="design process"
          ref={designProcessRef}
        >
          <div className="flex flex-col gap-12">
            <Card title="research" icon={<Microscope />} divider={true}>
              <h2 className="text-lg font-semibold capitalize text-orange-200">
                discovery
              </h2>
              <p>
                {
                  "{TODO: how you mapped the existing UI surface area. Audit of inconsistencies. Talking to engineers about what they kept rebuilding.}"
                }
              </p>
              <h2 className="mt-6 text-lg font-semibold capitalize text-orange-200">
                competitive / reference systems
              </h2>
              <p>
                {
                  "{TODO: which design systems you studied (Polaris, Carbon, Material, etc.) and what you took/left.}"
                }
              </p>
            </Card>

            <Card title="ui audit" icon={<ScanSearch />} divider={true}>
              <div className="flex flex-col gap-6">
                {
                  "{TODO: 1-2 sentences framing the audit — what you found across the legacy ASP.NET surface.}"
                }
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-orange-200">
                    {"{TODO: audit insight #1 — e.g. inconsistent spacing}"}
                  </h2>
                  <p>{"{TODO: 2-3 sentences with a specific example.}"}</p>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-orange-200">
                    {"{TODO: audit insight #2}"}
                  </h2>
                  <p>{"{TODO: 2-3 sentences.}"}</p>
                </div>
              </div>
              <div className="mt-6">
                <ImagePlaceholder label="audit image — /public/case-studies/design-system/audit.png" />
              </div>
            </Card>

            <Card title="token architecture" icon={<Frame />} divider={true}>
              <p>
                {
                  "{TODO: explain the token layers — primitive → semantic → component. Where the source of truth lives. How tokens flow from Figma to code.}"
                }
              </p>
              <div className="mt-6">
                <ImagePlaceholder label="token diagram — /public/case-studies/design-system/tokens.png" />
              </div>
            </Card>
          </div>
        </CaseStudySection>

        {/* Final Prototype */}
        <CaseStudySection number={3} title="the system" ref={finalRef}>
          <div className="flex w-full flex-col gap-12">
            <Card
              title="components"
              icon={<PuzzlePieceIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: walk through the keystone components. Show variants, states, and the decisions behind them.}"
                }
              </p>
              <div className="mt-6">
                <ImagePlaceholder label="component grid — /public/case-studies/design-system/components.png" />
              </div>
            </Card>
            <Card
              title="documented states & a11y"
              icon={<ViewfinderCircleIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: how you documented interaction states and WCAG considerations from the start. Show a state matrix or annotated component if possible.}"
                }
              </p>
              <div className="mt-6">
                <ImagePlaceholder label="state matrix — /public/case-studies/design-system/states.png" />
              </div>
            </Card>
          </div>
        </CaseStudySection>

        {/* System Contribution */}
        <CaseStudySection
          number={4}
          title="system contribution"
          ref={systemRef}
        >
          <div className="flex w-full flex-col gap-12">
            <Card
              title="from one-off to reusable"
              icon={<Sparkles />}
              divider={true}
            >
              <p>
                {
                  "{TODO: pick 1-2 concrete examples of feature work that you abstracted into reusable system primitives. Where else are they used now?}"
                }
              </p>
            </Card>
            <Card
              title="adoption"
              icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: how the system spread. Which teams adopted first, what the contribution model looks like, how you kept it the easy + right path.}"
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
              title="design intent → production code"
              icon={<CodeBracketIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: the legacy ASP.NET / DevExpress shipping story. Backwards-compatible CSS / JS / C#. How the system landed without regressions.}"
                }
              </p>
            </Card>
            <Card
              title="documentation"
              icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
              divider={true}
            >
              <p>
                {
                  "{TODO: the single source of truth. Confluence pages, component docs, API references. What teams can self-serve from.}"
                }
              </p>
            </Card>
          </div>
        </CaseStudySection>
      </div>
    </div>
  );
}
