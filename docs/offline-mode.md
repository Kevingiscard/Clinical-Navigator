# Mode offline

Le mode offline est destiné aux contenus publics, guides, formation, glossaire, outils pédagogiques et moteur de recherche local. Le service worker VitePWA précache uniquement l’app shell et des chunks contrôlés ; le fallback `offline.html` indique que les sources réglementaires hors ligne peuvent être obsolètes.

Aucun token, cookie de session, contenu privé, texte libre clinique ou donnée patient ne doit être placé dans le cache public. Le mode statique utilise `VITE_STATIC_ONLY=true`, désactive les appels tRPC des routes backend et affiche un état explicite pour les fonctions indisponibles.

La mise à jour automatique est contrôlée par Workbox. En cas d’erreur d’interface, la récupération limitée met à jour le service worker et nettoie seulement les caches appartenant à l’application. Elle ne migre pas la base, ne supprime pas de données métier et ne publie pas de contenu réglementaire.
