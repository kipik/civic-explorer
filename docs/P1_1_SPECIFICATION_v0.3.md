# Civic Explorer — Spécification fonctionnelle et méthodologique P1.1 (V0.3)

**Version :** 0.3 — 10 novembre 2026 *(consolidation de la décision D1 V0.3, réexamen du périmètre éditorial de l'unité de comparaison et alignement des paliers de validation)*  
**Statut :** spécification consolidée intégrant [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) tout en conservant les décisions D2–D4 et l'historique V0.2 / V0.2.1 ([`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md)). **Aucune implémentation applicative, aucune modification de `src/` et aucun prétest cognitif ne sont autorisés avant arbitrage humain du catalogue candidat [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) et respect des paliers d'autorisation définis en § 8.3.**  
**Lot backlog associé :** `P1.1` (voir [`07_BACKLOG.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/07_BACKLOG.md))

**Documents sources consolidés :**
- [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) (révision officielle de D1 — unité descriptive d'enjeu collectif)
- [`P1_1_DECISIONS_AND_AUDIT_BRIEF_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_DECISIONS_AND_AUDIT_BRIEF_v0.2.md) (décisions D2–D4 conservées ; D1 remplacée par V0.3)
- [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md) (version archivée V0.2.1 conservée intacte)
- [`P1_1_METHODOLOGY_AUDIT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_METHODOLOGY_AUDIT.md) (audit V1.0 + addenda V1.1, V1.2 et V1.3)
- [`CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md) (vérification indépendante des plans et recommandations critiques)
- [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md) (décision expérimentale `N = 8` et référence exacte `N = 7`)
- [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) (brouillon candidat à arbitrer humainement, sans prétention de neutralité démontrée)

### Historique des versions de la spécification P1.1
- **V0.2 (10 novembre 2026) :** intégration de l'audit méthodologique, de la revue indépendante et des arbitrages initiaux D1–D4.
- **V0.2.1 (10 novembre 2026) :** patch de cohérence — orthogonalité des états de réponse et signalements (`flaggedItemIds`), randomisation diédrale $D_8$ reproductible (`1000/1000`), distinction des paliers de démarrage (voir [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md)).
- **V0.3 (10 novembre 2026) :** consolidation de la révision officielle de **D1** ([`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md)) — passage d'un « changement à améliorer déjà orienté » à un **enjeu collectif formulé de façon descriptive**, alignement de la taxonomie des sept construits, mise à jour de la consigne de travail à prétester, ajout du palier d'arbitrage humain du catalogue candidat V0.3 avant tout prétest cognitif ou prototype. Les décisions D2–D4 et les paramètres mathématiques (`N = 8, b = 8, k = 4, r = 4`, référence `N = 7`) demeurent inchangés.

---

## 1. Périmètre, finalité et séparation stricte des construits

### 1.1 Ce que mesure P1.1 (D1 V0.3)

Conformément à [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) § 1, le moteur MaxDiff (Best-Worst Scaling Case 1) du lot `P1.1` mesure :

> **La priorité relative que l'utilisateur souhaite voir accorder aux différents enjeux collectifs dans les choix à venir.**

L'exercice compare des **enjeux collectifs** présentés dans une bibliothèque éditoriale commune. Il demande à l'utilisateur lesquels devraient recevoir davantage d'attention ou passer avant d'autres dans les arbitrages collectifs, sans présupposer la solution à adopter.

**Portée exacte de la mesure (`P1_1_D1_DECISION_v0.3.md` § 2) :**
- Le MaxDiff observe uniquement des choix relatifs entre les enjeux présentés dans un bloc de 4 et dans la bibliothèque pilote.
- Il ne mesure **ni** une importance absolue, **ni** une gravité objective, **ni** une préoccupation personnelle, **ni** une préférence partisane, **ni** l'adhésion à un instrument de politique publique.
- La réponse « pourrait attendre » signifie uniquement qu'un autre enjeu est préféré dans l'arbitrage présenté. Elle ne signifie **ni** que l'enjeu est négligeable, **ni** que l'utilisateur s'y oppose.

### 1.2 Séparation étanche des construits et non-présupposition (D1 V0.3, D3)

Le moteur, le modèle de données et l'interface séparent de manière stricte les sept construits définis dans [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md) § 4, qui ne sont **jamais fusionnés dans un score composite** :

| Construit | Mode de recueil en P1.1 | Interdit de fusion / confusion |
|---|---|---|
| **1. Priorité relative accordée à un enjeu collectif** (`D1` V0.3) | Exercice MaxDiff Case 1 sur 8 enjeux éditoriaux descriptifs | Ne pas déduire une importance absolue, une gravité objective, une préoccupation personnelle, une préférence partisane ou l'adhésion à une solution. |
| **2. Préoccupation personnelle et enjeux manquants** (`D2`) | Recueil qualitatif séparé post-MaxDiff (+ socle P0.2) | Ne pas injecter dans les blocs MaxDiff standardisés ; ne pas inférer à partir des choix MaxDiff. |
| **3. Gravité perçue** | Hors du premier MaxDiff P1.1 | Ne pas inférer d'un choix « pourrait attendre » que l'enjeu est jugé peu grave. |
| **4. Raisons, valeurs et critères invoqués** | Exploration qualitative facultative post-MaxDiff sur **0 à 2 enjeux** | Aucune pondération numérique (pas de 70/30 ni score composite) ; aucune classification automatique sans confirmation. |
| **5. Convictions causales ou factuelles** | Champ déclaratif distinct (`CausalBeliefClaim`, `user_stated_unverified`) au sein de l'exploration des raisons | Ne pas corriger comme un « fait » le jugement normatif ; ne pas valider par défaut une croyance causale non sourcée. |
| **6. Solutions et instruments politiques privilégiés** | Hors comparaison MaxDiff P1.1 (exploration ultérieure séparée / EPIC 2 DCE) | Interdiction absolue de mélanger enjeux collectifs descriptifs et solutions/instruments dans un même bloc MaxDiff (`D3`). |
| **7. Faisabilité ou capacité d'action perçue** | Dimension distincte, hors P1.1 (à étudier ultérieurement) | Ne pas confondre un report motivé par un doute d'efficacité publique avec une indifférence envers l'enjeu. |

**Ce que la mesure ne doit pas présupposer (`P1_1_D1_DECISION_v0.3.md` § 3) :**
Les formulations des enjeux ne doivent pas présupposer :
- une solution ou un instrument politique particulier ;
- une cause du problème qui n'aurait pas été établie ;
- une conception unique de la justice, de l'égalité, de la liberté ou de la solidarité ;
- un modèle déterminé de logement, de travail, de famille, d'éducation, de protection sociale ou d'organisation institutionnelle ;
- que toute personne a personnellement vécu ou perçu la situation décrite.

Les faits scientifiques établis peuvent être présentés dans des contenus documentaires distincts, avec leurs sources. Ils ne doivent pas être déformés pour fabriquer une apparence de neutralité.

### 1.3 Origine et unité des enjeux (D2 conservée, D3 alignée sur D1 V0.3)

- **Bibliothèque éditoriale commune (`D2` inchangée) :** les enjeux soumis à comparaison MaxDiff proviennent exclusivement d'une bibliothèque éditoriale commune versionnée (`situationsCatalogVersion`), avec statut explicite **`pilot-v0.3-draft` / `pilot_draft`** tant qu'une revue pluraliste complète ([`08_GOVERNANCE_CONTENT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/08_GOVERNANCE_CONTENT.md)) et les entretiens cognitifs n'ont pas eu lieu. *(Les éventuelles formulations antérieures `pilot-v0.1` / `pilot-v0.2` sont réputées caduques à la suite de D1 V0.3.)*
- **Unité de comparaison homogène (`D3` conservée dans son exigence d'homogénéité, redéfinie par D1 V0.3) :** l'unité de comparaison est désormais un **enjeu collectif formulé de façon descriptive** (niveau méso homogène), et **non** un « changement à améliorer » déjà orienté. Conformément à `P1_1_D1_DECISION_v0.3.md` § 5, chaque carte doit :
  1. identifier un enjeu collectif reconnaissable ;
  2. rester assez précise pour être comprise de façon comparable (granularité comparable entre les 8 cartes) ;
  3. ne pas recommander explicitement une direction normative ;
  4. ne pas mélanger plusieurs enjeux indépendants ;
  5. ne pas inclure de solution, de mesure, de cause présupposée ou de slogan (ni mot-valise vague ou jargon administratif) ;
  6. pouvoir être comprise indépendamment des autres cartes ;
  7. comporter, si nécessaire, une note de périmètre non prescriptive (périmètre inclus / exclu pour lever les ambiguïtés éventuelles).
- **Enjeux manquants et préoccupations personnelles (`D2` inchangée) :** les enjeux absents de la bibliothèque commune ou préoccupations personnelles sont recueillis séparément à l'étape dédiée (§ 5.1, temps 3), confirmés manuellement et restitués dans un panneau propre, sans jamais être insérés dans les séries MaxDiff.

---

## 2. Cadre statistique et épistémologie de la restitution

*(Cadre issu de la revue indépendante § 3.3 / § 6.1 et des orientations V0.2 / V0.2.1 ; inchangé dans ses propriétés mathématiques sous D1 V0.3.)*

### 2.1 Portée des erreurs-types asymptotiques à $\beta = 0$

> Les erreurs-types théoriques sous le modèle logit conjoint BWS Case 1 au point $\beta = 0$ (`SE ≈ 0.93–0.96` logits pour $r = 4$) constituent une mesure locale de l'information attendue pour un plan donné et une paramétrisation donnée. Elles **ne démontrent pas une impossibilité mathématique absolue** de calculer un score ou un estimateur individuel. En revanche, elles indiquent qu'avec $r = 4$ expositions par enjeu, l'information disponible au niveau d'un répondant isolé est limitée et ne justifie pas de restituer des utilités latentes individuelles ou un classement psychométrique fiable. Le choix de ne publier aucun classement individuel ni score latent dans P1.1 est donc un **garde-fou délibéré de validité scientifique et de sobriété produit**, et non un théorème d'impossibilité.

### 2.2 Distinction obligatoire entre quatre niveaux de traitement

| Niveau | Définition | Statut en P1.1 | Justifications et limites |
|---|---|---|---|
| **1. Calcul descriptif des choix** | Comptage factuel et exact par enjeu : nombre de présentations (`totalPresentedCount`), expositions effectivement répondues (`answeredExposures`), choix « recevoir le plus d'attention / passer avant » (`bestCount`), choix « pourrait attendre » (`worstCount`), non sélectionné comme extrême dans les séries répondues (`neitherBestNorWorstCount`), plus comptes des séries incomplètes par statut. | **Retenu et affiché** (Panneau A) | Zéro hypothèse paramétrique, zéro approximation asymptotique, 100 % fidèle aux actions réellement posées par la personne, même en cas de réponses partielles. |
| **2. Score `B - W` observé** | Différence arithmétique brute $B_i - W_i \in [-r, +r]$ ou normalisée $(B_i - W_i) / n_{\text{exp}, i}$. | **Interdit d'affichage et de tri en P1.1** | À $r = 4$, forte discrétisation (nombreux ex æquo artificiels), dépendance aux paires effectivement affrontées si des blocs sont passés (`MNAR`), et risque élevé d'être interprété à tort comme un score de priorité absolue ou un classement normatif. |
| **3. Estimation d'utilité latente** | Inférence d'un vecteur $\hat{\beta}$ via modèle probabiliste (MNL conjoint BWS, logit séquentiel ou Hiérarchique Bayes). | **Exclu de P1.1** (différé post-MVP après calibration) | Au niveau individuel sans emprunt de force populationnel (impossible en architecture strictement locale sans serveur), l'estimateur MLE non régularisé souffre de séparation complète dès qu'un item est toujours/jamais choisi, et l'incertitude locale à $r=4$ reste élevée. |
| **4. Fiabilité d'une restitution individuelle** | Qualité globale d'une restitution (stabilité test-retest, compréhension des items, absence d'heuristiques de position, fidélité au construit D1). | **Cible à évaluer hors restitution de scores** | Une faible erreur-type asymptotique ne suffit jamais à prouver la validité d'un profil individuel : elle ignore la validité sémantique des items, le *satisficing* et la stabilité temporelle. |

### 2.3 Limites des approximations asymptotiques sur un petit nombre de séries ($b = 7$ ou $8$)

Les calculs basés sur la matrice d'information de Fisher $\mathcal{I}(\beta)$ et les intervalles de Wald $\pm 1.96 \times \mathrm{SE}$ reposent sur une **approximation asymptotique** ($b \to \infty$ ou $r \to \infty$) qui n'est pas valide à l'échelle d'une session individuelle de 8 séries (au plus 16 choix élémentaires Best/Worst) :
1. **Distribution finie discrète et asymétrique :** la distribution d'échantillonnage de tout estimateur à $r = 4$ est fortement discrète et non gaussienne.
2. **Séparation complète ou quasi complète :** si une personne choisit systématiquement un enjeu comme prioritaire dès qu'il apparaît (ou toujours comme pouvant attendre), le maximum de vraisemblance non pénalisé diverge ($\hat{\beta}_i \to \pm\infty$) et l'approximation quadratique de la log-vraisemblance s'effondre.
3. **Dépendance locale au point $\beta = 0$ :** lorsque les préférences réelles s'écartent de l'indifférence ($\beta \neq 0$), les probabilités de choix s'approchent de $0$ ou $1$, ce qui **réduit encore** l'information de Fisher réelle par rapport au repère calculé à $\beta = 0$.
4. **Données manquantes non aléatoires (MNAR) :** passer les séries contenant une carte jugée incompréhensible brise la symétrie du plan observé et peut même déconnecter le graphe observé des comparaisons.

---

## 3. Plan expérimental MaxDiff et documentation mathématique (`D4` conservée)

*(Détails complets et matrices dans [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md). Aucun paramètre mathématique n'est modifié par D1 V0.3.)*

### 3.1 Paramètres du pilote `N = 8` et référence comparative `N = 7`

- **Configuration pilote retenue (`P1.1`) :** `N = 8` enjeux éditoriaux, `b = 8` séries par session, `k = 4` enjeux par série, `r = 4` présentations par enjeu.
- **Plan exact de référence conservé :** `N = 7` (BIBD symétrique `(7, 4, 2)` — complément du plan de Fano $PG(2,2)$), utilisé comme étalon de comparaison méthodologique (100 % D-efficace, mais ratio $k/N = 57.1\,\% > 50\,\%$ et chevauchement consécutif constant égal à `2`).
- **Justification de `N = 8` pour le pilote :**
  - Maintient $k / N = 4 / 8 = 50\,\% \le 50\,\%$ (seuil de Orme, 2005) ;
  - Réduit le chevauchement entre deux écrans consécutifs à **exactement `1` item commun sur 4** (`max = 1`, `moy = 1.00`, y compris entre `B8` et `B1`) ;
  - Couvre toutes les $\binom{8}{2} = 28$ paires au moins une fois (`1:8`, `2:20`, zéro paire à `0`, variance `0.2041` égale à la borne inférieure théorique) ;
  - Garantit un équilibre exact des 4 positions (`[1, 1, 1, 1]` par enjeu) et 0 bloc dupliqué ;
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
- **Efficacité statistique :** efficacité relative ($D_{\mathrm{eff}}$) et précision locale ($\mathrm{SE}$) sous modèle donné à $\beta = 0$ et à budget constant ($r = 4$). Une efficacité relative de `99.57 %` mesure la quasi-optimalité *à $r = 4$ fixé*, pas une précision individuelle suffisante pour classer, ni la validité sémantique des cartes.

### 3.4 Randomisation contrôlée exigée pour le pilote `N = 8`

Au démarrage de la session MaxDiff (graine aléatoire locale éphémère en mémoire navigateur, jamais envoyée au serveur) :
1. Tirer une bijection aléatoire $\pi \in S_8$ entre les 8 enjeux du catalogue et les indices `1..8` du plan canonique `N = 8` ;
2. Tirer une permutation globale $\tau \in S_4$ des 4 positions d'affichage ;
3. Tirer une transformation diédrale $D_8$ sur la séquence des 8 blocs canoniques (décalage circulaire $s \in \{0..7\}$ et sens $\delta \in \{+1, -1\}$).

La règle `randomize_pilot_n8_dihedral` ($\pi \times \tau \times D_8$) vérifiée dans [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py) garantit dans **100 % des 1 000 essais à graines distinctes (`1000/1000`)** l'équilibre exact des positions `[1,1,1,1]`, les fréquences `r=4`, les cooccurrences `{1:8, 2:20}`, la connectivité $\mu_2 = 12$, zéro doublon, **et** un chevauchement consécutif strictement égal à `1` (linéaire et bouclage `B8 → B1`).

---

## 4. Paramètres UX : hypothèse initiale `k = 4, r = 4` et comparaison future avec `k = 5`

- **Paramètres initiaux retenus :** `k = 4` enjeux par série et `r = 4` présentations par enjeu. Ce choix constitue une **hypothèse de départ pragmatique** pour le pilote `N = 8` (lisibilité sur écran mobile, charge cognitive modérée de 4 énoncés + note de périmètre facultative par écran, ratio $k/N = 50\,\%$, appariement exact aux 4 positions en 8 séries) et **non un optimum universel**.
- **Comparaison future avec `k = 5` enjeux par série :** documentée pour une phase ultérieure après le premier pilote (ou lors d'un élargissement à `N = 10` ou `N = 11`) :
  - *Avantage potentiel de `k = 5` :* davantage d'information par écran ($\binom{5}{2} = 10$ paires implicites, 20 paires ordonnées).
  - *Coûts et contraintes de `k = 5` :* charge visuelle plus lourde sur mobile (d'autant plus que des formulations descriptives précises avec note de périmètre demandent une lecture attentive), risque accru de *satisficing* et d'effet de position sur 5 cartes ; en outre, maintenir `b = N` avec équilibre exact des 5 positions impose `r = 5` expositions par item (et avec `N = 8`, $k/N = 62.5\,\% > 50\,\%$ et chevauchement consécutif $\ge 2$). Un test comparatif futur entre `(N=8..10, k=4)` et `(N=10..11, k=5)` mesurera temps par bloc, taux d'abstention/passage, lisibilité mobile et fatigue perçue.

---

## 5. Protocole UX consolidé (V0.3)

### 5.1 Ordre principal retenu (parcours nominal P1.1 V0.3)

Le parcours principal conserve l'ordre validé en V0.2 (qui place le questionnement MaxDiff **avant** le recueil libre des enjeux manquants afin de limiter l'amorçage des comparaisons standardisées par les préoccupations spontanées immédiates), adapté à la définition D1 V0.3 :

1. **Temps 1 — Présentation de la méthode et du panorama commun :**
   - Rappel explicite : exercice de clarification des priorités relatives sur des enjeux collectifs, sans classement de candidats, sans score caché ni profilage, état strictement en mémoire d'onglet, droit permanent de passer ou effacer.
   - Présentation neutre (ordre aléatoire par session ou ordre thématique équilibré sans hiérarchie visuelle) des **8 enjeux collectifs** du jeu pilote (balisé **`pilot-v0.3-draft`** — brouillon illustratif tant que la revue pluraliste et la validation cognitive ne sont pas achevées), chacun muni d'un libellé court, d'une formulation complète descriptive et d'un volet dépliable facultatif *« Précision de périmètre (inclus / exclu) »*.
   - Actions disponibles sans blocage : signaler un enjeu flou ou orienté (`ItemComprehensionFlag`) ou choisir *« Passer l'exercice comparatif / aucun de ces enjeux ne me parle »*.

2. **Temps 2 — Exercice MaxDiff (`8` séries de `4` enjeux) :**
   - **Consigne de travail D1 V0.3 (formulation candidate à prétester cognitivement, `P1_1_D1_DECISION_v0.3.md` § 6) :**
     > **Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient recevoir le plus d'attention, et lesquels pourraient attendre ?**
   - En-tête discret et neutre (ex. *« Série 2 sur 8 »*, aucune barre de « réussite ») + rappel permanent de la portée relative : *« “Pourrait attendre” exprime une priorité relative dans cette série : cela ne signifie ni que l'enjeu est négligeable, ni que vous vous y opposez. »*
   - Libellés de choix à prétester en cohérence avec D1 V0.3 : pôle prioritaire (*« Devrait recevoir le plus d'attention »* / variante courte *« Plus d'attention en premier »*) et pôle secondaire (*« Pourrait attendre »* / variante *« Dans un second temps »*), en évitant l'injonction prescriptive ou orientée solution.
   - Sélection Best / Worst accessible (WCAG 2.2 AA, groupes radio/bascules explicites mutuellement exclusifs, navigation clavier complète, retour possible à la série précédente pour correction).
   - **Quatre états de réponse au niveau de la série (`MaxDiffResponseState`) :**
     - `answered` : un enjeu choisi comme devant recevoir le plus d'attention (`bestItemId`) et un enjeu distinct choisi comme pouvant attendre (`worstItemId`) ;
     - `skipped` : *« Passer cette série »* (non-réponse sans motif imposé, ou lorsqu'une carte réellement incompréhensible empêche de comparer) ;
     - `dont_know` : *« Je ne sais pas choisir »* ;
     - `no_distinguishable_best_worst` : impossible de distinguer un enjeu à privilégier et un enjeu pouvant attendre dans cette série, avec motif explicite facultatif (`NoDistinguishableBestWorstReason` : `equally_prioritized`, `not_comparable`, `none_should_take_precedence`, `other`).
   - **Signalement orthogonal d'une carte (`ItemComprehensionFlag` & `flaggedItemIds`) :**
     - Sur chaque carte d'une série (ou dès le panorama initial), l'utilisateur peut signaler un problème de formulation, de périmètre ou d'orientation perçue indépendamment de sa réponse sur la série ;
     - Si la série reste arbitrable malgré une formulation imparfaite, l'utilisateur conserve une réponse `answered` valide **et** le signalement est enregistré séparément dans `flaggedItemIds` / `ItemComprehensionFlag` ;
     - Si une carte est réellement incompréhensible au point d'empêcher la comparaison, l'utilisateur enregistre une non-réponse (`skipped`, `dont_know` ou `no_distinguishable_best_worst`) **et** le signalement reste conservé séparément, sans aucune substitution automatique d'item.

3. **Temps 3 — Recueil des enjeux manquants (et expression libre complémentaire) :**
   - Invitation ouverte placée *après* MaxDiff : signaler un ou plusieurs enjeux collectifs importants absents des 8 cartes (`MissingSituationReport`) et/ou saisir des préoccupations personnelles libres (articulable avec le module de structuration/confirmation manuelle P0.2, avec bouton clair *« Passer / rien à ajouter »*).
   - Explication transparente (`D2`) : *« Vos ajouts apparaîtront séparément dans votre synthèse et pourront être précisés, mais ne modifient pas les comparaisons standardisées ci-dessus afin de préserver la comparabilité de l'exercice. »*

4. **Temps 4 — Exploration facultative des raisons (`0 à 2 enjeux`) :**
   - L'utilisateur peut passer directement à la synthèse (`0` enjeu) ou choisir librement **1 ou 2 enjeux** (parmi les 8 enjeux comparés ou un enjeu manquant ajouté) **sans sélection automatique ni mise en avant des « gagnants »**.
   - **Symétrie d'exploration :** l'utilisateur peut tout autant expliquer un enjeu choisi pour recevoir plus d'attention, un enjeu placé « pourrait attendre », ou une série jugée difficile à départager.
   - Saisie libre facultative + pistes de clarification facultatives non exclusives (ordre randomisé) + champ facultatif *« Conditions »* + champ séparé pour les convictions causales ou factuelles (`CausalBeliefClaim`, étiqueté déclaration personnelle non vérifiée) + champ ou piste distincte si l'utilisateur souhaite préciser la solution ou l'action publique qu'il envisage (séparée du choix MaxDiff).

5. **Restitution finale descriptive et éditable (3 panneaux séparés) :**
   - **Panneau A — Observations descriptives de vos comparaisons :**
     - Bandeau explicite de complétude réelle (ex. *« 6 séries comparées sur 8 présentées ; 1 série passée ; 1 série sans priorité distinguable »* — **jamais présenté comme complet si une série est incomplète**).
     - Tableau neutre (ordre initial du catalogue ou tri alphabétique ; **jamais trié par `best - worst`**, aucun pourcentage ni barre de rang) présentant par enjeu :
       - nombre de présentations (`totalPresentedCount`),
       - nombre de séries effectivement comparées (`answeredExposures`),
       - choix « plus d'attention / passer avant » (`bestCount`),
       - choix « pourrait attendre » (`worstCount`),
       - non sélectionné comme extrême dans les séries comparées (`neitherBestNorWorstCount`),
       - mention séparée de tout signalement de formulation (`flaggedCount` / `ItemComprehensionFlag`, orthogonal aux expositions répondues).
     - Note permanente de limite méthodologique (portée relative aux 8 enjeux du catalogue pilote, absence de score latent individuel et de mesure de gravité absolue ou d'adhésion à une solution).
   - **Panneau B — Enjeux manquants et préoccupations personnelles confirmées :**
     - Liste des `MissingSituationReport` et déclarations personnelles confirmées (`Statement` P0.2).
   - **Panneau C — Raisons, valeurs, conditions et convictions causales déclarées :**
     - Restitution séparée des 0–2 explorations, pistes confirmées, conditions et convictions causales (`user_stated_unverified`).

### 5.2 Protocole de non-substitution et conservation des données incomplètes

1. **Zéro substitution automatique :** un enjeu signalé comme incompréhensible (`flaggedItemIds` / `ItemComprehensionFlag`) ou une série sans priorité distinguable (`no_distinguishable_best_worst`) **n'entraîne jamais le remplacement** de la carte à la volée par un neuvième enjeu éditorial ni par un ajout libre de l'utilisateur.
2. **Continuité du plan fixe et orthogonalité :** dans les séries suivantes contenant une carte déjà signalée, la carte reste à sa place dans la structure de bloc (sans recalcul du plan) ; un rappel discret signale qu'elle a été marquée et permet au choix soit de répondre malgré tout si l'arbitrage reste possible, soit de passer (`skipped`) en un clic.
3. **Traçabilité fidèle des données incomplètes :** chaque bloc non répondu reste enregistré avec son état exact (`skipped`, `dont_know`, `no_distinguishable_best_worst` et éventuel `NoDistinguishableBestWorstReason`), `bestItemId: null, worstItemId: null`, et ses éventuels `flaggedItemIds` séparés. La restitution indique toujours le nombre réel de séries répondues vs présentées (`sessionCompletionStatus: "complete" | "partial" | "skipped_all"`), sans imputation ni affichage artificiellement complet.

### 5.3 Prétest cognitif formatif qualitatif (comparaison d'ordre et des formulations V0.3)

**Condition préalable bloquante :** **le prétest cognitif ne doit pas être lancé avant la validation humaine du catalogue candidat V0.3** issu de [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md).

Une fois le catalogue candidat validé pour le prétest, mener une **étude formative qualitative** par entretiens cognitifs (*think-aloud* + *verbal probing*, Willis 2005 ; *Pretesting DCEs*, `PMC10894089`) auprès de **8 à 12 participants diversifiés** (âge, territoire, rapport au politique, littératie numérique).

- **Statut méthodologique du prétest :** cet effectif qualitatif (`8 à 12` personnes) permet d'observer la compréhension de la consigne D1 V0.3 et des 8 enjeux descriptifs, les ambiguïtés lexicales, les difficultés sur les états de réponse et d'éventuels indices d'amorçage, mais **ne constitue pas une expérience statistique permettant d'estimer un effet causal de l'ordre**, ni une démonstration statistique de neutralité.
- **Comparaison exploratoire des deux ordres :** répartir les entretiens entre :
  - **Bras principal (V0.3) :** Présentation de la méthode → MaxDiff (enjeux descriptifs) → Enjeux manquants / Expression libre → Raisons (0–2 enjeux).
  - **Bras comparatif (variante ex-Ordre A) :** Expression libre (P0.2) → Présentation de la méthode & Panorama → MaxDiff → Raisons (0–2 enjeux).
- **Observations qualitatives ciblées pour V0.3 :**
  - compréhension de la nouvelle consigne D1 (*« recevoir le plus d'attention / pourraient attendre »*) sans la confondre avec une prise de position pour/contre une solution ;
  - compréhension de « pourrait attendre » ≠ « sans importance » ≠ « je m'y oppose » ;
  - distinction entre priorité relative collective, gravité perçue, et préoccupation personnelle ;
  - détection de conceptions implicites (modèle unique du travail, du logement, de la famille, de l'éducation, de la protection sociale ou des institutions) ou de doubles interprétations entre cartes (ex. santé vs protection sociale) ;
  - comparabilité perçue de granularité entre les 8 cartes ;
  - clarté des états `skipped`, `dont_know`, `no_distinguishable_best_worst` et du signalement orthogonal (`outside_collective_scope`, `loaded_wording`, etc.).

---

## 6. Contrats de données cibles (validation Zod `.strict()`, client-only)

*(Mise en cohérence détaillée avec [`03_DATA_MODEL.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/03_DATA_MODEL.md) et réconciliation avec le socle P0.2. Note de continuité V0.2 → V0.3 : les noms techniques existants des interfaces de spécification `EditorialSituation`, `MissingSituationReport`, `MaxDiffSituationSummary` et `situationsCatalogVersion` sont provisoirement conservés pour stabilité documentaire avec le suffixe/sens explicite qu'ils modélisent désormais un **enjeu collectif descriptif** au sens de D1 V0.3 — un renommage éventuel en `EditorialIssue` / `MissingIssueReport` avant l'implémentation `P1.1-impl` reste un choix purement lexical réversible.)*

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
3. **`PriorityObservation` :**
   `{ taskId, designId, designVersion, designSeed, blockId, blockIndex, itemOrder: [string, string, string, string], responseState: MaxDiffResponseState, bestItemId: string | null, worstItemId: string | null, noDistinguishableReason: NoDistinguishableBestWorstReason | null, noDistinguishableReasonNote?: string, flaggedItemIds: string[], methodVersion, timestamp }`.
   - **Invariants Zod `.strict()` :**
     - `itemOrder` contient exactement 4 identifiants distincts du catalogue ;
     - `flaggedItemIds` contient uniquement des identifiants uniques appartenant tous à `itemOrder`, et reste **totalement orthogonal** à `responseState` (peut être non vide avec `answered` comme avec `skipped`, `dont_know` ou `no_distinguishable_best_worst`) ;
     - si `responseState === "answered"` : `bestItemId !== null`, `worstItemId !== null`, `bestItemId !== worstItemId`, les deux appartiennent à `itemOrder`, `noDistinguishableReason === null`, et `noDistinguishableReasonNote` absent ;
     - si `responseState !== "answered"` (`skipped`, `dont_know`, `no_distinguishable_best_worst`) : `bestItemId === null` et `worstItemId === null` ;
     - si `responseState === "no_distinguishable_best_worst"` : `noDistinguishableReason` vaut `NoDistinguishableBestWorstReason | null` (facultatif), et `noDistinguishableReasonNote` (chaîne bornée non vide après trim) n'est autorisé que lorsque `noDistinguishableReason === "other"` ;
     - si `responseState !== "no_distinguishable_best_worst"` : `noDistinguishableReason === null` et `noDistinguishableReasonNote` absent.
4. **Agrégat descriptif `MaxDiffSituationSummary` :**
   `{ situationId, totalPresentedCount, answeredExposures, bestCount, worstCount, neitherBestNorWorstCount, skippedCount, dontKnowCount, noDistinguishableCount, flaggedCount }`.
   *(Aucun champ `middleCount`, `bMinusW`, `latentScore`, `percentage` ou `rank`.)*
5. **`EditorialSituation` (modélisant un enjeu collectif descriptif D1 V0.3) :**
   `{ id, shortLabel, fullFormulation, scopeIncludedNote, scopeExcludedNote, broadDomainTag, editorialStatus: "pilot_draft" | "pluralist_reviewed", catalogVersion }`.
   - Identifiants strictement opaques, sans sémantique thématique ni classement caché ;
   - `shortLabel` : libellé court neutre et descriptif (sans verbe normatif orienté ni solution) ;
   - `fullFormulation` : formulation descriptive complète de l'enjeu collectif ;
   - `scopeIncludedNote` / `scopeExcludedNote` (ou `clarificationNote` structurée) : note de périmètre non prescriptive clarifiant ce que la carte couvre et exclut ;
   - `catalogVersion` : `"pilot-v0.3-draft"` tant que le catalogue candidat n'a pas été arbitré et validé pluralistement.
6. **`ItemComprehensionFlag` (orthogonal à `MaxDiffResponseState`) :**
   `{ itemId, blockId?: string, reason: "too_vague" | "incomprehensible" | "outside_collective_scope" | "loaded_wording", comment?: string, createdAt }`.
   - `outside_collective_scope` : *« hors périmètre des choix collectifs / ne me semble pas relever d'un arbitrage collectif »* (distinct de l'absence de préoccupation personnelle égotropique) ;
   - `loaded_wording` : formulation perçue comme orientée, présupposant une solution, une cause ou un modèle unique.
7. **`MissingSituationReport` :** `{ id, text, clarification?, createdAt, confirmedByUser }` (recueil séparé des enjeux collectifs jugés manquants, jamais injectés dans MaxDiff).
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
  - Navigation clavier intégrale, ordre de focus logique et gestion du focus au changement de série ou à l'ouverture d'un volet de périmètre / signalement inline ;
  - Libellés explicites associés, annonces `aria-live` sobres, aucune information portée uniquement par la couleur, zones tactiles suffisantes sur mobile.
- **Gouvernance éditoriale (`08_GOVERNANCE_CONTENT.md`) :**
  - Le jeu candidat V0.3 porte le statut `pilot-v0.3-draft` (`pilot_draft`) et n'est ni validé, ni présumé neutre. Toute mise en production publique généralisée reste subordonnée à une revue pluraliste documentée et aux résultats du prétest cognitif.

---

## 8. Synthèse opérationnelle : validé, hypothèses restantes, paliers et critères d'acceptation

### 8.1 Éléments validés (V0.3)

1. **Construit mesuré (`D1` V0.3 validée) :** *« La priorité relative que l'utilisateur souhaite voir accorder aux différents enjeux collectifs dans les choix à venir. »*
2. **Origine et séparation des items (`D2` conservée, `D3` alignée sur D1 V0.3) :** bibliothèque éditoriale commune (`pilot-v0.3-draft` tant que non validée) pour MaxDiff ; recueil séparé des enjeux manquants et préoccupations personnelles sans insertion automatique dans les séries MaxDiff ; unité homogène **enjeu collectif formulé de façon descriptive** (sans direction normative, solution, cause non établie ni modèle unique).
3. **Configuration expérimentale pilote (`D4` conservée) :** `N = 8` enjeux, `b = 8` séries, `k = 4` enjeux par série, `r = 4` présentations par enjeu, avec `N = 7` (BIBD exact `(7,4,2)`) conservé comme plan exact de comparaison ; randomisation contrôlée `randomize_pilot_n8_dihedral` ($\pi \times \tau \times D_8$) vérifiée `1000/1000` sur 1 000 graines distinctes dans [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py).
4. **Politique statistique et restitution (conservée) :** aucun classement individuel ni score latent publié en P1.1 (garde-fou de validité) ; restitution exclusivement descriptive (`answeredExposures`, `bestCount`, `worstCount`, `neitherBestNorWorstCount`, statuts incomplets explicites).
5. **Protocole UX nominal et séparation états/signalements (conservés et mis à jour sur D1 V0.3) :** ordre principal `Présentation → MaxDiff → Enjeux manquants / expression libre → Raisons (0 à 2)` ; 4 états de réponse orthogonaux à `flaggedItemIds` et `ItemComprehensionFlag` (`outside_collective_scope`, `loaded_wording`, etc.) ; aucune substitution automatique d'item ; conservation explicite des données incomplètes.
6. **Lot backlog :** consolidé sous l'identifiant **`P1.1`** dans [`07_BACKLOG.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/07_BACKLOG.md).

### 8.2 Hypothèses et points ouverts restants (avant prétest puis pilote public)

1. **Arbitrage humain et sélection des 8 enjeux du catalogue candidat V0.3 :** les formulations proposées dans [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) sont un brouillon de travail sans prétention de neutralité démontrée ; elles nécessitent un arbitrage humain (périmètre des 8 cartes, variantes lexicales délicates, séparation ou couplage de domaines) avant tout prétest cognitif.
2. **Formulations exactes de la consigne et des pôles Best/Worst :** la consigne de travail V0.3 (*« Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient recevoir le plus d'attention, et lesquels pourraient attendre ? »*) et les libellés des pôles doivent être qualifiés lors des entretiens cognitifs.
3. **Effet d'ordre (Ordre principal V0.3 vs Expression libre avant MaxDiff) :** les indices qualitatifs d'amorçage dans les deux sens seront explorés lors de l'étude formative qualitative (`8 à 12` personnes), sans prétendre estimer statistiquement un effet causal de l'ordre.
4. **Paramètres `k = 4, r = 4` et taille `N = 8` :** hypothèse initiale raisonnable pour la lisibilité mobile, réévaluée ultérieurement face à `k = 5` (ou à $N = 9..10$) après le premier pilote.
5. **Ergonomie des notes de périmètre, des états de non-réponse et du signalement orthogonal :** vérifier en entretien que l'accès facultatif au périmètre (inclus/exclu) reste fluide sur mobile et que la séparation répondre/passer/NSP/`no_distinguishable_best_worst` + signalement orthogonal est bien comprise.

### 8.3 Paliers d'autorisation et critères d'acceptation de la future implémentation `P1.1`

#### Paliers de démarrage distincts (ordre impératif)
0. **Palier 0 — Arbitrage éditorial humain du catalogue candidat V0.3 (bloquant) :**
   - Examen explicite par le concepteur / comité éditorial des décisions ouvertes listées dans [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) pour retenir un jeu provisoire cohérent de 8 enjeux descriptifs (`pilot-v0.3-candidate`).
   - **Tant que ce palier n'est pas validé humainement, ni l'implémentation applicative, ni le prétest cognitif ne doivent démarrer.**
1. **Palier 1 — Autorisation de développer un prototype interne (hors diffusion publique) :**
   - Subordonnée à la **validation humaine explicite de la présente spécification V0.3 et du jeu de 8 enjeux provisoire retenu au Palier 0**.
   - Autorise l'utilisation de ce jeu provisoire, obligatoirement identifié comme tel (`editorialStatus: "pilot_draft"`, étiquette visible `pilot-v0.3` — brouillon provisoire non validé pluralistement), strictement en mémoire navigateur et hors indexation / hors accès public.
2. **Palier 2 — Conditions requises pour réaliser le prétest cognitif (`8 à 12` personnes) :**
   - Validation humaine préalable du catalogue candidat (Palier 0) ;
   - Support interactif (maquette ou prototype interne local conforme aux invariants de confidentialité) présentant les deux ordres comparables et les notes de périmètre facultatives ;
   - Conduite comme une **étude formative qualitative** (*think-aloud* + *verbal probing*, recueil de consentement d'entretien hors base de production), et non comme une expérience statistique d'estimation causale de l'ordre.
3. **Palier 3 — Conditions requises pour l'ouverture d'un pilote public :**
   - **Revue éditoriale pluraliste documentée** des 8 enjeux (`editorialStatus: "pluralist_reviewed"`, charte et critères publiés selon [`08_GOVERNANCE_CONTENT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/08_GOVERNANCE_CONTENT.md)) ;
   - **Validation cognitive qualitative des formulations** (8 cartes, notes de périmètre, consigne D1 V0.3, libellés Best/Worst, états de réponse, signalements) avec traçabilité des ajustements ;
   - Satisfaction intégrale des critères techniques, d'accessibilité, de confidentialité et d'examen RGPD ci-dessous.

#### Critères d'acceptation techniques (tranche d'implémentation future `P1.1-impl`)
1. **Qualité domaine & invariants mathématiques (`Vitest`, module pur sans dépendance React/Next.js) :**
   - Catalogue figé et vérifié du plan canonique `N = 8` (et référence `N = 7` pour tests de comparaison).
   - `instantiateControlledMaxDiffPlan` applique strictement $\pi \in S_8$, $\tau \in S_4$ et $D_8$ : 100 % des graines testées préservent `r = 4`, `[1, 1, 1, 1]`, zéro doublon intra-bloc, zéro bloc dupliqué, et `max_consecutive_overlap === 1` (linéaire et cyclique `B8 → B1`) pour `N = 8`.
   - `summarizeMaxDiffObservations` produit exclusivement des comptages descriptifs (`totalPresentedCount`, `answeredExposures`, `bestCount`, `worstCount`, `neitherBestNorWorstCount`, `skippedCount`, `dontKnowCount`, `noDistinguishableCount`, `flaggedCount`), sans jamais calculer ni exposer de score `B - W`, d'utilité latente, de pourcentage de priorité ou de rang.
   - Validation Zod `.strict()` complète des schémas (`EditorialSituation`, `PriorityObservation`, `MaxDiffResponseState`, `NoDistinguishableBestWorstReason`, `ItemComprehensionFlag`, `MissingSituationReport`, `ReasonExploration`, `CausalBeliefClaim`), incluant l'orthogonalité de `flaggedItemIds` et le rejet des `PROHIBITED_PROFILE_KEYS`.
2. **Comportement UX & accessibilité (`Testing Library` + `Playwright` + `axe-core`) :**
   - Parcours nominal complet fonctionnel sur desktop et mobile (`Présentation → MaxDiff → Enjeux manquants / expression libre → Raisons 0–2 → Synthèse descriptive`), avec étiquette visible `pilot-v0.3` tant que le catalogue est provisoire et accès clavier au volet de périmètre inclus/exclu.
   - Sélection mutuellement exclusive Best/Worst, correction arrière possible sur toute série précédente, navigation clavier 100 % fonctionnelle, zéro violation critique/sérieuse `axe-core` WCAG 2.2 AA.
   - Vérification de l'orthogonalité et de la non-substitution : pouvoir signaler une carte tout en conservant une réponse `answered`, ou passer/indiquer `no_distinguishable_best_worst` tout en gardant le signalement séparé, sans jamais remplacer une carte ni afficher une restitution artificiellement complète.
   - Vérification des bornes 0 à 2 raisons, symétrie (possibilité d'expliquer un enjeu placé « pourrait attendre »), et séparation déclarative des convictions causales (`user_stated_unverified`).
3. **Confidentialité & sécurité (`Playwright` test canari + revue de diff) :**
   - Test canari prouvant qu'aucun texte saisi (enjeu manquant, raison libre, constat causal, commentaire de signalement ou note `other`) ni aucun choix MaxDiff ne transite par une requête réseau, une URL, un log console/serveur, un cookie, `localStorage`, `sessionStorage` ou `IndexedDB`.
   - Bouton « Effacer ma session » réinitialisant intégralement l'état P0.2 + P1.1 en mémoire.
   - Zéro `dangerouslySetInnerHTML`, zéro `any` non justifié, zéro dépendance non approuvée ; `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e` et `pnpm build` passent intégralement sous Node 24 LTS.
