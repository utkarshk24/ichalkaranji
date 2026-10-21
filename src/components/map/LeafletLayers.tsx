"use client";

import "leaflet/dist/leaflet.css";
import type { CircleMarker as LeafletCircleMarker, LatLngBoundsExpression } from "leaflet";
import { useEffect, useRef } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { directionsUrl, osmUrl } from "@/lib/geo";
import { siteConfig } from "@/lib/site";
import { categoryColor, type MapPlace } from "./categories";

type Labels = { approx: string; distance: (km: number) => string; directions: string; openOsm: string; source: string };

function FitToPlaces({ places, fitKey }: { places: MapPlace[]; fitKey: number }) {
  const map = useMap();
  useEffect(() => {
    if (!places.length) return;
    if (places.length === 1) {
      map.setView([places[0].lat, places[0].lng], 13);
      return;
    }
    const bounds: LatLngBoundsExpression = places.map((p) => [p.lat, p.lng]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    // Refit when the visible set or the "show all" button changes, not on every render.
  }, [map, fitKey, places.map((p) => p.id).join(",")]);
  return null;
}

function FocusSelected({ selected, markers }: { selected: string | null; markers: React.RefObject<Map<string, LeafletCircleMarker>> }) {
  const map = useMap();
  useEffect(() => {
    if (!selected) return;
    const marker = markers.current?.get(selected);
    if (!marker) return;
    map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 12), { duration: 0.6 });
    marker.openPopup();
  }, [selected, map, markers]);
  return null;
}

/** Leaflet half of the layered map: tiles, coloured category markers, popups with directions. */
export default function LeafletLayers({
  places,
  selected,
  onSelect,
  fitKey,
  labels,
  label,
}: {
  places: MapPlace[];
  selected: string | null;
  onSelect: (id: string) => void;
  fitKey: number;
  labels: Labels;
  label: string;
}) {
  const markers = useRef(new Map<string, LeafletCircleMarker>());

  return (
    <MapContainer
      center={[siteConfig.geo.lat, siteConfig.geo.lng]}
      zoom={11}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label={label}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToPlaces places={places} fitKey={fitKey} />
      <FocusSelected selected={selected} markers={markers} />
      {places.map((p) => (
        <CircleMarker
          key={p.id}
          center={[p.lat, p.lng]}
          radius={p.id === selected ? 11 : 9}
          ref={(m) => {
            if (m) markers.current.set(p.id, m);
            else markers.current.delete(p.id);
          }}
          eventHandlers={{ click: () => onSelect(p.id) }}
          pathOptions={{
            color: "#ffffff",
            weight: 2,
            fillColor: categoryColor[p.category],
            fillOpacity: 1,
            dashArray: p.approximate ? "3 3" : undefined,
          }}
        >
          <Popup>
            <div className="min-w-[12rem] text-[13px] leading-snug">
              <p className="font-semibold">{p.name}</p>
              {p.approximate && <p className="mt-0.5 text-[11px] italic">{labels.approx}</p>}
              <p className="mt-1">{p.description}</p>
              {p.km > 0 && <p className="mt-1 text-[11px]">{labels.distance(p.km)}</p>}
              <p className="mt-2 flex gap-3">
                <a href={directionsUrl(p.lat, p.lng)} target="_blank" rel="noopener noreferrer">
                  {labels.directions}
                </a>
                <a href={osmUrl(p.lat, p.lng)} target="_blank" rel="noopener noreferrer">
                  {labels.openOsm}
                </a>
              </p>
              <p className="mt-1 text-[11px]">
                {labels.source}:{" "}
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {p.source}
                </a>
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
