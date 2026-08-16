# Déploiement production

Clinical Navigator peut être servi comme frontend statique sur GitHub Pages ou comme application full-stack sur Vercel. La cible Vercel utilise `api/index.ts` comme fonction serverless et `server/_core/app.ts` comme fabrique Express sans `app.listen()`.

## Vérifications locales

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm references:validate
pnpm diagnostics:consistency
pnpm security:baseline
pnpm build
```

Le dépôt ne doit jamais publier `releaseReady: true` sans preuve E2E et accessibilité. Le rapport public est généré dans `client/public/diagnostics/latest.json`.

## Variables d’environnement

Copiez `.env.example` vers `.env` en local. En production, configurez les valeurs dans Vercel ou dans les secrets GitHub Actions. Les variables serveur (`DATABASE_URL`, `JWT_SECRET`, `CRON_SECRET`, `BUILT_IN_FORGE_API_KEY`) ne doivent pas être préfixées `VITE_`.

Les variables Vercel attendues sont `VERCEL_TOKEN`, `VERCEL_ORG_ID` et `VERCEL_PROJECT_ID`. Le cron quotidien appelle `/api/cron/daily-maintenance` avec `Authorization: Bearer <CRON_SECRET>` ; le secret doit être identique dans l’environnement Vercel.

## Base de données

Le schéma actuel est basé sur `drizzle-orm/mysql2` et des migrations SQL compatibles MySQL/TiDB. **Ne configurez pas `DATABASE_URL` vers Neon PostgreSQL sans migrer explicitement le driver, le schéma et les migrations**. Une migration Neon est une tâche séparée et ne doit pas être déclarée réussie par le workflow actuel.

La commande de migration disponible est :

```bash
pnpm db:migrate
```

Exécutez-la uniquement contre une base compatible avec le driver installé et après sauvegarde. La migration automatique en production doit être activée après validation du fournisseur de base, des droits et du plan de retour arrière.

## Vercel

1. Créez ou sélectionnez le projet Vercel et connectez le dépôt.
2. Configurez les variables d’environnement pour les environnements Preview et Production.
3. Vérifiez `/api/health` après le déploiement.
4. Vérifiez le cron dans le tableau de bord Vercel avant de l’activer.
5. Exécutez les tests et le build avant toute migration de schéma.

Le workflow GitHub Pages reste la voie de publication statique actuellement vérifiée. La publication Vercel nécessite les identifiants et secrets du compte propriétaire ; ils ne sont pas fournis dans Git et ne doivent pas être inventés.
