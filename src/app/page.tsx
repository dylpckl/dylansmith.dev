"use client";

// External
import { Fragment, useEffect, useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// Utilities
import { useDimensions } from "@/lib/useDimensions";

// Components
import VerticalText from "@/components/VerticalText";
import { Socials, SocialLink } from "@/components/SocialLink";
import CaseStudyCard from "@/components/CaseStudyCard";
import LandingPageCard from "@/components/LandingPageCard";
import Nav from "@/components/Nav";
import MeasuredDiv from "@/components/MeasuredDiv";
import ScrollingCarousel from "@/components/ScrollingCarousel";
import { Card } from "@/components/Card";

// Images & Icons
import Logo from "/public/images/ds-logo.png";

// Data
import { CASE_STUDIES, DEV_PROJECTS, CaseStudy, Project } from "@/lib/data";
import { Header } from "@/components/Header";

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");
  const introRef = useRef<HTMLDivElement | null>(null);
  const designRef = useRef<HTMLDivElement | null>(null);
  const devRef = useRef<HTMLDivElement | null>(null);
  // const [introWidth, setIntroWidth] = useState(0);

  const testRef = useRef(null);
  const { width, height } = useDimensions(introRef);
  console.log("page.tsx:", width, height);

  let links = ["intro", "design", "develop"];

  useEffect(() => {
    // const introWidth =
    //   (introRef.current && introRef.current.getBoundingClientRect().width) || 0;
    // setIntroWidth(introWidth);

    let sections = [introRef, designRef, devRef];

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
    <div className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex lg:gap-12">
      {/* <div className=""> */}
      {/* <div className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex lg:gap-12"> */}
      <Header activeSection={activeSection} />
      {/* <header className="hidden w-full bg-gradient-to-t from-slate-800/60 px-6 py-12 md:px-12 md:py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/6 lg:flex-col lg:bg-none lg:py-24">
        <div className="ml-2 hidden lg:block">
          <Image src={Logo} alt="logo" height={64} />
          <Nav links={links} activeSection={activeSection} />
          <Link
            href="/Dylan-Smith-Resume.pdf"
            target="_blank"
            className="mt-6 flex cursor-pointer gap-4 pt-6 font-mono text-sm font-semibold uppercase text-slate-200"
          >
            resume
          </Link>
        </div>
        <div className="mt-6 flex gap-3">
          <SocialLink site="github" />
          <SocialLink site="linkedin" />
        </div>
      </header> */}

      <main className="w-full pb-6 md:pb-14 lg:w-5/6 lg:pb-24">
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

        {/* <Header activeSection={activeSection} /> */}

        {/* Intro */}
        <section
          ref={introRef}
          id="intro"
          className="relative flex flex-col gap-12 overflow-hidden px-6 py-12 text-3xl text-slate-200 md:px-12 md:py-20 lg:py-24 lg:pb-24"
        >
          {/* left   */}
          <div className="flex w-full gap-12">
            <span className="flex flex-col font-bold tracking-tight text-slate-200">
              <span className="text-5xl lg:text-7xl">Dylan Smith</span>
              <span className="mt-4 flex gap-2 text-lg font-medium lg:text-2xl">
                Designing
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
                  pixel-perfect
                </MeasuredDiv>
                interfaces by day
              </span>
              <span className="mt-4 text-lg font-medium lg:text-2xl">
                & developing them by night.
              </span>
              <div className="mt-4 text-lg font-normal text-slate-200">
                Leading design for{" "}
                <a
                  href="https://www.smartadvocate.com/"
                  target="_blank"
                  className="group relative underline decoration-teal-300 hover:decoration-teal-900"
                >
                  <span className="relative z-20 group-hover:text-teal-900 ">
                    SmartAdvocate
                  </span>
                  {"."}
                  <span className="absolute inset-0 z-10 w-0 bg-teal-300 duration-500 ease-in-out group-hover:w-full group-hover:transition-all"></span>
                </a>
              </div>
              <div className="mt-6 flex gap-3">
                <SocialLink site="github" />
                <SocialLink site="linkedin" />
              </div>
            </span>
          </div>
        </section>

        {/* Design */}
        <section
          ref={designRef}
          id="design"
          className="relative flex flex-col pb-24 lg:mt-12 lg:flex-row lg:bg-none"
        >
          <VerticalText text="design" />
          <StickyHeader title="design" />
          <div className="flex w-full flex-col gap-24 px-6">
            {CASE_STUDIES.map((caseStudy, index) => (
              <CaseStudyCard
                caseStudy={caseStudy}
                index={index}
                key={caseStudy.title}
              />
            ))}
          </div>
        </section>

        {/* Dev */}
        <section
          ref={devRef}
          id="develop"
          className="relative flex flex-col lg:mt-12 lg:flex-row"
        >
          <VerticalText text="develop" />
          <StickyHeader title="develop" />
          <div className="flex w-full flex-col gap-24 px-6">
            {/* <Card
              divider={true}
              badge={true}
              badgeColor="yellow"
              badgeText="testzzz"
              uppercase={true}
              title="test"
            >
              test
            </Card> */}
            {DEV_PROJECTS.map((project, index) => (
              <div key={index} className="flex flex-col gap-6">
                <LandingPageCard
                  project={project}
                  index={index}
                  key={project.title}
                  badge={true}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const StickyHeader = ({ title }: { title: string }) => {
  return (
    <div className="sticky top-0 z-20 mb-4 block w-full bg-slate-800/60 px-6 py-5 text-slate-200 backdrop-blur-sm lg:hidden">
      <span className="-z-10 font-mono text-xl uppercase  tracking-widest">
        {title}
        {" \\\\"}
      </span>
    </div>
  );
};
