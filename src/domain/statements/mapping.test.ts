import { describe, expect, it } from "vitest";
import { PROVISIONAL_THEMES } from "@/data/demo/provisional-themes";
import { buildInitialThemeMapping } from "@/domain/statements/mapping";
import { createDraftStatement } from "@/domain/statements/segmentFreeText";

describe("buildInitialThemeMapping", () => {
  it("n'inclut jamais les brouillons ni les déclarations incertaines dans la cartographie confirmée", () => {
    const draft = createDraftStatement({ id: "id-1", text: "Brouillon santé" });
    draft.themeSelectionState = "selected";
    draft.themeIds = ["health-social-protection"];

    const uncertain = createDraftStatement({ id: "id-2", text: "Déclaration incertaine" });
    uncertain.status = "uncertain";
    uncertain.certaintySelfReport = "uncertain";
    uncertain.confirmedByUser = false;

    const confirmed = createDraftStatement({ id: "id-3", text: "Accès aux soins de proximité" });
    confirmed.status = "confirmed";
    confirmed.confirmedByUser = true;
    confirmed.themeSelectionState = "selected";
    confirmed.themeIds = ["health-social-protection"];

    const mapping = buildInitialThemeMapping([draft, uncertain, confirmed], PROVISIONAL_THEMES);

    expect(mapping.confirmedStatements).toHaveLength(1);
    expect(mapping.confirmedStatements[0]?.id).toBe("id-3");
    expect(mapping.themedGroups).toHaveLength(1);
    expect(mapping.themedGroups[0]?.theme.id).toBe("health-social-protection");
    expect(mapping.themedGroups[0]?.statements.map((s) => s.id)).toEqual(["id-3"]);
    expect(mapping.counts).toEqual({
      totalStatements: 3,
      confirmedCount: 1,
      draftCount: 1,
      uncertainCount: 1,
      coveredThemeCount: 1,
      unexploredThemeCount: PROVISIONAL_THEMES.length - 1,
    });
  });

  it("sépare explicitement les déclarations confirmées sans thème de celles marquées « Je ne sais pas où classer »", () => {
    const unselected = createDraftStatement({ id: "id-u", text: "Sans thème choisi" });
    unselected.status = "confirmed";
    unselected.confirmedByUser = true;
    unselected.themeSelectionState = "unselected";

    const dontKnow = createDraftStatement({ id: "id-d", text: "Classement incertain" });
    dontKnow.status = "confirmed";
    dontKnow.confirmedByUser = true;
    dontKnow.themeSelectionState = "dont_know";

    const mapping = buildInitialThemeMapping([unselected, dontKnow], PROVISIONAL_THEMES);

    expect(mapping.themedGroups).toEqual([]);
    expect(mapping.unselectedStatements.map((s) => s.id)).toEqual(["id-u"]);
    expect(mapping.dontKnowThemeStatements.map((s) => s.id)).toEqual(["id-d"]);
  });

  it("affiche une déclaration multi-thèmes sous chaque thème explicitement sélectionné", () => {
    const multi = createDraftStatement({ id: "id-m", text: "Rénovation thermique des logements" });
    multi.status = "confirmed";
    multi.confirmedByUser = true;
    multi.themeSelectionState = "selected";
    multi.themeIds = ["housing-living-conditions", "ecology-energy-climate"];

    const mapping = buildInitialThemeMapping([multi], PROVISIONAL_THEMES);

    expect(mapping.themedGroups.map((g) => g.theme.id)).toEqual([
      "ecology-energy-climate",
      "housing-living-conditions",
    ]);
    expect(mapping.counts.coveredThemeCount).toBe(2);
  });
});
