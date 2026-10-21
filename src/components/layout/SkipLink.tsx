import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("site");
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg focus:shadow-lg"
    >
      {t("skipToContent")}
    </a>
  );
}
