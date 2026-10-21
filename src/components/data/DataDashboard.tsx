"use client";

import { ArrowDownRight, ArrowUpRight, Download, ExternalLink, LineChart, Minus, Search, TriangleAlert } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";
import { StatusPill } from "@/components/data/StatusPill";
import { YoYChart, type ChartPoint } from "@/components/data/YoYChart";
import type { IndicatorTopic } from "@/lib/data";
import type { DataStatus } from "@/types/indicator";

export type DashboardPoint = { year: number; valueText: string | null; status: DataStatus; statusLabel: string };

export type DashboardRow = {
  id: string;
  topic: IndicatorTopic;
  label: string;
  unit: string;
  scope: string;
  source: string;
  sourceUrl: string;
  /** Most recent point with a value, or the most recent awaited point when none has one. */
  latest: DashboardPoint;
  previous: DashboardPoint | null;
  change: { text: string; direction: "up" | "down" | "flat"; mixed: boolean } | null;
  /** Long-format CSV rows: one per year, already localised for labels. */
  csv: (string | number)[][];
  chart: { points: ChartPoint[]; labels: Parameters<typeof YoYChart>[0]["labels"] } | null;
};

type Labels = {
  /** Visually hidden h2 above the indicator cards/table (keeps the heading outline h1 → h2 → h3). */
  listTitle: string;
  filters: string;
  topic: string;
  topics: Record<"all" | IndicatorTopic, string>;
  status: string;
  statusAll: string;
  statuses: Record<DataStatus, string>;
  search: string;
  searchPlaceholder: string;
  showing: string;
  view: string;
  viewCards: string;
  viewTable: string;
  downloadCsv: string;
  csvNote: string;
  latest: string;
  previous: string;
  change: string;
  increase: string;
  decrease: string;
  noPrevious: string;
  mixedNote: string;
  trendTitle: string;
  trendLead: string;
  trendSelect: string;
  trendButton: string;
  empty: string;
  reset: string;
  indicator: string;
  year: string;
  scope: string;
  source: string;
  externalLink: string;
};

const CSV_HEADER = ["indicator_id", "indicator", "unit", "scope", "year", "value", "status", "source", "source_url", "method", "retrieved"];
const topics: ("all" | IndicatorTopic)[] = ["all", "people", "city", "textile"];
const statuses: DataStatus[] = ["official", "secondary", "estimate", "projection", "awaited"];

function toCsv(rows: (string | number)[][]) {
  const cell = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  // BOM so spreadsheet apps read Devanagari labels as UTF-8.
  return "﻿" + [CSV_HEADER, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");
}

/**
 * The /data dashboard: topic, status and text filters in one row, cards or table view,
 * a per-indicator trend chart, and CSV export of exactly what is shown.
 */
export function DataDashboard({
  rows,
  labels,
  locale,
  defaultChart,
}: {
  rows: DashboardRow[];
  labels: Labels;
  locale: string;
  defaultChart: string;
}) {
  const uid = useId();
  const [topic, setTopic] = useState<"all" | IndicatorTopic>("all");
  const [status, setStatus] = useState<"all" | DataStatus>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"cards" | "table">("cards");
  const charted = rows.filter((r) => r.chart);
  const [chartId, setChartId] = useState(defaultChart);
  const trendRef = useRef<HTMLElement>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale);
    return rows.filter(
      (r) =>
        (topic === "all" || r.topic === topic) &&
        (status === "all" || r.latest.status === status) &&
        (!q || r.label.toLocaleLowerCase(locale).includes(q) || r.id.includes(q)),
    );
  }, [rows, topic, status, query, locale]);

  const filtered = topic !== "all" || status !== "all" || query !== "";
  const selected = charted.find((r) => r.id === chartId) ?? charted[0];

  function download() {
    const blob = new Blob([toCsv(shown.flatMap((r) => r.csv))], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ichalkaranji-indicators-${locale}${topic !== "all" ? `-${topic}` : ""}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function showTrend(id: string) {
    setChartId(id);
    trendRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    trendRef.current?.focus({ preventScroll: true });
  }

  const showing = labels.showing.replace("{shown}", String(shown.length)).replace("{total}", String(rows.length));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Filters: one row on desktop, stacked on phones. */}
      <div role="group" aria-label={labels.filters} data-no-print className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end">
          <fieldset>
            <legend className="mb-1.5 text-xs font-semibold text-fg-muted">{labels.topic}</legend>
            <div className="flex flex-wrap gap-1.5">
              {topics.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={topic === key}
                  onClick={() => setTopic(key)}
                  className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-fg hover:bg-surface-2 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-fg"
                >
                  {labels.topics[key]}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-fg-muted">{labels.status}</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "all" | DataStatus)}
              className="h-9 rounded-lg border border-border bg-surface px-2 text-sm text-fg"
            >
              <option value="all">{labels.statusAll}</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {labels.statuses[s]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-fg-muted">{labels.search}</span>
            <span className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={labels.searchPlaceholder}
                className="h-9 w-full rounded-lg border border-border bg-surface pl-8 pr-2 text-sm text-fg placeholder:text-fg-muted md:w-56"
              />
            </span>
          </label>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <fieldset>
            <legend className="mb-1.5 text-xs font-semibold text-fg-muted">{labels.view}</legend>
            <div className="inline-flex rounded-lg border border-border p-0.5">
              {(["cards", "table"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className="rounded-md px-3 py-1 text-sm font-medium text-fg-muted aria-pressed:bg-surface-2 aria-pressed:text-fg"
                >
                  {v === "cards" ? labels.viewCards : labels.viewTable}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            onClick={download}
            disabled={shown.length === 0}
            aria-describedby={`${uid}-csv`}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg hover:bg-primary-hover disabled:opacity-50"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {labels.downloadCsv}
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-fg-muted" data-no-print>
        <p aria-live="polite">{showing}</p>
        <p id={`${uid}-csv`}>{labels.csvNote}</p>
      </div>

      <h2 className="sr-only">{labels.listTitle}</h2>
      {shown.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-fg-muted">{labels.empty}</p>
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setTopic("all");
                setStatus("all");
                setQuery("");
              }}
              className="mt-3 text-sm font-semibold text-primary hover:underline"
            >
              {labels.reset}
            </button>
          )}
        </div>
      ) : view === "cards" ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <li key={r.id}>
              <IndicatorTile row={r} labels={labels} onTrend={r.chart ? () => showTrend(r.id) : undefined} />
            </li>
          ))}
        </ul>
      ) : (
        <div tabIndex={0} role="group" aria-label={labels.listTitle} className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-surface-2 text-xs text-fg-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">{labels.indicator}</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">{labels.latest}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{labels.year}</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">{labels.previous}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{labels.change}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{labels.status}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{labels.scope}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{labels.source}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shown.map((r) => (
                <tr key={r.id} className="align-top">
                  <th scope="row" className="px-4 py-3 font-medium text-fg">
                    {r.label}
                    <span className="block text-xs font-normal text-fg-muted">{r.unit}</span>
                  </th>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{r.latest.valueText ?? r.latest.statusLabel}</td>
                  <td className="px-4 py-3 tabular-nums">{r.latest.year}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.previous ? `${r.previous.valueText} (${r.previous.year})` : "—"}</td>
                  <td className="px-4 py-3 tabular-nums">{r.change ? r.change.text : "—"}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={r.latest.status} label={r.latest.statusLabel} />
                  </td>
                  <td className="px-4 py-3">{r.scope}</td>
                  <td className="px-4 py-3">
                    <SourceLink row={r} externalLink={labels.externalLink} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected?.chart && (
        <section ref={trendRef} tabIndex={-1} aria-labelledby={`${uid}-trend`} className="mt-12 scroll-mt-24 outline-none">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id={`${uid}-trend`} className="text-2xl font-bold tracking-tight">
                {labels.trendTitle}
              </h2>
              <p className="mt-1 text-fg-muted">{labels.trendLead}</p>
            </div>
            <label className="flex flex-col gap-1.5" data-no-print>
              <span className="text-xs font-semibold text-fg-muted">{labels.trendSelect}</span>
              <select
                value={selected.id}
                onChange={(e) => setChartId(e.target.value)}
                className="h-9 max-w-xs rounded-lg border border-border bg-surface px-2 text-sm text-fg"
              >
                {charted.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="max-w-3xl">
            <YoYChart key={selected.id} points={selected.chart.points} labels={selected.chart.labels} locale={locale} />
          </div>
        </section>
      )}
    </div>
  );
}

