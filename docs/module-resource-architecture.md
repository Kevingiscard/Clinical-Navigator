# Module resource architecture

Clinical Navigator expose une couche publique `ModuleHubPage` chargée depuis `shared/moduleResources.ts`. Elle distingue les définitions de modules, les étapes et les ressources. Une ressource est référencée par ID stable, type, statut, version de revue, audience, niveau, juridiction, source IDs et destination.

Le catalogue est intentionnellement séparé du Knowledge Graph : le graphe décrit des notions et relations de connaissance ; le catalogue décrit les destinations de travail, guides, checklists, modèles, outils, formations, exemples, FAQ et sources. Un même ID de ressource peut être relié à plusieurs modules sans duplication.

Les ressources internes pointent vers une route Clinical Navigator. Les sources externes pointent uniquement vers une URL HTTPS déjà enregistrée dans `referenceRegistry`. Les modèles et exemples sont pédagogiques et doivent être adaptés et revus. Une source locale non confirmée reste `NEEDS_REVIEW`.

Le hub fournit : parcours précédent/suivant, étape active, filtres, recherche, cartes cliquables, checklist sauvegardée en localStorage, export JSON local, recommandations associées et orientation hors connexion. Aucun champ de checklist ni d’assistant n’accepte de donnée patient.
