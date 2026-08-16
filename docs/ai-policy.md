# Politique IA et moteur d’orientation

Le noyau de Clinical Navigator ne dépend pas d’une génération libre pour déterminer une conduite à tenir. Il utilise un matching déterministe de scénarios et des champs de contenu structurés. Cette approche privilégie l’explicabilité : l’utilisateur voit le scénario rapproché, sa priorité, les actions, les acteurs, les sources, les délais contextuels et les limites.

| Niveau | Fonction autorisée | Fonction interdite |
|---|---|---|
| Règles explicites | Détection indicative de données directes, priorisation de sécurité et sélection de contenu versionné. | Déclarer la conformité réglementaire ou diagnostiquer une situation clinique. |
| Sources et RAG futur | Retrouver des extraits versionnés et afficher leurs références. | Affirmer une obligation à partir d’un extrait hors contexte. |
| Assistant de formulation futur | Reformuler une checklist, résumer une source contrôlée ou proposer des questions de clarification. | Émettre une instruction autonome de traitement, notification ou décision. |

Tout ajout de modèle de langage doit suivre la hiérarchie suivante : **règles de sécurité → source officielle et périmètre → contenu vérifié → assistance à la formulation → limites visibles**. Un modèle ne doit pas recevoir de donnée identifiante ni être utilisé pour publier automatiquement un contenu réglementaire.

## Moteur offline et confiance

Le moteur offline interroge la base embarquée avec normalisation, synonymes cliniques, classement lexical et score de confiance. Il affiche la catégorie, la portée, les sources et les limites. Lorsqu’aucune correspondance fiable n’est trouvée, il refuse de conclure et demande une reformulation. Il ne s’agit pas d’un grand modèle conversationnel téléchargé dans le navigateur.

## Garde-fous obligatoires

L’assistant ne diagnostique pas, ne prescrit pas, ne décide pas d’une inclusion, n’approuve pas un protocole et ne remplace ni investigateur, ni biostatisticien, ni comité d’éthique, ni autorité. Les questions réglementaires, statistiques, liées à la sécurité ou à une décision clinique doivent afficher `HUMAN_REVIEW_REQUIRED`.

Le texte libre contenant un nom, un identifiant, une date de naissance, une adresse, un email, un téléphone, un numéro patient ou un identifiant médical ne doit pas être envoyé automatiquement à un modèle distant. La détection côté client est un filet de sécurité, pas une garantie d’anonymisation.
