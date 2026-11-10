# L07 — Architecture d'exploration approfondie (Niveau 2)

**Statut :** Proposition architecturale et éditoriale (phase post-MaxDiff, indépendante des comptages Niveau 1).  
**Principes directeurs imposés :**
1. **Non-exhaustivité et liberté d'exploration :** l'utilisateur choisit librement d'explorer **0, 1 ou plusieurs domaines** (y compris un domaine placé « pourrait attendre » au Niveau 1 ou un enjeu manquant ajouté librement). Aucun parcours exhaustif n'est jamais imposé.
2. **Progression par dévoilement maîtrisé :** pas de succession de questionnaires rigides ; l'utilisateur descend uniquement jusqu'au niveau de détail souhaité.
3. **Séparation stricte des 7 construits (`P1_1_D1_DECISION_v0.3.md` § 4) :** aucune réponse de Niveau 2 ne modifie rétroactivement les comptages MaxDiff de Niveau 1, et aucun score composite n'est jamais calculé.
4. **Confidentialité et non-prescription :** tout reste en mémoire navigateur (MVP) ; la confrontation aux positions publiques repose sur des fiches sourcées et datées (`08_GOVERNANCE_CONTENT.md`), sans score de proximité ni recommandation de candidat.

---

## 1. Architecture modulaire du Niveau 2 (gabarit commun à 4 strates facultatives)

Lorsqu'un utilisateur sélectionne un domaine à explorer après le MaxDiff, l'interface propose quatre strates facultatives dans lesquelles il peut entrer, passer, revenir ou s'arrêter à tout moment :

| Strate Niveau 2 | Construit(s) recueilli(s) | Principe d'interaction | Garde-fou méthodologique |
|---|---|---|---|
| **Strate 2.1 — Choix du ou des sous-enjeux et dimensions** | Focalisation thématique + *Préoccupation personnelle* vs *Gravité perçue* | L'utilisateur coche 1 à 3 sous-enjeux qui expliquent son intérêt (ou ajoute un sous-enjeu libre), et peut indiquer s'il s'agit d'un vécu personnel, d'une inquiétude collective, ou des deux. | Permet d'emblée de démêler un domaine composite (ex. soins vs retraites dans `DOM-01` ; sécurité vs libertés déjà séparés). |
| **Strate 2.2 — Raisons, valeurs et convictions causales** | *Raisons / valeurs / critères* + *Convictions causales ou factuelles* | Saisie libre prioritaire + pistes non exclusives randomisées + champ séparé « Selon vous, qu'est-ce qui explique ou cause cette situation ? ». | Les affirmations causales sont balisées `user_stated_unverified` ; les valeurs ne sont jamais corrigées comme des faits. |
| **Strate 2.3 — Solutions envisagées, arbitrages et faisabilité** | *Solutions / instruments privilégiés* + *Faisabilité / capacité d'action perçue* | Pistes pluralistes d'instruments + mises en regard d'arbitrages réels (coût budgétaire, liberté vs contrainte, échelle locale/nationale/UE) + « Cela dépend / conditions » + « Rejeter les options proposées » + « Je ne sais pas ». | Aucune solution proposée comme supérieure ; la perception de faisabilité (« l'État peut-il agir seul ? ») reste distincte du souhait normatif. |
| **Strate 2.4 — Confrontation documentaire aux positions publiques** | Consultation documentaire (aucun score produit) | À partir des sous-enjeux choisis, accès aux fiches publiques des candidats/partis : programme, déclaration datée, vote parlementaire, action réalisée, ou mention explicite `not_documented`. | **Zéro score de concordance, zéro jauge de compatibilité, ordre aléatoire ou alphabétique neutre des acteurs.** |

---

## 2. Déclinaison détaillée pour chacun des huit domaines

### `DOM-01` — Santé et solidarités face aux risques de la vie

