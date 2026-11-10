# Décision expérimentale MaxDiff — Pilote P1.1 (`pilot-v0.3-draft`)

**Version :** 0.3 — 10 novembre 2026 *(mise en cohérence avec la révision officielle de D1 dans `P1_1_D1_DECISION_v0.3.md` ; historique V0.2.1 conservé — aucun paramètre mathématique ni aucune décision D2–D4 modifiés)*  
**Historique des versions :**  
- **0.2.1 (10 novembre 2026) :** randomisation $D_8$ vérifiée sur 1 000 graines, orthogonalité des états/signalements et paliers de démarrage (voir [`P1_1_SPECIFICATION_v0.2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.2.md)).  
- **0.3 (10 novembre 2026) :** alignement terminologique sur D1 V0.3 (*enjeux collectifs formulés de façon descriptive*), rattachement à [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) et [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md) ; maintien strict de `N = 8`, `k = 4`, `r = 4` et de la référence exacte `N = 7`.  
**Statut :** décision de conception des plans validée pour la spécification P1.1 V0.3 ; **aucune implémentation applicative ni aucun prétest cognitif ne sont autorisés avant arbitrage humain du catalogue candidat [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md), suivi de la revue éditoriale pluraliste et de la validation cognitive avant toute ouverture publique (voir [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) § 8.3).**  
**Artefacts de référence :**
- Décision D1 V0.3 : [`P1_1_D1_DECISION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_D1_DECISION_v0.3.md)
- Spécification consolidée V0.3 : [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md)
- Catalogue candidat (brouillon) : [`CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/CATALOGUE_SITUATIONS_PILOT_v0.3_DRAFT.md)
- Générateur reproductible : [`audit_maxdiff_designs.py`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/audit_maxdiff_designs.py) (graine `20261110`)
- Rapport métriques : [`METRICS_REPORT.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/METRICS_REPORT.md)
- Plans exportés : [`designs_N6_to_N13.json`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.json) et [`designs_N6_to_N13.csv`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.csv)
- Revue indépendante : [`CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/CIVIC_EXPLORER_P1_1_INDEPENDENT_REVIEW.md)

---

## 1. Décision retenue pour le premier pilote

1. **Configuration pilote proposée : `N = 8` enjeux collectifs** (`b = 8` séries/blocs, `k = 4` enjeux par série, `r = 4` présentations par enjeu).
2. **Plan exact de référence conservé pour comparaison : `N = 7` enjeux** (BIBD symétrique exact `(7, 4, 2)`, complément du plan de Fano $PG(2,2)$).
3. **Statut des paramètres UX (`k = 4`, `r = 4`) :** paramètres initiaux retenus pour le pilote `pilot-v0.3`, sans prétendre qu'il s'agit d'une configuration universellement optimale. Une comparaison future avec `k = 5` éléments par série est documentée (§ 6).
4. **Restitution et politique d'incomplétude :** aucun classement individuel ni utilité latente estimée en P1.1 ; restitution strictement descriptive des choix observés ; aucune substitution dynamique d'item incompréhensible ou impossible à départager ; conservation explicite des séries incomplètes.
5. **Indépendance vis-à-vis de la validation éditoriale :** la validation de ce plan mathématique `N = 8` ne valide aucune formulation éditoriale particulière des enjeux (voir `P1_1_D1_DECISION_v0.3.md` § 8).

---

## 2. Documentation formelle de la D-efficacité (`D-eff`)

Conformément aux contrôles de la revue indépendante et à l'implémentation exacte dans `audit_maxdiff_designs.py`, les métriques de D-efficacité rapportées dans `METRICS_REPORT.md` reposent sur les six spécifications suivantes :

### 2.1 Modèle utilisé
Modèle **logit conjoint Best-Worst Scaling (BWS Case 1 / MaxDiff)** (Marley & Louviere, 2005). Pour un bloc $S_t \subset \{1, \dots, N\}$ de taille $k = 4$, le choix conjoint d'un item $b$ (« devrait recevoir le plus d'attention », formulation à prétester sous D1 V0.3) et d'un item $w \neq b$ (« pourrait attendre ») est modélisé par :

$$P(b, w \mid S_t, \beta) = \frac{\exp(\beta_b - \beta_w)}{\sum_{\substack{i, j \in S_t \\ i \neq j}} \exp(\beta_i - \beta_j)}$$

où $\beta = (\beta_1, \dots, \beta_N)^\top \in \mathbb{R}^N$ désigne le vecteur des utilités latentes des $N$ enjeux collectifs présentés, sous l'hypothèse d'indépendance conditionnelle des réponses entre les $b$ blocs et d'échelle normalisée à $1$.

### 2.2 Matrice d'information
Pour un plan complet de $b$ blocs, soit $\Lambda$ la matrice symétrique $N \times N$ des cooccurrences de paires ($\Lambda_{ii} = 0$, et $\Lambda_{ij} = \lambda_{ij}$ égal au nombre de blocs contenant simultanément les items $i$ et $j$ pour $i \neq j$), et soit son Laplacien pondéré :

$$L_\Lambda = \operatorname{diag}(\Lambda \mathbf{1}) - \Lambda$$

Au point d'évaluation choisi, chaque bloc $S_t$ de taille $k$ génère $k(k-1)$ paires ordonnées $(i, j)$ équiprobables et contribue pour $\frac{2}{k(k-1)} L_{S_t}$ à l'information de Fisher (où $L_{S_t}$ est le Laplacien du sous-graphe complet $K_k$ sur $S_t$). La matrice d'information de Fisher complète pour $k = 4$ vaut donc :

$$\mathcal{I}(0) = \frac{2}{k(k-1)} L_\Lambda = \frac{1}{6} L_\Lambda$$

### 2.3 Paramétrisation
Le modèle étant invariant par translation $\beta \mapsto \beta + c\mathbf{1}$, $L_\Lambda \mathbf{1} = 0$ et $\operatorname{rang}(\mathcal{I}(0)) \le N - 1$ (avec égalité à $N - 1$ si et seulement si le graphe de cooccurrence est connexe). L'identifiabilité exige $N - 1$ paramètres indépendants :

- **Codage par item de référence** ($\beta_N = 0$, utilisé dans `compute_fisher_pairwise_se` d'`audit_maxdiff_designs.py`) : matrice d'information réduite $\mathcal{I}_{\text{red}}(0) = \frac{1}{6} (L_\Lambda)_{1:N-1,\, 1:N-1}$. Par le théorème de Kirchhoff (Matrix-Tree), $\det(\mathcal{I}_{\text{red}}(0)) = \frac{1}{N} \left(\frac{1}{6}\right)^{N-1} \prod_{m=2}^{N} \mu_m(L_\Lambda)$.
- **Codage par contrastes orthonormés** ($\theta = C^\top \beta \in \mathbb{R}^{N-1}$ avec $C^\top \mathbf{1} = 0$ et $C^\top C = I_{N-1}$) : $\mathcal{I}_\theta(0) = \frac{1}{6} C^\top L_\Lambda C$, dont le déterminant vaut $\left(\frac{1}{6}\right)^{N-1} \prod_{m=2}^{N} \mu_m(L_\Lambda)$.

Les facteurs constants $\frac{1}{N}$ et $\left(\frac{1}{6}\right)^{N-1}$ s'annulant exactement dans le rapport au design de référence, la D-efficacité est identique sous ces deux paramétrisations.

### 2.4 Point de calcul des coefficients
Évaluation **locale à $\beta = 0$** (hypothèse nulle d'indifférence $H_0$, critère *locally D-optimal at $\beta = 0$*). Ce point neutre évite de postuler un ordre a priori des enjeux, mais rend la métrique conditionnelle au voisinage de $\beta = 0$.

### 2.5 Design de référence
**Plan continu idéal parfaitement équilibré par paires** disposant exactement du même budget $(N, b, k, r)$ (même nombre total d'incidences de paires $b\binom{k}{2} = \frac{Nr(k-1)}{2}$ réparti uniformément sur les $\binom{N}{2}$ paires) :

$$\bar{\lambda} = \frac{r(k-1)}{N-1} = \frac{12}{N-1} \quad (\text{pour } b = N, k = r = 4)$$

Son Laplacien idéal est $L_{\text{idéal}} = \bar{\lambda}(N I_N - \mathbf{1}\mathbf{1}^\top)$, dont les $N - 1$ valeurs propres non nulles sont toutes égales à :

$$\mu_{\text{idéal}} = N\bar{\lambda} = \frac{N r (k-1)}{N-1}$$

Pour $N = 7$ ($\bar{\lambda} = 2$, $N\bar{\lambda} = 14$) et $N = 13$ ($\bar{\lambda} = 1$, $N\bar{\lambda} = 13$), ce design idéal correspond à un BIBD discret réalisable. Pour $N = 8$ ($\bar{\lambda} = 12/7 \approx 1.7143$, $N\bar{\lambda} = 96/7 \approx 13.7143$), il s'agit d'une borne continue théorique.

### 2.6 Formule exacte
Soient $0 = \mu_1(L_\Lambda) \le \mu_2(L_\Lambda) \le \dots \le \mu_N(L_\Lambda)$ les valeurs propres de $L_\Lambda$. La D-efficacité normalisée vaut :

$$D_{\mathrm{eff}} = \left[ \frac{\det(\mathcal{I}_{\text{red}}(0))}{\det(\mathcal{I}_{\text{idéal, red}}(0))} \right]^{\frac{1}{N-1}} = \left[ \frac{\prod_{m=2}^{N} \mu_m(L_\Lambda)}{(N\bar{\lambda})^{N-1}} \right]^{\frac{1}{N-1}} = \frac{\left(\prod_{m=2}^{N} \mu_m(L_\Lambda)\right)^{\frac{1}{N-1}}}{N\bar{\lambda}}$$

Si le graphe n'est pas connexe ($\mu_2(L_\Lambda) = 0$), alors $D_{\mathrm{eff}} = 0$.

---

## 3. Distinction entre régularité combinatoire, connectivité et efficacité statistique

| Dimension | Ce qu'elle vérifie | Illustration sur les plans P1.1 | Limite d'interprétation |
|---|---|---|---|
| **Régularité combinatoire** | Équilibre discret des fréquences d'items ($r_i = 4$), taille des blocs ($k = 4$), absence de doublons, équilibre exact des positions (`[1, 1, 1, 1]`), étendue et variance des cooccurrences $\lambda_{ij}$. | $N = 7$ est un BIBD exact ($\lambda_{ij} = 2$, variance $0$) ; $N = 8$ est quasi équilibré optimal ($\lambda_{ij} \in \{1, 2\}$, histogramme `1:8, 2:20`, variance `0.2041` égale à la borne théorique). | Deux plans ayant exactement le même histogramme de paires et la même variance peuvent être non isomorphes (constaté dans `METRICS_REPORT.md` pour $N = 6$ et $N = 9$). |
| **Connectivité du graphe** | Propriété topologique du graphe de cooccurrence $G_\Lambda$ : existence d'un chemin entre toute paire d'items ($1$ composante connexe $\iff \mu_2(L_\Lambda) > 0$). | Condition nécessaire d'identifiabilité de tous les contrastes $\beta_i - \beta_j$. Pour $N = 7$ ($\mu_2 = 14.00$) et $N = 8$ ($\mu_2 = 12.00$), toute paire est même directement co-présentée au moins une fois ($\lambda_{ij} \ge 1$). | Un plan nominal connexe peut perdre sa connectivité *observée* si un participant passe plusieurs séries ciblées (`MNAR`). |
| **Efficacité statistique** | Capacité du plan à réduire l'incertitude des contrastes sous un modèle probabiliste donné et en un point $\beta$ donné (mesurée par $D_{\mathrm{eff}}$ et les SE locales de Fisher). | À $\beta = 0$ sous logit conjoint BWS Case 1, $N = 8$ atteint $D_{\mathrm{eff}} = 0.995677$ ($99.57\,\%$ du plan idéal continu à $r=4$), avec $\mathrm{SE}(\hat{\beta}_i - \hat{\beta}_j) \in [0.9282,\, 0.9634]$ logits. | $D_{\mathrm{eff}} = 99.57\,\%$ compare au plan idéal **à budget constant (`r = 4`)** ; il ne garantit ni une petite erreur absolue individuelle, ni la validité sémantique des énoncés. |

**Note terminologique sur `METRICS_REPORT.md` (remarque § 4 de la revue indépendante) :** dans le tableau de synthèse de `METRICS_REPORT.md` (colonne `b_min arithm. si BIBD (k=4)`, anciennement libellée `b_min si BIBD`), les valeurs `15, 7, 14, 18, 15, 55, 33, 13` pour $N=6..13$ correspondent au plus petit nombre de blocs satisfaisant les **conditions arithmétiques nécessaires** d'un BIBD à $k=4$ (`r*3 = lambda*(N-1)`, `4*b = N*r`, `b >= N`), sans constituer une construction explicite réalisée dans l'audit pour les tailles $N \notin \{7, 13\}$.

---

## 4. Comparaison structurée : Pilote `N = 8` vs Référence exacte `N = 7`

| Critère | Plan exact de référence (`N = 7`) | Plan pilote retenu (`N = 8`) | Incidence pour le pilote |
|---|---|---|---|
| **Nature combinatoire** | BIBD symétrique exact `(7, 4, 2)` (complément de Fano $PG(2,2)$) | Plan cyclique quasi équilibré optimal | `N = 8` évite de contraindre la couverture éditoriale à 7 domaines tout en gardant un écart minimal à l'équilibre exact. |
| **Blocs × taille × répétitions** | `b = 7`, `k = 4`, `r = 4` | `b = 8`, `k = 4`, `r = 4` | +1 écran (~15–20 s), couverture de 8 enjeux collectifs distincts. |
| **Ratio bloc / catalogue (`k / N`)** | `4 / 7 ≈ 57.14 %` (`> 50 %`) | **`4 / 8 = 50.00 %` (`≤ 50 %`)** | `N = 8` respecte le seuil recommandé par Orme (2005) limitant la redondance par écran. |
| **Chevauchement entre blocs consécutifs** | **`2` items communs** sur `4` à chaque transition (propriété duale du BIBD $(7,4,2)$) | **`1` item commun** sur `4` à chaque transition (`max = 1`, `moy = 1.00`, y compris bouclage `B8 → B1`) | `N = 8` divise par deux le chevauchement visuel écran-à-écran, réduisant la lassitude et l'impression de répétition. |
| **Distribution des paires $\lambda_{ij}$** | `2:21` (min `2`, max `2`, variance `0.0000`) | `1:8, 2:20` (min `1`, max `2`, moyenne `1.7143`, variance `0.2041` = borne théorique) | Zéro paire omise dans les deux cas ; écart minimal possible compte tenu de $\bar{\lambda} = 12/7 \notin \mathbb{Z}$. |
| **Équilibre des positions** | Exact `[1, 1, 1, 1]` | Exact `[1, 1, 1, 1]` | Contrôle exact du biais de position (*primacy/recency*) dans les deux plans. |
| **Connectivité algébrique $\mu_2(L_\Lambda)$** | `14.0000` | `12.0000` | Graphe complet et fortement connexe dans les deux cas. |
| **D-efficacité ($\beta = 0$)** | `1.0000` (`100.00 %`) | `0.995677` (`99.57 %`) | Perte de D-efficacité inférieure à `0.44` point de pourcentage par rapport au plan idéal continu. |
| **SE Fisher théorique à $\beta = 0$ (logits)** | `0.9258` uniforme | min `0.9282` / moy `0.9393` / max `0.9634` | Information individuelle du même ordre de grandeur (limitée dans les deux cas par $r=4$, sans score individuel publié). |

### Séquence canonique retenue pour `N = 8` (`designs_N6_to_N13.json`, indices 1..8)

`B1: [2, 3, 1, 5]`, `B2: [8, 5, 4, 6]`, `B3: [3, 7, 8, 1]`, `B4: [6, 2, 3, 4]`, `B5: [1, 6, 5, 7]`, `B6: [4, 1, 2, 8]`, `B7: [5, 4, 7, 3]`, `B8: [7, 8, 6, 2]`.

Chaque paire de blocs consécutifs $(B_t, B_{t+1})$ ainsi que $(B_8, B_1)$ partage exactement **1 item**, tandis que toutes les paires de blocs non adjacents dans le cycle partagent exactement **2 items**.

---

## 5. Règle de randomisation contrôlée exigée pour l'implémentation pilote (`N = 8`)

Une vérification directe sur la séquence canonique `N = 8` ci-dessus montre que, sur les $8! = 40\,320$ permutations possibles de l'ordre des 8 blocs, **seules `16` permutations conservent un chevauchement consécutif $\le 1$** (exactement les $2 \times 8 = 16$ transformations du groupe diédral $D_8$ : `8` rotations circulaires de la séquence × `2` sens de parcours, direct ou inversé).

**Vérification reproductible dans `audit_maxdiff_designs.py` :**
- La fonction exploratoire `randomize_design_controlled` ($\pi \in S_N \times \tau \in S_4 \times \sigma \in S_N$, avec `rng.shuffle` sur les blocs) est conservée uniquement pour comparaison documentée : sur `1 000` tirages à graines distinctes pour `N = 8`, elle préserve les invariants hors ordre (`[1,1,1,1]`, `r=4`, cooccurrences/connectivité, zéro doublon) dans `1000/1000` essais, mais échoue sur `max_consecutive_overlap = 1` (`0/1000` linéaire et `0/1000` cyclique, max observé `= 2`).
- La fonction dédiée au pilote **`randomize_pilot_n8_dihedral`** applique strictement :

1. une **bijection aléatoire $\pi \in S_8$** assignant les 8 enjeux éditoriaux aux indices canoniques `1..8` ;
2. une **permutation globale aléatoire $\tau \in S_4$** des 4 positions d'affichage au sein de la session ;
3. un **décalage circulaire aléatoire $s \in \{0, \dots, 7\}$ et un sens de lecture $\delta \in \{+1, -1\}$** ($D_8$) sur la séquence canonique des 8 blocs.

Sur **1 000 essais reproductibles à graines distinctes** (`20261110 + 8000000 + trial_index`), `randomize_pilot_n8_dihedral` préserve dans **`1000/1000` essais** l'ensemble des invariants vérifiés : équilibre exact des positions `[1, 1, 1, 1]`, fréquence uniforme `r = 4`, matrice/histogramme des cooccurrences `{1:8, 2:20}` et connectivité ($\mu_2 = 12.00$), zéro bloc dupliqué et unicité intra-bloc, `max_consecutive_overlap = 1` (linéaire) **et** bouclage cyclique `B8 → B1 = 1` (contre `0/1000` en mélange naïf par bloc sur `[1, 1, 1, 1]`).

---

## 6. Statut de `k = 4, r = 4` et possibilités de comparaison future avec `k = 5`

Le choix **`k = 4` enjeux par série et `r = 4` présentations par enjeu** constitue l'**hypothèse initiale** du pilote P1.1, justifiée par la sobriété de lecture (notamment sur mobile avec des formulations descriptives précises), le ratio $k/N = 50\,\%$ pour $N=8$ et l'équilibre exact des 4 positions en 8 séries. **Il ne doit pas être présenté comme universellement optimal.**

Une comparaison future avec **`k = 5` enjeux par série** reste pertinente sous réserve d'un protocole expérimental dédié (`04_METHODS.md` § 9) tenant compte des contraintes suivantes :

- **Compromis information / charge cognitive :** passer de `k = 4` à `k = 5` augmente le nombre de paires implicites comparées par écran ($\binom{5}{2} = 10$ au lieu de $6$, soit 20 paires ordonnées au lieu de 12, $\mathcal{I}_S(0) = \frac{1}{10} L_S$), mais alourdit la charge de balayage visuel et peut accentuer les heuristiques de position ou le *satisficing* sur petit écran.
- **Contraintes arithmétiques avec `k = 5` :**
  - Si l'on maintient `r = 4`, l'égalité $5b = 4N$ impose que $N$ soit multiple de $5$ (ex. $N = 10, b = 8$) et **empêche** d'équilibrer les 5 positions (`r = 4 < 5`).
  - Si l'on maintient `b = N` (une série par item, équilibre des 5 positions `[1, 1, 1, 1, 1]`), cela impose **`r = 5`** présentations par item. À `N = 8`, $k/N = 62.5\,\% > 50\,\%$ et le chevauchement consécutif atteint au moins `5 + 5 - 8 = 2` items par transition. La taille `k = 5` devient donc combinatoirement plus naturelle si le catalogue s'élargit à **`N = 10` (`k/N = 50 %`) ou `N = 11` (BIBD exact biplan `(11, 5, 2)` avec `r = 5`)**.
- **Critères de comparaison future (`k = 4` vs `k = 5`) :** temps de réponse par écran, taux de `skipped` / `no_distinguishable_best_worst` / abandon, cohérence interne sur bloc dupliqué ou retest qualitatif, et fatigue perçue sur mobile.

---

## 7. Règles strictes d'intégrité des données pendant l'exécution du plan

1. **Aucune substitution automatique d'item :** si un participant signale un enjeu via `ItemComprehensionFlag` / `flaggedItemIds` ou indique `no_distinguishable_best_worst`, le plan fixe de 8 séries n'est ni recalculé ni patché avec un nouvel enjeu.
2. **Conservation explicite de l'incomplétude et orthogonalité :** le signalement d'une carte (`flaggedItemIds`) est orthogonal à `MaxDiffResponseState` (`answered`, `skipped`, `dont_know`, `no_distinguishable_best_worst`) ; un utilisateur peut signaler une formulation tout en conservant une réponse `answered` valide, ou laisser une non-réponse avec signalement séparé. Toute série non répondue conserve son état exact (`bestItemId: null`, `worstItemId: null`) et le calcul descriptif distingue le nombre de séries présentées du nombre de séries effectivement comparées (`answeredExposures`), sans jamais restituer une session partielle comme complète.
