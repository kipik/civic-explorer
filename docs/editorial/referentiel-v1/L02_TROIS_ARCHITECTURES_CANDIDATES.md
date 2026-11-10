# L02 — Construction et analyse critique de trois architectures candidates à 8 domaines

**Règle méthodologique respectée :** Aucune proposition initiale de 8 domaines n'est retenue sans avoir construit, justifié et critiqué **trois architectures reposant sur des choix conceptuels véritablement différents** (et non des variantes lexicales cosmétiques).

---

## 1. Le dilemme structurel du passage à `N = 8` domaines

À l'issue de la cartographie (`L01`), le débat présidentiel français fait apparaître **dix pôles majeurs** :
1. Santé et système de soins
2. Solidarités, âges et protection contre les vulnérabilités
3. Travail, activités humaines et temps de vie
4. Économie productive, niveau de vie, fiscalité et finances publiques
5. Logement, territoires et mobilités
6. Éducation, savoirs, recherche et culture
7. Climat, énergie, ressources naturelles et agriculture
8. Sécurité des personnes et ordre public
9. Justice, État de droit et libertés publiques
10. Institutions, démocratie et décentralisation
11. Place de la France en Europe et dans le monde

Pour tenir dans `N = 8` cartes comparables en MaxDiff, chaque architecture doit trancher **comment réduire ces 10–11 pôles à 8 domaines**. Les trois architectures suivantes incarnent **trois philosophies politiques et cognitives opposées** de cette réduction.

---

## 2. Architecture Candidate 1 — « Arbitrages collectifs clarifiés : dissociation régalienne et boucliers socio-économiques consolidés »

### 2.1 Vue d'ensemble des 8 domaines

1. **`A1-D1` — Santé, soins et solidarités face aux aléas de la vie**
2. **`A1-D2` — Économie, travail, revenus et finances publiques**
3. **`A1-D3` — Logement, territoires et mobilités du quotidien**
4. **`A1-D4` — Éducation, savoirs, recherche et culture**
5. **`A1-D5` — Climat, énergie, ressources naturelles et agriculture**
6. **`A1-D6` — Sécurité des personnes et tranquillité publique**
7. **`A1-D7` — Justice, État de droit, libertés publiques et vie démocratique**
8. **`A1-D8` — Place de la France en Europe et dans le monde**

### 2.2 Logique de regroupement

L'Architecture 1 privilégie **la non-ambiguïté directionnelle des cartes régaliennes et l'équilibre du niveau d'abstraction** :
- Elle **scinde le couple explosif `C07` de la V0.3** en séparant nettement la **protection physique et l'ordre public (`A1-D6`)** du **cadre juridique, des droits fondamentaux et des institutions démocratiques (`A1-D7`)**.
- Elle **résout le décalage méta-abstrait de `C08`** en intégrant les règles institutionnelles et démocratiques dans le même pôle de l'État de droit et de la citoyenneté (`A1-D7`).
- Elle **donne un domaine autonome à l'Europe et au monde (`A1-D8`)** et intègre explicitement l'**économie, les revenus et les finances publiques (`A1-D2`)**.
- En contrepartie, pour libérer ces places, elle **regroupe la Santé et les Solidarités (`A1-D1`)** en un grand domaine de « protection sanitaire et sociale face aux risques de la vie », et elle **maintient ensemble le Travail/Activités et l'Économie/Revenus (`A1-D2`)**, renvoyant la distinction entre travail non rémunéré, temps de vie, salaires et budget public au Niveau 2.

### 2.3 Avantages

- **Zéro angle mort thématique majeur** dans le MaxDiff (santé, social, travail, économie/dette, logement/mobilités, éducation/culture, climat/agriculture, sécurité, justice/libertés/institutions, Europe/monde sont tous explicitement présents).
- **Supprime le défaut critique de `C07` (V0.3)** : un citoyen préoccupé par l'insécurité (`A1-D6`) et un citoyen préoccupé par les libertés publiques ou la réforme des institutions (`A1-D7`) ne choisissent plus la même carte.
- **Homogénéité du niveau d'abstraction :** les 8 domaines désignent chacun un grand champ d'action collective reconnaissable sans connaissances institutionnelles spécialisées.

