# Hébergement de Clinical Navigator

Clinical Navigator 4.0 est préparé pour un déploiement statique autonome du frontend.

## Build recommandé

```bash
pnpm install --frozen-lockfile
pnpm build:static
```

Le dossier publié est :

```text
dist/public
```

## GitHub Pages

- Repository: `Kevingiscard/Clinical-Navigator`
- Build command: `pnpm install --frozen-lockfile && pnpm build:static`
- Output: `dist/public`
- Variable: `VITE_BASE_PATH=/Clinical-Navigator/`
- Le workflow `.github/workflows/deploy.yml` automatise le build, les tests et la publication.

URL attendue :

`https://kevingiscard.github.io/Clinical-Navigator/`

## Netlify

- Build command: `pnpm build:static`
- Publish directory: `dist/public`
- Variable: `VITE_BASE_PATH=/`
- Le fichier `_redirects` permet le fallback SPA.

## Vercel

- Build command: `pnpm build:static`
- Output directory: `dist/public`
- Variable: `VITE_BASE_PATH=/`
- `vercel.json` configure le fallback SPA.

## Cloudflare Pages

- Build command: `pnpm build:static`
- Output directory: `dist/public`
- Variable: `VITE_BASE_PATH=/`

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
