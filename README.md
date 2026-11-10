# Civic Explorer — kit de démarrage

> **Projet de travail** : explorateur de convictions et comparateur documentaire pour le débat public français.  
> **Version documentaire** : 0.1 — 10 novembre 2026.  
> **Statut** : documents de cadrage destinés à guider Antigravity, OpenCode et les développeurs humains.

## Commencer ici

1. Lire `AGENTS.md` : règles permanentes pour les agents de code.
2. Lire `docs/00_PRODUCT_BRIEF.md` : ce que le produit doit et ne doit pas faire.
3. Lire `docs/01_ARCHITECTURE.md` et `docs/adr/0001-stack.md` : architecture et stack.
4. Lire `docs/02_PRIVACY_SECURITY.md` avant toute collecte, API, télémétrie ou intégration IA.
5. Lire `docs/04_METHODS.md` avant de coder une mesure de préférence.
6. Suivre `docs/07_BACKLOG.md` et commencer exclusivement par la première tranche verticale.
7. Utiliser `docs/agent-prompts/01_BOOTSTRAP.md` comme premier prompt d'agent.

## Structure des documents

| Fichier | Fonction |
|---|---|
| `AGENTS.md` | Instructions communes à OpenCode et Antigravity |
| `docs/00_PRODUCT_BRIEF.md` | Vision, public, périmètre, non-objectifs |
| `docs/01_ARCHITECTURE.md` | Architecture logicielle et frontières de confiance |
| `docs/02_PRIVACY_SECURITY.md` | Confidentialité, sécurité, RGPD, intégrations IA |
| `docs/03_DATA_MODEL.md` | Modèle de données et contrats JSON |
| `docs/04_METHODS.md` | Méthodes de mesure, limites et exigences de validation |
| `docs/05_UX_INTERACTIONS.md` | Parcours, interactions et microcopies |
| `docs/06_TESTING_VALIDATION.md` | Stratégie de tests logiciels et scientifiques |
| `docs/07_BACKLOG.md` | Roadmap découpée en lots vérifiables |
| `docs/08_GOVERNANCE_CONTENT.md` | Sources, validation éditoriale, pluralisme |
| `docs/09_DEPLOYMENT_OPERATIONS.md` | Déploiement, exploitation et observabilité minimale |
| `docs/adr/0001-stack.md` | Décision technique initiale |
| `docs/agent-prompts/*` | Prompts de travail prêts à copier dans un agent |
| `docs/REFERENCES.md` | Références officielles et veille technique |

## Principes non négociables

- Pas de score global de compatibilité avec un candidat, de palmarès ou de candidat recommandé.
- Pas d'inférence d'opinion politique à partir de l'âge, du lieu, du genre, de l'origine, de la navigation ou d'autres caractéristiques personnelles.
- Les réponses personnelles ne quittent pas le navigateur dans le MVP.
- Pas de télémétrie tierce, d'analytics comportemental, de publicité ni de pixels de suivi dans le MVP.
- Pas d'appel à un LLM externe dans le MVP.
- Les positions politiques publiques sont sourcées, datées, historisées et validées humainement avant publication.
- Une réponse vide, NSP, « je passe », « cela dépend » et une position neutre sont des états différents.
- L'IA peut proposer une structuration ; l'utilisateur reste seul arbitre de la description de ses convictions.
- Aucun agent ne doit inventer une source, une position politique, une mesure ou un résultat de test.

## Périmètre de la première tranche

La première tranche est un prototype local, sans compte, sans API métier, sans base de données et sans IA :

1. page d'accueil sobre qui explique la démarche ;
2. interaction d'expression libre sur les préoccupations ;
3. exercice MaxDiff illustratif sur des éléments de démonstration ;
4. récapitulatif modifiable ;
5. export JSON déclenché volontairement par l'utilisateur ;
6. effacement de la session en mémoire.

Les contenus d'exemple doivent être fictifs ou clairement identifiés comme exemples méthodologiques. Aucun candidat réel n'est nécessaire à cette étape.

## Comment utiliser ce pack

Extraire l'archive dans un nouveau dépôt Git, puis ouvrir le dossier dans Antigravity ou OpenCode. Demander à l'agent de lire `AGENTS.md` et les documents cités avant toute modification. Un seul lot doit être implémenté à la fois. Chaque lot doit se terminer par les vérifications indiquées dans le backlog et un résumé des fichiers modifiés, tests exécutés et limites restantes.

## Installation et vérification locale (lot P0.1)

Prérequis : Node.js 24 LTS (voir `.nvmrc`) et `pnpm` 10.7.0 (`packageManager` dans `package.json`).

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Copier `.env.example` vers `.env.local` si besoin ; aucun secret n'est requis pour le socle MVP.