1. **Liste structurée de sous-enjeux :**
   - `S01.1` Accès territorial et délais des soins (ville, hôpital, urgences, professionnels).
   - `S01.2` Coût des soins, remboursements et prévention/santé mentale.
   - `S01.3` Retraites et équilibre entre générations.
   - `S01.4` Vieillissement, perte d'autonomie et handicap.
   - `S01.5` Chômage, pauvreté et filets de sécurité matériels.
   - `S01.6` Soutien aux familles, petite enfance et proches aidants.
2. **Dimensions du problème à distinguer :**
   - *Organisation matérielle et humaine* (offre de médecins, lits, aidants) vs *Mécanisme de couverture financière* (impôt, cotisations, mutuelles, épargne, solidarité familiale) vs *Publics bénéficiaires*.
3. **Exemples de questions d'exploration :**
   - *Préoccupation vs gravité :* « Ce sujet vous préoccupe-t-il pour votre propre situation ou celle d'un proche, ou surtout pour l'état du pays dans les années à venir ? »
   - *Raisons :* « Qu'est-ce qui compte le plus ici pour vous : réduire les délais d'accès, garantir un niveau de vie minimal, préserver l'équilibre financier du système, ou reconnaître les efforts passés ? »
   - *Causalité (`user_stated_unverified`) :* « À quoi attribuez-vous principalement les difficultés actuelles (démographie médicale, gestion administrative, vieillissement, manque de moyens, abus) ? »
4. **Possibilités d'expression libre :** champ ouvert sur le ressenti d'accès aux soins ou de vulnérabilité ; possibilité d'ajouter un public ou un besoin omis.
5. **Pistes d'exploration des solutions :**
   - *Soins :* régulation d'installation vs incitations financières, revalorisation des métiers, téléconsultation/délégation de tâches, rôle des cliniques privées/mutuelles.
   - *Solidarités :* couverture universelle vs ciblage sous conditions de ressources/activité ; âge de départ vs durée de cotisation vs part de capitalisation.
6. **Arbitrages possibles :**
   - Augmenter les cotisations/impôts pour élargir les droits vs contenir les prélèvements obligatoires en ciblant ou responsabilisant davantage ; liberté d'installation des médecins vs égalité d'accès territorial.
7. **Éléments documentaires de confrontation :**
   - Chiffrages comparés des dépenses sociales et démographiques (DREES, COR, Cour des comptes) ; programmes, amendements PLFSS et votes des acteurs sur l'âge de retraite, la régulation médicale et les minima sociaux.

---

### `DOM-02` — Économie, travail, activités et finances publiques

1. **Liste structurée de sous-enjeux :**
   - `S02.1` Organisation des activités rémunérées (salariat, indépendance, entrepreneuriat) et non rémunérées (soin, bénévolat, vie domestique).
   - `S02.2` Conditions de travail, pénibilité et partage des temps de vie.
   - `S02.3` Salaires, pouvoir d'achat, prix et partage de la valeur.
   - `S02.4` Tissu productif, PME, réindustrialisation et compétitivité.
   - `S02.5` Fiscalité, dette publique et choix budgétaires de l'État.
2. **Dimensions du problème à distinguer :**
   - *Travail comme activité humaine et temps de vie* vs *Revenu et pouvoir d'achat* vs *Soutenabilité des finances publiques et appareil productif*.
3. **Exemples de questions d'exploration :**
   - « Quand vous pensez à ce domaine, pensez-vous d'abord à vos fins de mois et aux prix, à vos conditions et horaires d'activité, ou à l'économie et la dette du pays ? »
   - « Quelles activités non rémunérées (soin à un proche, parentalité, bénévolat) mériteraient selon vous une autre reconnaissance collective ? »
   - *Causalité :* « Quelle explication retenez-vous en premier pour la stagnation du pouvoir d'achat ou les déficits (coût du travail, fiscalité, marges des entreprises, prix importés, dépenses publiques) ? »
