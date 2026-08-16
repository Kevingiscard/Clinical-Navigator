import { modules as clinicalModules } from "./clinicalContent";
import { referenceRegistry } from "./referenceRegistry";

export type ModuleResourceType =
  | "GUIDE"
  | "TOOL"
  | "CHECKLIST"
  | "TEMPLATE"
  | "SOURCE"
  | "TRAINING"
  | "EXAMPLE"
  | "CASE_STUDY"
  | "CALCULATOR"
  | "FAQ"
  | "DOCUMENTATION";

export type ModuleResourceStatus = "VERIFIED" | "NEEDS_REVIEW" | "DRAFT" | "OUTDATED";

export type ModuleResource = {
  id: string;
  moduleIds: string[];
  type: ModuleResourceType;
  title: string;
  description: string;
  audience: string[];
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  internalRoute?: string;
  url?: string;
  official?: boolean;
  jurisdiction: string[];
  studyTypes: string[];
  tags: string[];
  status: ModuleResourceStatus;
  sourceIds: string[];
  order: number;
  offlineAvailable: boolean;
  lastReviewed: string;
};

export type ModuleStep = {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  description: string;
  objectives: string[];
  resourceIds: string[];
  toolIds: string[];
  sourceIds: string[];
  checklistIds: string[];
  nextStep?: string;
  previousStep?: string;
};

export type ModuleDefinition = {
  id: string;
  slug: string;
  title: string;
  description: string;
  objectives: string[];
  audiences: string[];
  levels: string[];
  prerequisites: string[];
  steps: ModuleStep[];
  resourceIds: string[];
  toolIds: string[];
  checklistIds: string[];
  templateIds: string[];
  sourceIds: string[];
  trainingIds: string[];
  exampleIds: string[];
  relatedModules: string[];
  jurisdictions: string[];
  status: ModuleResourceStatus;
  version: string;
  lastUpdated: string;
  lastReviewed: string;
  nextReview: string;
};

const reviewDate = "2026-08-16";
const nextReview = "2027-02-16";
const broadAudience = ["Investigateur", "ARC / CRA", "Chef de projet", "Data Manager", "Biostatisticien", "Regulatory", "QA", "Étudiant"];
const broadJurisdictions = ["International", "France", "Union européenne", "Bénin", "Afrique", "États-Unis"];
const studyTypes = ["Interventionnel", "Observationnel", "Médicament", "Dispositif médical", "Diagnostic", "RWE"];

