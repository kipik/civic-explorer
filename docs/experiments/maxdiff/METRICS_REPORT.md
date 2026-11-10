# Rapport mathématique des plans expérimentaux MaxDiff (N = 6 à 13)

- **Paramètres évalués** : `k = 4` items par bloc, `b = N` blocs, `r = 4` présentations par item.
- **Graine déterministe de base** : `20261110` (Python 3 stdlib uniquement).
- **Script source** : `docs/experiments/maxdiff/audit_maxdiff_designs.py`.

## Synthèse comparative par taille N

| N | Blocs | BIBD exact (b=N) ? | b_min arithm. si BIBD (k=4) | Histogramme paires | Min/Max/Ét. | Paires à 0 | Variance (borne théor.) | D-eff | SE Fisher H0 (min / moy / max) | Éq. pos. [1,1,1,1] | Chevauch. conséc. lin. / bouclage |
|---:|---:|---|---:|---|---|---:|---|---:|---|---|---|
| 6 | 6 | Non | 15 (r=10) | 2:9, 3:6 | 2/3/1 | 0 | 0.2400 (0.2400, global) | 0.9965 | 0.897 / 0.916 / 0.930 | Exact | 2 (moy 2.00) / B6→B1:3 |
| 7 | 7 | Oui | 7 (r=4) | 2:21 | 2/2/0 | 0 | 0.0000 (0.0000, global) | 1.0000 | 0.926 / 0.926 / 0.926 | Exact | 2 (moy 2.00) / B7→B1:2 |
| 8 | 8 | Non | 14 (r=7) | 1:8, 2:20 | 1/2/1 | 0 | 0.2041 (0.2041, global) | 0.9957 | 0.928 / 0.939 / 0.963 | Exact | 1 (moy 1.00) / B8→B1:1 |
| 9 | 9 | Non | 18 (r=8) | 1:18, 2:18 | 1/2/1 | 0 | 0.2500 (0.2500, global) | 0.9941 | 0.930 / 0.948 / 0.966 | Exact | 1 (moy 1.00) / B9→B1:1 |
| 10 | 10 | Non | 15 (r=6) | 1:30, 2:15 | 1/2/1 | 0 | 0.2222 (0.2222, global) | 0.9938 | 0.931 / 0.954 / 0.969 | Exact | 1 (moy 1.00) / B10→B1:1 |
| 11 | 11 | Non | 55 (r=20) | 1:44, 2:11 | 1/2/1 | 0 | 0.1600 (0.1600, global) | 0.9949 | 0.928 / 0.958 / 0.967 | Exact | 1 (moy 1.00) / B11→B1:1 |
| 12 | 12 | Non | 33 (r=11) | 1:60, 2:6 | 1/2/1 | 0 | 0.0826 (0.0826, global) | 0.9971 | 0.926 / 0.960 / 0.964 | Exact | 1 (moy 1.00) / B12→B1:1 |
| 13 | 13 | Oui | 13 (r=4) | 1:78 | 1/1/0 | 0 | 0.0000 (0.0000, global) | 1.0000 | 0.961 / 0.961 / 0.961 | Exact | 1 (moy 1.00) / B13→B1:1 |

---

## N = 6 items (6 blocs de 4)

