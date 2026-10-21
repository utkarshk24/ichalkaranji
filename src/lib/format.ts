import type { Locale } from "@/i18n/routing";

const intlLocale: Record<Locale, string> = { en: "en-IN", mr: "mr-IN", hi: "hi-IN" };

/** Western digits with Indian grouping (3,50,000) in every locale, as the content rules require. */
export function formatNumber(value: number, locale: Locale, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(`${intlLocale[locale]}-u-nu-latn`, options).format(value);
}

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(`${intlLocale[locale]}-u-nu-latn`, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

/** "2026-06" → "June 2026"; "2023" stays "2023"; empty stays empty. */
export function formatMonthOrYear(value: string, locale: Locale) {
  if (!/^\d{4}-\d{2}$/.test(value)) return value;
  return new Intl.DateTimeFormat(`${intlLocale[locale]}-u-nu-latn`, { month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(
    new Date(`${value}-01T12:00:00+05:30`),
  );
}