4. **Possibilités d'expression libre :** récits libres sur la pénibilité, la pluriactivité, la création d'entreprise ou le poids des prélèvements, avec possibilité de préciser des conditions.
5. **Pistes d'exploration des solutions :**
   - Revalorisation salariale/SMIC vs baisse de cotisations ; semaine de 4 jours / réduction du temps de travail vs défiscalisation d'heures supplémentaires ; taxation du patrimoine/superprofits vs baisse des impôts de production ; statut universel d'actif vs droits liés au contrat salarié.
6. **Arbitrages possibles :**
   - Hausse des salaires immédiate vs compétitivité-prix à l'exportation ; maintien du niveau de dépense publique vs réduction du déficit ; temps libéré pour soi et les proches vs revenu disponible accru.
7. **Éléments documentaires de confrontation :**
   - Données INSEE / DARES / Cour des comptes sur la répartition salaires-profits, le temps de travail réel et la structure de la dette ; votes parlementaires PLF, propositions fiscales et chiffrages de programmes.

---

### `DOM-03` — Logement, territoires et mobilités du quotidien

1. **Liste structurée de sous-enjeux :**
   - `S03.1` Accès au logement, loyers, prix immobiliers et sans-abrisme.
   - `S03.2` Formes d'habitat (propriété, location, logement social, habitat partagé/intergénérationnel).
   - `S03.3` Urbanisme, artificialisation des sols et adaptation du bâti.
   - `S03.4` Mobilités du quotidien (transports collectifs, rail, automobile, tarification).
   - `S03.5` Équilibre métropoles / ruralité / outre-mer et accès territorial aux services.
2. **Dimensions du problème à distinguer :**
   - *Crise sociale de l'accès* vs *Modèle d'urbanisme et d'occupation des sols* vs *Mobilité quotidienne et isolement territorial*.
3. **Exemples de questions d'exploration :**
   - « Dans votre territoire, la difficulté principale porte-t-elle sur le prix pour se loger, sur la nécessité de prendre la voiture faute d'alternative, ou sur la disparition des services de proximité ? »
   - « Quel mode d'habitat vous semble devoir être facilité en priorité, sans l'imposer comme modèle unique ? »
4. **Possibilités d'expression libre :** description concrète des contraintes locales (temps de trajet, marché immobilier tendu, vie chère outre-mer, isolement numérique).
5. **Pistes d'exploration des solutions :**
   - Encadrement des loyers et construction sociale vs libération foncière et incitations fiscales privées ; soutien à la voiture propre et aux routes vs développement du ferroviaire régional et gratuité des transports ; maintien de guichets physiques vs médiation numérique.
6. **Arbitrages possibles :**
   - Construire plus de logements accessibles vs limiter l'artificialisation des terres agricoles (`ZAN`) ; maintenir l'accès en véhicule thermique/individuel vs restrictions environnementales urbaines (`ZFE`).
7. **Éléments documentaires de confrontation :**
   - Données sur le mal-logement, les prix du m² et les zones blanches/mobilité ; positions publiques et votes sur le logement social (SRU), l'encadrement des loyers, le ZAN et les investissements ferroviaires/routiers.

---

### `DOM-04` — Éducation, savoirs, recherche et culture

1. **Liste structurée de sous-enjeux :**
   - `S04.1` Instruction scolaire, maîtrise des fondamentaux et pédagogies.
   - `S04.2` Inégalités scolaires, mixité sociale et orientation.
   - `S04.3` Conditions d'exercice et recrutement des personnels éducatifs.
   - `S04.4` Apprentissage, formation professionnelle et continue des adultes.
   - `S04.5` Enseignement supérieur, précarité étudiante et recherche scientifique.
   - `S04.6` Accès à la culture, patrimoine et politique des médias.
2. **Dimensions du problème à distinguer :**
   - *Transmission académique et autorité éducative* vs *Réduction des inégalités sociales* vs *Recherche/innovation* vs *Pluralisme culturel et médiatique*.
