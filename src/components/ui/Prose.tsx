import type { ReactNode } from "react";

/** A titled block of article text with a stable anchor for the on-page contents list. */
export function ProseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <h2 id={`${id}-h`} className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-4 text-[1.0625rem] leading-relaxed text-fg/90">{children}</div>
    </section>
  );
}

/** Sticky "On this page" list for long article pages (desktop only). */
export function OnThisPage({ label, items }: { label: string; items: { id: string; title: string }[] }) {
  return (
    <nav aria-label={label} className="sticky top-24 hidden lg:block">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">{label}</p>
      <ul className="mt-3 space-y-2 border-l border-border text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="-ml-px block border-l border-transparent pl-3 text-fg-muted hover:border-primary hover:text-primary">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
