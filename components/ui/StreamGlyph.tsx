import type { ReactNode } from "react";
import type { StreamKey } from "@/content/streams";
import s from "./streamGlyph.module.css";

// The six streams' animated glyphs (first made for the header's Streams dropdown, 2026-10-15).
// --c: the stream's colour; --gd: a delay, so glyphs side by side don't move in step.
// tone "solid": the glyph in the stream's colour with white cut-outs (on a white tile);
// tone "white": the glyph in white with cut-outs in the stream's colour (on a disc of that colour).
const GLYPHS: Record<StreamKey, ReactNode> = {
  // Family: the second person bobs up beside the first
  family: (
    <>
      <g className={s.back}>
        <circle cx="16.6" cy="8.4" r="2.9" />
        <path d="M14.7 13.4c3.2-.5 6.3 1.5 6.8 5.1a.9.9 0 01-.9 1h-3.3c-.3-2.4-1.2-4.5-2.6-6.1z" />
      </g>
      <circle cx="9" cy="8" r="3.6" />
      <path d="M2.6 19.2C3.1 15.6 5.7 13.4 9 13.4s5.9 2.2 6.4 5.8a.9.9 0 01-.9 1H3.5a.9.9 0 01-.9-1z" />
    </>
  ),
  // Health: it beats, and a pulse runs through it
  health: (
    <g className={s.beat}>
      <path d="M12 20.6s-8.4-4.7-8.4-11A4.7 4.7 0 0112 6.9a4.7 4.7 0 018.4 2.7c0 6.3-8.4 11-8.4 11z" />
      <path className={s.pulse} pathLength={1} d="M6.6 12.4h2.6l1.3-2.4 2.1 4.6 1.4-2.2h3.4" />
    </g>
  ),
  // Wealth: the coin flips
  wealth: (
    <g className={s.flip}>
      <circle cx="12" cy="12" r="9" />
      <path
        className={s.cut}
        d="M14.6 9.3c-.5-.9-1.5-1.4-2.6-1.4-1.5 0-2.6.8-2.6 2s1 1.7 2.7 2.1 2.8.9 2.8 2.2-1.2 2.1-2.8 2.1c-1.2 0-2.3-.6-2.8-1.5M12 6.6v10.8"
      />
    </g>
  ),
  // Vault: the dial turns like a combination lock
  vault: (
    <>
      <rect x="3" y="3.5" width="18" height="15.5" rx="3" />
      <path d="M6 18.5h3v2.1a.9.9 0 01-.9.9H6.9a.9.9 0 01-.9-.9zM15 18.5h3v2.1a.9.9 0 01-.9.9h-1.2a.9.9 0 01-.9-.9z" />
      <path className={s.cut} d="M18 9.4v3.6" />
      <g className={s.dial}>
        <circle className={s.cut} cx="11.4" cy="11.2" r="4.1" />
        <circle className={s.dot} cx="11.4" cy="11.2" r="1.5" fill="#fff" />
        <path className={s.cut} d="M11.4 7.1v1.8" />
      </g>
    </>
  ),
  // Travel: the plane takes off out of the tile and lands back in, a trail behind it
  travel: (
    <>
      <path className={s.trail} pathLength={1} d="M3 21l3.5-3.5M6.5 21.5l2-2" />
      <path
        className={s.fly}
        d="M10.5 13.5L4 11l1.5-1.5 7 .5 4-4c1-1 2.8-1.3 3.4-.7s.3 2.4-.7 3.4l-4 4 .5 7L14.2 21l-2.5-6.5-3.2 3.2.3 2.3-1.3 1.3-1.8-3.4-3.4-1.8 1.3-1.3 2.3.3z"
      />
    </>
  ),
  // Hobbies: the brush sways and paints a stroke
  hobbies: (
    <>
      <path className={s.paint} pathLength={1} d="M3.5 21.4c3-.4 6-.6 9.5-.3" />
      <g className={s.wiggle}>
        <path className={s.handle} d="M19.8 4.2l-7.3 7.3" />
        <path className={s.ferrule} d="M10.6 10.2l3.2 3.2-1.7 1.7-3.2-3.2z" />
        <path d="M8.1 12.4c-2.4 0-3.8 1.6-3.8 3.8 0 1.6-.6 2.8-1.6 3.6 3.4.6 6.7-.4 7.5-3.2z" />
      </g>
    </>
  ),
};

export function StreamGlyph({ name, tone = "solid", className }: { name: StreamKey; tone?: "solid" | "white"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${s.glyph} ${className ?? ""}`} data-tone={tone} aria-hidden="true" focusable="false">
      {GLYPHS[name]}
    </svg>
  );
}