### 2.4 Inconvénients

- **Re-regroupement Santé + Solidarités (`A1-D1`) :** revient sur la scission `C01`/`C02` de la V0.3 ; un choix sur `A1-D1` ne dit pas si la priorité vise l'accès aux médecins/hôpitaux ou les retraites, le handicap et la pauvreté.
- **Poids du domaine économique (`A1-D2`) :** regrouper l'appareil productif, les finances publiques/dette, les revenus et le travail/temps de vie crée un pôle très vaste qui risque d'attirer mécaniquement des choix « pouvoir d'achat » et de masquer au Niveau 1 la reconnaissance spécifique des activités non rémunérées (soin, bénévolat).
- **Largeur de `A1-D7` :** réunit délais de la justice, libertés numériques, laïcité et réforme constitutionnelle/électorale.

### 2.5 Chevauchements principaux

- `A1-D1` (Santé/Solidarités) ↔ `A1-D2` (Économie/Travail/Finances) : financement de la protection sociale et de l'assurance maladie (`E03`/`E04`/`E13`/`E18`), indemnisation du chômage (`E21`) vs marché du travail (`E07`).
- `A1-D3` (Logement/Territoires/Mobilités) ↔ `A1-D5` (Climat/Ressources) : rénovation énergétique (`E27`), étalement urbain/artificialisation, transports décarbonés (`E29`/`E39`).
- `A1-D6` (Sécurité intérieure) ↔ `A1-D7` (Justice/Libertés) : réponse pénale (`E48`), contrôle des forces de sécurité (`E47`) vs garanties judiciaires (`E50`) et libertés (`E51`).
- `A1-D6` (Sécurité) ↔ `A1-D8` (Europe/Monde) : sécurité des frontières (`E62`), lutte contre les trafics transfrontaliers.

### 2.6 Angles morts ou thèmes sous-visibilisés

- Aucun grand angle mort au Niveau 1, mais deux thèmes risquent d'être **sous-visibilisés dans les titres courts** s'ils ne figurent pas explicitement dans la formulation MaxDiff ou la note de périmètre : les **activités non rémunérées / proches aidants (`E10`, `E24`)** et la **laïcité / culture / médias (`E37`, `E38`)**.

### 2.7 Oppositions internes identifiées

- **`A1-D1` :** Extension de la couverture publique universelle vs ciblage et responsabilisation individuelle ; priorité aux soins hospitaliers vs priorité aux pensions de retraite.
- **`A1-D2` :** Compétitivité des entreprises et réduction de la dette/dépense publique vs hausse des salaires, redistribution fiscale et réduction du temps de travail.
- **`A1-D5` :** Relance nucléaire et compétitivité agricole exportatrice vs sortie du nucléaire, sobriété et agroécologie.
- **`A1-D6` :** Fermeté répressive et renforcement des moyens policiers vs prévention sociale, désescalade et contrôle accru de la police.
- **`A1-D7` :** Pouvoirs renforcés du juge et démocratie délibérative/proportionnelle vs primauté de la décision politique élue et stabilité exécutive.
- **`A1-D8` :** Souveraineté nationale et contrôle strict des frontières/protectionnisme vs intégration européenne fédérale, libre-échange et politique d'accueil.

---

## 3. Architecture Candidate 2 — « Sphères de vie quotidienne à granularité sociale fine et gouvernance multi-échelles »

### 3.1 Vue d'ensemble des 8 domaines

1. **`A2-D1` — Santé, soins et prévention**
2. **`A2-D2` — Solidarités, âges de la vie et cohésion sociale**
3. **`A2-D3` — Travail, activités non rémunérées et temps de vie**
4. **`A2-D4` — Économie, niveau de vie, logement et mobilités**
5. **`A2-D5` — Éducation, savoirs, recherche et culture**
6. **`A2-D6` — Climat, énergie, ressources naturelles et agriculture**
7. **`A2-D7` — Justice, sûreté des personnes et libertés publiques**
8. **`A2-D8` — Démocratie, institutions, Europe et place dans le monde**

