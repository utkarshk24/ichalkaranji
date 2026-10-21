import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { sectionRoutes, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...sectionRoutes.map((r) => `/${r}`)];
  const lastModified = new Date(siteConfig.dataLastUpdated);

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      changeFrequency: path === "/" || path === "/news" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/map" || path === "/data" ? 0.8 : 0.6,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
