# Clinical Navigator 3.0 — matrice initiale de couverture

## Objet et règle de sûreté

Cette matrice rapproche la spécification fournie de l’état constaté du projet. Clinical Navigator est un outil de préparation, de structuration et d’orientation. Il ne prend pas de décision clinique, scientifique, statistique ou réglementaire au nom d’un professionnel qualifié. Aucune donnée de santé individuelle, aucun document source et aucun identifiant de participant ne doivent être saisis dans le produit.

| Domaine de la spécification | État constaté | Décision d’exécution |
| --- | --- | --- |
| Navigation dans un essai existant | Parcours guidé à huit étapes, moteur déterministe, contenus versionnés, références et limites déjà présents. | Conserver et renforcer les contrôles de périmètre. |
| Conception d’essai | Workspace versionné, 17 étapes, PICO, endpoints, estimands, design, calculs, faisabilité et calendrier déjà présents. | Étendre par des sections structurées et contrôles de cohérence ; aucune validation autonome. |
| Audit d’essai | Des contrôles de cohérence existent, mais aucun pilier dédié avec lecture transversale du projet. | Priorité produit : créer un pilier d’audit à résultats explicables et exportables. |
| Statistical Analysis Plan | Les champs statistiques et une cohérence initiale existent. | Structurer le SAP, les hypothèses et les alertes de compatibilité ; les méthodes restent soumises à revue biostatistique. |
| Qualité, risques, données | Des modules pédagogiques existent, mais pas de builders versionnés centrés projet. | Ajouter des registres de risques, CTQ/QTL et une préparation de dictionnaire de données sans données participant. |
| Protocole, reporting et registration | Des contenus et sources existent ; aucun dépôt automatique vers un registre. | Préparer des livrables « DRAFT — HUMAN REVIEW REQUIRED » ; interdire toute soumission externe automatisée. |
| Juridictions et sources | Sources/juridictions administrables et états de contenu déjà présents. | Compléter les métadonnées et le monitoring préparatoire ; validation humaine obligatoire pour les contenus critiques. |
| Veille, maintenance et auto-réparation | Santé système et tests existent ; aucune automatisation active. | Préparer seulement l’architecture, les journaux, les seuils et l’interface. L’activation attend publication et accord explicite du propriétaire. |

## Exigences factuelles ou externes à valider avant affichage public

Les éléments de la spécification qui affirment une date d’effet, une version d’autorité ou une obligation réglementaire ne doivent pas être publiés comme vérités sans vérification sur une source primaire, date de consultation, statut et relecture humaine. Cela inclut notamment les versions ICH, SPIRIT, CONSORT, WHO/ICTRP, CTIS, EMA et les exigences propres à chaque pays.

| Catégorie | Traitement dans le produit |
| --- | --- |
| Règle critique de sécurité ou de réglementation | Détection et brouillon possibles ; statut obligatoire **HUMAN REVIEW REQUIRED** avant publication. |
| Calcul statistique, design, estimand, méthode d’analyse | Hypothèses, formule, avertissement et trace de version ; validation par biostatisticien requise. |
| Randomisation et aveugle | Plans abstraits uniquement ; aucune prétention d’être un IRT/IWRS, aucun identifiant de participant. |
| Registration et autorités externes | Préparation de champs et checklist uniquement ; jamais de soumission directe ni de prétention d’enregistrement. |
| Auto-réparation | Aucune correction automatique en production pour une anomalie critique ; rollback et publication restent sous contrôle humain. |

## Ordre de réalisation retenu

1. Ajouter le pilier « Auditer un essai » à partir des données déjà persistées, avec contrôles endpoint–estimand–analyse–effectif, protocole–SAP et calendrier.
2. Compléter les builders projet de plus forte valeur : risques, qualité par la conception, SAP, protocol readiness, références versionnées, capacité et charge.
3. Créer une surface administrative de santé, incidents et changements. Elle sera préparée avec états, audit trail et contrôles d’accès, mais sans activation de tâches automatiques.
4. Réaliser des tests unitaires, de permissions et de régression, puis vérifier le build et les vues principales.

## Limites connues à la date de cette analyse

Le document joint se termine de manière incomplète à l’entrée « incident_i ». Les exigences d’incident, de release et de sauvegarde qui suivent ne peuvent donc pas être inventées. Elles seront modélisées à partir des principes clairement exprimés : confidentialité, traçabilité, seuil de gravité, validation humaine et rollback, puis affinées si une version complète du document est fournie.
