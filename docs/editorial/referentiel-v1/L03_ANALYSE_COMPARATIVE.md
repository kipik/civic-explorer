# L03 — Analyse comparative des trois architectures et recommandation

**Méthode :** Conformément aux consignes de mission, cette comparaison n'attribue **aucun score global artificiel** et ne somme pas de notes pondérées arbitraires. Chaque critère est évalué qualitativement pour laisser visibles les **arbitrages irréductibles** imposés par la contrainte `N = 8`.

---

## 1. Tableau comparatif sur les huit critères d'évaluation

| Critère | Architecture 1 *(Dissociation régalienne · Sanitaire-social consolidé)* | Architecture 2 *(Granularité sociale fine · Gouvernance multi-échelles)* | Architecture 3 *(Domaines substantiels · Institutions hors MaxDiff)* |
|---|---|---|---|
| **1. Couverture des principaux enjeux présidentiels** | **Très élevée.** Tous les grands champs présidentiels sont représentés dans les 8 cartes, y compris les finances publiques/économie (`A1-D2`), la sécurité (`A1-D6`), les institutions (`A1-D7`) et l'Europe/monde (`A1-D8`). | **Élevée sur le social, brouillée sur le régalien.** Tous les thèmes figurent dans les 8 cartes, mais économie/logement (`A2-D4`) et démocratie/monde (`A2-D8`) se compriment mutuellement. | **Partielle au Niveau 1.** Couvre les politiques substantielles, mais crée un **angle mort majeur** : la réforme institutionnelle et démocratique est absente des comparaisons MaxDiff. |
| **2. Cohérence interne des domaines** | **Forte sur 6 cartes, modérée sur 2.** `A1-D3` à `A1-D6` et `A1-D8` sont très cohérents ; `A1-D1` (santé + retraites/pauvreté) et `A1-D2` (travail/temps + macroéconomie/finances) restent composites et demandent un dépliage net au Niveau 2. | **Très forte sur le social (`A2-D1`–`D3`, `D5`, `D6`), faible sur `D4`, `D7`, `D8`.** `A2-D4` mélange fiscalité nationale et loyers ; `A2-D7` mélange sécurité et libertés ; `A2-D8` mélange RIC/Scrutin et armées/migrations. | **Forte sur 7 cartes, faible sur `A3-D7`.** `A3-D1` à `A3-D6` et `A3-D8` ont une bonne unité ; `A3-D7` reproduit la tension sécurité vs libertés de la V0.3. |
| **3. Distinction entre domaines (limitation des chevauchements)** | **Bonne.** La frontière `A1-D6` (sécurité physique) / `A1-D7` (justice/libertés/institutions) supprime la plus forte ambiguïté V0.3. Chevauchement résiduel assumé sur le financement social (`D1`/`D2`) et la rénovation (`D3`/`D5`). | **Faible à modérée.** Fort recouvrement entre `A2-D2` (solidarités), `A2-D3` (travail/temps) et `A2-D4` (revenus/niveau de vie), ainsi qu'entre `A2-D7` (libertés/État de droit) et `A2-D8` (démocratie/UE). | **Bonne** sur le versant socio-écologique, mais frontière délicate entre `A3-D7` (État de droit/libertés) et le module institutionnel sorti du MaxDiff. |
| **4. Comparabilité du niveau d'abstraction** | **Bonne.** En intégrant les règles démocratiques avec la justice et les droits concrets (`A1-D7`), aucune carte n'apparaît comme une pure méta-abstraction isolée. | **Hétérogène.** `A2-D3` (activités non rémunérées et temps de vie) est à une échelle quotidienne micro/méso, tandis que `A2-D8` (démocratie, UE, géopolitique) cumule deux niveaux macro. | **Excellente entre les 8 cartes MaxDiff**, obtenue précisément en expulsant le niveau méta-institutionnel hors de la comparaison. |
| **5. Compréhension immédiate par un non-spécialiste** | **Élevée.** Les intitulés renvoient à des réalités identifiables dans le débat public courant (santé et protection sociale, économie et travail, logement et transports, éducation, climat, sécurité, justice et démocratie, Europe et monde). | **Modérée.** Distinguier d'emblée « travail et temps de vie » (`A2-D3`) de « économie et niveau de vie » (`A2-D4`) exige un effort conceptuel ; `A2-D8` est trop dense à lire sur mobile. | **Élevée sur les cartes présentes**, mais risque d'incompréhension ou de frustration chez les utilisateurs qui cherchent où placer « la démocratie / les institutions ». |
| **6. Capacité à accueillir des explorations approfondies (Niveau 2)** | **Très bonne.** Chaque domaine s'ouvre naturellement sur 5 à 7 sous-enjeux structurés permettant notamment de séparer au Niveau 2 *soins* vs *retraites/solidarités*, et *activités non rémunérées* vs *revenus/dette*. | **Bonne sur le social, difficile sur `D4` et `D8`.** Le Niveau 2 de `A2-D8` devrait gérer simultanément réforme électorale, OTAN, traités commerciaux et asile. | **Très bonne** pour les 8 domaines, avec un module Niveau 2 supplémentaire dédié à la gouvernance et aux institutions. |
| **7. Risque de masquer des préférences contradictoires** | **Réduit sur le régalien, présent mais maîtrisable ailleurs.** Sépare l'antagonisme *sécurité* vs *libertés/justice*. Des tensions internes demeurent dans `A1-D1`, `A1-D2`, `A1-D5`, `A1-D8`, mais elles sont explicitables au Niveau 2. | **Élevé.** Conserve l'antagonisme frontal *sécurité* vs *libertés* dans `A2-D7` et empile les tensions opposées (démocratie locale vs souveraineté vs fédéralisme européen vs immigration) dans `A2-D8`. | **Élevé sur `A3-D7`.** Conserve l'antagonisme *sécurité* vs *libertés* dans `A3-D7`, qui avait précisément motivé la révision critique de `C07` en V0.3. |
| **8. Équilibre national / européen / international** | **Équilibré.** `A1-D8` offre une porte d'entrée claire vers l'Europe et le monde, complétée par la prise en compte de l'échelon européen au Niveau 2 dans `A1-D2`, `A1-D5` et `A1-D7`. | **Déséquilibré par dilution.** L'international et l'Europe partagent une seule carte (`A2-D8`) avec la réforme institutionnelle interne. | **Équilibré** (`A3-D8` autonome). |

