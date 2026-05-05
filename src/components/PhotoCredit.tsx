"use client";

import { ExternalLink } from "lucide-react";

export function PhotoCredit() {
  return (
    <div className="group fixed left-6 top-6 z-30 hidden h-3 w-3 rounded-full bg-slate-100/70 outline outline-2 outline-offset-4 outline-slate-100/50 transition-colors duration-300 hover:bg-teal-300 hover:outline-teal-300/60 md:block lg:left-auto lg:top-auto lg:bottom-[42%] lg:right-6">
      <div
        role="tooltip"
        className="pointer-events-none absolute left-0 top-6 flex min-w-[160px] -translate-y-1 flex-col gap-1 rounded-lg bg-slate-100 p-2.5 font-mono text-xs text-slate-800 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:-top-[68px] lg:left-auto lg:right-0 lg:translate-y-1 lg:group-hover:translate-y-0"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Photo Cred
        </span>
        <a
          href="https://www.pexels.com/photo/white-and-black-mountain-wallpaper-933054/"
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto inline-flex items-center gap-1.5 underline decoration-slate-400 underline-offset-2 hover:decoration-teal-600"
        >
          Joyston Judah
          <ExternalLink className="h-3 w-3" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export default PhotoCredit;
