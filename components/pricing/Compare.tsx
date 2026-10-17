"use client";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { pricing, type PlanKey } from "@/content/pricing";
import s from "./pricing.module.css";

// Pricing, section 2: "Everything you get. Nothing hidden." The client's comparison table (client
// 2026-10-17: "the same format as the old design, but with an animated feeling and a unique way of
// representing it"). The plan columns' names as small versions of the cards' bands (lilac for
// Personal, dark for Personal Business), each with its Klonie large in a glowing ring over the name. The three
// allowances get meters drawn to scale under their values (Unlimited keeps flowing); every feature has
// an amber tick or a quiet dash. Rows slide in as they scroll into view, the meters fill and the ticks
// pop, Personal's first; where only Personal Business has a feature, its tick lands with a ripple.
const C = pricing.compare;
const KLONIE: Record<PlanKey, string> = { free: "/klo/helping.png", business: "/klo/surprised.png" };

const num = (v: string) => Number(v.replace(/[^\d.]/g, "")) || 0;

// A meter's fill for an allowance: its share of the larger value (at least a sliver); Unlimited is full
function share(v: string, other: string | boolean) {
  if (!/\d/.test(v)) return 1;
  if (typeof other !== "string" || !/\d/.test(other)) return Math.max(0.04, num(v) / 1000);
  return Math.max(0.04, num(v) / Math.max(num(v), num(other)));
}

function Cell({ v, other }: { v: string | boolean; other: string | boolean }) {
  if (typeof v === "string")
    return (
      <span className={s.amount}>
        <b className={s.value}>{v}</b>
        <span className={s.meter} aria-hidden="true">
          <i style={{ "--f": share(v, other) } as CSSProperties} data-unlimited={!/\d/.test(v) || undefined} />
        </span>
      </span>
    );
  return v ? (
    <span className={s.yes}>
      <Icon name="check" strokeWidth={2.8} aria-hidden="true" />
      <span className="sr-only">{C.included}</span>
    </span>
  ) : (
    <span className={s.no}>
      <i aria-hidden="true" />
      <span className="sr-only">{C.notIncluded}</span>
    </span>
  );
}

export default function Compare() {
  const body = useRef<HTMLTableSectionElement>(null);

  // Each row comes in once it's in view; rows arriving together follow one another
  useEffect(() => {
    const root = body.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (es) => {
        let k = 0;
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const row = e.target as HTMLElement;
          row.style.setProperty("--d", `${k++ * 70}ms`);
          row.setAttribute("data-in", "");
          io.unobserve(row);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    root.querySelectorAll("tr").forEach((tr) => io.observe(tr));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="pr-compare-h" className={s.compare}>
      <h2 id="pr-compare-h" className={s.h2}>
        {C.heading.lead} <span>{C.heading.accent}</span>
      </h2>
      <div className={s.tablePanel}>
        <table className={s.table}>
          <caption className="sr-only">{C.label}</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className={s.colHead}>{C.columns.feature}</span>
              </th>
              {(["free", "business"] as const).map((k) => (
                <th key={k} scope="col" data-plan={k}>
                  <span className={s.colHead}>
                    <span className={s.colKlonie} aria-hidden="true">
                      <Image src={KLONIE[k]} alt="" width={528} height={456} sizes="66px" />
                    </span>
                    {C.columns[k]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody ref={body}>
            {C.rows.map((r, i) => (
              <tr
                key={r.feature}
                data-split={(typeof r.free === "boolean" && typeof C.rows[i - 1]?.free === "string") || undefined}
                data-only={(r.free === false && r.business === true) || undefined}
              >
                <th scope="row">{r.feature}</th>
                <td data-plan="free">
                  <Cell v={r.free} other={r.business} />
                </td>
                <td data-plan="business">
                  <Cell v={r.business} other={r.free} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
