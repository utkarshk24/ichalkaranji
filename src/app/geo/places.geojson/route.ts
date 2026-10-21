import { getPlaces } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/** Every pinned place as GeoJSON (coordinates from Wikipedia infoboxes → CC BY-SA 4.0). */
export function GET() {
  const features = getPlaces()
    .filter((p) => p.lat !== null && p.lng !== null)
    .map((p) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
      properties: {
        id: p.id,
        category: p.category,
        name_en: p.name.en,
        name_mr: p.name.mr,
        name_hi: p.name.hi,
        approximate: p.approximate,
        source: p.source,
        source_url: p.sourceUrl,
        verified: p.verified,
      },
    }));

  const body = {
    type: "FeatureCollection",
    name: "ichalkaranji-places",
    license: "CC BY-SA 4.0 (coordinates from Wikipedia)",
    attribution: `Ichalkaranji City Portal (${siteConfig.url}); coordinates © Wikipedia contributors`,
    generated: siteConfig.dataLastUpdated,
    features,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/geo+json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ichalkaranji-places.geojson"',
    },
  });
}
