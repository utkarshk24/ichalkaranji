import type { Locale } from "@/i18n/routing";

export type LocalizedText = Record<Locale, string>;

export type DataStatus = "official" | "secondary" | "estimate" | "projection" | "awaited";

export type DataScope = "city" | "urban_agglomeration" | "taluka" | "district" | "state";

export interface DataPoint {
  year: number;
  /** null renders as "Data awaited" (plus the fallback indicator, when one is set). */
  value: number | null;
  status: DataStatus;
  source: string;
  sourceUrl: string;
  /** How an estimate or derived value was produced, or why a figure is awaited (null when a plain count). */
  method: LocalizedText | null;
  /** ISO date the value was last checked against its source. */
  retrieved: string;
}

export interface Indicator {
  id: string;
  label: LocalizedText;
  unit: LocalizedText;
  scope: DataScope;
  series: DataPoint[];
  note?: LocalizedText;
  fallback?: { scope: DataScope; indicatorId: string };
}

/** A sourced, non-numeric fact (e.g. main language, civic status). */
export interface Fact {
  id: string;
  icon: string;
  label: LocalizedText;
  value: LocalizedText;
  detail: LocalizedText;
  year: number | null;
  status: DataStatus;
  source: string;
  sourceUrl: string;
}

export type NewsCategory = "civic" | "election" | "water" | "environment";

export interface NewsItem {
  id: string;
  /** ISO date of the event or report. */
  date: string;
  category: NewsCategory;
  title: LocalizedText;
  summary: LocalizedText;
  source: string;
  sourceUrl: string;
}

export type FeaturedCategory = "heritage" | "music" | "attraction" | "festival" | "food";

export interface FeaturedItem {
  id: string;
  category: FeaturedCategory;
  href: string;
  title: LocalizedText;
  body: LocalizedText;
  source: string;
  sourceUrl: string;
}

export interface QuickLink {
  id: string;
  icon: string;
  href: string;
  title: LocalizedText;
  body: LocalizedText;
}

export type PlaceCategory = "landmark" | "transport" | "tourism" | "neighbourhood";

export interface Place {
  id: string;
  category: PlaceCategory;
  /** null when no cited source gives a position; such places are listed but never pinned. */
  lat: number | null;
  lng: number | null;
  /** True when the source gives a rounded position (e.g. whole minutes). */
  approximate: boolean;
  tourism?: { group: "in-city" | "nearby" };
  name: LocalizedText;
  description: LocalizedText;
  source: string;
  sourceUrl: string;
  verified: string;
}

export type TimelineEra = "princely" | "industry" | "culture" | "civic";
export type TimelineStatus = "official" | "secondary" | "unverified" | "disputed";

export interface TimelineEvent {
  id: string;
  year: number;
  label: string;
  era: TimelineEra;
  status: TimelineStatus;
  title: LocalizedText;
  body: LocalizedText;
  source: string;
  sourceUrl: string;
}

export interface Itinerary {
  id: string;
  title: LocalizedText;
  days: { label: LocalizedText; stops: string[] }[];
}

export type ProjectCategory = "water" | "sewerage" | "industry" | "connectivity" | "urban";
export type ProjectStatus = "proposed" | "ongoing" | "delayed" | "completed" | "awaited";

/** One row of the civic projects tracker. Cost and progress appear only when a source states them. */
export interface Project {
  id: string;
  category: ProjectCategory;
  status: ProjectStatus;
  title: LocalizedText;
  detail: LocalizedText;
  cost: LocalizedText | null;
  source: string;
  /** Empty when no source has been found yet. */
  sourceUrl: string;
  /** Year or year-month the status refers to; empty when unknown. */
  asOf: string;
  retrieved: string;
}
