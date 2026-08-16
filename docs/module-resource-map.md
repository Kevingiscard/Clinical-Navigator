# Module resource map

Le routeur public utilise `/fr/modules` comme index et `/fr/modules/:slug` comme hub dynamique. Les routes spécialisées restent conservées : `/fr/concevoir-un-essai`, `/fr/auditer-un-essai`, `/fr/outils`, `/fr/formation`, `/fr/ressources`, `/fr/veille`, `/fr/essais-complexes` et `/fr/probleme`.

| Famille | Destination principale | Ressources reliées |
|---|---|---|
| Conception | `/fr/modules/conception` ou `/fr/concevoir-un-essai` | PICO, Design Studio, effectif, protocole, sources ICH |
| Protocole | `/fr/modules/protocole` | Structure, amendements, calendrier, SAP, qualité |
| Réglementaire | `/fr/modules/reglementaire` | CTR, CTIS, CNIL MR-001, revue locale |
| Consentement | `/fr/modules/consentement` | Checklist, scenario de version, GCP |
| Qualité / monitoring | `/fr/modules/qualite` | Audit, outils opérationnels, checklists, GCP |
| Formation | `/fr/modules/formation` | Parcours bilingue, quiz, références |
| Ressources / veille | `/fr/modules/ressources` et `/fr/modules/veille` | Explorateur, statuts, sources externes |
| Essais complexes | `/fr/modules/essais-complexes` | Adaptive, cluster, step-wedge, platform, basket, master protocol |
| Problèmes | `/fr/modules/probleme` | Orientation, checklists, escalade et sources |

La couverture est un seed opérationnel vérifiable et non une déclaration d’exhaustivité. Le rapport généré par `pnpm module:resources:validate` constitue la source de vérité pour les chiffres et les éventuelles références cassées.
