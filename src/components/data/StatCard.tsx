import type { LucideIcon } from "lucide-react";
import { SourceBadge, type SourceBadgeLabels, type SourceDetails } from "./SourceBadge";

/**
 * One "City at a Glance" tile. `value` is pre-formatted by the caller; when it is null the card
 * shows the "Data awaited" wording and, if given, the fallback note instead of a number.
 */
export function StatCard({
  id,
  icon: Icon,
  label,
  value,
  unit,
  context,
  awaitedText,
  fallbackText,
  details,
  labels,
}: {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string | null;
  unit?: string;
  context?: string;
  awaitedText: string;
  fallbackText?: string;
  details: SourceDetails;
  labels: SourceBadgeLabels;
}) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-surface p-4 transition-shadow sm:p-5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-soft text-gold sm:h-10 sm:w-10">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <SourceBadge id={id} title={label} details={details} labels={labels} />
      </div>
      <h3 className="mt-3 text-sm font-medium leading-snug text-fg-muted sm:mt-4">{label}</h3>
      {value !== null ? (
        <p className="mt-1 break-words text-xl font-bold tracking-tight text-fg tabular-nums sm:text-2xl">
          {value}
          {unit && <span className="ml-1 text-sm font-medium text-fg-muted">{unit}</span>}
        </p>
      ) : (
        <div className="mt-1">
          <p className="text-sm font-semibold text-fg-muted sm:text-base">{awaitedText}</p>
          {fallbackText && <p className="mt-1 hidden text-xs text-fg-muted sm:block">{fallbackText}</p>}
        </div>
      )}
      {context && <p className="mt-auto line-clamp-3 pt-3 text-xs text-fg-muted">{context}</p>}
    </article>
  );
}
