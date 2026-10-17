import type { CanProp, GlanceCard, HeroChip } from "@/content/travel";

// The Wealth stream's page (/streams/wealth): the client's copy (2026-10-16) for all four sections,
// and their card table for section 2 (photo, tag, title, detail line, big number, checklist). The
// details are the prototype's sample family (kloneme-prototype.html: Wealth home, the four savings
// goals, net worth and the Omega Seamaster added by voice); where the table leaves blanks (the
// fourth goal), they come from the prototype's goals: New family car, $4,000 of $21,000 by 2028.
// Media (free licences: Pexels License, Unsplash License). Hero clip public/streams/wealth/hero.mp4
// (client 2026-10-16: "something related to wealth management"; was Mixkit #3420, the suburbs, then
// Mixkit #47006, a stock board, then Pexels 8661806, coin stacks, then Pexels 853779, a spinning
// coin, then Pexels 6683943, a café payment, then Pexels 8136059, an advisor meeting, then Pexels
// 8478957, a hand drawing on charts, then Pexels 30333846, a couple on a lakeside bench, then a
// generated woman noting phone payments at a kitchen table, then a generated coin growing into a
// money plant, then generated savings-goal jars, then a generated still life of the six asset
// categories): the client's pick (2026-10-17), Pexels 35518213 “Financial Analysis Using Smartphone
// and Tablet Screens” by Jakub Zerdzicki — in a dark room, hands working a calculator on a phone over
// a tablet of candlestick charts, more charts glowing on the monitors behind; 14 s, silent.
// Photos in public/streams/wealth/places/<card id>.jpg:
//   home: Pexels 34625609; overall: the Family page's dinner table (Pexels 5591192); college: Pexels 7713417;
//   emergency: Unsplash 50YFv7iN118; morocco: Pexels 35663512; watch: Pexels 9381693;
//   newcar: Unsplash AsRAyHIkOHk; catchup: Pexels 12644987 (retouched: the word on the jar's label removed)

// Section 1: heading, subline and the three boxes around the phone (48% fills the ring)
export const wealthHero = {
  lines: ["Your Wealth,"],
  accent: "finally in focus.",
  sub: "Every financial commitment shapes your life. KloneME brings your assets, debts and savings goals together, so you know where you stand and can plan for your future.",
  chips: {
    countries: { value: "$89,700", label: "saved across 4 goals", icon: "dollar" },
    trips: { value: "48%", label: "overall progress", done: 48, total: 100 },
    next: { value: "86%", label: "of the emergency fund", icon: "shield" },
  } satisfies Record<"countries" | "trips" | "next", HeroChip>,
};

// Section 2: heading, subline and the photo cards (backs from the client's table)
export const wealthGlance = {
  heading: { lead: "The whole money picture,", accent: "One glance away" },
  sub: "From paying off a loan to saving for a home, set financial goals, track your commitments and see how much you’ve saved towards each goal with KloneME.",
  cards: {
    // Umbrella in the rain
    emergency: {
      kind: "detail",
      tone: "tint",
      name: "Emergency fund",
      tag: "Goal · On track",
      title: "Emergency fund",
      detail: "Target $36,000 · Dec 2026",
      big: "86%",
      checks: ["$31,000 saved", "$5,000 to go", "5.2 months saved"],
    },
    // Moroccan riad doorway
    morocco: {
      kind: "detail",
      tone: "sky",
      name: "Morocco trip",
      tag: "Goal · On track",
      title: "Morocco trip",
      detail: "Target $9,000 · Mar 2027",
      big: "69%",
      checks: ["$6,200 saved", "$2,800 to go", "On track for March"],
    },
    // Graduation cap
    college: {
      kind: "detail",
      tone: "sky",
      name: "Ava’s college fund",
      tag: "Goal · Behind",
      title: "Ava’s college fund",
      detail: "Target $120,000 · Sep 2032",
      big: "40%",
      checks: ["$48,500 saved", "$71,500 to go", "+$250/mo to catch up"],
    },
    // Hand dropping a coin in a jar (the table's big number came through as a spreadsheet error;
    // this is the catch-up amount from its own row and the prototype)
    catchup: {
      kind: "detail",
      name: "Ava’s college fund",
      tag: "Catch up",
      title: "Ava’s college fund",
      detail: "Behind its target",
      big: "+$250/mo",
      checks: ["Behind", "$250 a month catches it up", "Add money from the card"],
    },
    // Family at a kitchen table
    overall: {
      kind: "detail",
      tone: "ink",
      name: "Savings and goals",
      tag: "Overall",
      title: "Savings and goals",
      detail: "4 goals · $89,700 saved",
      big: "48%",
      checks: ["2 on track", "1 behind", "1 just started"],
    },
    // Close-up of a wristwatch
    watch: {
      kind: "detail",
      tone: "ink",
      name: "Daniel’s Omega Seamaster",
      tag: "Asset",
      title: "Daniel’s Omega Seamaster",
      detail: "Bought June 2021",
      big: "$5,400",
      checks: ["Added by talking to Klonie", "Bought June 2021", "$5,400 paid"],
    },
    // Seedling in a pot (the fourth goal, from the prototype)
    newcar: {
      kind: "detail",
      tone: "tint",
      name: "New family car",
      tag: "Goal · Just started",
      title: "New family car",
      detail: "Target $21,000 · 2028",
      big: "19%",
      checks: ["$4,000 saved", "$17,000 to go", "Just started"],
    },
  } satisfies Record<string, GlanceCard>,
  // Seven cards for eight places (each reel needs two to loop without a gap): the emergency fund shows
  // again at the far right ("again": desktop only)
  columns: [
    { dir: "up", dur: 46, cards: [["emergency", 1.53], ["watch", 1.53]] },
    { dir: "down", dur: 58, cards: [["morocco", 1.4], ["catchup", 1.4]] },
    { dir: "up", dur: 52, cards: [["overall", 1.4], ["newcar", 1.4]] },
    { dir: "down", dur: 40, cards: [["college", 1.53], ["emergency", 1.53, "again"]] },
  ] as { dir: "up" | "down"; dur: number; cards: ([string, number] | [string, number, "again"])[] }[],
};

