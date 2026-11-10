# Civic Explorer — Vérification indépendante des artefacts MaxDiff P1.1

**Date :** 10 novembre 2026  
**Périmètre :** `P1_1_METHODOLOGY_AUDIT.md`, `METRICS_REPORT.md`, `designs_N6_to_N13.json`  
**Nature :** vérification indépendante des données exportées et revue critique pré-implémentation.

## 1. Conclusion exécutive

Les plans exportés pour **N = 6 à 13 sont cohérents avec les principaux invariants combinatoires annoncés**. J'ai recalculé directement à partir des blocs JSON les fréquences de chaque item, les cooccurrences de toutes les paires, l'équilibre des positions, l'absence de doublons intra-bloc et de blocs dupliqués, la connectivité, la D-efficacité et les erreurs-types de contraste sous le modèle et au point de référence indiqués.

Pour le plan pilote **N = 8**, les propriétés vérifiées sont :
- 8 blocs de 4 items ;
- chaque item apparaît exactement 4 fois ;
- chaque item apparaît exactement une fois à chacune des quatre positions ;
- les 28 paires sont toutes présentées : 8 paires apparaissent une fois et 20 apparaissent deux fois ;
- aucun bloc dupliqué ;
- chaque bloc consécutif (dans la séquence fournie) partage exactement un item ;
- connectivité algébrique recalculée : 12 ;
- D-efficacité recalculée : 0,995677, soit environ 99,57 % selon la normalisation décrite ci-dessous ;
- SE Fisher des contrastes : minimum 0,9282, moyenne 0,9393, maximum 0,9634.

**Avis :** le travail mathématique exporté est solide et le plan N=8 est un candidat raisonnable pour le pilote. Cela ne valide cependant ni les formulations des situations, ni la qualité cognitive de l'exercice, ni une estimation fiable des préférences individuelles.

## 2. Contrôles effectués directement sur `designs_N6_to_N13.json`

Pour chaque N de 6 à 13, j'ai recalculé les métriques à partir de `blocks_1_indexed` :

| Propriété | Résultat indépendant |
|---|---|
| Nombre de blocs | égal à N |
| Taille de chaque bloc | exactement 4 |
| Unicité intra-bloc | vérifiée |
| Identifiants dans l'intervalle 1..N | vérifiés |
| Fréquence de chaque item | exactement 4 |
| Équilibre des positions par item | `[1, 1, 1, 1]` |
| Blocs distincts (ordre ignoré) | N blocs distincts |
| Paires jamais co-présentées | 0 pour chaque N |
| Étendue des cooccurrences | 0 ou 1 |
| Histogrammes de paires | identiques au rapport de métriques |
| Connectivité algébrique | identique aux valeurs rapportées à l'arrondi près |

Les histogrammes recalculés sont :

| N | Histogramme des cooccurrences | Étendue |
|---:|---|---:|
| 6 | 9 paires à 2 ; 6 paires à 3 | 1 |
| 7 | 21 paires à 2 | 0 |
| 8 | 8 paires à 1 ; 20 paires à 2 | 1 |
| 9 | 18 paires à 1 ; 18 paires à 2 | 1 |
| 10 | 30 paires à 1 ; 15 paires à 2 | 1 |
| 11 | 44 paires à 1 ; 11 paires à 2 | 1 |
| 12 | 60 paires à 1 ; 6 paires à 2 | 1 |
| 13 | 78 paires à 1 | 0 |

Les histogrammes ont la variance minimale possible compte tenu de leur moyenne et du caractère entier des cooccurrences : les valeurs se répartissent entre la partie entière de la moyenne et l'entier immédiatement supérieur.

## 3. Recalcul indépendant de D-efficacité et des erreurs-types

### 3.1 Matrice d'information

Pour chaque plan, j'ai construit la matrice symétrique de cooccurrence `Λ`, où `Λ[i,j]` est le nombre de blocs contenant simultanément les items i et j. J'ai ensuite construit le Laplacien :

\[
L_\Lambda = \operatorname{diag}(\Lambda \mathbf{1})-\Lambda
\]