export const moduleResources: ModuleResource[] = [
  { id: "guide-pico", moduleIds: ["conception", "protocole", "formation"], type: "GUIDE", title: "Guide PICO(T) et question de recherche", description: "Transformer une idée en question structurée avec population, intervention, comparateur, résultat et horizon temporel.", audience: broadAudience, level: "Débutant", internalRoute: "/fr/concevoir-un-essai", jurisdiction: broadJurisdictions, studyTypes, tags: ["PICO", "question", "rationale"], status: "VERIFIED", sourceIds: ["ich-e8-r1", "who-clinical-trial-best-practices"], order: 1, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "tool-design-studio", moduleIds: ["conception", "protocole", "statistiques", "qualite"], type: "TOOL", title: "Clinical Trial Design Studio", description: "Atelier local pour structurer question, endpoints, estimand, design, effectif, calendrier, statistiques et audit.", audience: broadAudience, level: "Intermédiaire", internalRoute: "/fr/concevoir-un-essai", jurisdiction: broadJurisdictions, studyTypes, tags: ["design", "PICO", "estimand", "SAP"], status: "VERIFIED", sourceIds: ["ich-e8-r1", "ich-e9-r1"], order: 2, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "calculator-sample-size", moduleIds: ["conception", "statistiques", "essais-complexes"], type: "CALCULATOR", title: "Calcul d’effectif indicatif", description: "Calculs pédagogiques binaire, continu, survie et effet de grappe intégrés au studio. Les hypothèses doivent être revues par un biostatisticien.", audience: ["Biostatisticien", "Investigateur", "Chef de projet", "Étudiant"], level: "Avancé", internalRoute: "/fr/concevoir-un-essai", jurisdiction: ["International"], studyTypes, tags: ["effectif", "puissance", "ICC", "survie"], status: "NEEDS_REVIEW", sourceIds: ["ich-e9-r1"], order: 3, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "checklist-protocol", moduleIds: ["conception", "protocole", "qualite"], type: "CHECKLIST", title: "Checklist de qualité du protocole", description: "Vérifier question, population, intervention, endpoints, estimand, design, statistiques, risques et livrables.", audience: broadAudience, level: "Intermédiaire", internalRoute: "/fr/concevoir-un-essai", jurisdiction: broadJurisdictions, studyTypes, tags: ["protocole", "SPIRIT", "qualité"], status: "VERIFIED", sourceIds: ["ich-e8-r1", "ich-e6-r3"], order: 4, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "template-protocol", moduleIds: ["conception", "protocole"], type: "TEMPLATE", title: "Modèle pédagogique de protocole", description: "Structure de travail à adapter au protocole, au promoteur, au type d’étude et à la juridiction.", audience: ["Investigateur", "Chef de projet", "ARC / CRA", "Étudiant"], level: "Intermédiaire", internalRoute: "/fr/concevoir-un-essai", jurisdiction: broadJurisdictions, studyTypes, tags: ["template", "protocole"], status: "NEEDS_REVIEW", sourceIds: ["ich-e8-r1"], order: 5, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "source-ich-e6r3", moduleIds: ["conception", "protocole", "reglementaire", "consentement", "monitoring", "qualite", "ressources", "veille"], type: "SOURCE", title: "ICH E6(R3) — Good Clinical Practice", description: "Référence officielle sur la qualité, la conduite, la documentation et la supervision des essais ; vérifier l’implémentation locale.", audience: broadAudience, level: "Expert", url: referenceRegistry.find(item => item.id === "ich-e6-r3")?.sourceUrl, official: true, jurisdiction: ["International"], studyTypes, tags: ["GCP", "qualité", "gouvernance"], status: "VERIFIED", sourceIds: ["ich-e6-r3"], order: 6, offlineAvailable: false, lastReviewed: reviewDate },
  { id: "source-ich-e8r1", moduleIds: ["conception", "protocole", "qualite", "ressources"], type: "SOURCE", title: "ICH E8(R1) — General Considerations", description: "Référence officielle sur la qualité par la conception et les considérations générales relatives aux études cliniques.", audience: broadAudience, level: "Avancé", url: referenceRegistry.find(item => item.id === "ich-e8-r1")?.sourceUrl, official: true, jurisdiction: ["International"], studyTypes, tags: ["quality by design", "CTQ", "study design"], status: "VERIFIED", sourceIds: ["ich-e8-r1"], order: 7, offlineAvailable: false, lastReviewed: reviewDate },
  { id: "source-ich-e9r1", moduleIds: ["conception", "statistiques", "essais-complexes", "formation"], type: "SOURCE", title: "ICH E9(R1) — Estimands and sensitivity", description: "Référence officielle sur les estimands, les analyses de sensibilité et les principes statistiques.", audience: ["Biostatisticien", "Investigateur", "Chef de projet", "Étudiant"], level: "Avancé", url: referenceRegistry.find(item => item.id === "ich-e9-r1")?.sourceUrl, official: true, jurisdiction: ["International"], studyTypes, tags: ["estimand", "statistique", "sensibilité"], status: "VERIFIED", sourceIds: ["ich-e9-r1"], order: 8, offlineAvailable: false, lastReviewed: reviewDate },
  { id: "source-eu-ctr", moduleIds: ["reglementaire", "ressources", "veille"], type: "SOURCE", title: "Clinical Trials Regulation (EU) No 536/2014", description: "Cadre européen pour les essais de médicaments ; l’applicabilité et les exigences nationales doivent être vérifiées.", audience: ["Regulatory", "Chef de projet", "Investigateur", "QA"], level: "Expert", url: referenceRegistry.find(item => item.id === "eu-ctr-536-2014")?.sourceUrl, official: true, jurisdiction: ["Union européenne"], studyTypes: ["Interventionnel", "Médicament"], tags: ["CTR", "UE", "réglementaire"], status: "VERIFIED", sourceIds: ["eu-ctr-536-2014"], order: 9, offlineAvailable: false, lastReviewed: reviewDate },
  { id: "source-ctis", moduleIds: ["reglementaire", "ressources", "veille"], type: "SOURCE", title: "EMA Clinical Trials Information System", description: "Portail officiel CTIS pour les informations et processus relevant du CTR ; un lien ne constitue pas une autorisation.", audience: ["Regulatory", "Chef de projet", "Investigateur"], level: "Avancé", url: referenceRegistry.find(item => item.id === "ema-ctis")?.sourceUrl, official: true, jurisdiction: ["Union européenne"], studyTypes: ["Interventionnel", "Médicament"], tags: ["CTIS", "soumission", "UE"], status: "VERIFIED", sourceIds: ["ema-ctis"], order: 10, offlineAvailable: false, lastReviewed: reviewDate },
  { id: "source-cnil-mr001", moduleIds: ["reglementaire", "consentement", "donnees", "ressources"], type: "SOURCE", title: "CNIL MR-001", description: "Méthodologie française à vérifier selon la catégorie de recherche et le traitement de données concerné.", audience: ["Regulatory", "Data Manager", "QA", "Investigateur"], level: "Expert", url: referenceRegistry.find(item => item.id === "cnil-mr-001")?.sourceUrl, official: true, jurisdiction: ["France"], studyTypes: ["Interventionnel", "Observationnel", "RWE"], tags: ["CNIL", "consentement", "données"], status: "NEEDS_REVIEW", sourceIds: ["cnil-mr-001"], order: 11, offlineAvailable: false, lastReviewed: reviewDate },
  { id: "source-who", moduleIds: ["conception", "qualite", "formation", "ressources", "veille"], type: "SOURCE", title: "WHO clinical trial best practices", description: "Cadre mondial de bonnes pratiques ; il ne remplace ni loi nationale, ni comité d’éthique, ni SOP.", audience: broadAudience, level: "Avancé", url: referenceRegistry.find(item => item.id === "who-clinical-trial-best-practices")?.sourceUrl, official: true, jurisdiction: ["International", "Afrique"], studyTypes, tags: ["OMS", "qualité", "équité"], status: "VERIFIED", sourceIds: ["who-clinical-trial-best-practices"], order: 12, offlineAvailable: false, lastReviewed: reviewDate },
  { id: "guide-audit", moduleIds: ["qualite", "monitoring", "deviations"], type: "GUIDE", title: "Guide de revue et d’audit de cohérence", description: "Parcourir les dimensions scientifique, statistique, opérationnelle, réglementaire, éthique, data et documentaire.", audience: ["QA", "ARC / CRA", "Chef de projet", "Investigateur"], level: "Avancé", internalRoute: "/fr/auditer-un-essai", jurisdiction: broadJurisdictions, studyTypes, tags: ["audit", "cohérence", "qualité"], status: "VERIFIED", sourceIds: ["ich-e6-r3", "ich-e8-r1"], order: 13, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "tool-audit", moduleIds: ["qualite", "monitoring", "deviations"], type: "TOOL", title: "Audit de cohérence du projet", description: "Revue structurée des alertes et des dépendances d’un projet sauvegardé, avec validation humaine obligatoire.", audience: ["QA", "ARC / CRA", "Chef de projet"], level: "Avancé", internalRoute: "/fr/auditer-un-essai", jurisdiction: broadJurisdictions, studyTypes, tags: ["audit", "CAPA", "inspection"], status: "NEEDS_REVIEW", sourceIds: ["ich-e6-r3"], order: 14, offlineAvailable: false, lastReviewed: reviewDate },
  { id: "tool-operations", moduleIds: ["monitoring", "visites", "inclusion", "securite", "pharmacie", "laboratoire"], type: "TOOL", title: "Laboratoire d’outils opérationnels", description: "Outils publics pour fenêtres de visite, CAPA, monitoring, activation et close-out, sans donnée patient.", audience: ["ARC / CRA", "TEC / CRC", "Chef de projet", "Investigateur"], level: "Intermédiaire", internalRoute: "/fr/outils", jurisdiction: broadJurisdictions, studyTypes, tags: ["visite", "CAPA", "monitoring", "close-out"], status: "VERIFIED", sourceIds: ["ich-e6-r3"], order: 15, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "guide-training", moduleIds: ["formation", "conception", "qualite", "reglementaire"], type: "TRAINING", title: "Centre de formation bilingue", description: "Parcours par niveau, quiz et fiches bilingues sur la recherche clinique ; les références locales restent à vérifier.", audience: broadAudience, level: "Débutant", internalRoute: "/fr/formation", jurisdiction: broadJurisdictions, studyTypes, tags: ["formation", "quiz", "bilingue"], status: "DRAFT", sourceIds: ["who-clinical-trial-best-practices"], order: 16, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "guide-resources", moduleIds: ["ressources", "formation", "reglementaire", "veille"], type: "DOCUMENTATION", title: "Explorateur des références", description: "Catalogue transversal des sources enregistrées, avec statut de gouvernance, juridiction et prochaine revue.", audience: broadAudience, level: "Intermédiaire", internalRoute: "/fr/ressources", jurisdiction: broadJurisdictions, studyTypes, tags: ["sources", "références", "gouvernance"], status: "VERIFIED", sourceIds: [], order: 17, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "guide-surveillance", moduleIds: ["veille", "ressources", "reglementaire"], type: "GUIDE", title: "Centre de veille à vérifier", description: "Lire les statuts de transition, les dates d’effet annoncées et les liens de référence sans transformer une veille en obligation.", audience: ["Regulatory", "QA", "Chef de projet", "Investigateur"], level: "Expert", internalRoute: "/fr/veille", jurisdiction: broadJurisdictions, studyTypes, tags: ["veille", "transition", "réglementaire"], status: "NEEDS_REVIEW", sourceIds: ["ich-e6-r3", "eu-ctr-536-2014"], order: 18, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "guide-complex-designs", moduleIds: ["essais-complexes", "conception", "statistiques"], type: "GUIDE", title: "Parcours des designs complexes", description: "Repères pour adaptive, cluster, step-wedge, platform, basket, umbrella, master protocol et pragmatique.", audience: ["Biostatisticien", "Investigateur", "Chef de projet", "Regulatory"], level: "Expert", internalRoute: "/fr/essais-complexes", jurisdiction: broadJurisdictions, studyTypes, tags: ["adaptive", "cluster", "platform", "basket"], status: "NEEDS_REVIEW", sourceIds: ["ich-e8-r1", "ich-e9-r1"], order: 19, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "guide-problem-orientation", moduleIds: ["probleme", "qualite", "securite", "donnees"], type: "GUIDE", title: "Orientation par problème", description: "Décrire un fait sans donnée identifiante pour obtenir un parcours prudent, des questions, des documents et des escalades.", audience: broadAudience, level: "Débutant", internalRoute: "/fr/probleme", jurisdiction: broadJurisdictions, studyTypes, tags: ["problème", "orientation", "escalade"], status: "VERIFIED", sourceIds: ["ich-e6-r3"], order: 20, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "checklist-consent", moduleIds: ["consentement", "reglementaire", "qualite"], type: "CHECKLIST", title: "Checklist consentement et reconsentement", description: "Vérifier version, approbation, information, traçabilité, retrait et circuit de reconsentement.", audience: ["Investigateur", "ARC / CRA", "QA", "Regulatory"], level: "Intermédiaire", internalRoute: "/fr/probleme?scenario=consentement-version", jurisdiction: broadJurisdictions, studyTypes, tags: ["consentement", "version", "retrait"], status: "NEEDS_REVIEW", sourceIds: ["ich-e6-r3", "cnil-mr-001"], order: 21, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "checklist-safety", moduleIds: ["securite", "intervention", "pharmacie"], type: "CHECKLIST", title: "Checklist première évaluation sécurité", description: "Prioriser le participant, documenter les faits, consulter le protocole et activer l’escalade prévue.", audience: ["Investigateur", "Pharmacovigilance", "ARC / CRA"], level: "Avancé", internalRoute: "/fr/probleme?scenario=signalement-securite", jurisdiction: broadJurisdictions, studyTypes, tags: ["AE", "SAE", "sécurité"], status: "NEEDS_REVIEW", sourceIds: ["ich-e6-r3"], order: 22, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "example-synthetic-rct", moduleIds: ["conception", "formation", "essais-complexes"], type: "EXAMPLE", title: "Exemple synthétique d’essai randomisé", description: "Cas pédagogique fictif et non clinique pour suivre question, estimand, design et plan d’analyse.", audience: broadAudience, level: "Intermédiaire", internalRoute: "/fr/concevoir-un-essai", jurisdiction: ["International"], studyTypes: ["Interventionnel", "Randomisé"], tags: ["exemple", "synthétique", "randomisation"], status: "DRAFT", sourceIds: ["ich-e8-r1", "ich-e9-r1"], order: 23, offlineAvailable: true, lastReviewed: reviewDate },
  { id: "faq-local-review", moduleIds: ["reglementaire", "ressources", "veille", "probleme"], type: "FAQ", title: "FAQ : que signifie NEEDS_REVIEW ?", description: "Une ressource existe mais son applicabilité, sa version ou sa couverture locale requiert une revue humaine avant action.", audience: broadAudience, level: "Débutant", internalRoute: "/fr/limites", jurisdiction: broadJurisdictions, studyTypes, tags: ["NEEDS_REVIEW", "juridiction", "limites"], status: "VERIFIED", sourceIds: [], order: 24, offlineAvailable: true, lastReviewed: reviewDate },
];

