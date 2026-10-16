import type { CanProp, GlanceCard, HeroChip } from "@/content/travel";

// The Health stream's page (/streams/health): the client's copy (2026-10-16) for all four sections,
// and their card table for section 2 (photo, tag, title, detail line, big number, checklist).
// The details are the prototype's sample family (kloneme-prototype.html).
// Media (free licences: Pexels License, Unsplash License). Hero clip public/streams/health/hero.mp4
// (client 2026-10-16: "minimalistic, maybe morning running at sunrise"; was Mixkit #4878, outdoor yoga,
// then Pexels 7850851, boys in the waves, then Pexels 8686118, a pool swimmer): Pexels 14458139
// “Silhouette of a Man Jogging on the Beach at Sunrise” by Matthias Groeneveld. Photos in
// public/streams/health/places/<card id>.jpg:
//   bp: Pexels 8088852; grace: Pexels 37330699; flushot: Pexels 3992931; enrollment: Pexels 14599163;
//   leo: Pexels 33852454; cardiology: Pexels 5407238; physical: Pexels 6972768; eyeexam: Unsplash
//   0are122T4ho; familyplan: Pexels 6633634 (cropped); medicare: Pexels 7545218 (cropped)

// Section 1: heading, subline and the three boxes around the phone
export const healthHero = {
  lines: ["Every reading counts."],
  accent: "For you and your family.",
  sub: "Your family’s health deserves more than scattered records. Bring readings, checkups and medical details together in KloneME, so you’re better prepared for every care decision.",
  chips: {
    countries: { value: "130/82", label: "latest reading", icon: "heart" },
    trips: { value: "136/85", label: "14-day average", icon: "cal" },
    next: { value: "1", label: "checkup needs attention", icon: "bell" },
  } satisfies Record<"countries" | "trips" | "next", HeroChip>,
};

// Section 2: heading, subline and the photo cards (backs from the client's table)
export const healthGlance = {
  heading: { lead: "Every reading counts.", accent: "Yours and your family’s." },
  sub: "Your family’s happiness is built on everyone’s good health, one day at a time. See what’s going on for each of them, all at a glance.",
  cards: {
    // Older woman checking her blood pressure at home
    bp: {
      kind: "detail",
      tone: "tint",
      name: "Nana’s blood pressure",
      tag: "Reading",
      title: "Nana’s blood pressure",
      detail: "Shared with Maya · last 14 days",
      big: "130/82",
      checks: ["Stage 1", "14-day average 136/85"],
    },
    // Grandmother smiling in a garden
    grace: {
      kind: "detail",
      name: "Grace",
      tag: "Condition",
      title: "High blood pressure",
      detail: "Grace · Since 2021",
      big: "2 daily meds",
      checks: ["Status: Monitoring"],
    },
    // Boy playing at a park
    leo: {
      kind: "detail",
      name: "Leo",
      tag: "Condition",
      title: "Mild asthma",
      detail: "Leo",
      big: "Stable",
      checks: ["Status: Stable"],
    },
    // Stethoscope on a doctor's desk
    cardiology: {
      kind: "detail",
      name: "Cardiology follow-up",
      tag: "Checkup",
      title: "Cardiology follow-up",
      detail: "Nana · Dr. Anil Patel, Summit Heart",
      big: "9:30 AM",
      checks: ["Clinic visit", "Nana and Daniel"],
    },
    // Man sitting at a kitchen table with a coffee
    physical: {
      kind: "detail",
      tone: "ink",
      name: "Daniel",
      tag: "Needs attention",
      title: "Annual physical",
      detail: "Daniel · was due 31 Aug",
      big: "Overdue",
      checks: ["Not needed or Reschedule"],
    },
    // Child getting a plaster after a jab
    flushot: {
      kind: "detail",
      tone: "sky",
      name: "Flu shot",
      tag: "Vaccine",
      title: "Flu shot",
      detail: "Leo · school clinic",
      big: "1 Oct",
      checks: ["Leo"],
    },
    // Eye test chart
    eyeexam: {
      kind: "detail",
      tone: "tint",
      name: "Eye exam",
      tag: "Screening",
      title: "Eye exam",
      detail: "Maya · Rockridge Optometry",
      big: "14 Oct",
      checks: ["Maya"],
    },
    // Family insurance cards in a wallet
    familyplan: {
      kind: "detail",
      tone: "sky",
      name: "Carter Family Plan",
      tag: "Coverage",
      title: "Carter Family Plan",
      detail: "Evergreen Health · PPO Family",
      big: "OAK-22 group",
      checks: ["Member ID EVG 4471 •••• 208"],
    },
    // Older hands holding an insurance card
    medicare: {
      kind: "detail",
      tone: "tint",
      name: "Medicare Supplement",
      tag: "Coverage",
      title: "Medicare Supplement",
      detail: "Grace Whitfield · Silver Oak",
      big: "Since 2019",
      checks: ["Plan G••• 915"],
    },
    // Family going through papers at a table
    enrollment: {
      kind: "detail",
      name: "Open enrollment",
      tag: "Renewals",
      title: "Open enrollment",
      detail: "1 Nov to 15 Dec",
      big: "1 Nov",
      checks: ["Compare plans with Daniel"],
    },
  } satisfies Record<string, GlanceCard>,
  // The cards with two checklist lines sit in the taller places
  columns: [
    { dir: "up", dur: 46, cards: [["bp", 1.53], ["grace", 1.53]] },
    { dir: "down", dur: 58, cards: [["leo", 1.1], ["flushot", 1.1], ["eyeexam", 1.1]] },
    { dir: "up", dur: 52, cards: [["physical", 1.1], ["enrollment", 1.1], ["medicare", 1.1]] },
    { dir: "down", dur: 40, cards: [["cardiology", 1.53], ["familyplan", 1.53]] },
  ] as { dir: "up" | "down"; dur: number; cards: [string, number][] }[],
};

