# 07 — Backlog et séquencement

> Travailler un lot à la fois. Un lot est terminé uniquement lorsque ses critères d'acceptation et ses tests sont satisfaits.

## EPIC 0 — Fondation du dépôt

### P0.1 — Bootstrap

- créer Next.js App Router avec TypeScript strict ;
- Node 24, pnpm et lockfile ;
- Tailwind 4 ;
- ESLint, Prettier, Vitest, Testing Library, Playwright ;
- scripts `dev`, `lint`, `typecheck`, `test`, `test:e2e`, `build` ;
- CI minimale ;
- page placeholder ;
- `.env.example` sans secret ;
- vérifier la version Node dans CI et localement.

**Acceptation :** installation propre documentée ; CI passe ; build propre ; aucune DB, API métier ou intégration IA ajoutée.

### P0.2 — Premier parcours fonctionnel : expression et clarification (4 écrans)

- Écran 1 : accueil du parcours et expression libre sur la question « Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France ? », sans minimum de longueur ni nombre de sujets imposé, avec options « passer » et « je ne sais pas encore » ;
- Écran 2 : structuration locale déterministe sans IA ni appel réseau (`deterministic-split-v0.1`), modification manuelle, scission, réorganisation, objectif et conditions facultatifs, taxonomie provisoire illustrative avec option « je ne sais pas où classer » ;
- Écran 3 : confirmation explicite par déclaration (confirmation, modification du texte, précision de l'objectif, ajout/retrait de conditions, incertitude, suppression avec annulation) — aucun brouillon n'est attribué comme conviction sans confirmation ;
- Écran 4 : cartographie initiale des seules déclarations confirmées, groupées par thème explicitement sélectionné, avec retour et correction possibles à chaque étape et effacement complet de la session en mémoire.

**Acceptation :** tests unitaires métier, tests composants, tests E2E du parcours complet, test canari prouvant l'absence de stockage persistant et de transmission réseau, conformité WCAG 2.2 AA vérifiée. Les exercices MaxDiff (`P1.3`) et l'export JSON (`P1.5`) restent reportés aux lots suivants.

## EPIC 1 — Première tranche verticale privacy-first

### P1.1 — Accueil et explication

- mission et limites ;
- mention claire « prototype : réponses dans cet onglet, pas envoyées au serveur » ;
- lien méthodologie ;
- entrée dans une session.

### P1.2 — Expression libre

- saisie de préoccupations ;
- ajout/suppression de plusieurs éléments ;
- limite de taille raisonnable ;
- état en mémoire uniquement ;
- validation sans transmission.

### P1.3 — Exercice MaxDiff de démonstration

- jeu d'exemple balisé `demo` ;
- 4 à 6 éléments ;
- choix meilleur / moins important ;
- aucune option de score ou de candidat ;
- passer / NSP ;
- ordre stable au début ; randomisation à étudier plus tard.

### P1.4 — Synthèse et correction

- restituer le texte original et les choix réellement effectués ;
- permettre correction et suppression ;
- différencier non répondu, passé et NSP.

### P1.5 — Export et effacement

- export JSON explicite et validé ;
- avertissement sur la sensibilité du fichier ;
- effacement de l'état mémoire ;
- pas d'autosave local.

**Acceptation epic :** parcours E2E complet ; test canari de non-transmission ; export valide ; aucun stockage persistant ; accessibilité clavier acceptable.

## EPIC 2 — Qualité UX et méthode

- revue cognitive des libellés ;
- scénarios d'arbitrage simples et fictifs ;
- interactions « cela dépend », « rejeter les deux », « conditions » ;
- méthode de couverture de thèmes ;
- documentation des hypothèses ;
- tests de compréhension.

## EPIC 3 — Référentiel documentaire public

- taxonomie validée ;
- modèle Actor / Claim / Position / Source ;
- fiches manuelles versionnées en premier ;
- affichage de la source, date, nature de preuve et limites ;
- statut non documenté distinct de neutre ;
- validation humaine.

**Ne pas commencer cette epic avant validation de la taxonomie et du processus éditorial.**

## EPIC 4 — Back-office éditorial

- Postgres 18 ;
- Drizzle migrations ;
- authentification et rôles éditoriaux ;
- validation à deux niveaux si nécessaire ;
- audit log ;
- gestion des versions ;
- protections d'administration ;
- pas de profils politiques utilisateurs.

## EPIC 5 — IA assistée, sous conditions

- ADR de confidentialité et analyse juridique ;
- fournisseur ou modèle auto-hébergé évalué ;
- feature flag OFF par défaut ;
- consentement explicite sur texte exact ;
- schéma de sortie validé ;
- aucune conservation fournisseur non vérifiée ;
- mode sans IA conservé ;
- tests prompt injection / fuite / hallucination.

## Ordre de priorité recommandé

1. P0.1 Bootstrap.
2. P1.1 à P1.5, dans cet ordre ou en petites tranches verticales.
3. Tests privacy et accessibilité.
4. Entretiens cognitifs.
5. EPIC 2.
6. Taxonomie et processus éditorial avant EPIC 3.

## Règle anti-scope-creep

Un agent ne doit pas implémenter plusieurs epics en une seule demande. Si un point révèle une décision manquante, créer une note `OPEN_QUESTION` plutôt que d'inventer une règle métier.
