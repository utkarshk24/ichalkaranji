"use client";

import { Compass, Home, Map as MapIcon, PhoneCall, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUI } from "@/components/providers/Providers";
import { Link, usePathname } from "@/i18n/navigation";

/** Bottom tab bar on phones: Home, Map, Explore (menu), Search, Emergency. */
export function MobileTabBar() {
  const t = useTranslations();
  const pathname = usePathname();
  const { openMenu, openSearch } = useUI();

  const item = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium";
  const linkClass = (href: string) =>
    `${item} ${pathname === href ? "text-primary" : "text-fg-muted hover:text-fg"}`;

  return (
    <nav
      data-mobile-nav
      aria-label={t("nav.mobileNavigation")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="flex">
        <li className="flex flex-1">
          <Link href="/" className={linkClass("/")} aria-current={pathname === "/" ? "page" : undefined}>
            <Home className="h-5 w-5" aria-hidden="true" />
            {t("nav.home")}
          </Link>
        </li>
        <li className="flex flex-1">
          <Link href="/map" className={linkClass("/map")} aria-current={pathname === "/map" ? "page" : undefined}>
            <MapIcon className="h-5 w-5" aria-hidden="true" />
            {t("nav.map")}
          </Link>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={openMenu} className={`${item} text-fg-muted hover:text-fg`}>
            <Compass className="h-5 w-5" aria-hidden="true" />
            {t("nav.explore")}
          </button>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={openSearch} className={`${item} text-fg-muted hover:text-fg`}>
            <Search className="h-5 w-5" aria-hidden="true" />
            {t("header.search")}
          </button>
        </li>
        <li className="flex flex-1">
          <Link
            href="/emergency"
            className={`${item} ${pathname === "/emergency" ? "text-danger" : "text-danger/90 hover:text-danger"}`}
            aria-current={pathname === "/emergency" ? "page" : undefined}
          >
            <PhoneCall className="h-5 w-5" aria-hidden="true" />
            {t("emergency.items.e112")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
