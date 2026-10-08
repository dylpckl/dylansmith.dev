"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ROSTER } from "@/lib/demos/prompt-fighter/roster";
import { simulate } from "@/lib/demos/prompt-fighter/sim";
import {
  BODY_KEYS,
  METER_TO_SPECIAL,
  SPIRIT_KEYS,
  SPIRIT_TOTAL,
  STAT_TOTAL,
} from "@/lib/demos/prompt-fighter/types";
import type { Side, Stats, TurnEvent } from "@/lib/demos/prompt-fighter/types";
import {
  PRESSURE_THRESHOLD,
  PRESSURE_TRACKS,
  VICTORY_LABELS,
  victoryText,
} from "@/lib/demos/prompt-fighter/victory";
import { PixelSprite } from "./PixelSprite";

// prompt-fighter's own theme (src/theme.ts).
const t = {
  bg: "#0b0b0c",
  panel: "#141417",
  panelHi: "#1c1c21",
  line: "#2a2a31",
  text: "#e9e9ec",
  dim: "#83838f",
  faint: "#55555f",
  accent: "#d9503c",
  good: "#5aa86f",
  warn: "#c9a227",
};
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
const BEAT_MS = 720;

const STAT_LABEL: Record<keyof Stats, string> = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spd: "SPD",
  cha: "Presence",
  wil: "Resolve",
  arc: "Weirdness",
  luk: "Fate",
};
const BODY_COLORS = ["#d9503c", "#e08a3c", "#5a8fd9", "#5aa86f"];
const SPIRIT_COLORS = ["#c9a227", "#9a8cd9", "#c04ce0", "#4cc9b0"];

function newSeed() {
  return (Math.random() * 0xffffffff) >>> 0;
}

