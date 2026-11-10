# L04 — Référentiel recommandé des huit grands domaines (`referentiel-v1-draft`)

**Statut :** **PROPOSITION ÉDITORIALE DE TRAVAIL — NON VALIDÉE DÉFINITIVEMENT**  
**Base architecturale :** Architecture 1 recommandée à l'issue de [`L03_ANALYSE_COMPARATIVE.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L03_ANALYSE_COMPARATIVE.md).  
**Règles de rédaction appliquées (`P1_1_D1_DECISION_v0.3.md` § 3 et § 5) :**
- Chaque carte décrit un **grand domaine de choix collectifs** formulé de façon **descriptive**, compréhensible sans connaissance spécialisée.
- Aucune formulation MaxDiff ne contient de verbe prescriptif (*améliorer, renforcer, protéger, réduire, garantir*), ni de solution privilégiée, ni de modèle normatif implicite (emploi salarié unique, propriété vs location, public vs privé, nucléaire vs renouvelables, fédéralisme vs souverainisme).
- Des **variantes candidates** sont conservées lorsque le test cognitif (`L08`) doit en vérifier la neutralité et la lisibilité.
- Les identifiants `DOM-01` à `DOM-08` sont des **repères éditoriaux provisoires** (en production, les identifiants runtime restent strictement opaques conformément à `03_DATA_MODEL.md` § 6).

---

## Vue synthétique du référentiel recommandé (`N = 8`)

| ID prov. | Titre court | Objet central |
|---|---|---|
| **`DOM-01`** | **Santé et solidarités face aux risques de la vie** | Organisation des soins, santé publique et soutien collectif face aux âges, vulnérabilités et ruptures de parcours |
| **`DOM-02`** | **Économie, travail, activités et finances publiques** | Organisation des activités rémunérées et non rémunérées, temps de vie, revenus, économie productive et choix budgétaires/fiscaux |
| **`DOM-03`** | **Logement, territoires et mobilités du quotidien** | Accès et formes d'habitat, aménagement des espaces urbains, ruraux et ultramarins, déplacements et services territoriaux |
| **`DOM-04`** | **Éducation, savoirs, recherche et culture** | Instruction des jeunes, formation tout au long de la vie, recherche scientifique, accès culturel et médias |
| **`DOM-05`** | **Climat, énergie, ressources naturelles et agriculture** | Trajectoires climatiques, mix énergétique, gestion de l'eau et du vivant, modèles agricoles et alimentation |
| **`DOM-06`** | **Sécurité des personnes et tranquillité publique** | Prévention de la délinquance, sûreté face aux atteintes aux personnes et aux biens, forces de sécurité et réponse pénale |
| **`DOM-07`** | **Justice, libertés publiques et démocratie** | Fonctionnement de la justice, droits fondamentaux, numérique, laïcité, institutions et participation citoyenne |
| **`DOM-08`** | **Place de la France en Europe et dans le monde** | Coopération européenne, souveraineté, défense, diplomatie, échanges commerciaux, frontières et migrations |

---

## Fiches détaillées des huit domaines

---

### `DOM-01` — Santé et solidarités face aux risques de la vie

1. **Identifiant provisoire :** `DOM-01`
2. **Titre court :** **Santé et solidarités face aux risques de la vie** *(Variante courte : **Santé, protection sociale et âges de la vie**)*
3. **Formulation synthétique destinée à la carte MaxDiff :**
   - *Variante 1 (recommandée pour prétest) :* « L'organisation des soins et de la santé publique, ainsi que les formes d'entraide et de couverture face au vieillissement, au handicap, au chômage, à la pauvreté et aux responsabilités envers les proches. »
   - *Variante 2 (plus concise) :* « L'accès aux soins, la prévention et le soutien collectif face aux âges et aux aléas de la vie (retraites, autonomie, handicap, chômage, précarité). »
4. **Définition complète de son périmètre :**
   Ce domaine couvre l'ensemble des choix collectifs portant, d'une part, sur l'organisation du système de santé (accès aux soins médicaux, prévention, santé mentale, professionnels et établissements) et, d'autre part, sur les dispositifs de soutien matériel et humain face aux vulnérabilités et étapes de l'existence (grand âge, dépendance, handicap, pauvreté, perte d'emploi, retraites, petite enfance et proches aidants). Conformément aux principes de pluralisme, il ne préjuge ni des mécanismes privilégiés (assurance sociale obligatoire, fiscalité, épargne, mutuelles, secteur privé, entraide familiale ou associative), ni du caractère universel ou ciblé des aides.
   - *Note de périmètre consultable (non prescriptive) :* « Regroupe l'organisation et le financement des soins, la prévention, les retraites, le soutien au grand âge, au handicap, à la précarité et aux aidants, indépendamment des modes d'organisation ou de financement retenus (public, mutualiste, privé ou familial). »
