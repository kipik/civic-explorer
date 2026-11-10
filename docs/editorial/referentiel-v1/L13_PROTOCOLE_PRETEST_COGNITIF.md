# L13 — Protocole renforcé de prétest cognitif qualitatif (`Variante A` vs `Variante B`)

**Statut :** Protocole consolidé (Axe 4) — **recrutement bloqué dans l'attente des validations humaines, de la répétition à blanc et du dossier RGPD/consentement** (voir [`L20_VERROUILLAGE_PROTOCOLE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L20_VERROUILLAGE_PROTOCOLE_PRETEST.md)).  
**Référentiel testé :** Formulations consolidées [`L11_FORMULATIONS_CONSOLIDEES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L11_FORMULATIONS_CONSOLIDEES.md) (`DOM-01` à `DOM-08` — sous réserve d'arbitrage humain sur les écarts § 1 / § 2 pour `DOM-02` et `DOM-05`), avec présentation systématique post-exercice des variantes `1B`, `2B`, `7B` et `8B` après le retour spontané.  
**Nature méthodologique :** Prétest cognitif qualitatif formatif (*think-aloud* + *verbal probing*, méthode Willis 2005). **Il ne s'agit pas d'une expérience quantitative et la taille d'échantillon ne permet en aucun cas de démontrer statistiquement l'absence de biais.**

---

## 0. Articulation avec le pilote méthodologique `P1.1 V0.3`

Ce prétest cognitif éditorial (`L13`) et le protocole de prétest du pilote méthodologique décrit dans [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) (§ 5.3) constituent **deux expérimentations distinctes** :

1. **Prétest cognitif éditorial (`L13`, présent document) :** `12 à 16` participants, comparant deux modalités de présentation des **huit domaines `L11`** (**Variante A** panorama préalable vs **Variante B** découverte progressive avec accès au périmètre complet), afin d'observer la compréhension, l'interprétation des domaines, les effets de largeur et les éventuelles sélections mono-composantes.
2. **Pilote méthodologique `P1.1 V0.3` (distinct, inchangé) :** protocole ultérieur défini dans [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) (§ 5.3, `8 à 12` participants), portant notamment sur l'ordre du parcours applicatif (*MaxDiff avant vs après expression libre*) et les libellés d'interface P1.1.

**Règle d'articulation :** le prétest éditorial `L13` **précède** le pilote méthodologique `P1.1 V0.3`, mais **ne le remplace pas** et ne modifie en rien [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md). Les libellés utilisés sur les supports de ce prétest (*« Devrait recevoir le plus d'attention »* / *« Pourrait attendre »*) constituent un choix propre au prétest `L13`/`L15`.

---

## 1. Organisation et dispositif expérimental (A)

### 1.1 Dispositif inter-sujets aléatoire : Variante A vs Variante B
Chaque participant teste **une seule variante** (*between-subjects*), par tirage au sort équilibré lors du recrutement (avec stratification minimale pour garder des profils comparables dans les deux bras) :

- **Variante A — Panorama préalable :**
  Avant la première série MaxDiff, le participant découvre un écran présentant l'ensemble des **8 domaines** (intitulés et descriptions courtes `L11`, ordre aléatoire par participant, avec volet dépliable facultatif pour la note de périmètre). Il passe ensuite aux 8 séries MaxDiff (`k = 4` cartes par série).
- **Variante B — Découverte progressive :**
  Le participant lit d'abord l'explication de fonctionnement de l'exercice et la consigne (incluant le sens relatif de « pourrait attendre »), puis découvre les cartes 4 par 4 au fil des 8 séries MaxDiff. Un bouton ou livret discret reste accessible en permanence dès l'écran de consigne et sur chaque série (`S1`–`S8`) : *« Voir le périmètre complet des 8 domaines »*. Il fournit exactement la même information sur les domaines inclus/exclus qu'en Variante A, peut être consulté volontairement à tout moment sans modifier la série en cours ni substituer une carte, et chaque ouverture est consignée en `L17`.

**Justification du dispositif inter-sujets :**
Faire tester les deux variantes par la même personne ruinerait la validité écologique du test : dès la seconde passation, l'utilisateur connaît déjà les 8 domaines (effet d'apprentissage contaminant la Variante B), compare artificiellement deux interfaces au lieu de réfléchir aux enjeux collectifs, et subit une fatigue cognitive excessive doublant la durée d'exercice.

### 1.2 Échantillon et limites assumées
- **Cible indicative :** **12 à 16 participants majeurs** (**6 à 8 en Variante A**, **6 à 8 en Variante B**).
- **Critères de diversification du recrutement :**
  - *Âge :* 18–29 ans, 30–59 ans, 60 ans et plus ;
  - *Territoires :* grande aire urbaine, ville moyenne / périurbain, commune rurale (et si possible prise en compte de profils ultramarins) ;
  - *Niveau de diplôme et aisance numérique :* inclure impérativement des participants sans diplôme de l'enseignement supérieur et des utilisateurs peu familiers du vocabulaire institutionnel ;
  - *Rapport au politique :* de peu intéressé / abstentionniste occasionnel à très politisé, avec sensibilités variées (sans jamais recueillir ni enregistrer d'affiliation partisane).
- **Limites explicites :** cet effectif vise uniquement à **détecter des problèmes qualitatifs concrets de compréhension, de vocabulaire, de largeur ou de frontière** susceptibles d'apparaître chez des répondants ordinaires. Il ne permet ni d'estimer un effet statistique entre A et B, ni de prouver quantitativement la neutralité du référentiel.

### 1.3 Conditions matérielles, plan MaxDiff et confidentialité
- **Support de passation :** maquette statique locale (HTML hors ligne, prototype Figma local ou cartes imprimées standardisées) — **aucune écriture en base applicative, aucune donnée envoyée sur un réseau, aucune modification de `src/`**.
- **Plan de blocs et comparaison A/B :** utiliser les 8 blocs issus de la séquence canonique `N = 8, k = 4, r = 4` et la règle diédrale `randomize_pilot_n8_dihedral` ($\pi \in S_8 \times \tau \in S_4 \times D_8$, [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md)) pour éviter que la Série 1 de la Variante B expose toujours le même quatuor. Les options d'équilibrage A/B, d'appariement éventuel des blocs entre A et B, d'ordre du volet d'aide B et de traçabilité des graines restent soumises aux arbitrages documentés dans [`L20_VERROUILLAGE_PROTOCOLE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L20_VERROUILLAGE_PROTOCOLE_PRETEST.md) (§ 3).
- **Consentement :** recueil d'un consentement éclairé spécifique à l'entretien cognitif ([`L18_CONSENTEMENT_ET_ANONYMISATION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L18_CONSENTEMENT_ET_ANONYMISATION.md)), une fois complétés et validés l'ensemble des champs juridiques et organisationnels bloquants (`L20` § 6).

---

## 2. Déroulé de l'entretien et questions obligatoires (B)

> **Durée provisoire totale retenue : `45 à 60 minutes` par entretien** *(à confirmer lors de la répétition intégrale à blanc prévue en [`L20_VERROUILLAGE_PROTOCOLE_PRETEST.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L20_VERROUILLAGE_PROTOCOLE_PRETEST.md) § 7)*.

