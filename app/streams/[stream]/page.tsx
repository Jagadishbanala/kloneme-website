import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Can from "@/components/travel/Can";
import Glance from "@/components/travel/Glance";
import Next from "@/components/travel/Next";
import TravelHero from "@/components/travel/TravelHero";
import s from "@/components/travel/travel.module.css";
import { STREAM_PAGE_KEYS, streamPages } from "@/content/streamPages";
import type { StreamKey } from "@/content/streams";

type Params = { params: Promise<{ stream: string }> };

// One page per stream (/streams/travel, /streams/family …), all built at build time; any other
// name is a 404
export function generateStaticParams() {
  return STREAM_PAGE_KEYS.map((stream) => ({ stream }));
}

const pageFor = (stream: string) => streamPages[stream as StreamKey];

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = pageFor((await params).stream);
  if (!page) return {};
  return { title: `${page.name} · KloneME`, description: page.hero.sub };
}

// A stream's own page: hero, the photo band, "What you can do" and the next stream, in the stream's
// colours (its card's colour and shades, set here as CSS variables)
export default async function StreamPage({ params }: Params) {
  const page = pageFor((await params).stream);
  if (!page) notFound();
  const t = page.theme;
  return (
    <div
      className={s.page}
      style={{ "--tv": t.color, "--tv-top": t.top, "--tv-mid": t.mid, "--tv-low": t.low, "--tv-glow": t.glow } as CSSProperties}
    >
      <Header home="/" />
      <main>
        <TravelHero page={page} />
        <Glance page={page} />
        <Can page={page} />
        <Next page={page} />
      </main>
      <Footer home="/" />
    </div>
  );
}
