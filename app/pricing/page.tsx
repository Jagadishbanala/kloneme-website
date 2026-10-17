import type { Metadata } from "next";
import Compare from "@/components/pricing/Compare";
import Download from "@/components/pricing/Download";
import Plans from "@/components/pricing/Plans";
import Questions from "@/components/pricing/Questions";
import s from "@/components/pricing/pricing.module.css";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { pricing } from "@/content/pricing";

export const metadata: Metadata = {
  title: pricing.meta.title,
  description: pricing.meta.description,
};

// The Pricing page (client 2026-10-17; content from kloneme.ai/pricing): the plans, the comparison
// table, questions and a closing panel. The header's "Pricing" link opens it.
export default function PricingPage() {
  return (
    <div className={s.page}>
      <Header home="/" />
      <main className={s.main}>
        <Plans />
        <Compare />
        <Questions />
        <Download />
      </main>
      <Footer home="/" />
    </div>
  );
}
