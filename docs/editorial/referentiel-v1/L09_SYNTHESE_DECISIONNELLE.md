# L09 — Synthèse décisionnelle pour le porteur du projet

**Objet :** Présenter de façon transparente les acquis de cette mission de refonte éditoriale, les décisions qui restent de la responsabilité exclusive du porteur de projet, et la séquence recommandée avant toute révision de la spécification P1.1 ou développement applicatif.

---

## 1. Vérification des critères d'acceptation de la mission

| Critère de mission | État | Référence dans le nouveau dossier |
|---|---|---|
| Travailler dans un nouveau dossier sans écraser la V0.3 | **Respecté** | `docs/editorial/referentiel-v1/` (fichiers V0.3 intacts) |
| Étudier au moins trois architectures réellement différentes | **Respecté** | `L02` (A1, A2, A3 aux logiques de découpage distinctes) |
| Couverture des principaux champs du débat présidentiel | **Respecté** | `L01` (68 sous-enjeux) & `L05` (matrice 100 % couverte) |
| Place identifiable pour l'Europe et les relations internationales | **Respecté** | `DOM-08` *Place de la France en Europe et dans le monde* (`L04`) |
| Niveau d'abstraction comparable entre domaines | **Respecté** | `L03` critère 4 & `DOM-07` (Justice, libertés et démocratie) |
| Chevauchements explicités | **Respecté** | `L04` (§ 7 par fiche) & `L05` (§ 1 et § 2.B/C) |
| Angles morts identifiés | **Respecté** | `L01` § 1, `L02`, `L05` § 2.C/D (finances, économie, culture, outre-mer) |
| Orientations contradictoires analysées | **Respecté** | `L06` (28 cas documentés, >= 3 par domaine, avec traitement N2) |
| Proposition d'exploration au Niveau 2 pour chaque domaine | **Respecté** | `L07` (7 rubriques détaillées pour chacun des 8 domaines) |
| Préservation des 7 construits initiaux et absence de score composite | **Respecté** | Transversal à `L04`, `L06`, `L07` |
| Protocole de test cognitif comparant Variante A et Variante B | **Respecté** | `L08` (guide d'entretien, grille d'observation, critères d'arbitrage) |
| Absence de modification du code ou réécriture prématurée de `P1_1_SPECIFICATION_v0.3.md` | **Respecté** | Aucune modification hors nouveau dossier |

---

## 2. Les six décisions restant à trancher par le porteur du projet

Avant de lancer la révision de la spécification P1.1 et le prétest cognitif (`L08`), le porteur du projet doit statuer sur six points précis :

### Décision 1 — Validation de l'Architecture 1 vs alternatives (`N = 8`)
- **Question :** Validez-vous le choix de l'**Architecture 1** (`L03` / `L04`), qui **sépare la Sécurité (`DOM-06`) de la Justice, des libertés et de la démocratie (`DOM-07`)** et crée **`DOM-08` (Europe et monde)** au prix d'un regroupement au Niveau 1 de **Santé + Solidarités (`DOM-01`)** et de **Économie + Travail/Activités + Finances publiques (`DOM-02`)** ?
- **Options alternatives documentées :**
  - *Option alternative 1 :* basculer sur l'**Architecture 3** (retirer « Institutions et démocratie » du MaxDiff Niveau 1 pour garder `Santé` et `Solidarités` séparés — déconseillé en raison de l'angle mort démocratique).
  - *Option alternative 2 :* rouvrir la décision `D4` pour passer à **`N = 9` ou `N = 10` domaines** (permettant de garder à la fois `Santé` ≠ `Solidarités`, `Travail/Temps` ≠ `Économie`, `Sécurité` ≠ `Justice/Libertés/Démocratie`, et `Europe/Monde`), sachant que des plans `N=9` (`D_eff=0.9941`) et `N=10` (`D_eff=0.9938`) existent déjà dans `METRICS_REPORT.md` au prix d'un ou deux écrans MaxDiff supplémentaires.
- **Recommandation :** valider l'Architecture 1 à `N = 8` pour la phase de test cognitif (`L08`), et n'envisager `N = 9`/`N = 10` que si les entretiens montrent une impossibilité cognitive avérée sur `DOM-01` ou `DOM-02`.

