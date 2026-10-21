"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export type LiveWeather = {
  current: {
    time: string;
    temperature: number;
    apparent: number;
    humidity: number;
    wind: number;
    code: number;
  };
  daily: { date: string; code: number; max: number; min: number; rainChance: number | null }[];
  air: { usAqi: number | null; pm25: number | null } | null;
};

const { lat, lng } = siteConfig.geo;

export const FORECAST_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
  "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
  "&timezone=Asia%2FKolkata&forecast_days=7";

export const AIR_URL =
  `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}` +
  "&current=us_aqi,pm2_5&timezone=Asia%2FKolkata";

// One in-flight request per page load, shared by the hero widget and the forecast panel.
let cache: Promise<LiveWeather> | null = null;

async function fetchLive(): Promise<LiveWeather> {
  const [forecastRes, airRes] = await Promise.allSettled([fetch(FORECAST_URL), fetch(AIR_URL)]);
  if (forecastRes.status !== "fulfilled" || !forecastRes.value.ok) throw new Error("forecast unavailable");
  const f = await forecastRes.value.json();

  let air: LiveWeather["air"] = null;
  if (airRes.status === "fulfilled" && airRes.value.ok) {
    const a = await airRes.value.json();
    air = { usAqi: a.current?.us_aqi ?? null, pm25: a.current?.pm2_5 ?? null };
  }

  return {
    current: {
      time: f.current.time,
      temperature: f.current.temperature_2m,
      apparent: f.current.apparent_temperature,
      humidity: f.current.relative_humidity_2m,
      wind: f.current.wind_speed_10m,
      code: f.current.weather_code,
    },
    daily: (f.daily.time as string[]).map((date, i) => ({
      date,
      code: f.daily.weather_code[i],
      max: f.daily.temperature_2m_max[i],
      min: f.daily.temperature_2m_min[i],
      rainChance: f.daily.precipitation_probability_max?.[i] ?? null,
    })),
    air,
  };
}

export function useLiveWeather() {
  const [state, setState] = useState<{ data: LiveWeather | null; error: boolean }>({ data: null, error: false });

  useEffect(() => {
    let alive = true;
    cache ??= fetchLive();
    cache
      .then((data) => alive && setState({ data, error: false }))
      .catch(() => {
        cache = null; // allow a retry on the next mount
        if (alive) setState({ data: null, error: true });
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

/** WMO weather code → message key under `weather.codes`. */
export function weatherKey(code: number) {
  if (code === 0) return "clear";
  if (code === 1) return "mainlyClear";
  if (code === 2) return "partlyCloudy";
  if (code === 3) return "overcast";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 80 && code <= 82) return "showers";
  if (code >= 95 && code <= 99) return "thunderstorm";
  return "unknown";
}

/** US AQI band → message key under `weather.aqi` plus a status tone. */
export function aqiBand(aqi: number) {
  if (aqi <= 50) return { key: "good", tone: "good" } as const;
  if (aqi <= 100) return { key: "moderate", tone: "warning" } as const;
  if (aqi <= 150) return { key: "usg", tone: "serious" } as const;
  if (aqi <= 200) return { key: "unhealthy", tone: "critical" } as const;
  if (aqi <= 300) return { key: "veryUnhealthy", tone: "critical" } as const;
  return { key: "hazardous", tone: "critical" } as const;
}
