"use client";

import { AlertTriangle, BookOpen, CheckCircle2, ExternalLink, HelpCircle, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { TimelineEra, TimelineStatus } from "@/types/indicator";

export type TimelineItem = {
  id: string;
  label: string;
  era: TimelineEra;
  status: TimelineStatus;
  title: string;
  body: string;
  source: string;
  sourceUrl: string;
};

const eras: TimelineEra[] = ["princely", "industry", "culture", "civic"];

const statusStyle: Record<TimelineStatus, { icon: LucideIcon; className: string }> = {
  official: { icon: CheckCircle2, className: "bg-emerald-soft text-emerald" },
  secondary: { icon: BookOpen, className: "bg-surface-2 text-primary" },
  unverified: { icon: HelpCircle, className: "bg-gold-soft text-gold" },
  disputed: { icon: AlertTriangle, className: "bg-danger-soft text-danger" },
};

const eraDot: Record<TimelineEra, string> = {
  princely: "bg-brand-blue",
  industry: "bg-brand-gold",
  culture: "bg-brand-emerald",
  civic: "bg-brand-terracotta",
};

/** Filterable vertical timeline. Each event carries its status (icon + words) and source link. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const t = useTranslations("history.timeline");
  const tFooter = useTranslations("footer");
  const reduce = useReducedMotion();
  const [era, setEra] = useState<TimelineEra | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const e of eras) c[e] = items.filter((i) => i.era === e).length;
    return c;
  }, [items]);
  const visible = era === "all" ? items : items.filter((i) => i.era === era);

  return (
    <div>
      <div role="group" aria-label={t("filter")} className="flex flex-wrap gap-2">
        {(["all", ...eras] as const).map((key) => {
          const active = era === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setEra(key)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-fg hover:bg-surface-2"
              }`}
            >
              {key !== "all" && <span className={`h-2.5 w-2.5 rounded-full ${eraDot[key]}`} aria-hidden="true" />}
              {key === "all" ? t("all") : t(`eras.${key}`)}
              <span className={`text-xs ${active ? "text-primary-fg/80" : "text-fg-muted"}`}>{counts[key]}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-fg-muted" aria-live="polite">
        {t("count", { count: visible.length })}
      </p>

      <ol className="relative mt-8 border-l-2 border-border pl-6 sm:ml-28 sm:pl-8">
        {visible.map((item) => {
          const { icon: StatusIcon, className } = statusStyle[item.status];
          return (
            <motion.li
              key={item.id}
              data-reveal
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35 }}
              className="relative mb-10 last:mb-0"
            >
              <span
                className={`absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-4 border-bg sm:-left-[41px] ${eraDot[item.era]}`}
                aria-hidden="true"
              />
              <p className="text-sm font-bold tabular-nums text-gold sm:absolute sm:-left-[9.5rem] sm:top-0.5 sm:w-24 sm:text-right sm:text-base">
                {item.label}
              </p>
              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-fg-muted">
                    <span className={`h-2 w-2 rounded-full ${eraDot[item.era]}`} aria-hidden="true" />
                    {t(`eras.${item.era}`)}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${className}`}>
                    <StatusIcon className="h-3 w-3" aria-hidden="true" />
                    {t(`status.${item.status}`)}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{item.body}</p>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <span lang="en">{item.source}</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  <span className="sr-only">({tFooter("externalLink")})</span>
                </a>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
