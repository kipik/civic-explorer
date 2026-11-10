"use client";

import type { ExplorationStep } from "@/domain/statements/types";

export interface StepDefinition {
  id: ExplorationStep;
  number: number;
  label: string;
}

export const EXPLORATION_STEPS: readonly StepDefinition[] = [
  { id: "free_expression", number: 1, label: "Expression libre" },
  { id: "structuring", number: 2, label: "Structuration" },
  { id: "confirmation", number: 3, label: "Confirmation" },
  { id: "mapping", number: 4, label: "Cartographie initiale" },
] as const;

interface StepIndicatorProps {
  currentStep: ExplorationStep;
  onSelectStep: (step: ExplorationStep) => void;
}

export function StepIndicator({ currentStep, onSelectStep }: StepIndicatorProps) {
  return (
    <nav
      aria-label="Étapes du parcours"
      className="rounded-lg border border-stone-200 bg-white p-2"
    >
      <ol className="grid grid-cols-1 gap-1.5 sm:grid-cols-4">
        {EXPLORATION_STEPS.map((step) => {
          const isCurrent = step.id === currentStep;
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onSelectStep(step.id)}
                aria-current={isCurrent ? "step" : undefined}
                className={
                  isCurrent
                    ? "flex min-h-[44px] w-full items-center gap-2 rounded-md border border-slate-900 bg-slate-900 px-3 py-2 text-left text-sm font-semibold text-white"
                    : "flex min-h-[44px] w-full items-center gap-2 rounded-md border border-transparent bg-stone-50 px-3 py-2 text-left text-sm font-medium text-stone-800 hover:border-stone-300 hover:bg-stone-100"
                }
              >
                <span
                  aria-hidden="true"
                  className={
                    isCurrent
                      ? "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 text-xs font-semibold text-white"
                      : "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-xs font-semibold text-stone-800"
                  }
                >
                  {step.number}
                </span>
                <span>{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