export function PromptFighterDemo() {
  const [pick, setPick] = useState<Record<Side, number>>({ a: 0, b: 1 });
  const [seed, setSeed] = useState(0x5eed1e55);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [statsOpen, setStatsOpen] = useState<Side | null>(null);
  const timer = useRef<number | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const a = ROSTER[pick.a];
  const b = ROSTER[pick.b];
  // The whole fight is decided here, up front, exactly like the app's server.
  // The replay below only animates a finished log.
  const result = useMemo(() => simulate(a, b, seed), [a, b, seed]);
  const log = result.log;
  const finished = step >= log.length && step > 0;
  const current: TurnEvent | null = step > 0 ? log[Math.min(step, log.length) - 1] : null;
  const hp = current ? current.hp : result.maxHp;
  const meter = current ? current.meter : { a: 0, b: 0 };

  useEffect(() => {
    if (!running) return;
    if (step >= log.length) {
      setRunning(false);
      return;
    }
    timer.current = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 300 : BEAT_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [running, step, log.length]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step, finished]);

  const fight = (nextSeed = seed) => {
    setSeed(nextSeed);
    setStep(0);
    setRunning(true);
  };

  const cycle = (side: Side, dir: 1 | -1) => {
    setRunning(false);
    setStep(0);
    setPick((p) => {
      const other = side === "a" ? p.b : p.a;
      let next = p[side];
      do next = (next + dir + ROSTER.length) % ROSTER.length;
      while (next === other);
      return { ...p, [side]: next };
    });
  };

  const winner = finished ? (result.winner === "a" ? a : b) : null;
  const loser = finished ? (result.winner === "a" ? b : a) : null;
  const hitSide: Side | null =
    current && current.damage > 0 ? (current.actor === "a" ? "b" : "a") : null;

  return (
    <div
      className="mx-auto w-full max-w-[560px] overflow-hidden rounded-md text-[13px]"
      style={{ background: t.bg, color: t.text, fontFamily: MONO, border: `1px solid ${t.line}` }}
    >
      <style>{`
        @keyframes pf-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        @keyframes pf-hit { 0% { filter: brightness(3) saturate(0); transform: translateX(0) } 30% { transform: translateX(-4px) } 60% { transform: translateX(3px) } 100% { filter: none; transform: translateX(0) } }
        @keyframes pf-lunge-r { 0%,100% { transform: translateX(0) } 40% { transform: translateX(18px) } }
        @keyframes pf-lunge-l { 0%,100% { transform: translateX(0) } 40% { transform: translateX(-18px) } }
        @keyframes pf-pop { 0% { opacity: 0; transform: translateY(4px) scale(.96) } 100% { opacity: 1; transform: none } }
        @keyframes pf-float { 0% { opacity: 0; transform: translateY(0) } 15% { opacity: 1 } 100% { opacity: 0; transform: translateY(-28px) } }
        @media (prefers-reduced-motion: reduce) { .pf-anim { animation: none !important } }
      `}</style>

      {/* chrome */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${t.line}` }}>
        <span className="text-[12px] uppercase tracking-[0.22em]" style={{ color: t.text }}>
          prompt <span style={{ color: t.accent }}>fighter</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: t.faint }}>
          seed {seed.toString(16).padStart(8, "0")}
        </span>
      </div>

      <div className="grid gap-3 p-3 sm:p-4">
        {/* health */}
        <div className="grid grid-cols-2 gap-3">
          {(["a", "b"] as const).map((side) => {
            const f = side === "a" ? a : b;
            return (
              <HealthBar
                key={side}
                side={side}
                name={f.name}
                hp={hp[side]}
                max={result.maxHp[side]}
                meter={meter[side]}
              />
            );
          })}
        </div>

        <PressureMeters a={current?.pressure.a ?? ZERO_METERS} b={current?.pressure.b ?? ZERO_METERS} />

        {/* battlefield */}
        <div
          className="relative h-[150px] overflow-hidden rounded-[3px] sm:h-[176px]"
          style={{ border: `1px solid ${t.line}`, background: `linear-gradient(180deg, #0e0e11 0%, ${t.panel} 100%)` }}
        >
          <div className="absolute inset-x-0 bottom-0 h-6" style={{ background: t.panelHi, borderTop: `1px solid ${t.line}` }} />
          <div className="absolute inset-x-0 bottom-4 flex items-end justify-between px-4 sm:px-8">
            {(["a", "b"] as const).map((side) => {
              const f = side === "a" ? a : b;
              const acting = current?.actor === side && !current.missed && current.move !== "—";
              return (
                <div key={side} className="relative">
                  {current && hitSide === side && (
                    <span
                      key={`dmg-${step}`}
                      className="pf-anim absolute -top-2 left-1/2 -translate-x-1/2 text-[13px] font-bold"
                      style={{ color: t.accent, animation: "pf-float 700ms ease-out forwards" }}
                    >
                      −{current.damage}
                    </span>
                  )}
                  {current && current.actor === side && current.heal > 0 && (
                    <span
                      key={`heal-${step}`}
                      className="pf-anim absolute -top-2 left-1/2 -translate-x-1/2 text-[13px] font-bold"
                      style={{ color: t.good, animation: "pf-float 700ms ease-out forwards" }}
                    >
                      +{current.heal}
                    </span>
                  )}
                  <div
                    key={acting ? `lunge-${step}` : "still"}
                    className="pf-anim"
                    style={{ animation: acting ? `${side === "a" ? "pf-lunge-r" : "pf-lunge-l"} 320ms ease-out` : undefined }}
                  >
                    <div
                      key={hitSide === side ? `hit-${step}` : "ok"}
                      className="pf-anim"
                      style={{ animation: hitSide === side ? "pf-hit 320ms ease-out" : undefined }}
                    >
                      <div
                        className="pf-anim"
                        style={{
                          animation: !finished ? "pf-bob 1.6s ease-in-out infinite" : undefined,
                          opacity: finished && result.winner !== side ? 0.35 : 1,
                          transition: "opacity 400ms ease",
                        }}
                      >
                        <PixelSprite sprite={f.sprite} flip={side === "b"} className="h-[96px] w-[96px] sm:h-[112px] sm:w-[112px]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {finished && winner && (
            <div
              className="pf-anim absolute inset-x-0 top-3 flex justify-center"
              style={{ animation: "pf-pop 260ms ease-out" }}
            >
              <span
                className="rounded-[3px] px-2.5 py-1 text-[11px] uppercase tracking-[0.18em]"
                style={{ background: result.pressure ? t.warn : t.accent, color: "#fff" }}
              >
                {VICTORY_LABELS[result.victory]}
              </span>
            </div>
          )}
        </div>

        {/* fighter pickers */}
        <div className="grid grid-cols-2 gap-3">
          {(["a", "b"] as const).map((side) => {
            const f = side === "a" ? a : b;
            return (
              <div key={side} className="rounded-[4px] p-2.5" style={{ background: t.panel, border: `1px solid ${t.line}` }}>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => cycle(side, -1)}
                    aria-label={`Previous fighter for side ${side.toUpperCase()}`}
                    className="grid h-8 w-6 shrink-0 place-items-center rounded-[3px] transition-colors hover:bg-white/5 sm:w-7"
                    style={{ color: t.dim }}
                  >
                    ‹
                  </button>
                  <div className="min-w-0 flex-1 text-center">
                    <p className="line-clamp-2 text-[11px] leading-tight sm:text-[13px]">{f.name}</p>
                    <p className="mt-0.5 hidden truncate text-[11px] sm:block" style={{ color: t.dim }}>
                      {f.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => cycle(side, 1)}
                    aria-label={`Next fighter for side ${side.toUpperCase()}`}
                    className="grid h-8 w-6 shrink-0 place-items-center rounded-[3px] transition-colors hover:bg-white/5 sm:w-7"
                    style={{ color: t.dim }}
                  >
                    ›
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.14em]" style={{ color: t.faint }}>
                  <span>
                    {f.wins}–{f.losses}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStatsOpen((s) => (s === side ? null : side))}
                    aria-expanded={statsOpen === side}
                    className="uppercase tracking-[0.14em] underline-offset-2 hover:underline"
                    style={{ color: statsOpen === side ? t.text : t.dim }}
                  >
                    {statsOpen === side ? "Hide stats" : "Stats"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {statsOpen && <StatBudget stats={(statsOpen === "a" ? a : b).stats} name={(statsOpen === "a" ? a : b).name} flaw={(statsOpen === "a" ? a : b).flaw.name} moves={(statsOpen === "a" ? a : b).moves.map((m) => m.name)} />}

        {/* log */}
        <div className="rounded-[4px] p-3" style={{ background: t.panel, border: `1px solid ${t.line}` }}>
          <p className="mb-2 text-[10px] uppercase tracking-[0.14em]" style={{ color: t.dim }}>
            Battle log
          </p>
          <div ref={logRef} className="grid h-[92px] content-start gap-1.5 overflow-y-auto pr-1 [scrollbar-color:#2a2a31_transparent] [scrollbar-width:thin]">
            {step === 0 ? (
              <p style={{ color: t.faint }}>Waiting for the bell.</p>
            ) : (
              log.slice(0, step).map((e, i) => {
                const last = i === step - 1 && !finished;
                return (
                  <p
                    key={`${seed}-${i}`}
                    className="pf-anim leading-snug"
                    style={{ color: last ? t.text : t.faint, animation: last ? "pf-pop 200ms ease-out" : undefined }}
                  >
                    {e.text}
                  </p>
                );
              })
            )}
            {finished && winner && loser && (
              <p className="pf-anim mt-1 border-t pt-2 leading-snug" style={{ borderColor: t.line, color: t.text, animation: "pf-pop 260ms ease-out" }}>
                {victoryText(result.victory, winner.name, loser.name)}
              </p>
            )}
          </div>
        </div>

        {/* controls */}
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={() => fight(finished ? newSeed() : seed)}
            disabled={running}
            className="rounded-[3px] px-4 py-3 text-[12px] uppercase tracking-[0.12em] transition-opacity disabled:opacity-40"
            style={{ background: t.accent, color: "#fff", border: `1px solid ${t.accent}` }}
          >
            {running ? "Fighting…" : finished ? "Rematch · new seed" : "Fight"}
          </button>
          <button
            type="button"
            onClick={() => fight(seed)}
            disabled={running || !finished}
            title="Same fighters, same seed — the sim is deterministic, so this replays the identical fight."
            className="rounded-[3px] px-3 py-3 text-[12px] uppercase tracking-[0.12em] transition-opacity disabled:opacity-40"
            style={{ background: "transparent", color: t.dim, border: `1px solid ${t.line}` }}
          >
            Replay seed
          </button>
        </div>
      </div>
    </div>
  );
}

function HealthBar({ side, name, hp, max, meter }: { side: Side; name: string; hp: number; max: number; meter: number }) {
  const pct = Math.max(0, Math.min(100, (hp / max) * 100));
  const right = side === "b";
  return (
    <div className="grid min-w-0 gap-1.5">
      <div className={`flex items-baseline justify-between gap-2 ${right ? "flex-row-reverse" : ""}`}>
        <span className="truncate text-[11px] sm:text-[12px]">{name}</span>
        <span className="shrink-0 text-[10px] tabular-nums" style={{ color: t.dim }}>
          {hp}/{max}
        </span>
      </div>
      <div className={`flex h-2.5 ${right ? "justify-end" : ""}`} style={{ background: t.panelHi, border: `1px solid ${t.line}` }}>
        <div
          style={{
            width: `${pct}%`,
            background: pct > 50 ? t.good : pct > 25 ? t.warn : t.accent,
            transition: "width 420ms cubic-bezier(0.2, 0.8, 0.3, 1), background 220ms ease",
          }}
        />
      </div>
      <div className={`flex gap-1 ${right ? "justify-end" : ""}`} aria-label={`Signature meter ${meter} of ${METER_TO_SPECIAL}`}>
        {Array.from({ length: METER_TO_SPECIAL }, (_, i) => (
          <span key={i} className="h-1 w-4" style={{ background: i < meter ? t.warn : t.panelHi, border: `1px solid ${t.line}` }} />
        ))}
      </div>
    </div>
  );
}

const TRACK_LABELS = { crowd: "Crowd", hex: "Hex", fate: "Fate" } as const;

const ZERO_METERS: TurnEvent["pressure"]["a"] = { crowd: 0, hex: 0, fate: 0 };

/**
 * All three tracks, always — the app hides dead tracks, but here that made the
 * card grow mid-fight. A track nobody has pushed yet just sits dimmed.
 */
function PressureMeters({ a, b }: { a: TurnEvent["pressure"]["a"]; b: TurnEvent["pressure"]["b"] }) {
  return (
    <div className="grid gap-1">
      {PRESSURE_TRACKS.map((tr) => (
        <div key={tr} className="flex items-center gap-2" style={{ opacity: a[tr] > 0 || b[tr] > 0 ? 1 : 0.45, transition: "opacity 220ms ease" }}>
          <MeterBar value={a[tr]} align="right" />
          <span className="w-12 shrink-0 text-center text-[9px] uppercase tracking-[0.14em]" style={{ color: t.faint }}>
            {TRACK_LABELS[tr]}
          </span>
          <MeterBar value={b[tr]} align="left" />
        </div>
      ))}
    </div>
  );
}

function MeterBar({ value, align }: { value: number; align: "left" | "right" }) {
  const pct = Math.max(0, Math.min(100, (value / PRESSURE_THRESHOLD) * 100));
  return (
    <div className={`flex h-1 flex-1 ${align === "right" ? "justify-end" : ""}`} style={{ background: t.panelHi }}>
      <div style={{ width: `${pct}%`, background: pct >= 100 ? t.warn : t.accent, transition: "width 380ms cubic-bezier(0.2, 0.8, 0.3, 1)" }} />
    </div>
  );
}

/**
 * The anti-cheat, drawn: every point the model handed out, laid end to end
 * against the fixed budget. A fighter described as invincible still fills
 * exactly 30 cells — it just fills them lopsidedly.
 */
function StatBudget({ stats, name, flaw, moves }: { stats: Stats; name: string; flaw: string; moves: string[] }) {
  const rows: { label: string; keys: readonly (keyof Stats)[]; total: number; colors: string[] }[] = [
    { label: "Body", keys: BODY_KEYS, total: STAT_TOTAL, colors: BODY_COLORS },
    { label: "Spirit", keys: SPIRIT_KEYS, total: SPIRIT_TOTAL, colors: SPIRIT_COLORS },
  ];
  return (
    <div className="pf-anim grid gap-3 rounded-[4px] p-3" style={{ background: t.panel, border: `1px solid ${t.line}`, animation: "pf-pop 200ms ease-out" }}>
      <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: t.dim }}>
        {name} · stat budget
      </p>
      {rows.map((r) => {
        const spent = r.keys.reduce((s, k) => s + (stats[k] ?? 0), 0);
        return (
          <div key={r.label} className="grid gap-1.5">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.14em]" style={{ color: t.faint }}>
              <span>{r.label}</span>
              <span className="tabular-nums" style={{ color: spent === r.total ? t.good : t.warn }}>
                {spent}/{r.total}
              </span>
            </div>
            <div className="flex gap-[2px]">
              {r.keys.flatMap((k, ki) =>
                Array.from({ length: stats[k] ?? 0 }, (_, i) => (
                  <span key={`${k}-${i}`} className="h-2.5 flex-1" style={{ background: r.colors[ki] }} />
                )),
              )}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px]" style={{ color: t.dim }}>
              {r.keys.map((k, ki) => (
                <span key={k} className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5" style={{ background: r.colors[ki] }} />
                  {STAT_LABEL[k]} {stats[k]}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      <p className="text-[11px] leading-snug" style={{ color: t.dim }}>
        Moves: <span style={{ color: t.text }}>{moves.join(" / ")}</span> · Flaw: <span style={{ color: t.text }}>{flaw}</span>
      </p>
    </div>
  );
}
