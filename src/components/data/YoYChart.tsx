"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import type { DataStatus } from "@/types/indicator";

// Recharts is loaded only when a chart nears the viewport, keeping it off the critical path.
const YoYChartPlot = dynamic(() => import("./YoYChartPlot"), { ssr: false });

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
  const plotRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = plotRef.current;
    if (!el || inView) return;
    if (!("IntersectionObserver" in window)) return setInView(true);
    // Draw every chart before printing / "Download as PDF", even ones never scrolled to.
    const onPrint = () => setInView(true);
    window.addEventListener("beforeprint", onPrint);
    window.addEventListener("portal:prepare-print", onPrint);
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setInView(true), { rootMargin: "300px" });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", onPrint);
      window.removeEventListener("portal:prepare-print", onPrint);
    };
  }, [inView]);

  const nf = new Intl.NumberFormat(`${locale}-IN-u-nu-latn`);

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <figcaption>
        <p className="text-base font-semibold text-fg">{labels.title}</p>
        <p className="text-sm text-fg-muted">{labels.subtitle}</p>
      </figcaption>

      {/* Hatch pattern shared by the bars and the legend swatch. */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <pattern id={`hatch-${uid}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="var(--chart-1)" opacity="0.25" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--chart-1)" strokeWidth="3" />
          </pattern>
        </defs>
      </svg>
      <div ref={plotRef} className="mt-4 h-56" role="img" aria-label={labels.chartLabel}>
        {inView && <YoYChartPlot data={data} uid={uid} locale={locale} />}
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

      <div id={`table-${uid}`} hidden={!showTable} tabIndex={0} role="group" aria-label={labels.title} className="mt-3 overflow-x-auto">
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
