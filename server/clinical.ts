import { scenarios, sourceById, type ClinicalScenario, type GuidanceResponse, type Priority, type ResponseMode } from "../shared/clinicalContent";

export type ProblemInput = {
  role: string;
  studyType: string;
  phase: string;
  situation: string;
  problem: string;
  jurisdiction: string;
  urgency: "Faible" | "Normale" | "Haute" | "Critique";
  mode: ResponseMode;
  immediateRisk: boolean;
};

const directIdentifierPatterns = [
  /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/i,
  /\b(?:\+?\d[\d .-]{7,}\d)\b/,
  /\b(?:n[°o]|id|identifiant|dossier|patient)\s*[:#-]?\s*[a-z0-9-]{4,}\b/i,
  /\b(?:monsieur|madame|mme|m\.)\s+[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ-]+/,
];

export function containsDirectIdentifier(text: string) {
  return directIdentifierPatterns.some(pattern => pattern.test(text));
}

function normalize(value: string) {
  return value.toLocaleLowerCase("fr-FR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function scoreScenario(scenario: ClinicalScenario, input: ProblemInput) {
  const haystack = normalize(`${input.problem} ${input.situation}`);
  let score = 0;
  for (const keyword of scenario.keywords) if (haystack.includes(normalize(keyword))) score += 4;
  if (scenario.roles.some(role => normalize(role) === normalize(input.role))) score += 2;
  if (scenario.studyTypes.some(type => normalize(type) === normalize(input.studyType))) score += 1;
  if (scenario.phases.some(phase => normalize(phase) === normalize(input.phase))) score += 2;
  if (scenario.jurisdictions.includes(input.jurisdiction)) score += 1;
  return score;
}

function priorityFor(input: ProblemInput, scenario: ClinicalScenario): { priority: Priority; reason: string } {
  if (input.immediateRisk) return { priority: "CRITIQUE", reason: "Un risque immédiat pour le participant a été signalé : la sécurité prime sur la poursuite du questionnaire." };
  if (input.urgency === "Critique") return { priority: "CRITIQUE", reason: "Le niveau d’urgence déclaré est critique ; vérifiez immédiatement le circuit de sécurité applicable." };
  if (input.urgency === "Haute" || scenario.severity === "CRITIQUE") return { priority: "HAUTE", reason: "Le contexte ou le scénario peut affecter les droits, la sécurité, la qualité ou l’intégrité des données." };
  return { priority: scenario.severity, reason: "La priorité proposée est indicative ; elle doit être confirmée selon le protocole, les SOP et la juridiction concernés." };
}

function deadlinesFor(input: ProblemInput, priority: Priority) {
  if (input.immediateRisk || priority === "CRITIQUE") {
    return [
      { label: "Sécurité et circuit d’urgence", timing: "Immédiatement, sans attendre la fin du parcours", source: "Circuit d’urgence, protocole et SOP de sécurité applicables", confidence: "contextuel" as const },
      { label: "Notifications et documentation", timing: "Selon les délais définis par les procédures applicables", source: "Protocole, SOP, plan de pharmacovigilance et juridiction", confidence: "à vérifier" as const },
    ];
  }
  if (priority === "HAUTE") {
    return [
      { label: "Vérification initiale", timing: "Dès que possible selon le circuit opérationnel prévu", source: "Protocole et SOP applicables", confidence: "contextuel" as const },
      { label: "Escalade et traçabilité", timing: "Dans les délais prescrits par l’étude et la juridiction", source: "SOP de site/promoteur et exigences locales", confidence: "à vérifier" as const },
    ];
  }
  return [
    { label: "Revue de la situation", timing: "Dans le cycle opérationnel approprié, sans reporter une question de sécurité", source: "Plan de monitoring, protocole et SOP", confidence: "contextuel" as const },
    { label: "Clôture documentée", timing: "Après vérification des faits, de l’impact et des actions", source: "Processus qualité applicable", confidence: "à vérifier" as const },
  ];
}

export function buildGuidance(input: ProblemInput): GuidanceResponse {
  const combinedInput = `${input.problem}\n${input.situation}`;
  const hasSensitiveData = containsDirectIdentifier(combinedInput);
  const ranked = scenarios.map(scenario => ({ scenario, score: scoreScenario(scenario, input) })).sort((a, b) => b.score - a.score);
  const matched = ranked[0]?.score ? ranked[0].scenario : scenarios.find(item => item.id === "question-ambiguë")!;
  const { priority, reason } = priorityFor(input, matched);
  const sourceRecords = matched.referenceIds.map(sourceById).filter((source): source is NonNullable<typeof source> => Boolean(source));
  const missingInformation = [
    input.jurisdiction === "International / à préciser" ? "La juridiction applicable reste à confirmer." : "",
    !input.studyType || input.studyType === "Autre" ? "Le type d’étude doit être précisé si cela change le protocole applicable." : "",
    !input.phase ? "La phase de l’étude doit être précisée." : "",
    "La version du protocole et les SOP applicables doivent toujours être vérifiées.",
  ].filter(Boolean);
  const limits = [
    "Cette réponse constitue une orientation opérationnelle et pédagogique ; elle ne remplace pas le protocole, les SOP, l’investigateur, le promoteur, la CRO, le comité d’éthique ou l’autorité compétente.",
    "Aucune obligation, aucun délai réglementaire ni aucune qualification de sécurité ne doit être déduit de cette réponse sans vérification du contexte réel.",
    "Ne saisissez ni nom, ni identifiant, ni coordonnées, ni donnée permettant d’identifier directement un participant.",
    matched.status !== "VERIFIED" ? "Le scénario associé est marqué « À vérifier » : utilisez-le comme repère de préparation, puis faites valider le contexte applicable." : "",
  ].filter(Boolean);
  const immediateAction = input.immediateRisk
    ? "Interrompez ce questionnaire pour mobiliser sans délai les responsables et circuits de sécurité prévus. La plateforme ne remplace pas la prise en charge clinique ni les procédures d’urgence."
    : matched.actions[0];
  return {
    blocked: hasSensitiveData,
    sensitiveDataWarning: hasSensitiveData ? "Des éléments pouvant identifier directement une personne semblent avoir été saisis. Ils ne doivent pas être enregistrés ni transmis : retirez-les et reformulez votre situation de façon générale." : undefined,
    scenario: matched,
    priority,
    priorityReason: reason,
    immediateAction,
    summary: matched.description,
    sourceRecords,
    missingInformation,
    limits,
    deadlines: deadlinesFor(input, priority),
    mode: input.mode,
  };
}

export function calculateVisitWindow(theoreticalDate: Date, lowerOffset: number, upperOffset: number) {
  const min = new Date(theoreticalDate);
  min.setDate(min.getDate() + lowerOffset);
  const max = new Date(theoreticalDate);
  max.setDate(max.getDate() + upperOffset);
  return { min: min.toISOString(), max: max.toISOString() };
}
