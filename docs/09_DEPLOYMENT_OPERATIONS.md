# 09 — Déploiement et exploitation

## 1. Environnements

- local développeur ;
- CI éphémère ;
- preview non indexée et sans données personnelles ;
- production après validation juridique et sécurité.

Aucun jeu de données réel de réponses politiques ne doit être utilisé en développement ou CI.

## 2. Hébergement

Privilégier un hébergement maîtrisé dans l'Espace économique européen, avec contrat et sous-traitants examinés. Le lieu de stockage ne suffit pas à garantir l'absence de transferts ou d'accès hors EEE ; examiner aussi support, logs, sauvegardes, CDN et observabilité.

Next.js auto-hébergé derrière un reverse proxy (Caddy/nginx) est une option de départ. Ne pas exposer directement le serveur Node au réseau public.

## 3. Conteneurisation

Docker peut être ajouté au moment du déploiement. Image multi-stage, utilisateur non-root, dépendances de production minimales, image de base maintenue et scannée. Ne pas inclure `.env` ou données locales dans le build.

Le MVP ne requiert pas Postgres. Quand le back-office documentaire sera décidé : Postgres 18, migrations Drizzle, sauvegardes chiffrées, restauration testée et accès réseau restreint.

## 4. CI/CD

Pipeline minimale :

1. installation via lockfile ;
2. lint ;
3. typecheck ;
4. tests unitaires ;
5. E2E essentiels ;
6. build ;
7. audit dépendances et secret scanning ;
8. artefact immutable ;
9. déploiement manuel contrôlé en production au début.

## 5. Logs et métriques

Pas de contenu de réponses dans les logs. Pas d'analytics comportemental. Des métriques techniques agrégées (statut HTTP, temps de réponse, erreurs anonymisées) peuvent être envisagées après revue privacy.

## 6. Sauvegardes

Dans le MVP, aucune sauvegarde de profil n'existe côté serveur. Les sauvegardes futures concernent uniquement le corpus documentaire et les données éditoriales. Tester régulièrement la restauration et documenter le RPO/RTO lorsqu'une base est introduite.

## 7. Incidents

Prévoir avant production : contact incident, classification, confinement, conservation de preuves techniques sans recopier inutilement les données, procédure de notification et responsabilités. Toute suspicion d'exfiltration de réponses politiques est prioritaire.
