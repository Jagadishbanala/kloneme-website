import type { StreamKey } from "@/content/streams";

export type FlowItem = {
  /** The stream it belongs to: its icon and colour going in, its Klonie and name coming out */
  stream: StreamKey;
  /** What enters the phone (left) */
  challenge: string;
  /** What leaves the phone (right), as a KloneME card */
  solution: string;
  /** Vertical lane in px at the screen edges, relative to the centre of the lines (narrows behind the phone). */
  lane: number;
};

export const hero = {
  // Headline, sub and trust line from the client (2026-10-08); the store buttons are site.stores
  headline: { lead: "One Life, One LifeOS", accent: "designed for your family" },
  sub: "Speak, type or scan whatever’s on your mind. KloneME is your AI-powered Life OS, here to make every part of life easier to understand, plan and enjoy.",
  note: "Private by Design",

  // Items travelling along the lines, left → behind the phone → right, one after another.
  // Each crossing takes a quarter of the cycle and items are evenly staggered, so 3 are on screen at a time.
  // A challenge enters on the left; behind the phone it becomes its solution, a KloneME card
  // (Klonie for its stream + the mark). Challenge / solution pairs from the client (2026-10-15), in their order.
  flow: {
    cycle: 21, // seconds (crossing = 5.25s, a new item every 1.75s)
    items: [
      { stream: "family", challenge: "Month ahead unclear", solution: "Family calendar", lane: -150 },
      { stream: "health", challenge: "Insurance cards everywhere", solution: "Saved cards", lane: 130 },
      { stream: "wealth", challenge: "Savings goals unclear", solution: "Goals tracked", lane: -55 },
      { stream: "vault", challenge: "Document expiry dates", solution: "Vault", lane: 170 },
      { stream: "travel", challenge: "Countries visited, forgotten", solution: "Travel map", lane: -175 },
      { stream: "hobbies", challenge: "Hobby progress unclear", solution: "Progress rings", lane: 60 },
      { stream: "family", challenge: "Who’s doing what?", solution: "Chores leaderboard", lane: -110 },
      { stream: "health", challenge: "Scattered health records", solution: "One screen", lane: 155 },
      { stream: "wealth", challenge: "Emergency fund unknown", solution: "Instant view", lane: -35 },
      { stream: "vault", challenge: "Emergency details unreachable", solution: "Emergency share", lane: 100 },
      { stream: "travel", challenge: "Entry rules and insurance", solution: "Trip deadlines", lane: -165 },
      { stream: "hobbies", challenge: "Upskilling goes unmeasured", solution: "Milestones", lane: 35 },
    ] satisfies FlowItem[],
  },

  // App screens shown inside the phone (copy from the client's app screenshots)
  phone: {
    listen: {
      eyebrow: "Speak freely",
      title: ["What would you", "like to achieve?"],
      bodyStrong: "I am Listening",
      body: ", Tell me what you have in mind. You can edit the words before continuing.",
      quote: "I want to reach a net worth of $500 million by 2030.",
      status: "Listening...",
      primary: "Continue",
      secondary: "Use Text instead",
    },
    place: {
      eyebrow: "Find its place",
      title: ["This looks like", "a Wealth goal."],
      body: "Is that correct? Choose the area that fits best.",
      goal: "Reach $500M net worth by 2030",
      categories: [
        { key: "wealth", label: "Wealth" },
        { key: "travel", label: "Travel" },
        { key: "wellness", label: "Wellness\n/ Health" },
        { key: "hobbies", label: "Hobbies" },
        { key: "family", label: "Family" },
        { key: "other", label: "Other" },
      ],
      primary: "Yes, Wealth",
      note: "You can change the category later.",
    },
  },
};
