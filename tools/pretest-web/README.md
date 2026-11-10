# Support web statique local — Passations & Recueil L17 (`L13`–`L21`)

> **Cadre et séparation stricte :** cet outil autonome hors ligne met en œuvre le **dry run interne (`DR-INST-1` / `DR-INST-2`)** et le protocole de **prétest cognitif (`L13`–`L21`)** sur le référentiel harmonisé `L11`. Il est strictement isolé de `src/` et du futur parcours pilote `P1.1 V0.3`.

## 1. Architecture et confidentialité

- **100 % statique et local** : aucune donnée n'est envoyée à un serveur (`connect-src 'none'`), aucun cookie, aucun `localStorage` ni `IndexedDB`. Toute la session vit uniquement en mémoire dans l'onglet.
- **Zéro dépendance externe** : fonctionne aussi bien en ouvrant directement les fichiers HTML dans un navigateur (`file://`) qu'en étant servi par n'importe quel serveur statique.
- **Deux points d'entrée distincts** :
  - [`index.html`](./index.html) : **Passation autonome participant** (Variante A Panorama préalable ou Variante B Découverte progressive, `N = 8, b = 8, k = 4, r = 4` selon `randomize_pilot_n8_dihedral`, grille `2×2`, livret périmètre, débriefing guidé `D.1`–`D.4`, débriefing lexical `1B/2B/7B/8B` verrouillé jusqu'à fin de `D.4`, clôture et export `.json` explicite).
  - [`observations.html`](./observations.html) : **Console locale d'observations `L17`** pour l'équipe — import multi-fichiers `.json`, séparation visuelle et verrouillage des faits bruts `[OBS]` face au codage `[INTERP]`, ajout de notes manuelles, et export direct des 4 onglets CSV (`01_Observations.csv`, `02_Synthese_Participant.csv`, `03_Debriefing_Lexical.csv`, `04_Synthese_Domaine.csv`) en UTF-8 BOM avec séparateur `;`.

## 2. Utilisation rapide

### Ouvrir directement sans serveur

1. Ouvrir [`index.html`](./index.html) dans Chrome, Edge ou Firefox pour passer une séance (`DR-A1`, `DR-B1`, `DR-A2`, `DR-B2`, ou graine personnalisée) et télécharger le fichier `.json` en fin de parcours.
2. Ouvrir [`observations.html`](./observations.html) pour importer les fichiers `.json` reçus, coder les colonnes `[INTERP]` et exporter les 4 CSV `L17`.

### Ou servir localement en HTTP

```bash
pnpm exec node tools/pretest-web/serve.mjs
```

Puis ouvrir `http://127.0.0.1:4173/index.html` ou `http://127.0.0.1:4173/observations.html`.

### Lancer les tests automatisés du module

```bash
pnpm exec node --test tools/pretest-web/tests/*.test.mjs
```