const commonResourceIds = ["guide-pico", "tool-design-studio", "checklist-protocol", "guide-resources", "faq-local-review"];
const commonSteps = [
  ["comprendre", "Comprendre", "Clarifier le vocabulaire, le périmètre et les limites du module."],
  ["commencer", "Commencer", "Choisir la première action utile et réunir les documents nécessaires."],
  ["verifier", "Vérifier", "Comparer les faits au protocole, aux SOP et aux sources applicables."],
  ["documenter", "Documenter", "Conserver une trace versionnée des hypothèses, décisions et éléments manquants."],
  ["revoir", "Revoir", "Faire relire le travail par le rôle compétent avant toute décision."],
  ["continuer", "Continuer", "Ouvrir les ressources recommandées et le module associé suivant."],
] as const;

const customSteps: Record<string, Array<[string, string, string]>> = {
  conception: [["question", "Question de recherche", "Définir population, intervention, comparateur, résultat et horizon."], ["population", "Population", "Documenter la population cible, les critères et la faisabilité."], ["endpoint", "Endpoints et estimand", "Relier outcome, événements intercurrents, estimand et mesure."], ["design", "Design et effectif", "Choisir le design puis expliciter hypothèses et calculs."], ["operations", "Opérations et risques", "Préparer calendrier, centres, charge, qualité et sécurité."], ["protocol", "Protocole et revue finale", "Structurer protocole, SAP, CRF et audit de cohérence."]],
  protocole: [["structure", "Structure", "Organiser le protocole et ses dépendances."], ["version", "Version et amendements", "Tracer les versions, approbations et conditions de déploiement."], ["schedule", "Calendrier", "Relier visites, procédures, endpoints et fenêtres."], ["sap", "SAP et analyse", "Aligner estimand, populations, données manquantes et analyse."], ["quality", "Qualité", "Vérifier les facteurs critiques pour la qualité."], ["review", "Revue documentaire", "Faire relire les documents et conserver les décisions."]],
  reglementaire: [["scope", "Périmètre", "Identifier pays, type d’étude, produit et autorité potentiellement concernée."], ["sources", "Sources officielles", "Ouvrir les portails enregistrés et vérifier la version applicable."], ["dossier", "Dossier", "Préparer le dossier sans présenter un modèle comme une obligation universelle."], ["ethics", "Éthique et données", "Relier consentement, comité d’éthique et protection des données."], ["local", "Revue locale", "Obtenir une validation locale ; Bénin et juridictions non confirmées restent NEEDS_REVIEW."], ["decision", "Décision documentée", "Ne publier aucune conclusion réglementaire automatiquement."]],
  formation: [["niveau", "Choisir un niveau", "Commencer au niveau débutant, intermédiaire, avancé ou expert."], ["cours", "Cours", "Lire la fiche bilingue et ses limites."], ["exemple", "Exemple", "Analyser un cas synthétique sans donnée patient."], ["exercice", "Exercice", "Tester la compréhension avec le quiz local."], ["sources", "Ressources", "Ouvrir les références officielles et les modules associés."], ["progression", "Progression", "Passer au module opérationnel suivant."]],
  ressources: [["chercher", "Rechercher", "Filtrer par type, statut, niveau, public et juridiction."], ["source", "Lire une source", "Vérifier l’organisme, l’URL, la version et la date de revue."], ["statut", "Comprendre le statut", "Distinguer VERIFIED, NEEDS_REVIEW, DRAFT et OUTDATED."], ["relier", "Relier au travail", "Ouvrir le module, l’outil ou la checklist pertinente."], ["offline", "Offline", "Utiliser les fiches embarquées ; les liens externes nécessitent Internet."], ["revoir", "Revue", "Signaler toute source modifiée ou non accessible."]],
  veille: [["scope", "Définir la veille", "Séparer réglementation, méthodologie, sécurité, statistiques, IA et numérique."], ["lire", "Lire le statut", "Vérifier publication, date d’effet et statut de gouvernance."], ["comparer", "Comparer", "Comparer la version courante et les transitions annoncées."], ["local", "Localiser", "Ne pas déduire une exigence nationale depuis une source internationale."], ["documenter", "Documenter", "Conserver le lien, la date de lecture et l’incertitude."], ["alerter", "Alerter", "Soumettre à revue humaine ; ne jamais auto-publier une modification."]],
  "essais-complexes": [["choisir", "Choisir un design", "Comparer adaptive, cluster, step-wedge, platform, basket, umbrella et master protocol."], ["hypotheses", "Hypothèses", "Expliciter corrélation, interaction, transition, multiplicité et estimand."], ["operations", "Opérations", "Préparer centres, séquences, formation et gouvernance."], ["statistics", "Statistiques", "Faire relire les simulations et le plan d’analyse."], ["sources", "Sources", "Ouvrir les références méthodologiques sans les transformer en approbation."], ["review", "Revue", "Faire valider le design par les compétences concernées."]],
  probleme: [["faits", "Décrire les faits", "Ne saisir aucune donnée identifiante ni donnée patient."], ["securite", "Sécurité", "Prioriser une prise en charge et une escalade réelle si nécessaire."], ["contexte", "Contexte", "Préciser phase, type d’étude, pays, protocole et procédure."], ["parcours", "Parcours", "Suivre les actions, documents et acteurs proposés."], ["ressources", "Ressources", "Ouvrir la checklist et le guide pertinents."], ["revoir", "Revue", "La plateforme oriente ; elle ne tranche pas une obligation réglementaire."]],
};

