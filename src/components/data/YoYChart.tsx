"use client";

import { useId, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DataStatus } from "@/types/indicator";

export type ChartPoint = {
  year: number;
  value: number | null;
  status: DataStatus;
  statusLabel: string;
  source: string;
};

type Labels = {
  title: string;
  subtitle: string;
  chartLabel: string;
  estimateKey: string;
  showTable: string;
  hideTable: string;
  year: string;
  value: string;
  status: string;
  source: string;
  awaited?: string;
};

const isEstimate = (s: DataStatus) => s === "estimate" || s === "projection";

/**
 * Single-series column chart for an indicator over years.
 * Only valued points are drawn (no interpolation); estimates are hatched and say so in the tooltip,
 * the key and the table, so status is never carried by colour alone. Values use Indian grouping.
 */
export function YoYChart({ points, labels, locale }: { points: ChartPoint[]; labels: Labels; locale: string }) {
  const uid = useId().replace(/:/g, "");
  const [showTable, setShowTable] = useState(false);
  const data = points.filter((p) => p.value !== null).sort((a, b) => a.year - b.year);
  const hasEstimate = data.some((p) => isEstimate(p.status));

  const nf = new Intl.NumberFormat(`${locale}-IN-u-nu-latn`);
  const intlCompact = new Intl.NumberFormat(`${locale}-IN-u-nu-latn`, { notation: "compact", maximumFractionDigits: 1 });
  // en-IN abbreviates thousand as "T"; use the familiar K / L (lakh) / Cr instead. mr/hi words read fine.
  const compact = {
    format(v: number) {
      if (locale !== "en") return intlCompact.format(v);
      const abs = Math.abs(v);
      const fmt = (n: number, suffix: string) => `${Number(n.toFixed(1))}${suffix}`;
      if (abs >= 1e7) return fmt(v / 1e7, "Cr");
      if (abs >= 1e5) return fmt(v / 1e5, "L");
      if (abs >= 1e3) return fmt(v / 1e3, "K");
      return String(v);
    },
  };

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <figcaption>
        <p className="text-base font-semibold text-fg">{labels.title}</p>
        <p className="text-sm text-fg-muted">{labels.subtitle}</p>
      </figcaption>

      <div className="mt-4 h-56" role="img" aria-label={labels.chartLabel}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 8, bottom: 0, left: 0 }} barCategoryGap="30%">
            <defs>
              <pattern id={`hatch-${uid}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <rect width="6" height="6" fill="var(--chart-1)" opacity="0.25" />
                <line x1="0" y1="0" x2="0" y2="6" stroke="var(--chart-1)" strokeWidth="3" />
              </pattern>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
            <XAxis dataKey="year" tickLine={false} axisLine={{ stroke: "var(--border)" }} tick={{ fill: "var(--fg-muted)", fontSize: 12 }} />
            <YAxis
              width={locale === "en" ? 44 : 68}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--fg-muted)", fontSize: 12 }}
              tickFormatter={(v: number) => compact.format(v)}
            />
            <Tooltip
              cursor={{ fill: "var(--surface-2)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const p = payload[0].payload as ChartPoint;
                return (
                  <div className="rounded-lg border border-border bg-surface px-3 py-2 text-xs shadow-lg">
                    <p className="font-semibold text-fg">{p.year}</p>
                    <p className="text-fg tabular-nums">{nf.format(p.value as number)}</p>
                    <p className="text-fg-muted">{p.statusLabel}</p>
                    <p className="max-w-[14rem] text-fg-muted"><span lang="en">{p.source}</span></p>
                  </div>
                );
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false}>
              {data.map((p) => (
                <Cell key={p.year} fill={isEstimate(p.status) ? `url(#hatch-${uid})` : "var(--chart-1)"} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                offset={8}
                className="fill-fg-muted text-[11px] tabular-nums"
                formatter={(v: unknown) => (typeof v === "number" ? nf.format(v) : "")}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-fg-muted">
        <span>
          {hasEstimate && (
            <span className="inline-flex items-center gap-1.5">
              <svg width="12" height="12" aria-hidden="true">
                <rect width="12" height="12" rx="2" fill={`url(#hatch-${uid})`} />
              </svg>
              {labels.estimateKey}
            </span>
          )}
          {labels.awaited && <span className="ml-3">{labels.awaited}</span>}
        </span>
        <button
          type="button"
          onClick={() => setShowTable((s) => !s)}
          aria-expanded={showTable}
          aria-controls={`table-${uid}`}
          className="rounded-full px-2 py-1 font-medium text-primary hover:bg-surface-2"
        >
          {showTable ? labels.hideTable : labels.showTable}
        </button>
      </div>

      <div id={`table-${uid}`} hidden={!showTable} className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <caption className="sr-only">{labels.chartLabel}</caption>
          <thead className="text-fg-muted">
            <tr className="border-b border-border">
              <th scope="col" className="py-1.5 pr-3 font-medium">{labels.year}</th>
              <th scope="col" className="py-1.5 pr-3 font-medium">{labels.value}</th>
              <th scope="col" className="py-1.5 pr-3 font-medium">{labels.status}</th>
              <th scope="col" className="py-1.5 font-medium">{labels.source}</th>
            </tr>
          </thead>
          <tbody>
            {[...points].sort((a, b) => a.year - b.year).map((p) => (
              <tr key={p.year} className="border-b border-border/60">
                <th scope="row" className="py-1.5 pr-3 font-medium">{p.year}</th>
                <td className="py-1.5 pr-3 tabular-nums">{p.value === null ? "—" : nf.format(p.value)}</td>
                <td className="py-1.5 pr-3">{p.statusLabel}</td>
                <td className="py-1.5 text-fg-muted"><span lang="en">{p.source}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
