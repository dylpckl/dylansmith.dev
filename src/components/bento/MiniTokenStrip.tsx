const TOKENS = [
  { name: "primary", className: "bg-teal-300" },
  { name: "accent", className: "bg-orange-300" },
  { name: "success", className: "bg-emerald-300" },
  { name: "warn", className: "bg-yellow-300" },
  { name: "muted", className: "bg-slate-400" },
  { name: "surface", className: "bg-slate-100" },
];

export function MiniTokenStrip() {
  return (
    <div className="mt-2 flex items-center gap-2" aria-hidden="true">
      {TOKENS.map((t) => (
        <span
          key={t.name}
          title={t.name}
          className={`h-4 w-4 rounded-full ring-1 ring-slate-700 ${t.className}`}
        />
      ))}
    </div>
  );
}
