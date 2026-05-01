"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: string;
  duration?: number;
  className?: string;
};

export function CountUp({ to, duration = 1500, className }: Props) {
  const match = to.match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[2] : "";
  const hasCommas = !!match && match[1].includes(",");

  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = to.match(/^([\d,]+)(.*)$/);
    if (!m) return;
    const tgt = parseInt(m[1].replace(/,/g, ""), 10);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(tgt);
      return;
    }

    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry], o) => {
        if (!entry.isIntersecting) return;
        o.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(tgt * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const display = hasCommas ? value.toLocaleString() : String(value);

  return (
    <span ref={ref} className={className}>
      {match ? `${display}${suffix}` : to}
    </span>
  );
}
