# Civic Explorer — Revue indépendante P1.1 V0.3 et catalogue candidat

**Date :** 10 novembre 2026  
**Périmètre :** `P1_1_SPECIFICATION_v0.3.md` et `CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`  
**Nature :** revue de conception avant arbitrage éditorial ; aucune validation des cartes pour le prétest ou la mise en production.

## 1. Conclusion exécutive

La consolidation d'Antigravity est sérieuse et fidèle à la décision D1 V0.3. La spécification distingue correctement la priorité relative accordée à des enjeux collectifs des préoccupations personnelles, de la gravité perçue, des raisons, des convictions causales, des solutions et de la faisabilité. Elle conserve les garde-fous statistiques et la restitution descriptive, et elle conditionne les étapes suivantes à des validations humaines.

Le catalogue est beaucoup plus transparent que les premières propositions : pour chaque carte, il explicite les variantes, périmètres, présupposés et risques de double interprétation. Cette auto-critique est utile.

**Mon avis : la spécification V0.3 peut servir de référence de travail. En revanche, le catalogue C01–C08 n'est pas encore mûr pour être arbitré simplement par un choix de variantes A/B.** La difficulté principale est structurelle : les huit cartes ne sont pas toutes au même niveau de granularité et plusieurs regroupent des sous-enjeux qui peuvent être prioritaires pour des raisons opposées.

Avant d'arrêter les cartes, il faut décider si le premier MaxDiff compare :

1. huit **grands domaines de choix collectifs**, assumés comme des regroupements éditoriaux ; ou
2. huit **enjeux plus atomiques**, plus précis, mais nécessairement moins couvrants ; ou
3. une architecture **hiérarchique**, qui compare d'abord des domaines, puis permet d'explorer leurs sous-enjeux sans fusionner les deux niveaux dans un score.

Pour Civic Explorer, je recommande l'option 3, avec un premier niveau honnêtement présenté comme une comparaison de grands domaines et une exploration secondaire des sous-enjeux. Le MaxDiff de huit cartes ne doit pas être présenté comme mesurant les priorités détaillées de l'utilisateur sur chacun des problèmes internes aux cartes.

## 2. Points validés dans la spécification

- D1 est correctement repris : priorité relative que l'utilisateur souhaite voir accorder aux enjeux collectifs dans les choix à venir.
- La séparation des construits est explicite et aucune pondération composite n'est introduite.
- La bibliothèque éditoriale commune et le recueil séparé des enjeux manquants restent cohérents avec D2.
- La non-substitution d'une carte en cours d'exercice est une bonne règle de comparabilité.
- Les états de réponse sont distingués des signalements d'une carte.
- Les réponses observées sont restituées descriptivement ; aucun score latent, rang ou pourcentage n'est affiché.
- La confidentialité locale et les paliers de validation sont explicites.

La séparation entre le niveau de réponse à une série et le signalement d'une carte doit être conservée dans le code et les schémas de validation.

## 3. Problème principal : les cartes sont des regroupements de largeur inégale

### C01 — Santé, soins et prévention

Le domaine est relativement cohérent, mais la carte inclut organisation des soins, prévention, santé publique, santé mentale, santé environnementale, accessibilité géographique et financière, urgences et conditions d'exercice des professionnels. C'est une carte de domaine assez large. Le choix peut refléter l'une quelconque de ces sous-dimensions.

**Recommandation :** garder provisoirement le domaine, mais raccourcir la formulation principale à une expression descriptive de la santé et de l'organisation des soins. Lister les sous-domaines dans un périmètre consultable, sans les empiler dans la phrase de choix.

### C02 — Solidarités face aux aléas et aux âges de la vie

La carte regroupe vieillissement, perte d'autonomie, handicap, chômage, pauvreté, prévoyance, soutien humain et matériel et responsabilités envers les proches. Le terme « solidarités » peut être lu comme un choix normatif en faveur d'un modèle collectif redistributif, même si la note précise que plusieurs modèles sont possibles.

**Recommandation :** ne pas valider C02 sans re-scoping. Si l'objectif est de représenter un grand domaine, le titre doit décrire le champ des risques et des formes de soutien sans installer d'emblée le principe de solidarité comme valeur dominante. Examiner aussi les frontières avec C01, C03 et ALT-2.

### C03 — Travail, activités non rémunérées, temps de vie et conditions matérielles

