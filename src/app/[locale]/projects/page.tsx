import { Clock } from "lucide-react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectsTracker, type TrackerProject } from "@/components/projects/ProjectsTracker";
import { routing, type Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/data";
import { formatMonthOrYear } from "@/lib/format";
import { absoluteUrl, routeMetadata } from "@/lib/seo";
import { routeIcons, siteConfig } from "@/lib/site";
import type { ProjectCategory, ProjectStatus } from "@/types/indicator";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? routeMetadata(locale, "projects") : {};
}

const categoryKeys: ProjectCategory[] = ["water", "sewerage", "industry", "connectivity", "urban"];
const statusKeys: ProjectStatus[] = ["proposed", "ongoing", "delayed", "completed", "awaited"];

export default async function ProjectsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();
  const all = getProjects();

  const projects: TrackerProject[] = all.map((p) => ({
    id: p.id,
    category: p.category,
    status: p.status,
    title: p.title[locale],
    detail: p.detail[locale],
    cost: p.cost ? p.cost[locale] : null,
    source: p.source,
    sourceUrl: p.sourceUrl,
    asOf: p.asOf ? t("projectsPage.asOf", { date: formatMonthOrYear(p.asOf, locale) }) : t("projectsPage.noDate"),
  }));

  const counts = Object.fromEntries(Array.from({ length: all.length + 1 }, (_, n) => [n, t("projectsPage.count", { count: n })]));

  return (
    <>
      <PageHeader
        title={t("routes.projects.title")}
        lead={t("projectsPage.summary")}
        icon={routeIcons.projects}
        crumbs={[{ label: t("routes.projects.title") }]}
        baseUrl={absoluteUrl(locale)}
        updated={siteConfig.dataLastUpdated}
      />
      <ProjectsTracker
        projects={projects}
        labels={{
          statusFilter: t("projectsPage.statusFilter"),
          all: t("projectsPage.all"),
          category: t("projectsPage.category"),
          allCategories: t("projectsPage.allCategories"),
          categories: Object.fromEntries(categoryKeys.map((k) => [k, t(`projectsPage.categories.${k}`)])) as Record<ProjectCategory, string>,
          statuses: Object.fromEntries(statusKeys.map((k) => [k, t(`projectsPage.statuses.${k}`)])) as Record<ProjectStatus, string>,
          counts,
          cost: t("projectsPage.cost"),
          noCost: t("projectsPage.noCost"),
          noSource: t("projectsPage.noSource"),
          source: t("common.source"),
          empty: t("projectsPage.empty"),
          externalLink: t("footer.externalLink"),
        }}
      />
      <section aria-labelledby="gaps-h" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="max-w-3xl rounded-2xl border border-dashed border-border bg-surface p-6">
          <h2 id="gaps-h" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Clock className="h-5 w-5 text-gold" aria-hidden="true" />
            {t("projectsPage.gapsTitle")}
          </h2>
          <p className="mt-2 text-sm text-fg-muted">{t("projectsPage.gapsBody")}</p>
        </div>
      </section>
    </>
  );
}
