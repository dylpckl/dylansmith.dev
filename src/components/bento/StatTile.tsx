"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Tile } from "./Tile";
import { CountUp } from "@/components/CountUp";

type Props = {
  icon?: LucideIcon;
  number: string;
  caption: string;
  className?: string;
  onClickModal?: () => void;
  visual?: ReactNode;
};

export function StatTile({
  icon: Icon,
  number,
  caption,
  className,
  onClickModal,
  visual,
}: Props) {
  const inner = (
    <>
      <div className="flex flex-1 flex-col justify-center">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="mb-3 h-6 w-6 shrink-0 text-teal-300"
            strokeWidth={1.5}
          />
        )}
        <CountUp
          to={number}
          className="font-sans text-3xl font-bold leading-none text-slate-100 xl:text-4xl 2xl:text-5xl"
        />
        <p className="mt-3 max-w-[34ch] text-xs leading-snug text-slate-300 xl:text-sm 2xl:text-base">
          {caption}
        </p>
      </div>
      {visual}
    </>
  );

  if (onClickModal) {
    return (
      <Tile className={className} onClickModal={onClickModal}>
        {inner}
      </Tile>
    );
  }
  return (
    <Tile className={className} decorative>
      {inner}
    </Tile>
  );
}
