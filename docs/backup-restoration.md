# Export, sauvegarde et restauration

Clinical Navigator sépare les éléments de travail de trois manières : le code et les contenus versionnés dans le dépôt, les données applicatives dans la base, et les médias éventuels dans le stockage objet. Une restauration fiable exige de considérer ces trois couches conjointement.

| Élément | Contenu | Cadence recommandée | Méthode de restauration |
|---|---|---|---|
| Checkpoint du projet | Code, dépendances, configuration et documentation. | Avant toute publication ou migration risquée. | Restaurer un checkpoint connu depuis l’historique du projet. |
| Base de données | Favoris, cas génériques, feedback, backlog et états opérationnels. | Avant une migration structurelle et selon la politique de l’organisation. | Restaurer par les mécanismes approuvés du fournisseur de base ; vérifier le schéma avant remise en service. |
| Sources et contenus | Catalogue de scénarios, sources, modules, versions et statuts. | Avant une revue majeure ou une publication de contenu. | Restaurer la version de contenu validée et repasser une revue humaine. |

> Les données de production doivent être traitées comme potentiellement sensibles même si le produit interdit les données patient. Ne copiez jamais une base de production vers un environnement non autorisé et ne testez jamais avec des données personnelles réelles.

La restauration ne remplace pas une analyse d’intégrité. Après toute restauration, vérifier les migrations, les permissions admin, le rendu du parcours, les sources affichées et les liens de maintenance avant de rendre le service disponible.
