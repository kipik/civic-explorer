"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { ConfirmationScreen } from "@/features/exploration/components/ConfirmationScreen";
import { FreeExpressionScreen } from "@/features/exploration/components/FreeExpressionScreen";
import { InitialMappingScreen } from "@/features/exploration/components/InitialMappingScreen";
import { StructuringScreen } from "@/features/exploration/components/StructuringScreen";
import {
  createInitialExplorationJourneyState,
  explorationReducer,
} from "@/features/exploration/state/explorationReducer";
import { hasActiveSessionData } from "@/lib/privacy/sessionGuards";

export function ExplorationJourney() {
  const [state, dispatch] = useReducer(
    explorationReducer,
    undefined,
    createInitialExplorationJourneyState,
  );
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [sessionClearedNotice, setSessionClearedNotice] = useState(false);

  const stageContainerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const previousStepRef = useRef(state.session.step);

  const sessionHasData = hasActiveSessionData(state.session);

  useEffect(() => {
    if (!sessionHasData) {
      return;
    }

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sessionHasData]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (previousStepRef.current !== state.session.step) {
      previousStepRef.current = state.session.step;
      if (!state.focusedStatementId) {
        stageContainerRef.current?.focus();
      }
    }
  }, [state.session.step, state.focusedStatementId]);

  function handleClearSessionConfirm() {
    dispatch({ type: "CLEAR_SESSION" });
    setIsConfirmingClear(false);
    setSessionClearedNotice(true);
    stageContainerRef.current?.focus();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-stone-100/80 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-stone-800 sm:text-sm">
          <span className="font-semibold text-stone-950">Session locale en mémoire :</span> vos
          déclarations ne quittent jamais votre navigateur et sont effacées à la fermeture de
          l&apos;onglet.
        </p>

        {!isConfirmingClear ? (
          <button
            type="button"
            disabled={!sessionHasData}
            onClick={() => {
              setSessionClearedNotice(false);
              setIsConfirmingClear(true);
            }}
            className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-md border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-900 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Effacer ma session
          </button>
        ) : null}
      </div>

      {isConfirmingClear ? (
        <div
          role="region"
          aria-labelledby="clear-session-heading"
          className="space-y-3 rounded-lg border border-red-300 bg-red-50 p-4"
        >
          <h2 id="clear-session-heading" className="text-sm font-semibold text-red-950">
            Effacer toutes les saisies de cette session ?
          </h2>
          <p className="text-sm text-red-900">
            Cette action supprime immédiatement votre texte libre et toutes vos déclarations en
            mémoire. Elle est irréversible.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleClearSessionConfirm}
              className="inline-flex min-h-[40px] items-center rounded-md bg-red-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-800"
            >
              Confirmer l&apos;effacement
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmingClear(false)}
              className="inline-flex min-h-[40px] items-center rounded-md border border-stone-300 bg-white px-4 py-1.5 text-xs font-medium text-stone-900 hover:bg-stone-100"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : null}

      {sessionClearedNotice ? (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-stone-300 bg-white p-3.5 text-sm text-stone-900"
        >
          <span>Votre session locale a été entièrement effacée de la mémoire de cet onglet.</span>
          <button
            type="button"
            onClick={() => setSessionClearedNotice(false)}
            className="text-xs font-medium text-stone-700 underline hover:text-stone-950"
          >
            Fermer ce message
          </button>
        </div>
      ) : null}

      <StepIndicator
        currentStep={state.session.step}
        onSelectStep={(step) => dispatch({ type: "GO_TO_STEP", step })}
      />

      <div ref={stageContainerRef} tabIndex={-1} className="focus:outline-none">
        {state.session.step === "free_expression" ? (
          <FreeExpressionScreen
            rawFreeText={state.session.rawFreeText}
            error={state.freeExpressionError}
            pendingResegmentPrompt={state.pendingResegmentPrompt}
            existingStatementsCount={state.session.statements.length}
            onChangeText={(text) => {
              if (sessionClearedNotice) {
                setSessionClearedNotice(false);
              }
              dispatch({ type: "SET_RAW_TEXT", text });
            }}
            onContinue={() => dispatch({ type: "CONTINUE_FROM_FREE_EXPRESSION" })}
            onSkip={() => dispatch({ type: "SKIP_FREE_EXPRESSION" })}
            onMarkDontKnow={() => dispatch({ type: "MARK_FREE_EXPRESSION_DONT_KNOW" })}
            onResolveResegmentKeep={() => dispatch({ type: "RESOLVE_RESEGMENT_KEEP" })}
            onResolveResegmentAppend={() => dispatch({ type: "RESOLVE_RESEGMENT_APPEND" })}
            onResolveResegmentReplace={() => dispatch({ type: "RESOLVE_RESEGMENT_REPLACE" })}
          />
        ) : null}

        {state.session.step === "structuring" ? (
          <StructuringScreen
            rawFreeText={state.session.rawFreeText}
            freeExpressionState={state.session.freeExpressionState}
            statements={state.session.statements}
            lastDeleted={state.lastDeleted}
            onAddManualStatement={(text) => dispatch({ type: "ADD_MANUAL_STATEMENT", text })}
            onUpdateText={(id, text) => dispatch({ type: "UPDATE_STATEMENT_TEXT", id, text })}
            onUpdateObjective={(id, objective) =>
              dispatch({ type: "UPDATE_STATEMENT_OBJECTIVE", id, objective })
            }
            onSetThemes={(id, themeSelectionState, themeIds) =>
              dispatch({ type: "SET_STATEMENT_THEMES", id, themeSelectionState, themeIds })
            }
            onAddCondition={(id, condition) =>
              dispatch({ type: "ADD_STATEMENT_CONDITION", id, condition })
            }
            onRemoveCondition={(id, conditionIndex) =>
              dispatch({ type: "REMOVE_STATEMENT_CONDITION", id, conditionIndex })
            }
            onMoveStatement={(id, direction) => dispatch({ type: "MOVE_STATEMENT", id, direction })}
            onSplitStatement={(id) => dispatch({ type: "SPLIT_STATEMENT", id })}
            onDeleteStatement={(id) => dispatch({ type: "DELETE_STATEMENT", id })}
            onUndoDelete={() => dispatch({ type: "UNDO_DELETE_STATEMENT" })}
            onBack={() => dispatch({ type: "GO_TO_STEP", step: "free_expression" })}
            onNext={() => dispatch({ type: "GO_TO_STEP", step: "confirmation" })}
          />
        ) : null}

        {state.session.step === "confirmation" ? (
          <ConfirmationScreen
            statements={state.session.statements}
            lastDeleted={state.lastDeleted}
            focusedStatementId={state.focusedStatementId}
            onClearFocusedStatement={() => dispatch({ type: "CLEAR_FOCUSED_STATEMENT" })}
            onAddManualStatement={(text) => dispatch({ type: "ADD_MANUAL_STATEMENT", text })}
            onUpdateText={(id, text) => dispatch({ type: "UPDATE_STATEMENT_TEXT", id, text })}
            onUpdateObjective={(id, objective) =>
              dispatch({ type: "UPDATE_STATEMENT_OBJECTIVE", id, objective })
            }
            onSetThemes={(id, themeSelectionState, themeIds) =>
              dispatch({ type: "SET_STATEMENT_THEMES", id, themeSelectionState, themeIds })
            }
            onAddCondition={(id, condition) =>
              dispatch({ type: "ADD_STATEMENT_CONDITION", id, condition })
            }
            onRemoveCondition={(id, conditionIndex) =>
              dispatch({ type: "REMOVE_STATEMENT_CONDITION", id, conditionIndex })
            }
            onConfirmStatement={(id) => dispatch({ type: "CONFIRM_STATEMENT", id })}
            onUnconfirmStatement={(id) => dispatch({ type: "UNCONFIRM_STATEMENT", id })}
            onMarkUncertain={(id) => dispatch({ type: "MARK_STATEMENT_UNCERTAIN", id })}
            onDeleteStatement={(id) => dispatch({ type: "DELETE_STATEMENT", id })}
            onUndoDelete={() => dispatch({ type: "UNDO_DELETE_STATEMENT" })}
            onBack={() => dispatch({ type: "GO_TO_STEP", step: "structuring" })}
            onNext={() => dispatch({ type: "GO_TO_STEP", step: "mapping" })}
          />
        ) : null}

        {state.session.step === "mapping" ? (
          <InitialMappingScreen
            statements={state.session.statements}
            onGoToStep={(step, focusedStatementId) =>
              dispatch({ type: "GO_TO_STEP", step, focusedStatementId })
            }
          />
        ) : null}
      </div>
    </div>
  );
}
