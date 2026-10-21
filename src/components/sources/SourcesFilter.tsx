"use client";

import { useState, type ReactNode } from "react";

/** "All / Official only" toggle over server-rendered source rows. */
export function SourcesFilter({
  rows,
  head,
  labels,
}: {
  rows: { key: string; official: boolean; node: ReactNode }[];
  head: ReactNode;
  labels: { filter: string; all: string; official: string; caption: string };
}) {
  const [officialOnly, setOfficialOnly] = useState(false);
  const shown = officialOnly ? rows.filter((r) => r.official) : rows;
  const options = [
    { value: false, label: labels.all, count: rows.length },
    { value: true, label: labels.official, count: rows.filter((r) => r.official).length },
  ];

  return (
    <>
      <fieldset data-no-print className="mb-4">
        <legend className="mb-2 text-xs font-semibold text-fg-muted">{labels.filter}</legend>
        <div className="inline-flex rounded-lg border border-border p-0.5">
          {options.map((o) => (
            <button
              key={String(o.value)}
              type="button"
              aria-pressed={officialOnly === o.value}
              onClick={() => setOfficialOnly(o.value)}
              className="rounded-md px-3 py-1 text-sm font-medium text-fg-muted aria-pressed:bg-surface-2 aria-pressed:text-fg"
            >
              {o.label} <span className="tabular-nums">({o.count})</span>
            </button>
          ))}
        </div>
      </fieldset>
      <div tabIndex={0} role="group" aria-label={labels.caption} className="overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">{labels.caption}</caption>
          {head}
          <tbody className="divide-y divide-border">{shown.map((r) => r.node)}</tbody>
        </table>
      </div>
    </>
  );
}
