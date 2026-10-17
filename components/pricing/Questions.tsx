import AskKlo from "@/components/sections/faq/AskKlo";
import f from "@/components/sections/faq/faq.module.css";
import { pricing } from "@/content/pricing";

// Pricing, section 3 (client 2026-10-17: "replicate this design, this is the common design for our FAQ
// section"): the home page's FAQ, a chat with Klonie, with the Pricing page's heading and six questions.
// Tapping a question sends it as your bubble, Klonie thinks for a moment and the answer streams in; the
// first is answered on arrival. Every question and answer is also in the page as text.
const F = pricing.faq;

export default function Questions() {
  return (
    <section aria-labelledby="pr-faq-h" className={f.section}>
      <div className={f.head}>
        <h2 id="pr-faq-h" className={f.h2}>
          {F.heading.lead} <em>{F.heading.accent}</em>
        </h2>
      </div>

      <AskKlo items={F.items} />

      {/* Every question and answer as plain text, for search engines and screen readers */}
      <dl className="sr-only">
        {F.items.map((item) => (
          <div key={item.q}>
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
