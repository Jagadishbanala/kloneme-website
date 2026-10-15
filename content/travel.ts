import type { IconName } from "@/components/ui/Icon";
import type { Member } from "@/content/features";

// The Travel stream's own page (/streams/travel). Copy from kloneme-website-v11.html (its Travel stream
// page); the phone screens from the client's prototype (kloneme-prototype.html). v11 and the prototype
// call the companion "Klone"; it is "Klonie" here, as everywhere on the site.

export const travel = {
  name: "Travel",
  motto: "Plan. Share. Celebrate.",

  // Section 1: the hero
  hero: {
    // The heading in v11 is "Every trip, from dream to memory." Split into the three lines it shows on
    // wide screens; the last word is the accent.
    lines: ["Every trip,", "from dream", "to"],
    accent: "memory.",
    sub: "A bucket list with dates, the paperwork handled in between, and a journal of every place you’ve been.",
    stats: [
      { value: "12", label: "countries visited" },
      { value: "4 of 6", label: "trips done in 2026" },
      { value: "Nov 14", label: "Big Sur & Carmel" },
    ],
    // v11's "Klone says" card
    says: { label: "Klonie says", lead: "Renew Leo’s passport by Oct 20.", rest: "It expires before the Morocco trip." },
    // The second floating chip (the first stat)
    chip: { value: "12", label: "countries visited" },
    phoneLabel: "The Travel stream in the KloneME app",
    // Free stock clip from Mixkit (mixkit.co, video 12977 "Aerial view of hot air balloon over Turkish
    // landscape", Mixkit License): Cappadocia, which is on the sample family’s bucket list
    video: { src: "/travel/balloon.mp4", poster: "/travel/balloon-poster.jpg" },
  },

  // The phone's Travel screens, after the Travel home (which is shared with the Features section)
  screens: {
    prep: {
      back: "Travel",
      title: "Travel prep",
      sub: "Deadlines sync to the family calendar",
      calendar: "Family calendar",
      items: [
        {
          title: "Renew Leo’s passport",
          body: "Expires 14 Dec 2026 — before the Morocco trip in March. Routine processing takes 4–6 weeks.",
          due: "Due 20 Oct",
          color: "#ff5a4e",
          who: ["L"],
          on: true,
        },
        {
          title: "Global Entry interview",
          body: "Daniel · SFO enrollment center · bring passport and conditional approval letter.",
          due: "8 Oct",
          color: "#ffd400",
          who: ["D"],
          on: true,
        },
        {
          title: "Morocco — entry requirements",
          body: "Check entry rules for all four passports 60 days before departure.",
          due: "1 Jan",
          color: "#ffd400",
          who: ["M", "D", "A", "L"],
          on: true,
        },
        {
          title: "Travel insurance for Morocco",
          body: "Family policy; add trip cancellation once flights are booked.",
          due: "1 Feb",
          color: "#8ad3a8",
          who: ["M"],
          on: false,
        },
      ] satisfies { title: string; body: string; due: string; color: string; who: Member[]; on: boolean }[],
    },
    journal: {
      back: "Travel",
      title: "Trip journal",
      sub: "Memories from 3 trips",
      entries: [
        {
          photo: "reykjavik",
          title: "Iceland Ring Road",
          when: "14–22 Jun 2026 · 8 nights",
          quote:
            "We saw the sun at midnight and Leo refused to go to bed. Seljalandsfoss from behind the water is the best thing we’ve done as a family.",
          by: "Maya · 42 photos · 6 entries",
          photos: 42,
          strip: ["reykjavik", "norway", "banff"],
        },
        {
          photo: "kyoto",
          title: "Spring in Kyoto",
          when: "2–11 Apr 2025 · 9 nights",
          quote: "Come back for the blossoms. Next time: Philosopher’s Path at 6 am, before the crowds.",
          by: "Maya · 88 photos · 11 entries",
          photos: 88,
          strip: ["kyoto", "tokyo", "seoul"],
        },
      ],
    },
  },

  // Section 2: "Travel, at a glance." v11's heading; 10 photo cards in two wings of the client's Bevel
  // reference (the four tall middle photos removed, client 2026-10-15), with v11's places (Amalfi Coast,
  // Machu Picchu, Sydney, Paris) and more from the prototype.
  // Each card's back is a different kind of detail (client 2026-10-15: "not every card heavy… every
  // detail should not feel the same"): one full boarding pass (Banff), a bucket-list checklist, a
  // savings ring, a passport stamp, a one-line quote, one big number, one big word, a calendar page, a
  // reminder and a goal bar, in four colours (white, the pale sky tint, sky and ink). The details are
  // the prototype's sample family (the Carters of Oakland); money only where the prototype has it (the
  // Morocco fund). Photos: Unsplash (Unsplash License), public/travel/places/.
  glance: {
    heading: { lead: "Travel,", accent: "at a glance." },
    // DRAFT placeholder under the heading (client asked for dummy text here, 2026-10-15); replace with
    // the client's copy when it arrives
    sub: "Every trip you’ve taken and every one you’re still dreaming of, side by side. Flip a photo to see the dates, who went and what’s next.",
    cards: {
      // Rich: the one full boarding pass
      banff: {
        kind: "pass",
        name: "Banff",
        tag: "Visited",
        rating: 5,
        from: ["OAK", "Oakland"],
        to: ["YYC", "Calgary"],
        title: "Banff & Lake Louise",
        rows: [["When", "Aug 2025"], ["Nights", "5"]],
        who: ["M", "D", "A", "L"],
      },
      // Bucket list: progress and the steps to get there (ink, for the night sky)
      norway: {
        kind: "checklist",
        tone: "ink",
        name: "Northern Lights",
        tag: "Bucket list",
        place: "Tromsø, Norway · Feb 2027",
        bar: 55,
        steps: [["Dates picked", true], ["Fund started", true], ["Book the cabin", false]],
        who: ["M", "D"],
      },
      // The next trip's fund as a ring (ink)
      morocco: {
        kind: "ring",
        tone: "ink",
        name: "Morocco",
        tag: "Next trip · March",
        saved: "$6,200",
        of: "of $9,000",
        bar: 69,
        note: "About $467 a month gets you there by March.",
      },
      // Minimal: a passport stamp (and Lisbon's, faint, from the same trip)
      paris: {
        kind: "stamp",
        name: "Paris",
        place: "France",
        date: "Oct 2023",
        meta: "3 nights",
        rating: 4,
        also: "Lisbon",
      },
      // Minimal: one line from the journal (tint)
      amalfi: {
        kind: "quote",
        tone: "tint",
        name: "Amalfi Coast",
        quote: "Lemon everything.",
        by: "Maya, anniversary week in Positano",
        rating: 5,
      },
      // Minimal: one big number (sky)
      sydney: {
        kind: "big",
        tone: "sky",
        name: "Sydney",
        kicker: "Sydney · Feb 2024",
        value: "6",
        unit: "nights",
        line: "Daniel’s conference trip, with a day at Bondi.",
      },
      // Minimal: one big word (tint)
      maldives: {
        kind: "big",
        tone: "tint",
        name: "Maldives",
        kicker: "Bucket list · Maldives",
        value: "Someday.",
        line: "Maya & Daniel’s dream trip. Next step: start the fund.",
      },
      // A calendar page for the weekend that's planned
      bigsur: {
        kind: "cal",
        name: "Big Sur & Carmel",
        tag: "Planned",
        month: "Nov",
        day: "14",
        meta: "2 nights · 2.5 h drive",
      },
      // A reminder (ink)
      machupicchu: {
        kind: "reminder",
        tone: "ink",
        name: "Machu Picchu",
        title: "Inca Trail permits open in October",
        meta: "Machu Picchu, Peru · 2028",
        who: ["M", "A"],
      },
      // A bucket-list goal: a target date and a bar
      cappadocia: {
        kind: "goal",
        name: "Cappadocia",
        tag: "Bucket list",
        place: "Türkiye",
        target: "Oct 2027",
        bar: 15,
        step: "Balloon ride deposit",
      },
    } satisfies Record<string, GlanceCard>,
    // The two wings of Bevel's band (client 2026-10-15: the four tall middle photos removed, the rest
    // wider): columns of 2 and 3 cards on the left, 3 and 2 on the right, the heading between them.
    // Each column is an endless slow reel (client 2026-10-15), and no two run alike: they alternate up
    // and down, each at its own pace (seconds per loop). Card heights are in column widths.
    columns: [
      { dir: "up", dur: 46, cards: [["machupicchu", 1.53], ["maldives", 1.53]] },
      { dir: "down", dur: 58, cards: [["cappadocia", 1.1], ["paris", 1.1], ["sydney", 1.1]] },
      { dir: "up", dur: 52, cards: [["morocco", 1.1], ["amalfi", 1.1], ["bigsur", 1.1]] },
      { dir: "down", dur: 40, cards: [["norway", 1.53], ["banff", 1.53]] },
    ] as { dir: "up" | "down"; dur: number; cards: [string, number][] }[],
  },

  // Section 3: "What you can do in Travel." v11's four features
  can: {
    heading: { lead: "What you can do in", accent: "Travel." },
    // Each feature stands a Klonie on the arc, with its own expression; the one at the top centre gets
    // a few things about that feature around it (client 2026-10-15), from the sample family's trips.
    // x, y: where each sits, in px from the Klonie's feet (negative y is up), scaled down on small
    // screens; tilt in degrees.
    feats: [
      {
        face: "thinking",
        title: "Bucket list",
        body: "Every dream trip with a target date and a savings goal.",
        props: [
          { kind: "bubbles", x: -100, y: -118 },
          { kind: "photo", photo: "norway", caption: "Northern Lights", x: -215, y: -128, tilt: -7 },
          { kind: "chip", icon: "cal", label: "Feb 2027", sub: "Target date", x: 205, y: -160 },
          { kind: "chip", icon: "dollar", label: "55% saved", sub: "Savings goal", bar: 55, x: 225, y: -62 },
        ],
      },
      {
        face: "focused",
        title: "Travel prep",
        body: "Passports, visas and Global Entry, checked against every trip.",
        props: [
          { kind: "passport", x: -200, y: -112, tilt: -10 },
          { kind: "chip", icon: "id", label: "Renew Leo’s passport", sub: "Due 20 Oct", x: 230, y: -160 },
          { kind: "chip", icon: "cal", label: "Global Entry interview", sub: "8 Oct", x: 240, y: -62 },
        ],
      },
      {
        face: "happy",
        title: "Trip journal",
        body: "Ratings, notes and photos, so the good bits stay.",
        props: [
          { kind: "photo", photo: "kyoto", caption: "Kyoto", x: -205, y: -125, tilt: -6 },
          { kind: "stars", n: 5, x: 185, y: -168 },
          { kind: "chip", icon: "note", label: "Come back for the blossoms.", sub: "Maya’s journal", x: 245, y: -70 },
        ],
      },
      {
        face: "helping",
        title: "Shared plans",
        body: "One itinerary the whole family can see.",
        props: [
          { kind: "family", who: ["M", "D", "A", "L"], label: "The whole family", x: -225, y: -150 },
          { kind: "chip", icon: "plane", label: "Morocco · March", sub: "One itinerary", x: 215, y: -160 },
          { kind: "chip", icon: "share", label: "Shared", sub: "Maya, Daniel, Ava & Leo", x: -205, y: -55 },
        ],
      },
    ] satisfies { face: string; title: string; body: string; props: CanProp[] }[],
  },

  // Section 4: v11's "Next: Health. Track. Heal. Thrive." with its "Open Health" button
  next: {
    kicker: "Next",
    name: "Health",
    motto: "Track. Heal. Thrive.",
    cta: "Open Health",
    href: "/streams/health", // the Health page, once it is built
  },
};

