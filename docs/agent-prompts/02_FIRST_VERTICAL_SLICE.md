# Prompt agent — Première tranche verticale privacy-first

Lis impérativement `AGENTS.md`, `docs/00_PRODUCT_BRIEF.md`, `docs/01_ARCHITECTURE.md`, `docs/02_PRIVACY_SECURITY.md`, `docs/03_DATA_MODEL.md`, `docs/04_METHODS.md`, `docs/05_UX_INTERACTIONS.md`, `docs/06_TESTING_VALIDATION.md` et `docs/07_BACKLOG.md`.

## Mission

Implémenter uniquement l'EPIC 1, tranche verticale du prototype, après validation du bootstrap.

## Parcours demandé

1. accueil expliquant le service et ses limites ;
2. démarrer une session anonyme ;
3. saisir une ou plusieurs préoccupations en texte libre ;
4. faire un exercice MaxDiff de démonstration avec 4 à 6 cartes neutres et explicitement fictives ;
5. permettre de choisir un item « le plus important » et un différent « le moins important » ;
6. proposer passer / NSP ;
7. afficher une synthèse des seules réponses effectivement données ;
8. permettre correction et suppression ;
9. exporter un JSON versionné par clic volontaire ;
10. effacer la session en mémoire.

## Contraintes bloquantes

- Pas de candidats ou partis réels dans les données de démonstration.
- Pas de score, classement, pourcentage, barre de compatibilité ou catégorie idéologique.
- Pas de serveur/API recevant les réponses.
- Pas de localStorage, sessionStorage, IndexedDB, cookies ou URL pour stocker les réponses.
- Pas d'analytics, de replay, de télémétrie ou d'appel IA.
- Ne pas afficher les choix d'un utilisateur dans les logs.
- Les contenus de démo portent clairement une étiquette illustrative.
- La synthèse n'ajoute aucune interprétation non confirmée.
- Interface utilisable au clavier et sur mobile.

## Tests obligatoires

- unit tests sur les états et validations ;
- test E2E du parcours complet ;
- test export JSON ;
- test effacement ;
- test canari démontrant que le texte saisi n'apparaît dans aucune requête réseau ni stockage navigateur ;
- lint, typecheck, tests et build.

## Méthode de travail

Ne pas construire toutes les fonctionnalités futures. Si une décision méthodologique manque, documente l'hypothèse et choisis une option simple, explicite et réversible. Ne jamais inventer une précision scientifique.

À la fin, résume les fichiers modifiés, les tests réellement exécutés, les résultats et les limites restantes.
