const PRINCIPLES = [
  {
    title: "Clarifier sans prescrire",
    description:
      "L'outil vise à aider chacun à formuler ses priorités, conditions et incertitudes. Il ne recommande, ne classe et ne note aucun candidat ni parti.",
  },
  {
    title: "Distinguer les états de réponse",
    description:
      "Une abstention, un « je ne sais pas », une réponse conditionnelle et un rejet des options proposées resteront toujours des réponses à part entière.",
  },
  {
    title: "Confidentialité dès la conception",
    description:
      "Dans ce prototype, aucune donnée personnelle n'est collectée, stockée côté serveur ou transmise à des services tiers, de mesure d'audience ou d'IA.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-xs font-semibold tracking-wider text-white"
            >
              CE
            </span>
            <span className="text-base font-semibold tracking-tight text-stone-900">
              Civic Explorer
            </span>
          </div>
          <span className="inline-flex items-center rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-800">
            Socle technique — Lot P0.1
          </span>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <div className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
          <section aria-labelledby="hero-heading" className="space-y-4">
            <p className="text-sm font-medium tracking-wide text-slate-700 uppercase">
              Prototype en préparation
            </p>
            <h1
              id="hero-heading"
              className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
            >
              Un espace sobre pour explorer ses priorités civiques et consulter des sources
              publiques
            </h1>
            <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
              Cette page marque l&apos;installation du socle technique de Civic Explorer. Le
              parcours d&apos;exploration sera construit progressivement : aucune saisie personnelle
              n&apos;est demandée ni enregistrée à ce stade.
            </p>
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
              Périmètre actuel
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-700">
              Page d&apos;attente statique sans compte utilisateur, sans base de données, sans
              cookies non essentiels et sans appel à un modèle d&apos;intelligence artificielle.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-stone-700 sm:px-6">
          <p>
            Civic Explorer — Prototype d&apos;exploration civique. Outil d&apos;information et de
            clarification, sans conseil électoral.
          </p>
        </div>
      </footer>
    </>
  );
}
