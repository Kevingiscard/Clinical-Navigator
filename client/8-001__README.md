# Clinical Navigator

[![CI](https://github.com/Kevingiscard/Clinical-Navigator/actions/workflows/ci.yml/badge.svg)](https://github.com/Kevingiscard/Clinical-Navigator/actions/workflows/ci.yml) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Vercel](https://vercelbadge.vercel.app/api/Kevingiscard/Clinical-Navigator)](https://vercel.com/)

**Version 4.2 — plateforme full-stack, static-only, bilingue et sans dépendance obligatoire à Manus.**

**Clinical Navigator** est une application web française d’orientation opérationnelle pour les professionnels de la recherche clinique. Elle aide à structurer une situation, à repérer les acteurs et documents pertinents, et à rendre visibles les sources, le statut du contenu et les limites d’une réponse. Elle ne remplace jamais le protocole, les SOP, une prise en charge clinique, les responsables habilités ou les autorités compétentes.

## Fonctionnalités principales

| Domaine | Implémentation actuelle |
|---|---|
| Parcours « J’ai un problème » | Questionnaire en huit étapes, détection indicative d’identifiants directs, priorité de sécurité, réponse structurée et modes Rapide/Détaillé/Expert. |
| Workflows | Catalogue déterministe de scénarios, actions, acteurs, documents, checks, délais contextuels, escalade, limites et références. |
| Connaissance | 24 modules, 31 scénarios et une base pédagogique bilingue de 154 entrées réparties en 11 catégories, avec références et signalement des juridictions à vérifier. [1] [2] |
| Outils | Calculateur de fenêtre de visite, canevas CAPA, checklists de monitoring, d’activation et de close-out. |
| Espace personnel | Favoris et repères génériques sauvegardés pour les utilisateurs authentifiés, avec refus des identifiants directs détectés. |
| Gouvernance | Administration protégée, statuts de contenu, sources à revoir, backlog, feedback, analytics anonymisées et santé système. |
| Web | PWA versionnée, app shell/offline fallback, routes statiques, manifest, robots, sitemap, metadata, budget initial JavaScript et sélecteur FR/EN persistant. |

## Démarrer en local

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm test
pnpm e2e
pnpm build
pnpm knowledge:verify
pnpm budget
pnpm verify
```

## Variables d’environnement

Copiez [`.env.example`](.env.example) vers `.env` en local. Les secrets serveur ne doivent jamais être exposés au navigateur ni préfixés `VITE_`. Pour Vercel, configurez les variables dans les environnements Preview et Production. La configuration complète et la limitation actuelle du driver Drizzle/MySQL sont décrites dans [`docs/deployment.md`](docs/deployment.md).

Les vérifications de production sont disponibles avec `pnpm references:validate`, `pnpm diagnostics:consistency`, `pnpm security:baseline`, `pnpm knowledge:verify`, `pnpm budget` et `pnpm release:gate`. `pnpm verify` agrège le contrôle clinique, les diagnostics, le typecheck, les tests et le budget statique.

Les migrations sont générées à partir de `drizzle/schema.ts`. Toute modification du schéma doit être appliquée avec une migration validée, jamais via une suppression de données non revue.

## Principes non négociables

> Ne saisissez jamais de noms, identifiants, coordonnées, numéros de dossier, documents source ou combinaisons d’éléments permettant d’identifier un participant.

Les réponses sont des aides à l’organisation du travail. Les échéances, déclarations, qualifications réglementaires et décisions cliniques doivent être vérifiées dans les documents applicables au contexte réel. Les sources ne sont pas automatiquement transformées en règles universelles.

## Veille documentaire

La page `/fr/veille` présente une revue institutionnelle datée des références majeures utilisées par l'application. Elle distingue les documents actuellement effectifs des documents publiés mais à effet futur, notamment pour ICH E6(R3). Voir `docs/research-update-2026-08.md` pour la traçabilité de la revue.

## Documentation

| Production | Objet |
|---|---|
| [Variables d’environnement](.env.example) | Inventaire documenté des variables utilisées. |
| [Politique de sécurité](SECURITY.md) | Signalement, versions supportées et règles de secret. |
| [Déploiement Vercel](docs/deployment.md) | API serverless, cron, secrets et base de données. |

| Document | Objet |
|---|---|
| [Architecture](docs/architecture.md) | Périmètre technique et flux de données. |
| [Gouvernance du contenu](docs/content-governance.md) | Statuts, versioning, revue et publication humaine. |
| [Confidentialité et sécurité](docs/security-privacy.md) | Données interdites, minimisation et limites de détection. |
| [Politique IA](docs/ai-policy.md) | Hiérarchie règles/sources/assistance et garde-fous. |
| [Contrat v2](docs/v2-final-contract.md) | Parcours bilingue, base embarquée, assistant hybride, PWA et limites de self-healing. |
| [Maintenance planifiée](docs/periodic-maintenance.md) | Contrôles de liens et prérequis de publication. |
| [Déploiement](docs/deployment.md) | Checklist de publication et limites d’hébergement. |
| [Contribution](docs/contributing.md) | Standards de code et de contenu. |
| [Roadmap](docs/roadmap.md) | Suite du produit et points de validation requis. |

## Références

[1] [ICH, *E6(R3) Guideline for Good Clinical Practice*](https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106.pdf)  
[2] [OMS, *Guidance for best practices for clinical trials*](https://www.who.int/publications/i/item/9789240097711)

## Hébergement direct

Le build statique recommandé est :

```bash
pnpm install --frozen-lockfile
pnpm build:static
```

Publier `dist/public` sur GitHub Pages, Netlify, Vercel ou Cloudflare Pages. Voir [`docs/hosting.md`](docs/hosting.md).

## Maintenance automatique

Le projet inclut des workflows GitHub Actions pour le contrôle qualité, les tests, le build, le déploiement GitHub Pages, Dependabot, la surveillance de disponibilité et la maintenance planifiée.

Côté navigateur, Clinical Navigator peut récupérer automatiquement certains incidents réversibles (cache/service worker/erreur runtime) et repartir dans un état sûr.

Aucune solution logicielle sérieuse ne peut promettre une réparation arbitraire et autonome de tout bug ou une validation automatique de toute nouvelle exigence réglementaire. Les changements critiques restent soumis à revue humaine.

## Auteur

Clinical Navigator est créé et développé par **Kevin HOUNSINOU**. Voir [`/fr/auteur`](https://kevingiscard.github.io/Clinical-Navigator/fr/auteur) pour le parcours, les domaines d'expertise, le dépôt source et le soutien au projet.
