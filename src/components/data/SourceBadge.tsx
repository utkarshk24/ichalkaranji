import { ExternalLink, Info, X } from "lucide-react";
import type { DataStatus } from "@/types/indicator";
import { StatusPill } from "./StatusPill";

export type SourceDetails = {
  status: DataStatus;
  statusLabel: string;
  year?: string;
  scope?: string;
  source: string;
  sourceUrl?: string;
  method?: string;
  note?: string;
  checked?: string;
};

export type SourceBadgeLabels = {
  trigger: string;
  close: string;
  year: string;
  method: string;
  source: string;
  noLink: string;
  externalLink: string;
};

/**
 * Info button that opens a native popover with a figure's provenance.
 * Uses the HTML popover API: no JS, light-dismiss, Escape and focus return come from the browser.
 */
export function SourceBadge({ id, title, details, labels }: { id: string; title: string; details: SourceDetails; labels: SourceBadgeLabels }) {
  const popoverId = `src-${id}`;
  return (
    <>
      <button
        type="button"
        popoverTarget={popoverId}
        aria-label={labels.trigger}
        title={labels.trigger}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-2 hover:text-primary"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </button>

      <div
        id={popoverId}
        popover="auto"
        role="dialog"
        aria-label={labels.trigger}
        className="source-popover rounded-2xl border border-border bg-surface p-5 text-left text-fg shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-base font-semibold">{title}</p>
          <button
            type="button"
            popoverTarget={popoverId}
            popoverTargetAction="hide"
            aria-label={labels.close}
            className="-mr-2 -mt-2 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-2"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <StatusPill status={details.status} label={details.statusLabel} />
          {details.year && (
            <span>
              {labels.year}: <span className="font-medium text-fg">{details.year}</span>
            </span>
          )}
          {details.scope && <span>· {details.scope}</span>}
        </div>

        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-fg-muted">{labels.source}</dt>
            <dd className="mt-0.5">
              {details.sourceUrl ? (
                <a href={details.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-primary underline-offset-2 hover:underline">
                  <span>{details.source}</span>
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="sr-only">({labels.externalLink})</span>
                </a>
              ) : (
                <span>
                  {details.source} <span className="text-fg-muted">· {labels.noLink}</span>
                </span>
              )}
            </dd>
          </div>
          {details.method && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-fg-muted">{labels.method}</dt>
              <dd className="mt-0.5">{details.method}</dd>
            </div>
          )}
          {details.note && <p className="rounded-lg bg-surface-2 px-3 py-2 text-xs">{details.note}</p>}
        </dl>
        {details.checked && <p className="mt-4 text-xs text-fg-muted">{details.checked}</p>}
      </div>
    </>
  );
}
