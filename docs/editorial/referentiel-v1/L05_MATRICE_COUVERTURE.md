# L05 — Matrice de couverture et vérification de cohérence (`DOM-01` à `DOM-08`)

**Objet :** Vérifier que l'ensemble des 68 sous-enjeux cartographiés en [`L01_CARTOGRAPHIE_ENJEUX.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L01_CARTOGRAPHIE_ENJEUX.md) disposent d'un rattachement principal univoque dans le référentiel recommandé (`L04`), sans dissimuler ni les chevauchements ni les tensions internes.

---

## 1. Matrice exhaustive des 68 sous-enjeux

| Sous-enjeu (`L01`) | Domaine principal | Domaine secondaire éventuel | Justification | Risque de confusion |
|---|---|---|---|---|
| `E01` Niveau de vie, pouvoir d'achat et évolution des prix | **`DOM-02`** | `DOM-03`, `DOM-05` | Relève directement des revenus, des prix et de l'activité économique des ménages. | Confusion possible avec le coût spécifique du logement (`DOM-03`) ou des factures d'énergie (`DOM-05`). |
| `E02` Rémunérations du travail et partage de la valeur | **`DOM-02`** | `DOM-05` | Salaires, revenus d'activité et répartition entre capital et travail au sein du domaine économique. | Pour le revenu agricole (`E44`), hésitation fréquente entre `DOM-02` et `DOM-05`. |
| `E03` Politique fiscale, niveau des prélèvements et justice contributive | **`DOM-02`** | `DOM-01`, `DOM-05` | Fiscalité générale et répartition des prélèvements relèvent du contrat économique et budgétaire. | Les cotisations sociales (`DOM-01`) ou la fiscalité carbone (`DOM-05`) créent une frontière poreuse. |
| `E04` Finances publiques, dette et choix budgétaires de l'État | **`DOM-02`** | `DOM-01`, `DOM-08` | Arbitrage macro-budgétaire global entre recettes, dépenses et dette publique. | Règles budgétaires européennes (`DOM-08`) et poids des dépenses sociales/retraites (`DOM-01`). |
| `E05` Appareil productif, réindustrialisation et compétitivité économique | **`DOM-02`** | `DOM-05`, `DOM-08` | Tissu productif, investissement, PME/industrie et coûts de production. | Décarbonation industrielle (`DOM-05`) et souveraineté commerciale européenne (`DOM-08`). |
| `E06` Régulation des marchés et place des services publics économiques | **`DOM-02`** | `DOM-07`, `DOM-08` | Rôle économique de l'État, concurrence et statut des entreprises publiques. | Droit européen de la concurrence (`DOM-08`) et présence territoriale des guichets (`DOM-03`). |
| `E07` Emploi, insertion professionnelle et reconversions | **`DOM-02`** | `DOM-01`, `DOM-04` | Dynamique de l'emploi et fonctionnement du marché du travail. | Frontière avec l'indemnisation du chômage (`DOM-01`) et la formation professionnelle (`DOM-04`). |
| `E08` Diversité des formes d'activité rémunérée | **`DOM-02`** | Aucun *(monodomaine)* | Salariat, indépendance, entrepreneuriat, plateformes. | Risque que « travail » soit réduit au seul salariat si la note `DOM-02` n'est pas lue. |
| `E09` Conditions de travail, santé au travail et pénibilité | **`DOM-02`** | `DOM-01` | Organisation productive et pénibilité des conditions d'exercice. | Prévention des maladies professionnelles et départs anticipés pour pénibilité (`DOM-01`). |
| `E10` Reconnaissance des activités non rémunérées (soin, bénévolat, domestique) | **`DOM-02`** | `DOM-01`, `DOM-04` | Volontairement rattaché au pôle travail/activités pour rompre avec l'exclusivité de l'emploi marchand. | Forte tentation de chercher le soin aux proches dans `DOM-01` et le bénévolat associatif dans `DOM-04`/`DOM-07`. |
| `E11` Organisation et partage des temps de vie | **`DOM-02`** | `DOM-01` | Durée du travail, rythmes de vie et équilibre activité contrainte / temps libre. | Conciliation avec la vie familiale (`DOM-01`) ; risque que la macro-économie domine `DOM-02`. |
| `E12` Accessibilité géographique et délais d'accès aux soins | **`DOM-01`** | `DOM-03` | Cœur de l'organisation du système de soins sur les territoires. | Déserts médicaux perçus aussi comme un enjeu d'aménagement rural (`DOM-03`). |
| `E13` Accessibilité financière des soins et partage du coût | **`DOM-01`** | `DOM-02` | Remboursements, reste à charge, assurance maladie et complémentaires. | Lien avec le pouvoir d'achat (`DOM-02`) et les prélèvements obligatoires. |
| `E14` Organisation et moyens des hôpitaux, médecine de ville et urgences | **`DOM-01`** | Aucun *(monodomaine)* | Pilotage et capacités opérationnelles du système de soins. | Débat interne entre gestion publique, libérale ou privée. |
| `E15` Démographie, formation et conditions des professionnels de santé | **`DOM-01`** | `DOM-04` | Régulation d'installation, conditions d'exercice et attractivité des métiers du soin. | Volet formation initiale universitaire rattaché secondairement à `DOM-04`. |
| `E16` Prévention, santé publique et santé environnementale | **`DOM-01`** | `DOM-05` | Politiques de prévention, vaccination, addictions, nutrition et exposition sanitaire. | Causes environnementales (air, pesticides, eau) traitées à la source dans `DOM-05`. |
| `E17` Santé mentale et accompagnement psychologique | **`DOM-01`** | `DOM-04` | Soin psychique et psychiatrie relèvent d'abord du système de santé. | Prévention chez les jeunes à l'école (`DOM-04`) et risques psychosociaux au travail (`DOM-02`). |
| `E18` Financement, âge et équité du système de retraites | **`DOM-01`** | `DOM-02` | Couverture collective du vieillissement et de la fin d'activité dans le pôle protection sociale. | Équilibre budgétaire global et âge d'activité relient fortement à `DOM-02`. |
| `E19` Vieillissement de la population et perte d'autonomie | **`DOM-01`** | `DOM-03` | Accompagnement médical et social du grand âge. | Adaptation des logements et urbanisme adapté aux aînés (`DOM-03`). |
| `E20` Handicap, accessibilité universelle et inclusion | **`DOM-01`** | `DOM-03`, `DOM-04` | Compensation du handicap et soutien à l'autonomie comme socle de solidarité. | Accessibilité du bâti/transports (`DOM-03`) et inclusion scolaire (`DOM-04`). |
| `E21` Indemnisation du chômage et accompagnement des transitions | **`DOM-01`** | `DOM-02` | Mécanisme assurantiel/solidarité face à la perte d'emploi rattaché aux risques sociaux. | Conditionnalité liée au retour à l'emploi et aux besoins économiques (`DOM-02`). |
| `E22` Lutte contre la pauvreté, précarité et filets de sécurité matériels | **`DOM-01`** | `DOM-02` | Minima sociaux, urgence sociale et accès aux droits de solidarité. | Politique globale des salaires et de l'impôt (`DOM-02`). |
| `E23` Vie familiale, petite enfance et parentalité | **`DOM-01`** | `DOM-04`, `DOM-02` | Soutien matériel aux familles, modes d'accueil et congés parentaux rattachés aux âges de la vie. | Éveil éducatif préscolaire (`DOM-04`) et conciliation avec le travail (`DOM-02`). |
| `E24` Statut, reconnaissance et soutien des proches aidants | **`DOM-01`** | `DOM-02` | Soutien social et financier lié à la dépendance/handicap d'un proche. | Reconnaissance en tant qu'activité non rémunérée et aménagement du temps de travail (`DOM-02`). |
| `E25` Disponibilité, coût du logement et lutte contre le mal-logement | **`DOM-03`** | `DOM-01`, `DOM-02` | Cœur du domaine habitat : prix, loyers, logement social et sans-abrisme. | Hébergement d'urgence lié à la grande pauvreté (`DOM-01`) et pouvoir d'achat (`DOM-02`). |
| `E26` Pluralité des formes d'habitat et des statuts d'occupation | **`DOM-03`** | Aucun *(monodomaine)* | Propriété, location, coopératives, habitat partagé ou intergénérationnel. | Aucune confusion inter-domaines majeure si formulé de façon plurielle. |
| `E27` Urbanisme, usage des sols et adaptation matérielle du bâti | **`DOM-03`** | `DOM-05` | Formes urbaines, densité, règles d'aménagement local et confort du bâti. | Chevauchement fort sur la Zéro Artificialisation Nette (`DOM-05`) et la rénovation thermique. |
| `E28` Équilibre métropoles / villes moyennes / ruralité / outre-mer | **`DOM-03`** | `DOM-07`, `DOM-02` | Aménagement matériel et investissements de cohésion territoriale. | Répartition politique et budgétaire des compétences des collectivités (`DOM-07`). |
| `E29` Mobilités du quotidien et infrastructures de transport | **`DOM-03`** | `DOM-05` | Déplacements domicile-activité, train du quotidien, transports collectifs et route. | Décarbonation des transports et taxation des carburants (`DOM-05`). |
| `E30` Maillage territorial des services essentiels et fracture numérique | **`DOM-03`** | `DOM-07` | Présence physique de proximité et couverture réseau sur les territoires. | Droits numériques et dématérialisation des démarches (`DOM-07`). |
| `E31` Instruction scolaire, savoirs fondamentaux et pédagogie | **`DOM-04`** | `DOM-07` | Mission centrale d'instruction des jeunes et pluralisme des modèles scolaires. | Application scolaire de la laïcité et libertés d'enseignement (`DOM-07`). |
| `E32` Réduction des inégalités scolaires, mixité et orientation | **`DOM-04`** | `DOM-01` | Équité éducative et parcours d'orientation des élèves. | Déterminants familiaux et sociaux de la pauvreté infantile (`DOM-01`). |
| `E33` Statut, formation et conditions d'exercice des personnels éducatifs | **`DOM-04`** | Aucun *(monodomaine)* | Gestion et attractivité des métiers enseignants. | Comparaison éventuelle avec le statut général de la fonction publique (`DOM-02`). |
| `E34` Formation professionnelle, apprentissage et formation continue | **`DOM-04`** | `DOM-02` | Qualification et apprentissage tout au long de la vie rattachés aux savoirs. | Articulation directe avec les besoins de recrutement et reconversions (`DOM-02`). |
| `E35` Enseignement supérieur et conditions de vie étudiantes | **`DOM-04`** | `DOM-01`, `DOM-03` | Accès à l'université, sélection et parcours des jeunes adultes. | Précarité étudiante (`DOM-01`) et logement étudiant (`DOM-03`). |
| `E36` Recherche scientifique, innovation et liberté académique | **`DOM-04`** | `DOM-02`, `DOM-08` | Production des connaissances et autonomie de la recherche. | R&D industrielle (`DOM-02`) et programmes scientifiques européens (`DOM-08`). |
| `E37` Accès à la vie culturelle, patrimoine et politique des médias | **`DOM-04`** | `DOM-07` | Création, patrimoine et écosystème culturel et médiatique. | Liberté de la presse et régulation des plateformes numériques (`DOM-07`). |
| `E38` Pluralisme, laïcité, lutte contre les discriminations et vie associative | **`DOM-07`** | `DOM-04`, `DOM-01` | Cadre juridique républicain d'égalité des droits, de liberté de conscience et d'association civique. | **Cas limite :** souvent associé spontanément à « Culture et société » (`DOM-04`) ou à l'école (`E31`). |
| `E39` Atténuation du changement climatique et trajectoires de décarbonation | **`DOM-05`** | `DOM-02`, `DOM-03` | Pilotage global des émissions de gaz à effet de serre. | Coûts économiques et industriels (`DOM-02`), transports et bâti (`DOM-03`). |
| `E40` Adaptation aux conséquences climatiques et risques naturels | **`DOM-05`** | `DOM-03`, `DOM-01` | Prévention des aléas climatiques (sécheresses, inondations, incendies). | Aménagement local et zones inondables (`DOM-03`) ; impacts sanitaires des canicules (`DOM-01`). |
| `E41` Mix énergétique, sûreté d'approvisionnement et coût de l'énergie | **`DOM-05`** | `DOM-02`, `DOM-08` | Choix nucléaire/renouvelables/sobriété et système énergétique. | Facture énergétique des ménages/entreprises (`DOM-02`) et indépendance géopolitique (`DOM-08`). |
| `E42` Gestion quantitative et qualitative de l'eau | **`DOM-05`** | Aucun *(monodomaine)* | Ressource naturelle partagée entre milieux, agriculture et usages domestiques. | Conflits d'usage agricole déjà inclus dans `DOM-05`. |
| `E43` Biodiversité, préservation des forêts, des océans et du vivant | **`DOM-05`** | `DOM-03` | Protection des écosystèmes terrestres et marins. | Étalement urbain et artificialisation (`DOM-03`). |
| `E44` Modèles agricoles, souveraineté alimentaire et revenu agricole | **`DOM-05`** | `DOM-02`, `DOM-08` | Usage des terres, transition agroécologique et alimentation. | Revenu des exploitants (`DOM-02`), PAC et accords commerciaux (`DOM-08`). |
| `E45` Économie circulaire, déchets, pollutions et limites matérielles | **`DOM-05`** | `DOM-02`, `DOM-01` | Gestion des pollutions chimiques, déchets et ressources extractives. | Modèles industriels (`DOM-02`) et effets sanitaires des polluants (`DOM-01`). |
| `E46` Sécurité du quotidien, prévention de la délinquance et tranquillité | **`DOM-06`** | `DOM-01`, `DOM-04` | Cœur de la sûreté physique des personnes et des biens. | Volet social/éducatif de la prévention (`DOM-01`, `DOM-04`). |
| `E47` Moyens, doctrine d'emploi et contrôle des forces de sécurité intérieure | **`DOM-06`** | `DOM-07` | Organisation, armement, présence territoriale et déontologie policière. | Contrôle juridictionnel et libertés de manifester (`DOM-07`). |
| `E48` Politique pénale, réponse judiciaire aux infractions et prison | **`DOM-06`** | `DOM-07` | Sévérité des peines, alternatives, système carcéral et récidive. | Frontière immédiate avec les moyens généraux des tribunaux (`DOM-07`). |
| `E49` Fonctionnement, délais et accessibilité de la justice civile et pénale | **`DOM-07`** | `DOM-06` | Capacité des juridictions à rendre la justice dans des délais raisonnables. | Lenteur de la justice souvent perçue comme impunité sécuritaire (`DOM-06`). |
| `E50` Indépendance de l'autorité judiciaire et État de droit | **`DOM-07`** | `DOM-08` | Séparation des pouvoirs entre exécutif, parlement et juges. | Articulation avec les juridictions européennes CEDH/CJUE (`DOM-08`). |
| `E51` Droits fondamentaux, libertés publiques et encadrement de la surveillance | **`DOM-07`** | `DOM-06` | Vie privée, libertés d'expression/réunion, limites à la vidéosurveillance/renseignement. | Friction directe avec les outils technologiques policiers (`DOM-06`). |
| `E52` Régulation du numérique, plateformes, données et intelligence artificielle | **`DOM-07`** | `DOM-02`, `DOM-04` | Protection des droits citoyens et des mineurs face aux algorithmes et à l'IA. | Économie numérique (`DOM-02`), régulation européenne DSA/AI Act (`DOM-08`). |
| `E53` Organisation constitutionnelle des pouvoirs et équilibre exécutif/parlement | **`DOM-07`** | Aucun *(monodomaine)* | Règles de régime politique (49.3, VIe République, rôle du Parlement). | Abstraction institutionnelle si présentée de manière trop technique. |
| `E54` Modes de scrutin, représentativité et renouvellement politique | **`DOM-07`** | Aucun *(monodomaine)* | Proportionnelle, vote blanc, parité et règles électorales. | Aucune confusion majeure inter-domaines. |
| `E55` Participation citoyenne directe, délibération et confiance publique | **`DOM-07`** | Aucun *(monodomaine)* | RIC, conventions citoyennes, transparence et déontologie des élus. | Aucune confusion majeure inter-domaines. |
| `E56` Décentralisation, autonomie locale et statut des outre-mer | **`DOM-07`** | `DOM-03` | Répartition juridique et politique des compétences territoriales. | Confusion possible avec les investissements concrets de proximité (`DOM-03`). |
| `E57` Périmètre, compétences et démocratie de l'Union européenne | **`DOM-08`** | `DOM-07` | Traité européens, élargissement et légitimité des institutions de l'UE. | Articulation avec l'architecture institutionnelle nationale (`DOM-07`). |
| `E58` Souveraineté nationale et articulation avec les normes européennes | **`DOM-08`** | `DOM-02`, `DOM-07` | Primauté du droit national ou européen sur les choix économiques/sociaux. | Règles budgétaires et aides d'État (`DOM-02`). |
| `E59` Défense nationale, armées, dissuasion et sécurité européenne | **`DOM-08`** | `DOM-02` | Politique militaire, alliances (OTAN/UE) et effort de défense. | Budget des armées face aux autres priorités budgétaires (`DOM-02`). |
| `E60` Diplomatie, gestion des crises géopolitiques et multilatéralisme | **`DOM-08`** | Aucun *(monodomaine)* | Positionnement international et alliances de la France. | Aucune confusion inter-domaines majeure. |
| `E61` Commerce international, libre-échange et souveraineté stratégique | **`DOM-08`** | `DOM-02`, `DOM-05` | Traités commerciaux, droits de douane et dépendances critiques. | Compétitivité industrielle (`DOM-02`) et importations agricoles/énergétiques (`DOM-05`). |
| `E62` Gestion des frontières, politique migratoire, droit d'asile et intégration | **`DOM-08`** | `DOM-06`, `DOM-01` | Contrôle des flux extérieurs, Schengen, asile et accueil. | **Cas limite fort :** sécurité intérieure (`DOM-06`) et accès aux droits sociaux/emploi (`DOM-01`/`DOM-02`). |
| `E63` Coopération internationale, aide au développement et climat mondial | **`DOM-08`** | `DOM-05` | Solidarités internationales et biens publics mondiaux. | Transition climatique mondiale (`DOM-05`). |
| `E64` *[Transversal]* Transformation numérique et intelligence artificielle | **`DOM-07`** | `DOM-02`, `DOM-04` | Pilotage des droits et régulation publique de l'IA/données ; impact travail (`D2`), école (`D4`), santé (`D1`). | Peut sembler dispersé ; nécessite un tag transversal au Niveau 2. |
| `E65` *[Transversal]* Inégalités socio-économiques et territoriales | **`DOM-02`** | `DOM-01`, `DOM-03`, `DOM-04` | Répartition des revenus/fiscalité comme levier central, complétée par logement, école et solidarités. | Traversant presque toutes les cartes, ne doit pas être confisqué par une seule. |
| `E66` *[Transversal]* Transition démographique et équilibre intergénérationnel | **`DOM-01`** | `DOM-02`, `DOM-03`, `DOM-04` | Vieillissement, dépendance et retraites au cœur de `DOM-01`. | Jeunesse/études (`DOM-04`) et logement des jeunes/aînés (`DOM-03`). |
| `E67` *[Transversal]* Égalité réelle et spécificités des territoires d'outre-mer | **`DOM-03`** | `DOM-07`, `DOM-02`, `DOM-05` | Vie quotidienne et continuité territoriale ; statut politique dans `DOM-07`, vie chère dans `DOM-02`. | Risque d'invisibilisation ultramarine sans mention explicite dans `DOM-03` et `DOM-07`. |
| `E68` *[Transversal]* Soutenabilité financière et budgétaire de l'action publique | **`DOM-02`** | Tous (`DOM-01`..`DOM-08`) | Arbitrage recettes/dépenses/dette rattaché à `DOM-02`, mais contrainte transversale de faisabilité en Niveau 2. | Ne pas laisser croire que `DOM-02` seul a un coût budgétaire. |

