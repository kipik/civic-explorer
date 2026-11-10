# L01 — Cartographie exhaustive des enjeux de choix collectifs (débat présidentiel français)

**Statut :** Base analytique préalable à la construction des trois architectures candidates (`L02`).  
**Sources examinées :** [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md), [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md), [`CIVIC_EXPLORER_REVIEW_P1_1_V0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/CIVIC_EXPLORER_REVIEW_P1_1_V0.3.md) et [`provisional-themes.ts`](file:///c:/Users/kipik/Dev/civic-explorer/src/data/demo/provisional-themes.ts).

---

## 1. Principes de cartographie : sortir des silos ministériels et de l'héritage V0.3

Une cartographie destinée à une plateforme civique pour l'élection présidentielle française ne doit ni décalquer les portefeuilles ministériels ni reconduire mécaniquement les dix thèmes de démonstration P0.2 ou les huit cartes V0.3.

### Pourquoi les catégories administratives ou ministérielles sont inadéquates

1. **Elles reflètent des découpages gouvernementaux contingents, non des objets de choix citoyen :** le ministère de l'Économie agrège la fiscalité, l'industrie, les prix alimentaires, la dette et le commerce extérieur ; le ministère de l'Intérieur agrège la sécurité du quotidien, le contrôle des frontières, l'organisation des élections, les cultes et la tutelle des collectivités locales.
2. **Elles mélangent problèmes collectifs et instruments d'action :** parler de « politique de la ville » ou de « services publics » suppose déjà un canal d'intervention étatique plutôt que d'identifier l'enjeu collectif sous-jacent.
3. **Elles dissimulent les enjeux transversaux et européens :** la transition démographique, le numérique ou la norme européenne traversent plusieurs ministères et disparaissent entre deux portefeuilles.

### Bilan critique du point de départ V0.3 et P0.2

| Élément existant | Ce qui était couvert | Problèmes et lacunes identifiés |
|---|---|---|
| `C01` Santé | Accès aux soins, prévention, santé mentale/environnementale, professionnels | Cohérent sur le soin, mais frontière ambiguë sur le financement de l'assurance maladie vs solidarités (`C02`). |
| `C02` Solidarités | Vieillissement, autonomie, handicap, chômage, pauvreté, aidants, retraites | Terme « solidarités » perçu comme normatif ; mélange des mécanismes (assurance, assistance, épargne) et des publics (âgés, chômeurs, aidants). |
| `C03` Travail et activités | Salariat, indépendance, bénévolat, soin aux proches, temps libre (3 variantes) | Hésitation non tranchée entre temps/activités et pouvoir d'achat/économie. En Variante A, **l'économie, l'inflation, les revenus et les finances publiques** deviennent des angles morts majeurs. |
| `C04` Logement | Accès, statuts d'occupation, sans-abrisme, cadre de vie, sols, rural/urbain | Agrège crise sociale du logement et usage des sols/urbanisme ; frontière poreuse avec `C06` (rénovation thermique, artificialisation) et `ALT-4` (mobilités). |
| `C05` Éducation et savoirs | Petite enfance, école, apprentissage, supérieur, recherche, formation continue | Juxtapose instruction scolaire obligatoire et politique de recherche scientifique/innovation. |
| `C06` Climat et ressources | Climat, énergie, eau, sols, biodiversité, pollutions, agriculture | Domaine composite très large pouvant être choisi pour la sécurité/coût énergétique ou pour la biodiversité/sobriété. |
| `C07` Justice, sécurité et libertés | Justice civile/pénale, délinquance, sécurité quotidienne, libertés, numérique | **Défaut critique :** fusionne demande de fermeté sécuritaire et protection des libertés publiques sous une même carte à orientations opposées. |
| `C08` Institutions et démocratie | Exécutif/parlement, scrutin, participation, déontologie, local/national/UE | **Décalage d'abstraction :** carte « méta » sur les règles du jeu comparée à des enjeux sectoriels concrets ; mentionne l'UE uniquement sous l'angle des compétences. |
| `ALT-1` Europe & international | UE, défense, commerce, frontières, migrations, solidarités internationales | **Angle mort critique de la V0.3 principale** si exclu de `N = 8` ; indispensable dans le contexte d'une élection présidentielle (chef de l'État et des armées). |
| `ALT-2` Famille et proches | Petite enfance, parentalité, diversité familiale, proches aidants | Écartelé entre `C02`, `C03` et `C05`, risquant l'invisibilité. |
| `ALT-3` Culture & pluralisme | Culture, patrimoine, laïcité, associations, lutte contre discriminations | Mot-valise dans P0.2 ; laissé hors grille dans V0.3, créant un angle mort sur la culture, la laïcité, les médias et les discriminations. |
| `ALT-4` Mobilités & territoires | Transports quotidiens, numérique, services territoriaux | Écarté par défaut en V0.3, rendant invisibles les mobilités du quotidien et la fracture rurale/périurbaine/outre-mer. |
| **Absents complets de V0.3** | — | **Finances publiques, dette et fiscalité** ; **appareil productif, industrie et souveraineté économique** ; **rémunérations, prix et coût de la vie** ; **modèle agricole et souveraineté alimentaire** (à peine esquissé) ; **statut des outre-mer** ; **intelligence artificielle et souveraineté numérique**. |

---

## 2. Inventaire structuré des 68 sous-enjeux collectifs

Les sous-enjeux ci-dessous sont regroupés en **neuf grappes analytiques descriptives** uniquement pour rendre l'inventaire lisible. **Ces 9 grappes ne constituent pas des domaines MaxDiff recommandés** : elles servent de matière première neutre pour construire (`L02`) puis vérifier (`L05`) les architectures à 8 domaines.

### Grappe I — Conditions matérielles, économie productive et finances publiques

- **`E01` Niveau de vie, pouvoir d'achat et évolution des prix** *(coût des biens essentiels, inflation, pouvoir de vivre des ménages).*
- **`E02` Rémunérations du travail et partage de la valeur** *(salaires, revenus des indépendants et agriculteurs, écarts de revenus, intéressement/partage).*
- **`E03` Politique fiscale, niveau des prélèvements et justice contributive** *(impôts sur les revenus, le capital, le patrimoine, la consommation, les entreprises ; progressivité ou allègement).*
- **`E04` Finances publiques, dette et choix budgétaires de l'État** *(niveau de dépense publique, soutenabilité de la dette, priorités d'affectation ou de réduction des déficits).*
- **`E05` Appareil productif, réindustrialisation et compétitivité économique** *(tissu des PME/TPE et grands groupes, investissement, innovation économique, coût de production, autonomie industrielle).*
- **`E06` Régulation des marchés, concurrence et place des services publics marchands ou non marchands** *(rôle de l'État actionnaire/régulateur, libre entreprise, monopoles, régulation des secteurs stratégiques).*

### Grappe II — Travail, activités humaines et organisation des temps de vie

- **`E07` Emploi, insertion professionnelle et reconversions** *(création et destruction d'emplois, chômage structurel, orientation vers les métiers en tension ou en transition).*
- **`E08` Diversité des formes d'activité rémunérée** *(statut salarié, travail indépendant, entrepreneuriat, plateformes, pluriactivité, statut protecteur ou flexible).*
- **`E09` Conditions de travail, santé au travail, pénibilité et sens de l'activité** *(organisation managériale, accidents, troubles psychosociaux, exposition à la pénibilité).*
- **`E10` Reconnaissance et soutien des activités non rémunérées** *(soin aux proches, parentalité, travail domestique, engagement bénévole et associatif — sans prendre l'emploi salarié comme seule référence).*
- **`E11` Organisation et partage des temps de vie** *(durée du travail, rythmes hebdomadaires et tout au long de la vie, équilibre entre activité contrainte, famille, engagement et temps libre).*

### Grappe III — Santé, système de soins et santé publique

- **`E12` Accessibilité géographique et délais d'accès aux soins** *(déserts médicaux, répartition territoriale de la médecine de ville, des hôpitaux et des urgences).*
- **`E13` Accessibilité financière des soins et partage du coût** *(reste à charge, périmètre des remboursements publics, rôle des complémentaires santé, tarification).*
- **`E14` Organisation, gouvernance et moyens des établissements et réseaux de soins** *(hôpital public, cliniques, médecine libérale, coordination ville-hôpital, place du numérique médical).*
- **`E15` Démographie, formation et conditions d'exercice des professionnels de santé** *(recrutement, rémunération, charge administrative, liberté ou régulation d'installation).*
- **`E16` Prévention, santé publique et santé environnementale** *(dépistage, alimentation, sédentarité, addictions, exposition aux polluants et risques sanitaires).*
- **`E17` Santé mentale et accompagnement psychologique** *(souffrance psychique, psychiatrie, prévention chez les jeunes et au travail).*

### Grappe IV — Protection sociale, âges de la vie, vulnérabilités et familles

- **`E18` Financement, âge et équité du système de retraites** *(niveau des pensions, âge de départ, répartition vs capitalisation, prise en compte des carrières longues ou pénibles).*
- **`E19` Vieillissement de la population et perte d'autonomie** *(maintien à domicile, établissements d'accueil, financement de la dépendance, place des personnes âgées dans la société).*
- **`E20` Handicap, accessibilité universelle et inclusion** *(compensation financière, scolarisation, emploi, accessibilité du bâti et des transports).*
- **`E21` Indemnisation du chômage et accompagnement des transitions** *(niveau, durée et conditionnalité des allocations, droits et devoirs, sécurisation des parcours).*
- **`E22` Lutte contre la pauvreté, précarité et filets de sécurité matériels** *(minima sociaux, aide alimentaire, accès effectif aux droits, mécanismes universels vs ciblés).*
- **`E23` Vie familiale, petite enfance et parentalité** *(modes d'accueil des jeunes enfants, congés parentaux, soutien aux familles dans leur diversité — monoparentales, recomposées, nombreuses).*
- **`E24` Statut, reconnaissance et soutien matériel des proches aidants** *(répit, indemnisation, articulation entre aide à un proche et parcours d'activité).*

### Grappe V — Habitat, cadre de vie, territoires et mobilités

- **`E25` Disponibilité, coût d'accès au logement et lutte contre le mal-logement** *(niveau des loyers et des prix fonciers, logement social, insalubrité, sans-abrisme et hébergement d'urgence).*
- **`E26` Pluralité des formes d'habitat et des statuts d'occupation** *(accession à la propriété, location privée ou sociale, habitat coopératif, partagé ou intergénérationnel).*
- **`E27` Urbanisme, usage des sols et adaptation matérielle du bâti** *(densification vs étalement urbain, artificialisation des terres, rénovation thermique et adaptation aux chaleurs).*
- **`E28` Équilibre entre métropoles, villes moyennes, zones périurbaines, ruralité et outre-mer** *(inégalités territoriales d'investissement, vitalité des centres-bourgs, désenclavement).*
- **`E29` Mobilités du quotidien et infrastructures de transport** *(transports collectifs urbains et ruraux, réseau ferroviaire, usage de l'automobile, accessibilité tarifaire).*
- **`E30` Maillage territorial des services essentiels et fracture numérique** *(présence physique des guichets administratifs, postaux, bancaires, couverture très haut débit/mobile, accompagnement des publics éloignés du numérique).*

### Grappe VI — Éducation, savoirs, recherche, culture et cohésion civique

- **`E31` Instruction scolaire, maîtrise des savoirs fondamentaux et organisation pédagogique** *(programmes, rythmes scolaires, place du numérique à l'école, rôle de l'école publique et de l'enseignement privé).*
- **`E32` Réduction des inégalités scolaires, mixité sociale et orientation** *(carte scolaire, moyens par territoire, orientation précoce ou continue, inclusion scolaire).*
- **`E33` Statut, formation et conditions d'exercice des personnels éducatifs** *(recrutement, rémunération, liberté pédagogique, gouvernance des établissements).*
- **`E34` Formation professionnelle, apprentissage et formation continue tout au long de la vie** *(reconversions, qualification, lien école-entreprise, droits à la formation).*
- **`E35` Enseignement supérieur et conditions de vie étudiantes** *(accès à l'université et aux filières sélectives, précarité étudiante, gouvernance universitaire).*
- **`E36` Recherche scientifique, innovation et liberté académique** *(financement public/privé de la recherche fondamentale et appliquée, indépendance scientifique, attractivité).*
- **`E37` Accès à la vie culturelle, patrimoine et politique des médias** *(financement des arts, patrimoine local et national, audiovisuel public, concentration des médias, éducation artistique).*
- **`E38` Pluralisme, laïcité, lutte contre les discriminations et vie associative** *(liberté de conscience, respect de la laïcité, égalité femmes-hommes, discriminations liées à l'origine, au genre ou à l'orientation, vitalité associative).*

### Grappe VII — Climat, énergie, ressources naturelles et modèle agricole

- **`E39` Atténuation du changement climatique et trajectoires de décarbonation** *(rythme de réduction des émissions, secteurs résidentiel, industriel et transports, mécanismes incitatifs vs normatifs).*
- **`E40` Adaptation aux conséquences climatiques et gestion des risques naturels** *(vagues de chaleur, inondations, recul du trait de côte, incendies, assurabilité des territoires).*
- **`E41` Mix énergétique, sûreté d'approvisionnement et coût de l'énergie** *(nucléaire, énergies renouvelables, réseaux électriques, souveraineté énergétique, maîtrise des factures et sobriété).*
- **`E42` Gestion quantitative et qualitative de l'eau** *(partage des usages agricole/industriel/domestique, sécheresses, qualité des nappes et pollutions hydriques).*
- **`E43` Biodiversité, préservation des forêts, des océans et des milieux vivants** *(érosion du vivant, espaces protégés, mer et littoral, forêts).*
- **`E44` Modèles agricoles, souveraineté alimentaire et revenu des agriculteurs** *(transition agroécologique vs productivité exportatrice, rémunération agricole, installation, place de l'élevage et qualité de l'alimentation).*
- **`E45` Économie circulaire, déchets, pollutions et limites matérielles** *(recyclage, extraction minière, pesticides et polluants chimiques, sobriété matérielle vs croissance verte).*

### Grappe VIII — Sécurité des personnes, justice, libertés publiques et institutions démocratiques

- **`E46` Sécurité du quotidien, prévention de la délinquance et tranquillité publique** *(atteintes aux biens et aux personnes, violences intrafamiliales, trafics, médiation, présence policière territoriale).*
- **`E47` Moyens, doctrine d'emploi et contrôle des forces de sécurité intérieure** *(police nationale, gendarmerie, polices municipales, armement, déontologie et contrôle indépendant).*
- **`E48` Politique pénale, réponse judiciaire aux infractions et système carcéral** *(échelle des peines, alternatives à l'incarcération, surpopulation carcérale, réinsertion).*
- **`E49` Fonctionnement, délais, moyens et accessibilité de la justice civile et pénale** *(engorgement des tribunaux, aide juridictionnelle, justice de proximité, justice familiale, commerciale et administrative).*
- **`E50` Indépendance de l'autorité judiciaire et État de droit** *(statut du parquet, Conseil supérieur de la magistrature, séparation entre pouvoir politique et justice, hiérarchie des normes).*
- **`E51` Droits fondamentaux, libertés publiques et encadrement des pouvoirs de surveillance** *(liberté d'expression, de manifestation, de la presse, vie privée, biométrie, vidéosurveillance algorithmique, renseignement).*
- **`E52` Régulation du numérique, des plateformes, des données et de l'intelligence artificielle** *(protection des mineurs, modération des contenus, droits des citoyens face aux algorithmes et à l'IA, cybersécurité).*
- **`E53` Organisation constitutionnelle des pouvoirs et équilibre exécutif / parlement** *(régime présidentiel vs parlementaire, usage du 49.3, rôle du Parlement, Conseil constitutionnel).*
- **`E54` Modes de scrutin, représentativité et renouvellement du personnel politique** *(scrutin majoritaire vs proportionnelle, parité, cumul des mandats, reconnaissance du vote blanc, abstention).*
- **`E55` Participation citoyenne directe, délibération et confiance publique** *(référendum d'initiative citoyenne, conventions citoyennes, transparence, conflits d'intérêts et déontologie des élus).*
- **`E56` Décentralisation, autonomie locale et statut des outre-mer** *(répartition des compétences et ressources entre État, régions, départements, communes et territoires ultramarins).*

### Grappe IX — Place de la France en Europe et dans le monde

- **`E57` Périmètre, compétences et fonctionnement démocratique de l'Union européenne** *(approfondissement fédéraliste, Europe des nations, primauté du droit européen, règles budgétaires, élargissement).*
- **`E58` Souveraineté nationale et articulation entre décisions nationales et normes européennes** *(marges de manœuvre industrielles, fiscales, énergétiques et sociales dans le cadre européen).*
- **`E59` Défense nationale, armées, dissuasion et sécurité collective européenne** *(budget de la défense, industrie d'armement, autonomie stratégique européenne, rôle dans l'OTAN, service national).*
- **`E60` Diplomatie, gestion des crises géopolitiques et multilatéralisme** *(positionnement face aux conflits majeurs, ONU, alliances stratégiques, défense du droit international).*
- **`E61` Commerce international, accords de libre-échange et souveraineté stratégique** *(réciprocité commerciale, droits de douane, relocalisations, dépendance aux chaînes d'approvisionnement et aux matières premières critiques).*
- **`E62` Gestion des frontières, politique migratoire, droit d'asile et intégration** *(contrôle des frontières nationales et Schengen, immigration économique et familiale, traitement de l'asile, accueil et intégration).*
- **`E63` Coopération internationale, aide au développement et solidarité climatique mondiale** *(financement climatique Nord-Sud, relations avec l'Afrique et le Sud global, biens publics mondiaux).*

### Sous-enjeux transversaux identifiés explicitement (5 axes multi-domaines)

- **`E64` Transformation numérique et déploiement de l'intelligence artificielle** *(traverse travail `E09`, école `E31`, santé `E14`, services territoriaux `E30`, libertés `E52`, souveraineté `E61`).*
- **`E65` Réduction ou gestion des inégalités socio-économiques et territoriales** *(traverse fiscalité `E03`, salaires `E02`, école `E32`, santé `E12`, logement `E25`, pauvreté `E22`, climat `E39`).*
- **`E66` Transition démographique et équilibre entre générations** *(traverse retraites `E18`, dépendance `E19`, santé `E12`, petite enfance `E23`, jeunesse/études `E35`, logement `E26`, climat `E39`).*
- **`E67` Spécificités et égalité réelle des territoires d'outre-mer** *(traverse cherté de la vie `E01`, eau/risques climatiques `E40`/`E42`, santé `E12`, continuité territoriale `E29`, autonomie institutionnelle `E56`).*
- **`E68` Soutenabilité financière et budgétaire de l'ensemble des choix publics** *(traverse financement santé `E13`, retraites `E18`, défense `E59`, investissement écologique `E39`, fiscalité `E03`, dette `E04`).*

---

## 3. Enseignements structurels pour l'étape suivante (`L02`)

La cartographie met en évidence **10 à 11 pôles substantiels majeurs** (`E01–E63`) pour un budget strictement borné à **`N = 8` cartes dans le MaxDiff de Niveau 1**.

Une contrainte arithmétique incontournable gouverne donc la conception des trois architectures candidates (`L02`) : **il est mathématiquement impossible d'attribuer une carte autonome à chacun des 10–11 pôles simultanément**. Tout découpage à `N = 8` implique nécessairement **deux à trois arbitrages structurels explicites** (fusions cohérentes, recompositions de périmètre ou renvoi d'un méta-niveau hors MaxDiff). Le rôle de `L02` et `L03` est précisément d'explorer trois façons conceptuellement distinctes d'opérer ces arbitrages sans dissimuler leurs coûts.
