"use client";

import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/Header";

import { Hero } from "@/components/landing/Hero";
import { Intro } from "@/components/landing/Intro";
import { Outcomes } from "@/components/landing/Outcomes";
import { Work } from "@/components/landing/Work";

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");

  const introRef = useRef<HTMLDivElement | null>(null);
  const outcomesRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = [introRef, outcomesRef, workRef];
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
    <div className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex">
      <Header activeSection={activeSection} />

      <main className="w-full gap-10 pb-6 md:pb-14 lg:flex-1 lg:pb-24">
        {/* Site-wide background layers (z stack: dotted -20, gradient overlay -10) */}
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/90" />

        <Hero />
        <Intro sectionRef={introRef} />
        <Outcomes sectionRef={outcomesRef} />
        <Work sectionRef={workRef} />
      </main>
    </div>
  );
}
