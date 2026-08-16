# Audit UI final — refonte monochrome

## Typographie

La stack principale utilise Inter si elle est installée, puis `ui-sans-serif`, system-ui et Segoe UI. L’import Google Fonts distant a été supprimé pour préserver l’offline-first. Le texte courant vise 14–15 px, les métadonnées 11–12 px et les titres restent sous les anciennes tailles décoratives.

## Couleurs

Les tokens CSS utilisent noir, blanc et gris pour les surfaces, le texte, les bordures et les actions. Le vert/bleu décoratif est retiré du système global ; les couleurs fonctionnelles restent réservées aux états succès, avertissement, erreur et information.

## Dark mode

Les variables `.dark` définissent fond `#0A0A0A`, surface `#111111`, surface élevée `#171717`, bordure `#262626`, texte principal `#F5F5F5` et texte secondaire `#A3A3A3`. Une vérification visuelle multi-composants reste à effectuer dans chaque navigateur cible.

## Responsive

Le conteneur utilise des paliers mobile, tablette et desktop. Les tests E2E existants couvrent Chromium ; la campagne 320–1920 px et Safari/Firefox reste `NOT_RUN` dans cet environnement.

## Accessibilité

Les focus visibles, la réduction de mouvement, les labels du formulaire assistant et l’audit axe critical accueil/Formation sont couverts. Le statut ne constitue pas une certification WCAG 2.2 AA.

## Navigation

Le logo et les destinations internes doivent utiliser le routeur ou les chemins statiques compatibles GitHub Pages. Les routes publiques sont pré-copiées par `build:static`.

## Liens internes

`audit-links.mjs` a produit un statut `PASS` avec zéro faux lien, zéro destination vide et zéro route interne non résolue dans le périmètre source analysé.

## Liens externes

Les sources officielles utilisent des URLs HTTPS et `target="_blank"` avec `rel="noreferrer"` lorsqu’elles sont ouvertes depuis la carte juridictionnelle. Leur disponibilité HTTP doit être revue périodiquement sans casser le build.

## Boutons

Le formulaire assistant possède des noms accessibles. Le déclencheur de menu utilisateur possède `type="button"` et `aria-haspopup="menu"`. Les actions locales de pagination utilisent désormais des query URLs réelles plutôt que `href="#"`.

## Cartes

Les cartes de Formation regroupent une information et leurs entrées sont des boutons identifiables. Les chevrons présents dans les cartes de recommandation restent associés à une action de sélection.

## Footer

Les routes et destinations du footer doivent être revues lors de toute modification de navigation. Aucun réseau social fictif ou `#` ne doit être conservé.

## Sources

Les références sont versionnées dans `ReferenceRegistry`, avec statut, date de vérification et prochaine revue. Une source `NEEDS_REVIEW` n’est pas présentée comme une obligation.

## SEO

Le manifest, robots, sitemap, favicon et OpenGraph existent. La cohérence de chaque URL du sitemap et l’exclusion de toutes les routes privées restent à automatiser complètement.

## Performance

Le build retire la police distante et conserve le lazy loading de l’assistant. Le budget initial reste inférieur à 250 KiB gzip, mais plusieurs chunks lazy de la zone outils dépassent 500 KiB et doivent rester sous surveillance.

## Tests

Derniers contrôles exécutés : typecheck, 23 tests Vitest, 7 tests Playwright, axe critical accueil/Formation, audit liens PASS, build static-only, artefact PWA et budget. Safari, Firefox, vrai offline service worker et appareils mobiles réels sont `NOT_RUN`.

## Problèmes corrigés

Les faux href `#`, le breadcrumb `/components` inexistant, le bouton de menu non décrit et la dépendance de police Google Fonts ont été corrigés ou supprimés du périmètre actif.

## Problèmes restants

Le refactoring de toutes les classes Tailwind historiques vers des tokens monochromes n’est pas entièrement démontré page par page. Une revue visuelle humaine reste requise pour les pages complexes, graphiques, tableaux, modales et états d’erreur.
