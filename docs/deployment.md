# Déploiement

Avant publication, vérifiez que les migrations sont appliquées, que les tests passent et que le tableau de bord ne présente aucun contenu critique sans statut. La configuration actuelle s’adapte à un hébergement autoscalé : aucune fonctionnalité ne dépend d’un processus en mémoire durable, d’un minuteur local ou d’un worker persistant.

| Étape | Vérification |
|---|---|
| Base de données | Les tables sont présentes et les migrations validées. |
| Qualité | `pnpm check` et `pnpm test` se terminent avec succès. |
| Sécurité | Les routes admin sont protégées serveur, les entrées sensibles sont refusées et les secrets ne sont pas intégrés au code. |
| PWA/SEO | Manifest, fallback, robots, sitemap et metadata sont disponibles. Adapter le domaine absolu du sitemap lors de l’activation d’un domaine final. |
| Maintenance | Publier d’abord, puis créer un déclencheur Heartbeat pour `/api/scheduled/source-review` seulement après validation humaine. |

La publication doit être déclenchée par le propriétaire depuis l’interface du projet après la création d’un checkpoint. Aucun déploiement ou tâche planifiée ne doit être activé à partir d’un environnement de développement.
