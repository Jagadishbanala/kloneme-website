import { Fragment } from "react";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { travel } from "@/content/travel";
import HeroStage from "./HeroStage";
import s from "./travel.module.css";

// Travel page, section 1 (client's pick: Option A "Window Seat" with C's scroll widening and flight route).
// Centred: the heading (no kicker, client 2026-10-15), then the subline, store buttons and stats;
// below, a rounded window playing a travel clip with the phone standing in it, cut by its bottom edge.
export default function TravelHero() {
  const h = travel.hero;
  return (
    <section id="top" aria-labelledby="tv-h" className={s.hero}>
      <div className={s.intro}>
        <div>
          <h1 id="tv-h" className={s.h1}>
            {h.lines.map((l, i) => (
              <Fragment key={l}>
                {i > 0 && " "}
                <span>
                  {l}
                  {i === h.lines.length - 1 && (
                    <>
                      {" "}
                      <em>{h.accent}</em>
                    </>
                  )}
                </span>
              </Fragment>
            ))}
          </h1>
        </div>
        <div className={s.side}>
          <p className={s.sub}>{h.sub}</p>
          <StoreButtons size="sm" />
          <ul className={s.stats}>
            {h.stats.map((x) => (
              <li key={x.label}>
                <b>{x.value}</b>
                <span>{x.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <HeroStage />
    </section>
  );
}
