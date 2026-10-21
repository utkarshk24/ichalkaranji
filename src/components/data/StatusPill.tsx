import { BookOpen, CheckCircle2, Clock, LineChart, TrendingUp } from "lucide-react";
import type { DataStatus } from "@/types/indicator";

const styles: Record<DataStatus, { icon: typeof CheckCircle2; className: string }> = {
  official: { icon: CheckCircle2, className: "bg-emerald-soft text-emerald" },
  secondary: { icon: BookOpen, className: "bg-surface-2 text-primary" },
  estimate: { icon: TrendingUp, className: "bg-gold-soft text-gold" },
  projection: { icon: LineChart, className: "bg-gold-soft text-gold" },
  awaited: { icon: Clock, className: "bg-surface-2 text-fg-muted" },
};

/** Status always shows icon + words, never colour alone. `label` comes from common.status.* */
export function StatusPill({ status, label }: { status: DataStatus; label: string }) {
  const { icon: Icon, className } = styles[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${className}`}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  );
}
