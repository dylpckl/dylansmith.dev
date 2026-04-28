"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Tile } from "./Tile";

type Props = {
  label: string;
  labelIcon?: LucideIcon;
  headline: string;
  body?: string;
  className?: string;
  onClickModal?: () => void;
  href?: string;
  visual?: ReactNode;
};

export function CategoryTile({
  label,
  labelIcon,
  headline,
  body,
  className,
  onClickModal,
  href,
  visual,
}: Props) {
  const inner = (
    <>
      <div className="flex flex-1 flex-col justify-center">
        <h3 className="font-serif text-2xl font-semibold leading-tight text-slate-100 lg:text-3xl">
          {headline}
        </h3>
        {body && (
          <p className="mt-3 max-w-[40ch] text-sm text-slate-300 lg:text-base">
            {body}
          </p>
        )}
      </div>
      {visual}
    </>
  );

  if (href) {
    return (
      <Tile
        label={label}
        labelIcon={labelIcon}
        className={className}
        href={href}
      >
        {inner}
      </Tile>
    );
  }
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
