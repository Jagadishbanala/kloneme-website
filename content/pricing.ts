import type { IconName } from "@/components/ui/Icon";
import type { FaqItem } from "@/content/faq";
import { site } from "@/content/site";

// The Pricing page (/pricing). Copy from the client's live page, kloneme.ai/pricing (2026-10-17),
// with "KloneMe" spelled KloneME as on the rest of the site. Personal Business has no price yet
// ("Coming Soon"); its waitlist button opens the home page's contact form until a waitlist exists.

export type PlanKey = "free" | "business";

export type Plan = {
  key: PlanKey;
  name: string;
  /** The big line where a price would sit */
  price: string;
  line: string;
  /** The first three features, shown as the plan's allowance */
  allowance: { value: string; label: string; icon: IconName }[];
  /** "All features in Personal": shown first, as a lead-in to the rest */
  includes?: string;
  features: string[];
  cta: { label: string; href: string; external?: boolean };
};

/** A row of the comparison table: a value per plan, or true / false for included / not included */
export type Row = { feature: string; free: string | boolean; business: string | boolean };

export const pricing = {
  meta: {
    title: "Pricing · KloneME",
    description: "Start Free. Upgrade when you need more. No credit card required to start. No hidden fees. Cancel anytime.",
  },

  // Section 1: the heading, the three promises and the two plans
  hero: {
    kicker: "Pricing",
    heading: { lead: "Start Free.", accent: "Upgrade when you need more." },
    promises: ["No credit card required to start.", "No hidden fees.", "Cancel anytime."],
  },
  plans: [
    {
      key: "free",
      name: "Personal",
      price: "Free.",
      line: "Start organizing today. No commitment.",
      allowance: [
        { value: "2 GB", label: "storage", icon: "vault" },
        { value: "20", label: "uploads per month", icon: "download" },
        { value: "20", label: "active shares at a time", icon: "share" },
      ],
      features: [
        "All 14 document categories",
        "View only sharing",
        "Calendar view of uploads and expiry dates",
        "Default 90 day expiry reminders",
        "Read only document timeline",
        "Biometric authentication",
        "Offline vault access",
        "AI powered document capture",
      ],
      cta: { label: "Start Free", href: site.downloadUrl, external: true },
    },
    {
      key: "business",
      name: "Personal Business",
      price: "Coming Soon",
      line: "Built for professionals and heavy document users.",
      allowance: [
        { value: "25 GB", label: "storage", icon: "vault" },
        { value: "1,000", label: "uploads per month", icon: "download" },
        { value: "Unlimited", label: "active shares", icon: "share" },
      ],
      includes: "All features in Personal",
      features: [
        "Custom tagging and smart grouping",
        "Custom expiry controls per share",
        "Renewal and tax filing timelines",
        "Action based reminders for deadlines",
        "Long term document planning view",
        "Calendar view with creation and expiry dates",
        "Smart document suggestions",
      ],
      cta: { label: "Join Waitlist", href: "/#contact" },
    },
  ] satisfies Plan[],

  // Section 2: the comparison table
  compare: {
    heading: { lead: "Everything you get.", accent: "Nothing hidden." },
    label: "Compare the plans",
    columns: { feature: "Feature", free: "Personal Free", business: "Personal Business" },
    included: "Included",
    notIncluded: "Not included",
    rows: [
      { feature: "Storage", free: "2 GB", business: "25 GB" },
      { feature: "Uploads per month", free: "20", business: "1,000" },
      { feature: "Active shares", free: "20", business: "Unlimited" },
      { feature: "All 14 categories", free: true, business: true },
      { feature: "View only sharing", free: true, business: true },
      { feature: "Expiring access", free: true, business: true },
      { feature: "Document calendar view", free: true, business: true },
      { feature: "Biometric authentication", free: true, business: true },
      { feature: "Offline vault access", free: true, business: true },
      { feature: "AI document capture", free: true, business: true },
      { feature: "Custom tagging", free: false, business: true },
      { feature: "Smart grouping", free: false, business: true },
      { feature: "Custom expiry per share", free: false, business: true },
      { feature: "Action based reminders", free: false, business: true },
      { feature: "Renewal and tax timelines", free: false, business: true },
      { feature: "Smart document suggestions", free: false, business: true },
    ] satisfies Row[],
  },

  // Section 3: questions, in the home page's FAQ chat (face: Klonie's face while answering)
  faq: {
    heading: { lead: "Things people usually ask", accent: "before signing up." },
    items: [
      {
        q: "Is the free plan actually free?",
        a: "Yes. No credit card. No trial period. No expiry. Free means free.",
        face: "happy",
      },
      {
        q: "What happens when I hit 2 GB on the free plan?",
        a: "You will get a notification before you hit the limit. Upgrade to Personal Business for 25 GB or manage your existing documents.",
        face: "thinking",
      },
      {
        q: "Can I share documents with someone who does not have KloneME?",
        a: "Yes. Secure links work for anyone. Recipients do not need an account to view a document you share.",
        face: "helping",
      },
      {
        q: "What is offline-first vault?",
        a: "Your documents are stored and encrypted on your device first. You can access everything without an internet connection.",
        face: "focused",
      },
      {
        q: "What is the 24-word recovery phrase?",
        a: "Your encryption keys are derived from a 24-word passphrase, the same standard used by hardware crypto wallets. If you lose your phone, your documents are still recoverable.",
        face: "neutral",
      },
      {
        q: "When is Personal Business launching?",
        a: "Soon. Join the waitlist and we will notify you the moment it is available.",
        face: "surprised",
      },
    ] satisfies FaqItem[],
  },

  // Section 4: the closing panel (the App Store and Google Play buttons come from site.stores)
  cta: {
    heading: { lead: "Your documents deserve better", accent: "than a WhatsApp forward." },
    sub: "Start free today. No credit card. No setup. Ready in under two minutes.",
  },
};
