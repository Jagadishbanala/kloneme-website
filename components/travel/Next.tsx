import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { StreamPage } from "@/content/streamPages";
import s from "./next.module.css";

// Travel page, section 4: "Next: Health." (client's pick: B, with a Health element in place of the
// suitcase, client 2026-10-15). The home page's lock panel (dark rounded panel, dot grid, glowing
// corners, kicker, two-line heading) as tall as its content, with a dark-glass heart on the right: a
// teal heartbeat line runs across it (the Health stream's icon and pattern), the heart beats gently,
// and faster while the button is hovered. Every page's section 4 keeps Travel's colours (client
// 2026-10-16); the element can change with the stream it points to: Health's page shows Wealth with
// rising glass bars, Vault's shows Travel with a turning glass globe, Wealth's shows Vault with a
// glass safe, Travel's shows Hobbies with a glass palette and brush, Hobbies' shows Family with six
// glass people linked to a home.

const HEART =
  "M260 420C120 330 40 250 40 160C40 95 92 44 156 44C202 44 240 70 260 108C280 70 318 44 364 44C428 44 480 95 480 160C480 250 400 330 260 420Z";
const BEAT = "M8 236H168L192 192L220 288L250 138L280 272L302 236H512";

function GlassHeart() {
  return (
    <svg className={s.art} viewBox="0 0 520 460" aria-hidden="true">
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

// Wealth: the Wealth card's pattern (rounded columns rising left to right) as five dark-glass bars, and
// a teal growth line with an arrow drawn across their tops again and again; each bar rises as the line
// passes it (client 2026-10-16, in place of the coin and then the piggy bank). Faster while the button
// is hovered.
const BARS = [130, 185, 240, 295, 350].map((h, i) => ({ x: 52 + i * 88, h }));
const GROWTH = "M20 284L84 250L172 204L260 156L348 96L458 28";
const ARROW = "M424 26L458 28L445 59";

function GlassBars() {
  return (
    <svg className={`${s.art} ${s.bars}`} viewBox="0 0 520 460" aria-hidden="true">
      <defs>
        <linearGradient id="tv-bar-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#363f50" />
          <stop offset="0.55" stopColor="#252d3b" />
          <stop offset="1" stopColor="#1b222d" />
        </linearGradient>
        <radialGradient id="tv-bar-tint" cx="0.3" cy="0.1" r="0.9">
          <stop offset="0" className={s.tintStop} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Faint guide lines and the base */}
      {[130, 220, 310].map((y) => (
        <path key={y} d={`M28 ${y}H492`} stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="4 10" />
      ))}
      <path d="M28 424H492" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />

      {/* The bars: glass with the line's colour caught in it, a rim and a light down one side */}
      {BARS.map(({ x, h }, i) => (
        <g key={x} className={s.bar} style={{ animationDelay: `calc(var(--bars) * ${i * 0.11})` }}>
          <rect x={x} y={420 - h} width="64" height={h} rx="32" fill="url(#tv-bar-face)" />
          <rect x={x} y={420 - h} width="64" height={h} rx="32" fill="url(#tv-bar-tint)" />
          <rect x={x} y={420 - h} width="64" height={h} rx="32" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" />
          <rect x={x + 12} y={420 - h + 18} width="8" height={h - 36} rx="4" fill="rgba(255,255,255,0.07)" />
        </g>
      ))}

      {/* The growth line and its arrow */}
      <path d={GROWTH} className={s.lineGlow} pathLength={1} fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d={GROWTH} className={s.line} pathLength={1} fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d={ARROW} className={s.arrow} fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Travel: a dark-glass globe turning (its meridians sweep round), with the Travel card's dotted route
// arcing over it and a paper plane flying the route to a pulsing pin (client 2026-10-16). Quicker while
// the button is hovered.
const ROUTE = "M34 336C110 120 350 30 470 150";
const MERIDIANS = [0.92, 0.38, -0.38, -0.92]; // where each stands when nothing moves
const PLANE = "M22 0L-16 -15L-8 0L-16 15Z";

function GlassGlobe() {
  return (
    <svg className={s.art} viewBox="0 0 520 460" aria-hidden="true">
      <defs>
        <linearGradient id="tv-globe-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#363f50" />
          <stop offset="0.55" stopColor="#252d3b" />
          <stop offset="1" stopColor="#1b222d" />
        </linearGradient>
        <radialGradient id="tv-globe-tint" cx="0.3" cy="0.2" r="0.9">
          <stop offset="0" className={s.tintStop} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tv-globe-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tv-globe-shape">
          <circle cx="250" cy="235" r="175" />
        </clipPath>
      </defs>

      {/* The globe: glass with the line's colour caught in it, lines of latitude, meridians sweeping
          round as it turns, a light crossing it now and then, and a rim */}
      <g clipPath="url(#tv-globe-shape)">
        <rect width="520" height="460" fill="url(#tv-globe-face)" />
        <rect width="520" height="460" fill="url(#tv-globe-tint)" />
        {[148, 235, 322].map((y) => (
          <path key={y} d={`M60 ${y}H440`} stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        ))}
        {MERIDIANS.map((k, i) => (
          <path
            key={i}
            d="M250 60A175 175 0 0 1 250 410"
            className={s.meridian}
            fill="none"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="2"
            style={{ scale: `${k} 1`, animationDelay: `calc(var(--spin) * ${-i * 0.25})` }}
          />
        ))}
        <rect className={s.sweep} x="-260" y="0" width="220" height="460" fill="url(#tv-globe-sweep)" />
      </g>
      <circle cx="250" cy="235" r="175" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" />

      {/* The route, its two ends and the plane flying it */}
      <path d={ROUTE} className={s.routeGlow} fill="none" strokeWidth="12" strokeLinecap="round" />
      <path d={ROUTE} className={s.route} fill="none" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 18" />
      <circle cx="34" cy="336" r="7" className={s.routeFrom} />
      <circle cx="470" cy="150" r="13" className={s.pinHalo} />
      <circle cx="470" cy="150" r="9" className={s.pin} />
      <g className={s.planeGo}>
        <path d={PLANE} transform="scale(1.5)" fill="#fff" />
        <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path={ROUTE} />
      </g>
      <g className={s.planeStill} transform="translate(236 117) rotate(-22) scale(1.5)">
        <path d={PLANE} fill="#fff" />
      </g>
    </svg>
  );
}

// Vault: a dark-glass safe. Its dial carries the Vault card's three dashed rings, turning one way and
// the other, round a teal keyhole that glows (client 2026-10-16). Quicker while the button is hovered.
const SAFE_RINGS = [
  { r: 108, dash: "26 16", w: 6, o: 1 },
  { r: 82, dash: "10 12", w: 5, o: 0.75 },
  { r: 56, dash: "26 16", w: 5, o: 0.55 },
];
const TICKS = Array.from({ length: 36 }, (_, i) => i * 10);
const BOLTS = [
  [124, 94],
  [396, 94],
  [124, 366],
  [396, 366],
];
const KEYHOLE = "M253 228L247 254H273L267 228Z";

function GlassSafe() {
  return (
    <svg className={s.art} viewBox="0 0 520 460" aria-hidden="true">
      <defs>
        <linearGradient id="tv-safe-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#363f50" />
          <stop offset="0.55" stopColor="#252d3b" />
          <stop offset="1" stopColor="#1b222d" />
        </linearGradient>
        <radialGradient id="tv-safe-tint" cx="0.3" cy="0.2" r="0.9">
          <stop offset="0" className={s.tintStop} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tv-safe-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tv-safe-shape">
          <rect x="80" y="50" width="360" height="360" rx="56" />
        </clipPath>
      </defs>

      {/* The hinges, then the door: glass with the line's colour caught in it, a light crossing it now
          and then, a rim, an inner edge and four bolts */}
      {[112, 286].map((y) => (
        <rect key={y} x="62" y={y} width="24" height="62" rx="10" fill="#1d242e" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      ))}
      <g clipPath="url(#tv-safe-shape)">
        <rect width="520" height="460" fill="url(#tv-safe-face)" />
        <rect width="520" height="460" fill="url(#tv-safe-tint)" />
        <rect className={s.sweep} x="-260" y="0" width="220" height="460" fill="url(#tv-safe-sweep)" />
      </g>
      <rect x="80" y="50" width="360" height="360" rx="56" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" />
      <rect x="100" y="70" width="320" height="320" rx="42" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2" />
      {BOLTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="rgba(255,255,255,0.12)" />
      ))}

      {/* The dial: its ticks, the turning rings and the keyhole */}
      <circle cx="260" cy="230" r="132" fill="rgba(0,0,0,0.22)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      {TICKS.map((a) => (
        <line
          key={a}
          x1="260"
          y1="88"
          x2="260"
          y2={a % 90 === 0 ? 76 : 80}
          transform={`rotate(${a} 260 230)`}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={a % 90 === 0 ? 3 : 2}
          strokeLinecap="round"
        />
      ))}
      {SAFE_RINGS.map(({ r, dash, w, o }, i) => (
        <circle
          key={r}
          cx="260"
          cy="230"
          r={r}
          className={i % 2 ? s.ringRev : s.ringTurn}
          fill="none"
          strokeWidth={w}
          strokeLinecap="round"
          strokeDasharray={dash}
          opacity={o}
        />
      ))}
      <g className={s.keyGlow}>
        <circle cx="260" cy="220" r="13" />
        <path d={KEYHOLE} />
      </g>
      <g className={s.keyhole}>
        <circle cx="260" cy="220" r="13" />
        <path d={KEYHOLE} />
      </g>
    </svg>
  );
}

