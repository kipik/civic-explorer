# Kit imprimable du dry run interne (`DRY-RUN INTERNE`)

> **Statut :** **`AUTORISÉ EXCLUSIVEMENT EN INTERNE — NE PAS INCLURE DANS L'ÉCHANTILLON FUTUR`**  
> **Cadre autorisé :** support **papier**, disposition **`2×2`**, **livret de périmètre complet accessible**, instances **`DR-INST-1` et `DR-INST-2`**, au minimum **1 répétition A et 1 répétition B** (idéalement **2 répétitions par variante** si les disponibilités le permettent).  
> **Hors périmètre et non approuvés :** aucun changement dans `src/` ni dans `P1.1 V0.3`, aucun recrutement externe, aucun entretien avec des participants extérieurs, aucune approbation définitive de la stratification A/B, de l'appariement A/B, de la randomisation définitive du prétest externe ni de la conformité juridique/RGPD.

---

## 1. Inventaire des dossiers et documents imprimables

| Fichier | Rôle et destinataire | Impression conseillée |
|---|---|---|
| [`CONSIGNES_PASSATION_ET_FEUILLE_ROUTE_DRY_RUN.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/CONSIGNES_PASSATION_ET_FEUILLE_ROUTE_DRY_RUN.md) | Guide complet enquêteur / observateur : checklist de table, scripts mot pour mot adaptés `DRY-RUN INTERNE`, pense-bête relances neutres et fiche `L17` pré-estampillée. | `1` exemplaire par séance (A4 portrait). |
| [`DOSSIER_DR-A1_INST1_VARIANTE_A.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/DOSSIER_DR-A1_INST1_VARIANTE_A.md) | **Carnet participant `DR-A1`** (`DR-INST-1`, **Variante A — Panorama préalable** : Écran 1 + Écran 2A dans $\rho_1$ + `S1..S8` en grille `2×2`). | Pages 1–2 en A4 portrait ; Séries `S1..S8` en **A4 paysage** (`1` feuille par série). |
| [`DOSSIER_DR-B1_INST1_VARIANTE_B.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/DOSSIER_DR-B1_INST1_VARIANTE_B.md) | **Carnet participant `DR-B1`** (`DR-INST-1`, **Variante B — Découverte progressive** : Écran 1 + Écran 2B sans panorama + `S1..S8` en grille `2×2` identiques à `DR-A1`). | Pages 1–2 en A4 portrait ; Séries `S1..S8` en **A4 paysage** (`1` feuille par série). |
| [`LIVRET_PERIMETRE_DR-INST-1.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/LIVRET_PERIMETRE_DR-INST-1.md) | **Livret fermé commun `DR-INST-1`** *« Voir le périmètre complet des 8 domaines »* (ordre $\rho_1$, identique pour `DR-A1` et `DR-B1`, sans code `DOM-XX` ni `E01..E68`). | Couverture + 8 fiches agrafées/reliées, posé **fermé** sur la table dès `2A`/`2B`. |
| [`DOSSIER_DR-A2_INST2_VARIANTE_A.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/DOSSIER_DR-A2_INST2_VARIANTE_A.md) | **Carnet participant `DR-A2`** (`DR-INST-2`, **Variante A**, si 2e paire réalisée). | Idem `DR-A1`. |
| [`DOSSIER_DR-B2_INST2_VARIANTE_B.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/DOSSIER_DR-B2_INST2_VARIANTE_B.md) | **Carnet participant `DR-B2`** (`DR-INST-2`, **Variante B**, si 2e paire réalisée). | Idem `DR-B1`. |
| [`LIVRET_PERIMETRE_DR-INST-2.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/LIVRET_PERIMETRE_DR-INST-2.md) | **Livret fermé commun `DR-INST-2`** *« Voir le périmètre complet des 8 domaines »* (ordre $\rho_2$, identique pour `DR-A2` et `DR-B2`, sans code `DOM-XX` ni `E01..E68`). | Idem `LIVRET_PERIMETRE_DR-INST-1.md`. |
| [`POCHETTES_D_ET_E_IMPRIMABLES.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/POCHETTES_D_ET_E_IMPRIMABLES.md) | **Pochette `D`** (8 cartons A6 de référence + fiches `Strate 2.1`) et **Pochette `E`** (4 paires neutres `1B`, `2B`, `7B`, `8B` à isoler strictement jusqu'à fin de `D.4`). | Découper et placer en pochettes opaques séparées hors champ visuel pendant `S1..S8`. |
| [`MODELE_COMPTE_RENDU_FACTUEL_DRY_RUN.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/dry-run/MODELE_COMPTE_RENDU_FACTUEL_DRY_RUN.md) | **Compte rendu factuel post-dry-run** couvrant les 7 rubriques obligatoires, la distinction `[OBS]` / `[INTERP]` et l'interdiction de conclusion scientifique/statistique. | À remplir après clôture des répétitions internes. |

---

## 2. Traçabilité combinatoire des instances générées (`audit_maxdiff_designs.py`)

Les séquences de `DR-INST-1` et `DR-INST-2` ont été générées directement par `randomize_pilot_n8_dihedral` (`docs/experiments/maxdiff/audit_maxdiff_designs.py`) sur le plan canonique `N = 8, b = 8, k = 4, r = 4` (`designs_N6_to_N13.json`), avec `Pos 1 = HG`, `Pos 2 = HD`, `Pos 3 = BG`, `Pos 4 = BD` :

- **`DR-INST-1`** (`seed_dihedral = 101`, `seed_rho = 201`) :
  - Ordre $\rho_1$ (Panorama `2A` et Livret `DR-INST-1`) : `DOM-05`, `DOM-07`, `DOM-08`, `DOM-01`, `DOM-04`, `DOM-03`, `DOM-06`, `DOM-02`.
  - Invariants vérifiés : équilibre exact des positions `[1, 1, 1, 1]`, fréquence uniforme `r = 4`, 0 doublon, chevauchement consécutif `= 1` (linéaire et cyclique `S8 → S1`), $D_{\mathrm{eff}} = 0.995677$.
- **`DR-INST-2`** (`seed_dihedral = 102`, `seed_rho = 202`) :
  - Ordre $\rho_2$ (Panorama `2A` et Livret `DR-INST-2`) : `DOM-03`, `DOM-05`, `DOM-01`, `DOM-02`, `DOM-08`, `DOM-04`, `DOM-06`, `DOM-07`.
  - Invariants vérifiés : équilibre exact des positions `[1, 1, 1, 1]`, fréquence uniforme `r = 4`, 0 doublon, chevauchement consécutif `= 1` (linéaire et cyclique `S8 → S1`), $D_{\mathrm{eff}} = 0.995677$.
