import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeLabels, routing, type Locale } from "@/i18n/routing";
import { siteConfig, type SectionRoute } from "@/lib/site";

/** The static (GitHub Pages) build serves every page as a folder, so its URLs end in "/". */
const trailing = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "/" : "";

/** Absolute URL for a locale + locale-less path ("/" or "/history"). */
export function absoluteUrl(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path;
  return `${siteConfig.url}/${locale}${clean}${trailing}`;
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
  /** Localized portal name for og:site_name (seo.siteName). */
  siteName: string;
  /** Alt text for the social image (seo.ogAlt). */
  imageAlt: string;
  /** Use the title as-is, without the site-wide "%s | …" template (home page). */
  absoluteTitle?: boolean;
  /** Defaults to the locale's social card, /og/<locale>.png. */
  image?: string;
};

export function buildMetadata({ locale, path, title, description, siteName, imageAlt, absoluteTitle, image }: PageMetaInput): Metadata {
  const url = absoluteUrl(locale, path);
  const ogImage = image ?? `${siteConfig.url}/og/${locale}.png`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName,
      locale: localeLabels[locale].ogLocale,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => localeLabels[l].ogLocale),
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: ogImage, alt: imageAlt }] },
  };
}

/** Site-wide JSON-LD: the portal is an independent Organization, not a GovernmentOrganization. */
export function siteJsonLd(locale: Locale, name: string, description: string, siteName: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: "Ichalkaranji City Portal",
      alternateName: siteName === "Ichalkaranji City Portal" ? undefined : siteName,
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

/** Metadata for a section route: routes.<route>.title plus the longer seo.routes.<route> search description. */
export async function routeMetadata(locale: Locale, route: SectionRoute): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return buildMetadata({
    locale,
    path: `/${route}`,
    title: t(`routes.${route}.title`),
    description: t(`seo.routes.${route}`),
    siteName: t("seo.siteName"),
    imageAlt: t("seo.ogAlt"),
  });
}