---

## 2. Synthèse analytique exigée de la couverture

### A. Sous-enjeux couverts par un seul domaine (monodomaines)
Neuf sous-enjeux relèvent d'un rattachement univoque sans chevauchement structurel fort :
- `E08` (formes d'activité rémunérée → `DOM-02`)
- `E14` (organisation des hôpitaux et médecine de ville → `DOM-01`)
- `E26` (diversité des formes d'habitat → `DOM-03`)
- `E33` (personnels éducatifs → `DOM-04`)
- `E42` (gestion de l'eau → `DOM-05`)
- `E53`, `E54`, `E55` (institutions constitutionnelles, modes de scrutin, participation citoyenne → `DOM-07`)
- `E60` (diplomatie et crises géopolitiques → `DOM-08`)

### B. Sous-enjeux couverts par plusieurs domaines (frontières actives)
Les frontières inter-domaines les plus sensibles et explicitement documentées sont :
1. **`DOM-01` ↔ `DOM-02` :** financement de la protection sociale (`E13`, `E18`), chômage (`E21` vs `E07`), reconnaissance des proches aidants et travail de soin non rémunéré (`E24` vs `E10`).
2. **`DOM-03` ↔ `DOM-05` :** rénovation thermique, artificialisation des sols (`E27` vs `E43`) et décarbonation des mobilités (`E29` vs `E39`).
3. **`DOM-06` ↔ `DOM-07` :** réponse pénale (`E48` vs `E49`), déontologie des forces de sécurité et encadrement des libertés/surveillance (`E47` vs `E51`).
4. **`DOM-02` ↔ `DOM-05` ↔ `DOM-08` :** réindustrialisation, modèle agricole et accords commerciaux internationaux (`E05`, `E44`, `E61`).

### C. Sous-enjeux sans rattachement évident / cas frontières délicats
Trois sous-enjeux ne s'imposent pas d'eux-mêmes sur un seul titre court et exigent une **mention explicite dans les notes de périmètre** :
1. **`E38` (Pluralisme, laïcité et lutte contre les discriminations) :** hésitation naturelle entre `DOM-04` (école/culture) et `DOM-07` (droits fondamentaux/libertés publiques). *Arbitrage :* rattachement principal à `DOM-07` (principe juridique de laïcité et égalité devant la loi), avec renvoi explicite dans `DOM-04` pour les politiques culturelles et scolaires.
2. **`E62` (Frontières, politique migratoire et intégration) :** hésitation entre `DOM-08` (contrôle des frontières, accords européens, asile) et `DOM-06` (sécurité intérieure) ou `DOM-01`/`DOM-02` (intégration sociale et économique). *Arbitrage :* rattachement principal à `DOM-08` (avec visibilité explicite dans l'énoncé), tout en ouvrant au Niveau 2 des renvois vers `DOM-01`, `DOM-02` et `DOM-06` sur les volets intégration/ordre public.
3. **`E10` et `E24` (Activités non rémunérées et proches aidants) :** hésitation entre `DOM-02` (reconnaissance d'une activité hors emploi salarié) et `DOM-01` (soutien aux proches âgés ou handicapés). *Arbitrage :* dimension statutaire et temps de vie dans `DOM-02`, dimension soutien médico-social aux aidants dans `DOM-01`.

### D. Sous-enjeux transversaux (`E64`–`E68`)
Les cinq dynamiques transversales (numérique/IA, inégalités, démographie, outre-mer, soutenabilité budgétaire) disposent chacune d'un **point d'ancrage principal** au Niveau 1 (`DOM-07`, `DOM-02`, `DOM-01`, `DOM-03`, `DOM-02`) et sont **systématiquement intégrées comme dimensions d'arbitrage au Niveau 2** sur l'ensemble des domaines concernés (voir `L07`).

### E. Regroupements masquant des orientations opposées
Bien que `DOM-06` et `DOM-07` suppriment le masquage critique Sécurité vs Libertés de la V0.3, quatre regroupements restent porteurs d'orientations internes potentiellement opposées (`DOM-01`, `DOM-02`, `DOM-05`, `DOM-08`), qui font l'objet d'une analyse systématique dans [`L06_ANALYSE_CONTRADICTIONS_INTERNES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L06_ANALYSE_CONTRADICTIONS_INTERNES.md).
