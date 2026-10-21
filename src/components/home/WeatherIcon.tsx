import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, HelpCircle, Sun, type LucideIcon } from "lucide-react";
import { weatherKey } from "@/lib/weather";

const icons: Record<ReturnType<typeof weatherKey>, LucideIcon> = {
  clear: Sun,
  mainlyClear: CloudSun,
  partlyCloudy: CloudSun,
  overcast: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  showers: CloudRain,
  thunderstorm: CloudLightning,
  unknown: HelpCircle,
};

export function WeatherIcon({ code, className = "h-6 w-6" }: { code: number; className?: string }) {
  const Icon = icons[weatherKey(code)];
  return <Icon className={className} aria-hidden="true" />;
}
