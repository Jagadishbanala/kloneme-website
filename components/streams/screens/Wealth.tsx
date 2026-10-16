import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import f from "@/components/sections/features/features.module.css";
import { wealthScreen, type WealthCatIcon } from "@/content/screens/wealth";
import { site } from "@/content/site";
import s from "./wealth.module.css";

// The Wealth home (Cashflow tab), rebuilt from the client's prototype (kloneme-prototype.html, view
// "v-wealth"). Sizes are prototype pixels × --k (set by the Features .scr), like the other app screens.

const W = wealthScreen;
const C = W.cashflow;

// Two rows of asset categories fit under the cashflow card; the rest of the list sits below the fold
const CATS_SHOWN = 4;

// The category glyphs from the prototype's duotone symbol set (soft fill, line, gold accent); the
// site's Icon set has no chart, gem or coin glyphs, so all six are drawn here to match each other.
const GLYPHS: Record<WealthCatIcon, { soft: ReactNode; line: ReactNode; accent: ReactNode }> = {
  home: {
    soft: <path d="M4.6 10.3 12 4.4l7.4 5.9v8.6a1.9 1.9 0 0 1-1.9 1.9H6.5a1.9 1.9 0 0 1-1.9-1.9z" />,
    line: (
      <>
        <path d="M3.4 11.2 12 4.3l8.6 6.9" />
        <path d="M5 10v8.9a1.9 1.9 0 0 0 1.9 1.9h10.2a1.9 1.9 0 0 0 1.9-1.9V10" />
        <path d="M9.9 20.7v-4.1a2.1 2.1 0 0 1 4.2 0v4.1" />
      </>
    ),
    accent: <circle cx="12" cy="11.4" r="1.25" />,
  },
  chart: {
    soft: <path d="M4 19.6V16l4-5 3.5 3L19 6.6v13z" />,
    line: (
      <>
        <path d="M4 19.6h16" />
        <path d="M4 16l4-5 3.5 3L19 6.6" />
      </>
    ),
    accent: <circle cx="19" cy="6.6" r="1.7" />,
  },
  car: {
    soft: (
      <path d="M3 15.4v-2.5c0-.8.5-1.5 1.3-1.7l2.4-.7 2.2-3a2 2 0 0 1 1.6-.8h4.4a2 2 0 0 1 1.5.7l2.6 3 1.8.5c.8.2 1.2.9 1.2 1.7v2.8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    ),
    line: (
      <>
        <path d="M5.6 16.4H4a1 1 0 0 1-1-1v-2.5c0-.8.5-1.5 1.3-1.7l2.4-.7 2.2-3a2 2 0 0 1 1.6-.8h4.4a2 2 0 0 1 1.5.7l2.6 3 1.8.5c.8.2 1.2.9 1.2 1.7v2.8a1 1 0 0 1-1 1h-1.6" />
        <path d="M9.4 16.4h5.2" />
        <path d="M6.8 10.5h10.6" />
        <circle cx="7.5" cy="16.6" r="1.9" />
        <circle cx="16.5" cy="16.6" r="1.9" />
      </>
    ),
    accent: <circle cx="20.2" cy="13.2" r=".9" />,
  },
  bank: {
    soft: (
      <>
        <path d="M3.4 9.4 12 4.2l8.6 5.2z" />
        <rect x="3.4" y="18.6" width="17.2" height="2.2" rx=".8" />
      </>
    ),
    line: (
      <>
        <path d="M3.4 9.4 12 4.2l8.6 5.2z" />
        <path d="M5.6 10.6v7M9.9 10.6v7M14.1 10.6v7M18.4 10.6v7" />
        <path d="M3.4 20.6h17.2" />
      </>
    ),
    accent: <circle cx="12" cy="7.4" r="1.1" />,
  },
  gem: {
    soft: <path d="M6.6 4.6h10.8L21 9.2 12 20 3 9.2z" />,
    line: (
      <>
        <path d="M6.6 4.6h10.8L21 9.2 12 20 3 9.2z" />
        <path d="M3 9.2h18" />
        <path d="M9.6 4.6 8 9.2 12 20l4-10.8-1.6-4.6" />
      </>
    ),
    accent: <path d="M19.4 2.4l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z" />,
  },
  btc: {
    soft: <circle cx="12" cy="12" r="8.4" />,
    line: (
      <>
        <circle cx="12" cy="12" r="8.4" />
        <path d="M10 7.6v8.8" />
        <path d="M10 8h3.1a2 2 0 0 1 0 4H10" />
        <path d="M10 12h3.6a2.1 2.1 0 0 1 0 4.2H10" />
        <path d="M11.6 6.4V8M11.6 16v1.6" />
      </>
    ),
    accent: <circle cx="17.4" cy="6.6" r="1" />,
  },
};

function CatGlyph({ name }: { name: WealthCatIcon }) {
  const g = GLYPHS[name];
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="currentColor" fillOpacity={0.2}>
        {g.soft}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {g.line}
      </g>
      <g fill="#e9c77a">{g.accent}</g>
    </svg>
  );
}

