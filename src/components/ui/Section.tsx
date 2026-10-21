import type { ReactNode } from "react";

/** Consistent section shell: optional eyebrow, h2, lead and a right-aligned action. */
export function Section({
  id,
  title,
  lead,
  eyebrow,
  action,
  children,
  className = "",
}: {
  id: string;
  title: string;
  lead?: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`mx-auto max-w-7xl px-4 py-14 sm:py-16 ${className}`}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">{eyebrow}</p>}
          <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            {title}
          </h2>
          {lead && <p className="mt-2 text-fg-muted">{lead}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}
