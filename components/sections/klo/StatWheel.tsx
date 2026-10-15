"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { klo } from "@/content/klo";
import s from "./wheel.module.css";

// The figures (the problems), then the solutions: one list, in Forest green from the first solution on
type Item = { big: string; statement: string; pill: string; label: string; icon: IconName; solved: boolean };
const ITEMS: Item[] = [
  ...klo.stats.map((st) => ({ big: st.value, statement: st.statement, pill: st.source, label: st.label, icon: st.icon, solved: false })),
  ...klo.solutions.map((so) => ({ big: so.line, statement: so.statement, pill: so.pill, label: so.pill, icon: so.icon, solved: true })),
];
const PROBLEMS = klo.stats.length;
const ROWS = 3; // shown at a time
const STEPS = ITEMS.length - ROWS + 1; // 1–3, 2–4, … 6–8
const MOVE_COUNT = STEPS - 1;

// Where the scroll holds still (each step) and where the list moves on, as shares of the pinned stretch:
// equal holds at both ends and between moves, each move 8/3 as long as a hold
const UNIT = 1 / (11 * MOVE_COUNT + 3);
const MOVES: [number, number][] = Array.from({ length: MOVE_COUNT }, (_, k) => {
  const a = UNIT * (3 + 11 * k);
  return [a, a + UNIT * 8];
});
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
// Scroll (0–1) → how far the list has moved, in steps (0 … MOVE_COUNT)
const shiftAt = (p: number) => MOVES.reduce((n, [a, b]) => n + ease(clamp((p - a) / (b - a))), 0);
// How far the solutions' colour has filled the wheel (0–1): the share of the three places holding a solution
const solvedAt = (shift: number) => clamp((shift + ROWS - PROBLEMS) / ROWS);
// The heading turns once most of the places hold a solution (client 2026-10-15)
const turnedAt = (step: number) => step + ROWS - PROBLEMS >= 2;

// Stripes run from one colour at the top of the wheel to another at the bottom (by angle), so the
// turning shows: amber → coral for the problems, Forest green for the solutions (client 2026-10-15: the
// client's Forest swatch, #228b22; the red blends straight into it, nothing in between)
const BARS = 150;
const TONES = {
  warm: { top: [245, 179, 31], bottom: [238, 99, 82], core: ["#f39479", "#f6ad95", "#f9c6b4"], base: "#fbd5c7" },
  bright: { top: [52, 160, 52], bottom: [34, 139, 34], core: ["#228b22", "#4fa84f", "#9fd09f"], base: "#d6ebd6" },
};
type Tone = keyof typeof TONES;
const barColors = (tone: Tone) =>
  Array.from({ length: BARS }, (_, i) => {
    const t = Math.sqrt((1 - Math.cos((2 * Math.PI * i) / BARS)) / 2);
    const { top, bottom } = TONES[tone];
    const [r, g, b] = top.map((a, k) => Math.round(a + (bottom[k] - a) * t));
    return `rgb(${r} ${g} ${b})`;
  });
const BAR_COLOR: Record<Tone, string[]> = { warm: barColors("warm"), bright: barColors("bright") };

// The wheel: a pale ring of fine stripes round a soft core
function Disc({ id, tone = "warm" }: { id: string; tone?: Tone }) {
  const { core, base } = TONES[tone];
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={core[0]} />
          <stop offset="0.65" stopColor={core[1]} />
          <stop offset="1" stopColor={core[2]} />
        </radialGradient>
      </defs>
      <circle r="100" fill={base} />
      <g strokeLinecap="butt">
        {BAR_COLOR[tone].map((color, i) => (
          <line
            key={i}
            x1="0"
            y1={-63}
            x2="0"
            y2={-97}
            stroke={color}
            strokeWidth={1.7}
            transform={`rotate(${(360 / BARS) * i})`}
          />
        ))}
      </g>
      <circle r="58" fill={`url(#${id})`} />
    </svg>
  );
}

