import { knowledgeItems, clinicalKnowledgeGraph } from "../shared/knowledgeDatasets";
import { KNOWLEDGE_STATUSES, KNOWLEDGE_TYPES } from "../shared/knowledgeModel";
import { jurisdictionRegistry } from "../shared/jurisdictionRegistry";

const today = "2026-08-16";
const errors: string[] = [];
const ids = new Set<string>();
for (const item of knowledgeItems) {
  if (ids.has(item.id)) errors.push(`Duplicate knowledge ID: ${item.id}`);
  ids.add(item.id);
  if (!item.title || !item.shortDescription || !item.category || !item.version) errors.push(`Missing required field: ${item.id}`);
  if (!KNOWLEDGE_TYPES.includes(item.type)) errors.push(`Invalid knowledge type: ${item.id}`);
  if (!KNOWLEDGE_STATUSES.includes(item.status)) errors.push(`Invalid status: ${item.id}`);
  if (!item.sources.length) errors.push(`Missing source: ${item.id}`);
  for (const source of item.sources) if (!source.url.startsWith("https://")) errors.push(`Invalid source URL: ${item.id}`);
  if (item.status === "VERIFIED" && !item.verifiedAt) errors.push(`Verified item has no verifiedAt: ${item.id}`);
  if (item.offlineAvailable && !item.aiAllowed && item.category === "Réglementaire") errors.push(`Offline regulatory item must expose explicit AI policy: ${item.id}`);
  if (item.nextReviewAt && item.nextReviewAt < today && item.status !== "OUTDATED") errors.push(`Review date expired without OUTDATED status: ${item.id}`);
}
const relationIds = new Set<string>();
for (const relation of clinicalKnowledgeGraph) {
  if (relationIds.has(relation.id)) errors.push(`Duplicate relation ID: ${relation.id}`);
  relationIds.add(relation.id);
  if (!ids.has(relation.from) || !ids.has(relation.to)) errors.push(`Broken relation: ${relation.id}`);
  if (!relation.sourceIds.length) errors.push(`Relation has no source: ${relation.id}`);
}
const jurisdictionSlugs = new Set<string>();
for (const jurisdiction of jurisdictionRegistry) {
  if (jurisdictionSlugs.has(jurisdiction.slug)) errors.push(`Duplicate jurisdiction: ${jurisdiction.slug}`);
  jurisdictionSlugs.add(jurisdiction.slug);
}
if (errors.length) { for (const error of errors) console.error(`ERROR: ${error}`); process.exit(1); }
console.log(`Knowledge graph verified: ${knowledgeItems.length} items, ${clinicalKnowledgeGraph.length} relations, ${jurisdictionRegistry.length} jurisdictions, no schema errors.`);
