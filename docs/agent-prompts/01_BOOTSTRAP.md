# Prompt agent — Bootstrap du dépôt

Tu travailles sur Civic Explorer. Commence par lire `AGENTS.md`, `README.md`, `docs/00_PRODUCT_BRIEF.md`, `docs/01_ARCHITECTURE.md`, `docs/02_PRIVACY_SECURITY.md` et `docs/adr/0001-stack.md`.

## Mission

Créer uniquement la fondation technique du dépôt (lot P0.1 du backlog). Ne développe pas encore le parcours utilisateur complet.

## Contraintes

- Next.js App Router, React, TypeScript strict, Node 24, pnpm, Tailwind CSS 4.
- Configurer ESLint, Prettier, Vitest, Testing Library et Playwright.
- Ajouter les scripts `dev`, `lint`, `typecheck`, `test`, `test:e2e`, `build`.
- Ajouter une page placeholder avec identité visuelle sobre et accessible.
- Ajouter `.nvmrc` ou équivalent Node 24, `.gitignore`, `.env.example` sans secret et une CI de base.
- Ne pas ajouter de base de données, d'authentification, d'analytics, de cookies, de route métier, de fournisseur IA ou de stockage persistant.
- Aucun texte personnel ne doit être demandé dans cette tranche.
- Choisir des versions stables compatibles au moment de l'installation et figer le lockfile. Signaler toute divergence avec le présent ADR.

## Procédure

1. Inspecte le dépôt et annonce brièvement le plan.
2. Vérifie les versions actuelles dans les documentations officielles si l'environnement le permet.
3. Implémente le bootstrap minimal.
4. Exécute toutes les commandes de vérification disponibles.
5. Inspecte le diff et les dépendances.
6. Mets à jour les commandes dans `AGENTS.md` si elles diffèrent.

## Livrable attendu

- liste des fichiers créés ;
- choix de versions ;
- commandes exécutées et résultats réels ;
- limites ou points bloquants ;
- aucune affirmation de test non exécuté.
