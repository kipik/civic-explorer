# Civic Explorer — P1.1 : décisions de conception et complément de mission d'audit

**Version :** 0.2 — 10 novembre 2026  
**Statut :** décisions de cadrage validées par le concepteur ; spécification d'implémentation non encore validée.

## 1. Décisions validées

### D1 — Construit principal mesuré

Le premier exercice MaxDiff porte sur **la priorité relative accordée aux changements que la personne estime souhaitables pour la société**.

Les raisons expliquant ces choix seront explorées séparément. Le moteur ne fusionnera pas les priorités et les justifications dans un score unique.

À distinguer explicitement :
- préoccupation personnelle ;
- gravité perçue d'une situation ;
- priorité relative d'un changement souhaité ;
- faisabilité ou efficacité perçue de l'action collective ;
- raisons, valeurs et convictions causales qui motivent le choix.

La formulation exacte de la consigne utilisateur reste à prétester cognitivement. La formulation de travail est :

> Quand il faudra faire des choix pour le pays, quels changements devraient passer avant les autres ?
>
> On ne peut pas tout faire avancer en même temps. Nous allons vous présenter différentes situations et vous demander lesquelles devraient, selon vous, passer en premier et lesquelles pourraient attendre.

Cette formulation est une hypothèse de conception, pas une formulation déjà démontrée neutre.

### D2 — Origine des situations

Adopter une **approche hybride** :
1. une bibliothèque éditoriale commune, documentée, pluraliste et prétestée, utilisée pour les comparaisons MaxDiff standardisées ;
2. une possibilité pour l'utilisateur de signaler ou formuler une situation absente.

Les ajouts libres ne sont **pas insérés automatiquement** dans les blocs MaxDiff standardisés. Ils sont conservés comme éléments qualitatifs à clarifier et pourront faire l'objet d'une exploration distincte. Leur intégration éventuelle dans une future version standardisée exigera une validation éditoriale et méthodologique.

### D3 — Unité de comparaison

L'unité présentée dans un exercice MaxDiff est une **situation concrète que la personne estime devoir voir évoluer / un changement souhaité**, formulée à un niveau de granularité comparable aux autres éléments du même exercice.

Ne pas mélanger dans un même jeu d'items :
- problèmes ou situations actuelles ;
- changements souhaités ;
- objectifs normatifs généraux ;
- instruments ou solutions politiques ;
- valeurs abstraites.

Ces objets peuvent être reliés dans le modèle documentaire, mais leur comparaison directe dans un même bloc est proscrite tant que l'équivalence de construit n'a pas été établie.

### D4 — Conception mathématique des blocs

Le concepteur délègue à l'équipe de conception méthodologique la recommandation du plan d'expérience. Il ne souhaite pas avoir à arbitrer les détails mathématiques.

La recommandation devra privilégier la qualité et l'auditabilité du plan, sans forcer artificiellement le nombre d'items pour obtenir un plan BIBD exact.

Paramètres initiaux à examiner, non encore figés :
- 6 à 13 items ;
- 4 items par bloc ;
- nombre de blocs égal au nombre d'items ;
- 4 présentations par item.

Pour le schéma équilibré symétrique où `v = b = N`, `k = r = 4`, le paramètre BIBD nécessaire serait :

\[
\lambda = \frac{r(k-1)}{v-1} = \frac{12}{N-1}
\]

Un BIBD exact exige que `lambda` soit entier et que les autres conditions d'existence soient satisfaites. Dans l'intervalle 6–13, `N=7` (`lambda=2`) et `N=13` (`lambda=1`) satisfont cette condition et des constructions existent. Pour les autres tailles, un plan parfaitement équilibré par paires n'est pas possible avec ces paramètres ; il faut étudier des plans quasi équilibrés.

