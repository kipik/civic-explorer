import { describe, expect, it } from "vitest";
import {
  createInitialExplorationJourneyState,
  explorationReducer,
} from "@/features/exploration/state/explorationReducer";

describe("explorationReducer", () => {
  it("gère la validation d'entrée vide puis segmente localement le texte libre", () => {
    let state = createInitialExplorationJourneyState();

    state = explorationReducer(state, { type: "CONTINUE_FROM_FREE_EXPRESSION" });
    expect(state.session.step).toBe("free_expression");
    expect(state.freeExpressionError).toMatch(/rien saisi/i);

    state = explorationReducer(state, {
      type: "SET_RAW_TEXT",
      text: "- Accès aux soins\n- Pouvoir d'achat",
    });
    expect(state.freeExpressionError).toBeNull();

    state = explorationReducer(state, { type: "CONTINUE_FROM_FREE_EXPRESSION" });
    expect(state.session.step).toBe("structuring");
    expect(state.session.freeExpressionState).toBe("answered");
    expect(state.session.statements).toHaveLength(2);
    expect(state.session.statements.every((s) => s.confirmedByUser === false)).toBe(true);
  });

  it("distingue passer et « je ne sais pas encore » à l'étape 1", () => {
    const initial = createInitialExplorationJourneyState();

    const skipped = explorationReducer(initial, { type: "SKIP_FREE_EXPRESSION" });
    expect(skipped.session.step).toBe("structuring");
    expect(skipped.session.freeExpressionState).toBe("skipped");

    const dontKnow = explorationReducer(initial, { type: "MARK_FREE_EXPRESSION_DONT_KNOW" });
    expect(dontKnow.session.step).toBe("structuring");
    expect(dontKnow.session.freeExpressionState).toBe("dont_know");
  });

  it("préserve les modifications si l'utilisateur revient à l'écran 1 sans modifier le texte, et propose un choix s'il modifie le texte", () => {
    let state = createInitialExplorationJourneyState();
    state = explorationReducer(state, { type: "SET_RAW_TEXT", text: "Hôpital public." });
    state = explorationReducer(state, { type: "CONTINUE_FROM_FREE_EXPRESSION" });

    const id = state.session.statements[0]!.id;
    state = explorationReducer(state, { type: "CONFIRM_STATEMENT", id });
    state = explorationReducer(state, { type: "GO_TO_STEP", step: "free_expression" });

    // Retour vers structuration avec texte inchangé -> garde la confirmation intacte
    state = explorationReducer(state, { type: "CONTINUE_FROM_FREE_EXPRESSION" });
    expect(state.session.step).toBe("structuring");
    expect(state.session.statements[0]?.confirmedByUser).toBe(true);

    // Modification du texte libre -> demande une confirmation explicite sans écraser
    state = explorationReducer(state, { type: "GO_TO_STEP", step: "free_expression" });
    state = explorationReducer(state, {
      type: "SET_RAW_TEXT",
      text: "Hôpital public.\nÉcoles rurales.",
    });
    state = explorationReducer(state, { type: "CONTINUE_FROM_FREE_EXPRESSION" });
    expect(state.pendingResegmentPrompt).toBe(true);
    expect(state.session.step).toBe("free_expression");

    // Option ajouter les nouveaux éléments -> garde le premier confirmé et ajoute le second en brouillon
    state = explorationReducer(state, { type: "RESOLVE_RESEGMENT_APPEND" });
    expect(state.pendingResegmentPrompt).toBe(false);
    expect(state.session.step).toBe("structuring");
    expect(state.session.statements).toHaveLength(2);
    expect(state.session.statements[0]?.confirmedByUser).toBe(true);
    expect(state.session.statements[1]?.confirmedByUser).toBe(false);
  });

  it("permet modification, objectif, conditions, thèmes, incertitude, suppression + annulation, et effacement complet", () => {
    let state = createInitialExplorationJourneyState();
    state = explorationReducer(state, {
      type: "ADD_MANUAL_STATEMENT",
      text: "Qualité des transports locaux",
    });

    const id = state.session.statements[0]!.id;
    state = explorationReducer(state, {
      type: "UPDATE_STATEMENT_OBJECTIVE",
      id,
      objective: "Augmenter la fréquence des trains régionaux",
    });
    state = explorationReducer(state, {
      type: "ADD_STATEMENT_CONDITION",
      id,
      condition: "Si les tarifs restent accessibles",
    });
    state = explorationReducer(state, {
      type: "SET_STATEMENT_THEMES",
      id,
      themeSelectionState: "selected",
      themeIds: ["public-services-territories"],
    });
    state = explorationReducer(state, { type: "CONFIRM_STATEMENT", id });

    expect(state.session.statements[0]).toMatchObject({
      objective: "Augmenter la fréquence des trains régionaux",
      conditions: ["Si les tarifs restent accessibles"],
      themeSelectionState: "selected",
      themeIds: ["public-services-territories"],
      status: "confirmed",
      confirmedByUser: true,
    });

    state = explorationReducer(state, { type: "MARK_STATEMENT_UNCERTAIN", id });
    expect(state.session.statements[0]?.confirmedByUser).toBe(false);
    expect(state.session.statements[0]?.status).toBe("uncertain");

    state = explorationReducer(state, { type: "DELETE_STATEMENT", id });
    expect(state.session.statements).toHaveLength(0);
    expect(state.lastDeleted?.statement.id).toBe(id);

    state = explorationReducer(state, { type: "UNDO_DELETE_STATEMENT" });
    expect(state.session.statements).toHaveLength(1);

    state = explorationReducer(state, { type: "CLEAR_SESSION" });
    expect(state.session.statements).toEqual([]);
    expect(state.session.rawFreeText).toBe("");
    expect(state.session.step).toBe("free_expression");
  });
});
