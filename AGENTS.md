# Instructions projet — Civic Explorer

Ces règles s'appliquent à tout agent de code (OpenCode, Antigravity ou autre) et à tout contributeur.

## Avant de modifier le code

1. Lire `README.md` et les documents pertinents de `docs/`.
2. Inspecter l'état réel du dépôt avant de proposer une architecture ou d'ajouter une dépendance.
3. Présenter un plan court pour toute tâche touchant plusieurs fichiers ou une frontière de sécurité.
4. Travailler sur le lot demandé uniquement. Ne pas anticiper toute la roadmap.
5. Si une exigence est ambiguë, choisir l'option la plus réversible et la plus respectueuse de la vie privée ; noter l'hypothèse dans le résultat.

## Invariants produit et politiques

- Le produit informe et aide à clarifier les préférences ; il ne recommande, ne classe, ne note et ne prédit aucun candidat ou parti.
- Ne jamais créer de score de « proximité », de « compatibilité », de « meilleur choix » ni un substitut déguisé (badge, ordre, couleur, catégorie ou classement).
- Ne jamais inférer les opinions politiques d'une personne à partir de données personnelles ou comportementales.
- Ne pas mélanger faits, déclarations attribuées, hypothèses, interprétations et réponses de l'utilisateur.
- Toute position politique publique doit posséder une source identifiable et une date ; dans le back-office futur, elle doit être validée humainement.
- NSP, abstention, incertitude, neutralité déclarée, réponse conditionnelle et rejet des deux options sont des états distincts.

## Confidentialité — règles bloquantes

- MVP : aucune réponse personnelle ne doit être envoyée au serveur, à une API, à un service d'analytics ou à un fournisseur d'IA.
- Ne jamais stocker les réponses dans une base serveur, des cookies, des paramètres d'URL, des logs, des traces, des outils de replay ou des rapports d'erreur.
- Ne pas ajouter de télémétrie, de pixels, de polices distantes, de widgets tiers ni de scripts tiers sans décision documentée.
- Les données de session restent en mémoire navigateur. L'export de fichier est déclenché explicitement par l'utilisateur.
- Ne pas ajouter d'autosave IndexedDB/localStorage : cela nécessite une décision distincte et une information spécifique.
- Aucun SDK LLM dans le bundle navigateur. Aucun appel LLM externe dans le MVP.
- Si une tâche semble nécessiter une transmission de texte personnel, s'arrêter et proposer une conception qui garde le contenu local. Ne pas contourner cette règle.
- Ne jamais journaliser les corps de requêtes ou les contenus saisis.

## Architecture et qualité

- Monolithe Next.js App Router ; pas de microservices, event bus, Redis, vector database ou framework agentique dans le MVP.
- TypeScript strict ; `any` interdit sauf justification locale commentée.
- Validation runtime de toute donnée externe avec Zod (ou schéma équivalent approuvé).
- Logique métier pure dans `src/domain/` ou `src/features/**/domain/`, sans dépendance React/Next.js.
- Composants UI sans logique statistique ; logique de méthode isolée, testée et versionnée.
- Pas de calcul important caché dans un composant ou une route.
- Ne pas introduire une dépendance pour quelques lignes de code sans expliquer le bénéfice.
- Utiliser le gestionnaire de paquets et le lockfile déjà présents ; ne jamais mélanger npm, pnpm, yarn et bun.
- Ne jamais modifier manuellement un fichier généré ou un lockfile sans passer par l'outil approprié.

## Sécurité web

- Toute donnée non fiable est validée à la frontière.
- Pas de rendu HTML brut de contenu utilisateur ; éviter `dangerouslySetInnerHTML`.
- Pas de secrets `NEXT_PUBLIC_*`.
- Pas de Server Action ou Route Handler recevant des réponses personnelles dans le MVP.
- Toute future route d'administration doit vérifier authentification et autorisation côté serveur, limiter le débit et valider les entrées.
- Appliquer une politique CSP restrictive, des en-têtes de sécurité et une protection contre les abus avant la mise en production.
- Dépendances nouvelles : vérifier maintenance, licence, vulnérabilités, transitive dependencies et nécessité.

## Accessibilité et UX

- Cible WCAG 2.2 AA.
- Navigation clavier complète, focus visible, libellés explicites, erreurs compréhensibles.
- Ne pas coder uniquement par couleur.
- Chaque interaction offre une façon de passer, de répondre « je ne sais pas » ou de rejeter les alternatives lorsque cela est pertinent.
- Ne jamais forcer une réponse ni empêcher la correction d'une réponse précédente.
- Éviter la surcharge cognitive et les longues séries de questions.

## Méthodes et données

- Aucun score global de préférence politique.
- Ne pas utiliser une mesure MaxDiff sur quelques choix pour prétendre connaître une préférence latente fiable.
- Ne pas implémenter IRT avant validation des dimensions, des items et de la calibration.
- Les paramètres méthodologiques ont une version explicite et des tests.
- Chaque sortie statistique doit pouvoir être expliquée, reproduite et accompagnée de ses limites.
- Les exemples sont explicitement marqués `demo` ou `illustrative`.

## Workflow de développement obligatoire

Pour chaque tâche :

1. Lire les docs ; énoncer les hypothèses et fichiers concernés.
2. Implémenter une tranche cohérente, la plus petite possible.
3. Ajouter/mettre à jour les tests unitaires et d'intégration.
4. Exécuter `pnpm lint`, `pnpm typecheck`, `pnpm test` et `pnpm build` quand les scripts existent. Pour l'UI, exécuter les tests Playwright concernés.
5. Examiner le diff pour les secrets, les logs, les appels réseau, les données personnelles et les dépendances.
6. Résumer : comportement réalisé, fichiers changés, commandes/tests et résultats, limites restantes.
7. Ne jamais prétendre qu'un test a été exécuté si ce n'est pas le cas.

## Git

- Commits petits et explicites ; une intention par commit.
- Ne pas réécrire l'historique ou supprimer des changements utilisateur sans autorisation.
- Ne pas committer `.env`, données utilisateurs, exports de sessions, secrets, captures avec données personnelles ou fichiers temporaires.

## Commandes

Commandes configurées au bootstrap (Node.js 24 LTS via `.nvmrc`, `pnpm` 10.7.0) :

- `pnpm dev` : serveur de développement Next.js
- `pnpm lint` : vérification ESLint (`eslint .`)
- `pnpm format:check` / `pnpm format` : vérification / mise en forme Prettier
- `pnpm typecheck` : génération des types Next.js et vérification TypeScript (`next typegen && tsc --noEmit`)
- `pnpm test` / `pnpm test:watch` : tests unitaires et composants Vitest
- `pnpm test:e2e` : tests end-to-end Playwright (Chromium)
- `pnpm build` : build de production Next.js
- `pnpm start` : serveur Next.js sur le build de production

Si une commande n'existe pas, le signaler et ne pas inventer son résultat.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
