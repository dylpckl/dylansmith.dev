"use client";

// External
import { Fragment, useEffect, useState, useRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Utilities
import { cn } from "@/lib/utils";
import { useDimensions } from "@/lib/useDimensions";

// Icons
import {
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  QuestionMarkCircleIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { Microscope, Frame, ScanSearch } from "lucide-react";

// Components
import VerticalText from "@/components/VerticalText";
import DividerWithText from "@/components/DividerWithText";
import { ReactNode } from "react";
import TagGroup from "@/components/TagGroup";
import { Card } from "@/components/Card";

// Images
import image1 from "/public/case-studies/bank-rec/spire.png";
import Legacy from "/public/case-studies/bank-rec/legacy.png";
import Audit from "../../../../public/case-studies/bank-rec/audit.png";
import Wireframe from "../../../../public/case-studies/bank-rec/wireframe.png";

// Components
import { CaseStudy, CASE_STUDIES } from "@/lib/data";
import MeasuredDiv from "@/components/MeasuredDiv";
import { Header } from "@/components/Header";

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
              timeline:
            </span>{" "}
            <span>One week</span>
          </li>
          <li>
            <span className="font-semibold capitalize text-orange-200">
              data first:
            </span>{" "}
            <span>Both data tables must be visible at all times</span>
          </li>
          <li>
            <span className="font-semibold capitalize text-orange-200">
              Desktop & tablet:
            </span>{" "}
            <span>This feature is not available on mobile.</span>
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
        <li>Competitive Analysis</li>
        <li>Jira</li>
        <li>Confluence</li>
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
        {/* mx-4 md:mx-16 lg:mx-24 xl:mx-32 */}

        {children}
      </section>
    );
  },
);

