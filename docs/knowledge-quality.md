# Knowledge quality

`knowledge:verify` contrôle les 154 entrées cliniques, leurs IDs uniques, catégories, questions bilingues, sources et termes interdits. `knowledge:graph:verify` contrôle les 161 items knowledge, types, statuts, versions, sources HTTPS, dates de revue, relations, IDs de relations et juridictions.

Les problèmes attendus sont : missing source, missing version, missing status, invalid URL, expired review, duplicate ID, broken relation, invalid jurisdiction et invalid enum. Un contrôle qui n’a pas été exécuté doit être `NOT_RUN`, jamais `PASS`.

Les validations complémentaires sont typecheck, tests unitaires/intégration, audit de liens, build full-stack, build static-only, artefact PWA, E2E et budget de bundle.
