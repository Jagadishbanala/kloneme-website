import type { CanProp, GlanceCard, HeroChip } from "@/content/travel";

// The Hobbies stream's page (/streams/hobbies): the client's copy (2026-10-16) for all four sections,
// and their card table for section 2 (photo, tag, title, detail line, big number, checklist). Other
// details are the prototype's sample family (kloneme-prototype.html: Maya's hobbies, the Watercolor
// view with its paintings per month, the hobby tracker, watercolor sessions).
// Media (free licences: Mixkit Free License, Pexels License, Unsplash License). Hero clip
// public/streams/hobbies/hero.mp4: Mixkit #5197 “Hand of an artist with a brush when painting”. Photos
// in public/streams/hobbies/places/<card id>.jpg:
//   watercolor: Unsplash 1510832758362-af875829efcf; guitar: Pexels 7447918; calendar: Pexels 9810172;
//   intercambio: Unsplash 1753351055246-a7efae066eef; gear: Unsplash 1577941796491-999f99ba658f;
//   spanish: Pexels 5408919; taj: the prototype’s Taj Mahal watercolour

// Section 1: heading, subline and the three boxes around the phone (61% fills the ring)
export const hobbiesHero = {
  lines: ["Keep doing what you love."],
  accent: "See how far you’ve come.",
  sub: "Hobbies fade when nobody’s counting. Log your sessions, set milestones and see how far each one has come.",
  chips: {
    countries: { value: "18 of 30", label: "paintings in 2026", icon: "brush" },
    trips: { value: "61%", label: "overall progress across your hobbies", done: 61, total: 100 },
    next: { value: "26 of 40", label: "hours of guitar this quarter", icon: "clock" },
  } satisfies Record<"countries" | "trips" | "next", HeroChip>,
};

// Section 2: heading, subline and the photo cards (backs from the client's table)
export const hobbiesGlance = {
  heading: { lead: "Your passion,", accent: "in full color." },
  sub: "KloneME keeps every passion of yours in view, from your progress to your next milestone to the clubs and events nearby.",
  cards: {
    // Watercolor palette and brush
    watercolor: {
      kind: "detail",
      tone: "tint",
      name: "Watercolor",
      tag: "Creative · On pace",
      title: "Watercolor",
      detail: "18 of 30 paintings in 2026",
      big: "60%",
      checks: ["18 painted", "12 to go", "Next milestone 20 by 31 Oct"],
    },
    // Hands on an acoustic guitar
    guitar: {
      kind: "detail",
      tone: "ink",
      name: "Guitar",
      tag: "Upskilling · Time",
      title: "Guitar",
      detail: "26 h of 40 h this quarter",
      big: "65%",
      checks: ["26 hours logged", "14 hours to go", "This quarter"],
    },
    // Calendar with a date circled
    calendar: {
      kind: "detail",
      tone: "sky",
      name: "Milestones",
      tag: "Milestones",
      title: "Milestones",
      detail: "Targets and dates you set",
      big: "3 next",
      checks: ["3 coming up", "Watercolor: 20 by 31 Oct", "Targets and dates you set"],
    },
    // Friends at a local meetup
    intercambio: {
      kind: "detail",
      name: "Clubs and events",
      tag: "Engagement",
      title: "Clubs and events",
      detail: "Local clubs and events",
      big: "4 nearby",
      checks: ["4 nearby", "Local clubs", "Local events"],
    },
    // Hobby gear on a table
    gear: {
      kind: "detail",
      tone: "tint",
      name: "Your hobbies",
      tag: "Overall",
      title: "Your hobbies",
      detail: "Creative · Upskilling · Community",
      big: "61%",
      checks: ["Creative 60%", "Upskilling 72%", "Community 45%"],
    },
  } satisfies Record<string, GlanceCard>,
  // Five cards for eight places (each reel needs two to loop without a gap): three show again on wide
  // screens ("again": desktop only), never next to themselves
  columns: [
    { dir: "up", dur: 46, cards: [["watercolor", 1.53], ["intercambio", 1.53]] },
    { dir: "down", dur: 58, cards: [["guitar", 1.4], ["gear", 1.4]] },
    { dir: "up", dur: 52, cards: [["calendar", 1.4], ["watercolor", 1.4, "again"]] },
    { dir: "down", dur: 40, cards: [["intercambio", 1.53, "again"], ["guitar", 1.53, "again"]] },
  ] as { dir: "up" | "down"; dur: number; cards: ([string, number] | [string, number, "again"])[] }[],
};

// Section 3: the heading, the four features (the client's lines) and what pops out round each Klonie.
// x, y: px from the Klonie's feet (negative y is up), scaled down on small screens; tilt in degrees.
// Spanish's 180 lessons, the Taj Mahal session and the best month (June, 4 paintings) are from the
// prototype.
const PHOTOS = "/streams/hobbies/places";
export const hobbiesCan = {
  heading: { lead: "Do more of what you love", accent: "in Hobbies." },
  feats: [
    {
      face: "happy",
      title: "Add Hobbies",
      body: "Add a new passion and start tracking it.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/spanish.jpg`, caption: "Spanish", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "plus", label: "Spanish", sub: "Upskilling · 180 lessons", x: 210, y: -160 },
        { kind: "chip", icon: "palette", label: "4 hobbies", sub: "Creative · Upskilling · Community", x: 240, y: -62 },
      ],
    },
    {
      face: "focused",
      title: "Log a Session",
      body: "Finished a painting or an hour of practice? Log it.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/taj.jpg`, caption: "Taj Mahal reflections", x: -215, y: -125, tilt: -6 },
        { kind: "chip", icon: "brush", label: "Watercolor session", sub: "Sun 14 Sep · 1 h 30", x: 225, y: -160 },
        { kind: "chip", icon: "clock", label: "26 hours logged", sub: "Guitar · this quarter", x: 215, y: -62 },
      ],
    },
    {
      face: "thinking",
      title: "Track Progress",
      body: "See your best months, your hours and how far you’ve come.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/guitar.jpg`, caption: "Guitar", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "trophy", label: "Best month: June", sub: "4 paintings", x: 205, y: -160 },
        { kind: "chip", icon: "clock", label: "Guitar · 65%", sub: "26 of 40 h this quarter", bar: 65, x: 225, y: -62 },
      ],
    },
    {
      face: "helping",
      title: "Set Milestones",
      body: "Set a target and a date, and see how close you are.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/calendar.jpg`, caption: "31 Oct", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "trophy", label: "20 paintings by 31 Oct", sub: "Watercolor · 18 so far", bar: 90, x: 240, y: -160 },
        { kind: "chip", icon: "cal", label: "3 coming up", sub: "Targets and dates you set", x: 215, y: -62 },
      ],
    },
  ] satisfies { face: string; title: string; body: string; props: CanProp[] }[],
};

// Section 4: the next stream to explore, Family (the client's eyebrow, heading and line), with a
// Family element: a glass home with a teal heart beating inside and a teal roofline drawn over it
export const hobbiesNext = {
  kicker: "Explore",
  name: "Family",
  motto: "Every day with your family, in one place.",
  cta: "Open Family",
  href: "/streams/family",
  art: "family",
} as const;
