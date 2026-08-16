import { clinicalKnowledgeBase } from "../shared/clinicalKnowledgeBase";
import { jurisdictionRegistry } from "../shared/jurisdictionRegistry";
import { referenceRegistry, type ReferenceStatus } from "../shared/referenceRegistry";

const requiredCategories = ["Fondamentaux", "Méthodologie", "Statistiques", "Éthique", "Réglementaire", "Opérations", "Sécurité", "Données", "Qualité", "Soumissions", "Glossaire"];
const forbidden = [/patient\s+name/i, /social\s+security/i, /national\s+id/i, /email\s+address/i, /medical\s+record\s+number/i];

if (clinicalKnowledgeBase.length < 150) throw new Error(`Expected at least 150 clinical entries, got ${clinicalKnowledgeBase.length}`);
for (const category of requiredCategories) {
  if (!clinicalKnowledgeBase.some(entry => entry.category === category)) throw new Error(`Missing required category: ${category}`);
}
const ids = new Set<string>();
for (const entry of clinicalKnowledgeBase) {
  if (ids.has(entry.id)) throw new Error(`Duplicate clinical knowledge id: ${entry.id}`);
  ids.add(entry.id);
  const text = JSON.stringify(entry);
  if (forbidden.some(pattern => pattern.test(text))) throw new Error(`Potential patient data term in entry ${entry.id}`);
  if (!entry.sources.length || !entry.question.fr || !entry.question.en || !entry.answer.fr || !entry.answer.en) throw new Error(`Incomplete entry ${entry.id}`);
}

const jurisdictionSlugs = new Set<string>();
for (const jurisdiction of jurisdictionRegistry) {
  if (jurisdictionSlugs.has(jurisdiction.slug)) throw new Error(`Duplicate jurisdiction slug: ${jurisdiction.slug}`);
  jurisdictionSlugs.add(jurisdiction.slug);
  if (jurisdiction.localReviewRequired !== true) throw new Error(`Jurisdiction must require local review: ${jurisdiction.slug}`);
  if (jurisdiction.officialPortal && !jurisdiction.officialPortal.startsWith("https://")) throw new Error(`Jurisdiction portal must use HTTPS: ${jurisdiction.slug}`);
}

const referenceStatuses: ReferenceStatus[] = ["VERIFIED_CURRENT", "VERIFIED_TRANSITIONAL", "ADOPTED_NOT_YET_EFFECTIVE", "NEEDS_REVIEW", "DRAFT", "OUTDATED", "ARCHIVED", "CONFLICTING", "NOT_APPLICABLE"];
const referenceIds = new Set<string>();
for (const reference of referenceRegistry) {
  if (referenceIds.has(reference.id)) throw new Error(`Duplicate reference id: ${reference.id}`);
  referenceIds.add(reference.id);
  if (!reference.sourceUrl.startsWith("https://")) throw new Error(`Reference must use HTTPS: ${reference.id}`);
  if (!referenceStatuses.includes(reference.status)) throw new Error(`Unknown reference status: ${reference.id}`);
  if (!reference.verifiedAt || !reference.nextReviewAt) throw new Error(`Reference review dates missing: ${reference.id}`);
  if (reference.status === "DRAFT" && reference.official) throw new Error(`Draft reference cannot be treated as official: ${reference.id}`);
}

console.log(`Clinical knowledge verified: ${clinicalKnowledgeBase.length} bilingual entries with unique IDs; ${jurisdictionRegistry.length} jurisdictions and ${referenceRegistry.length} references require governance.`);
