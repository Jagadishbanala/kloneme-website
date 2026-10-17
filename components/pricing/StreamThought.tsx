"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { StreamGlyph } from "@/components/ui/StreamGlyph";
import { useMedia } from "@/components/ui/useMedia";
import { nav } from "@/content/site";
import { streams } from "@/content/streams";
import t from "./thought.module.css";

// The Pricing page's closing panel, on the right (client 2026-10-17: "the KME avatar with the 6
// streams"; minimal and smooth; "don't put the icons in the face, put them outside, maybe the left
// side top, according to their names"). Klonie, thinking of each stream in turn: the stream's glyph
// on the header menu's white tile, floating at Klonie's top left with two small thought dots leading
// to its head. Every few seconds the next stream's tile floats out of Klonie's head into place as the
// last fades, Klonie takes that stream's face (the Twin section's pairing), the light behind it takes
// the stream's colour, and under it the dot for the stream stretches into a pill over its name and
// slogan. Hovering a dot shows that stream. Still with reduced motion; paused off screen.
const CARDS = streams.cards;
const FACES = [...new Set(CARDS.map((c) => c.expression))];
const EVERY = 2600; // ms each stream shows

export default function StreamThought() {
  const box = useRef<HTMLDivElement>(null);
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(false);
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still || !visible || held) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % CARDS.length), EVERY);
    return () => clearInterval(id);
  }, [still, visible, held]);

  const c = CARDS[i];

  return (
    <div ref={box} className={t.box} aria-hidden="true">
      {/* A soft light behind Klonie in the colour of the stream it's thinking of */}
      {CARDS.map((s, n) => (
        <span key={s.key} className={t.glow} data-on={n === i || undefined} style={{ "--c": s.color } as CSSProperties} />
      ))}

      {/* The thought: the stream's tile at the top left, two small dots leading to Klonie's head */}
      <span className={t.thought}>
        {CARDS.map((s, n) => (
          <span
            key={s.key}
            className={t.tile}
            data-on={n === i || undefined}
            style={{ "--c": s.color, "--gd": `${(-n * 0.8).toFixed(1)}s` } as CSSProperties}
          >
            <StreamGlyph name={s.key} />
          </span>
        ))}
      </span>
      <i className={`${t.puff} ${t.puffA}`} />
      <i className={`${t.puff} ${t.puffB}`} />

      <span className={t.klonie}>
        {FACES.map((face) => (
          <Image
            key={face}
            src={`/klo/${face}.png`}
            alt=""
            width={528}
            height={456}
            sizes="(max-width: 720px) 180px, 230px"
            className={t.face}
            data-on={c.expression === face || undefined}
          />
        ))}
      </span>

      {/* Six dots, the stream that's showing a pill; hovering one shows it */}
      <span className={t.dots} onPointerLeave={() => setHeld(false)}>
        {CARDS.map((s, n) => (
          <i
            key={s.key}
            data-on={n === i || undefined}
            style={{ "--c": s.color } as CSSProperties}
            onPointerEnter={() => {
              setHeld(true);
              setI(n);
            }}
          />
        ))}
      </span>

      <span className={t.tags}>
        {CARDS.map((s, n) => (
          <span key={s.key} className={t.tag} data-on={n === i || undefined}>
            <b>{s.name}</b>
            <span>{nav.streams.slogans[s.key]}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
