import { getTranslations } from "next-intl/server";
import type { StatCard } from "@/components/data/StatCard";
import type { ChartPoint } from "@/components/data/YoYChart";
import type { Locale } from "@/i18n/routing";
import { getFact, getIndicator, latestPoint } from "@/lib/data";
import { formatDate, formatNumber } from "@/lib/format";
import type { Indicator } from "@/types/indicator";

type StatCardProps = Omit<Parameters<typeof StatCard>[0], "icon">;

async function badgeLabels(locale: Locale, label: string) {
  const t = await getTranslations({ locale });
  return {
    trigger: t("home.glance.info", { label }),
    close: t("home.glance.close"),
    year: t("common.year"),
    method: t("common.method"),
    source: t("common.source"),
    noLink: t("common.noSourceLink"),
    externalLink: t("footer.externalLink"),
  };
}

/** StatCard props for an indicator. Pass `year` to pin the card to one data point (e.g. the Census). */
export async function indicatorCard(id: string, locale: Locale, year?: number): Promise<StatCardProps> {
  const t = await getTranslations({ locale });
  const indicator = getIndicator(id);
  const point = (year && indicator.series.find((p) => p.year === year)) || latestPoint(indicator);
  const label = indicator.label[locale];
  const scope = t(`common.scope.${indicator.scope}`);
  return {
    id,
    label,
    value: point.value !== null ? formatNumber(point.value, locale) : null,
    unit: indicator.unit[locale],
    context: `${scope} · ${point.year} · ${t(`common.status.${point.status}`)}`,
    awaitedText: t("common.dataAwaited"),
    fallbackText: indicator.fallback ? t("common.fallbackNote", { scope: t(`common.scope.${indicator.fallback.scope}`) }) : undefined,
    details: {
      status: point.status,
      statusLabel: t(`common.status.${point.status}`),
      year: String(point.year),
      scope,
      source: point.source,
      sourceUrl: point.sourceUrl,
      method: point.method?.[locale],
      note: indicator.note?.[locale],
      checked: t("common.retrieved", { date: formatDate(point.retrieved, locale) }),
    },
    labels: await badgeLabels(locale, label),
  };
}

/** StatCard props for a sourced, non-numeric fact. */
export async function factCard(id: string, locale: Locale): Promise<StatCardProps> {
  const t = await getTranslations({ locale });
  const fact = getFact(id);
  const label = fact.label[locale];
  return {
    id,
    label,
    value: fact.value[locale],
    context: fact.detail[locale],
    awaitedText: t("common.dataAwaited"),
    details: {
      status: fact.status,
      statusLabel: t(`common.status.${fact.status}`),
      year: fact.year ? String(fact.year) : undefined,
      source: fact.source,
      sourceUrl: fact.sourceUrl,
      note: fact.detail[locale],
    },
    labels: await badgeLabels(locale, label),
  };
}

/** YoYChart props for an indicator's series. */
export async function indicatorChart(indicator: Indicator, title: string, subtitle: string, locale: Locale) {
  const t = await getTranslations({ locale });
  const points: ChartPoint[] = indicator.series.map((p) => ({
    year: p.year,
    value: p.value,
    status: p.status,
    statusLabel: t(`common.status.${p.status}`),
    source: p.source,
  }));
  const awaited = indicator.series.filter((p) => p.value === null).map((p) => p.year);
  return {
    points,
    labels: {
      title,
      subtitle,
      chartLabel: t("home.snapshot.chartLabel", { title }),
      estimateKey: t("home.snapshot.estimateKey"),
      showTable: t("home.snapshot.showTable"),
      hideTable: t("home.snapshot.hideTable"),
      year: t("common.year"),
      value: t("common.value"),
      status: t("common.statusLabel"),
      source: t("common.source"),
      awaited: awaited.length ? t("home.snapshot.awaitedYears", { years: awaited.join(", ") }) : undefined,
    },
  };
}
