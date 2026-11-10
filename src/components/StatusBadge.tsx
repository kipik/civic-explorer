import type { StatementStatus } from "@/domain/statements/types";

interface StatusBadgeProps {
  status: StatementStatus;
}

const STATUS_DISPLAY: Record<
  StatementStatus,
  { symbol: string; label: string; className: string }
> = {
  draft: {
    symbol: "○",
    label: "Brouillon non confirmé",
    className: "border-stone-300 bg-stone-100 text-stone-800",
  },
  confirmed: {
    symbol: "✓",
    label: "Confirmée par vous",
    className: "border-slate-800 bg-slate-900 text-white",
  },
  uncertain: {
    symbol: "?",
    label: "Incertaine / à préciser",
    className: "border-amber-800/40 bg-amber-50 text-amber-950",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const display = STATUS_DISPLAY[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${display.className}`}
    >
      <span aria-hidden="true">{display.symbol}</span>
      <span>{display.label}</span>
    </span>
  );
}
