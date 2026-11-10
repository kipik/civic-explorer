import { PROVISIONAL_THEMES_VERSION } from "@/data/demo/provisional-themes";
import { SEGMENTATION_METHOD_VERSION, SESSION_VERSION } from "@/domain/statements/segmentFreeText";
import type { ExplorationSession } from "@/domain/statements/types";

export const PROHIBITED_PROFILE_KEYS = [
  "ideology",
  "leftRight",
  "partyAffinity",
  "voteIntent",
  "candidateScore",
  "proximityScore",
] as const;

/**
 * Initialise une session vierge uniquement en mémoire navigateur.
 */
export function createEmptyExplorationSession(): ExplorationSession {
  return {
    sessionVersion: SESSION_VERSION,
    segmentationMethodVersion: SEGMENTATION_METHOD_VERSION,
    taxonomyVersion: PROVISIONAL_THEMES_VERSION,
    step: "free_expression",
    rawFreeText: "",
    lastSegmentedText: null,
    freeExpressionState: "initial",
    statements: [],
  };
}

export function hasActiveSessionData(session: ExplorationSession): boolean {
  return (
    session.rawFreeText.trim().length > 0 ||
    session.statements.length > 0 ||
    session.freeExpressionState !== "initial"
  );
}
