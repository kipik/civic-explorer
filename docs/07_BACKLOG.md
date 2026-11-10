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

### P0.2 — Premier parcours fonctionnel : expression et clarification (4 écrans — livré)

- Écran 1 : accueil du parcours et expression libre sur la question « Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France ? », sans minimum de longueur ni nombre de sujets imposé, avec options « passer » et « je ne sais pas encore » ;
- Écran 2 : structuration locale déterministe sans IA ni appel réseau (`deterministic-split-v0.1`), modification manuelle, scission, réorganisation, objectif et conditions facultatifs, taxonomie provisoire illustrative avec option « je ne sais pas où classer » ;
- Écran 3 : confirmation explicite par déclaration (confirmation, modification du texte, précision de l'objectif, ajout/retrait de conditions, incertitude, suppression avec annulation) — aucun brouillon n'est attribué comme conviction sans confirmation ;
- Écran 4 : cartographie initiale des seules déclarations confirmées, groupées par thème explicitement sélectionné, avec retour et correction possibles à chaque étape et effacement complet de la session en mémoire.

**Acceptation :** tests unitaires métier, tests composants, tests E2E du parcours complet, test canari prouvant l'absence de stockage persistant et de transmission réseau, conformité WCAG 2.2 AA vérifiée. Ce lot a également absorbé l'accueil du parcours et l'expression libre initialement envisagés en `P1.1`–`P1.2`. La priorisation MaxDiff (`P1.1` consolidé), la synthèse transversale (`P1.4`) et l'export JSON (`P1.5`) relèvent des lots suivants.

## EPIC 1 — Parcours de priorisation, synthèse et export privacy-first

> **Table de correspondance des identifiants de lots :**  
> - Les anciens jalons `P1.1` (accueil) et `P1.2` (expression libre) du cadrage initial v0.1 ont été livrés dans **`P0.2`**.  
> - L'ancien lot `P1.3` (exercice MaxDiff de démonstration) a été consolidé et renommé **`P1.1`** conformément à [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) (succédant à [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md)), à [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) et à [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md).  
> - Les identifiants `P1.4` et `P1.5` sont conservés pour la synthèse unifiée transversale et l'export/effacement JSON.

### P1.1 — Priorisation MaxDiff pilote (`N = 8`), enjeux manquants et raisons facultatives

- **Statut actuel :** décision D1 V0.3 validée par le concepteur et spécification V0.3 consolidée ; brouillon de bibliothèque candidate rédigé dans [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) ; **aucun code applicatif commencé et prétest cognitif bloqué tant que le catalogue candidat V0.3 n'est pas arbitré humainement**.
- **Paliers de démarrage distincts (`P1_1_SPECIFICATION_v0.3.md` § 8.3) :**
  0. *Arbitrage éditorial humain du catalogue candidat V0.3* : validation des 8 enjeux descriptifs et des décisions éditoriales ouvertes (préalable obligatoire) ;
  1. *Prototype interne (local, hors accès public)* : autorisé après validation humaine de V0.3 et du jeu pilote de 8 enjeux issu du Palier 0 (`editorialStatus: "pilot_draft"`, balise `pilot-v0.3`) ;
  2. *Prétest cognitif (`8 à 12` personnes)* : **ne pas lancer avant validation humaine du catalogue candidat V0.3** ; étude formative qualitative comparant l'ordre principal V0.3 et l'expression libre préalable (non destinée à estimer statistiquement un effet causal de l'ordre) ;
  3. *Ouverture d'un pilote public* : strictement subordonnée à la revue éditoriale pluraliste (`08_GOVERNANCE_CONTENT.md`), à la validation cognitive des formulations et aux gates techniques/privacy/RGPD.
- **Périmètre retenu (`P1_1_SPECIFICATION_v0.3.md`) :**
  - Construit D1 V0.3 : priorité relative que l'utilisateur souhaite voir accorder aux différents enjeux collectifs dans les choix à venir ; unité homogène d'enjeu collectif formulé de façon descriptive (sans direction normative, solution, cause non établie ni modèle unique) ;
  - Ordre principal : `Présentation de la méthode → MaxDiff (N=8, b=8, k=4, r=4 ; référence exacte comparative N=7) → Recueil des enjeux manquants et expression libre séparée → Exploration facultative des raisons (0 à 2 enjeux) → Synthèse descriptive` ;
  - Bibliothèque éditoriale commune balisée `pilot-v0.3-draft` / `pilot_draft` ; aucune insertion automatique des ajouts libres dans MaxDiff (`D2`) ;
  - Randomisation contrôlée `randomize_pilot_n8_dihedral` ($\pi \in S_8 \times \tau \in S_4 \times D_8$) vérifiée `1000/1000` (graines distinctes) préservant `[1,1,1,1]`, `r=4`, cooccurrences, zéro doublon et chevauchement consécutif `= 1` (linéaire et cyclique `B8 → B1`) ;
  - États de réponse `answered | skipped | dont_know | no_distinguishable_best_worst` (+ sous-motifs `NoDistinguishableBestWorstReason`), **orthogonaux** à `flaggedItemIds` et `ItemComprehensionFlag` (`outside_collective_scope` distinct de l'absence de préoccupation personnelle, `loaded_wording`) ; aucune substitution automatique d'item ; conservation des statuts incomplets sans complétude artificielle ;
  - Restitution exclusivement descriptive (`totalPresentedCount`, `answeredExposures`, `bestCount`, `worstCount`, `neitherBestNorWorstCount`, signalements séparés `flaggedCount`), sans score `B - W`, utilité latente, pourcentage ni classement individuel.
- **Acceptation technique (`P1.1-impl`) :** tests unitaires des invariants combinatoires (dont `D8` linéaire et cyclique) et schémas Zod `.strict()`, tests composants clavier/mobile, E2E Playwright + `axe-core` WCAG 2.2 AA + test canari de non-fuite.

### P1.4 — Synthèse unifiée et édition transversale

- consolider la restitution multi-panneaux entre le socle d'expression libre (`P0.2`) et la priorisation (`P1.1`), sans fusionner les construits ;
- permettre correction, réouverture d'étape et suppression sur l'ensemble des panneaux ;
- conserver explicitement la distinction entre non répondu, passé (`skipped`), NSP (`dont_know`), `no_distinguishable_best_worst` (et motifs associés) et les signalements orthogonaux de formulation.

### P1.5 — Export et effacement

- export JSON explicite et validé (schéma versionné intégrant `statements` et `prioritization`) ;
- avertissement sur la sensibilité politique du fichier ;
- effacement complet de l'état mémoire (`P0.2` + `P1.1`) ;
- pas d'autosave local.

**Acceptation epic :** parcours E2E complet ; test canari de non-transmission ; export valide ; aucun stockage persistant ; accessibilité clavier WCAG 2.2 AA vérifiée.

## EPIC 2 — Qualité UX et méthode

- revue cognitive des libellés et analyse des résultats du prétest comparatif d'ordre (`P1.1`) ;
- comparaison expérimentale future éventuelle entre `k = 4` et `k = 5` enjeux par série ;
- scénarios d'arbitrage DCE simples et fictifs ;
- interactions « cela dépend », « rejeter les deux » (`reject_both`), « conditions » ;
- méthode de couverture de thèmes ;
- documentation des hypothèses et protocoles préenregistrés.

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

1. `P0.1` Bootstrap *(terminé)*.
2. `P0.2` Premier parcours fonctionnel d'expression et clarification *(terminé — couvre les anciens jalons `P1.1` accueil et `P1.2` expression libre)*.
3. Arbitrage humain du catalogue candidat [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) et validation de `P1.1` V0.3, puis prototype interne local (avec catalogue provisoire `pilot-v0.3` identifié comme tel) et prétest cognitif formatif qualitatif.
4. Revue éditoriale pluraliste et validation cognitive des formulations avant toute ouverture publique de `P1.1` (`N = 8`, `k = 4`, `r = 4` ; référence `N = 7`).
5. `P1.4` et `P1.5` (synthèse consolidée transversale, export JSON local et effacement).
6. Tests privacy et accessibilité (intégrés à chaque lot).
7. EPIC 2 (DCE, comparaison future éventuelle `k = 5`).
8. Taxonomie et processus éditorial pluraliste avant EPIC 3.

## Règle anti-scope-creep

Un agent ne doit pas implémenter plusieurs epics en une seule demande. Si un point révèle une décision manquante, créer une note `OPEN_QUESTION` plutôt que d'inventer une règle métier.
