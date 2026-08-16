# Knowledge API

Le serveur expose des endpoints read-only bornés : `GET /api/knowledge/search?q=...&limit=...`, `GET /api/knowledge/:id`, `GET /api/knowledge/:id/related`, `GET /api/sources` et `GET /api/jurisdictions`. Les réponses incluent la version du dataset ou la date de génération.

La recherche est locale au dataset embarqué côté serveur, limite la taille de la requête et le nombre de résultats, et ne reçoit pas de données patient. Les mutations knowledge, la revue, la publication et l’administration doivent rester protégées par authentification et autorisation backend ; elles ne sont pas disponibles dans static-only.
