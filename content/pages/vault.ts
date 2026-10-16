import type { CanProp, GlanceCard, HeroChip } from "@/content/travel";

// The Vault stream's page (/streams/vault): the client's copy (2026-10-16) for all four sections,
// and their card table for section 2 (photo, tag, title, detail line, big number, checklist). The
// details are the prototype's sample family (kloneme-prototype.html: Maya's vault, its documents,
// access & sharing); where the table says "from the screen" (Will & trust), they come from the
// prototype's Vault screen.
// Hero clip public/streams/vault/hero.mp4 (client 2026-10-16: "a realistic video" of him putting his
// driving licence and passport inside the cupboard drawer — no free stock clip shows it, so it was
// generated with Higgsfield on the client's Pro plan: a GPT Image 2.5 start frame, animated with Kling
// 3.0 Pro; 10 s, silent): a man at a white sideboard on the right of the phone lays a passport and a
// licence in the open top drawer and pushes it shut. Was Mixkit #45926, paperwork, then Pexels 8733007,
// gold bars, then Pexels 9207809, passports on a table, then Pexels 8135728, papers into an organiser,
// then the illustrated drawer scene (components/travel/DrawerScene.tsx, still there: set
// `scene: "drawer"` to bring it back).
// Media (free licences: Pexels License, Unsplash License). Photos in
// public/streams/vault/places/<card id>.jpg:
//   passport: Unsplash 1675649957459-082cd8dd86a9; insurance: the Health page's wallet (Pexels 6633634,
//   cropped); yourvault: Pexels 7414277; request: Pexels 6183904; deed: Unsplash dofnXBVZ51c;
//   tax: Pexels 6929019; will: Pexels 261679

// Section 1: heading, subline and the three boxes around the phone
export const vaultHero = {
  lines: ["Every document, from", "paper trail to"],
  accent: "peace of mind.",
  sub: "Keep your family’s IDs, medical records, legal papers and financial documents organised and easy to find in KloneME, safe, secure and protected with end-to-end encryption.",
  chips: {
    countries: { value: "6", label: "documents kept, from your passport to your will", icon: "doc" },
    trips: { value: "2", label: "shared right now, each with an end date", icon: "share" },
    next: { value: "3", label: "people pinned for emergency share", icon: "sos" },
  } satisfies Record<"countries" | "trips" | "next", HeroChip>,
};

// Section 2: heading, subline and the photo cards (backs from the client's table)
export const vaultGlance = {
  heading: { lead: "Ready for life’s", accent: "“where’s that document?” moments." },
  sub: "From your driving licence to your will, keep the documents your family relies on organised and easy to find, with reminders before they expire and end-to-end encryption to keep them secure.",
  cards: {
    // Passport on a desk
    passport: {
      kind: "detail",
      tone: "tint",
      name: "Passport",
      tag: "IDs · Held",
      title: "Passport",
      detail: "Valid to Mar 2031",
      big: "Mar 2031",
      checks: ["Held in your vault", "Valid to Mar 2031", "Shared only when you approve"],
    },
    // Insurance card tucked in a wallet
    insurance: {
      kind: "detail",
      name: "Health insurance card",
      tag: "Health · Shared",
      title: "Health insurance card",
      detail: "Evergreen PPO",
      big: "30 days",
      checks: ["Shared with Nana Grace", "30 days", "Revoke any time"],
    },
    // Front door with a key in the lock
    deed: {
      kind: "detail",
      tone: "sky",
      name: "Home deed",
      tag: "Legal · Viewed",
      title: "Home deed",
      detail: "Oakland · joint with Daniel",
      big: "8:14 AM",
      checks: ["Joint with Daniel", "Daniel viewed it today", "Shown in Recent activity"],
    },
    // Tax forms with a pen
    tax: {
      kind: "detail",
      tone: "tint",
      name: "Tax return 2025",
      tag: "Wealth · Held",
      title: "Tax return 2025",
      detail: "Filed Apr 2026",
      big: "Apr 2026",
      checks: ["Filed Apr 2026", "Held in your vault", "Kept with your Wealth documents"],
    },
    // Hand holding a phone with a request
    request: {
      kind: "detail",
      tone: "sky",
      name: "Access request",
      tag: "Request · Waiting",
      title: "Access request",
      detail: "Daniel · Leo’s passport",
      big: "7 days",
      checks: [
        "Daniel wants to see Leo’s passport",
        "For the renewal appointment on 20 Oct",
        "Approve for 24 hours, 7 days or 30 days",
      ],
    },
    // Family papers in a folder
    yourvault: {
      kind: "detail",
      tone: "ink",
      name: "Your vault",
      tag: "Overall",
      title: "Your vault",
      detail: "Maya · 6 documents",
      big: "6",
      checks: ["2 shared right now", "1 request waiting", "3 pinned for emergency share"],
    },
    // Pen resting on a signed document (the detail line, date and number from the prototype's Vault
    // screen: "Will & trust · Updated Feb 2025")
    will: {
      kind: "detail",
      tone: "ink",
      name: "Will & trust",
      tag: "Legal · Held",
      title: "Will & trust",
      detail: "Updated Feb 2025",
      big: "Feb 2025",
      checks: ["Held in your vault", "Updated Feb 2025", "Kept with your Legal documents"],
    },
  } satisfies Record<string, GlanceCard>,
  // Seven cards for eight places (each reel needs two to loop without a gap): the insurance card shows
  // again at the far right ("again": desktop only). The access request, with the longest list, is
  // the tallest card.
  columns: [
    { dir: "up", dur: 46, cards: [["passport", 1.53], ["request", 1.75]] },
    { dir: "down", dur: 58, cards: [["insurance", 1.4], ["yourvault", 1.4]] },
    { dir: "up", dur: 52, cards: [["tax", 1.4], ["deed", 1.4]] },
    { dir: "down", dur: 40, cards: [["will", 1.53], ["insurance", 1.4, "again"]] },
  ] as { dir: "up" | "down"; dur: number; cards: ([string, number] | [string, number, "again"])[] }[],
};