3. **Exemples de questions d'exploration :**
   - « Quel rôle devrait primer selon vous à l'école : transmettre un socle académique exigeant, réduire les écarts liés à l'origine sociale, ou préparer concrètement aux métiers ? »
   - « S'agissant des adultes, la formation tout au long de la vie vous semble-t-elle aujourd'hui accessible et utile ? »
4. **Possibilités d'expression libre :** témoignages sur le parcours scolaire, l'orientation (Parcoursup), la vie culturelle locale ou l'accès à la formation.
5. **Pistes d'exploration des solutions :**
   - Groupes de niveau et recentrage sur les fondamentaux vs mixité scolaire contrainte et moyens accrus en éducation prioritaire ; liberté d'enseignement privé vs renforcement exclusif du public ; financement public de la recherche fondamentale vs partenariats privés ; soutien à l'audiovisuel public vs réallocation/privatisation.
6. **Arbitrages possibles :**
   - Autonomie accrue des établissements (risque de disparités) vs cadre national uniforme ; sélectivité à l'entrée du supérieur vs accès universel ; budgets affectés à l'école primaire vs université/recherche/culture.
7. **Éléments documentaires de confrontation :**
   - Comparaisons internationales (PISA, dépenses par élève, R&D/PIB) ; positions documentées des candidats sur la carte scolaire, la voie professionnelle, les salaires enseignants et le financement culturel/audiovisuel.

---

### `DOM-05` — Climat, énergie, ressources naturelles et agriculture

1. **Liste structurée de sous-enjeux :**
   - `S05.1` Réduction des émissions de gaz à effet de serre et rythmes de décarbonation.
   - `S05.2` Adaptation aux aléas climatiques (canicules, sécheresses, inondations).
   - `S05.3` Mix énergétique (nucléaire, renouvelables), sûreté et prix de l'énergie.
   - `S05.4` Partage de l'eau, protection de la biodiversité, sols et forêts.
   - `S05.5` Modèles agricoles, souveraineté alimentaire et revenu des agriculteurs.
   - `S05.6` Pollutions, déchets et sobriété matérielle.
2. **Dimensions du problème à distinguer :**
   - *Urgence écologique et limites planétaires* vs *Coût économique/social immédiat et sécurité d'approvisionnement* vs *Viabilité économique agricole*.
3. **Exemples de questions d'exploration :**
   - « Lorsqu'une mesure écologique augmente à court terme le coût de la vie ou contraint une activité locale, qu'est-ce qui rend l'arbitrage acceptable ou inacceptable à vos yeux ? »
   - *Causalité (`user_stated_unverified`) :* « Quelles solutions technologiques ou changements de mode de vie jugez-vous réellement réalistes d'ici 2035 ? »
4. **Possibilités d'expression libre :** expression sur l'inquiétude écologique, la facture énergétique, les normes agricoles ou l'attachement aux paysages/terroirs.
5. **Pistes d'exploration des solutions :**
   - Relance nucléaire + renouvelables vs 100 % renouvelables + sobriété ; tarification/fiscalité carbone redistribuée vs normes sectorielles et investissement public massif ; agroécologie et réduction des intrants vs intensification durable et stockage de l'eau.
6. **Arbitrages possibles :**
   - Rythme de décarbonation rapide vs protection de l'industrie et du pouvoir d'achat ; partage de l'eau entre agriculture, énergie et milieux naturels ; prix alimentaires bas vs juste rémunération agricole et qualité environnementale.
7. **Éléments documentaires de confrontation :**
   - Rapports GIEC, RTE (*Futurs énergétiques 2050*), Haut Conseil pour le climat, ADEME (présentés comme constats scientifiques sourcés) ; votes et positions des acteurs sur le nucléaire, la PAC, les pesticides, la taxe carbone et les énergies renouvelables.

---

### `DOM-06` — Sécurité des personnes et tranquillité publique

