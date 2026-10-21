import { ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { StatusPill } from "@/components/data/StatusPill";
import { PageHeader } from "@/components/layout/PageHeader";
import { SourcesFilter } from "@/components/sources/SourcesFilter";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons, sectionRoutes, siteConfig } from "@/lib/site";
import { collectSources, type UsedOn } from "@/lib/sources";
import type { DataStatus } from "@/types/indicator";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "sources") : {};
}

const statusOrder: DataStatus[] = ["official", "secondary", "estimate", "projection", "awaited"];
const routeOrder = (u: UsedOn) => (u === "home" ? -1 : sectionRoutes.indexOf(u));

export default async function SourcesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();
  const sources = await collectSources();
  const pages = new Set(sources.flatMap((s) => s.usedOn));
  const usedOnLabel = (u: UsedOn) => (u === "home" ? t("sourcesPage.home") : t(`routes.${u}.title`));

  const rows = sources.map((s) => ({
    key: s.url || s.name,
    official: s.statuses.includes("official"),
    node: (
      <tr key={s.url || s.name} className="align-top">
        <th scope="row" className="px-4 py-3 font-medium">
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-primary hover:underline">
              <span lang="en">{s.name}</span>
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="sr-only">({t("footer.externalLink")})</span>
            </a>
          ) : (
            <span>
              <span lang="en">{s.name}</span> <span className="text-xs font-normal text-fg-muted">({t("sourcesPage.noLink")})</span>
            </span>
          )}
          {s.url && <span className="mt-0.5 block break-all text-xs font-normal text-fg-muted">{new URL(s.url).hostname.replace(/^www\./, "")}</span>}
        </th>
        <td className="px-4 py-3">
          <ul className="flex flex-wrap gap-1.5">
            {[...s.usedOn].sort((a, b) => routeOrder(a) - routeOrder(b)).map((u) => (
              <li key={u}>
                <Link href={u === "home" ? "/" : `/${u}`} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-fg hover:underline">
                  {usedOnLabel(u)}
                </Link>
              </li>
            ))}
          </ul>
        </td>
        <td className="px-4 py-3">
          <span className="flex flex-wrap gap-1">
            {statusOrder
              .filter((st) => s.statuses.includes(st))
              .map((st) => (
                <StatusPill key={st} status={st} label={t(`common.status.${st}`)} />
              ))}
          </span>
        </td>
      </tr>
    ),
  }));

  return (
    <>
      <PageHeader
        title={t("routes.sources.title")}
        lead={t("sourcesPage.summary")}
        icon={routeIcons.sources}
        crumbs={[{ label: t("routes.sources.title") }]}
        baseUrl={absoluteUrl(locale)}
        updated={siteConfig.dataLastUpdated}
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-lg font-semibold">{t("sourcesPage.stats", { sources: sources.length, pages: pages.size })}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="status-h" className="rounded-2xl border border-border bg-surface p-6">
            <h2 id="status-h" className="text-xl font-bold tracking-tight">
              {t("sourcesPage.statusTitle")}
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              {statusOrder.map((s) => (
                <div key={s} className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-3">
                  <dt>
                    <StatusPill status={s} label={t(`common.status.${s}`)} />
                  </dt>
                  <dd className="text-fg-muted">{t(`sourcesPage.statusHelp.${s}`)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="principles-h" className="rounded-2xl border border-border bg-surface p-6">
            <h2 id="principles-h" className="text-xl font-bold tracking-tight">
              {t("sourcesPage.principlesTitle")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {(["p1", "p2", "p3"] as const).map((k) => (
                <li key={k} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span>{t(`sourcesPage.principles.${k}`)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="list-h" className="mt-12">
          <h2 id="list-h" className="text-2xl font-bold tracking-tight">
            {t("sourcesPage.listTitle")}
          </h2>
          <p className="mb-6 mt-2 text-fg-muted">{t("sourcesPage.listLead")}</p>
          <SourcesFilter
            rows={rows}
            labels={{
              filter: t("sourcesPage.filter"),
              all: t("sourcesPage.filterAll"),
              official: t("sourcesPage.filterOfficial"),
              caption: t("sourcesPage.listTitle"),
            }}
            head={
              <thead className="bg-surface-2 text-xs text-fg-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">{t("sourcesPage.colSource")}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{t("sourcesPage.colUsedOn")}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{t("sourcesPage.colStatus")}</th>
                </tr>
              </thead>
            }
          />
        </section>

        <section aria-labelledby="disclaimer-h" className="mt-12 max-w-3xl rounded-2xl border border-border bg-surface-2/60 p-6">
          <h2 id="disclaimer-h" className="text-xl font-bold tracking-tight">
            {t("sourcesPage.disclaimerTitle")}
          </h2>
          <div className="mt-3 space-y-3 text-sm text-fg-muted">
            <p>{t("sourcesPage.disclaimer.p1")}</p>
            <p>{t("sourcesPage.disclaimer.p2")}</p>
            <p>{t("sourcesPage.disclaimer.p3")}</p>
          </div>
          <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            {t("sourcesPage.contactCta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </>
  );
}
