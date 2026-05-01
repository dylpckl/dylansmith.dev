"use client";

import { FileCode } from "lucide-react";

const FILES = [
  "script.sql",
  "migrate.py",
  "deploy.sh",
  "fix.sql",
  "notes.md",
  "utils.py",
  "backfill.sql",
  "audit.sql",
  "patches.sql",
];

function styleFor(name: string) {
  if (name.endsWith(".sql"))
    return {
      cell: "bg-violet-500/10 ring-violet-300/40 text-violet-200",
      icon: "text-violet-300",
    };
  if (name.endsWith(".py"))
    return {
      cell: "bg-pink-500/10 ring-pink-300/40 text-pink-200",
      icon: "text-pink-300",
    };
  return {
    cell: "bg-slate-800 ring-slate-700 text-slate-300",
    icon: "text-slate-500",
  };
}

export function ScatteredFiles() {
  return (
    <div
      className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:w-fit"
      aria-hidden="true"
    >
      {FILES.map((name) => {
        const s = styleFor(name);
        return (
          <span
            key={name}
            className={`flex min-w-0 items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[11px] ring-1 ${s.cell}`}
          >
            <FileCode className={`h-3 w-3 shrink-0 ${s.icon}`} />
            <span className="truncate">{name}</span>
          </span>
        );
      })}
    </div>
  );
}
