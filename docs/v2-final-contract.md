# Contrat de livraison v2

## Périmètre livré

La branche `feat/v2-finale` ajoute un parcours **Formation** progressif en français et en anglais, une base clinique embarquée de **154 entrées bilingues** réparties en onze catégories, un glossaire relié aux entrées et un quiz auto-corrigé conservé uniquement dans la session du navigateur.

La base embarquée couvre les fondamentaux des essais, la méthodologie, les statistiques, l’éthique, la réglementation, les opérations, la sécurité, les données, la qualité et les soumissions. Les réponses contiennent une portée géographique, un niveau de preuve indicatif et les identifiants de références utilisés. Les juridictions locales non vérifiées sont signalées et ne sont pas transformées en règles universelles.

L’assistant pédagogique utilise une stratégie hybride. Lorsqu’un résolveur réseau est fourni et répond dans le délai, il peut être utilisé. En cas de mode static-only, d’absence de réseau, d’échec ou de délai dépassé, la question est traitée par recherche dans la base embarquée. Le mode et la portée de la réponse restent visibles. Aucune donnée patient n’est nécessaire.

## Contrat technique

| Fonction | Contrat vérifiable |
|---|---|
| Mode full-stack | `VITE_STATIC_ONLY=false` par défaut avec API tRPC configurable via `VITE_API_BASE_URL`. |
| Mode static-only | `VITE_STATIC_ONLY=true`, routes publiques pré-copiées et écrans backend explicitement bloqués. |
| PWA | Service worker versionné, app shell, fallback `offline.html`, cache runtime et mise à jour contrôlée. |
| Internationalisation | `i18next` et `react-i18next`, choix FR/EN persistant dans `localStorage`, attribut `document.lang` mis à jour. |
| Performance | `pnpm budget` échoue si l’entry JavaScript initiale dépasse 250 KiB gzip. Le dernier build validé mesure 105,8 KiB gzip. |
| Qualité clinique | `pnpm knowledge:verify` vérifie le nombre d’entrées, les catégories requises, les champs bilingues et l’absence de motifs de données patient. |
| Santé serveur | `/api/health` expose un statut minimal, la version, le commit, l’uptime et l’état de configuration de la base sans révéler de secret. |

## Limites et décisions honnêtes

Le modèle local livré est un moteur de recherche et de formulation guidée sur contenu versionné. Il ne constitue pas un grand modèle de langage, ne pose pas de diagnostic et ne valide pas une soumission réglementaire. Une intégration réseau ou WebLLM peut être ajoutée derrière l’interface `onOnlineAnswer`, mais elle doit conserver le fallback et les citations du guide.

Les références locales au Bénin, au Nigeria, au Kenya, à l’Afrique du Sud et à d’autres pays doivent être confirmées par les autorités compétentes avant une décision. La présence d’une entrée pédagogique ne constitue pas une preuve d’applicabilité locale.

Le self-healing est limité aux actions réversibles : récupération de cache, service worker, contrôle de santé, rerun contrôlé d’un workflow et ouverture d’un incident GitHub. Aucun workflow ne modifie le schéma de base, ne supprime des données, ne publie un contenu clinique ou ne répare silencieusement une exigence réglementaire.

## Validation réalisée

Les validations locales du cycle v2 comprennent le build full-stack, les 23 tests Vitest existants, le contrôle TypeScript, la génération de routes statiques, `pnpm knowledge:verify` et `pnpm budget`. Les warnings de chunks lazy très volumineux proviennent notamment de l’interface Streamdown existante et sont hors du bundle initial ; l’assistant est chargé à la demande.