// Section 3: the heading, the four features (the client's lines) and what pops out round each Klonie.
// x, y: px from the Klonie's feet (negative y is up), scaled down on small screens; tilt in degrees.
const PHOTOS = "/streams/vault/places";
export const vaultCan = {
  heading: { text: "Turn your paperwork into organised digital records." },
  feats: [
    {
      face: "focused",
      title: "IDs & Records",
      body: "Every document of your family, sorted into IDs, health, legal and wealth categories.",
      props: [
        { kind: "passport", x: -200, y: -112, tilt: -10 },
        { kind: "chip", icon: "heart", label: "Health insurance card", sub: "Health · Evergreen PPO", x: 235, y: -160 },
        { kind: "chip", icon: "dollar", label: "Tax return 2025", sub: "Wealth · Filed Apr 2026", x: 225, y: -62 },
      ],
    },
    {
      face: "happy",
      title: "Scan",
      body: "Scan your documents and keep them handy wherever you go.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/tax.jpg`, caption: "Tax return 2025", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "check", label: "Held in your vault", sub: "Filed Apr 2026", x: 210, y: -160 },
        { kind: "chip", icon: "doc", label: "6 documents", sub: "Maya’s vault", x: 220, y: -62 },
      ],
    },
    {
      face: "helping",
      title: "Share",
      body: "Share your key documents safely with the people you trust, and revoke access at any time.",
      props: [
        {
          kind: "card",
          title: "Evergreen PPO",
          line: "Health insurance card",
          code: "EVG 4471",
          x: -225,
          y: -125,
          tilt: -7,
        },
        { kind: "chip", icon: "share", label: "Shared with Nana Grace", sub: "30 days · revoke any time", x: 240, y: -160 },
        { kind: "chip", icon: "bell", label: "Access request", sub: "Daniel · Leo’s passport", x: 220, y: -62 },
      ],
    },
    {
      face: "thinking",
      title: "Renewals",
      body: "Get notified before your documents expire, so you can renew them on time.",
      props: [
        { kind: "photo", photo: `${PHOTOS}/passport.jpg`, caption: "Passport", x: -215, y: -128, tilt: -7 },
        { kind: "chip", icon: "cal", label: "Valid to Mar 2031", sub: "Passport", x: 205, y: -160 },
        { kind: "chip", icon: "id", label: "Renewal appointment", sub: "Leo’s passport · 20 Oct", x: 230, y: -62 },
      ],
    },
  ] satisfies { face: string; title: string; body: string; props: CanProp[] }[],
};

// Section 4: the next stream to explore, Travel, with a Travel element: a dark-glass globe turning,
// with the Travel card's dotted route and paper plane across it
export const vaultNext = {
  kicker: "Explore",
  name: "Travel",
  motto: "From the bucket list to the memory.",
  cta: "Open Travel",
  href: "/streams/travel",
  art: "globe",
} as const;
