"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LeafletPreview = dynamic(() => import("./LeafletPreview"), { ssr: false });

/**
 * Loads Leaflet and its tiles only when the preview scrolls near the viewport,
 * so the home page's first load stays light.
 */
export function MapPreview({ label, centreLabel, loadingLabel }: { label: string; centreLabel: string; loadingLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-80 overflow-hidden rounded-2xl border border-border bg-surface-2 sm:h-full sm:min-h-[22rem]" role="region" aria-label={label}>
      {visible ? (
        <LeafletPreview centreLabel={centreLabel} />
      ) : (
        <div className="loom-texture flex h-full items-center justify-center text-sm text-fg-muted">{loadingLabel}</div>
      )}
    </div>
  );
}
