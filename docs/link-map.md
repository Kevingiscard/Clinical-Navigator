# Cartographie des liens

| Élément | Destination | Type | Statut |
|---|---|---|---|
| Logo | `/` | interne | PASS — destination d’accueil du shell |
| Problème | `/fr/probleme` | interne | PASS |
| Concevoir un essai | `/fr/concevoir-un-essai` | interne | PASS |
| Auditer un essai | `/fr/auditer-un-essai` | interne | PASS |
| Formation | `/fr/formation` | interne | PASS |
| Guides | `/fr/guides` | interne | PASS |
| Sources | `/fr/sources` | interne | PASS |
| Diagnostic JSON | `/Clinical-Navigator/diagnostics/latest.json` | asset public | PASS |
| ICH E6(R3) | `https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106.pdf` | externe | NEEDS_REVIEW HTTP périodique |
| ICH E9(R1) | `https://database.ich.org/sites/default/files/ICH_E9-R1_Step4_Guideline_2019_1110.pdf` | externe | NEEDS_REVIEW HTTP périodique |
| EMA CTR | `https://www.ema.europa.eu/en/human-regulatory-overview/research-development/clinical-trials-human-medicines/clinical-trials-regulation` | externe | NEEDS_REVIEW HTTP périodique |
| CNIL MR-001 | `https://www.cnil.fr/fr/methodologie-de-reference-mr-001-recherches-sante-avec-recueil-du-consentement` | externe | NEEDS_REVIEW applicabilité locale |
| CNIL MR-003 | `https://www.cnil.fr/fr/methodologies-de-reference-pour-les-recherches-en-sante-verifier-sa-conformite-aux-mr-001-et-mr-003` | externe | NEEDS_REVIEW applicabilité locale |
| WHO | `https://www.who.int/publications/i/item/9789240097711` | externe | NEEDS_REVIEW HTTP périodique |

L’audit automatisé produit `client/public/diagnostics/link-audit.json` et `link-audit.md`. Un lien externe temporairement indisponible doit devenir `NEEDS_REVIEW` et ne doit pas casser le build. Aucun lien fictif, `href="#"` ou destination vide n’est accepté dans le code source audité.
