import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getIndicator, latestPoint } from "@/lib/data";
import { formatNumber } from "@/lib/format";

const highlightIds = ["fabric_output", "powerlooms", "shuttleless_looms", "spinning_mills"] as const;

/** Four sourced textile figures on a dark band, each with its year and status in words. */
export async function InvestTeaser() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;

  const stats = highlightIds.map((id) => {
    const indicator = getIndicator(id);
    const point = latestPoint(indicator);
    return { id, indicator, point };
  });

  return (
    <section aria-labelledby="invest-title" className="relative overflow-hidden bg-brand-blue text-white">
      <div className="loom-texture absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#fbd38d]">{t("home.invest.eyebrow")}</p>
          <h2 id="invest-title" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("home.invest.title")}
          </h2>
          <p className="mt-4 max-w-xl text-white/85">{t("home.invest.body")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/economy" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-brand-blue hover:bg-white/90">
              {t("home.invest.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/textile" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 font-semibold hover:bg-white/10">
              {t("home.invest.cta2")}
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15">
          {stats.map(({ id, indicator, point }) => (
            <div key={id} className="bg-[#1b3478] p-5">
              <dt className="text-sm text-white/75">{indicator.label[locale]}</dt>
              <dd className="mt-1">
                <span className="text-3xl font-bold tabular-nums">
                  {point.value !== null ? formatNumber(point.value, locale) : "—"}
                  {id === "powerlooms" && point.value !== null && "+"}
                </span>
                <span className="mt-1 block text-xs text-white/70">
                  {indicator.unit[locale]} · {point.year} · {t(`common.status.${point.status}`)}
                </span>
                {point.sourceUrl && (
                  <a href={point.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-[11px] text-white/60 hover:underline">
                    {t("common.source")}: <span lang="en">{point.source}</span>
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="loom-band relative" aria-hidden="true" />
    </section>
  );
}
