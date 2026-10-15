"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type JSX } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import { features } from "@/content/features";
import { travel } from "@/content/travel";
import { SCREENS } from "../sections/features/Screens";
import f from "../sections/features/features.module.css";
import { StatusBar } from "../sections/hero/PhoneDemo";
import p from "../sections/hero/phone.module.css";
import { Journal, Prep } from "./Screens";
import s from "./travel.module.css";

const H = travel.hero;

// The phone's screens in order: the Travel home (shared with the Features section), then Travel prep
// and Trip journal. hold = seconds on screen.
const FLOW: { label: string; Screen: () => JSX.Element; cls: string; hold: number }[] = [
  { label: features.screens.travel.label, Screen: SCREENS.travel, cls: f.travel, hold: 4.8 },
  { label: travel.screens.prep.title, Screen: Prep, cls: s.dark, hold: 4.2 },
  { label: travel.screens.journal.title, Screen: Journal, cls: s.dark, hold: 4.2 },
];

// The dotted flight route over the clouds (viewBox 1200 × 560), like the one on the Travel stream card
const ROUTE = "M 40 520 C 250 300, 470 90, 720 80 S 1030 210, 1120 150";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

export default function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  // Scroll: --p runs 0 → 1 while the stage moves up to the middle of the screen. The window opens from
  // the page's side padding to the full width and loses its rounded corners; the phone stays in place
  // and grows a little.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (still) {
      el.style.setProperty("--p", "0");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = Math.max(16, (window.innerHeight - el.offsetHeight) / 2);
      const end = el.getBoundingClientRect().top + window.scrollY - mid;
      el.style.setProperty("--p", clamp(window.scrollY / Math.max(1, end)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [still]);

  // The video and the phone only play while the stage is on screen
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Muted inline playback; with reduced motion the clip stays on its first frame
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    if (still || !visible) v.pause();
    else v.play().catch(() => {});
  }, [still, visible]);

  // The phone moves on to the next screen by itself
  useEffect(() => {
    if (still || !visible) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % FLOW.length), FLOW[idx].hold * 1000);
    return () => clearTimeout(t);
  }, [idx, still, visible]);

  // The next screen waits on the right, the others leave to the left
  const pos = (i: number) => (i === idx ? "on" : i === (idx + 1) % FLOW.length ? "next" : "past");

  return (
    <div className={s.run}>
      <div ref={stage} className={s.stage} data-paused={!visible || undefined}>
        {/* The window: a travel clip behind the phone, with the dotted route and a plane flying it */}
        <div className={s.window} aria-hidden="true">
          <video ref={video} className={s.video} src={H.video.src} poster={H.video.poster} muted loop playsInline preload="auto" />
          <span className={s.tint} />
          <svg className={s.route} viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" focusable="false">
            <path d={ROUTE} className={s.dash} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 14" />
            <g transform="translate(1120 150)">
              <circle className={s.halo} r="16" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle r="8" fill="currentColor" />
              <circle r="3.4" fill="var(--tv)" />
            </g>
            <g transform={still ? "translate(720 80)" : undefined}>
              {/* Paper plane pointing along +x, so rotate="auto" turns it with the route */}
              <path d="M22 0L-16 -15L-8 0L-16 15Z" fill="currentColor" />
              {!still && <animateMotion dur="11s" repeatCount="indefinite" rotate="auto" path={ROUTE} />}
            </g>
          </svg>
        </div>

        {/* The phone, its lower part cut by the window's bottom edge */}
        <div className={s.phoneLayer}>
          <div className={s.phoneAt}>
            <div className={s.phoneIn}>
              <div className={p.phone} role="img" aria-label={`${H.phoneLabel}: ${FLOW[idx].label}`}>
                <span className={`${p.btn} ${p.btnA}`} />
                <span className={`${p.btn} ${p.btnB}`} />
                <span className={`${p.btn} ${p.btnC}`} />
                <div className={`${p.screen} ${s.screen}`}>
                  <span className={p.island} />
                  <StatusBar />
                  {FLOW.map(({ label, Screen, cls }, i) => (
                    <div key={label} className={`${f.scr} ${cls}`} data-pos={pos(i)} aria-hidden="true">
                      <Screen />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating chips: Klonie's note (left) and the countries count (right) */}
        <div className={s.chips}>
          <div className={`${s.chip} ${s.says}`}>
            <Image src="/klo/surprised.png" alt="" width={528} height={456} sizes="52px" className={s.klonie} />
            <p>
              <b>{H.says.label}</b>
              {H.says.lead} {H.says.rest}
            </p>
          </div>
          <div className={`${s.chip} ${s.count}`} aria-hidden="true">
            <span className={s.chipIc}>
              <Icon name="plane" strokeWidth={2} />
            </span>
            <span>
              <b>{H.chip.value}</b> {H.chip.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