function SourceLink({ row, externalLink }: { row: DashboardRow; externalLink: string }) {
  if (!row.source) return <span className="text-fg-muted">—</span>;
  if (!row.sourceUrl) return <span lang="en" className="text-fg-muted">{row.source}</span>;
  return (
    <a href={row.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-primary hover:underline">
      <span lang="en" className="line-clamp-2">{row.source}</span>
      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">({externalLink})</span>
    </a>
  );
}

function IndicatorTile({ row, labels, onTrend }: { row: DashboardRow; labels: Labels; onTrend?: () => void }) {
  const ChangeIcon = row.change?.direction === "up" ? ArrowUpRight : row.change?.direction === "down" ? ArrowDownRight : Minus;
  const changeWord = row.change?.direction === "up" ? labels.increase : row.change?.direction === "down" ? labels.decrease : "";
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium leading-snug text-fg-muted">{row.label}</h3>
        <StatusPill status={row.latest.status} label={row.latest.statusLabel} />
      </div>
      {row.latest.valueText !== null ? (
        <p className="mt-2 text-2xl font-bold tracking-tight text-fg tabular-nums">
          {row.latest.valueText}
          <span className="ml-1 text-sm font-medium text-fg-muted">{row.unit}</span>
        </p>
      ) : (
        <p className="mt-2 text-base font-semibold text-fg-muted">{row.latest.statusLabel}</p>
      )}
      <p className="text-xs text-fg-muted">
        {row.scope} · {row.latest.year}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
        <div>
          <dt className="text-xs text-fg-muted">{labels.previous}</dt>
          <dd className="font-medium tabular-nums">
            {row.previous ? (
              <>
                {row.previous.valueText} <span className="text-xs font-normal text-fg-muted">({row.previous.year})</span>
              </>
            ) : (
              <span className="text-xs font-normal text-fg-muted">{labels.noPrevious}</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-fg-muted">{labels.change}</dt>
          <dd className="flex items-center gap-1 font-medium tabular-nums">
            {row.change ? (
              <>
                <ChangeIcon className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden="true" />
                {changeWord && <span className="sr-only">{changeWord}:</span>}
                {row.change.text}
              </>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>
      {row.change?.mixed && (
        <p className="mt-2 flex items-start gap-1.5 text-xs text-fg-muted">
          <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
          {labels.mixedNote}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 text-xs">
        <SourceLink row={row} externalLink={labels.externalLink} />
        {onTrend && (
          <button type="button" onClick={onTrend} data-no-print className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            <LineChart className="h-3.5 w-3.5" aria-hidden="true" />
            {labels.trendButton}
            <span className="sr-only">: {row.label}</span>
          </button>
        )}
      </div>
    </article>
  );
}
