"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { siteConfig } from "@/lib/site";

/**
 * Static-feeling preview: one approximate city-centre marker (the only coordinate verified so far).
 * Ward boundaries and service layers arrive with the full /map page.
 */
export default function LeafletPreview({ centreLabel }: { centreLabel: string }) {
  const centre: [number, number] = [siteConfig.geo.lat, siteConfig.geo.lng];
  return (
    <MapContainer
      center={centre}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={centre}
        radius={10}
        pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#1e3a8a", fillOpacity: 1 }}
      >
        <Tooltip permanent direction="top" offset={[0, -10]}>
          {centreLabel}
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
