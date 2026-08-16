import { clinicalKnowledgeBase, type ClinicalKnowledgeEntry } from "@shared/clinicalKnowledgeBase";

export type OfflineAnswer = {
  text: string;
  entry: ClinicalKnowledgeEntry;
  mode: "offline";
};

function normalize(value: string) {
  return value.toLocaleLowerCase("fr-FR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function score(entry: ClinicalKnowledgeEntry, query: string) {
  const needle = normalize(query);
  const haystack = [
    entry.question.fr,
    entry.question.en,
    entry.answer.fr,
    entry.answer.en,
    ...entry.keywords.fr,
    ...entry.keywords.en,
  ].map(normalize);
  return haystack.reduce((total, value) => total + (value.includes(needle) ? 3 : 0), 0) +
    needle.split(/\s+/).filter(Boolean).reduce((total, token) => total + (haystack.some(value => value.includes(token)) ? 1 : 0), 0);
}

export function findOfflineKnowledge(query: string, limit = 3) {
  return clinicalKnowledgeBase
    .map(entry => ({ entry, score: score(entry, query) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.entry);
}

export function answerOffline(query: string, language: "fr" | "en" = "fr"): OfflineAnswer {
  const [entry] = findOfflineKnowledge(query);
  const selected = entry ?? clinicalKnowledgeBase[0];
  const isFrench = language === "fr";
  const answer = isFrench ? selected.answer.fr : selected.answer.en;
  const question = isFrench ? selected.question.fr : selected.question.en;
  const sourceLabel = selected.sources.join(", ");
  const geography = selected.geographicScope.join(", ");
  const warning = selected.localVerificationRequired
    ? (isFrench ? " Vérifiez impérativement les autorités et la version applicables localement." : " Verify the applicable local authorities and current version before acting.")
    : "";

  return {
    mode: "offline",
    entry: selected,
    text: `${answer}\n\n**Section du guide :** ${selected.category} — ${question}\n**Portée :** ${geography}\n**Niveau de preuve indicatif :** ${selected.evidenceLevel}\n**Sources :** ${sourceLabel}\n\n${isFrench ? "Réponse hors connexion basée sur le guide embarqué." : "Offline answer based on the embedded guide."}${warning}`,
  };
}

export function canUseWebLLM() {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}
