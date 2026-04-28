// steamparty
// huberman-db
// dsdev
// obsidian-sticky-header
import steamparty from "../../../public/images/steamparty.png";
import Image from "next/image";
import Link from "next/link";
import TagGroup from "@/components/TagGroup";
import LandingPageCard from "@/components/LandingPageCard";
import spireWhite from "../../../public/images/Spire-Logo-White.svg";

const spireTags = ["Figma", "UX Research", "UI Design", "Accessibility"];

const dsdevTags = ["Figma", "React", "Next.js", "Tailwind", "MDX"];

export default function PostIndex() {
  return (
    <>
      <div className="flex flex-col">
        {/* UI/UX Case Studies */}
        <h1 className="font-mono text-2xl">UI/UX Case Studies</h1>
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <Link
            href="/work/spire"
            className="w-1/2 grid grid-cols-8 group sm:gap-8 md:gap-4 text-slate-200 bg-slate-700/40 hover:bg-slate-700 p-4 rounded-lg transition-all hover:ring-2 ring-teal-300"
          >
            <Image
              src={spireWhite}
              height={48}
              width={200}
              alt="SPIRE logo"
              className="rounded-lg mr-4 col-span-2"
            />

            <div className="col-span-6 flex flex-col">
              <span className="flex items-center font-medium text-lg">
                SPIRE
              </span>

              <div className="divide-y space-y-2 divide-slate-400/60">
                <p className="text-sm mt-2">
                  Browser-based property management software that runs in
                  parallel to the legacy Windows version.
                </p>
                <div>
                  <p className="text-sm mt-2">
                    As the lead UI/UX Designer, I created the project&apos;s
                    first design system using atomic methodology.
                  </p>
                  <p className="text-sm mt-2">
                    I&apos;ve also lead the design effort from concept to
                    production for several keystone features with thousands of
                    daily users, including UX research, UI design, incorporating
                    stakeholder feedback and developer collaboration.
                  </p>
                </div>
              </div>

              {/* <TagGroup tags={["React", "React Query", "Tailwind CSS"]} /> */}
              {/* Call to Action */}
              <div className="z-10 flex items-center mt-6 mr-2 border-b border-transparent transition group-hover:border-teal-300  motion-reduce:transition-none">
                <span className="font-mono font-light">
                  My notes on enterprise UI Design
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-1 w-4 h-4 -translate-y-px transition-transform group-hover:translate-x-2 group-hover:text-teal-300 motion-reduce:transition-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            href="/work/dylansmith-dev"
            className="w-1/2 grid grid-cols-8 group sm:gap-8 md:gap-4 text-slate-200 bg-slate-700/40 hover:bg-slate-700 p-4 rounded-lg transition-all hover:ring-2 ring-teal-300"
          >
            <Image
              src={spireWhite}
              height={48}
              width={200}
              alt="SPIRE logo"
              className="rounded-lg mr-4 col-span-2"
            />

            <div className="col-span-6 flex flex-col">
              <span className="flex items-center font-medium text-lg">
                dylansmith.dev
              </span>

              <div className="divide-y space-y-2 divide-slate-400/60">
                <p className="text-sm mt-2">
                  My own tiny slice of the internet.
                </p>
                <div>
                  <p className="text-sm mt-2">
                    A portfolio site focused on a journeyed user experience
                    that showcases work and communicates thought process.
                  </p>
                  <p className="text-sm mt-2">
                    Built on a custom component library designed specifically
                    to clearly communicate accomplishments. Combines React
                    Server and Client components with a static data rendering
                    strategy for optimal performance.
                  </p>
                </div>
              </div>

              {/* <TagGroup tags={["React", "React Query", "Tailwind CSS"]} /> */}
              {/* Call to Action */}
              <div className="z-10 flex items-center mt-6 mr-2 place-self-end border-b border-transparent transition group-hover:border-teal-300  motion-reduce:transition-none">
                <span className="font-mono font-light">
                  See how I built this site
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-1 w-4 h-4 -translate-y-px transition-transform group-hover:translate-x-2 group-hover:text-teal-300 motion-reduce:transition-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Projects */}
        <div className="mt-12">
          <h1 className="font-mono text-2xl">Projects</h1>

          {/* Project Grid */}
          <div className="grid grid-cols-2 gap-5 w-full mt-6">
            {/* Project Card */}
            <a
              href="https://www.steamparty.io"
              target="_blank"
              className="col-span-1 grid grid-cols-8 sm:gap-8 md:gap-4 text-slate-200 bg-slate-700/40 hover:bg-slate-700 p-4 rounded-lg transition-all hover:ring-2 ring-teal-300"
              // flex flex-col relative group h-full w-full md:w-1/2 gap-2 group transition-all hover:ring-2 ring-teal-300 col-span-1 md:col-span-2 rounded-lg p-4 text-slate-200 bg-slate-700/75
            >
              <Image
                src={steamparty}
                alt="Picture of www.steamparty.io user interface"
                className="rounded-lg mr-4 col-span-2"
              />

              <div className="col-span-6 flex flex-col">
                <span className="flex items-center font-medium">
                  www.steamparty.io
                  <span className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-3 h-3 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </span>
                </span>

                <p className="text-sm mt-2">
                  Web app for finding Steam games that both you and your friends
                  own. After connecting your Steam account, the app populates
                  your friend list so that you can build a party. Then execute
                  the query to find any games that everyone in the party owns.
                  Also includes a &ldquo;pick for us&ldquo; feature if you
                  can&apos;t decide.
                </p>
                <TagGroup tags={["React", "React Query", "Tailwind CSS"]} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
