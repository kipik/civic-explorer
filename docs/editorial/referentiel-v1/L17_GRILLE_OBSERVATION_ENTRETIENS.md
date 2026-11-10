# L17 — Grille d'observation des entretiens, version tableur et synthèses

**Statut :** **OUTIL OPÉRATIONNEL DE RECUEIL ET D'ANALYSE QUALITATIVE — ALIGNÉ `L13` / `L16` / `L20`**  
**Documents associés :** [`L13_PROTOCOLE_PRETEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L13_PROTOCOLE_PRETEST_COGNITIF.md), [`L16_GUIDE_ENQUETEUR.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L16_GUIDE_ENQUETEUR.md), [`L18_CONSENTEMENT_ET_ANONYMISATION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L18_CONSENTEMENT_ET_ANONYMISATION.md), [`L19_MODELE_SYNTHESE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L19_MODELE_SYNTHESE_PRETEST.md) et [`L20_VERROUILLAGE_PROTOCOLE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L20_VERROUILLAGE_PROTOCOLE_PRETEST.md).

> **Principe fondamental : séparation stricte entre observation et interprétation**  
> Dans toutes les grilles ci-dessous, les colonnes marquées **`[OBS]` (Observation factuelle)** consignent exclusivement ce que le participant a dit, lu, cliqué, demandé ou omis de façon directement observable. Les colonnes marquées **`[INTERP]` (Codage et interprétation analytique)** sont remplies dans un second temps par l'analyste (ou séparément après l'entretien) et distinguent toujours l'hypothèse de la donnée brute.

---

## 1. Traçabilité avec `L13` et dictionnaire des champs

### 1.1 Alignement avec la grille de `L13` § 3.1

La présente grille et [`L13_PROTOCOLE_PRETEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L13_PROTOCOLE_PRETEST_COGNITIF.md) (§ 3.1) partagent désormais exactement la même structure à 17 colonnes séparant strictement observations brutes (`[OBS]`) et codage analytique (`[INTERP]`) :
- séparation explicite de **`Identifiant participant`** (`[OBS]`), **`Variante`** (`[OBS]`), **`Domaine`** (`[OBS]`) et **`Série / Phase`** (`[OBS]`, traçant `Panorama`, `S1`..`S8`, `Debriefing_D`, `Lexical_E`, `Cloture_F`) ;
- conservation intégrale de la **reformulation spontanée (`[OBS]`)** et du **`Verbatim` dédié (`[OBS]`)**, distincts de l'évaluation analytique **`Qualification compréhension` (`[INTERP]` : `Fidele` / `Partielle` / `Erronee` / `NA`)** ;
- modalités unifiées pour **`Largeur perçue`** (`Trop large` · `Adaptee` · `Trop etroite` · `Non evoquee`), **`Sélection mono-composante`** (`Oui` · `Non` · `Incertain` · `NA`) et **`Gravité`** (`Aucune` · `Mineure` · `Importante` · `Bloquante`).

### 1.2 Dictionnaire des champs obligatoires (journal d'observation)

