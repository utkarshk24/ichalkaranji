"use client";

import { ArrowRight, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useUI } from "@/components/providers/Providers";
import { useRouter } from "@/i18n/navigation";
import { routeIcons, sectionRoutes, type SectionRoute } from "@/lib/site";

type Entry = { route: SectionRoute; title: string; description: string; haystack: string };

/** Lowercase, strip Latin diacritics; Devanagari passes through unchanged. */
const normalise = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

/**
 * Site search over page titles and descriptions in the active language (plus the English route slug,
 * so "textile" also finds वस्त्रोद्योग). Phase 5 swaps this index for Pagefind over full page text.
 */
export function SearchDialog() {
  const t = useTranslations();
  const router = useRouter();
  const { searchOpen, openSearch, closeSearch } = useUI();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();

  const index: Entry[] = useMemo(
    () =>
      sectionRoutes.map((route) => {
        const title = t(`routes.${route}.title`);
        const description = t(`routes.${route}.description`);
        return { route, title, description, haystack: normalise(`${title} ${description} ${route.replace("-", " ")}`) };
      }),
    [t],
  );

  const results = useMemo(() => {
    const q = normalise(query.trim());
    if (!q) return index.slice(0, 8);
    const terms = q.split(/\s+/);
    return index
      .filter((e) => terms.every((term) => e.haystack.includes(term)))
      .sort((a, b) => Number(normalise(b.title).startsWith(q)) - Number(normalise(a.title).startsWith(q)));
  }, [index, query]);

  // Global shortcuts: Ctrl/⌘+K and "/" (when not typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (searchOpen && !dialog.open) {
      dialog.showModal();
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    if (!searchOpen && dialog.open) dialog.close();
  }, [searchOpen]);

  useEffect(() => setActive(0), [query]);

  function go(route: SectionRoute) {
    closeSearch();
    router.push(`/${route}`);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].route);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={closeSearch}
      onClick={(e) => e.target === dialogRef.current && closeSearch()}
      aria-label={t("header.searchLabel")}
      className="mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-border bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-border px-4 focus-within:shadow-[inset_0_-2px_0_var(--ring)]">
        <Search className="h-5 w-5 shrink-0 text-fg-muted" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${results[active].route}` : undefined}
          aria-label={t("header.searchLabel")}
          placeholder={t("header.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKey}
          className="search-input h-14 w-full bg-transparent text-base outline-none placeholder:text-fg-muted"
        />
        <button
          type="button"
          onClick={closeSearch}
          aria-label={t("header.closeSearch")}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-surface-2"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <ul id={listId} role="listbox" aria-label={t("header.searchLabel")} className="max-h-[55vh] overflow-y-auto p-2">
        {results.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-fg-muted" role="option" aria-selected="false" aria-disabled="true">
            {t("header.noResults", { query })}
          </li>
        )}
        {results.map((entry, i) => {
          const Icon = routeIcons[entry.route];
          const selected = i === active;
          return (
            <li
              key={entry.route}
              id={`${listId}-${entry.route}`}
              role="option"
              aria-selected={selected}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(entry.route)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${selected ? "bg-surface-2" : ""}`}
            >
              <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{entry.title}</span>
                <span className="block truncate text-xs text-fg-muted">{entry.description}</span>
              </span>
              <ArrowRight className={`h-4 w-4 shrink-0 text-fg-muted ${selected ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
            </li>
          );
        })}
      </ul>

      <p className="border-t border-border px-4 py-2 text-xs text-fg-muted">{t("header.searchHint", { key: "Ctrl K / ⌘K" })}</p>
    </dialog>
  );
}
