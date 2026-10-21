import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

/** Renders "Home › …" plus BreadcrumbList JSON-LD. The last crumb is the current page. */
export async function Breadcrumbs({ items, baseUrl }: { items: Crumb[]; baseUrl: string }) {
  const t = await getTranslations("breadcrumb");
  const all: Crumb[] = [{ label: t("home"), href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${baseUrl}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label={t("label")} className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-fg-muted">
        {all.map((crumb, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="hover:text-primary hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-fg" : ""}>
                  {crumb.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
