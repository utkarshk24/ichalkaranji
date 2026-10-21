"use client";

import { AlertTriangle, CheckCircle2, Clock, Droplets, Gauge, Wind } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { aqiBand, useLiveWeather, weatherKey } from "@/lib/weather";
import { WeatherIcon } from "./WeatherIcon";

const toneClass = {
  good: "bg-emerald-soft text-emerald",
  warning: "bg-gold-soft text-gold",
  serious: "bg-gold-soft text-brand-terracotta dark:text-gold",
  critical: "bg-danger-soft text-danger",
} as const;

function useIstClock(locale: string) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { time: "--:--", date: "" };
  const tag = `${locale}-IN-u-nu-latn`;
  return {
    time: new Intl.DateTimeFormat(tag, { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(now),
    date: new Intl.DateTimeFormat(tag, { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Kolkata" }).format(now),
  };
}

/** Glassy hero card: IST clock, current weather and modelled AQI. Degrades to clock-only if the API fails. */
export function LiveConditions() {
  const t = useTranslations();
  const locale = useLocale();
  const clock = useIstClock(locale);
  const { data, error } = useLiveWeather();
  const nf = new Intl.NumberFormat(`${locale}-IN-u-nu-latn`, { maximumFractionDigits: 0 });

  const band = data?.air?.usAqi != null ? aqiBand(data.air.usAqi) : null;
  const BandIcon = band && band.tone !== "good" ? AlertTriangle : CheckCircle2;

  return (
    <aside
      aria-label={t("home.live.title")}
      className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/80">{t("home.live.title")}</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/80">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {t("home.live.time")}
        </span>
      </div>
      <p className="mt-2 text-4xl font-bold tabular-nums" aria-live="off">
        {clock.time}
      </p>
      <p className="text-sm text-white/80">{clock.date}</p>

      <div className="mt-5 border-t border-white/15 pt-4" aria-live="polite" aria-busy={!data && !error}>
        {!data && !error && (
          <div className="space-y-2" role="status">
            <span className="sr-only">{t("home.live.loading")}</span>
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-white/15" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/15" />
          </div>
        )}

        {error && <p className="text-sm text-white/85">{t("home.live.error")}</p>}

        {data && (
          <>
            <div className="flex items-center gap-3">
              <WeatherIcon code={data.current.code} className="h-10 w-10 text-[#fbd38d]" />
              <div>
                <p className="text-3xl font-semibold tabular-nums">{nf.format(data.current.temperature)}°C</p>
                <p className="text-sm text-white/85">
                  {t(`weather.codes.${weatherKey(data.current.code)}`)} ·{" "}
                  {t("home.live.feelsLike", { value: `${nf.format(data.current.apparent)}°` })}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-white/70" aria-hidden="true" />
                <dt className="sr-only">{t("home.live.humidity")}</dt>
                <dd>
                  <span className="text-white/70">{t("home.live.humidity")}</span> {nf.format(data.current.humidity)}%
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-white/70" aria-hidden="true" />
                <dt className="sr-only">{t("home.live.wind")}</dt>
                <dd>
                  <span className="text-white/70">{t("home.live.wind")}</span> {nf.format(data.current.wind)} km/h
                </dd>
              </div>
            </dl>

            {band && data.air?.usAqi != null && (
              <div className="mt-4 rounded-2xl bg-white/95 p-3 text-fg dark:bg-surface">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg-muted">
                    <Gauge className="h-4 w-4" aria-hidden="true" />
                    {t("home.live.aqi")}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${toneClass[band.tone]}`}>
                    <BandIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {t(`weather.aqi.${band.key}`)}
                  </span>
                </div>
                <p className="mt-1 text-lg font-bold tabular-nums">
                  {t("home.live.aqiValue", { value: nf.format(data.air.usAqi) })}
                  {data.air.pm25 != null && (
                    <span className="ml-2 text-xs font-medium text-fg-muted">{t("home.live.pm25", { value: nf.format(data.air.pm25) })}</span>
                  )}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-fg-muted">{t("home.live.aqiNote")}</p>
              </div>
            )}
          </>
        )}
      </div>

      <p className="mt-4 text-[11px] text-white/70">
        <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
          {t("home.live.source")}
        </a>
        {data && <> · {t("home.live.updated", { time: data.current.time.slice(11, 16) })}</>}
      </p>
    </aside>
  );
}
