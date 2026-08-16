# Politique de sécurité

## Versions supportées

La branche `main` et la dernière branche de production publiée sont supportées. Les branches de développement et les versions historiques ne sont pas garanties.

## Signaler une vulnérabilité

Ne publiez pas de secret, de token ou de détail exploitable dans une issue publique. Ouvrez un signalement privé auprès des mainteneurs du dépôt en décrivant la version concernée, les étapes de reproduction, l’impact observé et, si possible, une proposition de correction.

Les signalements sont triés selon leur impact sur la confidentialité, l’intégrité et la disponibilité. Les problèmes impliquant des données de santé, des comptes ou des secrets de déploiement sont traités comme prioritaires.

## Principes

Clinical Navigator ne doit recevoir aucune donnée directement identifiante de patient. Les clés serveur restent dans les variables d’environnement du fournisseur d’exécution et ne doivent jamais être préfixées `VITE_`. Les contrôles automatisés de sécurité restent des contrôles de base et ne remplacent pas une revue spécialisée.
