"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { Answer, SolveRequest } from "@/lib/demos/crosscheck/contract";
import { parsePattern } from "@/lib/demos/crosscheck/pattern";
import {
  capAnswers,
  mergeAnswers,
  rankAnswers,
} from "@/lib/demos/crosscheck/rank";
import { findClued } from "@/lib/demos/crosscheck/findClued";
import {
  buildUrls,
  mapAnswers,
  type DatamuseWord,
} from "@/lib/demos/crosscheck/datamuse";
import { PhoneFrame } from "./PhoneFrame";
import { TryHint } from "./TryHint";

// crosscheck's own palette (src/styles.css, light theme).
const THEME = {
  "--ground": "#EFE9DD",
  "--paper": "#FBF8F1",
  "--ink": "#1B1B1B",
  "--ink-2": "#5E5A50",
  "--ink-3": "#8C8779",
  "--rule": "#D8D0BE",
  "--rule-2": "#E6DFD0",
  "--blue": "#2B4C7E",
  "--blue-tint": "#E3E9F3",
  "--chrome": "#E6DFD0",
} as CSSProperties;

const SANS =
  '-apple-system, "SF Pro Text", "Segoe UI", Roboto, system-ui, sans-serif';
const SERIF = 'Georgia, "Times New Roman", serif';
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

const PRESETS: { query: string; pattern: string }[] = [
  { query: "old coin", pattern: "" },
  { query: "tide", pattern: "" },
  { query: "greek letter", pattern: "?ta" },
  { query: "butter substitute", pattern: "" },
];

type Status = "idle" | "loading" | "done" | "error";

/** A published answer has evidence behind it; everything else is association. */
const isPublished = (a: Answer) => (a.priority ?? 0) >= 1;

function buildRequest(
  query: string,
  pattern: string,
): SolveRequest | { error: string } {
  const q = query.trim().replace(/\s+/g, " ");
  if (!q) return { error: "Type a word or phrase first" };
  const c = parsePattern(pattern);
  if (c.error) return { error: c.error };
  return { query: q, pattern: c.pattern, length: c.length, letters: c.letters };
}

