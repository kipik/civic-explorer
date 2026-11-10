# Civic Explorer — Refonte éditoriale P1.1 : Référentiel des huit grands domaines (`referentiel-v1`)

**Statut :** **PROPOSITION ÉDITORIALE DE TRAVAIL — NON VALIDÉE POUR PRODUCTION**  
**Date :** 10 novembre 2026  
**Périmètre :** Conception d'un référentiel de 8 grands domaines de choix collectifs (Niveau 1 MaxDiff) et de son articulation avec l'exploration approfondie (Niveau 2), suite à la revue critique de la V0.3.  
**Documents V0.3 préservés intactement :** [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md), [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md), [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) et [`CIVIC_EXPLORER_REVIEW_P1_1_V0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/CIVIC_EXPLORER_REVIEW_P1_1_V0.3.md).

> **Avertissement de cadrage :** Aucun code applicatif n'a été modifié et la spécification fonctionnelle P1.1 n'a pas été réécrite à ce stade. Les formulations proposées ici sont des hypothèses de travail soumises à l'arbitrage du porteur de projet, à la revue pluraliste et au protocole de prétest cognitif qualitatif ([`L13_PROTOCOLE_PRETEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L13_PROTOCOLE_PRETEST_COGNITIF.md)).

---

## Sommaire des livrables

### Phase 1 — Cartographie, architectures candidates et référentiel initial (`L01`–`L09`)

