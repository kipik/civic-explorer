# Civic Explorer — Spécification fonctionnelle et méthodologique P1.1 (V0.2.1)

**Version :** 0.2.1 — 10 novembre 2026 *(patch de cohérence sur V0.2 : orthogonalité des états/signalements, randomisation $D_8$ reproductible, clarification des conditions de démarrage)*  
**Statut :** spécification consolidée intégrant l'audit méthodologique, la revue indépendante, les arbitrages validés par le concepteur et le patch V0.2.1. **Aucune implémentation applicative ni modification de `src/` n'est autorisée avant validation humaine de cette version V0.2.1 et respect des paliers d'autorisation définis en § 8.3.**  
**Lot backlog associé :** `P1.1` (voir [`07_BACKLOG.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/07_BACKLOG.md))  

**Documents sources consolidés :**
- [`P1_1_DECISIONS_AND_AUDIT_BRIEF_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_DECISIONS_AND_AUDIT_BRIEF_v0.2.md) (orientations D1–D4)
- [`P1_1_METHODOLOGY_AUDIT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_METHODOLOGY_AUDIT.md) (audit V1.0 + addendum V1.1)
- [`CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md) (vérification indépendante et recommandations critiques)
- [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md) (décision expérimentale `N = 8` et référence exacte `N = 7`)

---

## 1. Périmètre, finalité et séparation stricte des construits

### 1.1 Ce que mesure P1.1
Le moteur MaxDiff (Best-Worst Scaling Case 1) du lot `P1.1` observe **la priorité relative accordée aux situations concrètes que l'utilisateur estime devoir voir évoluer dans la société**, sous contrainte de séquencement (« laquelle devrait passer avant les autres / laquelle pourrait attendre »).

### 1.2 Séparation étanche des construits (D1, D3)
Le moteur, le modèle de données et l'interface séparent de manière stricte :

| Construit | Mode de recueil en P1.1 | Interdit de fusion / confusion |
|---|---|---|
| **1. Priorité relative de changement collectif** (`D1`) | Exercice MaxDiff Case 1 sur 8 situations éditoriales | Ne pas déduire une gravité absolue, une souffrance personnelle ou un soutien à un parti. |
| **2. Préoccupations personnelles et situations manquantes** (`D2`) | Recueil qualitatif séparé post-MaxDiff (+ socle P0.2) | Ne pas injecter dans les blocs MaxDiff standardisés ; ne pas inférer à partir des choix MaxDiff. |
| **3. Raisons et valeurs motivant les choix** | Exploration facultative post-MaxDiff sur **0 à 2 situations** | Aucune pondération numérique (pas de 70/30 ni score composite) ; aucune classification automatique sans confirmation. |
| **4. Convictions causales / factuelles** | Champ déclaratif distinct au sein de l'exploration des raisons | Ne pas corriger comme un « fait » le jugement normatif ; ne pas valider comme « fait établi » une croyance causale non sourcée. |
| **5. Gravité perçue, solutions/instruments et faisabilité** | Hors comparaison MaxDiff P1.1 (EPIC 2 / DCE ultérieur) | Interdiction absolue de mélanger situations concrètes et instruments partisans dans un même bloc MaxDiff (`D3`). |

### 1.3 Origine et unité des situations (D2, D3)
- **Bibliothèque éditoriale commune (`D2`) :** les situations soumises à comparaison MaxDiff proviennent exclusivement d'une bibliothèque éditoriale commune versionnée (`situationsCatalogVersion`), avec statut explicite **`pilot-v0.1` / `pilot_draft`** tant qu'une revue pluraliste complète ([`08_GOVERNANCE_CONTENT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/08_GOVERNANCE_CONTENT.md)) n'a pas eu lieu.
- **Unité de comparaison (`D3`) :** chaque situation décrit un **changement collectif concret à améliorer** à un niveau méso homogène (10 à 18 mots, sans mot-valise vague ni solution partisane ni présupposé causal).
- **Préoccupations personnelles et ajouts libres (`D2`) :** les préoccupations ou situations absentes de la bibliothèque commune sont recueillies séparément à l'étape dédiée (§ 5.1, temps 3), confirmées manuellement et restituées dans un panneau propre, sans jamais être insérées dans les séries MaxDiff.

---

## 2. Cadre statistique corrigé et épistémologie de la restitution

*(Révision explicite suite à la revue indépendante § 3.3 / § 6.1 et aux orientations #6 et #7.)*

### 2.1 Révision de l'énoncé d'audit sur les erreurs-types
L'audit V1.0 présentait les erreurs-types asymptotiques calculées à $\beta = 0$ (`SE ≈ 0.93–0.96` logits pour $r = 4$) comme une démonstration formelle d'impossibilité mathématique d'estimation individuelle. **Cette formulation est corrigée :**

> Les erreurs-types théoriques sous le modèle logit conjoint BWS Case 1 au point $\beta = 0$ constituent une mesure locale de l'information attendue pour un plan donné et une paramétrisation donnée. Elles **ne démontrent pas une impossibilité mathématique absolue** de calculer un score ou un estimateur individuel. En revanche, elles indiquent qu'avec $r = 4$ expositions par item, l'information disponible au niveau d'un répondant isolé est limitée et ne justifie pas de restituer des utilités latentes individuelles ou un classement psychométrique fiable. Le choix de ne publier aucun classement individuel ni score latent dans P1.1 est donc un **garde-fou délibéré de validité scientifique et de sobriété produit**, et non un théorème d'impossibilité.

### 2.2 Distinction obligatoire entre quatre niveaux de traitement

| Niveau | Définition | Statut en P1.1 | Justifications et limites |
|---|---|---|---|
| **1. Calcul descriptif des choix** | Comptage factuel et exact par situation : nombre de présentations (`totalPresentedCount`), expositions effectivement répondues (`answeredExposures`), choix « à traiter en premier » (`bestCount`), choix « pourrait attendre » (`worstCount`), non sélectionnée comme extrême dans les séries répondues (`neitherBestNorWorstCount`), plus comptes des séries incomplètes par statut. | **Retenu et affiché** (Panneau A) | Zéro hypothèse paramétrique, zéro approximation asymptotique, 100 % fidèle aux actions réellement posées par la personne, même en cas de réponses partielles. |
| **2. Score `B - W` observé** | Différence arithmétique brute $B_i - W_i \in [-r, +r]$ ou normalisée $(B_i - W_i) / n_{\text{exp}, i}$. | **Interdit d'affichage et de tri en P1.1** | À $r = 4$, forte discrétisation (nombreux ex æquo artificiels), dépendance aux paires effectivement affrontées si des blocs sont passés (`MNAR`), et risque élevé d'être interprété à tort comme un score de priorité absolue ou un classement normatif. |
| **3. Estimation d'utilité latente** | Inférence d'un vecteur $\hat{\beta}$ via modèle probabiliste (MNL conjoint BWS, logit séquentiel ou Hiérarchique Bayes). | **Exclu de P1.1** (différé post-MVP après calibration) | Au niveau individuel sans emprunt de force populationnel (impossible en architecture strictement locale sans serveur), l'estimateur MLE non régularisé souffre de séparation complète dès qu'un item est toujours/jamais choisi, et l'incertitude locale à $r=4$ reste élevée. |
| **4. Fiabilité d'une restitution individuelle** | Qualité globale d'une restitution (stabilité test-retest, compréhension des items, absence d'heuristiques de position, fidélité au construit). | **Cible à évaluer hors restitution de scores** | Une faible erreur-type asymptotique ne suffit jamais à prouver la validité d'un profil individuel : elle ignore la validité sémantique des items, le *satisficing* et la stabilité temporelle. |

### 2.3 Limites des approximations asymptotiques sur un petit nombre de séries ($b = 7$ ou $8$)
Les calculs basés sur la matrice d'information de Fisher $\mathcal{I}(\beta)$ et les intervalles de Wald $\pm 1.96 \times \mathrm{SE}$ reposent sur une **approximation asymptotique** ($b \to \infty$ ou $r \to \infty$) qui n'est pas valide à l'échelle d'une session individuelle de 8 séries (au plus 16 choix élémentaires Best/Worst) :
1. **Distribution finie discrète et asymétrique :** la distribution d'échantillonnage de tout estimateur à $r = 4$ est fortement discrète et non gaussienne.
2. **Séparation complète ou quasi complète :** si une personne choisit systématiquement une situation en premier dès qu'elle apparaît (ou toujours en attente), le maximum de vraisemblance non pénalisé diverge ($\hat{\beta}_i \to \pm\infty$) et l'approximation quadratique de la log-vraisemblance s'effondre.
3. **Dépendance locale au point $\beta = 0$ :** lorsque les préférences réelles s'écartent de l'indifférence ($\beta \neq 0$), les probabilités de choix s'approchent de $0$ ou $1$, ce qui **réduit encore** l'information de Fisher réelle par rapport au repère calculé à $\beta = 0$.
4. **Données manquantes non aléatoires (MNAR) :** passer les séries contenant une carte jugée incompréhensible brise la symétrie du plan observé et peut même déconnecter le graphe observé des comparaisons.

---

## 3. Plan expérimental MaxDiff et documentation mathématique

*(Détails complets et matrices dans [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md).)*

### 3.1 Paramètres du pilote `N = 8` et référence comparative `N = 7`
- **Configuration pilote retenue (`P1.1`) :** `N = 8` situations éditoriales, `b = 8` séries par session, `k = 4` situations par série, `r = 4` présentations par situation.
- **Plan exact de référence conservé :** `N = 7` (BIBD symétrique `(7, 4, 2)` — complément du plan de Fano $PG(2,2)$), utilisé comme étalon de comparaison méthodologique (100 % D-efficace, mais ratio $k/N = 57.1\,\% > 50\,\%$ et chevauchement consécutif constant égal à `2`).
- **Justification de `N = 8` pour le pilote :**
  - Maintient $k / N = 4 / 8 = 50\,\% \le 50\,\%$ (seuil de Orme, 2005) ;
  - Réduit le chevauchement entre deux écrans consécutifs à **exactement `1` item commun sur 4** (`max = 1`, `moy = 1.00`, y compris entre `B8` et `B1`) ;
  - Couvre toutes les $\binom{8}{2} = 28$ paires au moins une fois (`1:8`, `2:20`, zéro paire à `0`, variance `0.2041` égale à la borne inférieure théorique) ;
  - Garantit un équilibre exact des 4 positions (`[1, 1, 1, 1]` par situation) et 0 bloc dupliqué ;
  - Atteint $D_{\mathrm{eff}} = 0.995677$ (`99.57 %`) et $\mu_2(L_\Lambda) = 12.00$.

### 3.2 Synthèse des six spécifications de la D-efficacité (`D-eff`)
1. **Modèle utilisé :** logit conjoint BWS Case 1 (Marley & Louviere, 2005), $P(b, w \mid S_t, \beta) = \exp(\beta_b - \beta_w) / \sum_{i \neq j \in S_t} \exp(\beta_i - \beta_j)$ avec indépendance conditionnelle entre blocs.
2. **Matrice d'information :** $\mathcal{I}(0) = \frac{2}{k(k-1)} L_\Lambda = \frac{1}{6} L_\Lambda$ (pour $k = 4$), où $\Lambda$ est la matrice symétrique des cooccurrences et $L_\Lambda = \operatorname{diag}(\Lambda\mathbf{1}) - \Lambda$ son Laplacien pondéré.
3. **Paramétrisation :** identifiabilité de rang $N - 1$ par contrainte de référence $\beta_N = 0$ (`red = (1/6) * L_Lambda[:N-1, :N-1]`) ou par contrastes orthonormés $\theta = C^\top \beta$ ($C^\top \mathbf{1} = 0, C^\top C = I_{N-1}$). Les facteurs constants ($1/N$, $(1/6)^{N-1}$) s'annulent dans le ratio D-eff.
4. **Point de calcul des coefficients :** point d'indifférence nul $\beta = 0$ (*locally D-optimal at $H_0$*).
5. **Design de référence :** plan continu idéal parfaitement équilibré par paires au même budget $(N, b, k, r)$, de fréquence de paire uniforme $\bar{\lambda} = \frac{r(k-1)}{N-1} = \frac{12}{N-1}$ et valeurs propres positives toutes égales à $N\bar{\lambda} = \frac{12N}{N-1}$.
6. **Formule exacte :**
   $$D_{\mathrm{eff}} = \left[ \frac{\prod_{m=2}^{N} \mu_m(L_\Lambda)}{(N\bar{\lambda})^{N-1}} \right]^{\frac{1}{N-1}}$$
   où $0 = \mu_1(L_\Lambda) \le \mu_2(L_\Lambda) \le \dots \le \mu_N(L_\Lambda)$ sont les valeurs propres de $L_\Lambda$.

### 3.3 Distinction régularité combinatoire / connectivité / efficacité statistique
- **Régularité combinatoire :** équilibre discret des comptages ($r_i = 4$, $|B_t| = 4$, positions `[1,1,1,1]`, étendue de $\lambda_{ij} \le 1$, absence de doublons). Condition structurelle nécessaire, mais insuffisante à elle seule pour distinguer des graphes non isomorphes de même histogramme (ex. $N = 6$ et $N = 9$).
- **Connectivité du graphe :** existence d'un chemin entre toute paire d'items dans le graphe de cooccurrence ($1$ composante connexe $\iff \mu_2(L_\Lambda) > 0$). Prérequis d'identifiabilité ; peut être dégradée en session si trop de séries sont passées de manière ciblée (`MNAR`).
- **Efficacité statistique :** efficacité relative ($D_{\mathrm{eff}}$) et précision locale ($\mathrm{SE}$) sous modèle donné à $\beta = 0$ et à budget constant ($r = 4$). Une efficacité relative de `99.57 %` mesure la quasi-optimalité *à $r = 4$ fixé*, pas une précision individuelle suffisante pour classer.

### 3.4 Randomisation contrôlée exigée pour le pilote `N = 8`
Au démarrage de la session MaxDiff (graine aléatoire locale éphémère en mémoire navigateur, jamais envoyée au serveur) :
1. Tirer une bijection aléatoire $\pi \in S_8$ entre les 8 situations du catalogue et les indices `1..8` du plan canonique `N = 8` ;
2. Tirer une permutation globale $\tau \in S_4$ des 4 positions d'affichage ;
3. Tirer une transformation diédrale $D_8$ sur la séquence des 8 blocs canoniques (décalage circulaire $s \in \{0..7\}$ et sens $\delta \in \{+1, -1\}$).

Contrairement à une permutation libre $\sigma \in S_8$ (qui échoue `1000/1000` fois en test Monte Carlo sur `max_consecutive_overlap <= 1`, seules `16` des `40 320` permutations appartenant à $D_8$), la règle `randomize_pilot_n8_dihedral` ($\pi \times \tau \times D_8$) vérifiée dans [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py) garantit dans **100 % des 1 000 essais à graines distinctes (`1000/1000`)** l'équilibre exact des positions `[1,1,1,1]`, les fréquences `r=4`, les cooccurrences `{1:8, 2:20}`, la connectivité $\mu_2 = 12$, zéro doublon, **et** un chevauchement consécutif strictement égal à `1` (linéaire et bouclage `B8 → B1`).

---

## 4. Paramètres UX : hypothèse initiale `k = 4, r = 4` et comparaison future avec `k = 5`

- **Paramètres initiaux retenus :** `k = 4` situations par série et `r = 4` présentations par situation. Ce choix constitue une **hypothèse de départ pragmatique** pour le pilote `N = 8` (lisibilité sur écran mobile, charge cognitive modérée de 4 énoncés par écran, ratio $k/N = 50\,\%$, appariement exact aux 4 positions en 8 séries) et **non un optimum universel**.
- **Comparaison future avec `k = 5` situations par série :** documentée pour une phase ultérieure après le premier pilote (ou lors d'un élargissement à `N = 10` ou `N = 11`) :
  - *Avantage potentiel de `k = 5` :* davantage d'information par écran ($\binom{5}{2} = 10$ paires implicites, 20 paires ordonnées).
  - *Coûts et contraintes de `k = 5` :* charge visuelle plus lourde sur mobile, risque accru de *satisficing* et d'effet de position sur 5 cartes ; en outre, maintenir `b = N` avec équilibre exact des 5 positions impose `r = 5` expositions par item (et avec `N = 8`, $k/N = 62.5\,\% > 50\,\%$ et chevauchement consécutif $\ge 2$). Un test comparatif futur entre `(N=8..10, k=4)` et `(N=10..11, k=5)` mesurera temps par bloc, taux d'abstention/passage, lisibilité mobile et fatigue perçue.

---

## 5. Protocole UX finalisé

### 5.1 Ordre principal retenu (parcours nominal P1.1 V0.2)

Le parcours principal place explicitement le questionnement MaxDiff **avant** le recueil libre des situations manquantes afin de limiter l'amorçage des comparaisons standardisées par les préoccupations spontanées immédiates :

1. **Temps 1 — Présentation de la méthode et du panorama commun :**
   - Rappel explicite : exercice de clarification personnelle sans classement de candidats, sans score caché ni profilage, état strictement en mémoire d'onglet, droit permanent de passer ou effacer.
   - Présentation neutre (ordre aléatoire par session ou ordre thématique équilibré sans hiérarchie visuelle) des **8 situations** du jeu pilote (`pilot-v0.1`, clairement balisé brouillon illustratif), chacune munie d'un intitulé homogène et d'un volet dépliable facultatif *« Précision de périmètre »*.
   - Actions disponibles sans blocage : signaler une carte floue (`ItemComprehensionFlag`) ou choisir *« Passer l'exercice comparatif / aucune de ces situations ne me parle »*.

2. **Temps 2 — Exercice MaxDiff (`8` séries de `4` situations) :**
   - En-tête discret et neutre (ex. *« Série 2 sur 8 »*, aucune barre de « réussite ») + rappel permanent que *« pourrait attendre » ne veut pas dire « sans importance »*.
   - Sélection Best / Worst accessible (WCAG 2.2 AA, groupes radio/bascules explicites mutuellement exclusifs, navigation clavier complète, retour possible à la série précédente pour correction).
   - **Quatre états de réponse au niveau de la série (`MaxDiffResponseState`) :**
     - `answered` : un choix « à traiter en premier » (`bestItemId`) et un choix « pourrait attendre » (`worstItemId`) distincts ont été exprimés ;
     - `skipped` : *« Passer cette série »* (non-réponse sans motif imposé, ou lorsque une carte réellement incompréhensible empêche de comparer) ;
     - `dont_know` : *« Je ne sais pas choisir »* ;
     - `no_distinguishable_best_worst` : impossible de distinguer une situation prioritaire et une situation pouvant attendre dans cette série, avec motif explicite facultatif (`NoDistinguishableBestWorstReason` : `equally_prioritized`, `not_comparable`, `none_should_take_precedence`, `other`).
   - **Signalement orthogonal d'une carte (`ItemComprehensionFlag` & `flaggedItemIds`) :**
     - Sur chaque carte d'une série (ou dès le panorama initial), l'utilisateur peut signaler un problème de compréhension ou de formulation indépendamment de sa réponse sur la série ;
     - Si la série reste arbitrable malgré une formulation imparfaite, l'utilisateur conserve une réponse `answered` valide **et** le signalement est enregistré séparément dans `flaggedItemIds` / `ItemComprehensionFlag` ;
     - Si une carte est réellement incompréhensible au point d'empêcher la comparaison, l'utilisateur enregistre une non-réponse (`skipped`, `dont_know` ou `no_distinguishable_best_worst`) **et** le signalement reste conservé séparément, sans aucune substitution automatique d'item.

3. **Temps 3 — Recueil des situations manquantes (et expression libre complémentaire) :**
   - Invitation ouverte placée *après* MaxDiff : signaler une ou plusieurs situations importantes absentes des 8 cartes (`MissingSituationReport`) et/ou saisir des préoccupations personnelles libres (articulable avec le module de structuration/confirmation manuelle P0.2, avec bouton clair *« Passer / rien à ajouter »*).
   - Explication transparente (`D2`) : *« Vos ajouts apparaîtront dans votre synthèse et pourront être précisés, mais ne modifient pas les comparaisons standardisées ci-dessus afin de préserver la comparabilité de l'exercice. »*

4. **Temps 4 — Exploration facultative des raisons (`0 à 2 situations`) :**
   - L'utilisateur peut passer directement à la synthèse (`0` situation) ou choisir librement **1 ou 2 situations** (parmi les 8 situations comparées ou un ajout manquant) **sans sélection automatique ni mise en avant des « gagnantes »**.
   - **Symétrie d'exploration :** l'utilisateur peut tout autant expliquer une situation choisie « à traiter en premier », une situation choisie « pourrait attendre », ou une série jugée difficile à départager.
   - Saisie libre facultative + pistes de clarification facultatives non exclusives (ordre randomisé) + champ facultatif *« Conditions »* + champ séparé pour les constats factuels/causaux (`CausalBeliefClaim`, étiqueté déclaration personnelle non vérifiée).

5. **Restitution finale descriptive et éditable (3 panneaux séparés) :**
   - **Panneau A — Observations descriptives de vos comparaisons :**
     - Bandeau explicite de complétude réelle (ex. *« 6 séries comparées sur 8 présentées ; 1 série passée ; 1 série sans priorité distinguable »* — **jamais présenté comme complet si une série est incomplète**).
     - Tableau neutre (ordre initial du catalogue ou tri alphabétique ; **jamais trié par `best - worst`**, aucun pourcentage ni barre de rang) présentant par situation :
       - nombre de présentations (`totalPresentedCount`),
       - nombre de séries effectivement comparées (`answeredExposures`),
       - choix « à traiter en premier » (`bestCount`),
       - choix « pourrait attendre » (`worstCount`),
       - non sélectionnée comme extrême dans les séries comparées (`neitherBestNorWorstCount` — remplaçant `middleCount`),
       - mention séparée de tout signalement de formulation (`flaggedCount` / `ItemComprehensionFlag`, orthogonal aux expositions répondues).
     - Note permanente de limite méthodologique (portée relative aux 8 situations `pilot-v0.1`, absence de score latent individuel).
   - **Panneau B — Situations manquantes et préoccupations personnelles confirmées :**
     - Liste des `MissingSituationReport` et déclarations personnelles confirmées.
   - **Panneau C — Raisons, conditions et convictions causales déclarées :**
     - Restitution séparée des 0–2 explorations, pistes confirmées, conditions et constats causaux (`user_stated_unverified`).

### 5.2 Protocole de non-substitution et conservation des données incomplètes
1. **Zéro substitution automatique :** une situation signalée comme incompréhensible (`flaggedItemIds` / `ItemComprehensionFlag`) ou une série sans priorité distinguable (`no_distinguishable_best_worst`) **n'entraîne jamais le remplacement** de la carte à la volée par une neuvième situation éditoriale ni par un ajout libre de l'utilisateur.
2. **Continuité du plan fixe et orthogonalité :** dans les séries suivantes contenant une carte déjà signalée, la carte reste à sa place dans la structure de bloc (sans recalcul du plan) ; un rappel discret signale qu'elle a été marquée et permet au choix soit de répondre malgré tout si l'arbitrage reste possible, soit de passer (`skipped`) en un clic.
3. **Traçabilité fidèle des données incomplètes :** chaque bloc non répondu reste enregistré avec son état exact (`skipped`, `dont_know`, `no_distinguishable_best_worst` et éventuel `NoDistinguishableBestWorstReason`), `bestItemId: null, worstItemId: null`, et ses éventuels `flaggedItemIds` séparés. La restitution indique toujours le nombre réel de séries répondues vs présentées (`sessionCompletionStatus: "complete" | "partial" | "skipped_all"`), sans imputation ni affichage artificiellement complet.

### 5.3 Prétest cognitif formatif qualitatif (comparaison d'ordre)
Avant toute validation des formulations et avant toute ouverture d'un pilote public, mener une **étude formative qualitative** par entretiens cognitifs (*think-aloud* + *verbal probing*, Willis 2005 ; *Pretesting DCEs*, `PMC10894089`) auprès de **8 à 12 participants diversifiés** (âge, territoire, rapport au politique, littératie numérique).

- **Statut méthodologique du prétest :** cet effectif qualitatif (`8 à 12` personnes) permet d'observer la compréhension des consignes, les ambiguïtés lexicales, les difficultés sur les états de réponse et d'éventuels indices d'amorçage, mais **ne constitue pas une expérience statistique permettant d'estimer un effet causal de l'ordre**.
- **Comparaison exploratoire des deux ordres :** répartir les entretiens entre :
  - **Bras principal (V0.2.1) :** Présentation de la méthode → MaxDiff → Situations manquantes / Expression libre → Raisons (0–2 situations).
  - **Bras comparatif (variante ex-Ordre A) :** Expression libre (P0.2) → Présentation de la méthode & Panorama → MaxDiff → Raisons (0–2 situations).
- **Observations qualitatives ciblées :** indices d'amorçage asymétrique dans les deux sens, frustration éventuelle liée à la place de l'expression libre, compréhension de « pourrait attendre » ≠ « sans importance », distinction gravité vs priorité relative, distinction entre préoccupation personnelle et pertinence collective, et clarté des états `skipped`, `dont_know`, `no_distinguishable_best_worst` et du signalement orthogonal des cartes.

---

## 6. Contrats de données cibles (validation Zod `.strict()`, client-only)

*(Mise en cohérence détaillée avec [`03_DATA_MODEL.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/03_DATA_MODEL.md) et réconciliation avec le socle P0.2.)*

1. **Rétrocompatibilité P0.2 (`Statement`) :** les champs P0.2 existants (`id`, `createdAt`, `sourceText`, `text`, `themeIds`, `themeSelectionState`, `objective`, `conditions`, `position`, `certaintySelfReport`, `status`, `confirmedByUser`) sont conservés sans rupture.
2. **`MaxDiffResponseState` et `NoDistinguishableBestWorstReason` :**
   ```ts
   type MaxDiffResponseState =
     | "answered"
     | "skipped"
     | "dont_know"
     | "no_distinguishable_best_worst";

   type NoDistinguishableBestWorstReason =
     | "equally_prioritized"
     | "not_comparable"
     | "none_should_take_precedence"
     | "other";
   ```
   *(Révision V0.2.1 : séparation stricte entre l'état de réponse à la série et le signalement individuel de carte ; suppression de `flagged_unclear` comme état bloquant de réponse et remplacement de `incomparable_or_tied` / `none_prioritized` par `no_distinguishable_best_worst` + sous-motif structuré.)*
3. **`PriorityObservation` :**
   `{ taskId, designId, designVersion, designSeed, blockId, blockIndex, itemOrder: [string, string, string, string], responseState: MaxDiffResponseState, bestItemId: string | null, worstItemId: string | null, noDistinguishableReason: NoDistinguishableBestWorstReason | null, noDistinguishableReasonNote?: string, flaggedItemIds: string[], methodVersion, timestamp }`.
   - **Invariants Zod `.strict()` :**
     - `itemOrder` contient exactement 4 identifiants distincts du catalogue ;
     - `flaggedItemIds` contient uniquement des identifiants uniques appartenant tous à `itemOrder`, et reste **totalement orthogonal** à `responseState` (peut être non vide avec `answered` comme avec `skipped`, `dont_know` ou `no_distinguishable_best_worst`) ;
     - si `responseState === "answered"` : `bestItemId !== null`, `worstItemId !== null`, `bestItemId !== worstItemId`, les deux appartiennent à `itemOrder`, `noDistinguishableReason === null`, et `noDistinguishableReasonNote` absent ;
     - si `responseState !== "answered"` (`skipped`, `dont_know`, `no_distinguishable_best_worst`) : `bestItemId === null` et `worstItemId === null` ;
     - si `responseState === "no_distinguishable_best_worst"` : `noDistinguishableReason` vaut `NoDistinguishableBestWorstReason | null` (facultatif pour ne jamais forcer l'utilisateur), et `noDistinguishableReasonNote` (chaîne bornée non vide après trim) n'est autorisé que lorsque `noDistinguishableReason === "other"` ;
     - si `responseState !== "no_distinguishable_best_worst"` : `noDistinguishableReason === null` et `noDistinguishableReasonNote` absent.
4. **Agrégat descriptif `MaxDiffSituationSummary` :**
   `{ situationId, totalPresentedCount, answeredExposures, bestCount, worstCount, neitherBestNorWorstCount, skippedCount, dontKnowCount, noDistinguishableCount, flaggedCount }`.
   *(Le terme `middleCount` est proscrit et remplacé par `neitherBestNorWorstCount`, car les 2 situations non choisies comme extrêmes dans une série de 4 ne sont ni ordonnées entre elles ni mesurées à un rang « intermédiaire ». `flaggedCount` est un compteur orthogonal de signalements de carte qui n'altère ni `answeredExposures` ni les comptages de non-réponse.)*
5. **`EditorialSituation` :** `{ id, shortLabel, clarificationNote, broadDomainTag, editorialStatus: "pilot_draft" | "pluralist_reviewed", catalogVersion }`. Identifiants strictement opaques, sans sémantique thématique ni classement caché.
6. **`ItemComprehensionFlag` (orthogonal à `MaxDiffResponseState`) :**
   `{ itemId, blockId?: string, reason: "too_vague" | "incomprehensible" | "outside_collective_scope" | "loaded_wording", comment?: string, createdAt }`.
   *(Révision V0.2.1 : le code `not_relevant` de V0.2 est remplacé par **`outside_collective_scope`** — « hors périmètre de la question collective posée / ne me semble pas relever d'un choix public » — afin d'éviter toute confusion entre l'absence de préoccupation personnelle égotropique et l'absence de pertinence pour la question sociétale posée en `D1`.)*
7. **`MissingSituationReport` :** `{ id, text, clarification?, createdAt, confirmedByUser }`.
8. **`ReasonExploration` (0 à 2 par session) & `CausalBeliefClaim` :**
   - `ReasonExploration`: `{ id, targetType: "editorial_situation" | "missing_situation", targetId, targetAngle: "first_priority" | "can_wait" | "general_arbitrage", freeExplanation, selectedTrackIds, conditions, causalBeliefClaims: CausalBeliefClaim[], confirmedByUser }`.
   - `CausalBeliefClaim`: `{ id, statement, confirmationStatus: "user_stated_unverified" }`.
9. **Clés interdites (`PROHIBITED_PROFILE_KEYS`) :** rejet strict de `ideology`, `leftRight`, `partyAffinity`, `voteIntent`, `candidateScore`, `proximityScore`, ainsi que de tout champ `latentScore` ou `rank` dans les schémas P1.1.

---

## 7. Exigences de confidentialité, sécurité, accessibilité et gouvernance

- **Confidentialité bloquante (`AGENTS.md`, [`02_PRIVACY_SECURITY.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/02_PRIVACY_SECURITY.md)) :**
  - État de session exclusivement en mémoire navigateur (`useReducer` / contexte local) ; aucun stockage persistant (`localStorage`, `sessionStorage`, `IndexedDB`, cookies, query string) ; aucun envoi réseau ; aucune télémétrie, police distante ou SDK LLM.
  - Ne jamais journaliser les réponses, raisons libres, ajouts manquants ou sélections MaxDiff (y compris en cas d'erreur client).
- **Accessibilité (WCAG 2.2 AA) :**
  - Navigation clavier intégrale, ordre de focus logique et gestion du focus au changement de série ou à l'ouverture d'un signalement inline ;
  - Libellés explicites associés, annonces `aria-live` sobres, aucune information portée uniquement par la couleur, zones tactiles suffisantes sur mobile.
- **Gouvernance éditoriale (`08_GOVERNANCE_CONTENT.md`) :**
  - Les 8 situations pilotes portent le statut `pilot-v0.1` (`pilot_draft`). Toute mise en production publique généralisée reste subordonnée à une revue pluraliste documentée et aux résultats du prétest cognitif.

---

## 8. Synthèse opérationnelle : validé, hypothèses restantes, critères d'acceptation

### 8.1 Éléments validés (V0.2.1)
1. **Construit mesuré (`D1`) :** priorité relative des situations concrètes que la personne estime devoir voir évoluer dans la société.
2. **Origine et séparation des items (`D2`, `D3`) :** bibliothèque éditoriale commune (`pilot-v0.1`) pour MaxDiff ; recueil séparé des situations manquantes et préoccupations personnelles sans insertion automatique dans les séries MaxDiff ; unité homogène « situation concrète à améliorer ».
3. **Configuration expérimentale pilote (`D4`) :** `N = 8` situations, `b = 8` séries, `k = 4` situations par série, `r = 4` présentations par situation, avec `N = 7` (BIBD exact `(7,4,2)`) conservé comme plan exact de comparaison ; randomisation contrôlée `randomize_pilot_n8_dihedral` ($\pi \times \tau \times D_8$) vérifiée `1000/1000` sur 1 000 graines distinctes dans [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py) (garantissant `[1,1,1,1]`, `r=4`, cooccurrences, zéro doublon, et chevauchement consécutif `= 1` linéaire et cyclique `B8 → B1`).
4. **Politique statistique et restitution :** aucun classement individuel ni score latent publié en P1.1 (garde-fou de validité, et non théorème d'impossibilité) ; restitution exclusivement descriptive des choix réellement exprimés (`answeredExposures`, `bestCount`, `worstCount`, `neitherBestNorWorstCount`, statuts incomplets explicites) ; suppression de `middleCount` et de `none_prioritized`.
5. **Protocole UX nominal et séparation états/signalements :** ordre principal `Présentation de la méthode → MaxDiff → Recueil des situations manquantes → Exploration facultative des raisons (0 à 2 situations)` ; 4 états de réponse (`answered`, `skipped`, `dont_know`, `no_distinguishable_best_worst` + `NoDistinguishableBestWorstReason`) orthogonaux à `flaggedItemIds` et `ItemComprehensionFlag` (`outside_collective_scope` distinct de l'absence de préoccupation personnelle) ; aucune substitution automatique d'item ; conservation explicite des données incomplètes sans complétude artificielle.
6. **Lot backlog :** le présent périmètre est consolidé sous l'identifiant **`P1.1`** dans [`07_BACKLOG.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/07_BACKLOG.md).

### 8.2 Hypothèses restantes (à valider avant ouverture du pilote public)
1. **Rédaction exacte des 8 situations `pilot-v0.1` :** aucune des formulations candidates n'est encore démontrée neutre ou compréhensible ; un catalogue provisoire identifié comme tel peut servir au prototype interne, mais toute diffusion publique exige le prétest cognitif qualitatif et la revue pluraliste ([`08_GOVERNANCE_CONTENT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/08_GOVERNANCE_CONTENT.md)).
2. **Formulations des consignes et libellés Best/Worst :** les variantes de consigne (cadrage « pays » vs « action collective », libellés « pourrait attendre » vs « dans un second temps ») et les pistes de clarification des raisons restent à qualifier lors des entretiens cognitifs (`P1_1_METHODOLOGY_AUDIT.md` § 7.2).
3. **Effet d'ordre (Ordre principal V0.2.1 vs Expression libre avant MaxDiff) :** les indices qualitatifs d'amorçage dans les deux sens seront explorés lors de l'étude formative qualitative (`8 à 12` personnes), sans prétendre estimer statistiquement un effet causal de l'ordre.
4. **Paramètres `k = 4, r = 4` et taille `N = 8` :** hypothèse initiale raisonnable pour la lisibilité mobile, mais susceptible d'être réévaluée face à `k = 5` (ou à $N = 9..10$) dans une expérimentation dédiée ultérieure.
5. **Ergonomie des états de non-réponse et du signalement orthogonal :** vérifier en entretien que la séparation entre répondre/passer/NSP/`no_distinguishable_best_worst` (et ses 4 sous-motifs) et le signalement orthogonal de carte reste simple et compréhensible.

### 8.3 Paliers d'autorisation et critères d'acceptation de la future implémentation `P1.1`

#### Paliers de démarrage distincts
1. **Autorisation de développer un prototype interne (hors diffusion publique) :**
   - Subordonnée uniquement à la **validation humaine explicite du présent patch V0.2.1** par le concepteur / responsable méthodologique.
   - Autorise l'utilisation d'un **catalogue provisoire de 8 situations**, obligatoirement identifié comme tel (`editorialStatus: "pilot_draft"`, étiquette visible `pilot-v0.1` — brouillon provisoire non validé pluralistement), strictement en mémoire navigateur et hors indexation / hors accès public.
2. **Conditions requises pour réaliser le prétest cognitif (`8 à 12` personnes) :**
   - Disposer du support interactif (maquette ou prototype interne local conforme aux invariants de confidentialité) avec les deux ordres comparables et le catalogue provisoire identifié ;
   - Mener le prétest comme une **étude formative qualitative** (*think-aloud* + *verbal probing*, recueil de consentement d'entretien hors base de production), et non comme une expérience statistique d'estimation causale de l'ordre.
3. **Conditions requises pour l'ouverture d'un pilote public :**
   - **Revue éditoriale pluraliste documentée** des 8 situations (`editorialStatus: "pluralist_reviewed"`, charte et critères publiés selon [`08_GOVERNANCE_CONTENT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/08_GOVERNANCE_CONTENT.md)) ;
   - **Validation cognitive qualitative des formulations** (consignes, libellés Best/Worst, états de réponse, signalements) issue du prétest avec traçabilité des ajustements ;
   - Satisfaction intégrale des critères techniques, d'accessibilité, de confidentialité et d'examen RGPD ci-dessous.

#### Critères d'acceptation techniques (tranche d'implémentation `P1.1-impl`)
1. **Qualité domaine & invariants mathématiques (`Vitest`, module pur sans dépendance React/Next.js) :**
   - Catalogue figé et vérifié du plan canonique `N = 8` (et référence `N = 7` pour tests de comparaison).
   - `instantiateControlledMaxDiffPlan` applique strictement $\pi \in S_8$, $\tau \in S_4$ et $D_8$ : 100 % des graines testées préservent `r = 4`, `[1, 1, 1, 1]`, zéro doublon intra-bloc, zéro bloc dupliqué, et `max_consecutive_overlap === 1` (linéaire et cyclique `B8 → B1`) pour `N = 8`.
   - `summarizeMaxDiffObservations` produit exclusivement des comptages descriptifs (`totalPresentedCount`, `answeredExposures`, `bestCount`, `worstCount`, `neitherBestNorWorstCount`, `skippedCount`, `dontKnowCount`, `noDistinguishableCount`, `flaggedCount`), sans jamais calculer ni exposer de score `B - W`, d'utilité latente, de pourcentage de priorité ou de rang.
   - Validation Zod `.strict()` complète des schémas (`PriorityObservation`, `MaxDiffResponseState`, `NoDistinguishableBestWorstReason`, `ItemComprehensionFlag`, `MissingSituationReport`, `ReasonExploration`, `CausalBeliefClaim`), incluant l'orthogonalité de `flaggedItemIds` et le rejet des `PROHIBITED_PROFILE_KEYS`.
2. **Comportement UX & accessibilité (`Testing Library` + `Playwright` + `axe-core`) :**
   - Parcours nominal complet en 4 temps fonctionnel sur desktop et mobile (`Présentation → MaxDiff → Situations manquantes / expression libre → Raisons 0–2 → Synthèse descriptive`), avec étiquette visible `pilot-v0.1` tant que le catalogue est provisoire.
   - Sélection mutuellement exclusive Best/Worst, correction arrière possible sur toute série précédente, navigation clavier 100 % fonctionnelle, zéro violation critique/sérieuse `axe-core` WCAG 2.2 AA.
   - Vérification de l'orthogonalité et de la non-substitution : pouvoir signaler une carte tout en conservant une réponse `answered`, ou passer/indiquer `no_distinguishable_best_worst` tout en gardant le signalement séparé, sans jamais remplacer une carte ni afficher une restitution artificiellement complète.
   - Vérification des bornes 0 à 2 raisons, symétrie (possibilité d'expliquer une situation « pourrait attendre »), et séparation déclarative des convictions causales (`user_stated_unverified`).
3. **Confidentialité & sécurité (`Playwright` test canari + revue de diff) :**
   - Test canari prouvant qu'aucun texte saisi (situation manquante, raison libre, constat causal, commentaire de signalement ou note `other`) ni aucun choix MaxDiff ne transite par une requête réseau, une URL, un log console/serveur, un cookie, `localStorage`, `sessionStorage` ou `IndexedDB`.
   - Bouton « Effacer ma session » réinitialisant intégralement l'état P0.2 + P1.1 en mémoire.
   - Zéro `dangerouslySetInnerHTML`, zéro `any` non justifié, zéro dépendance non approuvée ; `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e` et `pnpm build` passent intégralement sous Node 24 LTS.
