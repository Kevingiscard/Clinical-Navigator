# Clinical Trial Design Workspace

Le **Clinical Trial Design Workspace** est le pilier « Concevoir un essai » de Clinical Navigator. Il permet de créer un projet d’étude versionné et de structurer progressivement les éléments méthodologiques, de la question clinique à la vérification finale. Le workspace traite exclusivement des hypothèses et décisions de design ; aucune donnée de participant, document source ou donnée de santé individuelle ne doit y être saisie.

| Groupe | Étapes disponibles | Résultat attendu |
|---|---|---|
| Fondations | Question/PICO, population, intervention, comparateur, objectifs/endpoints, estimand | Une question clinique explicite et traçable. |
| Méthodes | Design, randomisation, effectif, calendrier, statistiques | Des hypothèses de méthode rendues visibles et révisables. |
| Exécution | Risques, faisabilité, protocole, réglementaire, reporting | Un plan de préparation cohérent avec les responsabilités et sources à vérifier. |
| Contrôle | Vérification finale et versioning | Des points ouverts, un statut de préparation et l’historique des modifications. |

## Fonctionnalités méthodologiques

Le workspace comprend un comparateur de designs, un calculateur pédagogique d’effectif binaire, continu ou en cluster, ainsi qu’une projection de recrutement par centres. Chaque résultat conserve ses hypothèses et affiche une mise en garde : il ne constitue pas une validation statistique, une estimation définitive ni une autorisation de protocole. La conception, le calcul de puissance et la stratégie d’analyse nécessitent une revue par un biostatisticien compétent.

Le moteur de cohérence contrôle notamment la présence des composantes PICO, des objectifs et endpoints, de l’estimand, du design et des hypothèses d’effectif. Il retourne des statuts **Incomplet**, **Attention**, **Incompatible** ou **Cohérent** ; ces indicateurs sont des listes de vérification, non une décision réglementaire ou scientifique.

## Données et versioning

Chaque projet appartient à son utilisateur et contient des sections versionnées, des calculs horodatés et des snapshots de modification. Les sections peuvent être marquées « non commencée », « en cours », « complète » ou « à revoir ». La création d’un projet active explicitement le contrôle de sécurité des données, mais l’utilisateur demeure responsable de n’inscrire que des informations abstraites et non identifiantes.

## Limites à préserver

> Le workspace aide à préparer, comparer et documenter. Il ne remplace pas l’expertise de l’investigateur, du méthodologiste, du biostatisticien, du promoteur, du comité d’éthique ou de l’autorité compétente.

Les délais réglementaires, obligations de notification, hypothèses de taux d’événement, données de recrutement, paramètres de randomisation et sources doivent être confirmés dans les documents applicables et le contexte juridictionnel réel. Les principes de bonnes pratiques cliniques et de qualité d’essai servent de cadre de référence, sans se substituer aux exigences propres à l’étude. [1] [2]

## Références

[1] [ICH, *E6(R3) Guideline for Good Clinical Practice*](https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106.pdf)  
[2] [ICH, *E9 Statistical Principles for Clinical Trials*](https://database.ich.org/sites/default/files/E9_Guideline.pdf)
