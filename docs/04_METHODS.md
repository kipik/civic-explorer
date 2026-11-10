# 04 — Spécification méthodologique

## 1. Principes de mesure

Le moteur ne réduit pas une personne à un vecteur politique unique. Il conserve des observations séparées : déclarations, priorités exprimées, choix de compromis, conditions, incertitudes et abstentions.

Aucune méthode ne doit être présentée comme révélant une « vraie » opinion. Les résultats sont des traces de réponses dans un contexte donné.

## 2. MaxDiff / Best-Worst Scaling (lot `P1.1`)

*(Décision D1 V0.3 : [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) ; spécification consolidée V0.3 : [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md), remplaçant l'orientation D1 de [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md) ; décision de plan : [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md) ; brouillon de bibliothèque candidate : [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md).)*

### Usage et construit mesuré (`D1` V0.3, `D2`, `D3`)

Mesurer **« la priorité relative que l'utilisateur souhaite voir accorder aux différents enjeux collectifs dans les choix à venir »** lorsque tous les enjeux ne peuvent pas recevoir la même attention simultanément.

- Les enjeux collectifs comparés proviennent d'une **bibliothèque éditoriale commune** (`pilot-v0.3-draft`, statut brouillon non encore validé, sans prétention à la neutralité démontrée tant que l'arbitrage humain, la revue pluraliste et le prétest cognitif n'ont pas eu lieu) et sont formulés **de façon descriptive** au même niveau de granularité (`D3`), sans recommander une direction normative, sans présupposer une solution ou une cause non établie, et sans adopter une conception implicite et unique du travail, du logement, de la famille, de l'éducation, de la protection sociale ou des institutions.
- Le MaxDiff ne mesure ni une importance absolue, ni une gravité objective, ni une préoccupation personnelle, ni une préférence partisane, ni l'adhésion à un instrument de politique publique.
- Les préoccupations personnelles ou enjeux manquants sont recueillis **séparément après MaxDiff** (`D2`) et ne sont jamais insérés automatiquement dans les séries standardisées.
- Les raisons, valeurs et critères invoqués sont explorés de manière facultative sur **0 à 2 enjeux** après l'exercice, sans aucune pondération numérique ni fusion avec les choix MaxDiff, et en distinguant jugement normatif, conviction causale/factuelle (`user_stated_unverified`), solution privilégiée et faisabilité perçue.

### Paramètres expérimentaux du pilote (`D4` inchangée) et randomisation contrôlée

- **Configuration pilote retenue :** **`N = 8` enjeux collectifs**, **`b = 8` séries**, **`k = 4` enjeux par série**, **`r = 4` présentations par enjeu** (`k / N = 50 %`, chevauchement consécutif strict `= 1`, zéro paire absente, équilibre exact des positions `[1, 1, 1, 1]`).
- **Plan exact de référence conservé :** **`N = 7` enjeux** (BIBD exact `(7, 4, 2)`, complément du plan de Fano $PG(2,2)$), conservé pour comparaison méthodologique.
- **Statut des paramètres UX :** `k = 4` et `r = 4` restent les paramètres initiaux du pilote (non présentés comme optimum universel) ; une comparaison future avec **`k = 5`** éléments par série est documentée pour des catalogues plus larges ou un protocole ultérieur.
- **Randomisation contrôlée :** bijection aléatoire des items $\pi \in S_8$, permutation globale des 4 positions $\tau \in S_4$, et transformation diédrale $D_8$ sur la séquence des blocs afin de préserver à 100 % l'équilibre des positions et le chevauchement consécutif `= 1`.

### Interaction et états de réponse

Chaque série présente 4 enjeux collectifs ; la consigne de travail à prétester demande à l'utilisateur lesquels devraient recevoir le plus d'attention (passer avant d'autres) et lesquels pourraient attendre, en précisant explicitement que « pourrait attendre » ne signifie ni négligeable, ni opposition à l'enjeu.

Options de réponse au niveau de la série (`MaxDiffResponseState`) : `answered`, `skipped` (passer), `dont_know` (NSP), `no_distinguishable_best_worst` (impossible de distinguer un enjeu à privilégier et un enjeu pouvant attendre, avec motif facultatif `NoDistinguishableBestWorstReason` : `equally_prioritized`, `not_comparable`, `none_should_take_precedence`, `other`).

Le signalement individuel d'une carte (`ItemComprehensionFlag` et `flaggedItemIds`) est **orthogonal** à `MaxDiffResponseState` : un participant peut signaler une formulation tout en conservant une réponse `answered` valide si l'arbitrage reste possible, ou laisser une non-réponse (`skipped`, `dont_know`, `no_distinguishable_best_worst`) et un signalement conservés séparément si la carte empêche la comparaison.

- Un enjeu signalé incompréhensible ou impossible à départager **n'est jamais remplacé automatiquement** par un nouvel enjeu.
- Toute série incomplète conserve son statut explicite et n'est jamais complétée artificiellement.

### Modèle statistique et D-efficacité

Sous le modèle **logit conjoint Best-Worst (BWS Case 1)** (Marley & Louviere, 2005) avec utilités additives $\beta \in \mathbb{R}^N$ et erreurs de type Gumbel :

`P(b, w | S, beta) = exp(beta_b - beta_w) / sum_{i != j, i,j in S} exp(beta_i - beta_j)`

- **Matrice d'information à $\beta = 0$ :** $\mathcal{I}(0) = \frac{2}{k(k-1)} L_\Lambda = \frac{1}{6} L_\Lambda$ (pour $k = 4$), où $\Lambda$ est la matrice des cooccurrences de paires et $L_\Lambda = \operatorname{diag}(\Lambda\mathbf{1}) - \Lambda$ son Laplacien pondéré.
- **D-efficacité locale à $\beta = 0$ (sous paramétrisation de rang $N - 1$, ex. $\beta_N = 0$ ou contrastes orthonormés) :** mesurée par rapport au plan continu idéal parfaitement équilibré par paires au même budget ($\bar{\lambda} = \frac{r(k-1)}{N-1}$) :
  `D_eff = [ prod_{m=2..N} mu_m(L_Lambda) / (N * lambda_bar)^(N - 1) ]^(1 / (N - 1))`
  (`D_eff = 1.0000` pour `N = 7`, `D_eff = 0.9957` et connectivité algébrique $\mu_2 = 12.00$ pour le pilote `N = 8`).
- **Distinction conceptuelle :** distinguer la *régularité combinatoire* (fréquences et cooccurrences), la *connectivité du graphe* ($\mu_2 > 0$, identifiabilité) et l'*efficacité statistique* ($D_{\mathrm{eff}}$ et erreurs-types locales sous modèle à $\beta = 0$ et budget constant).

### Statut statistique en P1.1 et limites asymptotiques

Il faut distinguer quatre niveaux : (1) le **calcul descriptif des choix** réellement posés, (2) le **score `B - W` observé**, (3) l'**estimation d'utilité latente**, et (4) la **fiabilité d'une restitution individuelle**.

Avec un petit nombre de séries ($b = 7$ ou $8$, $r = 4$), les approximations asymptotiques issues de $\mathcal{I}(0)^{-1}$ ne sont pas valides au niveau individuel : distribution finie discrète, séparation complète fréquente rendant le MLE non régularisé inexistant, dégradation de l'information lorsque $\beta \neq 0$, et sensibilité aux données manquantes (`MNAR`). Les erreurs-types théoriques calculées à $\beta = 0$ (`~0.93–0.96` logits pour `N = 8`) ne prouvent pas une impossibilité mathématique absolue d'estimation, mais signalent une information individuelle limitée qui justifie, par **garde-fou de validité**, les règles suivantes en P1.1 :

- Restituer uniquement le **calcul descriptif des choix** : nombre de présentations, expositions effectivement répondues (`answeredExposures`), choix « recevoir le plus d'attention / passer avant » (`bestCount`), choix « pourrait attendre » (`worstCount`), non sélectionné comme extrême dans les séries répondues (`neitherBestNorWorstCount` — jamais `middleCount`), et décompte explicite des séries incomplètes (`partial` / `skipped_all`).
- Ne calculer ni afficher **aucun classement individuel, aucun score `B - W`, aucun estimateur latent et aucun pourcentage de priorité**.
- Ordre principal du parcours : Présentation de la méthode → MaxDiff → Recueil des enjeux manquants → Exploration facultative des raisons ; à explorer qualitativement lors d'un prétest cognitif formatif (8 à 12 participants, étude qualitative non destinée à estimer statistiquement un effet causal de l'ordre) avec la variante où l'expression libre intervient avant MaxDiff — **après arbitrage et validation humaine du catalogue candidat V0.3 uniquement**.

### Après le MVP

Un protocole de calibration préenregistré définira la taille d'échantillon, les comparaisons éventuelles (`k = 5`), l'impact des données manquantes et la pertinence d'un modèle hiérarchique après validation empirique hors échantillon.

## 3. Discrete Choice Experiments (DCE)

### Usage

Explorer des compromis entre attributs de scénarios politiques, pas identifier un candidat.

Chaque alternative comporte un petit nombre d'attributs compréhensibles et de niveaux définis. Les niveaux doivent être réalistes, documentés et équilibrés.

### Modèle exploratoire

`U_nj = beta_n' x_nj + epsilon_nj`

Cette représentation suppose une utilité déclarée et une composante non observée. Un modèle multinomial logit peut être envisagé pour un jeu de choix suffisamment bien conçu ; un mixed logit/hierarchical Bayes exige un protocole et un échantillon adaptés.

### Règles UX et méthodologiques

- présenter les hypothèses et unités ;
- ne pas mélanger une mesure de résultat et un instrument ;
- proposer « aucune des deux », « cela dépend », « informations insuffisantes » ;
- éviter les scénarios artificiellement binaires ;
- randomiser l'ordre lorsque c'est pertinent ;
- documenter les niveaux d'attributs ;
- prétester la compréhension ;
- ne pas interpréter un choix comme engagement réel ou prédiction du vote.

## 4. IRT — phase ultérieure

IRT ne s'applique pas à toutes les déclarations libres ni à toute question politique.

Une dimension latente doit être justifiée théoriquement et empiriquement. Les items doivent mesurer un construit cohérent, avec analyse factorielle, calibration, fonctionnement différentiel et étude de précision.

Pour des réponses ordinales, le modèle de réponse graduée peut être pertinent :

`P(Y_i >= k | theta) = logistic[a_i(theta - b_ik)]`

Ne pas interpréter `theta` comme une idéologie générale ou un diagnostic politique. Éviter de produire une valeur individuelle lorsque l'information est insuffisante ; préférer l'absence d'estimation.

## 5. Questionnement adaptatif

### MVP : règles explicites

Sélectionner la prochaine interaction avec une heuristique transparente :

- couverture des thèmes que l'utilisateur souhaite explorer ;
- absence de répétition récente ;
- présence d'une ambiguïté explicitement signalée ;
- coût cognitif de l'interaction ;
- respect des thèmes refusés ou passés.

Ne pas prétendre calculer un gain d'information probabiliste si aucun modèle calibré ne le permet.

### Version ultérieure

Lorsque des modèles validés existent, l'information attendue ou l'information de Fisher peut guider la sélection. Comparer cette sélection à une stratégie fixe dans une étude préenregistrée.

## 6. Déclarations libres et contradictions

Le texte libre reste la source originale. Une extraction structurée doit garder le lien vers le texte et être confirmée par la personne.

Dans le lot P0.2, la structuration initiale repose sur un découpage local purement déterministe (`deterministic-split-v0.1`, par lignes, marqueurs de liste et frontières de phrases simples), sans analyse sémantique automatique ni pré-attribution thématique. Chaque segment généré reste un brouillon non confirmé (`confirmedByUser: false`) tant que la personne ne l'a pas relu et confirmé.

Relations possibles entre déclarations :

- compatibles ;
- conditionnelles ;
- tension apparente ;
- contextes/horizons différents ;
- précision insuffisante.

Ne pas attribuer de pénalité à une tension. Demander une clarification seulement si cela aide la personne à exprimer ce qu'elle veut dire.

## 7. Échelle d'attitudes

Si une échelle d'accord est utilisée ponctuellement, conserver les catégories ordinales comme catégories. Ne pas supposer que les distances psychologiques entre « tout à fait d'accord », « plutôt d'accord », « incertain », « plutôt pas d'accord », « pas du tout d'accord » sont égales.

Séparer au minimum : `agree`, `somewhat_agree`, `uncertain`, `somewhat_disagree`, `disagree`, `dont_know`, `skip`, `depends`.

## 8. Incertitude et incomplétude

- Afficher le nombre exact de séries présentées et de séries effectivement comparées (`answeredExposures`) soutenant une synthèse.
- Conserver les données incomplètes avec leur statut explicite (`skipped`, `dont_know`, `no_distinguishable_best_worst` et éventuel motif `NoDistinguishableBestWorstReason`) ainsi que les signalements orthogonaux (`flaggedItemIds` / `ItemComprehensionFlag`), et ne jamais afficher une restitution artificiellement complète.
- Distinguer « peu exploré » de « incertain » et de « non exprimé ».
- Ne pas calculer d'intervalle de confiance ou d'utilité latente individuelle sans modèle calibré justifié.
- Ne pas transformer les probabilités de choix en certitude personnelle.
- L'utilisateur peut contester ou corriger toute synthèse.

## 9. Expérimentation et pré-enregistrement

Avant un pilote quantitatif, consigner : hypothèses, population, recrutement, items, plan expérimental, critères d'exclusion, méthodes d'estimation, métriques et limites. Les données de recherche éventuelles nécessitent un cadrage RGPD distinct ; elles ne doivent pas être collectées via la production sans protocole approuvé.
