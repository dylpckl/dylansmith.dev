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
} from "@heroicons/react/24/outline";

// Components
import VerticalText from "@/components/VerticalText";
import { ReactNode } from "react";
import { Card } from "@/components/Card";
import MeasuredDiv from "@/components/MeasuredDiv";
import { Header } from "@/components/Header";

// Images
import Legacy from "/public/case-studies/rapidpay/legacy.png";
import Spire from "/public/case-studies/rapidpay/spire.png";

const OVERVIEW_STATS = [
  {
    title: "roles",
    icon: UserIcon,
    content: (
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-orange-200">
          As a solo designer, I was responsible for:
          <ul className="list-inside list-disc font-normal text-slate-100">
            <li>UX Research</li>
            <li>UI Design</li>
          </ul>
        </span>
        <span className="font-semibold text-orange-200">
          In collaboration with:
          <ul className="list-inside list-disc font-normal capitalize text-slate-100">
            <li>end users</li>
            <li>front-end & back-end developers</li>
            <li>project managers</li>
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
              context:
            </span>{" "}
            <span>
              {"{TODO: 1 line on what RapidPay is}"}
            </span>
          </li>
          <li>
            <span className="font-semibold capitalize text-orange-200">
              data first:
            </span>{" "}
            <span>
              {"{TODO: short constraint — e.g. validate OCR'd invoice data}"}
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
        <li>Figma</li>
        <li>{"{TODO: any other relevant tools}"}</li>
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
          "relative mx-auto mt-24 flex gap-12 py-12 md:px-12 md:py-20 lg:py-24 lg:pb-24",
          className,
        )}
      >
        <VerticalText caption={number} text={title} />
        {children}
      </section>
    );
  },
);

export default function Page() {
  const [activeSection, setActiveSection] = useState("");
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const beforeAfterRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(headlineRef);

  useEffect(() => {
    let sections = [overviewRef, beforeAfterRef];

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
        <section className="mx-auto mt-16 flex min-h-[80vh] flex-col gap-12 py-12 md:px-12 md:py-20 lg:py-24 lg:pb-24">
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
              <span className="font-semibold">DSGN 02 {" \\"}</span>
              <span className="ml-4">RapidPay</span>
            </div>
          </div>
          {/* Headline */}
          <div ref={headlineRef} className="mt-12 max-w-5xl text-slate-100">
            <h1 className="font-sans text-6xl font-bold capitalize leading-relaxed">
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
                Streamlining
              </MeasuredDiv>
              a complex form for OCR-validated invoices
            </h1>
          </div>
          {/* Hero Image */}
          <div className="relative mt-12 flex h-full w-full justify-center">
            <Image
              src={Spire}
              alt="RapidPay redesigned interface"
              style={{ objectFit: "cover", objectPosition: "top" }}
              className="rounded-lg"
            />
          </div>
        </section>

        {/* Overview */}
        <CaseStudySection number={1} title="overview" ref={overviewRef}>
          <div className="flex w-full flex-col gap-12">
            <div className="flex gap-6">
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
                  {"{TODO: 1-line problem statement from memory}"}
                </h2>
                <p className="mt-4">
                  {
                    "{TODO: 2-4 sentences from memory. What the form was for, who used it, what was hard about it.}"
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
                  "{TODO: outcome paragraph from memory. What changed for users? Any qualitative or quantitative win.}"
                }
              </p>
            </Card>
          </div>
        </CaseStudySection>

        {/* Before / After */}
        <CaseStudySection
          number={2}
          title="before & after"
          ref={beforeAfterRef}
        >
          <div className="flex w-full flex-col gap-12">
            <Card title="legacy" divider={true}>
              <p className="mb-6">
                {
                  "{TODO: 1-2 sentences from memory describing the legacy UI's pain points.}"
                }
              </p>
              <Image
                src={Legacy}
                alt="RapidPay legacy interface"
                className="rounded-lg"
              />
            </Card>
            <Card title="redesigned" divider={true}>
              <p className="mb-6">
                {
                  "{TODO: 1-2 sentences from memory describing the redesign's key moves.}"
                }
              </p>
              <Image
                src={Spire}
                alt="RapidPay redesigned interface"
                className="rounded-lg"
              />
            </Card>
          </div>
        </CaseStudySection>
      </div>
    </div>
  );
}
