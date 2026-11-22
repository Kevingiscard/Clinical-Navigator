import { clinicalKnowledgeBase, type ClinicalKnowledgeEntry } from "@shared/clinicalKnowledgeBase";
import { sitePagesIndex, type SitePageRef } from "@/lib/sitePages";

export type OfflineAnswer = {
  text: string;
  entry?: ClinicalKnowledgeEntry;
  mode: "offline";
  confidence: number;
  needsClarification: boolean;
  pages: SitePageRef[];
};

type RankedEntry = { entry: ClinicalKnowledgeEntry; score: number; matchedTerms: string[] };

const STOP_WORDS = new Set(["avec", "dans", "pour", "sans", "quel", "quelle", "quels", "quelles", "comment", "what", "which", "how", "should", "about", "the", "and", "les", "des", "une", "un", "est", "sont", "this", "that", "entre", "faire", "faut", "peut", "essai", "essais", "clinique", "cliniques", "recherche", "etude", "etudes", "trial", "trials", "study", "clinical"]);
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
  conception: ["concevoir", "conception", "design", "planifier", "planification", "protocole", "schema", "question de recherche", "pico"],
  itt: ["itt", "intention de traiter", "intention to treat", "population itt", "analyse itt"],
  formation: ["former", "formation", "training", "entrainer", "entrainement", "competence", "competences", "equipe"],
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
function wordSet(value: string) { return new Set(normalize(value).split(/\s+/).filter(Boolean)); }
function rankEntry(entry: ClinicalKnowledgeEntry, query: string, queryTokens: string[]): RankedEntry {
  const question = normalize(`${entry.question.fr} ${entry.question.en}`); const answer = normalize(`${entry.answer.fr} ${entry.answer.en}`); const keywords = normalize(`${entry.keywords.fr.join(" ")} ${entry.keywords.en.join(" ")}`); const category = normalize(entry.category); const phrase = normalize(query);
  const questionWords = wordSet(question); const answerWords = wordSet(answer); const keywordWords = wordSet(keywords); const categoryWords = wordSet(category);
  const matchedTerms = queryTokens.filter(token => questionWords.has(token) || answerWords.has(token) || keywordWords.has(token) || categoryWords.has(token));
  let score = 0; if (phrase.length > 4 && question.includes(phrase)) score += 12; if (phrase.length > 4 && keywords.includes(phrase)) score += 10;
  for (const token of matchedTerms) { if (keywordWords.has(token)) score += 5; else if (questionWords.has(token)) score += 4; else if (categoryWords.has(token)) score += 3; else score += 1; }
  // Bigrammes de la requête retrouvés dans la question : fort indice de pertinence.
  const raw = normalize(query).split(/\s+/).filter(t => !STOP_WORDS.has(t) && t.length > 2);
  for (let i = 0; i + 1 < raw.length; i++) { const bigram = `${raw[i]} ${raw[i + 1]}`; if (question.includes(bigram)) score += 8; else if (keywords.includes(bigram)) score += 6; }
  return { entry, score, matchedTerms };
}
export function rankOfflineKnowledge(query: string, limit = 3) { const queryTokens = expandedTokens(query); if (!queryTokens.length) return [] as RankedEntry[]; return clinicalKnowledgeBase.map(entry => rankEntry(entry, query, queryTokens)).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, limit); }
export function findOfflineKnowledge(query: string, limit = 3) { return rankOfflineKnowledge(query, limit).map(item => item.entry); }
export function rankSitePages(query: string, limit = 3): SitePageRef[] {
  const queryTokens = expandedTokens(query);
  if (!queryTokens.length) return [];
  return sitePagesIndex
    .map(p => {
      const hay = normalize([p.title, p.description, ...p.keywords].join(" "));
      const matched = queryTokens.filter(t => hay.includes(t));
      return { p, score: matched.length };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.p);
}

export function answerOffline(query: string, language: "fr" | "en" = "fr"): OfflineAnswer {
  const pages = rankSitePages(query);
  const [ranked, second] = rankOfflineKnowledge(query, 2); const isFrench = language === "fr"; const confidence = ranked ? Math.min(0.99, ranked.score / 20) : 0; const sufficientlyRelevant = Boolean(ranked && ranked.score >= 4 && ranked.matchedTerms.length >= 1);
  if (!sufficientlyRelevant) return { mode: "offline", confidence, needsClarification: true, pages, text: isFrench ? "Je n’ai pas trouvé une correspondance suffisamment fiable dans le guide hors connexion. Reformulez avec le pays, la phase, le type d’étude, la question méthodologique ou le terme clinique concerné. Aucune conclusion n’est produite lorsque la confiance est insuffisante." : "I could not find a sufficiently reliable match in the offline guide. Rephrase with the country, phase, study type, methodological question or clinical term. No conclusion is produced when confidence is insufficient." };
  const selected = ranked.entry; const answer = isFrench ? selected.answer.fr : selected.answer.en; const question = isFrench ? selected.question.fr : selected.question.en;
  const term = (question.match(/«\s*([^»]+)\s*»/) || [])[1] || selected.category; const warning = selected.localVerificationRequired ? (isFrench ? " Vérifiez impérativement les autorités et la version applicables localement ; si votre question concerne un pays précis, indiquez-le pour une réponse plus ciblée." : " Verify the applicable local authorities and current version before acting; if your question concerns a specific country, name it for a more targeted answer.") : "";
  const seeAlso = second && second.score >= ranked.score * 0.8 && second.entry.id !== selected.id ? (isFrench ? `\n\n**Voir aussi :** « ${second.entry.question.fr} » (${second.entry.category}).` : `\n\n**See also:** "${second.entry.question.en}" (${second.entry.category}).`) : "";
  const framing = isFrench
    ? `Ressource la plus proche dans le guide vérifié du site. Elle ne prétend pas répondre à toute votre question ; les pages proposées ci-dessous détaillent le parcours complet.`
    : `Closest matching resource in the site's verified guide. It does not claim to answer your whole question; the pages suggested below cover the full path.`;
  return { mode: "offline", entry: selected, confidence, needsClarification: false, pages, text: `${framing}\n\n**${term} :** ${answer}\n\n**Section du guide :** ${selected.category} — ${question}\n**Pertinence de recherche :** ${Math.round(confidence * 100)} %${isFrench ? " (score de correspondance du moteur local, non calibré cliniquement)" : " (local matching score, not clinically calibrated)"}\n**Portée :** ${selected.geographicScope.join(", ")}\n**Niveau de preuve interne :** ${selected.evidenceLevel}${isFrench ? " (taxonomie du site : A cadre établi, B repère à contextualiser, C définition pédagogique ; non calibrée)" : " (site taxonomy: A established framework, B contextual anchor, C teaching definition; not calibrated)"}\n**Sources :** ${selected.sources.join(", ")}\n\n${isFrench ? "Réponse hors connexion basée sur le guide embarqué." : "Offline answer based on the embedded guide."}${warning}${seeAlso}` };
}
export function canUseWebLLM() { return typeof navigator !== "undefined" && "gpu" in navigator; }
