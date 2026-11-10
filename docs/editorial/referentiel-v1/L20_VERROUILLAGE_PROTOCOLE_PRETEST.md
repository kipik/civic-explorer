# L20 — Verrouillage du protocole de prétest cognitif éditorial (`L13`)

**Statut global :** **`PRÊT SOUS RÉSERVE DE VALIDATIONS`** *(prêt pour préparation de la répétition interne à blanc dès choix du support matériel ; **NON PRÊT / BLOQUÉ pour tout recrutement ou entretien réel** tant que les validations humaines et la checklist bloquante § 6 ne sont pas levées).*  
**Date :** 10 novembre 2026  
**Périmètre audité :** [`L01`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L01_CARTOGRAPHIE_ENJEUX.md)–[`L19`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L19_MODELE_SYNTHESE_PRETEST.md), [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md), [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py), [`designs_N6_to_N13.json`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.json), [`designs_N6_to_N13.csv`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.csv), [`METRICS_REPORT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/METRICS_REPORT.md), [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md), [`02_PRIVACY_SECURITY.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/02_PRIVACY_SECURITY.md), [`04_METHODS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/04_METHODS.md), [`05_UX_INTERACTIONS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/05_UX_INTERACTIONS.md), [`07_BACKLOG.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/07_BACKLOG.md) et état de `src/`.

> **Conventions épistémiques utilisées dans ce document :**
> - **`[FAIT VÉRIFIÉ]`** : élément directement constaté dans un fichier, un script ou une donnée du dépôt.
> - **`[DÉCISION ACTÉE]`** : choix méthodologique ou de cadrage arrêté pour le protocole de prétest.
> - **`[PROPOSITION À VALIDER]`** : recommandation instruite nécessitant un arbitrage humain explicite avant exécution.
> - **`[INFORMATION MANQUANTE]`** : donnée absente des sources qui ne doit jamais être inventée et bloque la passation réelle tant qu'elle n'est pas fournie.

---

## 1. Audit des sources et articulation explicite entre le prétest `L13` et le pilote `P1.1 V0.3`

### 1.1 Audit factuel de l'état du dépôt `[FAIT VÉRIFIÉ]`

- **`src/` et `tests/` :** l'application actuelle implémente exclusivement le socle `P0.2` (expression libre, structuration déterministe, confirmation et cartographie sur 10 thèmes provisoires dans [`provisional-themes.ts`](file:///c:/Users/kipik/Dev/civic-explorer/src/data/demo/provisional-themes.ts)). Il n'existe **aucun module MaxDiff, aucun générateur de blocs `P1.1` et aucune interface `P1.1`** dans `src/`.
- **Conception mathématique MaxDiff (`docs/experiments/maxdiff/`) :**
  - [`designs_N6_to_N13.json`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.json) et [`designs_N6_to_N13.csv`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.csv) définissent la séquence canonique `N = 8, b = 8, k = 4, r = 4` (`B1..B8`, `Meilleur plan cyclique exhaustif`).
  - [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py) implémente la fonction `randomize_pilot_n8_dihedral(base_blocks, rng)` ($\pi \in S_8 \times \tau \in S_4 \times D_8$), vérifiée sur 1 000 graines (`SEED_BASE + 8_000_000 + t_idx`, avec `SEED_BASE = 20261110`), ainsi que `randomize_design_controlled` (qui ne préserve pas le chevauchement consécutif `= 1`) et `randomize_design_naive`.
  - En revanche, **aucun script ni fichier JSON du dépôt ne contient** : (a) une table d'assignation pour 12 à 16 participants en A/B, (b) une règle d'appariement inter-bras des séquences MaxDiff, (c) un générateur d'ordre pour le Panorama A ou le volet d'aide B, ni (d) de graines pré-allouées pour des entretiens hors ligne.
- **Spécification produit (`P1_1_SPECIFICATION_v0.3.md`) :** reste intacte et décrit le futur module applicatif `P1.1` ainsi qu'un protocole de prétest distinct portant notamment sur l'ordre du parcours (`8 à 12` participants, § 5.3).

### 1.2 Distinction formelle des deux expérimentations `[DÉCISION ACTÉE]`

Le dossier comporte **deux protocoles distincts qui ne doivent pas être confondus** :

| Critère | Expérimentation A — **Prétest cognitif éditorial (`L13`)** | Expérimentation B — **Pilote méthodologique (`P1.1 V0.3`)** |
|---|---|---|
| **Documents sources** | [`L08`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L08_PROTOCOLE_TEST_COGNITIF.md), [`L10`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L10_ANALYSE_LARGEUR_DOMAINES_MAXDIFF.md)–[`L19`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L19_MODELE_SYNTHESE_PRETEST.md) | [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) (§ 5.3), [`04_METHODS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/04_METHODS.md), [`05_UX_INTERACTIONS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/05_UX_INTERACTIONS.md) |
| **Effectif indicatif** | **12 à 16 participants** (`6–8` par variante) | `8 à 12` participants (dans la spec V0.3) |
| **Variable comparée** | **Modalité de présentation des 8 domaines :** **Variante A** (panorama préalable avant MaxDiff) vs **Variante B** (découverte progressive au fil des séries MaxDiff avec accès au périmètre complet) | **Ordre du parcours applicatif :** MaxDiff avant expression libre (bras principal V0.3) vs expression libre `P0.2` avant MaxDiff (bras comparatif) |
| **Objectif principal** | Observer la compréhension des 8 formulations (`L11`), l'interprétation des périmètres, les confusions inter-domaines, les effets de largeur, les sélections mono-composantes et les réactions aux variantes `1B/2B/7B/8B` | Qualifier qualitativement l'ordre du parcours P1.1, l'ergonomie des états de réponse, les libellés d'interface P1.1 et le signalement orthogonal avant ouverture publique |
| **Règle d'articulation** | **Précède le pilote méthodologique `P1.1 V0.3`** pour stabiliser le référentiel des 8 domaines et le mode de présentation initial | **Reste distinct et inchangé :** le prétest `L13` **ne remplace pas** le protocole `P1.1 V0.3`, qui n'est ni modifié ni exécuté dans cette mission |

---

## 2. Décisions méthodologiques confirmées vs éléments ouverts

| Élément méthodologique | Statut épistémique | Contenu exact |
|---|---|---|
| **Séparation `L13` vs `P1.1 V0.3`** | **`[DÉCISION ACTÉE]`** | `L13` précède `P1.1 V0.3`, sans le remplacer ni modifier `P1_1_SPECIFICATION_v0.3.md`. |
| **Architecture éditoriale testée** | **`[DÉCISION ACTÉE]`** *(provisoire pour prétest)* | Architecture 1 à `N = 8` domaines (`DOM-01` à `DOM-08`, [`L03`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L03_ANALYSE_COMPARATIVE.md), [`L12`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L12_ARBITRAGES_EDITORIAUX.md) Option 1A). |
| **Plan combinatoire et randomisation bloc** | **`[FAIT VÉRIFIÉ]`** + **`[DÉCISION ACTÉE]`** | `N = 8, b = 8, k = 4, r = 4`, blocs canoniques `B1..B8` et règle `randomize_pilot_n8_dihedral` ($\pi \in S_8 \times \tau \in S_4 \times D_8$, [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md)). |
| **Règle d'usage des variantes lexicales `1B`, `2B`, `7B`, `8B`** | **`[DÉCISION ACTÉE]`** | 1. Recueillir d'abord le retour spontané ; 2. Présenter ensuite **systématiquement** les 4 variantes (`L13`, `L16`, `L17` alignés) ; 3. Demander si elles modifient la compréhension ou l'interprétation. **Jamais montrées pendant les séries MaxDiff.** |
| **Durée provisoire de l'entretien** | **`[DÉCISION ACTÉE]`** *(provisoire)* | **`45 à 60 minutes`** (`L13` et `L16` alignés), à confirmer impérativement par la répétition intégrale à blanc (§ 7). |
| **Grille d'observation unifiée `L13` / `L17`** | **`[DÉCISION ACTÉE]`** | 17 champs harmonisés dans `L13` § 3.1 et `L17`, avec séparation stricte `[OBS]` / `[INTERP]` et conservation intégrale des verbatims. |
| **Libellés des choix du prétest (`L15`)** | **`[DÉCISION ACTÉE]`** *(propre au prétest)* | `« Devrait recevoir le plus d'attention »` / `« Pourrait attendre »` et `« Impossible de départager cette série »` retenus pour `L13`/`L15` **sans modifier ni figer** les libellés de `P1_1_SPECIFICATION_v0.3.md`. |
| **Arbitrage `DOM-02` et `DOM-05` (`L11` § 1 vs § 2)** | **`[PROPOSITION À VALIDER]`** | Recommandation en faveur de `L11` § 2 (§ 4), soumise à validation humaine avant figement final de `L11`, `L14`, `L15`. |
| **Règles opérationnelles d'affectation A/B, d'appariement des blocs, d'ordre en B et de disposition** | **`[PROPOSITION À VALIDER]`** / **`[INFORMATION MANQUANTE]`** | Non définies dans `audit_maxdiff_designs.py` ni `PILOT_DECISION.md` ; options documentées en § 3 pour validation humaine. |
| **Dossier RGPD, consentement, stockage et enregistrement (`L18`)** | **`[INFORMATION MANQUANTE]`** *(bloquant)* | Aucune donnée administrative/juridique non fournie n'est inventée ; checklist bloquante complète en § 6. |

---

## 3. Règles de comparaison A/B : état vérifié dans le dépôt et options à arbitrer

### 3.1 Invariants stricts déjà garantis entre Variante A et Variante B `[DÉCISION ACTÉE]`

Les deux groupes conservent **strictement à l'identique** ([`L15`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L15_SUPPORTS_PRESENTATION_VARIANTES.md) § 1) :
1. les **mêmes huit formulations** (`L11` § 2 une fois arbitrées pour `DOM-02` et `DOM-05`, sans aucune variante `1B/2B/7B/8B`) ;
2. les **mêmes tâches MaxDiff** (`b = 8` séries de `k = 4` cartes, `r = 4` apparitions/domaine, mêmes 4 états de réponse et signalement orthogonal sans substitution) ;
3. les **mêmes ensembles de cartes** et **mêmes périmètres résumés consultables** ;
4. les **mêmes consignes de choix** (formule D1 V0.3, sens relatif de *« Pourrait attendre »*, cadrage sur les domaines composites).

Seule la **modalité de présentation et de découverte initiale des domaines** diffère entre A et B.

### 3.2 Rôle, accessibilité et moment de consultation du panneau d'aide en Variante B `[DÉCISION ACTÉE]`

- **Rôle :** mettre à disposition du participant B **exactement la même information** (intitulé, description courte, *ce que le domaine couvre* et *ce qui relève d'autres domaines*, sans codes techniques `DOM-XX` ni `E01..E68`) que celle disponible en Variante A, afin qu'un éventuel besoin de vérification de frontière soit satisfait sans biais d'information.
- **Accessibilité :** le bouton ou livret discret **`[Voir le périmètre complet des 8 domaines]`** reste affiché et accessible en permanence dès l'écran de consigne (2B) et sur chacune des 8 séries (`S1` à `S8`), navigable au clavier (si maquette locale) ou posé fermé sur la table (si version papier), sans perte de la saisie en cours et sans modification ni substitution de cartes dans la série.
- **Moment de consultation :** entièrement **libre et volontaire**, à l'initiative du participant à n'importe quel moment de la passation (`S1` à `S8`). L'enquêteur **n'ouvre jamais** le volet à sa place et ne le suggère pas activement avant que le participant n'ait formulé sa propre compréhension (relance neutre préalable : *« Qu'est-ce que vous comprenez par cette formulation ? »*). Chaque ouverture et la série correspondante sont relevées dans `L17` (`[OBS]`).

### 3.3 Ce qui existe vs ce qui manque dans les scripts/données pour les tirages A/B `[FAIT VÉRIFIÉ]`

1. **`[FAIT VÉRIFIÉ]`** `audit_maxdiff_designs.py` fournit uniquement `randomize_pilot_n8_dihedral`, qui garantit pour une session donnée : équilibre des positions `[1, 1, 1, 1]`, fréquence uniforme `r = 4`, matrice de cooccurrence `{1: 8, 2: 20}`, connectivité $\mu_2 = 12.00$, 0 doublon et chevauchement consécutif strict `= 1` (linéaire et cyclique `B8 → B1`).
2. **`[INFORMATION MANQUANTE]`** Aucun fichier du dépôt ne définit :
   - comment affecter concrètement `12 à 16` participants aux bras A et B tout en garantissant l'équilibre `6–8` par bras et la comparabilité des profils ;
   - si A et B reçoivent des tirages `randomize_pilot_n8_dihedral` indépendants ou appariés par paires ;
   - quel algorithme d'ordre génère l'affichage des 8 domaines dans le volet d'aide B (en A, `L13` demande un *« ordre aléatoire par participant »*) ;
   - si les 4 cartes par série sont disposées en grille `2×2` ou en liste verticale `1×4` ;
   - la liste des graines exactes archivées par session.

### 3.4 Options soumises à validation humaine (sans inventer de règle algorithmique non validée) `[PROPOSITION À VALIDER]`

| Dimension A/B | Options disponibles à arbitrer humainement | Recommandation argumentée *(non actée sans validation)* |
|---|---|---|
| **1. Affectation et équilibre des groupes A/B** | - **Option A1 (recommandée) — Blocs permutés stratifiés :** affecter les recrues au sein de strates simples (ex. niveau d'aisance/diplôme ou tranche d'âge) par micro-blocs aléatoires équilibrés de taille 2 ou 4 (`AB` / `BA` tirés au sort) afin de garantir `6–8` A et `6–8` B tout en évitant un déséquilibre de profil entre bras.<br>- **Option A2 — Tirage simple contraint sur liste de slots :** pré-générer `12` ou `16` identifiants (`6–8 A`, `6–8 B`) mélangés aléatoirement puis surveiller manuellement la diversité au recrutement. | **Option A1** : évite qu'un tirage aléatoire pur sur `n = 12–16` produise un déséquilibre `9 vs 5` ou concentre les profils peu familiers du vocabulaire institutionnel dans un seul bras. |
| **2. Attribution des blocs MaxDiff et prévention de confusion ordre / effet A-B** | - **Option B1 (recommandée) — Appariement (*yoking*) par paires `P_A_i ↔ P_B_i` :** générer `6 à 8` instances distinctes via `randomize_pilot_n8_dihedral` (`audit_maxdiff_designs.py`) et `6 à 8` ordres aléatoires $\rho \in S_8$ du Panorama/Périmètre ; attribuer la **même instance exacte** (mêmes blocs, même ordre `B1..B8`, mêmes positions, même ordre $\rho$ des 8 fiches) à la paire `(P_A_i, P_B_i)`.<br>- **Option B2 — Tirages indépendants par participant :** générer `12 à 16` instances indépendantes via `randomize_pilot_n8_dihedral`. | **Option B1** : sur `6 à 8` participants par bras, B1 empêche rigoureusement qu'une différence entre A et B provienne du hasard des 4 premières cartes vues en Série 1 de B, tout en conservant la variété des séquences d'un participant à l'autre au sein de chaque bras. |
| **3. Ordre d'affichage des 8 domaines dans le volet d'aide B** | - **Option C1 (recommandée) :** même permutation aléatoire $\rho \in S_8$ par participant (ou appariée en B1) que le Panorama A, sans numéros `1..8`.<br>- **Option C2 :** ordre fixe alphabétique ou thématique dans le volet B. | **Option C1** : garantit la stricte symétrie entre A et B (l'ordre thématique ou alphabétique introduirait un effet d'ancrage différent de l'ordre aléatoire exigé pour A dans `L13`). |
| **4. Disposition spatiale des 4 cartes et médium** | - **Disposition :** `grille 2×2` vs `liste verticale 1×4` (identique en A et B).<br>- **Médium :** cartes papier imprimées standardisées vs maquette statique HTML/Figma locale hors ligne. | Choisir une disposition unique avant la répétition à blanc (en vérifiant le rendu mobile/papier et la correspondance aux positions `1..4` équilibrées par $\tau \in S_4$). |
| **5. Traçabilité des affectations et graines** | Tenir un **registre hors ligne des sessions** (`participant_id`, `variante A/B`, `id_instance_paire`, `graine_MaxDiff`, `graine_ordre_8_domaines`, `date`), **strictement séparé** des formulaires nominatifs `L18`. | Indispensable pour rejouer ou auditer exactement quelle carte est apparue en Série 1 de B ou à quelle position dans les deux bras. |

---

## 4. Tableau des incohérences documentaires et résolution proposée

| # | Documents concernés | Nature exacte de l'incohérence ou de l'écart | État après la présente mission | Validation humaine requise ? |
|---|---|---|---|---|
| **1** | `L11` (§ 1 vs § 2) · `L14` · `L15` | **`DOM-02` :** § 1 écrit *« le soutien aux entreprises »* (omettant *« le temps de vie »*) ; § 2 écrit *« le temps de vie, les entreprises »* (`27 mots`).<br>Conséquences : « soutien aux entreprises » introduit une nuance prescriptive contraire à `P1_1_D1_DECISION_v0.3.md` § 3 et efface un enjeu majeur (`E11`). | **Non tranché définitivement :** `L14`/`L15` utilisent provisoirement `L11` § 2 ; options et conséquences exposées ci-dessous ; **une fois validée, aligner `L11` (§ 1), `L14` et `L15`**. | **Oui (bloquante pour recrutement)** — Recommandation : retenir **`L11` § 2**. |
| **2** | `L11` (§ 1 vs § 2) · `L14` · `L15` | **`DOM-05` :** § 1 écrit *« le coût de l'énergie »* ; § 2 écrit *« le prix de l'énergie »* (`24 mots`).<br>Conséquences : « prix » renvoie directement à la facture des ménages/entreprises (registre courant) ; « coût » peut évoquer le coût technique complet ou de production. | **Non tranché définitivement :** `L14`/`L15` utilisent provisoirement `L11` § 2 ; **une fois validée, aligner `L11` (§ 1), `L14` et `L15`**. | **Oui (bloquante pour recrutement)** — Recommandation : retenir **`L11` § 2**. |
| **3** | `L13` § 0 · `P1_1_SPECIFICATION_v0.3.md` § 5.3 | V0.3 prévoit `8–12` participants comparant deux ordres du parcours sur le brouillon V0.3 ; `L13` prévoit `12–16` participants comparant A (Panorama) vs B (Découverte progressive) sur `L11`. | **Résolu (décision actée) :** `L13` et `L20` formalisent la séparation entre les deux expérimentations (`L13` précède `P1.1 V0.3` sans le remplacer ni modifier `P1_1_SPECIFICATION_v0.3.md`). | Non (cadrage acté ; validation de principe `L12` D5 reste à confirmer). |
| **4** | `L12` D2 · `L13` · `L16` · `L17` | `L12` et `L13` § 2.3 B.9 prévoyaient de montrer `1B`, `2B`, `7B`, `8B` seulement en cas d'hésitation ; `L16` § E prévoyait une présentation systématique. | **Résolu (décision actée) :** `L13`, `L16` et `L17` sont désormais **alignés** sur la règle : retour spontané d'abord, puis présentation **systématique** des 4 variantes (jamais pendant MaxDiff) en demandant si elles modifient la compréhension ou l'interprétation. *(L12 n'est pas réécrit rétroactivement ; son écart historique est tracé ici.)* | Non (règle de travail actée). |
| **5** | `L08` · `L13` · `L16` | Durées divergentes : `45–55 min` (`L08`), `40–45 min` hors accueil (`L13`), `45–60 min` (`L16`). | **Résolu provisoirement :** `L13` et `L16` sont alignés sur **`45–60 minutes`** (durée provisoire à confirmer par la répétition intégrale à blanc § 7). | Confirmation empirique lors du dry run. |
| **6** | `L13` § 3.1 · `L17` | `L13` listait 12 champs sans séparation `[OBS]`/`[INTERP]`, sans `Série` ni `Verbatim` isolé, et avec des modalités différentes de `L17` (`Oui/Partiel/Non`). | **Résolu (décision actée) :** `L13` § 3.1 et `L17` sont **alignés** à l'identique sur les 17 colonnes séparant `[OBS]` et `[INTERP]`, avec conservation des verbatims et du champ de modification de compréhension/interprétation en débriefing lexical. | Non (alignement acté). |
| **7** | `P1_1_SPECIFICATION_v0.3.md` § 5.1 · `05_UX_INTERACTIONS.md` · `L13` · `L15` | `P1.1 V0.3` mentionne deux couples possibles (*« Devrait recevoir le plus d'attention » / « Pourrait attendre »* vs *« Plus d'attention en premier » / « Dans un second temps »*) et un libellé long pour `no_distinguishable_best_worst`. `L15` utilise uniquement *« Devrait recevoir le plus d'attention » / « Pourrait attendre »* et *« Impossible de départager cette série »*. | **Documenté comme choix propre au prétest `L13`/`L15` :** ni `P1_1_SPECIFICATION_v0.3.md` ni les libellés finaux du produit P1.1 ne sont modifiés. | Oui, ultérieurement lors de la qualification `P1.1 V0.4` / pilote V0.3. |
| **8** | `L11` § 2 · `L14` · `L15` | La *Note de périmètre consultable* de `DOM-06` dans `L11` § 2 cite le code technique `(DOM-07)` ; `L14`/`L15` l'affichent en clair `(domaine Justice, libertés publiques et démocratie)` côté participant. | **Documenté dans `L14` § 1 :** évite d'exposer des identifiants techniques internes aux participants tout en préservant exactement le sens de `L11` § 2. | Validation éditoriale légère lors de l'arbitrage `L11`. |

---

## 5. Synthèse des validations humaines encore nécessaires

1. **Arbitrages éditoriaux (`L12` Décisions 1–3 & `L20` § 4) :**
   - Confirmer l'Architecture 1 (`N = 8`) comme base provisoire du prétest `L13`.
   - Trancher officiellement `DOM-02` (*« le temps de vie, les entreprises »* vs *« le soutien aux entreprises »*) et `DOM-05` (*« le prix de l'énergie »* vs *« le coût de l'énergie »*) et valider l'alignement consécutif de `L11` (§ 1), `L14` et `L15`.
   - Confirmer le maintien de la laïcité (`E38`) dans `DOM-07` pour le prétest et décider si une relecture pluraliste légère (`L12` Option 6A) précède le recrutement.
2. **Arbitrages A/B et logistiques (`L20` § 3.4) :**
   - Choisir la règle d'affectation (Option A1 blocs permutés stratifiés vs Option A2 tirage contraint sur slots).
   - Choisir la règle d'attribution des blocs MaxDiff (Option B1 appariement par paires `P_A_i ↔ P_B_i` vs Option B2 tirages indépendants) et valider la règle d'ordre du volet B (Option C1 recommandée).
   - Fixer le médium concret (papier imprimé vs maquette HTML/Figma statique locale hors ligne) et la disposition des 4 cartes (`2×2` vs `1×4`).
   - Générer et consigner la table des graines/instances hors ligne avant le début des séances.
3. **Validations juridiques, RGPD et organisationnelles (checklist bloquante § 6 + `L18`) :**
   - Compléter et faire valider l'ensemble des 10 points bloquants de la section suivante.
4. **Validation post-répétition à blanc (`§ 7`) :**
   - Confirmer la durée effective (`45–60 min`), l'ergonomie de consultation du périmètre complet (A et B) et l'absence de dérive de neutralité après exécution du dry run.

---

## 6. Checklist bloquante avant tout recrutement ou contact avec des participants

> **Règle impérative :** chaque ligne marquée **`[BLOQUANT]`** doit être renseignée par un décideur habilité et vérifiée dans [`L18_CONSENTEMENT_ET_ANONYMISATION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L18_CONSENTEMENT_ET_ANONYMISATION.md) **avant toute prise de contact avec des participants réels**. Aucune valeur non fournie ne doit être présupposée.

| # | Exigence réglementaire et éthique | État actuel dans le dépôt | Champ / action obligatoire à valider avant recrutement | Statut |
|---|---|---|---|---|
| **1** | **Responsable du traitement et coordonnées** | Absent de `L01–L19` et `02_PRIVACY_SECURITY.md`. | `[À COMPLÉTER]` Nom ou structure responsable de l'étude + adresse postale / électronique de contact. | **`[BLOQUANT]`** |
| **2** | **Information des participants et recueil du consentement** | Modèle structuré prêt dans `L18` Partie 2 & 3 (avec champs à compléter). | `[À VALIDER]` Finaliser `L18` en supprimant les options non retenues, vérifier la lisibilité pour tous publics et arrêter la procédure de signature (papier ou recueil local hors ligne). | **`[BLOQUANT]`** |
| **3** | **Base légale (et analyse Art. 9 RGPD)** | [`02_PRIVACY_SECURITY.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/02_PRIVACY_SECURITY.md) § 1 rappelle que les réponses peuvent révéler des opinions politiques (catégorie particulière art. 9 RGPD). | `[À DÉTERMINER ET VALIDER]` Définir formellement la base juridique (art. 6) et l'exception applicable au titre de l'article 9 du RGPD (ex. consentement explicite) avec avis juridique compétent. | **`[BLOQUANT]`** |
| **4** | **Nature exacte des données recueillies** | Définie méthodologiquement (`L13`, `L17` : réactions de lecture, choix MaxDiff observés en séance, verbatims, profil par grandes tranches sans nom ni affiliation partisane). | `[À CONFIRMER]` Valider la liste exacte des variables de profil et confirmer qu'aucune donnée directement identifiante ni affiliation partisane n'est collectée dans `L17`. | **`[BLOQUANT]`** |
| **5** | **Éventuel enregistrement audio** | Deux branches laissées ouvertes dans `L16` et `L18` (notes écrites seules vs audio facultatif). | `[À TRANCHER]` Décider si un enregistrement audio facultatif est proposé ou exclu ; si retenu, définir l'outil hors ligne sans transcription IA externe et activer la case de consentement séparée dans `L18`. | **`[BLOQUANT]`** |
| **6** | **Pseudonymisation vs anonymisation (distinction stricte)** | `L18` distingue explicitement l'anonymisation immédiate (Option A, aucune table de correspondance conservée après séance) et la pseudonymisation temporaire (Option B, code `P01..P16` relié à une table séparée permettant le retrait avant destruction). | `[À TRANCHER]` Choisir un seul régime effectif. **Ne pas qualifier de « données anonymes » un jeu conservant une table de correspondance ou des voix enregistrées identifiables.** | **`[BLOQUANT]`** |
| **7** | **Durée de conservation et modalités de suppression** | Non définie dans le dépôt. | `[À DÉFINIR]` Fixer la durée exacte et le mode de destruction sécurisée pour : (a) consentements signés, (b) table de correspondance éventuelle, (c) audio éventuel, (d) grilles/tableurs d'observation. | **`[BLOQUANT]`** |
| **8** | **Lieu et conditions de stockage** | Exigence générale « hors ligne / hors base applicative » dans `L13` et `02_PRIVACY_SECURITY.md`. | `[À DÉFINIR]` Préciser le support physique (armoire fermée à clé) ou numérique (support local chiffré hors réseau, séparation physique entre consentements nominatifs et grilles `P01..P16`). | **`[BLOQUANT]`** |
| **9** | **Personnes ayant accès aux données** | Non nommé dans le dépôt (rôles génériques *enquêteur* et *analyste*). | `[À DÉSIGNER]` Lister nominativement ou par fonction stricte les personnes autorisées à accéder aux consentements, à la table éventuelle, aux enregistrements et aux grilles `L17`. | **`[BLOQUANT]`** |
| **10** | **Validation juridique et RGPD appropriée** | [`02_PRIVACY_SECURITY.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/02_PRIVACY_SECURITY.md) § 1 & § 8 exigent une validation compétente avant traitement réel de données politiques. | `[À OBTENIR]` Relecture et validation écrite du dossier `L18` + conditions de traitement (incluant analyse de nécessité d'une AIPD / exercice des droits) par une personne compétente en protection des données. | **`[BLOQUANT]`** |

---

## 7. Protocole et checklist de répétition intégrale à blanc (Dry Run)

### 7.1 Modalités de la répétition à blanc `[PROPOSITION À VALIDER]`

- **Effectif et cadre :** conduire **au minimum 2 répétitions complètes à blanc** (1 en **Variante A** et 1 en **Variante B**, idéalement 4 en incluant un rôle d'utilisateur peu familier du vocabulaire institutionnel et un profil très engagé) **exclusivement en interne** (membres de l'équipe ou collègues informés qu'il s'agit d'un essai à blanc — **zéro recrutement externe, zéro donnée conservée au titre des 12–16 participants**).
- **Matériel utilisé :** le médium exact retenu (`L15` papier ou maquette locale hors ligne), les cartes provisoires `L14` (`L11` § 2, en notant tout besoin de clarification sur `DOM-02`/`DOM-05`), le guide `L16` chronométré et la grille `L17`.

### 7.2 Checklist de vérification pendant la répétition à blanc

| Point de contrôle obligatoire | Ce que l'observateur / superviseur du dry run doit vérifier | Critère de validation (`OK` / `À corriger`) |
|---|---|---|
| **1. Déroulement complet des Variantes A et B** | Enchaînement fluide de toutes les séquences (Intro A → Consignes B → Passation C → Débriefing spontané D + bascule Strate 2.1 → Débriefing lexical E → Clôture F) sans trou de script ni confusion matérielle entre cartons/écrans. | `[ ] OK` · `[ ] À corriger : ________` |
| **2. Compréhension des consignes** | Les consignes D1 V0.3, le sens relatif de *« Pourrait attendre »*, la possibilité de choisir pour une seule composante, les options `Passer` / `Je ne sais pas` / `Impossible de départager` et le signalement orthogonal sont lus et compris sans ré-explication improvisée. | `[ ] OK` · `[ ] À corriger : ________` |
| **3. Accès au périmètre complet dans A et B** | En A, le Panorama et les périmètres résumés s'affichent clairement dans l'ordre aléatoire prévu ; en B, le bouton/livret *« Voir le périmètre complet des 8 domaines »* est immédiatement repérable dès l'écran 2B et sur `S1..S8`, consultable à tout moment sans perdre la série en cours. | `[ ] OK` · `[ ] À corriger : ________` |
| **4. Neutralité des relances** | L'enquêteur respecte intégralement la table de neutralité (`L16` § B.2) : aucune définition orale des domaines, aucun exemple politique donné, utilisation systématique de *« Qu'est-ce que vous comprenez par cette formulation ? »*, silence respecté pendant `S1..S8`. | `[ ] OK` · `[ ] À corriger : ________` |
| **5. Moment de présentation des variantes lexicales** | Les fiches `1B`, `2B`, `7B`, `8B` restent physiquement/visuellement isolées pendant toute la passation et tout le débriefing spontané D, puis sont montrées systématiquement en E avec la question sur la modification de compréhension/interprétation. | `[ ] OK` · `[ ] À corriger : ________` |
| **6. Temps consacré à chaque séquence** | Chronométrer chaque phase réelle :<br>- Intro & consentement (A) : cible `5–7 min` (`___ min`)<br>- Passation MaxDiff (B–C) : cible `12–18 min` (`___ min`)<br>- Débriefing spontané + Strate 2.1 (D) : cible `18–22 min` (`___ min`)<br>- Débriefing lexical `1B/2B/7B/8B` (E) : cible `7–10 min` (`___ min`)<br>- Clôture (F) : cible `3 min` (`___ min`) | `[ ] OK` · `[ ] À corriger : ________` |
| **7. Durée totale et fatigue éventuelle** | La durée totale tient dans la fourchette provisoire **`45 à 60 minutes`** sans chute d'attention manifeste en Section E/F, ni surcharge de prise de notes pour l'enquêteur. | Durée A : `___ min` · Durée B : `___ min`<br>`[ ] OK` · `[ ] À corriger : ________` |
| **8. Remplissage de la grille `L17`** | L'enquêteur/observateur parvient à saisir en direct les colonnes `[OBS]` (y compris `Série`, `Sujet principalement évoqué`, `Verbatim` et `modifie_comprehension_ou_interpretation_OBS`), puis à coder séparément `[INTERP]` et coller les lignes dans les 4 onglets CSV sans ambiguïté de colonne. | `[ ] OK` · `[ ] À corriger : ________` |

### 7.3 Critères décidant si le protocole est prêt après la répétition à blanc

Le protocole ne peut être déclaré **techniquement prêt pour passer aux validations finales pré-recrutement** que si **toutes** les conditions suivantes sont réunies à l'issue du dry run :
1. **Zéro rupture de comparabilité A/B :** aucun accès involontaire au Panorama en B, accès symétrique au périmètre complet vérifié, même durée d'instruction initiale hors temps de lecture du Panorama.
2. **Zéro fuite des variantes lexicales :** aucune présentation ni évocation de `1B/2B/7B/8B` avant la Section E.
3. **Tenue de la durée provisoire :** durée totale observée en A et en B comprise entre `45 et 60 minutes` (ou ajustement explicite validé de la durée annoncée dans `L16` et `L18` si le dry run dépasse `60 min`).
4. **Fiabilité de recueil dans `L17` :** au moins 90 % des réactions clés et la totalité des réponses aux questions obligatoires (`Sujet principalement évoqué`, question finale `F`, modification de compréhension/interprétation en `E`) ont pu être consignées sans confusion `[OBS]` / `[INTERP]`.
5. **Zéro intervention orientée non rattrapable :** l'enquêteur testé maîtrise les relances neutres sans devoir improviser d'exemples politiques.

*(Si l'un des critères 1 à 5 échoue, corriger uniquement les modalités logistiques/ergonomiques ou la calibration du guide puis refaire un essai ciblé à blanc avant toute demande d'ouverture de recrutement.)*

---

## 8. Statut final officiel du protocole

| Volet | Statut | Justification précise |
|---|---|---|
| **Répétition interne à blanc (Dry Run)** | **`PRÊT SOUS RÉSERVE DE VALIDATIONS`** *(minimales)* | Le kit `L13`–`L19` est complet, cohérent et aligné. Il ne manque avant exécution interne à blanc que le choix concret du support matériel (papier vs maquette statique locale), la disposition `2×2` vs `1×4`, la confirmation provisoire de la base `L11` § 2 pour l'essai à blanc et la table de tirage d'essai. |
| **Recrutement et entretiens réels (`n = 12 à 16`)** | **`NON PRÊT / BLOQUÉ`** | Subordonné impérativement à : (1) validation humaine de `DOM-02` et `DOM-05` (+ alignement final `L11`, `L14`, `L15`) et arbitrages `L12` ; (2) validation des règles d'assignation A/B et traçabilité des graines (§ 3.4) ; (3) levée de l'intégralité des 10 points bloquants juridiques/RGPD/consentement (§ 6 & `L18`) ; (4) validation concluante de la répétition intégrale à blanc (§ 7). |
