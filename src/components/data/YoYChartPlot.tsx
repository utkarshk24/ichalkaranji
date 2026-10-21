"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ChartPoint } from "./YoYChart";

const isEstimate = (s: ChartPoint["status"]) => s === "estimate" || s === "projection";

/** The Recharts part of YoYChart, split out so it loads only when the chart scrolls into view. */
export default function YoYChartPlot({ data, uid, locale }: { data: ChartPoint[]; uid: string; locale: string }) {
  const nf = new Intl.NumberFormat(`${locale}-IN-u-nu-latn`);
  const intlCompact = new Intl.NumberFormat(`${locale}-IN-u-nu-latn`, { notation: "compact", maximumFractionDigits: 1 });
  // en-IN abbreviates thousand as "T"; use the familiar K / L (lakh) / Cr instead. mr/hi words read fine.
  const compact = (v: number) => {
    if (locale !== "en") return intlCompact.format(v);
    const abs = Math.abs(v);
    const fmt = (n: number, suffix: string) => `${Number(n.toFixed(1))}${suffix}`;
    if (abs >= 1e7) return fmt(v / 1e7, "Cr");
    if (abs >= 1e5) return fmt(v / 1e5, "L");
    if (abs >= 1e3) return fmt(v / 1e3, "K");
    return String(v);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 24, right: 8, bottom: 0, left: 0 }} barCategoryGap="30%">
        <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
        <XAxis dataKey="year" tickLine={false} axisLine={{ stroke: "var(--border)" }} tick={{ fill: "var(--fg-muted)", fontSize: 12 }} />
        <YAxis
          width={locale === "en" ? 44 : 68}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--fg-muted)", fontSize: 12 }}
          tickFormatter={(v: number) => compact(v)}
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
  );
}
