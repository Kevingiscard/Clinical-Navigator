import { describe, expect, it } from "vitest";
import { assessCenterCapacity, assessOperationalLoad, buildTrialTimeline, calculateSampleSize, evaluateDesignCoherence, evaluateTrialAudit, forecastRecruitment, generateTheoreticalRandomisation, scoreProtocolComplexity } from "./studyDesign";

describe("study design methods", () => {
  it("signale les sections méthodologiques incomplètes", () => {
    const result = evaluateDesignCoherence([{ sectionKey: "question", payload: { population: "Adultes" } }]);
    expect(result.status).toBe("Incomplet");
    expect(result.issues.some(item => item.section === "Question")).toBe(true);
    expect(result.issues.some(item => item.section === "Endpoints")).toBe(true);
  });

  it("calcule un effectif binaire et majore l’attrition", () => {
    const result = calculateSampleSize({ type: "BINARY", alpha: 0.05, power: 0.8, p1: 0.4, p2: 0.55, attrition: 0.1 });
    expect(result.perGroup).toBeGreaterThan(result.beforeAttrition);
    expect(result.total).toBeGreaterThan(result.perGroup);
    expect(result.warning).toMatch(/biostatisticien/i);
    expect(result.assumptions.zPower).toBe(0.842);
  });

  it("produit une projection de recrutement avec scénarios", () => {
    const result = forecastRecruitment({ centers: 5, monthlyPatientsPerCenter: 10, screeningRate: 0.8, eligibilityRate: 0.5, consentRate: 0.8, attritionRate: 0.1, target: 200 });
    expect(result.monthlyExpected).toBeGreaterThan(0);
    expect(result.estimatedMonths).not.toBeNull();
    expect(result.pessimisticMonths).toBeGreaterThan(result.optimisticMonths ?? 0);
  });

  it("génère une allocation théorique équilibrée sans identifiant de participant", () => {
    const result = generateTheoreticalRandomisation({ ratioA: 1, ratioB: 1, blockSize: 4, totalSlots: 12, seed: "workspace-demo" });
    expect(result.allocationCodes).toHaveLength(12);
    expect(result.allocationCodes.filter(value => value === "A")).toHaveLength(6);
    expect(result.warning).toMatch(/système validé/i);
  });

  it("calcule une charge opérationnelle proportionnée à la complexité", () => {
    const low = assessOperationalLoad({ centers: 4, coordinatorsPerCenter: 1, visitsPerParticipant: 6, targetParticipants: 120, monthlyCapacityPerCoordinator: 15, complexityLevel: "LOW" });
    const high = assessOperationalLoad({ centers: 4, coordinatorsPerCenter: 1, visitsPerParticipant: 6, targetParticipants: 120, monthlyCapacityPerCoordinator: 15, complexityLevel: "HIGH" });
    expect(high.effectiveMonthlyCapacity).toBeLessThan(low.effectiveMonthlyCapacity);
    expect(high.estimatedOperationalMonths).toBeGreaterThan(low.estimatedOperationalMonths ?? 0);
  });

  it("signale une chaîne incompatible entre endpoint, estimand, analyse et effectif", () => {
    const result = evaluateDesignCoherence([{ sectionKey: "question", payload: { population: "Adultes", intervention: "Traitement", outcome: "Réponse" } }, { sectionKey: "outcome", payload: { objectives: [{ label: "Principal" }], endpoints: [{ priority: "PRIMARY", variable: "Réponse clinique", scale: "BINARY" }] } }, { sectionKey: "estimand", payload: { population: "ITT", variable: "Score symptomatique", strategy: "Composite" } }, { sectionKey: "statistics", payload: { primaryAnalysis: "Régression logistique", endpointVariable: "Réponse clinique" } }, { sectionKey: "design", payload: { selectedDesign: "parallel" } }, { sectionKey: "sample_size", payload: { calculationType: "CONTINUOUS", assumptionsReviewed: true, analysisPopulation: "ITT" } }]);
    expect(result.status).toBe("Incompatible");
    expect(result.issues.some(item => item.section === "Chaînage méthodologique")).toBe(true);
  });

  it("distingue capacité centre et scores de charge du protocole", () => {
    const capacity = assessCenterCapacity({ centers: 5, activatedCenters: 3, patientsScreenedPerCenterMonth: 20, eligibilityRate: 0.5, consentRate: 0.8, startUpMonths: 2 }); const score = scoreProtocolComplexity({ arms: 3, primaryEndpoints: 2, visitsPerParticipant: 8, proceduresPerVisit: 4, countries: 3, blinded: true });
    expect(capacity.activeCenters).toBe(3); expect(capacity.enrolledPerMonth).toBe(24); expect(score.protocolComplexityScore).toBeGreaterThan(0); expect(score.siteBurdenScore).toBeGreaterThan(0);
  });

  it("consolide les lacunes en un audit transversal de préparation", () => {
    const result = evaluateTrialAudit([{ sectionKey: "question", payload: { population: "Adultes", intervention: "Traitement", outcome: "Réponse" } }, { sectionKey: "outcome", payload: { objectives: [{ label: "Principal" }], endpoints: [{ priority: "PRIMARY", variable: "Réponse", scale: "BINARY" }] } }, { sectionKey: "estimand", payload: { population: "ITT", variable: "Autre variable", strategy: "Composite" } }, { sectionKey: "statistics", payload: { primaryAnalysis: "Régression", endpointVariable: "Réponse" } }, { sectionKey: "sample_size", payload: { calculationType: "CONTINUOUS", assumptionsReviewed: true, analysisPopulation: "ITT" } }, { sectionKey: "design", payload: { selectedDesign: "parallel" } }]);
    expect(result.status).toBe("BLOQUÉ"); expect(result.categories).toHaveLength(5); expect(result.coherenceIssues.some(item => item.level === "INCOMPATIBLE")).toBe(true);
  });

  it("détecte les écarts documentaires et opérationnels sans se limiter à la présence des sections", () => {
    const result = evaluateTrialAudit([{ sectionKey: "question", payload: { population: "Adultes", intervention: "Traitement", outcome: "Réponse" } }, { sectionKey: "objectives", payload: { primaryObjective: "Évaluer la réponse" } }, { sectionKey: "outcome", payload: { objectives: [{ label: "Principal" }], endpoints: [{ priority: "PRIMARY", variable: "Réponse", scale: "BINARY" }] } }, { sectionKey: "estimand", payload: { population: "ITT", variable: "Réponse", strategy: "Composite" } }, { sectionKey: "statistics", payload: { primaryAnalysis: "Régression", endpointVariable: "Réponse" } }, { sectionKey: "sample_size", payload: { calculationType: "BINARY", assumptionsReviewed: true, analysisPopulation: "ITT" } }, { sectionKey: "protocol", payload: { synopsis: "Synopsis présent" } }, { sectionKey: "sap", payload: { analysisSets: "ITT" } }, { sectionKey: "schedule", payload: { visits: "V1", assessments: "Évaluation" } }, { sectionKey: "feasibility", payload: { centers: 4 } }, { sectionKey: "recruitment", payload: { fpiLpiPlan: "FPI/LPI" } }, { sectionKey: "quality", payload: { ctqFactors: "Endpoint principal" } }, { sectionKey: "risks", payload: { risks: "Risque de recrutement" } }, { sectionKey: "regulatory", payload: { jurisdiction: "France" } }, { sectionKey: "reporting", payload: { registration: "Registre", publicationPlan: "Publication" } }]);
    expect(result.coherenceIssues.some(item => item.section === "Protocole ↔ SAP")).toBe(false); expect(result.coherenceIssues.some(item => item.section === "Réglementaire ↔ reporting")).toBe(true); expect(result.categories.find(item => item.key === "operationnel")?.checked).toBe(true);
  });

  it("signale les lacunes de dissimulation et de levée d’aveugle pour un design randomisé", () => {
    const result = evaluateDesignCoherence([{ sectionKey: "question", payload: { population: "Adultes", intervention: "Traitement", outcome: "Réponse" } }, { sectionKey: "outcome", payload: { objectives: [{ label: "Principal" }], endpoints: [{ priority: "PRIMARY", variable: "Réponse", scale: "BINARY" }] } }, { sectionKey: "estimand", payload: { population: "ITT", variable: "Réponse", strategy: "Composite" } }, { sectionKey: "design", payload: { selectedDesign: "Randomisé en cluster" } }, { sectionKey: "randomisation", payload: { method: "Blocs", allocation: "1:1" } }, { sectionKey: "blinding", payload: { blinding: "Double aveugle" } }, { sectionKey: "statistics", payload: { primaryAnalysis: "Régression", endpointVariable: "Réponse" } }, { sectionKey: "sample_size", payload: { calculationType: "BINARY", assumptionsReviewed: true, analysisPopulation: "ITT" } }]);
    expect(result.issues.some(item => item.section === "Dissimulation d’allocation")).toBe(true); expect(result.issues.some(item => item.section === "Aveugle")).toBe(true);
  });

  it("construit un calendrier d’essai avec jalons et durée consolidée", () => {
    const result = buildTrialTimeline({ designMonths: 2, feasibilityMonths: 1, regulatoryMonths: 3, activationMonths: 2, recruitmentMonths: 8, treatmentMonths: 3, followUpMonths: 6, analysisMonths: 2, reportingMonths: 2 });
    expect(result.milestones).toHaveLength(9); expect(result.milestones[4].startMonth).toBe(8); expect(result.totalMonths).toBe(29);
  });
});
