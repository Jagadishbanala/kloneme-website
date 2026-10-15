import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { nav, site } from "@/content/site";

// home: prefix for the in-page links on other pages ("/" from a stream page); empty on the home page
export default function Header({ home = "" }: { home?: string }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
      {/* Glossy glass pill: faded white gradient + blur, bright top edge and a soft sheen */}
      <nav
        aria-label="Main"
        className="pointer-events-auto relative isolate flex w-full max-w-md items-center justify-between gap-2 overflow-hidden rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.42)_100%)] p-1.5 pl-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(31,41,55,0.05),0_14px_36px_-14px_rgba(31,41,55,0.22)] ring-1 ring-white/70 backdrop-blur-xl backdrop-saturate-150 md:w-auto md:max-w-none md:justify-start md:pl-5"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 rounded-t-full bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0))]"
        />
        <a href={`${home}#top`} aria-label={`${site.name} home`} className="flex items-center rounded-full">
          <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} priority className="h-6 w-auto" />
        </a>
        <ul className="ml-6 mr-1 hidden items-center gap-1 md:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={`${home}${l.href}`}
                className="rounded-full px-3 py-2 text-[14px] font-medium text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`${home}${nav.cta.href}`}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[14px] font-semibold text-bg transition-transform hover:-translate-y-px active:translate-y-0"
        >
          <Icon name="mail" className="size-4" strokeWidth={2} />
          {nav.cta.label}
        </a>
      </nav>
    </header>
  );
}
