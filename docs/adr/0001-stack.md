# ADR 0001 — Stack et architecture initiales

- **Statut :** accepté pour le prototype, révisable par ADR.
- **Date :** 10 novembre 2026.
- **Décideur :** équipe projet.

## Contexte

Le développement sera largement assisté par Antigravity/OpenCode. Les priorités sont la vitesse de prototypage, la maintenabilité, l'écosystème, la confidentialité et la capacité à auto-héberger.

## Décision

- Next.js 16.4 App Router et React 19.3 ;
- TypeScript strict ;
- Node.js 24 LTS au démarrage ;
- pnpm ;
- Tailwind CSS 4 ;
- shadcn/ui et primitives accessibles utilisées sélectivement ;
- Zod ;
- Vitest 5.x, Testing Library et Playwright ;
- PostgreSQL 18 + Drizzle uniquement lorsque le référentiel documentaire exige un back-office ;
- pas de service LLM externe dans le MVP ;
- pas de comptes ni stockage serveur des réponses.

## Options écartées

- microservices : coût opérationnel sans bénéfice démontré ;
- Supabase/Firebase comme base de profils : hébergement managé et authentification non nécessaires au MVP, risques de collecte superflue ;
- vector database / RAG : prématuré ;
- modèle IA directement connecté au navigateur : fuite de clé et transfert non maîtrisé ;
- stockage local automatique : augmente la persistance de données sensibles ; à réévaluer avec chiffrement, UX et analyse juridique ;
- IRT à la première version : manque de calibration et de validation des dimensions.

## Conséquences positives

- prise en main rapide par des agents de code grâce à l'écosystème React/Next ;
- faible nombre de services ;
- séparation claire entre données personnelles et corpus public ;
- possibilité d'auto-hébergement ;
- migrations et base relationnelle disponibles plus tard.

## Conséquences négatives / risques

- Next.js ajoute un runtime serveur même si le MVP n'en a besoin que pour servir l'application ; examiner une sortie statique si le produit se limite à des ressources statiques ;
- React/Next impose une discipline stricte sur la frontière Server/Client Components ;
- Node 24 est en Maintenance LTS au 10 novembre 2026 ; réévaluer le passage à Node 26 après validation complète de l'écosystème ;
- shadcn/ui produit du code dans le dépôt : chaque composant doit être relu et maintenu ;
- le choix du fournisseur d'hébergement reste ouvert.

## Révision

Réviser cet ADR si :
- les contraintes d'hébergement l'imposent ;
- une API ou un back-office est introduit ;
- la stack ne passe pas les tests de performance/accessibilité ;
- Node 26 est validé par CI et dépendances ;
- une intégration IA est autorisée après analyse juridique et technique.
