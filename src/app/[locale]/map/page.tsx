import { Clock } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { LayeredMap } from "@/components/map/LayeredMap";
import { routing, type Locale } from "@/i18n/routing";
import { mapPlaces } from "@/lib/places";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "map") : {};
}

/** Layers the spec asks for that have no verified positions yet; listed so the gap is visible. */
const awaiting = ["wards", "industrial", "busStops", "station", "hospitals", "schools", "police", "fire", "offices", "markets", "parks"] as const;

export default async function MapPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        title={t("routes.map.title")}
        lead={t("mapPage.lead")}
        icon={routeIcons.map}
        crumbs={[{ label: t("routes.map.title") }]}
        baseUrl={absoluteUrl(locale)}
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <LayeredMap places={mapPlaces(locale)} showDownload />

        <section aria-labelledby="awaiting-h" className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-6">
          <h2 id="awaiting-h" className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
            {t("mapPage.awaitingTitle")}
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-fg-muted">{t("mapPage.awaitingNote")}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {awaiting.map((key) => (
              <li key={key} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-fg-muted">
                {t(`mapPage.awaiting.${key}`)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
