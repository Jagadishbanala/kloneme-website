import type { CanProp, GlanceCard, HeroChip } from "@/content/travel";

// The Family stream's page (/streams/family): the client's copy (2026-10-16) for all four sections,
// and their card table for section 2 (photo, tag, title, detail line, big number, checklist).
// The details are the prototype's sample family, the Carters (kloneme-prototype.html).
// Media (free licences: Mixkit Free License, Pexels License, Unsplash License). Hero clip
// public/streams/family/hero.mp4: Mixkit #33729 “Family walking in the park”. Photos in
// public/streams/family/places/<card id>.jpg:
//   halloween: Pexels 5859570; biscuit: Pexels 9428677; watercolor: the Hobbies photo (Unsplash);
//   lake: Pexels 19510855; nana: Pexels 27520970; carters: Pexels 5591192; emergency: Pexels 14765796
//   (retouched: a faint error line removed from the screen)

// Section 1: heading, subline and the three boxes around the phone. The client's boxes for this page
// repeated Health's readings, so these come from their Family card table (The Carters, the lake
// weekend, Halloween) until they send their own.
export const familyHero = {
  lines: ["Put your people at", "the center of"],
  accent: "your world.",
  sub: "The big milestones and the ordinary moments in between. Keep your family’s important dates, memories and essential details together in KloneME, wherever life takes you.",
  chips: {
    countries: { value: "5", label: "members, one shared home", icon: "users" },
    trips: { value: "126", label: "moments shared", icon: "photo" },
    next: { value: "31 Oct", label: "Halloween with the kids", icon: "cal" },
  } satisfies Record<"countries" | "trips" | "next", HeroChip>,
};

// Section 2: heading, subline and the photo cards (backs from the client's table)
export const familyGlance = {
  heading: { lead: "In a family, love is spelled", accent: "T-I-M-E" },
  sub: "A birthday remembered. A meal together. A milestone celebrated. Keep your family’s world in view, with more room for being part of it.",
  cards: {
    // Family at a lakeside picnic
    lake: {
      kind: "detail",
      tone: "tint",
      name: "The lake weekend",
      tag: "Moment",
      title: "The lake weekend",
      detail: "Together · June 2025",
      big: "42 photos",
      checks: ["6 journal entries", "Shared with everyone", "Maya’s journal"],
    },
    // Kids in Halloween costumes
    halloween: {
      kind: "detail",
      tone: "ink",
      name: "Halloween with the kids",
      tag: "Coming up",
      title: "Halloween with the kids",
      detail: "Evening · 31 Oct",
      big: "31 Oct",
      checks: ["On the family calendar", "Whole family invited"],
    },
    // Dog on a walk
    biscuit: {
      kind: "detail",
      name: "Walking Biscuit",
      tag: "Chores",
      title: "Walking Biscuit",
      detail: "This week · Leo’s turn",
      big: "Leo",
      checks: ["On the leaderboard", "Everyone can see whose turn"],
    },
    // Watercolour paints on a desk
    watercolor: {
      kind: "detail",
      tone: "sky",
      name: "Watercolor club",
      tag: "Calendar",
      title: "Watercolor club",
      detail: "Tonight · 7:00 pm",
      big: "7:00 PM",
      checks: ["Added to the shared calendar"],
    },
    // Grandmother and grandchild
    nana: {
      kind: "detail",
      name: "Nana’s cardiology check-up",
      tag: "Care",
      title: "Nana’s cardiology check-up",
      detail: "Tomorrow · 9:30 am",
      big: "9:30",
      checks: ["On the shared calendar", "Family can see"],
    },
    // Family dinner table
    carters: {
      kind: "detail",
      tone: "tint",
      name: "The Carters",
      tag: "Together",
      title: "The Carters",
      detail: "Oakland, CA",
      big: "126 moments shared",
      checks: ["5 members", "One shared home"],
    },
    // Thumb on a phone screen
    emergency: {
      kind: "detail",
      tone: "sky",
      name: "Hold for 2 seconds",
      tag: "Emergency",
      title: "Hold for 2 seconds",
      detail: "Pinned contacts only",
      big: "72 hrs",
      checks: ["Your chosen documents", "I call your first contact"],
    },
  } satisfies Record<string, GlanceCard>,
  // Seven cards for eight places (each reel needs two to loop without a gap): the lake weekend shows
  // again at the far right ("again": desktop only, skipped by screen readers and the phone row)
  columns: [
    { dir: "up", dur: 46, cards: [["lake", 1.53], ["nana", 1.53]] },
    { dir: "down", dur: 58, cards: [["watercolor", 1.1], ["halloween", 1.3]] },
    { dir: "up", dur: 52, cards: [["biscuit", 1.3], ["emergency", 1.3]] },
    { dir: "down", dur: 40, cards: [["carters", 1.53], ["lake", 1.53, "again"]] },
  ] as { dir: "up" | "down"; dur: number; cards: ([string, number] | [string, number, "again"])[] }[],
};

// Section 3: the heading, the four features (the client's lines) and what pops out round each Klonie.
// x, y: px from the Klonie's feet (negative y is up), scaled down on small screens; tilt in degrees.
const PHOTOS = "/streams/family/places";
export const familyCan = {
  heading: { text: "A simpler way to manage your family.", accent: "family" },
  feats: [
    {
      face: "helping",
      title: "Your People",
      body: "Every family member has a place, with the details that matter to them.",
      props: [
        { kind: "family", who: ["M", "D", "A", "L", "G"], label: "The Carters", x: -225, y: -150 },
        { kind: "chip", icon: "users", label: "5 members", sub: "One shared home", x: 215, y: -160 },
        { kind: "chip", icon: "home", label: "Oakland, CA", sub: "The Carters", x: 225, y: -62 },
      ],
    },
    {
      face: "thinking",
      title: "Dates & Milestones",
      body: "Keep birthdays, anniversaries and life’s big moments in view.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/halloween.jpg`, caption: "31 Oct", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "trophy", label: "Leo’s first swim badge", sub: "Milestone · 19 Sep", x: 235, y: -160 },
        { kind: "chip", icon: "cal", label: "Nana’s cardiology check-up", sub: "Tomorrow · 9:30 am", x: 240, y: -62 },
      ],
    },
    {
      face: "happy",
      title: "Family Moments",
      body: "From everyday laughter to proud moments, keep the memories you’ll return to.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/lake.jpg`, caption: "The lake weekend", x: -215, y: -125, tilt: -6 },
        { kind: "chip", icon: "photo", label: "42 photos", sub: "Together · June 2025", x: 205, y: -160 },
        { kind: "chip", icon: "note", label: "6 journal entries", sub: "Maya’s journal", x: 225, y: -62 },
      ],
    },
    {
      face: "focused",
      title: "Emergency Details",
      body: "Find important contacts and essential family information when you need them.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/emergency.jpg`, caption: "Emergency", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "sos", label: "Hold for 2 seconds", sub: "Pinned contacts only", x: 225, y: -160 },
        { kind: "chip", icon: "doc", label: "Your chosen documents", sub: "For 72 hours", x: 235, y: -62 },
      ],
    },
  ] satisfies { face: string; title: string; body: string; props: CanProp[] }[],
};

// Section 4: the next stream to explore, Health, with the glass heart. The client
// offered two lines ("A little care. Every day." or "Your well-being, in view."); this is the first.
export const familyNext = {
  kicker: "Explore",
  name: "Health",
  motto: "A little care. Every day.",
  cta: "Open Health",
  href: "/streams/health",
  art: "heart",
} as const;
