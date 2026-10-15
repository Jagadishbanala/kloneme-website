"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { people, type Member } from "@/content/features";
import { travel, type GlanceCard } from "@/content/travel";
import s from "./glance.module.css";

// Travel page, section 2: "Travel, at a glance." (client's pick: 70% A "Arched Wings", 30% B "Boarding
// Passes"). The two wings of Bevel's band from the client's reference (the four tall middle photos
// removed and the rest made wider, client 2026-10-15): 10 plain photo cards in four columns, with the
// heading and a line of text between the wings. Each card flips sideways on hover (tap on touch
// screens, focus with the keyboard) to that trip's details, and every back is a different kind
// (client 2026-10-15): one boarding pass, a checklist, a savings ring, a passport stamp, a quote, a
// big number, a big word, a calendar page, a reminder, a goal. The columns rise in from the centre
// outward, then each runs as an endless slow reel that fades out at its top and bottom (client
// 2026-10-15), alternating up and down at its own pace; under the pointer a reel eases to a stop so a
// card can flip, and eases off again. Below 1200px the cards sit in one swipeable row under the heading.

const G = travel.glance;
const CARDS: Record<string, GlanceCard> = G.cards;
const MID = (G.columns.length - 1) / 2;

const whoLabel = (who: Member[]) => (who.length === 4 ? "The whole family" : who.map((w) => people[w].name).join(" & "));

// Small pieces the backs share
const Stars = ({ n }: { n: number }) => (
  <span className={s.stars} role="img" aria-label={`Rated ${n} out of 5`}>
    {"★".repeat(n)}
  </span>
);
const Tag = ({ children }: { children: string }) => <span className={s.tag}>{children}</span>;
const Bar = ({ pct }: { pct: number }) => (
  <span className={s.bar} role="img" aria-label={`${pct}% there`}>
    <i style={{ width: `${pct}%` }} />
  </span>
);
const Avatars = ({ who }: { who: Member[] }) => (
  <span className={s.avs}>
    {who.map((w) => (
      <span key={w} className={s.av} style={{ "--ac": people[w].color } as CSSProperties}>
        {people[w].name[0]}
      </span>
    ))}
  </span>
);
const Who = ({ who }: { who: Member[] }) => (
  <div className={s.who}>
    <Avatars who={who} />
    {whoLabel(who)}
  </div>
);

