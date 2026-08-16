# Clinical Navigator — Module Resource Report

## Résultat

La mise à jour transforme les routes dynamiques `/fr/modules/:slug` en hubs opérationnels réutilisables. Chaque hub contient un résumé, un objectif, des prérequis, un parcours avec étapes cliquables, des ressources filtrables, une checklist locale exportable, des recommandations, des modules associés et une orientation par IA hors connexion.

## Chiffres calculés

| Élément | Nombre |
|---|---:|
| Modules | 28 |
| Ressources | 24 |
| Outils et calculateurs reliés | 4 |
| Checklists | 3 |
| Modèles | 1 |
| Sources officielles reliées | 7 |
| Formations | 1 |
| Liens externes | 7 |
| Findings de l’audit module | 0 |
| Copies de routes static-only | 64 |

Ces chiffres proviennent de `client/public/diagnostics/module-resource-audit.json` et de la sortie de `pnpm build:static`. Ils ne représentent pas une exhaustivité mondiale des ressources de recherche clinique.

## Couverture

Les hubs couvrent notamment conception, protocole, réglementaire, consentement, screening, inclusion, randomisation, intervention, visites, sécurité, déviations, monitoring, données, pharmacie, laboratoire, qualité, fin d’étude, statistiques, essais complexes, formation, ressources, veille et orientation par problème. Les ressources existantes sont reliées par IDs stables et ne sont pas dupliquées par module.

## Liens et destinations

Les destinations internes pointent vers des routes Clinical Navigator existantes. Les destinations externes sont des URLs HTTPS déjà présentes dans `referenceRegistry`. `pnpm links:audit` a produit `PASS` avec 0 finding. Le validateur module détecte les IDs, routes, URLs, sources, relations et doublons cassés.

## Offline et données sensibles

Les guides, checklists, exemples et outils publics marqués `Disponible hors ligne` restent embarqués dans le frontend. Les sources officielles et autres liens externes affichent `Nécessite Internet`. Les checklists sont sauvegardées uniquement dans le stockage local du navigateur et peuvent être exportées localement. Aucun patient ni aucune donnée identifiante n’est requis.

## Validation

La dernière validation réelle comprend 28 tests Vitest, 13 tests Playwright, typecheck, validation de ressources, audit de liens, build static-only, vérification de l’artefact PWA et budget JavaScript. Les validations Safari, Firefox, lecteurs d’écran, appareils réels, SBOM et audit WCAG complet restent à exécuter dans les environnements concernés.

## Gouvernance

Les contenus `NEEDS_REVIEW`, les références réglementaires et les juridictions non confirmées ne sont jamais auto-publiés comme obligations. Les modèles sont pédagogiques et doivent être adaptés et approuvés selon le contexte, le protocole, les SOP et la juridiction.
