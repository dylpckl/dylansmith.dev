"use client";

import { useEffect, useRef, useState } from "react";

import { Header, type NavSection } from "@/components/Header";
import { Workspace } from "@/components/workspace/Workspace";
import { Frame } from "@/components/workspace/Frame";

import { Hero } from "./Hero";
import { Principles } from "./Principles";
import { Work } from "./Work";
import { Writing, type PostSummary } from "./Writing";

export const SECTIONS: NavSection[] = [
  { id: "intro", label: "Intro" },
  { id: "principles", label: "Principles" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
];

type LandingProps = {
  posts: PostSummary[];
};

/**
 * Client composer for the landing page: owns the section refs and the
 * IntersectionObserver that drives the sidebar's active state. The server
 * page loads posts and hands them in.
 */
export function Landing({ posts }: LandingProps) {
  const [activeSection, setActiveSection] = useState("intro");

  const introRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const writingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refs = [introRef, principlesRef, workRef, writingRef];
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
    <div className="relative min-h-screen lg:flex">
      <div className="ws-grid" aria-hidden="true" />
      <div className="ws-veil" aria-hidden="true" />

      <Header activeSection={activeSection} sections={SECTIONS} />

      <main className="min-w-0 flex-1">
        <Workspace>
          <Frame id="intro" label="Intro" sectionRef={introRef}>
            <Hero />
          </Frame>
          <Frame id="principles" label="Principles" sectionRef={principlesRef}>
            <Principles />
          </Frame>
          <Frame id="work" label="Work" sectionRef={workRef}>
            <Work />
          </Frame>
          <Frame id="writing" label="Writing" sectionRef={writingRef}>
            <Writing posts={posts} />
          </Frame>
        </Workspace>
      </main>
    </div>
  );
}
