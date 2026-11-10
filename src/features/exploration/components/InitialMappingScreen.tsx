"use client";

import { getProvisionalThemeById } from "@/data/demo/provisional-themes";
import { buildInitialThemeMapping } from "@/domain/statements/mapping";
import type { ExplorationStep, Statement } from "@/domain/statements/types";

interface InitialMappingScreenProps {
  statements: readonly Statement[];
  onGoToStep: (step: ExplorationStep, focusedStatementId?: string | null) => void;
}

interface MappedStatementCardProps {
  statement: Statement;
  currentThemeId?: string;
  onEdit: (statementId: string) => void;
}

function MappedStatementCard({ statement, currentThemeId, onEdit }: MappedStatementCardProps) {
  const otherThemeLabels = statement.themeIds
    .filter((id) => id !== currentThemeId)
    .map((id) => getProvisionalThemeById(id)?.label)
    .filter((label): label is string => Boolean(label));

  return (
    <li className="space-y-3 rounded-lg border border-stone-200 bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-base font-medium leading-relaxed text-stone-950">{statement.text}</p>
        <button
          type="button"
          onClick={() => onEdit(statement.id)}
          className="inline-flex min-h-[38px] shrink-0 items-center rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-900 hover:bg-stone-100"
        >
          Modifier cette déclaration
        </button>
      </div>

      {statement.objective.trim().length > 0 ? (
        <p className="text-sm text-stone-800">
          <span className="font-semibold text-stone-900">Objectif précisé : </span>
          {statement.objective}
        </p>
      ) : null}

      {statement.conditions.length > 0 ? (
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wide text-stone-700 uppercase">
            Conditions déclarées
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-stone-800">
            {statement.conditions.map((condition, index) => (
              <li key={`${statement.id}-map-cond-${index}`}>{condition}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {otherThemeLabels.length > 0 ? (
        <p className="text-xs text-stone-600">
          Également rattachée à : {otherThemeLabels.join(" · ")}
        </p>
      ) : null}
    </li>
  );
}

export function InitialMappingScreen({ statements, onGoToStep }: InitialMappingScreenProps) {
  const mapping = buildInitialThemeMapping(statements);
  const { counts } = mapping;

  function handleEditStatement(statementId: string) {
    onGoToStep("confirmation", statementId);
  }

  return (
    <section aria-labelledby="mapping-heading" className="space-y-6">
      <div className="space-y-3 rounded-lg border border-stone-200 bg-white p-5 shadow-xs sm:p-6">
        <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
          Étape 4 sur 4 — Cartographie initiale
        </p>
        <h1
          id="mapping-heading"
          className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
        >
          Votre cartographie initiale de convictions confirmées
        </h1>
        <p className="text-sm leading-relaxed text-stone-700">
          Cette vue présente uniquement les déclarations que vous avez explicitement confirmées,
          regroupées par thème lorsque vous en avez sélectionné un. Elle ne calcule aucun score,
          n&apos;établit aucun classement politique et ne formule aucune recommandation de vote ou
          de candidat.
        </p>

        <dl className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4">
          <div className="rounded-md border border-stone-200 bg-stone-50 p-3">
            <dt className="text-xs text-stone-700">Déclarations confirmées</dt>
            <dd className="mt-1 text-xl font-semibold text-stone-900">{counts.confirmedCount}</dd>
          </div>
          <div className="rounded-md border border-stone-200 bg-stone-50 p-3">
            <dt className="text-xs text-stone-700">Thèmes sélectionnés</dt>
            <dd className="mt-1 text-xl font-semibold text-stone-900">
              {counts.coveredThemeCount}
            </dd>
          </div>
          <div className="rounded-md border border-stone-200 bg-stone-50 p-3">
            <dt className="text-xs text-stone-700">Brouillons en attente</dt>
            <dd className="mt-1 text-xl font-semibold text-stone-900">{counts.draftCount}</dd>
          </div>
          <div className="rounded-md border border-stone-200 bg-stone-50 p-3">
            <dt className="text-xs text-stone-700">Éléments incertains</dt>
            <dd className="mt-1 text-xl font-semibold text-stone-900">{counts.uncertainCount}</dd>
          </div>
        </dl>
      </div>

      {counts.confirmedCount === 0 ? (
        <div className="space-y-4 rounded-lg border border-dashed border-stone-300 bg-white p-6">
          <h2 className="text-base font-semibold text-stone-900">
            Aucune déclaration confirmée pour le moment
          </h2>
          <p className="text-sm leading-relaxed text-stone-700">
            {counts.draftCount + counts.uncertainCount > 0
              ? `Vous avez ${counts.draftCount} brouillon(s) et ${counts.uncertainCount} élément(s) marqué(s) comme incertain(s). Par principe de fidélité, ils ne sont pas attribués ici tant que vous ne les confirmez pas.`
              : "Vous n'avez pas encore saisi ou confirmé de déclaration dans cette session. Vous pouvez revenir librement aux étapes précédentes."}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onGoToStep("confirmation")}
              className="inline-flex min-h-[44px] items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Revenir à la confirmation
            </button>
            <button
              type="button"
              onClick={() => onGoToStep("free_expression")}
              className="inline-flex min-h-[44px] items-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
            >
              Revenir à l&apos;expression libre
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {mapping.themedGroups.map((group) => (
            <section
              key={group.theme.id}
              aria-labelledby={`theme-group-${group.theme.id}`}
              className="space-y-3 rounded-lg border border-stone-200 bg-stone-50/70 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2
                  id={`theme-group-${group.theme.id}`}
                  className="text-lg font-semibold text-stone-900"
                >
                  {group.theme.label}
                </h2>
                <span className="inline-flex items-center rounded-full border border-stone-300 bg-white px-2.5 py-0.5 text-xs font-medium text-stone-800">
                  Thème sélectionné ({group.statements.length})
                </span>
              </div>
              <ul className="space-y-3">
                {group.statements.map((statement) => (
                  <MappedStatementCard
                    key={`${group.theme.id}-${statement.id}`}
                    statement={statement}
                    currentThemeId={group.theme.id}
                    onEdit={handleEditStatement}
                  />
                ))}
              </ul>
            </section>
          ))}

          {mapping.unselectedStatements.length > 0 ? (
            <section
              aria-labelledby="unselected-theme-heading"
              className="space-y-3 rounded-lg border border-stone-200 bg-stone-50/70 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 id="unselected-theme-heading" className="text-lg font-semibold text-stone-900">
                  Déclarations confirmées sans thème sélectionné
                </h2>
                <span className="inline-flex items-center rounded-full border border-stone-300 bg-white px-2.5 py-0.5 text-xs font-medium text-stone-800">
                  Sans thème ({mapping.unselectedStatements.length})
                </span>
              </div>
              <ul className="space-y-3">
                {mapping.unselectedStatements.map((statement) => (
                  <MappedStatementCard
                    key={`unselected-${statement.id}`}
                    statement={statement}
                    onEdit={handleEditStatement}
                  />
                ))}
              </ul>
            </section>
          ) : null}

          {mapping.dontKnowThemeStatements.length > 0 ? (
            <section
              aria-labelledby="dont-know-theme-heading"
              className="space-y-3 rounded-lg border border-stone-200 bg-stone-50/70 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 id="dont-know-theme-heading" className="text-lg font-semibold text-stone-900">
                  Déclarations confirmées — « Je ne sais pas où classer »
                </h2>
                <span className="inline-flex items-center rounded-full border border-stone-300 bg-white px-2.5 py-0.5 text-xs font-medium text-stone-800">
                  À classer ultérieurement ({mapping.dontKnowThemeStatements.length})
                </span>
              </div>
              <ul className="space-y-3">
                {mapping.dontKnowThemeStatements.map((statement) => (
                  <MappedStatementCard
                    key={`dont-know-${statement.id}`}
                    statement={statement}
                    onEdit={handleEditStatement}
                  />
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}

      {counts.draftCount + counts.uncertainCount > 0 && counts.confirmedCount > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-300 bg-stone-100 p-4 text-sm text-stone-900">
          <p>
            {counts.draftCount} brouillon(s) non confirmé(s) et {counts.uncertainCount} élément(s)
            incertain(s) ne figurent pas dans cette cartographie confirmée.
          </p>
          <button
            type="button"
            onClick={() => onGoToStep("confirmation")}
            className="inline-flex min-h-[40px] items-center rounded-md border border-stone-400 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-900 hover:bg-stone-50"
          >
            Revoir les éléments en attente
          </button>
        </div>
      ) : null}

      {mapping.unexploredThemes.length > 0 ? (
        <details className="rounded-lg border border-stone-200 bg-white p-4 text-sm">
          <summary className="cursor-pointer font-medium text-stone-900">
            Thèmes provisoires non abordés dans cette session ({mapping.unexploredThemes.length})
          </summary>
          <p className="mt-2 text-xs text-stone-700">
            L&apos;absence de déclaration sur un thème signifie uniquement qu&apos;il n&apos;a pas
            été sélectionné dans cette session, jamais qu&apos;il serait sans importance.
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {mapping.unexploredThemes.map((theme) => (
              <li
                key={theme.id}
                className="rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-medium text-stone-800"
              >
                {theme.label}
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <div className="rounded-lg border border-stone-200 bg-white p-4 text-xs leading-relaxed text-stone-700">
        <p className="font-semibold text-stone-900">Limites de cette cartographie initiale</p>
        <p className="mt-1">
          Ce récapitulatif reflète uniquement vos formulations à cet instant, dans la mémoire locale
          de cet onglet. Les thèmes proposés sont provisoires et indicatifs. Aucune mesure de
          priorité statistique ni aucun comparateur documentaire ne sont encore actifs dans le lot
          P0.2.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onGoToStep("confirmation")}
            className="inline-flex min-h-[44px] items-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
          >
            Revenir à la confirmation
          </button>
          <button
            type="button"
            onClick={() => onGoToStep("structuring")}
            className="inline-flex min-h-[44px] items-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
          >
            Revenir à la structuration
          </button>
          <button
            type="button"
            onClick={() => onGoToStep("free_expression")}
            className="inline-flex min-h-[44px] items-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
          >
            Revenir à l&apos;expression libre
          </button>
        </div>
      </div>
    </section>
  );
}
