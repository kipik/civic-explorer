import { describe, expect, it } from "vitest";
import {
  createDraftStatementsFromFreeText,
  MAX_FREE_TEXT_LENGTH,
  MAX_STATEMENT_TEXT_LENGTH,
  MAX_STATEMENTS_PER_SESSION,
  segmentFreeTextDeterministic,
  splitStatementContent,
} from "@/domain/statements/segmentFreeText";

describe("segmentFreeTextDeterministic", () => {
  it("retourne une liste vide pour un texte vide ou uniquement composé d'espaces", () => {
    expect(segmentFreeTextDeterministic("")).toEqual([]);
    expect(segmentFreeTextDeterministic("   \n\t  ")).toEqual([]);
    expect(segmentFreeTextDeterministic("---\n...")).toEqual([]);
  });

  it("conserve une entrée courte ou d'un seul mot sans imposer de longueur minimale", () => {
    expect(segmentFreeTextDeterministic("Logement")).toEqual(["Logement"]);
    expect(segmentFreeTextDeterministic("L'accès aux soins")).toEqual(["L'accès aux soins"]);
  });

  it("découpe les listes à puces et numérotées tout en retirant les marqueurs de liste", () => {
    const input = `
      - L'hôpital public dans les zones rurales
      * Le coût du logement pour les jeunes
      1. La transition écologique
      2) Les transports du quotidien
    `;

    expect(segmentFreeTextDeterministic(input)).toEqual([
      "L'hôpital public dans les zones rurales",
      "Le coût du logement pour les jeunes",
      "La transition écologique",
      "Les transports du quotidien",
    ]);
  });

  it("découpe un paragraphe en phrases tout en préservant les abréviations et décimales", () => {
    const input =
      "M. Dupont s'inquiète des tarifs (ex. électricité, eau, etc.) qui ont augmenté de 2.5 fois. Il souhaite aussi améliorer l'école ! Quelles priorités pour 2027 ?";

    expect(segmentFreeTextDeterministic(input)).toEqual([
      "M. Dupont s'inquiète des tarifs (ex. électricité, eau, etc.) qui ont augmenté de 2.5 fois.",
      "Il souhaite aussi améliorer l'école !",
      "Quelles priorités pour 2027 ?",
    ]);
  });

  it("borne le nombre maximal de déclarations et découpe les segments trop longs sans perte", () => {
    const veryLongWordBlock = Array.from({ length: 220 }, (_, i) => `mot${i}`).join(" ");
    const segments = segmentFreeTextDeterministic(veryLongWordBlock);
    expect(segments.length).toBeGreaterThan(1);
    expect(segments.join(" ")).toBe(veryLongWordBlock);
    for (const segment of segments) {
      expect(segment.length).toBeLessThanOrEqual(MAX_STATEMENT_TEXT_LENGTH);
    }

    const manyLines = Array.from({ length: 80 }, (_, i) => `Préoccupation numéro ${i + 1}`).join(
      "\n",
    );
    expect(segmentFreeTextDeterministic(manyLines)).toHaveLength(MAX_STATEMENTS_PER_SESSION);

    const oversized = "a".repeat(MAX_FREE_TEXT_LENGTH + 500);
    expect(segmentFreeTextDeterministic(oversized).join("").length).toBeLessThanOrEqual(
      MAX_FREE_TEXT_LENGTH,
    );
  });
});

describe("createDraftStatementsFromFreeText", () => {
  it("crée des brouillons non confirmés, sans thème attribué automatiquement, liés au segment source", () => {
    const drafts = createDraftStatementsFromFreeText(
      "Améliorer l'accès aux soins.\nRéduire le coût du logement.",
      "2026-11-10T12:00:00.000Z",
    );

    expect(drafts).toHaveLength(2);
    expect(drafts[0]).toMatchObject({
      text: "Améliorer l'accès aux soins.",
      sourceText: "Améliorer l'accès aux soins.",
      themeIds: [],
      themeSelectionState: "unselected",
      objective: "",
      conditions: [],
      status: "draft",
      confirmedByUser: false,
      createdAt: "2026-11-10T12:00:00.000Z",
    });
    expect(drafts[0]?.id).not.toBe(drafts[1]?.id);
    expect(drafts[0]?.id).not.toContain("soins");
  });
});

describe("splitStatementContent", () => {
  it("scinde une déclaration contenant deux phrases ou clauses séparées", () => {
    expect(splitStatementContent("Renforcer les hôpitaux. Soutenir le personnel.")).toEqual([
      "Renforcer les hôpitaux.",
      "Soutenir le personnel.",
    ]);
    expect(splitStatementContent("Baisser les loyers, construire des logements")).toEqual([
      "Baisser les loyers",
      "construire des logements",
    ]);
    expect(splitStatementContent("Simple mot")).toBeNull();
  });
});
