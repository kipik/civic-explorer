# 01 — Architecture cible

## 1. Décision générale

Commencer par un **monolithe web modulaire**. Une seule application Next.js, un seul dépôt, une seule pipeline CI. Aucun microservice dans le MVP.

La simplicité est intentionnelle : les parties statistique, éditoriale et personnelle doivent être séparées dans le code, sans être séparées en services réseau prématurément.

## 2. Stack retenue

| Couche | Technologie | Raison |
|---|---|---|
| Runtime | Node.js 24 LTS | Base stable et largement compatible au démarrage |
| Langage | TypeScript strict | Contrats et refactorings fiables pour les agents |
| Framework web | Next.js 16.4 App Router | Écosystème React, documentation, SSR/public pages et auto-hébergement |
| UI | React 19.3 | Écosystème, composants et tests disponibles |
| CSS | Tailwind CSS 4 | Vitesse de réalisation et cohérence visuelle |
| Composants | shadcn/ui + Radix primitives, au cas par cas | Accessibilité et composants inspectables dans le dépôt |
| Validation | Zod | Validation runtime et inférence TypeScript |
| État du parcours | `useReducer` / contexte local | Suffisant ; pas de store global additionnel au MVP |
| Tests unitaires | Vitest 5.x | Rapide et intégré à l'écosystème Vite |
| Tests UI | Testing Library | Tester le comportement utilisateur |
| E2E | Playwright | Parcours réels et multi-navigateurs |
| Qualité | ESLint + Prettier | Règles homogènes et formatage reproductible |
| Paquets | pnpm | Lockfile déterministe et workspaces si besoin plus tard |
| Base de données future | PostgreSQL 18 + Drizzle | Uniquement pour le référentiel éditorial / back-office |
| Reverse proxy futur | Caddy ou nginx | TLS, limites de requêtes et défense en profondeur |
| Hébergement futur | VPS ou plateforme auto-hébergée dans l'EEE | Contrôle du lieu et des opérations, à vérifier contractuellement |

Versions observées au 10 novembre 2026 : Next.js 16.4 est annoncé dans le blog officiel ; React 19.3 est la version courante ; PostgreSQL 18 est la branche courante ; Node 24 est en Maintenance LTS et Node 26 vient d'entrer en Active LTS. Nous choisissons Node 24 pour la maturité de l'écosystème, et réévaluerons Node 26 lorsque les dépendances et l'hébergeur l'auront validé. Consulter `docs/REFERENCES.md` avant de figer les versions exactes.

## 3. Pourquoi ne pas utiliser une architecture plus complexe ?

Pas de microservices : aucun besoin de scalabilité indépendante au stade prototype.

Pas de Redis : pas de sessions serveur ni de file de tâches dans le MVP.

Pas de vector DB : aucun RAG ou embedding nécessaire avant la constitution d'un corpus éditorial suffisamment qualifié.

Pas de framework agentique : les opérations de compréhension doivent rester explicites, testables et séparées des outils de génération.

Pas de compte : il crée une responsabilité de conservation et de sécurité disproportionnée pour le MVP.

## 4. Frontières de confiance

### Zone navigateur

- réponses libres ;
- choix MaxDiff et scénarios ;
- état de session en mémoire ;
- corrections et export utilisateur.

### Zone serveur public

- pages publiques ;
- composants et fichiers de démonstration non personnels ;
- ressources statiques ;
- à terme, lectures de fiches politiques publiées.

### Zone éditoriale future

- authentification des contributeurs ;
- sources et propositions publiques ;
- validations humaines ;
- historique des modifications.

### Zone IA future — désactivée

- interface de fournisseur abstraite ;
- aucun accès direct depuis le navigateur ;
- consentement explicite, au cas par cas, avant transfert d'un texte ;
- fournisseur et sous-traitants qualifiés ;
- rétention, région et usages contractuellement vérifiés ;
- pas d'entraînement sur les données ;
- possibilité d'utiliser un modèle auto-hébergé plutôt qu'un service externe.

## 5. Architecture applicative

```text
src/
  app/                         # Routes et layouts Next.js
  components/                  # UI générique sans règle métier
  features/
    onboarding/                # Présentation et consentements futurs
    exploration/               # Session et expression libre
    prioritization/            # Interactions MaxDiff
    tradeoffs/                 # Scénarios d'arbitrage ultérieurs
    profile-summary/           # Restitution des réponses confirmées
    export/                    # Export JSON local
  domain/
    statements/                # Types et règles de déclaration
    methods/                   # Contrats statistiques purs
    taxonomy/                  # Thèmes et sujets
  data/
    demo/                       # Jeux d'exemple clairement marqués
  lib/
    schemas/                    # Schémas Zod
    privacy/                    # Effacement, export, garde-fous
  styles/
```

Les modules métier ne doivent pas importer `next/*`, React ou des composants UI.

## 6. Flux MVP

```text
Page statique
   ↓
Session navigateur (mémoire uniquement)
   ↓
Déclaration libre + thème facultatif
   ↓
Exercice MaxDiff de démonstration
   ↓
Résumé des réponses réellement exprimées
   ↓
Validation/correction par l'utilisateur
   ↓
Export JSON déclenché par l'utilisateur
```

Aucun endpoint ne reçoit ces réponses. Vérifier cette propriété avec les tests E2E et l'inspection réseau.

## 7. Données publiques et base future

Le prototype peut charger le catalogue de thèmes et les scénarios de démonstration depuis des fichiers JSON versionnés dans le dépôt.

Quand un back-office sera réellement nécessaire, introduire PostgreSQL 18 et Drizzle pour les données publiques documentaires uniquement : acteurs, thèmes, propositions, sources, validations et historique.

Ne pas ajouter de table de profils utilisateurs par simple commodité. Une éventuelle fonctionnalité de sauvegarde distante nécessitera une nouvelle décision d'architecture, une analyse juridique et une révision du modèle de menace.

## 8. Règles Next.js

- Utiliser les Server Components pour les pages publiques et le shell.
- Isoler les interactions personnelles dans des Client Components.
- Ne pas transmettre de réponses personnelles à un Server Component.
- Éviter Server Actions et Route Handlers tant qu'ils ne sont pas nécessaires.
- Si une API future est introduite, isoler les accès aux données dans une couche d'accès (DAL), valider chaque entrée et vérifier les droits côté serveur.
- Ne pas supposer qu'une Server Action est privée : toute action exposée est une surface HTTP à sécuriser.
- Éviter les caches de réponses ou de profils ; documenter explicitement le cache des contenus publics.

## 9. Performance

- HTML initial léger ; pas de gros framework de visualisation pour les premiers écrans.
- Chargement différé des modules rares.
- Polices système ou fichiers locaux ; aucune police Google distante.
- Pas d'animations lourdes ni d'images non nécessaires.
- Mesurer Core Web Vitals et poids JavaScript avant d'ajouter des optimisations complexes.
- L'exercice doit fonctionner sur mobile et réseau moyen.
