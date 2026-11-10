# 06 — Tests logiciels et validation scientifique

## 1. Pyramide de tests

### Unitaires (Vitest)

- validation des schémas Zod ;
- règles de transition des états de réponse ;
- MaxDiff : best/worst distincts et appartenant au choix set ;
- export JSON : schéma, absence de champs inattendus ;
- effacement de session ;
- logique adaptative déterministe et versionnée ;
- fonctions de domaine sans dépendance UI.

### Composants (Testing Library)

- interaction clavier ;
- états NSP / passer / incertain / dépend ;
- correction des réponses ;
- affichage mobile ;
- messages d'erreur ;
- confirmations d'export et d'effacement.

### E2E (Playwright)

- démarrer une session et compléter le parcours ;
- modifier une déclaration ;
- passer une question ;
- exporter un JSON valide ;
- effacer la session ;
- vérifier l'absence de stockage persistant ;
- vérifier qu'aucune réponse ne figure dans les requêtes réseau ;
- vérifier qu'aucun texte de réponse n'est présent dans les logs de test ;
- parcours clavier et viewport mobile.

Ajouter axe-core/Playwright ou équivalent pour les contrôles automatisés d'accessibilité, sans considérer que cela remplace un audit manuel.

## 2. Tests de confidentialité bloquants

Créer une valeur canari unique dans le champ de texte. Vérifier qu'elle n'apparaît pas :

- dans une requête réseau (URL, headers, body) ;
- dans localStorage, sessionStorage, IndexedDB ou cookies ;
- dans les logs simulés ;
- dans les traces d'erreur ;
- dans les outils d'analytics (qui doivent être absents).

Le test doit échouer si une nouvelle intégration réseau capte ce texte.

## 3. Tests de sécurité

- validation des entrées ;
- XSS par texte utilisateur ;
- injection HTML ;
- CSP et en-têtes ;
- absence de secrets dans les bundles ;
- audit des dépendances ;
- limites de payload ;
- vérification des erreurs en production ;
- revue des permissions si back-office futur.

Référentiel de contrôle suggéré : OWASP ASVS 5.0.0, à adapter au périmètre.

## 4. Validation UX et cognitive

Entretiens cognitifs avec des participants aux expériences et sensibilités variées. Demander aux participants de reformuler ce qu'ils comprennent, expliquer comment ils ont répondu et signaler les mots ambigus.

Observer :

- fidélité des reformulations ;
- compréhension de « priorité » vs « position » ;
- facilité à répondre sous condition ;
- sentiment de liberté de passer ;
- effet d'ordre et de formulation ;
- perception de neutralité ;
- charge cognitive et fatigue.

Ne pas recruter uniquement dans un cercle politique ou social homogène.

## 5. Validation quantitative future

Préparer séparément les protocoles MaxDiff, DCE et IRT. Documenter population, recrutement, taille d'échantillon, plans de choix, randomisation, estimation, données manquantes, analyses de sensibilité et limites de généralisation.

Ne pas confondre :
- cohérence interne ;
- fidélité test-retest ;
- validité de construit ;
- validité prédictive ;
- fidélité de reformulation ;
- acceptabilité UX.

Aucune métrique unique ne prouve que le profil est « vrai ».

## 6. Gates avant release

- `lint` OK ;
- `typecheck` OK ;
- tests unitaires et composants OK ;
- E2E principaux OK ;
- build de production OK ;
- test de fuite de réponse OK ;
- revue manuelle du diff ;
- aucune vulnérabilité critique ou élevée non traitée sans décision documentée ;
- contrôle d'accessibilité effectué ;
- changelog et limites mis à jour.
