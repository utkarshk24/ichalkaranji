import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/home/NewsList";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewsFilter } from "@/components/news/NewsFilter";
import { routing, type Locale } from "@/i18n/routing";
import { getNews } from "@/lib/data";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons, siteConfig } from "@/lib/site";
import type { NewsCategory } from "@/types/indicator";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "news") : {};
}

const categoryOrder: NewsCategory[] = ["civic", "election", "water", "environment"];

export default async function NewsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();
  const news = getNews();
  const present = categoryOrder.filter((c) => news.some((n) => n.category === c));

  return (
    <>
      <PageHeader
        title={t("routes.news.title")}
        lead={t("newsPage.summary")}
        icon={routeIcons.news}
        crumbs={[{ label: t("routes.news.title") }]}
        baseUrl={absoluteUrl(locale)}
        updated={news[0]?.date}
      />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <NewsFilter
          items={news.map((item) => ({ id: item.id, category: item.category, node: <NewsCard item={item} /> }))}
          categories={present.map((key) => ({ key, label: t(`home.news.categories.${key}`) }))}
          labels={{
            title: t("newsPage.listTitle"),
            filter: t("newsPage.filter"),
            all: t("newsPage.all"),
            empty: t("newsPage.empty"),
            counts: Object.fromEntries(Array.from({ length: news.length + 1 }, (_, n) => [n, t("newsPage.count", { count: n })])),
          }}
        />

        <aside aria-labelledby="official-h" className="mt-12 max-w-3xl rounded-2xl border border-border bg-surface-2/60 p-6">
          <h2 id="official-h" className="text-xl font-bold tracking-tight">
            {t("newsPage.officialTitle")}
          </h2>
          <p className="mt-2 text-sm text-fg-muted">{t("newsPage.officialBody")}</p>
          <a
            href={siteConfig.officialLinks.corporation}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
          >
            {t("newsPage.officialCta")}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">({t("footer.externalLink")})</span>
          </a>
        </aside>
      </div>
    </>
  );
}