**Règles de conception recommandées pour l'audit :**
1. Ne pas choisir `N` uniquement pour obtenir un BIBD exact.
2. Chercher en priorité une fréquence d'apparition identique pour chaque item (si le schéma retenu le permet).
3. Chercher une exposition aussi équilibrée que possible des paires d'items, avec graphe de cooccurrence connecté.
4. Éviter les paires jamais comparées lorsque c'est réalisable.
5. Équilibrer les positions d'affichage ; si chaque item apparaît quatre fois, viser une occurrence dans chacune des quatre positions.
6. Mesurer et publier les écarts résiduels : minimum, maximum, moyenne et variance des fréquences de cooccurrence ; fréquences par position ; connectivité ; répétitions de blocs.
7. Comparer plusieurs plans candidats selon une fonction objectif explicitée plutôt que déclarer un plan « équilibré » sans preuve.
8. Prévoir une randomisation contrôlée de l'ordre des blocs et des positions, sans détruire les contraintes d'équilibrage.
9. Conserver les scripts, graines aléatoires, plans générés et rapports de validation comme artefacts auditables.

La propriété mathématique suivante peut être utilisée : un graphe biparti d'incidence régulier admet une décomposition en appariements parfaits. Cela permet, lorsque le plan d'incidence est 4-régulier des deux côtés, d'affecter les quatre positions de sorte que chaque item apparaisse une fois à chaque position. Cette propriété doit être expliquée et vérifiée dans la génération retenue.

Aucune précision individuelle ne doit être revendiquée sur la seule base de quatre choix par item. Le premier MVP produit des observations descriptives ; toute estimation de préférence latente ou d'incertitude individuelle est différée jusqu'à validation empirique.

## 2. Complément à la mission d'audit Antigravity

Les trois premières décisions (D1–D3) sont des contraintes de conception validées. Antigravity doit vérifier leurs implications et identifier les risques, mais ne doit pas les remplacer silencieusement.

Pour D4, Antigravity doit produire les calculs, comparer les plans candidats et documenter les compromis. La recommandation finale sera arbitrée par le responsable méthodologique du projet, sans demander au concepteur de choisir parmi des détails mathématiques.

La mission reste strictement documentaire : aucun changement dans `src/`, aucune dépendance et aucune implémentation applicative.

### Questions de calcul à couvrir

Pour chaque `N` dans l'intervalle étudié :
- faisabilité BIBD exacte ;
- construction exacte si elle existe ;
- plan quasi équilibré sinon ;
- nombre de blocs, taille des blocs et fréquence des items ;
- matrice complète des cooccurrences ;
- distribution des fréquences de paires ;
- graphe de cooccurrence et composantes connexes ;
- fréquence de chaque item à chacune des positions ;
- éventuels blocs dupliqués ;
- équilibre de l'ordre de présentation ;
- comparaison de plusieurs fonctions objectif et analyse de sensibilité.

### Critères de choix de la fonction objectif

Comparer au minimum :
- minimisation de la variance des fréquences de paires ;
- minimisation de l'écart maximal entre fréquences de paires ;
- pénalité forte pour les paires jamais co-présentées ;
- pénalité pour les blocs identiques ;
- contraintes dures sur les fréquences d'apparition et l'équilibre des positions lorsque faisables.

Ne pas utiliser une somme pondérée opaque sans publier les poids et une analyse de sensibilité. Les contraintes dures et les objectifs souples doivent être distingués.

## 3. Livrables attendus

1. Un audit méthodologique consolidé `docs/P1_1_METHODOLOGY_AUDIT.md`.
2. Un script reproductible de génération/évaluation des plans, placé dans `research/` ou `docs/experiments/`, hors code de production.
3. Des plans candidats au format CSV/JSON.
4. Un rapport lisible des métriques pour chaque taille N.
5. Une liste courte des décisions encore ouvertes, sans rouvrir D1–D3 sauf si une contradiction majeure est démontrée.

## 4. Garde-fous

- Ne pas créer de score global des convictions.
- Ne pas comparer directement des priorités personnelles et des positions de candidats.
- Ne pas convertir les items ajoutés librement en items standardisés sans validation.
- Ne pas présenter la formulation ou la taxonomie comme neutre par défaut.
- Ne pas revendiquer une précision statistique individuelle non démontrée.
- Ne pas commencer le développement du moteur MaxDiff.
