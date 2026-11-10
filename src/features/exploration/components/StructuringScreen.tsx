"use client";

import { useState, type FormEvent } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import {
  MAX_OBJECTIVE_LENGTH,
  MAX_STATEMENT_TEXT_LENGTH,
  MAX_STATEMENTS_PER_SESSION,
  splitStatementContent,
} from "@/domain/statements/segmentFreeText";
import type {
  FreeExpressionState,
  Statement,
  ThemeSelectionState,
} from "@/domain/statements/types";
import type { DeletedStatementRecord } from "@/features/exploration/state/explorationReducer";
import { ConditionEditor } from "@/features/exploration/components/ConditionEditor";
import { ThemePicker } from "@/features/exploration/components/ThemePicker";
import { statementTextSchema, validateField } from "@/lib/schemas/exploration";

interface StructuringScreenProps {
  rawFreeText: string;
  freeExpressionState: FreeExpressionState;
  statements: readonly Statement[];
  lastDeleted: DeletedStatementRecord | null;
  onAddManualStatement: (text: string) => void;
  onUpdateText: (id: string, text: string) => void;
  onUpdateObjective: (id: string, objective: string) => void;
  onSetThemes: (id: string, themeSelectionState: ThemeSelectionState, themeIds: string[]) => void;
  onAddCondition: (id: string, condition: string) => void;
  onRemoveCondition: (id: string, conditionIndex: number) => void;
  onMoveStatement: (id: string, direction: "up" | "down") => void;
  onSplitStatement: (id: string) => void;
  onDeleteStatement: (id: string) => void;
  onUndoDelete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export function StructuringScreen({
  rawFreeText,
  freeExpressionState,
  statements,
  lastDeleted,
  onAddManualStatement,
  onUpdateText,
  onUpdateObjective,
  onSetThemes,
  onAddCondition,
  onRemoveCondition,
  onMoveStatement,
  onSplitStatement,
  onDeleteStatement,
  onUndoDelete,
  onBack,
  onNext,
}: StructuringScreenProps) {
  const [newStatementText, setNewStatementText] = useState("");
  const [newStatementError, setNewStatementError] = useState<string | null>(null);

  const isAtStatementLimit = statements.length >= MAX_STATEMENTS_PER_SESSION;

  function handleAddManualSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isAtStatementLimit) {
      setNewStatementError(
        `Vous avez atteint la limite de ${MAX_STATEMENTS_PER_SESSION} déclarations pour cette session.`,
      );
      return;
    }

    const validation = validateField(statementTextSchema, newStatementText);
    if (!validation.success) {
      setNewStatementError(validation.error);
      return;
    }