// Section 3: the heading, the four features (the client's lines) and what pops out round each Klonie.
// x, y: px from the Klonie's feet (negative y is up), scaled down on small screens; tilt in degrees.
const PHOTOS = "/streams/health/places";
export const healthCan = {
  heading: { text: "Where your family’s health is looked after daily.", accent: "health" },
  feats: [
    {
      face: "focused",
      title: "Health Readings",
      body: "Look in on your family’s health the way you look in on them.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/bp.jpg`, caption: "Nana", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "heart", label: "130/82", sub: "Latest reading", x: 200, y: -160 },
        { kind: "chip", icon: "cal", label: "136/85", sub: "14-day average", x: 225, y: -62 },
      ],
    },
    {
      face: "helping",
      title: "Health Conditions",
      body: "Know what each person lives with, and how it’s going.",
      props: [
        { kind: "family", who: ["G", "L"], label: "Nana & Leo", x: -215, y: -140 },
        { kind: "chip", icon: "heart", label: "High blood pressure", sub: "Grace · Monitoring", x: 235, y: -160 },
        { kind: "chip", icon: "check", label: "Mild asthma", sub: "Leo · Stable", x: 225, y: -62 },
      ],
    },
    {
      face: "thinking",
      title: "Health Checkups",
      body: "Know which checkups are coming and which have slipped.",
      props: [
        { kind: "chip", icon: "cal", label: "Cardiology follow-up", sub: "Nana · 9:30 AM", x: -240, y: -150 },
        { kind: "chip", icon: "bell", label: "Annual physical", sub: "Daniel · Overdue", x: 230, y: -160 },
        { kind: "chip", icon: "eye", label: "Eye exam", sub: "Maya · 14 Oct", x: 215, y: -60 },
      ],
    },
    {
      face: "happy",
      title: "Insurance Coverage",
      body: "Every family insurance card, ready when you need it.",
      props: [
        {
          kind: "card",
          title: "Evergreen Health",
          line: "Carter Family Plan · PPO Family",
          code: "EVG 4471 •••• 208",
          x: -225,
          y: -125,
          tilt: -7,
        },
        { kind: "chip", icon: "shield", label: "Medicare Supplement", sub: "Grace · Plan G", x: 230, y: -160 },
        { kind: "chip", icon: "cal", label: "Open enrollment", sub: "1 Nov to 15 Dec", x: 225, y: -62 },
      ],
    },
  ] satisfies { face: string; title: string; body: string; props: CanProp[] }[],
};

// Section 4: the next stream to explore, Wealth, with a Wealth element (a glass coin with a rising line; client 2026-10-16)
export const healthNext = {
  kicker: "Explore",
  name: "Wealth",
  motto: "Healthy habits for your money too.",
  cta: "Open Wealth",
  href: "/streams/wealth",
  art: "coin",
} as const;
