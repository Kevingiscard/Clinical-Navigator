# Transfert de Clinical Navigator hors de l’hébergement actuel

## Contenu de l’archive

L’archive contient le code source React, TypeScript et Express, les migrations Drizzle, les tests Vitest, la configuration de build et la documentation du projet. Les dépendances générées (`node_modules`), les sorties de build, les journaux, les fichiers d’environnement et les secrets n’y figurent pas.

## Installation locale

Utilisez Node.js 22 et pnpm. Après extraction, installez les dépendances avec `pnpm install`, puis contrôlez le projet avec `pnpm check`, `pnpm test` et `pnpm build`. Le lancement de développement utilise `pnpm dev`.

## Variables d’environnement et services externes

L’application attend une base MySQL compatible avec la configuration Drizzle, ainsi qu’une authentification OAuth et des clés de session. Aucun secret de l’hébergement actuel n’est inclus. Les variables concernées doivent être définies dans un fichier `.env` local non versionné, notamment :

| Variable | Usage |
| --- | --- |
| `DATABASE_URL` | Connexion MySQL/TiDB de l’application. |
| `JWT_SECRET` | Signature des sessions applicatives. |
| `OAUTH_SERVER_URL` | Service OAuth à remplacer ou à adapter hors Manus. |
| `VITE_APP_ID` | Identifiant client OAuth correspondant au nouveau fournisseur. |
| `VITE_OAUTH_PORTAL_URL` | URL du portail de connexion correspondant. |

Les variables préfixées `BUILT_IN_FORGE_` et `VITE_FRONTEND_FORGE_` sont propres à l’environnement d’origine. Elles doivent être remplacées par des intégrations équivalentes ou les fonctionnalités qui en dépendent doivent être désactivées/adapter avant un déploiement externe.

## Base de données

Les migrations versionnées sont dans `drizzle/`. Appliquez-les à une base de données vide ou contrôlée dans l’ordre numérique, après avoir vérifié leur compatibilité avec votre moteur MySQL. La migration `0007_crazy_blink.sql` ajoute notamment l’historique des références méthodologiques et leurs dates de revue.

> Ne transférez aucune donnée patient, donnée de santé individuelle, clé, jeton OAuth ou journal de session. Clinical Navigator est conçu pour des informations génériques et de projet non identifiantes.

## Déploiement externe

Le projet est portable mais les services managés de l’hébergement d’origine ne le sont pas automatiquement : OAuth, stockage, notifications éventuelles, observabilité et tâches planifiées doivent être remplacés par des services du nouvel hébergeur. Avant une mise en ligne externe, vérifiez les routes protégées, les règles de consentement analytics, l’accès administrateur, la configuration CORS, les secrets, les sauvegardes et le TLS.

L’archive est un export du code. Elle n’emporte ni les données de la base, ni les comptes utilisateurs, ni les configurations sensibles de l’environnement publié.
