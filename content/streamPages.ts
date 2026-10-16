import { familyCan, familyGlance, familyHero, familyNext } from "@/content/pages/family";
import { healthCan, healthGlance, healthHero, healthNext } from "@/content/pages/health";
import { hobbiesCan, hobbiesGlance, hobbiesHero, hobbiesNext } from "@/content/pages/hobbies";
import { vaultCan, vaultGlance, vaultHero, vaultNext } from "@/content/pages/vault";
import { wealthCan, wealthGlance, wealthHero, wealthNext } from "@/content/pages/wealth";
import { streams, type StreamKey } from "@/content/streams";
import { travel, type CanSection, type GlanceCard, type HeroChip } from "@/content/travel";

// One page per stream at /streams/<stream> (client, 2026-10-16: "duplicate the Travel page for the
// remaining five streams"). Every page has Travel's layout; for now the others keep Travel's copy
// (the client will send theirs) but each has its own colours (from its card in the home page's
// Streams section), its own app screens on the phone, its own clip behind it, and its own photo cards
// with backs from the prototype's sample family. Sections 3 and 4 keep Travel's content for now.
// Health, Family, Vault, Wealth and Hobbies have their own copy for every section (client 2026-10-16,
// content/pages/<stream>.ts).

/** The app screens the hero's phone can cycle through (see components/streams/flow.tsx) */
export type FlowId =
  | "travel"
  | "prep"
  | "journal"
  | "calendar"
  | "chores"
  | "memories"
  | "emergency"
  | "goals"
  | "hobbies"
  | "vault"
  | "healthHome"
  | "checkups"
  | "wealthHome"
  | "vaultAccess"
  | "watercolor";

export type StreamPage = {
  key: StreamKey;
  name: string;
  /** The card's colour (--tv) and its shades: the section 3 panel runs top → mid → colour → low;
      glow lights section 4's corners */
  theme: { color: string; top: string; mid: string; low: string; glow: string };
  /** Travel's dotted flight route and paper plane over the clip */
  route: boolean;
  /** The phone's screens, in order */
  flow: FlowId[];
  /** Folder of the photo cards (<photos>/<card id>.jpg) */
  photos: string;
  hero: Omit<typeof travel.hero, "video" | "phoneLabel" | "chips"> & {
    chips: Record<"countries" | "trips" | "next", HeroChip>;
    /** flip: the clip shown mirrored */
    video: { src: string; poster: string; flip?: boolean };
    /** An illustrated scene shown in place of the clip (Vault: the drawer) */
    scene?: "drawer";
    phoneLabel: string;
  };
  glance: {
    heading: typeof travel.glance.heading;
    sub: string;
    cards: Record<string, GlanceCard>;
    columns: typeof travel.glance.columns;
  };
  can: CanSection;
  /** art: the element on the right (a glass heart; rising glass bars for Wealth; a turning glass globe for Travel; a glass safe for
      Vault; six glass people round a home for Family; a glass palette and brush for Hobbies); the section keeps
      Travel's colours on every page */
  next: Omit<typeof travel.next, "art"> & { art?: "heart" | "coin" | "bars" | "globe" | "safe" | "family" | "palette" };
};

const color = (key: StreamKey) => streams.cards.find((c) => c.key === key)!.color;
const name = (key: StreamKey) => streams.cards.find((c) => c.key === key)!.name;

// Travel's copy for the pages still waiting for their own (client 2026-10-16)
const shared = (key: StreamKey) => ({
  key,
  name: name(key),
  route: false,
  photos: `/streams/${key}/places`,
  hero: {
    ...travel.hero,
    phoneLabel: `The ${name(key)} stream in the KloneME app`,
    video: { src: `/streams/${key}/hero.mp4`, poster: `/streams/${key}/hero-poster.jpg` },
  },
  can: travel.can,
  next: travel.next,
});

export const streamPages: Record<StreamKey, StreamPage> = {
  travel: {
    key: "travel",
    name: travel.name,
    theme: { color: color("travel"), top: "#1b56ad", mid: "#2a71d2", low: "#66aaf1", glow: "#7fb2f0" },
    route: true,
    flow: ["travel", "prep", "journal"],
    photos: "/travel/places",
    hero: travel.hero,
    glance: travel.glance,
    can: travel.can,
    next: travel.next,
  },
  family: {
    ...shared("family"),
    theme: { color: color("family"), top: "#a8321f", mid: "#d24a38", low: "#f6957f", glow: "#f8a493" },
    flow: ["calendar", "chores", "memories"],
    hero: { ...shared("family").hero, ...familyHero },
    glance: { ...travel.glance, ...familyGlance },
    can: familyCan,
    next: familyNext,
  },
  health: {
    ...shared("health"),
    theme: { color: color("health"), top: "#8e2a67", mid: "#b33d86", low: "#e48cc0", glow: "#eaa0cc" },
    flow: ["healthHome", "checkups", "emergency"],
    hero: { ...shared("health").hero, ...healthHero },
    glance: { ...travel.glance, ...healthGlance },
    can: healthCan,
    next: healthNext,
  },
  wealth: {
    ...shared("wealth"),
    theme: { color: color("wealth"), top: "#45700a", mid: "#5f9410", low: "#a5d35a", glow: "#b5dc78" },
    flow: ["wealthHome", "goals"],
    hero: { ...shared("wealth").hero, ...wealthHero },
    glance: { ...travel.glance, ...wealthGlance },
    can: wealthCan,
    next: wealthNext,
  },
  vault: {
    ...shared("vault"),
    theme: { color: color("vault"), top: "#0b6e66", mid: "#108a80", low: "#5cc8bf", glow: "#7fd5ce" },
    flow: ["vault", "vaultAccess", "emergency"],
    hero: { ...shared("vault").hero, ...vaultHero },
    glance: { ...travel.glance, ...vaultGlance },
    can: vaultCan,
    next: vaultNext,
  },
  hobbies: {
    ...shared("hobbies"),
    theme: { color: color("hobbies"), top: "#5236b8", mid: "#6a4ed4", low: "#ab95f3", glow: "#b8a6f5" },
    flow: ["hobbies", "watercolor"],
    hero: { ...shared("hobbies").hero, ...hobbiesHero },
    glance: { ...travel.glance, ...hobbiesGlance },
    can: hobbiesCan,
    next: hobbiesNext,
  },
};

export const STREAM_PAGE_KEYS = Object.keys(streamPages) as StreamKey[];
export const streamHref = (key: StreamKey) => `/streams/${key}`;