export function WealthHome() {
  return (
    <>
      {/* The green header card: logo, title, the Finances / Cashflow switch and the cashflow chart */}
      <div className={s.hero}>
        <div className={f.top}>
          <span className={f.logo}>
            <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} />
          </span>
          {/* Stealth Mode (hides every figure) */}
          <span className={`${f.iconBtn} ${f.darkIb}`}>
            <Icon name="eye" strokeWidth={2} />
          </span>
        </div>
        <p className={f.bigT}>{W.title}</p>
        <p className={s.sub}>{W.sub}</p>

        <div className={s.seg}>
          <i className={s.knob} />
          {W.tabs.map((t, i) => (
            <span key={t} data-on={i === W.selectedTab || undefined}>
              {t}
            </span>
          ))}
        </div>
        <div className={s.per}>
          {W.periods.map((p, i) => (
            <span key={p} data-on={i === W.selectedPeriod || undefined}>
              {p}
            </span>
          ))}
        </div>
        <p className={s.upd}>
          <Icon name="clock" strokeWidth={2.2} />
          {W.updated}
        </p>

        <div className={s.kpis}>
          {W.kpis.map((k, i) => (
            <div key={k.label} className={s.kpi} style={{ "--i": i } as CSSProperties}>
              <span>{k.label}</span>
              <b data-up={k.up || undefined}>{k.value}</b>
            </div>
          ))}
        </div>

        <div className={s.chart}>
          {C.months.map((m, i) => (
            <div key={m} className={s.m}>
              <i className={s.inBar} style={{ "--h": C.in[i] / C.max, "--i": i } as CSSProperties} />
              <i className={s.outBar} style={{ "--h": C.out[i] / C.max, "--i": i } as CSSProperties} />
              <span>{m}</span>
            </div>
          ))}
        </div>
        <div className={s.leg}>
          <span>
            <i className={s.inBar} />
            {W.legend.in}
          </span>
          <span>
            <i className={s.outBar} />
            {W.legend.out}
          </span>
          <span>{W.legend.period}</span>
        </div>
      </div>

      {/* Asset categories */}
      <p className={s.hSec}>
        {W.categoriesLabel}
        <span className={s.add}>
          <Icon name="plus" strokeWidth={2.2} />
          {W.addAsset}
        </span>
      </p>
      <div className={s.cats}>
        {W.categories.slice(0, CATS_SHOWN).map((c, i) => (
          <div key={c.name} className={s.cat} style={{ "--i": i + 3 } as CSSProperties}>
            <div className={s.catR}>
              <span className={s.catIc}>
                <CatGlyph name={c.icon} />
              </span>
              <span className={s.cnt}>
                <b>{c.count}</b>
                {c.unit}
              </span>
            </div>
            <div>
              <b className={s.nm}>{c.name}</b>
              <span className={s.v}>{c.value}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