- **Construction retenue** : Complément de C6 {0,1,2,3} mod 6 (PBIBD optimal, D-eff max)
- **Faisabilité BIBD exact (b=N, r=4)** : Non — Impossible avec b=N, r=4 : lambda = 12 / (6 - 1) = 2.4000 n'est pas entier (diviseurs de 12 >= 3 : 3, 4, 6, 12 => N in {4, 5, 7, 13}).
- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = 15` blocs (`r = 10` présentations/item)
- **Fréquence par item** : `[4, 4, 4, 4, 4, 4]` (uniforme : True)
- **Distribution des paires** : `{2: 9, 3: 6}` (moyenne = 2.4000, variance = 0.240000, borne théorique = 0.240000)
- **Connectivité** : 1 composante(s) connexe(s) ; $\lambda_2(L) = 13.0000$ ; D-efficacité = `0.9965`
- **Précision asymptotique sous H0 ($\beta = 0$, $r = 4$)** : SE($\hat{\beta}_i - \hat{\beta}_j$) min = `0.8966`, moy = `0.9160`, max = `0.9303` logits
- **Blocs dupliqués** : 0 (unicité intra-bloc : True)
- **Équilibre exact des positions** : True (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)
- **Chevauchement entre blocs consécutifs** : max linéaire = 2 (moyenne = 2.00), bouclage `B6→B1` = 3 (max cyclique = 3)
- **Test randomisation Monte Carlo (1000 tirages à graines distinctes)** :
  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `1000/1000` (positions `[1,1,1,1]`: `1000/1000`, fréquences `r=4`: `1000/1000`, cooccurrences & connectivité: `1000/1000`, zéro doublon/unicité intra-bloc: `1000/1000`) ; `max_consecutive_overlap` linéaire préservé dans `81/1000` (max observé = `3`), bouclage cyclique `B6→B1` inclus dans `1000/1000` (max observé = `3`), total tous invariants testés = `81/1000` ; mélange naïf par bloc `[1,1,1,1]`: `0/1000` (`0.0%`).

### Comparaison des candidats / fonctions objectif

| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\lambda_2(L)$ | SE max H0 | Doublons |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Complément de C6 {0,1,2,3} mod 6 (PBIBD optimal, D-eff max) | 2:9, 3:6 | 0 | 0.2400 | 1 | 0.9965 | 13.00 | 0.930 | 0 |
| Complément de C3 U C3 {0,1,2,4} mod 6 (même variance, D-eff moindre) | 2:9, 3:6 | 0 | 0.2400 | 1 | 0.9962 | 12.00 | 0.931 | 0 |
| Meilleur plan cyclique exhaustif | 2:9, 3:6 | 0 | 0.2400 | 1 | 0.9965 | 13.00 | 0.930 | 0 |
| Recherche générale — Obj_A (Variance paires) | 2:9, 3:6 | 0 | 0.2400 | 1 | 0.9965 | 13.00 | 0.930 | 0 |
| Recherche générale — Obj_B (Minimax + zéro-paires) | 2:9, 3:6 | 0 | 0.2400 | 1 | 0.9965 | 13.00 | 0.930 | 0 |
| Recherche générale — Obj_C (D-optimalité Laplacien) | 2:9, 3:6 | 0 | 0.2400 | 1 | 0.9965 | 13.00 | 0.930 | 0 |
| Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq) | 2:9, 3:6 | 0 | 0.2400 | 1 | 0.9965 | 13.00 | 0.930 | 0 |

### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)

| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |
|---:|---:|---:|---:|---:|
| B1 | I4 | I1 | I3 | I2 |
| B2 | I6 | I4 | I5 | I3 |
| B3 | I1 | I2 | I6 | I5 |
| B4 | I3 | I5 | I2 | I4 |
| B5 | I5 | I6 | I4 | I1 |
| B6 | I2 | I3 | I1 | I6 |

### Matrice complète des cooccurrences

| Item | I1 | I2 | I3 | I4 | I5 | I6 |
|---|---:|---:|---:|---:|---:|---:|
| **I1** | — | 3 | 2 | 2 | 2 | 3 |
| **I2** | 3 | — | 3 | 2 | 2 | 2 |
| **I3** | 2 | 3 | — | 3 | 2 | 2 |
| **I4** | 2 | 2 | 3 | — | 3 | 2 |
| **I5** | 2 | 2 | 2 | 3 | — | 3 |
| **I6** | 3 | 2 | 2 | 2 | 3 | — |

## N = 7 items (7 blocs de 4)

- **Construction retenue** : BIBD exact (7,4,2) — complément du plan de Fano PG(2,2)
- **Faisabilité BIBD exact (b=N, r=4)** : Oui — 12 / (7 - 1) = 2 entier ; existe comme complément du plan de Fano PG(2,2).
- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = 7` blocs (`r = 4` présentations/item)
- **Fréquence par item** : `[4, 4, 4, 4, 4, 4, 4]` (uniforme : True)
- **Distribution des paires** : `{2: 21}` (moyenne = 2.0000, variance = 0.000000, borne théorique = 0.000000)
- **Connectivité** : 1 composante(s) connexe(s) ; $\lambda_2(L) = 14.0000$ ; D-efficacité = `1.0000`
- **Précision asymptotique sous H0 ($\beta = 0$, $r = 4$)** : SE($\hat{\beta}_i - \hat{\beta}_j$) min = `0.9258`, moy = `0.9258`, max = `0.9258` logits
- **Blocs dupliqués** : 0 (unicité intra-bloc : True)
- **Équilibre exact des positions** : True (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)
- **Chevauchement entre blocs consécutifs** : max linéaire = 2 (moyenne = 2.00), bouclage `B7→B1` = 2 (max cyclique = 2)
- **Test randomisation Monte Carlo (1000 tirages à graines distinctes)** :
  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `1000/1000` (positions `[1,1,1,1]`: `1000/1000`, fréquences `r=4`: `1000/1000`, cooccurrences & connectivité: `1000/1000`, zéro doublon/unicité intra-bloc: `1000/1000`) ; `max_consecutive_overlap` linéaire préservé dans `1000/1000` (max observé = `2`), bouclage cyclique `B7→B1` inclus dans `1000/1000` (max observé = `2`), total tous invariants testés = `1000/1000` ; mélange naïf par bloc `[1,1,1,1]`: `0/1000` (`0.0%`).

### Comparaison des candidats / fonctions objectif

| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\lambda_2(L)$ | SE max H0 | Doublons |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| BIBD exact (7,4,2) — complément du plan de Fano PG(2,2) | 2:21 | 0 | 0.0000 | 0 | 1.0000 | 14.00 | 0.926 | 0 |
| Meilleur plan cyclique exhaustif | 2:21 | 0 | 0.0000 | 0 | 1.0000 | 14.00 | 0.926 | 0 |
| Recherche générale — Obj_A (Variance paires) | 2:21 | 0 | 0.0000 | 0 | 1.0000 | 14.00 | 0.926 | 0 |
| Recherche générale — Obj_B (Minimax + zéro-paires) | 2:21 | 0 | 0.0000 | 0 | 1.0000 | 14.00 | 0.926 | 0 |
| Recherche générale — Obj_C (D-optimalité Laplacien) | 2:21 | 0 | 0.0000 | 0 | 1.0000 | 14.00 | 0.926 | 0 |
| Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq) | 2:21 | 0 | 0.0000 | 0 | 1.0000 | 14.00 | 0.926 | 0 |

### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)

| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |
|---:|---:|---:|---:|---:|
| B1 | I5 | I2 | I3 | I1 |
| B2 | I2 | I3 | I6 | I4 |
| B3 | I7 | I5 | I4 | I3 |
| B4 | I4 | I6 | I1 | I5 |
| B5 | I6 | I7 | I5 | I2 |
| B6 | I3 | I1 | I7 | I6 |
| B7 | I1 | I4 | I2 | I7 |

### Matrice complète des cooccurrences

| Item | I1 | I2 | I3 | I4 | I5 | I6 | I7 |
|---|---:|---:|---:|---:|---:|---:|---:|
| **I1** | — | 2 | 2 | 2 | 2 | 2 | 2 |
| **I2** | 2 | — | 2 | 2 | 2 | 2 | 2 |
| **I3** | 2 | 2 | — | 2 | 2 | 2 | 2 |
| **I4** | 2 | 2 | 2 | — | 2 | 2 | 2 |
| **I5** | 2 | 2 | 2 | 2 | — | 2 | 2 |
| **I6** | 2 | 2 | 2 | 2 | 2 | — | 2 |
| **I7** | 2 | 2 | 2 | 2 | 2 | 2 | — |

## N = 8 items (8 blocs de 4)

