# Gouvernance des données analytiques et exports

Clinical Navigator ne collecte pas « toutes les données possibles ». La collecte est limitée aux données nécessaires au fonctionnement, à la sécurité, à l’analyse d’usage consentie et à l’administration du service. Les données de recherche clinique, les données de santé, les documents source et les informations permettant d’identifier un participant sont interdites.

| Catégorie | Données exportables | Base de collecte | Exclusions explicites |
|---|---|---|---|
| Compte | Identifiant technique, nom et e-mail fournis par l’authentification, rôle, dates de création et de connexion. | Gestion du compte et sécurité. | Mot de passe, cookie de session, jeton OAuth, adresse IP, empreinte navigateur. |
| Consentement | Statut, version de politique, date d’accord ou de retrait. | Choix explicite de l’utilisateur. | Consentement présumé ou collecte cachée. |
| Activité agrégée | Type d’événement, route, contenu consulté et date, uniquement après consentement analytique. | Mesure d’usage consentie. | Saisie libre, note de cas, contenu de formulaire, identifiant de participant. |
| Éléments de travail | Nombre de favoris et de cas génériques. | Gestion de l’espace utilisateur. | Titre, note, action, checklist ou jalon d’un cas, car ils peuvent contenir des informations sensibles malgré les contrôles. |
| Export | Administrateur, date, destination configurée et nombre de lignes. | Traçabilité et sécurité. | Pièce jointe envoyée sans autorisation ou transfert à un destinataire non configuré. |

> L’export Excel est réservé à un administrateur autorisé. Il doit être utilisé pour l’administration du service, pas pour le profilage, la vente de données ou la prise de décisions ayant un effet défavorable sur les personnes.

L’utilisateur peut accepter ou refuser les analytics non essentiels, puis modifier ce choix dans son espace personnel. Le refus n’empêche pas l’utilisation du parcours clinique, des guides ou des outils. Les rapports e-mail exigent une configuration de messagerie de production séparée et une validation explicite du destinataire.
