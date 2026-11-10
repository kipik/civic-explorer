# Références techniques, sécurité et protection des données

Références consultées le **10 novembre 2026**. Les versions évoluent : vérifier les notes officielles avant chaque mise à niveau majeure.

## Agentic coding

- OpenCode — instructions de dépôt via `AGENTS.md` : https://opencode.ai/docs/instructions/ (ou https://docs.opencode.ai/docs/rules/)
- Google Antigravity — règles persistantes de workspace et découverte de `AGENTS.md` : https://antigravity.google/docs/rules/

Le projet utilise un unique `AGENTS.md` à la racine afin de partager les mêmes invariants entre les deux outils.

## Stack

- Next.js blog, Next.js 16.4 (6 octobre 2026) : https://nextjs.org/blog
- Next.js support policy : https://nextjs.org/support-policy
- Next.js production checklist : https://nextjs.org/docs/app/guides/production-checklist
- Next.js data security : https://nextjs.org/docs/app/guides/data-security
- Next.js self-hosting : https://nextjs.org/docs/app/guides/self-hosting
- React versions — React 19.3 : https://react.dev/versions
- Node.js release schedule : https://github.com/nodejs/Release/blob/main/README.md
- PostgreSQL versioning — PostgreSQL 18 : https://www.postgresql.org/support/versioning/
- Drizzle PostgreSQL : https://orm.drizzle.team/docs/get-started/postgresql-new
- Drizzle migrations : https://orm.drizzle.team/docs/migrations
- Vitest releases : https://vitest.dev/releases.html
- Playwright : https://playwright.dev/docs/intro

## Sécurité

- OWASP Application Security Verification Standard (ASVS) 5.0.0 : https://owasp.org/www-project-application-security-verification-standard/
- Next.js data security : https://nextjs.org/docs/app/guides/data-security

## RGPD / CNIL

- CNIL — bases légales et données sensibles : https://www.cnil.fr/fr/les-bases-legales/liceite-essentiel-sur-les-bases-legales
- CNIL — RGPD, chapitre II, dont article 9 : https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2
- CNIL — analyse d'impact (AIPD) : https://www.cnil.fr/fr/definition/analyse-dimpact
- CNIL — réaliser une AIPD si nécessaire : https://www.cnil.fr/fr/realiser-une-analyse-dimpact-si-necessaire

## Méthodes

- Stockinger et al. (2024), Trustworthiness of Voting Advice Applications in Europe : https://doi.org/10.1007/s10676-024-09790-6
- Sigfrid (2024), IRT for voting advice applications : https://doi.org/10.1007/s11135-024-01845-6
- Mühlbacher et al., Best-Worst Scaling overview : https://pmc.ncbi.nlm.nih.gov/articles/PMC4705077/
- Pretesting Discrete-Choice Experiments : https://pmc.ncbi.nlm.nih.gov/articles/PMC10894089/

## Notes d'interprétation

- La présence d'une fonction dans une documentation ne prouve pas qu'elle est sûre pour ce cas d'usage ; appliquer les frontières de confiance décrites dans le projet.
- Un hébergement déclaré dans l'EEE ne suffit pas, à lui seul, à prouver qu'aucun transfert ou accès hors EEE n'existe.
- L'usage du mot « anonyme » doit être évité tant que l'ensemble des flux et identifiants techniques n'a pas été évalué juridiquement.
- Les références méthodologiques ne valident pas à elles seules notre questionnaire, nos items ou nos résultats. Une validation propre au produit est indispensable.
