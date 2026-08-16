import { clinicalKnowledgeBase, type ClinicalKnowledgeEntry } from "@shared/clinicalKnowledgeBase";

export type OfflineAnswer = {
  text: string;
  entry?: ClinicalKnowledgeEntry;
  mode: "offline";
  confidence: number;
  needsClarification: boolean;
};

type RankedEntry = { entry: ClinicalKnowledgeEntry; score: number; matchedTerms: string[] };

const STOP_WORDS = new Set(["avec", "dans", "pour", "sans", "quel", "quelle", "quels", "quelles", "comment", "what", "which", "how", "should", "about", "the", "and", "les", "des", "une", "un", "est", "sont", "this", "that"]);
const SYNONYMS: Record<string, string[]> = {
  endpoint: ["endpoint", "critere", "critere principal", "outcome", "resultat", "variable principale"],
  estimand: ["estimand", "effet", "intercurrent", "question d effet"],
  consentement: ["consentement", "informed consent", "information", "signature", "assent"],
  securite: ["securite", "safety", "ae", "sae", "evenement", "pharmacovigilance", "signal"],
  statistique: ["statistique", "statistical", "puissance", "power", "p value", "intervalle", "confiance", "multiplicite"],
  reglementaire: ["reglementaire", "regulatory", "autorite", "soumission", "submission", "ethique", "comite"],
  donnees: ["donnees", "data", "ecrf", "crf", "audit trail", "query", "missing", "manquantes"],
  qualite: ["qualite", "quality", "capa", "monitoring", "audit", "inspection", "deviation", "ecart"],
  phase: ["phase", "phase i", "phase ii", "phase iii", "phase iv", "early phase", "late phase"],
};

function normalize(value: string) {
  return value.toLocaleLowerCase("fr-FR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}
function tokens(value: string) { return normalize(value).split(/\s+/).filter(token => token.length > 2 && !STOP_WORDS.has(token)); }
function expandedTokens(query: string) {
  const base = tokens(query); const expanded = new Set(base);
  for (const token of base) for (const [canonical, values] of Object.entries(SYNONYMS)) if (values.some(value => normalize(value).split(/\s+/).includes(token) || normalize(value) === token)) { expanded.add(canonical); values.flatMap(tokens).forEach(value => expanded.add(value)); }
  return Array.from(expanded);
}
function rankEntry(entry: ClinicalKnowledgeEntry, query: string, queryTokens: string[]): RankedEntry {
  const question = normalize(`${entry.question.fr} ${entry.question.en}`); const answer = normalize(`${entry.answer.fr} ${entry.answer.en}`); const keywords = normalize(`${entry.keywords.fr.join(" ")} ${entry.keywords.en.join(" ")}`); const category = normalize(entry.category); const phrase = normalize(query);
  const matchedTerms = queryTokens.filter(token => [question, answer, keywords, category].some(value => value.includes(token)));
  let score = 0; if (phrase.length > 4 && question.includes(phrase)) score += 12; if (phrase.length > 4 && keywords.includes(phrase)) score += 10;
  for (const token of matchedTerms) { if (keywords.includes(token)) score += 5; else if (question.includes(token)) score += 4; else if (category.includes(token)) score += 3; else score += 1; }
  return { entry, score, matchedTerms };
}
export function rankOfflineKnowledge(query: string, limit = 3) { const queryTokens = expandedTokens(query); if (!queryTokens.length) return [] as RankedEntry[]; return clinicalKnowledgeBase.map(entry => rankEntry(entry, query, queryTokens)).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, limit); }
export function findOfflineKnowledge(query: string, limit = 3) { return rankOfflineKnowledge(query, limit).map(item => item.entry); }
export function answerOffline(query: string, language: "fr" | "en" = "fr"): OfflineAnswer {
  const [ranked] = rankOfflineKnowledge(query); const isFrench = language === "fr"; const confidence = ranked ? Math.min(0.99, ranked.score / 20) : 0; const sufficientlyRelevant = Boolean(ranked && ranked.score >= 4 && ranked.matchedTerms.length >= 1);
  if (!sufficientlyRelevant) return { mode: "offline", confidence, needsClarification: true, text: isFrench ? "Je n’ai pas trouvé une correspondance suffisamment fiable dans le guide hors connexion. Reformulez avec le pays, la phase, le type d’étude, la question méthodologique ou le terme clinique concerné. Aucune conclusion n’est produite lorsque la confiance est insuffisante." : "I could not find a sufficiently reliable match in the offline guide. Rephrase with the country, phase, study type, methodological question or clinical term. No conclusion is produced when confidence is insufficient." };
  const selected = ranked.entry; const answer = isFrench ? selected.answer.fr : selected.answer.en; const question = isFrench ? selected.question.fr : selected.question.en; const warning = selected.localVerificationRequired ? (isFrench ? " Vérifiez impérativement les autorités et la version applicables localement." : " Verify the applicable local authorities and current version before acting.") : "";
  return { mode: "offline", entry: selected, confidence, needsClarification: false, text: `${answer}\n\n**Section du guide :** ${selected.category} — ${question}\n**Confiance indicative :** ${Math.round(confidence * 100)} %\n**Portée :** ${selected.geographicScope.join(", ")}\n**Niveau de preuve indicatif :** ${selected.evidenceLevel}\n**Sources :** ${selected.sources.join(", ")}\n\n${isFrench ? "Réponse hors connexion basée sur le guide embarqué." : "Offline answer based on the embedded guide."}${warning}` };
}
export function canUseWebLLM() { return typeof navigator !== "undefined" && "gpu" in navigator; }
