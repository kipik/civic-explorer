# Civic Explorer — Décision de conception P1.1
## Distinguer les changements souhaités de leurs raisons

**Version :** 0.1 — 10 novembre 2026  
**Statut :** proposition de décision méthodologique à valider avant implémentation  
**Périmètre :** évolution de la conception du premier exercice de priorisation MaxDiff  
**Document associé :** `CIVIC_EXPLORER_P1_1_MAXDIFF_DESIGN_v0.1.md`

---

## 1. Décision de conception proposée

Civic Explorer doit chercher à comprendre deux dimensions complémentaires, mais distinctes :

1. **Ce que la personne estime devoir changer** : les situations, problèmes ou résultats collectifs qui devraient être traités avant d'autres lorsque tout ne peut pas avancer simultanément.
2. **Pourquoi ces changements lui paraissent importants** : les conséquences, valeurs, principes, personnes concernées, horizons temporels ou convictions causales qui expliquent ses arbitrages.

Ces deux dimensions n'ont pas le même rôle dans le moteur :

- La première constitue le **signal principal de priorisation** exploré par MaxDiff.
- La seconde constitue une **couche explicative** qui aide à comprendre et à approfondir les choix, sans être convertie en coefficient numérique arbitraire.

Il ne faut pas leur attribuer à ce stade une pondération artificielle du type 70/30. Leur importance relative dépend de la fonction : MaxDiff observe les choix de priorité ; l'exploration des raisons en explique le sens et les conditions.

Cette décision ne signifie pas que les raisons sont secondaires sur le plan humain ou démocratique. Elle signifie seulement qu'elles ne mesurent pas le même construit statistique.

## 2. Les construits à ne pas confondre

| Construit | Question de fond | Traitement envisagé |
|---|---|---|
| Priorité de changement | Qu'est-ce qui devrait passer avant le reste ? | MaxDiff Case 1, sous réserve de validation des items et du plan |
| Préoccupation personnelle | Qu'est-ce qui touche ou inquiète personnellement la personne ? | Déclaration volontaire distincte ; ne pas l'inférer de MaxDiff |
| Gravité perçue | À quel point la situation est-elle considérée comme grave ? | Interaction distincte, à concevoir ultérieurement |
| Raisons / fondements | Pourquoi ce changement compte-t-il ? | Clarification qualitative et structurée, sans score agrégé |
| Convictions causales | Qu'est-ce qui, selon la personne, produit cette situation ? | Déclaration explicite, éventuellement suivie d'une vérification documentaire |
| Faisabilité / capacité d'action | La personne pense-t-elle qu'une action publique peut changer la situation ? | Interaction distincte, à concevoir ultérieurement |
| Solution privilégiée | Quelle action ou quel instrument serait préférable ? | Scénarios et choix discrets ultérieurs ; ne pas le confondre avec la priorité du problème |

Une réponse MaxDiff ne permet pas à elle seule de déduire la préoccupation personnelle, la gravité, la raison, la causalité supposée ou la solution souhaitée.

## 3. Reformulation de la consigne MaxDiff

Éviter les formulations générales « Quels sujets comptent le plus pour vous ? » et « À quels sujets les décisions publiques devraient-elles accorder le plus d'attention ? ».

### Consigne proposée

**« On ne peut pas tout faire avancer en même temps. Parmi ces situations, laquelle faudrait-il traiter avant les autres ? Et laquelle pourrait attendre ? »**

Texte d'accompagnement :

« Vous allez comparer plusieurs situations concrètes. Dans chaque série, choisissez celle qui devrait, selon vous, être traitée en premier et celle qui pourrait attendre davantage. “Pourrait attendre” ne veut pas dire que la situation est sans importance. Vous pouvez passer une série si les situations vous semblent incomparables ou si vous ne savez pas choisir. »

Cette consigne vise une priorité d'action collective. Elle ne demande pas à la personne de désigner son problème personnel le plus important, ni de choisir une mesure gouvernementale précise.

## 4. Réduire le biais de disponibilité (« top of mind »)

### 4.1 Ne pas utiliser la liste spontanée comme unique source des items

La première liste libre de P0.2 est utile pour recueillir l'expression personnelle, mais elle ne doit pas être le seul matériau du premier exercice de priorisation. Une liste spontanée peut surreprésenter les sujets récemment évoqués, médiatisés ou émotionnellement accessibles.

