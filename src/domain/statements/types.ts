export type StatementPosition =
  "support" | "oppose" | "conditional" | "undecided" | "not_expressed";

export type CertaintySelfReport = "low" | "medium" | "high" | "uncertain" | "not_stated";

export type ThemeSelectionState = "selected" | "unselected" | "dont_know";

export type StatementStatus = "draft" | "confirmed" | "uncertain";

export type FreeExpressionState = "initial" | "answered" | "skipped" | "dont_know";

export type ExplorationStep = "free_expression" | "structuring" | "confirmation" | "mapping";

export interface Statement {
  id: string;
  createdAt: string;
  sourceText: string | null;
  text: string;
  themeIds: string[];
  themeSelectionState: ThemeSelectionState;
  objective: string;
  conditions: string[];
  position: StatementPosition;
  certaintySelfReport: CertaintySelfReport;
  status: StatementStatus;
  confirmedByUser: boolean;
}

export interface ExplorationSession {
  sessionVersion: string;
  segmentationMethodVersion: string;
  taxonomyVersion: string;
  step: ExplorationStep;
  rawFreeText: string;
  lastSegmentedText: string | null;
  freeExpressionState: FreeExpressionState;
  statements: Statement[];
}