| Zone | Champ | Code colonne tableur | Type / valeurs contrôlées | Règle de remplissage |
|---|---|---|---|---|
| **`[OBS]`** | **Identifiant participant** | `participant_id` | `P01` à `P16` | Code strictement anonyme/pseudonymisé conforme à `L18`. |
| **`[OBS]`** | **Variante** | `variante` | `A` · `B` | `A` = Panorama préalable ; `B` = Découverte progressive. |
| **`[OBS]`** | **Domaine** | `domaine` | `DOM-01` à `DOM-08` · `TRANS` | `TRANS` pour une remarque transversale hors carte unique. |
| **`[OBS]`** | **Série / Phase** | `serie` | `Panorama` · `S1`..`S8` · `Debriefing_D` · `Lexical_E` · `Cloture_F` | Moment précis de l'observation (numéro de série `1..8` pendant le MaxDiff). |
| **`[OBS]`** | **Comportements & état en série** *(complément)* | `comportement_passation` | Texte structuré libre | Hésitation (`>25s`), retour arrière, ouverture périmètre, lecture partielle, état (`answered`/`skipped`/`dont_know`/`no_distinguishable`), signalement. |
| **`[OBS]`** | **Compréhension spontanée (reformulation)** | `comprehension_spontanee_reformulation` | Citation ou reformulation exacte | Phrase exacte utilisée par le participant pour dire de quoi parle le domaine (`L16` § D.2). |
| **`[OBS]`** | **Sujet principalement évoqué** | `sujet_principal_evoque` | Texte fidèle | Réponse exacte à : *« Lorsque vous avez choisi cette carte, à quel sujet pensiez-vous principalement ? »* (+ mention *Plus d'attention* vs *Pourrait attendre*). |
| **`[OBS]`** | **Périmètre perçu** | `perimetre_percu` | Texte fidèle | Sujets explicitement considérés comme **inclus** ou **exclus** par le participant. |
| **`[OBS]`** | **Difficulté lexicale** | `difficulte_lexicale` | Mot/expression exact ou `Aucune` | Tout mot ou expression jugé flou, technique, administratif ou orienté. |
| **`[OBS]`** | **Verbatim** | `verbatim` | Citation entre guillemets | Parole exacte du participant ou fait brut daté sans paraphrase interprétative. |
| **`[INTERP]`** | **Qualification compréhension** *(complément `L13`)* | `comprehension_statut` | `Fidele` · `Partielle` · `Erronee` · `NA` | Évaluation analytique au regard du périmètre `L11`. |
| **`[INTERP]`** | **Confusion** | `confusion` | `Aucune` ou `DOM-XX -> DOM-YY : motif` | Domaine confondu ou mauvais rattachement observé (ex. `E38 laïcité cherchée dans DOM-04`). |
| **`[INTERP]`** | **Largeur perçue** | `largeur_percue` | `Trop large` · `Adaptee` · `Trop etroite` · `Non evoquee` | Qualification issue des propos ou comparaisons exprimées par le participant. |
| **`[INTERP]`** | **Sélection mono-composante** | `selection_mono_composante` | `Oui` · `Non` · `Incertain` · `NA` | `Oui` si le choix est motivé exclusivement par un seul sous-enjeu ; préciser la composante entre parenthèses dans l'analyse. |
| **`[INTERP]`** | **Gravité** | `gravite` | `Aucune` · `Mineure` · `Importante` · `Bloquante` | Appliquer strictement la définition `L13` § 3.2 (rappelée ci-dessous). |
| **`[INTERP]`** | **Hypothèse / note analytique** *(complément)* | `note_analytique` | Texte explicite | Interprétation prudente distincte du verbatim brut. |
| **`[INTERP]`** | **Proposition de correction** | `proposition_correction` | Action ciblée ou `Aucune` | Ex. *conserver*, *remplacer terme X*, *activer variante 7B*, *préciser exclusion*, *réviser frontière*. |

### 1.3 Grille de référence de la gravité (`L13` § 3.2)

- **`Aucune` :** compréhension conforme, comparaison fluide sans gêne ni ambiguïté notable.
- **`Mineure` :** hésitation passagère ou terme perçu comme un peu formel/administratif, sans fausser l'identification du domaine ni bloquer la comparaison MaxDiff.
- **`Importante` :** mauvais rattachement d'un sous-enjeu majeur entre deux domaines, capture mono-composante manifeste éclipsant le reste de la carte, ou connotation normative perçue sur un intitulé.
- **`Bloquante` :** incompréhension empêchant de répondre (`skipped` / `not_comparable` répété), erreur systématique d'attribution rendant la comparaison absurde, ou sentiment exprimé que deux domaines sont impossibles à arbitrer ensemble en raison d'une largeur ou hétérogénéité extrême.

---

## 2. Grille détaillée de prise de notes en entretien (fiche imprimable / Markdown)

> **Consigne de saisie :** remplir uniquement la **Partie A (`[OBS]`)** pendant l'entretien et immédiatement à chaud ; remplir la **Partie B (`[INTERP]`)** après l'entretien ou par le binôme analyste.

**En-tête session :** `Identifiant participant : ______` · `Variante : [ ] A  [ ] B` · `Date : ____/____/2026` · `Enquêteur : ______`

### Partie A — Recueil factuel brut `[OBS]`

| Série / Phase | Domaine (`DOM-01`..`08` / `TRANS`) | Comportement observé *(hésitation, retour arrière, périmètre ouvert, lecture partielle, état)* | Compréhension spontanée *(reformulation)* | Sujet principalement évoqué *(question obligatoire)* | Périmètre perçu *(inclus / exclus)* | Difficulté lexicale *(mot exact)* | Verbatim fidèle |
|---|---|---|---|---|---|---|---|
| *(ex. S2)* | *(ex. DOM-01)* | *(ex. hésite 30s, clique périmètre, choisit Plus d'attention)* | — | *(ex. « Les déserts médicaux »)* | *(ex. n'a pas cité les retraites)* | *(ex. « solidarités »)* | *(ex. « Pour moi c'est d'abord trouver un médecin. »)* |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

### Partie B — Codage et interprétation `[INTERP]` *(séparée des faits bruts)*

| Ligne / Domaine / Série | Statut compréhension (`Fidele`/`Partielle`/`Erronee`) | Confusion (`Aucune` / `DOM-XX`) | Largeur perçue (`Trop large`/`Adaptee`/`Trop etroite`) | Sélection mono-composante (`Oui`/`Non`/`Incertain`) | Gravité (`Aucune`/`Mineure`/`Importante`/`Bloquante`) | Interprétation prudente *(hypothèse séparée du fait)* | Proposition de correction |
|---|---|---|---|---|---|---|---|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

---

## 3. Version exploitable dans un tableur (formats CSV prêts à copier-coller)

> **Usage hors ligne recommandé :** copier chaque bloc CSV (séparateur point-virgule `;` recommandé pour LibreOffice Calc / Excel français, encodage UTF-8) dans un classeur local hors ligne à 4 onglets (`01_Observations`, `02_Synthese_Participant`, `03_Debriefing_Lexical`, `04_Synthese_Domaine`), sans aucune donnée nominative permettant de réidentifier un participant.

### Onglet 1 — `01_Observations` (1 ligne = 1 observation participant × domaine × moment)

```csv
participant_id;variante;domaine;serie;comportement_passation_OBS;comprehension_spontanee_OBS;sujet_principal_evoque_OBS;perimetre_percu_OBS;difficulte_lexicale_OBS;verbatim_OBS;comprehension_statut_INTERP;confusion_INTERP;largeur_percue_INTERP;selection_mono_composante_INTERP;gravite_INTERP;note_analytique_INTERP;proposition_correction_INTERP
P01;A;DOM-01;S1;"";"";"";"";"";"";"";"";"";"";"";"";""
```

### Onglet 2 — `02_Synthese_Participant` (1 ligne = 1 participant)

```csv
participant_id;variante;tranche_age;type_territoire;niveau_diplome_aisance;rapport_politique_declare;duree_totale_min;duree_panorama_A_sec;lecture_panorama_A;serie_vue_ensemble_B;nb_ouvertures_perimetre;nb_hesitations_longues;nb_retours_arriere;etats_non_reponse_utilises;signalements_utilises;comprehension_pourrait_attendre;confusion_priorite_vs_adhesion_ou_perso;test_niveau2_strate2_1_utile;sujets_absents_cloture_F_OBS;domaines_problematiques_INTERP;notes_synthese_participant_INTERP
```

### Onglet 3 — `03_Debriefing_Lexical` (1 ligne = 1 participant × 1 paire `1B/2B/7B/8B`)

```csv
participant_id;variante;domaine;variante_testee;modifie_comprehension_ou_interpretation_OBS;precision_modification_OBS;plus_claire_OBS;raison_clarte_OBS;difference_sens_percue_OBS;meilleure_couverture_OBS;raison_couverture_OBS;perception_orientation_OBS;raison_orientation_OBS;synthese_analytique_INTERP
```

### Onglet 4 — `04_Synthese_Domaine` (1 ligne = 1 domaine `DOM-01`..`DOM-08`)

```csv
domaine;intitule_L11;nb_participants_A_observes;nb_participants_B_observes;nb_comprehensions_fideles_INTERP;nb_comprehensions_partielles_ou_erronees_INTERP;sujets_principaux_recurrents_OBS;confusions_recurrentes_INTERP;difficultes_lexicales_recurrentes_OBS;largeur_trop_large_count;largeur_adaptee_count;largeur_trop_etroite_count;mono_composante_oui_count;mono_composante_incertain_count;gravite_max_observee;nb_mineure;nb_importante;nb_bloquante;verbatims_cles_OBS;decision_edito_proposee_INTERP
```

---

## 4. Grille de synthèse par participant (fiche individuelle complète)

Remplir une fiche par participant après l'entretien (`P01` à `P16`), en conservant la séparation entre faits observés (`[OBS]`) et lecture analytique (`[INTERP]`).

### 4.1 Profil anonymisé et contexte de passation *(sans donnée identifiante ni affiliation partisane)*

- **Identifiant participant :** `_______` · **Variante assignée :** `[ ] A (Panorama préalable)` · `[ ] B (Découverte progressive)`
- **Profil de diversification (`L13` § 1.2) :**
  - Tranche d'âge : `[ ] 18–29 ans` · `[ ] 30–59 ans` · `[ ] 60 ans et +`
  - Territoire : `[ ] Grande aire urbaine` · `[ ] Ville moyenne / périurbain` · `[ ] Commune rurale` · `[ ] Outre-mer / sensibilité ultramarine`
  - Diplôme / aisance avec le vocabulaire institutionnel : `[ ] Sans diplôme du supérieur` · `[ ] Bac+1/2` · `[ ] Bac+3 et +` · Aisance perçue : `[ ] Faible` · `[ ] Moyenne` · `[ ] Élevée`
  - Rapport déclaré à la politique *(sans parti ni vote)* : `[ ] Peu intéressé` · `[ ] Intérêt modéré` · `[ ] Très intéressé`
- **Durée totale effective :** `____ minutes` *(dont Phase MaxDiff : `____ min`)*

### 4.2 Indicateurs comportementaux de la session (`L13` § 3.3) `[OBS]`

| Indicateur observé | Consignation factuelle `[OBS]` |
|---|---|
| **Lecture du Panorama (Variante A)** | Temps approximatif : `____ s` · Comportement : `[ ] Tout lu` · `[ ] Titres surtout` · `[ ] Décrochage visible` · Volets de périmètre ouverts : `____` |
| **Découverte progressive (Variante B)** | Nombre d'ouvertures de *« Voir le périmètre complet »* : `____` (à quelles séries : `________`) · Série où le participant dit avoir saisi l'ensemble des 8 cartes : `S___` |
| **Comportements pendant les 8 séries** | Séries les plus longues/hésitantes : `________` · Retours en arrière : `____` · Lectures partielles repérées : `________` |
| **États de non-réponse & signalements** | `Passer` : `___` · `Je ne sais pas` : `___` · `Impossible de départager` : `___` (motif : `________`) · Signalements : `________` |
| **Sens attribué à « Pourrait attendre »** | `[ ] Correct (priorité relative)` · `[ ] Ambigu` · `[ ] Erroné ("sans importance / je suis contre")` — Verbatim : « `________________________` » |
| **Distinction priorité / perso / adhésion** | Ce qui a guidé les choix : `[ ] Urgence collective` · `[ ] Vécu personnel` · `[ ] Volonté de réforme précise` · `[ ] Mixte` — Verbatim : « `________` » |
| **Test court Niveau 2 (`Strate 2.1`)** | Domaine testé : `DOM-___` · Réaction : `[ ] Répond au besoin de précision` · `[ ] Neutre / redondant` · `[ ] Trop détaillé` — Verbatim : « `________` » |
| **Clôture F — Sujet manquant cité** | `[ ] Aucun` · `[ ] Oui` → Verbatim exact : « `________________________________________________` » |

### 4.3 Fiche individuelle des 4 comparaisons lexicales (Section E de `L16`) `[OBS]`

| Paire | Modifie compréhension / interprétation ? (`Oui` / `Non` / `Incertain` + comment) | Plus claire (+ raison) | Différence de sens perçue | Meilleure couverture (+ raison) | Orientation perçue (+ raison) |
|---|---|---|---|---|---|
| **`DOM-01` vs `1B`** | | | | | |
| **`DOM-02` vs `2B`** | | | | | |
| **`DOM-07` vs `7B`** | | | | | |
| **`DOM-08` vs `8B`** | | | | | |

### 4.4 Synthèse analytique de la session `[INTERP]`

- **Domaines compris sans difficulté :** `________________________________________________`
- **Confusions et chevauchements constatés :** `________________________________________________`
- **Sélections mono-composantes repérées :** `________________________________________________`
- **Problèmes importants ou bloquants identifiés :** `________________________________________________`

---

## 5. Grille de synthèse transversale par domaine (`DOM-01` à `DOM-08`)

À compléter une fois les `12 à 16` entretiens menés, pour alimenter directement [`L19_MODELE_SYNTHESE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L19_MODELE_SYNTHESE_PRETEST.md).

### 5.1 Tableau transversal par domaine

| Domaine | Compréhension spontanée *(A vs B)* `[OBS/INTERP]` | Sujets principaux évoqués *(récurrence)* `[OBS]` | Confusions inter-domaines observées `[INTERP]` | Difficultés lexicales relevées `[OBS]` | Largeur perçue *(Trop large / Adaptée / Trop étroite)* `[INTERP]` | Sélections mono-composantes *(Oui / Non / Incertain)* `[INTERP]` | Gravité max & nb (`Min`/`Imp`/`Bloq`) `[INTERP]` | Décision éditoriale proposée `[INTERP]` |
|---|---|---|---|---|---|---|---|---|
| **`DOM-01`** | A : `__/n` fidèles<br>B : `__/n` fidèles | | | | `TL:__ / A:__ / TE:__` | `O:__ / N:__ / I:__` | | |
| **`DOM-02`** | A : `__/n` fidèles<br>B : `__/n` fidèles | | | | `TL:__ / A:__ / TE:__` | `O:__ / N:__ / I:__` | | |
| **`DOM-03`** | A : `__/n` fidèles<br>B : `__/n` fidèles | | | | `TL:__ / A:__ / TE:__` | `O:__ / N:__ / I:__` | | |
| **`DOM-04`** | A : `__/n` fidèles<br>B : `__/n` fidèles | | | | `TL:__ / A:__ / TE:__` | `O:__ / N:__ / I:__` | | |
| **`DOM-05`** | A : `__/n` fidèles<br>B : `__/n` fidèles | | | | `TL:__ / A:__ / TE:__` | `O:__ / N:__ / I:__` | | |
| **`DOM-06`** | A : `__/n` fidèles<br>B : `__/n` fidèles | | | | `TL:__ / A:__ / TE:__` | `O:__ / N:__ / I:__` | | |
| **`DOM-07`** | A : `__/n` fidèles<br>B : `__/n` fidèles | | | | `TL:__ / A:__ / TE:__` | `O:__ / N:__ / I:__` | | |
| **`DOM-08`** | A : `__/n` fidèles<br>B : `__/n` fidèles | | | | `TL:__ / A:__ / TE:__` | `O:__ / N:__ / I:__` | | |

### 5.2 Tableau transversal des 4 comparaisons lexicales (`1B`, `2B`, `7B`, `8B`)

| Paire | Modifie compréhension / interprétation (`Oui`/`Non`/`Inc.`) `[OBS]` | Jugée plus claire (Réf / Var / Égal) | Différences de sens signalées | Meilleure couverture perçue | Orientation / biais perçu | Synthèse des raisons invoquées | Décision proposée |
|---|---|---|---|---|---|---|---|
| **`DOM-01` vs `1B`** | `O:__ / N:__ / I:__` | Réf : `__` / `1B` : `__` / Égal : `__` | | | | | |
| **`DOM-02` vs `2B`** | `O:__ / N:__ / I:__` | Réf : `__` / `2B` : `__` / Égal : `__` | | | | | |
| **`DOM-07` vs `7B`** | `O:__ / N:__ / I:__` | Réf : `__` / `7B` : `__` / Égal : `__` | | | | | |
| **`DOM-08` vs `8B`** | `O:__ / N:__ / I:__` | Réf : `__` / `8B` : `__` / Égal : `__` | | | | | |

### 5.3 Tableau transversal comparatif `Variante A` vs `Variante B` *(qualitatif, sans test statistique)*

| Axe comparé (`L13` § 4) | Constats observés en Variante A (`n = __`) `[OBS]` | Constats observés en Variante B (`n = __`) `[OBS]` | Interprétation prudente `[INTERP]` |
|---|---|---|---|
| **Erreurs d'attribution en Séries 1–3** | | | |
| **Recours au volet Périmètre complet** | | | |
| **Fatigue, surcharge ou sur-ancrage initial** | | | |
| **Fluidité et compréhension de la structure des 8 cartes** | | | |
