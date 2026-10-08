"use client";

import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { SECTIONS } from "@/lib/site";
import { Workspace } from "@/components/workspace/Workspace";
import { Frame } from "@/components/workspace/Frame";

import { Hero } from "./Hero";
import { Principles } from "./Principles";
import { Outcomes } from "./Outcomes";
import { Work } from "./Work";
// Writing frame is hidden for now. To bring it back: load posts in
// app/page.tsx (getAllPosts → PostSummary[]) and pass them here as `posts`,
// import { Writing }, add a writingRef (and to the observer's refs), render
// <Frame id="writing" label="Writing" sectionRef={writingRef}><Writing posts={posts} /></Frame>
// after Projects, and restore its SECTIONS entry in lib/site.ts.
import { SideProjects } from "./SideProjects";

/**
 * Client composer for the landing page: owns the section refs and the
 * IntersectionObserver that drives the sidebar's active state.
 */
export function Landing() {
  const [activeSection, setActiveSection] = useState("intro");

  const introRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<HTMLElement>(null);
  const outcomesRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refs = [
      introRef,
      principlesRef,
      outcomesRef,
      workRef,
      projectsRef,
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      // A section is "active" when it crosses a band around the upper third
      // of the viewport, so the top of the page reads as Intro, not whatever
      // frame happens to be the tallest.
      { rootMargin: "-20% 0px -72% 0px", threshold: 0 },
    );
    refs.forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="top" className="relative min-h-screen lg:flex">
        <div className="ws-grid" aria-hidden="true" />
        <div className="ws-veil" aria-hidden="true" />

        <Header activeSection={activeSection} sections={SECTIONS} />

        <main className="min-w-0 flex-1">
          <Workspace>
            <Frame id="intro" label="Intro" sectionRef={introRef}>
              <Hero />
            </Frame>
            <Frame
              id="principles"
              label="Principles"
              sectionRef={principlesRef}
            >
              <Principles />
            </Frame>
            <Frame id="outcomes" label="Outcomes" sectionRef={outcomesRef}>
              <Outcomes />
            </Frame>
            <Frame id="work" label="Work" sectionRef={workRef}>
              <Work />
            </Frame>
            <Frame id="projects" label="Projects" sectionRef={projectsRef}>
              <SideProjects />
            </Frame>
          </Workspace>
        </main>
      </div>
      <Footer />
    </>
  );
}
