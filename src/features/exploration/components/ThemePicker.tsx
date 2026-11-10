"use client";

import { useId, useState } from "react";
import { getProvisionalThemeById, PROVISIONAL_THEMES } from "@/data/demo/provisional-themes";
import type { ThemeSelectionState } from "@/domain/statements/types";

interface ThemePickerProps {
  statementId: string;
  themeIds: readonly string[];
  themeSelectionState: ThemeSelectionState;
  onChange: (nextState: ThemeSelectionState, nextThemeIds: string[]) => void;
  defaultExpanded?: boolean;
}

export function ThemePicker({
  statementId,
  themeIds,
  themeSelectionState,
  onChange,
  defaultExpanded = false,
}: ThemePickerProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const panelId = useId();

  const selectedLabels = themeIds
    .map((id) => getProvisionalThemeById(id)?.label)
    .filter((label): label is string => Boolean(label));

  let summaryText = "Aucun thème sélectionné";
  if (themeSelectionState === "dont_know") {
    summaryText = "Je ne sais pas où classer";
  } else if (themeSelectionState === "selected" && selectedLabels.length > 0) {
    summaryText = selectedLabels.join(" · ");
  }

  function handleToggleTheme(themeId: string) {
    const alreadySelected = themeSelectionState === "selected" && themeIds.includes(themeId);
    const nextIds = alreadySelected
      ? themeIds.filter((id) => id !== themeId)
      : [...themeIds, themeId];

    if (nextIds.length === 0) {
      onChange("unselected", []);
    } else {
      onChange("selected", nextIds);
    }
  }

  return (
    <div className="rounded-md border border-stone-200 bg-stone-50/70 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-0.5">
          <span className="block text-xs font-semibold tracking-wide text-stone-700 uppercase">
            Classement thématique (facultatif)
          </span>
          <p className="text-sm font-medium text-stone-900">{summaryText}</p>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${panelId}-${statementId}`}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex min-h-[40px] items-center rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-900 hover:bg-stone-100"
        >
          {isOpen ? "Fermer les thèmes" : "Choisir ou modifier le thème"}
        </button>
      </div>

      {isOpen ? (
        <div
          id={`${panelId}-${statementId}`}
          className="mt-3 space-y-3 border-t border-stone-200 pt-3"
        >
          <p className="text-xs leading-relaxed text-stone-700">
            Liste provisoire illustrative (version de travail). Aucun thème n&apos;est attribué
            automatiquement : vous choisissez librement si cette déclaration relève d&apos;un ou
            plusieurs thèmes.
          </p>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Options hors classement">
            <button
              type="button"
              aria-pressed={themeSelectionState === "unselected"}
              onClick={() => onChange("unselected", [])}
              className={
                themeSelectionState === "unselected"
                  ? "inline-flex min-h-[40px] items-center rounded-md border border-slate-900 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                  : "inline-flex min-h-[40px] items-center rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-900 hover:bg-stone-100"
              }
            >
              Aucun thème pour l&apos;instant
            </button>
            <button
              type="button"
              aria-pressed={themeSelectionState === "dont_know"}
              onClick={() => onChange("dont_know", [])}
              className={
                themeSelectionState === "dont_know"
                  ? "inline-flex min-h-[40px] items-center rounded-md border border-slate-900 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                  : "inline-flex min-h-[40px] items-center rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-900 hover:bg-stone-100"
              }
            >
              Je ne sais pas où classer
            </button>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-xs font-semibold text-stone-800">
              Thèmes provisoires disponibles
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PROVISIONAL_THEMES.map((theme) => {
                const isChecked = themeSelectionState === "selected" && themeIds.includes(theme.id);
                const checkboxId = `theme-${statementId}-${theme.id}`;
                return (
                  <label
                    key={theme.id}
                    htmlFor={checkboxId}
                    className={
                      isChecked
                        ? "flex cursor-pointer items-start gap-2.5 rounded-md border border-slate-800 bg-white p-2.5 text-sm text-stone-950"
                        : "flex cursor-pointer items-start gap-2.5 rounded-md border border-stone-200 bg-white p-2.5 text-sm text-stone-800 hover:border-stone-300"
                    }
                  >
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleTheme(theme.id)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-400 accent-slate-900"
                    />
                    <span className="space-y-0.5">
                      <span className="block font-medium text-stone-900">{theme.label}</span>
                      <span className="block text-xs leading-snug text-stone-600">
                        {theme.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      ) : null}
    </div>
  );
}
