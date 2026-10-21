import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-devanagari";
import "../globals.css";

import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/layout/BackToTop";
import { EmergencyTicker } from "@/components/layout/EmergencyTicker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { SkipLink } from "@/components/layout/SkipLink";
import { Providers } from "@/components/providers/Providers";
import { localeLabels, routing, type Locale } from "@/i18n/routing";
import { buildMetadata, siteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    ...buildMetadata({
      locale,
      path: "/",
      title: t("homeTitle"),
      description: t("homeDescription"),
      siteName: t("siteName"),
      imageAlt: t("ogAlt"),
    }),
    metadataBase: new URL(siteConfig.url),
    // Set after the spread so child pages inherit the "%s | City Portal" template.
    title: { default: t("homeTitle"), template: t("titleTemplate") },
    keywords: t("keywords").split(",").map((k) => k.trim()),
    applicationName: t("siteName"),
    manifest: `/${locale}/manifest.webmanifest`,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "seo" });
  const jsonLd = siteJsonLd(locale as Locale, t("homeTitle"), t("homeDescription"), t("siteName"));

  return (
    <html lang={localeLabels[locale].htmlLang} suppressHydrationWarning>
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <Providers>
            <SkipLink />
            <EmergencyTicker />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <MobileTabBar />
            <MobileMenu />
            <SearchDialog />
            <BackToTop />
          </Providers>
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