### 3.2 Logique de regroupement

L'Architecture 2 prend le parti inverse de l'Architecture 1 : elle **sanctuarise la granularité fine des sphères sociales et quotidiennes** recommandée par certains points de l'Axe A :
- Elle **maintient la séparation stricte** entre la **Santé (`A2-D1`)** et les **Solidarités (`A2-D2`)**.
- Elle **isole un domaine anthropologique du Travail, des activités non rémunérées et des temps de vie (`A2-D3`)**, strictement découplé du pouvoir d'achat, du salaire ou de la croissance économique.
- Elle **rassemble dans `A2-D4` les conditions matérielles d'existence** (pouvoir d'achat, rémunérations, économie/finances publiques, accès au logement et mobilités).
- Pour préserver ces 4 cartes socio-économiques distinctes, elle **comprime la sphère civique, juridique et internationale** en deux cartes : la régulation juridique et sécuritaire interne (`A2-D7`) et l'architecture des pouvoirs du local au mondial (`A2-D8` : institutions, démocratie, UE, défense, diplomatie, frontières).

### 3.3 Avantages

- **Respect maximal de la séparation entre soins (`A2-D1`) et vulnérabilités sociales (`A2-D2`)**.
- **Visibilité inédite des activités non rémunérées et du partage des temps de vie (`A2-D3`)**, évitant de tout ramener à l'emploi salarié ou à la croissance du PIB.
- **Maintien explicite dans le MaxDiff** des enjeux démocratiques/institutionnels et des enjeux européens/internationaux (au sein de `A2-D8`).

### 3.4 Inconvénients

- **Reconduction du piège `C07` dans `A2-D7` :** « Justice, sûreté et libertés publiques » continue de réunir deux demandes antagonistes (plus de sécurité/fermeté vs protection des libertés face aux pouvoirs de police/surveillance).
- **Méga-domaine hétéroclite en `A2-D8` :** réunir réforme institutionnelle interne (proportionnelle, RIC, décentralisation), construction européenne, défense militaire, traités commerciaux et politique migratoire/frontières produit une carte hybride illisible ; le choix de `A2-D8` ne permet pas de distinguer une préoccupation démocratique nationale d'une inquiétude géopolitique ou migratoire.
- **Carte matérielle hybride en `A2-D4` :** lier macro-économie/dette publique et crise du logement/transports locaux mélange deux registres de décision très éloignés (politique budgétaire et fiscale nationale vs urbanisme et loyers locaux).
- **Asymétrie d'abstraction :** `A2-D3` (temps de vie et bénévolat) paraît très micro-individuel face à `A2-D8` (ordre constitutionnel, guerre et traités européens).

### 3.5 Chevauchements principaux

- `A2-D2` (Solidarités/cohésiοn) ↔ `A2-D4` (Économie/niveau de vie/logement) : minima sociaux, pouvoir d'achat des ménages modestes, accès au logement social.
- `A2-D3` (Travail/activités) ↔ `A2-D4` (Économie/niveau de vie) : rémunération du travail (`E02`), coût du travail et compétitivité (`E05`), temps partiel choisi ou subi.
- `A2-D7` (Justice/libertés) ↔ `A2-D8` (Institutions/Europe) : État de droit, Conseil constitutionnel, droit européen, frontières/asile (`E62` entre sûreté intérieure et politique internationale).

### 3.6 Angles morts ou thèmes sous-visibilisés

- **L'entreprise, l'industrie et les finances publiques (`E04`, `E05`)** risquent d'être éclipsées par les préoccupations domestiques de « pouvoir d'achat et loyers » dans `A2-D4`.
- **La politique étrangère, la défense (`E59`) et le commerce international (`E61`)** risquent d'être écrasées ou brouillées par les débats institutionnels internes dans `A2-D8` (et inversement).

### 3.7 Oppositions internes identifiées

