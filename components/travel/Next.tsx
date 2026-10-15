import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { travel } from "@/content/travel";
import s from "./next.module.css";

// Travel page, section 4: "Next: Health." (client's pick: B, with a Health element in place of the
// suitcase, client 2026-10-15). The home page's lock panel (dark rounded panel, dot grid, glowing
// corners, kicker, two-line heading) as tall as its content, with a dark-glass heart on the right: a
// teal heartbeat line runs across it (the Health stream's icon and pattern), the heart beats gently,
// and faster while the button is hovered.

const HEART =
  "M260 420C120 330 40 250 40 160C40 95 92 44 156 44C202 44 240 70 260 108C280 70 318 44 364 44C428 44 480 95 480 160C480 250 400 330 260 420Z";
const BEAT = "M8 236H168L192 192L220 288L250 138L280 272L302 236H512";

function GlassHeart() {
  return (
    <svg className={s.heart} viewBox="0 0 520 460" aria-hidden="true">
      <defs>
        <linearGradient id="tv-heart-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#363f50" />
          <stop offset="0.55" stopColor="#252d3b" />
          <stop offset="1" stopColor="#1b222d" />
        </linearGradient>
        <radialGradient id="tv-heart-tint" cx="0.3" cy="0.2" r="0.9">
          <stop offset="0" className={s.tintStop} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tv-heart-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tv-heart-shape">
          <path d={HEART} />
        </clipPath>
      </defs>

      {/* The heart: glass with the glow's colour caught in it, a rim and an inner edge */}
      <g className={s.beatHeart}>
        <path d={HEART} fill="url(#tv-heart-face)" />
        <path d={HEART} fill="url(#tv-heart-tint)" />
        <path d={HEART} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" />
        <path d={HEART} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" transform="translate(26 24) scale(0.9)" />
        <g clipPath="url(#tv-heart-shape)">
          <rect className={s.sweep} x="-260" y="0" width="220" height="460" fill="url(#tv-heart-sweep)" />
        </g>
      </g>

      {/* The heartbeat line, drawn across again and again */}
      <path d={BEAT} className={s.lineGlow} pathLength={1} fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d={BEAT} className={s.line} pathLength={1} fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Next() {
  const n = travel.next;
  return (
    <section aria-labelledby="tv-next-h" className={s.section}>
      <div className={s.panel}>
        <span className={s.dots} aria-hidden="true" />
        <span className={`${s.corner} ${s.cornerL}`} aria-hidden="true" />
        <span className={`${s.corner} ${s.cornerR}`} aria-hidden="true" />

        <div className={s.content}>
          <p className={s.kicker}>
            <i aria-hidden="true" />
            {n.kicker}
          </p>
          <h2 id="tv-next-h" className={s.h2}>
            {n.name}. <span className={s.accent}>{n.motto}</span>
          </h2>
          <Link href={n.href} className={s.btn}>
            {n.cta}
            <Icon name="arrow" strokeWidth={2} />
          </Link>
        </div>
        <GlassHeart />
      </div>
    </section>
  );
}
