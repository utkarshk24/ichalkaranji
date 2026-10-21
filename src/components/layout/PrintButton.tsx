"use client";

import { FileDown } from "lucide-react";

/** "Download as PDF" via the browser's print dialog; the print stylesheet strips site chrome and keeps sources. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-no-print
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg hover:bg-surface-2"
    >
      <FileDown className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
