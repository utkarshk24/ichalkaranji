"use client";

import { useState, type ReactNode } from "react";

/**
 * Topic chips over server-rendered news cards. Cards arrive as nodes so their markup and
 * translations stay on the server; this component only decides which ones are visible.
 */
export function NewsFilter<C extends string>({
  items,
  categories,
  labels,
}: {
  items: { id: string; category: C; node: ReactNode }[];
  categories: { key: C; label: string }[];
  labels: { filter: string; all: string; empty: string; counts: Record<number, string> };
}) {
  const [active, setActive] = useState<"all" | C>("all");
  const shown = items.filter((i) => active === "all" || i.category === active);
  const countFor = (key: "all" | C) => (key === "all" ? items.length : items.filter((i) => i.category === key).length);

  return (
    <>
      <fieldset data-no-print>
        <legend className="mb-2 text-xs font-semibold text-fg-muted">{labels.filter}</legend>
        <div className="flex flex-wrap gap-1.5">
          {[{ key: "all" as const, label: labels.all }, ...categories].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={active === key}
              onClick={() => setActive(key)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-fg hover:bg-surface-2 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-fg"
            >
              {label}
              <span className="rounded-full bg-surface-2 px-1.5 text-xs tabular-nums text-fg-muted">{countFor(key)}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <p className="mt-3 text-sm text-fg-muted" aria-live="polite" data-no-print>
        {labels.counts[shown.length]}
      </p>
      {shown.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-fg-muted">{labels.empty}</p>
      ) : (
        <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((i) => (
            <li key={i.id}>{i.node}</li>
          ))}
        </ol>
      )}
    </>
  );
}
