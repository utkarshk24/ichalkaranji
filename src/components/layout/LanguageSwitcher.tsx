"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, routing, type Locale } from "@/i18n/routing";

/** Segmented EN | मराठी | हिंदी control. Keeps the current page; the choice is stored in a cookie by next-intl. */
export function LanguageSwitcher() {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: next, scroll: false });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("changeLanguage")}
      className={`inline-flex items-center rounded-full border border-border bg-surface p-0.5 ${isPending ? "opacity-70" : ""}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={localeLabels[l].htmlLang}
            onClick={() => change(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:text-sm ${
              active ? "bg-primary text-primary-fg" : "text-fg-muted hover:bg-surface-2 hover:text-fg"
            }`}
          >
            {localeLabels[l].short}
          </button>
        );
      })}
    </div>
  );
}