1. **Liste structurée de sous-enjeux :**
   - `S06.1` Sécurité du quotidien, violences (dont intrafamiliales), vols et trafics.
   - `S06.2` Prévention sociale, éducative et situationnelle de la délinquance.
   - `S06.3` Moyens, présence territoriale et doctrine d'emploi des forces de sécurité.
   - `S06.4` Contrôle indépendant, déontologie et relations police-citoyens.
   - `S06.5` Politique pénale, exécution des peines, prison et réinsertion.
2. **Dimensions du problème à distinguer :**
   - *Sentiment d'insécurité et faits vécus* vs *Prévention des causes* vs *Réponse policière/pénale* vs *Limites et contrôle de l'action policière*.
3. **Exemples de questions d'exploration :**
   - « Qu'est-ce qui manque le plus aujourd'hui selon vous : une présence policière plus visible, des sanctions plus rapides et plus fermes, des actions de prévention en amont, ou de meilleures relations de confiance entre police et population ? »
   - *Faisabilité :* « Jusqu'où êtes-vous prêt à accepter une extension des contrôles ou de la surveillance vidéo pour gagner en sûreté ? »
4. **Possibilités d'expression libre :** récits ou préoccupations sur la tranquillité dans le quartier, les violences subies ou les tensions avec les forces de l'ordre.
5. **Pistes d'exploration des solutions :**
   - Hausse des effectifs, peines planchers et places de prison vs police de proximité, médiation sociale et alternatives à l'incarcération ; extension des polices municipales et outils numériques vs renforcement de l'IGPN/Défenseur des droits et désescalade.
6. **Arbitrages possibles :**
   - Efficacité sécuritaire à court terme vs risque d'atteinte à la vie privée (`DOM-07`) ; fermeté carcérale vs lutte contre la récidive en milieu ouvert.
7. **Éléments documentaires de confrontation :**
   - Statistiques SSMSI/INSEE (faits enregistrés vs enquêtes de victimation) et données de surpopulation carcérale ; votes sur les lois sécurité globale, LOPMI, réformes pénales et contrôle des forces de sécurité.

---

### `DOM-07` — Justice, libertés publiques et démocratie

1. **Liste structurée de sous-enjeux :**
   - `S07.1` Moyens, délais et accessibilité de la justice civile, familiale et pénale.
   - `S07.2` Indépendance judiciaire, Conseil constitutionnel et État de droit.
   - `S07.3` Droits fondamentaux, vie privée, liberté d'expression et de manifestation.
   - `S07.4` Régulation des plateformes numériques, données et intelligence artificielle.
   - `S07.5` Laïcité, pluralisme et lutte contre les discriminations.
   - `S07.6` Institutions, modes de scrutin, décentralisation, outre-mer et participation citoyenne.
2. **Dimensions du problème à distinguer :**
   - *Fonctionnement matériel de la justice* vs *Protection des libertés individuelles* vs *Architecture des pouvoirs démocratiques et territoriaux*.
3. **Exemples de questions d'exploration :**
   - « Quelle priorité mettez-vous en avant ici : raccourcir les délais des tribunaux, mieux protéger la vie privée et les libertés publiques, faire évoluer les règles électorales et démocratiques, ou clarifier le cadre de la laïcité ? »
   - *Conditions :* « Si une majorité élue souhaite adopter une mesure jugée contraire à la Constitution ou aux traités européens par les juges, qui devrait avoir le dernier mot ? »
4. **Possibilités d'expression libre :** critiques sur le fonctionnement démocratique, sentiment de non-représentation, attachement aux libertés numériques ou expérience d'une procédure judiciaire.
5. **Pistes d'exploration des solutions :**
   - Recrutement de magistrats/greffiers ; instauration de la proportionnelle, reconnaissance du vote blanc, RIC ou conventions citoyennes vs maintien d'un exécutif stable ; décentralisation fiscale et statuts ultramarins ; régulation stricte des algorithmes et de l'IA.