- **Construction retenue** : Meilleur plan cyclique exhaustif
- **Faisabilité BIBD exact (b=N, r=4)** : Non — Impossible avec b=N, r=4 : lambda = 12 / (8 - 1) = 1.7143 n'est pas entier (diviseurs de 12 >= 3 : 3, 4, 6, 12 => N in {4, 5, 7, 13}).
- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = 14` blocs (`r = 7` présentations/item)
- **Fréquence par item** : `[4, 4, 4, 4, 4, 4, 4, 4]` (uniforme : True)
- **Distribution des paires** : `{1: 8, 2: 20}` (moyenne = 1.7143, variance = 0.204082, borne théorique = 0.204082)
- **Connectivité** : 1 composante(s) connexe(s) ; $\lambda_2(L) = 12.0000$ ; D-efficacité = `0.9957`
- **Précision asymptotique sous H0 ($\beta = 0$, $r = 4$)** : SE($\hat{\beta}_i - \hat{\beta}_j$) min = `0.9282`, moy = `0.9393`, max = `0.9634` logits
- **Blocs dupliqués** : 0 (unicité intra-bloc : True)
- **Équilibre exact des positions** : True (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)
- **Chevauchement entre blocs consécutifs** : max linéaire = 1 (moyenne = 1.00), bouclage `B8→B1` = 1 (max cyclique = 1)
- **Test randomisation Monte Carlo (1000 tirages à graines distinctes)** :
  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `1000/1000` (positions `[1,1,1,1]`: `1000/1000`, fréquences `r=4`: `1000/1000`, cooccurrences & connectivité: `1000/1000`, zéro doublon/unicité intra-bloc: `1000/1000`) ; `max_consecutive_overlap` linéaire préservé dans `0/1000` (max observé = `2`), bouclage cyclique `B8→B1` inclus dans `0/1000` (max observé = `2`), total tous invariants testés = `0/1000` ; mélange naïf par bloc `[1,1,1,1]`: `0/1000` (`0.0%`).
  - *Pilote N=8 (`randomize_pilot_n8_dihedral`, `pi x tau x D8`)* : positions `[1,1,1,1]` = `1000/1000`, fréquences `r=4` = `1000/1000`, cooccurrences & connectivité = `1000/1000`, zéro doublon & unicité intra-bloc = `1000/1000`, `max_consecutive_overlap == 1` (linéaire) = `1000/1000`, bouclage `B8→B1 == 1` = `1000/1000`, `max_cyclic_consecutive_overlap == 1` = `1000/1000`, **tous invariants testés préservés = `1000/1000`** (max observé linéaire = `1`, max observé `B8→B1` = `1`).

### Comparaison des candidats / fonctions objectif

| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\lambda_2(L)$ | SE max H0 | Doublons |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Meilleur plan cyclique exhaustif | 1:8, 2:20 | 0 | 0.2041 | 1 | 0.9957 | 12.00 | 0.963 | 0 |
| Recherche générale — Obj_A (Variance paires) | 1:8, 2:20 | 0 | 0.2041 | 1 | 0.9957 | 12.00 | 0.963 | 0 |
| Recherche générale — Obj_B (Minimax + zéro-paires) | 1:8, 2:20 | 0 | 0.2041 | 1 | 0.9957 | 12.00 | 0.963 | 0 |
| Recherche générale — Obj_C (D-optimalité Laplacien) | 1:8, 2:20 | 0 | 0.2041 | 1 | 0.9957 | 12.00 | 0.963 | 0 |
| Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq) | 1:8, 2:20 | 0 | 0.2041 | 1 | 0.9957 | 12.00 | 0.963 | 0 |

### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)

| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |
|---:|---:|---:|---:|---:|
| B1 | I2 | I3 | I1 | I5 |
| B2 | I8 | I5 | I4 | I6 |
| B3 | I3 | I7 | I8 | I1 |
| B4 | I6 | I2 | I3 | I4 |
| B5 | I1 | I6 | I5 | I7 |
| B6 | I4 | I1 | I2 | I8 |
| B7 | I5 | I4 | I7 | I3 |
| B8 | I7 | I8 | I6 | I2 |

### Matrice complète des cooccurrences

| Item | I1 | I2 | I3 | I4 | I5 | I6 | I7 | I8 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **I1** | — | 2 | 2 | 1 | 2 | 1 | 2 | 2 |
| **I2** | 2 | — | 2 | 2 | 1 | 2 | 1 | 2 |
| **I3** | 2 | 2 | — | 2 | 2 | 1 | 2 | 1 |
| **I4** | 1 | 2 | 2 | — | 2 | 2 | 1 | 2 |
| **I5** | 2 | 1 | 2 | 2 | — | 2 | 2 | 1 |
| **I6** | 1 | 2 | 1 | 2 | 2 | — | 2 | 2 |
| **I7** | 2 | 1 | 2 | 1 | 2 | 2 | — | 2 |
| **I8** | 2 | 2 | 1 | 2 | 1 | 2 | 2 | — |

## N = 9 items (9 blocs de 4)

- **Construction retenue** : Meilleur plan cyclique exhaustif
- **Faisabilité BIBD exact (b=N, r=4)** : Non — Impossible avec b=N, r=4 : lambda = 12 / (9 - 1) = 1.5000 n'est pas entier (diviseurs de 12 >= 3 : 3, 4, 6, 12 => N in {4, 5, 7, 13}).
- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = 18` blocs (`r = 8` présentations/item)
- **Fréquence par item** : `[4, 4, 4, 4, 4, 4, 4, 4, 4]` (uniforme : True)
- **Distribution des paires** : `{1: 18, 2: 18}` (moyenne = 1.5000, variance = 0.250000, borne théorique = 0.250000)
- **Connectivité** : 1 composante(s) connexe(s) ; $\lambda_2(L) = 12.0000$ ; D-efficacité = `0.9941`
- **Précision asymptotique sous H0 ($\beta = 0$, $r = 4$)** : SE($\hat{\beta}_i - \hat{\beta}_j$) min = `0.9304`, moy = `0.9482`, max = `0.9657` logits
- **Blocs dupliqués** : 0 (unicité intra-bloc : True)
- **Équilibre exact des positions** : True (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)
- **Chevauchement entre blocs consécutifs** : max linéaire = 1 (moyenne = 1.00), bouclage `B9→B1` = 1 (max cyclique = 1)
- **Test randomisation Monte Carlo (1000 tirages à graines distinctes)** :
  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `1000/1000` (positions `[1,1,1,1]`: `1000/1000`, fréquences `r=4`: `1000/1000`, cooccurrences & connectivité: `1000/1000`, zéro doublon/unicité intra-bloc: `1000/1000`) ; `max_consecutive_overlap` linéaire préservé dans `6/1000` (max observé = `2`), bouclage cyclique `B9→B1` inclus dans `5/1000` (max observé = `2`), total tous invariants testés = `5/1000` ; mélange naïf par bloc `[1,1,1,1]`: `0/1000` (`0.0%`).

### Comparaison des candidats / fonctions objectif

| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\lambda_2(L)$ | SE max H0 | Doublons |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Meilleur plan cyclique exhaustif | 1:18, 2:18 | 0 | 0.2500 | 1 | 0.9941 | 12.00 | 0.966 | 0 |
| Recherche générale — Obj_A (Variance paires) | 1:18, 2:18 | 0 | 0.2500 | 1 | 0.9936 | 10.70 | 0.970 | 0 |
| Recherche générale — Obj_B (Minimax + zéro-paires) | 1:18, 2:18 | 0 | 0.2500 | 1 | 0.9936 | 10.70 | 0.970 | 0 |
| Recherche générale — Obj_C (D-optimalité Laplacien) | 1:18, 2:18 | 0 | 0.2500 | 1 | 0.9940 | 12.00 | 0.966 | 0 |
| Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq) | 1:18, 2:18 | 0 | 0.2500 | 1 | 0.9936 | 10.70 | 0.970 | 0 |

### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)

| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |
|---:|---:|---:|---:|---:|
| B1 | I7 | I6 | I4 | I3 |
| B2 | I9 | I8 | I6 | I5 |
| B3 | I8 | I1 | I2 | I7 |
| B4 | I4 | I3 | I1 | I9 |
| B5 | I6 | I5 | I3 | I2 |
| B6 | I5 | I7 | I8 | I4 |
| B7 | I1 | I9 | I7 | I6 |
| B8 | I3 | I2 | I9 | I8 |
| B9 | I2 | I4 | I5 | I1 |

### Matrice complète des cooccurrences

| Item | I1 | I2 | I3 | I4 | I5 | I6 | I7 | I8 | I9 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **I1** | — | 2 | 1 | 2 | 1 | 1 | 2 | 1 | 2 |
| **I2** | 2 | — | 2 | 1 | 2 | 1 | 1 | 2 | 1 |
| **I3** | 1 | 2 | — | 2 | 1 | 2 | 1 | 1 | 2 |
| **I4** | 2 | 1 | 2 | — | 2 | 1 | 2 | 1 | 1 |
| **I5** | 1 | 2 | 1 | 2 | — | 2 | 1 | 2 | 1 |
| **I6** | 1 | 1 | 2 | 1 | 2 | — | 2 | 1 | 2 |
| **I7** | 2 | 1 | 1 | 2 | 1 | 2 | — | 2 | 1 |
| **I8** | 1 | 2 | 1 | 1 | 2 | 1 | 2 | — | 2 |
| **I9** | 2 | 1 | 2 | 1 | 1 | 2 | 1 | 2 | — |

## N = 10 items (10 blocs de 4)

- **Construction retenue** : Meilleur plan cyclique exhaustif
- **Faisabilité BIBD exact (b=N, r=4)** : Non — Impossible avec b=N, r=4 : lambda = 12 / (10 - 1) = 1.3333 n'est pas entier (diviseurs de 12 >= 3 : 3, 4, 6, 12 => N in {4, 5, 7, 13}).
- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = 15` blocs (`r = 6` présentations/item)
- **Fréquence par item** : `[4, 4, 4, 4, 4, 4, 4, 4, 4, 4]` (uniforme : True)
- **Distribution des paires** : `{1: 30, 2: 15}` (moyenne = 1.3333, variance = 0.222222, borne théorique = 0.222222)
- **Connectivité** : 1 composante(s) connexe(s) ; $\lambda_2(L) = 11.3820$ ; D-efficacité = `0.9938`
- **Précision asymptotique sous H0 ($\beta = 0$, $r = 4$)** : SE($\hat{\beta}_i - \hat{\beta}_j$) min = `0.9306`, moy = `0.9544`, max = `0.9687` logits
- **Blocs dupliqués** : 0 (unicité intra-bloc : True)
- **Équilibre exact des positions** : True (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)
- **Chevauchement entre blocs consécutifs** : max linéaire = 1 (moyenne = 1.00), bouclage `B10→B1` = 1 (max cyclique = 1)
- **Test randomisation Monte Carlo (1000 tirages à graines distinctes)** :
  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `1000/1000` (positions `[1,1,1,1]`: `1000/1000`, fréquences `r=4`: `1000/1000`, cooccurrences & connectivité: `1000/1000`, zéro doublon/unicité intra-bloc: `1000/1000`) ; `max_consecutive_overlap` linéaire préservé dans `20/1000` (max observé = `2`), bouclage cyclique `B10→B1` inclus dans `12/1000` (max observé = `2`), total tous invariants testés = `12/1000` ; mélange naïf par bloc `[1,1,1,1]`: `0/1000` (`0.0%`).

### Comparaison des candidats / fonctions objectif

| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\lambda_2(L)$ | SE max H0 | Doublons |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Meilleur plan cyclique exhaustif | 1:30, 2:15 | 0 | 0.2222 | 1 | 0.9938 | 11.38 | 0.969 | 0 |
| Recherche générale — Obj_A (Variance paires) | 1:30, 2:15 | 0 | 0.2222 | 1 | 0.9937 | 11.10 | 0.969 | 0 |
| Recherche générale — Obj_B (Minimax + zéro-paires) | 1:30, 2:15 | 0 | 0.2222 | 1 | 0.9937 | 11.10 | 0.969 | 0 |
| Recherche générale — Obj_C (D-optimalité Laplacien) | 1:30, 2:15 | 0 | 0.2222 | 1 | 0.9938 | 11.38 | 0.969 | 0 |
| Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq) | 1:30, 2:15 | 0 | 0.2222 | 1 | 0.9937 | 11.10 | 0.969 | 0 |

### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)

| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |
|---:|---:|---:|---:|---:|
| B1 | I6 | I1 | I2 | I3 |
| B2 | I3 | I10 | I8 | I9 |
| B3 | I10 | I7 | I5 | I6 |
| B4 | I7 | I3 | I4 | I2 |
| B5 | I4 | I9 | I10 | I1 |
| B6 | I1 | I8 | I6 | I7 |
| B7 | I8 | I4 | I3 | I5 |
| B8 | I2 | I5 | I1 | I10 |
| B9 | I9 | I2 | I7 | I8 |
| B10 | I5 | I6 | I9 | I4 |

### Matrice complète des cooccurrences

| Item | I1 | I2 | I3 | I4 | I5 | I6 | I7 | I8 | I9 | I10 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **I1** | — | 2 | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 2 |
| **I2** | 2 | — | 2 | 1 | 1 | 1 | 2 | 1 | 1 | 1 |
| **I3** | 1 | 2 | — | 2 | 1 | 1 | 1 | 2 | 1 | 1 |
| **I4** | 1 | 1 | 2 | — | 2 | 1 | 1 | 1 | 2 | 1 |
| **I5** | 1 | 1 | 1 | 2 | — | 2 | 1 | 1 | 1 | 2 |
| **I6** | 2 | 1 | 1 | 1 | 2 | — | 2 | 1 | 1 | 1 |
| **I7** | 1 | 2 | 1 | 1 | 1 | 2 | — | 2 | 1 | 1 |
| **I8** | 1 | 1 | 2 | 1 | 1 | 1 | 2 | — | 2 | 1 |
| **I9** | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 2 | — | 2 |
| **I10** | 2 | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 2 | — |

## N = 11 items (11 blocs de 4)

- **Construction retenue** : Meilleur plan cyclique exhaustif
- **Faisabilité BIBD exact (b=N, r=4)** : Non — Impossible avec b=N, r=4 : lambda = 12 / (11 - 1) = 1.2000 n'est pas entier (diviseurs de 12 >= 3 : 3, 4, 6, 12 => N in {4, 5, 7, 13}).
- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = 55` blocs (`r = 20` présentations/item)
- **Fréquence par item** : `[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]` (uniforme : True)
- **Distribution des paires** : `{1: 44, 2: 11}` (moyenne = 1.2000, variance = 0.160000, borne théorique = 0.160000)
- **Connectivité** : 1 composante(s) connexe(s) ; $\lambda_2(L) = 11.3175$ ; D-efficacité = `0.9949`
- **Précision asymptotique sous H0 ($\beta = 0$, $r = 4$)** : SE($\hat{\beta}_i - \hat{\beta}_j$) min = `0.9284`, moy = `0.9583`, max = `0.9665` logits
- **Blocs dupliqués** : 0 (unicité intra-bloc : True)
- **Équilibre exact des positions** : True (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)
- **Chevauchement entre blocs consécutifs** : max linéaire = 1 (moyenne = 1.00), bouclage `B11→B1` = 1 (max cyclique = 1)
- **Test randomisation Monte Carlo (1000 tirages à graines distinctes)** :
  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `1000/1000` (positions `[1,1,1,1]`: `1000/1000`, fréquences `r=4`: `1000/1000`, cooccurrences & connectivité: `1000/1000`, zéro doublon/unicité intra-bloc: `1000/1000`) ; `max_consecutive_overlap` linéaire préservé dans `100/1000` (max observé = `2`), bouclage cyclique `B11→B1` inclus dans `78/1000` (max observé = `2`), total tous invariants testés = `78/1000` ; mélange naïf par bloc `[1,1,1,1]`: `0/1000` (`0.0%`).