5. **Enjeux inclus (`L01`) :** `E12` (accès géographique aux soins), `E13` (coût et remboursement des soins), `E14` (hôpital, ville, coordination), `E15` (professionnels de santé), `E16` (prévention et santé environnementale), `E17` (santé mentale), `E18` (retraites), `E19` (vieillissement et dépendance), `E20` (handicap et inclusion), `E21` (indemnisation du chômage), `E22` (pauvreté et minima sociaux), `E23` (vie familiale et petite enfance — soutien matériel), `E24` (proches aidants).
6. **Enjeux explicitement exclus :**
   - Les règles du travail, la création d'emplois, la fiscalité générale et le niveau des salaires → **`DOM-02`**.
   - L'accessibilité matérielle des logements et des transports → **`DOM-03`** (bien que l'adaptation au handicap ou au vieillissement crée un lien).
   - L'instruction et l'éveil scolaire → **`DOM-04`**.
   - Les politiques climatiques globales agissant indirectement sur la santé → **`DOM-05`**.
7. **Principaux chevauchements avec les autres domaines :**
   - Avec **`DOM-02`** sur le coût du travail/cotisations finançant la santé et les retraites (`E03`/`E04` vs `E13`/`E18`), et sur la frontière entre indemnisation du chômage (`E21`) et accompagnement vers l'emploi (`E07`).
   - Avec **`DOM-05`** sur la santé environnementale (pesticides, qualité de l'air et de l'eau, `E16` vs `E42`/`E45`).
8. **Dimensions contradictoires qu'il peut recouvrir :**
   - Extension d'une couverture publique universelle vs ciblage des aides et responsabilisation / épargne individuelle.
   - Priorité aux moyens médicaux/soins vs priorité aux pensions de retraite ou aux minima sociaux.
   - Hausse des prélèvements pour financer les besoins démographiques vs maîtrise ou baisse des dépenses sociales et réforme de l'âge de départ.
9. **Questions à explorer au Niveau 2 :**
   - Distinction immédiate : priorité aux *soins/santé*, aux *âges/autonomie/famille* ou aux *revenus de remplacement/précarité*.
   - Séparation claire entre **mécanismes** (cotisations, impôt, assurance privée, solidarité familiale/associative) et **publics concernés** (personnes âgées, personnes handicapées, ménages précaires, aidants, malades).
   - Arbitrages entre niveau des prestations, conditions d'accès (contreparties, âge) et financement.
10. **Justification de sa place dans le référentiel :**
    Représente le premier poste des choix collectifs et des attentes quotidiennes en France. Son regroupement sanitaire-social au Niveau 1 rend possible le maintien de domaines séparés pour la sécurité, l'État de droit/démocratie et l'international dans `N = 8`, tout en permettant au Niveau 2 de dissocier précisément les soins, les mécanismes de couverture et les publics.

---

### `DOM-02` — Économie, travail, activités et finances publiques

1. **Identifiant provisoire :** `DOM-02`
2. **Titre court :** **Économie, travail, activités et finances publiques** *(Variante courte : **Travail, activités, économie et finances collectives**)*
3. **Formulation synthétique destinée à la carte MaxDiff :**
   - *Variante 1 :* « L'organisation de l'économie, les conditions du travail rémunéré et des activités non rémunérées (soin, bénévolat), l'équilibre des temps de vie, les revenus et les choix fiscaux et budgétaires. »
   - *Variante 2 :* « Le niveau de vie, l'appareil productif, les différentes formes d'activités rémunérées ou non rémunérées, le temps de vie et les finances publiques. »
4. **Définition complète de son périmètre :**
   Ce domaine rassemble les choix collectifs relatifs à la production de richesses, au fonctionnement de l'économie et aux finances publiques (impôts, dette, dépenses), ainsi qu'à l'organisation du travail et de l'ensemble des activités humaines. Il accorde une place explicite à la diversité des statuts (salariat, indépendance, entrepreneuriat), aux activités non rémunérées (aide aux proches, vie domestique, engagement associatif) et au partage des temps entre travail et vie personnelle, sans présupposer que l'emploi salarié ou la croissance du PIB constituent l'unique référence.
   - *Note de périmètre consultable (non prescriptive) :* « Couvre l'économie productive, la fiscalité, la dette et le pouvoir d'achat, ainsi que l'organisation du travail, les activités non rémunérées et le partage des temps de vie, sans privilégier ni croissance ni sobriété, ni salariat unique ni dérégulation. »
