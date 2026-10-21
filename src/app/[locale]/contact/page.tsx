import { ExternalLink, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "contact") : {};
}

const officialLinks = [
  { key: "corporation", href: siteConfig.officialLinks.corporation },
  { key: "grievance", href: "https://grievances.maharashtra.gov.in" },
  { key: "rti", href: "https://rtionline.maharashtra.gov.in" },
] as const;

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        title={t("routes.contact.title")}
        lead={t("contactPage.summary")}
        icon={routeIcons.contact}
        crumbs={[{ label: t("routes.contact.title") }]}
        baseUrl={absoluteUrl(locale)}
        printable={false}
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[1fr_minmax(0,22rem)]">
        <ContactForm
          email={siteConfig.contactEmail}
          labels={{
            formTitle: t("contactPage.formTitle"),
            topic: t("contactPage.topic"),
            topics: {
              correction: t("contactPage.topics.correction"),
              accessibility: t("contactPage.topics.accessibility"),
              suggestion: t("contactPage.topics.suggestion"),
              other: t("contactPage.topics.other"),
            },
            pageUrl: t("contactPage.pageUrl"),
            pageUrlHelp: t("contactPage.pageUrlHelp"),
            name: t("contactPage.name"),
            message: t("contactPage.message"),
            messageHelp: t("contactPage.messageHelp"),
            messageError: t("contactPage.messageError"),
            required: t("contactPage.required"),
            submit: t("contactPage.submit"),
            how: t("contactPage.how"),
            subject: t("contactPage.subject", { topic: "{topic}" }),
            disabledTitle: t("contactPage.disabledTitle"),
            disabledBody: t("contactPage.disabledBody"),
          }}
        />

        <div className="space-y-6">
          <section aria-labelledby="not-official-h" className="rounded-2xl border border-gold/40 bg-gold-soft/40 p-5">
            <h2 id="not-official-h" className="flex items-center gap-2 text-base font-bold">
              <ShieldAlert className="h-5 w-5 text-gold" aria-hidden="true" />
              {t("contactPage.notOfficialTitle")}
            </h2>
            <p className="mt-2 text-sm text-fg-muted">{t("contactPage.notOfficialBody")}</p>
          </section>

          <section aria-labelledby="official-h" className="rounded-2xl border border-border bg-surface p-5">
            <h2 id="official-h" className="text-base font-bold">
              {t("contactPage.officialTitle")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {officialLinks.map(({ key, href }) => (
                <li key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                    {t(`contactPage.officialLinks.${key}`)}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="sr-only">({t("footer.externalLink")})</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
