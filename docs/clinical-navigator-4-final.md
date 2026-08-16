# Clinical Navigator 4.0 — état final de livraison

## Produit

Clinical Navigator est une plateforme française de navigation opérationnelle et de conception méthodologique d'essais cliniques.

## Cœur livré

- J'ai un problème : wizard opérationnel client-only
- Concevoir un essai : workspace progressif
- Audit de cohérence
- Challenge du design
- Échantillonnage indicatif : binaire, continu, survie, cluster
- Planification stepped-wedge indicative
- Outils avancés : effectif, recrutement, fenêtres de visite
- Protocol/SAP/SoA scaffolding
- Références versionnées et veille documentaire
- PWA / offline fallback / service worker auto-update
- ErrorBoundary auto-recovery navigateur
- Health / maintenance UI
- GitHub Actions qualité, build, déploiement et maintenance
- Dependabot
- Health watch
- Issue template bug
- Page auteur et attribution
- Licence MIT
- Configuration GitHub Pages / Netlify / Vercel / Cloudflare Pages

## Validation

Le dépôt contient des tests Vitest, un self-check, un typecheck et des workflows CI. Dans l'environnement de création de cette archive, l'installation des dépendances complètes n'était pas disponible, donc le build complet local n'a pas été revendiqué comme exécuté avec succès. La validation de référence doit être faite par CI après installation des dépendances.

## Automatisation

Le système automatise les contrôles et les récupérations réversibles. Il ne prétend pas réécrire arbitrairement son propre code en production sans garde-fous. Les changements méthodologiques, scientifiques, réglementaires et destructifs restent en revue humaine.
