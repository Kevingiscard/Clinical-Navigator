# GitHub Pages : retiré (28 novembre 2026)

Le site officiel est https://clinical-navigator.edgeone.dev (Tencent EdgeOne Makers, plan gratuit).
Les commits sur `main` ne le mettent PAS en ligne tout seuls : après un commit, lancer « New Deployment » dans la console EdgeOne Makers (branche main).

GitHub Pages ne publie plus rien. Le workflow `.github/workflows/deploy.yml` ne fait plus que construire et vérifier (tests, types, diagnostics, artefact), sans étape de publication. L'ancien lien `https://kevingiscard.github.io/Clinical-Navigator/` n'est plus servi.

Retour arrière : réactiver Pages dans Settings > Pages (source « GitHub Actions »), puis rétablir dans `deploy.yml` les permissions `pages: write` et `id-token: write`, l'étape `node scripts/make-pages-redirect.mjs`, l'étape `actions/upload-pages-artifact@v3` (chemin `dist/redirect`) et le job `deploy` (`actions/deploy-pages@v4`). Le script `scripts/make-pages-redirect.mjs` est conservé.
