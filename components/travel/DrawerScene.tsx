import type { CSSProperties } from "react";
import s from "./drawer.module.css";

// Vault page, section 1: an illustrated scene in place of the clip (client 2026-10-16: "he is putting
// all his driving licence, passport inside the cupboard drawer" — no free stock clip shows it, and the
// client chose an animation in code). A bright, minimal room: a framed print and a plant on the left,
// a white sideboard with an oak top on the right, clear of the phone. On a loop the top drawer slides
// open, a passport and then a driving licence go in and settle, the drawer closes and a padlock badge
// in the stream's colour pops up above it. Drawn in a 1600 × 700 box that fills the window like a
// clip (sliced); on phones the box keeps its right side in view.

const LEAVES = [
  { d: "M0 0C-14 -40 -10 -96 18 -128C34 -88 30 -38 0 0Z", r: -24 },
  { d: "M0 0C-24 -46 -30 -112 -6 -150C18 -110 22 -48 0 0Z", r: -6 },
  { d: "M0 0C-10 -50 4 -120 38 -146C48 -100 34 -44 0 0Z", r: 14 },
  { d: "M0 0C-6 -36 6 -80 34 -100C40 -66 28 -28 0 0Z", r: 34 },
  { d: "M0 0C-30 -30 -54 -78 -46 -112C-18 -86 -6 -40 0 0Z", r: -40 },
];

