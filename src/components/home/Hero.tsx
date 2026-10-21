import { ArrowRight, ChevronDown, Map as MapIcon } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import media from "@data/media.json";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { LocalizedText } from "@/types/indicator";
import { HeroArt } from "./HeroArt";
import { LiveConditions } from "./LiveConditions";

type HeroImage = { src: string; alt: LocalizedText; credit: string; license: string; sourceUrl: string } | null;

/** Full-height hero. Uses the licensed photo in data/media.json when present, otherwise the illustration. */
export async function Hero() {
  const t = await getTranslations("home.hero");
  const locale = (await getLocale()) as Locale;
  const image = (media as { hero: HeroImage }).hero;

  return (
    <section className="relative isolate overflow-hidden text-white" aria-labelledby="hero-title">
      {image ? (
        <>
          <Image src={image.src} alt={image.alt[locale]} fill priority sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#14275f]/90 via-[#14275f]/60 to-transparent" aria-hidden="true" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10">
          <HeroArt />
        </div>
      )}

      <div className="mx-auto grid min-h-[calc(100svh-var(--header-h)-4.25rem)] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_auto] lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#fbd38d]">{t("eyebrow")}</p>
          <h1 id="hero-title" className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-2xl font-medium text-[#fbd38d] sm:text-3xl">{t("subtitle")}</p>
          <p className="mt-6 max-w-xl text-lg text-white/85">{t("body")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/about" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-blue hover:bg-white/90">
              {t("ctaExplore")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/map" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">
              <MapIcon className="h-4 w-4" aria-hidden="true" />
              {t("ctaMap")}
            </Link>
          </div>
        </div>

        <LiveConditions />
      </div>

      <div className="absolute inset-x-0 bottom-3 mx-auto flex max-w-7xl items-end justify-between px-4 text-[11px] text-white/70">
        <a href="#glance" className="hidden items-center gap-1 rounded-full px-2 py-1 hover:text-white sm:inline-flex">
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
          {t("scroll")}
        </a>
        <span className="ml-auto">
          {image ? (
            <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {image.credit} · {image.license}
            </a>
          ) : (
            t("imageNote")
          )}
        </span>
      </div>
      <div className="loom-band absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
