import { ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/brand/LogoMark";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { legalRoutes, navGroups, siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const year = new Date().getFullYear();

  const official = [
    { label: t("footer.corporation"), href: siteConfig.officialLinks.corporation },
    { label: t("footer.district"), href: siteConfig.officialLinks.district },
    { label: t("footer.maharashtra"), href: siteConfig.officialLinks.maharashtra },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-surface pb-24 md:pb-0">
      <div className="loom-band" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-lg font-bold">{t("site.name")}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-fg-muted">{t("footer.about")}</p>
          <p className="mt-4 max-w-sm rounded-lg border border-border bg-gold-soft px-3 py-2 text-xs font-medium text-fg">
            {t("site.independentNotice")}
          </p>

          <div className="mt-6 max-w-sm" data-no-print>
            <h2 className="text-sm font-semibold">{t("footer.newsletter")}</h2>
            <p className="mt-1 text-xs text-fg-muted">{t("footer.newsletterBody")}</p>
            {/* Disabled until a consent-logging email provider is configured (Phase 7). */}
            <form className="mt-3 flex gap-2" aria-describedby="newsletter-note">
              <label htmlFor="newsletter-email" className="sr-only">
                {t("footer.emailLabel")}
              </label>
              <input
                id="newsletter-email"
                type="email"
                disabled
                placeholder={t("footer.emailLabel")}
                className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 text-sm disabled:opacity-60"
              />
              <button type="submit" disabled className="h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg disabled:opacity-60">
                {t("footer.subscribe")}
              </button>
            </form>
            <p id="newsletter-note" className="mt-2 text-xs text-fg-muted">
              {t("footer.newsletterSoon")}
            </p>
          </div>
        </div>

        <nav aria-label={t("footer.explore")}>
          <h2 className="text-sm font-semibold">{t("footer.explore")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[...navGroups[0].routes.slice(0, 5), "map" as const, ...navGroups[1].routes.slice(0, 2)].map((route) => (
              <li key={route}>
                <Link href={`/${route}`} className="text-fg-muted hover:text-primary">
                  {t(`routes.${route}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.resources")}>
          <h2 className="text-sm font-semibold">{t("footer.resources")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[...legalRoutes, "faq" as const, "contact" as const].map((route) => (
              <li key={route}>
                <Link href={`/${route}`} className="text-fg-muted hover:text-primary">
                  {t(`routes.${route}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.official")}>
          <h2 className="text-sm font-semibold">{t("footer.official")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {official.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-fg-muted hover:text-primary"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">({t("footer.externalLink")})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-fg-muted md:flex-row md:items-center md:justify-between">
          <p>{t("footer.dataNotice")}</p>
          <p className="shrink-0">
            {t("site.lastUpdated", { date: formatDate(siteConfig.dataLastUpdated, locale) })} · {t("footer.rights", { year })}
          </p>
        </div>
        {locale !== "en" && <p className="px-4 pb-6 text-center text-[11px] text-fg-muted">{t("site.translationNotice")}</p>}
      </div>
    </footer>
  );
}
