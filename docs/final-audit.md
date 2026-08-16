# Audit final initial — Clinical Navigator

**Date de l’audit :** 2026-08-16  
**Branche :** `feat/v2-finale`  
**Commit de base inspecté :** `9a24821`  
**Statut de départ :** Release Candidate, pas certification réglementaire.

> Cet audit repose sur l’inspection du checkout, des scripts, des routes, des workflows et des validations effectivement exécutées. Un élément marqué `NOT_RUN` n’est pas présenté comme réussi.

| ID | Problème | Gravité | Fichier ou périmètre | Cause | Correction prévue | Test associé | Statut |
|---|---|---:|---|---|---|---|---|
| AUD-001 | Certains fichiers `.bak` restent dans le checkout serveur. | P2 | `server/routers/studyDesign.ts.bak`, `server/studyDesign.ts.bak` | Backups historiques non supprimés dans le dernier état inspecté. | Supprimer les backups du dépôt et bloquer leur présence dans l’artefact. | `find`, `artifact:verify`, `git diff --check` | OPEN |
| AUD-002 | Le push GitHub des workflows est refusé. | P1 | `.github/workflows/*.yml` | Token sans permission `workflows`. | Réautoriser le token puis pousser la branche ; ne pas supprimer les workflows. | `git push origin feat/v2-finale` | BLOCKED_EXTERNAL |
| AUD-003 | L’authentification dépend encore de l’adaptateur OAuth fourni par l’environnement. | P1 | `server/_core/oauth.ts`, `server/_core/context.ts` | Aucun fournisseur OIDC portable configuré dans le produit. | Documenter le contrat OIDC/OAuth et isoler le fournisseur ; ne pas prétendre fournir magic-link/passkeys sans implémentation. | Tests auth/logout et revue humaine de configuration | OPEN |
| AUD-004 | Aucun `ReferenceRegistry` typé avec statuts réglementaires complets. | P1 | `shared/` | Les sources sont embarquées dans la base clinique et le registre pays, sans workflow de version complet. | Ajouter statuts `VERIFIED_CURRENT`, `VERIFIED_TRANSITIONAL`, `ADOPTED_NOT_YET_EFFECTIVE`, `NEEDS_REVIEW`, `DRAFT`, `OUTDATED`, `ARCHIVED`, `CONFLICTING`, `NOT_APPLICABLE`. | `references:validate`, tests de statuts | OPEN |
| AUD-005 | Le moteur offline est lexical et non une recherche vectorielle locale. | P2 | `client/src/lib/offlineAI.ts` | Choix de légèreté et absence de modèle local téléchargé. | Conserver le moteur BM25-like léger et documenter qu’il n’est pas un LLM ; ajouter index local uniquement si son coût est acceptable. | Tests offline, score et refus faible confiance | PARTIAL |
| AUD-006 | La protection des données locales ne bloque pas encore toutes les sauvegardes de quasi-identifiants. | P1 | favoris/projets/checklists locaux | La détection de termes existe surtout pour la base et les garde-fous généraux. | Ajouter un filtre de confidentialité partagé avant `localStorage`/IndexedDB et une action d’effacement. | Tests anonymisation, stockage local et export | OPEN |
| AUD-007 | Exports JSON/CSV/XLSX et import contrôlé ne sont pas démontrés sur tous les parcours publics. | P2 | outils et projets locaux | Fonctionnalités demandées non couvertes par le contrat E2E actuel. | Ajouter exports sans données sensibles, validation de schéma et avertissement de confidentialité. | Tests import/export et artefact | OPEN |
| AUD-008 | Audit trail backend complet non vérifié. | P1 | routers, DB, migrations | Le schéma contient des migrations mais aucun contrat d’audit immuable complet n’a été confirmé. | Ajouter un journal d’événements minimisé avec acteur, action, cible, version et timestamp, sans texte libre clinique. | Tests RBAC/audit trail | OPEN |
| AUD-009 | Backup/restauration de base non vérifié. | P1 | DB/ops | Les scripts de migration existent ; aucun test de restauration réel n’a été exécuté dans ce checkout. | Documenter la procédure et créer un test de restauration non destructif sur environnement isolé. | `backup:verify`, exercice manuel | NOT_RUN |
| AUD-010 | La matrice navigateur réelle est incomplète. | P2 | Playwright | Les tests exécutés couvrent Chromium local et axe critical ; Safari/Firefox/iOS n’ont pas été exécutés. | Ajouter projets Playwright disponibles dans CI et campagne appareil réelle. | Playwright multi-projet | NOT_RUN |
| AUD-011 | OWASP ASVS, SBOM et scan de dépendances ne sont pas démontrés par un rapport de release. | P1 | workflows | Le baseline secrets/dangerous patterns existe, mais pas un rapport SBOM signé ou un scan complet confirmé. | Ajouter génération SBOM et scan non bloquant puis bloquant après qualification. | workflow security | OPEN |
| AUD-012 | Le registre Bénin et plusieurs pays d’Afrique de l’Ouest restent à confirmer. | P1 | `shared/jurisdictionRegistry.ts` | Aucune source officielle actuelle vérifiée dans la version publiée. | Garder `PORTAL_NOT_CONFIRMED` et `NEEDS_REVIEW`; ne jamais inventer CNERS, ABMED, APDP ou texte applicable. | `knowledge:verify`, revue locale | PARTIAL |
| AUD-013 | Sitemap/SEO ne sont pas contrôlés par le validateur d’artefact. | P2 | `client/public/sitemap.xml`, `robots.txt` | Les fichiers existent, mais leur cohérence avec les routes générées n’est pas testée systématiquement. | Ajouter vérification des URLs publiques et exclusion admin/compte/favoris. | `seo:verify` | OPEN |
| AUD-014 | Le rollback automatique de déploiement n’est pas activé. | P1 | Vercel/GitHub Pages | Le rollback de code peut dépendre du fournisseur ; aucune action automatique destructive n’est autorisée. | Documenter rollback fournisseur et conserver les migrations hors rollback automatique. | smoke test post-déploiement | OPEN |
| AUD-015 | Les claims doivent rester prudents. | P1 | README, pages, metadata | Les diagnostics prouvent des tests, pas des certifications ou une conformité universelle. | Scanner les claims interdits et afficher `HUMAN_REVIEW_REQUIRED` pour les décisions sensibles. | `claims:verify` | OPEN |
| AUD-016 | Le diagnostic public doit rester limité aux résultats non sensibles. | P1 | `client/public/diagnostics/*` | Les rapports existent ; stack traces et données internes doivent rester exclues par contrat. | Ajouter un schéma public strict et un test de secrets/stack traces. | `artifact:verify`, diagnostics | PARTIAL |
| AUD-017 | Les tests de conception complète en 17 étapes, calculs statistiques et moteur de cohérence ne sont pas tous présents. | P2 | `client/src/pages/TrialDesign*`, `server/studyDesign*` | Les fonctionnalités existent partiellement, mais le chaînage exhaustif demandé n’est pas démontré. | Cartographier les étapes et ajouter règles/test dédiés avant toute promesse de validation. | unit/integration design tests | OPEN |
| AUD-018 | L’application utilise encore des avertissements Browserslist et gros chunks lazy. | P3 | build | Données de compatibilité anciennes et modules lourds de la zone outils. | Mettre à jour Browserslist contrôlée et poursuivre le code-splitting. | build/budget/Lighthouse | OPEN |
| AUD-019 | Aucun test offline de service worker avec réseau coupé n’a été exécuté dans la validation actuelle. | P1 | PWA | Les fichiers sont générés et vérifiés ; l’installation et la mise à jour réelle exigent un test navigateur dédié. | Ajouter test Playwright service worker/cache/offline et mise à jour contrôlée. | PWA E2E | OPEN |
| AUD-020 | La release ne peut pas être appelée certifiée, validée FDA/EMA, HDS, ISO ou HIPAA. | P0 | claims globaux | Aucune certification externe officielle n’a été fournie. | Utiliser `Clinical Navigator — Production Candidate` et publier les limites. | claims scan + revue humaine | REQUIRED |

