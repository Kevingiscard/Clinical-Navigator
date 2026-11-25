# GitHub Pages : redirection vers EdgeOne

Depuis le 25 novembre 2026, le site vit sur https://clinical-navigator.edgeone.dev (EdgeOne Makers, plan gratuit, déploiement automatique depuis `main`).

GitHub Pages ne publie plus que des pages de redirection (`scripts/make-pages-redirect.mjs`) : chaque ancienne adresse `kevingiscard.github.io/Clinical-Navigator/...` renvoie vers la même page sur EdgeOne. Rien n'est supprimé du code.

Retour arrière : dans `.github/workflows/deploy.yml`, supprimer l'étape « Build redirect-only GitHub Pages artifact » et remettre `path: dist/public` à l'étape « Upload Pages artifact », puis remettre `https://kevingiscard.github.io/Clinical-Navigator/` dans `client/index.html`, `client/public/sitemap.xml`, `client/public/robots.txt`, `client/public/404.html` et `.github/workflows/health-watch.yml`.
