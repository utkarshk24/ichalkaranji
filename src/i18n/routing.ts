import { defineRouting } from "next-intl/routing";

export const locales = ["en", "mr", "hi"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeCookie: { name: "ICH_LOCALE", maxAge: 60 * 60 * 24 * 365 },
});

/** Labels shown in the language switcher, always in their own script. */
export const localeLabels: Record<Locale, { short: string; native: string; htmlLang: string; ogLocale: string }> = {
  en: { short: "EN", native: "English", htmlLang: "en-IN", ogLocale: "en_IN" },
  mr: { short: "मराठी", native: "मराठी", htmlLang: "mr-IN", ogLocale: "mr_IN" },
  hi: { short: "हिंदी", native: "हिंदी", htmlLang: "hi-IN", ogLocale: "hi_IN" },
};
