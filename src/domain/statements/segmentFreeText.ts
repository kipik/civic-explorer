import type { Statement } from "@/domain/statements/types";

export const SESSION_VERSION = "0.2.0";
export const SEGMENTATION_METHOD_VERSION = "deterministic-split-v0.1";

export const MAX_FREE_TEXT_LENGTH = 10_000;
export const MAX_STATEMENT_TEXT_LENGTH = 1_000;
export const MAX_OBJECTIVE_LENGTH = 500;
export const MAX_CONDITION_LENGTH = 400;
export const MAX_CONDITIONS_PER_STATEMENT = 10;
export const MAX_STATEMENTS_PER_SESSION = 50;

const COMMON_FRENCH_ABBREVIATIONS = new Set([
  "m",
  "mme",
  "mmes",
  "mlle",
  "dr",
  "pr",
  "etc",
  "ex",
  "cf",
  "art",
  "env",
  "fig",
  "vol",
  "av",
  "bd",
  "st",
  "ste",
  "nb",
]);

const LEADING_LIST_MARKER_PATTERN = /^(?:[-*•–—]+|\d+[.)])\s+/;

let fallbackIdCounter = 0;

/**
 * Génère un identifiant local opaque sans encodage sémantique ni politique.
 */
export function createOpaqueLocalId(): string {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }
  fallbackIdCounter += 1;
  return `local-item-${Date.now()}-${fallbackIdCounter}`;
}

