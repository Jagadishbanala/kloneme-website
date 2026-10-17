"use client";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { pricing, type Plan, type PlanKey } from "@/content/pricing";
import s from "./pricing.module.css";

// Pricing, section 1 (client 2026-10-17, from their reference): soft lilac and amber light drifting
// behind the whole section (no panel over it; the client had the white glass frame removed) and a few
// specks twinkling over it. On it, the heading and the three promises as ticked pills, then the two
// plans. Each card opens with a coloured band holding the plan's name and Klonie peeking over the
// white body, then the price line, the allowance as plain numbers and names, the ticked list and a
// full-width button. As a card comes into view Klonie pops up from behind the body, the numbers count
// up and the ticks come in one by one; on hover the card lifts and Klonie peeks out further.
const H = pricing.hero;
// Klonie on each band: waving hello on Personal; surprised, with sparkles, on Personal Business (coming soon)
const AVATAR: Record<PlanKey, string> = { free: "/klo/helping.png", business: "/klo/surprised.png" };

// The specks in the frame: x, y (% of the frame), size and drift (px), seconds per drift, delay
const SPECKS = [
  { x: 12, y: 7, s: 5, dx: 10, dy: -6, d: 11, dl: -1 },
  { x: 22, y: 24, s: 3, dx: -8, dy: 6, d: 13, dl: -4 },
  { x: 38, y: 3, s: 4, dx: 12, dy: 4, d: 12, dl: -7 },
  { x: 66, y: 15, s: 3, dx: -10, dy: -5, d: 10, dl: -2 },
  { x: 80, y: 5, s: 5, dx: 8, dy: 6, d: 14, dl: -5 },
  { x: 89, y: 26, s: 4, dx: -12, dy: -4, d: 12, dl: -9 },
  { x: 4, y: 44, s: 4, dx: 4, dy: 18, d: 13, dl: -3 },
  { x: 96, y: 56, s: 3, dx: -4, dy: -16, d: 11, dl: -6 },
  { x: 2.5, y: 86, s: 3, dx: 3, dy: -14, d: 12, dl: -8 },
  { x: 97, y: 90, s: 4, dx: -3, dy: 12, d: 13, dl: -2 },
];

// A number that counts up the first time it scrolls into view ("2 GB", "1,000"); a word ("Unlimited"),
// or a number already on screen, stays as it is
function Count({ value }: { value: string }) {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    const b = el.current;
    const m = /^([\d,]+)(.*)$/.exec(value);
    if (!b || !m || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (b.getBoundingClientRect().top < window.innerHeight) return;
    const n = Number(m[1].replace(/,/g, ""));
    const show = (k: number) => {
      b.textContent = Math.round(k).toLocaleString("en-US") + m[2];
    };
    show(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - t0) / 1100);
          show(n * (1 - (1 - t) ** 3));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(b);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      b.textContent = value;
    };
  }, [value]);
  return <b ref={el}>{value}</b>;
}

function PlanCard({ p, i }: { p: Plan; i: number }) {
  const items: { text: string; icon: IconName; lead?: boolean }[] = [
    ...(p.includes ? [{ text: p.includes, icon: "plus" as const, lead: true }] : []),
    ...p.features.map((text) => ({ text, icon: "check" as const })),
  ];
  return (
    <article className={s.plan} data-plan={p.key} aria-labelledby={`pr-plan-${p.key}`} style={{ "--i": i } as CSSProperties}>
      <div className={s.band}>
        <h2 id={`pr-plan-${p.key}`} className={s.planName}>
          {p.name}
        </h2>
        <span className={s.halo} aria-hidden="true" />
        <span className={s.avatar} aria-hidden="true">
          <span className={s.avatarBob}>
            <Image src={AVATAR[p.key]} alt="" width={528} height={456} sizes="160px" className={s.avatarImg} />
          </span>
        </span>
      </div>

      <div className={s.body}>
        <p className={s.price}>{p.price}</p>
        <p className={s.planLine}>{p.line}</p>

        <ul className={s.allowance}>
          {p.allowance.map((a) => (
            <li key={a.label}>
              <Count value={a.value} />
              <span>{a.label}</span>
            </li>
          ))}
        </ul>

        <ul className={s.features}>
          {items.map((it, j) => (
            <li
              key={it.text}
              className={it.lead ? s.includes : undefined}
              style={{ "--j": j } as CSSProperties}
            >
              <span className={s.tick} aria-hidden="true">
                <Icon name={it.icon} strokeWidth={2.2} />
              </span>
              {it.text}
            </li>
          ))}
        </ul>

        <a
          href={p.cta.href}
          className={s.planCta}
          {...(p.cta.external ? { target: "_blank", rel: "noopener" } : {})}
        >
          {p.cta.label}
          <Icon name="arrow" strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}

export default function Plans() {
  const plans = useRef<HTMLDivElement>(null);

  // Each card (Klonie) and each list (the ticks) starts its entrance once it's in view
  useEffect(() => {
    const root = plans.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    root.querySelectorAll(`.${s.plan}, .${s.features}`).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" aria-labelledby="pr-h" className={s.hero}>
      <span className={s.lights} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className={s.heroGlow} aria-hidden="true" />

      <div className={s.frame}>
        <span className={s.specks} aria-hidden="true">
          {SPECKS.map((p, i) => (
            <i
              key={i}
              className={s.speck}
              style={
                {
                  "--x": `${p.x}%`,
                  "--y": `${p.y}%`,
                  "--s": `${p.s}px`,
                  "--dx": `${p.dx}px`,
                  "--dy": `${p.dy}px`,
                  "--d": `${p.d}s`,
                  "--dl": `${p.dl}s`,
                } as CSSProperties
              }
            />
          ))}
        </span>

        <div className={s.heroHead}>
          <p className={s.kicker}>
            <i aria-hidden="true" />
            {H.kicker}
          </p>
          <h1 id="pr-h" className={s.h1}>
            {H.heading.lead} <span>{H.heading.accent}</span>
          </h1>
          <ul className={s.promises}>
            {H.promises.map((t, i) => (
              <li key={t} style={{ "--i": i } as CSSProperties}>
                <Icon name="check" strokeWidth={2.6} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div ref={plans} className={s.plans}>
          {pricing.plans.map((p, i) => (
            <PlanCard key={p.key} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