export default function StatWheel() {
  const root = useRef<HTMLDivElement>(null);
  const pinned = useMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
  const [step, setStep] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  // Pinned: the scroll moves the list on and turns the wheel (--s, 0 … MOVE_COUNT), lets the lines
  // reach out only near a resting place (--k, 0–1), fills the ring (--p, 0–1) and turns the wheel
  // fill with the solutions' colour as they come in (--g, 0–1)
  useEffect(() => {
    const el = root.current;
    if (!el || !pinned) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const p = run > 0 ? clamp(-r.top / run) : 0;
      const shift = shiftAt(p);
      el.style.setProperty("--s", shift.toFixed(4));
      el.style.setProperty("--k", Math.max(0, 1 - Math.abs(shift - Math.round(shift)) * 5).toFixed(3));
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--g", solvedAt(shift).toFixed(4));
      setStep(Math.round(shift));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned]);

  // Not pinned (reduced motion on wide screens): the dots move the list a step at a time
  useEffect(() => {
    const el = root.current;
    if (!el || pinned) return;
    el.style.setProperty("--s", String(step));
    el.style.setProperty("--k", "1");
    el.style.setProperty("--p", ((step + 1) / STEPS).toFixed(3));
    el.style.setProperty("--g", solvedAt(step).toFixed(3));
  }, [pinned, step]);

  // Off-screen: the glow's breathing pauses
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={root}
      className={s.wheel}
      data-paused={!onScreen || undefined}
      style={{ "--moves": MOVE_COUNT } as CSSProperties}
    >
      <div className={s.sticky}>
        <div className={s.frame}>
          <div className={s.head}>
            {/* "Life is just scattered." in red while the figures show; once the solutions take over,
                it turns to "No more searching. Everything is in one place.", the second line in green */}
            <h2 id="klone-h" className={s.h2} data-turned={turnedAt(step) || undefined}>
              <span className={s.hProblem} aria-hidden={turnedAt(step) || undefined}>
                <span>{klo.headline.lead}</span> <span className={s.h2Accent}>{klo.headline.accent}</span>
              </span>
              <span className={s.hSolved} aria-hidden={!turnedAt(step) || undefined}>
                <span>{klo.headlineSolved.lead}</span> <span className={s.h2Solved}>{klo.headlineSolved.accent}</span>
              </span>
            </h2>
            <div className={s.progress}>
              {/* Reduced motion only: a dot per step to move the list by hand */}
              {!pinned && (
                <span className={s.steps}>
                  {Array.from({ length: STEPS }, (_, k) => (
                    <button
                      key={k}
                      type="button"
                      aria-label={`Points ${k + 1} to ${k + ROWS} of ${ITEMS.length}`}
                      aria-pressed={k === step}
                      data-on={k === step || undefined}
                      onClick={() => setStep(k)}
                    />
                  ))}
                </span>
              )}
              <svg className={s.ring} viewBox="0 0 44 44" aria-hidden="true">
                <circle cx="22" cy="22" r="17" />
                <circle cx="22" cy="22" r="17" pathLength={1} className={s.ringFill} />
              </svg>
            </div>
          </div>

          {/* Every point in order, for screen readers (the wheel shows three at a time) */}
          <ol className="sr-only" aria-label={klo.statsLabel}>
            {ITEMS.map((it) => (
              <li key={it.label}>
                {it.label}: {it.big} {it.statement}
                {!it.solved && ` (${it.pill})`}
              </li>
            ))}
          </ol>

          <div className={s.stage} aria-hidden="true">
            {/* Laid out in the reference's proportions, scaled to fit */}
            <div className={s.canvas}>
              {/* The wheel's right half, seen through frosted glass: a vivid blurred ring. Its bright
                  green twin rises over it from the bottom as the solutions come in (.fill), fading
                  softly into the red above */}
              <span className={s.blurHalf}>
                <Disc id="kw-core-blur" />
                <span className={s.fill}>
                  <span>
                    <Disc id="kw-core-blur-g" tone="bright" />
                  </span>
                </span>
              </span>
              <span className={s.veil} />
              {/* Its left half, sharp, turning as the list moves; the green rises in the same way */}
              <span className={s.disc}>
                <Disc id="kw-core" />
                <span className={s.fill}>
                  <span>
                    <Disc id="kw-core-g" tone="bright" />
                  </span>
                </span>
              </span>
              <span className={s.arc}>
                <i />
                <i data-solved="" />
              </span>

              {/* Lines from the three places to the arc: top, left-most point, bottom; green when the
                  point beside them is a solution */}
              {[0, 1, 2].map((r) => (
                <span key={r} className={s.line} data-slot={r} data-solved={ITEMS[step + r]?.solved || undefined} />
              ))}

              {/* The points: one list moving up through three places (the next comes in from below) */}
              {ITEMS.map((it, i) => (
                <div key={it.label} className={s.item} data-solved={it.solved || undefined} style={{ "--i": i } as CSSProperties}>
                  <span className={s.num}>{it.big}</span>
                  <span className={s.chip}>
                    <Icon name={it.icon} strokeWidth={2} />
                    {it.label}
                  </span>
                  <p className={s.statement}>{it.statement}</p>
                  <span className={s.source}>
                    {it.solved && <Icon name="check" strokeWidth={2.4} />}
                    {it.pill}
                  </span>
                </div>
              ))}

              {/* The problems, then the solutions, on glass cards over the blurred ring: four in view,
                  moving up with the list; the ones whose points are showing are lit */}
              <div className={s.cards} style={{ "--drift": (172 * (ITEMS.length - 4)) / (ITEMS.length - 3) } as CSSProperties}>
                {ITEMS.map((it, i) => (
                  <div key={it.label} className={s.card} data-solved={it.solved || undefined} style={{ "--i": i } as CSSProperties}>
                    <span className={s.badge}>
                      <Icon name={it.icon} strokeWidth={1.9} />
                    </span>
                    <span className={s.cardLabel}>{it.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
