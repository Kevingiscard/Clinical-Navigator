# Maintenance autonome

Clinical Navigator est conçu pour fonctionner hors de Manus.

## Ce qui est automatisé dans le dépôt

- build sur chaque push vers `main` ;
- type check ;
- tests Vitest ;
- déploiement GitHub Pages ;
- contrôle quotidien planifié ;
- audit des dépendances ;
- création automatique d'une issue GitHub en cas d'échec de la maintenance ;
- versionnement PWA via le service worker ;
- mode hors ligne et nettoyage des anciens caches.

## Ce qui n'est volontairement pas auto-publié

Les changements réglementaires, méthodologiques ou scientifiques critiques ne sont pas convertis automatiquement en règles applicables. Ils doivent rester en revue humaine.

## Auto-réparation

Le client possède des mécanismes de récupération de cache et de mode dégradé. Le pipeline peut détecter automatiquement un build ou un test cassé et ouvrir un incident. Il ne prétend pas réécrire arbitrairement le code de production sans validation : une telle automatisation serait dangereuse pour un produit méthodologique et réglementaire.