5. **Enjeux inclus (`L01`) :** `E01` (niveau de vie, pouvoir d'achat, prix), `E02` (rémunérations et partage de la valeur), `E03` (politique fiscale), `E04` (finances publiques et dette), `E05` (industrie, entreprises et compétitivité), `E06` (régulation des marchés et rôle économique de l'État), `E07` (emploi et reconversions), `E08` (formes d'activité rémunérée), `E09` (conditions de travail et pénibilité), `E10` (activités non rémunérées), `E11` (partage des temps de vie).
6. **Enjeux explicitement exclus :**
   - Prestations sociales hors activité présente (retraites, minima, dépendance) → **`DOM-01`**.
   - Coût spécifique du logement et des transports quotidiens → **`DOM-03`**.
   - Formation initiale et continue → **`DOM-04`**.
   - Politique commerciale et traités douaniers européens/internationaux → **`DOM-08`**.
7. **Principaux chevauchements avec les autres domaines :**
   - Avec **`DOM-01`** sur le financement social (`E03`/`E04` vs `E13`/`E18`) et la reconnaissance financière des aidants (`E10` vs `E24`).
   - Avec **`DOM-05`** sur la contradiction ou complémentarité entre appareil productif (`E05`), modèle agricole (`E44`) et limites écologiques (`E39`/`E45`).
   - Avec **`DOM-08`** sur la réindustrialisation face aux règles de concurrence européennes et au commerce mondial (`E58`/`E61`).
8. **Dimensions contradictoires qu'il peut recouvrir :**
   - Soutien à l'offre productive, compétitivité, baisse des impôts et maîtrise de la dette vs redistribution fiscale, hausse des salaires et intervention publique.
   - Flexibilisation et pluralité des statuts d'activité vs sécurisation du salariat et renforcement du droit du travail.
   - Priorité à l'augmentation de la production/du temps travaillé vs réduction collective du temps de travail et valorisation des activités non marchandes.
9. **Questions à explorer au Niveau 2 :**
   - Dégroupage obligatoire en trois volets indépendants : (a) *Activités et temps de vie* (rémunéré vs non rémunéré, conditions, durée) ; (b) *Revenus, prix et pouvoir d'achat* ; (c) *Économie productive, fiscalité et dette publique*.
   - Exploration des modèles économiques et de la place accordée au travail non marchand.
10. **Justification de sa place dans le référentiel :**
    Corrige l'un des plus graves angles morts du catalogue V0.3 (l'absence de l'économie, des prix, de la fiscalité et de la dette publique), tout en préservant l'exigence de ne pas réduire l'activité humaine au seul emploi salarié.

---

### `DOM-03` — Logement, territoires et mobilités du quotidien

1. **Identifiant provisoire :** `DOM-03`
2. **Titre court :** **Logement, territoires et mobilités du quotidien** *(Variante courte : **Logement, cadre de vie et territoires**)*
3. **Formulation synthétique destinée à la carte MaxDiff :**
   - *Variante 1 :* « L'accès à un logement et les différentes formes d'habitat, les transports du quotidien et l'équilibre entre zones urbaines, rurales et ultramarines. »
   - *Variante 2 :* « Les conditions d'habitat, le coût du logement, les déplacements quotidiens et la vitalité des différents territoires. »
4. **Définition complète de son périmètre :**
   Ce domaine réunit les enjeux matériels et spatiaux du cadre de vie : disponibilité et coût du logement (sans-abrisme, mal-logement, loyers, foncier), diversité des statuts et modes d'habiter (propriété, location privée ou sociale, habitat partagé ou intergénérationnel), urbanisme et usage local des sols, infrastructures de mobilité du quotidien (transports collectifs, rail, route) et maillage territorial des services essentiels et numériques entre métropoles, périurbain, ruralité et outre-mer.
   - *Note de périmètre consultable (non prescriptive) :* « Porte sur le logement sous toutes ses formes, les déplacements du quotidien et l'accès territorial aux services essentiels, sans privilégier propriété ou location, habitat individuel ou collectif, voiture ou transports publics, ni gestion exclusivement publique. »
5. **Enjeux inclus (`L01`) :** `E25` (accès et coût du logement, mal-logement), `E26` (diversité des statuts d'occupation et d'habitat), `E27` (urbanisme, foncier et adaptation matérielle du bâti), `E28` (équilibre territorial urbain/rural/outre-mer), `E29` (mobilités du quotidien), `E30` (maillage territorial des services et fracture numérique), `E67` (volet continuité territoriale ultramarine).
6. **Enjeux explicitement exclus :**
   - Stratégie énergétique nationale, objectifs climatiques globaux et préservation globale des écosystèmes → **`DOM-05`**.
   - Pouvoir d'achat général hors poste logement/transport → **`DOM-02`**.
   - Statuts institutionnels et répartition des compétences politiques des collectivités locales → **`DOM-07`**.
7. **Principaux chevauchements avec les autres domaines :**
   - Avec **`DOM-05`** sur l'artificialisation des sols (`E27` vs `E43`), la rénovation thermique des bâtiments (`E27` vs `E39`/`E41`) et la décarbonation des transports (`E29` vs `E39`).
   - Avec **`DOM-02`** sur le poids du logement dans le pouvoir d'achat (`E01` vs `E25`).
   - Avec **`DOM-07`** sur l'autonomie financière et politique des collectivités territoriales et des outre-mer (`E28` vs `E56`).
8. **Dimensions contradictoires qu'il peut recouvrir :**
   - Construction neuve et libération du foncier pour accroître l'offre vs limitation stricte de l'artificialisation et protection des terres agricoles/naturelles.
   - Encadrement des loyers et développement du parc social vs incitation à l'investissement privé et à l'accession à la propriété.
   - Soutien à l'usage de l'automobile en zone rurale/périurbaine vs restriction de la voiture et priorité aux mobilités collectives/douces.
9. **Questions à explorer au Niveau 2 :**
   - Sous-enjeux séparés : *crise d'accès et sans-abrisme*, *formes d'habitat et urbanisme*, *mobilités quotidiennes*, *fracture rurale/périurbaine/outre-mer*.
   - Confrontation des conceptions d'habitat (propriété individuelle vs location durable vs habitat coopératif) et des contraintes de coûts/sols.
10. **Justification de sa place dans le référentiel :**
    Le logement et les déplacements structurent le quotidien, le budget et le sentiment d'abandon ou d'égalité territoriale (thème majeur depuis 2018 en France), tout en permettant de réintégrer le thème orphelin `ALT-4` (mobilités et accès territorial) sans présupposer l'instrument « service public ».

---

### `DOM-04` — Éducation, savoirs, recherche et culture

1. **Identifiant provisoire :** `DOM-04`
2. **Titre court :** **Éducation, savoirs, recherche et culture** *(Variante courte : **Éducation, formation, recherche et culture**)*
3. **Formulation synthétique destinée à la carte MaxDiff :**
   - *Variante 1 :* « L'instruction et l'éducation des jeunes, la formation professionnelle et continue tout au long de la vie, la recherche scientifique et l'accès à la vie culturelle et aux médias. »
   - *Variante 2 :* « L'école, les parcours de formation à tout âge, la recherche et la transmission des savoirs et de la culture. »
4. **Définition complète de son périmètre :**
   Ce domaine concerne la transmission des connaissances, l'émancipation intellectuelle et professionnelle et la vie culturelle : enseignement scolaire (public, sous contrat ou indépendant), réduction des inégalités éducatives, conditions d'exercice des enseignants, apprentissage et formation continue des adultes, enseignement supérieur, recherche scientifique fondamentale et appliquée, politiques culturelles, patrimoine et pluralisme des médias.
   - *Note de périmètre consultable (non prescriptive) :* « Couvre l'école, la formation tout au long de la vie, l'enseignement supérieur, la recherche scientifique, la culture et les médias, sans présupposer un modèle pédagogique ou un partage unique entre acteurs publics, privés, associatifs et familiaux. »
5. **Enjeux inclus (`L01`) :** `E31` (instruction scolaire et pédagogie), `E32` (inégalités scolaires, mixité, orientation), `E33` (personnels éducatifs), `E34` (formation professionnelle et continue), `E35` (enseignement supérieur et vie étudiante), `E36` (recherche scientifique et innovation académique), `E37` (accès à la culture, patrimoine, médias).
6. **Enjeux explicitement exclus :**
   - Règles juridiques de la laïcité et lutte contre les discriminations dans la sphère civique → **`DOM-07`** (même si l'école en est un lieu d'application majeur).
   - Politique de l'emploi, indemnisation du chômage et statuts du travail → **`DOM-02`** et **`DOM-01`**.
   - Petite enfance sous l'angle strict du mode de garde et du soutien matériel aux familles → **`DOM-01`**.
7. **Principaux chevauchements avec les autres domaines :**
   - Avec **`DOM-02`** sur l'adéquation entre formation professionnelle/orientation (`E34`) et besoins de l'économie/reconversion (`E07`).
   - Avec **`DOM-07`** sur le pluralisme et l'indépendance des médias (`E37` vs `E51`/`E52`), ainsi que l'application de la laïcité à l'école (`E31` vs `E38`).
   - Avec **`DOM-08`** sur la souveraineté scientifique et technologique européenne (`E36` vs `E61`).
8. **Dimensions contradictoires qu'il peut recouvrir :**
   - Transmission des savoirs fondamentaux, mérite et autorité scolaire vs pédagogies inclusives, lutte contre les déterminismes sociaux et mixité.
   - Priorité au service public d'éducation et à la recherche fondamentale publique vs liberté de choix des familles (privé/hors contrat) et pilotage partenarial avec les entreprises.
   - Priorité à l'école primaire/secondaire vs priorité à la recherche/innovation ou à l'audiovisuel public/culture.
9. **Questions à explorer au Niveau 2 :**
   - Séparation explicite de quatre sous-ensembles : *école des jeunes*, *formation des adultes et apprentissage*, *université et recherche*, *culture et médias*.
   - Exploration des finalités (émancipation civique, égalité des chances, insertion économique) et des moyens (autonomie des établissements, mixité, financement).
10. **Justification de sa place dans le référentiel :**
    Domaine de long terme déterminant pour l'autonomie des citoyens, le renouvellement économique et la cohésion culturelle. L'adjonction de la culture et des médias évite l'angle mort `ALT-3` tout en distinguant nettement création culturelle et cadre juridique du pluralisme (`DOM-07`).

---

### `DOM-05` — Climat, énergie, ressources naturelles et agriculture

1. **Identifiant provisoire :** `DOM-05`
2. **Titre court :** **Climat, énergie, ressources naturelles et agriculture** *(Variante courte : **Climat, énergie, eau, vivant et agriculture**)*
3. **Formulation synthétique destinée à la carte MaxDiff :**
   - *Variante 1 :* « Les choix relatifs au changement climatique, à la production et au coût de l'énergie, à la gestion de l'eau, des sols et du vivant, ainsi qu'aux modèles agricoles et alimentaires. »
   - *Variante 2 :* « Le climat, l'énergie, la gestion de l'eau et des milieux naturels, l'agriculture et l'alimentation. »
4. **Définition complète de son périmètre :**
   Ce domaine recouvre l'ensemble des choix collectifs portant sur les limites écologiques, les ressources matérielles et les systèmes de production énergétique et agricole : atténuation et adaptation au changement climatique, mix énergétique (nucléaire, renouvelables, sécurité et prix d'approvisionnement, sobriété), partage quantitatif et qualitatif de l'eau, biodiversité, forêts, océans, pollutions/déchets, ainsi que les modèles agricoles et la souveraineté alimentaire.
   - *Note de périmètre consultable (non prescriptive) :* « Porte sur le climat, l'énergie, l'eau, la biodiversité, les pollutions et l'agriculture, sans présupposer les choix techniques (nucléaire, renouvelables, sobriété), agricoles (agroécologie, modèle productif) ou économiques (normes, fiscalité, incitations). »