export function CrosscheckDemo() {
  const [query, setQuery] = useState(PRESETS[0].query);
  const [pattern, setPattern] = useState(PRESETS[0].pattern);
  const [req, setReq] = useState<SolveRequest | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lengthFilter, setLengthFilter] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Same order of operations as crosscheck's solve(): paint the local corpus
  // instantly, then merge Datamuse in when the round trip lands.
  const solve = useCallback(async (q: string, p: string) => {
    const built = buildRequest(q, p);
    if ("error" in built) {
      setError(built.error);
      return;
    }
    setError(null);
    setReq(built);
    setLengthFilter(null);
    scrollRef.current?.scrollTo({ top: 0 });

    const local = findClued(built);
    setAnswers(capAnswers(local));
    setStatus("loading");

    abortRef.current?.abort();
    const ctl = new AbortController();
    abortRef.current = ctl;
    try {
      const rows = await Promise.all(
        buildUrls(built).map((u) =>
          fetch(u, { signal: ctl.signal }).then((r) => {
            if (!r.ok) throw new Error(String(r.status));
            return r.json() as Promise<DatamuseWord[]>;
          }),
        ),
      );
      const remote = mapAnswers(rows.flat(), built);
      setAnswers(
        capAnswers(rankAnswers(mergeAnswers([...local, ...remote]), built)),
      );
      setStatus("done");
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setStatus("error");
    }
  }, []);

  // Don't hit Datamuse on page load — wait until the phone scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          solve(PRESETS[0].query, PRESETS[0].pattern);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      abortRef.current?.abort();
    };
  }, [solve]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    solve(query, pattern);
  };

  const runPreset = (p: (typeof PRESETS)[number]) => {
    setQuery(p.query);
    setPattern(p.pattern);
    solve(p.query, p.pattern);
  };

  const copy = (a: Answer) => {
    navigator.clipboard?.writeText(a.answer).catch(() => {});
    setCopied(a.answer);
    window.setTimeout(
      () => setCopied((c) => (c === a.answer ? null : c)),
      1400,
    );
  };

  const view = useMemo(() => {
    const counts = new Map<number, number>();
    for (const a of answers)
      counts.set(a.length, (counts.get(a.length) ?? 0) + 1);
    const lengths = Array.from(counts.keys()).sort((a, b) => a - b);
    const active =
      lengthFilter !== null && counts.has(lengthFilter) ? lengthFilter : null;
    const filtered = active
      ? answers.filter((a) => a.length === active)
      : answers;
    return {
      lengths,
      active,
      published: filtered.filter(isPublished),
      related: filtered.filter((a) => !isPublished(a)).slice(0, 24),
      publishedTotal: answers.filter(isPublished).length,
    };
  }, [answers, lengthFilter]);

  const hint = req?.pattern
    ? `${req.pattern.length} letters, ${req.pattern.replace(/\?/g, "·")}`
    : req?.letters
      ? `Has ${req.letters.split("").join(" ")}`
      : "? for each unknown letter";

  return (
    <div ref={rootRef} onPointerDown={() => setTouched(true)}>
      <PhoneFrame screen="#E6DFD0" ink="#1B1B1B">
        <div
          className="flex min-h-0 flex-1 flex-col"
          style={{
            ...THEME,
            fontFamily: SANS,
            color: "var(--ink)",
            fontSize: 15,
            lineHeight: 1.45,
          }}
        >
          {/* app bar */}
          <div
            className="flex h-11 shrink-0 items-center px-4"
            style={{ background: "var(--chrome)" }}
          >
            <span
              className="flex-1 lowercase"
              style={{ font: `500 18px/1 ${SERIF}`, letterSpacing: "-0.01em" }}
            >
              Crosscheck
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--blue)"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>

          {/* search bar */}
          <form
            onSubmit={onSubmit}
            className="relative z-10 shrink-0 px-4 pb-3 pt-2"
            style={{
              background: "var(--chrome)",
              boxShadow:
                "0 1px 0 var(--rule), 0 8px 16px -10px rgba(27,27,27,.1)",
            }}
          >
            <div className="flex gap-2">
              <label
                className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl px-3 focus-within:shadow-[0_0_0_3px_var(--blue-tint)]"
                style={{
                  background: "var(--paper)",
                  border: "1.5px solid var(--rule)",
                }}
              >
                <span className="sr-only">Clue</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Clue or word"
                  enterKeyHint="search"
                  className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-[var(--ink-3)]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear clue"
                    className="grid h-6 w-6 place-items-center rounded-full"
                    style={{ color: "var(--ink-3)" }}
                  >
                    ✕
                  </button>
                )}
              </label>
              <button
                type="submit"
                aria-label="Solve"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{ background: "var(--blue)", color: "#fff" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2.5">
              <label
                className="flex h-9 w-[132px] shrink-0 items-center rounded-[10px] px-2.5"
                style={{
                  background: "var(--paper)",
                  border: "1.5px solid var(--rule)",
                }}
              >
                <span className="sr-only">Pattern</span>
                <input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Pattern"
                  autoCapitalize="characters"
                  className="h-full w-full min-w-0 bg-transparent uppercase outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-[var(--ink-3)]"
                  style={{
                    font: `500 14px/1 ${MONO}`,
                    letterSpacing: "0.18em",
                  }}
                />
              </label>
              <span
                className="min-w-0 truncate text-[12px]"
                style={{ color: "var(--ink-3)" }}
              >
                {hint}
              </span>
            </div>
            {error && (
              <p className="mt-1.5 text-[13px]" style={{ color: "#A3362B" }}>
                {error}
              </p>
            )}
          </form>

          {/* results */}
          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ background: "var(--ground)" }}
          >
            <div className="relative mb-4 mt-1">
              <TryHint
                show={!touched}
                label="Tap a clue"
                color="#2B4C7E"
                ink="#fff"
                placement="bottom"
                radius={18}
              />
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                {PRESETS.map((p) => {
                  const on = req?.query === p.query;
                  return (
                    <button
                      key={p.query}
                      type="button"
                      onClick={() => runPreset(p)}
                      aria-pressed={on}
                      className="shrink-0 rounded-full px-3 py-1.5 text-[13px] leading-none"
                      style={{
                        border: `1px solid ${on ? "var(--blue)" : "var(--rule)"}`,
                        background: on ? "var(--blue-tint)" : "transparent",
                        color: on ? "var(--blue)" : "var(--ink-2)",
                      }}
                    >
                      {p.query}
                      {p.pattern && (
                        <span
                          style={{
                            fontFamily: MONO,
                            marginLeft: 6,
                            opacity: 0.7,
                          }}
                        >
                          {p.pattern.toUpperCase()}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <SectionHead
              label="Answers"
              count={view.publishedTotal || undefined}
            />

            {view.lengths.length > 1 && (
              <div className="flex items-center gap-2.5 pb-3">
                <span
                  className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: "var(--ink-3)" }}
                >
                  Length
                </span>
                <div className="min-w-0 overflow-x-auto [scrollbar-width:none]">
                  <div
                    role="group"
                    aria-label="Filter by length"
                    className="inline-flex overflow-hidden rounded-full"
                    style={{
                      border: "1px solid var(--rule)",
                      background: "var(--paper)",
                    }}
                  >
                    {[null, ...view.lengths].map((n, i) => {
                      const on = n === view.active;
                      return (
                        <button
                          key={n ?? "all"}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setLengthFilter(n)}
                          className="h-8 min-w-[38px] px-3 text-[14px] tabular-nums"
                          style={{
                            borderLeft: i ? "1px solid var(--rule)" : 0,
                            background: on ? "var(--blue)" : "transparent",
                            color: on ? "#fff" : "var(--ink-2)",
                          }}
                        >
                          {n ?? "All"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {view.published.length > 0 ? (
              <div className="flex flex-col">
                {view.published.map((a) => (
                  <AnswerRow
                    key={a.answer}
                    answer={a}
                    req={req}
                    copied={copied === a.answer}
                    onCopy={copy}
                  />
                ))}
              </div>
            ) : status === "loading" && answers.length === 0 ? (
              <Skeleton />
            ) : (
              <p className="pb-2 text-[14px]" style={{ color: "var(--ink-3)" }}>
                No published answer
                {req ? (
                  <>
                    {" "}
                    for <b style={{ color: "var(--ink-2)" }}>{req.query}</b>
                  </>
                ) : null}{" "}
                yet.
              </p>
            )}

            {(view.related.length > 0 || status === "loading") && (
              <>
                <div className="mt-5">
                  <SectionHead
                    label="Related words"
                    count={view.related.length || undefined}
                  />
                </div>
                {view.related.length === 0 ? (
                  <Skeleton />
                ) : (
                  <div className="flex flex-col">
                    {view.related.map((a) => (
                      <AnswerRow
                        key={a.answer}
                        answer={a}
                        req={req}
                        copied={copied === a.answer}
                        onCopy={copy}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {status === "error" && (
              <p className="pt-2 text-[13px]" style={{ color: "var(--ink-3)" }}>
                Couldn&apos;t reach Datamuse. Local answers only.
              </p>
            )}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

function SectionHead({ label, count }: { label: string; count?: number }) {
  return (
    <h4
      className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "var(--ink-3)" }}
    >
      {label}
      {count !== undefined && (
        <span className="font-medium tabular-nums tracking-normal">
          {count}
        </span>
      )}
    </h4>
  );
}

function AnswerRow({
  answer: a,
  req,
  copied,
  onCopy,
}: {
  answer: Answer;
  req: SolveRequest | null;
  copied: boolean;
  onCopy: (a: Answer) => void;
}) {
  const long = a.length >= 9;
  let idx = 0;
  const words = a.display.split(/\s+/);
  const pos = a.partOfSpeech?.[0];
  return (
    <button
      type="button"
      onClick={() => onCopy(a)}
      aria-label={`${a.display}, ${a.length} letters. Tap to copy.`}
      className="grid w-full gap-1.5 py-3 text-left transition-colors first:border-t-0 active:bg-[var(--rule-2)]"
      style={{
        borderTop: "1px solid var(--rule-2)",
        opacity: a.fitsPattern === false ? 0.38 : 1,
      }}
    >
      <span
        className={`flex flex-wrap items-center ${long ? "gap-[2px]" : "gap-[3px]"}`}
      >
        {words.map((w, wi) => (
          <span
            key={wi}
            className={`flex ${long ? "gap-[2px]" : "gap-[3px]"}`}
            style={{ marginRight: wi < words.length - 1 ? (long ? 5 : 8) : 0 }}
          >
            {w
              .toUpperCase()
              .replace(/[^A-Z]/g, "")
              .split("")
              .map((ch, ci) => {
                const hit = req?.pattern
                  ? req.pattern[idx] === ch
                  : Boolean(req?.letters?.includes(ch));
                idx++;
                return (
                  <span
                    key={ci}
                    className="grid place-items-center"
                    style={{
                      width: long ? 21 : 26,
                      height: long ? 25 : 28,
                      borderRadius: long ? 3 : 4,
                      border: `1px solid ${hit ? "var(--blue)" : "var(--rule)"}`,
                      borderBottomWidth: 2,
                      background: hit ? "var(--blue-tint)" : "var(--paper)",
                      color: hit ? "var(--blue)" : "var(--ink)",
                      font: `600 ${long ? 12 : 14}px/1 ${MONO}`,
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
          </span>
        ))}
        <span
          className="ml-1.5 text-[12px] tabular-nums"
          style={{ color: copied ? "var(--blue)" : "var(--ink-3)" }}
        >
          {copied ? "Copied" : a.length}
        </span>
      </span>
      {a.gloss && (
        <span
          className="text-[14px] leading-snug"
          style={{ color: "var(--ink-2)" }}
        >
          {pos && (
            <i className="mr-1" style={{ color: "var(--ink-3)" }}>
              {pos}.
            </i>
          )}
          {a.gloss}
        </span>
      )}
    </button>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-3 py-2" aria-hidden="true">
      {[80, 55, 70].map((w) => (
        <div
          key={w}
          className="h-7 animate-pulse rounded"
          style={{ width: `${w}%`, background: "var(--rule-2)" }}
        />
      ))}
    </div>
  );
}