    onAddManualStatement(validation.data);
    setNewStatementText("");
    setNewStatementError(null);
  }

  return (
    <section aria-labelledby="structuring-heading" className="space-y-6">
      <div className="space-y-3 rounded-lg border border-stone-200 bg-white p-5 shadow-xs sm:p-6">
        <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
          Étape 2 sur 4 — Structuration manuelle
        </p>
        <h1
          id="structuring-heading"
          className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
        >
          Relisez et organisez vos éléments
        </h1>
        <p className="text-sm leading-relaxed text-stone-700">
          Mécanisme local et déterministe : votre texte a été découpé ligne par ligne et phrase par
          phrase dans votre navigateur, sans intelligence artificielle ni appel réseau. Aucune
          interprétation automatique ni classement thématique n&apos;ont été appliqués : vous pouvez
          modifier, scinder, ordonner, classer ou compléter chaque élément librement.
        </p>

        {rawFreeText.trim().length > 0 ? (
          <details className="rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
            <summary className="cursor-pointer font-medium text-stone-900">
              Afficher le texte d&apos;origine saisi à l&apos;étape 1
            </summary>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
              {rawFreeText}
            </p>
          </details>
        ) : (
          <p className="rounded-md border border-stone-200 bg-stone-50 p-3 text-sm text-stone-700">
            {freeExpressionState === "dont_know"
              ? "Vous avez indiqué ne pas savoir encore comment formuler en texte libre. Vous pouvez ajouter une ou plusieurs déclarations directement ci-dessous ou revenir plus tard."
              : "Vous êtes passé directement à la structuration manuelle. Ajoutez librement vos préoccupations ci-dessous."}
          </p>
        )}
      </div>

      {lastDeleted ? (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-300 bg-stone-100 p-4 text-sm text-stone-900"
        >
          <span>Déclaration supprimée : « {lastDeleted.statement.text || "sans texte"} ».</span>
          <button
            type="button"
            onClick={onUndoDelete}
            className="inline-flex min-h-[38px] items-center rounded-md border border-stone-400 bg-white px-3 py-1.5 text-xs font-semibold text-stone-900 hover:bg-stone-50"
          >
            Annuler la suppression
          </button>
        </div>
      ) : null}

      {statements.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-300 bg-white p-6 text-center">
          <p className="text-sm text-stone-700">
            Aucune déclaration structurée pour le moment. Utilisez le formulaire ci-dessous pour en
            créer une, ou revenez à l&apos;étape d&apos;expression libre.
          </p>
        </div>
      ) : (
        <ol className="space-y-4" aria-label="Éléments structurés">
          {statements.map((statement, index) => {
            const textId = `structuring-text-${statement.id}`;
            const objectiveId = `structuring-objective-${statement.id}`;
            const emptyTextWarningId = `structuring-empty-${statement.id}`;
            const isTextEmpty = statement.text.trim().length === 0;
            const canSplit = splitStatementContent(statement.text) !== null;

            return (
              <li key={statement.id}>
                <article
                  aria-label={`Élément ${index + 1}`}
                  className="space-y-4 rounded-lg border border-stone-200 bg-white p-5 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-stone-900">
                        Élément {index + 1} sur {statements.length}
                      </h2>
                      <StatusBadge status={statement.status} />
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => onMoveStatement(statement.id, "up")}
                        aria-label={`Monter l'élément ${index + 1}`}
                        className="inline-flex min-h-[36px] items-center rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-800 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Monter
                      </button>
                      <button
                        type="button"
                        disabled={index === statements.length - 1}
                        onClick={() => onMoveStatement(statement.id, "down")}
                        aria-label={`Descendre l'élément ${index + 1}`}
                        className="inline-flex min-h-[36px] items-center rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-800 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Descendre
                      </button>
                      {canSplit ? (
                        <button
                          type="button"
                          disabled={isAtStatementLimit}
                          onClick={() => onSplitStatement(statement.id)}
                          className="inline-flex min-h-[36px] items-center rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-800 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          Scinder en deux
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => onDeleteStatement(statement.id)}
                        aria-label={`Supprimer l'élément ${index + 1}`}
                        className="inline-flex min-h-[36px] items-center rounded-md border border-red-300 bg-white px-2.5 py-1 text-xs font-medium text-red-900 hover:bg-red-50"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor={textId} className="block text-sm font-medium text-stone-900">
                      Formulation de la préoccupation
                    </label>
                    <textarea
                      id={textId}
                      rows={3}
                      maxLength={MAX_STATEMENT_TEXT_LENGTH}
                      value={statement.text}
                      onChange={(event) => onUpdateText(statement.id, event.target.value)}
                      aria-invalid={isTextEmpty}
                      aria-describedby={isTextEmpty ? emptyTextWarningId : undefined}
                      className="w-full rounded-md border border-stone-300 bg-white p-3 text-sm leading-relaxed text-stone-900"
                    />
                    {isTextEmpty ? (
                      <p
                        id={emptyTextWarningId}
                        role="alert"
                        className="text-xs font-medium text-red-800"
                      >
                        Le texte est vide. Complétez-le ou supprimez cet élément.
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={objectiveId}
                      className="block text-sm font-medium text-stone-900"
                    >
                      Objectif souhaité (facultatif)
                    </label>
                    <input
                      id={objectiveId}
                      type="text"
                      maxLength={MAX_OBJECTIVE_LENGTH}
                      value={statement.objective}
                      onChange={(event) => onUpdateObjective(statement.id, event.target.value)}
                      placeholder="Ex. : réduire les délais de rendez-vous médicaux"
                      className="min-h-[44px] w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-500"
                    />
                  </div>

                  <ThemePicker
                    statementId={`struct-${statement.id}`}
                    themeIds={statement.themeIds}
                    themeSelectionState={statement.themeSelectionState}
                    onChange={(nextState, nextIds) => onSetThemes(statement.id, nextState, nextIds)}
                  />

                  <ConditionEditor
                    statementId={`struct-${statement.id}`}
                    conditions={statement.conditions}
                    onAddCondition={(condition) => onAddCondition(statement.id, condition)}
                    onRemoveCondition={(conditionIndex) =>
                      onRemoveCondition(statement.id, conditionIndex)
                    }
                  />
                </article>
              </li>
            );
          })}
        </ol>
      )}

      <form
        onSubmit={handleAddManualSubmit}
        noValidate
        className="space-y-3 rounded-lg border border-stone-200 bg-white p-5 shadow-xs"
      >
        <h2 className="text-base font-semibold text-stone-900">
          Ajouter une déclaration manuellement
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="manual-statement-input" className="sr-only">
            Nouvelle préoccupation ou déclaration
          </label>
          <input
            id="manual-statement-input"
            type="text"
            maxLength={MAX_STATEMENT_TEXT_LENGTH}
            value={newStatementText}
            onChange={(event) => {
              setNewStatementText(event.target.value);
              if (newStatementError) {
                setNewStatementError(null);
              }
            }}
            disabled={isAtStatementLimit}
            aria-invalid={Boolean(newStatementError)}
            aria-describedby={newStatementError ? "manual-statement-error" : undefined}
            placeholder="Saisir une nouvelle préoccupation à structurer..."
            className="min-h-[44px] flex-1 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-500"
          />
          <button
            type="submit"
            disabled={isAtStatementLimit}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md border border-stone-300 bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Ajouter une déclaration
          </button>
        </div>
        {newStatementError ? (
          <p id="manual-statement-error" role="alert" className="text-xs font-medium text-red-800">
            {newStatementError}
          </p>
        ) : null}
      </form>

      <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
        >
          Revenir à l&apos;expression libre
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Continuer vers la confirmation
        </button>
      </div>
    </section>
  );
}
