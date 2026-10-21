import { ArrowRight, CalendarRange, ExternalLink, MapPin, MapPinOff, SunMedium } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { LayeredMap } from "@/components/map/LayeredMap";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getItineraries, getPlace, getPlaces } from "@/lib/data";
import { kmFromCentre } from "@/lib/geo";
import { mapPlaces } from "@/lib/places";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons } from "@/lib/site";
import type { Place } from "@/types/indicator";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "tourism") : {};
}

const practical = ["fees", "dress", "monsoon", "stay"] as const;

export default async function TourismPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();

  const tourism = getPlaces().filter((p) => p.category === "tourism");
  const inCity = tourism.filter((p) => p.tourism?.group === "in-city");
  // Nearby places sorted by straight-line distance; unpinned ones go last.
  const nearby = tourism
    .filter((p) => p.tourism?.group === "nearby")
    .sort((a, b) => (a.lat === null ? 1 : b.lat === null ? -1 : kmFromCentre(a.lat, a.lng!) - kmFromCentre(b.lat, b.lng!)));

  const jsonLd = tourism.map((p) => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: p.name[locale],
    description: p.description[locale],
    ...(p.lat !== null && p.lng !== null ? { geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng } } : {}),
    sameAs: p.sourceUrl,
  }));

  const PlaceCard = ({ place }: { place: Place }) => (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold">{place.name[locale]}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-fg-muted">
        {place.lat !== null && place.lng !== null ? (
          <>
            <MapPin className="h-3.5 w-3.5 text-emerald" aria-hidden="true" />
            {place.tourism?.group === "nearby" ? t("tourism.distance", { km: kmFromCentre(place.lat, place.lng) }) : t("tourism.inCityTitle")}
            {place.approximate && <> · {t("mapPage.approx")}</>}
          </>
        ) : (
          <>
            <MapPinOff className="h-3.5 w-3.5" aria-hidden="true" />
            {t("tourism.noPin")}
          </>
        )}
      </p>
      <p className="mt-3 text-sm text-fg-muted">{place.description[locale]}</p>
      <a href={place.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-4 text-xs text-fg-muted hover:underline">
        {t("common.source")}: <span lang="en">{place.source}</span>
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
      </a>
    </article>
  );

  return (
    <>
      <PageHeader
        title={t("routes.tourism.title")}
        lead={t("tourism.summary")}
        icon={routeIcons.tourism}
        crumbs={[{ label: t("routes.tourism.title") }]}
        baseUrl={absoluteUrl(locale)}
      />

      <Section id="in-city" title={t("tourism.inCityTitle")}>
        <ul className="grid gap-4 md:grid-cols-2">
          {inCity.map((p) => (
            <li key={p.id}>
              <PlaceCard place={p} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="nearby" title={t("tourism.nearbyTitle")} className="pt-0 sm:pt-0">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((p) => (
            <li key={p.id}>
              <PlaceCard place={p} />
            </li>
          ))}
        </ul>
      </Section>

      <div className="border-y border-border bg-surface-2/50">
        <Section id="tourism-map" title={t("tourism.mapTitle")}>
          <LayeredMap
            places={mapPlaces(locale, (p) => p.category === "tourism" || p.id === "city-centre")}
            showControls={false}
            mapClassName="h-[24rem]"
          />
        </Section>
      </div>

      <Section id="itineraries" title={t("tourism.itinerariesTitle")} lead={t("tourism.itinerariesLead")}>
        <div className="grid gap-4 lg:grid-cols-3">
          {getItineraries().map((it) => (
            <article key={it.id} className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="flex items-start gap-2 font-semibold">
                <CalendarRange className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                {it.title[locale]}
              </h3>
              <div className="mt-4 space-y-4">
                {it.days.map((day) => (
                  <div key={day.label.en}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">{day.label[locale]}</p>
                    <ol className="mt-2 space-y-1.5 border-l-2 border-border pl-4 text-sm">
                      {day.stops.map((id) => (
                        <li key={id}>{getPlace(id).name[locale]}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 md:grid-cols-2">
        <section aria-labelledby="best-h" className="rounded-2xl border border-border bg-gold-soft p-6">
          <h2 id="best-h" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <SunMedium className="h-5 w-5 text-gold" aria-hidden="true" />
            {t("tourism.bestTimeTitle")}
          </h2>
          <p className="mt-3 text-sm">{t("tourism.bestTimeBody")}</p>
        </section>
        <section aria-labelledby="practical-h" className="rounded-2xl border border-border bg-surface p-6">
          <h2 id="practical-h" className="text-xl font-bold tracking-tight">
            {t("tourism.practicalTitle")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {practical.map((key) => (
              <li key={key} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {t(`tourism.practical.${key}`)}
              </li>
            ))}
          </ul>
          <Link href="/transport" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            {t("tourism.transportLink")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
