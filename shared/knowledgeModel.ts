export const KNOWLEDGE_TYPES = [
  "CONCEPT", "DEFINITION", "GUIDELINE", "REGULATION", "LAW", "STANDARD", "CHECKLIST", "PROCEDURE", "WORKFLOW", "TEMPLATE", "EXAMPLE", "CASE_STUDY", "CALCULATION", "STATISTICAL_METHOD", "CLINICAL_DESIGN", "OPERATIONAL_RULE", "SAFETY_RULE", "DATA_RULE", "QUALITY_RULE", "ETHICS_RULE", "JURISDICTION_RULE", "SOURCE", "PAPER", "TRIAL", "GLOSSARY_TERM", "FAQ", "TRAINING", "WARNING", "BEST_PRACTICE", "COMMON_ERROR",
] as const;
export type KnowledgeType = typeof KNOWLEDGE_TYPES[number];
export const KNOWLEDGE_STATUSES = ["DRAFT", "NEEDS_REVIEW", "VERIFIED", "OUTDATED", "ARCHIVED", "CONFLICTING"] as const;
export type KnowledgeStatus = typeof KNOWLEDGE_STATUSES[number];
export type Audience = "BEGINNER" | "STUDENT" | "CRC" | "CRA" | "INVESTIGATOR" | "BIOSTATISTICIAN" | "DATA_MANAGER" | "REGULATORY" | "QUALITY" | "ETHICS" | "SPONSOR" | "ADMIN";
export type SourceReference = { id: string; title: string; publisher: string; url: string; version?: string; jurisdiction?: string; publishedAt?: string; verifiedAt?: string; status: KnowledgeStatus };
export type Example = { id: string; title: string; summary: string; synthetic: true };
export type Pitfall = { id: string; title: string; description: string };
export type ChecklistItem = { id: string; label: string; required: boolean };
export type KnowledgeItem = {
  id: string; type: KnowledgeType; title: string; shortDescription: string; fullDescription?: string; language: string[]; category: string; subcategory?: string;
  jurisdiction?: string[]; studyTypes?: string[]; phases?: string[]; audience?: Audience[]; keywords: string[]; synonyms: string[]; prerequisites?: string[]; relatedConcepts?: string[];
  sources: SourceReference[]; examples?: Example[]; pitfalls?: Pitfall[]; checklist?: ChecklistItem[]; status: KnowledgeStatus; createdAt: string; updatedAt: string; verifiedAt?: string; nextReviewAt?: string; reviewer?: string; version: string; confidence?: number; aiAllowed: boolean; offlineAvailable: boolean;
};
export type KnowledgeRelationType = "RELATED_TO" | "REQUIRES" | "DEPENDS_ON" | "APPLIES_TO" | "SUPERSEDES" | "SUPERSEDED_BY" | "SUPPORTED_BY" | "CONFLICTS_WITH" | "EXAMPLE_OF" | "USED_IN" | "PART_OF" | "LEADS_TO" | "CALCULATED_BY" | "ASSESSED_BY";
export type KnowledgeRelation = { id: string; from: string; type: KnowledgeRelationType; to: string; status: KnowledgeStatus; verifiedAt?: string; sourceIds: string[] };
export type SyntheticTrial = { id: string; label: "SYNTHETIC / EDUCATIONAL"; condition: string; intervention: string; sites: number; participants: number; visits: number; adverseEvents: number };
