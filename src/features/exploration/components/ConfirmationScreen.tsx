"use client";

import { useEffect, useState, type FormEvent } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import {
  MAX_OBJECTIVE_LENGTH,
  MAX_STATEMENT_TEXT_LENGTH,
  MAX_STATEMENTS_PER_SESSION,
} from "@/domain/statements/segmentFreeText";
import type { Statement, ThemeSelectionState } from "@/domain/statements/types";
import type { DeletedStatementRecord } from "@/features/exploration/state/explorationReducer";
import { ConditionEditor } from "@/features/exploration/components/ConditionEditor";
import { ThemePicker } from "@/features/exploration/components/ThemePicker";
import { statementTextSchema, validateField } from "@/lib/schemas/exploration";

interface ConfirmationScreenProps {
  statements: readonly Statement[];
  lastDeleted: DeletedStatementRecord | null;
  focusedStatementId: string | null;
  onClearFocusedStatement: () => void;
  onAddManualStatement: (text: string) => void;
  onUpdateText: (id: string, text: string) => void;
  onUpdateObjective: (id: string, objective: string) => void;
  onSetThemes: (id: string, themeSelectionState: ThemeSelectionState, themeIds: string[]) => void;
  onAddCondition: (id: string, condition: string) => void;
  onRemoveCondition: (id: string, conditionIndex: number) => void;
  onConfirmStatement: (id: string) => void;
  onUnconfirmStatement: (id: string) => void;
  onMarkUncertain: (id: string) => void;
  onDeleteStatement: (id: string) => void;
  onUndoDelete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export function ConfirmationScreen({
  statements,
  lastDeleted,
  focusedStatementId,
  onClearFocusedStatement,
  onAddManualStatement,
  onUpdateText,
  onUpdateObjective,
  onSetThemes,
  onAddCondition,
  onRemoveCondition,
  onConfirmStatement,
  onUnconfirmStatement,
  onMarkUncertain,
  onDeleteStatement,
  onUndoDelete,
  onBack,
  onNext,
}: ConfirmationScreenProps) {
  const [confirmErrors, setConfirmErrors] = useState<Record<string, string>>({});
  const [newText, setNewText] = useState("");
  const [newError, setNewError] = useState<string | null>(null);

  useEffect(() => {
    if (!focusedStatementId) {
      return;
    }
    const targetElement = document.getElementById(`confirm-text-${focusedStatementId}`);
    if (targetElement) {
      targetElement.focus();
      onClearFocusedStatement();
    }
  }, [focusedStatementId, onClearFocusedStatement]);

  const confirmedCount = statements.filter(
    (s) => s.confirmedByUser && s.status === "confirmed",
  ).length;
  const draftCount = statements.filter((s) => s.status === "draft").length;
  const uncertainCount = statements.filter((s) => s.status === "uncertain").length;
  const isAtStatementLimit = statements.length >= MAX_STATEMENTS_PER_SESSION;

  function handleConfirmClick(statement: Statement) {
    const validation = validateField(statementTextSchema, statement.text);
    if (!validation.success) {
      setConfirmErrors((prev) => ({
        ...prev,
        [statement.id]: validation.error,
      }));
      return;
    }
    setConfirmErrors((prev) => {
      const next = { ...prev };
      delete next[statement.id];
      return next;
    });
    onConfirmStatement(statement.id);
  }

  function handleAddManualSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isAtStatementLimit) {
      setNewError(
        `Vous avez atteint la limite de ${MAX_STATEMENTS_PER_SESSION} déclarations pour cette session.`,
      );
      return;
    }
    const validation = validateField(statementTextSchema, newText);
    if (!validation.success) {
      setNewError(validation.error);
      return;
    }
    onAddManualStatement(validation.data);
    setNewText("");
    setNewError(null);
  }

  return (
    <section aria-labelledby="confirmation-heading" className="space-y-6">
      <div className="space-y-3 rounded-lg border border-stone-200 bg-white p-5 shadow-xs sm:p-6">
        <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
          Étape 3 sur 4 — Confirmation et nuances
        </p>
        <h1
          id="confirmation-heading"
          className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
        >
          Vérifiez et confirmez ce qui reflète votre pensée
        </h1>
        <p className="text-sm leading-relaxed text-stone-700">
          Tant qu&apos;une proposition reste à l&apos;état de brouillon ou d&apos;incertitude, elle
          n&apos;est jamais considérée comme une conviction qui vous est attribuée. Pour chaque
          déclaration, vous pouvez confirmer, modifier le texte, préciser un objectif, ajouter des
          conditions ou la supprimer.
        </p>

        <div
          aria-label="État actuel des déclarations"
          className="flex flex-wrap gap-2 rounded-md border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs font-medium text-stone-800"
        >
          <span>Confirmée(s) : {confirmedCount}</span>
          <span aria-hidden="true">·</span>
          <span>Brouillon(s) non confirmé(s) : {draftCount}</span>
          <span aria-hidden="true">·</span>
          <span>Incertaine(s) : {uncertainCount}</span>
        </div>
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
        <div className="space-y-3 rounded-lg border border-dashed border-stone-300 bg-white p-6 text-center">
          <p className="text-sm text-stone-700">
            Aucune déclaration à relire pour l&apos;instant. Vous pouvez en ajouter une ci-dessous,
            revenir aux étapes précédentes ou consulter la cartographie initiale en l&apos;état.
          </p>
        </div>
      ) : (
        <ol className="space-y-4" aria-label="Déclarations à confirmer">
          {statements.map((statement, index) => {
            const textId = `confirm-text-${statement.id}`;
            const objectiveId = `confirm-objective-${statement.id}`;
            const errorId = `confirm-error-${statement.id}`;
            const cardError = confirmErrors[statement.id];
            const isConfirmed = statement.confirmedByUser && statement.status === "confirmed";

            return (
              <li key={statement.id}>
                <article
                  aria-label={`Déclaration ${index + 1}`}
                  className={
                    isConfirmed
                      ? "space-y-4 rounded-lg border-2 border-slate-800 bg-white p-5 shadow-xs"
                      : "space-y-4 rounded-lg border border-stone-200 bg-white p-5 shadow-xs"
                  }
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-stone-900">
                        Déclaration {index + 1} sur {statements.length}
                      </h2>
                      <StatusBadge status={statement.status} />
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteStatement(statement.id)}
                      aria-label={`Supprimer la déclaration ${index + 1}`}
                      className="inline-flex min-h-[38px] items-center rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-900 hover:bg-red-50"
                    >
                      Supprimer la déclaration
                    </button>
                  </div>

                  {statement.sourceText && statement.sourceText !== statement.text ? (
                    <p className="rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-700">
                      <span className="font-semibold">Extrait d&apos;origine : </span>
                      {statement.sourceText}
                    </p>
                  ) : null}

                  <div className="space-y-1.5">
                    <label htmlFor={textId} className="block text-sm font-medium text-stone-900">
                      Texte de la déclaration
                    </label>
                    <textarea
                      id={textId}
                      rows={3}
                      maxLength={MAX_STATEMENT_TEXT_LENGTH}
                      value={statement.text}
                      onChange={(event) => {
                        onUpdateText(statement.id, event.target.value);
                        if (cardError && event.target.value.trim().length > 0) {
                          setConfirmErrors((prev) => {
                            const next = { ...prev };
                            delete next[statement.id];
                            return next;
                          });
                        }
                      }}
                      aria-invalid={Boolean(cardError)}
                      aria-describedby={cardError ? errorId : undefined}
                      className="w-full rounded-md border border-stone-300 bg-white p-3 text-sm leading-relaxed text-stone-900"
                    />
                    {cardError ? (
                      <p id={errorId} role="alert" className="text-xs font-medium text-red-800">
                        {cardError}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={objectiveId}
                      className="block text-sm font-medium text-stone-900"
                    >
                      Préciser l&apos;objectif (facultatif)
                    </label>
                    <input
                      id={objectiveId}
                      type="text"
                      maxLength={MAX_OBJECTIVE_LENGTH}
                      value={statement.objective}
                      onChange={(event) => onUpdateObjective(statement.id, event.target.value)}
                      placeholder="Ex. : garantir un accès effectif en moins de 30 minutes"
                      className="min-h-[44px] w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-500"
                    />
                  </div>

                  <ConditionEditor
                    statementId={`confirm-${statement.id}`}
                    conditions={statement.conditions}
                    onAddCondition={(condition) => onAddCondition(statement.id, condition)}
                    onRemoveCondition={(conditionIndex) =>
                      onRemoveCondition(statement.id, conditionIndex)
                    }
                  />

                  <ThemePicker
                    statementId={`confirm-${statement.id}`}
                    themeIds={statement.themeIds}
                    themeSelectionState={statement.themeSelectionState}
                    onChange={(nextState, nextIds) => onSetThemes(statement.id, nextState, nextIds)}
                  />

                  <div className="flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3">
                    {isConfirmed ? (
                      <button
                        type="button"
                        onClick={() => onUnconfirmStatement(statement.id)}
                        className="inline-flex min-h-[44px] items-center rounded-md border border-stone-300 bg-stone-100 px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-200"
                      >
                        Retirer la confirmation
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleConfirmClick(statement)}
                        className="inline-flex min-h-[44px] items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        Confirmer cette déclaration
                      </button>
                    )}

                    <button
                      type="button"
                      aria-pressed={statement.status === "uncertain"}
                      onClick={() => onMarkUncertain(statement.id)}
                      className={
                        statement.status === "uncertain"
                          ? "inline-flex min-h-[44px] items-center rounded-md border border-amber-800 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-950"
                          : "inline-flex min-h-[44px] items-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
                      }
                    >
                      Marquer comme incertaine
                    </button>
                  </div>
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
        <h2 className="text-base font-semibold text-stone-900">Ajouter une déclaration oubliée</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="confirm-manual-statement-input" className="sr-only">
            Ajouter une nouvelle déclaration à confirmer
          </label>
          <input
            id="confirm-manual-statement-input"
            type="text"
            maxLength={MAX_STATEMENT_TEXT_LENGTH}
            value={newText}
            onChange={(event) => {
              setNewText(event.target.value);
              if (newError) {
                setNewError(null);
              }
            }}
            disabled={isAtStatementLimit}
            aria-invalid={Boolean(newError)}
            aria-describedby={newError ? "confirm-manual-error" : undefined}
            placeholder="Ajouter une autre préoccupation..."
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
        {newError ? (
          <p id="confirm-manual-error" role="alert" className="text-xs font-medium text-red-800">
            {newError}
          </p>
        ) : null}
      </form>

      {draftCount + uncertainCount > 0 ? (
        <p className="rounded-md border border-stone-300 bg-stone-100 p-3.5 text-sm text-stone-800">
          Note : les {draftCount + uncertainCount} élément(s) resté(s) en brouillon ou marqué(s)
          comme incertain(s) ne seront pas affichés comme convictions confirmées dans la
          cartographie initiale.
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
        >
          Revenir à la structuration
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Voir la cartographie initiale
        </button>
      </div>
    </section>
  );
}
