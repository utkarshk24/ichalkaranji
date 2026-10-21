import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeLabels, routing, type Locale } from "@/i18n/routing";
import { siteConfig, type SectionRoute } from "@/lib/site";

/** Absolute URL for a locale + locale-less path ("/" or "/history"). */
export function absoluteUrl(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path;
  return `${siteConfig.url}/${locale}${clean}`;
}

/** hreflang map for one page across all locales, plus x-default → English. */
export function languageAlternates(path = "/") {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[localeLabels[l].htmlLang] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return languages;
}

type PageMetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Use the title as-is, without the site-wide "%s | …" template (home page). */
  absoluteTitle?: boolean;
  image?: string;
};

export function buildMetadata({ locale, path, title, description, absoluteTitle, image }: PageMetaInput): Metadata {
  const url = absoluteUrl(locale, path);
  const ogImage = image ?? `${siteConfig.url}/og-default.png`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Ichalkaranji City Portal",
      locale: localeLabels[locale].ogLocale,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => localeLabels[l].ogLocale),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/** Site-wide JSON-LD: the portal is an independent Organization, not a GovernmentOrganization. */
export function siteJsonLd(locale: Locale, name: string, description: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: "Ichalkaranji City Portal",
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
      description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: absoluteUrl(locale),
      name,
      inLanguage: localeLabels[locale].htmlLang,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ];
}

/** City JSON-LD for the home and /about pages. */
export function cityJsonLd(locale: Locale, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "City",
    name,
    alternateName: ["Ichalkaranji", "इचलकरंजी", "Manchester of Maharashtra"],
    description,
    url: absoluteUrl(locale),
    inLanguage: localeLabels[locale].htmlLang,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
      elevation: siteConfig.geo.elevationM,
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Kolhapur district, Maharashtra, India",
    },
  };
}

/** Metadata for a section route from its routes.<route> title/description in the active locale. */
export async function routeMetadata(locale: Locale, route: SectionRoute): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "routes" });
  return buildMetadata({ locale, path: `/${route}`, title: t(`${route}.title`), description: t(`${route}.description`) });
}