Les variantes A, B et C ne sont pas de simples variantes de style : elles ne mesurent pas le même construit. A porte sur le travail et les temps de vie ; B ajoute l'activité économique et les conditions matérielles ; C parle d'activités productives et de temps libre.

**Recommandation :** ne pas choisir la variante B pour sauver artificiellement le pouvoir d'achat : elle redevient une carte fourre-tout. Préférer un domaine explicitement centré sur « activités et temps de vie » (emploi, activité indépendante, soin, bénévolat, activités domestiques, temps hors emploi), puis recueillir séparément les enjeux de revenus et de niveau de vie comme sous-enjeux. Ne pas présupposer que le travail rémunéré est la norme ni que le non-emploi est une anomalie.

### C04 — Logement, modes d'habiter et cadre de vie

Le domaine est pertinent, mais il agrège accès au logement, statuts d'occupation, qualité de l'habitat, sans-abrisme, aménagement et usage des sols. Les sous-enjeux peuvent être éloignés.

**Recommandation :** conserver provisoirement un grand domaine « logement et modes d'habiter », mais sortir le cadre de vie et l'usage des sols s'ils sont traités comme des enjeux environnementaux distincts. Tester la compréhension sans afficher systématiquement la longue note de périmètre.

### C05 — Éducation, formation et accès aux savoirs

La carte inclut instruction des enfants, petite enfance, formation professionnelle, enseignement supérieur, recherche scientifique et formation continue. L'école et la recherche peuvent représenter deux priorités très différentes.

**Recommandation :** pour un premier jeu de huit domaines, recentrer sur l'éducation et les parcours de formation. Traiter la recherche comme sous-enjeu distinct ou comme domaine de réserve, plutôt que la juxtaposer à l'éducation dans une même carte.

### C06 — Climat, énergie, ressources naturelles et milieux de vie

Cette carte associe climat, émissions, adaptation, eau, sols, biodiversité, énergie, agriculture, pollution et risques naturels. Une personne peut choisir C06 pour des raisons de sécurité d'approvisionnement énergétique ; une autre pour le climat ou la biodiversité. Les choix ne renvoient pas nécessairement au même enjeu.

**Recommandation :** ne pas utiliser une carte fourre-tout climat-énergie-environnement sans reconnaître qu'il s'agit d'un domaine composite. Pour le premier pilote, choisir un périmètre plus précis (par exemple « climat, environnement et ressources naturelles ») et documenter l'énergie comme sous-enjeu, ou revoir le nombre total de cartes si énergie doit constituer un domaine autonome.

### C07 — Justice, sûreté des personnes et libertés publiques

C'est la carte la plus problématique. Elle associe le fonctionnement de la justice, la prévention de la délinquance, la sécurité des personnes et des biens, les libertés fondamentales, la vie privée et la régulation numérique. Les raisons de sélection peuvent être opposées : demande de sécurité accrue ou inquiétude sur les atteintes aux libertés.

