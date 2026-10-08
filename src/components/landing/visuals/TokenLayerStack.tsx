// Three planes, read bottom to top: the app as it was, the token layer I
// added, and what users see. Colors come from the material tokens, so it
// reads in both Slate and Paper.

const LAYERS = [
  {
    step: "3 · What users see",
    name: "The restyled product",
    proof: ["Every screen", "WCAG AA contrast"],
    accent: true,
  },
  {
    step: "2 · What I added",
    name: "A CSS token layer",
    proof: ["One set of CSS tokens", "Documented in 100+ pages"],
    accent: true,
  },
  {
    step: "1 · What was there",
    name: "ASP.NET + DevExpress",
    proof: ["No rewrite", "No regressions"],
    accent: false,
  },
];

const ACCENT = "rgb(var(--m-accent))";
const ACCENT_SOFT = "rgb(var(--m-accent) / 0.12)";
const MUTED = "rgb(var(--m-ink-4))";
const LEGACY_FILL = "rgb(var(--m-ink-4) / 0.16)";
const BG = "rgb(var(--m-paper))";

function Stack() {
  return (
    <svg aria-hidden="true" width="300" height="440" viewBox="0 0 300 440" fill="none" className="shrink-0 overflow-visible">
      <g stroke={MUTED} strokeWidth="1" strokeDasharray="3 4">
        <path d="M5 70V370" />
        <path d="M295 70V370" />
      </g>
      {/* flow between layers */}
      <g stroke={ACCENT} strokeWidth="1.5">
        <path d="M150 312V284" />
        <path d="M144 290L150 282L156 290" />
        <path d="M150 162V134" />
        <path d="M144 140L150 132L156 140" />
      </g>
      <g fill={ACCENT} fontFamily="var(--font-jetbrains_mono), monospace" fontSize="10" letterSpacing="0.08em">
        <text x="160" y="302">overrides</text>
        <text x="160" y="152">applies to every screen</text>
      </g>
      {/* 1 · legacy */}
      <polygon points="5,370 150,315 295,370 150,425" fill={BG} />
      <polygon points="5,370 150,315 295,370 150,425" fill={LEGACY_FILL} stroke={MUTED} strokeWidth="1.25" />
      <g stroke={MUTED} strokeWidth="0.75" opacity="0.7">
        <path d="M41.25 356.25L186.25 411.25" />
        <path d="M77.5 342.5L222.5 397.5" />
        <path d="M113.75 328.75L258.75 383.75" />
        <path d="M41.25 383.75L186.25 328.75" />
        <path d="M77.5 397.5L222.5 342.5" />
        <path d="M113.75 411.25L258.75 356.25" />
      </g>
      {/* 2 · token layer */}
      <polygon points="5,220 150,165 295,220 150,275" fill={BG} />
      <polygon points="5,220 150,165 295,220 150,275" fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth="1.5" strokeDasharray="6 4" />
      {["#ccfbf1", "#99f6e4", "#5eead4", "#14b8a6", "#0f766e"].map((c, i) => (
        <circle key={c} cx={106.5 + i * 21.75} cy={236.5 - i * 8.25} r="7" fill={c} />
      ))}
      {/* 3 · result */}
      <polygon points="5,70 150,15 295,70 150,125" fill={BG} />
      <polygon points="5,70 150,15 295,70 150,125" fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth="1.5" />
      <g stroke={ACCENT} strokeWidth="1">
        <polygon points="39.8,70 150,28.2 173.2,37 63,78.8" fill={ACCENT_SOFT} />
        <polygon points="74.6,83.2 122.45,65.05 197.85,93.65 150,111.8" />
        <polygon points="134.05,60.65 184.8,41.4 260.2,70 209.45,89.25" />
      </g>
    </svg>
  );
}

function Chip({ children, accent }: { children: string; accent: boolean }) {
  return (
    <span
      className={`whitespace-nowrap rounded-md border px-2.5 py-1.5 font-mono text-xs ${
        accent ? "border-accent/50 bg-accent/10 text-accent" : "border-line/30 text-ink"
      }`}
    >
      {children}
    </span>
  );
}

export function TokenLayerStack() {
  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        Three stacked layers. Bottom: the existing ASP.NET and DevExpress app. Middle: a CSS token layer that
        overrides its styles. Top: the restyled product, every screen at WCAG AA contrast.
      </figcaption>

      {/* md+: labels | planes | proof, rows aligned to the plane centers */}
      <div className="hidden h-[440px] items-stretch gap-4 md:flex" aria-hidden="true">
        <div className="relative w-40 shrink-0">
          {LAYERS.map((l, i) => (
            <div key={l.step} className="absolute right-0 flex flex-col items-end gap-1 text-right" style={{ top: 46 + i * 150 }}>
              <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${l.accent ? "text-accent" : "text-ink-3"}`}>
                {l.step}
              </span>
              <span className={`text-[15px] font-semibold leading-tight ${l.accent ? "text-ink" : "text-ink-2"}`}>{l.name}</span>
            </div>
          ))}
        </div>
        <Stack />
        <ul className="relative m-0 min-w-0 flex-1 list-none p-0">
          {LAYERS.map((l, i) => (
            <li key={l.step} className="absolute left-0 flex items-center gap-2.5" style={{ top: 44 + i * 150 }}>
              <span className={`h-0 w-5 shrink-0 border-t border-dashed ${l.accent ? "border-accent/50" : "border-ink-4"}`} />
              <div className="flex flex-col gap-1.5">
                {l.proof.map((p) => (
                  <Chip key={p} accent={l.accent && i === 0}>
                    {p}
                  </Chip>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* phones: the same three layers as a top-down list */}
      <ol className="m-0 flex list-none flex-col gap-3 p-0 md:hidden">
        {LAYERS.map((l) => (
          <li
            key={l.step}
            className={`flex flex-col gap-2 rounded-lg border p-4 ${l.accent ? "border-accent/40 bg-accent/5" : "border-line/25"}`}
          >
            <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${l.accent ? "text-accent" : "text-ink-3"}`}>
              {l.step}
            </span>
            <span className="text-base font-semibold">{l.name}</span>
            <div className="flex flex-wrap gap-1.5">
              {l.proof.map((p) => (
                <Chip key={p} accent={false}>
                  {p}
                </Chip>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
