# 03 — Modèle de données et contrats

## 1. Règle de séparation

Deux domaines doivent rester séparés :

- **Données personnelles de session** : présentes uniquement en mémoire navigateur dans le MVP ; jamais dans la base documentaire.
- **Données documentaires publiques** : thèmes, acteurs, déclarations publiques, documents, sources, validations et versions éditoriales.

Ne pas créer de clé étrangère entre un utilisateur et un acteur politique. Ne pas stocker un profil individuel au serveur.

## 2. Domaine utilisateur (client-only)

### Statement

- `id`: UUID généré localement, sans signification externe.
- `createdAt`: date ISO locale.
- `text`: texte original écrit par l'utilisateur.
- `themeIds`: thèmes choisis par l'utilisateur, facultatifs.
- `objective`: objectif reformulé/confirmé, facultatif.
- `instrument`: moyen envisagé, facultatif.
- `position`: `support | oppose | conditional | undecided | not_expressed` ; ne pas forcer ce champ si absent.
- `conditions`: liste de conditions explicites.
- `importanceSelfReport`: `low | medium | high | not_stated` si l'utilisateur l'a déclaré.
- `certaintySelfReport`: `low | medium | high | uncertain | not_stated` si l'utilisateur l'a déclaré.
- `confirmedByUser`: booléen.

Ne pas ajouter un `ideology`, `leftRight`, `partyAffinity`, `voteIntent` ou une inférence similaire.

### ResponseState

Valeurs sémantiquement distinctes :

- `answered` ;
- `skipped` ;
- `dont_know` ;
- `uncertain` ;
- `depends` ;
- `reject_both` ;
- `not_applicable`.

Ne pas coder ces états en nombres −2 à +2 dans la couche de stockage.

### PriorityObservation

- `taskId` ;
- `choiceSetId` ;
- `bestItemId` ;
- `worstItemId` ;
- `responseState` ;
- `methodVersion` ;
- `timestamp`.

Pour une réponse valide Best-Worst, `bestItemId` et `worstItemId` doivent être distincts et appartenir au jeu présenté.

## 3. Domaine documentaire public

### Actor

- `id` ; `displayName` ; `actorType` (`person`, `party`, `coalition`, `institution`, `other`) ;
- dates de validité publique ;
- liens officiels ;
- statut éditorial.

### Theme et Issue

Taxonomie hiérarchique stable avec identifiants non ambigus, libellés, descriptions et version.

### Claim

Un énoncé politique atomique ou un objectif documenté. Ne pas concaténer plusieurs mesures indépendantes dans un claim unique.

### ActorPosition

- acteur ; claim ; thème ;
- nature de preuve (`official_program`, `public_statement`, `parliamentary_vote`, `amendment`, `implemented_action`, `interview`, `secondary_reporting`) ;
- formulation fidèle et contexte ;
- orientation descriptive si explicitement établie (`supports`, `opposes`, `conditional`, `ambiguous`, `not_documented`) ;
- date de l'événement ; date de publication ; période de validité si connue ;
- source(s) ; extrait court localisant la preuve ;
- état de validation ; validateur et date de revue ;
- version éditoriale.

La catégorie `not_documented` doit être produite par l'absence de source dans un périmètre de recherche explicite, jamais par déduction.

### Source

- URL canonique ; titre ; éditeur ; type ; date publiée ; date consultée ;
- référence précise (page, paragraphe, timecode ou identifiant parlementaire) ;
- copie/empreinte de conservation uniquement si légalement et techniquement justifié ;
- statut de disponibilité ; droits de réutilisation.

### EditorialReview

Historique de revue, corrections, désaccords et justification de validation. Conserver les anciennes versions plutôt que les écraser.

## 4. Exemple JSON de session (export local)

```json
{
  "schemaVersion": "1.0.0",
  "methodVersion": "maxdiff-demo-0.1",
  "exportedAt": "2026-11-10T10:00:00+01:00",
  "dataScope": "user-provided-session-only",
  "statements": [
    {
      "id": "local-uuid",
      "text": "Je souhaite améliorer l'accès aux soins.",
      "themeIds": ["health.access"],
      "conditions": [],
      "confirmedByUser": true
    }
  ],
  "priorityObservations": []
}
```

L'exemple ne doit jamais être prérempli comme s'il s'agissait d'une vraie réponse utilisateur.

## 5. Validation et versionnement

- Zod valide les exports avant génération et après import éventuel.
- `schemaVersion` versionne le format de données ; `methodVersion` versionne les méthodes.
- Tout changement incompatible exige une migration explicite.
- Refuser les propriétés inconnues pour les objets sensibles ou les normaliser explicitement ; ne pas accepter silencieusement des champs de profil ajoutés par un agent.
- Aucun export contenant une position politique ne doit être envoyé automatiquement.

## 6. Identifiants

- Identifiants aléatoires, sans sens politique.
- Pas de numéro de candidat comme clé métier.
- Ne pas encoder le thème, le choix ou le texte dans l'ID.
- Aucune clé partagée entre sessions individuelles et corpus public.
