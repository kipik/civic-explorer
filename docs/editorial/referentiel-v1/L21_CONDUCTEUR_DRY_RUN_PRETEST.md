# L21 — Conducteur opérationnel de répétition interne à blanc (Dry Run du prétest `L13`)

**Statut :** **`DRY RUN INTERNE AUTORISÉ — DOSSIERS IMPRIMABLES ET CONSIGNES PRÊTS`** *(répétition exclusivement interne à l'équipe ; **zéro recrutement externe, zéro entretien avec des participants extérieurs, aucune modification de `src/` ni de `P1_1_SPECIFICATION_v0.3.md`, aucune approbation définitive des règles du futur prétest externe, aucune déclaration de conformité juridique/RGPD et aucune prétention de validation scientifique**).*  
**Date :** 10 novembre 2026  
**Documents de référence :** [`L11_FORMULATIONS_CONSOLIDEES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L11_FORMULATIONS_CONSOLIDEES.md), [`L12_ARBITRAGES_EDITORIAUX.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L12_ARBITRAGES_EDITORIAUX.md), [`L13_PROTOCOLE_PRETEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L13_PROTOCOLE_PRETEST_COGNITIF.md), [`L14_KIT_CARTES_MAXDIFF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L14_KIT_CARTES_MAXDIFF.md), [`L15_SUPPORTS_PRESENTATION_VARIANTES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L15_SUPPORTS_PRESENTATION_VARIANTES.md), [`L16_GUIDE_ENQUETEUR.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L16_GUIDE_ENQUETEUR.md), [`L17_GRILLE_OBSERVATION_ENTRETIENS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L17_GRILLE_OBSERVATION_ENTRETIENS.md), [`L18_CONSENTEMENT_ET_ANONYMISATION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L18_CONSENTEMENT_ET_ANONYMISATION.md), [`L20_VERROUILLAGE_PROTOCOLE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L20_VERROUILLAGE_PROTOCOLE_PRETEST.md), [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md), [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py) et [`designs_N6_to_N13.json`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.json).

> **Rappel épistémique (`L20`) :**
> - **`[FAIT VÉRIFIÉ]`** : constat vérifié directement dans les fichiers, scripts ou sorties d'exécution du dépôt.
> - **`[DÉCISION ACTÉE]`** : choix méthodologique arrêté pour le prétest `L13` ou pour le dispositif de dry run.
> - **`[PROPOSITION À VALIDER]`** : orientation préparée et soumise à validation humaine explicite.
> - **`[INFORMATION MANQUANTE]`** : point non tranché par le dépôt qui reste à arbitrer humainement.

---

## 1. Relevé de décision éditorial (`DOM-02` et `DOM-05`) — Arbitré et harmonisé `[DÉCISION ACTÉE]`

### 1.1 Décisions éditoriales validées et appliquées `[DÉCISION ACTÉE]`

Par décision du 10/11/2026 tranchant la divergence relevée dans [`L20_VERROUILLAGE_PROTOCOLE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L20_VERROUILLAGE_PROTOCOLE_PRETEST.md) (§ 4) sans modifier aucun autre domaine (`DOM-01`, `DOM-03`, `DOM-04`, `DOM-06`, `DOM-07`, `DOM-08`), les formulations de `L11` § 2 ont été validées :

1. **`DOM-02` :** formulation retenue — *« Le pouvoir d'achat et les salaires, l'organisation du travail et des activités non rémunérées, **le temps de vie, les entreprises** et les choix d'impôts et de budget. »* (`27 mots`).
2. **`DOM-05` :** formulation retenue — *« Le climat et les risques naturels, la production et **le prix de l'énergie**, la gestion de l'eau et de la nature, l'agriculture et l'alimentation. »* (`24 mots`).

> **État actuel dans le dépôt `[FAIT VÉRIFIÉ]` :** Les harmonisations documentaires ont été **appliquées** dans `L11`, `L13`, `L14` et `L15` (et tracées dans `L20` § 4.2), sans altérer les formulations détaillées des huit domaines ni modifier aucun autre domaine. L'audit des décomptes de mots en unités séparées par des espaces a également corrigé `DOM-01` (`30 mots`), `DOM-03` (`21 mots`) et `DOM-08` (`23 mots`) dans `L11` et `L14`, et aligné le renvoi `DOM-04` de `L15` § 7 sur `L14` § 3.

### 1.2 Harmonisations appliquées dans le référentiel

| Fichier | Emplacement exact | Avant harmonisation | Après harmonisation appliquée | Nature de l'édition |
|---|---|---|---|---|
| [`L11_FORMULATIONS_CONSOLIDEES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L11_FORMULATIONS_CONSOLIDEES.md) | § 1 (`DOM-02`, `DOM-05`) et § 2 (`DOM-01`, `DOM-03`, `DOM-08`) | Écarts § 1 (`soutien aux entreprises`, `coût de l'énergie`) vs § 2 ; décomptes inexacts sur `DOM-01` (`28`), `DOM-03` (`23`), `DOM-08` (`24`). | Tableau § 1 aligné sur § 2 (`le temps de vie, les entreprises` ; `le prix de l'énergie`) ; décomptes corrigés (`30`, `21`, `23` mots) sans changer le texte des 8 domaines. | Harmonisation § 1 = § 2 et vérification factuelle des décomptes. |
| [`L13_PROTOCOLE_PRETEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L13_PROTOCOLE_PRETEST_COGNITIF.md) | En-tête (ligne 4) | Réserve *« sous réserve d'arbitrage humain sur les écarts § 1 / § 2 pour `DOM-02` et `DOM-05` »*. | Réserve obsolète supprimée ; mention de l'arbitrage appliqué (recrutement toujours bloqué). | Suppression d'une note de divergence devenue obsolète. |
| [`L14_KIT_CARTES_MAXDIFF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L14_KIT_CARTES_MAXDIFF.md) | § 1, § 2.1, § 3 | Note de divergence § 1 vs § 2 en § 1 ; plage `22 à 28 mots` ; décomptes `28/23/24` sur `DOM-01/03/08`. | Note de divergence obsolète supprimée ; décomptes alignés (`21 à 30 mots` ; `30/21/23`) ; références `L11 § 2` unifiées vers `L11` ; textes des 8 cartes et Section 4 inchangés. | Suppression de note obsolète et alignement des métadonnées. |
| [`L15_SUPPORTS_PRESENTATION_VARIANTES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L15_SUPPORTS_PRESENTATION_VARIANTES.md) | En-tête, § 1, § 2.3, § 4, § 6.1, § 7 | Mentions `L11 § 2` ; omission dans `DOM-04` § 7 de *« (les applications concrètes dans la vie scolaire y sont liées) »*. | Références `L11` unifiées ; § 2.3 recadré (dry run papier `2×2` autorisé vs points prétest externe non approuvés) ; renvoi `DOM-04` aligné sur `L14` § 3 ; identité stricte des textes participant vérifiée. | Mise en cohérence et identité stricte des supports A/B. |
| [`L20_VERROUILLAGE_PROTOCOLE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L20_VERROUILLAGE_PROTOCOLE_PRETEST.md) | § 2, § 3.4–3.5, § 4.1–4.2, § 5, § 7, § 8 | `DOM-02`/`DOM-05` en attente d'arbitrage. | Arbitrages et trace des changements consignés (§ 4.1–4.2) ; réexamen stratification ajouté (§ 3.5) ; statut mis à jour. | Journal des décisions et verrouillage. |

*(Précision de périmètre : les colonnes analytiques internes de `L11` — col. 6 « Risque de compréhension » et § 2 « Justification » — restent inchangées ; aucun texte des domaines `DOM-01`, `DOM-03`, `DOM-04`, `DOM-06`, `DOM-07`, `DOM-08` n'a été modifié.)*

### 1.3 Conséquences précises de ces décisions

1. **Conformité D1 V0.3 sur `DOM-02` :** la suppression de *« soutien aux entreprises »* retire une formulation à connotation prescriptive contraire à [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) (§ 3) et restaure la visibilité de l'enjeu `E11` (*« le temps de vie »*) au même titre que le travail et les activités non rémunérées.
2. **Propreté de la comparaison lexicale `DOM-02` vs `2B` :** la variante `2B` (`L11` § 2 ligne 48 et `L14` § 4 ligne 302) contient déjà *« l'équilibre des temps de vie, les entreprises »*. Conserver *« soutien aux entreprises »* dans la formulation de référence aurait introduit deux différences simultanées dans la comparaison en Section E (`L16`). Retenir `L11` § 2 isole proprement l'effet du titre (`pouvoir d'achat` et `budget public`) et du registre fiscal/prix.
3. **Registre courant sur `DOM-05` :** *« le prix de l'énergie »* correspond directement à la perception ordinaire des ménages et entreprises (factures, carburants) déjà visée par `E41` et annoncée à `24 mots` dans `L11` § 2, là où *« le coût de l'énergie »* peut prêter à une lecture technico-économique (coût de production complet).
4. **Effet immédiat sur le dry run interne :** `L14` et `L15` embarquent déjà les textes `L11` § 2. Le dry run interne peut donc tester immédiatement ces formulations exactes (et relever si *« le temps de vie, les entreprises »* ou *« le prix de l'énergie »* suscite une hésitation), tandis que l'alignement formel de `L11`, `L14` et `L15` interviendra dès validation finale du présent relevé de décision.
5. **Impact nul sur les autres documents :** aucune modification de `DOM-01`, `DOM-03`, `DOM-04`, `DOM-06`, `DOM-07`, `DOM-08`, ni de [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md). *(Note : après validation, il suffira d'actualiser le statut des lignes 1–2 du tableau de `L20` § 4.)*

---

## 2. Préparation de la répartition A/B, du tirage et de l'appariement des blocs

### 2.1 Audit factuel des scripts et données du dépôt `[FAIT VÉRIFIÉ]`

1. **Plan canonique `N = 8` vérifié dans [`designs_N6_to_N13.json`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.json) (clé `"8"`) et [`designs_N6_to_N13.csv`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.csv) :**
   - `B1: [2, 3, 1, 5]`, `B2: [8, 5, 4, 6]`, `B3: [3, 7, 8, 1]`, `B4: [6, 2, 3, 4]`, `B5: [1, 6, 5, 7]`, `B6: [4, 1, 2, 8]`, `B7: [5, 4, 7, 3]`, `B8: [7, 8, 6, 2]`.
   - `N = 8, b = 8, k = 4, r = 4`, histogramme de paires `{1: 8, 2: 20}`, connectivité algébrique $\mu_2 = 12.00$, $D_{\mathrm{eff}} = 0.995677$, équilibre exact des positions `[1, 1, 1, 1]`, chevauchement consécutif strict `= 1` (linéaire et `B8 → B1`).
2. **Randomisation vérifiée dans [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py) :**
   - Seule `randomize_pilot_n8_dihedral(base_blocks, rng)` ($\pi \in S_8 \times \tau \in S_4 \times D_8$) est valide pour le pilote `N = 8` (`1000/1000` invariants préservés sur `SEED_BASE + 8_000_000 + trial_index`, `SEED_BASE = 20261110`, re-vérifié en lecture seule sous Python 3.13.2).
   - `randomize_design_controlled` ($\sigma \in S_8$) brise le chevauchement consécutif `= 1` (`0/1000`) et `randomize_design_naive` brise l'équilibre des positions (`0/1000`).
3. **Éléments absents du dépôt `[INFORMATION MANQUANTE]` :**
   - Aucun script ni fichier JSON/CSV du dépôt ne définit : (a) une table d'affectation A/B pour `12–16` participants, (b) une règle d'appariement inter-bras des blocs MaxDiff, (c) un générateur d'ordre $\rho \in S_8$ pour le Panorama A / volet B, ni (d) une table de graines pré-allouées pour des entretiens hors ligne.

### 2.2 Propositions de travail pour la répartition A/B du futur prétest (`n = 12` à `16`) — **`[NON APPROUVÉES — À RÉEXAMINER]`**

> **Avertissement bloquant :** L'autorisation du dry run interne **ne vaut approbation définitive d'aucune règle** de stratification sociodémographique A/B, d'appariement des blocs entre A et B, ni du protocole de randomisation définitif du futur prétest externe. Les éléments de cette section demeurent **des propositions non actées soumises à réexamen**.

#### Réexamen critique de la stratification « sans diplôme supérieur / faible aisance »

La proposition initiale envisagée lors de la rédaction de `L21` consistait à définir deux strates binaires fusionnées :
- *Ancienne proposition `ST1` (non retenue en l'état) :* sans diplôme de l'enseignement supérieur **ou** faible aisance déclarée avec le vocabulaire institutionnel ;
- *Ancienne proposition `ST2` (non retenue en l'état) :* diplôme du supérieur **et** aisance moyenne à élevée.

**Pourquoi ces deux caractéristiques ne sont pas équivalentes et ne doivent pas être fusionnées sans justification :**
1. **Séparation conceptuelle :** le *niveau de diplôme* (parcours scolaire ou universitaire) et *l'aisance avec le vocabulaire institutionnel* (familiarité avec les termes de la vie publique) relèvent de dimensions distinctes. Une personne sans diplôme du supérieur peut posséder une excellente maîtrise du débat public ; à l'inverse, une personne diplômée du supérieur (ex. filière scientifique, technique ou peu politisée) peut éprouver une gêne réelle devant des termes comme *« finances publiques »* ou *« État de droit »*.
2. **Biais de fusion `OU` / `ET` :** réunir par un `OU` logique deux profils hétérogènes dans `ST1` empêche d'isoler ce sur quoi porte l'équilibre A/B et risque de déséquilibrer fortement les effectifs entre strates sur `n = 12–16`.
3. **Problème de recueil avant séance :** autant le diplôme peut être déclaré simplement avant assignation, autant l'aisance face au vocabulaire institutionnel ne dispose d'aucun indicateur pré-séance validé et risque d'être intrusive ou approximative lors de la prise de contact.

**Options distinctes à arbitrer avant tout recrutement externe *(aucune n'est actée)* :**
- **Piste 1 — Critère unique objectif de stratification (ex. diplôme) + suivi séparé de l'aisance :** si une stratification par micro-blocs de taille 2 (`AB`/`BA`) est retenue, stratifier uniquement sur le niveau de diplôme (*sans diplôme du supérieur* vs *diplôme du supérieur*), tout en consignant séparément l'aisance perçue dans `L17` § 4.1 et en contrôlant sa répartition dans `L19` § 1.1.
- **Piste 2 — Critère unique de littératie civique/aisance (si justifié explicitement) :** concevoir un indicateur court, neutre et non stigmatisant distinct du diplôme, sans fusionner les deux variables.
- **Piste 3 — Tirage équilibré sans stratification composite :** recourir à des micro-blocs `AB`/`BA` non stratifiés (ou à une liste de slots équilibrés) avec suivi séparé des 4 axes de diversification `L13` § 1.2 (`âge`, `territoire`, `diplôme`, `aisance / rapport au politique`) dans `L19`.

*(Rappel mécanique pour les micro-blocs éventuels de taille 2 : avec deux strates indépendantes, si les deux s'arrêtaient simultanément sur un effectif impair, l'écart maximal $|n_A - n_B|$ atteindrait `2` au lieu de `1`.)*

#### Table de référence indicative des effectifs (dans l'hypothèse de micro-blocs de taille `2`, non actée)

| Effectif total `n` | Répartition cible `A / B` | Structure par micro-blocs de taille `2` | Gestion du cas impair / arrêt | Conformité `L13` (`6–8` / bras) |
|---:|---|---|---|---:|
| **`12`** | **`6 A` / `6 B`** | `6` paires complètes (`AB`/`BA`), ex. `3` paires `ST1` + `3` paires `ST2` | Équilibre exact garanti si chaque strate a un effectif pair. | Oui (`6` / `6`) |
| **`13`** | **`7 A` / `6 B`** *ou* **`6 A` / `7 B`** | `6` paires complètes + `1` slot isolé issu du `7e` micro-bloc (`AB`/`BA`) | Le 13e participant reçoit aléatoirement `A` ou `B` (`p = 1/2` via le 1er élément du micro-bloc suivant) ; écart minimal incompressible `= 1`. | Oui (`6–7` / bras) |
| **`14`** | **`7 A` / `7 B`** | `7` paires complètes (`AB`/`BA`), ex. `4` paires `ST1` + `3` paires `ST2` *(ou `3 + 4`)* | Compléter la strate qui atteindrait un total pair à `14` ; si `ST1` et `ST2` restent toutes deux impaires (`7+7`), un dernier micro-bloc non bouclé pourrait produire `8/6` sauf équilibre sur `6+8`. | Oui (`7` / `7`) |
| **`15`** | **`8 A` / `7 B`** *ou* **`7 A` / `8 B`** | `7` paires complètes + `1` slot isolé issu du `8e` micro-bloc (`AB`/`BA`) | Écart minimal incompressible `= 1`, tiré équiprobablement pour le 15e participant. | Oui (`7–8` / bras) |
| **`16`** | **`8 A` / `8 B`** | `8` paires complètes (`AB`/`BA`), ex. `4` paires `ST1` + `4` paires `ST2` | Équilibre exact garanti à `8 A` / `8 B`. | Oui (`8` / `8`) |

### 2.3 Méthode de tirage et traçabilité `[PROPOSITION NON APPROUVÉE — À ARBITRER AVANT PRÉTEST EXTERNE]`

1. **Séparation des rôles et séquence d'allocation :** avant tout recrutement réel, générer une table d'allocation hors ligne par strate (`ST1-01..ST1-08`, `ST2-01..ST2-08`) sous forme d'enveloppes scellées ou de liste locale chiffrée **non consultée d'avance par la personne qui recrute** (l'enquêteur n'ouvre le slot suivant qu'une fois la personne éligible confirmée et affectée à `ST1` ou `ST2`).
2. **Tirage MaxDiff :** chaque instance MaxDiff est générée exclusivement par `randomize_pilot_n8_dihedral` (`audit_maxdiff_designs.py`) à partir de `designs_N6_to_N13.json` (`designs["8"]["blocks_1_indexed"]` converti en indices `0..7`), avec une graine entière explicite consignée avant séance.
3. **Traçabilité minimale dans un registre hors ligne dédié (`REGISTRE_TIRAGES`, strictement séparé de tout nom / consentement `L18`) :**
   - `participant_code` (`P01..P16`, ou `DR-A1..` pour le dry run) ;
   - `strate` (`ST1` / `ST2` / `DRY-RUN`) ;
   - `micro_bloc_id` et `variante_AB` (`A` / `B`) ;
   - `instance_maxdiff_id`, `graine_dihedral` et paramètres résultants ($\pi$, $\tau$, $s$, $\delta$, séquence `S1..S8` avec `HG/HD/BG/BD`) ;
   - `graine_ordre_rho` et ordre exact $\rho \in S_8$ affiché en Panorama A / livret B ;
   - `statut_seance` (`realisee`, `annulee_avant_seance`, `interrompue`).

### 2.4 Examen des options d'appariement des blocs à partir du dépôt `[FAIT VÉRIFIÉ]` + choix restants

Le dépôt prouve uniquement la validité combinatoire individuelle de `randomize_pilot_n8_dihedral`, **sans trancher l'appariement inter-bras ni l'ordre du volet B**. Trois choix restent donc à valider humainement avant le recrutement des 12–16 participants :

| Choix non tranché par le dépôt | Option 1 (recommandée dans `L20`) | Option 2 (alternative) | Conséquences précises de chaque option |
|---|---|---|---|
| **1. Appariement des blocs MaxDiff entre A et B** (`L15` § 2.3 #1, `L20` § 3.4 B1 vs B2) | **Option B1 — Appariement par paires (*yoking*) adossé aux micro-blocs `AB`/`BA` :** chaque micro-bloc de taille 2 (`1 A` + `1 B` dans la même strate) reçoit **la même instance** `randomize_pilot_n8_dihedral` et le même ordre $\rho \in S_8$. | **Option B2 — Tirages indépendants :** `12` à `16` appels indépendants à `randomize_pilot_n8_dihedral` (1 par participant). | - **B1 :** neutralise exactement le hasard du quatuor initial `S1` entre A et B sur petit effectif (`6–8`/bras), tout en conservant `6–8` séquences différentes au sein de chaque bras. *Conséquence logistique :* pour `n = 13` ou `15` (ou si un participant annule après assignation), le 13e/15e reste « non apparié » (`unpaired`) ; l'analyse qualitative compare alors globalement et note l'absence de jumeau.<br>- **B2 :** plus simple à gérer si des désistements surviennent ou si `n = 13`/`15`, mais sur `6–8` participants/bras le hasard peut concentrer en `S1` de B des cartes plus ambiguës (`DOM-07`, `DOM-08`), brouillant la comparaison qualitative A vs B aux séries 1–3. |
| **2. Ordre des 8 domaines dans le volet d'aide B** (`L15` § 2.3 #2, `L20` § 3.4 C1 vs C2) | **Option C1 — Même permutation aléatoire $\rho \in S_8$ que le Panorama A** (et partagée par la paire en B1), sans numérotation `1..8`. | **Option C2 — Ordre fixe** (alphabétique ou thématique `DOM-01..08`) dans le volet B alors que A est aléatoire. | - **C1 :** garantit l'équivalence stricte A/B ; exige seulement d'archiver la graine $\rho \in S_8$ (fonction absente d'`audit_maxdiff_designs.py`, simple `random.Random(seed).shuffle`).<br>- **C2 :** crée une asymétrie expérimentale entre A (ordre aléatoire exigé par `L13`) et B (ancrage fixe sur le premier domaine listé). |
| **3. Choix du jeu de graines** (`audit_maxdiff_designs.py` vs prétest hors ligne) | Consigner explicitement `N` graines entières distinctes dans le registre hors ligne avant passation *(ex. dérivées d'une base horodatée documentée)* et archiver les séquences générées. | Tirage manuel non reproductible ou graine non conservée. | Sans archivage des graines et des matrices `S1..S8`, il devient impossible de vérifier a posteriori si une hésitation en `S1` ou un effet `HG/HD/BG/BD` vient d'un bloc précis. |

> **Application limitée au dry run interne :** pour la répétition interne à blanc uniquement (`1 A + 1 B` minimum, idéalement `2 A + 2 B`), le dispositif autorisé utilise les deux instances vérifiées **`DR-INST-1`** et **`DR-INST-2`** (Annexe A et dossiers imprimables [`dry-run/`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/README.md)), avec partage de séquence A/B par instance pour les répétitions internes, **sans que ce choix d'essai interne ne vaille approbation de l'appariement B1, de l'ordre C1 ni du protocole de randomisation définitif pour le futur prétest externe `12–16`**.

---

## 3. Supports minimaux du dry run (zéro développement produit, `src/` intact)

### 3.1 Choix du médium le plus simple `[DÉCISION ACTÉE pour le dry run]`

**Dispositif retenu : Kit papier imprimé standardisé (`Carnet de passation par instance` + `Livret fermé Périmètre complet` + `Jeu de 8 cartons A6` + `Pochettes isolées D/E`).**

- **Pourquoi le papier plutôt qu'une maquette HTML locale pour ce dry run :**
  1. Respect absolu de la consigne « aucun développement de fonctionnalité produit » et `0` touche à `src/`.
  2. Évite qu'un prototype HTML bricolé hors `src/` n'introduise des bugs d'ergonomie web (responsive, focus, gestion d'état) qui parasiterait l'évaluation des **formulations**, de la **comparabilité A/B**, des **relances neutres** et du **chronométrage** (`L20` § 7).
  3. Permet une traçabilité physique immédiate et sans code de la disposition `2×2`, des retours arrière et de toute ouverture du panneau d'aide en Variante B.
  *(Si l'équipe décide ensuite de tester aussi la navigation clavier et les volets cliquables sur écran avant `P1.1-impl`, une maquette HTML statique pourra faire l'objet d'une vérification ergonomique complémentaire distincte.)*

### 3.2 Matérialisation des cinq exigences techniques sur le support papier

| Exigence | Solution papier retenue | Règle d'équivalence A / B |
|---|---|---|
| **1. Disposition des 4 cartes en `2×2`** | Chaque série `S1..S8` occupe **une feuille A4 paysage dédiée** structurée en **grille `2×2` strictement symétrique** (2 colonnes × 2 lignes, 4 cadres de dimensions, police et hiérarchie identiques : intitulé gras + description courte `L11` uniquement, sans numéro `1..8`). | Identique à 100 % en A et en B (le participant coche au stylo `( ) Devrait recevoir le plus d'attention` et `( ) Pourrait attendre` dans les cases correspondantes, ainsi que les options de série en pied de page). |
| **2. Randomisation et traçabilité des positions** | Convention fixe liant les 4 positions de `randomize_pilot_n8_dihedral` à la grille `2×2` :<br>- `Pos 1` = **Haut-Gauche (`HG`)**<br>- `Pos 2` = **Haut-Droite (`HD`)**<br>- `Pos 3` = **Bas-Gauche (`BG`)**<br>- `Pos 4` = **Bas-Droite (`BD`)**<br>Chaque feuille `S1..S8` porte en pied de page discret (`8 pt`, coin inférieur droit) le code technique d'instance et le mapping exact (ex. `DR-INST-1 | S1 | HG:DOM-03 · HD:DOM-06 · BG:DOM-01 · BD:DOM-07`). | Même gabarit, mêmes polices, aucun code `DOM-XX` en tête de carte chez le participant (`L14` § 2.1). |
| **3. Accès au périmètre complet des 8 domaines (A et B)** | **Livret A4 agrafé/relié** portant sur sa couverture **uniquement** : `« Voir le périmètre complet des 8 domaines »`. À l'intérieur : les 8 fiches `L14` § 3 / `L15` § 7 (intitulé, description courte, *Ce que ce domaine couvre*, *Traité dans d'autres domaines*, sans codes `DOM-XX` ni `E01..E68`), classées dans le **même ordre aléatoire $\rho \in S_8$**. | - **Variante A :** la page `2A` (Panorama) liste les 8 intitulés + descriptions courtes dans l'ordre $\rho \in S_8$, et **le livret fermé est posé sur la table dès `2A` et pendant `S1..S8`**.<br>- **Variante B :** pas de page `2A` ; la page `2B` montre la consigne seule et **le même livret fermé est posé sur la table dès `2B` et pendant `S1..S8`**. *(Même déploiement initial en A et en B : point `L15` § 2.3 #3 résolu symétriquement.)* |
| **4. Enregistrement des consultations du panneau d'aide en B (et en A)** | Parce que le livret est **physiquement posé fermé** sur la table, toute consultation exige un geste visible d'ouverture par le participant. L'enquêteur ne l'ouvre jamais pour lui. À chaque ouverture, l'enquêteur consigne dans `L17` (`[OBS]`) : **série en cours (`2A`/`2B`/`S1..S8`)**, **domaine(s) consulté(s)** (si visibles ou nommés) et **déclencheur** (`nb_ouvertures_perimetre`). | La trace d'ouverture en B et en A est relevée avec exactement la même grille `L17`. |
| **5. Séparation stricte des phases D et E** | **Pochette opaque `D`** (8 cartons de référence A6 `L14` sans code visible au recto + fiche `Strate 2.1` `L15` § 8) et **Pochette opaque `E`** (4 paires neutres `Formulation 1`/`Formulation 2` pour `1B`, `2B`, `7B`, `8B` `L14` § 4). | Restent fermées hors de la table jusqu'au moment exact prévu dans le conducteur (`Séquences 6–8`). |

*(Note sur le retour arrière et les signalements sur papier : le participant peut librement tourner les pages en arrière vers `S_{t-1}` pour corriger une croix — l'enquêteur note tout retour arrière dans `L17` `[OBS]` ; chaque carte `2×2` inclut une case discrète `[ ] Signaler cette carte` renvoyant à une ligne dédiée au bas de la feuille `S_t` reprenant les 4 cases `ItemComprehensionFlag` de `L15` § 6.2 sans interrompre ni remplacer la série.)*

---

## 4. Déroulé opérationnel complet du dry run interne (Conducteur Séquences 1 à 10)

> **Hypothèse de durée soumise au test empirique du dry run : `45 à 60 minutes`** (enveloppe participant `Séquences 1 à 9`, hors `10 min` de préparation et `10–15 min` de finalisation `L17` + bilan équipe en `Séquence 10`). **Ce total de `45–60 min` reste une hypothèse à confirmer ou réviser à l'issue du dry run (`L20` § 4 #5).**

### Préparation avant séance (`H - 10 min`, hors chrono participant)

- Vérifier que le dossier `DR-P1..` est complet : carnet `A` ou `B` correspondant à l'instance (`DR-INST-1` ou `DR-INST-2`), livret fermé *« Voir le périmètre complet des 8 domaines »* dans le même ordre $\rho \in S_8$, pochette `D` et pochette `E` fermées hors champ visuel, stylos/surligneur, chronomètre silencieux (ou montre) et grille papier `L17` Partie A prête.
- **Rappel au testeur interne :** pour simuler fidèlement le protocole sans biais de connaissance interne, un membre n'ayant pas rédigé `L11` joue le participant naïf (ou joue explicitement un rôle convenu : ex. lecteur peu familier du vocabulaire institutionnel vs lecteur très engagé), tout en notant mentalement ou à chaud ses observations d'ergonomie.

---

### Séquence 1 — Accueil et information du participant interne

- **Objectif :** installer le cadre neutre de l'entretien cognitif, simuler l'étape d'accueil/information (`L16` § A) pour en mesurer la durée réelle, et lancer l'entraînement au *think-aloud*.
- **Consigne (script `L16` § A adapté au cadre interne du dry run) :**
  1. Lire le script d'accueil `L16` § A.1–A.2 mot pour mot (*« Nous ne faisons ni un sondage... il n'y a aucune bonne ou mauvaise réponse... »*).
  2. **Adaptation explicite dry run interne :** préciser que dans le prétest réel une fiche `L18` complétée et validée sera remise et signée (ici, en répétition interne à blanc, **aucune donnée nominative ni aucune fiche `L18` n'est signée ni versée dans les données de l'étude**, mais on simule le temps de lecture d'une page d'information standard).
  3. Lire l'entraînement *think-aloud* `L16` § A.4 (*« dites tout ce qui vous passe par la tête... Je vais rester très silencieux pendant l'exercice... »*).
- **Durée cible :** **`5 à 7 minutes`** *(dont simulation de lecture d'information)*.
- **Données à relever (`L17`) :** heure exacte `T0` de début ; durée effective de la Séquence 1 ; compréhension immédiate de la consigne de pensée à voix haute ; éventuelles questions sur le cadre.
- **Points de vigilance :** ne pas sauter la simulation du temps de lecture de la fiche d'information (sinon le dry run sous-estimera la durée totale réelle de 2–3 minutes) ; ne jamais présenter le dry run comme un entretien de recrutement.

---

### Séquence 2 — Présentation de la Variante A ou de la Variante B

- **Objectif :** exécuter la variable expérimentale propre à la variante assignée (`2A` Panorama préalable vs `2B` Découverte progressive sans panorama) en garantissant la stricte symétrie d'information.
- **Consigne :**
  - **En Variante A :** remettre la feuille `Écran 1` puis la feuille `Écran 2A — Vue d'ensemble des huit domaines` (ordre $\rho \in S_8$). Lire `L16` § B.1 (Variante A) : *« Avant de commencer la première série, voici une vue d'ensemble des 8 grands domaines. Prenez le temps de la découvrir à votre rythme ; vous pouvez aussi ouvrir le livret "Périmètre complet des 8 domaines" si vous le souhaitez. Dites à voix haute ce qui vous vient à l'esprit pendant que vous parcourez cette page, puis passez à la Série 1 quand vous êtes prêt(e). »*
  - **En Variante B :** remettre la feuille `Écran 1` puis la feuille `Écran 2B — Prêt à commencer ?` (sans aucune liste des 8 domaines), avec le livret fermé posé à portée de main. Lire `L16` § B.1 (Variante B) : *« Nous allons commencer directement par la Série 1 sur 8, où vous découvrirez les quatre premières cartes. À tout moment, si vous vous demandez ce que recouvre un domaine ou où se trouve un sujet précis, vous avez accès au livret "Voir le périmètre complet des 8 domaines". Quand vous êtes prêt(e), nous passons à la Série 1. »*
- **Durée cible :** **`2 à 4 minutes`** en Variante A *(incluant la lecture du Panorama `2A`)* ; **`1 minute`** en Variante B *(consigne `2B` seule)*. *(Comptée dans l'enveloppe globale B–C de `12–18 min`.)*
- **Données à relever (`L17` `[OBS]`) :**
  - En A : durée exacte de lecture du Panorama `2A` en secondes (`duree_panorama_A_sec`), comportement (`Tout lu` / `Titres surtout` / `Décrochage visible`), ouvertures éventuelles du livret dès `2A`, verbatims spontanés sur `Panorama`.
  - En B : ouverture éventuelle du livret dès `2B`, remarques ou attentes exprimées avant `S1`.
- **Points de vigilance :** en B, **ne jamais laisser apercevoir** le contenu du livret fermé ni une fiche Panorama ; en A, ne donner aucune explication orale des domaines pendant la lecture du Panorama.

---

### Séquence 3 — Consignes MaxDiff (tronc commun A et B)

- **Objectif :** s'assurer que le participant comprend la question D1 V0.3, la notion de priorité relative (*« Pourrait attendre »*), la nature composite des cartes, les 4 états de réponse et le signalement orthogonal.
- **Consigne (`L15` § 3.1 + `L16` § B.1, identique A et B) :** lire ou faire lire l'Écran 1 puis rappeler les 4 points de `L16` § B.1 :
  1. La question récurrente : *« Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient recevoir le plus d'attention, et lesquels pourraient attendre ? »*
  2. La portée des domaines larges : *« Vous pouvez tout à fait choisir un domaine parce qu'un seul de ses grands sujets vous paraît prioritaire, sans avoir à approuver tout ce qui figure dans la carte ni une mesure politique précise. »*
  3. Le sens de *« Pourrait attendre »* : *« signifie uniquement que, parmi ces quatre cartes, d'autres enjeux passent avant dans cette série. Cela ne veut pas dire que le sujet est sans importance, ni que vous êtes contre. »*
  4. Les libertés de réponse : *« Je ne sais pas choisir »*, *« Impossible de départager cette série »* (avec motif facultatif), *« Passer cette série »*, retour à la série précédente, et *« Signaler un problème de formulation »* (la carte reste présente dans l'exercice).
- **Durée cible :** **`2 à 3 minutes`** *(incluses dans l'enveloppe `12–18 min` B–C)*.
- **Données à relever (`L17` `[OBS]`) :** questions immédiates sur « Pourrait attendre », sur la différence entre « Je ne sais pas » et « Impossible de départager », ou sur le droit au retour arrière.
- **Points de vigilance :** ne pas paraphraser librement la définition de « Pourrait attendre » ni commenter la longueur des cartes ; rester strictement fidèle aux mots du guide `L16`.

---

### Séquence 4 — Passation des huit séries `S1` à `S8` (en `2×2`, *think-aloud*)

- **Objectif :** observer la passation complète des 8 séries dans des conditions identiques entre A et B, en relevant les comportements spontanés sans interrompre le fil cognitif.
- **Consigne :** laisser le participant tourner les feuilles `S1` à `S8` une à une à son rythme en parlant à voix haute. L'enquêteur reste silencieux et n'intervient qu'avec les relances neutres prévues en Séquence 5.
- **Durée cible :** **`8 à 12 minutes`** *(portant l'ensemble Séquences 2 + 3 + 4 à **`12–18 minutes`** selon `L16` / `L20`)*.
- **Données à relever (`L17` `[OBS]`, avec numéro de série `S1..S8` et code `DOM-XX`) :**
  - durée approximative de `S1..S8` et pauses notables (`> 25 secondes`) ;
  - choix cochés (repérés pour pouvoir reprendre 3–4 cartes en Séquence 6) ;
  - retours en arrière vers une feuille précédente ;
  - **en B (et en A) :** chaque ouverture du livret fermé *« Voir le périmètre complet des 8 domaines »* (série `S_t`, durée, domaine cherché/consulté) ;
  - lectures partielles (ex. titre seul sans description courte, ou arrêt aux premiers mots) ;
  - recours aux options `Je ne sais pas choisir`, `Impossible de départager cette série` (+ motif), `Passer cette série`, ou signalement orthogonal ;
  - verbatims exacts à chaud et série à partir de laquelle un participant B verbalise spontanément avoir saisi l'ensemble des 8 domaines.
- **Points de vigilance :** ne jamais poser les questions de débriefing (`D.1`/`D.2`) pendant `S1..S8` pour éviter d'amorcer les séries suivantes (`L13` § 2.2) ; ne jamais toucher le livret fermé ni souffler où se trouve un sujet ; vérifier que le testeur interne n'omet pas involontairement de cocher deux cartes distinctes en `answered` ou ne laisse pas une feuille sans statut.

---

### Séquence 5 — Relances neutres en cours de passation (protocole transversal Séquences 2 & 4)

- **Objectif :** maintenir le *think-aloud* et répondre aux demandes du participant sans jamais orienter ses choix ni définir les domaines à la place du support.
- **Consignes exactes (table impérative `L16` § B.2) :**

| Situation observée | Relance autorisée (mot pour mot) | Interdit strict |
|---|---|---|
| Silence `> 15–20 s` | *« À quoi pensez-vous en regardant ces quatre cartes ? »* ou *« Qu'est-ce qui vous fait hésiter ? »* | Nommer une tension entre deux cartes (*« C'est dur entre climat et sécurité ? »*). |
| Demande de sens d'un mot ou d'une carte | *« Qu'est-ce que vous comprenez par cette formulation ? »* puis si blocage : *« Vous pouvez consulter le livret "Voir le périmètre complet des 8 domaines" si vous voulez voir ce qui est écrit sur le support, ou utiliser le signalement / passer si cela vous semble trop flou. »* | Définir le mot oralement ou citer un exemple de loi/mesure. |
| Demande *« Où est tel sujet (ex. laïcité, impôts, immigration) ? »* | *« Qu'est-ce que vous attendriez en lisant les cartes devant vous ? »* *(noter l'hésitation !)*. Puis si nécessaire : *« Vous pouvez ouvrir le livret "Périmètre complet des 8 domaines" si vous souhaitez vérifier, ou bien faire comme vous le feriez seul(e). »* | Indiquer quel domaine contient le sujet. |
| Refus de cocher *« Pourrait attendre »* | *« Comment comprenez-vous le libellé "Pourrait attendre" ici ? »* puis : *« Dans cet exercice, vous avez le droit soit de choisir la carte qui passerait après les trois autres dans cette série, soit d'utiliser "Impossible de départager" ou "Passer". »* | Forcer le choix d'un item *« Pourrait attendre »*. |
| Enchaînement rapide sans parler | *« Pouvez-vous me dire ce qui vous a guidé dans cette série ? »* | Féliciter, valider ou commenter le choix. |

- **Durée cible :** intégrée dans la Séquence 4 (`0 min` additionnelle dédiée).
- **Données à relever (`L17` `[OBS]`) :** toute demande de clarification posée par le participant, la relance employée par l'enquêteur, et tout écart éventuel de neutralité commis par l'enquêteur pendant le dry run *(élément clé de la grille § 5 !)*.
- **Points de vigilance :** en Variante B, si l'enquêteur suggère trop vite d'ouvrir le livret d'aide avant d'avoir posé *« Qu'est-ce que vous attendriez en lisant les cartes devant vous ? »*, il biaise le taux spontané d'ouverture du panneau d'aide !

---

### Séquence 6 — Recueil des raisons des choix (Détection mono-composante `L16` § D.1)

- **Objectif :** immédiatement après `S8` (mémoire fraîche), identifier quel sous-enjeu précis a motivé les choix MaxDiff afin de détecter les captures mono-composantes et distinguer priorité collective, vécu personnel et adhésion à une politique.
- **Consigne (`L16` § D.1) :** sortir de la **Pochette `D`** les **8 cartons A6 de référence** (sans montrer `1B/2B/7B/8B`). Reprendre **3 à 4 cartes** effectivement choisies par le participant (majoritairement en *« Devrait recevoir le plus d'attention »* et au moins une placée en *« Pourrait attendre »*, en priorisant `DOM-01`, `DOM-02`, `DOM-06`, `DOM-07`, `DOM-08` si choisies) et poser **mot pour mot** :
  > **« Lorsque vous avez choisi cette carte, à quel sujet pensiez-vous principalement ? »**
  Enchaîner avec les deux relances de cadrage :
  1. *« Y avait-il d'autres éléments dans cette carte qui comptaient aussi pour votre choix, ou seulement celui-là ? »*
  2. *« Est-ce qu'il y avait dans cette même carte un élément que vous trouvez beaucoup moins prioritaire, voire auquel vous n'adhérez pas ? »*
- **Durée cible :** **`5 à 7 minutes`** *(premier sous-bloc des `18–22 min` de `D`)*.
- **Données à relever (`L17` `[OBS]`) :** champ obligatoire `sujet_principal_evoque_OBS` (avec mention *Plus d'attention* vs *Pourrait attendre*), verbatims sur les éléments ignorés ou rejetés au sein d'une même carte.
- **Points de vigilance :** respecter exactement l'énoncé mot pour mot ; ne pas valider ou corriger le participant s'il a choisi une carte pour un sujet absent de cette carte (le noter comme confusion !).

---

### Séquence 7 — Débriefing spontané (`L16` § D.2, D.3, D.4 dont test court Strate 2.1)

- **Objectif :** recueillir à chaud, avant toute présentation des variantes lexicales `1B/2B/7B/8B`, la compréhension des 8 cartes, les confusions de frontières, les perceptions de largeur/redondance, la compréhension de *« Pourrait attendre »*, le retour sur A vs B, et la pertinence de la bascule Strate 2.1.
- **Consigne (`L16` § D.2–D.4) :**
  1. **Revue des 8 domaines (`D.2`, ~6–8 min) :** examiner les 8 cartons A6 (priorité à `DOM-01`, `02`, `06`, `07`, `08`, puis contrôle systématique de `DOM-03`, `04`, `05`) via le tronc commun (*« Avec vos propres mots, de quoi parle cette carte ? Quels sujets inclus / exclus ? Mots flous ou orientés ? »*) et les sondes ciblées du tableau `L16` § D.2 (notamment : `DOM-01` « solidarités », `DOM-02` « finances publiques / activités non rémunérées / temps de vie / retraites », `DOM-05` « prix de l'énergie », `DOM-06` vs `DOM-07` police/tribunaux, `DOM-07` vs `DOM-04` laïcité/numérique, `DOM-08` capture migrations vs commerce/défense).
  2. **Questions transversales (`D.3`, ~4 min) :** poser les 6 questions `L16` § D.3 (confusions/redondances, cartes trop larges ou incomparables, série la plus compliquée, sens exact de *« Pourrait attendre »* et des options de non-réponse, distinction priorité collective vs vécu perso vs mesure précise, sujets manquants / repérage du signalement).
  3. **Questions spécifiques A vs B et bascule Niveau 2 (`D.4`, ~3 min) :** poser les 2 questions propres à la variante (`A` Panorama ou `B` Découverte progressive + série de vue d'ensemble claire), puis sortir la **fiche Strate 2.1** (`L15` § 8) pour **un domaine large** sélectionné par le participant (`DOM-01`, `DOM-02`, `DOM-07` ou `DOM-08`) et poser la question `L16` § D.4.
- **Durée cible :** **`13 à 15 minutes`** *(cumul Séquences 6 + 7 = **`18–22 minutes`**, cible critique à chronométrer au dry run !)*.
- **Données à relever (`L17` `[OBS]`) :** `comprehension_spontanee_OBS`, `perimetre_percu_OBS`, `difficulte_lexicale_OBS`, `verbatim_OBS`, sens de « Pourrait attendre », distinction priorité/perso/adhésion, série de vue d'ensemble en B, utilité perçue de Strate 2.1.
- **Points de vigilance :** risque principal du conducteur = **dépassement horaire sur D.2** si l'enquêteur laisse digresser sur les opinions politiques au lieu de recentrer sur la **compréhension des textes et frontières** ; garder la **Pochette `E` fermée** jusqu'à la fin de cette séquence.

---

### Séquence 8 — Présentation des variantes lexicales (`1B`, `2B`, `7B`, `8B`)

- **Objectif :** après recueil complet du retour spontané, soumettre systématiquement les 4 paires de variantes lexicales dans des conditions neutres pour évaluer si elles modifient la compréhension ou l'interprétation.
- **Consigne (`L16` § E) :** ouvrir la **Pochette `E`** uniquement à ce moment. Présenter **une paire à la fois**, sur fiches neutres **`Formulation 1`** vs **`Formulation 2`** (sans jamais révéler laquelle est la formulation de référence, et en variant si possible l'ordre gauche/droite) :
  1. `DOM-01` vs `1B` (*« solidarités face aux risques »* vs *« protections sociales face aux aléas »*)
  2. `DOM-02` vs `2B` (*titre court* vs *« pouvoir d'achat et budget public »*)
  3. `DOM-07` vs `7B` (*titre sans laïcité* vs *« Justice, libertés, laïcité et démocratie »*)
  4. `DOM-08` vs `8B` (*« Place de la France... »* vs *« Europe, défense, commerce mondial et frontières »*)
  Pour **chacune des 4 paires**, poser les **5 questions obligatoires `L16` § E** :
  1. *« Est-ce que cette nouvelle formulation modifie ce que vous aviez compris du domaine ou votre interprétation ? Si oui, comment ? »* *(obligatoire)*
  2. *« Laquelle des deux formulations vous paraît la plus claire au premier regard, et pourquoi ? »*
  3. *« Quelle différence de sens percevez-vous entre les deux formulations ? Est-ce qu'elles parlent exactement de la même chose ou pas ? »*
  4. *« Laquelle vous semble couvrir le mieux l'ensemble du domaine, sans faire oublier un sujet important ni mettre trop l'accent sur un seul ? »*
  5. *« L'une des deux formulations vous paraît-elle orienter davantage la réponse ou suggérer une opinion politique ? Pourquoi ? »*
- **Durée cible :** **`7 à 10 minutes`** *(soit ~2 min par paire)*.
- **Données à relever (`L17` Onglet 3 `03_Debriefing_Lexical`) :** `modifie_comprehension_ou_interpretation_OBS`, `precision_modification_OBS`, `plus_claire_OBS`, `raison_clarte_OBS`, `difference_sens_percue_OBS`, `meilleure_couverture_OBS`, `raison_couverture_OBS`, `perception_orientation_OBS`, `raison_orientation_OBS`.
- **Points de vigilance :** ne pas se contenter d'un « je préfère la 2 » sans noter les raisons ; ne pas dépasser `10 min` si la fatigue se fait sentir après 45 minutes d'entretien.

---

### Séquence 9 — Clôture côté participant (`L16` § F)

- **Objectif :** recueillir une dernière vérification sur d'éventuels sujets absents et clore proprement la séance chronométrée.
- **Consigne (`L16` § F) :**
  1. Poser mot pour mot : **« Y a-t-il un sujet important concernant les choix collectifs pour la France que vous auriez voulu voir apparaître et qui ne figure pas dans ces huit domaines ? »**
  2. Lire le message de remerciement `L16` § F.2 (adapté dry run interne : rappel qu'aucune donnée n'est enregistrée en base ni conservée pour l'étude externe), demander si le participant-testeur a une remarque à chaud sur le déroulement, et noter l'heure exacte `T_fin`.
- **Durée cible :** **`3 minutes`**.
- **Données à relever (`L17` `[OBS]`) :** `sujets_absents_cloture_F_OBS` (verbatim exact même si « Non, tout y est ») ; durée totale réelle `T_fin - T0` ; niveau de fatigue auto-déclaré ou observé.
- **Points de vigilance :** ne pas couper le chronomètre avant la fin de la réponse à F.1 afin de mesurer le vrai temps de face-à-face.

---

### Séquence 10 — Remplissage finalisé de `L17` et débriefing interne à chaud *(post-séance)*

- **Objectif :** vérifier la praticabilité réelle de la grille [`L17`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L17_GRILLE_OBSERVATION_ENTRETIENS.md) (saisie directe `[OBS]` + codage séparé `[INTERP]` + compatibilité CSV 4 onglets), remettre le kit matériel en état, puis remplir la grille de réussite du dry run (§ 5).
- **Consigne :**
  1. **En séance (pendant Séquences 1–9) :** l'enquêteur (ou le binôme observateur) remplit exclusivement la **Partie A `[OBS]`** de `L17` (champs 1–10 et fiches § 4.1–4.3).
  2. **Immédiatement après la clôture (`5–10 min` hors chrono participant) :**
     - relire et compléter les verbatims `[OBS]` manquants à chaud sans y injecter d'interprétation ;
     - remplir séparément la **Partie B `[INTERP]`** (champs 11–17 : `comprehension_statut_INTERP`, `confusion_INTERP`, `largeur_percue_INTERP`, `selection_mono_composante_INTERP`, `gravite_INTERP`, `note_analytique_INTERP`, `proposition_correction_INTERP`) ;
     - tester l'insertion d'une session dans la structure des 4 CSV (`01_Observations`, `02_Synthese_Participant`, `03_Debriefing_Lexical`, `04_Synthese_Domaine`) ;
     - ranger séparément les 4 fiches `1B/2B/7B/8B` dans la Pochette `E` et la fiche `Strate 2.1` dans la Pochette `D` ;
     - consigner le retour du participant-testeur interne sur les frictions logistiques et remplir la grille § 5 ci-dessous.
- **Durée cible :** **`10 à 15 minutes`** *(hors enveloppe `45–60 min` de l'entretien — à mesurer pour estimer la charge d'enquêteur entre deux entretiens réels)*.
- **Données à relever :** taux de complétude des champs obligatoires `L17` (`OBS` vs `INTERP`), friction de saisie en direct (peut-on mener + noter seul ou un binôme observateur est-il recommandé ?), concordance entre les croix sur les feuilles `S1..S8` (`HG/HD/BG/BD`) et le journal `L17`.
- **Points de vigilance :** marquer tous les fichiers/feuilles d'essai du tampon **`DRY-RUN INTERNE — NE PAS INCLURE DANS L'ÉCHANTILLON 12–16`** ; ne pas mélanger les notes de fonctionnement logistique (ex. « police trop petite ») avec les codes analytiques de compréhension éditoriale.

---

## 5. Critères de réussite du dry run et grille d'évaluation

### 5.1 Qualification des constats : problème bloquant vs amélioration de confort

- **Problème bloquant (`[BLOQUANT]`) :** tout défaut qui compromet la validité procédurale du prétest (asymétrie involontaire A vs B, fuite prématurée de `1B/2B/7B/8B`, rupture du plan `N=8`, perte de traçabilité `2×2` ou du panneau d'aide B, intervention directive de l'enquêteur, impossibilité de renseigner les champs obligatoires `L17`, ou durée dépassant fortement le cadre au point de provoquer un abandon ou une amputation de séquence). **Tout problème bloquant impose une correction documentée + un contre-essai ciblé avant toute autorisation de passage aux validations pré-recrutement.**
- **Amélioration de confort (`[CONFORT]`) :** tout ajustement matériel ou rédactionnel mineur qui facilite le geste d'entretien sans altérer les formulations `L11`, la symétrie A/B ni la grille `L17` (ex. espacement des cases à cocher sur A4, taille des marges de prise de notes dans `L17`, ajout d'un repère visuel de timing sur le pense-bête enquêteur, agrafage plus pratique du livret). **Notée et corrigée avant impression finale, sans remettre en cause la tenue du protocole.**

### 5.2 Grille d'évaluation du dry run (9 critères obligatoires)

| # | Dimension vérifiée | Critère factuel de réussite (`OK`) | Seuil / définition d'un problème **`[BLOQUANT]`** | Exemple typique d'amélioration de **`[CONFORT]`** | Résultat essai (`A` / `B`) |
|---|---|---|---|---|---|
| **1** | **Absence de différence involontaire A vs B dans les tâches** | Mêmes 8 formulations `L11`, même consigne Écran 1, mêmes 8 séries `2×2`, même livret fermé, temps d'instruction hors lecture Panorama `2A` équivalent à ±1 min. | Différence de texte entre supports A et B ; accès involontaire à une vue globale avant `S1` en B ; différence de consigne orale donnée par l'enquêteur. | Harmoniser la mise en page de l'en-tête entre page `2A` et page `2B`. | `[ ] OK` · `[ ] Bloq.` · `[ ] Conf.` |
| **2** | **Compréhension des consignes** | Consigne D1 V0.3, sens relatif de *« Pourrait attendre »*, domaines composites, 4 états de réponse et signalement orthogonal compris sans explication orale improvisée. | L'enquêteur doit improviser une reformulation hors script pour que le testeur comprenne la tâche ou la différence *« Je ne sais pas »* / *« Impossible de départager »*. | Mettre en gras un mot clé sur l'Écran 1 ou aérer la liste à puces sans changer les mots. | `[ ] OK` · `[ ] Bloq.` · `[ ] Conf.` |
| **3** | **Cohérence des huit séries (`S1..S8`)** | Exactement 8 séries de 4 cartes `2×2`, `0` doublon intra-série, chaque domaine vu `4` fois (`[1,1,1,1]` en `HG/HD/BG/BD`), chevauchement consécutif `= 1`, retour arrière fluide. | Erreur d'assemblage ou de collage sur une feuille `S1..S8` ; carte manquante ou dupliquée ; perte du fil de pagination lors d'un retour arrière. | Numéroter plus lisiblement les onglets de page `Série 1/8` à `Série 8/8` en coin supérieur. | `[ ] OK` · `[ ] Bloq.` · `[ ] Conf.` |
| **4** | **Accessibilité du périmètre complet (A et B)** | En A et en B, le livret *« Voir le périmètre complet des 8 domaines »* est repéré immédiatement, consultable à tout moment sans perdre la série en cours, et dépourvu de codes `DOM-XX`/`E01..E68`. | En B, le testeur ne comprend pas qu'il peut ouvrir le livret ou n'ose pas y toucher ; code technique visible côté participant ; perte ou altération d'une réponse lors de l'ouverture. | Ajouter un intercalaire cartonné rigide ou un titre plus lisible sur la couverture du livret fermé. | `[ ] OK` · `[ ] Bloq.` · `[ ] Conf.` |
| **5** | **Neutralité des relances** | L'enquêteur respecte la table `L16` § B.2 : `0` définition orale de domaine, `0` exemple politique personnel, `0` guidage vers une carte, `0` incitation forcée sur *« Pourrait attendre »*. | Au moins une intervention directive non rattrapable orientant une attribution ou défendant une formulation pendant `2A`/`2B`/`S1..S8` ou `D`. | Préparer un carton pense-bête plastifié avec les 5 phrases exactes de `L16` § B.2 devant l'enquêteur. | `[ ] OK` · `[ ] Bloq.` · `[ ] Conf.` |
| **6** | **Bon moment de présentation des variantes lexicales** | Les fiches `1B`, `2B`, `7B`, `8B` restent scellées hors vue pendant `S1..S8` et tout le débriefing `D`, puis sont toutes les 4 montrées en `E` en mode neutre `Formulation 1`/`Formulation 2`. | Toute exposition, lecture ou évocation orale d'une variante `1B/2B/7B/8B` avant la Séquence 8 (`E`), ou oubli d'une des 4 paires. | Étiqueter en rouge la pochette `E` : *« NE PAS OUVRIR AVANT FIN DE D.4 »*. | `[ ] OK` · `[ ] Bloq.` · `[ ] Conf.` |
| **7** | **Complétude et utilisabilité de `L17`** | Saisie `[OBS]` en direct exploitable ; ouvertures du livret B consignées ; `≥ 90 %` des réactions clés + `100 %` des champs obligatoires (`sujet_principal_evoque_OBS`, `modifie_comprehension_ou_interpretation_OBS`, clôture `F`) renseignés ; séparation `[OBS]`/`[INTERP]` respectée et exportable dans les 4 CSV. | Impossibilité de prendre des notes en direct sans ralentir ou casser l'entretien ; confusion `[OBS]`/`[INTERP]` ; oubli systématique de relever les ouvertures du livret B ou le numéro de série. | Élargir les lignes du bloc `Partie A` imprimé ou prévoir un binôme enquêteur + observateur si la charge est trop élevée seul. | `[ ] OK` · `[ ] Bloq.` · `[ ] Conf.` |
| **8** | **Durée et fatigue** | Chronométrage réel de chaque séquence mesuré : `Seq 1` (`___` vs `5–7`), `Seq 2–4` (`___` vs `12–18`), `Seq 6–7` (`___` vs `18–22`), `Seq 8` (`___` vs `7–10`), `Seq 9` (`___` vs `3`), **Total** (`___` vs `45–60 min`). Pas de décrochage d'attention empêchant la Section E/F. | Total `> 65–70 min` ou fatigue manifeste contraignant à écourter/bâcler `E` ou `F` ; impossibilité de tenir `D` en `18–22 min` sans sacrifier des domaines. *(Déclenche soit un allègement de relances/timing validé, soit un ajustement officiel de la durée annoncée.)* | Placer un repère de chrono intermédiaire à `T0 + 25 min` (fin de `S8`) et `T0 + 45 min` (fin de `D.4`). | Durée A : `___ min`<br>Durée B : `___ min`<br>`[ ] OK` · `[ ] Bloq.` |
| **9** | **Traçabilité des ordres et des positions** | Correspondance 100 % exacte entre registre hors ligne, code pied de page `S1..S8`, positions `2×2` (`HG/HD/BG/BD`), ordre $\rho \in S_8$ et lignes saisies dans `L17`. | Impossibilité de reconstituer a posteriori quelle carte était en `HG/HD/BG/BD` lors d'une hésitation, ou divergence entre le livret B et l'ordre $\rho \in S_8$ archivé. | Ajouter une case à cocher de contrôle d'instance sur la première page de `L17`. | `[ ] OK` · `[ ] Bloq.` · `[ ] Conf.` |

---

## 6. Synthèse des décisions prises, points non approuvés et limites

### 6.1 Décisions prises pour la conduite du dry run interne `[DÉCISION ACTÉE pour le dry run]`
- **Arbitrages éditoriaux appliqués :** `DOM-02` (*« le temps de vie, les entreprises »*) et `DOM-05` (*« le prix de l'énergie »*) alignés dans `L11`, `L13`, `L14`, `L15` et tracés dans `L20` § 4.2.
- **Dispositif autorisé pour le dry run interne :** support **papier**, disposition en grille **`2×2`** (`Pos 1 = HG`, `Pos 2 = HD`, `Pos 3 = BG`, `Pos 4 = BD`), **livret de périmètre complet accessible** posé fermé sur la table dès `2A`/`2B`, instances vérifiées **`DR-INST-1` et `DR-INST-2`**, réalisation d'au moins **1 répétition A et 1 répétition B** (idéalement **2 répétitions par variante** si les disponibilités le permettent).
- **Dossiers et consignes prêts :** les carnets imprimables, livrets, pochettes `D`/`E`, consignes de passation et le modèle de compte rendu factuel figurent dans [`dry-run/`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/README.md).
- **Séparation stricte :** toutes les séances sont explicitement identifiées **`DRY-RUN INTERNE`** et **exclues de tout échantillon futur (`P01..P16`)**.

### 6.2 Points NON APPROUVÉS par la présente autorisation (restant ouverts avant tout prétest externe)
1. **Stratification sociodémographique A/B (`§ 2.2` et `L20` § 3.5) :** **non approuvée.** En particulier, la proposition *« sans diplôme supérieur / faible aisance »* doit être réexaminée — ces deux caractéristiques ne sont pas équivalentes et ne doivent pas être fusionnées sans justification.
2. **Règle d'appariement des blocs entre A et B (`§ 2.4` B1 vs B2) :** **non approuvée** pour le futur prétest externe (l'usage d'instances appariées dans `DR-INST-1`/`DR-INST-2` vaut uniquement pour l'essai interne).
3. **Protocole de randomisation définitif du futur prétest (`§ 2.3`, ordre C1 vs C2 et table des graines `P01..P16`) :** **non approuvé.**
4. **Recrutement externe et entretiens avec des participants extérieurs (`n = 12–16`) :** **non approuvés / bloqués.**
5. **Conformité juridique ou RGPD (`L20` § 6 & `L18`) :** **aucun engagement de conformité RGPD sans validation compétente** ; les 10 points bloquants de `L20` § 6 demeurent à lever avant tout contact extérieur.

### 6.3 Portée méthodologique stricte et compte rendu obligatoire après le dry run
Ce dry run interne vérifie exclusivement l'opérabilité logistique, la symétrie matérielle A/B, la tenue du chronomètre, la neutralité de l'enquêteur et la fiabilité du recueil `L17`. **Il ne permet en aucun cas de tirer des conclusions sur la neutralité statistique ou la validité scientifique des huit domaines, et ne se substitue ni au prétest cognitif réel (`12–16` participants) ni au pilote `P1.1 V0.3`.**

Après exécution, rédiger le **compte rendu factuel** ([`dry-run/MODELE_COMPTE_RENDU_FACTUEL_DRY_RUN.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/MODELE_COMPTE_RENDU_FACTUEL_DRY_RUN.md)) en distinguant systématiquement les **observations** des **interprétations** sur :
- la durée réelle de chaque séance ;
- les problèmes de compréhension des consignes ;
- les erreurs de manipulation ou de présentation ;
- les problèmes d'accès au périmètre complet ;
- les difficultés de remplissage de `L17` ;
- les différences procédurales observées entre A et B ;
- les corrections nécessaires avant le prétest externe.

---

## 7. Statut opérationnel

> **Verdict : `DRY RUN INTERNE AUTORISÉ — DOSSIERS IMPRIMABLES PRÊTS`**
>
> Les quatre dossiers d'essai (`DR-A1`, `DR-B1`, `DR-A2`, `DR-B2`), les deux livrets de périmètre complet (`DR-INST-1`, `DR-INST-2`), les pochettes `D` et `E`, les consignes de passation et le modèle de compte rendu factuel sont prêts à imprimer dans [`docs/editorial/referentiel-v1/dry-run/`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/README.md).
>
> *(Rappel bloquant : aucun changement dans `src/`, aucun changement dans `P1.1 V0.3`, aucun recrutement externe, aucun entretien avec des participants extérieurs, aucun engagement de conformité RGPD sans validation compétente.)*

---

## Annexe A — Jeu d'instances vérifié pour impression immédiate du dry run (`2` à `4` séances internes)

Les deux instances ci-dessous ont été générées directement avec la fonction existante `randomize_pilot_n8_dihedral` de [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py) sur le plan canonique `N = 8` de [`designs_N6_to_N13.json`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.json) (vérifiées via `evaluate_design` sous Python 3.13.2 : `position_balance_exact = True`, `item_freq_uniform = True`, `duplicate_block_count = 0`, `max_consecutive_overlap = 1`, `max_cyclic_consecutive_overlap = 1`, `pair_histogram = {1: 8, 2: 20}`, `d_efficiency_vs_ideal = 0.995677`).

*(Note de transparence : les entiers de graine ci-dessous sont des graines d'essai interne uniquement ; aucune règle de graine de session n'existe dans le dépôt pour l'étude `12–16`.)*

### Instance `DR-INST-1` *(Paire d'essai 1 : `DR-A1` en Variante A et `DR-B1` en Variante B)*
- **Graine `randomize_pilot_n8_dihedral` :** `101` (essai interne) · **Graine ordre $\rho \in S_8$ :** `201` (essai interne)
- **Ordre aléatoire $\rho \in S_8$ (Panorama `2A` et Livret complet A/B, sans code visible) :**
  1. *Climat, énergie, environnement et agriculture* (`DOM-05`)
  2. *Justice, libertés publiques et démocratie* (`DOM-07`)
  3. *Place de la France en Europe et dans le monde* (`DOM-08`)
  4. *Santé et solidarités face aux risques de la vie* (`DOM-01`)
  5. *Éducation, formation, recherche et culture* (`DOM-04`)
  6. *Logement, territoires et mobilités* (`DOM-03`)
  7. *Sécurité des personnes et tranquillité publique* (`DOM-06`)
  8. *Économie, travail et finances publiques* (`DOM-02`)
- **Grilles `2×2` des 8 séries (`Pos 1 = HG`, `Pos 2 = HD`, `Pos 3 = BG`, `Pos 4 = BD`) :**

| Série | Haut-Gauche (`HG`) | Haut-Droite (`HD`) | Bas-Gauche (`BG`) | Bas-Droite (`BD`) |
|---|---|---|---|---|
| **S1** | `DOM-03` | `DOM-06` | `DOM-01` | `DOM-07` |
| **S2** | `DOM-06` | `DOM-04` | `DOM-02` | `DOM-05` |
| **S3** | `DOM-04` | `DOM-01` | `DOM-03` | `DOM-08` |
| **S4** | `DOM-07` | `DOM-02` | `DOM-08` | `DOM-06` |
| **S5** | `DOM-05` | `DOM-03` | `DOM-07` | `DOM-04` |
| **S6** | `DOM-08` | `DOM-05` | `DOM-06` | `DOM-01` |
| **S7** | `DOM-01` | `DOM-07` | `DOM-04` | `DOM-02` |
| **S8** | `DOM-02` | `DOM-08` | `DOM-05` | `DOM-03` |

### Instance `DR-INST-2` *(Paire d'essai 2 optionnelle : `DR-A2` en Variante A et `DR-B2` en Variante B)*
- **Graine `randomize_pilot_n8_dihedral` :** `102` (essai interne) · **Graine ordre $\rho \in S_8$ :** `202` (essai interne)
- **Ordre aléatoire $\rho \in S_8$ (Panorama `2A` et Livret complet A/B, sans code visible) :**
  1. *Logement, territoires et mobilités* (`DOM-03`)
  2. *Climat, énergie, environnement et agriculture* (`DOM-05`)
  3. *Santé et solidarités face aux risques de la vie* (`DOM-01`)
  4. *Économie, travail et finances publiques* (`DOM-02`)
  5. *Place de la France en Europe et dans le monde* (`DOM-08`)
  6. *Éducation, formation, recherche et culture* (`DOM-04`)
  7. *Sécurité des personnes et tranquillité publique* (`DOM-06`)
  8. *Justice, libertés publiques et démocratie* (`DOM-07`)
- **Grilles `2×2` des 8 séries (`Pos 1 = HG`, `Pos 2 = HD`, `Pos 3 = BG`, `Pos 4 = BD`) :**

| Série | Haut-Gauche (`HG`) | Haut-Droite (`HD`) | Bas-Gauche (`BG`) | Bas-Droite (`BD`) |
|---|---|---|---|---|
| **S1** | `DOM-01` | `DOM-04` | `DOM-07` | `DOM-08` |
| **S2** | `DOM-03` | `DOM-02` | `DOM-08` | `DOM-05` |
| **S3** | `DOM-07` | `DOM-03` | `DOM-06` | `DOM-04` |
| **S4** | `DOM-05` | `DOM-07` | `DOM-01` | `DOM-02` |
| **S5** | `DOM-04` | `DOM-08` | `DOM-05` | `DOM-06` |
| **S6** | `DOM-02` | `DOM-01` | `DOM-04` | `DOM-03` |
| **S7** | `DOM-08` | `DOM-06` | `DOM-02` | `DOM-07` |
| **S8** | `DOM-06` | `DOM-05` | `DOM-03` | `DOM-01` |

---

## Annexe B — Gabarit imprimable d'une feuille de série MaxDiff `2×2` *(voir dossiers complets pré-assemblés dans [`dry-run/`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/README.md))*

```text
================================================================================
DRY-RUN INTERNE — EXCLU DE TOUT ÉCHANTILLON FUTUR
Série [t] sur 8                                       (Livret fermé sur table :
                                       « Voir le périmètre complet des 8 domaines »)
--------------------------------------------------------------------------------
Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient
recevoir le plus d'attention, et lesquels pourraient attendre ?

Rappel : « Pourrait attendre » exprime uniquement une priorité relative dans cette
série ; cela ne signifie ni que l'enjeu est négligeable, ni que vous vous y opposez.
================================================================================

+--------------------------------------+  +--------------------------------------+
| [HG] {Intitulé du domaine}           |  | [HD] {Intitulé du domaine}           |
|                                      |  |                                      |
| {Description courte L11}             |  | {Description courte L11}             |
|                                      |  |                                      |
| ( ) Devrait recevoir le plus         |  | ( ) Devrait recevoir le plus         |
|     d'attention                      |  |     d'attention                      |
| ( ) Pourrait attendre                |  | ( ) Pourrait attendre                |
|                                      |  |                                      |
| [ ] Signaler un problème             |  | [ ] Signaler un problème             |
+--------------------------------------+  +--------------------------------------+

+--------------------------------------+  +--------------------------------------+
| [BG] {Intitulé du domaine}           |  | [BD] {Intitulé du domaine}           |
|                                      |  |                                      |
| {Description courte L11}             |  | {Description courte L11}             |
|                                      |  |                                      |
| ( ) Devrait recevoir le plus         |  | ( ) Devrait recevoir le plus         |
|     d'attention                      |  |     d'attention                      |
| ( ) Pourrait attendre                |  | ( ) Pourrait attendre                |
|                                      |  |                                      |
| [ ] Signaler un problème             |  | [ ] Signaler un problème             |
+--------------------------------------+  +--------------------------------------+

--------------------------------------------------------------------------------
Si vous ne pouvez pas comparer ces quatre cartes :
[ ] Je ne sais pas choisir
[ ] Impossible de départager cette série
[ ] Passer cette série
  Si « Impossible de départager cette série » (motif facultatif) :
  ( ) Ces domaines me paraissent tout aussi prioritaires les uns que les autres
  ( ) Ces domaines ne me semblent pas comparables entre eux
  ( ) Aucun de ces domaines ne devrait passer en premier
  ( ) Autre raison (préciser si souhaité) : __________________________________
--------------------------------------------------------------------------------
Signaler un problème sur une carte (facultatif — la série reste inchangée) :
Carte concernée (HG / HD / BG / BD) : ____
[ ] Formulation trop vague ou imprécise
[ ] Mot ou phrase difficile à comprendre
[ ] Ce sujet ne me paraît pas relever d'un choix collectif
[ ] Formulation perçue comme orientée ou partisane
Précision libre (facultative) : ______________________________________________
--------------------------------------------------------------------------------
                 [← Série précédente]                        [Série suivante →]
                 DRY-RUN INTERNE | {Code} | {Inst} | S[t] | HG/HD/BG/BD
================================================================================
```
*(Consigne d'impression : les 4 carnets pré-remplis `DR-A1`, `DR-B1`, `DR-A2`, `DR-B2` dans [`dry-run/`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/README.md) appliquent ce gabarit sans marqueurs `[HG]`/`[HD]`/`[BG]`/`[BD]` sur les cartes, en conservant uniquement le micro-repère technique discret en pied de page.)*
