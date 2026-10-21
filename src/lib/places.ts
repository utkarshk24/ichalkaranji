import type { MapPlace } from "@/components/map/categories";
import type { Locale } from "@/i18n/routing";
import { getPlaces } from "@/lib/data";
import { kmFromCentre } from "@/lib/geo";
import type { Place } from "@/types/indicator";

/** Places with a cited position, localised for the client map. Places without coordinates are never pinned. */
export function mapPlaces(locale: Locale, filter: (p: Place) => boolean = () => true): MapPlace[] {
  return getPlaces()
    .filter((p): p is Place & { lat: number; lng: number } => p.lat !== null && p.lng !== null && filter(p))
    .map((p) => ({
      id: p.id,
      category: p.category,
      lat: p.lat,
      lng: p.lng,
      approximate: p.approximate,
      name: p.name[locale],
      description: p.description[locale],
      source: p.source,
      sourceUrl: p.sourceUrl,
      km: p.id === "city-centre" ? 0 : kmFromCentre(p.lat, p.lng),
    }));
}