Sous le modèle logit conjoint best-worst retenu dans le rapport, avec quatre items par bloc et au point de référence \(\beta=0\), la matrice d'information annoncée est :

\[
\mathcal I(0)=\frac{1}{6}L_\Lambda
\]

J'ai recalculé les valeurs propres, la connectivité algébrique et les contrastes à partir de cette matrice.

### 3.2 D-efficacité

La valeur rapportée correspond à la normalisation suivante, par rapport au plan idéal continu ayant une cooccurrence moyenne identique pour toutes les paires :

\[
D_\mathrm{eff} =
\left[
\frac{\prod_{m=2}^{N}\mu_m(L_\Lambda)}
{(N\bar{\lambda})^{N-1}}
\right]^{1/(N-1)}
\]

où les \(\mu_m\) sont les valeurs propres positives du Laplacien et \(\bar{\lambda}=12/(N-1)\).

Les valeurs recalculées concordent avec le JSON et le rapport :
- N=7 et N=13 : 1,0000 ;
- N=8 : 0,9957 ;
- N=9 : 0,9941 ;
- N=10 : 0,9938 ;
- N=11 : 0,9949 ;
- N=12 : 0,9971.

Cette D-efficacité est **conditionnelle au modèle, au point \(\beta=0\), à la structure de choix et à la normalisation retenus**. Elle ne signifie pas que le questionnaire mesure à 99,5 % la priorité « réelle » des citoyens, ni que les items éditoriaux sont neutres ou valides.

### 3.3 Erreurs-types Fisher

J'ai également recalculé les erreurs-types des contrastes \(\hat\beta_i-\hat\beta_j\), à partir de la pseudo-inverse de la matrice d'information. Les valeurs minimum, moyenne et maximum concordent avec celles du rapport, à l'arrondi près.

**Interprétation à corriger :** ces valeurs constituent une mesure locale de l'information théorique sous le modèle et au point \(\beta=0\). Elles ne démontrent pas une impossibilité mathématique absolue d'estimer des préférences individuelles. Elles signalent plutôt que, avec seulement quatre expositions par item, le plan fournit peu d'information pour prétendre à des estimations individuelles latentes précises et validées. Le choix de ne publier aucun score ni classement individuel dans P1.1 reste une excellente décision produit et méthodologique, mais il doit être présenté comme un garde-fou de validité, et non comme un théorème d'impossibilité.

## 4. Faisabilité BIBD et bornes arithmétiques

Avec `b=N`, `k=4` et `r=4`, la cooccurrence moyenne est :

\[
\bar\lambda = \frac{r(k-1)}{N-1}=\frac{12}{N-1}
\]

Dans la plage N=6..13, une valeur entière n'est possible que pour N=7 et N=13. Les blocs exportés satisfont effectivement :
- N=7 : toutes les paires apparaissent exactement deux fois ;
- N=13 : toutes les paires apparaissent exactement une fois.

Attention au libellé `b_min si BIBD` dans le tableau : les nombres 15, 14, 18, 15, 55 et 33 pour N=6, 8, 9, 10, 11 et 12 sont les **plus petites valeurs satisfaisant les contraintes arithmétiques nécessaires** (divisibilité et intégralité de r et λ). Sans construction explicite ni preuve d'existence séparée, il ne faut pas les présenter comme des BIBD effectivement construits ou dont l'existence serait démontrée dans cet audit. Renommer cette colonne, par exemple, `b_min_arithmetique_necessaire_si_BIBD`.

## 5. Positionnement et ordre des blocs

L'équilibre `[1,1,1,1]` est vérifié sur tous les plans exportés.

Pour N=8, 9, 10, 11, 12 et 13, le chevauchement entre blocs consécutifs dans la séquence JSON est toujours égal à 1. Pour N=6 et 7, il est égal à 2, ce qui est cohérent avec les contraintes combinatoires relevées.

Une permutation globale des quatre positions et une bijection globale des identifiants d'items préservent l'équilibre des positions et les cooccurrences. En revanche, **une permutation arbitraire de l'ordre des blocs ne préserve pas la propriété de faible chevauchement consécutif**. Pour le pilote N=8, retenir une randomisation de séquence qui conserve explicitement cette propriété : rotations/inversions de la séquence, ou tirage parmi des séquences admissibles calculées hors production.

