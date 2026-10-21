import { ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import type { NewsCategory, NewsItem } from "@/types/indicator";

const categoryClass: Record<NewsCategory, string> = {
  civic: "bg-surface-2 text-primary",
  election: "bg-gold-soft text-gold",
  water: "bg-emerald-soft text-emerald",
  environment: "bg-emerald-soft text-emerald",
};

export async function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <NewsCard item={item} />
        </li>
      ))}
    </ol>
  );
}

/** One dated news summary linking to its published source. */
export async function NewsCard({ item }: { item: NewsItem }) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className={`rounded-full px-2 py-0.5 font-semibold ${categoryClass[item.category]}`}>
          {t(`home.news.categories.${item.category}`)}
        </span>
        <time dateTime={item.date} className="text-fg-muted">
          {formatDate(item.date, locale)}
        </time>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug">{item.title[locale]}</h3>
      <p className="mt-2 text-sm text-fg-muted">{item.summary[locale]}</p>
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary hover:underline"
      >
        {t("home.news.readSource")}: {item.source}
        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="sr-only">({t("footer.externalLink")})</span>
      </a>
    </article>
  );
}
