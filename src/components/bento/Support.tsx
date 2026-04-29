"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SupportProps = {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
};

const baseClasses =
  "group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-slate-800/60 p-6 ring-1 ring-slate-700 backdrop-blur-sm transition-all duration-300 hover:ring-teal-300/60";

export function Support({ icon: Icon, children, className }: SupportProps) {
  return (
    <div className={cn(baseClasses, className)}>
      <Icon
        className="h-7 w-7 text-teal-300 lg:h-8 lg:w-8"
        aria-hidden="true"
        strokeWidth={1.5}
      />
      <p className="font-serif text-xl leading-snug text-slate-100 lg:text-2xl">
        {children}
      </p>
    </div>
  );
}
