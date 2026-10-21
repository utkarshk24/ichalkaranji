import { PhoneCall } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { emergencyNumbers } from "@/lib/site";

/**
 * Thin bar above the header: the independence notice plus national emergency numbers.
 * Numbers scroll on small screens and sit static on wide ones; animation pauses on hover/focus
 * and is disabled for prefers-reduced-motion (see globals.css).
 */
export async function EmergencyTicker() {
  const t = await getTranslations("emergency");
  const tSite = await getTranslations("site");

  const items = emergencyNumbers.map(({ key, number }) => (
    <li key={key} className="shrink-0">
      <a
        href={`tel:${number}`}
        className="inline-flex items-center gap-1.5 rounded px-1 font-medium hover:underline"
      >
        <span className="text-white/80">{t(`items.${key}`)}</span>
        <span className="font-semibold tabular-nums">{number}</span>
      </a>
    </li>
  ));

  return (
    <aside data-ticker aria-label={t("label")} className="bg-[#7f1d1d] text-white dark:bg-[#5c1414]">
      <div className="mx-auto flex h-[var(--ticker-h)] max-w-7xl items-center gap-3 px-4 text-xs sm:text-sm">
        <span className="hidden shrink-0 items-center gap-1.5 font-semibold md:inline-flex">
          <PhoneCall className="h-4 w-4" aria-hidden="true" />
          {t("label")}
        </span>

        <nav aria-label={t("numbersLabel")} className="ticker relative min-w-0 flex-1 overflow-hidden">
          {/* Two copies make the marquee seamless; the second is hidden from assistive tech. */}
          <div className="ticker-track flex w-max gap-6 lg:animate-none">
            <ul className="flex gap-6">{items}</ul>
            <ul className="flex gap-6 lg:hidden" aria-hidden="true" inert>
              {items}
            </ul>
          </div>
        </nav>

        <Link href="/emergency" className="hidden shrink-0 font-semibold underline-offset-2 hover:underline sm:inline">
          {t("viewAll")}
        </Link>
      </div>
      <p className="border-t border-white/10 bg-black/20 px-4 py-1 text-center text-[11px] text-white/90 sm:text-xs">
        {tSite("independentNotice")}
      </p>
    </aside>
  );
}
