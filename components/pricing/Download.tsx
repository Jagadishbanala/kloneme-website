import { StoreButtons } from "@/components/ui/StoreButtons";
import { pricing } from "@/content/pricing";
import s from "./pricing.module.css";
import StreamThought from "./StreamThought";

// Pricing, section 4: the closing panel, in the site's dark glass (dot grid, warm and lilac corner
// glows): the heading with its second line in amber, the line under it and the App Store and Google
// Play buttons (client 2026-10-17, in place of one "Download KloneME" button); on the right, Klonie
// thinking of each of the six streams in turn (StreamThought.tsx).
const C = pricing.cta;

export default function Download() {
  return (
    <section aria-labelledby="pr-cta-h" className={s.ctaSection}>
      <div className={s.ctaPanel}>
        <span className={s.ctaDots} aria-hidden="true" />
        <span className={`${s.ctaCorner} ${s.ctaCornerL}`} aria-hidden="true" />
        <span className={`${s.ctaCorner} ${s.ctaCornerR}`} aria-hidden="true" />
        <div className={s.ctaContent}>
          <h2 id="pr-cta-h" className={s.ctaH2}>
            {C.heading.lead} <span>{C.heading.accent}</span>
          </h2>
          <p className={s.ctaSub}>{C.sub}</p>
          <StoreButtons tone="light" className={s.ctaStores} />
        </div>
        <div className={s.ctaArt}>
          <StreamThought />
        </div>
      </div>
    </section>
  );
}
