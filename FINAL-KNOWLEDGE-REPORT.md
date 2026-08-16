# Clinical Navigator — Final Knowledge Report

## Dataset

La version `1.0.0` du Knowledge Graph contient **161 items** structurés, dont **154** issus de la base clinique bilingue et 7 fiches curatées à IDs stables. Elle contient **4 relations** explicites et couvre **21 juridictions indexées**. Ces chiffres proviennent de `knowledgeStats` et non d’une estimation marketing.

## Modules alimentés

Le seed alimente le noyau, la conception d’essai, l’audit d’essai, la statistique, la réglementation, l’éthique, le consentement, la qualité, la gestion des données, la sécurité et les outils. La page publique `/fr/knowledge` recherche dans le seed ; la page `/fr/admin/knowledge` présente les éléments à revoir derrière un backend.

## Sources et statuts

Les fiches utilisent le `ReferenceRegistry` et des résumés courts. Les sources officielles ICH, EMA, CNIL et OMS sont versionnées ou marquées `NEEDS_REVIEW` selon l’état de vérification. Aucune réglementation locale inconnue n’est marquée `VERIFIED`.

## Juridictions

Le registre contient 21 entrées avec revue locale obligatoire. Le Bénin, la Côte d’Ivoire, le Sénégal, le Cameroun et la RDC restent `PORTAL_NOT_CONFIRMED` dans la version actuelle. Ce choix est volontaire : absence de source confirmée ne devient jamais une règle inventée.

## Offline et IA

Les items embarqués marqués `offlineAvailable` peuvent alimenter la recherche hors connexion et le moteur local avec citations, score de confiance et refus si la correspondance est faible. L’IA ne doit pas recevoir de données patient, ne prend pas de décision réglementaire et ne publie aucune mise à jour automatiquement.

## Relations

Les relations de seed relient endpoint, estimand, méthode statistique, checklist et réglementation. Elles sont vérifiées pour les IDs et les sources, mais le graphe reste un premier seed et ne prétend pas représenter toutes les dépendances scientifiques.

## Tests réels

La dernière validation doit être lue dans les diagnostics générés. Les contrôles ajoutés comprennent schema/graph verification, 26 tests Vitest, build, artefact, audit liens, E2E et budget lorsqu’ils sont exécutés dans la CI. Aucun contrôle non exécuté ne doit être présenté comme réussi.

## Limites

Le PDF demande également une couverture exhaustive de tous les designs, guidelines ICH, essais, publications, calculateurs, checklists, workflows, rôles et pays. Le dépôt ne les contient pas tous dans cette itération. Il fournit l’architecture, le schéma et un seed vérifiable plutôt qu’une fausse exhaustivité.

## Prochaine mise à jour

La prochaine revue des références est prévue au `2027-02-16`, ou plus tôt en cas de nouvelle version officielle, changement de portail, incident ou demande d’un reviewer compétent.
