"use client";

import { ChevronDown, Map as MapIcon, Menu, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { useUI } from "@/components/providers/Providers";
import { Link, usePathname } from "@/i18n/navigation";
import { navGroups, routeIcons, type NavGroupKey } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const { openSearch, openMenu } = useUI();
  const [openGroup, setOpenGroup] = useState<NavGroupKey | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close the mega menu on route change, outside click and Escape.
  useEffect(() => setOpenGroup(null), [pathname]);
  useEffect(() => {
    if (!openGroup) return;
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  const activeGroup = navGroups.find((g) => g.key === openGroup);

  return (
    <header
      data-site-header
      className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/75"
    >
      <div ref={navRef} className="relative">
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center gap-3 px-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-lg" aria-label={t("site.fullName")}>
            <LogoMark />
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-fg">{t("site.name")}</span>
              <span className="hidden text-[11px] font-medium text-fg-muted sm:block">{t("home.hero.subtitle")}</span>
            </span>
          </Link>

          <nav aria-label={t("nav.mainNavigation")} className="ml-6 hidden lg:block">
            <ul className="flex items-center gap-1">
              {navGroups.map((group) => {
                const expanded = openGroup === group.key;
                const containsActive = group.routes.some((r) => pathname === `/${r}`);
                return (
                  <li key={group.key}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls="mega-menu"
                      onClick={() => setOpenGroup(expanded ? null : group.key)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-2 ${
                        expanded || containsActive ? "text-primary" : "text-fg"
                      }`}
                    >
                      {t(`nav.groups.${group.key}`)}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/map"
                  aria-current={pathname === "/map" ? "page" : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-fg hover:bg-surface-2 aria-[current=page]:text-primary"
                >
                  <MapIcon className="h-4 w-4" aria-hidden="true" />
                  {t("nav.map")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label={t("header.searchLabel")}
              className="hidden h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm text-fg-muted transition-colors hover:text-fg md:inline-flex"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>{t("header.search")}</span>
              <kbd className="rounded border border-border px-1.5 font-sans text-[10px]">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={openSearch}
              aria-label={t("header.searchLabel")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg-muted hover:bg-surface-2 hover:text-fg md:hidden"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <button
              type="button"
              onClick={openMenu}
              aria-label={t("nav.openMenu")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg hover:bg-surface-2 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mega-menu panel */}
        <div
          id="mega-menu"
          hidden={!activeGroup}
          className="absolute inset-x-0 top-full hidden border-b border-border bg-surface shadow-xl lg:block"
        >
          {activeGroup && (
            <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-4 py-6 xl:grid-cols-4">
              <p className="col-span-full mb-1 text-xs font-semibold uppercase tracking-wider text-gold">
                {t(`nav.groups.${activeGroup.key}`)}
              </p>
              {activeGroup.routes.map((route) => {
                const Icon = routeIcons[route];
                return (
                  <Link
                    key={route}
                    href={`/${route}`}
                    aria-current={pathname === `/${route}` ? "page" : undefined}
                    className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface-2 aria-[current=page]:bg-surface-2"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-fg group-hover:text-primary">{t(`routes.${route}.title`)}</span>
                      <span className="block text-xs text-fg-muted">{t(`routes.${route}.description`)}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="loom-band" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
