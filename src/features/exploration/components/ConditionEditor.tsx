"use client";

import { useState, type KeyboardEvent } from "react";
import {
  MAX_CONDITION_LENGTH,
  MAX_CONDITIONS_PER_STATEMENT,
} from "@/domain/statements/segmentFreeText";
import { conditionTextSchema, validateField } from "@/lib/schemas/exploration";

interface ConditionEditorProps {
  statementId: string;
  conditions: readonly string[];
  onAddCondition: (condition: string) => void;
  onRemoveCondition: (index: number) => void;
}

export function ConditionEditor({
  statementId,
  conditions,
  onAddCondition,
  onRemoveCondition,
}: ConditionEditorProps) {
  const [draftCondition, setDraftCondition] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputId = `condition-input-${statementId}`;
  const helperId = `condition-helper-${statementId}`;
  const errorId = `condition-error-${statementId}`;
  const isAtLimit = conditions.length >= MAX_CONDITIONS_PER_STATEMENT;

  function handleAdd() {
    if (isAtLimit) {
      setErrorMessage(
        `Vous avez atteint la limite de ${MAX_CONDITIONS_PER_STATEMENT} conditions pour cette déclaration.`,
      );
      return;
    }

    const validation = validateField(conditionTextSchema, draftCondition);
    if (!validation.success) {
      setErrorMessage(validation.error);
      return;
    }

    const duplicate = conditions.some(
      (existing) => existing.trim().toLowerCase() === validation.data.toLowerCase(),
    );
    if (duplicate) {
      setErrorMessage("Cette condition figure déjà dans la liste.");
      return;
    }

    onAddCondition(validation.data);
    setDraftCondition("");
    setErrorMessage(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="space-y-2.5">
      <div className="space-y-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-stone-900">
          Conditions éventuelles (facultatif)
        </label>
        <p id={helperId} className="text-xs text-stone-600">
          Dans quelles circonstances votre position ou priorité pourrait-elle évoluer ?
        </p>
      </div>

      {conditions.length > 0 ? (
        <ul className="space-y-1.5" aria-label="Conditions ajoutées">
          {conditions.map((condition, index) => (
            <li
              key={`${statementId}-cond-${index}-${condition}`}
              className="flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900"
            >
              <span>{condition}</span>
              <button
                type="button"
                onClick={() => onRemoveCondition(index)}
                aria-label={`Retirer la condition : ${condition}`}
                className="inline-flex min-h-[36px] shrink-0 items-center rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-800 hover:bg-stone-100"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="text"
          value={draftCondition}
          maxLength={MAX_CONDITION_LENGTH}
          onChange={(event) => {
            setDraftCondition(event.target.value);
            if (errorMessage) {
              setErrorMessage(null);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={isAtLimit}
          aria-describedby={errorMessage ? `${helperId} ${errorId}` : helperId}
          aria-invalid={Boolean(errorMessage)}
          placeholder="Ex. : à condition de préserver l'accès dans les zones rurales"
          className="min-h-[44px] flex-1 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-500 disabled:bg-stone-100"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isAtLimit}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Ajouter une condition
        </button>
      </div>

      {errorMessage ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-800">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
