# Maintenance automatique — Clinical Navigator

## Ce qui est automatisé

- contrôle quotidien du dépôt ;
- self-check de l'application ;
- TypeScript check ;
- tests Vitest ;
- build de production ;
- smoke test local du build ;
- audit de dépendances ;
- Dependabot hebdomadaire ;
- auto-merge des mises à jour Dependabot après validation GitHub Actions ;
- surveillance horaire de la disponibilité publique GitHub Pages ;
- création automatique d'issue d'incident ;
- retry automatique d'un run de maintenance en échec ;
- mise à jour automatique du service worker et nettoyage des anciens caches ;
- mode offline et récupération de cache côté navigateur.

## Limite importante

Aucun système logiciel ne peut garantir une réparation automatique sûre de toute erreur métier ou scientifique. Clinical Navigator applique donc une politique de réparation déterministe : erreurs transitoires, cache, build, dépendances et régressions testables peuvent être automatisés ; les changements réglementaires, méthodologiques, statistiques critiques ou migrations destructives restent soumis à revue humaine.

## Dernière version saine

Le déploiement ne part en production qu'après self-check, type-check, tests et build. GitHub Pages conserve le dernier déploiement réussi si un nouveau build échoue avant publication.

## Données patient

Aucune donnée patient n'est requise pour utiliser le Studio de conception. Ne saisissez jamais de données identifiantes, de documents source ou de données de santé individuelles dans le site.
