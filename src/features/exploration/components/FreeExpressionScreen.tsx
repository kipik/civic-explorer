"use client";

import type { FormEvent } from "react";
import { MAX_FREE_TEXT_LENGTH } from "@/domain/statements/segmentFreeText";

interface FreeExpressionScreenProps {
  rawFreeText: string;
  error: string | null;
  pendingResegmentPrompt: boolean;
  existingStatementsCount: number;
  onChangeText: (text: string) => void;
  onContinue: () => void;
  onSkip: () => void;
  onMarkDontKnow: () => void;
  onResolveResegmentKeep: () => void;
  onResolveResegmentAppend: () => void;
  onResolveResegmentReplace: () => void;
}

export function FreeExpressionScreen({
  rawFreeText,
  error,
  pendingResegmentPrompt,
  existingStatementsCount,
  onChangeText,
  onContinue,
  onSkip,
  onMarkDontKnow,
  onResolveResegmentKeep,
  onResolveResegmentAppend,
  onResolveResegmentReplace,
}: FreeExpressionScreenProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onContinue();
  }

  return (
    <section aria-labelledby="free-expression-heading" className="space-y-6">
      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-xs sm:p-6">
        <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
          Étape 1 sur 4 — Expression libre
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          Cet espace vous invite à poser vos idées librement, avec vos propres mots. Il n&apos;y a
          ni bonne ni mauvaise réponse. Vos saisies restent uniquement dans la mémoire de cet onglet
          et ne sont envoyées à aucun serveur ni à aucune intelligence artificielle.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-lg border border-stone-200 bg-white p-5 shadow-xs sm:p-6"
      >
        <div className="space-y-2">
          <h1
            id="free-expression-heading"
            className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
          >
            <label htmlFor="free-expression-textarea" className="block cursor-pointer">
              Quelles sont les choses qui vous préoccupent le plus concernant l&apos;avenir de la
              France ?
            </label>
          </h1>
          <p id="free-expression-helper" className="text-sm leading-relaxed text-stone-700">
            Vous pouvez écrire un mot, une phrase, une liste à puces ou plusieurs paragraphes.
            Aucune longueur minimale ni aucun nombre de sujets ne sont imposés.
          </p>
        </div>

        <div className="space-y-2">
          <textarea
            id="free-expression-textarea"
            name="freeExpression"
            rows={7}
            maxLength={MAX_FREE_TEXT_LENGTH}
            value={rawFreeText}
            onChange={(event) => onChangeText(event.target.value)}
            aria-describedby={
              error
                ? "free-expression-helper free-expression-limit free-expression-error"
                : "free-expression-helper free-expression-limit"
            }
            aria-invalid={Boolean(error)}
            placeholder="Exemple : L'accès aux soins près de chez moi, le coût du logement et la qualité des transports du quotidien."
            className="w-full rounded-md border border-stone-300 bg-white p-3.5 text-base leading-relaxed text-stone-900 placeholder:text-stone-500"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
            <span id="free-expression-limit">
              {rawFreeText.length.toLocaleString("fr-FR")} /{" "}
              {MAX_FREE_TEXT_LENGTH.toLocaleString("fr-FR")} caractères maximum
            </span>
            <span>Aucun envoi réseau · Aucune sauvegarde automatique</span>
          </div>
        </div>

        {error ? (
          <div
            id="free-expression-error"
            role="alert"
            className="rounded-md border border-red-300 bg-red-50 p-3.5 text-sm font-medium text-red-900"
          >
            {error}
          </div>
        ) : null}

        {pendingResegmentPrompt ? (
          <div
            role="region"
            aria-labelledby="resegment-heading"
            className="space-y-3 rounded-md border border-slate-300 bg-stone-50 p-4"
          >
            <h2 id="resegment-heading" className="text-sm font-semibold text-stone-900">
              Texte modifié — comment mettre à jour vos {existingStatementsCount} déclaration(s) ?
            </h2>
            <p className="text-sm text-stone-700">
              Vous avez modifié votre texte libre après avoir déjà commencé à structurer des
              déclarations. Choisissez comment poursuivre sans perdre vos ajustements :
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onResolveResegmentKeep}
                className="inline-flex min-h-[44px] items-center rounded-md border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Conserver mes déclarations actuelles
              </button>
              <button
                type="button"
                onClick={onResolveResegmentAppend}
                className="inline-flex min-h-[44px] items-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
              >
                Ajouter les nouveaux éléments
              </button>
              <button
                type="button"
                onClick={onResolveResegmentReplace}
                className="inline-flex min-h-[44px] items-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
              >
                Remplacer par un nouveau découpage
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-stone-200 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <button
            type="submit"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Continuer vers la structuration
          </button>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onSkip}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100"
            >
              Passer à la saisie structurée
            </button>
            <button
              type="button"
              onClick={onMarkDontKnow}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100"
            >
              Je ne sais pas encore comment formuler
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
