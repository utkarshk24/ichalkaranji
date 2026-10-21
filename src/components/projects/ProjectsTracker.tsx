"use client";

import { CheckCircle2, CircleDashed, Clock, ExternalLink, Hammer, Lightbulb, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProjectCategory, ProjectStatus } from "@/types/indicator";

export type TrackerProject = {
  id: string;
  category: ProjectCategory;
  status: ProjectStatus;
  title: string;
  detail: string;
  cost: string | null;
  source: string;
  sourceUrl: string;
  asOf: string;
};

type Labels = {
  statusFilter: string;
  all: string;
  category: string;
  allCategories: string;
  categories: Record<ProjectCategory, string>;
  statuses: Record<ProjectStatus, string>;
  /** "{count} projects" already resolved for every possible count. */
  counts: Record<number, string>;
  cost: string;
  noCost: string;
  noSource: string;
  source: string;
  empty: string;
  externalLink: string;
};

export const projectStatusOrder: ProjectStatus[] = ["proposed", "ongoing", "delayed", "completed", "awaited"];

/** Status always shows icon + words; colours only reinforce. */
const statusStyle: Record<ProjectStatus, { icon: LucideIcon; className: string }> = {
  proposed: { icon: Lightbulb, className: "bg-surface-2 text-primary" },
  ongoing: { icon: Hammer, className: "bg-emerald-soft text-emerald" },
  delayed: { icon: Clock, className: "bg-danger-soft text-danger" },
  completed: { icon: CheckCircle2, className: "bg-emerald-soft text-emerald" },
  awaited: { icon: CircleDashed, className: "bg-surface-2 text-fg-muted" },
};

export function ProjectStatusPill({ status, label }: { status: ProjectStatus; label: string }) {
  const { icon: Icon, className } = statusStyle[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${className}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export function ProjectsTracker({ projects, labels }: { projects: TrackerProject[]; labels: Labels }) {
  const [status, setStatus] = useState<"all" | ProjectStatus>("all");
  const [category, setCategory] = useState<"all" | ProjectCategory>("all");
  const categories = [...new Set(projects.map((p) => p.category))];

  const counts = useMemo(() => {
    const inCategory = projects.filter((p) => category === "all" || p.category === category);
    return Object.fromEntries(projectStatusOrder.map((s) => [s, inCategory.filter((p) => p.status === s).length])) as Record<ProjectStatus, number>;
  }, [projects, category]);

  const shown = projects.filter((p) => (status === "all" || p.status === status) && (category === "all" || p.category === category));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 md:flex-row md:items-end md:justify-between" data-no-print>
        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold text-fg-muted">{labels.statusFilter}</legend>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip pressed={status === "all"} onClick={() => setStatus("all")} label={labels.all} count={total} />
            {projectStatusOrder.map((s) => (
              <FilterChip key={s} pressed={status === s} onClick={() => setStatus(s)} label={labels.statuses[s]} count={counts[s]} />
            ))}
          </div>
        </fieldset>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-fg-muted">{labels.category}</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as "all" | ProjectCategory)}
            className="h-9 rounded-lg border border-border bg-surface px-2 text-sm text-fg"
          >
            <option value="all">{labels.allCategories}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {labels.categories[c]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 text-sm text-fg-muted" aria-live="polite" data-no-print>
        {labels.counts[shown.length]}
      </p>

      {shown.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-fg-muted">{labels.empty}</p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {shown.map((p) => (
            <li key={p.id}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <ProjectStatusPill status={p.status} label={labels.statuses[p.status]} />
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-fg-muted">{labels.categories[p.category]}</span>
                  {p.asOf && <span className="ml-auto text-xs text-fg-muted">{p.asOf}</span>}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{p.detail}</p>
                <dl className="mt-4 border-t border-border pt-3 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-fg-muted">{labels.cost}:</dt>
                    <dd className={p.cost ? "font-semibold" : "text-fg-muted"}>{p.cost ?? labels.noCost}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-3 text-xs">
                  {p.sourceUrl ? (
                    <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      {labels.source}: <span lang="en">{p.source}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="sr-only">({labels.externalLink})</span>
                    </a>
                  ) : (
                    <span className="text-fg-muted">{labels.noSource}</span>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({ pressed, onClick, label, count }: { pressed: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-fg hover:bg-surface-2 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-fg"
    >
      {label}
      <span className="rounded-full bg-surface-2 px-1.5 text-xs tabular-nums text-fg-muted">{count}</span>
    </button>
  );
}
