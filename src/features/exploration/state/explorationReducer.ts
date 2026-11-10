import { isValidProvisionalThemeId } from "@/data/demo/provisional-themes";
import {
  createDraftStatement,
  createDraftStatementsFromFreeText,
  MAX_CONDITIONS_PER_STATEMENT,
  MAX_OBJECTIVE_LENGTH,
  MAX_STATEMENT_TEXT_LENGTH,
  MAX_STATEMENTS_PER_SESSION,
  splitStatementContent,
} from "@/domain/statements/segmentFreeText";
import type {
  ExplorationSession,
  ExplorationStep,
  Statement,
  ThemeSelectionState,
} from "@/domain/statements/types";
import { createEmptyExplorationSession } from "@/lib/privacy/sessionGuards";
import {
  conditionTextSchema,
  freeTextInputSchema,
  nonEmptyFreeTextSchema,
  objectiveSchema,
  statementTextSchema,
  validateField,
} from "@/lib/schemas/exploration";

export interface DeletedStatementRecord {
  statement: Statement;
  index: number;
}

export interface ExplorationJourneyState {
  session: ExplorationSession;
  freeExpressionError: string | null;
  pendingResegmentPrompt: boolean;
  lastDeleted: DeletedStatementRecord | null;
  focusedStatementId: string | null;
}

export type ExplorationAction =
  | { type: "SET_RAW_TEXT"; text: string }
  | { type: "CONTINUE_FROM_FREE_EXPRESSION" }
  | { type: "RESOLVE_RESEGMENT_KEEP" }
  | { type: "RESOLVE_RESEGMENT_REPLACE" }
  | { type: "RESOLVE_RESEGMENT_APPEND" }
  | { type: "SKIP_FREE_EXPRESSION" }
  | { type: "MARK_FREE_EXPRESSION_DONT_KNOW" }
  | { type: "GO_TO_STEP"; step: ExplorationStep; focusedStatementId?: string | null }
  | { type: "ADD_MANUAL_STATEMENT"; text: string }
  | { type: "UPDATE_STATEMENT_TEXT"; id: string; text: string }
  | { type: "UPDATE_STATEMENT_OBJECTIVE"; id: string; objective: string }
  | {
      type: "SET_STATEMENT_THEMES";
      id: string;
      themeSelectionState: ThemeSelectionState;
      themeIds: string[];
    }
  | { type: "ADD_STATEMENT_CONDITION"; id: string; condition: string }
  | { type: "REMOVE_STATEMENT_CONDITION"; id: string; conditionIndex: number }
  | { type: "MOVE_STATEMENT"; id: string; direction: "up" | "down" }
  | { type: "SPLIT_STATEMENT"; id: string }
  | { type: "DELETE_STATEMENT"; id: string }
  | { type: "UNDO_DELETE_STATEMENT" }
  | { type: "CONFIRM_STATEMENT"; id: string }
  | { type: "UNCONFIRM_STATEMENT"; id: string }
  | { type: "MARK_STATEMENT_UNCERTAIN"; id: string }
  | { type: "CLEAR_FOCUSED_STATEMENT" }
  | { type: "CLEAR_SESSION" };

export function createInitialExplorationJourneyState(): ExplorationJourneyState {
  return {
    session: createEmptyExplorationSession(),
    freeExpressionError: null,
    pendingResegmentPrompt: false,
    lastDeleted: null,
    focusedStatementId: null,
  };
}

function updateStatementById(
  statements: readonly Statement[],
  id: string,
  updater: (statement: Statement) => Statement,
): Statement[] {
  return statements.map((statement) => (statement.id === id ? updater(statement) : statement));
}