const slugFor = (id: string) => id === "protocole" ? "protocole" : id;
const stepFor = (moduleId: string, item: [string, string, string], index: number, all: Array<[string, string, string]>): ModuleStep => {
  const [id, title, description] = item;
  const resourceIds = moduleResources.filter(resource => resource.moduleIds.includes(moduleId)).sort((a, b) => a.order - b.order).slice(index === 0 ? 0 : 1, index === 0 ? 4 : 5).map(resource => resource.id);
  const sourceIds = Array.from(new Set(resourceIds.flatMap(resourceId => moduleResources.find(resource => resource.id === resourceId)?.sourceIds ?? [])));
  return { id: `${moduleId}-${id}`, moduleId, order: index + 1, title, description, objectives: [description, "Identifier les éléments manquants", "Conserver une trace de la revue humaine"], resourceIds, toolIds: resourceIds.filter(resourceId => ["TOOL", "CALCULATOR"].includes(moduleResources.find(resource => resource.id === resourceId)?.type ?? "")), sourceIds, checklistIds: resourceIds.filter(resourceId => moduleResources.find(resource => resource.id === resourceId)?.type === "CHECKLIST"), previousStep: index > 0 ? `${moduleId}-${all[index - 1][0]}` : undefined, nextStep: index < all.length - 1 ? `${moduleId}-${all[index + 1][0]}` : undefined };
};

