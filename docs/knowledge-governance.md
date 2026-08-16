# Knowledge governance

Chaque fiche possède un ID stable, un type, une version, une provenance, un statut, une date de vérification et une prochaine revue. Les statuts `VERIFIED`, `NEEDS_REVIEW`, `DRAFT`, `OUTDATED`, `ARCHIVED` et `CONFLICTING` ne sont pas interchangeables.

Le pipeline attendu est : source détectée, diff, classification, draft, reviewer assigné, vérification, publication. Une modification de portail ou de réglementation crée une tâche de revue ; elle ne publie jamais automatiquement une règle. Une source locale inconnue, notamment au Bénin, reste `NEEDS_REVIEW`.

Les actions administratives de création, modification, publication et archivage nécessitent une identité backend, une autorisation serveur, une trace d’audit et une revue humaine. Le mode static-only ne permet pas ces mutations.
