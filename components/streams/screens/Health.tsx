import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { people, type Member } from "@/content/features";
import { healthScreens, type CheckupCard } from "@/content/screens/health";
import { site } from "@/content/site";
import f from "../../sections/features/features.module.css";
import s from "./health.module.css";

// The Health home and Checkups & alerts screens, rebuilt from the client's prototype
// (kloneme-prototype.html, views "v-health" and "v-checkups"). They share the Features screens' sizing
// (prototype pixels × --k) and app pieces; pass s.bg next to f.scr as the screen's class.

const H = healthScreens.home;
const C = healthScreens.checkups;

function Avs({ who, className }: { who: readonly Member[]; className?: string }) {
  return (
    <span className={`${f.avs} ${className ?? ""}`}>
      {who.map((w) => (
        <span key={w} className={`${f.av} ${s.av}`} style={{ "--ac": people[w].color } as CSSProperties}>
          {people[w].name[0]}
        </span>
      ))}
    </span>
  );
}

// The prototype's chart glyph (blood pressure), drawn like the site's line icons
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.6h16" />
      <path d="M4 16l4-5 3.5 3L19 6.6" />
    </svg>
  );
}

// The 40 ticks inside the score ring (viewBox 170 × 170)
const TICKS = Array.from({ length: 40 }, (_, k) => {
  const a = (k / 40) * Math.PI * 2;
  const at = (r: number) => [(85 + Math.cos(a) * r).toFixed(2), (85 + Math.sin(a) * r).toFixed(2)];
  const [x1, y1] = at(54);
  const [x2, y2] = at(58);
  return { x1, y1, x2, y2 };
});

/* ---------- Health home: score, vitals and what's coming up ---------- */
export function HealthHome() {
  const V = H.vitals;
  return (
    <>
      <div className={s.hero}>
        <div className={f.top}>
          <span className={f.logo}>
            <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} />
          </span>
          <span className={`${f.iconBtn} ${s.ib}`}>
            <Icon name="bell" strokeWidth={2} />
            <i className={`${f.pip} ${s.pip}`} />
          </span>
        </div>
        <p className={f.bigT}>{H.title}</p>
        <p className={s.motto}>{H.motto}</p>
        <div className={s.score}>
          <span className={s.ring}>
            <svg viewBox="0 0 170 170">
              <defs>
                <linearGradient id="hl-ring-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#b8f1ff" />
                </linearGradient>
              </defs>
              <circle cx="85" cy="85" r="70" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.22)" strokeWidth="14" />
              <circle
                className={s.arc}
                cx="85"
                cy="85"
                r="70"
                fill="none"
                stroke="url(#hl-ring-g)"
                strokeWidth="14"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={`${H.score.value / 100} 1`}
                transform="rotate(-90 85 85)"
              />
              {TICKS.map((t, i) => (
                <line key={i} {...t} stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
              ))}
            </svg>
            <span className={s.ringT}>
              <b>{H.score.value}</b>
              <span>{H.score.label}</span>
            </span>
          </span>
          <span className={s.side}>
            {H.side.map((x) => (
              <span key={x.label}>
                <span>{x.label}</span>
                <b>{x.value}</b>
              </span>
            ))}
          </span>
        </div>
      </div>

      <p className={s.sec}>
        {V.title} <small>{V.note}</small>
      </p>
      <div className={s.vitals}>
        <div className={s.vt} style={{ "--i": 0, "--vc": "#ff4d6d" } as CSSProperties}>
          <span className={s.vh}>
            <span className={`${s.ic} ${s.beat}`}>
              <Icon name="heart" strokeWidth={2} />
            </span>
            {V.heart.label}
          </span>
          <b className={s.val}>
            {V.heart.value}
            <small> {V.heart.unit}</small>
          </b>
          <svg className={s.ecg} viewBox="0 0 160 40" preserveAspectRatio="none">
            <path
              d="M0 22h30l6-10 8 22 8-30 6 18h26l6-10 8 22 8-30 6 18h28"
              fill="none"
              stroke="#ff4d6d"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className={s.vt} style={{ "--i": 1, "--vc": "#7b3fe4" } as CSSProperties}>
          <span className={s.vh}>
            <span className={s.ic}>
              <ChartIcon />
            </span>
            {V.pressure.label}
          </span>
          <b className={s.val}>{V.pressure.value}</b>
          <span className={s.band}>{V.pressure.band}</span>
        </div>
        <div className={s.vt} style={{ "--i": 2, "--vc": "#4a6cff" } as CSSProperties}>
          <span className={s.vh}>
            <span className={s.ic}>
              <Icon name="clock" strokeWidth={2} />
            </span>
            {V.sleep.label}
          </span>
          <b className={s.val}>{V.sleep.value}</b>
          <span className={s.bars}>
            {V.sleep.nights.map((n, j) => (
              <i key={j} style={{ "--h": ((n / V.sleep.max) * 100).toFixed(1), "--j": j } as CSSProperties} />
            ))}
          </span>
        </div>
        <div className={s.vt} style={{ "--i": 3, "--vc": "#1f9d6b" } as CSSProperties}>
          <span className={s.vh}>
            <span className={s.ic}>
              <Icon name="run" strokeWidth={2} />
            </span>
            {V.steps.label}
          </span>
          <b className={s.val}>{V.steps.value}</b>
          <span className={s.stepbar}>
            <i style={{ "--w": Math.min(1, V.steps.count / V.steps.goal) } as CSSProperties} />
          </span>
          <span className={s.vtS}>{V.steps.goalLabel}</span>
        </div>
      </div>

      <p className={s.sec}>{H.upTitle}</p>
      {H.up.map((u, i) => (
        <div key={u.title} className={s.up} style={{ "--i": i + 4 } as CSSProperties}>
          <span className={s.dt}>
            <b>{u.day}</b>
            <span>{u.month}</span>
          </span>
          <span className={s.t}>
            <b>{u.title}</b>
            <span>{u.meta}</span>
          </span>
          <Avs who={u.who} />
        </div>
      ))}
    </>
  );
}

