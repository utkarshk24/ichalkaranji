import { Clock, ExternalLink, Info, TriangleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { StatCard } from "@/components/data/StatCard";
import { StatusPill } from "@/components/data/StatusPill";
import { YoYChart } from "@/components/data/YoYChart";
import { EmergencyNumbers } from "@/components/home/EmergencyStrip";
import { QuickLinks } from "@/components/home/QuickLinks";
import { WeatherForecast } from "@/components/home/WeatherForecast";
import { LayeredMap } from "@/components/map/LayeredMap";
import type { Locale } from "@/i18n/routing";
import { indicatorCard, indicatorChart } from "@/lib/cards";
import { getIndicator, getQuickLinks } from "@/lib/data";
import { iconFor } from "@/lib/icons";
import { mapPlaces } from "@/lib/places";
import type { Block, Cite } from "@/types/content";

function CiteLink({ cite, label, external }: { cite: Partial<Cite>; label: string; external: string }) {
  if (!cite.source) return null;
  return cite.sourceUrl ? (
    <a href={cite.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-fg-muted hover:underline">
      {label}: <span lang="en">{cite.source}</span>
      <ExternalLink className="h-3 w-3" aria-hidden="true" />
      <span className="sr-only">({external})</span>
    </a>
  ) : (
    <span className="text-xs text-fg-muted">
      {label}: <span lang="en">{cite.source}</span>
    </span>
  );
}

function BlockTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={`${id}-h`} className="text-2xl font-bold tracking-tight">
      {children}
    </h2>
  );
}

