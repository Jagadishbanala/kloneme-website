"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { people } from "@/content/features";
import type { StreamPage } from "@/content/streamPages";
import type { CanProp } from "@/content/travel";
import s from "./can.module.css";

// Travel page, section 3: "What you can do in Travel." (client's pick: A "Ink Arc" + B "Flight Route").
// A sky-blue panel (client 2026-10-15: a travel colour theme) pins while you scroll through v11's four
// features. The arc of a huge dotted circle crosses the middle like a horizon, and each feature is a
// Klonie standing on it, upright to the curve, each with its own expression (client 2026-10-15: KME's
// avatar in place of the dots of the Blink reference). The Klonie at the top centre is the focus
// (client 2026-10-15): it grows, and a few things about its feature pop out around it (a dream-trip
// photo, a passport, a journal photo, the family...); its description sits below the arc (the pills
// name the features, so there is no title above). Scrolling brings the next Klonie in from the right
// to the top centre (the previous one moves on to the left) while its description rises a short way
// from just below; the old one drifts up and fades. Pills at the bottom jump to each feature.

const HOLD = 0.45; // share of each step that holds still (the rest is the move)
const HORIZON = 0.57; // where the top of the arc sits, as a share of the panel's height (room for the heading above)
const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Where the scroll is, as a stop position: -1 (first stop waiting on the right) → N - 1 (last at the top)
function stopAt(x: number, N: number) {
  const k = Math.min(Math.floor(x), N - 1);
  return k - 1 + ease(clamp((x - k) / (1 - HOLD)));
}

// The passport's emblem: a small globe
const Globe = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="16" cy="16" r="12" />
    <ellipse cx="16" cy="16" rx="5" ry="12" />
    <path d="M4 16h24M6 10h20M6 22h20" />
  </svg>
);

// One thing about a feature, placed around the Klonie at the top; it floats gently while shown
function Prop({ p, k }: { p: CanProp; k: number }) {
  let body;
  switch (p.kind) {
    case "photo":
      body = (
        <span className={s.polaroid}>
          <Image
            src={p.photo.startsWith("/") ? p.photo : `/travel/places/${p.photo}.jpg`}
            alt=""
            width={184}
            height={184}
            sizes="96px"
          />
          <small>{p.caption}</small>
        </span>
      );
      break;
    case "chip":
      body = (
        <span className={s.chip}>
          <i>
            <Icon name={p.icon} strokeWidth={2} />
          </i>
          <span>
            <b>{p.label}</b>
            {p.sub && <small>{p.sub}</small>}
            {p.bar != null && (
              <em className={s.mini}>
                <i style={{ width: `${p.bar}%` }} />
              </em>
            )}
          </span>
        </span>
      );
      break;
    case "stars":
      body = <span className={s.starChip}>{"★".repeat(p.n)}</span>;
      break;
    case "card":
      body = (
        <span className={s.memberCard}>
          <b>{p.title}</b>
          <small>{p.line}</small>
          <i aria-hidden="true" />
          <em>{p.code}</em>
        </span>
      );
      break;
    case "passport":
      body = (
        <span className={s.passport}>
          <Globe />
          <b>Passport</b>
        </span>
      );
      break;
    case "family":
      body = (
        <span className={s.chip}>
          <span className={s.avs}>
            {p.who.map((w) => (
              <span key={w} className={s.av} style={{ "--ac": people[w].color } as CSSProperties}>
                {people[w].name[0]}
              </span>
            ))}
          </span>
          <b>{p.label}</b>
        </span>
      );
      break;
    case "bubbles":
      body = (
        <span className={s.bubbles}>
          <i />
          <i />
          <i />
        </span>
      );
      break;
  }
  return (
    <span
      className={s.prop}
      style={{ "--x": p.x, "--y": p.y, "--tilt": `${p.tilt ?? 0}deg`, "--k": k } as CSSProperties}
    >
      <span className={s.float}>{body}</span>
    </span>
  );
}