// Family: a dark-glass home, built like the Health heart: a teal heart glowing inside it beats, and a
// teal roofline draws over it again and again (client 2026-10-16: the six people round a home were
// "not nice"). Quicker while the button is hovered.
const HOME = "M260 54L452 212V392Q452 420 424 420H96Q68 420 68 392V212Z";
const ROOF = "M40 214L260 33L480 214";

function GlassFamily() {
  return (
    <svg className={s.art} viewBox="0 0 520 460" aria-hidden="true">
      <defs>
        <linearGradient id="tv-home-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#363f50" />
          <stop offset="0.55" stopColor="#252d3b" />
          <stop offset="1" stopColor="#1b222d" />
        </linearGradient>
        <radialGradient id="tv-home-tint" cx="0.5" cy="0.62" r="0.6">
          <stop offset="0" className={s.tintStop} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tv-home-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tv-home-shape">
          <path d={HOME} />
        </clipPath>
      </defs>

      {/* The chimney, behind the roof, a shade darker */}
      <rect x="356" y="92" width="44" height="110" rx="8" fill="#1d242e" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

      {/* The home: glass with the heart's glow caught in it, a light crossing it now and then, a rim and
          an inner edge */}
      <g clipPath="url(#tv-home-shape)">
        <rect width="520" height="460" fill="url(#tv-home-face)" />
        <rect width="520" height="460" fill="url(#tv-home-tint)" />
        <rect className={s.sweep} x="-260" y="0" width="220" height="460" fill="url(#tv-home-sweep)" />
      </g>
      <path d={HOME} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={HOME} fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2" strokeLinejoin="round" transform="translate(26 24) scale(0.9)" />

      {/* The heart inside, beating */}
      <g transform="translate(177 226) scale(0.32)">
        <path d={HEART} className={s.homeGlow} />
        <path d={HEART} className={s.homeHeart} />
      </g>

      {/* The roofline, drawn over it again and again */}
      <path d={ROOF} className={s.lineGlow} pathLength={1} fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d={ROOF} className={s.line} pathLength={1} fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Hobbies: a dark-glass artist's palette with paint in its wells (the section's teal and sky), a glass
// brush resting across it, and the Hobbies card's three brush strokes painted on it one after another
// while the brush sways (client 2026-10-16). Quicker while the button is hovered.
const PALETTE =
  "M60 238C56 140 160 70 280 74C400 78 470 150 462 228C456 290 404 318 362 300C330 286 306 300 312 334C318 372 280 398 220 394C120 388 64 326 60 238Z" +
  "M372 232A24 20 0 1 0 420 232A24 20 0 1 0 372 232Z";
const WELLS = [
  { x: 124, y: 222, sky: false, o: 0.95 },
  { x: 166, y: 152, sky: true, o: 0.9 },
  { x: 240, y: 116, sky: false, o: 0.55 },
  { x: 320, y: 114, sky: true, o: 0.55 },
  { x: 394, y: 152, sky: false, o: 0.8 },
];
const PAINT = [
  "M140 266C174 246 210 284 248 262",
  "M150 314C186 294 222 332 262 308",
  "M186 360C218 342 248 372 280 352",
];

function GlassPalette() {
  return (
    <svg className={s.art} viewBox="0 0 520 460" aria-hidden="true">
      <defs>
        <linearGradient id="tv-pal-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#363f50" />
          <stop offset="0.55" stopColor="#252d3b" />
          <stop offset="1" stopColor="#1b222d" />
        </linearGradient>
        <radialGradient id="tv-pal-tint" cx="0.3" cy="0.2" r="0.9">
          <stop offset="0" className={s.tintStop} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tv-pal-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="tv-pal-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9d2dc" />
          <stop offset="0.5" stopColor="#7d8896" />
          <stop offset="1" stopColor="#4a5463" />
        </linearGradient>
        <clipPath id="tv-pal-shape">
          <path d={PALETTE} clipRule="evenodd" />
        </clipPath>
      </defs>

      {/* The palette: glass with the line's colour caught in it, a light crossing it now and then, a rim
          and the thumb hole */}
      <g clipPath="url(#tv-pal-shape)">
        <rect width="520" height="460" fill="url(#tv-pal-face)" />
        <rect width="520" height="460" fill="url(#tv-pal-tint)" />
        <rect className={s.sweep} x="-260" y="0" width="220" height="460" fill="url(#tv-pal-sweep)" />
      </g>
      <path d={PALETTE} fillRule="evenodd" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" />

      {/* The wells, each holding paint with a glint on it */}
      {WELLS.map(({ x, y, sky, o }) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="25" fill="rgba(0,0,0,0.28)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          <circle cx={x} cy={y} r="17" className={sky ? s.paintSky : s.paintTeal} opacity={o} />
          <ellipse cx={x - 6} cy={y - 7} rx="6" ry="3.5" fill="rgba(255,255,255,0.35)" />
        </g>
      ))}

      {/* The strokes, painted one after another */}
      {PAINT.map((d, i) => (
        <path
          key={d}
          d={d}
          className={i === 1 ? `${s.stroke} ${s.strokeSky}` : s.stroke}
          pathLength={1}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          style={{ animationDelay: `calc(var(--paint) * ${i * 0.16})` }}
        />
      ))}

      {/* The brush, resting across the palette and swaying as it paints: handle, metal ferrule and
          bristles with teal on the tip */}
      <g className={s.brush}>
        <g transform="translate(474 408) rotate(-139)">
          <path d="M0 -5L140 -8L140 8L0 5Z" fill="url(#tv-pal-face)" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeLinejoin="round" />
          <circle r="5" fill="#252d3b" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
          <rect x="138" y="-9" width="36" height="18" rx="3" fill="url(#tv-pal-metal)" />
          <path d="M174 -9C196 -9 214 -4 232 0C214 4 196 9 174 9Z" fill="#2b3442" />
          <path d="M204 -5.5C214 -3.5 223 -1.5 232 0C223 1.5 214 3.5 204 5.5Z" className={s.paintTeal} />
        </g>
      </g>
    </svg>
  );
}

