import featured from "@data/featured.json";
import facts from "@data/facts.json";
import quickLinks from "@data/quick-links.json";
import { getAllIndicators, getNews, getPlaces, getProjects, getTimeline } from "@/lib/data";
import { contentRoutes, type SectionRoute } from "@/lib/site";
import type { Block, PageContent } from "@/types/content";
import type { DataStatus, Fact, FeaturedItem, QuickLink } from "@/types/indicator";

/** Where a citation appears: a section route, or the home page. */
export type UsedOn = SectionRoute | "home";

export interface SourceEntry {
  /** Display name as written in the data files. */
  name: string;
  url: string;
  usedOn: UsedOn[];
  statuses: DataStatus[];
}

const dataStatuses = new Set<string>(["official", "secondary", "estimate", "projection", "awaited"]);

/**
 * Every citation in data/, gathered at build time. Entries are keyed by URL (or by name when a
 * source has no link), so one document cited on several pages appears once with all its pages.
 */
export async function collectSources(): Promise<SourceEntry[]> {
  const map = new Map<string, { name: string; url: string; usedOn: Set<UsedOn>; statuses: Set<DataStatus> }>();

  const add = (name: string, url: string | undefined, usedOn: UsedOn[], status?: string) => {
    if (!name || name === "—") return;
    const key = url || `name:${name}`;
    const entry = map.get(key) ?? { name, url: url ?? "", usedOn: new Set<UsedOn>(), statuses: new Set<DataStatus>() };
    usedOn.forEach((u) => entry.usedOn.add(u));
    if (status && dataStatuses.has(status)) entry.statuses.add(status as DataStatus);
    map.set(key, entry);
  };

  for (const indicator of getAllIndicators()) {
    for (const p of indicator.series) add(p.source, p.sourceUrl, ["data"], p.status);
  }
  for (const f of facts as Fact[]) add(f.source, f.sourceUrl, ["home"], f.status);
  for (const f of featured as FeaturedItem[]) add(f.source, f.sourceUrl, ["home"]);
  for (const n of getNews()) add(n.source, n.sourceUrl, ["news", "home"], "secondary");
  for (const p of getPlaces()) add(p.source, p.sourceUrl, ["map", "tourism"]);
  for (const e of getTimeline()) add(e.source, e.sourceUrl, ["history"], e.status);
  for (const p of getProjects()) add(p.source, p.sourceUrl, ["projects"]);
  for (const q of quickLinks as QuickLink[]) add(`${q.title.en} (${new URL(q.href).hostname})`, q.href, ["civic-services"], "official");

  for (const route of contentRoutes) {
    const content = (await import(`@data/pages/${route}.json`)).default as PageContent;
    for (const block of content.blocks as Block[]) {
      if (block.type === "facts") block.rows.forEach((r) => add(r.source, r.sourceUrl, [route], r.status));
      if (block.type === "cards") block.items.forEach((c) => c.source && add(c.source, c.sourceUrl, [route]));
      if (block.type === "table" && block.cite) add(block.cite.source, block.cite.sourceUrl, [route]);
    }
  }

  const statusRank = (s: Set<DataStatus>) => (s.has("official") ? 0 : s.has("secondary") ? 1 : 2);
  return [...map.values()]
    .map((e) => ({ name: e.name, url: e.url, usedOn: [...e.usedOn], statuses: [...e.statuses] }))
    .sort((a, b) => statusRank(new Set(a.statuses)) - statusRank(new Set(b.statuses)) || a.name.localeCompare(b.name));
}
