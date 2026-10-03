export function StateChips() {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2" aria-hidden="true">
      <span className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-ink-2 ring-1 ring-line/35">
        default
      </span>
      <span className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-ink ring-1 ring-line/40">
        hover
      </span>
      <span className="rounded-md bg-accent/20 px-2 py-1 font-mono text-xs text-accent ring-2 ring-accent">
        focus
      </span>
    </div>
  );
}
