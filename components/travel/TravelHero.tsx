import { Fragment } from "react";
import { StoreButtons } from "@/components/ui/StoreButtons";
import type { StreamPage } from "@/content/streamPages";
import HeroStage from "./HeroStage";
import s from "./travel.module.css";

// Travel page, section 1 (client's pick: Option A "Window Seat" with C's scroll widening and flight route).
// Centred: the heading (no kicker, client 2026-10-15), then the subline and store buttons;
// below, a rounded window playing a travel clip with the phone standing in it, cut by its bottom edge.
export default function TravelHero({ page }: { page: StreamPage }) {
  const h = page.hero;
  return (
    <section id="top" aria-labelledby="tv-h" className={s.hero}>
      <div className={s.intro}>
        <div>
          <h1 id="tv-h" className={s.h1}>
            {h.lines.map((l) => (
              <Fragment key={l}>
                <span>{l}</span>{" "}
              </Fragment>
            ))}
            <span>
              <em>{h.accent}</em>
            </span>
          </h1>
        </div>
        <div className={s.side}>
          <p className={s.sub}>{h.sub}</p>
          <StoreButtons size="sm" />
        </div>
      </div>
      <HeroStage page={page} />
    </section>
  );
}