5. **Enjeux inclus (`L01`) :** `E39` (décarbonation), `E40` (adaptation climatique et risques naturels), `E41` (mix énergétique, sécurité et prix de l'énergie), `E42` (gestion de l'eau), `E43` (biodiversité, forêts, océans), `E44` (agriculture, revenu agricole et alimentation), `E45` (économie circulaire, déchets, pollutions).
6. **Enjeux explicitement exclus :**
   - Fiscalité générale des ménages, pouvoir d'achat global et compétitivité industrielle hors énergie → **`DOM-02`**.
   - Accès au logement et mobilités du quotidien en tant que services territoriaux → **`DOM-03`**.
   - Politique commerciale extérieure et accords de libre-échange agricole → **`DOM-08`**.
7. **Principaux chevauchements avec les autres domaines :**
   - Avec **`DOM-02`** sur la contradiction possible entre croissance industrielle/compétitivité (`E05`) et contraintes écologiques (`E39`/`E45`), ainsi que le revenu des agriculteurs (`E02` vs `E44`).
   - Avec **`DOM-03`** sur l'artificialisation des sols (`E27` vs `E43`), la rénovation thermique et les transports.
   - Avec **`DOM-08`** sur la souveraineté énergétique et les accords commerciaux (« clauses miroirs », dépendance aux matériaux critiques, `E61`).
