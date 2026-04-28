"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/images/ds-logo.png";
import { Socials, SocialLink } from "@/components/SocialLink";

const NavItem = ({ href, children }) => {
  let isActive = usePathname().includes(href);

  return (
    <li className="font-mono text-sm text-slate-200">
      <Link
        href={href}
        className={clsx(
          "relative block p-1 transition md:px-3 md:py-2",
          isActive ? "text-teal-300" : "hover:text-teal-300",
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0" />
        )}
      </Link>
    </li>
  );
};

const MobileNavigation = (props) => {
  return (
    <div className="" {...props}>
      <div className="absolute top-0 h-12 w-screen bg-slate-300">
        <nav>
          <ul>
            <NavItem href="/journal">journal</NavItem>
          </ul>
        </nav>
      </div>
    </div>
  );
};

const DesktopNavigation = (props) => {
  return (
    <nav {...props}>
      <ul className="flex items-center gap-2 md:gap-3">
        <NavItem href="/#case-studies">work</NavItem>
        <span className="text-xs text-slate-400">{"//"}</span>
        {/* <NavItem href="/journal">journal</NavItem>
        <span className="text-slate-400 text-xs">{"//"}</span> */}
        <NavItem href="/about">about</NavItem>
        <span className="text-xs text-slate-400">{"//"}</span>
        <a
          href="/dylan-smith-resume.pdf"
          target="_blank"
          className="p-1 font-mono text-sm text-slate-200 hover:text-teal-300 md:px-3 md:py-2"
        >
          resume
        </a>
      </ul>
    </nav>
  );
};

const Nav = ({ links, activeSection }) => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {links.map((link, index) => (
        <Link
          key={index}
          href={`/#${link}`}
          // className={`cursor-pointer font-mono text-sm font-semibold uppercase text-slate-300 hover:text-teal-300`}
          className={`cursor-pointer font-mono text-sm font-semibold uppercase text-slate-300 hover:text-teal-300 ${
            activeSection == link && "text-teal-300"
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
};

export function Header({ activeSection }) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  let links = ["intro", "design", "develop"];

  const handleMobileNav = () => {
    setMobileNavIsOpen(!mobileNavIsOpen);
  };

  return (
    // <header className="sticky top-0 z-20 py-5 px-10 w-full backdrop-blur-md flex justify-between">
    // <header className="py-5 px-10 w-full flex justify-between snap-start">
    //   <Link
    //     href="/"
    //     className="relative flex items-center"
    //   >
    //     {/* <Avatar /> */}
    //     <Image
    //       src={Logo}
    //       alt="logo"
    //       height={48}
    //     />
    //     <span className="ml-8 font-mono text-2xl text-slate-200">Dylan Smith</span>
    //   </Link>

    //   {/* Mobile Nav */}
    //   <div className="md:hidden rounded-lg flex gap-6 justify-between z-20">
    //     {mobileNavIsOpen && (
    //       <nav className="w-full">
    //         <ul className="flex flex-col gap-2 divide-y">
    //           <NavItem href="/work">work</NavItem>
    //           <NavItem href="/about">about</NavItem>
    //           <NavItem href="/resume">resume</NavItem>
    //         </ul>
    //       </nav>
    //     )}

    //     <button
    //       className="self-start z-30"
    //       onClick={handleMobileNav}
    //     >
    //       {mobileNavIsOpen ? (
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth="1.5"
    //           stroke="currentColor"
    //           className="w-6 h-6"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M6 18L18 6M6 6l12 12"
    //           />
    //         </svg>
    //       ) : (
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth="1.5"
    //           stroke="currentColor"
    //           className="w-6 h-6"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    //           />
    //         </svg>
    //       )}
    //     </button>
    //   </div>

    //   <DesktopNavigation className="pointer-events-auto hidden md:block" />
    // </header>
    <header className="hidden w-full bg-gradient-to-t from-slate-800/60 px-6 py-12 md:px-12 md:py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/6 lg:flex-col lg:bg-none lg:py-24">
      {/* <span className="flex lg:hidden flex-col tracking-tight font-bold text-slate-200">
      <span className="text-5xl">Dylan Smith</span>
      <span className="text-lg font-medium mt-4">
        Designing pixel-perfect interfaces by day & developing them by
        night.
      </span>
      <div className="mt-4 text-lg font-normal text-slate-200">
        Leading design for{" "}
        <a
          href="https://multidataservices.com/"
          target="_blank"
          className="group relative underline decoration-teal-300 hover:decoration-teal-900"
        >
          <span className="relative z-20 group-hover:text-teal-900 ">
            MDS Property Management Software
          </span>
          {"."}
          <span className="absolute z-10 inset-0 bg-teal-300 w-0 group-hover:w-full group-hover:transition-all duration-500 ease-in-out"></span>
        </a>
      </div>
    </span> */}

      <div className="ml-2 hidden lg:block">
        <Link href="/" alt="home">
          <Image src={Logo} alt="logo" height={64} />
        </Link>
        <Nav links={links} activeSection={activeSection} />
        <Link
          href="/dylan-smith-resume.pdf"
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
    </header>
  );
}