### Décision 2 — Arbitrage des variantes lexicales de travail pour le prétest (`L04`)
- **Question :** Pour chacun des 8 domaines, faut-il soumettre en prétest la **Variante 1** (plus explicite sur les sous-composantes, légèrement plus longue) ou tester comparativement **Variante 1 vs Variante 2** (plus concise) ?
- **Points de vigilance particuliers :**
  - **`DOM-01` :** conserver le terme *« solidarités »* (Variante 1) ou préférer *« soutien collectif / formes d'entraide »* (Variante 2) pour éviter toute connotation normative ?
  - **`DOM-02` :** vérifier que la formulation d'ouverture (*« L'économie, le travail... »* vs *« Le niveau de vie, l'appareil productif, les différentes formes d'activités... »*) ne provoque pas un écrasement des *activités non rémunérées* par le *pouvoir d'achat*.
  - **`DOM-08` :** arbitrer l'ordre de mention des sous-thèmes afin que « frontières et migrations » ne monopolise pas la lecture au détriment de l'UE, de la défense et du commerce.
- **Recommandation :** retenir des paires de variantes ciblées sur les cartes sensibles (`DOM-01`, `DOM-02`, `DOM-08`) à départager lors du protocole `L08`.

### Décision 3 — Traitement de la laïcité et du pluralisme (`E38`)
- **Question :** Confirmez-vous le rattachement principal de la laïcité, du pluralisme et de la lutte contre les discriminations à **`DOM-07` (Justice, libertés publiques et démocratie)** plutôt qu'à `DOM-04` (Éducation, savoirs, recherche et culture) ?
- **Recommandation :** maintenir `DOM-07` (cadre juridique des droits et libertés), avec mention explicite dans la note de périmètre consultable et renvoi dans `DOM-04` pour les politiques culturelles et scolaires.

### Décision 4 — Périmètre exact du pilote avant implémentation (`Niveau 1 seul` vs `Niveau 1 + Niveau 2 minimal`)
- **Question :** Le prochain lot applicatif (`P1.1-impl` révisé) doit-il implémenter uniquement le Niveau 1 (8 domaines MaxDiff + enjeux manquants + exploration libre des raisons actuelle) ou intégrer déjà la **Strate 2.1 du Niveau 2** (sélection des sous-enjeux précis pour démêler `DOM-01`, `DOM-02`, `DOM-05`, `DOM-08`) ?
- **Recommandation :** prévoir dès la future révision V0.4 de P1.1 l'ajout léger de la **Strate 2.1** (choix facultatif des sous-enjeux à l'entrée de l'exploration des raisons) afin de ne pas laisser `DOM-01`, `DOM-02` et `DOM-08` sans désambiguïsation lors de la restitution.

### Décision 5 — Cadre et calendrier du prétest cognitif (`L08`)
- **Question :** Validez-vous le lancement du prétest qualitatif sur **12 à 16 participants** comparant **Variante A (Panorama préalable)** et **Variante B (Découverte progressive)** sur la base des fiches `L04` ?
- **Condition préalable :** respecter strictement la règle de confidentialité (aucune collecte de données personnelles d'opinion sur serveur applicatif ; consentement distinct d'entretien qualitatif hors production).

### Décision 6 — Charte éditoriale et comité pluraliste (`08_GOVERNANCE_CONTENT.md`)
- **Question :** Qui compose le panel de revue pluraliste appelé à relire le référentiel issu de `L04` et des résultats de `L08`, avant toute ouverture publique ou rédaction des fiches documentaires de Niveau 2 (Strate 2.4) ?
- **Rappel bloquant :** aucune fiche « position des candidats » (Strate 2.4) ne doit être publiée sans sources datées, distinctions preuve/déclaration/vote et revue humaine pluraliste documentée.

---

## 3. Séquence recommandée pour la suite du projet

1. **Arbitrage du porteur de projet** sur les décisions 1 à 5 ci-dessus.
2. **Préparation du support de prétest** (maquette locale ou prototype statique non indexé, sans envoi de données) intégrant les variantes A et B décrites en [`L08_PROTOCOLE_TEST_COGNITIF.md`](file:///c:/Users/kipik/Dev/civic-explorer/docs/editorial/referentiel-v1/L08_PROTOCOLE_TEST_COGNITIF.md).
3. **Conduite des 12 à 16 entretiens cognitifs** et synthèse des ajustements lexicaux ou structurels (y compris arbitrage final Variante A vs Variante B et confirmation de `N = 8`).
4. **Revue éditoriale pluraliste documentée** du jeu de 8 domaines ajusté (`editorialStatus: "pluralist_reviewed"`).
5. **Révision consolidée de la spécification fonctionnelle (`P1.1 V0.4`)** intégrant la taxonomie validée des 8 domaines, le mode de présentation initial retenu (A ou B) et le contrat de Niveau 2 (`L07`).
6. **Implémentation du code (`src/`)** uniquement après clôture des étapes 1 à 5.
