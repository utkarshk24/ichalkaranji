import civic from "@data/indicators/civic.json";
import demographics from "@data/indicators/demographics.json";
import textile from "@data/indicators/textile.json";
import facts from "@data/facts.json";
import featured from "@data/featured.json";
import news from "@data/news.json";
import itineraries from "@data/itineraries.json";
import places from "@data/places.json";
import projects from "@data/projects.json";
import quickLinks from "@data/quick-links.json";
import timeline from "@data/timeline.json";
import type { DataPoint, Fact, FeaturedItem, Indicator, Itinerary, NewsItem, Place, Project, QuickLink, TimelineEvent } from "@/types/indicator";

const all = [...demographics, ...civic, ...textile] as Indicator[];
const byId = new Map(all.map((indicator) => [indicator.id, indicator]));

export function getIndicator(id: string): Indicator {
  const indicator = byId.get(id);
  if (!indicator) throw new Error(`Unknown indicator "${id}" — add it to data/indicators/*.json`);
  return indicator;
}

export function getAllIndicators(): Indicator[] {
  return all;
}

export function getFact(id: string): Fact {
  const fact = (facts as Fact[]).find((f) => f.id === id);
  if (!fact) throw new Error(`Unknown fact "${id}" — add it to data/facts.json`);
  return fact;
}

/** Newest first. */
export function getNews(limit?: number): NewsItem[] {
  const sorted = [...(news as NewsItem[])].sort((a, b) => b.date.localeCompare(a.date));
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getFeatured(): FeaturedItem[] {
  return featured as FeaturedItem[];
}

export function getQuickLinks(): QuickLink[] {
  return quickLinks as QuickLink[];
}

export function getPlaces(): Place[] {
  return places as Place[];
}

export function getPlace(id: string): Place {
  const place = getPlaces().find((p) => p.id === id);
  if (!place) throw new Error(`Unknown place "${id}" — add it to data/places.json`);
  return place;
}

/** Chronological. */
export function getTimeline(): TimelineEvent[] {
  return [...(timeline as TimelineEvent[])].sort((a, b) => a.year - b.year);
}

export function getProjects(): Project[] {
  return projects as Project[];
}

/** Which data file an indicator comes from; drives the dashboard's topic filter. */
export type IndicatorTopic = "people" | "city" | "textile";
const topicOf = new Map<string, IndicatorTopic>([
  ...demographics.map((i) => [i.id, "people"] as const),
  ...civic.map((i) => [i.id, "city"] as const),
  ...textile.map((i) => [i.id, "textile"] as const),
]);

export function indicatorTopic(id: string): IndicatorTopic {
  return topicOf.get(id) ?? "city";
}

export function getItineraries(): Itinerary[] {
  return itineraries as Itinerary[];
}

/** Most recent data point that has a value; falls back to the most recent point overall. */
export function latestPoint(indicator: Indicator): DataPoint {
  const sorted = [...indicator.series].sort((a, b) => b.year - a.year);
  return sorted.find((p) => p.value !== null) ?? sorted[0];
}

/** Change between the two most recent valued points, if both exist. */
export function changeBetweenLatest(indicator: Indicator) {
  const valued = indicator.series.filter((p) => p.value !== null).sort((a, b) => b.year - a.year);
  if (valued.length < 2) return null;
  const [current, previous] = valued;
  const abs = (current.value as number) - (previous.value as number);
  const pct = (abs / (previous.value as number)) * 100;
  return { current, previous, abs, pct };
}
