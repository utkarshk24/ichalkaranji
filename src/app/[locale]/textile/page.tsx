import { ArrowLeft, CheckCircle2, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { YoYChart } from "@/components/data/YoYChart";
import { PageHeader } from "@/components/layout/PageHeader";
import { ValueChain, type ChainStep } from "@/components/textile/ValueChain";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { indicatorChart } from "@/lib/cards";
import { getIndicator, latestPoint } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "textile") : {};
}

/** Which indicators back each value-chain stage. */
const chainIndicators = {
  spinning: ["spinning_mills"],
  sizing: ["sizing_units"],
  weaving: ["powerlooms", "shuttleless_looms"],
  processing: ["processing_units"],
  trade: ["fabric_output"],
} as const;

const challenges = ["effluent", "labour", "competition", "data"] as const;
const opportunities = ["valueAdded", "institutional", "modern", "clean"] as const;

export default async function TextilePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();

  const steps: ChainStep[] = (Object.keys(chainIndicators) as (keyof typeof chainIndicators)[]).map((key) => ({
    key,
    title: t(`textile.chain.${key}.title`),
    body: t(`textile.chain.${key}.body`),
    stats: chainIndicators[key].map((id) => {
      const indicator = getIndicator(id);
      const point = latestPoint(indicator);
      return {
        value: point.value !== null ? formatNumber(point.value, locale) : "—",
        // Skip the unit when the label already says it ("Spinning mills (mills)").
        label: indicator.label[locale].toLowerCase().includes(indicator.unit[locale].toLowerCase())
          ? indicator.label[locale]
          : `${indicator.label[locale]} (${indicator.unit[locale]})`,
        meta: `${point.year} · ${t(`common.status.${point.status}`)} · ${point.source}`,
        sourceUrl: point.sourceUrl || undefined,
      };
    }),
  }));

  const loomsChart = await indicatorChart(getIndicator("powerlooms"), t("textile.chartTitle"), t("textile.chartSub"), locale);

  return (
    <>
      <PageHeader
        title={t("routes.textile.title")}
        lead={t("textile.summary")}
        icon={routeIcons.textile}
        crumbs={[{ label: t("routes.economy.title"), href: "/economy" }, { label: t("routes.textile.title") }]}
        baseUrl={absoluteUrl(locale)}
      />

      <Section id="chain" title={t("textile.chainTitle")} lead={t("textile.chainLead")}>
        <ValueChain steps={steps} awaitedLabel={t("common.dataAwaited")} />
      </Section>

      <div className="border-y border-border bg-surface-2/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("textile.historyTitle")}</h2>
            <p className="mt-3 text-fg-muted">{t("textile.historyBody")}</p>
            <h2 className="mt-10 text-2xl font-bold tracking-tight">{t("textile.marketTitle")}</h2>
            <p className="mt-3 text-fg-muted">{t("textile.marketBody")}</p>
          </div>
          <YoYChart locale={locale} {...loomsChart} />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 md:grid-cols-2">
        <section aria-labelledby="challenges-h" className="rounded-2xl border border-border bg-surface p-6">
          <h2 id="challenges-h" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <TriangleAlert className="h-5 w-5 text-danger" aria-hidden="true" />
            {t("textile.challengesTitle")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {challenges.map((key) => (
              <li key={key} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" aria-hidden="true" />
                {t(`textile.challenges.${key}`)}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="opps-h" className="rounded-2xl border border-border bg-surface p-6">
          <h2 id="opps-h" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <CheckCircle2 className="h-5 w-5 text-emerald" aria-hidden="true" />
            {t("textile.opportunitiesTitle")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {opportunities.map((key) => (
              <li key={key} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-hidden="true" />
                {t(`textile.opportunities.${key}`)}
              </li>
            ))}
          </ul>
        </section>
        <Link href="/economy" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline md:col-span-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("textile.economyCta")}
        </Link>
      </div>
    </>
  );
}
