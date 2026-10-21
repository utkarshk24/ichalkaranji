"use client";

import { Download, ExternalLink, Maximize2, Navigation, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useId, useMemo, useState } from "react";
import type { PlaceCategory } from "@/types/indicator";
import { directionsUrl } from "@/lib/geo";
import { categoryColor, placeCategories, type MapPlace } from "./categories";

const LeafletLayers = dynamic(() => import("./LeafletLayers"), {
  ssr: false,
  loading: () => <div className="loom-texture h-full w-full bg-surface-2" />,
});

/**
 * Map with category layers, a text filter, "show all", and a list view that mirrors the visible markers
 * (the list is the accessible equivalent of the map). Selecting a list item flies to its marker.
 */
export function LayeredMap({
  places,
  initialCategories = placeCategories,
  showControls = true,
  showDownload = false,
  mapClassName = "h-[28rem] lg:h-[36rem]",
}: {
  places: MapPlace[];
  initialCategories?: PlaceCategory[];
  showControls?: boolean;
  showDownload?: boolean;
  mapClassName?: string;
}) {
  const t = useTranslations("mapPage");
  const filterId = useId();
  const [enabled, setEnabled] = useState<Set<PlaceCategory>>(new Set(initialCategories));
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [fitKey, setFitKey] = useState(0);

  const counts = useMemo(() => {
    const c = {} as Record<PlaceCategory, number>;
    for (const cat of placeCategories) c[cat] = places.filter((p) => p.category === cat).length;
    return c;
  }, [places]);

  const q = query.trim().toLowerCase();
  const visible = places.filter((p) => enabled.has(p.category) && (!q || p.name.toLowerCase().includes(q)));

  const toggle = (cat: PlaceCategory) =>
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });

  const labels = {
    approx: t("approx"),
    distance: (km: number) => t("distance", { km }),
    directions: t("directions"),
    openOsm: t("openOsm"),
    source: t("source"),
  };

  return (
    <div className={showControls ? "grid gap-4 lg:grid-cols-[18rem_1fr]" : ""}>
      {showControls && (
        <aside className="space-y-5 rounded-2xl border border-border bg-surface p-4" aria-label={t("layers")}>
          <fieldset>
            <legend className="text-sm font-semibold">{t("layers")}</legend>
            <ul className="mt-2 space-y-1">
              {placeCategories.map((cat) => (
                <li key={cat}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-2">
                    <input
                      type="checkbox"
                      checked={enabled.has(cat)}
                      onChange={() => toggle(cat)}
                      className="h-4 w-4 accent-[var(--primary)]"
                    />
                    <span className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white" style={{ background: categoryColor[cat] }} aria-hidden="true" />
                    <span className="flex-1 text-sm">{t(`categories.${cat}`)}</span>
                    <span className="text-xs text-fg-muted">{counts[cat]}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <div>
            <label htmlFor={filterId} className="text-sm font-semibold">
              {t("filterLabel")}
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-bg px-3">
              <Search className="h-4 w-4 text-fg-muted" aria-hidden="true" />
              <input
                id={filterId}
                type="text"
                inputMode="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("filterPlaceholder")}
                className="search-input h-10 w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-fg-muted" aria-live="polite">
              {t("shown", { count: visible.length })}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setFitKey((k) => k + 1);
              }}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-primary hover:bg-surface-2"
            >
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              {t("fit")}
            </button>
          </div>

          {showDownload && (
            <div className="border-t border-border pt-4">
              <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/geo/places.geojson`} download className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("download")}
              </a>
              <p className="mt-1 text-xs text-fg-muted">{t("downloadNote")}</p>
            </div>
          )}
        </aside>
      )}

      <div className="min-w-0 space-y-4">
        <div className={`relative overflow-hidden rounded-2xl border border-border ${mapClassName}`}>
          <LeafletLayers places={visible} selected={selected} onSelect={setSelected} fitKey={fitKey} labels={labels} label={t("mapLabel")} />
        </div>

        <section aria-labelledby={`${filterId}-list`}>
          <h2 id={`${filterId}-list`} className="text-base font-semibold">
            {t("listTitle")}
          </h2>
          {visible.length === 0 ? (
            <p className="mt-2 text-sm text-fg-muted">{t("none")}</p>
          ) : (
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {visible.map((p) => (
                <li key={p.id}>
                  <div
                    className={`flex h-full gap-3 rounded-xl border bg-surface p-3 transition-colors ${
                      selected === p.id ? "border-primary" : "border-border"
                    }`}
                  >
                    <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: categoryColor[p.category] }} aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <button type="button" onClick={() => setSelected(p.id)} className="text-left text-sm font-semibold hover:text-primary hover:underline">
                        {p.name}
                      </button>
                      <p className="text-xs text-fg-muted">
                        {t(`categories.${p.category}`)}
                        {p.km > 0 && <> · {t("distance", { km: p.km })}</>}
                        {p.approximate && <> · {t("approx")}</>}
                      </p>
                      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                        <a
                          href={directionsUrl(p.lat, p.lng)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                        >
                          <Navigation className="h-3 w-3" aria-hidden="true" />
                          {t("directions")}
                        </a>
                        <a
                          href={p.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-fg-muted hover:underline"
                        >
                          {t("source")}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
