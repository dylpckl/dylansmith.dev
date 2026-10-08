"use client";

import type { RefObject } from "react";
import Image from "next/image";
import VerticalText from "@/components/VerticalText";
import { SectionLabel } from "@/components/SectionLabel";
import { Tile } from "@/components/bento/Tile";
import { BeforeAfterReveal } from "@/components/bento/BeforeAfterReveal";
import { SideProjects } from "./SideProjects";

import bankRecLegacy from "/public/case-studies/bank-rec/legacy.png";
import bankRecSpire from "/public/case-studies/bank-rec/spire.png";
import rapidpayLegacy from "/public/case-studies/rapidpay/legacy.png";
import rapidpaySpire from "/public/case-studies/rapidpay/spire.png";

type WorkProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

export function Work({ sectionRef }: WorkProps) {
  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative flex flex-col px-6 pb-24 md:px-12 lg:flex-row lg:gap-6 lg:pt-32"
    >
      <VerticalText text="WORK" />
      <div className="flex w-full flex-col gap-4">
        <SectionLabel as="h2">Work</SectionLabel>
        {/* TODO(smartadvocate): drop legacy.png + spire.png into
            public/case-studies/smartadvocate/, uncomment the imports above,
            and uncomment this <Tile>. */}
        <Tile tags={["Design System", "ASP.NET", "Tokens", "WCAG"]} decorative>
          <div className="flex flex-1 flex-col gap-4">
            <div className="group relative w-fit">
              <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                SmartAdvocate UI Refresh
              </h3>
              <span
                aria-hidden="true"
                className="absolute left-0 top-full h-1 w-full max-w-0 bg-teal-300 transition-all duration-300 group-hover:max-w-full"
              />
            </div>
            <p className="text-md text-slate-300 lg:text-base">
              Sole designer &amp; developer on the site-wide UI refresh &mdash;
              first design system at the company, shipped into a legacy ASP.NET
              / DevExpress codebase with no regressions.
            </p>
            <div className="mt-2">
              <BeforeAfterReveal
                beforeLabel="Legacy"
                afterLabel="Refreshed"
                initial={75}
                before={
                  <div className="relative h-72 w-full bg-slate-900 md:h-[460px] lg:h-[460px] xl:h-[560px] 2xl:h-[700px]">
                    <Image
                      src="/case-studies/smartadvocate/legacy.png"
                      alt="Legacy SmartAdvocate case management UI"
                      fill
                      className="object-cover object-left-top"
                      sizes="100vw"
                    />
                  </div>
                }
                after={
                  <div className="relative h-72 w-full bg-slate-900 md:h-[460px] lg:h-[460px] xl:h-[560px] 2xl:h-[700px]">
                    <Image
                      src="/case-studies/smartadvocate/refreshed.png"
                      alt="Refreshed SmartAdvocate case management UI"
                      fill
                      className="object-cover object-left-top"
                      sizes="100vw"
                    />
                  </div>
                }
              />
            </div>
          </div>
        </Tile>

        <Tile decorative>
          <div className="flex flex-1 flex-col gap-4">
            <div className="group relative w-fit">
              <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                Bank Reconciliation
              </h3>
              <span
                aria-hidden="true"
                className="absolute left-0 top-full h-1 w-full max-w-0 bg-teal-300 transition-all duration-300 group-hover:max-w-full"
              />
            </div>
            <p className="text-md text-slate-300 lg:text-base">
              Bringing the experience of reconciling bank statements into the
              21st century.
            </p>
            <div className="mt-2">
              <BeforeAfterReveal
                beforeLabel="Legacy"
                afterLabel="Refreshed"
                initial={62}
                before={
                  <div className="relative h-72 w-full bg-slate-900 md:h-[460px] lg:h-[460px] xl:h-[560px] 2xl:h-[700px]">
                    <Image
                      src={bankRecLegacy}
                      alt="Legacy bank reconciliation screen"
                      fill
                      className="object-cover object-top"
                      sizes="100vw"
                    />
                  </div>
                }
                after={
                  <div className="relative h-72 w-full bg-slate-900 md:h-[460px] lg:h-[460px] xl:h-[560px] 2xl:h-[700px]">
                    <Image
                      src={bankRecSpire}
                      alt="Refreshed bank reconciliation screen"
                      fill
                      className="object-cover object-top"
                      sizes="100vw"
                    />
                  </div>
                }
              />
            </div>
          </div>
        </Tile>

        <Tile decorative>
          <div className="flex flex-1 flex-col gap-4">
            <div className="group relative w-fit">
              <h3 className="font-serif text-3xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                RapidPay
              </h3>
              <span
                aria-hidden="true"
                className="absolute left-0 top-full h-1 w-full max-w-0 bg-teal-300 transition-all duration-300 group-hover:max-w-full"
              />
            </div>
            <p className="text-md text-slate-300 lg:text-base">
              Two-panel design with a guided workflow for processing payments,
              replacing a disjointed legacy multi-step experience.
            </p>
            <div className="mt-2">
              <BeforeAfterReveal
                beforeLabel="Legacy"
                afterLabel="Refreshed"
                initial={32}
                before={
                  <div className="relative h-72 w-full bg-slate-900 md:h-[460px] lg:h-[460px] xl:h-[560px] 2xl:h-[700px]">
                    <Image
                      src={rapidpayLegacy}
                      alt="Legacy RapidPay screen"
                      fill
                      className="object-cover object-top"
                      sizes="100vw"
                    />
                  </div>
                }
                after={
                  <div className="relative h-72 w-full bg-slate-900 md:h-[460px] lg:h-[460px] xl:h-[560px] 2xl:h-[700px]">
                    <Image
                      src={rapidpaySpire}
                      alt="Refreshed RapidPay screen"
                      fill
                      className="object-cover object-top"
                      sizes="100vw"
                    />
                  </div>
                }
              />
            </div>
          </div>
        </Tile>

        <SideProjects />
      </div>
    </section>
  );
}
