import { clinicalKnowledgeBase } from "../shared/clinicalKnowledgeBase";

const requiredCategories = ["Fondamentaux", "Méthodologie", "Statistiques", "Éthique", "Réglementaire", "Opérations", "Sécurité", "Données", "Qualité", "Soumissions", "Glossaire"];
const forbidden = [/patient\s+name/i, /social\s+security/i, /national\s+id/i, /email\s+address/i, /medical\s+record\s+number/i];

if (clinicalKnowledgeBase.length < 150) throw new Error(`Expected at least 150 clinical entries, got ${clinicalKnowledgeBase.length}`);
for (const category of requiredCategories) {
  if (!clinicalKnowledgeBase.some(entry => entry.category === category)) throw new Error(`Missing required category: ${category}`);
}
for (const entry of clinicalKnowledgeBase) {
  const text = JSON.stringify(entry);
  if (forbidden.some(pattern => pattern.test(text))) throw new Error(`Potential patient data term in entry ${entry.id}`);
  if (!entry.sources.length || !entry.question.fr || !entry.question.en || !entry.answer.fr || !entry.answer.en) throw new Error(`Incomplete entry ${entry.id}`);
}
console.log(`Clinical knowledge verified: ${clinicalKnowledgeBase.length} bilingual entries across ${requiredCategories.length} categories.`);
