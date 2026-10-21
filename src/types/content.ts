import type { DataStatus, LocalizedText, PlaceCategory } from "@/types/indicator";

/** A cited claim inside content blocks. */
export type Cite = { source: string; sourceUrl?: string };

export type Block =
  | { type: "prose"; id: string; title: LocalizedText; paragraphs: LocalizedText[] }
  | {
      type: "facts";
      id: string;
      title: LocalizedText;
      rows: ({ label: LocalizedText; value: LocalizedText; status: DataStatus } & Cite)[];
    }
  | { type: "list"; id: string; title: LocalizedText; items: LocalizedText[]; lead?: LocalizedText }
  | { type: "cards"; id: string; title: LocalizedText; lead?: LocalizedText; items: ({ title: LocalizedText; body: LocalizedText } & Partial<Cite>)[] }
  | { type: "indicators"; id: string; title: LocalizedText; lead?: LocalizedText; ids: { id: string; year?: number }[] }
  | { type: "chart"; id: string; indicatorId: string; title: LocalizedText; subtitle: LocalizedText; body?: LocalizedText }
  | { type: "awaited"; id: string; title: LocalizedText; lead?: LocalizedText; items: LocalizedText[] }
  | { type: "links"; id: string; title: LocalizedText; items: { title: LocalizedText; href: string; body?: LocalizedText }[] }
  | { type: "callout"; id: string; tone: "info" | "warning"; body: LocalizedText }
  | {
      type: "table";
      id: string;
      title: LocalizedText;
      lead?: LocalizedText;
      columns: LocalizedText[];
      rows: LocalizedText[][];
      cite?: Cite;
    }
  | { type: "faq"; id: string; title: LocalizedText; items: { q: LocalizedText; a: LocalizedText }[] }
  | { type: "weather"; id: string; title: LocalizedText }
  | { type: "map"; id: string; title: LocalizedText; categories: PlaceCategory[] }
  | { type: "quicklinks"; id: string; title: LocalizedText; lead?: LocalizedText }
  | { type: "emergency"; id: string; title: LocalizedText; lead?: LocalizedText };

export interface PageContent {
  route: string;
  summary: LocalizedText;
  updated: string;
  blocks: Block[];
}
