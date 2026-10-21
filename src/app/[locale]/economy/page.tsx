import { ArrowRight, Banknote, Clock, Factory, Flame, GraduationCap, Layers, Shirt, Spline, TrendingUp, Wallet, Wrench, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { StatCard } from "@/components/data/StatCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { indicatorCard } from "@/lib/cards";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "economy") : {};
}

const figures: { id: string; icon: LucideIcon }[] = [
  { id: "fabric_output", icon: TrendingUp },
  { id: "powerlooms", icon: Factory },
  { id: "shuttleless_looms", icon: Spline },
  { id: "spinning_mills", icon: Layers },
  { id: "sizing_units", icon: Shirt },
  { id: "processing_units", icon: Flame },
  { id: "city_gdp", icon: Banknote },
  { id: "per_capita_income", icon: Wallet },
];

const sectors: { key: "textiles" | "cooperatives" | "sugar" | "engineering" | "skills"; icon: LucideIcon }[] = [
  { key: "textiles", icon: Shirt },
  { key: "cooperatives", icon: Banknote },
  { key: "sugar", icon: Flame },
  { key: "engineering", icon: Wrench },
  { key: "skills", icon: GraduationCap },
];

const policy = ["pmMitra", "processing", "competition", "exports"] as const;
const gaps = ["gdp", "pci", "employment", "exports", "msme", "estates"] as const;

export default async function EconomyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();
  const cards = await Promise.all(figures.map(async (f) => ({ ...f, props: await indicatorCard(f.id, locale) })));

  return (
    <>
      <PageHeader
        title={t("routes.economy.title")}
        lead={t("economy.summary")}
        icon={routeIcons.economy}
        crumbs={[{ label: t("routes.economy.title") }]}
        baseUrl={absoluteUrl(locale)}
      />

      <Section id="figures" title={t("economy.figuresTitle")} lead={t("economy.figuresLead")}>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {cards.map(({ id, icon, props }) => (
            <StatCard key={id} icon={icon} {...props} />
          ))}
        </div>
      </Section>

      <div className="border-y border-border bg-surface-2/50">
        <Section id="sectors" title={t("economy.sectorsTitle")}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map(({ key, icon: Icon }) => (
              <li key={key} className="rounded-2xl border border-border bg-surface p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-semibold">{t(`economy.sectors.${key}.title`)}</h3>
                <p className="mt-1 text-sm text-fg-muted">{t(`economy.sectors.${key}.body`)}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/textile"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
          >
            {t("economy.textileCta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Section>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 lg:grid-cols-2">
        <section aria-labelledby="policy-h" className="rounded-2xl border border-border bg-surface p-6">
          <h2 id="policy-h" className="text-xl font-bold tracking-tight">
            {t("economy.policyTitle")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {policy.map((key) => (
              <li key={key} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span>{t(`economy.policy.${key}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="gaps-h" className="rounded-2xl border border-dashed border-border bg-surface p-6">
          <h2 id="gaps-h" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Clock className="h-5 w-5 text-gold" aria-hidden="true" />
            {t("economy.gapsTitle")}
          </h2>
          <p className="mt-1 text-sm text-fg-muted">{t("economy.gapsLead")}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {gaps.map((key) => (
              <li key={key} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-fg-muted">
                {t(`economy.gaps.${key}`)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