### 4.2 Introduire un panorama éditorial équilibré

Proposition à tester : préparer une bibliothèque éditoriale de situations concrètes, réparties entre les grandes dimensions de la vie collective.

Chaque situation doit :
- décrire un problème ou un changement souhaitable, pas une solution partisane ;
- être formulée à un niveau de granularité comparable aux autres ;
- éviter les mots-valises tels que « santé », « économie » ou « sécurité » sans précision ;
- ne pas présupposer la cause du problème ;
- ne pas incorporer un jugement sur un parti, un candidat ou un groupe de personnes ;
- être relue et prétestée pour vérifier sa compréhension et son orientation implicite.

La bibliothèque ne doit pas être présentée comme exhaustive ou objectivement neutre par simple déclaration. Sa couverture et ses choix éditoriaux doivent être documentés et discutés pluralistement.

### 4.3 Préserver la possibilité d'ajouter un enjeu absent

L'utilisateur doit pouvoir signaler :
- qu'une situation importante manque ;
- qu'une carte est trop vague ou mal formulée ;
- que deux situations ne sont pas comparables ;
- qu'il ne se reconnaît dans aucune des situations proposées.

Un enjeu ajouté par l'utilisateur ne doit pas être inséré silencieusement dans un plan MaxDiff déjà construit. Il faut vérifier sa comparabilité, reconstruire un plan adapté et expliquer les conséquences sur les réponses précédentes.

### 4.4 Ne pas cacher l'effet de cadrage

Un catalogue éditorial réduit la dépendance au rappel spontané, mais introduit ses propres effets de cadrage et de couverture. Il ne supprime donc pas les biais. Il faut les documenter, prétester les formulations et permettre à l'utilisateur de signaler les omissions.

## 5. Explorer les raisons après les choix

La raison ne doit pas être demandée de manière répétitive après chaque série MaxDiff. Cela alourdirait le parcours et pourrait influencer les comparaisons suivantes.

### 5.1 Moment proposé

Après le bloc MaxDiff, proposer à l'utilisateur de choisir une ou deux situations sur lesquelles il souhaite expliquer son arbitrage. Ne pas sélectionner automatiquement les « gagnantes » au moyen d'un score calculé.

### 5.2 Première question

**« Qu'est-ce qui fait que cette situation devrait, selon vous, être traitée avant d'autres ? »**

Réponse libre facultative, suivie d'une possibilité de préciser ou corriger.

### 5.3 Pistes de clarification facultatives

Si la personne souhaite préciser, proposer des pistes non exclusives et présentées dans un ordre variable :

- les conséquences concrètes sur la vie quotidienne ;
- les conséquences pour certaines personnes ou certains groupes ;
- une question de justice, d'égalité ou d'équité ;
- les libertés, les droits ou l'autonomie ;
- la protection face à un risque ou à une vulnérabilité ;
- la solidarité ou la cohésion collective ;
- les conséquences à long terme ou pour les générations futures ;
- le fonctionnement des institutions ou des services collectifs ;
- une autre raison, à préciser ;
- je ne sais pas encore expliquer ce qui motive mon choix.

Cette liste est une aide à l'expression, pas une taxonomie définitive des valeurs. Les réponses doivent pouvoir être multiples, libres et corrigées. Aucune catégorie ne doit être inférée automatiquement à partir du texte sans confirmation de l'utilisateur.

### 5.4 Distinguer raison normative et conviction factuelle

Une réponse telle que « ce sujet est prioritaire parce que les délais d'accès aux soins augmentent » contient potentiellement :
- un jugement normatif : l'accès aux soins devrait être prioritaire ;
- une affirmation empirique : les délais augmentent.

Le système doit les distinguer. La seconde peut éventuellement être documentée ou vérifiée ; la première appartient au raisonnement de l'utilisateur et ne doit pas être corrigée comme un fait.

## 6. Rôle de chaque dimension dans le moteur

| Dimension | Rôle fonctionnel | Peut-elle modifier la priorité MaxDiff ? |
|---|---|---|
| Choix « à traiter en premier / peut attendre » | Observation de priorité relative | Oui : c'est la donnée MaxDiff |
| Raison exprimée | Comprendre le sens du choix | Non, pas de pondération automatique |
| Condition exprimée | Préciser dans quelles circonstances la priorité tient | Non, elle déclenche une clarification distincte |
| Conviction factuelle | Identifier une croyance vérifiable ou contestable | Non, elle déclenche éventuellement une information sourcée |
| Préoccupation personnelle | Distinguer l'intérêt personnel de la priorité collective | Non, elle reste un construit séparé |

