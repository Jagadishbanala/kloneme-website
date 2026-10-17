"use client";
import { useEffect, useRef, useState, type CSSProperties, type JSX } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMedia } from "@/components/ui/useMedia";
import type { StreamPage } from "@/content/streamPages";
import f from "../sections/features/features.module.css";
import { StatusBar } from "../sections/hero/PhoneDemo";
import p from "../sections/hero/phone.module.css";
import { SCREEN_FLOW } from "../streams/flow";
import DrawerScene from "./DrawerScene";
import s from "./travel.module.css";

// The dotted flight route over the clouds (viewBox 1200 × 560), like the one on the Travel stream card
const ROUTE = "M 40 520 C 250 300, 470 90, 720 80 S 1030 210, 1120 150";

const clamp = (n: number) => Math.min(1, Math.max(0, n));
// A box whose words would run too wide for one line
const long = (c: { value: string; label: string }) => c.value.length + c.label.length > 36;

// The home hero's phone frame (client 2026-10-15), facing straight ahead (no turn): the blue-silver
// body, its thickness made of outlines stacked behind the face (as many as on the home page)
const LAYERS = 16;

export default function HeroStage({ page }: { page: StreamPage }) {
  const H = page.hero;
  // The stream's app screens, in order (Travel: its home, Travel prep and Trip journal)
  const FLOW = page.flow.map((id) => SCREEN_FLOW[id]);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const narrow = useMedia("(max-width: 767px)");
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
        {/* The window: a travel clip behind the phone, with the dotted route and a plane flying it (or,
            for Vault, an illustrated scene in place of the clip) */}
        <div className={s.window} aria-hidden="true">
          {H.scene === "drawer" ? (
            <DrawerScene narrow={narrow} paused={!visible} />
          ) : (
          <video
            ref={video}
            className={s.video}
            data-flip={H.video.flip || undefined}
            style={"pos" in H.video && H.video.pos ? { objectPosition: H.video.pos } : undefined}
            src={H.video.src}
            poster={H.video.poster}
            muted
            loop
            playsInline
            preload="auto"
          />
          )}
          <span className={s.tint} />
          {page.route && (
          <svg className={s.route} viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" focusable="false">
            <path
              d={ROUTE}
              className={s.dash}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 14"
            />
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
          )}
        </div>

        {/* The phone, its lower part cut by the window's bottom edge */}
        <div className={s.phoneLayer}>
          <div className={s.phoneAt}>
            <div className={s.phoneIn}>
              <div className={p.device} role="img" aria-label={`${H.phoneLabel}: ${FLOW[idx].label}`}>
                {Array.from({ length: LAYERS }, (_, i) => (
                  <span
                    key={i}
                    className={`${p.layer} ${i === LAYERS - 1 ? p.layerBack : ""}`}
                    style={{ "--z": i + 1, "--hi": Math.sin((Math.PI * i) / (LAYERS - 1)).toFixed(2) } as CSSProperties}
                  />
                ))}
                <span className={`${p.sideBtn} ${p.sideBtnA}`} />
                <span className={`${p.sideBtn} ${p.sideBtnB}`} />
                <div className={p.face}>
                  <div className={p.bezel}>
                    <div className={`${p.screen} ${s.screen}`} data-light={!FLOW[idx].dark || undefined}>
                      <span className={p.notch}>
                        <i className={p.earpiece} />
                        <i className={p.cam} />
                      </span>
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
          </div>
        </div>

        {/* Floating boxes around the phone: right, high (Travel: countries); left, low (trips this
            year, with a ring of done / total); right, low (the next trip). Each can bring its own icon;
            a long one (Vault's) wraps onto two lines. */}
        <div className={s.chips}>
          <p className={`${s.chip} ${s.count}`} data-long={long(H.chips.countries) || undefined}>
            <span className={s.chipIc} aria-hidden="true">
              <Icon name={H.chips.countries.icon ?? "plane"} strokeWidth={2} />
            </span>
            <span>
              <b>{H.chips.countries.value}</b> {H.chips.countries.label}
            </span>
          </p>
          <p className={`${s.chip} ${s.trips}`} data-long={long(H.chips.trips) || undefined}>
            <span className={s.chipIc} aria-hidden="true">
              {H.chips.trips.done != null && H.chips.trips.total != null ? (
                <svg viewBox="0 0 38 38" className={s.tripRing}>
                  <circle cx="19" cy="19" r="12" />
                  <circle cx="19" cy="19" r="12" pathLength={H.chips.trips.total} strokeDasharray={`${H.chips.trips.done} ${H.chips.trips.total}`} />
                </svg>
              ) : (
                <Icon name={H.chips.trips.icon ?? "cal"} strokeWidth={2} />
              )}
            </span>
            <span>
              <b>{H.chips.trips.value}</b> {H.chips.trips.label}
            </span>
          </p>
          <p className={`${s.chip} ${s.next}`} data-long={long(H.chips.next) || undefined}>
            <span className={s.chipIc} aria-hidden="true">
              <Icon name={H.chips.next.icon ?? "cal"} strokeWidth={2} />
            </span>
            <span>
              <b>{H.chips.next.value}</b> {H.chips.next.label}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