### 2.1 Phase 1 — Accueil, consentement et entraînement au *think-aloud* (5–7 min)
> « Nous ne testons ni vos connaissances ni vos opinions. Il n'y a pas de bonne ou de mauvaise réponse : nous vérifions si les mots et les cartes que nous avons écrits sont clairs et équitables. Pendant l'exercice, dites à voix haute tout ce qui vous traverse l'esprit en lisant les cartes et en faisant vos choix, même si c'est une hésitation ou une critique. »

### 2.2 Phase 2 — Passation MaxDiff observée sans interruption directive (12–18 min)
- **Consigne lue à l'écran :** *« Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient recevoir le plus d'attention, et lesquels pourraient attendre ? ("Pourrait attendre" signifie uniquement que d'autres enjeux passent avant dans cette série, pas que ce sujet est sans importance ni que vous êtes contre.) »*
- Pendant les 8 séries, l'observateur note en silence les hésitations, les retours en arrière, les clics ou consultations sur les notes de périmètre ou sur « Voir le périmètre complet des 8 domaines », l'usage éventuel des options `skipped`, `dont_know`, `no_distinguishable_best_worst` et des signalements.
- **Relances neutres uniquement en cas de silence prolongé :** *« À quoi pensez-vous en regardant ces quatre cartes ? »*, *« Qu'est-ce qui vous fait hésiter ? »* *(ou en cas de demande de sens : « Qu'est-ce que vous comprenez par cette formulation ? »)*.
- *(Note de méthode : pour ne pas amorcer ni fausser les séries suivantes en cours de route, les questions ciblées sur une sélection précise sont posées immédiatement après la Série 8, cartes en main, tant que la mémoire immédiate est intacte — sauf si le participant s'arrête spontanément sur une incompréhension. Aucune variante lexicale `1B`, `2B`, `7B`, `8B` ne doit être montrée pendant cette phase.)*

### 2.3 Phase 3 — Débriefing spontané puis présentation systématique des variantes (25–32 min + 3 min clôture)

#### A. Question obligatoire sur les sélections MaxDiff (détection mono-composante)
L'observateur reprend **3 à 4 cartes** effectivement choisies par le participant comme « devant recevoir le plus d'attention » ou « pourrait attendre » (en ciblant prioritairement **`DOM-01`**, **`DOM-02`**, **`DOM-07`** et **`DOM-08`** lorsqu'elles ont été sélectionnées) et pose **mot pour mot** :

> **« Lorsque vous avez choisi cette carte, à quel sujet pensiez-vous principalement ? »**

Relances associées immédiatement si besoin :
- *« Y avait-il d'autres éléments dans cette carte qui comptaient aussi pour votre choix, ou seulement celui-là ? »*
- *« Est-ce qu'il y avait dans cette même carte un élément que vous trouvez beaucoup moins prioritaire, voire auquel vous n'adhérez pas ? »*

#### B. Questions systématiques couvrant les 9 cibles d'observation
1. **Compréhension spontanée derrière chaque domaine :** *« Avec vos propres mots, de quoi parle cette carte ? Qu'est-ce que cela recouvre pour vous dans la vie du pays ? »*
2. **Éléments considérés comme inclus ou exclus :** *« D'après le titre et la courte description, pensez-vous que [ex. retraites / impôts / laïcité / immigration / agriculture / recherche] soit inclus ici ou dans une autre carte ? »*
3. **Hésitations entre deux domaines :** *« Avez-vous cherché un sujet sans savoir dans quelle carte le ranger, ou hésité entre deux cartes qui vous semblaient proches ? »* (Tester notamment `DOM-01`/`DOM-02`, `DOM-04`/`DOM-07` sur la laïcité, `DOM-06`/`DOM-07` sur justice vs police, `DOM-03`/`DOM-05`).
4. **Mots incompris ou techniques :** *« Y a-t-il des mots qui vous ont paru flous, compliqués, administratifs ou jargonnants ? »*
5. **Domaines jugés trop larges ou trop vagues :** *« Avez-vous eu l'impression que certaines cartes réunissaient trop de choses différentes dans un même bloc, ce qui rendait la comparaison injuste ou difficile ? »*
6. **Sujets importants absents :** *« Y a-t-il un sujet politique important pour une présidentielle que vous n'avez retrouvé dans aucune des huit cartes ? »*
7. **Domaines semblant redondants :** *« Certaines cartes vous ont-elles semblé dire presque la même chose ou faire doublon ? »*
8. **Raisons de l'importance attribuée :** *« Quand vous avez mis une carte en premier, était-ce surtout parce que cela vous touche personnellement aujourd'hui, parce que c'est grave pour la société, ou parce que vous vouliez changer une règle précise ? »* (Vérification de distinction entre priorité relative, préoccupation personnelle et adhésion à une politique).

#### C. Questions spécifiques au mode de présentation (A vs B) et test court de Niveau 2 (18–22 min cumulées avec A et B)
- **Variante A :** *« Voir les 8 domaines avant de commencer vous a-t-il aidé à situer chaque sujet, ou cela vous a-t-il paru long / orientant ? Avez-vous lu les descriptions ou seulement les titres ? »*
- **Variante B :** *« En découvrant les cartes 4 par 4, vous êtes-vous senti surpris dans les deux premières séries ? Avez-vous eu envie d'ouvrir le bouton "Voir le périmètre complet des 8 domaines" ? À partir de quelle série avez-vous eu une vue d'ensemble claire ? »*
- **Bascule courte vers Niveau 2 (Strate 2.1) :** montrer la liste de sous-enjeux `L07` d'un domaine large sélectionné par le participant (`DOM-01`, `DOM-02`, `DOM-07` ou `DOM-08`) et vérifier : *« Ce second écran permet-il de préciser ce que vous aviez en tête pendant l'exercice ? »*

#### D. Présentation systématique des variantes lexicales `1B`, `2B`, `7B`, `8B` et clôture (7–10 min + 3 min clôture)
- **Règle d'enchaînement stricte :** recueillir **d'abord** l'ensemble du retour spontané du participant (volets A, B et C ci-dessus) sans montrer aucune variante ; présenter **ensuite systématiquement** les quatre paires (`DOM-01`/`1B`, `DOM-02`/`2B`, `DOM-07`/`7B`, `DOM-08`/`8B`) sur fiches neutres séparées (*« Formulation 1 »* / *« Formulation 2 »*). **Ces variantes ne doivent jamais être montrées pendant les tâches MaxDiff.**
- **Questions posées pour chacune des quatre variantes :** demander systématiquement si elle **modifie sa compréhension ou son interprétation** du domaine, et recueillir les raisons sur la clarté, les différences de sens perçues, la couverture du domaine et l'éventuelle orientation perçue (voir questions détaillées dans [`L16_GUIDE_ENQUETEUR.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L16_GUIDE_ENQUETEUR.md) § E).
- **Clôture :** question ouverte finale mot pour mot sur d'éventuels sujets absents (`L16` § F).

---

## 3. Grille structurée d'analyse des observations (C)

### 3.1 Grille alignée par observation (`[OBS]` / `[INTERP]` — format détaillé et CSV dans [`L17_GRILLE_OBSERVATION_ENTRETIENS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L17_GRILLE_OBSERVATION_ENTRETIENS.md))

Conformément à [`L17_GRILLE_OBSERVATION_ENTRETIENS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L17_GRILLE_OBSERVATION_ENTRETIENS.md), la grille distingue strictement les **observations factuelles brutes (`[OBS]`)** du **codage analytique (`[INTERP]`)** sans supprimer les verbatims ni les traces de séquence :

| Zone | Champ | Règle de remplissage factuelle ou analytique |
|---|---|---|
| **`[OBS]`** | **1. Identifiant participant** | Code anonymisé/pseudonymisé (`P01` à `P16`) conforme à `L18`. |
| **`[OBS]`** | **2. Variante** | `A` (Panorama préalable) ou `B` (Découverte progressive). |
| **`[OBS]`** | **3. Domaine concerné** | `DOM-01` à `DOM-08`, ou `TRANS` pour une remarque transversale. |
| **`[OBS]`** | **4. Série / Phase** | `Panorama`, `S1` à `S8`, `Debriefing_D`, `Lexical_E` ou `Cloture_F`. |
| **`[OBS]`** | **5. Comportements & état en série** | Hésitations (`> 25 s`), retours en arrière, ouvertures du périmètre complet, lectures partielles, état (`answered` / `skipped` / `dont_know` / `no_distinguishable_best_worst`) et signalements. |
| **`[OBS]`** | **6. Compréhension spontanée (reformulation)** | Phrase exacte utilisée par le participant pour définir le domaine avec ses mots. |
| **`[OBS]`** | **7. Sujet principalement évoqué** | Réponse exacte à la question obligatoire : *« Lorsque vous avez choisi cette carte, à quel sujet pensiez-vous principalement ? »* |
| **`[OBS]`** | **8. Périmètre perçu** | Éléments explicitement cités comme **inclus** ou crus **exclus** par le participant. |
| **`[OBS]`** | **9. Difficulté lexicale** | Mots ou expressions relevés comme vagues, techniques, administratifs ou orientés (ou `Aucune`). |
| **`[OBS]`** | **10. Verbatim fidèle** | Citation exacte ou observation factuelle sans paraphrase interprétative. |
| **`[INTERP]`** | **11. Qualification de compréhension** | `Fidele` · `Partielle` · `Erronee` · `NA` *(au regard du périmètre `L11`)*. |
| **`[INTERP]`** | **12. Confusion éventuelle** | `Aucune` ou code du domaine confondu + motif (ex. *« a cherché la laïcité dans DOM-04 »* ou *« a cru que les tribunaux étaient dans DOM-06 »*). |
| **`[INTERP]`** | **13. Largeur perçue** | `Trop large` · `Adaptee` · `Trop etroite` · `Non evoquee` *(sur la base des propos et comparaisons relevés)*. |
| **`[INTERP]`** | **14. Sélection mono-composante** | `Oui` · `Non` · `Incertain` · `NA` *(préciser entre parenthèses si un seul sous-enjeu dicte le choix)*. |
| **`[INTERP]`** | **15. Gravité du problème observé** | **`Aucune`** · **`Mineure`** · **`Importante`** · **`Bloquante`** *(selon la grille de gravité § 3.2 ci-dessous)*. |
| **`[INTERP]`** | **16. Hypothèse / note analytique** | Interprétation prudente distincte du verbatim brut. |
| **`[INTERP]`** | **17. Proposition de correction** | Action ciblée envisagée (ex. *aucune*, *remplacer terme X*, *activer variante 7B*, *préciser exclusion en note*, *revoir frontière*). |

*(Des grilles complémentaires pour la synthèse par participant, le tableau des 4 comparaisons lexicales `1B/2B/7B/8B` — incluant si elles modifient la compréhension ou l'interprétation — et la synthèse transversale par domaine figurent dans [`L17_GRILLE_OBSERVATION_ENTRETIENS.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L17_GRILLE_OBSERVATION_ENTRETIENS.md).)*

### 3.2 Définition opérationnelle des trois niveaux de gravité

| Niveau de gravité | Définition qualitative | Exemple concret |
|---|---|---|
| **Mineure** | Hésitation passagère ou terme perçu comme un peu formel, sans fausser l'identification du domaine ni bloquer la comparaison MaxDiff. | Juger « tranquillité publique » un peu soutenu tout en comprenant parfaitement `DOM-06`. |
| **Importante** | Mauvais rattachement d'un sous-enjeu majeur entre deux domaines, capture mono-composante manifeste éclipsant le reste de la carte, ou connotation normative perçue sur un intitulé. | Réduire `DOM-01` uniquement aux soins médicaux sans voir les retraites/solidarités ; réduire `DOM-08` exclusivement à l'immigration ; percevoir « solidarités » comme partisan. |
| **Bloquante** | Incompréhension empêchant de répondre (`skipped` / `not_comparable` répété), erreur systématique d'attribution rendant la comparaison absurde, ou sentiment exprimé que deux domaines sont impossibles à arbitrer ensemble en raison d'une largeur ou hétérogénéité extrême. | Refuser de comparer `DOM-01` ou `DOM-02` à `DOM-06` en jugeant l'exercice biaisé ou incohérent ; ne trouver aucun ancrage pour un enjeu central de la présidentielle. |

### 3.3 Fiche complémentaire de session (comparaison globale A vs B)
Consigner pour chaque participant : durée de lecture du panorama (`A`), nombre d'ouvertures des notes de périmètre ou du bouton d'aide (`B`), séries ayant posé le plus de difficulté, compréhension exacte de « pourrait attendre » (correcte vs erronée), sujets jugés manquants, perception de redondance entre deux domaines, et pertinence perçue du passage à la Strate 2.1 du Niveau 2.

---

## 4. Critères de décision qualitatifs après le prétest (D)

Conformément à la nature qualitative de l'étude (`n = 12 à 16`), **aucun seuil statistique artificiel (pourcentage ou p-value) n'est appliqué**. Les décisions reposent sur l'analyse thématique croisée de la gravité et de la récurrence des observations :

1. **Quand conserver une formulation telle quelle :**
   - Compréhension spontanée fidèle chez l'ensemble des participants des deux variantes, aucun problème *important* ni *bloquant*, et aucune connotation partisane relevée de manière récurrente.
2. **Quand simplifier une formulation (ajustement lexical sans changer le périmètre) :**
   - Présence de problèmes *mineurs* ou *importants* liés à un terme technique, ambigu ou trop long (ex. remplacement d'un mot jugé abstrait), **ou** préférence nette et argumentée de plusieurs participants pour l'une des variantes sondées (`1B`, `2B`, `7B`, `8B`) qui lève l'ambiguïté sans créer de nouvel effet d'aimant.
3. **Quand modifier ou expliciter le périmètre d'un domaine (sans déplacer de frontière) :**
   - Lorsque le périmètre perçu omet systématiquement une composante importante pourtant incluse (ex. non-reconnaissance de la recherche/culture dans `DOM-04`, ou des activités non rémunérées dans `DOM-02`), ou lorsqu'une sélection mono-composante s'accompagne d'un malaise (« je voulais juste parler de X, pas du reste ») → renforcer la visibilité dans la description courte et clarifier la consigne sur les domaines composites.
4. **Quand revoir une frontière entre deux domaines :**
   - Lorsque plusieurs participants attribuent spontanément et de manière récurrente un même sous-enjeu à un autre domaine que celui prévu dans `L05` (ex. chercher systématiquement la laïcité dans `DOM-04` plutôt que `DOM-07`, ou l'indemnisation du chômage dans `DOM-02` plutôt que `DOM-01`), **et** que cette hésitation engendre une difficulté *importante* ou une impression de redondance ou d'oubli.
5. **Quand arbitrer entre Variante A et Variante B :**
   - **Retenir Variante A (Panorama préalable)** si la découverte progressive (B) provoque des erreurs d'attribution *importantes* dans les séries 1–3 faute de connaître les autres domaines, et que le panorama A reste fluide sans fatigue manifeste.
   - **Retenir Variante B (Découverte progressive)** si le panorama A provoque décrochage de lecture ou sur-ancrage sur les exemples cités, alors que les participants B s'approprient rapidement les 8 cartes (éventuellement avec un rappel visuel léger des 8 titres).
6. **Quand conduire une nouvelle itération (ou rouvrir un choix structurel) :**
   - Si au moins **un problème bloquant** ou **plusieurs problèmes importants convergents** persistent sur un même domaine (par exemple rejet explicite de la comparabilité de `DOM-01`/`DOM-02` face à `DOM-06`, ou révision majeure de plus de deux formulations après le test), **ne pas passer en spécification définitive P1.1 V0.4** : réaliser une **deuxième vague ciblée de 4 à 6 entretiens** sur les cartes modifiées, ou instruire formellement devant le porteur de projet l'option de révision structurelle (recomposition d'un couple ou passage à `N = 9/10` hors contrainte initiale).
