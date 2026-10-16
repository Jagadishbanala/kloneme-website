import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { hobbiesScreens } from "@/content/screens/hobbies";
import f from "../../sections/features/features.module.css";
import s from "./hobbies.module.css";

// The Hobbies stream's Watercolor screen (a hobby's own page), rebuilt from the client's prototype
// (kloneme-prototype.html, #v-hobby). Sizes are prototype pixels × --k, set by the Features .scr, so
// the screen scales with the phone. Render it as <div className={`${f.scr} ${s.bg}`}><Watercolor /></div>.

const W = hobbiesScreens.watercolor;

export function Watercolor() {
  const { chart, gallery } = W;
  const last = chart.months.length - 1;
  return (
    <>
      {/* The orange header: back, the hobby, the year's count and its target bar */}
      <div className={s.hero}>
        <div className={f.subhead}>
          <span className={`${f.backBtn} ${s.back}`}>
            <Icon name="left" strokeWidth={2.2} />
            {W.back}
          </span>
        </div>
        <p className={s.eyebrow}>{W.eyebrow}</p>
        <p className={s.title}>{W.title}</p>
        <p className={s.bigstat}>
          <b>{W.count}</b>
          <span>{W.countLabel}</span>
        </p>
        <span className={s.hbar} style={{ "--w": W.count / W.target } as CSSProperties}>
          <i />
        </span>
        <p className={s.meta}>
          <span>{W.pct}</span>
          <span>{W.next}</span>
        </p>
      </div>

      {/* Paintings per month: the current month in the stronger orange */}
      <p className={s.sec}>{chart.title}</p>
      <div className={s.chart}>
        <div className={s.bars}>
          {chart.months.map((m, i) => (
            <div
              key={m.month}
              data-cur={i === last || undefined}
              style={{ "--h": m.count / chart.max, "--i": i } as CSSProperties}
            >
              <em>{m.count}</em>
              <i />
            </div>
          ))}
        </div>
        <div className={s.xl}>
          {chart.months.map((m) => (
            <span key={m.month}>{m.month}</span>
          ))}
        </div>
      </div>

      {/* My paintings: a three-column grid that runs on past the bottom of the screen */}
      <p className={s.sec}>
        {gallery.title}
        <small>{gallery.more}</small>
      </p>
      <div className={s.gallery}>
        {gallery.paintings.map((p, i) => (
          <span key={p.img} className={s.gal} style={{ "--i": i } as CSSProperties}>
            <Image src={`/app/proto/${p.img}.jpg`} alt={p.title} width={128} height={128} />
          </span>
        ))}
      </div>
    </>
  );
}
