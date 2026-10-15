import type { IconName } from "@/components/ui/Icon";

export type Stat = {
  /** The big number */
  value: string;
  statement: string;
  /** Where the figure comes from */
  source: string;
  /** The problem it shows, on the card beside the wheel */
  label: string;
  icon: IconName;
};

/** What KloneME does about it: shown in bright green after the figures */
export type Solution = {
  /** The big line, in place of a number */
  line: string;
  statement: string;
  /** Its pill under the statement, and its card beside the wheel */
  pill: string;
  icon: IconName;
};

export const klo = {
  // Headline and closing line from the client (2026-10-08); the subline was removed at their request (2026-10-09)
  headline: { lead: "You’re not forgetful.", accent: "Life is just scattered." },
  closing: {
    lead: "KloneME was built to take that job off you:",
    rest: "one AI-powered Life OS that does the heavy lifting for you and your family.",
  },
  tryLabel: "Try asking",

  // The figures, verbatim from the client's table (2026-10-09); the hobbies figure was removed at their
  // request (2026-10-15). They're followed by the solutions, and the wheel shows three at a time;
  // scrolling moves them up one place at a time. Icons are Claude's pick.
  statsLabel: "Why life feels scattered, and what KloneME does about it", // for screen readers
  stats: [
    {
      value: "75%",
      statement: "of Americans can’t estimate their net worth without opening their apps or checking their accounts.",
      source: "Western & Southern, 2026",
      label: "Unclear Net Worth",
      icon: "dollar",
    },
    {
      value: "31.9M",
      statement: "401(k) accounts have been forgotten, holding $2.13 trillion between them as of July 2025.",
      source: "Capitalize + CRR, 2025",
      label: "Forgotten Accounts",
      icon: "bank",
    },
    {
      value: "71%",
      statement: "of travelers print their booking confirmations, and the same share dig through email on a phone.",
      source: "TripIt, 2014",
      label: "Scattered Planning",
      icon: "plane",
    },
    {
      value: "31%",
      statement: "of Americans keep personal, medical and financial records backed up somewhere safe and easy to reach.",
      source: "AICPA / Harris Poll, 2019",
      label: "Records At Risk",
      icon: "shield",
    },
  ] satisfies Stat[],

  // The solutions, verbatim from the client's table (2026-10-15), after the last figure. As they come
  // in, the wheel turns green.
  solutions: [
    {
      line: "One view",
      statement: "Your net worth sits on one screen, so there’s no checking app after app.",
      pill: "Net Worth In View",
      icon: "eye",
    },
    {
      line: "One place",
      statement: "Savings goals and your emergency fund stay together in Wealth, so nothing slips out of sight.",
      pill: "Savings In Sight",
      icon: "dollar",
    },
    {
      line: "One map",
      statement: "Your trips and their deadlines live on one travel map, with no printouts or inbox digging.",
      pill: "Trips On One Map",
      icon: "plane",
    },
    {
      line: "One vault",
      statement: "Personal, medical and financial records stay safe behind Face ID and are easy to reach.",
      pill: "Safe And Reachable",
      icon: "vault",
    },
  ] satisfies Solution[],

  // Used by the FAQ's chat (faq/AskKlo.tsx)
  phone: {
    title: "Klonie",
    status: "Face ID protected", // v9 hero trust line
    thinking: "Thinking…",
  },
};
