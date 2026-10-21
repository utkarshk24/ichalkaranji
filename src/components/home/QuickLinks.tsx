import { ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { iconFor } from "@/lib/icons";
import type { QuickLink } from "@/types/indicator";

/** External links to official portals. The domain is shown so people can see where they are going. */
export async function QuickLinks({ items }: { items: QuickLink[] }) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = iconFor(item.icon);
        const host = new URL(item.href).hostname.replace(/^www\./, "");
        return (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-surface-2"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-fg">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1 font-semibold group-hover:text-primary">
                  {item.title[locale]}
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-fg-muted" aria-hidden="true" />
                </span>
                <span className="mt-0.5 block text-sm text-fg-muted">{item.body[locale]}</span>
                <span className="mt-1 block truncate text-xs text-fg-muted">{host}</span>
                <span className="sr-only">({t("common.opensOfficial")})</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
