# 00 — Brief produit

## 1. Problème à résoudre

Les questionnaires politiques classiques demandent souvent un accord sur des affirmations isolées puis agrègent les réponses. Cette approche peut perdre les conditions, les priorités, les compromis, les incertitudes et le contexte. Le produit doit aider une personne à formuler ses préoccupations et à examiner des propositions publiques sans prétendre choisir à sa place.

## 2. Proposition de valeur

Un espace civique qui permet de passer de « je suis pour/contre » à une représentation nuancée de :

- ce que je souhaite voir changer ;
- les objectifs que je privilégie ;
- les moyens que je trouve acceptables ;
- les conditions qui changeraient ma position ;
- les conséquences que je suis prêt à accepter ou non ;
- ce que je ne sais pas encore.

Puis, à partir d'un thème choisi par la personne, le service donne accès à des positions publiques datées, sourcées et documentées.

## 3. Public et contexte

- Public principal : citoyens majeurs souhaitant clarifier leurs propres priorités avant une échéance électorale.
- Contexte initial : débat public français et présidentielle 2027.
- La conception doit rester réutilisable pour d'autres scrutins et périodes.
- Le service ne doit pas segmenter les utilisateurs ni inférer leurs préférences à des fins de ciblage.

## 4. Promesse et limites

Promesse : « Comprendre vos propres arbitrages et consulter les positions publiques qui vous intéressent. »

Ne pas promettre : « trouver votre candidat », « identifier votre vrai camp », « prédire votre vote », « mesurer objectivement votre compatibilité ».

Le produit ne donne pas de conseil électoral. Il facilite une exploration autonome.

## 5. Principes de conception

1. L'utilisateur est la source de vérité sur ce qu'il pense.
2. Toute reformulation est modifiable et confirmée.
3. Un objectif, un instrument, une priorité et une certitude sont des concepts distincts.
4. L'absence de réponse n'est pas une opinion.
5. Les scénarios doivent être équilibrés et leurs hypothèses explicites.
6. Les sources politiques sont présentées avec date, contexte et type de preuve.
7. Aucune donnée personnelle de conviction n'est conservée côté serveur dans le MVP.
8. Le produit doit rester utilisable sans compte, sans cookies non essentiels et sans IA externe.

## 6. MVP — périmètre strict

### Inclus

- page d'accueil et explication de la méthode ;
- session anonyme côté navigateur ;
- expression libre de préoccupations ;
- reformulation manuelle ou confirmation d'une synthèse proposée par l'utilisateur lui-même ;
- premier exercice MaxDiff de démonstration sur quatre à six éléments ;
- possibilité de passer, NSP, « cela dépend » et rejet ;
- résumé modifiable ;
- export JSON explicite ;
- suppression immédiate de la session en mémoire ;
- page méthodologique.

### Exclu du MVP

- compte, login, profil serveur ;
- base de données de réponses personnelles ;
- intégration d'un fournisseur LLM ;
- recommandation ou classement de candidats ;
- score de concordance ;
- IRT, DCE calibré ou modèle hiérarchique individuel ;
- collecte automatisée de positions politiques ;
- back-office multi-utilisateur ;
- publicité, analytics tiers, social login ;
- stockage automatique local.

## 7. Mesures de succès du prototype

Ne pas mesurer le succès par le nombre de profils politiques collectés.

Indicateurs de recherche qualitative :

- l'utilisateur juge-t-il la reformulation fidèle ?
- peut-il facilement préciser une condition ou corriger une nuance ?
- distingue-t-il priorité, position et certitude ?
- comprend-il ce que mesure et ne mesure pas l'exercice ?
- se sent-il libre de passer une question ?
- peut-il expliquer le résultat sans le prendre pour une prescription ?

Indicateurs techniques :

- zéro requête réseau contenant une réponse personnelle ;
- zéro écriture de réponse dans un stockage serveur ;
- export JSON valide et importable dans un outil de test ;
- navigation clavier complète ;
- erreurs et états vides testés ;
- build et tests reproductibles.

## 8. Non-objectifs explicites

- optimiser un message politique ;
- convaincre ou mobiliser pour un parti ;
- sélectionner les questions en vue de produire un candidat gagnant ;
- profiler les visiteurs ;
- utiliser des données personnelles pour personnaliser un contenu politique ;
- calculer ou publier un ordre de préférence des acteurs politiques.
