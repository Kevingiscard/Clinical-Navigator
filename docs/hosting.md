# Hébergement de Clinical Navigator

Clinical Navigator est déployable selon deux modes explicites. Le mode statique sert les parcours publics sans backend et signale les fonctions compte/données/admin indisponibles ; le mode full-stack active les routes tRPC et les fonctions serveur uniquement lorsqu’un backend réellement joignable est configuré.

## Build recommandé

```bash
pnpm install --frozen-lockfile
pnpm build:static
```

Le dossier publié est :

```text
dist/public
```

Variables runtime : `VITE_STATIC_ONLY=true` pour un hébergement sans backend ; `VITE_STATIC_ONLY=false` seulement lorsqu’un serveur tRPC est réellement accessible. `VITE_API_BASE_URL` est facultative et permet de pointer vers l’origine d’un backend séparé ; laissée vide, l’application utilise `/api/trpc` sur la même origine.

## GitHub Pages

- Repository: `Kevingiscard/Clinical-Navigator`
- Build command: `pnpm install --frozen-lockfile && pnpm build:static`
- Output: `dist/public`
- Variables : `VITE_BASE_PATH=/Clinical-Navigator/`, `VITE_STATIC_ONLY=true`, `VITE_API_BASE_URL=`.
- Le workflow `.github/workflows/deploy.yml` automatise le build, les tests, les diagnostics, la pré-copie de toutes les routes statiques et la publication.
- Les routes compte, favoris, mes cas, mes données et admin affichent un état explicite « nécessite un serveur » ; elles ne tentent pas d’appeler une API absente.

URL attendue :

`https://kevingiscard.github.io/Clinical-Navigator/`

## Netlify

- Build command: `pnpm build:static`
- Publish directory: `dist/public`
- Variables : `VITE_BASE_PATH=/`, `VITE_STATIC_ONLY=true`, `VITE_API_BASE_URL=`.
- Le fichier `_redirects` permet le fallback SPA. Les pages backend-dépendantes restent explicitement indisponibles dans ce mode.

## Vercel

- Build command: `pnpm build:static`
- Output directory: `dist/public`
- Variables par défaut : `VITE_BASE_PATH=/`, `VITE_STATIC_ONLY=false`, `VITE_API_BASE_URL=`.
- `vercel.json` configure le fallback SPA et l’entrée serverless `/api`. Pour un déploiement Vercel frontend-only, définir `VITE_STATIC_ONLY=true` et désactiver l’attente d’un backend.

## Cloudflare Pages

- Build command: `pnpm build:static`
- Output directory: `dist/public`
- Variables : `VITE_BASE_PATH=/`, `VITE_STATIC_ONLY=true`, `VITE_API_BASE_URL=`.

## Auto-maintenance

Le dépôt inclut :

- CI de qualité ;
- tests et build quotidiens ;
- Dependabot ;
- health watch ;
- contrôle des liens et assets ;
- génération d'incident en cas d'échec ;
- auto-récupération PWA/caches côté navigateur ;
- rollback de déploiement à prévoir selon l'hébergeur.

Les mises à jour scientifiques, réglementaires ou méthodologiques critiques restent soumises à revue humaine. Aucun système sérieux ne doit publier automatiquement une nouvelle obligation réglementaire sans validation.
