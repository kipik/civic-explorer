# 05 — Parcours et interactions UX

## 1. Parcours de base

1. Accueil : expliquer la finalité et les limites en langage courant.
2. Préoccupations : invitation ouverte à écrire ce qui compte pour la personne.
3. Relecture : la personne peut organiser elle-même ses idées ou confirmer une synthèse qu'elle a modifiée.
4. Priorités : interaction Best-Worst courte et expliquée.
5. Arbitrages : scénarios optionnels, non introduits sans contexte.
6. Synthèse : déclarations, priorités observées, sujets non explorés.
7. Export : choix explicite ; aucune sauvegarde distante.

Ne jamais présenter le parcours comme un test ou un examen. Pas de barre de « réussite » ni de progression qui culpabilise l'utilisateur.

## 2. Microcopies de référence

### Introduction

« Cet espace vous aide à clarifier ce qui compte pour vous et à examiner des propositions publiques. Il ne choisit pas de candidat et ne prédit pas votre vote. Vous pouvez passer une question ou interrompre à tout moment. Dans ce prototype, vos réponses restent dans cet onglet et ne sont pas envoyées à un serveur. »

### Expression libre

Question principale retenue pour le parcours P0.2 :

« Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France ? »

Sous-titre d'accompagnement : « Vous pouvez écrire un mot, une phrase, une liste à puces ou plusieurs paragraphes, sans chercher les bons mots. »

### Confirmation

« Voici ce que j'ai compris. Qu'est-ce qui correspond à votre pensée ? Vous pouvez corriger, nuancer ou supprimer chaque élément. »

### MaxDiff

« Parmi ces sujets, lequel vous paraît le plus important à traiter ? Et lequel vous paraît le moins prioritaire dans cette liste ? Il n'y a pas de bonne réponse. Vous pouvez aussi passer. »

### Conditions

« Dans quelles circonstances votre réponse pourrait-elle changer ? »

### Rejet des deux

« Aucune des deux propositions ne vous convient. Vous pouvez expliquer ce qui manque ou passer. »

## 3. Composants fonctionnels

- `FreeTextPrompt` : saisie libre, limite de taille clairement affichée, pas de transmission réseau.
- `StatementEditor` : texte original et champs facultatifs de précision.
- `BestWorstCard` : sélection du plus et du moins ; impossible de sélectionner le même élément.
- `ResponseStatePicker` : NSP, passer, incertain, dépend, rejeter les deux.
- `ConditionEditor` : préciser des conditions sans obligation.
- `ThemePicker` : taxonomie navigable et option « je ne sais pas où classer ».
- `SessionSummary` : vue neutre et éditable.
- `ExportDialog` : aperçu, mise en garde et confirmation d'export.
- `ClearSessionDialog` : confirmation d'effacement local.

## 4. États obligatoires

Chaque composant doit traiter : initial, actif, répondu, passé, NSP, erreur de validation, vide, reprise après correction et petit écran.

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

Présenter uniquement :

- les formulations confirmées ;
- les choix réellement effectués ;
- les conditions déclarées ;
- les sujets passés ou non explorés ;
- les limites de l'exercice.

Ne pas transformer ces éléments en score, couleur politique, catégorie idéologique ou conseil électoral.
