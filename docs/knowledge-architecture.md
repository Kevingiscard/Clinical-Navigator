# Knowledge architecture

Clinical Navigator sépare le contenu de l’interface. `shared/knowledgeModel.ts` définit le contrat universel `KnowledgeItem`, `SourceReference`, `KnowledgeRelation` et les données synthétiques. `shared/knowledgeDatasets.ts` construit le noyau et les bases spécialisées `TrialDesignKnowledgeBase`, `TrialAuditKnowledgeBase`, `StatisticalKnowledgeBase`, `RegulatoryKnowledgeBase`, `EthicsKnowledgeBase`, `ConsentKnowledgeBase`, `QualityKnowledgeBase`, `DataManagementKnowledgeBase`, `SafetyKnowledgeBase` et `ToolsKnowledgeBase`.

Le graphe utilise des identifiants stables, des relations typées et des statuts prudents. L’interface publique `/fr/knowledge` consomme ces données pour recherche et statistiques ; `/fr/admin/knowledge` est protégé par backend et prépare une file de revue sans publication automatique.

Le périmètre actuel est un premier seed structuré de 161 items et 4 relations. Il ne prétend pas couvrir chaque guideline ICH, chaque pays ou chaque calculateur. Les nouveaux contenus doivent utiliser le schéma, une source, une version et une date de revue.