| Livrable | Fichier | Objet |
|---|---|---|
| **L01** | [`L01_CARTOGRAPHIE_ENJEUX.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L01_CARTOGRAPHIE_ENJEUX.md) | Inventaire structuré et hiérarchisé de 68 sous-enjeux présidentiels (hors silos ministériels), reprise de la V0.3, angles morts et enjeux transversaux. |
| **L02** | [`L02_TROIS_ARCHITECTURES_CANDIDATES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L02_TROIS_ARCHITECTURES_CANDIDATES.md) | Construction et critique détaillée de **trois architectures conceptuellement distinctes** à `N = 8` domaines (logiques, avantages, inconvénients, chevauchements, angles morts, oppositions internes). |
| **L03** | [`L03_ANALYSE_COMPARATIVE.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L03_ANALYSE_COMPARATIVE.md) | Évaluation comparée des trois architectures sur les 8 critères imposés (sans score artificiel global) et recommandation argumentée de l'Architecture 1 avec arbitrages visibles. |
| **L04** | [`L04_REFERENTIEL_RECOMMANDE.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L04_REFERENTIEL_RECOMMANDE.md) | Fiches initiales des 8 domaines recommandés (`DOM-01` à `DOM-08`) : titres courts, formulations MaxDiff candidates, périmètres inclus/exclus, chevauchements, contradictions et pistes de Niveau 2. |
| **L05** | [`L05_MATRICE_COUVERTURE.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L05_MATRICE_COUVERTURE.md) | Matrice exhaustive de rattachement des 68 sous-enjeux (`DOM-01`..`DOM-08`), rattachements secondaires, cas limites, transversaux et masquages d'orientations. |
| **L06** | [`L06_ANALYSE_CONTRADICTIONS_INTERNES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L06_ANALYSE_CONTRADICTIONS_INTERNES.md) | Analyse de 28 couples d'orientations divergentes ou opposées au sein des 8 cartes (au moins 3 par domaine) et protocoles de désambiguïsation au Niveau 2. |
| **L07** | [`L07_ARCHITECTURE_NIVEAU_2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L07_ARCHITECTURE_NIVEAU_2.md) | Architecture progressive d'exploration approfondie préservant la séparation des 7 construits, sans score composite et sans exhaustivité imposée, avec déclinaison complète par domaine. |
| **L08** | [`L08_PROTOCOLE_TEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L08_PROTOCOLE_TEST_COGNITIF.md) | Première version du protocole qualitatif comparant **Variante A (Panorama préalable)** et **Variante B (Découverte progressive)** *(complétée et renforcée par `L13`)*. |
| **L09** | [`L09_SYNTHESE_DECISIONNELLE.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L09_SYNTHESE_DECISIONNELLE.md) | Synthèse des six arbitrages restant à trancher par le porteur du projet et vérification des critères d'acceptation de la phase 1. |

### Phase 2 — Consolidation éditoriale et préparation du prétest cognitif (`L10`–`L13`)

| Livrable | Fichier | Statut | Objet |
|---|---|---|---|
| **L10** | [`L10_ANALYSE_LARGEUR_DOMAINES_MAXDIFF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L10_ANALYSE_LARGEUR_DOMAINES_MAXDIFF.md) | **Analyse méthodologique — prête pour arbitrage** | Comparaison quantitative, sémantique et politique de la largeur des 8 domaines, effets plausibles sur MaxDiff et solutions sans dénaturer l'Architecture 1. |
| **L11** | [`L11_FORMULATIONS_CONSOLIDEES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L11_FORMULATIONS_CONSOLIDEES.md) | **Référentiel consolidé candidat au prétest** | Intitulés, descriptions courtes calibrées, périmètres, exclusions et 4 variantes ciblées réellement utiles (`1B`, `2B`, `7B`, `8B`). |
| **L12** | [`L12_ARBITRAGES_EDITORIAUX.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L12_ARBITRAGES_EDITORIAUX.md) | **Décisions instruites — validation humaine attendue** | Traitement complet des 6 décisions ouvertes (dont Architecture 1, laïcité `DOM-07`/`DOM-04`, périmètre initial Niveau 2, passage au prétest) séparant ce qui est tranché avant vs pendant le prétest. |
| **L13** | [`L13_PROTOCOLE_PRETEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L13_PROTOCOLE_PRETEST_COGNITIF.md) | **Protocole consolidé — recrutement bloqué** | Protocole renforcé inter-sujets (`12–16` participants, distinct de `P1.1 V0.3`), durée provisoire `45–60 min`, présentation systématique post-exercice des variantes `1B/2B/7B/8B` et grille alignée à 17 colonnes (`[OBS]`/`[INTERP]`). |

### Phase 3 — Kit opérationnel de prétest cognitif et verrouillage (`L14`–`L20`)

| Livrable | Fichier | Statut | Objet |
|---|---|---|---|
| **L14** | [`L14_KIT_CARTES_MAXDIFF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L14_KIT_CARTES_MAXDIFF.md) | **Kit prêt — validation pré-recrutement requise** | Huit cartes MaxDiff homogènes (`L11` § 2), périmètres résumés consultables, consignes de lecture et annexe isolée des 4 variantes lexicales (`1B`, `2B`, `7B`, `8B`) pour le débriefing uniquement. |
| **L15** | [`L15_SUPPORTS_PRESENTATION_VARIANTES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L15_SUPPORTS_PRESENTATION_VARIANTES.md) | **Supports A/B prêts — points d'assignation à confirmer** | Supports statiques comparables **Variante A (Panorama préalable)** et **Variante B (Découverte progressive)**, volet commun « Périmètre complet » et vérification du plan `N = 8, k = 4, r = 4` (`PILOT_DECISION.md`). |
| **L16** | [`L16_GUIDE_ENQUETEUR.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L16_GUIDE_ENQUETEUR.md) | **Guide aligné — en attente des validations et du dry run** | Guide pas-à-pas (A–F) utilisable sans participation au travail éditorial : scripts neutres, durée provisoire `45–60 min`, débriefing spontané (`DOM-01/02/06/07/08`), présentation systématique de `1B/2B/7B/8B` et clôture. |
| **L17** | [`L17_GRILLE_OBSERVATION_ENTRETIENS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L17_GRILLE_OBSERVATION_ENTRETIENS.md) | **Grille et tableur alignés** | Grille structurée séparant strictement observation (`[OBS]`) et interprétation (`[INTERP]`), exports CSV tableur (4 onglets dont modification compréhension/interprétation), synthèse par participant et synthèse transversale. |
| **L18** | [`L18_CONSENTEMENT_ET_ANONYMISATION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L18_CONSENTEMENT_ET_ANONYMISATION.md) | **Modèle prêt — champs à compléter avant recrutement** | Fiche d'information simple et formulaire de consentement avec tableau bloquant des informations à renseigner (responsable, base légale, anonymisation vs pseudonymisation, conservation, enregistrement). |
| **L19** | [`L19_MODELE_SYNTHESE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L19_MODELE_SYNTHESE_PRETEST.md) | **Modèle d'analyse post-entretiens prêt** | Cadre de rapport qualitatif pour 12–16 entretiens (comparaison A/B, 8 domaines, largeur, mono-composante, variantes lexicales, registre des problèmes et matrice de décision sans classement statistique artificiel). |
| **L20** | [`L20_VERROUILLAGE_PROTOCOLE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L20_VERROUILLAGE_PROTOCOLE_PRETEST.md) | **Verrouillage — prêt sous réserve de validations** | Audit des sources, articulation `L13` vs `P1.1 V0.3`, options d'assignation A/B, tableau des incohérences (`DOM-02`, `DOM-05`, libellés, durée, grille), checklist bloquante pré-recrutement et checklist de répétition à blanc. |
| **L21** | [`L21_CONDUCTEUR_DRY_RUN_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L21_CONDUCTEUR_DRY_RUN_PRETEST.md) | **Conducteur dry run — réalisable sous conditions** | Relevé de décision préparatoire (`DOM-02`, `DOM-05`), répartition A/B stratifiée (`n = 12–16`) et examen d'appariement, dispositif papier `2×2` hors `src/`, conducteur 10 séquences, grille de réussite à 9 critères et instances vérifiées `DR-INST-1`/`DR-INST-2`. |

---

## Rappel des invariants conservés

1. **Architecture à deux niveaux acquise :** MaxDiff (`N = 8, b = 8, k = 4, r = 4`) mesure uniquement la priorité relative entre huit grands domaines ; le Niveau 2 explore les enjeux précis indépendamment du MaxDiff.
2. **Séparation stricte des 7 construits (`P1_1_D1_DECISION_v0.3.md` § 4) :** priorité relative, préoccupation personnelle, gravité perçue, raisons/valeurs, convictions causales/factuelles (`user_stated_unverified`), solutions/instruments, faisabilité. Aucun score composite ni classement de candidats.
3. **Intégrité méthodologique et confidentialité :** signalements orthogonaux (`ItemComprehensionFlag`), aucune substitution automatique d'item en cours de MaxDiff, aucune injection des ajouts libres dans MaxDiff, données personnelles strictement en mémoire navigateur.