export const moduleDefinitions: ModuleDefinition[] = clinicalModules.map((module, index) => {
  const moduleId = module.id === "ressources" ? "ressources" : module.id;
  const blueprint = customSteps[moduleId] ?? commonSteps;
  const directResourceIds = moduleResources.filter(resource => resource.moduleIds.includes(moduleId)).sort((a, b) => a.order - b.order).map(resource => resource.id);
  const resourceIds = (directResourceIds.length ? directResourceIds : ["guide-resources", "faq-local-review"]).slice(0, 8);
  const sourceIds = Array.from(new Set(resourceIds.flatMap(resourceId => moduleResources.find(resource => resource.id === resourceId)?.sourceIds ?? [])));
  const steps = blueprint.map((item, stepIndex, all) => stepFor(moduleId, item, stepIndex, all));
  const relatedModules = clinicalModules.filter(candidate => candidate.id !== module.id && (candidate.id === "formation" || candidate.id === "ressources" || candidate.id === "qualite" || candidate.id === "conception")).slice(0, 4).map(candidate => candidate.id);
  const typedResources = resourceIds.map(resourceId => moduleResources.find(resource => resource.id === resourceId)).filter(Boolean) as ModuleResource[];
  return { id: moduleId, slug: slugFor(moduleId), title: module.title, description: module.summary, objectives: [module.summary, "Suivre un parcours structuré", "Relier les outils, sources et documents sans donnée patient"], audiences: broadAudience, levels: ["Débutant", "Intermédiaire", "Avancé", "Expert"], prerequisites: ["Lire le protocole et les SOP applicables", "Identifier le rôle compétent", "Ne pas saisir de donnée directement identifiante"], steps, resourceIds, toolIds: typedResources.filter(resource => resource.type === "TOOL" || resource.type === "CALCULATOR").map(resource => resource.id), checklistIds: typedResources.filter(resource => resource.type === "CHECKLIST").map(resource => resource.id), templateIds: typedResources.filter(resource => resource.type === "TEMPLATE").map(resource => resource.id), sourceIds, trainingIds: typedResources.filter(resource => resource.type === "TRAINING").map(resource => resource.id), exampleIds: typedResources.filter(resource => resource.type === "EXAMPLE" || resource.type === "CASE_STUDY").map(resource => resource.id), relatedModules, jurisdictions: broadJurisdictions, status: module.status === "DRAFT" ? "DRAFT" : module.status === "VERIFIED" ? "VERIFIED" : "NEEDS_REVIEW", version: "1.0.0", lastUpdated: reviewDate, lastReviewed: reviewDate, nextReview };
});

export function getModuleDefinition(slug: string) { return moduleDefinitions.find(module => module.slug === slug || module.id === slug); }
export function getModuleResources(moduleId: string) { const module = getModuleDefinition(moduleId); return moduleResources.filter(resource => module?.resourceIds.includes(resource.id)); }
export function getModuleResource(id: string) { return moduleResources.find(resource => resource.id === id); }
export const moduleResourceStats = { modules: moduleDefinitions.length, resources: moduleResources.length, tools: moduleResources.filter(resource => resource.type === "TOOL" || resource.type === "CALCULATOR").length, checklists: moduleResources.filter(resource => resource.type === "CHECKLIST").length, templates: moduleResources.filter(resource => resource.type === "TEMPLATE").length, sources: moduleResources.filter(resource => resource.type === "SOURCE").length, trainings: moduleResources.filter(resource => resource.type === "TRAINING").length, externalLinks: moduleResources.filter(resource => Boolean(resource.url)).length };
