"use client";

import { Droplet, ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useLiveWeather, weatherKey } from "@/lib/weather";
import { WeatherIcon } from "./WeatherIcon";

/** 7-day list sharing the hero widget's request. Temperatures as a high/low pair per day. */
export function WeatherForecast() {
  const t = useTranslations();
  const locale = useLocale();
  const { data, error } = useLiveWeather();
  const nf = new Intl.NumberFormat(`${locale}-IN-u-nu-latn`, { maximumFractionDigits: 0 });
  const day = new Intl.DateTimeFormat(`${locale}-IN-u-nu-latn`, { weekday: "short", day: "numeric", timeZone: "Asia/Kolkata" });

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <h3 className="text-base font-semibold">{t("home.forecast.title")}</h3>
      <p className="text-sm text-fg-muted">{t("home.forecast.lead")}</p>

      <div className="mt-4 flex-1" aria-live="polite" aria-busy={!data && !error}>
        {error && <p className="text-sm text-fg-muted">{t("home.live.error")}</p>}
        {!data && !error && (
          <ul className="space-y-2" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <li key={i} className="h-9 animate-pulse rounded-lg bg-surface-2" />
            ))}
          </ul>
        )}
        {data && (
          <ul className="divide-y divide-border">
            {data.daily.map((d, i) => (
              <li key={d.date} className="flex items-center gap-3 py-2 text-sm">
                <span className="w-20 shrink-0 font-medium">{i === 0 ? t("home.forecast.today") : day.format(new Date(`${d.date}T12:00:00+05:30`))}</span>
                <WeatherIcon code={d.code} className="h-5 w-5 shrink-0 text-gold" />
                <span className="min-w-0 flex-1 truncate text-fg-muted">{t(`weather.codes.${weatherKey(d.code)}`)}</span>
                {d.rainChance != null && (
                  <span className="hidden items-center gap-1 text-xs text-fg-muted sm:inline-flex" title={t("home.forecast.rain", { value: d.rainChance })}>
                    <Droplet className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">{t("home.forecast.rain", { value: d.rainChance })}</span>
                    <span aria-hidden="true">{d.rainChance}%</span>
                  </span>
                )}
                <span className="w-20 shrink-0 text-right tabular-nums">
                  <span className="sr-only">{t("home.forecast.high", { value: `${nf.format(d.max)}°` })}, {t("home.forecast.low", { value: `${nf.format(d.min)}°` })}</span>
                  <span aria-hidden="true">
                    <span className="font-semibold">{nf.format(d.max)}°</span> <span className="text-fg-muted">{nf.format(d.min)}°</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <a
        href="https://city.imd.gov.in/citywx/city_weather_test_try.php?id=43157"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {t("home.forecast.imdLink")}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
