# 04 — Spécification méthodologique

## 1. Principes de mesure

Le moteur ne réduit pas une personne à un vecteur politique unique. Il conserve des observations séparées : déclarations, priorités exprimées, choix de compromis, conditions, incertitudes et abstentions.

Aucune méthode ne doit être présentée comme révélant une « vraie » opinion. Les résultats sont des traces de réponses dans un contexte donné.

## 2. MaxDiff / Best-Worst Scaling

### Usage

Explorer les priorités relatives entre éléments présentés ensemble.

### Interaction

Un ensemble équilibré présente 4 à 6 éléments. L'utilisateur choisit le plus important et le moins important parmi ceux qu'il souhaite effectivement comparer.

Options de réponse : passer, NSP, impossible à départager, aucun de ces éléments, ou demander une explication.

### Modèle

Dans un modèle logit Best-Worst avec utilités additives et erreurs de type Gumbel, une forme de probabilité conjointe est :

`P(b,w | S, beta) = exp(beta_b - beta_w) / sum_{i != j, i,j in S} exp(beta_i - beta_j)`

Cette formule n'est pas un score individuel fiable par elle-même. Elle décrit un modèle statistique d'observations répétées sous hypothèses.

### MVP

- Implémenter l'interaction et la validation des réponses, pas un estimateur latent sophistiqué.
- Présenter les choix bruts : éléments choisis comme « plus important », « moins important », nombre d'expositions et abstentions.
- Ne pas afficher un classement psychométrique ou un pourcentage de priorité.
- Un exercice de démonstration court est uniquement une expérience UX, pas une mesure robuste.

### Après le MVP

Un protocole de calibration définira le nombre de tâches, le plan de blocs, la couverture des items, la randomisation d'ordre, les effets de position et la taille d'échantillon nécessaire. Un modèle hiérarchique ne sera retenu qu'après étude de simulation et validation hors échantillon.

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

## 8. Incertitude

- Afficher le nombre d'observations qui soutient une synthèse.
- Distinguer « peu exploré » de « incertain » et de « non exprimé ».
- Ne pas calculer d'intervalle de confiance sans modèle justifié.
- Ne pas transformer les probabilités de choix en certitude personnelle.
- L'utilisateur peut contester ou corriger toute synthèse.

## 9. Expérimentation et pré-enregistrement

Avant un pilote quantitatif, consigner : hypothèses, population, recrutement, items, plan expérimental, critères d'exclusion, méthodes d'estimation, métriques et limites. Les données de recherche éventuelles nécessitent un cadrage RGPD distinct ; elles ne doivent pas être collectées via la production sans protocole approuvé.
