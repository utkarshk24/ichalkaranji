import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Timeline, type TimelineItem } from "@/components/history/Timeline";
import { PageHeader } from "@/components/layout/PageHeader";
import { OnThisPage, ProseSection } from "@/components/ui/Prose";
import { routing, type Locale } from "@/i18n/routing";
import { getTimeline } from "@/lib/data";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "history") : {};
}

/** Article sections in reading order, each with its paragraph message keys. */
const sections = [
  { id: "origins", paragraphs: ["history.origins.p1"] },
  { id: "ghorpade", paragraphs: ["history.ghorpade.p1", "history.ghorpade.p2", "history.ghorpade.p3"] },
  { id: "narayanrao", paragraphs: ["history.narayanrao.p1"] },
  { id: "manchester", paragraphs: ["history.manchester.p1", "history.manchester.p2"] },
  { id: "cooperative", paragraphs: ["history.cooperative.p1", "history.cooperative.p2"] },
  { id: "music", paragraphs: ["history.music.p1", "history.music.p2"] },
  { id: "civic", paragraphs: ["history.civic.p1"] },
  { id: "heritage", paragraphs: ["history.heritage.p1"] },
] as const;

export default async function HistoryPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();

  const items: TimelineItem[] = getTimeline().map((e) => ({
    id: e.id,
    label: e.label,
    era: e.era,
    status: e.status,
    title: e.title[locale],
    body: e.body[locale],
    source: e.source,
    sourceUrl: e.sourceUrl,
  }));

  const toc = [...sections.map((s) => ({ id: s.id, title: t(`history.${s.id}.title`) })), { id: "timeline", title: t("history.timeline.title") }];

  return (
    <>
      <PageHeader
        title={t("routes.history.title")}
        lead={t("history.summary")}
        icon={routeIcons.history}
        crumbs={[{ label: t("routes.history.title") }]}
        baseUrl={absoluteUrl(locale)}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 lg:grid-cols-[1fr_14rem]">
        <article className="max-w-3xl space-y-12">
          {sections.map((s) => (
            <ProseSection key={s.id} id={s.id} title={t(`history.${s.id}.title`)}>
              {s.paragraphs.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </ProseSection>
          ))}

          <section aria-labelledby="readmore-h" className="rounded-2xl border border-border bg-surface p-6">
            <h2 id="readmore-h" className="text-lg font-semibold">
              {t("history.readMore.title")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://archive.org/details/StoryOfIchalkaranji" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                  {t("history.readMore.franks")}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://books.google.com/books?id=UFZBDp5OEi8C" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                  {t("history.readMore.gazetteer")}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </article>

        <aside>
          <OnThisPage label={t("common.onThisPage")} items={toc} />
        </aside>
      </div>

      <section id="timeline" aria-labelledby="timeline-h" className="scroll-mt-24 border-t border-border bg-surface-2/50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 id="timeline-h" className="text-3xl font-bold tracking-tight">
            {t("history.timeline.title")}
          </h2>
          <p className="mt-2 max-w-2xl text-fg-muted">{t("history.timeline.lead")}</p>
          <div className="mt-8">
            <Timeline items={items} />
          </div>
        </div>
      </section>
    </>
  );
}