export default function Page() {
  const [activeSection, setActiveSection] = useState("");
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const designProcessRef = useRef<HTMLDivElement | null>(null);
  const FinalPrototypeRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensions(headlineRef);
  // console.log("page.tsx:", width, height);

  useEffect(() => {
    // const introWidth =
    //   (introRef.current && introRef.current.getBoundingClientRect().width) || 0;
    // setIntroWidth(introWidth);

    let sections = [overviewRef, designProcessRef, FinalPrototypeRef];

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
              <span className="font-semibold">DSGN 01 {" \\"}</span>
              <span className="ml-4">Bank Reconciliation</span>
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
                Redesigning
              </MeasuredDiv>
              an accountant&apos;s critical monthly task
            </h1>
            {/* <p className="text-xl my-12">The Bank Reconciliation feature </p> */}
          </div>
          {/* Hero Image */}
          <div className="relative mt-12 flex h-full w-full justify-center">
            <Image
              src={image1}
              alt="xx"
              style={{ objectFit: "cover", objectPosition: "top" }}
              className="rounded-lg"
            />
          </div>
        </section>

        {/* Overview */}
        <CaseStudySection number={1} title="overview" ref={overviewRef}>
          {/* Container */}
          <div className="flex w-full flex-col gap-12">
            <div className="flex flex-col gap-6 md:flex-row">
              {OVERVIEW_STATS.map(({ title, content, icon }, index) => (
                <Card
                  title={title}
                  // icon={icon}
                  divider={false}
                  key={index}
                  className="flex flex-col gap-4"
                >
                  {content}
                </Card>
              ))}
            </div>
            <Card
              title="a bank what?"
              icon={<QuestionMarkCircleIcon className="h-6 w-6" />}
              divider={true}
            >
              {/* <div className="flex gap-4 w-full items-center text-teal-300">
                <QuestionMarkCircleIcon className="w-6 h-6" />
                <span className="font-mono font-semibold uppercase tracking-widest text-md">
                  a bank what?
                </span>
                <hr className="grow h-px border-0 bg-teal-300" />
              </div> */}
              <div className="mt-6 text-lg">
                <h2 className="text-xl">
                  The Bank Reconciliation feature is a key part of a trustworthy
                  accounting system.
                </h2>{" "}
                <p className="mt-4">
                  A company prepares a bank reconciliation statement to compare
                  the balance in its accounting records with its bank account
                  balance. The statement shows reasons for any discrepancies
                  between the two.{" "}
                  <b className="text-orange-200">
                    A bank reconciliation statement is a valuable internal tool
                    that can affect tax and financial reporting and detect
                    errors and intentional fraud.
                  </b>
                </p>
              </div>
            </Card>
            <Card
              title="objectives"
              divider={true}
              icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
            >
              <p className="mt-6 font-sans text-lg font-normal text-slate-100">
                The Bank Reconciliation feature is a key part of a trustworthy
                accounting system.
              </p>
              <ul>
                <li>page header</li>
                <li>summary</li>
                <li>bank statement</li>
              </ul>
            </Card>
          </div>
        </CaseStudySection>

        {/* Design Process */}
        <CaseStudySection number={2} title="design process">
          <div className="flex flex-col gap-12">
            {/* Research */}
            <Card title="research" icon={<Microscope />} divider={true}>
              <h2 className="text-lg font-semibold capitalize text-orange-200">
                user research
              </h2>
              <p className="">
                Given that I was the lone designer on this project with a very
                tight (1 week) timeframe, I was not afforded the time to conduct
                any user research to uncover pain points or develop personas.
                Fortunately, the legacy software has nearly two decades of user
                research built into it.
              </p>
              <h2 className="mt-6 text-lg font-semibold capitalize text-orange-200">
                competitive analysis
              </h2>
              <p>
                QuickBooks. QB displays only a single table for both types of
                transactions (deposits and checks).{" "}
              </p>
            </Card>

            {/* Audit */}
            <Card
              title="ui audit"
              icon={<ScanSearch />}
              divider={true}
              className=""
            >
              <div className="flex flex-col gap-6">
                First let&apos;s take a look at the legacy UI.
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-orange-200">
                    What are the main user tasks on this page?{" "}
                  </h2>
                  <p>
                    As a user, my goal on this page is to reach a Running Total
                    of $0.00, which means that my bank statement matches my book
                    balance. This is achieved by clearing deposits and checks
                    that have cleared the bank.
                  </p>
                  <b className="mt-2">
                    Therefore, the main user task on this page is to interact
                    with the side-by-side data tables.
                  </b>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-orange-200">
                    Is there a proper visual hierachy?
                  </h2>
                  <p></p>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-orange-200">
                    What actions can be moved or consolidated?
                  </h2>
                  <p>
                    The buttons on the right side of the screen are a jumble of
                    one-time actions as well as the primary page actions
                  </p>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-orange-200">
                    Are there other screens or modals involved in the user flow?
                  </h2>
                  <p></p>
                </div>
              </div>
              <Image
                // src={Audit}
                src={`/case-studies/bank-rec/audit.png`}
                fill
                alt="audit image"
                className="mx-auto rounded-sm"
              />
            </Card>

            {/* Wireframing */}
            <Card
              title="wireframing"
              icon={<Frame />}
              divider={true}
              className=""
            >
              After orienting myself with the legacy UI, I began wireframing
              what the new structure might look like.
              {/* <Image
                // src={Wireframe}
                src={`public/case-studies/bank-rec/wireframe.png`}
                alt="wireframe"
                className="mt-6 mx-auto rounded-sm"
              /> */}
            </Card>
          </div>
          {/* <Card>
              with the main objective being to achieve parity, port the feature to
              the new system, and the tight timeframe, Given the extremely tight 2
              week deadline, and being the lone designer on the project, I was
              unable to take the time to conduct any user research to uncover pain
              points or develop personas. This particular feature has been in use
              for decades, and over time has evolved quite a bit in accordance
              with user feedback. As such, my main focus during discovery was
              auditing the UI components at play and finding equivalents in use in
              the web-app, in addition to crafting new components as needed.
            </Card>
            <Card>audit - functionality, ui components</Card>
            <Card>
              highlight tabular numbers
              https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties#numbers
            </Card>
            <Card>restructure the layout - hierarchy</Card>
            <Card>
              use a two column layout here - image plus text so reader can see
              what im talking about
            </Card>
            <div className="w-full flex gap-8">
              <Card className="w-1/3">
                The first order of business is to take an audit the existing
                functionality
              </Card> */}
          {/* <Card className="w-2/3 p-0">
                {" "}
                <Image
                  src={Legacy}
                  alt="xx"
                  quality={100}
                  // style={{ objectFit: "cover", objectPosition: "top" }}
                  className="rounded-lg"
                />
              </Card> */}
        </CaseStudySection>

        {/* Final */}
        <CaseStudySection number={3} title="final prototype">
          xx
        </CaseStudySection>
      </div>
      {/* <div className="w-96 sticky top-12">
        <div className="sticky top-12 bg-pink-300">
          list of links with href to section id's. listen to scroll event
          <ul>
            <li>intro</li>
            <li>design process</li>
            <li>research</li>
            <li>ui audit</li>
            <li>wireframing</li>
            <li>final prototype</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}