6. **Arbitrages possibles :**
   - Stabilité gouvernementale (scrutin majoritaire) vs représentativité fidèle (proportionnelle) ; primauté des juges garants des droits vs primauté du suffrage populaire ; liberté d'expression en ligne vs lutte contre la haine/désinformation.
7. **Éléments documentaires de confrontation :**
   - Budgets comparés de la justice en Europe (CEPEJ), textes constitutionnels et rapports sur la confiance démocratique ; propositions des candidats sur la VIe République, le RIC, le scrutin, l'IA et la laïcité.

---

### `DOM-08` — Place de la France en Europe et dans le monde

1. **Liste structurée de sous-enjeux :**
   - `S08.1` Avenir, compétences et démocratie de l'Union européenne.
   - `S08.2` Souveraineté nationale et articulation avec le droit et le budget européens.
   - `S08.3` Défense nationale, armées, dissuasion et sécurité collective (UE/OTAN).
   - `S08.4` Diplomatie, crises géopolitiques, multilatéralisme et aide au développement.
   - `S08.5` Commerce international, protectionnisme, libre-échange et dépendances stratégiques.
   - `S08.6` Frontières, politique migratoire, droit d'asile et intégration.
2. **Dimensions du problème à distinguer :**
   - *Coopération ou reprise de souveraineté européenne* vs *Sécurité militaire/géopolitique* vs *Modèle commercial* vs *Régulation des mobilités humaines et frontières*.
3. **Exemples de questions d'exploration :**
   - « Dans ce domaine international, quel aspect pèse le plus dans votre priorité : le rôle de l'Union européenne, la sécurité face aux conflits mondiaux, nos échanges commerciaux et notre indépendance économique, ou le contrôle des frontières et des migrations ? »
   - *Faisabilité :* « Sur quels sujets pensez-vous que la France peut agir efficacement seule, et sur lesquels une action européenne ou internationale vous paraît indispensable ? »
4. **Possibilités d'expression libre :** expression nuancée distinguant, par exemple, l'attachement au projet européen de la critique de ses règles actuelles, ou distinguant l'asile humanitaire de l'immigration économique.
5. **Pistes d'exploration des solutions :**
   - Europe fédérale (défense et fiscalité communes) vs Europe des nations coopérant à la carte ; maintien ou révision des accords de libre-échange vs clauses miroirs et droits de douane ; quotas/contrôles stricts aux frontières vs voies légales encadrées et répartition européenne de l'asile.
6. **Arbitrages possibles :**
   - Coût économique d'une autonomie stratégique nationale ou européenne vs avantages de prix du commerce ouvert ; hausse du budget de défense vs autres budgets publics ; solidarité internationale vs priorité aux ressources nationales.
7. **Éléments documentaires de confrontation :**
   - Traités européens en vigueur, chiffres des échanges commerciaux, budgets de défense (% PIB), statistiques OQTF/asile/titres de séjour ; votes au Parlement européen et positions officielles des candidats sur l'UE, l'Ukraine/OTAN, le Mercosur et l'immigration.

---

## 3. Règle stricte de non-consolidation et de restitution

Conformément à l'architecture validée :
- **Aucune note de synthèse chiffrée** n'est calculée à partir des réponses de Niveau 2 (ni moyenne de gravité, ni indice de radicalité, ni score de concordance candidat).
- **La synthèse finale (`P1.4` / `P1.5` futurs)** reste strictement segmentée par panneau :
  1. *Observations MaxDiff de Niveau 1* (comptages descriptifs des 8 domaines uniquement) ;
  2. *Enjeux manquants et préoccupations personnelles confirmées* ;
  3. *Explorations Niveau 2 par domaine* (sous-enjeux sélectionnés, raisons, convictions causales `user_stated_unverified`, solutions et conditions jugées acceptables, fiches consultées).
