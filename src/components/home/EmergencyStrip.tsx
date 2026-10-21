import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { emergencyNumbers } from "@/lib/site";

export async function EmergencyStrip() {
  const t = await getTranslations();
  return (
    <section aria-labelledby="emergency-title" className="bg-danger-soft">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="emergency-title" className="text-2xl font-bold tracking-tight">
              {t("home.emergency.title")}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-fg-muted">{t("home.emergency.lead")}</p>
          </div>
          <Link href="/emergency" className="inline-flex items-center gap-1 text-sm font-semibold text-danger hover:underline">
            {t("emergency.viewAll")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-6">
          <EmergencyNumbers />
        </div>
      </div>
    </section>
  );
}

/** Tap-to-call grid of national helplines, shared by the home strip and the /emergency page. */
export async function EmergencyNumbers() {
  const t = await getTranslations();
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {emergencyNumbers.map(({ key, number, icon: Icon }) => (
        <li key={key}>
          <a
            href={`tel:${number}`}
            className="flex h-full flex-col rounded-2xl border border-danger/20 bg-surface p-4 transition-colors hover:border-danger/60"
          >
            <Icon className="h-5 w-5 text-danger" aria-hidden="true" />
            <span className="mt-3 text-2xl font-bold tabular-nums text-fg">{number}</span>
            <span className="text-sm text-fg-muted">{t(`emergency.items.${key}`)}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