---

## 2. Analyse des arbitrages structurants entre les trois architectures

La comparaison montre qu'il n'existe pas d'architecture parfaite à `N = 8`. Trois nœuds d'arbitrage expliquent les différences entre A1, A2 et A3 :

### Arbitrage 1 — Faut-il séparer la sécurité des personnes des libertés publiques dès le Niveau 1 ?
- Dans un MaxDiff de Niveau 1, le score descriptif compte combien de fois une carte est choisie comme « devant recevoir le plus d'attention ».
- Si **Sécurité** et **Libertés publiques / Justice** cohabitent sur la même carte (`A2-D7`, `A3-D7`), deux électeurs défendant des orientations diamétralement opposées (plus de pouvoir policier et carcéral vs encadrement des pouvoirs policiers et protection de la vie privée) produisent exactement le même signal brut de Niveau 1. L'exploration facultative de 0 à 2 domaines au Niveau 2 ne corrige pas ce bruit sur les autres cartes.
- **L'Architecture 1** est la seule des trois à lever cette ambiguïté dès le Niveau 1 (`A1-D6` vs `A1-D7`).

### Arbitrage 2 — Quel coût accepter pour rester à `N = 8` tout en intégrant Europe/Monde et Finances/Économie ?
- **L'Architecture 2** préserve la séparation `Santé` / `Solidarités` / `Travail et temps de vie`, mais au prix d'une compression incohérente de la sphère politique (`A2-D8` mélangeant institutions nationales, UE, défense et migrations) et d'une confusion entre économie nationale et crise du logement (`A2-D4`).
- **L'Architecture 3** préserve la séparation `Santé` / `Solidarités` / `Logement`, mais au prix d'un effacement total des **institutions et de la démocratie** hors du MaxDiff et sans même parvenir à scinder `Sécurité` vs `Justice/Libertés`.
- **L'Architecture 1** paie son coût à un endroit **plus cohérent et plus réversible au Niveau 2** : elle regroupe au Niveau 1 la **protection sanitaire et sociale face aux risques de la vie** (`A1-D1`), ainsi que la **sphère productive, des activités et des finances publiques** (`A1-D2`), afin que **chaque grand pôle d'arbitrage régalien, démocratique et international soit clairement distingué**.

