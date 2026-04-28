export function StateChips() {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2" aria-hidden="true">
      <span className="rounded-md bg-slate-700 px-2 py-1 font-mono text-xs text-slate-300 ring-1 ring-slate-600">
        default
      </span>
      <span className="rounded-md bg-slate-600 px-2 py-1 font-mono text-xs text-slate-100 ring-1 ring-slate-500">
        hover
      </span>
      <span className="rounded-md bg-teal-400/20 px-2 py-1 font-mono text-xs text-teal-200 ring-2 ring-teal-300">
        focus
      </span>
    </div>
  );
}
