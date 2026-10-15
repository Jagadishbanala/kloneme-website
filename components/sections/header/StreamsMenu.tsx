"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Icon } from "@/components/ui/Icon";
import { nav } from "@/content/site";
import { streams, type StreamKey } from "@/content/streams";
import s from "./menu.module.css";

const M = nav.streams;
const STREAMS = streams.cards;
const PANEL_ID = "streams-menu";

// Solid icons, one colour (the stream's), each with its own small motion. White marks are cut-outs.
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
        <circle cx="11.4" cy="11.2" r="1.5" fill="#fff" />
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

// A white tile with the stream's solid icon (the client's reference: a filled blue bank on a white tile)
function StreamIcon({ name }: { name: StreamKey }) {
  return (
    <span className={`${s.icon} ${s.tile}`} data-g={name} aria-hidden="true">
      <svg viewBox="0 0 24 24">{GLYPHS[name]}</svg>
    </span>
  );
}

// Opens on hover (mouse) or click / tap / keyboard; closes on leave, Esc, an outside click or tabbing away
export function useStreamsMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const timer = useRef(0);
  const hoverOpenedAt = useRef(0);
  const focusFirst = useRef(false);

  const clear = () => window.clearTimeout(timer.current);
  const later = (next: boolean, ms: number) => {
    clear();
    timer.current = window.setTimeout(() => {
      setOpen(next);
      if (next) hoverOpenedAt.current = Date.now();
    }, ms);
  };
  const close = useCallback((refocus = false) => {
    window.clearTimeout(timer.current);
    setOpen(false);
    if (refocus) opener.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const down = (e: globalThis.PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) close();
    };
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open, close]);

  // Opened with the keyboard (arrow down): focus the first stream
  useEffect(() => {
    if (open && focusFirst.current) {
      focusFirst.current = false;
      panel.current?.querySelector<HTMLAnchorElement>("a[data-item]")?.focus();
    }
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const trigger = {
    "aria-expanded": open,
    "aria-controls": PANEL_ID,
    onPointerEnter: (e: PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType !== "mouse") return;
      opener.current = e.currentTarget;
      later(true, 60);
    },
    onPointerLeave: (e: PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType === "mouse") later(false, 220);
    },
    onClick: (e: MouseEvent<HTMLButtonElement>) => {
      opener.current = e.currentTarget;
      clear();
      // A click right after hover opened it keeps it open instead of closing it again
      if (open && Date.now() - hoverOpenedAt.current < 600) return;
      setOpen((o) => !o);
    },
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key !== "ArrowDown") return;
      e.preventDefault();
      opener.current = e.currentTarget;
      focusFirst.current = true;
      if (open) panel.current?.querySelector<HTMLAnchorElement>("a[data-item]")?.focus();
      else setOpen(true);
    },
  };

  const panelProps = {
    onPointerEnter: (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse") clear();
    },
    onPointerLeave: (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse") later(false, 220);
    },
    // Arrow keys move between the streams (two columns when the grid has two)
    onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
      const items = [...(panel.current?.querySelectorAll<HTMLAnchorElement>("a[data-item]") ?? [])];
      const at = items.indexOf(document.activeElement as HTMLAnchorElement);
      if (at < 0) return;
      const cols = window.matchMedia("(min-width: 640px)").matches ? 2 : 1;
      const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
      let next = step === undefined ? -1 : at + step;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = items.length - 1;
      if (next < 0 || next >= items.length) {
        if (e.key === "ArrowUp" && at < cols) {
          e.preventDefault();
          opener.current?.focus();
        }
        return;
      }
      e.preventDefault();
      items[next].focus();
    },
  };

  // Tabbing out of the header closes it (clicks are handled by the outside-click listener)
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    const to = e.relatedTarget as Node | null;
    if (open && to && !e.currentTarget.contains(to)) close();
  };

  return { open, wrap, panel, trigger, panelProps, onBlur, close };
}

type Menu = ReturnType<typeof useStreamsMenu>;

function Chevron() {
  return (
    <svg className={s.chev} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

// The six streams as dots in their colours, two by three
function Dots() {
  return (
    <svg viewBox="0 0 15 21" aria-hidden="true">
      {STREAMS.map((c, i) => (
        <circle key={c.key} cx={i % 2 ? 11.5 : 3.5} cy={3.5 + Math.floor(i / 2) * 7} r={2.9} style={{ fill: c.color }} />
      ))}
    </svg>
  );
}

// "Streams" in the header's link row (tablets and up)
export function StreamsTrigger({ menu }: { menu: Menu }) {
  return (
    <button
      type="button"
      {...menu.trigger}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-[14px] font-medium transition-colors ${
        menu.open ? "bg-white/80 text-ink shadow-[inset_0_0_0_1px_rgba(31,41,55,0.06)]" : "text-muted hover:text-ink"
      }`}
    >
      {M.label}
      <Chevron />
    </button>
  );
}

// Phones: a round button with the six stream colours, beside "Contact us"
export function StreamsDotsTrigger({ menu }: { menu: Menu }) {
  return (
    <button type="button" {...menu.trigger} aria-label={M.label} className={s.dotsBtn}>
      <Dots />
    </button>
  );
}

export function StreamsPanel({ menu, home }: { menu: Menu; home: string }) {
  const path = usePathname();
  return (
    <div
      ref={menu.panel}
      id={PANEL_ID}
      className={s.panel}
      data-open={menu.open || undefined}
      {...menu.panelProps}
    >
      <ul className={s.grid} aria-label={M.menuLabel}>
        {STREAMS.map((c, i) => {
          const page = M.pages[c.key];
          const href = page ?? `${home}${M.section}`;
          return (
            <li key={c.key}>
              <a
                href={href}
                data-item=""
                className={s.item}
                aria-current={page && path === page ? "page" : undefined}
                onClick={() => menu.close()}
                style={{ "--c": c.color, "--i": i, "--gd": `${(-i * 0.8).toFixed(1)}s` } as CSSProperties}
              >
                <StreamIcon name={c.key} />
                <span className={s.text}>
                  <b className={s.name}>{c.name}</b>
                  <span className={s.slogan}>{M.slogans[c.key]}</span>
                </span>
                <Icon name="arrow" className={s.go} strokeWidth={2} />
              </a>
            </li>
          );
        })}
      </ul>
      <div className={s.foot}>
        <span className={s.line}>
          <Dots />
          {M.line}
        </span>
        <a href={`${home}${M.section}`} className={s.all} onClick={() => menu.close()}>
          {M.all}
          <Icon name="arrow" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
