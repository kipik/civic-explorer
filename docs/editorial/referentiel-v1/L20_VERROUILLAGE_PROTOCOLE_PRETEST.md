# L20 — Verrouillage du protocole de prétest cognitif éditorial (`L13`)

**Statut global :** **`DRY RUN INTERNE AUTORISÉ (PAPIER 2×2) · HARMONISATION ÉDITORIALE PRÉ-TEST APPLIQUÉE · PRÉTEST EXTERNE ET RECRUTEMENT NON PRÊTS / BLOQUÉS`** *(les dossiers imprimables et consignes du dry run interne sont prêts sans modification de `src/` ni de `P1_1_SPECIFICATION_v0.3.md` ; tout recrutement externe, tout entretien extérieur, les règles définitives A/B/stratification/randomisation du prétest externe et la validation RGPD restent **NON APPROUVÉS / BLOQUÉS**).*  
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
| **Arbitrage `DOM-02` et `DOM-05` (`L11` § 1 vs § 2) et décomptes de mots** | **`[DÉCISION ACTÉE]`** | Formulations `L11` § 2 validées le 10/11/2026 (`DOM-02` : *« le temps de vie, les entreprises »* ; `DOM-05` : *« le prix de l'énergie »*). `L11`, `L13`, `L14` et `L15` harmonisés sans modifier aucun autre domaine ; notes de divergence obsolètes supprimées ; décomptes de mots vérifiés et corrigés (`21 à 30 mots` en unités séparées par espaces) ; identité stricte des supports participant vérifiée. *(Ne vaut pas validation pour production.)* |
| **Dispositif de dry run interne (`L21` / `dry-run/`)** | **`[DÉCISION ACTÉE — DRY RUN INTERNE UNIQUEMENT]`** | Support papier, disposition `2×2`, livret de périmètre complet accessible, instances `DR-INST-1` et `DR-INST-2`, `1A+1B` min (idéalement `2A+2B`), identification explicite `DRY-RUN INTERNE` et exclusion de tout échantillon futur. **Ne vaut pas approbation pour le prétest externe.** |
| **Stratification A/B, appariement des blocs, protocole de randomisation définitif et médium du prétest externe** | **`[PROPOSITION À VALIDER]`** / **`[INFORMATION MANQUANTE]`** | **Non approuvés :** la stratification sociodémographique A/B (dont le regroupement « sans diplôme supérieur / faible aisance » à réexaminer), la règle d'appariement A/B, le protocole de randomisation définitif du futur prétest et le médium/disposition définitifs restent ouverts en § 3.4–3.5 avant tout recrutement externe. |
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

### 3.4 Options soumises à validation humaine pour le futur prétest externe *(non approuvées à ce stade)* `[PROPOSITION À VALIDER]`

> **Avertissement de portée :** L'autorisation du dry run interne (`support papier`, `2×2`, `DR-INST-1` et `DR-INST-2`) **ne vaut approbation définitive d'aucune** des propositions suivantes pour le futur prétest externe (`12–16` participants) : ni de la stratification sociodémographique A/B, ni de la règle d'appariement des blocs entre A et B, ni du protocole de randomisation définitif, ni du recrutement externe, ni de la conformité juridique/RGPD.

| Dimension A/B | Options disponibles à arbitrer humainement | Recommandation argumentée *(non actée sans validation)* |
|---|---|---|
| **1. Affectation et équilibre des groupes A/B** | - **Option A1 — Blocs permutés stratifiés :** affecter les recrues par micro-blocs aléatoires équilibrés de taille 2 (`AB`/`BA`) sur un critère de stratification validé et homogène (voir réexamen critique § 3.5 ci-dessous — ne pas fusionner diplôme et aisance sans justification).<br>- **Option A2 — Tirage simple contraint sur liste de slots :** pré-générer `12` ou `16` identifiants (`6–8 A`, `6–8 B`) mélangés aléatoirement puis surveiller séparément les critères de diversité (`L19` § 1.1) au recrutement. | **À arbitrer après réexamen (§ 3.5) :** vérifier si un critère unique objectif (ex. diplôme seul) ou un suivi séparé des 4 axes `L13` § 1.2 est préférable pour `n = 12–16`. |
| **2. Attribution des blocs MaxDiff et prévention de confusion ordre / effet A-B** | - **Option B1 — Appariement (*yoking*) par paires `P_A_i ↔ P_B_i` :** générer `6 à 8` instances distinctes via `randomize_pilot_n8_dihedral` (`audit_maxdiff_designs.py`) et `6 à 8` ordres aléatoires $\rho \in S_8$ du Panorama/Périmètre ; attribuer la **même instance exacte** à la paire `(P_A_i, P_B_i)`.<br>- **Option B2 — Tirages indépendants par participant :** générer `12 à 16` instances indépendantes via `randomize_pilot_n8_dihedral`. | **Non approuvé pour le prétest externe :** choix entre B1 (neutralise `S1` sur petit effectif mais crée des cas `unpaired` en cas de désistement ou `n` impair) et B2 (simplicité opérationnelle mais risque d'aléa sur `S1` en B) à arbitrer avant génération des carnets définitifs. |
| **3. Ordre d'affichage des 8 domaines dans le volet d'aide B** | - **Option C1 :** même permutation aléatoire $\rho \in S_8$ par participant (ou appariée en B1) que le Panorama A, sans numéros `1..8`.<br>- **Option C2 :** ordre fixe alphabétique ou thématique dans le volet B. | **Utilisé à titre d'essai interne dans `DR-INST-1/2` (C1)** ; validation définitive pour le prétest externe à confirmer avec le choix `B1`/`B2`. |
| **4. Disposition spatiale des 4 cartes et médium** | - **Disposition :** `grille 2×2` vs `liste verticale 1×4` (identique en A et B).<br>- **Médium :** cartes papier imprimées standardisées vs maquette statique HTML/Figma locale hors ligne. | **Pour le dry run interne uniquement :** `support papier` + `grille 2×2` (`Pos 1=HG, Pos 2=HD, Pos 3=BG, Pos 4=BD`). Décision définitive pour le prétest externe réexaminée après le compte rendu du dry run. |
| **5. Traçabilité des affectations et graines** | Tenir un **registre hors ligne des sessions** (`participant_id`, `variante A/B`, `id_instance_paire`, `graine_MaxDiff`, `graine_ordre_8_domaines`, `date`), **strictement séparé** des formulaires nominatifs `L18`. | Règle de traçabilité technique requise dès validation du protocole de randomisation définitif du prétest externe. |

### 3.5 Réexamen critique de la proposition de stratification « sans diplôme supérieur / faible aisance » *(non approuvée)*

La proposition initiale figurant en `L21` § 2.2 (*Strate `ST1` = sans diplôme de l'enseignement supérieur **ou** faible aisance déclarée avec le vocabulaire institutionnel* vs *Strate `ST2` = diplôme du supérieur **et** aisance moyenne à élevée*) **ne doit pas être approuvée telle quelle** et appelle le réexamen suivant avant tout recrutement externe :

1. **Deux construits non équivalents :** le *niveau de diplôme* (certification scolaire/universitaire) et *l'aisance avec le vocabulaire institutionnel* (familiarité civique, politique ou administrative) ne sont pas substituables. Une personne sans diplôme du supérieur peut suivre assidûment la vie publique et maîtriser ces termes ; à l'inverse, une personne diplômée du supérieur (ex. filière technique ou peu intéressée par la politique) peut éprouver une réelle difficulté face au lexique institutionnel.
2. **Effet analytique de la fusion `OU`/`ET` :** fusionner ces deux caractéristiques dans une strate composite `ST1` rendrait impossible de distinguer si un équilibre A/B porte sur le niveau de diplôme ou sur l'aisance de lecture, et produirait des strates asymétriques et potentiellement très déséquilibrées en taille.
3. **Difficulté de mesure pré-assignation :** le niveau de diplôme est une variable déclarative simple et objective recueillie avant la séance ; à l'inverse, qualifier une « faible aisance avec le vocabulaire institutionnel » dès le recrutement expose soit à une auto-évaluation peu fiable, soit à un questionnement potentiellement stigmatisant avant même le début de l'entretien.
4. **Pistes séparées à arbitrer ultérieurement *(aucune n'est actée)* :**
   - **Piste 1 :** stratifier uniquement sur un critère objectif et explicite (ex. *sans diplôme du supérieur* vs *diplôme du supérieur*), tout en mesurant et en suivant *séparément* l'aisance de lecture et le rapport au politique dans `L17` / `L19` ;
   - **Piste 2 :** si la littératie civique/institutionnelle est jugée plus pertinente que le diplôme, définir un item court et respectueux distinct du diplôme, sans jamais les fusionner dans un critère composite `OU`/`ET` ;
   - **Piste 3 :** renoncer à la stratification formelle au profit d'un tirage aléatoire équilibré simple (Option A2) accompagné d'une vérification séparée des deux variables dans le tableau de diversité `L19`.

---

## 4. Tableau des incohérences documentaires et journal des décisions

### 4.1 Tableau de résolution des incohérences documentaires

| # | Documents concernés | Nature exacte de l'incohérence ou de l'écart | État après harmonisation | Validation humaine requise ? |
|---|---|---|---|---|
| **1** | `L11` (§ 1 vs § 2) · `L13` · `L14` · `L15` | **`DOM-02` :** § 1 écrivait *« le soutien aux entreprises »* (omettant *« le temps de vie »*) ; § 2 écrivait *« le temps de vie, les entreprises »* (`27 mots`). | **Résolu (arbitrage du 10/11/2026) :** formulation `L11` § 2 validée (*« le temps de vie, les entreprises »*) ; `L11` § 1, `L13`, `L14` et `L15` harmonisés ; notes de divergence obsolètes supprimées. | Non (validé pour dry run interne et prétest candidat). |
| **2** | `L11` (§ 1 vs § 2) · `L13` · `L14` · `L15` | **`DOM-05` :** § 1 écrivait *« le coût de l'énergie »* ; § 2 écrivait *« le prix de l'énergie »* (`24 mots`). | **Résolu (arbitrage du 10/11/2026) :** formulation `L11` § 2 validée (*« le prix de l'énergie »*) ; `L11` § 1, `L13`, `L14` et `L15` harmonisés ; notes de divergence obsolètes supprimées. | Non (validé pour dry run interne et prétest candidat). |
| **3** | `L13` § 0 · `P1_1_SPECIFICATION_v0.3.md` § 5.3 | V0.3 prévoit `8–12` participants comparant deux ordres du parcours sur le brouillon V0.3 ; `L13` prévoit `12–16` participants comparant A (Panorama) vs B (Découverte progressive) sur `L11`. | **Résolu (décision actée) :** `L13` et `L20` formalisent la séparation entre les deux expérimentations (`L13` précède `P1.1 V0.3` sans le remplacer ni modifier `P1_1_SPECIFICATION_v0.3.md`). | Non (cadrage acté ; validation de principe `L12` D5 avant prétest externe). |
| **4** | `L12` D2 · `L13` · `L16` · `L17` | `L12` et `L13` § 2.3 B.9 prévoyaient de montrer `1B`, `2B`, `7B`, `8B` seulement en cas d'hésitation ; `L16` § E prévoyait une présentation systématique. | **Résolu (décision actée) :** `L13`, `L16` et `L17` sont **alignés** sur la règle : retour spontané d'abord, puis présentation **systématique** des 4 variantes (jamais pendant MaxDiff) en demandant si elles modifient la compréhension ou l'interprétation. *(L12 n'est pas réécrit rétroactivement ; son écart historique est tracé ici.)* | Non (règle de travail actée). |
| **5** | `L08` · `L13` · `L16` | Durées divergentes : `45–55 min` (`L08`), `40–45 min` hors accueil (`L13`), `45–60 min` (`L16`). | **Résolu provisoirement :** `L13` et `L16` sont alignés sur **`45–60 minutes`** (durée provisoire à mesurer impérativement lors du dry run interne § 7). | Confirmation empirique lors du dry run. |
| **6** | `L13` § 3.1 · `L17` | `L13` listait 12 champs sans séparation `[OBS]`/`[INTERP]`, sans `Série` ni `Verbatim` isolé, et avec des modalités différentes de `L17` (`Oui/Partiel/Non`). | **Résolu (décision actée) :** `L13` § 3.1 et `L17` sont **alignés** à l'identique sur les 17 colonnes séparant `[OBS]` et `[INTERP]`, avec conservation des verbatims et du champ de modification de compréhension/interprétation en débriefing lexical. | Non (alignement acté). |
| **7** | `P1_1_SPECIFICATION_v0.3.md` § 5.1 · `05_UX_INTERACTIONS.md` · `L13` · `L15` | `P1.1 V0.3` mentionne deux couples possibles (*« Devrait recevoir le plus d'attention » / « Pourrait attendre »* vs *« Plus d'attention en premier » / « Dans un second temps »*) et un libellé long pour `no_distinguishable_best_worst`. `L15` utilise uniquement *« Devrait recevoir le plus d'attention » / « Pourrait attendre »* et *« Impossible de départager cette série »*. | **Documenté comme choix propre au prétest `L13`/`L15` :** ni `P1_1_SPECIFICATION_v0.3.md` ni les libellés finaux du produit P1.1 ne sont modifiés. | Oui, ultérieurement lors de la qualification `P1.1 V0.4` / pilote V0.3. |
| **8** | `L11` § 2 · `L14` · `L15` | La *Note de périmètre consultable* de `DOM-06` dans `L11` § 2 cite le code technique `(DOM-07)` ; `L14`/`L15` l'affichent en clair `(domaine Justice, libertés publiques et démocratie)` côté participant. | **Documenté dans `L14` § 1 :** évite d'exposer des identifiants techniques internes aux participants tout en préservant exactement le sens de `L11` § 2. | Validation éditoriale légère lors de la revue pré-recrutement. |
| **9** | `L11` (§ 2) · `L14` (§ 2.1, § 3) | Décomptes de mots affichés pour les descriptions courtes (`DOM-01` indiqué `28` au lieu de `30`, `DOM-03` indiqué `23` au lieu de `21`, `DOM-08` indiqué `24` au lieu de `23`, plage annoncée `22–28` en `L14`). | **Résolu (audit du 10/11/2026) :** décomptes corrigés (`DOM-01`: `30`, `DOM-02`: `27`, `DOM-03`: `21`, `DOM-04`: `22`, `DOM-05`: `24`, `DOM-06`: `24`, `DOM-07`: `28`, `DOM-08`: `23` ; plage `21–30 mots` en unités séparées par espaces) sans modification d'aucune formulation. | Non (vérification factuelle appliquée). |
| **10** | `L14` (§ 3) · `L15` (§ 7) | Pour `DOM-04`, le renvoi vers `DOM-07` en `L14` § 3 mentionnait *« (les applications concrètes dans la vie scolaire y sont liées) »*, omis dans `L15` § 7. | **Résolu (vérification du 10/11/2026) :** précision restaurée dans `L15` § 7 pour assurer l'identité stricte des fiches de périmètre consultables entre A et B (`L14` et `L15`). | Non (identité des supports vérifiée). |

### 4.2 Journal des décisions et trace des harmonisations

| Date | Décision / action enregistrée | Portée exacte et fichiers modifiés | Limites explicites conservées |
|---|---|---|---|
| **10/11/2026** | **Arbitrage éditorial `DOM-02` et `DOM-05` (`L11` § 2)** + audit des décomptes et identité des supports | Validé *« le temps de vie, les entreprises »* (`DOM-02`) et *« le prix de l'énergie »* (`DOM-05`). Aucun autre domaine modifié. Décomptes de mots audités et corrigés (`DOM-01`: `30`, `DOM-03`: `21`, `DOM-08`: `23`). Notes de divergence obsolètes supprimées. Fichiers harmonisés : `L11`, `L13`, `L14`, `L15`, `L20`, `L21`, `README.md`. | Ne vaut pas validation de production ni revue pluraliste formelle. Aucun changement dans `src/` ni `P1.1 V0.3`. |
| **10/11/2026** | **Autorisation du dry run interne** | Dispositif validé exclusivement en interne : support papier, disposition `2×2`, livret de périmètre complet accessible, instances `DR-INST-1` et `DR-INST-2`, `1A+1B` minimum et idéalement `2A+2B` selon disponibilités. Dossiers imprimables, consignes de passation et modèle de compte rendu factuel créés dans `docs/editorial/referentiel-v1/dry-run/`. Marquage obligatoire `DRY-RUN INTERNE` et exclusion de tout échantillon futur. | **Ne vaut approbation définitive ni** de la stratification sociodémographique A/B (avec réexamen demandé de « sans diplôme supérieur / faible aisance »), **ni** de la règle d'appariement A/B, **ni** du protocole de randomisation définitif du futur prétest, **ni** du recrutement externe, **ni** de la conformité juridique/RGPD. |

---

## 5. Synthèse des validations humaines encore nécessaires avant prétest externe (`12–16`)

1. **Arbitrages éditoriaux (`L12` & `L20` § 4) :**
   - *(Fait pour le dry run et le candidat prétest :)* `DOM-02` (*« le temps de vie, les entreprises »*) et `DOM-05` (*« le prix de l'énergie »*) tranchés ; `L11`, `L14`, `L15` harmonisés et vérifiés.
   - *(Reste à valider avant prétest externe et P1.1 V0.4 :)* confirmer le maintien définitif de l'Architecture 1 (`N = 8`) et du placement de la laïcité (`E38`) dans `DOM-07` à l'issue du prétest, et décider si une relecture pluraliste légère (`L12` Option 6A) précède le recrutement externe.
2. **Arbitrages A/B et logistiques du prétest externe (`L20` § 3.4–3.5 — NON APPROUVÉS) :**
   - Réexaminer et arbitrer la stratification A/B sans fusionner *« sans diplôme du supérieur »* et *« faible aisance »* (§ 3.5).
   - Arbitrer la règle d'attribution des blocs MaxDiff pour le prétest externe (appariement `B1` vs tirages indépendants `B2`) et confirmer la règle d'ordre du volet B (`C1` vs `C2`).
   - Confirmer le médium définitif (`papier` vs `maquette statique locale`) et la disposition (`2×2` vs `1×4`) au vu du compte rendu du dry run.
   - Approuver le protocole de randomisation définitif et générer/archiver la table des graines hors ligne `P01..P16`.
3. **Validations juridiques, RGPD et organisationnelles (checklist bloquante § 6 + `L18`) :**
   - Compléter et faire valider l'ensemble des 10 points bloquants de la section suivante avant tout contact externe.
4. **Compte rendu factuel post-dry-run (`§ 7.4`) :**
   - Rédiger le compte rendu factuel des répétitions internes et appliquer les corrections requises avant toute demande d'ouverture du prétest externe.

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

### 7.1 Modalités autorisées du dry run interne `[DÉCISION ACTÉE — DRY RUN INTERNE]`

- **Effectif et cadre :** conduire **au minimum 1 répétition en Variante A et 1 répétition en Variante B** (`DR-INST-1`), et **idéalement 2 répétitions par variante** (`DR-INST-1` et `DR-INST-2`) si les disponibilités le permettent, **exclusivement en interne** (membres de l'équipe informés — **zéro recrutement externe, zéro entretien avec des participants extérieurs**).
- **Identification et exclusion :** toutes les feuilles, notes et observations doivent être explicitement identifiées **`DRY-RUN INTERNE`** (`DR-A1`, `DR-B1`, `DR-A2`, `DR-B2`) et **exclues de tout échantillon futur (`P01..P16`)**.
- **Matériel autorisé (`dry-run/`) :** support papier, disposition en grille `2×2`, livret de périmètre complet accessible, formulations harmonisées `L11`/`L14`/`L15`, instances `DR-INST-1` et `DR-INST-2`, consignes de passation adaptées ([`dry-run/CONSIGNES_PASSATION_ET_FEUILLE_ROUTE_DRY_RUN.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/CONSIGNES_PASSATION_ET_FEUILLE_ROUTE_DRY_RUN.md)) et grille `L17`.

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

### 7.4 Compte rendu factuel obligatoire après le dry run

À l'issue des répétitions internes, rédiger un **compte rendu factuel** (modèle prêt dans [`dry-run/MODELE_COMPTE_RENDU_FACTUEL_DRY_RUN.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/MODELE_COMPTE_RENDU_FACTUEL_DRY_RUN.md)) indiquant obligatoirement :

1. la durée réelle de chaque séance (totale et par séquence) ;
2. les problèmes de compréhension des consignes ;
3. les erreurs de manipulation ou de présentation ;
4. les problèmes d'accès au périmètre complet ;
5. les difficultés de remplissage de `L17` ;
6. les différences procédurales observées entre A et B ;
7. les corrections nécessaires avant le prétest externe.

> **Exigences méthodologiques du compte rendu :** distinguer systématiquement les **observations (`[OBS]`)** des **interprétations (`[INTERP]`)**, et **ne tirer aucune conclusion sur la neutralité statistique ou la validité scientifique des huit domaines** à partir de ces seules répétitions internes.

---

## 8. Statut final officiel du protocole après harmonisation

| Volet | Statut | Justification précise |
|---|---|---|
| **Harmonisation éditoriale pré-test (`L11`, `L13`, `L14`, `L15`)** | **`HARMONISÉ — NON VALIDÉ POUR PRODUCTION`** | `DOM-02` (*« le temps de vie, les entreprises »*) et `DOM-05` (*« le prix de l'énergie »*) alignés sur `L11` § 2 ; autres domaines conservés intacts ; décomptes de mots vérifiés (`21–30 mots` en unités séparées par espaces) ; notes de divergence obsolètes supprimées ; identité des cartes et supports participants vérifiée. |
| **Dry Run interne (`dry-run/` : papier `2×2`, `DR-INST-1` & `DR-INST-2`)** | **`AUTORISÉ — DOSSIERS ET CONSIGNES PRÊTS (EXCLUSIVEMENT INTERNE)`** | Dispositif papier `2×2`, livret de périmètre complet accessible, `1A+1B` min / `2A+2B` idéal, marquage `DRY-RUN INTERNE` exclu de tout échantillon futur. Zéro modification de `src/` ni de `P1.1 V0.3`. |
| **Recrutement et prétest cognitif externe (`n = 12 à 16`)** | **`NON PRÊT / BLOQUÉ`** | Demeurent **non approuvés et bloquants** : (1) la stratification sociodémographique A/B (dont réexamen obligatoire « sans diplôme supérieur / faible aisance ») ; (2) la règle d'appariement des blocs A/B ; (3) le protocole de randomisation définitif du futur prétest ; (4) l'exécution et le compte rendu factuel du dry run interne ; (5) les 10 points juridiques/RGPD/consentement (§ 6 & `L18`) et toute autorisation de recrutement externe. |
