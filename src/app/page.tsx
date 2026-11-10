import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

const PRINCIPLES = [
  {
    title: "Clarifier sans prescrire",
    description:
      "L'outil aide chacun à formuler ses priorités, objectifs, conditions et incertitudes. Il ne recommande, ne classe et ne note aucun candidat ni parti.",
  },
  {
    title: "Distinguer les états de réponse",
    description:
      "Un brouillon non confirmé, une incertitude, une réponse conditionnelle ou un « je ne sais pas » restent distincts et ne sont jamais transformés en opinion figée.",
  },
  {
    title: "Confidentialité dès la conception",
    description:
      "Dans ce prototype, vos réponses restent exclusivement en mémoire dans votre navigateur : aucun compte, aucun cookie traceur, aucune transmission serveur et aucune IA externe.",
  },
] as const;

const JOURNEY_OVERVIEW = [
  {
    step: "1. Expression libre",
    detail: "Écrivez librement vos préoccupations sans contrainte de format ni de longueur.",
  },
  {
    step: "2. Structuration",
    detail:
      "Relisez un découpage local et déterministe, puis modifiez, scindez ou classez manuellement.",
  },
  {
    step: "3. Confirmation",
    detail:
      "Confirmez chaque déclaration, précisez vos objectifs ou ajoutez des conditions avant toute synthèse.",
  },
  {
    step: "4. Cartographie initiale",
    detail:
      "Consultez vos déclarations confirmées, classées par thème choisi, tout en gardant la main pour corriger.",
  },
] as const;

export default function HomePage() {
  return (
    <SiteShell badgeText="Prototype — Lot P0.2">
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        <section aria-labelledby="hero-heading" className="space-y-5">
          <p className="text-sm font-medium tracking-wide text-slate-700 uppercase">
            Parcours civique local et sans profilage
          </p>
          <h1
            id="hero-heading"
            className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
          >
            Un espace sobre pour clarifier vos convictions et priorités civiques
          </h1>
          <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
            Cet espace vous permet d&apos;exprimer librement ce qui vous préoccupe concernant
            l&apos;avenir de la France, de structurer vos idées à votre rythme et de confirmer une
            première cartographie personnelle. Vous pouvez passer une étape, nuancer ou interrompre
            à tout moment.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/parcours"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Commencer l&apos;exploration
            </Link>
            <span className="text-xs text-stone-700 sm:text-sm">
              Session en mémoire uniquement — aucune donnée envoyée au serveur.
            </span>
          </div>
        </section>

        <section aria-labelledby="journey-overview-heading" className="space-y-4">
          <h2 id="journey-overview-heading" className="text-xl font-semibold text-stone-900">
            Déroulement du parcours en 4 étapes
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {JOURNEY_OVERVIEW.map((item) => (
              <li
                key={item.step}
                className="rounded-lg border border-stone-200 bg-white p-4 shadow-xs"
              >
                <h3 className="text-sm font-semibold text-stone-900">{item.step}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-700">{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="commitments-heading" className="space-y-4">
          <h2 id="commitments-heading" className="text-xl font-semibold text-stone-900">
            Engagements du projet
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <li
                key={principle.title}
                className="rounded-lg border border-stone-200 bg-white p-5 shadow-xs"
              >
                <h3 className="text-base font-semibold text-stone-900">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="status-heading"
          className="rounded-lg border border-stone-300 bg-stone-100/80 p-5"
        >
          <h2 id="status-heading" className="text-base font-semibold text-stone-900">
            Périmètre du prototype P0.2
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">
            Parcours fonctionnel sans compte utilisateur, sans base de données, sans stockage
            persistant navigateur, sans cookies et sans appel à un modèle d&apos;intelligence
            artificielle. Les thèmes proposés à l&apos;étape de structuration sont provisoires et
            indicatifs.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
