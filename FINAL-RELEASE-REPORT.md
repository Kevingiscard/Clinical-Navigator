# Clinical Navigator — Production Candidate

## Version

Application version `4.1.0`, base clinique `2.0.0`, registre des références `1.0.0`, registre juridictionnel `1.0.0`.

## Date

2026-08-16.

## Commit

Commit de la version précédente : `8fdf191cc74b17b8a1aaa03773c6a5a666c63682`. Les hubs opérationnels sont ajoutés dans le commit local `b829b7c`.

## Fonctionnalités

Le produit conserve les parcours accueil, problème, conception, audit, outils, formation, ressources, sources, diagnostics et administration. Cette mise à jour renforce l’IA offline, le build static-only, le registre des juridictions, la gouvernance des références, le Knowledge Graph, les hubs opérationnels et les contrôles de publication. Le graphe seed contient 161 items, 4 relations et 21 juridictions ; le catalogue contient 28 modules et 24 ressources. Aucun de ces chiffres ne prétend à l’exhaustivité réglementaire mondiale.

## Tests

Les validations effectivement exécutées dans cette mise à jour sont indiquées dans le diagnostic public après la dernière exécution. Les contrôles attendus sont typecheck, tests Vitest, build full-stack, build static-only, vérification d’artefact, références, sécurité, budget et Playwright lorsque l’environnement le permet. Aucun contrôle non exécuté ne doit être affiché `PASS`.

## Sécurité

Le baseline secrets/dangerous patterns et le validateur d’artefact sont utilisés. L’artefact bloque les backups, les motifs de clés, les PWA incomplètes et les service workers sans precache. Les secrets serveur ne doivent jamais être exposés par une variable `VITE_*`.

## Accessibilité

Les tests axe critical et les labels du formulaire assistant sont couverts par les tests disponibles. Une certification WCAG 2.2 AA n’est pas déclarée ; la matrice Safari, Firefox, lecteur d’écran et appareils réels reste une revue à effectuer.

## SEO

Les assets `robots.txt`, `sitemap.xml`, manifest, favicon et OpenGraph existent. L’exclusion complète des routes privées et la cohérence de chaque URL doivent rester vérifiées par un test SEO dédié avant une release publique.

## PWA

VitePWA produit un service worker Workbox, un manifest et un fallback offline. Les sourcemaps Workbox sont désactivées par défaut. `build:static` crée `404.html` et les copies de routes publiques à partir de `App.tsx`.

## IA

L’assistant offline utilise la base clinique embarquée, des synonymes, un classement lexical et un score de confiance. Il cite la section et la source et refuse les demandes sans correspondance suffisante. Il ne diagnostique pas, ne prescrit pas et ne prend aucune décision réglementaire.

## Offline

Le mode static-only fonctionne sans backend pour les contenus publics et la formation. Les fonctions de compte, favoris serveur, mes cas, mes données et administration doivent rester protégées par `RequiresBackend`. Les informations réglementaires hors ligne peuvent être obsolètes.

## Sources

Le `ReferenceRegistry` comporte des statuts de gouvernance, dates de vérification et prochaines revues. Une modification de source devient `REVIEW_REQUIRED` ; elle n’est jamais auto-publiée comme obligation.

## Juridictions

Le registre couvre des portails de plusieurs régions et marque toujours la revue locale comme obligatoire. Le Bénin, la Côte d’Ivoire, le Sénégal, le Cameroun et la RDC sont explicitement en couverture à confirmer dans la version actuelle.

## Limitations

Aucune certification ISO, HDS, HIPAA, FDA, EMA ou autre n’est déclarée. Le logiciel ne remplace pas un investigateur, un biostatisticien, un comité d’éthique, un DPO, un responsable qualité ou une autorité. L’authentification portable, l’audit trail complet, le backup/restauration, le SBOM et le test PWA multi-navigateurs exigent encore la configuration et la revue de l’environnement de déploiement.

## Risques connus

Les données Browserslist peuvent être anciennes, certains chunks lazy sont volumineux et l’environnement local peut afficher une erreur OAuth attendue lorsqu’aucun `OAUTH_SERVER_URL` n’est configuré. Le push GitHub peut être bloqué par l’absence de permission `workflows`.

## Human review required

Toute décision concernant réglementation, inclusion, sécurité participant, statistique finale, source nationale, authentification, permissions, migration ou contenu clinique exige une revue humaine documentée.

## Déploiement

Pour GitHub Pages :

```bash
VITE_BASE_PATH=/Clinical-Navigator/ VITE_STATIC_ONLY=true VITE_API_BASE_URL= pnpm build:static
pnpm artifact:verify
```

Pour Vercel full-stack :

```text
VITE_STATIC_ONLY=false
VITE_API_BASE_URL=
VITE_BASE_PATH=/
```

Les secrets restent configurés dans le fournisseur, jamais dans Git.

## Rollback

Le rollback de code doit utiliser l’historique du fournisseur ou un commit sain. Une migration destructive ne doit jamais être annulée automatiquement avec le déploiement frontend. Les restaurations de données doivent suivre une procédure séparée et testée.

## Changements

Cette mise à jour ajoute la gouvernance des références, le registre pays, le refus offline à faible confiance, les scripts d’artefact et le rapport d’audit. Elle supprime les backups `.bak` du checkout et renforce les commandes de validation.

## Prochaine revue

Revoir les références au plus tard le 2027-02-16, ou immédiatement après la publication d’une nouvelle version officielle, un changement de portail, un incident sécurité ou une modification de périmètre réglementaire.

## Décision

Le statut approprié reste **Clinical Navigator — Production Candidate** jusqu’à validation distante de la CI, revue humaine des sources et vérification de l’environnement de déploiement. Ne pas utiliser `certifié`, `validé FDA`, `validé EMA`, `HDS`, `ISO` ou `HIPAA` sans certificat officiel correspondant.

## Mise à jour UI du 2026-08-16

La refonte visuelle ajoute des tokens noir/blanc dans `client/src/styles/tokens.css`, remplace la police distante par une stack Inter système, supprime les halos décoratifs, active les modes `light`, `dark` et `system`, ajoute la préférence `prefers-reduced-motion` et renforce les focus visibles.

L’audit statique des liens et interactions produit `client/public/diagnostics/link-audit.json`, `link-audit.md` et `interaction-audit.md`. Le dernier passage réel est `PASS` avec zéro finding, 44 liens internes analysés et une URL externe de source enregistrée pour revue HTTP périodique.

Les tests E2E couvrent maintenant treize scénarios, dont le hub dynamique, le catalogue transversal, la recherche locale, la checklist, le dashboard Knowledge, la file de revue humaine, la préférence sombre système, la lisibilité minimale et l’absence de débordement à 320 px. Le dernier passage réel est `13 passed`. Les validations Safari, Firefox, lecteurs d’écran et appareils réels restent `NOT_RUN`.
