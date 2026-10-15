import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { hero, type FlowItem } from "@/content/hero";
import { site } from "@/content/site";
import { streams, type StreamKey } from "@/content/streams";
import s from "./hero.module.css";

// Each stream's name, icon, colour and Klonie expression (same as the Streams cards)
const STREAM = Object.fromEntries(streams.cards.map((c) => [c.key, c])) as Record<StreamKey, (typeof streams.cards)[number]>;

// Lime is too light for an icon on white
const readable = (color: string) => (color === "var(--lime)" ? "#5f8f0f" : color);

// What goes in on the left: the challenge, with its stream's icon
function Challenge({ item }: { item: FlowItem }) {
  const st = STREAM[item.stream];
  return (
    <div className={s.chipBody} style={{ "--c": readable(st.color) } as CSSProperties}>
      <span className={s.chipIcon}>
        <Icon name={st.icon} className="size-[18px]" strokeWidth={1.9} />
      </span>
      <span className={s.chipLabel}>{item.challenge}</span>
    </div>
  );
}

// What comes out on the right: its solution, handled by KloneME. Klonie for that stream,
// the solution, and the KloneME mark with the stream's name.
function Solved({ item }: { item: FlowItem }) {
  const st = STREAM[item.stream];
  return (
    <div className={s.solved}>
      <Image src={`/klo/${st.expression}.png`} alt="" width={528} height={456} sizes="70px" className={s.solvedKlo} />
      <span className={s.solvedText}>
        <b>{item.solution}</b>
        <span className={s.solvedTag}>
          <Image src={site.mark.src} alt="" width={site.mark.width} height={site.mark.height} sizes="20px" />
          {st.name}
        </span>
      </span>
    </div>
  );
}

// Items travel one after another: left edge → along the lines → behind the phone → out to the right.
// Behind the phone (the middle of the crossing) each challenge swaps its face for its solution.
export default function Flow() {
  const { cycle, items } = hero.flow;
  return (
    <div className={s.flow} aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={i}
          className={s.flowItem}
          style={
            {
              "--lane": `${item.lane}px`,
              "--dur": `${cycle}s`,
              "--delay": `${(-(i * cycle) / items.length).toFixed(2)}s`,
            } as CSSProperties
          }
        >
          <div className={s.flowBody}>
            <div className={s.faceIn}>
              <Challenge item={item} />
            </div>
            <div className={s.faceOut}>
              <Solved item={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
