"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ChevronDown, Layers, Library, MoreVertical, Play, Plus, Rss, Search, SlidersHorizontal, User, X } from "lucide-react";
import { CARDS, COMMANDER, DECK_NAME, scryfallImage, type DeckCard } from "@/lib/demos/rarebrew/deck";
import { PhoneFrame } from "./PhoneFrame";
import { dmSans, spaceGrotesk as grotesk } from "./fonts";


// rarebrew's tokens (app/globals.css, dark).
const C = {
  g100: "#f2f2f2",
  g300: "#bfbfbf",
  g400: "#a6a6a6",
  g500: "#737373",
  g700: "#333333",
  g800: "#1f1f1f",
  g900: "#121212",
  border: "rgba(255,255,255,.07)",
  brand: "#E0A83C",
  brandSurface: "rgba(224,168,60,.20)",
  brandText: "#1a1304",
  teal: "#14b8a6",
  warn: "#f97316",
};
const MONO = "ui-monospace, 'Cascadia Code', monospace";
const DECEL = "cubic-bezier(.32,.72,0,1)";
const STANDARD = "cubic-bezier(.4,0,.2,1)";
const MANA = { W: "#f8e7a1", U: "#6495ed", B: "#a798a1" } as const;

// Card strip geometry: rarebrew crops the full card image to its top 12% plus
// 9px, so the card's own name plate and mana cost carry the row.
const CARD_W = 214;
const CARD_RATIO = 680 / 488;
const cardH = (w: number) => Math.round(w * CARD_RATIO);
// Stacked-deck rows (rarebrew's `rowLayout=overlap`): each strip tucks under
// the one before it, so the collapsed height pays back that tuck to keep the
// whole name plate visible. Values from components/card/stackedStripStyle.ts.
const STACK_OVERLAP = 4;
const STACK_UP_SHADOW = "drop-shadow(0 -3px 6px rgba(0,0,0,0.7))";
const STRIP_DOWN_SHADOW = "0 1px 2px rgba(0,0,0,0.4)";
const ROW_GAP_AFTER_OPEN = 12;
const DEAL_STEP = 55; // ms between cards dealing in
const DEAL_MAX = 14; // rows past this land together (they're off-screen anyway)
// Row grid is minmax(26px,1fr) | minmax(0,CARD_W) | minmax(46px,1fr) inside
// the list's 4px side padding, so the card column is whatever's left, capped.
const rowCardW = (listW: number) => (listW ? Math.max(0, Math.min(CARD_W, listW - 8 - 26 - 46)) : CARD_W);
const rowH = (w: number) => Math.round(cardH(w) * 0.12) + STACK_OVERLAP;
const HEADER_H = 96;

const GROUPS: { id: string; label: string; match: (c: DeckCard) => boolean }[] = [
  { id: "creatures", label: "Creatures", match: (c) => /Creature/.test(c.type.split("//")[0]) },
  { id: "instants", label: "Instants", match: (c) => /Instant/.test(c.type) },
  { id: "sorceries", label: "Sorceries", match: (c) => /Sorcery/.test(c.type) },
  { id: "artifacts", label: "Artifacts", match: (c) => /Artifact/.test(c.type) },
  { id: "enchantments", label: "Enchantments", match: (c) => /Enchantment/.test(c.type) },
  { id: "lands", label: "Lands", match: (c) => /Land/.test(c.type) },
];

type Section = { id: string; label: string; cards: DeckCard[] };

function buildSections(): Section[] {
  const remaining = [...CARDS];
  const sections: Section[] = [{ id: "commander", label: "Commander", cards: [COMMANDER] }];
  for (const g of GROUPS) {
    const cards = remaining.filter(g.match);
    for (const c of cards) remaining.splice(remaining.indexOf(c), 1);
    if (cards.length) sections.push({ id: g.id, label: g.label, cards });
  }
  return sections;
}

const count = (cards: DeckCard[]) => cards.reduce((n, c) => n + c.qty, 0);
const price = (cards: DeckCard[]) => cards.reduce((n, c) => n + (c.usd ?? 0) * c.qty, 0);
const money = (n: number) => `$${n.toFixed(n >= 100 ? 0 : 2)}`;

