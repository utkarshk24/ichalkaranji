import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { PageHeader } from "@/components/layout/PageHeader";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, cityJsonLd, routeMetadata } from "@/lib/seo";
import { contentRoutes, routeIcons, type SectionRoute } from "@/lib/site";
import type { PageContent } from "@/types/content";

/**
 * Content-driven section pages. Each route's text, facts and sources live in data/pages/<route>.json
 * (trilingual); interactive routes (/data, /projects, /news, /contact, /sources) have their own folders.
 */

type Props = { params: Promise<{ locale: string; section: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return contentRoutes.map((section) => ({ section }));
}

const isContentRoute = (s: string): s is SectionRoute => (contentRoutes as readonly string[]).includes(s);

async function loadContent(section: SectionRoute): Promise<PageContent> {
  return (await import(`@data/pages/${section}.json`)).default as PageContent;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, section } = await params;
  if (!hasLocale(routing.locales, locale) || !isContentRoute(section)) return {};
  return routeMetadata(locale, section);
}

export default async function ContentPage({ params }: Props) {
  const { locale: raw, section } = await params;
  if (!hasLocale(routing.locales, raw) || !isContentRoute(section)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();
  const content = await loadContent(section);
  const title = t(`routes.${section}.title`);

  return (
    <>
      <PageHeader
        title={title}
        lead={content.summary[locale]}
        icon={routeIcons[section]}
        crumbs={[{ label: title }]}
        baseUrl={absoluteUrl(locale)}
        updated={content.updated}
      />
      <ContentBlocks blocks={content.blocks} locale={locale} />
      {section === "about" && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd(locale, t("site.name"), content.summary[locale])) }} />
      )}
    </>
  );
}
