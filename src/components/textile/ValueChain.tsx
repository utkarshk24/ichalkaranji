import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";

export type ChainStep = {
  key: string;
  title: string;
  body: string;
  stats: { value: string; label: string; meta: string; sourceUrl?: string }[];
};

/**
 * Five-stage value chain drawn as connected cards: left→right on wide screens, top→down on phones.
 * Stat chips appear only where a sourced count exists.
 */
export function ValueChain({ steps, awaitedLabel }: { steps: ChainStep[]; awaitedLabel: string }) {
  return (
    <ol className="grid gap-3 lg:grid-cols-5 lg:gap-0">
      {steps.map((step, i) => (
        <li key={step.key} className="flex flex-col lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-fg">{i + 1}</span>
              <h3 className="font-semibold">{step.title}</h3>
            </div>
            <p className="mt-2 text-sm text-fg-muted">{step.body}</p>
            <div className="mt-auto space-y-2 pt-4">
              {step.stats.length === 0 && <p className="text-xs font-medium text-fg-muted">{awaitedLabel}</p>}
              {step.stats.map((s) => (
                <div key={s.label} className="rounded-lg bg-gold-soft px-3 py-2">
                  <p className="text-lg font-bold tabular-nums text-fg">{s.value}</p>
                  <p className="text-xs text-fg-muted">{s.label}</p>
                  {s.sourceUrl ? (
                    <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-fg-muted hover:underline">
                      {s.meta}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="text-[11px] text-fg-muted">{s.meta}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {i < steps.length - 1 && (
            <span className="flex items-center justify-center py-1 text-gold lg:px-1 lg:py-0" aria-hidden="true">
              <ArrowDown className="h-5 w-5 lg:hidden" />
              <ArrowRight className="hidden h-5 w-5 lg:block" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
