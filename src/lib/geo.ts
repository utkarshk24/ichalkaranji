import { siteConfig } from "@/lib/site";

/** Great-circle distance in km (haversine). Used for "straight line" distances only — never shown as road distance. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const cityCentre = { lat: siteConfig.geo.lat, lng: siteConfig.geo.lng };

/** Distance from the city centre, rounded to whole km (positions are at best ~1 km precise). */
export function kmFromCentre(lat: number, lng: number) {
  return Math.round(distanceKm(cityCentre, { lat, lng }));
}

export function directionsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function osmUrl(lat: number, lng: number) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`;
}