// Section 3: the heading, the four features (the client's lines) and what pops out round each Klonie.
// x, y: px from the Klonie's feet (negative y is up), scaled down on small screens; tilt in degrees.
// Net worth from the prototype: $1.39M owned, $512.8K owed, $873.6K net worth.
const PHOTOS = "/streams/wealth/places";
export const wealthCan = {
  heading: { text: "Do more with your money in Wealth.", accent: "Wealth" },
  feats: [
    {
      face: "focused",
      title: "Net Worth",
      body: "Your assets, debts and savings goals in one place.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/home.jpg`, caption: "Real estate", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "dollar", label: "$873.6K", sub: "Net worth", x: 195, y: -160 },
        { kind: "chip", icon: "home", label: "$1.39M owned", sub: "$512.8K owed", x: 220, y: -62 },
      ],
    },
    {
      face: "happy",
      title: "Savings goals",
      body: "Set a savings target, choose a date and track your progress.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/emergency.jpg`, caption: "Emergency fund", x: -215, y: -125, tilt: -6 },
        { kind: "chip", icon: "shield", label: "Emergency fund", sub: "86% · Dec 2026", bar: 86, x: 210, y: -160 },
        { kind: "chip", icon: "plane", label: "Morocco trip", sub: "69% · Mar 2027", bar: 69, x: 225, y: -62 },
      ],
    },
    {
      face: "thinking",
      title: "Catch up",
      body: "Stay on track with your savings goals and your money.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/college.jpg`, caption: "Ava’s college fund", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "grad", label: "Behind its target", sub: "Ava’s college fund · 40%", x: 235, y: -160 },
        { kind: "chip", icon: "dollar", label: "+$250/mo", sub: "catches it up", x: 205, y: -62 },
      ],
    },
    {
      face: "helping",
      title: "Add Assets",
      body: "Adding an asset is as easy as saying it. Just tell Klonie!",
      props: [
        { kind: "bubbles", x: -100, y: -118 },
        { kind: "photo", photo: `${PHOTOS}/watch.jpg`, caption: "Omega Seamaster", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "mic", label: "Daniel’s Omega Seamaster", sub: "Added by talking to Klonie", x: 240, y: -160 },
        { kind: "chip", icon: "dollar", label: "$5,400", sub: "Bought June 2021", x: 205, y: -62 },
      ],
    },
  ] satisfies { face: string; title: string; body: string; props: CanProp[] }[],
};

// Section 4: the next stream to explore, Vault, with a Vault element: a dark-glass safe whose dial
// carries the Vault card's turning rings
export const wealthNext = {
  kicker: "Explore",
  name: "Vault",
  motto: "Safe, private and accessible.",
  cta: "Open Vault",
  href: "/streams/vault",
  art: "safe",
} as const;
