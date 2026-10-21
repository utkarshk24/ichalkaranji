import type { PlaceCategory } from "@/types/indicator";

export const placeCategories: PlaceCategory[] = ["landmark", "transport", "tourism", "neighbourhood"];

/**
 * Categorical slots 1–4 of the validated reference palette (blue, orange, aqua, yellow), fixed per category.
 * Markers sit on light OSM tiles in both themes; identity is also carried by the legend and list labels.
 */
export const categoryColor: Record<PlaceCategory, string> = {
  landmark: "#2a78d6",
  transport: "#eb6834",
  tourism: "#1baf7a",
  neighbourhood: "#eda100",
};

/** A place as passed to client map components: already localised. */
export type MapPlace = {
  id: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  approximate: boolean;
  name: string;
  description: string;
  source: string;
  sourceUrl: string;
  km: number;
};
