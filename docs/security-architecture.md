# Architecture de sécurité

Clinical Navigator applique une défense en profondeur adaptée à un outil méthodologique qui ne doit pas recevoir de données patient.

| Couche | Contrôle |
|---|---|
| Navigateur | CSP et permissions selon l’hôte, consentement, absence de secret dans `VITE_*`, refus des entrées sensibles lorsque le composant le permet. |
| API | Validation des entrées, rate limiting, cookies sécurisés, authentification et autorisation côté serveur. |
| Données | Minimisation, pas de données patient par défaut, logs sans texte clinique, migrations explicites. |
| Build | Typecheck, secrets baseline, artefact PWA, budget gzip, absence de backups et vérification de références. |
| Exploitation | Health check, request-id, diagnostic public limité, workflow de maintenance et revue humaine pour les domaines sensibles. |

Les en-têtes de sécurité ne remplacent pas une revue OWASP ASVS. Les scans externes, le SBOM, le test de restauration, les tests IDOR/CSRF et la matrice navigateur complète doivent être exécutés dans l’environnement de publication avant d’affirmer une release de production.

Aucune donnée de santé, aucun identifiant, aucune clé et aucun token ne doit apparaître dans le cache public, les diagnostics, les exports ou les logs.
