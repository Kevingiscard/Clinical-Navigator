# Clinical Navigator 3.0 — état de livraison

## Résultat livré

Le projet a été étendu à partir de la spécification fournie pour consolider les trois premiers piliers : navigation opérationnelle dans un essai, conception structurée d’un essai et audit de préparation d’un essai. L’application demeure volontairement une plateforme d’assistance méthodologique, documentaire et opérationnelle. Elle ne décide pas à la place d’un investigateur, promoteur, comité d’éthique, biostatisticien, responsable de données, pharmacovigilant ou autorité compétente.

| Élément livré | Détail de mise en œuvre | Limite de sûreté |
| --- | --- | --- |
| Workspace de conception étendu | L’atelier couvre désormais 29 étapes, de l’idée jusqu’à l’audit final : PICO, objectifs, hypothèses, éligibilité, intervention, endpoints, estimands, design, randomisation, aveugle, effectif, calendrier, recrutement, statistiques, sécurité, qualité, risques, données, protocole, SAP, enregistrement, réglementation et reporting. | Les champs produisent des brouillons versionnés ; ils ne constituent pas un protocole validé ni un SAP approuvé. |
| Pilier « Auditer un essai » | Nouvelle page protégée, sélection d’étude, score de préparation, catégories de contrôle et constats explicables. | Le résultat « prêt à revoir » n’est pas une approbation et n’autorise aucune soumission ou conduite d’essai. |
| Contrôles transversaux | Règles entre endpoint, estimand, analyse et effectif ; entre protocole et SAP ; entre calendrier, visites, évaluations et recrutement ; entre qualité et risques ; entre reporting, enregistrement et réglementation. | Les règles détectent des ruptures de structure ou de documentation. Elles ne remplacent ni jugement expert ni source externe vérifiée. |
| Randomisation et capacité | Simulation théorique sans identifiant, modèle de charge, capacité centre et scores indicatifs de complexité, charge participant et charge site. | Ce ne sont pas des outils certifiés d’allocation ni des modèles opérationnels validés. |
| Collaboration | Les projets visibles aux collaborateurs sont récupérés selon leur rôle ; les écritures sont limitées au propriétaire et à l’éditeur. Les lecteurs et relecteurs ont un accès de consultation. | L’ajout d’un collaborateur requiert encore un identifiant utilisateur interne et doit être effectué par le propriétaire. |
| Références méthodologiques | Le registre du workspace stocke désormais statut, version, source, date de revue et un snapshot à chaque création ou révision. | Le contenu de la source et sa validité scientifique/réglementaire doivent toujours être contrôlés par une revue humaine compétente. |
| Administration de maintenance | Onglet de maintenance préparée avec santé, garde-fous d’incident et politique P0–P4. | Aucun contrôle périodique, auto-correctif ou publication automatique n’est activé. |

## Validation technique réalisée

| Vérification | Résultat |
| --- | --- |
| Contrôle TypeScript | Réussi. |
| Tests unitaires | Réussis : **20 tests** répartis dans quatre fichiers. |
| Build de production | Réussi, avec chargement différé des nouvelles pages d’audit et d’outils de conception. |
| Vérification visuelle | Les routes « Concevoir un essai » et « Auditer un essai » ont été contrôlées sur affichage bureau. |

## Ce qui reste explicitement non activé

> Ces éléments ne doivent pas être activés sans publication du site et approbation explicite du propriétaire.

| Fonction | Raisons et prérequis |
| --- | --- |
| Tâche de maintenance ou de revue quotidienne | Le site doit d’abord être publié. La cible, la fréquence, le caractère idempotent, les journaux et le responsable de revue doivent être validés. |
| Surveillance automatique des sources réglementaires | Les sources, versions, dates et règles de criticité doivent être définies ; toute modification réglementaire doit rester en statut **HUMAN REVIEW REQUIRED**. |
| Correction automatique et rollback | Une politique de release, une validation en environnement isolé, des tests de régression et une autorisation propriétaire sont nécessaires. Les incidents P0 et P1 restent soumis à une intervention humaine. |
| Envoi d’Excel par e-mail | La configuration sécurisée du service d’envoi et un déclenchement administrateur explicite restent nécessaires. |
| Publication publique | Réservée au propriétaire via le bouton de publication de l’interface après relecture des contenus et des réglages. |

## Capacités volontairement non revendiquées

Clinical Navigator ne prétend pas être un système IRT/IWRS, un eCRF, un EDC, une base de données de santé, un portail de soumission CTIS, un registre d’essais, un système de pharmacovigilance, un outil de randomisation certifié, ni une autorité réglementaire. La plateforme ne doit recevoir ni identifiant de participant, ni donnée de santé individuelle, ni document source.

La spécification jointe s’interrompt au début de la définition détaillée d’un incident. Les structures d’incident, release, backup et auto-réparation sont donc préparées de manière prudente, sans inventer les exigences manquantes. Une version complète de la fin du document permettrait de les affiner avant toute activation.

## Étapes recommandées pour le propriétaire

1. Relire les nouveaux écrans d’audit et le workspace étendu avec les responsables méthodologiques, statistiques, qualité et réglementaires concernés.
2. Vérifier les sources primaires, la juridiction et les dates d’effet avant de rendre public tout contenu réglementaire.
3. Publier uniquement après validation humaine ; l’activation d’une maintenance périodique se fera ensuite séparément, avec sa fréquence et ses garde-fous.
4. Configurer l’envoi e-mail uniquement si le service d’expédition, le consentement et la politique de destinataires ont été approuvés.