### Arbitrage 3 — Comment éviter que `A1-D1` (Santé + Solidarités) et `A1-D2` (Économie + Travail + Finances) deviennent des cartes fourre-tout ?
- Le risque principal de l'Architecture 1 est réel et doit être nommé sans détour :
  1. dans `A1-D1`, un utilisateur peut sélectionner la carte pour les déserts médicaux ou l'hôpital, un autre pour les retraites, un troisième pour le handicap ou les aides sociales ;
  2. dans `A1-D2`, les enjeux de « pouvoir d'achat / fiscalité / dette » peuvent éclipser les enjeux qualitatifs d'organisation du travail, de temps de vie et d'activités non rémunérées (soin, bénévolat, parentalité).
- Ce risque est **traitable de deux manières complémentaires** sans ruiner le Niveau 1 :
  1. **Au Niveau 1 :** rédiger les formulations courtes et les notes de périmètre pour rendre explicites les composantes internes (soins + âges/vulnérabilités dans `A1-D1` ; activités rémunérées/non rémunérées + niveau de vie + finances publiques dans `A1-D2`), et assumer honnêtement dans la restitution que le MaxDiff compare **huit grands domaines composites** ;
  2. **Au Niveau 2 :** dès qu'un utilisateur explore `A1-D1` ou `A1-D2`, lui proposer immédiatement d'identifier *quel* sous-enjeu l'importe — en séparant explicitement les **soins** des **mécanismes de solidarité** (dans `A1-D1`), et en séparant explicitement **l'organisation des activités et des temps de vie** des **rémunérations, du niveau de vie et des finances publiques** (dans `A1-D2`).

---

## 3. Recommandation argumentée

### Recommandation principale : retenir l'**Architecture 1** comme base du référentiel (`L04`)

L'Architecture 1 offre le meilleur équilibre global au regard des exigences d'une plateforme civique pour la présidentielle française, pour quatre raisons décisives :

1. **Couverture complète sans angle mort majeur :** économie et finances publiques, travail et activités non rémunérées, santé et protection sociale, logement et mobilités, éducation/recherche/culture, climat/ressources/agriculture, sécurité intérieure, justice/libertés/démocratie, et Europe/monde disposent tous d'un rattachement clair dès le Niveau 1.
2. **Résolution de la faille critique de `C07` (V0.3) :** la séparation entre *Sécurité des personnes et tranquillité publique* et *Justice, libertés publiques et institutions démocratiques* garantit que deux demandes politiques opposées sur l'ordre public et les libertés ne soient pas confondues sous une même carte.
3. **Résolution du décalage d'abstraction de `C08` (V0.3) :** les institutions et la participation démocratique restent comparables au Niveau 1, mais adossées aux garanties concrètes de justice, de droits et de laïcité avec lesquelles elles forment le pacte juridique et civique.
4. **Lisibilité pour des citoyens non spécialistes et articulation naturelle avec le Niveau 2 :** les huit portes d'entrée parlent un langage clair et permettent, au Niveau 2, un dépliage rigoureux des dimensions du problème sans jamais recomposer de score.

### Réserve explicite et piste alternative documentée pour le porteur du projet

Cette recommandation s'accompagne d'une **clause de réexamen empirique** lors des entretiens cognitifs (`L08`) et de l'arbitrage humain (`L09`) :
- Si les tests qualitatifs montrent que le couplage **`Santé + Solidarités` (`DOM-01`)** provoque une confusion excessive (par exemple si les participants jugent absurde de ne pas pouvoir séparer l'hôpital public des retraites dans le MaxDiff), le porteur du projet devra arbitrer entre :
  - **Option de repli A (rester à `N = 8`) :** passer à une variante de l'**Architecture 3** en extrayant « Institutions et vie démocratique » hors du MaxDiff (ou en acceptant de ne pas séparer Justice et Sécurité, ce qui est fortement déconseillé).
  - **Option de repli B (réviser le plan expérimental hors cadre pilote actuel) :** élargir le MaxDiff à **`N = 9` ou `N = 10`** domaines dans une phase ultérieure (les plans pour `N = 9` et `N = 10` ayant déjà été audités dans `METRICS_REPORT.md` avec `D_eff = 0.9941` et `0.9938`), ce qui permettrait de séparer `Santé` et `Solidarités` tout en conservant l'intégralité des bénéfices de l'Architecture 1. Cette option n'est pas retenue par défaut afin de respecter la contrainte de stabilité `N = 8` du pilote P1.1.
