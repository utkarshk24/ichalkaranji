import {
  BarChart3,
  Briefcase,
  Building2,
  Factory,
  FileText,
  Gavel,
  Landmark,
  Languages,
  Mail,
  MessageSquareWarning,
  Search,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Icon names used in data/*.json → Lucide components. */
const iconMap: Record<string, LucideIcon> = {
  chart: BarChart3,
  briefcase: Briefcase,
  building: Building2,
  factory: Factory,
  file: FileText,
  gavel: Gavel,
  landmark: Landmark,
  languages: Languages,
  mail: Mail,
  message: MessageSquareWarning,
  search: Search,
  zap: Zap,
};

export function iconFor(name: string): LucideIcon {
  return iconMap[name] ?? FileText;
}
