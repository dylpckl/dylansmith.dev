"use client";

const BUCKETS = [
  { label: "0", h: 12 },
  { label: "1", h: 28 },
  { label: "2", h: 64 },
  { label: "3", h: 88 },
  { label: "4", h: 56 },
  { label: "5", h: 36 },
  { label: "6", h: 20 },
  { label: "7+", h: 14 },
];

export function ManaCurve() {
  return (
    <div className="mt-3 flex w-fit flex-col gap-1" aria-hidden="true">
      <div className="flex h-16 items-end gap-1">
        {BUCKETS.map((b) => (
          <div
            key={b.label}
            className="w-5 rounded-t-sm bg-teal-300/80 ring-1 ring-teal-300/30"
            style={{ height: `${b.h}%` }}
          />
        ))}
      </div>
      <div className="flex gap-1">
        {BUCKETS.map((b) => (
          <span
            key={b.label}
            className="w-5 text-center font-mono text-[9px] uppercase tracking-widest text-slate-500"
          >
            {b.label}
          </span>
        ))}
      </div>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate-500">
        mana curve · CMC distribution
      </span>
    </div>
  );
}