Le taux Monte Carlo `1000/1000` rapporté pour la randomisation contrôlée n'a pas pu être reproduit exactement, car le script source `audit_maxdiff_designs.py` n'a pas été fourni. Les invariants des plans canoniques ont été recalculés directement ; le test du code de randomisation reste à reproduire quand le script sera disponible.

## 6. Points méthodologiques à corriger dans l'audit

### 6.1 Ne pas présenter le SE comme une preuve d'impossibilité

Remplacer les formulations du type « impossibilité mathématique d'estimation individuelle » par :

> « Avec quatre expositions par item, l'information attendue sous le modèle joint BWS Case 1 au point β=0 est limitée. Les erreurs-types théoriques calculées ne justifient pas une restitution individuelle en termes d'utilités latentes ou de classement. P1.1 se limite donc volontairement aux observations descriptives et à leur contexte. »

### 6.2 Les items non sélectionnés ne sont pas des rangs intermédiaires

Dans chaque bloc Case 1, l'utilisateur désigne un item Best et un item Worst. Les deux autres ne sont pas ordonnés entre eux.

Éviter le libellé `middleCount`, qui laisse penser à une position intermédiaire mesurée. Préférer `neitherBestNorWorstCount` ou `nonSelectedCount`. Ne pas afficher ces items comme ex æquo ou « moyens » : leur non-sélection signifie seulement qu'ils n'ont pas été choisis comme extrêmes dans cette série.

### 6.3 Harmoniser les décisions de parcours et la spécification

L'audit actuel conserve en §6.1 une recommandation d'Ordre A et en §8 des questions ouvertes. Or les arbitrages intervenus après l'audit ont retenu comme hypothèse principale l'Ordre B :
1. Présentation de la méthode et du panorama commun.
2. Exercice MaxDiff.
3. Expression libre complémentaire et signalement des omissions.
4. Exploration facultative des raisons.

L'Ordre A reste une variante à comparer en entretiens cognitifs, et non le parcours nominal.

Autres décisions déjà arbitrées à intégrer dans la V0.2 :
- N=8 pour le premier pilote, avec N=7 comme plan exact de comparaison.
- Quatre items par bloc et quatre expositions par item comme paramètres initiaux, pas comme optimum universel.
- 0, 1 ou 2 situations peuvent être expliquées, y compris une situation placée du côté « pourrait attendre ».
- Pas de remplacement automatique d'une carte incompréhensible.
- Préserver le faible chevauchement consécutif par une randomisation contrôlée.

### 6.4 Clarifier les états de réponse

Les états `dont_know`, `incomparable_or_tied`, `none_prioritized` et `skipped` doivent avoir des définitions utilisateur distinctes avant implémentation. En particulier, `none_prioritized` semble potentiellement redondant avec `incomparable_or_tied`. Ne pas conserver deux états qui décrivent la même action avec des mots différents.

### 6.5 Prétest et gouvernance éditoriale

Le test cognitif de 8 à 12 personnes est un prétest qualitatif utile, pas une validation statistique de neutralité ni une validation représentative. Le jeu de huit situations doit rester explicitement `pilot-v0.1` / brouillon illustratif tant qu'une revue pluraliste n'a pas été menée.

## 7. Recommandation finale

**Feu vert pour consolider la spécification P1.1 V0.2 ; pas encore de feu vert pour coder le moteur.**

Avant implémentation :
1. Corriger les affirmations statistiques trop catégoriques.
2. Remplacer `middleCount` par un compte des items non sélectionnés.
3. Mettre à jour le parcours nominal sur l'Ordre B.
4. Fermer les questions de réponse ambiguës (`none_prioritized`, incompréhensible, incomparable).
5. Figurer les paramètres N=8, plan exact N=7 comparatif, k=4, r=4.
6. Conserver le jeu de situations comme prototype éditorial non validé.
7. Obtenir le script source pour reproduire le générateur, la randomisation et le Monte Carlo.

Le cœur combinatoire des fichiers exportés peut être retenu comme référence candidate, sous réserve de ces corrections documentaires et UX.
