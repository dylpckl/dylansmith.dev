"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Tile } from "./Tile";

type Props = {
  label: string;
  labelIcon?: LucideIcon;
  number: string;
  caption: string;
  className?: string;
  onClickModal?: () => void;
  visual?: ReactNode;
};

export function StatTile({
  label,
  labelIcon,
  number,
  caption,
  className,
  onClickModal,
  visual,
}: Props) {
  const inner = (
    <>
      <div className="flex flex-1 flex-col justify-center">
        <span className="font-sans text-5xl font-bold leading-none text-slate-100 lg:text-6xl">
          {number}
        </span>
        <p className="mt-3 max-w-[34ch] text-base leading-snug text-slate-300 lg:text-lg">
          {caption}
        </p>
      </div>
      {visual}
    </>
  );

  if (onClickModal) {
    return (
      <Tile
        label={label}
        labelIcon={labelIcon}
        className={className}
        onClickModal={onClickModal}
      >
        {inner}
      </Tile>
    );
  }
  return (
    <Tile label={label} labelIcon={labelIcon} className={className} decorative>
      {inner}
    </Tile>
  );
}
