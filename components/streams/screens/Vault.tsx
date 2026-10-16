import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import f from "@/components/sections/features/features.module.css";
import { people } from "@/content/features";
import { vaultScreen } from "@/content/screens/vault";
import s from "./vault.module.css";

// The Vault's "Access & sharing" screen, rebuilt from the client's prototype (kloneme-prototype.html,
// view "v-access"). Sizes are prototype pixels × --k (set by the Features .scr), like the other app screens.

const V = vaultScreen;

function Av({ label, color }: { label: string; color: string }) {
  return (
    <span className={`${f.av} ${s.av}`} style={{ "--ac": color } as CSSProperties}>
      {label}
    </span>
  );
}

export function VaultAccess() {
  return (
    <>
      <div className={f.subhead}>
        <span className={`${f.backBtn} ${s.back}`}>
          <Icon name="left" strokeWidth={2.2} />
          {V.back}
        </span>
      </div>
      <p className={f.subttl}>{V.title}</p>
      <p className={s.sub}>{V.sub}</p>

      {/* Requests: someone asks to see a document; you pick how long and approve */}
      <p className={s.h}>{V.requestsLabel}</p>
      {V.requests.map((r) => (
        <div key={r.title} className={s.req}>
          <div className={s.r1}>
            <Av label={people[r.who].name[0]} color={people[r.who].color} />
            <span className={s.t}>
              <b>{r.title}</b>
              <span>{r.why}</span>
            </span>
          </div>
          <div className={s.dur}>
            {r.durations.map((d, i) => (
              <span key={d} data-on={i === r.selected || undefined}>
                {d}
              </span>
            ))}
          </div>
          <div className={s.acts}>
            <span>{r.decline}</span>
            <span className={s.pri}>{r.approve}</span>
          </div>
        </div>
      ))}

      {/* Shared right now, each with its time left and a way to take it back */}
      <p className={s.h}>{V.sharedLabel}</p>
      {V.shared.map((x, i) => (
        <div key={x.doc} className={s.shr} style={{ "--i": i + 1 } as CSSProperties}>
          {x.who ? (
            <Av label={people[x.who].name[0]} color={people[x.who].color} />
          ) : (
            <Av label={x.initials ?? x.with[0]} color={x.color ?? "#0aa8d9"} />
          )}
          <span className={s.t}>
            <b>{x.doc}</b>
            <span>{x.with}</span>
          </span>
          <span className={s.exp}>{x.expires}</span>
          <span className={s.rv}>{V.revoke}</span>
        </div>
      ))}

      {/* Recent activity: the audit trail */}
      <p className={s.h}>{V.activityLabel}</p>
      <div className={s.audit}>
        {V.activity.map((a, i) => (
          <p key={a.text} className={s.au} style={{ "--c": a.color, "--i": i + 3 } as CSSProperties}>
            {a.text}
            <span>{a.when}</span>
          </p>
        ))}
      </div>
    </>
  );
}
