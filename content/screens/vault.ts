import type { Member } from "@/content/features";

// The Vault's "Access & sharing" screen, rebuilt from the client's prototype (kloneme-prototype.html,
// view "v-access"): the script's ACCESS data and the audit lines from accRender. The prototype calls
// the companion "Klone"; it is "Klonie" here, as everywhere on the site.

export const vaultScreen = {
  label: "Access & sharing",
  back: "Vault",
  title: "Access & sharing",
  sub: "You decide who sees what, and for how long",

  requestsLabel: "Requests",
  requests: [
    {
      who: "D",
      title: "Daniel wants to see Leo’s passport",
      why: "For the renewal appointment on 20 Oct",
      durations: ["24 hours", "7 days", "30 days"],
      selected: 1,
      decline: "Decline",
      approve: "Approve",
    },
  ] satisfies {
    who: Member;
    title: string;
    why: string;
    durations: string[];
    selected: number;
    decline: string;
    approve: string;
  }[],

  sharedLabel: "Shared right now",
  revoke: "Revoke",
  shared: [
    // Dr. Patel has no household avatar: the prototype shows his initials on blue
    { doc: "Nana’s medication list", with: "Dr. Patel", who: null, initials: "AP", color: "#0aa8d9", expires: "2 days" },
    { doc: "Your health insurance card", with: "Nana Grace", who: "G", expires: "30 days" },
  ] as { doc: string; with: string; who: Member | null; initials?: string; color?: string; expires: string }[],

  activityLabel: "Recent activity",
  activity: [
    { text: "Daniel viewed your home deed", when: "Today, 8:14 am", color: "#5ef0a8" },
    { text: "Nana’s medication list shared with Dr. Patel", when: "Yesterday · expires in 2 days", color: "#ffe07a" },
    { text: "Emergency share tested", when: "Sun · no one was notified", color: "#ff8fb8" },
    { text: "Ava added her school ID", when: "12 Sep", color: "#b59bff" },
  ],
};