### Comparaison des candidats / fonctions objectif

| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\lambda_2(L)$ | SE max H0 | Doublons |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Meilleur plan cyclique exhaustif | 1:44, 2:11 | 0 | 0.1600 | 1 | 0.9949 | 11.32 | 0.967 | 0 |
| Recherche générale — Obj_A (Variance paires) | 1:44, 2:11 | 0 | 0.1600 | 1 | 0.9949 | 11.32 | 0.967 | 0 |
| Recherche générale — Obj_B (Minimax + zéro-paires) | 1:44, 2:11 | 0 | 0.1600 | 1 | 0.9949 | 11.32 | 0.967 | 0 |
| Recherche générale — Obj_C (D-optimalité Laplacien) | 1:44, 2:11 | 0 | 0.1600 | 1 | 0.9949 | 11.32 | 0.967 | 0 |
| Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq) | 1:44, 2:11 | 0 | 0.1600 | 1 | 0.9949 | 11.32 | 0.967 | 0 |

### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)

| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |
|---:|---:|---:|---:|---:|
| B1 | I7 | I10 | I5 | I6 |
| B2 | I10 | I1 | I11 | I4 |
| B3 | I8 | I2 | I10 | I9 |
| B4 | I4 | I7 | I3 | I2 |
| B5 | I9 | I6 | I4 | I5 |
| B6 | I11 | I8 | I6 | I7 |
| B7 | I6 | I3 | I2 | I1 |
| B8 | I5 | I4 | I8 | I3 |
| B9 | I1 | I9 | I7 | I8 |
| B10 | I3 | I11 | I9 | I10 |
| B11 | I2 | I5 | I1 | I11 |

### Matrice complète des cooccurrences

