import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations();
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-gold">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{t("notFound.title")}</h1>
      <p className="mt-3 text-fg-muted">{t("notFound.body")}</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-fg hover:bg-primary-hover">
        {t("common.goHome")}
      </Link>
    </section>
  );
}
