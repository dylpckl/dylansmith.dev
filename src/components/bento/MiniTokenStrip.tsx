const TEAL_SHADES = [
  "bg-teal-100",
  "bg-teal-200",
  "bg-teal-300",
  "bg-teal-400",
  "bg-teal-500",
  "bg-teal-600",
  "bg-teal-700",
  "bg-teal-800",
  "bg-teal-900",
];

export function MiniTokenStrip() {
  return (
    <div className="mt-2 flex items-center gap-1" aria-hidden="true">
      {TEAL_SHADES.map((cls) => (
        <span
          key={cls}
          className={`h-5 w-5 rounded-md ring-1 ring-slate-700 ${cls}`}
        />
      ))}
    </div>
  );
}
