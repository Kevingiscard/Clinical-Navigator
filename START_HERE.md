# Clinical Navigator — site complet

Cette archive contient la version du projet Clinical Navigator extraite du checkpoint du 15 août 2026.

## Lancer localement

Pré-requis : Node.js 20+ et pnpm 10+.

```bash
pnpm install
pnpm dev
```

Puis ouvrir l'URL affichée par Vite.

## Vérifications

```bash
pnpm check
pnpm test
pnpm build
```

## Parcours principaux

- `/` — accueil
- `/fr/probleme` — parcours guidé « J’ai un problème »
- `/fr/concevoir-un-essai` — Clinical Trial Design Workspace
- `/fr/concevoir-un-essai/outils` — outils de conception
- `/fr/auditer-un-essai` — audit d’essai
- `/fr/explorer` — exploration des connaissances
- `/fr/guides` — guides
- `/fr/scenarios` — scénarios opérationnels
- `/fr/modules` — modules
- `/fr/formation` — formation
- `/fr/ressources` — ressources
- `/fr/veille` — veille documentaire
- `/fr/outils` — outils généraux
- `/fr/mes-donnees` — confidentialité et données
- `/fr/confidentialite` — confidentialité
- `/fr/conditions` — conditions
- `/fr/a-propos` — à propos

## Important avant une mise en production

Le projet utilise un backend, une base de données et des routes serveur : ce n'est pas un simple site statique à déposer tel quel sur GitHub Pages. Appliquer les migrations, configurer les variables d'environnement et valider les tests avant publication.
