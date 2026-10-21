import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { DataDashboard, type DashboardPoint, type DashboardRow } from "@/components/data/DataDashboard";
import { PageHeader } from "@/components/layout/PageHeader";
import { routing, type Locale } from "@/i18n/routing";
import { indicatorChart } from "@/lib/cards";
import { getAllIndicators, indicatorTopic } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons, siteConfig } from "@/lib/site";
import type { DataPoint, DataStatus, Indicator } from "@/types/indicator";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "data") : {};
}

const counted: DataStatus[] = ["official", "secondary"];

async function buildRow(indicator: Indicator, locale: Locale): Promise<DashboardRow> {
  const t = await getTranslations({ locale });
  const byYear = [...indicator.series].sort((a, b) => b.year - a.year);
  const valued = byYear.filter((p) => p.value !== null);
  const point = (p: DataPoint): DashboardPoint => ({
    year: p.year,
    valueText: p.value !== null ? formatNumber(p.value, locale) : null,
    status: p.status,
    statusLabel: t(`common.status.${p.status}`),
  });

  const latest = valued[0] ?? byYear[0];
  const previous = valued[1] ?? null;
  let change: DashboardRow["change"] = null;
  if (valued[0] && previous) {
    const abs = (valued[0].value as number) - (previous.value as number);
    const pct = (abs / (previous.value as number)) * 100;
    const signed = (n: number, digits: number) => formatNumber(n, locale, { maximumFractionDigits: digits, signDisplay: "exceptZero" });
    change = {
      text: t("dataPage.changeSince", { change: `${signed(pct, 1)}% (${signed(abs, 0)})`, year: String(previous.year) }),
      direction: abs > 0 ? "up" : abs < 0 ? "down" : "flat",
      // Flag comparisons that are not count-to-count (e.g. a planning estimate against the Census).
      mixed: !(counted.includes(valued[0].status) && counted.includes(previous.status)),
    };
  }

  const scope = t(`common.scope.${indicator.scope}`);
  const label = indicator.label[locale];
  const unit = indicator.unit[locale];
  // A trend needs at least two years with figures.
  const chart = valued.length >= 2
    ? await indicatorChart(indicator, label, `${scope} · ${unit}`, locale)
    : null;

  return {
    id: indicator.id,
    topic: indicatorTopic(indicator.id),
    label,
    unit,
    scope,
    source: latest.source,
    sourceUrl: latest.sourceUrl,
    latest: point(latest),
    previous: previous ? point(previous) : null,
    change,
    csv: [...indicator.series]
      .sort((a, b) => a.year - b.year)
      .map((p) => [indicator.id, label, unit, indicator.scope, p.year, p.value ?? "", p.status, p.source, p.sourceUrl, p.method, p.retrieved]),
    chart,
  };
}

export default async function DataPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();
  const rows = await Promise.all(getAllIndicators().map((i) => buildRow(i, locale)));

  const statuses = Object.fromEntries(
    (["official", "secondary", "estimate", "projection", "awaited"] as const).map((s) => [s, t(`common.status.${s}`)]),
  ) as Record<DataStatus, string>;

  return (
    <>
      <PageHeader
        title={t("routes.data.title")}
        lead={t("dataPage.summary")}
        icon={routeIcons.data}
        crumbs={[{ label: t("routes.data.title") }]}
        baseUrl={absoluteUrl(locale)}
        updated={siteConfig.dataLastUpdated}
      />
      <DataDashboard
        rows={rows}
        locale={locale}
        defaultChart="population_total"
        labels={{
          filters: t("dataPage.filters"),
          topic: t("dataPage.topic"),
          topics: {
            all: t("dataPage.topics.all"),
            people: t("dataPage.topics.people"),
            city: t("dataPage.topics.city"),
            textile: t("dataPage.topics.textile"),
          },
          status: t("dataPage.status"),
          statusAll: t("dataPage.statusAll"),
          statuses,
          search: t("dataPage.search"),
          searchPlaceholder: t("dataPage.searchPlaceholder"),
          // Placeholders are filled on the client as the filters change.
          showing: t("dataPage.showing", { shown: "{shown}", total: "{total}" }),
          view: t("dataPage.view"),
          viewCards: t("dataPage.viewCards"),
          viewTable: t("dataPage.viewTable"),
          downloadCsv: t("dataPage.downloadCsv"),
          csvNote: t("dataPage.csvNote"),
          latest: t("dataPage.latest"),
          previous: t("dataPage.previous"),
          change: t("dataPage.change"),
          increase: t("dataPage.increase"),
          decrease: t("dataPage.decrease"),
          noPrevious: t("dataPage.noPrevious"),
          mixedNote: t("dataPage.mixedNote"),
          trendTitle: t("dataPage.trendTitle"),
          trendLead: t("dataPage.trendLead"),
          trendSelect: t("dataPage.trendSelect"),
          trendButton: t("dataPage.trendButton"),
          empty: t("dataPage.empty"),
          reset: t("dataPage.reset"),
          indicator: t("dataPage.indicator"),
          year: t("common.year"),
          scope: t("dataPage.scope"),
          source: t("common.source"),
          externalLink: t("footer.externalLink"),
        }}
      />
      <section aria-labelledby="read-h" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="max-w-3xl rounded-2xl border border-border bg-surface-2/60 p-6">
          <h2 id="read-h" className="text-xl font-bold tracking-tight">
            {t("dataPage.readTitle")}
          </h2>
          <div className="mt-3 space-y-3 text-sm text-fg-muted">
            <p>{t("dataPage.read.p1")}</p>
            <p>{t("dataPage.read.p2")}</p>
            <p>{t("dataPage.read.p3")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