function isOnlyPunctuationOrWhitespace(value: string): boolean {
  return value.replace(/[\s.,;:!?…\-–—•*()[\]{}"'«»]/g, "").length === 0;
}

function extractPrecedingWordLower(text: string, dotIndex: number): string {
  let start = dotIndex - 1;
  while (start >= 0 && /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(text.charAt(start))) {
    start -= 1;
  }
  return text.slice(start + 1, dotIndex).toLowerCase();
}

function shouldSplitAtPunctuation(line: string, index: number): boolean {
  const char = line.charAt(index);
  if (char !== "." && char !== "!" && char !== "?") {
    return false;
  }

  const nextChar = line.charAt(index + 1);
  if (nextChar === "" || !/\s/.test(nextChar)) {
    return false;
  }

  if (char === ".") {
    const prevChar = line.charAt(index - 1);
    if (/\d/.test(prevChar) && /\d/.test(line.charAt(index + 2))) {
      return false;
    }

    const precedingWord = extractPrecedingWordLower(line, index);
    if (precedingWord.length === 1 || COMMON_FRENCH_ABBREVIATIONS.has(precedingWord)) {
      return false;
    }
  }

  return true;
}

function splitLineIntoSentences(line: string): string[] {
  const sentences: string[] = [];
  let start = 0;

  for (let index = 0; index < line.length; index += 1) {
    const char = line.charAt(index);
    if (char === "." || char === "!" || char === "?") {
      let endOfPunctuation = index;
      while (
        endOfPunctuation + 1 < line.length &&
        (line.charAt(endOfPunctuation + 1) === "." ||
          line.charAt(endOfPunctuation + 1) === "!" ||
          line.charAt(endOfPunctuation + 1) === "?")
      ) {
        endOfPunctuation += 1;
      }

      if (shouldSplitAtPunctuation(line, endOfPunctuation)) {
        const segment = line.slice(start, endOfPunctuation + 1).trim();
        if (segment.length > 0 && !isOnlyPunctuationOrWhitespace(segment)) {
          sentences.push(segment);
        }
        start = endOfPunctuation + 1;
        while (start < line.length && /\s/.test(line.charAt(start))) {
          start += 1;
        }
        index = Math.max(index, start - 1);
      } else {
        index = endOfPunctuation;
      }
    }
  }

  const trailing = line.slice(start).trim();
  if (trailing.length > 0 && !isOnlyPunctuationOrWhitespace(trailing)) {
    sentences.push(trailing);
  }

  return sentences;
}

function splitOverlongSegment(segment: string, maxLength: number): string[] {
  if (segment.length <= maxLength) {
    return [segment];
  }

  const chunks: string[] = [];
  let remaining = segment;

  while (remaining.length > maxLength) {
    let splitIndex = remaining.lastIndexOf(" ", maxLength);
    if (splitIndex <= 0) {
      splitIndex = maxLength;
    }
    const piece = remaining.slice(0, splitIndex).trim();
    if (piece.length > 0) {
      chunks.push(piece);
    }
    remaining = remaining.slice(splitIndex).trim();
  }

  if (remaining.length > 0) {
    chunks.push(remaining);
  }

  return chunks;
}

/**
 * Découpe un texte libre en propositions de déclarations de façon purement déterministe et locale,
 * sans analyse sémantique automatique ni appel réseau.
 */
export function segmentFreeTextDeterministic(rawText: string): string[] {
  const normalized = rawText.replace(/\r\n?/g, "\n").trim();
  if (normalized.length === 0) {
    return [];
  }

  const boundedText = normalized.slice(0, MAX_FREE_TEXT_LENGTH);
  const rawLines = boundedText.split("\n");
  const results: string[] = [];

  for (const rawLine of rawLines) {
    const cleanedLine = rawLine.trim().replace(LEADING_LIST_MARKER_PATTERN, "").trim();
    if (cleanedLine.length === 0 || isOnlyPunctuationOrWhitespace(cleanedLine)) {
      continue;
    }

    const sentences = splitLineIntoSentences(cleanedLine);
    for (const sentence of sentences) {
      const boundedSegments = splitOverlongSegment(sentence, MAX_STATEMENT_TEXT_LENGTH);
      for (const segment of boundedSegments) {
        results.push(segment);
        if (results.length >= MAX_STATEMENTS_PER_SESSION) {
          return results;
        }
      }
    }
  }

  return results;
}

export interface CreateStatementOptions {
  text: string;
  sourceText?: string | null;
  createdAt?: string;
  id?: string;
}

export function createDraftStatement(options: CreateStatementOptions): Statement {
  return {
    id: options.id ?? createOpaqueLocalId(),
    createdAt: options.createdAt ?? new Date().toISOString(),
    sourceText: options.sourceText === undefined ? options.text : options.sourceText,
    text: options.text.trim(),
    themeIds: [],
    themeSelectionState: "unselected",
    objective: "",
    conditions: [],
    position: "not_expressed",
    certaintySelfReport: "not_stated",
    status: "draft",
    confirmedByUser: false,
  };
}

export function createDraftStatementsFromFreeText(rawText: string, nowIso?: string): Statement[] {
  const segments = segmentFreeTextDeterministic(rawText);
  const timestamp = nowIso ?? new Date().toISOString();

  return segments.map((segment) =>
    createDraftStatement({
      text: segment,
      sourceText: segment,
      createdAt: timestamp,
    }),
  );
}

/**
 * Scinde manuellement une déclaration existante si elle contient plusieurs lignes ou phrases,
 * ou en deux parties par défaut autour du premier séparateur disponible.
 */
export function splitStatementContent(text: string): [string, string] | null {
  const trimmed = text.trim();
  if (trimmed.length < 3) {
    return null;
  }

  const segments = segmentFreeTextDeterministic(trimmed);
  if (segments.length >= 2 && segments[0]) {
    const firstPart = segments[0];
    const restPart = segments.slice(1).join(" ").trim();
    if (firstPart.length > 0 && restPart.length > 0) {
      return [firstPart, restPart];
    }
  }

  const semicolonIndex = trimmed.indexOf(";");
  if (semicolonIndex > 0 && semicolonIndex < trimmed.length - 1) {
    const first = trimmed.slice(0, semicolonIndex).trim();
    const second = trimmed.slice(semicolonIndex + 1).trim();
    if (first.length > 0 && second.length > 0) {
      return [first, second];
    }
  }

  const commaIndex = trimmed.indexOf(",");
  if (commaIndex > 0 && commaIndex < trimmed.length - 1) {
    const first = trimmed.slice(0, commaIndex).trim();
    const second = trimmed.slice(commaIndex + 1).trim();
    if (first.length > 0 && second.length > 0) {
      return [first, second];
    }
  }

  return null;
}
