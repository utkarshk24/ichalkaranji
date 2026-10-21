import type { LucideIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { PrintButton } from "./PrintButton";

/** Standard top-of-page block: breadcrumbs, icon, title, lead, last-updated date and "Download as PDF". */
export async function PageHeader({
  title,
  lead,
  icon: Icon,
  crumbs,
  baseUrl,
  updated,
  printable = true,
}: {
  title: string;
  lead: string;
  icon?: LucideIcon;
  crumbs: Crumb[];
  baseUrl: string;
  /** ISO date the page's content was last checked. */
  updated?: string;
  /** Show "Download as PDF" (off for pages with nothing worth printing, e.g. the contact form). */
  printable?: boolean;
}) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  return (
    <div className="loom-texture border-b border-border bg-surface-2/60">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6">
        <Breadcrumbs items={crumbs} baseUrl={baseUrl} />
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-start gap-4">
            {Icon && (
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg sm:inline-flex">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">{title}</h1>
              <p className="mt-2 max-w-2xl text-lg text-fg-muted">{lead}</p>
              {updated && <p className="mt-3 text-xs text-fg-muted">{t("site.lastUpdated", { date: formatDate(updated, locale) })}</p>}
            </div>
          </div>
          {printable && <PrintButton label={t("common.downloadPdf")} />}
        </div>
      </div>
    </div>
  );
}
