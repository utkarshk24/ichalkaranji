import { getTranslations } from "next-intl/server";
import { localeLabels, routing, type Locale } from "@/i18n/routing";

/** One web app manifest per language, so an installed app is named in the language it was installed from. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (routing.locales as readonly string[]).includes(locale) ? (locale as Locale) : routing.defaultLocale;
  const t = await getTranslations({ locale: l });
  const manifest = {
    name: t("site.fullName"),
    short_name: t("site.name"),
    description: t("seo.homeDescription"),
    lang: localeLabels[l].htmlLang,
    dir: "ltr",
    start_url: `/${l}`,
    scope: `/${l}`,
    display: "standalone",
    background_color: "#fbf8f3",
    theme_color: "#1e3a8a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
  return new Response(JSON.stringify(manifest), { headers: { "Content-Type": "application/manifest+json; charset=utf-8" } });
}
