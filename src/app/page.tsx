"use client";

import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

import { Hero } from "@/components/landing/Hero";
import { Intro } from "@/components/landing/Intro";
import { Outcomes } from "@/components/landing/Outcomes";
import { Work } from "@/components/landing/Work";

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");

  const introRef = useRef<HTMLDivElement | null>(null);
  const outcomesRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);

  // Active section = the last one whose top has passed 30% of the viewport.
  // Measured on scroll rather than with an IntersectionObserver threshold, so
  // short sections (Intro) and very tall ones (Work) both register, and the
  // hero above them all reads as Intro.
  useEffect(() => {
    const sections = [introRef, outcomesRef, workRef];
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = "intro";
      for (const s of sections) {
        const el = s.current;
        if (el && el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // The sidebar is pinned to the window edge; .main-column (globals.css)
    // centers the content in the viewport and clears the sidebar.
    <div id="top" className="relative min-h-screen">
      <Header activeSection={activeSection} />

      <main className="main-column">
        {/* Site-wide background layers (z stack: dotted -20, gradient overlay -10) */}
        <div className="fixed inset-0 -z-20 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/90" />

        <Hero />
        <Intro sectionRef={introRef} />
        <Outcomes sectionRef={outcomesRef} />
        <Work sectionRef={workRef} />
      </main>
      <Footer />
    </div>
  );
}