export default function DrawerScene({ narrow, paused }: { narrow: boolean; paused: boolean }) {
  return (
    <svg
      className={s.scene}
      data-paused={paused || undefined}
      viewBox="0 0 1600 700"
      preserveAspectRatio={narrow ? "xMaxYMid slice" : "xMidYMid slice"}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="vt-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f7f5" />
          <stop offset="1" stopColor="#e5ece9" />
        </linearGradient>
        <linearGradient id="vt-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dde5e1" />
          <stop offset="1" stopColor="#cfd9d4" />
        </linearGradient>
        <linearGradient id="vt-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eeece6" />
        </linearGradient>
        <linearGradient id="vt-oak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcbd90" />
          <stop offset="1" stopColor="#c7a273" />
        </linearGradient>
        <linearGradient id="vt-inside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f7151" />
          <stop offset="1" stopColor="#c9a87c" />
        </linearGradient>
        <linearGradient id="vt-art" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3f1ef" />
          <stop offset="1" stopColor="#c6e2de" />
        </linearGradient>
        <filter id="vt-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* The room: wall, a band of sunlight, skirting and floor */}
      <rect width="1600" height="600" fill="url(#vt-wall)" />
      <polygon className={s.sun} points="980,0 1200,0 1600,560 1380,560" fill="#fff" filter="url(#vt-soft)" />
      <polygon className={s.sun} points="120,0 260,0 560,560 420,560" fill="#fff" filter="url(#vt-soft)" style={{ animationDelay: "-5s" } as CSSProperties} />
      <rect y="588" width="1600" height="12" fill="#eef2f0" />
      <rect y="600" width="1600" height="100" fill="url(#vt-floor)" />

      {/* Left: a framed print and a plant */}
      <g>
        <rect x="200" y="150" width="130" height="164" rx="4" fill="#fff" stroke="#dbe2df" strokeWidth="3" />
        <rect x="214" y="164" width="102" height="136" rx="2" fill="url(#vt-art)" />
        <circle cx="282" cy="204" r="14" fill="#f5c65a" opacity="0.85" />
        <path d="M214 300L248 248L270 270L292 236L316 268V300Z" className={s.artHill} />
      </g>
      <ellipse cx="416" cy="604" rx="62" ry="8" fill="rgba(0,0,0,0.07)" filter="url(#vt-soft)" />
      <g className={s.plant}>
        {LEAVES.map(({ d, r }, i) => (
          <path key={i} d={d} transform={`translate(416 540) rotate(${r})`} fill={i % 2 ? "#4f9174" : "#6aa88c"} />
        ))}
      </g>
      <polygon points="384,540 448,540 440,600 392,600" fill="#ebe3d6" />
      <rect x="380" y="536" width="72" height="8" rx="4" fill="#e2d8c8" />

      {/* Right: the sideboard — shadow, legs, body, oak top and a vase */}
      <ellipse cx="1320" cy="606" rx="160" ry="10" fill="rgba(0,0,0,0.09)" filter="url(#vt-soft)" />
      <rect x="1208" y="566" width="8" height="38" rx="3" fill="#c39f71" />
      <rect x="1424" y="566" width="8" height="38" rx="3" fill="#c39f71" />
      <rect x="1192" y="386" width="256" height="182" rx="4" fill="url(#vt-body)" stroke="#e2ded5" strokeWidth="2" />
      <rect x="1180" y="372" width="280" height="16" rx="3" fill="url(#vt-oak)" />
      <g>
        <path d="M1418 300C1414 270 1404 248 1388 230M1418 300C1422 268 1436 250 1452 242M1418 300C1418 276 1420 256 1424 236" stroke="#9c8a73" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M1408 372C1398 360 1400 336 1410 322H1426C1436 336 1438 360 1428 372Z" fill="#e8ded1" stroke="#d8ccbc" strokeWidth="2" />
      </g>

      {/* The bottom drawer (stays shut) */}
      <rect x="1206" y="482" width="228" height="70" rx="4" fill="#f7f5f0" stroke="#e1dcd2" strokeWidth="2" />
      <rect x="1294" y="514" width="52" height="6" rx="3" fill="#3b3f46" />

      {/* The top drawer's inside, seen as it slides open */}
      <polygon className={s.inside} points="1212,400 1428,400 1440,437 1200,437" fill="url(#vt-inside)" />

      {/* The passport and the driving licence, going into the drawer (drawn round 0,0) */}
      <g className={s.passport}>
        <rect x="-32" y="-45" width="64" height="90" rx="6" fill="#22346b" />
        <rect x="-32" y="-45" width="8" height="90" rx="3" fill="#1b2a57" />
        <circle cx="2" cy="-8" r="12" fill="none" stroke="#d4b25a" strokeWidth="3" />
        <circle cx="2" cy="-8" r="4" fill="#d4b25a" />
        <rect x="-14" y="16" width="32" height="4" rx="2" fill="#d4b25a" />
        <rect x="-10" y="25" width="24" height="3" rx="1.5" fill="#d4b25a" opacity="0.7" />
      </g>
      <g className={s.licence}>
        <rect x="-48" y="-30" width="96" height="60" rx="8" fill="#f6f8f7" stroke="#d6ddda" strokeWidth="2" />
        <path d="M-48 -22a8 8 0 0 1 8 -8h80a8 8 0 0 1 8 8v6h-96Z" className={s.band} />
        <rect x="-40" y="-8" width="24" height="30" rx="4" fill="#cfd9d6" />
        <circle cx="-28" cy="2" r="6" fill="#b5c3bf" />
        <rect x="-8" y="-6" width="44" height="5" rx="2.5" fill="#c3ccc9" />
        <rect x="-8" y="4" width="36" height="5" rx="2.5" fill="#d3dad8" />
        <rect x="-8" y="14" width="40" height="5" rx="2.5" fill="#d3dad8" />
      </g>

      {/* The top drawer's front, sliding out and back */}
      <g className={s.front}>
        <rect x="1206" y="400" width="228" height="70" rx="4" fill="#fbfaf6" stroke="#e1dcd2" strokeWidth="2" />
        <rect x="1294" y="432" width="52" height="6" rx="3" fill="#3b3f46" />
      </g>

      {/* Locked away: a padlock badge pops up above the sideboard */}
      <g className={s.badge}>
        <circle cx="1320" cy="300" r="44" className={s.badgeRing} />
        <circle cx="1320" cy="300" r="30" className={s.badgeDisc} />
        <path d="M1310 296V288a10 10 0 0 1 20 0v8" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <rect x="1305" y="295" width="30" height="22" rx="5" fill="#fff" />
        <circle cx="1320" cy="305" r="3" className={s.badgeDisc} />
      </g>
    </svg>
  );
}
