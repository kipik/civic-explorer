# 05 — Parcours et interactions UX

## 1. Parcours de base

### Parcours P0.2 actuellement implémenté (`/parcours`)
1. Expression libre (`free_expression`) ;
2. Structuration locale déterministe (`structuring`) ;
3. Confirmation explicite (`confirmation`) ;
4. Cartographie initiale (`mapping`).

### Parcours cible unifié P1.1 V0.3 (ordre principal conservé — [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md), historique V0.2.1 dans [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md))

Afin de limiter l'amorçage des comparaisons standardisées par les préoccupations spontanées immédiates, l'ordre principal P1.1 place le questionnement MaxDiff **avant** le recueil libre des enjeux manquants et des préoccupations personnelles :

1. **Présentation de la méthode** : accueil, finalité non prescriptive, confidentialité locale en mémoire d'onglet, et présentation neutre des 8 enjeux collectifs communs (`pilot-v0.3-draft`, clairement balisé brouillon provisoire tant que l'arbitrage humain, la revue pluraliste et le prétest cognitif ne sont pas finalisés) avec note de périmètre non prescriptive facultative (inclus/exclu) et option de passer l'exercice.
2. **MaxDiff (`N=8`, `b=8`, `k=4`, `r=4` ; référence `N=7`)** : comparaisons relatives de priorité d'attention entre enjeux collectifs (« devrait recevoir le plus d'attention » / « pourrait attendre » — formulations à prétester) avec options explicites de passage (`skipped`), NSP (`dont_know`), impossible de distinguer un enjeu prioritaire et un enjeu pouvant attendre (`no_distinguishable_best_worst` + motif facultatif), et signalement orthogonal de carte (`ItemComprehensionFlag`, sans blocage d'une réponse encore possible et sans substitution automatique d'item).
3. **Recueil des enjeux manquants (et expression libre complémentaire P0.2)** : saisie séparée des enjeux collectifs absents de la bibliothèque commune et des préoccupations personnelles, avec relecture/structuration/confirmation manuelle et explication transparente de leur séparation d'avec les comparaisons MaxDiff (`D2`).
4. **Exploration facultative des raisons (`0 à 2` enjeux)** : choix libre par la personne (y compris d'un enjeu placé « pourrait attendre » ou difficile à départager), sans influence rétroactive ni pondération, avec séparation explicite entre raison normative, conviction causale/factuelle et solution éventuellement envisagée.
5. **Arbitrages DCE (phase ultérieure EPIC 2)** : scénarios optionnels, non introduits sans contexte.
6. **Synthèse descriptive multi-panneaux** : restitution séparée et éditable des observations MaxDiff (avec statut d'incomplétude explicite et sans classement), des enjeux manquants/déclarations confirmées et des raisons exprimées.
7. **Export et effacement (lot P1.5)** : export JSON explicite ; aucune sauvegarde distante ; effacement immédiat en mémoire.

*(Protocole de prétest cognitif formatif qualitatif : 8 à 12 entretiens — **à ne lancer qu'après validation humaine du catalogue candidat V0.3** — pour explorer la compréhension des formulations, des notes de périmètre et des indices qualitatifs d'amorçage entre cet ordre principal et la variante où l'expression libre P0.2 intervient avant MaxDiff, sans prétendre estimer statistiquement un effet causal de l'ordre.)*

Ne jamais présenter le parcours comme un test ou un examen. Pas de barre de « réussite » ni de progression qui culpabilise l'utilisateur.

## 2. Microcopies de référence

### Introduction

« Cet espace vous aide à clarifier ce qui compte pour vous et à examiner des propositions publiques. Il ne choisit pas de candidat et ne prédit pas votre vote. Vous pouvez passer une question ou interrompre à tout moment. Dans ce prototype, vos réponses restent dans cet onglet et ne sont pas envoyées à un serveur. »

### Expression libre (socle P0.2 existant)

Question principale retenue pour le parcours P0.2 :

« Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France ? »

Sous-titre d'accompagnement : « Vous pouvez écrire un mot, une phrase, une liste à puces ou plusieurs paragraphes, sans chercher les bons mots. »

### Confirmation

« Voici ce que j'ai compris. Qu'est-ce qui correspond à votre pensée ? Vous pouvez corriger, nuancer ou supprimer chaque élément. »

### MaxDiff (hypothèses de travail P1.1 V0.3 — [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) § 6 — à prétester cognitivement après validation humaine du catalogue candidat)

- **Consigne de travail candidate (V0.3, remplaçant les variantes V0.2 orientées « changements à traiter ») :** « Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient recevoir le plus d'attention, et lesquels pourraient attendre ? »
- **Explication obligatoire de « pourrait attendre » :** « Choisir “pourrait attendre” exprime uniquement une priorité relative dans cette comparaison : cela ne signifie ni que l'enjeu est négligeable, ni que vous vous y opposez. »
- **États de réponse sur la série :** proposer distinctement « Passer cette série » (`skipped`), « Je ne sais pas choisir » (`dont_know`) et « Impossible de distinguer un enjeu prioritaire et un enjeu pouvant attendre » (`no_distinguishable_best_worst` avec motifs facultatifs : tous également prioritaires, enjeux non comparables, aucun ne devrait passer avant les autres, ou autre).
- **Signalement orthogonal d'une carte :** permettre sur chaque carte de signaler une formulation trop vague, incompréhensible, orientée/présupposant une solution (`loaded_wording`), ou hors périmètre des choix collectifs (`outside_collective_scope`), **sans confondre avec l'absence de préoccupation personnelle** et sans obliger à abandonner la série si l'arbitrage reste possible (si la carte empêche la comparaison, la personne peut passer ou choisir un état de non-réponse tout en conservant le signalement).
- **Information de non-substitution :** si une carte est signalée, indiquer clairement qu'elle n'est pas remplacée automatiquement pour préserver l'intégrité des comparaisons.

### Enjeux manquants et raisons (P1.1 V0.3)

- **Enjeux manquants :** « Manque-t-il un enjeu collectif important qui ne figurait pas dans ces propositions ? Vos ajouts apparaîtront séparément dans votre synthèse sans modifier les comparaisons ci-dessus. »
- **Raisons (0 à 2 enjeux, symétrique) :** « Si vous le souhaitez, choisissez jusqu'à 2 enjeux pour préciser ce qui motive votre choix (y compris un enjeu que vous avez placé “pourrait attendre” ou trouvé difficile à départager). »

### Conditions

« Dans quelles circonstances votre réponse pourrait-elle changer ? »

### Rejet des deux (réservé aux scénarios binaires DCE — EPIC 2)

« Aucune des deux propositions ne vous convient. Vous pouvez expliquer ce qui manque ou passer. »

## 3. Composants fonctionnels

- `FreeTextPrompt` : saisie libre, limite de taille clairement affichée, pas de transmission réseau.
- `StatementEditor` : texte original et champs facultatifs de précision.
- `EditorialPanorama` *(P1.1)* : affichage neutre des 8 enjeux collectifs communs (`pilot-v0.3-draft`), note de périmètre dépliable (inclus/exclu) et signalement sans blocage.
- `BestWorstCard` *(P1.1)* : sélection mutuellement exclusive « devrait recevoir le plus d'attention » / « pourrait attendre » parmi 4 enjeux ; correction immédiate et retour arrière vers toute série précédente.
- `MaxDiffResponsePicker` *(P1.1)* : `skipped`, `dont_know`, `no_distinguishable_best_worst` (avec sous-motifs `NoDistinguishableBestWorstReason`), complété par une action orthogonale de signalement par carte (`ItemComprehensionFlag`, sans substitution automatique d'item).
- `MissingSituationPrompt` *(P1.1)* : recueil séparé post-MaxDiff des enjeux collectifs absents et préoccupations libres.
- `ReasonExplorationPanel` *(P1.1)* : exploration facultative de 0 à 2 enjeux, pistes non exclusives randomisées, conditions et champ séparé pour convictions causales (`user_stated_unverified`).
- `DescriptivePriorityTable` *(P1.1)* : comptages bruts (`totalPresentedCount`, `answeredExposures`, `bestCount`, `worstCount`, `neitherBestNorWorstCount`, signalements séparés `flaggedCount`) sans tri par score, sans pourcentage et avec statut d'incomplétude explicite.
- `ResponseStatePicker` *(EPIC 2 DCE)* : NSP, passer, incertain, dépend, rejeter les deux.
- `ConditionEditor` : préciser des conditions sans obligation.
- `ThemePicker` : taxonomie navigable et option « je ne sais pas où classer ».
- `SessionSummary` : vue neutre multi-panneaux et éditable.
- `ExportDialog` *(P1.5)* : aperçu, mise en garde et confirmation d'export.
- `ClearSessionDialog` : confirmation d'effacement local.

## 4. États obligatoires

Chaque composant doit traiter : initial, actif, répondu (`answered`), passé (`skipped`), NSP (`dont_know`), impossible de distinguer premier/attendre (`no_distinguishable_best_worst` et ses sous-motifs), signalement orthogonal de carte avec ou sans réponse valide (sans substitution), session partielle ou incomplète conservée explicitement, erreur de validation, vide, reprise après correction et petit écran.

## 5. Accessibilité

Cible WCAG 2.2 AA :

- ordre de tabulation logique ;
- focus visible ;
- groupes de boutons correctement nommés ;
- annonces de validation accessibles ;
- aucune information par couleur seule ;
- zoom et reflow mobile ;
- labels associés ;
- zones tactiles suffisantes ;
- alternatives textuelles pour les graphiques futurs.

## 6. Ton éditorial

- descriptif, calme, non partisan ;
- pas de langage culpabilisant ou émotionnel ;
- éviter « incohérent », « contradictoire » ou « irrationnel » pour parler d'une personne ;
- préférer « tension à préciser », « condition non explorée », « réponses exprimées dans des contextes différents » ;
- ne pas faire passer une hypothèse pour un fait.

## 7. Résumé final

Présenter uniquement, en panneaux séparés :

- les choix MaxDiff réellement effectués sous forme strictement descriptive (expositions présentées vs séries effectivement comparées, `bestCount`, `worstCount`, `neitherBestNorWorstCount`) en conservant explicitement les statuts incomplets sans complétude artificielle ;
- les enjeux manquants et formulations personnelles confirmées ;
- les raisons facultatives (0 à 2 enjeux), conditions déclarées et convictions causales distinguées comme non vérifiées ;
- les séries passées, signalées ou non explorées ;
- les limites de l'exercice et le statut `pilot-v0.3-draft` du catalogue.

Ne pas transformer ces éléments en score `B - W`, utilité latente, classement individuel, couleur politique, catégorie idéologique ou conseil électoral.