/* ---------- Checkups & alerts: the week, the day, what's overdue and what's later ---------- */
function Card({ c, i, over }: { c: CheckupCard; i: number; over?: boolean }) {
  return (
    <div className={s.ckc} data-over={over || undefined} style={{ "--i": i, "--kb": c.bg, "--kc": c.fg } as CSSProperties}>
      <div className={s.r1}>
        <span className={s.kind}>{c.kind}</span>
        <span className={s.when}>
          <Icon name="clock" strokeWidth={2} />
          {c.when}
        </span>
      </div>
      <div className={s.r2}>
        <span className={s.ckT}>
          <b>{c.title}</b>
          <span>{c.meta}</span>
        </span>
        <Avs who={c.who} className={s.push} />
      </div>
      {over && (
        <div className={s.acts}>
          <span>{C.notNeeded}</span>
          <span className={s.pri}>{C.reschedule}</span>
        </div>
      )}
    </div>
  );
}

// Entrance order: the week strip, then the cards from top to bottom
const AT = { day: 1, attention: 1 + C.day.length, later: 1 + C.day.length + C.attention.length };

export function Checkups() {
  return (
    <>
      <div className={f.subhead}>
        <span className={`${f.backBtn} ${s.back}`}>
          <Icon name="left" strokeWidth={2.2} />
          {C.back}
        </span>
        <span className={`${f.iconBtn} ${s.add}`}>
          <Icon name="plus" strokeWidth={2.2} />
        </span>
      </div>
      <p className={`${f.subttl} ${s.ttl}`}>{C.title}</p>
      <div className={s.week} style={{ "--i": 0 } as CSSProperties}>
        {C.week.map((d) => (
          <span key={d.day} className={s.wd} data-on={d.on || undefined} data-dot={d.dot || undefined}>
            <span>{d.dow}</span>
            {d.day}
            <i />
          </span>
        ))}
      </div>
      <p className={s.grp}>{C.dayLabel}</p>
      {C.day.map((c, i) => (
        <Card key={c.title} c={c} i={AT.day + i} />
      ))}
      <p className={s.grp} data-alert="">
        {C.attentionLabel}
      </p>
      {C.attention.map((c, i) => (
        <Card key={c.title} c={c} i={AT.attention + i} over />
      ))}
      <p className={s.grp}>{C.laterLabel}</p>
      {C.later.map((c, i) => (
        <Card key={c.title} c={c} i={AT.later + i} />
      ))}
    </>
  );
}
