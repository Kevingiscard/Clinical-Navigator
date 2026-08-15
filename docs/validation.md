# Validation de livraison

Cette validation couvre la version préparée pour publication. Elle ne constitue pas une certification réglementaire, de cybersécurité ou d’accessibilité légale ; elle documente les contrôles techniques et visuels réalisés dans le projet.

| Domaine | Contrôle | Résultat |
|---|---|---|
| Typage | `pnpm check` | Réussi. |
| Tests unitaires | `pnpm test` | Réussi : scénarios, priorité de sécurité, détection d’identifiants, calcul de fenêtre et garde administrateur. |
| Construction | `pnpm build` | Réussi. Un avertissement de taille de bundle est signalé ; une optimisation par découpage de code est une amélioration ultérieure. |
| Desktop | Accueil, parcours, guides, ressources, outils, administration et espace personnel. | Rendus vérifiés. |
| Mobile | Accueil, parcours, outils, confidentialité, contact, administration et espace personnel. | Rendus vérifiés à 375 px de large ; navigation condensée et cartes empilées. |
| États d’interface | Chargement, contenu vide, erreur de saisie sensible, erreur de mutation, authentification et accès admin. | États présents ou gérés dans les composants concernés. |
| Clavier et focus | Boutons natifs, champs avec labels, cases à cocher, radios, selects et accordéons accessibles au clavier via les composants UI. | Vérification de code réalisée ; prévoir un audit automatisé axe/WCAG avant toute exigence contractuelle formelle. |
| Contraste | Texte foncé sur environnements clairs ; statuts associés à la fois à une couleur et à un libellé. | Vérification visuelle réalisée ; prévoir mesure automatisée WCAG avant certification. |

## Parcours de sécurité vérifiés

Le questionnaire rappelle l’interdiction de saisir des données identifiantes avant la saisie libre. Le serveur détecte des formats directs courants et refuse la persistance d’un feedback, d’une demande de contenu ou d’un cas générique lorsque ce contrôle se déclenche. L’accès d’administration est protégé par une procédure serveur dédiée et couvert par un test de refus pour un rôle non administrateur.

## Actions recommandées avant une mise en production réglementée

Un responsable doit confirmer le domaine définitif dans le sitemap, effectuer une revue juridique locale de la confidentialité, auditer l’accessibilité avec les outils retenus par l’organisation, et valider les contenus réglementaires et leur juridiction. Le déclencheur de maintenance ne doit être activé qu’après publication et validation humaine.
