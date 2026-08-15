# Architecture de maintenance et de veille — préparation non activée

## Principe de sécurité

La maintenance prépare des constats, incidents et correctifs candidats ; elle ne publie pas de contenu réglementaire critique, ne déploie pas automatiquement un changement spéculatif, et ne modifie jamais une donnée clinique ou utilisateur. Les corrections de sévérité P0 sont bloquées pour revue humaine. Les P1 ne peuvent être proposées qu’après reproduction et tests, sans déploiement automatique ; les P2 à P4 peuvent être préparées, testées et présentées pour approbation.

## Deux voies compatibles avec le budget actuel

| Approche | Fonctionnement | Coût et complexité | Usage retenu à ce stade |
| --- | --- | --- | --- |
| Vérifications périodiques gérées par l’application | Une tâche quotidienne ou hebdomadaire exécute des vérifications déterministes, enregistre les résultats et crée un incident ou un rapport. | Sans processus permanent ; préparation modérée. | Voie privilégiée pour les liens, états de sources, métriques de santé et synthèses. |
| Revue manuelle depuis le tableau d’administration | L’administrateur déclenche le contrôle, lit les constats et décide de corriger, publier ou archiver. | Aucun processus récurrent ; fonctionnement le plus simple. | Voie de départ tant que le site n’est pas publié et validé. |

> Une surveillance temps réel continue demanderait une infrastructure persistante et potentiellement payante. Elle n’est ni nécessaire ni activée pour le périmètre actuel à budget nul.

## Flux prévu pour une vérification récurrente

1. Une tâche authentifiée vérifie uniquement des cibles autorisées et non sensibles.
2. Le résultat est écrit de manière idempotente dans un journal de santé, sans information personnelle.
3. Des constats identiques sont regroupés ; une anomalie devient un incident avec sévérité, contexte, date et état.
4. Un correctif éventuel est marqué `CANDIDATE` puis doit réussir compilation, tests, build et contrôle de régression dans un environnement isolé.
5. Les éléments critiques (réglementation, sécurité, données, P0) restent `HUMAN_REVIEW_REQUIRED` et ne peuvent être publiés automatiquement.
6. Après publication par le propriétaire, une activation explicite permettrait de créer la tâche. Aucune tâche n’est créée dans l’environnement de développement.

## Contrôles à rendre visibles dans l’administration

| Famille | Mesure autorisée | Garde-fou |
| --- | --- | --- |
| Santé technique | État du build, erreurs anonymisées, routes indisponibles, liens cassés, dernière vérification. | Agrégation des erreurs ; aucun contenu de session ou identifiant personnel. |
| Sources | URL, version déclarée, date de dernière revue, différence détectée, niveau de criticité. | Une source réglementaire modifiée est toujours soumise à relecture humaine. |
| Dépendances | Version installée, mise à jour disponible, niveau de risque, résultat de test. | Aucune mise à jour majeure ni sécurité critique sans revue. |
| Incidents | Sévérité P0–P4, état, occurrence agrégée, action proposée, décision humaine. | Pas de correction de production automatique pour P0/P1. |
| Release et rollback | Checkpoint, test, build, validation, motif de rollback. | La publication et le rollback sont réservés au propriétaire. |
