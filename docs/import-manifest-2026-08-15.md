# Manifeste d’import — Clinical Navigator

## Source retenue

L’import provient de l’archive `Clinical-Navigator-site-2026-08-15.zip`. L’archive `Clinical-Navigator-site-2026-08-15(1).zip` est un doublon binaire de cette version. Elle contient les parcours de navigation, les modules cliniques, les outils de conception d’essai, les tests Vitest et les ressources de documentation de Clinical Navigator.

## Éléments importés

Les répertoires `client`, `server`, `shared`, `drizzle` et `docs`, ainsi que la configuration TypeScript, Vite, Vitest et les manifestes de paquets, ont été synchronisés. Ces éléments constituent le code source, les tests, le schéma de données et la documentation nécessaires au fonctionnement reproductible de l’application.

| Élément conservé | Statut | Justification |
|---|---|---|
| `pnpm-lock.yaml` | Fichier versionné | Verrouille les versions des dépendances afin que l’installation et la compilation produisent le même résultat. |
| `drizzle/*.sql` | Migrations versionnées | Décrivent l’évolution additive du schéma et permettent de reconstruire une base compatible. |
| `drizzle/meta/*` | Métadonnées versionnées | Conservent l’historique des migrations pour la génération Drizzle future. |
| `docs/*` et `START_HERE.md` | Documentation source | Expliquent l’utilisation, les limites et l’exploitation du projet. |

## Éléments exclus ou retirés

Les dépendances installées (`node_modules`), la sortie de compilation (`dist`), les dossiers Git, les variables d’environnement, les métadonnées d’exécution, les journaux et le fichier de sauvegarde `vite.config.ts.bak` ne font pas partie de la publication source. L’ancienne migration `drizzle/0000_jittery_mongoose.sql`, non référencée par le journal Drizzle et incompatible avec l’application Clinical Navigator, a été retirée.

## Adaptation locale contrôlée

La migration initiale `drizzle/0000_robust_centennial.sql` crée désormais la table `users` avec `IF NOT EXISTS`. Cette adaptation préserve la compatibilité avec le projet antérieur qui contient déjà cette table, tout en gardant l’initialisation fonctionnelle sur une base vierge.