export default function Can({ page }: { page: StreamPage }) {
  const C = page.can;
  const N = C.feats.length;
  const sec = useRef<HTMLElement>(null);
  const arc = useRef<HTMLDivElement>(null);
  const stops = useRef<(HTMLSpanElement | null)[]>([]);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const [cur, setCur] = useState(0);
  // The Klonie nearest the top centre (-1 before the first one arrives)
  const [top, setTop] = useState(-1);

  useEffect(() => {
    const el = sec.current;
    const box = arc.current;
    if (!el || !box || still) return;
    let raf = 0;
    let R = 0;
    let step = 0;
    let cx = 0;
    let y0 = 0;

    // The circle: big enough that only a gentle arc shows; Klonies a third of the width apart.
    // --u scales the things around the top Klonie down on small screens.
    const measure = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      R = Math.max(w * 0.95, 700);
      cx = w / 2;
      y0 = h * HORIZON;
      step = Math.asin(Math.min(0.9, Math.min(w * 0.3, 420) / R));
      box.style.setProperty("--R", `${R}px`);
      box.style.setProperty("--cx", `${cx}px`);
      box.parentElement?.style.setProperty("--y0", `${y0}px`); // the description below the arc uses it too
      box.style.setProperty("--step", String(step));
      box.style.setProperty("--u", Math.max(0.55, Math.min(1, w / 1200, h / 860)).toFixed(3));
    };

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = Math.max(1, el.offsetHeight - window.innerHeight);
      const a = stopAt(clamp(-r.top / run) * N, N);
      box.style.setProperty("--a", a.toFixed(4));
      stops.current.forEach((st, i) => {
        if (!st) return;
        const th = (i - a) * step;
        const d = Math.abs(i - a);
        st.style.translate = `${(cx + R * Math.sin(th)).toFixed(1)}px ${(y0 + R * (1 - Math.cos(th))).toFixed(1)}px`;
        st.style.rotate = `${th.toFixed(4)}rad`; // upright to the curve
        st.style.opacity = String(clamp(1 - Math.max(0, d - 0.15) * 0.62));
        st.style.setProperty("--on", String(clamp(1 - d * 1.6)));
      });
      texts.current.forEach((t, i) => {
        if (!t) return;
        const d = a - i; // < 0: still to come (below), > 0: done (above)
        t.style.opacity = String(clamp(1 - Math.abs(d) * 1.8));
        t.style.translate = `0 ${(-d * 44).toFixed(1)}px`;
      });
      setCur(clamp(Math.round(a), 0, N - 1));
      setTop(Math.round(a));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [still]);

  // A pill scrolls to the middle of its feature's hold
  const goTo = (i: number) => {
    const el = sec.current;
    if (!el) return;
    const run = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (run * (i + 1 - HOLD / 2)) / N, behavior: "smooth" });
  };

  return (
    <section ref={sec} id="can" aria-labelledby="tv-can-h" className={s.can} style={{ "--n": N } as CSSProperties}>
      <div className={s.pin}>
        <h2 id="tv-can-h" className={s.h2}>
          {C.heading.lead} <span>{C.heading.accent}</span>
        </h2>

        {/* The arc, its Klonies and the things around the top one (decoration; the features are read
            from the text below) */}
        <div ref={arc} className={s.arc} aria-hidden="true">
          <span className={s.circle} />
          <div className={s.props}>
            {C.feats.map((f, i) => (
              <div key={f.title} className={s.set} data-on={i === top || undefined}>
                {f.props.map((p, k) => (
                  <Prop key={k} p={p} k={k} />
                ))}
              </div>
            ))}
          </div>
          {C.feats.map((f, i) => (
            <span
              key={f.title}
              ref={(n) => {
                stops.current[i] = n;
              }}
              className={s.stop}
              data-on={i === cur || undefined}
            >
              <Image src={`/klo/${f.face}.png`} alt="" width={528} height={456} sizes="140px" />
            </span>
          ))}
        </div>

        <div className={s.texts}>
          {C.feats.map((f, i) => (
            <div
              key={f.title}
              ref={(n) => {
                texts.current[i] = n;
              }}
              className={s.text}
              data-on={i === cur || undefined}
            >
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        <nav className={s.pills} aria-label={`${C.heading.lead} ${C.heading.accent}`}>
          {C.feats.map((f, i) => (
            <button
              key={f.title}
              type="button"
              data-on={i === cur || undefined}
              aria-current={i === cur ? "step" : undefined}
              onClick={() => goTo(i)}
            >
              {f.title}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
