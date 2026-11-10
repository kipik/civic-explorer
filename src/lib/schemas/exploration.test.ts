import { describe, expect, it } from "vitest";
import { createDraftStatement } from "@/domain/statements/segmentFreeText";
import { createEmptyExplorationSession } from "@/lib/privacy/sessionGuards";
import {
  conditionTextSchema,
  explorationSessionSchema,
  nonEmptyFreeTextSchema,
  statementSchema,
  statementTextSchema,
  validateField,
} from "@/lib/schemas/exploration";

describe("Schémas Zod exploration", () => {
  it("valide une session vierge et une déclaration conforme", () => {
    const session = createEmptyExplorationSession();
    expect(explorationSessionSchema.safeParse(session).success).toBe(true);

    const draft = createDraftStatement({ text: "Maintenir les services publics locaux" });
    expect(statementSchema.safeParse(draft).success).toBe(true);
  });

  it("rejette le texte vide pour une déclaration ou condition, tout en acceptant un seul mot", () => {
    expect(validateField(nonEmptyFreeTextSchema, "   ").success).toBe(false);
    expect(validateField(nonEmptyFreeTextSchema, "Écologie").success).toBe(true);

    expect(validateField(statementTextSchema, "   ").success).toBe(false);
    expect(validateField(statementTextSchema, "  Santé  ")).toEqual({
      success: true,
      data: "Santé",
    });

    expect(validateField(conditionTextSchema, "").success).toBe(false);
    expect(validateField(conditionTextSchema, "Si financé équitablement").success).toBe(true);
  });

  it("refuse les propriétés inconnues ou champs de profilage politique (.strict())", () => {
    const draft = createDraftStatement({ text: "Logement abordable" });
    const injectedProfile = {
      ...draft,
      ideology: "center",
      leftRight: 0.2,
      partyAffinity: "demo",
    };

    expect(statementSchema.safeParse(injectedProfile).success).toBe(false);
  });

  it("refuse une incohérence entre status et confirmedByUser", () => {
    const draft = createDraftStatement({ text: "Éducation" });
    const inconsistent = {
      ...draft,
      status: "draft",
      confirmedByUser: true,
    };

    expect(statementSchema.safeParse(inconsistent).success).toBe(false);
  });
});
