# Confidentialité et sécurité

Clinical Navigator a été conçu pour traiter des descriptions **générales** de situations de recherche clinique. L’application ne nécessite aucune donnée patient ou document source pour organiser une démarche opérationnelle.

| Mesure | Mise en œuvre | Limite |
|---|---|---|
| Minimisation | Les formulaires demandent rôle, phase, type d’étude, juridiction et problème général. | Un utilisateur peut malgré tout saisir un détail identifiant : la formation et les avertissements restent essentiels. |
| Détection indicative | Certains formats d’e-mails, numéros, identifiants et titres de civilité sont signalés avant persistance. | Ce n’est pas une technologie de désidentification complète. |
| Cas sauvegardés | Les cas enregistrés sont réservés aux utilisateurs authentifiés et refusent les motifs directs détectés. | Les informations indirectement identifiantes doivent aussi être évitées par l’utilisateur. |
| Analytics | Les événements sont stockés sans cookie et sans identifiant utilisateur, puis consultés de manière agrégée. | Une analyse des obligations locales de protection des données reste nécessaire avant une mise en production publique. |

Les contrôles techniques ne garantissent pas à eux seuls la confidentialité. Les utilisateurs doivent ne jamais soumettre de nom, coordonnées, numéro de dossier, identifiant de participant, capture d’écran, document source, date de naissance exacte ou combinaison de détails permettant une réidentification.

En cas de doute, l’information ne doit pas être saisie dans l’outil. Elle doit rester dans les systèmes et circuits autorisés par l’étude et l’organisation.

## Contrôle prépublication du champ libre (« J’ai un problème »)

Avant toute publication, le script `scripts/privacy-free-text-check.py` doit être exécuté sur le build réel. Il saisit des marqueurs fictifs dans les champs « Situation générale » et « Problème rencontré », termine le parcours, puis vérifie que ces marqueurs n’apparaissent ni dans l’URL ou l’historique, ni dans le stockage navigateur (localStorage, sessionStorage, cookies), ni dans les logs console, ni dans les requêtes réseau, et qu’aucune requête externe n’est émise. Il vérifie aussi que la consigne anti-identifiants est visible près de la saisie. Toute exposition réelle constatée bloque la publication et doit être signalée.

Résultat du 2026-11-21 (build statique local) : 13/13 contrôles réussis — aucune trace des marqueurs fictifs, aucune requête externe pendant le parcours, consigne visible (étape de saisie et en-tête). L’affirmation « le parcours fonctionne localement » n’est valable que pour un build qui passe ce contrôle ; elle doit être revérifiée après toute modification du parcours, de l’analytics ou de la persistance.
