"use client";

import { Map as MapIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useUI } from "@/components/providers/Providers";
import { Link, usePathname } from "@/i18n/navigation";
import { navGroups, routeIcons } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** Full-screen navigation sheet for screens below the `lg` breakpoint. */
export function MobileMenu() {
  const t = useTranslations();
  const { menuOpen, closeMenu } = useUI();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  useEffect(() => closeMenu(), [pathname, closeMenu]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeMenu}
      aria-label={t("nav.menu")}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-fg backdrop:bg-black/40 lg:hidden"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-[var(--header-h)] items-center justify-between border-b border-border px-4">
          <span className="text-base font-bold">{t("nav.menu")}</span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label={t("nav.closeMenu")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-28 pt-4">
          <div className="mb-6 flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-fg-muted">{t("header.language")}</span>
            <LanguageSwitcher />
          </div>

          <Link href="/map" className="mb-6 flex items-center gap-3 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-fg">
            <MapIcon className="h-5 w-5" aria-hidden="true" />
            {t("routes.map.title")}
          </Link>

          <nav aria-label={t("nav.mainNavigation")} className="space-y-6">
            {navGroups.map((group) => (
              <section key={group.key} aria-labelledby={`m-${group.key}`}>
                <h2 id={`m-${group.key}`} className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">
                  {t(`nav.groups.${group.key}`)}
                </h2>
                <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {group.routes.map((route) => {
                    const Icon = routeIcons[route];
                    return (
                      <li key={route}>
                        <Link
                          href={`/${route}`}
                          aria-current={pathname === `/${route}` ? "page" : undefined}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-surface-2 aria-[current=page]:bg-surface-2 aria-[current=page]:text-primary"
                        >
                          <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                          <span className="font-medium">{t(`routes.${route}.title`)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </nav>
        </div>
      </div>
    </dialog>
  );
}
