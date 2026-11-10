# 02 — Confidentialité, sécurité et RGPD

> Document de conception technique, pas un avis juridique. Avant ouverture au public, faire valider les finalités, bases légales, notices, sous-traitants et éventuelle AIPD par une personne compétente en protection des données.

## 1. Niveau de sensibilité

Les réponses peuvent révéler des opinions politiques. L'article 9 du RGPD classe les opinions politiques parmi les catégories particulières de données. Le caractère anonyme d'une interface ne suffit pas automatiquement à faire disparaître les enjeux : les adresses IP, identifiants de session, horodatages et autres éléments peuvent rendre une personne identifiable.

Le produit applique donc un niveau de protection élevé même lorsque le MVP ne conserve pas de réponse côté serveur.

## 2. Architecture privacy-first du MVP

- Aucune authentification.
- Aucune base de données de réponses.
- État de session en mémoire dans l'onglet.
- Aucune écriture automatique dans localStorage, IndexedDB, cookies ou URL.
- Pas d'API métier recevant le texte ou les choix.
- Pas d'analytics tiers, pixel, session replay, heatmap, publicité ou fingerprinting.
- Pas de LLM externe.
- Export JSON uniquement à la demande explicite de l'utilisateur.
- Bouton « Effacer ma session » qui réinitialise l'état local.
- À la fermeture ou au rechargement de l'onglet, prévenir que la session non exportée peut être perdue.

L'absence de stockage applicatif ne dispense pas d'examiner les journaux du serveur, l'hébergeur, les CDN, les outils de sécurité et les données de connexion.

## 3. Politique réseau

Dans le MVP, les seules requêtes autorisées sont celles nécessaires au chargement de l'application et des ressources publiques du même domaine.

Interdits sans ADR et revue privacy :

- envoi de réponses dans un POST ;
- événements analytics contenant le nom d'un thème choisi ou le contenu saisi ;
- query strings reprenant les réponses ;
- appels vers un modèle externe ;
- scripts tiers qui peuvent lire le DOM ;
- intégration de widgets sociaux ou publicitaires.

Ajouter un test E2E qui saisit une réponse canari et vérifie qu'elle n'apparaît dans aucune requête réseau, console serveur simulée ou URL.

## 4. Export

- L'export est toujours initié par un clic explicite.
- Afficher le contenu et le format exportés.
- Le fichier ne doit contenir aucun identifiant caché, fingerprint, IP ou donnée technique non nécessaire.
- Le nom du fichier ne doit pas encoder une opinion.
- Ne jamais envoyer automatiquement l'export à un serveur.
- Fournir un avertissement indiquant que le fichier exporté peut révéler des opinions politiques et doit être conservé avec prudence.

## 5. Intégration IA future — bloquée par défaut

Un futur besoin d'IA ne justifie pas un transfert implicite.

Conditions minimales avant activation :

1. définir une finalité spécifique et une base légale appropriée ; analyser l'article 9 RGPD ;
2. vérifier si un consentement explicite distinct est requis et recueilli sans ambiguïté ;
3. expliquer le texte exact envoyé, le fournisseur, les sous-traitants, la localisation, les durées et les usages ;
4. envoyer uniquement le fragment indispensable, pas tout le profil ;
5. ne jamais transmettre les réponses sans action positive de l'utilisateur ;
6. vérifier contrat de sous-traitance, absence d'entraînement, politique de rétention, transferts internationaux et sécurité ;
7. privilégier une inférence auto-hébergée dans l'EEE si elle apporte une meilleure maîtrise et si les coûts/performances le permettent ;
8. garder un mode sans IA fonctionnel ;
9. tester les risques de prompt injection et d'exfiltration ;
10. documenter le traitement et vérifier la nécessité d'une AIPD.

Le fournisseur devra être choisi après comparaison réelle. Ne pas inscrire de clé API dans le navigateur ni le dépôt.

## 6. Sécurité applicative

- TypeScript strict et validation Zod à chaque frontière.
- Échappement normal de tout texte utilisateur ; pas de `dangerouslySetInnerHTML`.
- CSP restrictive ; pas de `unsafe-eval` ; minimiser `unsafe-inline`.
- En-têtes : HSTS en HTTPS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, politique de framing adaptée.
- Cookies absents dans le MVP ; si introduits, `Secure`, `HttpOnly`, `SameSite` adapté et durée minimale.
- Ne pas journaliser les corps de requête, les réponses ou les exports.
- Dépendances contrôlées, lockfile commité, mises à jour de sécurité régulières.
- Protection anti-DoS et limites de requêtes au reverse proxy avant toute route d'administration.
- Gestion de secrets par variables d'environnement ou coffre de secrets ; jamais dans Git.
- Sauvegardes du futur référentiel documentaire distinctes de tout éventuel dossier utilisateur.

## 7. Logs et observabilité

- Logs applicatifs sans texte de session ni valeurs de choix.
- Éviter les identifiants persistants.
- Réduire ou anonymiser les IP dans les journaux d'accès si possible et pertinent.
- Définir une durée de conservation et un accès restreint.
- Pas de trace de replay de session.
- Les erreurs front ne doivent pas inclure les valeurs des champs.
- Toute évolution de logging doit passer une revue privacy.

## 8. AIPD et gouvernance

Avant production, déterminer formellement si une AIPD est obligatoire au regard du risque et des critères CNIL. La préparer en amont si le traitement peut présenter un risque élevé. Documenter : flux, finalités, nécessité/proportionnalité, risques, mesures de réduction, droits, conservation et sous-traitants.

L'avis juridique doit aussi couvrir les mineurs, les transferts internationaux, les responsabilités du responsable de traitement, les demandes d'exercice des droits et les modalités d'information.

## 9. Checklist de mise en ligne

- [ ] cartographie des données et flux terminée ;
- [ ] notice de confidentialité relue juridiquement ;
- [ ] base légale et conditions article 9 documentées ;
- [ ] AIPD réalisée si nécessaire ;
- [ ] contrats et sous-traitants examinés ;
- [ ] hébergement et logs vérifiés ;
- [ ] CSP et en-têtes testés ;
- [ ] dépendances et images de conteneur scannées ;
- [ ] tests réseau prouvant l'absence de fuite de réponses ;
- [ ] export et effacement testés ;
- [ ] procédure d'incident définie.