- **`A2-D3` :** Dérégulation et flexibilité des formes d'activité (auto-entrepreneuriat, liberté horaire) vs réduction collective du temps de travail et statut protecteur du salariat ; valorisation familiale du soin domestique vs externalisation et égalité professionnelle.
- **`A2-D4` :** Encadrement des loyers, construction sociale et fiscalité redistributive vs déréglementation foncière, baisse des impôts et soutien à l'investissement privé.
- **`A2-D7` :** Hausse des pouvoirs policiers et pénaux vs défense des libertés publiques et limitation de la surveillance.
- **`A2-D8` :** Centralisation républicaine et souveraineté nationale vs décentralisation et intégration fédérale européenne ; ouverture migratoire vs fermeture des frontières.

---

## 4. Architecture Candidate 3 — « Domaines substantiels de politiques collectives (hors méta-règles institutionnelles dans le MaxDiff) »

### 4.1 Vue d'ensemble des 8 domaines

1. **`A3-D1` — Santé, soins et santé publique**
2. **`A3-D2` — Solidarités, protection sociale et âges de la vie**
3. **`A3-D3` — Économie, travail, activités et finances publiques**
4. **`A3-D4` — Logement, aménagement des territoires et mobilités**
5. **`A3-D5` — Éducation, savoirs, recherche et culture**
6. **`A3-D6` — Climat, énergie, ressources naturelles et agriculture**
7. **`A3-D7` — Justice, sécurité des personnes et libertés publiques** *(ou version scindée : voir § 4.4)*
8. **`A3-D8` — Place de la France en Europe et dans le monde**

*(Dans cette architecture, **`Institutions et fonctionnement démocratique` (`E53`–`E56`)** est volontairement **retiré du MaxDiff de Niveau 1** et traité comme un module civique transversal distinct : « À quelles échelles et selon quelles règles démocratiques décider ? ».)*

### 4.2 Logique de regroupement

L'Architecture 3 répond directement au diagnostic de la revue indépendante V0.3 sur `C08` : comparer un **méta-domaine sur la procédure démocratique** (*comment on gouverne*) avec des **domaines substantiels** (*de quoi on s'occupe*) fausse la comparabilité du Niveau 1.
En extrayant les **institutions et modes de décision** vers un axe transversal distinct hors MaxDiff, elle libère un slot pour :
- maintenir **séparés** `Santé` (`A3-D1`), `Solidarités` (`A3-D2`), `Logement/Territoires` (`A3-D4`), `Éducation/Savoirs` (`A3-D5`) et `Climat/Ressources` (`A3-D6`) ;
- tout en créant un domaine dédié pour **`Place de la France en Europe et dans le monde` (`A3-D8`)** et un pôle **`Économie, travail et finances publiques` (`A3-D3`)**.

### 4.3 Avantages

- **Homogénéité forte du construit :** les 8 cartes MaxDiff désignent toutes des *champs substantiels d'action collective*, sans mélanger méta-procédures constitutionnelles et enjeux concrets.
- **Préserve la séparation `Santé` (`A3-D1`) vs `Solidarités` (`A3-D2`)** tout en donnant une place claire à l'**économie/finances (`A3-D3`)**, au **logement/mobilités (`A3-D4`)** et à **l'Europe/monde (`A3-D8`)**.
- **Lisibilité immédiate des titres courts** pour des utilisateurs non spécialistes.

### 4.4 Inconvénients

- **Angle mort majeur au Niveau 1 sur la démocratie et les institutions :** dans une élection présidentielle française où la réforme des institutions (VIe République, usage du 49.3, proportionnelle, RIC, décentralisation, moralisation de la vie publique) constitue un enjeu central pour une large part de l'électorat, l'absence d'une carte institutionnelle dans le MaxDiff empêche ces citoyens d'exprimer leur priorité relative face aux politiques sectorielles. Ils risquent de ressentir un « oubli démocratique » et de multiplier les ajouts libres (`MissingSituationReport`).
- **Ne résout pas la contradiction interne de `C07` :** même en sortant les institutions du MaxDiff, il ne reste qu'un seul emplacement (`A3-D7`) pour **Sécurité**, **Justice** et **Libertés publiques** (sauf à ré-exlure aussi les libertés publiques du MaxDiff, ce qui aggraverait l'angle mort civique, ou à fusionner `A3-D1` et `A3-D2` comme dans l'Architecture 1).
- **Risque d'effacement des activités non rémunérées** dans `A3-D3` si le volet économique/financier domine la lecture de la carte.

