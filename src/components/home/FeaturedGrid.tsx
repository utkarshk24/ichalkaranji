import { ArrowRight, CalendarDays, Landmark, MapPinned, Music, Utensils, type LucideIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { FeaturedCategory, FeaturedItem } from "@/types/indicator";

const categoryIcon: Record<FeaturedCategory, LucideIcon> = {
  heritage: Landmark,
  music: Music,
  attraction: MapPinned,
  festival: CalendarDays,
  food: Utensils,
};

/** Text-first cards (no stock photos): each links to its section and cites its source. */
export async function FeaturedGrid({ items }: { items: FeaturedItem[] }) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = categoryIcon[item.category];
        const feature = i === 0;
        // With a tall lead card, the final card spans the remaining row so no card sits orphaned.
        const last = i === items.length - 1 && items.length % 2 === 0;
        const span = feature ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : last ? "sm:col-span-2 lg:col-span-3" : "";
        return (
          <li key={item.id} className={span}>
            <article
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-border p-6 ${
                feature ? "bg-brand-blue text-white" : "bg-surface"
              }`}
            >
              {feature && <div className="loom-texture absolute inset-0 opacity-30" aria-hidden="true" />}
              <div className="relative flex items-center gap-2">
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${feature ? "bg-white/15 text-[#fbd38d]" : "bg-gold-soft text-gold"}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${feature ? "text-[#fbd38d]" : "text-gold"}`}>
                  {t(`home.featured.categories.${item.category}`)}
                </span>
              </div>
              <h3 className={`relative mt-4 font-bold tracking-tight ${feature ? "text-3xl" : "text-lg"}`}>{item.title[locale]}</h3>
              <p className={`relative mt-2 ${feature ? "text-lg text-white/85" : "text-sm text-fg-muted"}`}>{item.body[locale]}</p>
              <div className="relative mt-auto flex flex-wrap items-center justify-between gap-2 pt-5 text-xs">
                <Link href={item.href} className={`inline-flex items-center gap-1 text-sm font-semibold ${feature ? "text-white" : "text-primary"} hover:underline`}>
                  {t("home.featured.learnMore")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {item.sourceUrl ? (
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className={feature ? "text-white/70 hover:underline" : "text-fg-muted hover:underline"}>
                    {t("common.source")}: {item.source}
                  </a>
                ) : (
                  <span className={feature ? "text-white/70" : "text-fg-muted"}>{item.source}</span>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