/** A card's back in "Travel, at a glance.": each kind is a different sort of detail */
export type GlanceCard = {
  /** The place, used for the photo's alt text */
  name: string;
  /** The back's colour (white when left out) */
  tone?: "tint" | "sky" | "ink";
} & (
  | {
      kind: "pass";
      tag: string;
      rating: number;
      /** Airport code and city */
      from: [string, string];
      to: [string, string];
      title: string;
      rows: [string, string][];
      who: Member[];
    }
  | { kind: "checklist"; tag: string; place: string; bar: number; steps: [string, boolean][]; who: Member[] }
  | { kind: "ring"; tag: string; saved: string; of: string; bar: number; note: string }
  | { kind: "stamp"; place: string; date: string; meta: string; rating: number; also: string }
  | { kind: "quote"; quote: string; by: string; rating: number }
  | { kind: "big"; kicker: string; value: string; unit?: string; line: string }
  | { kind: "cal"; tag: string; month: string; day: string; meta: string }
  | { kind: "reminder"; title: string; meta: string; who: Member[] }
  | { kind: "goal"; tag: string; place: string; target: string; bar: number; step: string }
);

/** Something about a feature, shown around the Klonie at the top of "What you can do in Travel." */
export type CanProp = { x: number; y: number; tilt?: number } & (
  | { kind: "photo"; photo: string; caption: string }
  | { kind: "chip"; icon: IconName; label: string; sub?: string; bar?: number }
  | { kind: "stars"; n: number }
  | { kind: "passport" }
  | { kind: "family"; who: Member[]; label: string }
  | { kind: "bubbles" }
);