// Wealth (on Health's page, client 2026-10-16: "change the right element to coin"): a dark-glass coin
// with its thickness showing, a dollar sign pressed into it, turning gently; a teal line rises across it
// to a pulsing high point. Quicker while the button is hovered.
const RISE = "M8 392L132 340L206 362L292 262L352 292L470 132";

function GlassCoin() {
  return (
    <svg className={s.art} viewBox="0 0 520 460" aria-hidden="true">
      <defs>
        <linearGradient id="tv-coin-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#363f50" />
          <stop offset="0.55" stopColor="#252d3b" />
          <stop offset="1" stopColor="#1b222d" />
        </linearGradient>
        <radialGradient id="tv-coin-tint" cx="0.3" cy="0.2" r="0.9">
          <stop offset="0" className={s.tintStop} />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tv-coin-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="tv-coin-mark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <clipPath id="tv-coin-shape">
          <circle cx="250" cy="225" r="180" />
        </clipPath>
      </defs>

      {/* The coin: its edge behind, then the glass face with the line's colour caught in it, a rim, a
          milled ring, an inner edge, the dollar mark and a light crossing it now and then */}
      <g className={s.turnCoin}>
        <circle cx="258" cy="238" r="180" fill="#151b24" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <circle cx="250" cy="225" r="180" fill="url(#tv-coin-face)" />
        <circle cx="250" cy="225" r="180" fill="url(#tv-coin-tint)" />
        <circle cx="250" cy="225" r="180" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" />
        <circle cx="250" cy="225" r="152" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" strokeDasharray="2 7" />
        <circle cx="250" cy="225" r="138" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
        <text x="254" y="300" textAnchor="middle" fontSize="210" fontWeight="600" fill="rgba(0,0,0,0.35)">
          $
        </text>
        <text x="250" y="296" textAnchor="middle" fontSize="210" fontWeight="600" fill="url(#tv-coin-mark)">
          $
        </text>
        <g clipPath="url(#tv-coin-shape)">
          <rect className={s.sweep} x="-260" y="0" width="220" height="460" fill="url(#tv-coin-sweep)" />
        </g>
      </g>

      {/* The line rising across it, drawn again and again, and its high point */}
      <path d={RISE} className={s.lineGlow} pathLength={1} fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d={RISE} className={s.line} pathLength={1} fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="470" cy="132" r="12" className={s.pinHalo} />
      <circle cx="470" cy="132" r="9" className={s.pin} />
    </svg>
  );
}

export default function Next({ page }: { page: StreamPage }) {
  const n = page.next;
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
        {n.art === "coin" ? (
          <GlassCoin />
        ) : n.art === "bars" ? (
          <GlassBars />
        ) : n.art === "globe" ? (
          <GlassGlobe />
        ) : n.art === "safe" ? (
          <GlassSafe />
        ) : n.art === "family" ? (
          <GlassFamily />
        ) : n.art === "palette" ? (
          <GlassPalette />
        ) : (
          <GlassHeart />
        )}
      </div>
    </section>
  );
}
