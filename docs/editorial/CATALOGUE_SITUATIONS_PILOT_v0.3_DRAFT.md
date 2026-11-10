# Civic Explorer — Catalogue candidat d'enjeux collectifs P1.1 (`pilot-v0.3-draft`)

**Version :** 0.3-draft — 10 novembre 2026  
**Statut :** **BROUILLON ÉDITORIAL NON VALIDÉ — SANS PRÉTENTION À LA NEUTRALITÉ DÉMONTRÉE.**  
**Documents cadres :** [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) · [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) · [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md)

> **Avertissement bloquant :** aucune des formulations ci-dessous n'est validée pour un usage public ni pour un prétest cognitif. Conformément aux restrictions de consolidation V0.3, **aucune implémentation dans `src/` et aucun prétest cognitif ne doivent être lancés avant arbitrage humain des choix ouverts listés en § 6.**

---

## 1. Constat sur les sources disponibles et méthode de réexamen

### 1.1 Trace factuelle dans le dépôt
Au moment de la rédaction de ce document, le dépôt ne contient pas de fichier antérieur listant nommément huit formulations textuelles issues d'un catalogue `pilot-v0.1` ou `pilot-v0.2` (cité dans `P1_1_D1_DECISION_v0.3.md` § 8). Le réexamen part donc explicitement des seules sources vérifiables présentes dans le dépôt et le cahier des charges V0.3 :
1. les **10 thèmes provisoires** du socle P0.2 ([`src/data/demo/provisional-themes.ts`](file:///c:/Users/kipik/Dev/civic-explorer/src/data/demo/provisional-themes.ts)) ;
2. les garde-fous et domaines cités dans [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) (§ 3 : logement, travail, famille, éducation, protection sociale, organisation institutionnelle) ;
3. les **six axes de vérification transversale** demandés pour la consolidation V0.3 (§ 2 ci-dessous).

### 1.2 Règles impératives issues de D1 V0.3 et D3
L'unité de comparaison n'est plus un « changement à améliorer » déjà orienté, mais un **enjeu collectif formulé de façon descriptive** (`P1_1_D1_DECISION_v0.3.md` § 5), soumis aux règles suivantes :
1. **Décrire des enjeux collectifs** reconnaissables dans les choix à venir ;
2. **Ne pas imposer de direction normative** (proscrire les verbes orientés tels que *améliorer, réduire, renforcer, développer, garantir, protéger*) ;
3. **Ne pas présupposer une solution ou un instrument politique** (ni service public monopolistique, ni marché, ni subvention, ni interdiction, ni réforme fiscale ou réglementaire) ;
4. **Ne pas présupposer une cause non établie** ;
5. **Ne pas confondre enjeu collectif et préoccupation personnelle** (distinction sociotropique vs égotropique) ;
6. **Ne pas adopter une conception implicite et unique** du travail, du logement, de la famille, de l'éducation, de la protection sociale ou de l'organisation institutionnelle ;
7. **Éviter les formulations administratives et les mots-valises** (ex. *pouvoir d'achat*, *protection sociale*, *cohésion*, *transition écologique* employés sans délimitation) ;
8. **Maintenir une granularité méso comparable** entre les huit cartes (`N = 8` imposé par D4) ;
9. **Prévoir une note de périmètre non prescriptive** (inclus / exclu) pour lever les ambiguïtés et chevauchements éventuels.

---

## 2. Vérification transversale des frontières conceptuelles

Avant de retenir un jeu candidat à `N = 8`, six tensions transversales ont été examinées. Aucun domaine n'est conservé automatiquement au motif qu'il figurait dans une liste antérieure.

### 2.1 Enjeux individuels vs enjeux collectifs
- **Risque identifié :** des formulations telles que « trouver un logement », « pouvoir d'achat » ou « accès aux soins » activent spontanément la situation personnelle immédiate (*« est-ce que je rencontre ce problème aujourd'hui ? »*), alors que D1 V0.3 vise **la priorité relative que l'utilisateur souhaite voir accorder à des enjeux collectifs dans les choix à venir**.
- **Traitement retenu :** formuler chaque carte au niveau de l'organisation collective et des conditions partagées dans la société (sans supposer que le répondant vit personnellement le problème), tout en maintenant en P0.2 / Temps 3 un espace distinct pour les préoccupations personnelles et en conservant le code de signalement `outside_collective_scope` pour tout item jugé hors champ des choix publics.

### 2.2 Chevauchements entre santé, protection sociale et famille
- **Constat sur l'existant :** `provisional-themes.ts` regroupait dans un thème unique `Santé et protection sociale` l'accès aux soins, l'hôpital public, la prévention, la solidarité et les retraites.
- **Diagnostic D1 / D3 :** ce regroupement mélange au moins deux enjeux collectifs indépendants (*organisation du système de soins et santé publique* vs *couverture collective des aléas économiques, du vieillissement et de la pauvreté*) et recourt au mot-valise administratif « protection sociale ». De plus, la place du soutien aux familles et aux aidants se situe au carrefour entre ces solidarités, les activités non rémunérées et l'éducation.
- **Conséquence éditoriale :** le jeu candidat **scinde explicitement** la carte **Santé (`C01`)** de la carte **Solidarités face aux aléas et aux âges de la vie (`C02`)**, en plaçant le périmètre financier des retraites, du chômage, de la perte d'autonomie et du soutien matériel aux proches dans `C02` et l'organisation/accès aux soins et la prévention dans `C01`. Le choix d'isoler ou non une carte dédiée à la famille (`ALT-2`) fait l'objet d'un arbitrage humain explicite.

### 2.3 Relations entre travail rémunéré, activités non rémunérées et temps libre
- **Constat sur l'existant :** l'ex-thème `Économie, emploi et pouvoir d'achat` réduisait la vie active à l'emploi salarié et au pouvoir d'achat marchand, en invisibilisant le travail indépendant, les activités non rémunérées (soin aux proches, parentalité, bénévolat, travail domestique) et l'arbitrage collectif sur le temps libre et les rythmes de vie.
- **Diagnostic D1 / D3 :** une formulation centrée sur « l'emploi » ou « la croissance » présuppose un modèle productiviste ou salarial unique ; à l'inverse, une formulation centrée uniquement sur « la réduction du temps de travail » présuppose une solution politique. Par ailleurs, réunir dans une seule carte l'activité économique globale, les revenus/prix et l'équilibre des temps de vie crée un risque de carte fourre-tout.
- **Conséquence éditoriale :** la carte **`C03`** propose **trois variantes explicitement contrastées** pour arbitrage humain (centrage sur travail rémunéré / activités non rémunérées / temps de vie, centrage sur activité économique et conditions matérielles, ou articulation explicite des deux).

### 2.4 Différentes conceptions du logement
- **Constat sur l'existant :** l'ex-thème `Logement et cadre de vie` citait nommément « loyers » et « rénovation énergétique ».
- **Diagnostic D1 / D3 :** mentionner prioritairement les *loyers* privilégie une lecture locative urbaine ; mentionner l'*accession* privilégie la propriété individuelle ; intégrer la *rénovation énergétique* crée un chevauchement fort avec la carte climat/énergie (`C06`). De même, réduire le logement à un parc de bâtiments ignore les modes d'habiter collectifs ou partagés, les tensions entre zones tendues et rurales, le sans-abrisme et l'usage des sols.
- **Conséquence éditoriale :** la carte **`C04`** est recentrée sur les conditions d'habitat et l'accès à un lieu de vie adapté sur les territoires, sans présupposer propriété vs location, parc public vs privé, ni habitat individuel vs collectif, et en excluant explicitement la stratégie énergétique nationale (renvoyée à `C06`).

### 2.5 Dimensions locales, nationales, européennes et internationales
- **Diagnostic V0.2 → V0.3 :** la consigne V0.2 (« choix pour le pays ») comportait un biais de nationalisme méthodologique. Inversement, les thèmes `Services publics et territoires` et `Europe et affaires internationales` de `provisional-themes.ts` créaient deux objets très hétérogènes : le premier présupposait « service public » comme instrument et recouvrait soins, école, logement et mobilités ; le second agglomérait gouvernance européenne, défense, diplomatie, commerce et solidarités mondiales.
- **Conséquence éditoriale :**
  - Les échelles territoriale, nationale et européenne sont intégrées explicitement dans les notes de périmètre des cartes concernées (santé, habitat, climat, institutions).
  - **`Services publics et territoires`** n'est **pas conservé en l'état** dans le jeu principal (proposé en variante dés-instrumentée `ALT-4` centrée mobilités et accès territorial).
  - **`Europe, relations internationales et sécurité extérieure` (`ALT-1`)** est présenté comme carte candidate complète à arbitrer face à `N = 8` : soit intégrée au jeu de 8 cartes (au prix d'une fusion/réallocation parmi `C01`–`C08`), soit traitée via les interdépendances européennes de `C08` et les ajouts libres `D2` si l'arbitrage privilégie un périmètre prioritairement interne. *L'arbitrage humain est indispensable ici pour éviter tout angle mort géopolitique ou toute surcharge thématique.*

### 2.6 Place des institutions et de la démocratie
- **Tension de granularité (`D3`) :** l'organisation institutionnelle, la séparation des pouvoirs, les modes de scrutin, l'intégrité publique et la participation citoyenne relèvent en partie de **méta-règles** qui déterminent *comment* les autres enjeux sont arbitrés. Les comparer dans un même bloc face à « santé » ou « logement » expose à un décalage de niveau d'abstraction.
- **Risque de présupposé :** privilégier « participation citoyenne » suggère un modèle délibératif/direct critique de la représentation ; privilégier « stabilité de l'État » suggère un modèle vertical/exécutif.
- **Conséquence éditoriale :** **`C08`** formule l'enjeu de manière descriptive autour de l'exercice du pouvoir, du contrôle démocratique, de la participation des citoyens et de la répartition des compétences entre échelons local, national et européen, tout en soumettant à l'arbitrage humain son maintien face à `ALT-1` et son articulation avec `C07` (Justice, sûreté et libertés publiques).

---

## 3. Devenir des 10 thèmes P0.2 face au budget pilote `N = 8`

| Thème P0.2 (`provisional-themes.ts`) | Décision dans le brouillon V0.3 (`N = 8`) | Motif synthétique |
|---|---|---|
| 1. Économie, emploi et pouvoir d'achat | **Refondu (`C03`)** | Scindé du productivisme implicite ; réexaminé sur travail rémunéré, activités non rémunérées, temps libre et conditions matérielles (3 variantes à arbitrer). |
| 2. Santé et protection sociale | **Scindé en deux (`C01` + `C02`)** | Évite le mélange d'enjeux indépendants et le mot-valise « protection sociale ». |
| 3. Éducation, jeunesse et recherche | **Refondu (`C05`)** | Élargi au-delà d'un modèle scolaire unique (formation tout au long de la vie, savoirs). |
| 4. Écologie, énergie et climat | **Refondu (`C06`)** | Formulation descriptive sans direction normative (« transition » / « urgence ») ni instrument. |
| 5. Services publics et territoires | **Non reconduit automatiquement (`ALT-4`)** | « Service public » présuppose un instrument ; recouvre `C01`, `C04`, `C05` et `C08`. Proposé en variante dés-instrumentée `ALT-4`. |
| 6. Logement et cadre de vie | **Refondu (`C04`)** | Pluralisme des modes d'habiter ; découplé de la politique énergétique globale (`C06`). |
| 7. Justice, sécurité et libertés publiques | **Refondu (`C07`)** | Équilibre symétrique entre justice, sûreté des personnes et libertés publiques (risque double-barreled signalé). |
| 8. Institutions et vie démocratique | **Refondu (`C08`)** | Intègre les échelles local/national/européen sans modèle institutionnel unique ; arbitrable face à `ALT-1`. |
| 9. Europe et affaires internationales | **Mis en arbitrage explicite (`ALT-1`)** | Enjeu majeur (défense, UE, frontières, échanges), mais entre en concurrence directe avec le plafond `N = 8` si `C01`/`C02` et `C07`/`C08` restent séparés. |
| 10. Culture, cohésion et vie associative | **Non reconduit automatiquement (`ALT-3`)** | Mot-valise hétérogène (culture, laïcité, égalité, tissu associatif) ; risque élevé de double interprétation. |
| *(Transversal D1 V0.3)* Famille et proches | **Mis en arbitrage explicite (`ALT-2`)** | Soit carte dédiée `ALT-2`, soit intégré dans `C02` (solidarités), `C03` (soin non rémunéré) et `C05` (éducation). |

---

## 4. Jeu candidat principal à 8 cartes (`C01`–`C08`) — Brouillon à arbitrer

> **Rappel :** Chaque carte ci-dessous est un brouillon illustratif candidat (`pilot-v0.3-draft`). Les 7 rubriques exigées sont présentées séparément pour permettre une critique éditoriale ligne par ligne.

---

### Carte `C01` — Santé, soins et prévention

- **Libellé court :**
  - *Variante A :* **Soins, prévention et santé publique**
  - *Variante B :* **Organisation des soins, prévention et accès à la santé**
- **Formulation complète :**
  - *Variante A :* La manière dont la société organise l'accès aux soins, la prévention et les conditions de la santé physique et mentale sur l'ensemble des territoires.
  - *Variante B :* La répartition, la qualité et l'accessibilité géographique et financière des soins médicaux, de la prévention et de la santé publique.
- **Périmètre inclus :**
  - Organisation de la médecine de ville, des établissements de soins et des urgences sur les territoires ; prévention et santé publique (y compris santé mentale et santé environnementale) ; accessibilité matérielle et financière aux soins ; démographie et conditions d'exercice des professions de santé.
- **Périmètre exclu :**
  - Indemnisation des arrêts de travail, pensions de retraite, allocations familiales ou aides générales au revenu (traités dans `C02`) ; politique climatique ou énergétique générale (`C06`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Porte sur l'organisation collective des soins, de la prévention et de la santé publique sur les territoires, indépendamment du mode de financement (public, mutualiste ou privé) et hors retraites ou aides financières aux ménages. »*
- **Présupposés potentiels :**
  - L'expression « accès aux soins » est parfois lue comme une demande implicite d'augmentation des dépenses publiques ou d'intervention sur la liberté d'installation des médecins (la Variante A atténue légèrement cet amorçage par rapport à la Variante B).
  - Risque de présupposer une approche purement médicale/curative si le mot « prévention » est interprété de façon secondaire.
- **Risques de double interprétation :**
  - Confusion possible entre *financement de l'assurance maladie* (qui touche aux cotisations/impôts et relève aussi des solidarités financières de `C02`) et *offre territoriale de soins* (`C01`).
  - Glissement vers la préoccupation personnelle immédiate (*« mon propre délai de rendez-vous »*) plutôt que l'enjeu collectif du système de santé.
- **Raisons justifiant l'inclusion dans le catalogue :**
  - Domaine central du débat public touchant l'ensemble de la population et des territoires ; son isolement par rapport à la protection sociale (`C02`) respecte directement l'exigence de ne pas fusionner des enjeux collectifs distincts.

---

### Carte `C02` — Solidarités face aux aléas et aux âges de la vie

- **Libellé court :**
  - *Variante A :* **Solidarités face aux aléas de la vie et au vieillissement**
  - *Variante B :* **Soutien collectif face aux vulnérabilités, aux âges et à la précarité**
- **Formulation complète :**
  - *Variante A :* La manière dont la société organise le soutien matériel et humain face au vieillissement, à la perte d'autonomie, au handicap, au chômage, à la pauvreté et aux responsabilités envers les proches.
  - *Variante B :* L'organisation collective des mécanismes de solidarité et de prévoyance couvrant les risques de l'existence, les étapes de la vie et les situations de vulnérabilité économique ou sociale.
- **Périmètre inclus :**
  - Retraites et vieillissement ; accompagnement du handicap et de la perte d'autonomie ; indemnisation ou accompagnement face au chômage et aux ruptures de parcours ; lutte contre la grande pauvreté ; articulation entre solidarité publique, prévoyance collective, entraide familiale et action associative.
- **Périmètre exclu :**
  - Organisation médicale des hôpitaux, cabinets et campagnes de prévention (`C01`) ; règles du contrat de travail, conditions d'activité et partage du temps libre (`C03`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Porte sur les choix collectifs de solidarité face au grand âge, au handicap, à la perte d'emploi, à la précarité et aux responsabilités familiales, sans présupposer un modèle unique (cotisations, impôt, épargne, entraide familiale ou associative) et hors organisation des soins médicaux. »*
- **Présupposés potentiels :**
  - Le mot « solidarités » (même au pluriel) peut connoter une préférence pour l'intervention redistributive de l'État par rapport à la prévoyance individuelle ou familiale, alors que « prévoyance / risques de la vie » peut sembler administratif ou assurantiel.
  - Mentionner « responsabilités envers les proches » en fin d'énoncé peut laisser croire que la question familiale n'est qu'un sous-chapitre de l'aide sociale.
- **Risques de double interprétation :**
  - Agrégation large : un répondant peut penser avant tout aux **retraites**, un autre à la **dépendance du grand âge**, un troisième aux **minima sociaux / chômage** ; leurs priorités relatives peuvent diverger fortement.
  - Risque de chevauchement résiduel avec `C01` (prise en charge financière de la maladie) et `C03` (revenus d'activité vs revenus de remplacement).
- **Raisons justifiant l'inclusion dans le catalogue :**
  - Permet d'aborder l'un des plus importants arbitrages budgétaires et sociaux de la société française sans utiliser le mot-valise administratif « protection sociale » ni présupposer un modèle contributif ou universel unique.

---

### Carte `C03` — Travail, activités non rémunérées, temps de vie et conditions matérielles

*(Choix éditorial particulièrement délicat : trois formulations contrastées sont proposées.)*

- **Libellé court :**
  - *Variante A (travail, activités et temps de vie) :* **Travail, activités non rémunérées et temps de vie**
  - *Variante B (activité économique et conditions matérielles) :* **Travail, activité économique et conditions matérielles de vie**
  - *Variante C (articulation activités et temps libre) :* **Place du travail, des activités et du temps libre**
- **Formulation complète :**
  - *Variante A :* La place, les conditions et la reconnaissance accordées dans la société au travail rémunéré (salarié ou indépendant), aux activités non rémunérées (soin aux proches, bénévolat, vie domestique) et au temps libre.
  - *Variante B :* L'organisation de l'activité économique, des différentes formes de travail rémunéré ou non rémunéré, et leurs effets sur les niveaux de vie et l'équilibre des temps de vie.
  - *Variante C :* Les conditions d'exercice et de valorisation des activités productives, du travail salarié ou indépendant, des engagements non rémunérés et de la place laissée au temps libre.
- **Périmètre inclus :**
  - Travail salarié, indépendant, entrepreneurial ou agricole ; conditions de travail, pénibilité et sens de l'activité ; reconnaissance sociale et matérielle des activités non rémunérées (aidants, parentalité, engagement associatif) ; partage du temps entre travail contraint et temps libre ; (selon choix entre A et B) niveau de rémunération et conditions matérielles d'existence liées à l'activité.
- **Périmètre exclu :**
  - Revenus de solidarité ou pensions sans activité présente (`C02`) ; formation initiale et enseignement (`C05`) ; choix climatiques ou énergétiques globaux (`C06`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Couvre l'ensemble des formes de travail (salarié, indépendant) et d'activités non rémunérées (soin, engagement, vie domestique) ainsi que l'équilibre avec le temps libre, sans privilégier ni un modèle salarial unique, ni une orientation particulière sur la durée du travail ou la croissance économique. »*
- **Présupposés potentiels :**
  - *Variante A* risque d'être lue comme une carte centrée sur la qualité de vie et le temps libre, au détriment des enjeux de niveau de vie, d'inflation ou de compétitivité économique (ce qui pourrait frustrer les personnes priorisant l'économie/revenus).
  - *Variante B* risque au contraire de réintroduire un mot-valise trop large (« activité économique + conditions matérielles + temps de vie ») et une orientation productiviste.
  - *Variante C* peut sembler abstraite (« activités productives ») à certains publics en entretien cognitif.
- **Risques de double interprétation :**
  - Double lecture entre *« conditions de vie / revenus »* (souvent associé au pouvoir d'achat personnel) et *« organisation du travail et des temps sociaux »*.
  - Risque de confusion avec le chômage (`C02`) ou avec le soutien aux familles (`ALT-2` / `C02`).
- **Raisons justifiant l'inclusion dans le catalogue :**
  - Indispensable pour ne pas réduire l'économie et le travail au seul emploi salarié ni à la croissance du PIB ; matérialise directement la prise en compte des activités non rémunérées et du temps libre exigée par le réexamen V0.3.

---

### Carte `C04` — Logement, modes d'habiter et cadre de vie sur les territoires

- **Libellé court :**
  - *Variante A :* **Logement, modes d'habiter et cadre de vie**
  - *Variante B :* **Conditions d'habitat et accès au logement sur les territoires**
- **Formulation complète :**
  - *Variante A :* Les conditions d'accès à un habitat sûr et adapté aux besoins, ainsi que l'organisation des modes d'habiter (location, propriété, habitat individuel, collectif ou partagé) et des cadres de vie sur les territoires.
  - *Variante B :* La disponibilité, la qualité et l'insertion territoriale des logements et des cadres de vie en milieu urbain, périurbain et rural.
- **Périmètre inclus :**
  - Accès à un lieu de vie et lutte contre le mal-logement ou le sans-abrisme ; diversité des statuts d'occupation (location privée ou sociale, propriété, colocation, habitat partagé ou intergénérationnel) ; aménagement du cadre de vie local, usage des sols et équilibre entre zones tendues et territoires ruraux.
- **Périmètre exclu :**
  - Stratégie énergétique nationale et objectifs climatiques globaux (`C06`, même si l'adaptation matérielle du bâti touche localement le confort thermique) ; aides financières générales au revenu (`C02`) ; grands réseaux de transport interurbains (`ALT-4` s'il est retenu).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Porte sur les conditions d'habitat et l'aménagement des cadres de vie urbains et ruraux, sans privilégier la propriété sur la location, le logement individuel sur le collectif, ni le parc public sur l'offre privée. »*
- **Présupposés potentiels :**
  - Le terme « accès au logement » (Variante B) peut amorcer une lecture « crise de l'offre / encadrement des loyers » ; l'expression « modes d'habiter » (Variante A) peut paraître inhabituelle ou sociologisante pour certains répondants.
  - Risque d'effacer la question spécifique des personnes sans domicile si l'accent est trop mis sur « cadre de vie ».
- **Risques de double interprétation :**
  - Chevauchement possible avec l'écologie (`C06`) sur l'artificialisation des sols et la rénovation thermique des logements.
  - Chevauchement avec l'accès territorial aux services et mobilités du quotidien (`ALT-4`).
- **Raisons justifiant l'inclusion dans le catalogue :**
  - Le logement structure fortement le budget des ménages, la cohésion territoriale et les modes de vie ; sa reformulation plurielle répond directement à l'exigence D1 de ne pas présupposer un modèle unique d'habitat.

---

### Carte `C05` — Éducation, formation et accès aux savoirs

- **Libellé court :**
  - *Variante A :* **Éducation, formation et transmission des savoirs**
  - *Variante B :* **Éducation des jeunes, formation continue et savoirs**
- **Formulation complète :**
  - *Variante A :* La manière dont la société organise l'instruction et l'éducation des enfants et des jeunes, la formation professionnelle ou continue tout au long de la vie, ainsi que le développement des savoirs et de la recherche.
  - *Variante B :* L'accès aux apprentissages, l'accompagnement éducatif des générations à venir, la qualification professionnelle et le soutien aux savoirs et à la recherche.
- **Périmètre inclus :**
  - Enseignement scolaire (public, sous contrat ou indépendant) ; petite enfance dans sa dimension d'éveil ; apprentissage et formation professionnelle ; enseignement supérieur, recherche scientifique et formation continue des adultes ; rôle complémentaire des familles, des acteurs associatifs et des institutions éducatives.
- **Périmètre exclu :**
  - Politique globale de l'emploi et indemnisation des transitions professionnelles (`C02` / `C03`) ; politique culturelle générale hors transmission éducative (`ALT-3`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Couvre l'instruction des jeunes, la formation professionnelle ou continue et la transmission des savoirs, sans présupposer un modèle pédagogique particulier ni la répartition des rôles entre école publique, établissements privés, apprentissage et familles. »*
- **Présupposés potentiels :**
  - L'inclusion simultanée de la « recherche » et de « l'éducation des enfants » peut être perçue comme deux sujets distincts (l'école obligatoire vs la recherche scientifique et l'innovation).
  - Le terme « instruction » est parfois associé à une conception centrée sur les savoirs académiques fondamentaux, alors que « éducation » renvoie plus largement à la socialisation et aux valeurs.
- **Risques de double interprétation :**
  - Un répondant peut y voir avant tout l'**école primaire/secondaire**, un autre l'**orientation et l'apprentissage**, un autre la **recherche scientifique**.
  - Frontière floue avec l'insertion professionnelle (`C03`) pour la formation continue.
- **Raisons justifiant l'inclusion dans le catalogue :**
  - Enjeu structurant de long terme pour l'autonomie des personnes et l'avenir collectif ; présent de manière récurrente dans les débats publics tout en exigeant une formulation neutre entre conceptions éducatives concurrentes.

---

### Carte `C06` — Climat, énergie, ressources naturelles et milieux de vie

- **Libellé court :**
  - *Variante A :* **Climat, énergie, eau et milieux naturels**
  - *Variante B :* **Équilibres climatiques, ressources et choix énergétiques**
- **Formulation complète :**
  - *Variante A :* Les choix collectifs relatifs au changement climatique, à la préservation et à la gestion de l'eau, des sols et du vivant, ainsi qu'à la production et aux usages de l'énergie.
  - *Variante B :* La prise en compte du climat, de la biodiversité et des ressources naturelles dans l'organisation énergétique, agricole et matérielle de la société.
- **Périmètre inclus :**
  - Adaptation au changement climatique et trajectoires d'émissions ; gestion de l'eau, des forêts, des sols et de la biodiversité ; modèle énergétique (production, sobriété, sécurité d'approvisionnement) ; usages environnementaux des ressources et gestion des pollutions et risques naturels.
- **Périmètre exclu :**
  - Conditions d'habitat et d'accès au logement (`C04`) ; organisation générale des transports du quotidien hors dimension énergétique/climatique (`ALT-4`) ; sécurité géopolitique des approvisionnements internationaux (`ALT-1`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Porte sur la place accordée au climat, à l'énergie, à l'eau et aux milieux naturels dans les arbitrages collectifs, sans présupposer les choix techniques (nucléaire, renouvelables, sobriété), économiques (fiscalité, normes, investissements) ou agricoles. »*
- **Présupposés potentiels :**
  - En Variante A, le verbe « préservation » concernant l'eau/sols/vivant peut encore introduire une légère tonalité prescriptive ; préférer « gestion et état de l'eau, des sols et du vivant » si l'on recherche une neutralité maximale de formulation tout en respectant les faits scientifiques établis (`P1_1_D1_DECISION_v0.3.md` § 3).
  - En Variante B, « limites » ou « organisation durable » peuvent être associés au vocabulaire d'une sensibilité politique particulière.
- **Risques de double interprétation :**
  - Tension interne possible entre l'enjeu de **sécurité/coût de l'énergie** (parfois priorisé sous l'angle économique ou industriel) et l'enjeu de **biodiversité/climat** (parfois priorisé sous l'angle écologique) : deux personnes peuvent choisir cette carte pour des raisons opposées.
- **Raisons justifiant l'inclusion dans le catalogue :**
  - Enjeu collectif transversal et intergénérationnel incontournable, irréductible aux préoccupations individuelles immédiates et dont la formulation descriptive évite les slogans (« urgence », « transition »).

---

### Carte `C07` — Justice, sûreté des personnes et libertés publiques

- **Libellé court :**
  - *Variante A :* **Justice, sûreté des personnes et libertés publiques**
  - *Variante B :* **Justice, sécurité du quotidien et garanties des libertés**
- **Formulation complète :**
  - *Variante A :* L'organisation et le fonctionnement de la justice, la prévention et la réponse aux atteintes aux personnes et aux biens, ainsi que la garantie des droits et libertés fondamentaux, y compris dans l'espace numérique.
  - *Variante B :* Les priorités accordées à la sûreté publique, aux moyens et au fonctionnement des juridictions, et à la protection des libertés individuelles et collectives.
- **Périmètre inclus :**
  - Fonctionnement, délais et moyens de la justice civile et pénale ; prévention de la délinquance, sécurité du quotidien et protection contre les violences ; droits fondamentaux, libertés publiques, vie privée et régulation des libertés dans l'espace numérique ; égalité devant la loi.
- **Périmètre exclu :**
  - Défense nationale, armées, sécurité extérieure et frontières géopolitiques (`ALT-1`) ; organisation constitutionnelle des pouvoirs politiques et modes de scrutin (`C08`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Couvre à la fois la sûreté des personnes et des biens, le fonctionnement de la justice et la protection des libertés publiques, sans préjuger d'une priorité entre fermeté pénale, prévention sociale, moyens judiciaires ou encadrement des pouvoirs de police et du numérique. »*
- **Présupposés potentiels :**
  - Risque d'être perçue comme un regroupement artificiel (« sécurité » chère à certains électorats vs « libertés publiques » chères à d'autres) plutôt que comme un enjeu unifié de l'État de droit.
  - L'ajout explicite de « l'espace numérique » peut élargir le champ au point de couvrir la régulation des plateformes ou la cybersécurité.
- **Risques de double interprétation :**
  - **Risque majeur de carte à double face :** un utilisateur choisissant `C07` « en premier » peut exprimer une forte inquiétude sur l'insécurité et l'impunité, ou au contraire une inquiétude sur les atteintes aux libertés et les délais de justice. Seule l'exploration des raisons (Temps 4) permet de distinguer ces deux sens — ce qui exige un arbitrage humain explicite (§ 6).
- **Raisons justifiant l'inclusion dans le catalogue :**
  - Pilier régalien et civique essentiel ; les associer dans un intitulé équilibré évite d'orienter le MaxDiff par une carte unilatérale « sécurité » ou une carte unilatérale « libertés », sous réserve de valider en prétest l'absence d'effet *double-barreled*.

---

### Carte `C08` — Institutions, vie démocratique et échelles de décision

- **Libellé court :**
  - *Variante A :* **Institutions, vie démocratique et échelles de décision**
  - *Variante B :* **Organisation des pouvoirs publics et participation citoyenne**
- **Formulation complète :**
  - *Variante A :* Les règles d'organisation des pouvoirs publics, le contrôle démocratique et la participation des citoyens aux décisions collectives, ainsi que la répartition des responsabilités entre échelons local, national et européen.
  - *Variante B :* La façon dont s'exercent la représentation politique, le contre-pouvoir démocratique, la transparence de la vie publique et l'autonomie des territoires dans les décisions collectives.
- **Périmètre inclus :**
  - Équilibre entre exécutif, parlement et contre-pouvoirs ; modes de scrutin et représentation ; outils de participation citoyenne et délibération ; déontologie et transparence publiques ; articulation et répartition des compétences entre communes/territoires, État national et niveau européen.
- **Périmètre exclu :**
  - Politique étrangère, défense militaire et accords commerciaux internationaux (`ALT-1`, sauf si réarbitré) ; fonctionnement juridictionnel civil et pénal au quotidien (`C07`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Porte sur les règles démocratiques et la répartition des pouvoirs entre citoyens, élus et territoires (du local à l'européen), sans privilégier démocratie représentative ou directe, centralisation ou décentralisation, intégration européenne ou souveraineté nationale. »*
- **Présupposés potentiels :**
  - La Variante B (« participation citoyenne », « transparence ») peut être perçue comme porteuse d'une critique implicite du système représentatif actuel ; la Variante A est plus neutre mais plus abstraite (« échelles de décision »).
  - Langage potentiellement perçu comme institutionnel ou éloigné du quotidien (« compétences », « pouvoirs publics »).
- **Risques de double interprétation :**
  - **Décalage de niveau (granularité D3) :** certains participants peuvent considérer qu'il s'agit d'un enjeu « méta » incomparable avec la santé ou le logement (risque de déclencher `not_comparable` dans `NoDistinguishableBestWorstReason`).
  - Chevauchement possible avec `ALT-1` sur la place de l'Union européenne dans la souveraineté décisionnelle.
- **Raisons justifiant l'inclusion dans le catalogue :**
  - Intègre explicitement l'enjeu démocratique et l'articulation multi-échelles (local / national / européen) dans le débat public, sans le réduire à un cadre exclusivement national.

---

## 5. Cartes alternatives et domaines non conservés automatiquement (`ALT-1` à `ALT-4`)

Les quatre cartes ci-dessous documentent explicitement les **domaines candidats non reconduits automatiquement** dans le jeu principal `C01`–`C08` ou devant faire l'objet d'un arbitrage humain de remplacement / fusion sous contrainte `N = 8`.

---

### Carte alternative `ALT-1` — Europe, relations internationales et sécurité extérieure

- **Libellé court :**
  - *Variante A :* **Europe, relations internationales et sécurité extérieure**
  - *Variante B :* **Place en Europe, défense et interdépendances mondiales**
- **Formulation complète :**
  - *Variante A :* Les orientations collectives concernant la coopération européenne, la défense et la sécurité extérieure, les échanges commerciaux, les frontières et les solidarités internationales.
  - *Variante B :* La conduite des relations extérieures, de la défense nationale et européenne, et la gestion des dépendances économiques, migratoires et géopolitiques avec le reste du monde.
- **Périmètre inclus :**
  - Politique de défense et sécurité extérieure ; orientation et périmètre de la coopération européenne ; politique commerciale, industrielle et stratégique internationale ; gestion des frontières et des flux migratoires ; aide au développement et solidarités internationales.
- **Périmètre exclu :**
  - Répartition interne des pouvoirs démocratiques entre communes, État et citoyens (`C08`) ; sécurité intérieure du quotidien (`C07`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Couvre la place du pays en Europe et dans le monde, la défense, les frontières et les échanges internationaux, sans préjuger d'une orientation souverainiste, fédéraliste, libre-échangiste, protectionniste ou multilatérale. »*
- **Présupposés potentiels :**
  - Mentionner les « frontières » ou « flux migratoires » dans une carte groupée avec « défense » et « commerce » risque de provoquer un mot-valise géopolitique où l'immigration écrase le reste, ou inversement où la guerre/défense écrase la coopération européenne.
- **Risques de double interprétation :**
  - Très forte hétérogénéité interne : un répondant peut penser prioritairement à la **défense face aux conflits**, un autre aux **traités commerciaux**, un autre à **l'immigration/frontières**, un autre à la **construction européenne**.
- **Raisons justifiant l'examen / arbitrage d'inclusion :**
  - Ne pas inclure d'enjeu international ou de défense dans un outil civique national expose à un biais de repli domestique. Sous `N = 8`, son intégration nécessite soit de **remplacer `C08`** (ou `C04`), soit de **recomposer deux cartes parmi `C01`–`C08`** (décision humaine #1 en § 6).

---

### Carte alternative `ALT-2` — Vie familiale, parentalité et accompagnement des proches

- **Libellé court :**
  - *Variante A :* **Vie familiale, parentalité et accompagnement des proches**
  - *Variante B :* **Place des familles, petite enfance et soutien aux aidants**
- **Formulation complète :**
  - *Variante A :* La manière dont la société reconnaît et soutient les différentes formes de vie familiale, l'accueil des jeunes enfants et l'accompagnement des proches fragiles ou dépendants.
- **Périmètre inclus :**
  - Modes d'accueil de la petite enfance ; articulation entre vie familiale et autres activités ; statut et soutien aux proches aidants ; prise en compte de la diversité des configurations familiales (monoparentales, recomposées, élargies, sans enfant).
- **Périmètre exclu :**
  - Organisation de l'instruction scolaire à partir de l'école élémentaire (`C05`) ; retraites et chômage (`C02`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Porte sur la place des différentes formes de familles, la petite enfance et les proches aidants, sans présupposer un modèle familial unique ni trancher entre aide financière directe, services d'accueil ou aménagement des temps de travail. »*
- **Présupposés potentiels :**
  - Risque de connotation nataliste ou familialiste traditionnelle si le terme « famille » est lu au singulier moral, ou à l'inverse de réduction aux seules allocations familiales.
- **Risques de double interprétation :**
  - Chevauchement massif avec `C02` (solidarités matérielles et grand âge), `C03` (travail de soin non rémunéré et temps de vie) et `C05` (petite enfance/éducation).
- **Raisons justifiant l'examen / arbitrage d'inclusion :**
  - Mentionnée explicitement dans les règles D1 V0.3 pour éviter une conception implicite unique de la famille. À arbitrer humainement : carte autonome (`ALT-2`) ou couverture transversale assumée entre `C02`, `C03` et `C05` (décision humaine #3 en § 6).

---

### Carte alternative `ALT-3` — Vie culturelle, lien social et pluralisme *(ex-thème 10 P0.2 non reconduit automatiquement)*

- **Libellé court :**
  - *Variante A :* **Vie culturelle, pluralisme et engagement associatif**
- **Formulation complète :**
  - *Variante A :* Les conditions d'accès à la vie culturelle et artistique, le rôle du tissu associatif et les cadres du pluralisme, de la laïcité et de la lutte contre les discriminations.
- **Périmètre inclus :**
  - Politiques culturelles et patrimoine ; vie associative et bénévolat civique ; pluralisme des convictions, laïcité et prévention des discriminations.
- **Périmètre exclu :**
  - Garanties juridiques des libertés publiques devant la justice (`C07`) ; éducation scolaire (`C05`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Regroupe vie culturelle, engagement associatif et cadre du pluralisme dans la vie commune, sans présupposer une conception particulière de la laïcité ou du financement culturel. »*
- **Présupposés potentiels :**
  - Juxtaposer « culture », « laïcité » et « égalité des droits » dans une même carte reproduit un mot-valise hétérogène où deux sujets politiquement très clivants (laïcité/identité vs accès à la culture) sont fusionnés.
- **Risques de double interprétation :**
  - Risque très élevé d'ambiguïté entre « financement des arts et musées » et « débats identitaires, religieux et d'égalité des droits ».
- **Raisons du non-maintien automatique dans le jeu principal `N = 8` :**
  - Motif clair d'exclusion provisoire : viole le principe D1/D3 interdisant de mélanger plusieurs enjeux indépendants sous un mot-valise. Si la culture ou le pluralisme doivent entrer dans le pilote, ils devront être formulés sur un périmètre unifié et arbitrés face aux autres cartes.

---

### Carte alternative `ALT-4` — Mobilités du quotidien et accès territorial aux services *(ex-thème 5 P0.2 « Services publics et territoires » non reconduit automatiquement)*

- **Libellé court :**
  - *Variante A :* **Mobilités du quotidien et accès territorial aux services**
- **Formulation complète :**
  - *Variante A :* L'organisation des déplacements du quotidien, des infrastructures de transport et numériques, et la présence effective des services essentiels entre territoires ruraux, périurbains et urbains.
- **Périmètre inclus :**
  - Transports du quotidien et infrastructures de liaison ; couverture numérique ; accessibilité territoriale aux services administratifs, postaux ou de proximité (quel que soit leur opérateur : public, communal, associatif ou privé).
- **Périmètre exclu :**
  - Offre médicale spécifique (`C01`) ; offre scolaire (`C05`) ; logement (`C04`) ; décentralisation institutionnelle (`C08`).
- **Note de périmètre pour la carte (non prescriptive) :**
  - *« Porte sur les mobilités et le maillage territorial des services essentiels du quotidien, sans présupposer une gestion exclusivement publique ni un mode de transport particulier. »*
- **Présupposés potentiels :**
  - L'ancien intitulé P0.2 (« Services publics et territoires ») présupposait un instrument précis (le service public étatique). Même dés-instrumentée, la carte reste proche du champ de l'aménagement du territoire déjà touché par `C04` et `C01`.
- **Risques de double interprétation :**
  - Risque de chevauchement fort lors des comparaisons MaxDiff face à `C01` (déserts médicaux), `C04` (logement/cadre de vie territorial) et `C06` (mobilités et climat).
- **Raisons du non-maintien automatique dans le jeu principal `N = 8` :**
  - Éliminé par défaut pour éviter un double emploi transversal avec `C01`/`C04`/`C05`/`C06`, tout en restant disponible si l'arbitrage humain estime la question des mobilités rurales/périurbaines sous-représentée.

---

## 6. Liste courte des décisions éditoriales nécessitant encore un arbitrage humain

Avant toute validation du catalogue pilote `pilot-v0.3` et avant tout lancement du prétest cognitif ou développement dans `src/`, six arbitrages humains doivent être tranchés :

1. **Place de l'enjeu européen, international et de défense (`ALT-1` vs jeu `C01`–`C08`) :**
   Dans un pilote contraint à `N = 8`, faut-il conserver `C08` (Institutions & démocratie internes incluant les échelles) et renvoyer la géopolitique/défense/frontières aux ajouts libres `D2`, **ou** intégrer `ALT-1` dans les 8 cartes (en précisant alors quelle carte parmi `C01`–`C08` est fusionnée, re-cadrée ou différée) ?
2. **Périmètre de `C03` (Travail / activités non rémunérées / temps libre vs conditions matérielles / niveau de vie) :**
   Retenir la *Variante A* (focalisée sur travail rémunéré, activités non rémunérées et temps de vie — au risque de laisser « inflation / niveau de vie » hors grille), la *Variante B* (plus large mais proche d'un mot-valise), ou re-scoper les 8 cartes pour isoler « conditions matérielles et coût de la vie » ?
3. **Statut de la famille et des aidants (`ALT-2` autonome vs intégration dans `C02`/`C03`/`C05`) :**
   La vie familiale, la petite enfance et les proches aidants doivent-ils disposer d'une carte dédiée (impliquant un retrait ailleurs dans `N = 8`), ou être explicitement ventilés dans `C02` (solidarités), `C03` (travail non rémunéré) et `C05` (éducation) ?
4. **Faisabilité cognitive de `C07` (« Justice, sûreté et libertés publiques ») comme carte unique :**
   Valider si l'association « sûreté des personnes » + « justice » + « libertés publiques » est acceptable comme un enjeu unifié d'État de droit (quitte à laisser le Temps 4 en démêler le motif) ou s'il existe un risque bloquant de carte *double-barreled*.
5. **Maintien de `C08` (« Institutions et démocratie ») dans le même jeu MaxDiff que des enjeux sectoriels :**
   Arbitrer si la méta-dimension institutionnelle (`C08`) reste suffisamment homogène en granularité (`D3`) face à des enjeux sectoriels (`C01`–`C06`), ou si elle doit être recentrée ou retirée du pilote `N = 8`.
6. **Choix des variantes de libellés courts et longueur acceptable des notes de périmètre :**
   Sélectionner pour chacune des 8 cartes retenues une unique formulation de travail (`Variante A` ou `B`) et valider la concision maximale des notes de périmètre affichées en volet dépliable sur écran mobile avant de lancer les 8 à 12 entretiens cognitifs.
