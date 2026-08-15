# Maintenance périodique contrôlée

Clinical Navigator expose un endpoint réservé aux tâches planifiées : `POST /api/scheduled/source-review`. Il vérifie les liens des sources documentaires intégrées et retourne un rapport de disponibilité. Il n’effectue **aucune modification automatique** de statut, aucune publication, aucune interprétation réglementaire et aucune notification externe.

Le déclencheur planifié ne doit être créé qu’après publication de l’application, car l’infrastructure de tâches planifiées cible l’URL de production. Une fois le projet publié, un administrateur peut créer une tâche au format UTC à six champs, par exemple `0 0 3 * * 1` pour une revue hebdomadaire chaque lundi à 03:00 UTC. La création et la gestion du déclencheur restent volontairement séparées du code applicatif afin d’imposer une validation humaine et un point de restauration avant activation.

| Contrôle | Fréquence recommandée | Effet autorisé | Effet interdit |
|---|---:|---|---|
| Disponibilité des liens de sources | Hebdomadaire | Rapport de statut des URL | Changer automatiquement la validation d’une source |
| Revue des contenus proches de leur échéance | Mensuelle | Liste de contenus à examiner | Publication ou archivage automatique |
| Revue de gouvernance | Trimestrielle | Tableau de bord éditorial | Décision réglementaire automatisée |

> Chaque résultat de contrôle doit être examiné par un responsable de contenu compétent avant une modification de statut, de version, de source ou de recommandation.
