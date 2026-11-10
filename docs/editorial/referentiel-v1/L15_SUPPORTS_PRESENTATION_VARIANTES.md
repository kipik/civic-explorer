# L15 — Supports de présentation des Variantes A et B et vérification du plan MaxDiff (`N = 8, k = 4, r = 4`)

**Statut :** **SUPPORTS HARMONISÉS SUR `L11` — PRÊTS POUR DRY RUN INTERNE (PAPIER `2×2`) — ARBITRAGES PRÉTEST EXTERNE À CONFIRMER (`src/` intact)**  
**Sources vérifiées :** [`L11_FORMULATIONS_CONSOLIDEES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L11_FORMULATIONS_CONSOLIDEES.md), [`L13_PROTOCOLE_PRETEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L13_PROTOCOLE_PRETEST_COGNITIF.md), [`L14_KIT_CARTES_MAXDIFF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L14_KIT_CARTES_MAXDIFF.md), [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md) et [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md).

> **Contrainte de comparabilité stricte :**  
> Les Supports **A** et **B** utilisent **exactement** les mêmes huit domaines, les mêmes formulations (`L11` harmonisé après arbitrage `DOM-02` et `DOM-05`), le même périmètre complet consultable (`L14`), la même consigne MaxDiff, les mêmes états de réponse, le même nombre de séries (`b = 8`), la même taille de série (`k = 4`) et les mêmes règles de randomisation (`N = 8, k = 4, r = 4`). **Aucune variante lexicale (`1B`, `2B`, `7B`, `8B`) n'y figure.** La **seule variable expérimentale** est le moment et le mode de découverte des huit domaines.

---

## 1. Tableau de contrôle d'équivalence stricte entre Support A et Support B

| Paramètre du dispositif | Support A — Panorama préalable | Support B — Découverte progressive | Équivalence vérifiée |
|---|---|---|---|
| **Catalogue de domaines** | 8 domaines `DOM-01`..`DOM-08` (`L11` uniquement) | 8 domaines `DOM-01`..`DOM-08` (`L11` uniquement) | **Identique** |
| **Variantes lexicales `1B/2B/7B/8B`** | Absentes pendant tout l'exercice | Absentes pendant tout l'exercice | **Identique** |
| **Information disponible sur les périmètres** | Intitulé + description courte sur l'écran Panorama + volet dépliable/fiche « Périmètre complet des 8 domaines » | Intitulé + description courte sur chaque carte + bouton permanent/classeur « Voir le périmètre complet des 8 domaines » | **Identique** |
| **Exposition initiale avant la Série 1** | **Affichage d'emblée des 8 domaines** (ordre aléatoire par participant) + consigne | **Affichage de la consigne seule** (sans liste préalable des 8 domaines) | **Variable testée** |
| **Découverte au fil des séries** | Les 8 domaines ont déjà été vus au Panorama | Découverte des cartes 4 par 4 à travers les 8 séries (accès facultatif au périmètre complet à tout moment) | **Variable testée** |
| **Consigne principale MaxDiff** | Formule exacte `L13` § 2.2 / D1 V0.3 | Formule exacte `L13` § 2.2 / D1 V0.3 | **Identique** |
| **Paramètres du plan MaxDiff** | `N = 8`, `b = 8` séries, `k = 4` cartes/série, `r = 4` apparitions/domaine | `N = 8`, `b = 8` séries, `k = 4` cartes/série, `r = 4` apparitions/domaine | **Identique** |
| **États de réponse et signalement** | `Devrait recevoir le plus d'attention` / `Pourrait attendre` ; `Passer` ; `Je ne sais pas choisir` ; `Impossible de départager` ; retour arrière ; signalement orthogonal sans substitution | `Devrait recevoir le plus d'attention` / `Pourrait attendre` ; `Passer` ; `Je ne sais pas choisir` ; `Impossible de départager` ; retour arrière ; signalement orthogonal sans substitution | **Identique** |

---

## 2. Vérification de cohérence avec `PILOT_DECISION.md` (`N = 8, k = 4, r = 4`)

### 2.1 Paramètres et séquence canonique vérifiés

Conformément à [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md) (§ 1 et § 4) et à [`designs_N6_to_N13.json`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/designs_N6_to_N13.json) :

- **Dimensions :** `N = 8` domaines, `b = 8` séries (blocs), `k = 4` cartes par série, `r = 4` apparitions par domaine.
- **Séquence canonique `N = 8` (indices abstraits `1` à `8`, positions `1` à `4`) :**
  - `B1 : [2, 3, 1, 5]`
  - `B2 : [8, 5, 4, 6]`
  - `B3 : [3, 7, 8, 1]`
  - `B4 : [6, 2, 3, 4]`
  - `B5 : [1, 6, 5, 7]`
  - `B6 : [4, 1, 2, 8]`
  - `B7 : [5, 4, 7, 3]`
  - `B8 : [7, 8, 6, 2]`
- **Propriétés combinatoires vérifiées dans `PILOT_DECISION.md` :**
  - Équilibre exact des positions `[1, 1, 1, 1]` pour chaque item.
  - Cooccurrences de paires : `{1: 8, 2: 20}` (toutes les 28 paires se rencontrent 1 ou 2 fois, 0 paire omise).
  - Chevauchement entre blocs consécutifs : exactement `1` item commun par transition (y compris bouclage `B8 → B1`).
  - $D_{\mathrm{eff}} = 0.995677$ (`99.57 %`) à $\beta = 0$.

### 2.2 Règle de randomisation contrôlée documentée (`randomize_pilot_n8_dihedral`)

Conformément à [`PILOT_DECISION.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/experiments/maxdiff/PILOT_DECISION.md) (§ 5) et à [`P1_1_SPECIFICATION_v0.3.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/P1_1_SPECIFICATION_v0.3.md) (§ 3.4), chaque instance de passation applique **strictement** $\pi \times \tau \times D_8$ :

1. Tirer une bijection aléatoire $\pi \in S_8$ assignant les huit domaines (`DOM-01`..`DOM-08`) aux indices canoniques `1..8` ;
2. Tirer une permutation globale $\tau \in S_4$ des quatre positions d'affichage au sein de la session ;
3. Tirer un décalage circulaire $s \in \{0, \dots, 7\}$ et un sens de lecture $\delta \in \{+1, -1\}$ du groupe diédral $D_8$ sur la séquence canonique `B1..B8`.

> **Interdit méthodologique rappelé par `PILOT_DECISION.md` :** ne jamais re-mélanger arbitrairement les 8 blocs par une permutation quelconque $\sigma \in S_8$, car cela brise la contrainte `chevauchement consécutif = 1` (et en version papier/statique, ne pas modifier le plan si un participant passe ou signale une carte).

### 2.3 Points à confirmer avant le prétest externe (`12–16` participants) — Périmètre du dry run interne

> **Portée de la décision de dry run interne :** pour la **répétition interne à blanc uniquement** (`DR-INST-1` et `DR-INST-2`, voir [`dry-run/`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/README.md)), le dispositif autorisé utilise le **support papier**, la **disposition en grille `2×2`** et le **livret de périmètre complet accessible** posé fermé sur la table dès `2A`/`2B`. En revanche, les choix ci-dessous **restent ouverts et non approuvés définitivement pour le futur prétest externe** (règle d'appariement A/B, stratification, protocole de randomisation définitif et médium final).

Les documents sources (`PILOT_DECISION.md`, `L13`, `P1_1_SPECIFICATION_v0.3.md`) ne trancient pas les points opérationnels suivants pour le prétest externe. **Ils ne doivent pas être tenus pour approuvés sans décision explicite avant de générer les carnets définitifs des 12 à 16 participants :**

1. **Mode d'appariement des tirages MaxDiff entre Variante A et Variante B (non approuvé pour le prétest externe) :**
   - `L13` § 1.3 indique d'utiliser la séquence canonique avec *« bijection aléatoire différente d'un participant à l'autre »*, sans trancher pour le prétest externe entre :
     - **Option 1 (appariement par paires A/B) :** 6 à 8 instances $(\pi, \tau, s, \delta)$ pré-générées et assignées à l'identique aux paires `(P_A_i, P_B_i)`, de sorte que l'ordre exact de découverte des blocs soit neutralisé entre les deux bras ;
     - **Option 2 (tirage indépendant par participant) :** 12 à 16 instances $(\pi, \tau, s, \delta)$ distinctes tirées indépendamment pour chaque participant.
   - **Point complémentaire :** `PILOT_DECISION.md` documente la graine de base `20261110` pour les 1 000 essais Monte Carlo de `audit_maxdiff_designs.py`, et `P1_1_SPECIFICATION_v0.3.md` prévoit une graine éphémère en navigateur ; aucune table de graines définitives pour les 12–16 carnets externes n'est approuvée à ce jour. *(Seules les deux instances internes d'essai `DR-INST-1` et `DR-INST-2` sont autorisées pour le dry run.)*

2. **Règle d'ordre du bouton/volet « Périmètre complet des 8 domaines » en Variante B :**
   - `L13` § 1.1 précise que les 8 domaines du Panorama préalable (**Variante A**) sont affichés dans un *« ordre aléatoire par participant »* (tandis que `P1_1_SPECIFICATION_v0.3.md` § 5.1 mentionne *« ordre aléatoire par session ou ordre thématique équilibré sans hiérarchie visuelle »*).
   - Pour le dry run interne (`DR-INST-1` et `DR-INST-2`), le livret partagé utilise la même permutation $\rho \in S_8$ sans numérotation `1..8` ; pour le futur prétest externe, ce choix reste **à confirmer** au même titre que la règle d'appariement.

3. **Affichage initial des notes de périmètre dans le Panorama A vs volet d'aide B :**
   - `L13` § 1.1 prévoit en Variante A les *« intitulés et descriptions courtes `L11`, ordre aléatoire par participant, avec volet dépliable facultatif pour la note de périmètre »*.
   - Pour le dry run interne sur support papier, les pages `2A`/`2B` n'affichent pas la note détaillée et le **même livret fermé** est posé sur la table dès `2A`/`2B` ; pour un éventuel support numérique lors du prétest externe, ce choix de déploiement symétrique reste à confirmer.

4. **Disposition spatiale des 4 cartes (`k = 4`) :**
   - `PILOT_DECISION.md` équilibre les positions `1..4` via $\tau \in S_4$, sans fixer définitivement la disposition dans la spec V0.3. Pour le **dry run interne**, la **grille `2×2`** (`Pos 1 = HG`, `Pos 2 = HD`, `Pos 3 = BG`, `Pos 4 = BD`) est autorisée et matérialisée de façon strictement identique en A et en B ; son maintien pour le prétest externe (ou sur écran) sera réexaminé après le bilan du dry run.

5. **Médium matériel et niveau de fidélité des contrôles d'interface :**
   - `L13` § 1.3 autorise soit une maquette HTML/Figma statique locale hors ligne, soit des cartes imprimées standardisées. Le **support papier** est retenu pour le dry run interne ; le choix définitif du médium pour le prétest externe reste ouvert après retour du dry run.
   - Sur le support papier, sont matérialisés de façon neutre : le retour en arrière sur la série précédente (`P1_1_SPECIFICATION_v0.3.md` § 5.1), les 4 motifs facultatifs de `no_distinguishable_best_worst` (`equally_prioritized`, `not_comparable`, `none_should_take_precedence`, `other`), et le signalement orthogonal `ItemComprehensionFlag` (`too_vague`, `incomprehensible`, `outside_collective_scope`, `loaded_wording`).
   - Signalement de cohérence sur les libellés des pôles Best/Worst : `P1_1_SPECIFICATION_v0.3.md` § 5.1 évoquait deux variantes possibles (*« Devrait recevoir le plus d'attention »* / *« Plus d'attention en premier »* et *« Pourrait attendre »* / *« Dans un second temps »*). Conformément à `L13` § 2.2, les supports ci-dessous utilisent exclusivement **« Devrait recevoir le plus d'attention »** et **« Pourrait attendre »** (sans modifier ni figer `P1_1_SPECIFICATION_v0.3.md`).

6. **Écart d'objet expérimental entre `P1_1_SPECIFICATION_v0.3.md` (§ 5.3) et `L13` :**
   - Signalement explicite : `P1_1_SPECIFICATION_v0.3.md` § 5.3 prévoyait un prétest sur `8 à 12` personnes comparant deux *ordres* du parcours (MaxDiff avant vs après expression libre P0.2), alors que `L13` définit un prétest sur `12 à 16` personnes comparant **Variante A (Panorama préalable)** vs **Variante B (Découverte progressive)** à ordre constant (MaxDiff d'abord). Ce kit opérationnel met en œuvre `L13` sans modifier `P1_1_SPECIFICATION_v0.3.md`.

---

## 3. Tronc commun des deux supports (écrans et consignes identiques)

### 3.1 Écran 1 commun — Accueil et présentation de l'exercice

> **Avant de commencer**
>
> Cet exercice vous propose d'indiquer quels grands domaines de choix collectifs devraient, selon vous, recevoir le plus d'attention dans les décisions à venir pour le pays.
>
> - **Ce que ce n'est pas :** il ne s'agit ni d'un test de connaissances, ni d'une recommandation de vote ou de candidat, ni d'un classement personnel de vos opinions politiques. Il n'y a aucune bonne ou mauvaise réponse.
> - **Comment répondre :** chaque série vous présente quatre grands domaines. Indiquez celui qui **devrait recevoir le plus d'attention** et celui qui **pourrait attendre** dans cette série.
> - **Ce que signifie « Pourrait attendre » :** cela signifie uniquement que, parmi ces quatre cartes, d'autres domaines passent avant à vos yeux en ce moment — **cela ne veut pas dire** que ce sujet est sans importance, ni que vous êtes contre.
> - **Domaines larges :** chaque carte regroupe plusieurs sujets liés. Vous pouvez choisir un domaine parce qu'un de ses grands sujets vous paraît prioritaire, sans avoir à approuver tout ce qu'il contient ni une politique particulière.
> - **Liberté de réponse et confidentialité :** à tout moment, vous pouvez consulter le périmètre d'un domaine, signaler une formulation qui vous semble floue ou orientée, revenir à la série précédente, passer une série, indiquer « Je ne sais pas choisir » ou « Impossible de départager ». Vos réponses restent strictement locales et ne sont associées à aucun nom.

---

## 4. Support A — Variante « Panorama préalable »

### 4.1 Logique et déroulé du Support A

1. **Écran 1 :** Accueil et présentation de l'exercice (§ 3.1).
2. **Écran 2A (spécifique au Support A) — Panorama préalable des huit domaines :**
   - Présente simultanément les **8 domaines** (`DOM-01` à `DOM-08`), dans un **ordre aléatoire tiré pour le participant** (sans numérotation `1..8`, sans hiérarchie visuelle ni regroupement coloré orienté).
   - Chaque bloc du panorama affiche :
     - l'**Intitulé exact** (`L11`) ;
     - la **Description courte exacte** (`L11`) ;
     - un accès facultatif et homogène **« Voir le périmètre résumé (inclus / autres domaines) »** (Section 6 ci-dessous) ;
     - une action discrète **« Signaler un problème de formulation »**.
   - **Règle enquêteur :** ne donner aucune explication orale supplémentaire ou exemple politique pendant cette lecture. Laisser le participant lire à son rythme (en notant sur la grille s'il lit tout, survole seulement les titres, ou ouvre les volets de périmètre).
3. **Écrans 3 à 10 (communs) — Les 8 séries MaxDiff (`Série 1 sur 8` à `Série 8 sur 8`) :**
   - Gabarit identique à la Section 5.2, avec accès conservé au bouton discret *« Voir le périmètre complet des 8 domaines »* si besoin de vérification en cours de route.

### 4.2 Texte exact de l'écran 2A (Panorama préalable — à imprimer ou afficher tel quel)

> **Vue d'ensemble des huit domaines**
>
> Avant de commencer les séries de comparaison, prenez quelques instants pour découvrir les huit grands domaines qui vous seront présentés quatre par quatre.
>
> *(Disposition neutre sans numérotation ni catégorie — Ordre aléatoire par participant : $\rho \in S_8$)*
>
> - **Santé et solidarités face aux risques de la vie**  
>   L'accès aux soins et la prévention, ainsi que les aides et protections face aux retraites, à la perte d'autonomie, au handicap, au chômage, à la pauvreté et pour les familles.  
>   `[Consulter le périmètre résumé]` · `[Signaler une formulation]`
>
> - **Économie, travail et finances publiques**  
>   Le pouvoir d'achat et les salaires, l'organisation du travail et des activités non rémunérées, le temps de vie, les entreprises et les choix d'impôts et de budget.  
>   `[Consulter le périmètre résumé]` · `[Signaler une formulation]`
>
> - **Logement, territoires et mobilités**  
>   L'accès au logement et ses coûts, les différentes manières d'habiter, les déplacements du quotidien et l'équilibre entre villes, campagnes et outre-mer.  
>   `[Consulter le périmètre résumé]` · `[Signaler une formulation]`
>
> - **Éducation, formation, recherche et culture**  
>   L'école et les études supérieures, la formation professionnelle à tout âge, la recherche scientifique, ainsi que la vie culturelle et les médias.  
>   `[Consulter le périmètre résumé]` · `[Signaler une formulation]`
>
> - **Climat, énergie, environnement et agriculture**  
>   Le climat et les risques naturels, la production et le prix de l'énergie, la gestion de l'eau et de la nature, l'agriculture et l'alimentation.  
>   `[Consulter le périmètre résumé]` · `[Signaler une formulation]`
>
> - **Sécurité des personnes et tranquillité publique**  
>   La prévention de la délinquance et des violences, la sûreté au quotidien, l'action et le contrôle des forces de sécurité et les sanctions pénales.  
>   `[Consulter le périmètre résumé]` · `[Signaler une formulation]`
>
> - **Justice, libertés publiques et démocratie**  
>   Le fonctionnement de la justice, la protection des droits et libertés (y compris numériques), la laïcité et l'égalité des droits, ainsi que les institutions et la participation citoyenne.  
>   `[Consulter le périmètre résumé]` · `[Signaler une formulation]`
>
> - **Place de la France en Europe et dans le monde**  
>   L'Union européenne et la souveraineté nationale, la défense et l'action diplomatique, les échanges commerciaux, ainsi que la gestion des frontières et des migrations.  
>   `[Consulter le périmètre résumé]` · `[Signaler une formulation]`
>
> ---
> `[Commencer la série 1 sur 8]`

*(Note d'usage : l'ordre listé ci-dessus suit l'ordre éditorial `DOM-01..08` uniquement dans ce document source ; sur le support remis au participant, appliquer impérativement un tirage d'ordre aléatoire $\rho \in S_8$ sans afficher les codes `DOM-01`..`DOM-08`.)*

---

## 5. Support B — Variante « Découverte progressive »

### 5.1 Logique et déroulé du Support B

1. **Écran 1 :** Accueil et présentation de l'exercice (§ 3.1) — **strictement identique au Support A**.
2. **Écran 2B (spécifique au Support B) — Transition directe vers l'exercice sans panorama préalable :**
   - N'affiche **aucune liste des 8 domaines** avant la Série 1.
   - Rappelle uniquement le fonctionnement de l'exercice et la présence permanente du bouton / livret d'aide **« Voir le périmètre complet des 8 domaines »**.
3. **Écrans 3 à 10 (communs) — Les 8 séries MaxDiff (`Série 1 sur 8` à `Série 8 sur 8`) :**
   - Le participant découvre les cartes 4 par 4 selon le plan `N = 8, k = 4, r = 4` instancié par `randomize_pilot_n8_dihedral`.
   - Le bouton discret **`[Voir le périmètre complet des 8 domaines]`** reste visible en permanence (en haut ou en pied d'écran / livret posé fermé sur la table avec la mention visible dessus) afin que le participant puisse y accéder librement à tout moment s'il hésite sur un périmètre ou cherche où se situe un sujet.

### 5.2 Texte exact de l'écran 2B (Pré-exercice sans panorama)

> **Prêt à commencer ?**
>
> Vous allez maintenant découvrir **8 séries successives** contenant chacune **4 cartes** issues d'un ensemble de **8 grands domaines**.
>
> Dans chaque série :
> - choisissez la carte qui **devrait recevoir le plus d'attention** ;
> - choisissez une autre carte qui **pourrait attendre** *(cela veut seulement dire que d'autres domaines passent avant dans cette série, pas que le sujet est sans importance ni que vous êtes contre)*.
>
> À tout moment, si vous hésitez sur ce que recouvre un domaine ou si vous vous demandez où figure un sujet précis, vous pouvez ouvrir le volet **« Voir le périmètre complet des 8 domaines »**.
>
> ---
> `[Commencer la série 1 sur 8]`

---

## 6. Gabarit commun des écrans de séries MaxDiff (Support A et Support B)

### 6.1 Gabarit d'une série (`Série [t] sur 8`, pour `t = 1..8`)

Chaque série présente les 4 cartes assignées au bloc $B_t$ après transformation $(\pi, \tau, s, \delta)$, selon une disposition homogène identique entre A et B *(sur le support papier `2×2` du dry run interne, `Position 1 = HG`, `Position 2 = HD`, `Position 3 = BG`, `Position 4 = BD` ; aucune barre de « réussite », aucune indication de rang ou d'importance attendue)* :

```text
--------------------------------------------------------------------------------
Série [t] sur 8                         [Voir le périmètre complet des 8 domaines]
--------------------------------------------------------------------------------
Quand plusieurs enjeux collectifs doivent être pris en compte, lesquels devraient
recevoir le plus d'attention, et lesquels pourraient attendre ?

Rappel : « Pourrait attendre » exprime uniquement une priorité relative dans
cette série ; cela ne signifie ni que l'enjeu est négligeable, ni que vous
vous y opposez.
--------------------------------------------------------------------------------
[ Position 1 ]  {Intitulé L11}
                {Description courte L11}
                ( ) Devrait recevoir le plus d'attention
                ( ) Pourrait attendre
                [Périmètre résumé]  [Signaler un problème de formulation]

[ Position 2 ]  {Intitulé L11}
                {Description courte L11}
                ( ) Devrait recevoir le plus d'attention
                ( ) Pourrait attendre
                [Périmètre résumé]  [Signaler un problème de formulation]

[ Position 3 ]  {Intitulé L11}
                {Description courte L11}
                ( ) Devrait recevoir le plus d'attention
                ( ) Pourrait attendre
                [Périmètre résumé]  [Signaler un problème de formulation]

[ Position 4 ]  {Intitulé L11}
                {Description courte L11}
                ( ) Devrait recevoir le plus d'attention
                ( ) Pourrait attendre
                [Périmètre résumé]  [Signaler un problème de formulation]
--------------------------------------------------------------------------------
Si vous ne pouvez pas comparer ces quatre cartes :
[Je ne sais pas choisir]   [Impossible de départager cette série]   [Passer cette série]

  ↳ Si « Impossible de départager cette série » est choisi (motif facultatif) :
    ( ) Ces domaines me paraissent tout aussi prioritaires les uns que les autres
    ( ) Ces domaines ne me semblent pas comparables entre eux
    ( ) Aucun de ces domaines ne devrait passer en premier
    ( ) Autre raison (préciser si souhaité) : __________________________
--------------------------------------------------------------------------------
[← Série précédente]                                          [Série suivante →]
--------------------------------------------------------------------------------
```

### 6.2 Gabarit du signalement orthogonal d'une carte (`ItemComprehensionFlag`)

Accessible sur toute carte (au Panorama A comme dans n'importe quelle série A ou B) **sans obliger à passer la série ni remplacer la carte** :

```text
Signaler un problème sur cette carte (facultatif — la série reste inchangée) :
[ ] Formulation trop vague ou imprécise
[ ] Mot ou phrase difficile à comprendre
[ ] Ce sujet ne me paraît pas relever d'un choix collectif
[ ] Formulation perçue comme orientée ou partisane
Précision libre (facultative) : __________________________________________
```

---

## 7. Volet / Livret commun « Périmètre complet des huit domaines » (identique Support A et Support B)

Ce volet est exactement le même document que celui accessible via `[Consulter le périmètre résumé]` en A et `[Voir le périmètre complet des 8 domaines]` en B (sans numéros `1..8`, sans codes `DOM-XX` ni `E01..E68`, et affiché dans le même ordre aléatoire par participant que le Panorama A — l'ordre ci-dessous suit uniquement l'ordre documentaire de référence) :

- **Santé et solidarités face aux risques de la vie**
   - *Description courte :* L'accès aux soins et la prévention, ainsi que les aides et protections face aux retraites, à la perte d'autonomie, au handicap, au chômage, à la pauvreté et pour les familles.
   - *Ce que ce domaine couvre :* Couvre l'organisation et le financement des soins, la santé publique et mentale, ainsi que les protections collectives face au grand âge, au handicap, au chômage, à la pauvreté et au soutien aux familles et aidants — sans privilégier ni gestion publique ou privée, ni aides universelles ou ciblées.
   - *Traité dans d'autres domaines :* Impôts généraux, dette publique, salaires et règles du travail (*Économie, travail et finances publiques*) ; adaptation physique des logements et des transports (*Logement, territoires et mobilités*) ; instruction scolaire (*Éducation, formation, recherche et culture*) ; politiques environnementales globales (*Climat, énergie, environnement et agriculture*).

- **Économie, travail et finances publiques**
   - *Description courte :* Le pouvoir d'achat et les salaires, l'organisation du travail et des activités non rémunérées, le temps de vie, les entreprises et les choix d'impôts et de budget.
   - *Ce que ce domaine couvre :* Couvre le coût de la vie, les rémunérations, l'économie et les entreprises, l'impôt et la dette publique, ainsi que l'emploi, l'indépendance, le travail non rémunéré (soin aux proches, bénévolat) et le partage des temps de vie — sans privilégier ni hausse ni baisse d'impôts, ni modèle salarial unique.
   - *Traité dans d'autres domaines :* Retraites, minima sociaux et indemnisation du chômage (*Santé et solidarités face aux risques de la vie*) ; prix spécifiques du logement et des transports quotidiens (*Logement, territoires et mobilités*) ; formation scolaire et continue (*Éducation, formation, recherche et culture*) ; accords commerciaux extérieurs (*Place de la France en Europe et dans le monde*).

- **Logement, territoires et mobilités**
   - *Description courte :* L'accès au logement et ses coûts, les différentes manières d'habiter, les déplacements du quotidien et l'équilibre entre villes, campagnes et outre-mer.
   - *Ce que ce domaine couvre :* Porte sur le logement (location, propriété, habitat social ou partagé, lutte contre le mal-logement), les transports du quotidien, les services de proximité et l'équilibre territorial — sans privilégier ni un statut d'occupation, ni un mode de transport, ni une gestion publique ou privée.
   - *Traité dans d'autres domaines :* Politique climatique nationale, énergie et préservation globale des sols (*Climat, énergie, environnement et agriculture*) ; pouvoir d'achat général hors habitat et transport (*Économie, travail et finances publiques*) ; pouvoirs institutionnels des collectivités territoriales (*Justice, libertés publiques et démocratie*).

- **Éducation, formation, recherche et culture**
   - *Description courte :* L'école et les études supérieures, la formation professionnelle à tout âge, la recherche scientifique, ainsi que la vie culturelle et les médias.
   - *Ce que ce domaine couvre :* Couvre l'enseignement scolaire (public, sous contrat ou indépendant), l'orientation, la formation professionnelle et continue des adultes, l'université, la recherche, la culture et l'information — sans présupposer de modèle pédagogique ni de partage public/privé.
   - *Traité dans d'autres domaines :* Cadre juridique général de la laïcité et lutte contre les discriminations (*Justice, libertés publiques et démocratie*, *les applications concrètes dans la vie scolaire y sont liées*) ; politique de l'emploi (*Économie, travail et finances publiques*) ; garde matérielle de la petite enfance et soutien aux familles (*Santé et solidarités face aux risques de la vie*).

- **Climat, énergie, environnement et agriculture**
   - *Description courte :* Le climat et les risques naturels, la production et le prix de l'énergie, la gestion de l'eau et de la nature, l'agriculture et l'alimentation.
   - *Ce que ce domaine couvre :* Porte sur le changement climatique, les risques naturels, les choix énergétiques (nucléaire, renouvelables, sobriété, factures), l'eau, la biodiversité, les pollutions, l'agriculture et l'alimentation — sans préjuger des choix techniques, économiques ou agricoles.
   - *Traité dans d'autres domaines :* Fiscalité générale et pouvoir d'achat global (*Économie, travail et finances publiques*) ; logement et mobilités du quotidien (*Logement, territoires et mobilités*) ; traités commerciaux et importations agricoles (*Place de la France en Europe et dans le monde*).

- **Sécurité des personnes et tranquillité publique**
   - *Description courte :* La prévention de la délinquance et des violences, la sûreté au quotidien, l'action et le contrôle des forces de sécurité et les sanctions pénales.
   - *Ce que ce domaine couvre :* Porte sur la protection contre les atteintes aux personnes et aux biens, la prévention sociale et situationnelle, l'organisation et la déontologie des forces de sécurité intérieure, et les peines — hors justice civile/délais des tribunaux et hors libertés publiques *(domaine Justice, libertés publiques et démocratie)*.
   - *Traité dans d'autres domaines :* Justice civile, familiale, commerciale et fonctionnement ou délais généraux des tribunaux (*Justice, libertés publiques et démocratie*) ; libertés publiques, vie privée et surveillance numérique (*Justice, libertés publiques et démocratie*) ; défense militaire et gestion des frontières extérieures (*Place de la France en Europe et dans le monde*).

- **Justice, libertés publiques et démocratie**
   - *Description courte :* Le fonctionnement de la justice, la protection des droits et libertés (y compris numériques), la laïcité et l'égalité des droits, ainsi que les institutions et la participation citoyenne.
   - *Ce que ce domaine couvre :* Regroupe quatre dimensions liées à l'État de droit : (1) délais, moyens et indépendance des tribunaux ; (2) libertés fondamentales, vie privée, encadrement de la surveillance et de l'IA/numérique ; (3) laïcité, pluralisme et lutte contre les discriminations ; (4) institutions, modes de scrutin, décentralisation et participation citoyenne.
   - *Traité dans d'autres domaines :* Sécurité physique quotidienne, police et sanctions pénales (*Sécurité des personnes et tranquillité publique*) ; traités européens et relations entre États (*Place de la France en Europe et dans le monde*) ; politiques culturelles et pédagogie scolaire (*Éducation, formation, recherche et culture*).

- **Place de la France en Europe et dans le monde**
   - *Description courte :* L'Union européenne et la souveraineté nationale, la défense et l'action diplomatique, les échanges commerciaux, ainsi que la gestion des frontières et des migrations.
   - *Ce que ce domaine couvre :* Porte sur la construction européenne et la place du droit national, les armées et la défense, la diplomatie et la solidarité internationale, les accords commerciaux, et la gestion des frontières, de l'asile et de l'immigration — sans présupposer intégration ou souverainisme, libre-échange ou protectionnisme, accueil ou restriction migratoire.
   - *Traité dans d'autres domaines :* Sécurité intérieure quotidienne (*Sécurité des personnes et tranquillité publique*) ; institutions et élections nationales (*Justice, libertés publiques et démocratie*) ; politique fiscale et industrielle purement intérieure (*Économie, travail et finances publiques*).

---

## 8. Annexe support — Fiche de bascule exploratoire vers le Niveau 2 (`Strate 2.1`, fin de débriefing uniquement)

> **Usage strictement post-MaxDiff (`L13` § 2.3 C) :**  
> Cette fiche est utilisée uniquement **en fin de débriefing** sur **un seul domaine large** choisi par le participant (`DOM-01`, `DOM-02`, `DOM-07` ou `DOM-08`), afin de vérifier si la **Strate 2.1 (`L07`)** répond à un éventuel besoin de précision. **Les choix exprimés ici ne modifient jamais ni ne sont réinjectés dans les comptages MaxDiff.**

- **`DOM-01` — Sous-enjeux (`L07`) :** Accès territorial et délais des soins (ville, hôpital, urgences, professionnels) · Coût des soins, remboursements et prévention/santé mentale · Retraites et équilibre entre générations · Vieillissement, perte d'autonomie et handicap · Chômage, pauvreté et filets de sécurité matériels · Soutien aux familles, petite enfance et proches aidants · *(Autre sujet à préciser)*.
- **`DOM-02` — Sous-enjeux (`L07`) :** Organisation des activités rémunérées (salariat, indépendance, entrepreneuriat) et non rémunérées (soin, bénévolat, vie domestique) · Conditions de travail, pénibilité et partage des temps de vie · Salaires, pouvoir d'achat, prix et partage de la valeur · Tissu productif, PME, réindustrialisation et compétitivité · Fiscalité, dette publique et choix budgétaires de l'État · *(Autre sujet à préciser)*.
- **`DOM-07` — Sous-enjeux (`L07`) :** Moyens, délais et accessibilité de la justice civile, familiale et pénale · Indépendance judiciaire, Conseil constitutionnel et État de droit · Droits fondamentaux, vie privée, liberté d'expression et de manifestation · Régulation des plateformes numériques, données et intelligence artificielle · Laïcité, pluralisme et lutte contre les discriminations · Institutions, modes de scrutin, décentralisation, outre-mer et participation citoyenne · *(Autre sujet à préciser)*.
- **`DOM-08` — Sous-enjeux (`L07`) :** Avenir, compétences et démocratie de l'Union européenne · Souveraineté nationale et articulation avec le droit et le budget européens · Défense nationale, armées, dissuasion et sécurité collective (UE/OTAN) · Diplomatie, crises géopolitiques, multilatéralisme et aide au développement · Commerce international, protectionnisme, libre-échange et dépendances stratégiques · Frontières, politique migratoire, droit d'asile et intégration · *(Autre sujet à préciser)*.