/** Renders a page's content blocks in order. All text arrives already trilingual from data/pages/*.json. */
export async function ContentBlocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  const t = await getTranslations({ locale });
  const srcLabel = t("common.source");
  const ext = t("footer.externalLink");

  const rendered = await Promise.all(
    blocks.map(async (block) => {
      switch (block.type) {
        case "prose":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              <div className="mt-3 max-w-3xl space-y-4 text-[1.0625rem] leading-relaxed text-fg/90">
                {block.paragraphs.map((p, i) => (
                  <p key={i}>{p[locale]}</p>
                ))}
              </div>
            </>
          );

        case "facts":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              <dl className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                {block.rows.map((row, i) => (
                  <div key={i} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                    <dt className="text-sm font-medium text-fg-muted">{row.label[locale]}</dt>
                    <dd className="space-y-1.5">
                      <p className="font-medium">{row.value[locale]}</p>
                      <p className="flex flex-wrap items-center gap-2">
                        <StatusPill status={row.status} label={t(`common.status.${row.status}`)} />
                        <CiteLink cite={row} label={srcLabel} external={ext} />
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          );

        case "list":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              {block.lead && <p className="mt-2 max-w-3xl text-fg-muted">{block.lead[locale]}</p>}
              <ul className="mt-4 max-w-3xl space-y-2.5">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </>
          );

        case "cards":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              {block.lead && <p className="mt-2 max-w-3xl text-fg-muted">{block.lead[locale]}</p>}
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex flex-col rounded-2xl border border-border bg-surface p-5">
                    <h3 className="font-semibold">{item.title[locale]}</h3>
                    <p className="mt-1.5 text-sm text-fg-muted">{item.body[locale]}</p>
                    <div className="mt-auto pt-3">
                      <CiteLink cite={item} label={srcLabel} external={ext} />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          );

        case "indicators": {
          const cards = await Promise.all(block.ids.map(async ({ id, year }) => ({ id, props: await indicatorCard(id, locale, year) })));
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              {block.lead && <p className="mt-2 max-w-3xl text-fg-muted">{block.lead[locale]}</p>}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {cards.map(({ id, props }) => (
                  <StatCard key={id} icon={iconFor("chart")} {...props} id={`${block.id}-${id}`} />
                ))}
              </div>
            </>
          );
        }

        case "chart": {
          const chart = await indicatorChart(getIndicator(block.indicatorId), block.title[locale], block.subtitle[locale], locale);
          return (
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              <div>
                <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
                {block.body && <p className="mt-3 text-fg-muted">{block.body[locale]}</p>}
              </div>
              <YoYChart locale={locale} {...chart} />
            </div>
          );
        }

        case "awaited":
          return (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-6">
              <h2 id={`${block.id}-h`} className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5 text-gold" aria-hidden="true" />
                {block.title[locale]}
              </h2>
              {block.lead && <p className="mt-1 max-w-3xl text-sm text-fg-muted">{block.lead[locale]}</p>}
              <ul className="mt-4 flex flex-wrap gap-2">
                {block.items.map((item, i) => (
                  <li key={i} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-fg-muted">
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>
          );

        case "links":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {block.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 hover:border-primary/40 hover:bg-surface-2"
                    >
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        {item.title[locale]}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">({ext})</span>
                      </span>
                      {item.body && <span className="mt-1 text-sm text-fg-muted">{item.body[locale]}</span>}
                      <span className="mt-1 truncate text-xs text-fg-muted">{new URL(item.href).hostname.replace(/^www\./, "")}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          );

        case "callout": {
          const Icon = block.tone === "warning" ? TriangleAlert : Info;
          return (
            <p
              className={`flex max-w-3xl gap-3 rounded-2xl border p-4 text-sm ${
                block.tone === "warning" ? "border-danger/30 bg-danger-soft" : "border-border bg-gold-soft"
              }`}
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${block.tone === "warning" ? "text-danger" : "text-gold"}`} aria-hidden="true" />
              <span>{block.body[locale]}</span>
            </p>
          );
        }

        case "table":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              {block.lead && <p className="mt-2 max-w-3xl text-fg-muted">{block.lead[locale]}</p>}
              <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <thead className="bg-surface-2 text-xs text-fg-muted">
                    <tr>
                      {block.columns.map((c, i) => (
                        <th key={i} scope="col" className="px-4 py-3 font-semibold">
                          {c[locale]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row" className="px-4 py-3 font-medium">
                              {cell[locale]}
                            </th>
                          ) : (
                            <td key={c} className="px-4 py-3 tabular-nums text-fg/90">
                              {cell[locale]}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {block.cite && (
                <p className="mt-2">
                  <CiteLink cite={block.cite} label={srcLabel} external={ext} />
                </p>
              )}
            </>
          );

        case "faq":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              <div className="mt-4 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
                {block.items.map((item, i) => (
                  <details key={i} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
                      {item.q[locale]}
                      <span className="mt-0.5 text-gold transition-transform group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-fg-muted">{item.a[locale]}</p>
                  </details>
                ))}
              </div>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: block.items.map((item) => ({
                      "@type": "Question",
                      name: item.q[locale],
                      acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
                    })),
                  }),
                }}
              />
            </>
          );

        case "weather":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              <div className="mt-4 max-w-2xl">
                <WeatherForecast />
              </div>
            </>
          );

        case "map":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              <div className="mt-4">
                <LayeredMap
                  places={mapPlaces(locale, (p) => block.categories.includes(p.category) || p.id === "city-centre")}
                  showControls={false}
                  mapClassName="h-[22rem]"
                />
              </div>
            </>
          );

        case "quicklinks":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              {block.lead && <p className="mt-2 max-w-3xl text-fg-muted">{block.lead[locale]}</p>}
              <div className="mt-4">
                <QuickLinks items={getQuickLinks()} />
              </div>
            </>
          );

        case "emergency":
          return (
            <>
              <BlockTitle id={block.id}>{block.title[locale]}</BlockTitle>
              {block.lead && <p className="mt-2 max-w-3xl text-fg-muted">{block.lead[locale]}</p>}
              <div className="mt-4">
                <EmergencyNumbers />
              </div>
            </>
          );
      }
    }),
  );

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12">
      {blocks.map((block, i) => (
        <section key={block.id} id={block.id} aria-labelledby={`${block.id}-h`} className="scroll-mt-24">
          {block.type === "callout" && <h2 id={`${block.id}-h`} className="sr-only">{t("common.note")}</h2>}
          {rendered[i]}
        </section>
      ))}
    </div>
  );
}