### 4.5 Chevauchements principaux

- `A3-D1` (Santé) ↔ `A3-D2` (Solidarités) : financement de la branche maladie vs autonomie/invalidité/retraites.
- `A3-D2` (Solidarités) ↔ `A3-D3` (Économie/Travail/Finances) : coût du travail/cotisations sociales, chômage, lutte contre la pauvreté.
- `A3-D4` (Logement/Territoires/Mobilités) ↔ `A3-D6` (Climat/Ressources) : transition énergétique des logements et des transports, artificialisation des sols.
- `A3-D7` (Justice/Sécurité/Libertés) ↔ Module transversal hors-MaxDiff (Institutions/Démocratie) : indépendance judiciaire, Conseil constitutionnel, libertés numériques vs contrôle parlementaire ou démocratique.

### 4.6 Angles morts ou thèmes sous-visibilisés

- **Angle mort structurel assumé au Niveau 1 :** réforme constitutionnelle (`E53`), modes de scrutin (`E54`), participation citoyenne/RIC (`E55`), décentralisation et statut des outre-mer (`E56`), relégués hors MaxDiff.
- **Sous-visibilisation possible** de la culture (`E37`), de la laïcité/discriminations (`E38`) et du travail non rémunéré (`E10`).

### 4.7 Oppositions internes identifiées

- **`A3-D2` :** Protection sociale universelle vs ciblage conditionnel et maîtrise des déficits sociaux.
- **`A3-D3` :** Relance de la croissance/compétitivité et baisse de la dépense publique vs redistribution, hausse des salaires et régulation économique.
- **`A3-D6` :** Sécurité/compétitivité énergétique (nucléaire, soutien productif) vs sobriété, sortie des fossiles/nucléaire et primauté du vivant.
- **`A3-D7` (critique) :** Augmentation des moyens et prérogatives de sécurité/surveillance vs limitation des pouvoirs policiers et renforcement des garanties de liberté.
- **`A3-D8` :** Souveraineté nationale/protectionnisme/contrôle migratoire vs intégration européenne/multilatéralisme/accueil.

---

## 5. Synthèse des trois paris conceptuels

| Dimension comparée | Architecture 1 | Architecture 2 | Architecture 3 |
|---|---|---|---|
| **Principe directeur** | Éliminer les cartes à contradictions régaliennes insolubles et couvrir tout le champ présidentiel au même niveau | Préserver la granularité fine des sphères de vie (Santé, Solidarités, Temps de vie) | Ne comparer en MaxDiff que des champs d'action substantiels (hors méta-règles institutionnelles) |
| **Santé vs Solidarités** | **Regroupées (`A1-D1`)** | **Séparées (`A2-D1` / `A2-D2`)** | **Séparées (`A3-D1` / `A3-D2`)** |
| **Travail vs Économie/Revenus** | **Regroupés (`A1-D2`)** ; distingués au Niveau 2 | **Séparés (`A2-D3` Travail/Temps vs `A2-D4` Niveau de vie/Logement)** | **Regroupés (`A3-D3`)** ; distingués au Niveau 2 |
| **Sécurité vs Justice & Libertés** | **Scindés (`A1-D6` Sécurité vs `A1-D7` Justice/Libertés/Démocratie)** | **Maintenus ensemble (`A2-D7`)** | **Maintenus ensemble (`A3-D7`)** |
| **Institutions & Démocratie** | **Intégrées avec Justice & Libertés (`A1-D7`)** | **Fusionnées avec Europe & Monde (`A2-D8`)** | **Hors MaxDiff (module transversal Niveau 2)** |
| **Europe & International** | **Domaine autonome (`A1-D8`)** | **Partagé avec Institutions (`A2-D8`)** | **Domaine autonome (`A3-D8`)** |
