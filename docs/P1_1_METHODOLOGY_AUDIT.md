# Civic Explorer — Audit méthodologique et spécification consolidée P1.1 (MaxDiff Case 1)

**Version :** 1.3 — mise en cohérence D1 V0.3 (historiques V1.0, V1.1 et V1.2 intégralement conservés)  
**Date :** 10 novembre 2026  
**Statut :** rapport d'audit historisé. **Les décisions consolidées en vigueur figurent désormais dans [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md), [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) (V0.3) et [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md).** Aucune implémentation applicative ni aucun prétest cognitif ne sont autorisés avant arbitrage humain du catalogue candidat [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) et respect des paliers définis en `P1_1_SPECIFICATION_v0.3.md` § 8.3.

### Historique des versions du rapport d'audit
- **V1.0 (10 novembre 2026) :** audit préparatoire initial (`§ 1` à `§ 10` ci-dessous, conservés à titre de trace historique).
- **V1.1 (10 novembre 2026) :** intégration de la revue indépendante ([`CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md)) et des orientations validées par le concepteur (`§ 11.1` à `§ 11.5`, conservées sans altération).
- **V1.2 / Patch V0.2.1 (10 novembre 2026) :** séparation orthogonale des états de réponse et signalements (`§ 11.6`), vérification reproductible `randomize_pilot_n8_dihedral` sur 1 000 graines distinctes, et distinction explicite des paliers de démarrage (conservée sans altération).
- **V1.3 / Consolidation D1 V0.3 (10 novembre 2026) :** mise en cohérence avec [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) et réexamen complet de l'unité de comparaison (`§ 12`), sans modification de D2–D4 ni du plan expérimental `N = 8, k = 4, r = 4` (référence `N = 7`).

**Documents de référence examinés :**
- `docs/P1_1_D1_DECISION_v0.3.md` *(ajouté en V1.3 — révision officielle de D1 validée par le concepteur)*
- `docs/P1_1_DECISIONS_AND_AUDIT_BRIEF_v0.2.md` (remplaçant `CIVIC_EXPLORER_P1_1_MAXDIFF_DESIGN_v0.1.md`, validant D2–D3 et cadrant D4 ; D1 révisée en V0.3)
- `docs/agent-prompts/CIVIC_EXPLORER_P1_1_DUAL_DIMENSION_DESIGN_v0.1.md`
- `docs/CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md` *(ajouté en V1.1)*
- `docs/00_PRODUCT_BRIEF.md`, `docs/01_ARCHITECTURE.md`, `docs/02_PRIVACY_SECURITY.md`, `docs/03_DATA_MODEL.md`, `docs/04_METHODS.md`, `docs/05_UX_INTERACTIONS.md`, `docs/06_TESTING_VALIDATION.md`, `docs/07_BACKLOG.md`, `docs/08_GOVERNANCE_CONTENT.md`, `docs/REFERENCES.md`, `AGENTS.md`
- État réel du prototype P0.2 (`src/domain/statements/*`, `src/lib/schemas/exploration.ts`, `src/lib/privacy/sessionGuards.ts`, `src/data/demo/provisional-themes.ts`, `src/features/exploration/*`, `next.config.ts`)

**Artefacts mathématiques auditables associés :**
- Script reproductible (Python 3 stdlib uniquement, zéro dépendance) : `docs/experiments/maxdiff/audit_maxdiff_designs.py`
- Rapport métriques complet ($N = 6$ à $13$) : `docs/experiments/maxdiff/METRICS_REPORT.md`
- Plans candidats exportés : `docs/experiments/maxdiff/designs_N6_to_N13.json` et `docs/experiments/maxdiff/designs_N6_to_N13.csv`

---

## Convention de statut épistémique dans ce document

Conformément aux exigences d'audit, chaque affirmation substantielle est rattachée à l'un de ces quatre statuts :
- **[Fait mathématique]** : propriété démontrée analytiquement ou vérifiée exhaustivement/numériquement par script déterministe reproductible.
- **[Fait dépôt]** : constat observé directement dans les documents ou le code P0.2 du dépôt.
- **[Décision validée D1–D3]** : contrainte déjà arbitrée par le concepteur dans `P1_1_DECISIONS_AND_AUDIT_BRIEF_v0.2.md`.
- **[Recommandation méthodologique]** / **[Hypothèse à tester]** : proposition argumentée ou choix de conception devant être validé par le responsable méthodologique / le concepteur ou testé empiriquement.

---

## 1. Résumé exécutif

1. **Réconciliation des cadrages (D1–D3 préservées) :** **[Fait dépôt]** Plusieurs documents existants (`03_DATA_MODEL.md`, `04_METHODS.md`, `05_UX_INTERACTIONS.md`, `07_BACKLOG.md`, `DUAL_DIMENSION_DESIGN_v0.1.md` et le code P0.2) divergent sur la numérotation des lots, l'origine des items, l'ordre du parcours, la randomisation, les états de réponse et les schémas JSON. **[Décision validée D1–D3]** Le cadrage `v0.2` résout trois choix structurants : le construit principal du premier MaxDiff est la **priorité relative des changements collectifs souhaités** (`D1`), l'origine des situations suit une **approche hybride** où les ajouts libres ne sont pas insérés automatiquement dans les blocs standardisés (`D2`), et l'unité de comparaison est une **situation concrète à voir évoluer**, homogène en granularité (`D3`).
2. **Séparation stricte des construits :** **[Recommandation méthodologique]** Le moteur P1.1 doit séparer de façon étanche six construits distincts (plus la faisabilité perçue) : (1) priorité relative de changement collectif, (2) préoccupation personnelle, (3) gravité perçue, (4) raisons/valeurs motivant le choix, (5) convictions causales/factuelles, (6) solutions/instruments politiques privilégiés. Aucune pondération numérique artificielle (ni 70/30, ni score composite) ne doit fusionner ces dimensions.
3. **Preuve mathématique sur les plans MaxDiff ($N = 6..13$, $k = 4$, $b = N$, $r = 4$) :** **[Fait mathématique]**
   - Un **BIBD exact** n'existe que pour **$N = 7$** ($\lambda = 2$, complément du plan de Fano $PG(2,2)$) et **$N = 13$** ($\lambda = 1$, plan projectif $PG(2,3)$). Pour $N \in \{6, 8, 9, 10, 11, 12\}$, un BIBD exact avec $b=N, r=4$ est **arithmétiquement impossible** ($\lambda = 12/(N-1) \notin \mathbb{Z}$).
   - Toutefois, pour **toutes les tailles $N \in \{6..13\}$**, il existe des plans (BIBD exacts ou quasi équilibrés) atteignant simultanément : fréquence uniforme $r_i = 4$, **zéro paire jamais comparée** ($\lambda_{ij} \ge 1$), **borne théorique minimale globale de variance des cooccurrences** ($\max \lambda_{ij} - \min \lambda_{ij} \le 1$), **graphe connexe** ($\lambda_2(L) \ge 11.32$), **D-efficacité $\ge 0.9938$** (99.38 % à 100 % de l'idéal continu), **zéro bloc dupliqué**, et **équilibre exact des positions `[1, 1, 1, 1]`** garanti par décomposition en 4 appariements parfaits (théorème de König/Hall).
   - **Limite statistique individuelle démontrée :** sous le modèle logit conjoint BWS Case 1 (Marley & Louviere, 2005) évalué à $\beta = 0$, avec $r = 4$ présentations par item, l'erreur-type asymptotique minimale d'un contraste individuel $\hat{\beta}_i - \hat{\beta}_j$ reste comprise entre **`0.897` et `0.969` logits** (IC 95 % $\approx \pm 1.76$ à $\pm 1.90$ logits). **[Fait mathématique]** Cela démontre formellement pourquoi P1.1 **ne peut revendiquer aucune estimation latente individuelle fiable** et doit s'en tenir à une restitution descriptive des observations brutes. *(Note historique V1.1 : interprétation corrigée en § 11.1 — ces SE ne prouvent pas une impossibilité mathématique absolue mais motivent un garde-fou de validité.)*
   - **Randomisation contrôlée vs naïve :** **[Fait mathématique]** Une vérification Monte Carlo (1 000 tirages par $N$) prouve qu'une randomisation naïve indépendante par bloc détruit l'équilibre exact des positions `[1, 1, 1, 1]` dans **100 % des sessions (`0/1000`)**, alors qu'une randomisation structurellement contrôlée ($\pi \in S_N$ sur les items, $\tau \in S_4$ globale sur les positions, $\sigma$ sur les blocs) le préserve dans **100 % des sessions (`1000/1000`)**. *(Note V1.1 : pour $N = 8$, la séquence pilote retient une transformation diédrale $D_8$ sur $\sigma$ afin de garantir aussi `max_consecutive_overlap = 1`, voir § 11.2.)*
4. **Parcours UX et formulations :** **[Hypothèse à tester]** L'ordre entre l'expression libre P0.2 et le panorama éditorial P1.1 crée un dilemme d'amorçage asymétrique (disponibilité spontanée vs cadrage éditorial). L'audit propose un parcours en 7 temps qui préserve les acquis de P0.2 tout en permettant d'évaluer expérimentalement deux ordres (Ordre A : P0.2 avant panorama vs Ordre B : panorama avant expression libre), et fournit 12 formulations contrastées à soumettre obligatoirement à des entretiens cognitifs avant toute déclaration de neutralité. *(Note historique V1.1 : les arbitrages V0.2 retiennent désormais le flux Présentation → MaxDiff → Situations manquantes / expression libre → Raisons comme parcours principal, avec test cognitif comparatif contre l'expression libre préalable — voir § 11.4.)*

---

## 2. Incohérences, tensions et lacunes identifiées entre les documents

| Thème | État dans les documents historiques (`00`–`08`, `AGENTS.md`) & P0.2 | État dans `DUAL_DIMENSION_DESIGN_v0.1.md` | État dans `P1_1_DECISIONS_AND_AUDIT_BRIEF_v0.2.md` | Diagnostic & impact |
|---|---|---|---|---|
| **1. Numérotation des lots et documents** | `07_BACKLOG.md` nomme `P1.1` = Accueil, `P1.2` = Expression libre, `P1.3` = MaxDiff démo, `P1.5` = Export. `P0.2` a déjà implémenté accueil `/parcours` + expression libre + structuration + confirmation + cartographie. | Nomme `P1.1` le moteur MaxDiff + couche raisons ; cite en en-tête `CIVIC_EXPLORER_P1_1_MAXDIFF_DESIGN_v0.1.md` (absent du dépôt) et modifie ses sections 1, 2, 3, 5, 9. | Remplace `MAXDIFF_DESIGN_v0.1` et nomme `P1.1` le présent chantier MaxDiff. | **Contradiction documentaire.** Risque de confusion sur le périmètre réel du prochain lot (`P1.1` vs `P1.3`) et sur les références mortes vers `MAXDIFF_DESIGN_v0.1`. |
| **2. Origine des items et insertion des ajouts libres** | `04_METHODS.md` §2 et `07_BACKLOG.md` (`P1.3`) évoquent « 4 à 6 éléments » de démonstration. P0.2 recueille des déclarations libres sans MaxDiff. | §4.1–4.2 rejette la liste spontanée comme source unique et propose une bibliothèque éditoriale ; §4.3 prévoit de **reconstruire un plan MaxDiff adapté** incluant l'enjeu ajouté par l'utilisateur après vérification de comparabilité. | **D2 valide l'approche hybride** : bibliothèque éditoriale pour MaxDiff standardisé, **sans insertion automatique** des ajouts libres dans les blocs MaxDiff (conservés comme éléments qualitatifs distincts). | **Contradiction directe entre `DUAL_DIMENSION` §4.3 et `v0.2` D2.** `v0.2` D2 fait foi et évite l'explosion de complexité combinatoire/biais de granularité. |
| **3. Ordre du parcours (P0.2 vs Panorama)** | `05_UX_INTERACTIONS.md` §1 et `ExplorationJourney.tsx` (P0.2) : 1. Expression libre → 2. Structuration → 3. Confirmation → 4. Cartographie → (puis MaxDiff). | §7 inverse le flux : 1. Accueil → 2. Panorama des situations → 3. Validation périmètre → 4. MaxDiff → 5. Raisons → 6. Synthèse → **7. Expression libre complémentaire**. | Ne fige pas l'ordre P0.2 / Panorama, renvoie l'arbitrage à l'audit et aux tests cognitifs. | **Tension UX majeure (amorçage).** Placer le panorama avant l'expression libre contamine la spontanéité de P0.2 ; placer P0.2 avant le panorama amorce le début de MaxDiff. |
| **4. Unité de comparaison** | `05_UX_INTERACTIONS.md` §2 parle de « sujets » ; `provisional-themes.ts` définit 10 thèmes larges (« Santé et protection sociale »). | §4.2 proscrit les mots-valises (« santé », « sécurité ») et demande des « situations concrètes » décrivant un problème ou changement souhaitable. | **D3** précise : une situation concrète à voir évoluer / changement souhaité, et **interdit** de mélanger problèmes actuels, changements souhaités, objectifs généraux, instruments et valeurs abstraites. | **Écart sémantique subtil** même entre D1 (qui parle tantôt de « changements » tantôt de « situations ») et D3. Doit être harmonisé en « évolution/changement souhaité face à une situation ». |
| **5. Formulation de la consigne MaxDiff** | `05_UX_INTERACTIONS.md` §2 : « Parmi ces sujets, lequel vous paraît le plus important à traiter ? Et lequel vous paraît le moins prioritaire... ? » | §3 rejette « compte le plus pour vous » ; propose : « Parmi ces situations, laquelle faudrait-il traiter avant les autres ? Et laquelle pourrait attendre ? » | **D1** propose une formulation de travail : « Quand il faudra faire des choix pour le pays, quels changements devraient passer avant les autres ? ... passer en premier et lesquelles pourraient attendre. » | **Trois formulations incompatibles.** D1 ajoute « pour le pays » (cadrage scalaire national potentiellement excluant pour enjeux locaux/européens) et oscille entre « changements » et « situations ». Toutes sont marquées non validées avant prétest. |
| **6. Paramètres du plan et randomisation** | `04_METHODS.md` §2 : blocs de 4 à 6 éléments ; `07_BACKLOG.md` `P1.3` : 4 à 6 éléments démo, « ordre stable au début ; randomisation à étudier plus tard ». | §9 renvoie au plan d'expérience révisé et §10.6 demande de tester l'effet d'ordre de présentation. | **D4** étudie $N = 6..13$, $k = 4$, $b = N$, $r = 4$, équilibre des positions `[1,1,1,1]`, randomisation contrôlée dès la conception. | **Écart de périmètre net.** Le plan à 4–6 items démo avec ordre stable (`P1.3`) est incompatible avec un plan équilibré à $N=6..13$ items randomisé de manière contrôlée (`D4`). |
| **7. Contrats de données `Statement` & `PriorityObservation`** | `03_DATA_MODEL.md` liste `instrument` et `importanceSelfReport` sur `Statement`, absents de `src/domain/statements/types.ts` et du schéma `.strict()` `src/lib/schemas/exploration.ts` ; inversement P0.2 a ajouté `sourceText`, `themeSelectionState` et `status`. | Introduit des objets non encore modélisés : situations éditoriales, signalements d'items flous/incomparables/manquants, explications libres, pistes de clarification, distinctions normatif/factuel. | Exige la conservation des écarts, graines, ordres présentés et séparation des dimensions. | **Divergence code/doc + lacune de schéma.** `PriorityObservation` dans `03_DATA_MODEL.md` ne contient ni `itemOrder` (positions affichées), ni distinction des motifs de passage (`incomparable`, `all_urgent`, `dont_understand`), ni référence de plan (`designId`, `designSeed`). `reject_both` vient du DCE et ne convient pas à 4 items. |
| **8. Gouvernance de la bibliothèque éditoriale** | `07_BACKLOG.md` et `08_GOVERNANCE_CONTENT.md` repoussent la gouvernance documentaire pluraliste à EPIC 3 (avant corpus acteurs). | §4.2 et §10.4 exigent une bibliothèque éditoriale discutée pluralistement et prétestée **dès P1.1**. | **D2** confirme la nécessité d'une bibliothèque éditoriale documentée, pluraliste et prétestée pour le MaxDiff standardisé. | **Dépendance organisationnelle critique.** En l'absence de comité pluraliste constitué pour P1.1, il faut explicitement étiqueter le premier jeu comme **jeu pilote / prototype (`pilot-v0.1`)** non prescriptif et bloquer toute publication grand public avant revue pluraliste. |
| **9. Choix des situations à expliquer** | Non présent dans `04_METHODS.md` ni `05_UX_INTERACTIONS.md`. | §5.1–5.2 : choix libre par l'utilisateur de 1 ou 2 situations après MaxDiff, mais question unique présumant que l'item choisi est « à traiter avant d'autres ». | D1 confirme l'exploration séparée des raisons sans score unique. | **Biais asymétrique dans `DUAL_DIMENSION` §5.2.** L'utilisateur doit aussi pouvoir expliquer pourquoi il a classé une situation en « pourrait attendre » ou pourquoi deux situations lui ont paru impossibles à départager. |

---

## 3. Décisions méthodologiques recommandées

### 3.1 Respect du socle validé (D1–D3)
Conformément à la section 2 de `P1_1_DECISIONS_AND_AUDIT_BRIEF_v0.2.md`, **D1, D2 et D3 sont traitées comme des contraintes de conception acquises** et ne sont pas remises en cause (aucune contradiction bloquante n'invalide ces trois choix ; les risques qu'elles induisent sont traités par des garde-fous explicites).

### 3.2 Taxonomie stricte des construits à ne jamais fusionner (Objectif A)

**[Recommandation méthodologique]** Dans les données, les algorithmes et l'interface, les construits suivants doivent rester **modélisés, collectés et restitués séparément** :

| Construit | Ce qu'il mesure / observe | Mode de recueil en P1.1 | Interdit absolu |
|---|---|---|---|
| **1. Priorité relative des changements souhaités** (`D1`) | Préférence ordinale relative sous contrainte de rareté (« lequel traiter avant / lequel pourrait attendre » dans un ensemble fini de situations). | **MaxDiff Case 1** (blocs de 4 situations, comptages bruts d'expositions, choix « premier », choix « attendre », abstentions/passages). | Ne pas en déduire une gravité absolue, une souffrance personnelle ou un soutien à une mesure précise. |
| **2. Préoccupation personnelle** | Ce qui inquiète ou touche personnellement la personne dans sa vie ou son horizon immédiat. | **Expression libre P0.2** (« Quelles sont les choses qui vous préoccupent le plus... ») + signalement optionnel hors MaxDiff. | Ne pas fusionner avec le rang MaxDiff ni supposer qu'une priorité collective reflète une préoccupation personnelle (ex. préoccupation sociotropique vs égotropique, Kinder & Kiewiet, 1981). |
| **3. Gravité perçue** | Intensité ou urgence absolue attribuée à un problème pris isolément (« grave / critique », indépendamment des autres). | **Hors P1.1** (ou annotation facultative future strictement séparée ; cf. `DUAL_DIMENSION` §2). | Ne pas inférer qu'un item choisi comme « pourrait attendre » est jugé « peu grave » — un citoyen peut juger *toutes* les situations graves tout en en séquençant une après d'autres. |
| **4. Raisons motivant les choix** | Principes moraux, conséquences humaines, horizons temporels, valeurs ou critères de justice invoqués pour justifier un arbitrage. | **Couche qualitative post-MaxDiff** sur 1 à 2 situations librement choisies par l'utilisateur (texte libre + pistes facultatives confirmées). | **Aucune pondération automatique** (pas de 70/30, pas de multiplicateur de score, pas d'attribution automatique de valeurs depuis le texte sans confirmation). |
| **5. Convictions causales / factuelles** | Croyances empiriques sur ce qui cause la situation ou sur son évolution factuelle (« les délais augmentent parce que... »). | **Extraction / déclaration séparée et confirmée** lors de l'explication des raisons (ou champ dédié « ce qui explique ou cause cette situation selon vous »). | Ne pas corriger comme un « fait » le jugement de valeur, et ne pas valider comme « fait » une affirmation causale non sourcée (préparer le lien futur avec le comparateur documentaire EPIC 3). |
| **6. Solutions politiques privilégiées** | Instruments, politiques publiques, moyens budgétaires, réglementaires ou fiscaux jugés souhaitables ou acceptables. | **Hors périmètre MaxDiff P1.1** (relève des scénarios DCE / arbitrages EPIC 2 et du champ `instrument` ultérieur). | **Interdiction de mélanger** des instruments (« augmenter la CSG », « interdire les chaudières ») avec des situations souhaitées dans le même exercice MaxDiff (`D3`). |
| *(Complément)* **7. Faisabilité / capacité d'action perçue** | Conviction qu'une action publique peut effectivement modifier la situation à un horizon donné. | **Hors P1.1** (ou motif explicite signalé si l'utilisateur estime « impossible d'agir à ce niveau »). | Ne pas confondre un choix « pourrait attendre » motivé par un doute d'efficacité publique avec une indifférence envers la situation. |

### 3.3 Règles méthodologiques pour l'exercice MaxDiff P1.1

1. **Unité homogène d'item (`D3`) :** chaque carte MaxDiff formule une **situation concrète d'évolution collective souhaitée** (niveau méso : ni macro-thème vague type « Santé », ni micro-instrument partisan type « Créer X postes de fonctionnaires »), formulée en 1 à 2 propositions courtes (environ 10 à 18 mots, structure syntaxique homogène). Exemple illustratif à prétester : *« Réduire les délais pour obtenir un rendez-vous médical dans les territoires sous-dotés »* plutôt que *« Santé »* ou *« Réguler l'installation des médecins »*.
2. **Restitution strictement descriptive (sans score latent) :** conformément à `04_METHODS.md` §2 et `v0.2` D4, le MVP P1.1 **n'affiche aucun score BWS, aucun logit, aucun pourcentage de priorité, ni aucune barre de rang**. Il restitue pour chaque situation présentée :
   - le nombre d'expositions effectives (ex. `4`, ou `3` si 1 bloc passé),
   - le nombre de fois choisie « à traiter en premier »,
   - le nombre de fois choisie « pourrait attendre »,
   - le nombre de fois non retenue / intermédiaire et les séries passées ou signalées.
   - **Garde-fou d'affichage contre le classement déguisé :** ne pas trier automatiquement la liste finale selon `(best - worst)` de façon prescriptive. Afficher les situations soit dans l'ordre du panorama éditorial initial (ordre thématique neutre), soit offrir un contrôle explicite de tri descriptif neutre (ordre initial / alphabétique / regroupement par choix bruts) avec mention permanente des limites (cf. §6.7).
3. **Statut du bloc de raisons :** **[Recommandation méthodologique]** collecter les raisons **après** la fin du bloc MaxDiff (et non après chaque série, afin d'éviter l'effet de rationalisation séquentielle et la fatigue, cf. `DUAL_DIMENSION` §5), sur **1 à 2 situations librement choisies** par la personne (incluant explicitement la possibilité d'expliquer une situation choisie « pourrait attendre » ou jugée difficile à départager).

### 3.4 Recommandation méthodologique D4 (taille $N$ et plan d'expérience)

- **[Recommandation méthodologique]** Ne pas fixer $N$ à `7` ou `13` dans le seul but d'obtenir un BIBD exact (`D4` règle 1).
- **[Fait mathématique]** Les plans quasi équilibrés optimaux construits pour $N \in \{6, 8, 9, 10, 11, 12\}$ atteignent **99.38 % à 99.71 %** de l'efficacité d'un BIBD continu idéal, **zéro paire manquante**, une variance de cooccurrence **égale à la borne inférieure théorique**, et un **équilibre exact des positions `[1, 1, 1, 1]`**.
- **[Recommandation méthodologique]** Pour le premier jeu de situations P1.1, privilégier une plage opérationnelle de **$N = 8$ à $10$ situations** (soit $8$ à $10$ séries de $4$ cartes, durée estimée ~2–3 min hors lecture initiale), avec $N = 6$ réservé aux démonstrations courtes et $N = 11..13$ uniquement si la couverture éditoriale pluraliste l'exige impérativement et après mesure de fatigue cognitive :
  - **$N = 6$ présente un défaut structurel** : $k / N = 4 / 6 = 66.7\,\% > 50\,\%$ (Orme, 2005 montre que dépasser la moitié du jeu par série dégrade la différentiation médiane) et impose mathématiquement un chevauchement de **2 items sur 4** entre chaque bloc consécutif.
  - **$N \in \{8, 9, 10\}$** permet de maintenir $k / N \le 50\,\%$, de limiter le chevauchement entre deux écrans consécutifs à **1 seul item sur 4** (`max = 1`), d'offrir 8 à 10 domaines collectifs distincts sans surcharge cognitive, tout en atteignant la borne théorique de variance et `D-eff >= 0.9938`.
  - **$N \in \{11, 12, 13\}$** reste mathématiquement validé et disponible dans `designs_N6_to_N13.json` si le comité éditorial juge 11–13 situations nécessaires pour couvrir la diversité du débat français.

---

## 4. Analyse des trois architectures de construction des situations (Objectif B)

*(Note de cadrage : le concepteur a validé en `D2` l'approche 3 dite hybride ; l'analyse ci-dessous compare les trois architectures selon les cinq critères demandés et évalue les conséquences concrètes de D2 sans la remettre en cause.)*

| Critère d'évaluation | 1. Bibliothèque éditoriale commune | 2. Préoccupations uniquement utilisateur (issues de P0.2) | 3. Approche hybride (**Validée en D2**) |
|---|---|---|---|
| **Biais de saillance / disponibilité** | **Faible dépendance au rappel immédiat.** Expose l'utilisateur à des domaines qu'il n'avait pas spontanément à l'esprit (Tversky & Kahneman, 1973 ; Zaller, 1992). En contrepartie, impose une saillance *éditoriale* liée aux items présents dans le catalogue. | **Vulnérabilité maximale.** Capture exclusivement les sujets *top-of-mind* (actualité médiatique de la semaine, choc émotionnel récent). Les enjeux structurels ou silencieux sont absents de la comparaison. | **Compromis maîtrisé.** Le MaxDiff porte sur un panorama éditorial équilibré qui contrebalance l'amnésie de rappel, tandis que l'expression libre et les ajouts utilisateur capturent la saillance vécue sans contaminer la comparaison standardisée. |
| **Effets de cadrage** | **Fort cadrage éditorial.** Le choix des situations, leur niveau de granularité et leur formulation orientent la représentation du possible politique (*issue selection bias*, Walgrave et al., 2009 ; Schwarz, 1999). | **Cadrage endogène asymétrique.** L'utilisateur compare des énoncés qu'il a lui-même formulés avec des niveaux d'abstraction très hétérogènes (ex. « la vie chère » vs « les horaires du bus 4 » vs « changer de modèle économique »), violant l'homogénéité requise par BWS (`D3`). | **Cadrage éditorial explicite et contestable.** Le cadrage éditorial subsiste pour le bloc MaxDiff mais devient **transparent et critiquable** (l'utilisateur peut signaler qu'un enjeu manque ou qu'une carte est mal posée) ; le cadrage personnel reste intact en expression libre. |
| **Comparabilité des réponses** | **Élevée (inter-sessions et intra-bloc).** Toutes les personnes comparent les mêmes objets formulés au même niveau de granularité, dans le même plan expérimental vérifié (prérequis à toute future étude pilote/calibration). | **Nulle entre individus et fragile intra-individu.** Impossible de comparer des priorités entre sessions si chacun a ses propres items ; à l'intérieur d'une même session, si un utilisateur saisit 2 ou 3 items (ou 15, ou des solutions mélangées à des problèmes), la comparaison MaxDiff est soit impossible ($N < 4$), soit invalide (`D3`). | **Comparabilité standardisée préservée sans étouffer le singulier.** Les comparaisons MaxDiff restent 100 % standardisées et auditables sur le socle commun (D2 : pas d'insertion automatique des ajouts libres), tandis que la couche qualitative restitue les préoccupations singulières à part. |
| **Personnalisation** | **Faible.** Risque de sentiment de déconnexion ou d'injonction (« mes vrais sujets ne sont pas dans votre liste »), pouvant induire du *satisficing* ou de l'abandon (Krosnick, 1991). | **Maximale.** Fidèle à l'expression spontanée, mais au prix d'une impossibilité de structurer des compromis sur des dimensions non évoquées. | **Personnalisation en deux couches.** Respecte le « l'utilisateur est la source de vérité » (P0.2 + ajouts libres + signalement d'omissions + choix libre des raisons) sans sacrifier l'intégrité du protocole de comparaison. |
| **Complexité du plan expérimental** | **Faible et statique.** Plans pré-calculés, pré-vérifiés mathématiquement et audités hors ligne pour $N$ connu à l'avance (zéro risque combinatoire au runtime). | **Très élevée et instable.** $N$ varie de 0 à 50 selon la saisie (P0.2 autorise 0 à 50 déclarations) ; impossible de garantir connectivité, granularité homogène ou plan équilibré sans génération combinatoire complexe à la volée ni reformulation. | **Faible si D2 est strictement respectée ; élevée uniquement si exclusions dynamiques.** Tant que les ajouts libres restent *hors* MaxDiff (D2), le plan standardisé est pré-audité. **Attention (risque identifié §7)** : si l'utilisateur *exclut* ou signale une carte comme incompréhensible, soit le plan reste fixe avec passage de blocs contenant cette carte (données manquantes), soit il faut disposer d'une table pré-auditée pour $N-1$ (dans $[6..13]$). |

### Implications opérationnelles de D2 à anticiper
1. **Prévenir la frustration d'un ajout libre « ignoré » par MaxDiff :** l'interface doit expliquer honnêtement *avant* ou *au moment* du signalement d'une situation manquante pourquoi elle n'entre pas dans la comparaison chiffrée immédiate (préserver la comparabilité et l'homogénéité des formulations), et lui offrir une **place visible et valorisée dans la synthèse finale** (section dédiée + invitation à en préciser l'objectif et les conditions).
2. **Gérer le cas où un utilisateur ne reconnaît pas le panorama éditorial :** si une personne signale plusieurs omissions ou rejette la pertinence des situations proposées, elle doit pouvoir quitter ou passer le bloc MaxDiff sans culpabilisation et poursuivre uniquement avec ses déclarations libres P0.2.

---

## 5. Vérification mathématique des plans expérimentaux (Objectif C & D4)

Toutes les preuves numériques ci-dessous proviennent du script déterministe `docs/experiments/maxdiff/audit_maxdiff_designs.py` (Python 3.13.2, bibliothèque standard uniquement, graine `20261110`), et sont consignées avec les matrices complètes dans `docs/experiments/maxdiff/METRICS_REPORT.md` et `docs/experiments/maxdiff/designs_N6_to_N13.{json,csv}`.

### 5.1 Faisabilité arithmétique d'un BIBD exact

**[Fait mathématique]** Pour un plan symétrique à $v = N$ items, $b = N$ blocs de taille $k = 4$, et $r = 4$ présentations par item, un Balanced Incomplete Block Design (BIBD) exige que chaque paire d'items coapparaisse un nombre entier constant $\lambda$ de fois :
$$\lambda = \frac{r(k - 1)}{N - 1} = \frac{4 \times 3}{N - 1} = \frac{12}{N - 1}$$
Comme $12$ n'a que pour diviseurs entiers $\{1, 2, 3, 4, 6, 12\}$, les seules valeurs entières de $N \ge k = 4$ satisfaisant cette condition nécessaire sont $N \in \{5, 7, 13\}$ (avec $N=5 \implies \lambda=3$, hors intervalle $[6,13]$). Pour $N \in [6, 13]$ :
- **$N = 7$** ($\lambda = 2$) : **BIBD exact faisable et construit** comme complément du plan de Fano $PG(2,2)$ via le bloc de base cyclique $\{0, 1, 2, 4\} \pmod 7$.
- **$N = 13$** ($\lambda = 1$) : **BIBD exact faisable et construit** comme plan projectif $PG(2,3)$ (ensemble de différences de Singer $\{0, 1, 3, 9\} \pmod{13}$).
- **$N \in \{6, 8, 9, 10, 11, 12\}$** : **BIBD exact mathématiquement impossible** avec $b = N$ et $r = 4$.

**[Fait mathématique]** Si l'on relâchait la contrainte $b = N, r = 4$ pour forcer un BIBD exact avec $k = 4$, le plus petit nombre de blocs $b_{\min}$ satisfaisant les conditions arithmétiques nécessaires ($\lambda(N-1) = 3r$, $4b = Nr$, $b \ge N$) serait : `15` blocs ($r=10$) pour $N=6$, `14` blocs ($r=7$) pour $N=8$, `18` blocs ($r=8$) pour $N=9$, `15` blocs ($r=6$) pour $N=10$, **`55` blocs ($r=20$)** pour $N=11$, et **`33` blocs ($r=11$)** pour $N=12$. Cela confirme mathématiquement la pertinence de la règle 1 de `D4` : conserver $b=N, r=4$ avec des plans quasi équilibrés optimaux évite une charge cognitive rédhibitoire.

### 5.2 Tableau de synthèse des plans retenus ($N = 6$ à $13$, $k = 4$, $b = N$, $r = 4$)

**[Fait mathématique]** Pour chaque $N \in \{6..13\}$, un plan valide sans bloc dupliqué, à fréquence uniforme `r = [4, ..., 4]`, graphe connexe, zéro paire non comparée, et variance **égale à la borne inférieure théorique globale** a été construit et vérifié :

| $N$ | Blocs $b$ | BIBD exact ($b=N$) | $b_{\min}$ si BIBD ($r$ libre) | Histogramme $\lambda_{ij}$ (`val:nb`) | Min / Max / Étendue | Paires à $0$ | Variance $\text{Var}(\lambda_{ij})$ (borne théor.) | Connectivité algébrique $\lambda_2(L)$ | D-eff vs idéal continu | SE Fisher $H_0$ ($\beta=0$) min / moy / max | Équilibre pos. `[1,1,1,1]` | Chevauchement consécutif max / moy |
|---:|---:|---|---:|---|---|---:|---|---:|---:|---|---|---|
| **6** | 6 | Non ($\bar{\lambda}=2.40$) | 15 ($r=10$) | `2:9, 3:6` | 2 / 3 / 1 | **0** | **0.2400** (0.2400) | 13.0000 | **0.9965** | 0.897 / 0.916 / 0.930 | **Exact** | 2 / 2.00 |
| **7** | 7 | **Oui** ($\lambda=2$) | 7 ($r=4$) | `2:21` | 2 / 2 / 0 | **0** | **0.0000** (0.0000) | 14.0000 | **1.0000** | 0.926 / 0.926 / 0.926 | **Exact** | 2 / 2.00 |
| **8** | 8 | Non ($\bar{\lambda}=1.71$) | 14 ($r=7$) | `1:8, 2:20` | 1 / 2 / 1 | **0** | **0.2041** (0.2041) | 12.0000 | **0.9957** | 0.928 / 0.939 / 0.963 | **Exact** | 1 / 1.00 |
| **9** | 9 | Non ($\bar{\lambda}=1.50$) | 18 ($r=8$) | `1:18, 2:18` | 1 / 2 / 1 | **0** | **0.2500** (0.2500) | 12.0000 | **0.9941** | 0.930 / 0.948 / 0.966 | **Exact** | 1 / 1.00 |
| **10** | 10 | Non ($\bar{\lambda}=1.33$) | 15 ($r=6$) | `1:30, 2:15` | 1 / 2 / 1 | **0** | **0.2222** (0.2222) | 11.3820 | **0.9938** | 0.931 / 0.954 / 0.969 | **Exact** | 1 / 1.00 |
| **11** | 11 | Non ($\bar{\lambda}=1.20$) | 55 ($r=20$) | `1:44, 2:11` | 1 / 2 / 1 | **0** | **0.1600** (0.1600) | 11.3175 | **0.9949** | 0.928 / 0.958 / 0.967 | **Exact** | 1 / 1.00 |
| **12** | 12 | Non ($\bar{\lambda}=1.09$) | 33 ($r=11$) | `1:60, 2:6` | 1 / 2 / 1 | **0** | **0.0826** (0.0826) | 12.0000 | **0.9971** | 0.926 / 0.960 / 0.964 | **Exact** | 1 / 1.00 |
| **13** | 13 | **Oui** ($\lambda=1$) | 13 ($r=4$) | `1:78` | 1 / 1 / 0 | **0** | **0.0000** (0.0000) | 13.0000 | **1.0000** | 0.961 / 0.961 / 0.961 | **Exact** | 1 / 1.00 |

*(Les matrices complètes des cooccurrences $N \times N$ et les séquences ordonnées des blocs pour chaque $N$ figurent dans `docs/experiments/maxdiff/METRICS_REPORT.md`. Note V1.1 : la colonne `b_min si BIBD` désigne strictement le minimum arithmétique nécessaire `b_min_arithmetique_necessaire_si_BIBD` ; voir § 11.2.)*

### 5.3 Équilibre exact des positions et preuve par appariements parfaits

**[Fait mathématique]** L'incidence entre les $N$ items et les $N$ blocs forme un graphe biparti $G = (V_{\text{items}}, V_{\text{blocs}}, E)$ **4-régulier des deux côtés** ($\deg(i) = 4$, $\deg(B_t) = 4$). Par le théorème de coloration des arêtes des graphes bipartis de König (1916) et le théorème des mariages de Hall (1935), tout graphe biparti $k$-régulier se décompose en $k$ appariements parfaits arête-disjoints $M_1, M_2, M_3, M_4$. En affectant l'arête $(i, B_t) \in M_p$ à la position d'affichage $p \in \{1, 2, 3, 4\}$ du bloc $B_t$, chaque bloc contient exactement un item à chaque position et **chaque item apparaît exactement une fois en position 1, 2, 3 et 4** (`[1, 1, 1, 1]`). Le script vérifie explicitement cette propriété pour 100 % des $N \in \{6..13\}$.

### 5.4 Comparaison des fonctions objectif et analyse de sensibilité

Quatre formulations d'optimisation (sous contraintes dures $r_i = 4$, $|B_t| = 4$ sans répétition intra-bloc) ont été comparées pour chaque $N$ :
1. **Construction algébrique / recherche cyclique exhaustive** sur tous les blocs de base $\{0, a, b, c\} \pmod N$.
2. **`Obj_A` (Minimisation de variance)** : hiérarchie lexicographique `(doublons, paires à 0, variance des paires, étendue)`.
3. **`Obj_B` (Minimax + zéro-paires)** : `(doublons, paires à 0, étendue, variance des paires)`.
4. **`Obj_C` (D-optimalité sur le Laplacien)** : maximisation de $\sum_{m=2}^{N} \log \mu_m(L_\Lambda)$ (produit des valeurs propres positives du Laplacien de cooccurrence, proportionnel au déterminant de la matrice d'information de Fisher $\mathcal{I}(0) = \frac{1}{6} L_\Lambda$).
5. **`Obj_D` (Somme pondérée explicite)** : `100 * doublons + 10 * paires_à_0 + sum((lambda_ij - lambda_bar)^2)`.

**Enseignements mathématiques clés de la comparaison :**
- **[Fait mathématique]** **`Obj_A`, `Obj_B` et `Obj_D` convergent vers des optimums identiques** pour $N \in \{6, 7, 8, 9, 10, 11, 12, 13\}$ en termes d'histogramme de paires (grâce à la borne dure de régularité $r_i=4$ et aux pénalités explicites sur doublons et paires nulles).
- **[Fait mathématique]** **Sensibilité spectrale invisible à la variance seule (`N = 6` et `N = 9`) :**
  - Pour $N = 6$, deux plans non isomorphes ont exactement la **même distribution de paires `{2:9, 3:6}` et la même variance `0.2400`** : le complément de $C_6$ (`{0,1,2,3} mod 6`) et le complément de $C_3 \sqcup C_3$ (`{0,1,2,4} mod 6`). Or le complément de $C_6$ est strictement supérieur en connectivité algébrique ($\lambda_2 = 13.00$ vs $12.00$) et en D-efficacité (`0.9965` vs `0.9962`), car ses 6 paires de fréquence 3 forment un seul cycle connexe au lieu de deux triangles disjoints.
  - Pour $N = 9$, l'optimum cyclique (`Obj` cyclique / `Obj_C`) obtient $\lambda_2 = 12.00$ (`D-eff = 0.9941`) contre $\lambda_2 = 10.70$ (`D-eff = 0.9936`) pour `Obj_A`/`Obj_B`/`Obj_D` qui se contentaient de minimiser la variance sans critère spectral.
- **[Fait mathématique]** **Limite des métaheuristiques pures sur grands $N$ (`N = 13`) :** avec un budget réduit (10 redémarrages × 1 000 pas), la recherche stochastique directe sur le spectre (`Obj_C`) est restée piégée dans un minimum local pour $N = 13$ (`{0:4, 1:70, 2:4}`, `D-eff = 0.9960`), tandis que la construction algébrique de Singer `{0, 1, 3, 9} mod 13` et la recherche cyclique exhaustive garantissent le BIBD exact (`{1:78}`, `D-eff = 1.0000`). **Conclusion méthodologique :** privilégier les **plans de référence pré-calculés et audités** (constructions algébriques + recherche cyclique exhaustive + vérification spectrale et de position), jamais une génération stochastique non vérifiée côté client.

### 5.5 Contraintes mathématiquement impossibles à satisfaire simultanément

**[Fait mathématique]** L'audit signale cinq incompatibilités strictes :
1. **BIBD exact + $b=N, k=4, r=4$ pour $N \in \{6, 8, 9, 10, 11, 12\}$ :** impossible arithmétiquement ($\frac{12}{N-1} \notin \mathbb{Z}$).
2. **Chevauchement consécutif nul ($\le 0$ item commun entre deux écrans successifs) + $b=N, k=4, r=4$ pour $N=6, 7, 13$ :**
   - Pour $N=6$, principe des tiroirs : $|B_t \cap B_{t+1}| \ge 4 + 4 - 6 = 2$ (chevauchement $\le 1$ impossible).
   - Pour $N=7$, propriété duale des BIBD symétriques $(7,4,2)$ : *toute* paire de blocs distincts s'intersecte en exactement $\lambda = 2$ items.
   - Pour $N=13$, propriété duale du BIBD symétrique $(13,4,1)$ : *toute* paire de blocs distincts s'intersecte en exactement $\lambda = 1$ item.
3. **Randomisation naïve indépendante par bloc + équilibre exact des positions `[1, 1, 1, 1]` pour un répondant :** un mélange aléatoire indépendant des 4 items à l'intérieur de chaque bloc ne produit `[1, 1, 1, 1]` qu'avec probabilité $(4!/4^4)^N = (3/32)^N$ (soit $6.9 \times 10^{-7}$ pour $N=6$ et $4.2 \times 10^{-14}$ pour $N=13$ ; vérifié `0.0 %` sur 1 000 tirages Monte Carlo pour chaque $N$).
   - **Solution auditée (randomisation contrôlée) :** à partir d'un plan canonique pré-équilibré (décomposé en 4 appariements parfaits), appliquer une bijection aléatoire $\pi \in S_N$ sur les identifiants d'items, une permutation globale $\tau \in S_4$ sur les 4 positions d'affichage, et un ordre aléatoire ou inversé sur les blocs. **[Fait mathématique]** Sur 1 000 tirages par $N \in [6..13]$, cette randomisation contrôlée préserve **100.0 % des invariants** (`1000/1000` : fréquences, cooccurrences, connectivité et équilibre exact `[1, 1, 1, 1]`). *(Note : si l'on souhaite aussi préserver `max_consecutive_overlap = 1` pour $N \ge 8$, restreindre $\sigma$ à un décalage circulaire / retournement de l'ordre optimisé des blocs plutôt qu'une permutation arbitraire.)*
4. **Ajout ou retrait dynamique d'items en cours de bloc MaxDiff sans rupture du plan :** modifier $N$ après le démarrage brise la régularité $r=4$, l'équilibre de paires et la décomposition en appariements parfaits.
5. **Précision statistique individuelle fiable avec $r = 4$ :** sous le modèle logit conjoint BWS Case 1, $\mathcal{I}(0) = \frac{2}{k(k-1)} L_\Lambda = \frac{1}{6} L_\Lambda$. Même sur un BIBD exact ($N=7$ ou $N=13$), la variance asymptotique d'un contraste individuel est $6/7 \approx 0.857$ ($N=7$) à $12/13 \approx 0.923$ ($N=13$), soit une erreur-type `SE` de `0.926` à `0.961` logits (et jusqu'à `0.969` sur $N=10$). Pour obtenir des estimations individuelles précises sans emprunt de force populationnel (Hierarchical Bayes impossible dans le MVP local sans serveur), il faudrait augmenter fortement $r$ (Orme, 2005 ; Louviere et al., 2015), ce qui est incompatible avec la sobriété cognitive du parcours.

---

## 6. Parcours UX proposé et articulation avec P0.2 (Objectif D)

### 6.1 Le dilemme d'amorçage : Expression libre P0.2 vs Panorama éditorial P1.1

**[Hypothèse à tester]** Comme le montre la littérature sur la construction contextuelle des attitudes (Schwarz, 1999 ; Tourangeau et al., 2000 ; Zaller, 1992), l'ordre entre le texte libre et le catalogue éditorial exerce un **effet d'amorçage asymétrique** :
- **Scénario Ordre A (Expression libre P0.2 *avant* le panorama éditorial P1.1 — continuité P0.2) :**
  - *Avantage :* protège la spontanéité et l'authenticité du récit personnel en étape 1 ; les mots de la personne ne sont pas contaminés par les intitulés de l'éditeur.
  - *Risque :* la personne peut aborder le panorama éditorial avec ses thèmes personnels fraîchement activés en mémoire de travail (effet de rémanence / saillance auto-induite) ou s'étonner de ne pas retrouver mot pour mot ses phrases dans les cartes standardisées.
- **Scénario Ordre B (Panorama éditorial et MaxDiff *avant* expression libre complémentaire — proposition `DUAL_DIMENSION` §7) :**
  - *Avantage :* expose d'emblée au panorama complet pour éviter que le rappel spontané ne biaise les premières comparaisons.
  - *Risque majeur :* le panorama éditorial **amorce fortement l'expression libre ultérieure** (assimilation/ancrage sémantique : l'utilisateur répète les catégories ou formulations vues dans les cartes et omet ce qui n'y figurait pas) et crée un contraste abrupt avec le parcours P0.2 déjà construit (`ExplorationJourney.tsx`).

**[Recommandation méthodologique]** Retenir **l'Ordre A comme parcours nominal par défaut** (Expression libre + Structuration + Confirmation P0.2 → Transition explicite → Panorama éditorial P1.1 → MaxDiff → Exploration des raisons → Restitution consolidée), tout en **comparant expérimentalement Ordre A vs Ordre B lors des entretiens cognitifs et du pilote** (`06_TESTING_VALIDATION.md` §4). *(Note historique V1.1 : recommandation V1.0 remplacée par la décision V0.2 retenant l'ordre Présentation de la méthode → MaxDiff → Situations manquantes / expression libre → Exploration facultative des raisons comme parcours nominal ; voir § 11.4 et `P1_1_SPECIFICATION_v0.2.md` § 5.)* Pour atténuer le risque de confusion dans l'Ordre A, insérer un **écran de transition explicite** marquant la séparation entre :
1. *« Vos propres formulations »* (P0.2 : ce qui vous préoccupe personnellement), et
2. *« Un exercice comparatif sur un socle commun de situations »* (P1.1 : comparer des changements collectifs sur un pied d'égalité).

### 6.2 Parcours utilisateur complet proposé (7 étapes, réversible et non culpabilisant)

1. **Accueil et cadrage (étendu P0.2 + P1.1) :**
   - Rappel explicite : pas de score caché, pas de recommandation ni classement de candidats, réponses uniquement en mémoire d'onglet, droit permanent de passer / corriger / effacer.
2. **Expression libre, structuration et confirmation (socle P0.2 existant, inchangé dans son principe) :**
   - Saisie libre, découpage déterministe local (`deterministic-split-v0.1`), structuration/conditions/thèmes facultatifs, confirmation explicite. Option « passer directement au panorama des situations » clairement accessible pour ceux qui préfèrent démarrer par des propositions concrètes.
3. **Présentation du panorama des situations et validation de leur compréhension :**
   - Affichage en liste neutre (ordre aléatoire contrôlé par session ou ordre thématique équilibré sans hiérarchie visuelle) des $N$ situations du jeu standardisé (`pilot-v0.1`).
   - Chaque situation comporte un titre concis (changement souhaité) et un **volet dépliable facultatif « Précision / périmètre »** (explication factuelle courte de ce que couvre l'énoncé, sans imposer une lecture longue).
   - **Interactions de validation / signalement avant démarrage :**
     - case ou action légère par item (facultative, sans validation bloquante) : *« Formulation peu claire ou trop vague »* ;
     - bouton global bien visible : *« Une situation importante manque »* → ouvre un ajout qualitatif court (`MissingSituationReport`) en expliquant clairement : *« Votre ajout apparaîtra dans votre synthèse et pourra être approfondi, mais ne modifiera pas la grille comparative commune ci-dessous pour préserver l'équité des comparaisons »* ;
     - bouton *« Aucune de ces situations ne me parle / passer cet exercice »* → saute directement à la restitution / suite sans pénalité.
4. **Exercice MaxDiff (N séries de 4 cartes) :**
   - **En-tête pédagogique permanent :** rappel discret du caractère relatif de l'exercice (*« Choisir “pourrait attendre” ne signifie pas “sans importance” »*) et compteur neutre (*« Série 2 sur 9 »*, sans barre de « réussite »).
   - **Grille de 4 cartes** (avec ordre des positions gouverné par la factorisation en appariements parfaits + randomisation contrôlée).
   - **Sélection Best / Worst accessible (WCAG 2.2 AA) :** deux groupes de boutons radio / bascules explicites et mutuellement exclusifs (impossible de choisir le même item en premier et en attente ; correction immédiate en un clic ; retour vers une série précédente possible à tout moment via bouton « Série précédente »).
   - **Options de sortie / état sémantiquement distinctes sur chaque série :**
     - *« Passer cette comparaison »* (`skipped`)
     - *« Je ne sais pas choisir »* (`dont_know`)
     - *« Toutes aussi urgentes / impossible à départager »* (`incomparable_or_tied`)
     - *« Une des cartes me semble incompréhensible ou mal posée »* → ouvre un micro-formulaire inline permettant de signaler la carte concernée (`ItemFlag`) et d'enregistrer l'observation comme `flagged_unclear` / `skipped` sans perdre les séries précédentes.
5. **Signalement / ajout libre complémentaire post-exercice :**
   - Rappel succinct : *« Après ces comparaisons, manque-t-il une situation essentielle selon vous ? »* (évite d'avoir à revenir en arrière si le besoin d'ajout apparaît *pendant* les arbitrages ; relié aux déclarations P0.2 / `MissingSituationReport`).
6. **Exploration des raisons (1 à 2 situations choisies par l'utilisateur) :**
   - Présentation de l'ensemble des situations comparées (sans tri par score ni surbrillance des « gagnantes ») avec rappel neutre des choix bruts effectués (ex. *« choisie 3 fois en premier »*, *« choisie 2 fois en attente »*).
   - L'utilisateur choisit **librement 0, 1 ou 2 situations** qu'il souhaite éclairer (y compris une situation qu'il a placée « pourrait attendre » ou passée, ou passe directement à la synthèse).
   - **Question ouverte facultative** adaptée au rôle choisi (ex. pour une situation mise en premier vs en attente, cf. §7.3), suivie de :
     - **Pistes de clarification facultatives non exclusives** (ordre randomisé à chaque session : conséquences quotidiennes, publics vulnérables, justice/équité, libertés/autonomie, prévention des risques, cohésion/solidarité, long terme/générations futures, fonctionnement des services/institutions, faisabilité/capacité d'action publique, autre, « je ne sais pas encore expliquer ») ;
     - **Champ facultatif « Conditions »** (*« Dans quelles circonstances cet ordre de priorité changerait-il ? »*) ;
     - **Séparation déclarative explicite normatif vs factuel/causal** : option claire permettant à la personne d'indiquer séparément *« Quel fait ou constat causal vous amène à penser cela ? »* (`CausalBeliefClaim`, non validé automatiquement comme fait établi, prêt pour la mise en regard documentaire future).
7. **Restitution finale en panneaux séparés et éditables :**
   - **Panneau A — Observations de priorité relative (MaxDiff) :** tableau neutre (ordre initial ou tri alphabétique par défaut, jamais de pourcentage ni de rang normatif) affichant pour chaque situation : expositions effectives, choix « traiter en premier », choix « pourrait attendre », non sélectionnée / passée, plus nombre de séries passées/signalées et mention explicite des limites (*« Ces comptages reflètent uniquement vos choix relatifs parmi les N situations présentées dans cette session ; ils ne mesurent ni une gravité absolue, ni une préférence individuelle calibrée statistiquement »*).
   - **Panneau B — Ce qui éclaire vos choix (Raisons, conditions et convictions causales) :** explications libres confirmées, pistes choisies, conditions formulées, constats causaux distingués comme croyances personnelles à documenter, éléments laissés incertains.
   - **Panneau C — Vos déclarations P0.2, ajouts libres et signalements :** déclarations confirmées issues de l'expression libre P0.2, situations signalées comme manquantes, cartes signalées comme floues ou incomparables.
   - Actions finales : corriger n'importe quelle étape, exporter un JSON local validé (avec avertissement sur la sensibilité politique du fichier — P1.5 ultérieur), ou effacer toute la session en mémoire.

---

## 7. Risques, biais identifiés et formulations testables (Objectif E)

### 7.1 Registre des biais et risques méthodologiques, techniques et éthiques

| Catégorie | Risque / Biais identifié | Mécanisme d'action & référence | Mesure d'atténuation proposée |
|---|---|---|---|
| **Sélection éditoriale** | *Issue selection bias* : le choix des $N$ situations de la bibliothèque oriente implicitement l'agenda perçu comme légitime. | Walgrave, Nuytemans & Pepermans (2009) ; Stockinger et al. (2024). | Documentation publique des critères d'inclusion, étiquetage explicite `pilot-v0.1`, gouvernance pluraliste avant mise en production (`08_GOVERNANCE_CONTENT.md`), bouton permanent de signalement d'omission (`D2`). |
| **Formulation & granularité** | Mélange de niveaux d'abstraction ou biais présupposant la cause/solution (*double-barreled* / *leading wording*). | Schwarz (1999) ; `D3`. | Gabarit rédactionnel uniforme (situation concrète + verbe d'évolution, sans cause ni instrument), revue croisée pluraliste et entretiens cognitifs (Willis, 2005). |
| **Amorçage (Priming)** | L'expression libre P0.2 et le panorama éditorial P1.1 s'influencent mutuellement selon leur ordre. | Tourangeau, Rips & Rasinski (2000) ; Zaller (1992). | Protocole comparatif A/B en prétest (Ordre A vs Ordre B) + transition explicite séparant « vos préoccupations spontanées » de « la grille commune de comparaison ». |
| **Effet de position** | Sur-sélection des items en position 1 ou 4 (*primacy* / *recency*, surtout sur le choix « meilleur »). | Campbell & Erdem (2015) : ~50 % d'heuristiques de position, plus fortes sur *Best* que *Worst*. | Équilibre exact `[1,1,1,1]` via décomposition en 4 appariements parfaits + randomisation contrôlée globale (`tau`, `pi`) ; enregistrement de `itemOrder` dans `PriorityObservation` pour audit futur. |
| **Effet d'ordre & fatigue** | Dégradation des derniers blocs (*satisficing* sur $N=11..13$, ou report des biais de série en série). | Krosnick (1991) ; Orme (2005). | Plage recommandée $N = 8..10$, chevauchement consécutif limité à $\le 1$ item, pause/passage autorisé à chaque série. |
| **Confusion gravité / priorité** | L'utilisateur refuse de choisir « pourrait attendre » par culpabilité morale (*« tout est vital ! »*). | Finn & Louviere (1992) ; Schwarz (1999). | Formulation mettant l'accent sur le **séquencement temporel ou la contrainte de capacité simultanée** plutôt que sur la valeur absolue, avec mention explicite + état `incomparable_or_tied`. |
| **Illusion de score / classement** | L'utilisateur ou un tiers interprète les comptages bruts `(best - worst)` ou l'ordre d'affichage comme un « vrai profil » ou un résultat objectif. | Stockinger et al. (2024) ; `04_METHODS.md` §8. | Interdiction d'afficher des scores/pourcentages ; tri neutre (ordre initial / alphabétique) ; mention explicite de l'incertitude liée à $r=4$ (`SE ~ 0.93-0.97` logits). |
| **Données manquantes non aléatoires (MNAR)** | Si un utilisateur passe uniquement les séries contenant un item ambigu, le plan *observé* devient déséquilibré. | `06_TESTING_VALIDATION.md` §5. | Distinguer dans le modèle le plan *présenté* du plan *observé*, afficher le nombre exact d'expositions effectives dans le panneau A, et proposer le signalement d'ambiguïté. |
| **Confidentialité / Fuite** | Export JSON ou erreur client qui journaliserait des textes personnels ou choix MaxDiff. | `02_PRIVACY_SECURITY.md` (Art. 9 RGPD). | Tout en mémoire navigateur (`useReducer`), zéro appel réseau, test canari étendu aux réponses MaxDiff, pistes de raisons et signalements libres. |

### 7.2 Formulations testables pour le prétest cognitif (Objectif E)

**[Hypothèse à tester]** **Aucune des formulations ci-dessous ne doit être tenue pour neutre avant prétest qualitatif** (entretiens cognitifs sur échantillon diversifié, `06_TESTING_VALIDATION.md` §4 ; Willis, 2005 ; *Pretesting DCEs*, `PMC10894089`, 2024).

#### 1. Consigne générale MaxDiff
- **Variante A (formulation de travail `v0.2` D1 — cadrage « pays / changements ») :**  
  *« Quand il faudra faire des choix pour le pays, quels changements devraient passer avant les autres ? On ne peut pas tout faire avancer en même temps. Nous allons vous présenter différentes situations et vous demander lesquelles devraient, selon vous, passer en premier et lesquelles pourraient attendre. »*  
  - *Hypothèse / biais à vérifier :* « pour le pays » peut exclure mentalement des enjeux locaux ou européens ; glissement lexical entre « changements » et « situations ».
- **Variante B (formulation `DUAL_DIMENSION` §3 — cadrage « action collective / situations ») :**  
  *« On ne peut pas tout faire avancer en même temps. Parmi ces situations, laquelle faudrait-il traiter avant les autres ? Et laquelle pourrait attendre ? »*  
  - *Hypothèse / biais à vérifier :* plus sobre et sans référence nationale explicite, mais « traiter » peut évoquer uniquement une action publique descendante (État) plutôt qu'une évolution sociétale plus large.
- **Variante C (cadrage neutre par étapes de mise en œuvre / priorisation d'efforts) :**  
  *« Les moyens publics et le temps collectif sont limités. Sur plusieurs séries de 4 évolutions souhaitables, indiquez celle qui devrait être engagée en priorité et celle qui pourrait passer dans un second temps. »*  
  - *Hypothèse / biais à vérifier :* « moyens publics » ancre explicitement la contrainte budgétaire/institutionnelle ; tester si « dans un second temps » est perçu comme moins réducteur que « attendre ».

#### 2. Choix de la situation à traiter en premier (*Best*)
- **Variante B1 :** *« À traiter en premier »* (ou *« À engager en premier »*) — *cible directe l'urgence d'action (D1), tester si les participants confondent avec « le plus facile à faire ».*
- **Variante B2 :** *« Priorité immédiate parmi ces 4 situations »* — *explicite le périmètre fermé (« parmi ces 4 »), tester la connotation émotionnelle du mot « immédiate ».*
- **Variante B3 :** *« Celle qui devrait passer avant les trois autres »* — *rappelle strictement la comparativité locale, sans absolu.*

#### 3. Choix de la situation qui pourrait attendre (*Worst*)
- **Variante W1 :** *« Pourrait attendre davantage »* (avec note *« ne veut pas dire sans importance »*) — *adoucit l'impression d'abandon mais peut paraître long dans un bouton.*
- **Variante W2 :** *« Moins prioritaire dans cette série »* — *symétrique lexicalement, mais risque de faire oublier qu'elle reste importante dans l'absolu (sentiment de déclassement).*
- **Variante W3 :** *« Peut passer dans un second temps »* — *explicite la notion de calendrier/séquencement plutôt que de rejet, à vérifier contre un biais « de toute façon on le fera plus tard = jamais ».*

#### 4. Explication du caractère relatif de la comparaison (et gestion du « tout est important »)
- **Variante R1 (contrainte de simultanéité — `DUAL_DIMENSION` §3) :**  
  *« Dans chaque série de 4 cartes, vous comparez uniquement ces 4 situations entre elles. Choisir “pourrait attendre” ne veut pas dire que la situation est sans importance : cela indique seulement que, si tout ne peut pas avancer au même rythme, vous feriez passer une autre situation avant. »*
- **Variante R2 (analogie de l'ordre d'agenda, sans jargon) :**  
  *« Aucune de ces 4 situations n'est considérée comme secondaire. L'exercice observe simplement l'ordre dans lequel vous agiriez si vous deviez commencer par l'une et reporter une autre d'une étape. Si deux situations vous semblent impossibles à départager, vous pouvez le signaler ou passer. »*
- **Variante R3 (format ultra-court orienté action / micro-texte d'aide) :**  
  *« Comparez ces 4 situations entre elles uniquement : une à lancer d'abord, une à planifier après. Toutes comptent ; vous pouvez aussi passer ou signaler un blocage. »*

#### 5. Micro-formulation pour le choix des raisons (correction de l'asymétrie de `DUAL_DIMENSION` §5.2)
- **Variante Q_Best :** *« Qu'est-ce qui fait que cette situation devrait, selon vous, passer avant d'autres ? »*
- **Variante Q_Worst :** *« Qu'est-ce qui fait que cette situation pourrait, selon vous, attendre par rapport aux autres (ou dépendre d'autres étapes) ? »*
- **Variante Q_Both (neutre, choisie selon le rôle retenu) :** *« Pourquoi avez-vous situé cette évolution ainsi dans vos comparaisons ? »*

### 7.3 Protocole minimal de prétest cognitif recommandé (avant implémentation finale)
1. Recruter 8 à 12 participants diversifiés (âge, territoire urbain/rural, rapport au politique, niveau de littératie numérique — `06_TESTING_VALIDATION.md` §4).
2. Utiliser des entretiens cognitifs en *think-aloud* + *verbal probing* (Willis, 2005 ; *Pretesting DCEs*, `PMC10894089`) comparant les variantes ci-dessus et les Ordres A / B.
3. Mesurer spécifiquement : (a) compréhension de « pourrait attendre » ≠ « sans importance », (b) détection de termes ambigus ou biaisés dans les cartes situations, (c) facilité à utiliser « impossible à départager / passer », (d) distinction spontanée entre raison morale et fait/causalité supposée, (e) perception de neutralité de l'interface.

---

## 8. Questions restant à arbitrer par le concepteur / responsable méthodologique

*(Note historique V1.1 : ces sept questions ouvertes de l'audit V1.0 ont été arbitrées en V0.2 ; voir le bilan détaillé des arbitrages en § 11.5 et dans `docs/P1_1_SPECIFICATION_v0.2.md`.)*

*(Conformément à `v0.2` §3.5, les décisions validées **D1–D3** ne sont pas rouvertes ici.)*

1. **Ordre du parcours par défaut (Ordre A vs Ordre B) :** Valider l'utilisation de l'**Ordre A** (Expression libre P0.2 → Panorama & MaxDiff P1.1 → Raisons → Synthèse unifiée) pour le prototype, et autoriser un test comparatif Ordre A / Ordre B en entretiens cognitifs.
2. **Taille $N$ cible pour le premier jeu pilote (`pilot-v0.1`) :** Arbitrer entre **$N = 8, 9 \text{ ou } 10$ situations** (recommandation méthodologique : `9` ou `10` pour concilier couverture pluraliste, chevauchement consécutif $\le 1$ et fatigue modérée), ou $N$ jusqu'à `12`/`13` si la couverture éditoriale l'exige.
3. **Gouvernance et statut du premier jeu de situations :** Confirmer que le jeu livré en P1.1 porte explicitement un **statut `pilot-v0.1` / `illustrative-editorial-draft`** (non présenté comme taxonomie citoyenne définitive) tant que le comité pluraliste prévu par `08_GOVERNANCE_CONTENT.md` n'a pas relu et validé les formulations.
4. **Règle de randomisation des blocs et de séquence :** Choisir pour le runtime entre :
   - *(Option 1 — recommandée)* : préserver l'ordre de blocs à faible chevauchement (`max_consecutive_overlap = 1` pour $N \ge 8$) avec décalage/sens aléatoire + bijection aléatoire $\pi \in S_N$ des items + permutation globale $\tau \in S_4$ des positions (garantit **100 % l'équilibre de position `[1,1,1,1]` ET le chevauchement minimal**).
   - *(Option 2)* : permutation aléatoire libre $\sigma \in S_N$ des blocs + $\pi \in S_N$ + $\tau \in S_4$ (garantit `[1,1,1,1]` mais autorise occasionnellement 2 ou 3 items identiques sur deux écrans consécutifs).
5. **Gestion d'une carte signalée comme « incompréhensible / mal posée » en cours d'exercice :** Arbitrer entre :
   - *(Option A — recommandée pour la V1)* : conserver le plan complet en marquant automatiquement les blocs restants contenant cette carte comme passables en 1 clic (`flagged_unclear`), sans recalculer le plan à la volée ;
   - *(Option B)* : basculer vers un plan pré-audité de taille $N - 1$ (seulement si $N - 1 \ge 6$ et en recommençant le bloc MaxDiff avec explication à l'utilisateur).
6. **Nombre de situations à expliquer en couche « raisons » :** Confirmer l'invitation à choisir **1 à 2 situations (facultatif, minimum 0)** à l'issue du MaxDiff, et autoriser la question adaptée aussi bien aux situations placées « en premier » qu'à celles placées « pourrait attendre ».
7. **Alignement documentaire et schéma de données P0.2 ↔ P1.1 :** Autoriser la mise à jour ultérieure (lors du lot de spécification/implémentation) de `03_DATA_MODEL.md`, `04_METHODS.md`, `05_UX_INTERACTIONS.md` et `07_BACKLOG.md` pour harmoniser les divergences de nommage (`P1.1` vs `P1.3`) et le schéma réel de `Statement` P0.2 (`sourceText`, `themeSelectionState`, `status`).

---

## 9. Proposition de spécification P1.1 consolidée (pré-implémentation)

> **Rappel strict :** cette section définit le contrat cible initial V1.0. **Elle est remplacée et consolidée par [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md) (voir notamment `neitherBestNorWorstCount` au lieu de `middleCount`, suppression de `none_prioritized`, randomisation $D_8$ et ordre nominal V0.2 en § 11).** Aucun fichier dans `src/` n'est modifié à ce stade.

### 9.1 Périmètre fonctionnel P1.1 (strictement local et privacy-first)

1. **Aucune collecte serveur, aucun stockage persistant navigateur, aucune IA externe, aucun score global ou électoral** (`AGENTS.md`, `02_PRIVACY_SECURITY.md`).
2. **Module domaine pur (`src/domain/methods/` + `src/data/demo/` ou `src/data/pilot/`) sans dépendance React/Next.js :**
   - Catalogue de plans canoniques pré-audités et figés (`designs_N6_to_N13.json`) pour $N \in [6..13]$, avec `designVersion` et checksum / tests de propriétés invariantes.
   - Fonction pure déterministe `instantiateControlledMaxDiffPlan({ nItems, itemIds, seed })` : applique $\pi \in S_N$, $\tau \in S_4$ et rotation/inversion contrôlée des blocs, en garantissant les invariants mathématiques (`r = 4`, `[1,1,1,1]`, unicité intra-bloc).
   - Fonction pure d'agrégation descriptive `summarizeMaxDiffObservations(items, blocks, observations)` : calcule uniquement des comptages bruts (`exposures`, `bestCount`, `worstCount`, `middleCount`, `skippedCount`, `dontKnowCount`, `incomparableCount`, `flaggedUnclearCount`). **Aucune fonction de score latent, d'intervalle de confiance ou de classement normatif.**
3. **Jeu de situations P1.1 versionné (`situationsCatalogVersion`) :**
   - Format structuré : `id` (opaque, non sémantique), `shortLabel` (énoncé homogène de changement collectif souhaité), `clarificationNote` (périmètre explicatif facultatif), `broadDomainTag` (pour garantir la diversité pluraliste de couverture éditoriale, sans pré-classer les opinions), `editorialStatus` (`"pilot_draft" | "pluralist_reviewed"`).
4. **Contrats de données client-only proposés (à valider avec Zod `.strict()` lors de l'implémentation) :**
   - **`MaxDiffResponseState`** (sémantiquement distincts, non convertibles en échelle numérique) :
     `"answered" | "skipped" | "dont_know" | "incomparable_or_tied" | "none_prioritized" | "flagged_unclear"`
   - **`MaxDiffBlockPresented`** :
     `{ blockId: string; blockIndex: number; itemOrder: [string, string, string, string]; }` *(conserve l'ordre exact d'affichage pour traçabilité de biais de position)*
   - **`PriorityObservation`** (extension consolidée de `03_DATA_MODEL.md`) :
     `{ taskId: string; designVersion: string; designSeed: number; blockId: string; itemOrder: [string, string, string, string]; responseState: MaxDiffResponseState; bestItemId: string | null; worstItemId: string | null; flaggedItemIds: string[]; timestamp: string; }`
     *(Règle Zod : si `responseState === "answered"`, `bestItemId !== null`, `worstItemId !== null`, `bestItemId !== worstItemId`, et tous deux appartiennent à `itemOrder` ; sinon `bestItemId === null` et `worstItemId === null`.)*
   - **`ItemComprehensionFlag`** :
     `{ itemId: string; reason: "too_vague" | "incomprehensible" | "not_relevant" | "loaded_wording"; comment?: string; createdAt: string; }`
   - **`MissingSituationReport`** (ajouts libres D2, non injectés dans MaxDiff) :
     `{ id: string; text: string; clarification?: string; createdAt: string; confirmedByUser: boolean; }`
   - **`ReasonExploration`** (liée à 0, 1 ou 2 situations choisies librement par la personne) :
     `{ id: string; situationId: string; targetAngle: "first_priority" | "can_wait" | "general_arbitrage"; freeExplanation: string; selectedTrackIds: ReasonTrackId[]; conditions: string[]; causalBeliefClaims: CausalBeliefClaim[]; confirmedByUser: boolean; }`
   - **`CausalBeliefClaim`** (séparation explicite normatif vs factuel/causal) :
     `{ id: string; statement: string; confirmationStatus: "user_stated_unverified"; }`
   - **Réconciliation avec `Statement` (P0.2) :** conserver tels quels les champs P0.2 (`id`, `createdAt`, `sourceText`, `text`, `themeIds`, `themeSelectionState`, `objective`, `conditions`, `position`, `certaintySelfReport`, `status`, `confirmedByUser`) sans casser la rétrocompatibilité, et faire évoluer la session (`sessionVersion: "0.3.0"` lors de l'implémentation P1.1) pour héberger en mémoire le sous-état `prioritization` optionnel.
5. **Exigences de tests bloquants pour la future tranche d'implémentation P1.1 :**
   - **Unitaires (Vitest) :** vérification exhaustive sur tous les plans générés ($N=6..13$, multiples graines) des invariants (`r=4`, `[1,1,1,1]`, unicité intra-bloc, connectivité, absence de doublon) ; validation Zod stricte de `PriorityObservation`, `ReasonExploration`, `MissingSituationReport` et rejet des clés interdites (`PROHIBITED_PROFILE_KEYS`) ; exactitude des comptages descriptifs avec blocs passés/signalés.
   - **Composants (Testing Library) :** sélection mutuellement exclusive Best/Worst, clavier complet, correction de série précédente, tous les états `ResponseState`, ajout/confirmation de raisons et signalement d'omissions.
   - **E2E (Playwright) :** parcours complet P0.2 + P1.1 sur desktop et viewport mobile, contrôle `axe-core` WCAG 2.2 AA, et **test canari** vérifiant qu'aucun texte saisi (P0.2, omission, raison libre, constat causal) ni aucun identifiant de choix MaxDiff ne fuite dans les requêtes réseau, les URL, les logs ou les stockages persistants (`localStorage`, `sessionStorage`, `IndexedDB`, cookies).

---

## 10. Références scientifiques et méthodologiques citées

1. **Finn, A., & Louviere, J. J. (1992).** *Determining the Appropriate Response to Evidence of Public Concern: The Case of Food Safety.* Journal of Public Policy & Marketing, 11(2), 12–25. *(Introduction fondatrice du Best-Worst Scaling et critique de la mesure de simple « préoccupation » non contrainte).*
2. **Marley, A. A. J., & Louviere, J. J. (2005).** *Some probabilistic models of best, worst, and best–worst choices.* Journal of Mathematical Psychology, 49(6), 464–480. *(Fondements mathématiques des modèles logit conjoints et séquentiels BWS).*
3. **Louviere, J. J., Flynn, T. N., & Marley, A. A. J. (2015).** *Best-Worst Scaling: Theory, Methods and Applications.* Cambridge University Press. DOI: `10.1017/CBO9781107337855`. *(Théorie générale Case 1 / 2 / 3 et plans expérimentaux).*
4. **Mühlbacher, A. C., Kaczynski, A., Zweifel, P., & Johnson, F. R. (2016).** *Experimental measurement of preferences in health and healthcare using best-worst scaling: an overview.* Health Economics Review (PMC4705077). *(Revue des variantes BWS, limites et plans incomplets ; déjà cité dans `docs/REFERENCES.md`).*
5. **Street, D. J., & Burgess, L. (2007).** *The Construction of Optimal Stated Choice Experiments: Theory and Methods.* Wiley-Interscience. DOI: `10.1002/9780470148563`. *(Construction combinatoire de plans D-optimaux et plans de choix).*
6. **Orme, B. (2005).** *Accuracy of HB Estimation in MaxDiff Experiments.* Sawtooth Software Research Paper Series. *(Effets du nombre d'expositions par item, du ratio $k/N \le 0.5$ et de la fatigue répondant sur la précision).*
7. **Campbell, D., & Erdem, S. (2015).** *Position Bias in Best-Worst Scaling Surveys: A Case Study on Trust in Institutions.* American Journal of Agricultural Economics, 97(2), 526–545. *(Preuve empirique des heuristiques de position et asymétrie Best vs Worst).*
8. **Tversky, A., & Kahneman, D. (1973).** *Availability: A heuristic for judging frequency and probability.* Cognitive Psychology, 5(2), 207–232. *(Biais de disponibilité / saillance spontanée).*
9. **Schwarz, N. (1999).** *Self-reports: How the questions shape the answers.* American Psychologist, 54(2), 93–105. *(Logique conversationnelle, effets de contexte, d'ordre et de formatage des questions).*
10. **Tourangeau, R., Rips, L. J., & Rasinski, K. (2000).** *The Psychology of Survey Response.* Cambridge University Press. *(Modèle cognitif en 4 étapes : compréhension, récupération, jugement, réponse).*
11. **Krosnick, J. A. (1991).** *Response strategies for coping with the cognitive demands of attitude measures in surveys.* Applied Cognitive Psychology, 5(3), 213–236. *(Théorie du satisficing sous charge cognitive élevée).*
12. **Zaller, J. R. (1992).** *The Nature and Origins of Mass Opinion.* Cambridge University Press. *(Construction des réponses politiques « à la volée » selon la saillance accessible).*
13. **Willis, G. B. (2005).** *Cognitive Interviewing: A Tool for Improving Questionnaire Design.* SAGE Publications. *(Protocole de prétest cognitif par verbalisation et sondage).*
14. **Pretesting Discrete-Choice Experiments: A Guide for Researchers (2024).** *The Patient: Patient-Centered Outcomes Research* (PMC10894089). *(Guide structuré de prétest pour expériences de choix ; déjà cité dans `docs/REFERENCES.md`).*
15. **Walgrave, S., Nuytemans, M., & Pepermans, K. (2009).** *Voting Aid Applications and the Effect of Statement Selection.* West European Politics, 32(6), 1161–1179. *(Sensibilité systémique des outils civiques à la sélection des énoncés).*
16. **Stockinger, E., Maas, J., Talvitie, C., & Dignum, V. (2024).** *Trustworthiness of Voting Advice Applications in Europe.* Ethics and Information Technology, 26, 55. DOI: `10.1007/s10676-024-09790-6`. *(Transparence des hypothèses normatives et diversité des parties prenantes ; déjà cité dans `docs/REFERENCES.md`).*
17. **Kinder, D. R., & Kiewiet, D. R. (1981).** *Sociotropic Politics: The American Case.* British Journal of Political Science, 11(2), 129–161. *(Distinction empirique entre préoccupation personnelle égotropique et priorité collective sociotropique).*
18. **König, D. (1916) & Hall, P. (1935).** Théorèmes de factorisation des graphes bipartis réguliers en appariements parfaits *(base mathématique de l'équilibre exact des positions `[1,1,1,1]`)*.

---

## 11. Addendum V1.1 — Révisions suite à la revue indépendante et aux arbitrages V0.2 (10 novembre 2026)

La revue indépendante ([`CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md)) a recalculé directement tous les invariants combinatoires, valeurs propres, D-efficacités et erreurs-types sur [`designs_N6_to_N13.json`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.json) et confirmé la solidité combinatoire des plans exportés, tout en demandant plusieurs corrections méthodologiques et documentaires. Parallèlement, le concepteur a arbitré les orientations P1.1 V0.2. Le présent addendum consigne ces révisions sans altérer la trace historique des sections `§ 1` à `§ 10`.

### 11.1 Correction des conclusions statistiques (§ 1.3, § 5.5 #5)
- **Formulation rétractée :** l'audit V1.0 présentait les erreurs-types Fisher (`0.897–0.969` logits à $\beta = 0$, $r = 4$) comme une démonstration formelle d'impossibilité mathématique d'estimation individuelle.
- **Conclusion corrigée :** ces SE mesurent uniquement l'information locale attendue sous le modèle logit conjoint BWS Case 1 au point d'indifférence $\beta = 0$. Elles ne constituent pas un théorème d'impossibilité mathématique. L'absence de score latent et de classement individuel en P1.1 est un **garde-fou délibéré de validité**, justifié par quatre niveaux de distinction explicites :
  1. *Calcul descriptif des choix* (`answeredExposures`, `bestCount`, `worstCount`, `neitherBestNorWorstCount`, statuts incomplets) : exact, sans modèle, seul restitué en P1.1 ;
  2. *Score `B - W` observé* : résumé discret brut sensible aux données manquantes (`MNAR`) et aux comparaisons incomplètes, exclu de l'affichage et du tri en P1.1 ;
  3. *Estimation d'utilité latente* : modèle paramétrique (MNL / HB), sujet à la séparation complète et à une incertitude élevée à $r = 4$ sans emprunt de force populationnel, différé hors P1.1 ;
  4. *Fiabilité d'une restitution individuelle* : dépend de la validité de construit, de la stabilité test-retest et de l'absence de biais cognitifs/positionnels, au-delà des seules SE locales.
- **Limites des approximations asymptotiques à petit nombre de séries ($b = 7$ ou $8$) :** la normalité asymptotique du MLE ne tient pas à $r = 4$ ; le MLE non régularisé diverge en cas de séparation complète ; l'information réelle diminue dès que $\beta \neq 0$ ; tout passage ciblé (`MNAR`) altère la géométrie du sous-plan observé.

### 11.2 Compléments de documentation sur les plans et la randomisation (§ 5.1, § 5.2, § 5.5 #3)
- **Documentation complète de $D_{\mathrm{eff}}$ :** modèle logit conjoint BWS Case 1 (Marley & Louviere, 2005) ; matrice d'information complète $\mathcal{I}(0) = \frac{1}{6} L_\Lambda$ pour $k = 4$ ; paramétrisation de rang $N - 1$ ($\beta_N = 0$ ou contrastes orthonormés) ; évaluation locale à $\beta = 0$ ; design idéal continu de référence ($\bar{\lambda} = \frac{12}{N-1}$, valeurs propres $N\bar{\lambda}$) ; formule exacte $D_{\mathrm{eff}} = \left(\prod_{m=2}^N \mu_m(L_\Lambda)\right)^{1/(N-1)} / (N\bar{\lambda})$. Voir [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md) § 2.
- **Distinction conceptuelle :** séparation explicite entre *régularité combinatoire* (fréquences et paires), *connectivité du graphe* ($\mu_2(L_\Lambda) > 0$) et *efficacité statistique* ($D_{\mathrm{eff}}$ et SE locales à budget constant).
- **Clarification de `b_min si BIBD` :** renommé conceptuellement `b_min_arithmetique_necessaire_si_BIBD` (valeurs minimales satisfaisant les conditions de divisibilité nécessaires pour $k=4$, sans prétendre inclure une preuve d'existence ou construction explicite pour $N \notin \{7, 13\}$).
- **Randomisation contrôlée pour le pilote `N = 8` :** vérification exacte montrant que sur $8! = 40\,320$ permutations de blocs, seules les `16` transformations diédrales $D_8$ (rotations circulaires + inversion de sens) préservent `max_consecutive_overlap = 1`. L'implémentation applicative devra utiliser $\pi \in S_8 \times \tau \in S_4 \times D_8$ plutôt que le `rng.shuffle(block_indices)` libre présent dans la fonction exploratoire `randomize_design_controlled` d'`audit_maxdiff_designs.py`.

### 11.3 Correction de nommage des comptages et états de réponse (§ 3.3, § 9.1)
- **`middleCount` → `neitherBestNorWorstCount` :** les 2 situations non sélectionnées dans un bloc de 4 ne sont ni classées entre elles ni mesurées comme rang intermédiaire (revue indépendante § 6.2).
- **Suppression de `none_prioritized` :** supprimé de `MaxDiffResponseState` car redondant avec `incomparable_or_tied` dans des séries de 4 situations (revue indépendante § 6.4). Les 5 états retenus sont `answered | skipped | dont_know | incomparable_or_tied | flagged_unclear`.

### 11.4 Révision du parcours nominal et des paramètres UX (§ 6.1, § 6.2)
- **Nouvel ordre principal retenu (arbitrage concepteur, remplaçant la recommandation Ordre A de V1.0) :**
  1. Présentation de la méthode (accueil, confidentialité, panorama des 8 situations) ;
  2. MaxDiff (`N = 8`, `b = 8`, `k = 4`, `r = 4`) ;
  3. Recueil des situations manquantes et expression libre complémentaire ;
  4. Exploration facultative des raisons (`0 à 2` situations, symétrique entre « premier » et « attendre »), suivie de la synthèse descriptive multi-panneaux.
- **Test cognitif comparatif :** comparer cet ordre principal avec la variante où l'expression libre intervient avant MaxDiff (ex-Ordre A) sur 8 à 12 participants diversifiés.
- **Paramètres `k = 4, r = 4` :** conservés comme hypothèse initiale du pilote (non présentés comme optimum universel), avec documentation des compromis pour une comparaison future avec `k = 5` (cf. [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md) § 4 et [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md) § 6).

### 11.5 Bilan des arbitrages sur les sept questions ouvertes de § 8
1. **Ordre du parcours :** Ordre V0.2 (MaxDiff avant expression libre) retenu ; comparaison cognitive contre expression libre préalable obligatoire.
2. **Taille $N$ pilote :** **`N = 8`** retenu pour le premier pilote (`pilot-v0.1`), avec **`N = 7`** (BIBD exact) conservé comme plan exact de référence comparative.
3. **Gouvernance :** statut explicite `pilot-v0.1` / `pilot_draft` confirmé jusqu'à revue pluraliste.
4. **Randomisation :** Option 1 diédrale retenue ($\pi \in S_8 \times \tau \in S_4 \times D_8$), garantissant `[1,1,1,1]` et `max_consecutive_overlap = 1`.
5. **Carte incompréhensible / impossible à départager :** Option A renforcée — **aucune substitution automatique** d'item ; conservation explicite du statut incomplet (`flagged_unclear`, `incomparable_or_tied`, etc.) sans restitution artificiellement complète.
6. **Raisons :** facultatif, **`0 à 2` situations**, exploration symétrique autorisée y compris pour « pourrait attendre ».
7. **Alignement documentaire :** réalisé dans [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md), [`03_DATA_MODEL.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/03_DATA_MODEL.md), [`04_METHODS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/04_METHODS.md), [`05_UX_INTERACTIONS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/05_UX_INTERACTIONS.md) et [`07_BACKLOG.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/07_BACKLOG.md).

### 11.6 Patch de cohérence V0.2.1 (10 novembre 2026)
1. **Orthogonalité des états de réponse et des signalements :** `MaxDiffResponseState` est révisé en 4 états (`answered | skipped | dont_know | no_distinguishable_best_worst`) complétés par `NoDistinguishableBestWorstReason` (`equally_prioritized | not_comparable | none_should_take_precedence | other`). `flagged_unclear` est retiré de `MaxDiffResponseState` : `flaggedItemIds` et `ItemComprehensionFlag` sont désormais strictement orthogonaux à la réponse sur la série (un signalement peut accompagner une réponse `answered` valide ou une non-réponse). Dans `ItemComprehensionFlag`, `not_relevant` est remplacé par `outside_collective_scope` afin de ne pas confondre absence de préoccupation personnelle et absence de pertinence pour la question collective posée.
2. **Vérification reproductible de `D8` (`audit_maxdiff_designs.py`) :** ajout de `randomize_pilot_n8_dihedral` ($\pi \in S_8 \times \tau \in S_4 \times D_8$), conservation documentée de la fonction exploratoire `randomize_design_controlled` ($\sigma \in S_N$), et exécution de 1 000 essais à graines distinctes : `1000/1000` sur tous les invariants testés pour $D_8$ (incluant `max_consecutive_overlap = 1` et le bouclage `B8 → B1 = 1`), contre `0/1000` sur le chevauchement consécutif pour $\sigma \in S_8$.
3. **Paliers de démarrage clarifiés :** correction du renvoi erroné à `§ 9.1` vers `§ 8.3` de `P1_1_SPECIFICATION_v0.2.md` ; distinction entre prototype interne (possible après validation humaine de V0.2.1 avec un catalogue provisoire identifié comme tel), prétest cognitif de 8 à 12 personnes (explicitement défini comme **étude formative qualitative**, non comme expérience statistique d'estimation causale de l'ordre), et pilote public (subordonné à la revue éditoriale pluraliste et à la validation cognitive des formulations).

---

## 12. Addendum V1.3 — Mise en cohérence avec la décision D1 V0.3 (10 novembre 2026)

Le concepteur a officiellement validé la révision de D1 dans [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md). Conformément au principe de conservation des historiques, les sections `§ 1` à `§ 11` demeurent inchangées comme trace documentaire des états antérieurs ; le présent addendum consigne les effets méthodologiques de D1 V0.3.

### 12.1 Révision officielle du construit D1 et de l'unité de comparaison
- **Définition D1 V0.3 en vigueur :** *« La priorité relative que l'utilisateur souhaite voir accorder aux différents enjeux collectifs dans les choix à venir. »*
- **Conséquence directe sur l'unité éditoriale :** les sections V1.0 (`§ 1.1`, `§ 3.3`, `§ 6.2`) et V0.2 (`P1_1_SPECIFICATION_v0.2.md` § 1.3) définissaient l'item comme un *« changement collectif concret à améliorer »* (illustré en `§ 3.3` par *« Réduire les délais pour obtenir un rendez-vous médical... »*). Cette orientation normative implicite (« améliorer », « réduire », « faire évoluer dans tel sens ») est **officiellement abandonnée** au profit d'un **enjeu collectif formulé de façon descriptive**, suffisamment précis et accompagné si nécessaire d'une note de périmètre non prescriptive (`P1_1_D1_DECISION_v0.3.md` § 5).
- **Continuité de D3 :** l'exigence structurelle de D3 (**homogénéité de l'unité de comparaison et interdiction de mélanger des registres différents** — enjeux descriptifs, solutions, causes non établies, valeurs abstraites, slogans) est strictement maintenue et appliquée au nouveau référentiel descriptif.
- **Élargissement explicite de la séparation des construits et de la non-présupposition :** la taxonomie des construits compte désormais 7 dimensions explicites (incluant la *faisabilité ou capacité d'action perçue* en rang propre, `P1_1_D1_DECISION_v0.3.md` § 4). Les formulations ne doivent présupposer ni solution/instrument, ni cause non établie, ni conception unique de la justice/égalité/liberté/solidarité, ni modèle unique de logement, travail, famille, éducation, protection sociale ou organisation institutionnelle, ni vécu personnel du répondant.

### 12.2 Caducité de l'exemple V1.0 et nouveau catalogue candidat brouillon V0.3
- L'exemple illustratif cité en `§ 3.3` (*« Réduire les délais... »*) ainsi que toute éventuelle formulation `pilot-v0.1` ou `pilot-v0.2` orientée comme « changement à améliorer » sont **caduques**.
- Un nouveau brouillon de bibliothèque candidate est rédigé dans [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) sous statut **`pilot-v0.3-draft`**, sans prétention à la neutralité démontrée et accompagné d'une vérification transversale (enjeux individuels vs collectifs, chevauchement santé/protection sociale/famille, travail rémunéré/non rémunéré/temps libre, conceptions du logement, échelles locales/nationales/européennes/internationales, place des institutions et de la démocratie).
- **Constat factuel d'audit :** aucune liste archivée de huit formulations `pilot-v0.1` / `pilot-v0.2` n'existait dans le dépôt ; le réexamen éditorial s'appuie explicitement sur les 10 thèmes provisoires P0.2 (`src/data/demo/provisional-themes.ts`) et sur les domaines et critères de `P1_1_D1_DECISION_v0.3.md`.

### 12.3 Révision de la consigne candidate et préservation intégrale de D2–D4
- **Consigne de travail V0.3 (`P1_1_D1_DECISION_v0.3.md` § 6) :** *« Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient recevoir le plus d'attention, et lesquels pourraient attendre ? »* (avec explication explicite que *« pourrait attendre »* n'équivaut ni à « négligeable », ni à « opposition »). Cette consigne remplace la Variante A de `§ 7.2` (*« changements pour le pays »*, jugée trop nationale et orientée « changements ») comme base principale à soumettre aux futurs entretiens cognitifs.
- **Invariants conservés sans modification :** approche hybride D2, homogénéité D3, plan expérimental `N = 8, b = 8, k = 4, r = 4` et référence exacte `N = 7`, randomisation diédrale $D_8$, absence de score `B - W` ou de score latent, restitution descriptive, orthogonalité de `flaggedItemIds` (`outside_collective_scope`, `loaded_wording`), zéro substitution automatique et conservation explicite des séries incomplètes.
- **Verrou de séquencement :** ni l'implémentation applicative (`src/`), ni le prétest cognitif qualitatif (8 à 12 participants) ne peuvent être engagés avant l'arbitrage humain des choix éditoriaux ouverts dans [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) et la validation de [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md).