**Recommandation :** ne pas conserver cette carte sous cette forme dans un MaxDiff. L'exploration ultérieure des raisons sur 0 à 2 cartes ne réparera pas l'ambiguïté introduite au moment du choix. Il faut soit la scinder, soit la recentrer sur un construit cohérent (par exemple fonctionnement de la justice et garanties de l'État de droit), en assumant que la sécurité des personnes demeure un autre enjeu.

### C08 — Institutions, vie démocratique et échelles de décision

C08 combine équilibre des pouvoirs, modes de scrutin, représentation, participation, transparence, déontologie et répartition des compétences local/national/européen. C'est à la fois une dimension transversale et un domaine de débat autonome. Son niveau d'abstraction est différent de la plupart des cartes sectorielles.

**Recommandation :** conserver éventuellement un domaine « institutions et démocratie », mais le raccourcir et tester s'il est comparable aux domaines sectoriels. Ne pas y intégrer la politique étrangère ou la défense uniquement pour couvrir les échelles européennes et internationales.

## 4. Alternatives et lacunes de couverture

### ALT-1 — Europe, relations internationales et sécurité extérieure

Le sujet ne doit pas être considéré comme couvert par la seule mention de l'échelon européen dans C08. La politique étrangère, la défense, les échanges internationaux, les frontières et les migrations sont des enjeux distincts. ALT-1 est lui-même trop composite pour devenir une carte telle quelle.

**Recommandation :** décider explicitement si la portée de Civic Explorer inclut l'ensemble des choix européens et internationaux d'un chef de l'État. Si oui, concevoir un domaine plus cohérent, centré par exemple sur « place de la France en Europe et dans le monde », et préciser les sous-enjeux dans le périmètre. Ne pas supposer que les ajouts libres réparent l'absence d'un enjeu dans les comparaisons standardisées.

### ALT-2 — Vie familiale et proches aidants

La famille et les aidants sont des réalités transversales, mais leur traitement doit être explicite. La simple distribution entre C02, C03 et C05 risque de rendre leur présence invisible ou redondante.

**Recommandation :** créer une table de couverture qui indique dans quelle carte chaque sous-enjeu est couvert et où il ne l'est pas. Ne pas créer une carte famille si elle mélange parentalité, petite enfance, aide aux proches et modèle familial sans unité claire.

### ALT-3 et ALT-4

Le catalogue a raison de ne pas reconduire automatiquement « culture, cohésion et vie associative » ni « services publics et territoires » comme des blocs composites. Cependant les mobilités, l'accès territorial et la vie culturelle restent des angles morts à documenter.

## 5. Problème de mesure : le niveau du construit doit être affiché honnêtement

Un choix MaxDiff sur C06 ne dit pas si l'utilisateur priorise l'énergie, le climat, l'eau ou la biodiversité. Un choix sur C07 ne dit pas s'il priorise la sécurité ou les libertés. Les raisons recueillies sur 0 à 2 cartes ne permettent pas de résoudre toutes les ambiguïtés restantes.

Deux solutions sont possibles :

- **Option domaine :** assumer que les cartes sont des grands domaines composites et nommer explicitement le résultat « priorité relative entre domaines ». Chaque carte peut ensuite être explorée par sous-enjeux, sans recalculer rétroactivement le MaxDiff.
- **Option enjeu :** réduire chaque carte à un enjeu plus précis et accepter une couverture moins large ou un nombre d'items supérieur.

Je recommande l'option domaine pour le premier pilote, à condition de re-scoper C02, C03, C05, C06 et surtout C07, et de rendre visibles les sous-domaines couverts par chaque carte.

## 6. Points à corriger dans la spécification

1. Le texte parle parfois d'« enjeux collectifs » et parfois de « 8 enjeux éditoriaux descriptifs » ; s'il s'agit en réalité de domaines, employer le même terme partout.
2. La consigne « lesquels devraient recevoir le plus d'attention » doit être testée pour vérifier qu'elle n'est pas comprise comme une préférence pour une dépense publique, un budget ou un programme gouvernemental.
3. Le panorama complet présenté avant MaxDiff constitue lui-même une exposition aux huit thèmes et peut amorcer les réponses ; le prétest doit examiner cet effet, pas seulement l'ordre expression libre/MaxDiff.
4. Les notes inclus/exclus très détaillées peuvent suggérer les sous-enjeux. Elles devraient être facultatives et leur effet sur la compréhension et le choix doit être testé.
5. `8 à 12` entretiens cognitifs constituent un prétest formatif, non une validation de neutralité, représentativité ou effet causal.
6. Le jeu `pilot-v0.3-draft` reste non validé ; aucun prétest ne doit débuter avant l'arbitrage humain prévu par la spécification.

## 7. Recommandation de prochaine étape

Ne pas demander encore à Antigravity de coder P1.1 ni de figer mécaniquement les variantes A/B.

Demander une **révision éditoriale V0.4** limitée à :
1. décider explicitement si les huit cartes sont des domaines composites ou des enjeux atomiques ;
2. établir une matrice de couverture des sous-enjeux et des angles absents ;
3. re-scoper C02, C03, C05, C06 et C07 ;
4. examiner la place de l'Europe, de la défense et des relations internationales ;
5. produire une version courte pour l'écran et une note de périmètre consultable ;
6. conserver plusieurs formulations candidates lorsque le test cognitif doit les départager.

Le prétest cognitif ne doit commencer qu'après validation humaine du nouveau catalogue. La spécification V0.3 peut rester la base du cahier des charges, mais la bibliothèque V0.3 est encore un document de discussion.

---

**Conclusion :** Antigravity a fait un travail documentaire de qualité. Le principal enjeu restant n'est pas technique. Il est de décider si le premier instrument mesure des priorités entre grands domaines politiques ou entre enjeux précis. Pour un pilote léger, je recommande explicitement les grands domaines, mais il faut alors assumer et documenter leur caractère composite plutôt que prétendre que les huit cartes sont des enjeux atomiques de granularité identique.