| Item | I1 | I2 | I3 | I4 | I5 | I6 | I7 | I8 | I9 | I10 | I11 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **I1** | — | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 |
| **I2** | 2 | — | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I3** | 1 | 2 | — | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I4** | 1 | 1 | 2 | — | 2 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I5** | 1 | 1 | 1 | 2 | — | 2 | 1 | 1 | 1 | 1 | 1 |
| **I6** | 1 | 1 | 1 | 1 | 2 | — | 2 | 1 | 1 | 1 | 1 |
| **I7** | 1 | 1 | 1 | 1 | 1 | 2 | — | 2 | 1 | 1 | 1 |
| **I8** | 1 | 1 | 1 | 1 | 1 | 1 | 2 | — | 2 | 1 | 1 |
| **I9** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | — | 2 | 1 |
| **I10** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | — | 2 |
| **I11** | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | — |

## N = 12 items (12 blocs de 4)

- **Construction retenue** : Plan circulant quasi équilibré {0,1,3,7} mod 12 (variance min)
- **Faisabilité BIBD exact (b=N, r=4)** : Non — Impossible avec b=N, r=4 : lambda = 12 / (12 - 1) = 1.0909 n'est pas entier (diviseurs de 12 >= 3 : 3, 4, 6, 12 => N in {4, 5, 7, 13}).
- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = 33` blocs (`r = 11` présentations/item)
- **Fréquence par item** : `[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]` (uniforme : True)
- **Distribution des paires** : `{1: 60, 2: 6}` (moyenne = 1.0909, variance = 0.082645, borne théorique = 0.082645)
- **Connectivité** : 1 composante(s) connexe(s) ; $\lambda_2(L) = 12.0000$ ; D-efficacité = `0.9971`
- **Précision asymptotique sous H0 ($\beta = 0$, $r = 4$)** : SE($\hat{\beta}_i - \hat{\beta}_j$) min = `0.9258`, moy = `0.9602`, max = `0.9636` logits
- **Blocs dupliqués** : 0 (unicité intra-bloc : True)
- **Équilibre exact des positions** : True (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)
- **Chevauchement entre blocs consécutifs** : max linéaire = 1 (moyenne = 1.00), bouclage `B12→B1` = 1 (max cyclique = 1)
- **Test randomisation Monte Carlo (1000 tirages à graines distinctes)** :
  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `1000/1000` (positions `[1,1,1,1]`: `1000/1000`, fréquences `r=4`: `1000/1000`, cooccurrences & connectivité: `1000/1000`, zéro doublon/unicité intra-bloc: `1000/1000`) ; `max_consecutive_overlap` linéaire préservé dans `341/1000` (max observé = `2`), bouclage cyclique `B12→B1` inclus dans `314/1000` (max observé = `2`), total tous invariants testés = `314/1000` ; mélange naïf par bloc `[1,1,1,1]`: `0/1000` (`0.0%`).

### Comparaison des candidats / fonctions objectif

| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\lambda_2(L)$ | SE max H0 | Doublons |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Plan circulant quasi équilibré {0,1,3,7} mod 12 (variance min) | 1:60, 2:6 | 0 | 0.0826 | 1 | 0.9971 | 12.00 | 0.964 | 0 |
| Meilleur plan cyclique exhaustif | 1:60, 2:6 | 0 | 0.0826 | 1 | 0.9971 | 12.00 | 0.964 | 0 |
| Recherche générale — Obj_A (Variance paires) | 1:60, 2:6 | 0 | 0.0826 | 1 | 0.9971 | 12.00 | 0.964 | 0 |
| Recherche générale — Obj_B (Minimax + zéro-paires) | 1:60, 2:6 | 0 | 0.0826 | 1 | 0.9971 | 12.00 | 0.964 | 0 |
| Recherche générale — Obj_C (D-optimalité Laplacien) | 1:60, 2:6 | 0 | 0.0826 | 1 | 0.9971 | 12.00 | 0.964 | 0 |
| Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq) | 1:60, 2:6 | 0 | 0.0826 | 1 | 0.9971 | 12.00 | 0.964 | 0 |

### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)

| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |
|---:|---:|---:|---:|---:|
| B1 | I8 | I1 | I2 | I4 |
| B2 | I2 | I5 | I9 | I3 |
| B3 | I10 | I3 | I4 | I6 |
| B4 | I5 | I4 | I11 | I7 |
| B5 | I12 | I8 | I6 | I5 |
| B6 | I9 | I6 | I7 | I1 |
| B7 | I7 | I10 | I8 | I2 |
| B8 | I11 | I9 | I3 | I8 |
| B9 | I4 | I12 | I10 | I9 |
| B10 | I1 | I11 | I5 | I10 |
| B11 | I6 | I2 | I12 | I11 |
| B12 | I3 | I7 | I1 | I12 |

### Matrice complète des cooccurrences

| Item | I1 | I2 | I3 | I4 | I5 | I6 | I7 | I8 | I9 | I10 | I11 | I12 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **I1** | — | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 1 |
| **I2** | 1 | — | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 1 |
| **I3** | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 1 |
| **I4** | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 1 |
| **I5** | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 2 | 1 |
| **I6** | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 2 |
| **I7** | 2 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 |
| **I8** | 1 | 2 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 |
| **I9** | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 |
| **I10** | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 |
| **I11** | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 1 | — | 1 |
| **I12** | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 1 | — |

## N = 13 items (13 blocs de 4)

- **Construction retenue** : BIBD exact (13,4,1) — plan projectif PG(2,3) (Singer)
- **Faisabilité BIBD exact (b=N, r=4)** : Oui — 12 / (13 - 1) = 1 entier ; existe comme plan projectif PG(2,3).
- **b_min arithmétique nécessaire si BIBD (r libre, k=4)** : `b_min = 13` blocs (`r = 4` présentations/item)
- **Fréquence par item** : `[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]` (uniforme : True)
- **Distribution des paires** : `{1: 78}` (moyenne = 1.0000, variance = 0.000000, borne théorique = 0.000000)
- **Connectivité** : 1 composante(s) connexe(s) ; $\lambda_2(L) = 13.0000$ ; D-efficacité = `1.0000`
- **Précision asymptotique sous H0 ($\beta = 0$, $r = 4$)** : SE($\hat{\beta}_i - \hat{\beta}_j$) min = `0.9608`, moy = `0.9608`, max = `0.9608` logits
- **Blocs dupliqués** : 0 (unicité intra-bloc : True)
- **Équilibre exact des positions** : True (chaque item apparaît `[1, 1, 1, 1]` fois aux positions 1..4)
- **Chevauchement entre blocs consécutifs** : max linéaire = 1 (moyenne = 1.00), bouclage `B13→B1` = 1 (max cyclique = 1)
- **Test randomisation Monte Carlo (1000 tirages à graines distinctes)** :
  - *Exploratoire (`pi x tau x sigma dans S_N`)* : invariants hors ordre préservés dans `1000/1000` (positions `[1,1,1,1]`: `1000/1000`, fréquences `r=4`: `1000/1000`, cooccurrences & connectivité: `1000/1000`, zéro doublon/unicité intra-bloc: `1000/1000`) ; `max_consecutive_overlap` linéaire préservé dans `1000/1000` (max observé = `1`), bouclage cyclique `B13→B1` inclus dans `1000/1000` (max observé = `1`), total tous invariants testés = `1000/1000` ; mélange naïf par bloc `[1,1,1,1]`: `0/1000` (`0.0%`).

### Comparaison des candidats / fonctions objectif

| Candidat | Histogramme paires | Paires à 0 | Variance | Étendue | D-eff | $\lambda_2(L)$ | SE max H0 | Doublons |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| BIBD exact (13,4,1) — plan projectif PG(2,3) (Singer) | 1:78 | 0 | 0.0000 | 0 | 1.0000 | 13.00 | 0.961 | 0 |
| Meilleur plan cyclique exhaustif | 1:78 | 0 | 0.0000 | 0 | 1.0000 | 13.00 | 0.961 | 0 |
| Recherche générale — Obj_A (Variance paires) | 1:78 | 0 | 0.0000 | 0 | 1.0000 | 13.00 | 0.961 | 0 |
| Recherche générale — Obj_B (Minimax + zéro-paires) | 1:78 | 0 | 0.0000 | 0 | 1.0000 | 13.00 | 0.961 | 0 |
| Recherche générale — Obj_C (D-optimalité Laplacien) | 0:4, 1:70, 2:4 | 4 | 0.1026 | 2 | 0.9960 | 11.00 | 1.003 | 0 |
| Recherche générale — Obj_D (Pondérée 100·dup + 10·zero + sq) | 1:78 | 0 | 0.0000 | 0 | 1.0000 | 13.00 | 0.961 | 0 |

### Séquence ordonnée des blocs (positions 1 à 4, indices 1..N)

| Bloc | Pos 1 | Pos 2 | Pos 3 | Pos 4 |
|---:|---:|---:|---:|---:|
| B1 | I4 | I10 | I1 | I2 |
| B2 | I5 | I2 | I11 | I3 |
| B3 | I6 | I12 | I3 | I4 |
| B4 | I13 | I4 | I7 | I5 |
| B5 | I8 | I5 | I6 | I1 |
| B6 | I7 | I6 | I2 | I9 |
| B7 | I10 | I3 | I8 | I7 |
| B8 | I9 | I11 | I4 | I8 |
| B9 | I12 | I9 | I5 | I10 |
| B10 | I11 | I13 | I10 | I6 |
| B11 | I1 | I7 | I12 | I11 |
| B12 | I2 | I8 | I13 | I12 |
| B13 | I3 | I1 | I9 | I13 |

### Matrice complète des cooccurrences

| Item | I1 | I2 | I3 | I4 | I5 | I6 | I7 | I8 | I9 | I10 | I11 | I12 | I13 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **I1** | — | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I2** | 1 | — | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I3** | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I4** | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I5** | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I6** | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **I7** | 1 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 | 1 |
| **I8** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 | 1 |
| **I9** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 | 1 |
| **I10** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 | 1 |
| **I11** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | — | 1 | 1 |
| **I12** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | — | 1 |
| **I13** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | — |
