import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Can from "@/components/travel/Can";
import Glance from "@/components/travel/Glance";
import Next from "@/components/travel/Next";
import TravelHero from "@/components/travel/TravelHero";
import s from "@/components/travel/travel.module.css";
import { travel } from "@/content/travel";

export const metadata: Metadata = {
  title: `${travel.name} · KloneME`,
  description: travel.hero.sub,
};

// The Travel stream's own page: hero, "Travel, at a glance.", "What you can do in Travel." and the
// "Next: Health." panel.
export default function TravelPage() {
  return (
    <div className={s.page}>
      <Header home="/" />
      <main>
        <TravelHero />
        <Glance />
        <Can />
        <Next />
      </main>
      <Footer home="/" />
    </div>
  );
}