8. **Dimensions contradictoires qu'il peut recouvrir :**
   - *Tension majeure :* Priorité à la sobriété et à la réduction rapide des pressions environnementales vs priorité à la sécurité d'approvisionnement et au coût bas de l'énergie/alimentation.
   - Relance du nucléaire vs sortie du nucléaire et déploiement des renouvelables.
   - Agroécologie et réduction des intrants/élevage vs productivité agricole et compétitivité à l'exportation.
   - Contraintes réglementaires/taxation carbone vs incitations volontaires et innovation technologique.
9. **Questions à explorer au Niveau 2 :**
   - Dégroupage indispensable entre : *climat/émissions*, *énergie et factures*, *eau et biodiversité*, *agriculture et alimentation*.
   - Exploration des arbitrages de faisabilité : acceptabilité sociale des coûts (prix de l'énergie, restrictions d'usage de l'eau, contraintes agricoles), rôle des normes vs incitations.
10. **Justification de sa place dans le référentiel :**
    Domaine incontournable à l'horizon présidentiel 2027 et intergénérationnel par nature. Assumer son caractère composite dès le titre permet d'éviter qu'il soit lu uniquement comme « écologie punitive » ou « défense du nucléaire », le Niveau 2 démêlant ensuite l'énergie, l'agriculture, l'eau et le climat.

---

### `DOM-06` — Sécurité des personnes et tranquillité publique

1. **Identifiant provisoire :** `DOM-06`
2. **Titre court :** **Sécurité des personnes et tranquillité publique** *(Variante courte : **Sécurité du quotidien et réponse pénale**)*
3. **Formulation synthétique destinée à la carte MaxDiff :**
   - *Variante 1 :* « La prévention de la délinquance et des violences, la sûreté des personnes et des biens, l'organisation des forces de sécurité et la réponse pénale aux infractions. »
   - *Variante 2 :* « La sécurité du quotidien, la prévention et le traitement de la délinquance, les moyens et l'action des forces de sécurité et le système pénal. »
4. **Définition complète de son périmètre :**
   Ce domaine traite spécifiquement des choix relatifs à la protection physique des personnes et des biens contre les atteintes (violences, vols, trafics, délinquance, violences intrafamiliales, menaces intérieures), à la présence et aux méthodes des forces de sécurité intérieure (police, gendarmerie, polices municipales), aux politiques de prévention (éducative, sociale, situationnelle) et à l'orientation de la réponse pénale et carcérale (peines, prison, alternatives, réinsertion). Il est **volontairement séparé** du fonctionnement général des tribunaux civils et des garanties des libertés publiques (`DOM-07`).
   - *Note de périmètre consultable (non prescriptive) :* « Porte sur la prévention et la réponse aux violences et à la délinquance, le rôle des forces de sécurité et les peines, sans présupposer une priorité entre prévention sociale, présence territoriale ou sévérité pénale, et hors garanties des libertés publiques et justice civile (`DOM-07`). »
5. **Enjeux inclus (`L01`) :** `E46` (sécurité du quotidien, prévention de la délinquance, violences), `E47` (moyens, doctrine et contrôle des forces de sécurité intérieure), `E48` (politique pénale et système carcéral).
6. **Enjeux explicitement exclus :**
   - Justice civile, commerciale, administrative, familiale, délais des tribunaux hors pénal, indépendance de la magistrature → **`DOM-07`**.
   - Libertés publiques, droit de manifester, protection de la vie privée et régulation numérique → **`DOM-07`**.
   - Défense militaire extérieure, armées et contrôle géopolitique des frontières/migrations → **`DOM-08`**.
7. **Principaux chevauchements avec les autres domaines :**
   - Avec **`DOM-07`** sur l'équilibre concret entre pouvoirs d'enquête/surveillance/maintien de l'ordre (`E47`) et contrôle juridictionnel/libertés individuelles (`E50`/`E51`), ainsi que sur la frontière entre politique pénale (`E48`) et moyens des tribunaux (`E49`).
   - Avec **`DOM-08`** sur la lutte contre la criminalité transnationale, le terrorisme et la sécurité aux frontières (`E62`).
   - Avec **`DOM-01`** et **`DOM-04`** sur les déterminants sociaux et éducatifs de la prévention de la délinquance.
8. **Dimensions contradictoires qu'il peut recouvrir :**
   - Renforcement des effectifs, des pouvoirs d'interpellation/surveillance et sévérité/automaticité des peines vs priorité à la prévention sociale, aux peines alternatives/réinsertion et au désarmement ou contrôle strict des forces de l'ordre.
   - Déploiement technologique (vidéosurveillance, reconnaissance biométrique) vs police de proximité humaine et médiation.
   - Centralisation étatique de la sécurité vs montée en puissance des polices municipales.
9. **Questions à explorer au Niveau 2 :**
   - Distinction nette entre *prévention*, *doctrine et déontologie policière*, et *politique pénale/carcérale*.
   - Exploration des conditions et limites acceptées (ex. jusqu'où étendre la surveillance ou le pouvoir policier pour gagner en sûreté ?).
10. **Justification de sa place dans le référentiel :**
    Correction majeure par rapport à `C07` (V0.3). Isoler la sécurité des personnes permet enfin à l'électeur attaché à la tranquillité publique de s'exprimer sans être amalgamé à la question des libertés publiques ou de la réforme institutionnelle, et réciproquement.

---

### `DOM-07` — Justice, libertés publiques et démocratie

1. **Identifiant provisoire :** `DOM-07`
2. **Titre court :** **Justice, libertés publiques et démocratie** *(Variante courte : **Justice, État de droit, libertés et démocratie**)*
3. **Formulation synthétique destinée à la carte MaxDiff :**
   - *Variante 1 :* « Le fonctionnement et l'indépendance de la justice, la garantie des droits et libertés (y compris dans le numérique), la laïcité et l'organisation des institutions démocratiques. »
   - *Variante 2 :* « L'accès à la justice, la protection des libertés publiques, la régulation du numérique et les règles du fonctionnement démocratique. »
4. **Définition complète de son périmètre :**
   Ce domaine regroupe le cadre juridique, civique et institutionnel de la République : fonctionnement, accessibilité et délais de la justice (civile, familiale, commerciale, administrative et judiciaire), indépendance de l'autorité judiciaire et État de droit, protection des libertés publiques et de la vie privée, régulation des plateformes numériques et de l'intelligence artificielle sur les droits, laïcité et lutte contre les discriminations, organisation des pouvoirs publics (exécutif, parlement, décentralisation, outre-mer), modes de scrutin et participation citoyenne.
   - *Note de périmètre consultable (non prescriptive) :* « Porte sur la justice, les droits fondamentaux, le cadre numérique, la laïcité et l'organisation démocratique (du local au national), sans privilégier démocratie représentative ou directe, centralisation ou décentralisation, ni une conception particulière de la laïcité. »
5. **Enjeux inclus (`L01`) :** `E38` (pluralisme, laïcité, lutte contre les discriminations, vie associative civique), `E49` (fonctionnement et moyens de la justice), `E50` (indépendance judiciaire et État de droit), `E51` (droits fondamentaux et encadrement de la surveillance), `E52` (régulation du numérique, données et IA), `E53` (institutions et équilibre des pouvoirs), `E54` (modes de scrutin et représentativité), `E55` (participation citoyenne et déontologie), `E56` (décentralisation et statut des outre-mer).
6. **Enjeux explicitement exclus :**
   - Sécurité physique du quotidien, prévention de la délinquance et action des forces de sécurité → **`DOM-06`**.
   - Traités européens et relations entre États souverains → **`DOM-08`**.
   - Politiques culturelles et patrimoine hors droits civiques → **`DOM-04`**.
7. **Principaux chevauchements avec les autres domaines :**
   - Avec **`DOM-06`** sur la procédure pénale, l'encadrement des pouvoirs policiers et le sentiment de « laxisme ou d'équilibre » entre justice et sécurité (`E48`/`E49`/`E50`).
   - Avec **`DOM-08`** sur la place des normes européennes dans la hiérarchie juridique interne (`E50`/`E58`).
   - Avec **`DOM-04`** sur la laïcité à l'école et le pluralisme des médias (`E37`/`E38`).
8. **Dimensions contradictoires qu'il peut recouvrir :**
   - Démocratie directe et décentralisée (RIC, proportionnelle, VIe République, autonomie locale) vs maintien d'un exécutif fort et d'un État unitaire garant de l'efficacité décisionnelle.
   - Renforcement des contre-pouvoirs juridictionnels (Conseil constitutionnel, juges indépendants) vs primauté de la souveraineté populaire/parlementaire sur le contrôle des juges.
   - Laïcité stricte d'abstention dans l'espace public étendu vs conception libérale du pluralisme et des libertés religieuses/d'expression.
   - Régulation forte des plateformes/IA vs liberté d'expression absolue et souplesse d'innovation.
9. **Questions à explorer au Niveau 2 :**
   - Décomposition claire en quatre sous-ensembles : *accès et délais de la justice*, *droits, libertés et numérique*, *laïcité et égalité des droits*, *institutions, scrutins et participation*.
   - Exploration des mécanismes de confiance et de contrôle souhaités entre citoyens, élus et juges.
10. **Justification de sa place dans le référentiel :**
    Réunit en un ensemble cohérent de « règles du jeu républicain » la justice, les droits et les institutions. Cela supprime l'effet de carte méta-abstraite isolée (`C08` V0.3) tout en retirant les libertés publiques du tête-à-tête conflictuel avec la sécurité policière (`C07` V0.3).

---

### `DOM-08` — Place de la France en Europe et dans le monde

1. **Identifiant provisoire :** `DOM-08`
2. **Titre court :** **Place de la France en Europe et dans le monde** *(Variante courte : **Europe, souveraineté, défense et relations internationales**)*
3. **Formulation synthétique destinée à la carte MaxDiff :**
   - *Variante 1 :* « Les choix relatifs à la construction européenne et à la souveraineté nationale, à la défense et la diplomatie, aux échanges commerciaux mondiaux et à la gestion des frontières et des migrations. »
   - *Variante 2 :* « L'orientation européenne, la défense et l'action internationale de la France, le commerce extérieur et la maîtrise des frontières et des flux migratoires. »
4. **Définition complète de son périmètre :**
   Ce domaine recouvre l'ensemble des choix relatifs à l'insertion extérieure de la France : avenir et périmètre de l'Union européenne, articulation entre souveraineté nationale et règles européennes, politique de défense et armées (y compris dissuasion et coopération européenne/OTAN), diplomatie et gestion des crises internationales, accords commerciaux et souveraineté stratégique/approvisionnements, aide au développement et solidarités mondiales, ainsi que la gestion des frontières, de l'asile et de l'immigration.
   - *Note de périmètre consultable (non prescriptive) :* « Couvre l'Union européenne, la souveraineté nationale, la défense, la diplomatie, le commerce international, l'aide mondiale, les frontières et l'immigration, sans présupposer intégration fédérale ou souverainisme, libre-échange ou protectionnisme, ni ouverture ou fermeture migratoire. »
5. **Enjeux inclus (`L01`) :** `E57` (fonctionnement et périmètre de l'UE), `E58` (souveraineté et normes européennes), `E59` (défense et armées), `E60` (diplomatie et crises internationales), `E61` (commerce international et dépendances stratégiques), `E62` (frontières, migrations, asile et intégration), `E63` (coopération et solidarité mondiale).
6. **Enjeux explicitement exclus :**
   - Sécurité intérieure du quotidien et délinquance domestique → **`DOM-06`**.
   - Organisation constitutionnelle et électorale interne → **`DOM-07`**.
   - Politique industrielle et fiscale intérieure hors dimension douanière/européenne → **`DOM-02`**.
7. **Principaux chevauchements avec les autres domaines :**
   - Avec **`DOM-02`** sur les traités de libre-échange, la concurrence européenne et les règles budgétaires européennes (`E04`/`E05` vs `E58`/`E61`).
   - Avec **`DOM-05`** sur les normes climatiques européennes, les importations agricoles et la sécurisation des métaux/énergies critiques (`E41`/`E44` vs `E61`).
   - Avec **`DOM-06`** et **`DOM-01`** sur les aspects sécurité/intégration des migrations (`E62`).
8. **Dimensions contradictoires qu'il peut recouvrir :**
   - *Souverainisme vs Intégration européenne :* reprise de compétences nationales (droit, frontières, budget) vs approfondissement fédéral européen (défense commune, budget commun).
   - *Libre-échange vs Protectionnisme stratégique :* ouverture commerciale et compétitivité vs droits de douane, préférence européenne/nationale et relocalisation.
   - *Contrôle migratoire restrictif vs politique d'accueil et d'asile :* réduction des flux, durcissement des frontières et de l'asile vs voies légales, accueil humanitaire et solidarité.
   - *Priorité militaire/dissuasion vs priorité diplomatique/désarmement/aide au développement.*
   - *Attention cognitive particulière :* risque que le sous-enjeu « frontières et migrations » écrase à lui seul la perception de la carte si l'ordre des termes n'est pas équilibré avec la défense, l'Europe et le commerce.
9. **Questions à explorer au Niveau 2 :**
   - Dégroupage indispensable en cinq sous-chapitres distincts : *Union européenne et souveraineté*, *défense et sécurité extérieure*, *diplomatie et solidarité mondiale*, *commerce international*, *frontières, asile et migrations*.
   - Exploration explicite des arbitrages entre autonomie nationale, coopération européenne et coûts économiques ou diplomatiques.
10. **Justification de sa place dans le référentiel :**
    Dans une élection présidentielle française où le chef de l'État exerce une responsabilité directe sur la défense, la diplomatie, les traités européens et la politique extérieure, laisser ces enjeux hors du MaxDiff (ou dilués dans une carte institutionnelle) créait un angle mort majeur dans la V0.3.
