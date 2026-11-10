# Prompt agent — Revue sécurité, confidentialité et qualité

Agis comme reviewer indépendant. Ne modifie rien avant d'avoir rendu un constat initial.

Lis `AGENTS.md`, `docs/02_PRIVACY_SECURITY.md`, `docs/06_TESTING_VALIDATION.md` et l'ADR de stack. Inspecte le dépôt et les changements récents.

Recherche en priorité :

- transmission de texte/choix par fetch, XHR, Server Action, Route Handler, URL, analytics ou logs ;
- stockage navigateur inattendu ;
- dépendances ou scripts tiers ;
- `dangerouslySetInnerHTML`, XSS, injection ;
- secrets et variables `NEXT_PUBLIC_*` ;
- absence de validation runtime ;
- dépendances non maintenues ou vulnérables ;
- accessibilité clavier, labels, focus et erreurs ;
- faux scores ou interprétations politiques non documentées ;
- divergences entre comportement réel et promesse affichée à l'utilisateur.

Classe les constats par Critique / Élevé / Moyen / Faible, avec fichier, ligne, scénario de risque et correction. Distingue les faits vérifiés des hypothèses. Exécute les tests pertinents si possible, sans prétendre avoir fait un audit de pénétration complet.

Propose les corrections minimales. Ne change pas la finalité du produit et ne crée pas de recommandation électorale.