## Résultats déjà exécutés

| Contrôle | Résultat réel |
|---|---|
| TypeScript | PASS lors de la dernière vérification globale. |
| Tests Vitest | PASS — 23 tests. |
| Playwright | PASS — 7 tests avec axe critical sur les pages couvertes. |
| Base clinique | PASS — 154 entrées bilingues, IDs uniques et 25 juridictions exigeant une revue locale. |
| Build full-stack | PASS. |
| Build static-only | PASS — `404.html` et 32 copies de routes générées. |
| Artefact public | PASS — fichiers PWA présents, aucune sauvegarde `.bak` ni motif de secret dans `dist/public`. |
| Budget initial | PASS — environ 105,9 KiB gzip, seuil 250 KiB. |
| Publication GitHub | BLOCKED_EXTERNAL — permission `workflows` manquante. |
| Safari/Firefox/lecteur d’écran réel | NOT_RUN. |
| Restauration DB réelle | NOT_RUN. |
| Certification externe | NOT_APPLICABLE — aucune certification obtenue. |

## Décision d’audit

Le projet est **Production Candidate** après correction des défauts techniques livrables et validation locale. Il ne doit pas être étiqueté `PRODUCTION READY` tant que les éléments P1 explicitement ouverts, la publication CI distante, le test PWA hors ligne réel, la gouvernance des sources et la revue humaine réglementaire ne sont pas traités.
