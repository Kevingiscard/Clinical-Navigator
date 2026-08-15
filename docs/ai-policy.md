# Politique IA et moteur d’orientation

Le noyau de Clinical Navigator ne dépend pas d’une génération libre pour déterminer une conduite à tenir. Il utilise un matching déterministe de scénarios et des champs de contenu structurés. Cette approche privilégie l’explicabilité : l’utilisateur voit le scénario rapproché, sa priorité, les actions, les acteurs, les sources, les délais contextuels et les limites.

| Niveau | Fonction autorisée | Fonction interdite |
|---|---|---|
| Règles explicites | Détection indicative de données directes, priorisation de sécurité et sélection de contenu versionné. | Déclarer la conformité réglementaire ou diagnostiquer une situation clinique. |
| Sources et RAG futur | Retrouver des extraits versionnés et afficher leurs références. | Affirmer une obligation à partir d’un extrait hors contexte. |
| Assistant de formulation futur | Reformuler une checklist, résumer une source contrôlée ou proposer des questions de clarification. | Émettre une instruction autonome de traitement, notification ou décision. |

Tout ajout de modèle de langage doit suivre la hiérarchie suivante : **règles de sécurité → source officielle et périmètre → contenu vérifié → assistance à la formulation → limites visibles**. Un modèle ne doit pas recevoir de donnée identifiante ni être utilisé pour publier automatiquement un contenu réglementaire.
