import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { people, type Member } from "@/content/features";
import { travel } from "@/content/travel";
import f from "../sections/features/features.module.css";
import s from "./travel.module.css";

// The Travel prep and Trip journal screens, rebuilt from the client's prototype (kloneme-prototype.html).
// They share the Features screens' sizing (prototype pixels × --k) and app pieces.

const S = travel.screens;

function Avs({ who }: { who: readonly Member[] }) {
  return (
    <span className={f.avs}>
      {who.map((w) => (
        <span key={w} className={`${f.av} ${s.av}`} style={{ "--ac": people[w].color } as CSSProperties}>
          {people[w].name[0]}
        </span>
      ))}
    </span>
  );
}

function Back({ label }: { label: string }) {
  return (
    <span className={`${f.backBtn} ${f.darkBack}`}>
      <Icon name="left" strokeWidth={2.2} />
      {label}
    </span>
  );
}

/* ---------- Travel prep: deadlines on a timeline ---------- */
export function Prep() {
  const P = S.prep;
  return (
    <>
      <div className={f.subhead}>
        <Back label={P.back} />
      </div>
      <p className={f.subttl}>{P.title}</p>
      <p className={f.tvSub}>{P.sub}</p>
      <ol className={s.tl}>
        {P.items.map((x, i) => (
          <li key={x.title} className={s.tli} style={{ "--c": x.color, "--i": i } as CSSProperties}>
            <div className={s.r1}>
              <b>{x.title}</b>
              <span className={s.due}>{x.due}</span>
            </div>
            <p>{x.body}</p>
            <div className={s.r2}>
              <Avs who={x.who} />
              <span className={s.cal}>
                {P.calendar}
                <i className={s.toggle} data-on={x.on || undefined} />
              </span>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ---------- Trip journal: a card per trip ---------- */
export function Journal() {
  const J = S.journal;
  return (
    <>
      <div className={f.subhead}>
        <Back label={J.back} />
        <span className={`${f.iconBtn} ${s.addBtn}`}>
          <Icon name="plus" strokeWidth={2.2} />
        </span>
      </div>
      <p className={f.subttl}>{J.title}</p>
      <p className={`${f.tvSub} ${s.jSub}`}>{J.sub}</p>
      {J.entries.map((j, i) => (
        <div key={j.title} className={s.jr} style={{ "--i": i } as CSSProperties}>
          <div className={s.cover}>
            <Image src={`/app/proto/${j.photo}.jpg`} alt="" fill sizes="320px" className={s.coverImg} />
            <div className={s.cap}>
              <b>{j.title}</b>
              <span>{j.when}</span>
            </div>
          </div>
          <div className={s.jBody}>
            <q>“{j.quote}”</q>
            <div className={s.by}>{j.by}</div>
            <div className={s.strip}>
              {j.strip.map((ph) => (
                <Image key={ph} src={`/app/proto/${ph}.jpg`} alt="" width={124} height={124} />
              ))}
              <span className={s.more}>+{j.photos - j.strip.length}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
