import {
  BookOpenCheck,
  Factory,
  Landmark,
  Languages,
  LayoutGrid,
  Mail,
  Mountain,
  Ruler,
  Scale,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
  ArrowRight,
} from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { StatCard } from "@/components/data/StatCard";
import { YoYChart } from "@/components/data/YoYChart";
import { EmergencyStrip } from "@/components/home/EmergencyStrip";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { Hero } from "@/components/home/Hero";
import { InvestTeaser } from "@/components/home/InvestTeaser";
import { MapPreview } from "@/components/home/MapPreview";
import { NewsList } from "@/components/home/NewsList";
import { QuickLinks } from "@/components/home/QuickLinks";
import { WeatherForecast } from "@/components/home/WeatherForecast";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { factCard, indicatorCard, indicatorChart } from "@/lib/cards";
import { getFeatured, getIndicator, getNews, getQuickLinks } from "@/lib/data";
import { cityJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

type GlanceEntry =
  | { kind: "indicator"; id: string; icon: LucideIcon; year?: number }
  | { kind: "fact"; id: string; icon: LucideIcon };

/** City-at-a-glance order. A fixed year pins the card to that data point (e.g. the Census, not an estimate). */
const glance: GlanceEntry[] = [
  { kind: "indicator", id: "population_total", icon: Users, year: 2011 },
  { kind: "indicator", id: "area", icon: Ruler },
  { kind: "indicator", id: "elevation", icon: Mountain },
  { kind: "indicator", id: "wards", icon: LayoutGrid },
  { kind: "fact", id: "language", icon: Languages },
  { kind: "indicator", id: "literacy_rate", icon: BookOpenCheck },
  { kind: "indicator", id: "sex_ratio", icon: Scale },
  { kind: "indicator", id: "per_capita_income", icon: Wallet },
  { kind: "indicator", id: "city_gdp", icon: TrendingUp },
  { kind: "fact", id: "industry", icon: Factory },
  { kind: "fact", id: "civic_status", icon: Landmark },
  { kind: "fact", id: "pin", icon: Mail },
];

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations();

  const glanceCards = await Promise.all(
    glance.map(async (entry) => ({
      entry,
      props: entry.kind === "fact" ? await factCard(entry.id, locale) : await indicatorCard(entry.id, locale, entry.year),
    })),
  );
  const populationChart = await indicatorChart(getIndicator("population_total"), t("home.snapshot.populationTitle"), t("home.snapshot.populationSub"), locale);
  const powerloomsChart = await indicatorChart(getIndicator("powerlooms"), t("home.snapshot.powerloomsTitle"), t("home.snapshot.powerloomsSub"), locale);

  return (
    <>
      <Hero />

      <Section
        id="glance"
        title={t("home.glance.title")}
        lead={t("home.glance.lead")}
        action={
          <Link href="/data" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            {t("home.glance.openDashboard")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {glanceCards.map(({ entry, props }) => (
            <StatCard key={entry.id} icon={entry.icon} {...props} />
          ))}
        </div>
      </Section>

      <div className="border-y border-border bg-surface-2/50">
        <Section id="services" title={t("home.services.title")} lead={t("home.services.lead")}>
          <QuickLinks items={getQuickLinks()} />
        </Section>
      </div>

      <Section
        id="map-preview"
        title={t("home.map.title")}
        lead={t("home.map.lead")}
        action={
          <Link href="/map" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg hover:bg-primary-hover">
            {t("home.map.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      >
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <MapPreview label={t("home.map.label")} centreLabel={t("home.map.centre")} loadingLabel={t("home.map.loading")} />
          <WeatherForecast />
        </div>
      </Section>

      <Section id="snapshot" title={t("home.snapshot.title")} lead={t("home.snapshot.lead")}>
        <div className="grid gap-4 md:grid-cols-2">
          <YoYChart locale={locale} {...populationChart} />
          <YoYChart locale={locale} {...powerloomsChart} />
        </div>
      </Section>

      <div className="border-y border-border bg-surface-2/50">
        <Section
          id="news"
          title={t("home.news.title")}
          lead={t("home.news.lead")}
          action={
            <Link href="/news" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              {t("home.news.viewAll")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        >
          <NewsList items={getNews(3)} />
        </Section>
      </div>

      <EmergencyStrip />

      <Section id="featured" title={t("home.featured.title")} lead={t("home.featured.lead")}>
        <FeaturedGrid items={getFeatured()} />
      </Section>

      <InvestTeaser />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd(locale, t("site.name"), t("seo.homeDescription"))) }}
      />
    </>
  );
}
