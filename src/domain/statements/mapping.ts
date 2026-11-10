import { PROVISIONAL_THEMES, type ProvisionalTheme } from "@/data/demo/provisional-themes";
import type { Statement } from "@/domain/statements/types";

export interface ThemeMappingGroup {
  theme: ProvisionalTheme;
  statements: Statement[];
}

export interface InitialThemeMapping {
  confirmedStatements: Statement[];
  themedGroups: ThemeMappingGroup[];
  unselectedStatements: Statement[];
  dontKnowThemeStatements: Statement[];
  unexploredThemes: ProvisionalTheme[];
  counts: {
    totalStatements: number;
    confirmedCount: number;
    draftCount: number;
    uncertainCount: number;
    coveredThemeCount: number;
    unexploredThemeCount: number;
  };
}

/**
 * Construit la cartographie initiale strictement à partir des déclarations explicitement confirmées
 * par l'utilisateur. Les brouillons et éléments incertains ne sont jamais attribués comme convictions.
 */
export function buildInitialThemeMapping(
  statements: readonly Statement[],
  themes: readonly ProvisionalTheme[] = PROVISIONAL_THEMES,
): InitialThemeMapping {
  const validThemeIds = new Set(themes.map((theme) => theme.id));

  const confirmedStatements = statements.filter(
    (statement) => statement.confirmedByUser && statement.status === "confirmed",
  );
  const draftCount = statements.filter((statement) => statement.status === "draft").length;
  const uncertainCount = statements.filter((statement) => statement.status === "uncertain").length;

  const themedGroups: ThemeMappingGroup[] = [];
  const unexploredThemes: ProvisionalTheme[] = [];

  for (const theme of themes) {
    const matching = confirmedStatements.filter(
      (statement) =>
        statement.themeSelectionState === "selected" && statement.themeIds.includes(theme.id),
    );
    if (matching.length > 0) {
      themedGroups.push({
        theme,
        statements: matching,
      });
    } else {
      unexploredThemes.push(theme);
    }
  }

  const dontKnowThemeStatements = confirmedStatements.filter(
    (statement) => statement.themeSelectionState === "dont_know",
  );

  const unselectedStatements = confirmedStatements.filter((statement) => {
    if (statement.themeSelectionState === "dont_know") {
      return false;
    }
    if (statement.themeSelectionState === "unselected") {
      return true;
    }
    const hasValidSelectedTheme = statement.themeIds.some((id) => validThemeIds.has(id));
    return !hasValidSelectedTheme;
  });

  return {
    confirmedStatements,
    themedGroups,
    unselectedStatements,
    dontKnowThemeStatements,
    unexploredThemes,
    counts: {
      totalStatements: statements.length,
      confirmedCount: confirmedStatements.length,
      draftCount,
      uncertainCount,
      coveredThemeCount: themedGroups.length,
      unexploredThemeCount: unexploredThemes.length,
    },
  };
}
