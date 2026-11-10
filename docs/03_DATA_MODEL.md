# 03 — Modèle de données et contrats

## 1. Règle de séparation

Deux domaines doivent rester séparés :

- **Données personnelles de session** : présentes uniquement en mémoire navigateur dans le MVP ; jamais dans la base documentaire.
- **Données documentaires publiques** : thèmes, acteurs, déclarations publiques, documents, sources, validations et versions éditoriales.

Ne pas créer de clé étrangère entre un utilisateur et un acteur politique. Ne pas stocker un profil individuel au serveur.

## 2. Domaine utilisateur (client-only)

### Statement (contrat P0.2 implémenté)

Champs du modèle [`Statement`](file:///c:/Users/kipik/Dev/civic-explorer/src/domain/statements/types.ts#L14-L27) validés en `.strict()` par [`statementSchema`](file:///c:/Users/kipik/Dev/civic-explorer/src/lib/schemas/exploration.ts#L95-L118) :

- `id` : identifiant généré localement, sans signification externe ;
- `createdAt` : date ISO locale ;
- `sourceText` : texte source segmenté ou `null` en cas de saisie manuelle ;
- `text` : texte actuel édité par l'utilisateur ;
- `themeIds` : thèmes provisoires choisis par l'utilisateur, facultatifs ;
- `themeSelectionState` : `selected | unselected | dont_know` ;
- `objective` : objectif reformulé/confirmé (chaîne vide si non renseigné) ;
- `conditions` : liste de conditions explicites ;
- `position` : `support | oppose | conditional | undecided | not_expressed` ; ne pas forcer ce champ si absent ;
- `certaintySelfReport` : `low | medium | high | uncertain | not_stated` ;
- `status` : `draft | confirmed | uncertain` ;
- `confirmedByUser` : booléen devant correspondre strictement à `status === "confirmed"`.

*(Champs futurs hors périmètre P0.2/P1.1, à ne pas injecter dans les schémas `.strict()` avant un lot dédié : `instrument`, `importanceSelfReport`.)*

Ne pas ajouter `ideology`, `leftRight`, `partyAffinity`, `voteIntent`, `candidateScore`, `proximityScore`, `latentScore`, `rank` ou toute inférence similaire (`PROHIBITED_PROFILE_KEYS`).

### ExplorationSession (contrat P0.2 et extension P1.1 V0.3)

La session en mémoire navigateur ([`ExplorationSession`](file:///c:/Users/kipik/Dev/civic-explorer/src/domain/statements/types.ts#L29-L38)) contient en P0.2 : `sessionVersion`, `segmentationMethodVersion`, `taxonomyVersion`, `step`, `rawFreeText`, `lastSegmentedText`, `freeExpressionState`, `statements`. Lors de la future implémentation du lot `P1.1` ([`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md)), elle hébergera en mémoire un sous-objet optionnel `prioritization` strictement séparé des déclarations `statements`.

### ResponseState (états généraux et spécialisation `MaxDiffResponseState`)

Valeurs sémantiquement distinctes pour les futurs scénarios / attitudes (EPIC 2) :

- `answered` ;
- `skipped` ;
- `dont_know` ;
- `uncertain` ;
- `depends` ;
- `reject_both` *(réservé aux scénarios binaires DCE)* ;
- `not_applicable`.

Pour l'exercice **MaxDiff Case 1 à 4 enjeux collectifs (`P1.1`)**, le contrat spécialisé **`MaxDiffResponseState`** retient exactement 4 états au niveau de la série (sans `none_prioritized` ni `flagged_unclear` — héritage V0.2.1 conservé) :

- `answered` : un enjeu choisi comme devant recevoir le plus d'attention (`bestItemId`) et un enjeu distinct choisi comme pouvant attendre (`worstItemId`) ont été sélectionnés ;
- `skipped` : comparaison passée sans motif imposé (ou lorsqu'une carte réellement incompréhensible empêche toute comparaison) ;
- `dont_know` : l'utilisateur indique ne pas savoir départager cette série ;
- `no_distinguishable_best_worst` : impossible de distinguer un enjeu prioritaire et un enjeu pouvant attendre dans cette série.

Lorsqu'une série vaut `no_distinguishable_best_worst`, le champ facultatif **`NoDistinguishableBestWorstReason`** précise le motif :

- `equally_prioritized` ;
- `not_comparable` ;
- `none_should_take_precedence` ;
- `other`.

Le signalement individuel d'une carte (`flaggedItemIds` et `ItemComprehensionFlag`) est **strictement orthogonal** à `MaxDiffResponseState` : un utilisateur peut signaler une formulation tout en conservant une réponse `answered` valide, ou conserver séparément la non-réponse (`skipped`, `dont_know`, `no_distinguishable_best_worst`) et le signalement si la carte empêche la comparaison.

Ne pas coder ces états en nombres −2 à +2 dans la couche de stockage.

### EditorialSituation (bibliothèque commune P1.1 — D1 V0.3, D2, D3)

*(Note de continuité V0.2 → V0.3 : le nom de contrat `EditorialSituation` est conservé provisoirement pour continuité documentaire ; conformément à [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md), chaque entrée modélise désormais un **enjeu collectif formulé de façon descriptive**, sans direction normative ni solution présupposée, à granularité homogène — voir [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md).)*

- `id` : identifiant opaque, sans sens politique ni encodage thématique ;
- `shortLabel` : libellé court descriptif et neutre de l'enjeu collectif (sans solution, cause non établie ni modèle unique) ;
- `fullFormulation` : formulation descriptive complète de l'enjeu collectif ;
- `scopeIncludedNote` / `scopeExcludedNote` *(ou `clarificationNote` structurée)* : note de périmètre non prescriptive précisant ce qui est inclus et exclu pour lever les ambiguïtés éventuelles ;
- `broadDomainTag` : repère de couverture pluraliste (ne préjuge pas d'une position) ;
- `editorialStatus` : `pilot_draft | pluralist_reviewed` (statut **`pilot_draft`** / `pilot-v0.3-draft` tant que le catalogue candidat n'a pas été arbitré et validé pluralistement) ;
- `catalogVersion` : version explicite du jeu d'enjeux.

### PriorityObservation (contrat P1.1 V0.3 — invariants V0.2.1 conservés)

- `taskId` ;
- `designId` / `designVersion` (ex. plan pilote `N=8, k=4, r=4` vs référence `N=7`) ;
- `designSeed` (graine locale éphémère de randomisation contrôlée $\pi \times \tau \times D_8$) ;
- `blockId` (ou `choiceSetId`) et `blockIndex` ;
- `itemOrder` : tuple ordonné `[string, string, string, string]` des 4 enjeux collectifs effectivement affichés (traçabilité du biais de position) ;
- `responseState` : `MaxDiffResponseState` ;
- `bestItemId` : `string | null` ;
- `worstItemId` : `string | null` ;
- `noDistinguishableReason` : `NoDistinguishableBestWorstReason | null` ;
- `noDistinguishableReasonNote` : `string` facultatif (autorisé uniquement si `noDistinguishableReason === "other"`) ;
- `flaggedItemIds` : `string[]` (identifiants uniques dans `itemOrder`, orthogonal à `responseState`) ;
- `methodVersion` ;
- `timestamp`.

**Invariants Zod stricts :**
- `itemOrder` comporte 4 identifiants distincts ; `flaggedItemIds` ne contient que des identifiants uniques appartenant à `itemOrder` (peut être non vide avec n'importe quel `responseState`, y compris `answered`) ;
- si `responseState === "answered"`, `bestItemId` et `worstItemId` sont non nuls, distincts et appartiennent à `itemOrder`, et `noDistinguishableReason === null` (`noDistinguishableReasonNote` absent) ;
- si `responseState !== "answered"` (`skipped`, `dont_know`, `no_distinguishable_best_worst`), `bestItemId === null` et `worstItemId === null` ;
- si `responseState === "no_distinguishable_best_worst"`, `noDistinguishableReason` vaut `NoDistinguishableBestWorstReason | null` (facultatif) et `noDistinguishableReasonNote` n'est accepté que si `noDistinguishableReason === "other"` ; sinon `noDistinguishableReason === null` et `noDistinguishableReasonNote` est absent ;
- les séries incomplètes conservent leur état explicite sans imputation ni substitution d'item.

### MaxDiffSituationSummary (agrégat descriptif P1.1)

Pour chaque enjeu collectif présenté, uniquement des comptages bruts (aucun score `B - W`, aucune utilité latente, aucun pourcentage ou rang) :

- `situationId`, `totalPresentedCount`, `answeredExposures`, `bestCount`, `worstCount`, `neitherBestNorWorstCount` *(remplace historiquement `middleCount`)*, `skippedCount`, `dontKnowCount`, `noDistinguishableCount`, `flaggedCount` *(compteur orthogonal de signalements de carte)* ;
- complété au niveau session par `sessionCompletionStatus` (`complete | partial | skipped_all`).

### Objets qualitatifs complémentaires P1.1 (séparés des comptages MaxDiff)

- **`ItemComprehensionFlag`** *(orthogonal à `MaxDiffResponseState`)* : `{ itemId, blockId?, reason: "too_vague" | "incomprehensible" | "outside_collective_scope" | "loaded_wording", comment?, createdAt }`. *(Note V0.2.1 / V0.3 : `outside_collective_scope` — « hors périmètre des choix collectifs / ne me semble pas relever d'un arbitrage collectif » — évite toute confusion avec l'absence de préoccupation personnelle ; `loaded_wording` permet de signaler une formulation perçue comme orientée ou présupposant une solution.)*
- **`MissingSituationReport`** *(ajouts libres D2, jamais insérés dans MaxDiff)* : `{ id, text, clarification?, createdAt, confirmedByUser }`. *(Recueil des enjeux collectifs jugés manquants par l'utilisateur.)*
- **`ReasonExploration`** *(0 à 2 enjeux librement choisis après MaxDiff)* : `{ id, targetType: "editorial_situation" | "missing_situation", targetId, targetAngle: "first_priority" | "can_wait" | "general_arbitrage", freeExplanation, selectedTrackIds, conditions, causalBeliefClaims, confirmedByUser }`.
- **`CausalBeliefClaim`** *(séparation explicite normatif vs factuel/causal)* : `{ id, statement, confirmationStatus: "user_stated_unverified" }`.

## 3. Domaine documentaire public

### Actor

- `id` ; `displayName` ; `actorType` (`person`, `party`, `coalition`, `institution`, `other`) ;
- dates de validité publique ;
- liens officiels ;
- statut éditorial.

### Theme et Issue

Taxonomie hiérarchique stable avec identifiants non ambigus, libellés, descriptions et version.

### Claim

Un énoncé politique atomique ou un objectif documenté. Ne pas concaténer plusieurs mesures indépendantes dans un claim unique.

### ActorPosition

- acteur ; claim ; thème ;
- nature de preuve (`official_program`, `public_statement`, `parliamentary_vote`, `amendment`, `implemented_action`, `interview`, `secondary_reporting`) ;
- formulation fidèle et contexte ;
- orientation descriptive si explicitement établie (`supports`, `opposes`, `conditional`, `ambiguous`, `not_documented`) ;
- date de l'événement ; date de publication ; période de validité si connue ;
- source(s) ; extrait court localisant la preuve ;
- état de validation ; validateur et date de revue ;
- version éditoriale.

La catégorie `not_documented` doit être produite par l'absence de source dans un périmètre de recherche explicite, jamais par déduction.

### Source

- URL canonique ; titre ; éditeur ; type ; date publiée ; date consultée ;
- référence précise (page, paragraphe, timecode ou identifiant parlementaire) ;
- copie/empreinte de conservation uniquement si légalement et techniquement justifié ;
- statut de disponibilité ; droits de réutilisation.

### EditorialReview

Historique de revue, corrections, désaccords et justification de validation. Conserver les anciennes versions plutôt que les écraser.

## 4. Exemple structurel JSON de session (futur export local P1.5)

```json
{
  "schemaVersion": "1.0.0",
  "methodVersion": "maxdiff-pilot-0.3",
  "exportedAt": "2026-11-10T10:00:00+01:00",
  "dataScope": "user-provided-session-only",
  "statements": [],
  "prioritization": {
    "situationsCatalogVersion": "pilot-v0.3-draft",
    "designVersion": "N8-k4-r4-v1",
    "sessionCompletionStatus": "partial",
    "priorityObservations": [],
    "comprehensionFlags": [],
    "missingSituations": [],
    "reasonExplorations": []
  }
}
```

L'exemple est purement structurel et ne doit jamais être prérempli comme s'il s'agissait d'une vraie réponse utilisateur.

## 5. Validation et versionnement

- Zod valide les exports avant génération et après import éventuel.
- `schemaVersion` versionne le format de données ; `methodVersion` versionne les méthodes.
- Tout changement incompatible exige une migration explicite.
- Refuser les propriétés inconnues pour les objets sensibles ou les normaliser explicitement ; ne pas accepter silencieusement des champs de profil ajoutés par un agent.
- Aucun export contenant une position politique ne doit être envoyé automatiquement.

## 6. Identifiants

- Identifiants aléatoires, sans sens politique.
- Pas de numéro de candidat comme clé métier.
- Ne pas encoder le thème, le choix ou le texte dans l'ID.
- Aucune clé partagée entre sessions individuelles et corpus public.