// What each kind of back shows
function BackBody({ c }: { c: GlanceCard }) {
  switch (c.kind) {
    // Rich: a boarding pass with the route, the trip, who went and a barcode stub
    case "pass":
      return (
        <>
          <div className={s.top}>
            <Tag>{c.tag}</Tag>
            <Stars n={c.rating} />
          </div>
          <div className={s.codes}>
            <span>
              <b>{c.from[0]}</b>
              <small>{c.from[1]}</small>
            </span>
            <i aria-hidden="true">
              <Icon name="plane" strokeWidth={2} />
            </i>
            <span>
              <b>{c.to[0]}</b>
              <small>{c.to[1]}</small>
            </span>
          </div>
          <b className={s.title}>{c.title}</b>
          <dl className={s.rows}>
            {c.rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <Who who={c.who} />
          <span className={`${s.stub} ${s.roomy}`} aria-hidden="true">
            <i className={s.barcode} />
          </span>
        </>
      );

    // Bucket list: how far along, and the steps
    case "checklist":
      return (
        <>
          <div className={s.top}>
            <Tag>{c.tag}</Tag>
          </div>
          <div>
            <b className={s.name}>{c.name}</b>
            <small className={s.meta}>{c.place}</small>
          </div>
          <div className={`${s.pct} ${s.roomy}`}>
            <b>{c.bar}%</b>
            <span>there</span>
          </div>
          <Bar pct={c.bar} />
          <ul className={s.steps}>
            {c.steps.map(([t, done]) => (
              <li key={t} data-done={done || undefined}>
                <i aria-hidden="true">{done && <Icon name="check" strokeWidth={3} />}</i>
                {t}
                {done && <span className={s.sr}> (done)</span>}
              </li>
            ))}
          </ul>
          <Who who={c.who} />
        </>
      );

    // The next trip's fund as a ring
    case "ring":
      return (
        <>
          <p className={s.kicker}>{c.tag}</p>
          <div className={s.ringRow}>
            <span className={s.ring} role="img" aria-label={`${c.bar}% saved`} style={{ "--pct": c.bar } as CSSProperties}>
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="20" pathLength={100} />
                <circle cx="24" cy="24" r="20" pathLength={100} />
              </svg>
              <b>{c.bar}%</b>
            </span>
            <span className={s.saved}>
              <b>{c.saved}</b>
              <small>{c.of}</small>
            </span>
          </div>
          <b className={s.name}>{c.name}</b>
          <p className={`${s.note} ${s.opt}`}>{c.note}</p>
        </>
      );

    // Minimal: a passport stamp
    case "stamp":
      return (
        <>
          <div className={s.stamps}>
            <span className={s.stampAlso} aria-hidden="true">
              {c.also}
            </span>
            <span className={s.stamp}>
              <small>{c.place}</small>
              <b>{c.name}</b>
              <small>{c.date}</small>
            </span>
          </div>
          <div className={s.foot}>
            <small className={s.meta}>{c.meta}</small>
            <Stars n={c.rating} />
          </div>
        </>
      );

    // Minimal: one line from the journal
    case "quote":
      return (
        <>
          <div className={s.top}>
            <span className={s.qmark} aria-hidden="true">
              “
            </span>
            <Stars n={c.rating} />
          </div>
          <p className={s.qtext}>{c.quote}</p>
          <small className={`${s.meta} ${s.by}`}>{c.by}</small>
        </>
      );

    // Minimal: one big number or word
    case "big":
      return (
        <>
          <p className={s.kicker}>{c.kicker}</p>
          <b className={s.huge} data-word={c.value.length > 4 || undefined}>
            {c.value}
            {c.unit && <span>{c.unit}</span>}
          </b>
          <p className={s.line}>{c.line}</p>
        </>
      );

    // A calendar page for the planned weekend
    case "cal":
      return (
        <>
          <div className={s.calHead}>
            <span>{c.month}</span>
            <span>{c.tag}</span>
          </div>
          <div className={s.calBody}>
            <b className={s.calDay}>{c.day}</b>
            <b className={s.title}>{c.name}</b>
            <small className={`${s.meta} ${s.opt}`}>{c.meta}</small>
          </div>
        </>
      );

    // A reminder
    case "reminder":
      return (
        <>
          <span className={s.bell} aria-hidden="true">
            <Icon name="bell" strokeWidth={2} />
          </span>
          <p className={s.kicker}>Reminder</p>
          <b className={s.title}>{c.title}</b>
          <small className={s.meta}>{c.meta}</small>
          <Who who={c.who} />
        </>
      );

    // A goal: target date and a bar
    case "goal":
      return (
        <>
          <div className={s.top}>
            <Tag>{c.tag}</Tag>
          </div>
          <div>
            <b className={s.name}>{c.name}</b>
            <small className={s.meta}>{c.place}</small>
          </div>
          <div className={s.goal}>
            <div className={s.goalRow}>
              <small>By {c.target}</small>
              <small>{c.bar}%</small>
            </div>
            <Bar pct={c.bar} />
            <small className={`${s.meta} ${s.opt}`}>Next: {c.step}</small>
          </div>
        </>
      );

  }
}

function Back({ c }: { c: GlanceCard }) {
  return (
    <div className={`${s.face} ${s.back}`} data-kind={c.kind} data-tone={c.tone}>
      <BackBody c={c} />
    </div>
  );
}

type CardProps = { id: string; ratio: number; flipped: boolean; onTap: () => void; dup?: boolean };

// dup: the reel's extra copies of a column, there only to make the loop seamless (hidden from
// screen readers and the keyboard)
function Card({ id, ratio, flipped, onTap, dup }: CardProps) {
  const c = CARDS[id];
  return (
    <li
      className={`${s.card}${dup ? ` ${s.dup}` : ""}`}
      style={{ "--r": ratio } as CSSProperties}
      data-flipped={flipped || undefined}
      tabIndex={dup ? -1 : 0}
      aria-hidden={dup || undefined}
      onClick={onTap}
    >
      <div className={s.inner}>
        {/* Front: the photo alone, as in the reference */}
        <div className={`${s.face} ${s.front}`}>
          <Image
            src={`/travel/places/${id}.jpg`}
            alt={dup ? "" : c.name}
            fill
            sizes="(max-width: 1199px) 240px, 200px"
            className={s.photo}
          />
        </div>
        <Back c={c} />
      </div>
    </li>
  );
}

export default function Glance() {
  const sec = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [flipped, setFlipped] = useState<string | null>(null);
  const hover = useMedia("(hover: hover)");
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const views = useRef<(HTMLDivElement | null)[]>([]);

  // The columns rise in the first time the band comes into view
  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // With a mouse, a reel eases to a stop under the pointer (so a card can flip) and eases off again
  useEffect(() => {
    if (!hover || still) return;
    const offs = views.current.map((v) => {
      if (!v) return () => {};
      let raf = 0;
      const easeTo = (to: number) => {
        cancelAnimationFrame(raf);
        const anim = v.firstElementChild?.getAnimations()[0];
        if (!anim) return;
        const from = anim.playbackRate;
        const t0 = performance.now();
        const step = (now: number) => {
          const k = Math.min(1, (now - t0) / 500);
          anim.playbackRate = from + (to - from) * (1 - Math.pow(1 - k, 3));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      };
      const enter = () => easeTo(0);
      const leave = () => easeTo(1);
      v.addEventListener("pointerenter", enter);
      v.addEventListener("pointerleave", leave);
      return () => {
        cancelAnimationFrame(raf);
        v.removeEventListener("pointerenter", enter);
        v.removeEventListener("pointerleave", leave);
      };
    });
    return () => offs.forEach((off) => off());
  }, [hover, still]);

  // Touch screens: a tap flips a card (and flips the last one back); with a mouse, hover does it
  const tap = (id: string) => {
    if (!hover) setFlipped((f) => (f === id ? null : id));
  };

  return (
    <section ref={sec} id="glance" aria-labelledby="tv-glance-h" className={s.glance} data-in={inView || undefined}>
      <div className={s.stage}>
        <div className={s.head}>
          <h2 id="tv-glance-h" className={s.h2}>
            {G.heading.lead} <span>{G.heading.accent}</span>
          </h2>
          <p className={s.sub}>{G.sub}</p>
        </div>
        <div className={s.band}>
          {G.columns.map((col, ci) => (
            <div
              key={ci}
              className={s.col}
              data-dir={col.dir}
              style={{ "--d": Math.abs(ci - MID), "--dur": `${col.dur}s`, "--delay": `${-col.dur * 0.37 * ci}s` } as CSSProperties}
            >
              <div
                ref={(n) => {
                  views.current[ci] = n;
                }}
                className={s.view}
              >
                {/* The column three times over, so the reel loops without a seam */}
                <ul className={s.track}>
                  {[...col.cards, ...col.cards, ...col.cards].map(([id, ratio], k) => (
                    <Card
                      key={k}
                      id={id}
                      ratio={ratio}
                      flipped={flipped === id}
                      onTap={() => tap(id)}
                      dup={k >= col.cards.length}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
