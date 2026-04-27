"use client";

// V2 PREVIEW — Single "work" section, JD-ordered
// Compare against current homepage at /
// If adopted, replace src/app/page.tsx contents and update Header.jsx links array.

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { useDimensions } from "@/lib/useDimensions";
import VerticalText from "@/components/VerticalText";
import { SocialLink } from "@/components/SocialLink";
import MeasuredDiv from "@/components/MeasuredDiv";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { ArrowUpRight } from "lucide-react";
import { Project, CASE_STUDIES, DEV_PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

// JD-ordered merged list. Lead with current SmartAdvocate systems work,
// then prior-org case studies, then side projects.
const find = (arr: Project[], title: string) =>
  arr.find((p) => p.title === title);

// Synthetic entry for the not-yet-in-data Site-wide UI Refresh case study
const UI_REFRESH: Project = {
  title: "Site-wide UI Refresh",
  subtitle:
    "Refreshing an enterprise product end-to-end — and architecting the design system that shipped it.",
  slug: "/work/design-system",
  status: "in development",
  tags: ["Design System", "Tokens", "WCAG", "ASP.NET / DevExpress"],
};

const WORK: Project[] = [
  UI_REFRESH,
  find(DEV_PROJECTS, "AI Toolchain")!,
  find(CASE_STUDIES, "Bank Reconciliation")!,
  find(CASE_STUDIES, "RapidPay")!,
  find(DEV_PROJECTS, "www.steamparty.io")!,
  find(DEV_PROJECTS, "encounter+")!,
].filter(Boolean);

const statusColor: Record<string, string> = {
  deployed: "bg-green-400/10 text-green-300 ring-green-400/40",
  "in development": "bg-purple-400/10 text-purple-300 ring-purple-400/40",
  "coming soon": "bg-yellow-400/10 text-yellow-300 ring-yellow-400/40",
  "proof of concept": "bg-blue-400/10 text-blue-300 ring-blue-400/40",
};

function MergedWorkCard({ project, index }: { project: Project; index: number }) {
  const isExternal = project.slug?.startsWith("http");
  const linkable = !!project.slug;
  const Tag = linkable ? (isExternal ? "a" : Link) : "div";
  const linkProps: any = linkable
    ? isExternal
      ? { href: project.slug, target: "_blank", rel: "noreferrer" }
      : { href: project.slug }
    : {};

  return (
    <Card
      divider={true}
      badge={true}
      badgeColor="gray"
      badgeText={`work_0${index + 1}`}
      uppercase={true}
      className="ring-teal-300 transition-all ease-out hover:ring-2"
      title={`work_0${index + 1}`}
    >
      <Tag
        {...linkProps}
        className={cn(
          "group/card flex w-full flex-col gap-6 overflow-clip rounded-md text-slate-200 transition-all duration-300 ease-out",
          linkable && "cursor-pointer",
        )}
      >
        <div className="flex items-start justify-between gap-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold">{project.title}</span>
              {linkable && (
                <ArrowUpRight className="ml-1 h-7 w-7 text-slate-400 transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:translate-x-1 group-hover/card:text-teal-300" />
              )}
            </div>
            <span className="mt-3 text-sm lg:text-lg">{project.subtitle}</span>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-md px-2 py-1 text-xs font-mono uppercase tracking-wider ring-1 ring-inset",
                  statusColor[project.status] ?? statusColor["in development"],
                )}
              >
                {project.status}
              </span>
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-slate-700/60 px-2 py-1 text-xs font-mono text-slate-300 ring-1 ring-inset ring-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.image1 && (
          <Image
            src={project.image1}
            alt={project.title}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded-md"
          />
        )}
      </Tag>
    </Card>
  );
}

export default function V2Page() {
  const [activeSection, setActiveSection] = useState("intro");
  const introRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(introRef);

  useEffect(() => {
    const sections = [introRef, workRef];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25 },
    );
    sections.forEach((s) => s.current && observer.observe(s.current));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex lg:gap-12">
      <Header activeSection={activeSection} />

      {/* PREVIEW BANNER */}
      <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-purple-400/20 px-4 py-2 text-xs font-mono uppercase text-purple-200 ring-1 ring-purple-400/40 backdrop-blur-sm">
        preview · v2 · merged work · <a href="/" className="underline hover:text-teal-300">/</a> · <a href="/v3" className="underline hover:text-teal-300">/v3</a>
      </div>

      <main className="w-full pb-6 md:pb-14 lg:w-5/6 lg:pb-24">
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

        {/* Intro */}
        <section
          ref={introRef}
          id="intro"
          className="relative flex flex-col gap-12 overflow-hidden px-6 py-12 text-3xl text-slate-200 md:px-12 md:py-20 lg:py-24 lg:pb-24"
        >
          <div className="flex w-full gap-12">
            <span className="flex flex-col font-bold tracking-tight text-slate-200">
              <span className="text-5xl lg:text-7xl">Dylan Smith</span>
              <span className="mt-4 flex flex-wrap gap-2 text-lg font-medium lg:text-2xl">
                The
                <MeasuredDiv
                  parentHeight={height}
                  parentWidth={width}
                  guideline1={true}
                  guideline1Props={{ edge: "bottom" }}
                  guideline2={true}
                  guideline2Props={{ edge: "right" }}
                  measurement={true}
                  measurementProps={{ edge: "bottom" }}
                  className="w-fit"
                >
                  implementation layer
                </MeasuredDiv>
                between design and engineering.
              </span>
              <span className="mt-4 max-w-2xl text-lg font-normal lg:text-xl">
                Solutions-first systems builder turning one-off UI work into
                reusable, compounding system capabilities. Currently leading
                design at{" "}
                <a
                  href="https://www.smartadvocate.com/"
                  target="_blank"
                  className="underline decoration-teal-300 hover:text-teal-300"
                >
                  SmartAdvocate
                </a>
                .
              </span>
              <div className="mt-6 flex gap-3">
                <SocialLink site="github" />
                <SocialLink site="linkedin" />
              </div>
            </span>
          </div>
        </section>

        {/* Work — merged */}
        <section
          ref={workRef}
          id="work"
          className="relative flex flex-col pb-24 lg:mt-12 lg:flex-row lg:bg-none"
        >
          <VerticalText text="work" />
          <div className="flex w-full flex-col gap-24 px-6">
            {WORK.map((project, index) => (
              <MergedWorkCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
