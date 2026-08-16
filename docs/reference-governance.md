# Gouvernance des références

Chaque référence du `ReferenceRegistry` possède un identifiant, un éditeur, une juridiction, une version, une date de publication ou d’effet lorsque disponible, une date de vérification, une prochaine revue, une portée et une URL HTTPS officielle.

## Statuts

| Statut | Signification |
|---|---|
| `VERIFIED_CURRENT` | Source officielle contrôlée comme actuelle dans la dernière revue enregistrée. |
| `VERIFIED_TRANSITIONAL` | Source vérifiée mais soumise à une transition ou à des dispositions temporelles. |
| `ADOPTED_NOT_YET_EFFECTIVE` | Texte adopté dont la date d’effet future doit être affichée. |
| `NEEDS_REVIEW` | Source repérée, mais l’applicabilité ou l’actualité exige une revue humaine. |
| `DRAFT` | Document de travail ; jamais présenté comme obligation. |
| `OUTDATED` / `ARCHIVED` | Source remplacée ou historique. |
| `CONFLICTING` | Sources en conflit ; aucune synthèse automatique ne tranche. |
| `NOT_APPLICABLE` | Source non applicable au périmètre étudié. |

Une modification d’URL, de contenu ou de version produit un signal `REVIEW_REQUIRED`. Elle ne publie jamais automatiquement une nouvelle obligation. Toute transition réglementaire doit afficher sa date d’effet et sa juridiction.