export function RarebrewDemo() {
  const sections = useMemo(buildSections, []);
  // Each section's first row index in the whole list, for the deal-in stagger.
  const offsets = useMemo(() => {
    let n = 0;
    return sections.map((s) => {
      const at = n;
      n += s.cards.length;
      return at;
    });
  }, [sections]);
  const all = useMemo(() => [COMMANDER, ...CARDS], []);
  const total = count(all);
  const [active, setActive] = useState("commander");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [insights, setInsights] = useState(false);
  // Entrance: the stack deals in when the phone scrolls into view, then the
  // commander peeks open and closed once, unless the visitor got there first.
  const [dealt, setDealt] = useState(false);
  // Reduced motion: the stack appears in place, no deal-in or peek.
  const [instant, setInstant] = useState(false);
  // Any visitor input — pointer, key, wheel, focus — cancels the autoplay.
  const touched = useRef(false);
  const touch = () => (touched.current = true);
  // Simulated taps for the autoplay tour: which row shows a ripple (and a
  // counter so a repeat tap restarts it), and which double-faced card to flip.
  const [tap, setTap] = useState<{ key: string; n: number } | null>(null);
  const [autoFlip, setAutoFlip] = useState<string | null>(null);
  // One width for every row: they all share the list's center column.
  const [listW, setListW] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const spyLock = useRef(false);
  const spyTarget = useRef(0);
  const spyTimer = useRef<number | undefined>(undefined);

  // Scroll-spy: the active tab is the last section whose top has passed the header.
  const updateActive = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    let current = sections[0].id;
    for (const s of sections) {
      const node = sectionRefs.current[s.id];
      if (node && node.offsetTop - el.scrollTop <= 80) current = s.id;
    }
    setActive(current);
  }, [sections]);

  // A tab jump locks the spy until the list actually arrives at the jump's
  // target, however long the smooth scroll takes (or however late it starts).
  // The fallback only fires if it never arrives — e.g. the visitor grabs the
  // list mid-scroll — and is re-armed by every scroll event. One shared
  // timer, so an earlier jump can't unlock a later one.
  const unlockSpy = useCallback(() => {
    window.clearTimeout(spyTimer.current);
    spyLock.current = false;
    updateActive();
  }, [updateActive]);

  const armSpyFallback = useCallback(() => {
    window.clearTimeout(spyTimer.current);
    spyTimer.current = window.setTimeout(unlockSpy, 1200);
  }, [unlockSpy]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrolled(el.scrollTop > 2);
    if (!spyLock.current) return updateActive();
    if (Math.abs(el.scrollTop - spyTarget.current) < 2) unlockSpy();
    else armSpyFallback();
  }, [armSpyFallback, unlockSpy, updateActive]);

  useEffect(() => () => window.clearTimeout(spyTimer.current), []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setListW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Keep the active tab in view inside the strip.
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!strip || !tab) return;
    const target = tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setInstant(true);
          setDealt(true);
          return;
        }
        setDealt(true);

        // The tour: tap a card (ripple), it expands, hold, tap the next. One
        // double-faced card gets flipped mid-hold. Every step checks `touched`
        // so the visitor can take over at any moment.
        const at = (ms: number, fn: () => void) =>
          timers.push(window.setTimeout(() => !touched.current && fn(), ms));
        const keyOf = (name: string) => {
          const sec = sections.find((x) => x.cards.some((c) => c.name.startsWith(name)));
          const card = sec?.cards.find((c) => c.name.startsWith(name));
          return sec && card ? `${sec.id}:${card.name}` : null;
        };
        const tapOpen = (key: string) => {
          setTap({ key, n: Date.now() });
          window.setTimeout(() => {
            if (touched.current) return;
            setExpanded(key);
            window.setTimeout(() => {
              const list = scrollRef.current;
              const row = list?.querySelector<HTMLElement>(`[data-row="${CSS.escape(key)}"]`);
              if (list && row) list.scrollTo({ top: Math.max(0, row.offsetTop - 8), behavior: "smooth" });
            }, 300);
          }, 320);
        };
        const tour = ["The Destined Warrior", "Archpriest of Iona", "Sygg", "Path to Exile"]
          .map(keyOf)
          .filter((k): k is string => !!k);
        let t = DEAL_MAX * DEAL_STEP + 700; // let the deal-in land first
        for (const key of tour) {
          at(t, () => tapOpen(key));
          if (key.includes("Sygg")) {
            at(t + 1500, () => setAutoFlip(key));
            t += 3200;
          } else {
            t += 2400;
          }
        }
        at(t, () => {
          setExpanded(null);
          window.setTimeout(() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 300);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [sections]);

  const jumpTo = (id: string) => {
    const el = scrollRef.current;
    const node = sectionRefs.current[id];
    if (!el || !node) return;
    const target = Math.max(0, Math.min(node.offsetTop - 4, el.scrollHeight - el.clientHeight));
    setActive(id);
    if (Math.abs(el.scrollTop - target) < 2) return; // already there
    spyLock.current = true;
    spyTarget.current = target;
    armSpyFallback();
    el.scrollTo({ top: target, behavior: "smooth" });
  };

  const toggleRow = (key: string, node: HTMLElement | null) => {
    setExpanded((cur) => (cur === key ? null : key));
    // Like the app: let the height transition land, then bring the card into view.
    window.setTimeout(() => {
      const el = scrollRef.current;
      if (!el || !node) return;
      const top = node.offsetTop - 8;
      const bottom = node.offsetTop + node.offsetHeight - el.clientHeight + 120;
      if (el.scrollTop > top) el.scrollTo({ top, behavior: "smooth" });
      else if (el.scrollTop < bottom) el.scrollTo({ top: Math.min(top, bottom), behavior: "smooth" });
    }, 300);
  };

  return (
    <PhoneFrame screen={C.g800} ink={C.g100} glow={C.brand}>
      <div
        ref={rootRef}
        onPointerDown={touch}
        onKeyDown={touch}
        onWheel={touch}
        onFocus={touch}
        className={`${dmSans.className} relative flex min-h-0 flex-1 flex-col`}
        style={{ background: C.g900, color: C.g100 }}
      >
        <style>{`@keyframes rb-tap { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.4) } 25% { opacity: 1 } 100% { opacity: 0; transform: translate(-50%,-50%) scale(1.8) } }`}</style>
        {/* sticky header */}
        <header className="relative z-20 shrink-0" style={{ background: C.g800, height: HEADER_H }}>
          <div className="flex h-14 items-center gap-1.5 pl-1.5 pr-1">
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full">
              <ArrowLeft size={22} strokeWidth={2} color={C.g100} />
            </span>
            <span
              className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-[10px] px-1.5"
              style={{ background: C.g900, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.09)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scryfallImage(COMMANDER.print, "art_crop")}
                alt=""
                className="h-[26px] w-[26px] shrink-0 object-cover"
                style={{ borderRadius: 7 }}
              />
              <span className="min-w-0 flex-1">
                <span className={`${grotesk.className} block truncate text-[14px] font-bold leading-tight`}>{DECK_NAME}</span>
                <span className="flex items-center gap-0.5 text-[11px] leading-tight" style={{ color: C.g400 }}>
                  Main <ChevronDown size={11} />
                </span>
              </span>
            </span>
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ color: C.g100 }}>
              <Play size={17} fill="currentColor" />
            </span>
            <span aria-hidden="true" className="grid h-9 w-7 shrink-0 place-items-center" style={{ color: C.g300 }}>
              <MoreVertical size={18} />
            </span>
          </div>

          {/* type tabs */}
          <div
            className="relative flex h-10 items-stretch"
            style={{
              borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
              boxShadow: scrolled ? "0 6px 16px rgba(0,0,0,.55)" : "none",
              transition: `box-shadow 200ms ${STANDARD}, border-color 200ms ${STANDARD}`,
            }}
          >
            <div
              ref={tabsRef}
              role="tablist"
              aria-label="Jump to card type"
              className="flex min-w-0 flex-1 items-stretch gap-4 overflow-x-auto pl-3 pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {sections.map((s) => {
                const on = s.id === active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    data-tab={s.id}
                    onClick={() => jumpTo(s.id)}
                    className="relative flex shrink-0 items-center gap-1.5 uppercase hover:brightness-150"
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: on ? C.brand : C.g400,
                      transition: `color 200ms ${STANDARD}`,
                    }}
                  >
                    {s.label}
                    <CountBadge n={count(s.cards)} on={on} />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[2px] rounded-full"
                      style={{ background: C.brand, transform: `scaleX(${on ? 1 : 0})`, transition: `transform 240ms ${DECEL}` }}
                    />
                  </button>
                );
              })}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-[76px] w-10"
              style={{ background: `linear-gradient(90deg, transparent, ${C.g800})` }}
            />
            <div aria-hidden="true" className="flex shrink-0 items-center" style={{ background: C.g800, color: C.g300 }}>
              <span className="grid h-10 w-[38px] place-items-center"><SlidersHorizontal size={17} /></span>
              <span className="grid h-10 w-[38px] place-items-center"><Search size={17} /></span>
            </div>
          </div>
        </header>

        {/* card list */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="relative min-h-0 flex-1 overflow-y-auto px-1 pb-48 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s, si) => {
            const isCollapsed = !!collapsed[s.id];
            return (
              <section
                key={s.id}
                ref={(n) => {
                  sectionRefs.current[s.id] = n;
                }}
                style={{ borderTop: si ? `1px solid ${C.border}` : undefined }}
              >
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => ({ ...c, [s.id]: !c[s.id] }))}
                  aria-expanded={!isCollapsed}
                  className="flex w-full items-center gap-2 rounded-md pb-2 pl-2 pr-2 pt-3.5 text-left transition-colors hover:bg-white/[0.05]"
                >
                  <ChevronDown
                    size={16}
                    color={C.g400}
                    style={{ transform: `rotate(${isCollapsed ? -90 : 0}deg)`, transition: `transform 160ms ${STANDARD}` }}
                  />
                  <span className={`${grotesk.className} text-[16px] font-bold uppercase`} style={{ letterSpacing: "0.06em" }}>
                    {s.label}
                  </span>
                  <CountBadge n={count(s.cards)} on={false} />
                  <span className="ml-auto text-[12px] tabular-nums" style={{ fontFamily: MONO, color: C.brand }}>
                    {money(price(s.cards))}
                  </span>
                </button>
                <div
                  className="grid"
                  style={{ gridTemplateRows: isCollapsed ? "0fr" : "1fr", transition: `grid-template-rows 240ms ${DECEL}` }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <ul className="flex flex-col pb-4 pt-1">
                      {s.cards.map((c, i) => {
                        const key = `${s.id}:${c.name}`;
                        const prevKey = i > 0 ? `${s.id}:${s.cards[i - 1].name}` : null;
                        return (
                          <CardRow
                            key={key}
                            card={c}
                            index={i}
                            open={expanded === key}
                            prevOpen={prevKey !== null && expanded === prevKey}
                            dealt={dealt}
                            dealDelay={instant ? null : Math.min(offsets[si] + i, DEAL_MAX) * DEAL_STEP}
                            cardW={rowCardW(listW)}
                            rowKey={key}
                            tapped={tap?.key === key ? tap.n : 0}
                            flipNow={autoFlip === key}
                            onToggle={(node) => toggleRow(key, node)}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* bottom edge: FAB, stats peek, tab bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-[70px] right-2.5 grid h-[54px] w-[54px] place-items-center rounded-full"
              style={{ background: C.brand, color: C.brandText, boxShadow: "0 8px 20px rgba(0,0,0,.5)" }}
            >
              <Plus size={26} strokeWidth={2.4} />
            </span>
            <button
              type="button"
              onClick={() => setInsights(true)}
              className="pointer-events-auto flex h-12 w-full items-center gap-3 px-3 text-left transition hover:brightness-125"
              style={{ background: C.g800, borderTop: `1px solid ${C.border}` }}
              aria-label="Open deck insights"
            >
              <DeckMeter total={total} />
              <ColorDonut cards={all} size={26} />
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                style={{ background: C.g700, color: C.g300, fontFamily: MONO }}
              >
                {CARDS.length + 1} unique
              </span>
              <span className="ml-auto text-[13px] tabular-nums" style={{ fontFamily: MONO, color: C.g300 }}>
                {money(price(all))}
              </span>
              <ChevronDown size={16} color={C.g400} style={{ transform: "rotate(180deg)" }} />
            </button>
            <nav
              aria-hidden="true"
              className="flex h-[66px] items-start justify-around pb-5 pt-1.5"
              style={{ background: C.g800, borderTop: `1px solid ${C.border}` }}
            >
              {[
                { label: "Decks", Icon: Layers, on: true },
                { label: "Collection", Icon: Library },
                { label: "Feed", Icon: Rss },
                { label: "Account", Icon: User },
              ].map(({ label, Icon, on }) => (
                <span key={label} className="flex flex-col items-center gap-0.5">
                  <span
                    className="grid h-7 w-[52px] place-items-center rounded-full"
                    style={{ background: on ? C.brandSurface : "transparent", color: on ? C.brand : C.g400 }}
                  >
                    <Icon size={19} />
                  </span>
                  <span className={`${grotesk.className} text-[10px]`} style={{ color: on ? C.g100 : C.g400 }}>
                    {label}
                  </span>
                </span>
              ))}
            </nav>
          </div>
        </div>

        <InsightsSheet open={insights} onClose={() => setInsights(false)} cards={all} total={total} />
      </div>
    </PhoneFrame>
  );
}

function CountBadge({ n, on }: { n: number; on: boolean }) {
  return (
    <span
      className="inline-grid h-[18px] min-w-[18px] place-items-center rounded-full px-1.5 text-[10px] font-bold tabular-nums"
      style={{
        fontFamily: MONO,
        background: on ? C.brandSurface : C.g700,
        color: on ? C.brand : C.g300,
        transition: `background 200ms ${STANDARD}, color 200ms ${STANDARD}`,
      }}
    >
      {n}
    </span>
  );
}

function CardRow({
  card,
  index,
  open,
  prevOpen,
  dealt,
  dealDelay,
  cardW: w,
  rowKey,
  tapped,
  flipNow,
  onToggle,
}: {
  card: DeckCard;
  index: number;
  open: boolean;
  prevOpen: boolean;
  dealt: boolean;
  /** null = no deal-in animation (reduced motion). */
  dealDelay: number | null;
  cardW: number;
  rowKey: string;
  /** Non-zero = show a tap ripple; a new value restarts it. */
  tapped: number;
  /** Autoplay asks this (double-faced) card to show its back. */
  flipNow: boolean;
  onToggle: (node: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [back, setBack] = useState(false);
  useEffect(() => {
    if (!open) setBack(false);
  }, [open]);
  useEffect(() => {
    if (flipNow && open && card.dfc) setBack(true);
  }, [flipNow, open, card.dfc]);

  return (
    <li
      ref={ref}
      data-row={rowKey}
      className="relative grid items-start"
      style={{
        gridTemplateColumns: `minmax(26px,1fr) minmax(0,${CARD_W}px) minmax(46px,1fr)`,
        // Tuck under the previous strip; an open card above gets breathing room instead.
        marginTop: index === 0 ? 0 : prevOpen || open ? ROW_GAP_AFTER_OPEN : -STACK_OVERLAP,
        // The covering card casts its shadow up onto the one behind it.
        filter: index > 0 && !open && !prevOpen ? STACK_UP_SHADOW : "none",
        // Dealt onto the stack from just above, one card after another.
        opacity: dealt ? 1 : 0,
        transform: dealt || dealDelay === null ? "none" : "translateY(-26px) rotate(-1.5deg)",
        transition:
          dealDelay === null
            ? "margin-top .2s ease, filter .2s ease"
            : `margin-top .2s ease, filter .2s ease, opacity .3s ease ${dealDelay}ms, transform .45s cubic-bezier(.2,.8,.3,1) ${dealDelay}ms`,
      }}
    >
      <span className="col-start-1 row-start-1 flex h-full justify-center pt-3">
        {card.qty > 1 && (
          <span className="text-[11px] font-bold tabular-nums" style={{ fontFamily: MONO, color: C.g300 }}>
            {card.qty}×
          </span>
        )}
      </span>
      <button
        type="button"
        onClick={() => onToggle(ref.current)}
        aria-expanded={open}
        aria-label={`${card.name}${open ? ", collapse" : ", expand"}`}
        className="relative col-start-2 row-start-1 w-full overflow-hidden text-left outline outline-2 -outline-offset-1 outline-transparent hover:brightness-110 hover:outline-[#E0A83C] focus-visible:outline-[#E0A83C]"
        style={{
          height: open ? cardH(w) : rowH(w),
          // Collapsed strips are top-rounded with no bottom edge, so the seams
          // between stacked cards read as one deck rather than a list of chips.
          borderRadius: open ? 12 : "10px 10px 0 0",
          border: `1px solid ${C.g500}`,
          borderBottomColor: open ? C.g500 : "transparent",
          boxShadow: STRIP_DOWN_SHADOW,
          background: C.g800,
          transition: `height .28s ${STANDARD}, border-radius .28s ${STANDARD}, filter .15s ease, outline-color .15s ease`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={scryfallImage(card.print, "normal", "front")}
          alt=""
          loading="lazy"
          className="absolute inset-x-0 top-0 h-auto w-full"
          style={{ opacity: back ? 0 : 1, transition: "opacity 200ms ease" }}
        />
        {card.dfc && open && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={scryfallImage(card.print, "normal", "back")}
            alt=""
            // Only rendered once the card is open, so fetch it right away —
            // lazy here left the autoplay flip showing a blank face.
            loading="eager"
            className="absolute inset-x-0 top-0 h-auto w-full"
            style={{ opacity: back ? 1 : 0, transition: "opacity 200ms ease" }}
          />
        )}
        {tapped > 0 && (
          <span
            key={tapped}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[22px] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "rgba(224,168,60,.35)", boxShadow: `0 0 0 2px ${C.brand}`, animation: "rb-tap 560ms ease-out forwards" }}
          />
        )}
      </button>
      <span className="col-start-3 row-start-1 flex h-full flex-col items-end justify-start gap-2 pr-1.5 pt-3">
        <span className="text-[10px] tabular-nums" style={{ fontFamily: MONO, color: C.g400 }}>
          {card.usd == null ? "—" : money(card.usd)}
        </span>
        {open && card.dfc && (
          <button
            type="button"
            onClick={() => setBack((b) => !b)}
            className="mt-16 rounded-full px-2 py-1 text-[10px] font-bold uppercase transition hover:brightness-110 hover:scale-105"
            style={{ background: C.brand, color: C.brandText, fontFamily: MONO }}
            aria-label={`Flip ${card.name}`}
          >
            Flip
          </button>
        )}
      </span>
    </li>
  );
}

function DeckMeter({ total }: { total: number }) {
  const color = total === 100 ? C.teal : total > 100 ? C.warn : C.brand;
  return (
    <span className="flex flex-col gap-1">
      <span className="text-[12px] font-bold leading-none tabular-nums" style={{ fontFamily: MONO, color }}>
        {total}
        <span style={{ color: C.g500 }}>/100</span>
      </span>
      <span className="h-1 w-[52px] overflow-hidden rounded-full" style={{ background: C.g700 }}>
        <span className="block h-full rounded-full" style={{ width: `${Math.min(100, total)}%`, background: color }} />
      </span>
    </span>
  );
}

function pipCounts(cards: DeckCard[]) {
  const out = { W: 0, U: 0, B: 0 };
  for (const c of cards) {
    for (const m of c.cost.split("//")[0].matchAll(/\{([WUB])\}/g)) out[m[1] as keyof typeof out] += c.qty;
  }
  return out;
}

function ColorDonut({ cards, size }: { cards: DeckCard[]; size: number }) {
  const pips = pipCounts(cards);
  const totalPips = pips.W + pips.U + pips.B || 1;
  const r = size / 2 - 3;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ transform: "rotate(-90deg)" }}>
      {(Object.keys(pips) as (keyof typeof pips)[]).map((k) => {
        const len = (pips[k] / totalPips) * circ;
        const seg = (
          <circle
            key={k}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={MANA[k]}
            strokeWidth={size > 40 ? 14 : 5}
            strokeDasharray={`${Math.max(0, len - 1)} ${circ}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return seg;
      })}
    </svg>
  );
}

function InsightsSheet({ open, onClose, cards, total }: { open: boolean; onClose: () => void; cards: DeckCard[]; total: number }) {
  const [drag, setDrag] = useState(0);
  const start = useRef<{ y: number; t: number } | null>(null);

  const stats = useMemo(() => {
    const spells = cards.filter((c) => !/Land/.test(c.type.split("//")[0]));
    const curve = Array.from({ length: 8 }, () => 0);
    for (const c of spells) curve[Math.min(7, Math.floor(c.cmc))] += c.qty;
    const avg = spells.reduce((s, c) => s + c.cmc * c.qty, 0) / count(spells);
    const tagCounts = new Map<string, number>();
    for (const c of cards) for (const tg of c.tags) tagCounts.set(tg, (tagCounts.get(tg) ?? 0) + 1);
    const tags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const lands = count(cards) - count(spells);
    return { curve, avg, tags, lands, spells: count(spells), pips: pipCounts(cards) };
  }, [cards]);

  const onDown = (e: ReactPointerEvent) => {
    start.current = { y: e.clientY, t: performance.now() };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent) => {
    if (start.current) setDrag(Math.max(0, e.clientY - start.current.y));
  };
  const onUp = (e: ReactPointerEvent) => {
    if (!start.current) return;
    const dy = e.clientY - start.current.y;
    const v = dy / Math.max(1, performance.now() - start.current.t);
    start.current = null;
    setDrag(0);
    if (dy > 120 || v > 0.5) onClose();
  };

  const maxCurve = Math.max(...stats.curve, 1);
  const maxTag = Math.max(...stats.tags.map((t) => t[1]), 1);
  const sheetStyle: CSSProperties = {
    background: C.g900,
    transform: open ? `translateY(${drag}px)` : "translateY(100%)",
    transition: start.current ? "none" : open ? `transform 320ms ${DECEL}` : `transform 280ms ${STANDARD}`,
  };

  return (
    <div className="absolute inset-0 z-40" style={{ pointerEvents: open ? "auto" : "none" }} aria-hidden={!open}>
      <div
        className="absolute inset-0"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,.5)", opacity: open ? 1 : 0, transition: `opacity 280ms ${STANDARD}` }}
      />
      <div className="absolute inset-x-0 bottom-0 top-2 flex flex-col overflow-hidden rounded-t-[20px]" style={sheetStyle}>
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="shrink-0 cursor-grab touch-none select-none px-4 pb-2 pt-2.5 active:cursor-grabbing"
        >
          <span className="mx-auto block h-1 w-9 rounded-full" style={{ background: C.g500 }} />
          <div className="mt-2 flex items-center justify-between">
            <span className={`${grotesk.className} text-[18px] font-bold`}>Insights</span>
            <button
              type="button"
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Close insights"
              className="grid h-9 w-9 place-items-center rounded-full"
              style={{ background: C.g800, color: C.g300 }}
              tabIndex={open ? 0 : -1}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 pb-10 [scrollbar-width:none]">
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "Cards", v: String(total), tone: total > 100 ? C.warn : C.g100 },
              { k: "Lands", v: String(stats.lands), tone: C.g100 },
              { k: "Avg MV", v: stats.avg.toFixed(2), tone: C.brand },
            ].map((s) => (
              <div key={s.k} className="rounded-[10px] p-2.5" style={{ background: C.g800 }}>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: C.g400, fontFamily: MONO }}>{s.k}</p>
                <p className={`${grotesk.className} text-[20px] font-bold tabular-nums`} style={{ color: s.tone }}>{s.v}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[14px] p-3" style={{ background: C.g800 }}>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: C.g300 }}>Mana curve</p>
            <div className="flex h-28 items-end gap-1.5">
              {stats.curve.map((n, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] tabular-nums" style={{ fontFamily: MONO, color: C.g400 }}>{n || ""}</span>
                  <div
                    className="w-full rounded-t-[4px]"
                    style={{
                      height: open ? `${(n / maxCurve) * 80}px` : 0,
                      background: C.brand,
                      transition: `height 500ms ${DECEL} ${120 + i * 40}ms`,
                    }}
                  />
                  <span className="text-[10px]" style={{ fontFamily: MONO, color: C.g500 }}>{i === 7 ? "7+" : i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-[14px] p-3" style={{ background: C.g800 }}>
            <ColorDonut cards={cards} size={88} />
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: C.g300 }}>Colored pips</p>
              {(Object.keys(stats.pips) as (keyof typeof stats.pips)[]).map((k) => (
                <div key={k} className="flex items-center gap-2 text-[12px]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: MANA[k] }} />
                  <span style={{ color: C.g300 }}>{{ W: "White", U: "Blue", B: "Black" }[k]}</span>
                  <span className="ml-auto tabular-nums" style={{ fontFamily: MONO, color: C.g400 }}>{stats.pips[k]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[14px] p-3" style={{ background: C.g800 }}>
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: C.g300 }}>Top tags</p>
            <div className="flex flex-col gap-2">
              {stats.tags.map(([tag, n], i) => (
                <div key={tag} className="grid grid-cols-[84px_1fr_24px] items-center gap-2 text-[12px]">
                  <span className="truncate" style={{ color: C.g300 }}>{tag}</span>
                  <span className="h-2 overflow-hidden rounded-full" style={{ background: C.g700 }}>
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: open ? `${(n / maxTag) * 100}%` : 0,
                        background: C.teal,
                        transition: `width 500ms ${DECEL} ${200 + i * 50}ms`,
                      }}
                    />
                  </span>
                  <span className="text-right tabular-nums" style={{ fontFamily: MONO, color: C.g400 }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