Aucun modèle ne doit fusionner ces dimensions en une note de « priorité réelle » ou un profil idéologique.

## 7. Parcours utilisateur révisé — proposition

1. **Accueil et cadrage** : expliquer que l'exercice compare des situations et qu'il ne s'agit ni d'un test idéologique ni d'un choix de candidat.
2. **Panorama des situations** : présenter une bibliothèque équilibrée, avec possibilité de signaler les omissions, les formulations inadéquates et les sujets non pertinents.
3. **Sélection / validation des situations comparables** : l'utilisateur confirme le périmètre de comparaison ; aucune exclusion silencieuse.
4. **Bloc MaxDiff** : comparer les situations retenues avec un plan d'expérience documenté et une consigne « traiter avant / pourrait attendre ».
5. **Explication de certains arbitrages** : l'utilisateur choisit une ou deux situations et exprime pourquoi elles lui paraissent importantes.
6. **Synthèse** : séparer explicitement les priorités observées, les raisons déclarées, les conditions et les points non explorés.
7. **Expression libre complémentaire** : inviter l'utilisateur à ajouter une préoccupation ou un changement absent du panorama.

L'ordre précis des étapes 2, 3 et 4 devra être testé. Le panorama lui-même peut créer un effet d'amorçage ; prévoir des entretiens cognitifs et, si possible, un test comparant plusieurs ordres de présentation.

## 8. Restitution

La restitution doit comporter deux panneaux clairement séparés.

### A. Changements que vous avez choisi de faire passer avant d'autres

- situations présentées ;
- choix « à traiter en premier » et « pourrait attendre » ;
- nombre de comparaisons terminées et passées ;
- note de limite : les observations sont relatives aux situations et aux séries effectivement présentées.

### B. Ce qui explique vos choix

- explications libres validées ;
- pistes de clarification choisies ;
- conditions mentionnées ;
- convictions factuelles identifiées séparément ;
- éléments laissés incertains ou non expliqués.

Ne pas fusionner A et B en un score, une note, une typologie idéologique ou un classement de candidats.

## 9. Changements à apporter à la spécification MaxDiff v0.1

La présente décision modifie les points suivants du document v0.1 :

- **Section 1** : le construit prioritaire devient la préférence relative entre situations de changement collectif, et non uniquement l'importance personnelle relative de préoccupations spontanément formulées.
- **Section 2** : les items ne proviennent plus exclusivement de la liste spontanée P0.2 ; une bibliothèque éditoriale équilibrée est proposée, sous réserve de validation et de possibilité d'ajout par l'utilisateur.
- **Section 3** : remplacer « compte le plus pour vous » par « devrait être traité en premier / pourrait attendre ».
- **Section 5** : conserver les comptages descriptifs V1 et l'absence de score latent ; ajouter une couche séparée d'explication qualitative.
- **Section 9** : les décisions ouvertes devront notamment porter sur la couverture, la taille et le prétest de la bibliothèque éditoriale, la formulation des consignes et le protocole d'explication.

La présente note ne vaut pas autorisation d'implémenter la bibliothèque ou le nouveau parcours avant validation des items, de la taxonomie et du plan expérimental.

## 10. Questions à valider avant développement

1. Confirmer que le construit principal est bien la priorité relative de changements collectifs, exprimée par « traiter avant / pourrait attendre ».
2. Confirmer que les raisons sont collectées séparément et ne pondèrent pas automatiquement les résultats MaxDiff.
3. Décider si la V1 utilise une bibliothèque éditoriale préétablie, des préoccupations utilisateur, ou une approche hybride.
4. Définir la couverture thématique et le processus pluraliste de validation des situations.
5. Déterminer combien de raisons l'utilisateur est invité à expliquer et à quel moment.
6. Tester l'effet de l'ordre de présentation et du panorama éditorial.

---

**Statut : proposition de décision méthodologique. Le développement P1.1 ne doit commencer qu'après validation des questions ci-dessus et révision du plan d'expérience.**
