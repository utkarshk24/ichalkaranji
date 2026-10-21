import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Building2,
  Bus,
  CalendarDays,
  CloudSun,
  Factory,
  GraduationCap,
  HeartPulse,
  Image as ImageIcon,
  Info,
  Landmark,
  Map,
  MapPinned,
  Mountain,
  Newspaper,
  Phone,
  ScrollText,
  ShieldAlert,
  Shirt,
  Store,
  Users,
  Utensils,
  Wrench,
  HelpCircle,
  FileText,
  Lock,
  Accessibility,
  Mail,
} from "lucide-react";

/** Every section route in the portal (without locale prefix). Order = sitemap order. */
export const sectionRoutes = [
  "about",
  "history",
  "map",
  "demographics",
  "geography",
  "climate",
  "economy",
  "textile",
  "culture",
  "festivals",
  "tourism",
  "transport",
  "governance",
  "projects",
  "education",
  "health",
  "civic-services",
  "emergency",
  "data",
  "directory",
  "news",
  "gallery",
  "faq",
  "sources",
  "privacy",
  "terms",
  "accessibility",
  "contact",
] as const;

export type SectionRoute = (typeof sectionRoutes)[number];

/** Routes with a dedicated page folder (interactive or bespoke layout). */
export const dedicatedRoutes: SectionRoute[] = ["history", "map", "economy", "textile", "tourism", "data", "projects", "news", "contact", "sources"];

/** Routes rendered by the content-block engine from data/pages/<route>.json. */
export const contentRoutes: SectionRoute[] = sectionRoutes.filter((r) => !dedicatedRoutes.includes(r));

export const routeIcons: Record<SectionRoute, LucideIcon> = {
  about: Info,
  history: Landmark,
  map: Map,
  demographics: Users,
  geography: Mountain,
  climate: CloudSun,
  economy: Factory,
  textile: Shirt,
  culture: Utensils,
  festivals: CalendarDays,
  tourism: MapPinned,
  transport: Bus,
  governance: Building2,
  projects: Wrench,
  education: GraduationCap,
  health: HeartPulse,
  "civic-services": ScrollText,
  emergency: ShieldAlert,
  data: BarChart3,
  directory: Store,
  news: Newspaper,
  gallery: ImageIcon,
  faq: HelpCircle,
  sources: BookOpen,
  privacy: Lock,
  terms: FileText,
  accessibility: Accessibility,
  contact: Mail,
};

export type NavGroupKey = "discover" | "economy" | "living" | "cityhall";

/** Mega-menu structure. `map` is promoted to a top-level item in the header. */
export const navGroups: { key: NavGroupKey; routes: SectionRoute[] }[] = [
  { key: "discover", routes: ["about", "history", "geography", "climate", "culture", "festivals", "tourism", "gallery"] },
  { key: "economy", routes: ["economy", "textile", "projects", "data", "directory", "demographics"] },
  { key: "living", routes: ["transport", "education", "health", "civic-services", "emergency"] },
  { key: "cityhall", routes: ["governance", "news", "sources", "faq", "contact"] },
];

export const legalRoutes: SectionRoute[] = ["sources", "privacy", "terms", "accessibility"];

/** National emergency numbers (stable, Government of India). Local numbers are added only from official sources. */
export const emergencyNumbers = [
  { key: "e112", number: "112", icon: Phone },
  { key: "police", number: "100", icon: ShieldAlert },
  { key: "fire", number: "101", icon: ShieldAlert },
  { key: "ambulance", number: "108", icon: HeartPulse },
  { key: "women", number: "181", icon: Phone },
  { key: "child", number: "1098", icon: Phone },
] as const;

export type EmergencyKey = (typeof emergencyNumbers)[number]["key"];

export const siteConfig = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ichalkaranji.example").replace(/\/$/, ""),
  officialLinks: {
    corporation: process.env.NEXT_PUBLIC_IMC_URL ?? "https://ichalkaranjimnp.in",
    district: process.env.NEXT_PUBLIC_DISTRICT_URL ?? "https://kolhapur.gov.in",
    maharashtra: "https://www.maharashtra.gov.in",
    census: "https://censusindia.gov.in",
    imd: "https://mausam.imd.gov.in",
  },
  /** Portal team inbox for the contact form (mailto). Unset → the form stays disabled. Never a personal address. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  geo: { lat: 16.7, lng: 74.47, elevationM: 538 },
  dataLastUpdated: "2026-10-21",
} as const;