export function explorationReducer(
  state: ExplorationJourneyState,
  action: ExplorationAction,
): ExplorationJourneyState {
  switch (action.type) {
    case "SET_RAW_TEXT": {
      const lengthValidation = validateField(freeTextInputSchema, action.text);
      const nextError = lengthValidation.success
        ? action.text.trim().length > 0
          ? null
          : state.freeExpressionError
        : lengthValidation.error;
      const matchesLastSegmented =
        state.session.lastSegmentedText !== null &&
        action.text.trim() === state.session.lastSegmentedText.trim();

      return {
        ...state,
        session: {
          ...state.session,
          rawFreeText: action.text,
        },
        freeExpressionError: nextError,
        pendingResegmentPrompt: matchesLastSegmented ? false : state.pendingResegmentPrompt,
      };
    }

    case "CONTINUE_FROM_FREE_EXPRESSION": {
      const validation = validateField(nonEmptyFreeTextSchema, state.session.rawFreeText);
      if (!validation.success) {
        return {
          ...state,
          freeExpressionError: validation.error,
        };
      }

      const rawText = state.session.rawFreeText;
      const existingStatements = state.session.statements;

      if (existingStatements.length === 0) {
        const drafts = createDraftStatementsFromFreeText(rawText);
        return {
          ...state,
          session: {
            ...state.session,
            step: "structuring",
            lastSegmentedText: rawText,
            freeExpressionState: "answered",
            statements: drafts,
          },
          freeExpressionError: null,
          pendingResegmentPrompt: false,
          lastDeleted: null,
        };
      }

      const isUnchanged =
        state.session.lastSegmentedText !== null &&
        rawText.trim() === state.session.lastSegmentedText.trim();

      if (isUnchanged) {
        return {
          ...state,
          session: {
            ...state.session,
            step: "structuring",
            freeExpressionState: "answered",
          },
          freeExpressionError: null,
          pendingResegmentPrompt: false,
        };
      }

      return {
        ...state,
        freeExpressionError: null,
        pendingResegmentPrompt: true,
      };
    }

    case "RESOLVE_RESEGMENT_KEEP":
      return {
        ...state,
        session: {
          ...state.session,
          step: "structuring",
          freeExpressionState:
            state.session.rawFreeText.trim().length > 0
              ? "answered"
              : state.session.freeExpressionState,
        },
        pendingResegmentPrompt: false,
      };

    case "RESOLVE_RESEGMENT_REPLACE": {
      const drafts = createDraftStatementsFromFreeText(state.session.rawFreeText);
      return {
        ...state,
        session: {
          ...state.session,
          step: "structuring",
          lastSegmentedText: state.session.rawFreeText,
          freeExpressionState: "answered",
          statements: drafts,
        },
        pendingResegmentPrompt: false,
        lastDeleted: null,
        focusedStatementId: null,
      };
    }

    case "RESOLVE_RESEGMENT_APPEND": {
      const candidates = createDraftStatementsFromFreeText(state.session.rawFreeText);
      const existingNormalized = new Set(
        state.session.statements.map((item) => item.text.trim().toLowerCase()),
      );
      const remainingCapacity = Math.max(
        0,
        MAX_STATEMENTS_PER_SESSION - state.session.statements.length,
      );
      const additions = candidates
        .filter((item) => !existingNormalized.has(item.text.trim().toLowerCase()))
        .slice(0, remainingCapacity);

      return {
        ...state,
        session: {
          ...state.session,
          step: "structuring",
          lastSegmentedText: state.session.rawFreeText,
          freeExpressionState: "answered",
          statements: [...state.session.statements, ...additions],
        },
        pendingResegmentPrompt: false,
      };
    }

    case "SKIP_FREE_EXPRESSION":
      return {
        ...state,
        session: {
          ...state.session,
          step: "structuring",
          freeExpressionState: state.session.rawFreeText.trim().length > 0 ? "answered" : "skipped",
        },
        freeExpressionError: null,
        pendingResegmentPrompt: false,
      };

    case "MARK_FREE_EXPRESSION_DONT_KNOW":
      return {
        ...state,
        session: {
          ...state.session,
          step: "structuring",
          freeExpressionState: "dont_know",
        },
        freeExpressionError: null,
        pendingResegmentPrompt: false,
      };

    case "GO_TO_STEP":
      return {
        ...state,
        session: {
          ...state.session,
          step: action.step,
        },
        freeExpressionError: null,
        pendingResegmentPrompt: false,
        focusedStatementId:
          action.focusedStatementId === undefined ? null : action.focusedStatementId,
      };

    case "ADD_MANUAL_STATEMENT": {
      if (state.session.statements.length >= MAX_STATEMENTS_PER_SESSION) {
        return state;
      }
      const validation = validateField(statementTextSchema, action.text);
      if (!validation.success) {
        return state;
      }
      const created = createDraftStatement({
        text: validation.data,
        sourceText: null,
      });
      return {
        ...state,
        session: {
          ...state.session,
          statements: [...state.session.statements, created],
        },
        lastDeleted: null,
        focusedStatementId: created.id,
      };
    }

    case "UPDATE_STATEMENT_TEXT": {
      const boundedText = action.text.slice(0, MAX_STATEMENT_TEXT_LENGTH);
      return {
        ...state,
        session: {
          ...state.session,
          statements: updateStatementById(state.session.statements, action.id, (statement) => {
            const isNowEmpty = boundedText.trim().length === 0;
            return {
              ...statement,
              text: boundedText,
              status: isNowEmpty && statement.status === "confirmed" ? "draft" : statement.status,
              confirmedByUser: isNowEmpty ? false : statement.confirmedByUser,
            };
          }),
        },
      };
    }

    case "UPDATE_STATEMENT_OBJECTIVE": {
      const validation = validateField(objectiveSchema, action.objective);
      const nextObjective = validation.success
        ? action.objective
        : action.objective.slice(0, MAX_OBJECTIVE_LENGTH);
      return {
        ...state,
        session: {
          ...state.session,
          statements: updateStatementById(state.session.statements, action.id, (statement) => ({
            ...statement,
            objective: nextObjective,
          })),
        },
      };
    }

    case "SET_STATEMENT_THEMES": {
      const validIds = Array.from(new Set(action.themeIds)).filter(isValidProvisionalThemeId);
      const nextState: ThemeSelectionState =
        action.themeSelectionState === "selected" && validIds.length === 0
          ? "unselected"
          : action.themeSelectionState;
      const nextThemeIds = nextState === "selected" ? validIds : [];

      return {
        ...state,
        session: {
          ...state.session,
          statements: updateStatementById(state.session.statements, action.id, (statement) => ({
            ...statement,
            themeSelectionState: nextState,
            themeIds: nextThemeIds,
          })),
        },
      };
    }

    case "ADD_STATEMENT_CONDITION": {
      const validation = validateField(conditionTextSchema, action.condition);
      if (!validation.success) {
        return state;
      }

      return {
        ...state,
        session: {
          ...state.session,
          statements: updateStatementById(state.session.statements, action.id, (statement) => {
            if (statement.conditions.length >= MAX_CONDITIONS_PER_STATEMENT) {
              return statement;
            }
            const normalizedCandidate = validation.data.toLowerCase();
            const alreadyExists = statement.conditions.some(
              (existing) => existing.trim().toLowerCase() === normalizedCandidate,
            );
            if (alreadyExists) {
              return statement;
            }
            return {
              ...statement,
              conditions: [...statement.conditions, validation.data],
            };
          }),
        },
      };
    }

    case "REMOVE_STATEMENT_CONDITION":
      return {
        ...state,
        session: {
          ...state.session,
          statements: updateStatementById(state.session.statements, action.id, (statement) => ({
            ...statement,
            conditions: statement.conditions.filter((_, index) => index !== action.conditionIndex),
          })),
        },
      };

    case "MOVE_STATEMENT": {
      const index = state.session.statements.findIndex((item) => item.id === action.id);
      if (index === -1) {
        return state;
      }
      const targetIndex = action.direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.session.statements.length) {
        return state;
      }
      const copy = [...state.session.statements];
      const [moved] = copy.splice(index, 1);
      if (!moved) {
        return state;
      }
      copy.splice(targetIndex, 0, moved);
      return {
        ...state,
        session: {
          ...state.session,
          statements: copy,
        },
      };
    }

    case "SPLIT_STATEMENT": {
      if (state.session.statements.length >= MAX_STATEMENTS_PER_SESSION) {
        return state;
      }
      const index = state.session.statements.findIndex((item) => item.id === action.id);
      const target = index === -1 ? undefined : state.session.statements[index];
      if (!target) {
        return state;
      }
      const splitParts = splitStatementContent(target.text);
      if (!splitParts) {
        return state;
      }
      const firstHalf: Statement = {
        ...target,
        text: splitParts[0],
        status: "draft",
        confirmedByUser: false,
      };
      const secondHalf: Statement = {
        ...createDraftStatement({
          text: splitParts[1],
          sourceText: target.sourceText,
        }),
        themeIds: [...target.themeIds],
        themeSelectionState: target.themeSelectionState,
      };
      const copy = [...state.session.statements];
      copy.splice(index, 1, firstHalf, secondHalf);
      return {
        ...state,
        session: {
          ...state.session,
          statements: copy,
        },
      };
    }

    case "DELETE_STATEMENT": {
      const index = state.session.statements.findIndex((item) => item.id === action.id);
      const removed = index === -1 ? undefined : state.session.statements[index];
      if (!removed) {
        return state;
      }
      return {
        ...state,
        session: {
          ...state.session,
          statements: state.session.statements.filter((item) => item.id !== action.id),
        },
        lastDeleted: {
          statement: removed,
          index,
        },
        focusedStatementId:
          state.focusedStatementId === action.id ? null : state.focusedStatementId,
      };
    }

    case "UNDO_DELETE_STATEMENT": {
      if (!state.lastDeleted) {
        return state;
      }
      if (state.session.statements.length >= MAX_STATEMENTS_PER_SESSION) {
        return {
          ...state,
          lastDeleted: null,
        };
      }
      const copy = [...state.session.statements];
      const safeIndex = Math.min(Math.max(0, state.lastDeleted.index), copy.length);
      copy.splice(safeIndex, 0, state.lastDeleted.statement);
      return {
        ...state,
        session: {
          ...state.session,
          statements: copy,
        },
        lastDeleted: null,
      };
    }

    case "CONFIRM_STATEMENT":
      return {
        ...state,
        session: {
          ...state.session,
          statements: updateStatementById(state.session.statements, action.id, (statement) => {
            const textValidation = validateField(statementTextSchema, statement.text);
            if (!textValidation.success) {
              return statement;
            }
            return {
              ...statement,
              text: textValidation.data,
              objective: statement.objective.trim(),
              status: "confirmed",
              confirmedByUser: true,
              certaintySelfReport:
                statement.certaintySelfReport === "uncertain"
                  ? "not_stated"
                  : statement.certaintySelfReport,
            };
          }),
        },
      };

    case "UNCONFIRM_STATEMENT":
      return {
        ...state,
        session: {
          ...state.session,
          statements: updateStatementById(state.session.statements, action.id, (statement) => ({
            ...statement,
            status: "draft",
            confirmedByUser: false,
          })),
        },
      };

    case "MARK_STATEMENT_UNCERTAIN":
      return {
        ...state,
        session: {
          ...state.session,
          statements: updateStatementById(state.session.statements, action.id, (statement) => ({
            ...statement,
            status: "uncertain",
            confirmedByUser: false,
            certaintySelfReport: "uncertain",
          })),
        },
      };

    case "CLEAR_FOCUSED_STATEMENT":
      return {
        ...state,
        focusedStatementId: null,
      };

    case "CLEAR_SESSION":
      return createInitialExplorationJourneyState();
  }
}
