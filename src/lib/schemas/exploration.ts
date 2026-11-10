import { z } from "zod";
import { isValidProvisionalThemeId } from "@/data/demo/provisional-themes";
import {
  MAX_CONDITION_LENGTH,
  MAX_CONDITIONS_PER_STATEMENT,
  MAX_FREE_TEXT_LENGTH,
  MAX_OBJECTIVE_LENGTH,
  MAX_STATEMENT_TEXT_LENGTH,
  MAX_STATEMENTS_PER_SESSION,
} from "@/domain/statements/segmentFreeText";

export const freeTextInputSchema = z
  .string()
  .max(
    MAX_FREE_TEXT_LENGTH,
    `Le texte libre ne peut pas dépasser ${MAX_FREE_TEXT_LENGTH.toLocaleString("fr-FR")} caractères.`,
  );

export const nonEmptyFreeTextSchema = freeTextInputSchema.refine(
  (value) => value.trim().length > 0,
  "Vous n'avez encore rien saisi. Écrivez une préoccupation ou utilisez une option pour passer à l'étape suivante.",
);

export const statementTextSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(
    z
      .string()
      .min(1, "Le texte de la déclaration ne peut pas être vide.")
      .max(
        MAX_STATEMENT_TEXT_LENGTH,
        `Une déclaration ne peut pas dépasser ${MAX_STATEMENT_TEXT_LENGTH.toLocaleString("fr-FR")} caractères.`,
      ),
  );

export const objectiveSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(
    z
      .string()
      .max(
        MAX_OBJECTIVE_LENGTH,
        `L'objectif ne peut pas dépasser ${MAX_OBJECTIVE_LENGTH} caractères.`,
      ),
  );

export const conditionTextSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(
    z
      .string()
      .min(1, "La condition ne peut pas être vide.")
      .max(
        MAX_CONDITION_LENGTH,
        `Une condition ne peut pas dépasser ${MAX_CONDITION_LENGTH} caractères.`,
      ),
  );

export const statementPositionSchema = z.enum([
  "support",
  "oppose",
  "conditional",
  "undecided",
  "not_expressed",
]);

export const certaintySelfReportSchema = z.enum([
  "low",
  "medium",
  "high",
  "uncertain",
  "not_stated",
]);

export const themeSelectionStateSchema = z.enum(["selected", "unselected", "dont_know"]);

export const statementStatusSchema = z.enum(["draft", "confirmed", "uncertain"]);

export const freeExpressionStateSchema = z.enum(["initial", "answered", "skipped", "dont_know"]);

export const explorationStepSchema = z.enum([
  "free_expression",
  "structuring",
  "confirmation",
  "mapping",
]);

export const themeIdSchema = z
  .string()
  .refine(isValidProvisionalThemeId, "Identifiant de thème provisoire inconnu.");

export const statementSchema = z
  .object({
    id: z.string().min(1),
    createdAt: z.string().min(1),
    sourceText: z.string().max(MAX_STATEMENT_TEXT_LENGTH).nullable(),
    text: statementTextSchema,
    themeIds: z.array(themeIdSchema),
    themeSelectionState: themeSelectionStateSchema,
    objective: z.string().max(MAX_OBJECTIVE_LENGTH),
    conditions: z.array(conditionTextSchema).max(MAX_CONDITIONS_PER_STATEMENT),
    position: statementPositionSchema,
    certaintySelfReport: certaintySelfReportSchema,
    status: statementStatusSchema,
    confirmedByUser: z.boolean(),
  })
  .strict()
  .refine((data) => data.confirmedByUser === (data.status === "confirmed"), {
    message: "L'état confirmedByUser doit correspondre exactement au statut de confirmation.",
    path: ["confirmedByUser"],
  })
  .refine((data) => data.themeSelectionState !== "selected" || data.themeIds.length > 0, {
    message: "Un thème doit être sélectionné lorsque themeSelectionState vaut 'selected'.",
    path: ["themeIds"],
  });

export const explorationSessionSchema = z
  .object({
    sessionVersion: z.string().min(1),
    segmentationMethodVersion: z.string().min(1),
    taxonomyVersion: z.string().min(1),
    step: explorationStepSchema,
    rawFreeText: freeTextInputSchema,
    lastSegmentedText: freeTextInputSchema.nullable(),
    freeExpressionState: freeExpressionStateSchema,
    statements: z.array(statementSchema).max(MAX_STATEMENTS_PER_SESSION),
  })
  .strict();

export function validateField<T>(
  schema: z.ZodType<T>,
  value: unknown,
): { success: true; data: T } | { success: false; error: string } {
  const parsed = schema.safeParse(value);
  if (parsed.success) {
    return { success: true, data: parsed.data };
  }
  const firstIssue = parsed.error.issues[0];
  return {
    success: false,
    error: firstIssue?.message ?? "La saisie n'est pas valide.",
  };
}
