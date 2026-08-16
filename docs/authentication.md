# Authentification et autorisation

## Contrat produit

Clinical Navigator distingue le mode public statique du mode Professional avec backend. Le mode static-only ne crée ni session serveur ni compte distant. Les routes qui nécessitent une identité persistante doivent afficher `RequiresBackend` plutôt qu’appeler tRPC ou afficher un spinner infini.

Le mode Professional utilise l’adaptateur OAuth/OIDC configuré par l’environnement du dépôt. Le fournisseur concret doit être choisi par l’opérateur du déploiement ; aucune promesse de magic link, passkeys, MFA ou multi-fournisseur ne doit être affichée tant que ces mécanismes ne sont pas configurés et testés dans cet environnement.

## Exigences minimales de production

| Contrôle | Contrat |
|---|---|
| Session | Cookie HttpOnly, Secure en production, SameSite adapté au flux OAuth et expiration explicite. |
| CSRF | Vérifier l’origine, l’état OAuth et les protections du fournisseur avant toute mutation. |
| Rotation | Révoquer ou renouveler les sessions selon la politique du fournisseur ; ne jamais conserver un token dans le localStorage. |
| RBAC | Autoriser côté serveur, jamais uniquement via le masquage d’un bouton client. |
| Logout | Effacer la session locale et demander la révocation distante lorsque le fournisseur le supporte. |
| MFA | Exigée pour les comptes d’administration lorsque le fournisseur la supporte. |
| Journalisation | Journaliser l’action, l’acteur et le résultat sans texte libre clinique, secret ou token. |

## Variables

Les secrets sont fournis par l’hébergeur et ne doivent jamais être préfixés `VITE_` : `OAUTH_SERVER_URL`, `JWT_SECRET`, `DATABASE_URL`, `CRON_SECRET` et les clés de fournisseur. Les variables `VITE_*` sont publiques après compilation.

## Limites

L’authentification n’est pas une certification de sécurité. Une revue de configuration, un test de permissions, une rotation des secrets et une vérification du fournisseur sont nécessaires avant l’ouverture du mode Professional.
