export type ContentStatus = "VERIFIED" | "NEEDS_REVIEW" | "OUTDATED" | "DRAFT" | "ARCHIVED";
export type Priority = "CRITIQUE" | "HAUTE" | "NORMALE" | "FAIBLE";
export type ResponseMode = "rapide" | "detaille" | "expert";

export type SourceRecord = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  jurisdiction: string;
  publishedAt: string;
  verifiedAt: string;
  nextReviewAt: string;
  status: ContentStatus;
  isOfficial: boolean;
  scope: string;
};

export type ClinicalModule = {
  id: string;
  title: string;
  summary: string;
  icon: string;
  status: ContentStatus;
  topics: string[];
};

export type ScenarioActor = { role: string; responsibility: string; when: string };

export type ClinicalScenario = {
  id: string;
  title: string;
  description: string;
  category: string;
  roles: string[];
  studyTypes: string[];
  phases: string[];
  jurisdictions: string[];
  severity: Priority;
  questions: string[];
  actions: string[];
  actors: ScenarioActor[];
  documents: string[];
  checks: string[];
  escalation: string[];
  mistakes: string[];
  example: string;
  checklist: string[];
  referenceIds: string[];
  version: string;
  status: ContentStatus;
  reviewDate: string;
  keywords: string[];
  complex?: boolean;
};

export type GuidanceResponse = {
  blocked: boolean;
  sensitiveDataWarning?: string;
  scenario: ClinicalScenario;
  priority: Priority;
  priorityReason: string;
  immediateAction: string;
  summary: string;
  sourceRecords: SourceRecord[];
  missingInformation: string[];
  limits: string[];
  deadlines: Array<{ label: string; timing: string; source: string; confidence: "à vérifier" | "contextuel" }>;
  mode: ResponseMode;
};

export const contentStatuses: Array<{ id: ContentStatus; label: string; description: string }> = [
  { id: "VERIFIED", label: "Vérifié", description: "Source et contenu revus pour le périmètre indiqué." },
  { id: "NEEDS_REVIEW", label: "À vérifier", description: "Base pédagogique disponible, validation du contexte requise." },
  { id: "OUTDATED", label: "À actualiser", description: "À ne pas utiliser comme fondement d’une décision actuelle." },
  { id: "DRAFT", label: "Brouillon", description: "Non publié comme contenu opérationnel." },
  { id: "ARCHIVED", label: "Archivé", description: "Conservé pour l’historique, non applicable par défaut." },
];

export const roles = [
  "Investigateur principal", "Médecin investigateur", "Co-investigateur", "ARC / CRA", "TEC / CRC",
  "Coordinateur de recherche clinique", "Chef de projet clinique", "Data Manager", "Biostatisticien",
  "Pharmacovigilance", "Responsable qualité", "Responsable réglementaire", "Pharmacien", "Laboratoire",
  "Promoteur", "CRO", "Chercheur", "Étudiant", "Autre",
];

export const studyTypes = [
  "Interventionnel", "Randomisé", "Contrôlé", "Parallèle", "Ouvert", "Simple aveugle", "Double aveugle",
  "Multicentrique", "Monocentrique", "Cross-over", "Factoriel", "Cluster randomisé", "Step-wedge",
  "Adaptatif", "Pragmatique", "Supériorité", "Non-infériorité", "Équivalence", "Master protocol",
  "Basket trial", "Umbrella trial", "Platform trial", "Médicament", "Vaccin", "Dispositif médical",
  "Intervention comportementale", "Intervention numérique", "Autre",
];

export const trialPhases = [
  "Conception", "Faisabilité", "Préparation réglementaire", "Sélection des centres", "Mise en place", "Formation",
  "Activation", "Pré-screening", "Screening", "Inclusion", "Randomisation", "Intervention", "Suivi",
  "Monitoring", "Gestion des données", "Pharmacovigilance", "Qualité", "Clôture", "Analyse", "Archivage", "Publication",
];

export const jurisdictions = ["Bénin", "France", "Sénégal", "Côte d’Ivoire", "Togo", "Ghana", "Nigeria", "Afrique du Sud", "Union européenne", "International / à préciser"];

export const sources: SourceRecord[] = [
  {
    id: "ich-e8-r1", title: "ICH guideline E8(R1) on general considerations for clinical studies", publisher: "ICH / EMA",
    url: "https://www.ema.europa.eu/en/ich-e8-general-considerations-clinical-studies-scientific-guideline",
    jurisdiction: "International / UE", publishedAt: "2022-04-14", verifiedAt: "2026-08-16", nextReviewAt: "2027-04-14", status: "VERIFIED", isOfficial: true,
    scope: "Guideline ICH E8(R1) sur les considérations générales relatives aux études cliniques ; effective date indiquée au 14 avril 2022.",
  },
  {
    id: "ich-e6r3-principles", title: "ICH E6(R3) — Principles & Annex 1", publisher: "ICH / EMA",
    url: "https://www.ema.europa.eu/en/ich-e6-good-clinical-practice-scientific-guideline",
    jurisdiction: "International / UE", publishedAt: "2025-01-27", verifiedAt: "2026-08-15", nextReviewAt: "2027-01-15", status: "VERIFIED", isOfficial: true,
    scope: "Version actuellement applicable des principes et de l’Annex 1 de l’ICH E6(R3), entrée en vigueur le 23 juillet 2025. Approche qualité par la conception, facteurs critiques pour la qualité, proportionnalité et gestion des risques.",
  },
  {
    id: "ich-e6r3-consolidated", title: "ICH E6(R3) — Consolidated Guideline", publisher: "ICH / EMA",
    url: "https://www.ema.europa.eu/en/ich-e6-good-clinical-practice-scientific-guideline",
    jurisdiction: "International / UE", publishedAt: "2026-07-15", verifiedAt: "2026-08-15", nextReviewAt: "2027-01-15", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Version consolidée publiée en juillet 2026. Son entrée en vigueur est annoncée au 15 janvier 2027 : elle doit donc être distinguée de la version actuellement effective.",
  },
  {
    id: "ich-e6r3-annex2", title: "ICH E6(R3) — Annex 2", publisher: "ICH / EMA",
    url: "https://www.ema.europa.eu/en/ich-e6-good-clinical-practice-scientific-guideline",
    jurisdiction: "International / UE", publishedAt: "2026-07-15", verifiedAt: "2026-08-15", nextReviewAt: "2027-01-15", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Annex 2 portant notamment sur certains designs pragmatiques, décentralisés et l’usage de sources de données du monde réel. Effective annoncée au 15 janvier 2027.",
  },
  {
    id: "spirit-2025", title: "SPIRIT 2025 — protocoles d’essais randomisés", publisher: "SPIRIT / BMJ",
    url: "https://www.consort-spirit.org/published-statements",
    jurisdiction: "International", publishedAt: "2025-04-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-04-01", status: "VERIFIED", isOfficial: false,
    scope: "Référence méthodologique actualisée pour la rédaction et la vérification des protocoles d’essais randomisés. Utiliser comme checklist de préparation, sans la transformer en exigence réglementaire universelle.",
  },
  {
    id: "consort-2025", title: "CONSORT 2025 — reporting des essais randomisés", publisher: "CONSORT / EQUATOR",
    url: "https://www.equator-network.org/reporting-guidelines/consort/",
    jurisdiction: "International", publishedAt: "2025-04-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-04-01", status: "VERIFIED", isOfficial: false,
    scope: "Guideline de reporting pour les essais randomisés. À utiliser pour préparer la transparence du reporting, sans confondre guideline de publication et obligation réglementaire.",
  },
  {
    id: "ich-e9-r1", title: "ICH E9 / E9(R1) — Statistical Principles & Estimands", publisher: "ICH / EMA",
    url: "https://www.ema.europa.eu/en/ich-e9-statistical-principles-clinical-trials-scientific-guideline",
    jurisdiction: "International / UE", publishedAt: "2020-07-30", verifiedAt: "2026-08-15", nextReviewAt: "2027-01-30", status: "VERIFIED", isOfficial: true,
    scope: "Principes statistiques pour la conception, la conduite et l’analyse des essais, complétés par E9(R1) sur les estimands et les analyses de sensibilité.",
  },
  {
    id: "who-best-practices", title: "Guidance for best practices for clinical trials", publisher: "Organisation mondiale de la Santé",
    url: "https://www.who.int/publications/i/item/9789240097711",
    jurisdiction: "International", publishedAt: "2024-09-25", verifiedAt: "2026-08-15", nextReviewAt: "2026-09-25", status: "VERIFIED", isOfficial: true,
    scope: "Cadre mondial pour des essais bien conçus et mis en œuvre, avec accent sur qualité, efficacité, équité, participation des parties prenantes et renforcement des écosystèmes de recherche.",
  },
  {
    id: "eu-ctr-536-2014", title: "Règlement (UE) n° 536/2014 — Clinical Trials Regulation", publisher: "Union européenne / EUR-Lex",
    url: "https://eur-lex.europa.eu/legal-content/FR/ALL/?uri=CELEX:32014R0536",
    jurisdiction: "Union européenne / EEE", publishedAt: "2014-05-27", verifiedAt: "2026-08-15", nextReviewAt: "2027-05-27", status: "VERIFIED", isOfficial: true,
    scope: "Cadre juridique européen des essais cliniques de médicaments, avec autorisation, évaluation scientifique et éthique et obligations de transparence.",
  },
  {
    id: "ema-ctis", title: "Clinical Trials Information System (CTIS)", publisher: "Agence européenne des médicaments",
    url: "https://www.ema.europa.eu/en/human-regulatory-overview/research-development/clinical-trials-human-medicines/clinical-trials-information-system",
    jurisdiction: "Union européenne / EEE", publishedAt: "2022-01-31", verifiedAt: "2026-08-15", nextReviewAt: "2026-11-15", status: "VERIFIED", isOfficial: true,
    scope: "Portail et système d’information central pour les essais relevant du CTR. Les nouvelles demandes et informations couvertes par le règlement passent par CTIS.",
  },
  {
    id: "ema-ctis-handbook", title: "CTIS Sponsor Handbook — version 6.2", publisher: "Agence européenne des médicaments",
    url: "https://www.ema.europa.eu/en/human-regulatory-overview/research-development/clinical-trials-human-medicines/clinical-trials-information-system-ctis-training-support",
    jurisdiction: "Union européenne / EEE", publishedAt: "2026-03-26", verifiedAt: "2026-08-15", nextReviewAt: "2026-10-01", status: "VERIFIED", isOfficial: true,
    scope: "Référence opérationnelle pour les promoteurs utilisant CTIS ; la page EMA indique une mise à jour du handbook au 26 mars 2026.",
  },
  {
    id: "cnil-mr001-2026", title: "MR-001 — Recherches en santé avec recueil du consentement", publisher: "CNIL",
    url: "https://www.cnil.fr/fr/methodologie-de-reference-mr-001-recherches-sante-avec-recueil-du-consentement",
    jurisdiction: "France", publishedAt: "2026-05-26", verifiedAt: "2026-08-15", nextReviewAt: "2026-11-26", status: "VERIFIED", isOfficial: true,
    scope: "Méthodologie de référence française mise à jour en 2026 pour certains traitements de données dans les recherches en santé nécessitant le recueil du consentement.",
  },
  {
    id: "cnil-mr003-2026", title: "MR-003 — Recherches en santé sans recueil du consentement", publisher: "CNIL",
    url: "https://www.cnil.fr/fr/methodologies-de-reference-pour-les-recherches-en-sante-verifier-sa-conformite-aux-mr-001-et-mr-003",
    jurisdiction: "France", publishedAt: "2026-05-26", verifiedAt: "2026-08-15", nextReviewAt: "2026-11-26", status: "VERIFIED", isOfficial: true,
    scope: "Ressource CNIL 2026 présentant la grille de conformité MR-003 et la logique de vérification avant déclaration ou demande d’autorisation.",
  },
  {
    id: "ansm-clinical-trials", title: "Essais cliniques et mise en œuvre du CTR / CTIS", publisher: "ANSM",
    url: "https://ansm.sante.fr/qui-sommes-nous/nos-missions/faciliter-lacces-a-linnovation-therapeutique/p/encadrer-les-essais-cliniques",
    jurisdiction: "France / UE", publishedAt: "2024-09-06", verifiedAt: "2026-08-15", nextReviewAt: "2026-12-01", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Ressources institutionnelles françaises sur l’encadrement des essais cliniques et le rôle de l’ANSM. À confronter aux textes et pages réglementaires les plus récents.",
  },
  {
    id: "who-trial-registration", title: "WHO — Clinical trial registration", publisher: "Organisation mondiale de la Santé",
    url: "https://www.who.int/news-room/questions-and-answers/item/clinical-trials",
    jurisdiction: "International", publishedAt: "2020-01-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-01-01", status: "VERIFIED", isOfficial: true,
    scope: "L’OMS indique que les essais doivent être enregistrés avant le recrutement du premier participant et que l’ICTRP n’est pas lui-même un registre dans lequel l’essai est enregistré directement.",
  },
  {
    id: "fda-adaptive-2019", title: "FDA — Adaptive Design Clinical Trials for Drugs and Biologics", publisher: "U.S. FDA",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/adaptive-design-clinical-trials-drugs-and-biologics-guidance-industry",
    jurisdiction: "États-Unis", publishedAt: "2019-12-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-06-01", status: "VERIFIED", isOfficial: true,
    scope: "Guidance finale sur les designs adaptatifs pour médicaments et biologiques, avec principes de planification, conduite, analyse et présentation des informations utiles à l’évaluation.",
  },
  {
    id: "fda-e20-adaptive-draft", title: "ICH E20 — Adaptive Designs for Clinical Trials", publisher: "FDA / ICH",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/e20-adaptive-designs-clinical-trials",
    jurisdiction: "International / États-Unis", publishedAt: "2025-09-01", verifiedAt: "2026-08-16", nextReviewAt: "2026-12-01", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Projet de guidance ICH E20 publié en 2025. Marqué comme draft et non applicable comme guidance finale tant qu’il n’est pas adopté dans le périmètre concerné.",
  },
  {
    id: "tidier", title: "TIDieR — intervention description and replication", publisher: "EQUATOR Network / BMJ",
    url: "https://www.equator-network.org/reporting-guidelines/tidier/",
    jurisdiction: "International", publishedAt: "2014-03-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-03-01", status: "VERIFIED", isOfficial: false,
    scope: "Checklist de description structurée des interventions afin de permettre leur compréhension et leur réplication.",
  },
];

// Une juridiction n’est considérée comme couverte que si le registre contient
// au moins une source explicitement marquée VERIFIED pour cette juridiction.
// Les juridictions sans source vérifiée restent sélectionnables, mais l’interface
// doit signaler que leur couverture est en construction.
export function hasVerifiedSourceForJurisdiction(jurisdiction: string) {
  return sources.some(source => source.jurisdiction === jurisdiction && source.status === "VERIFIED");
}

export const modules: ClinicalModule[] = [
  { id: "conception", title: "Conception", summary: "Question, objectifs, endpoints, population, faisabilité et risques.", icon: "Compass", status: "VERIFIED", topics: ["Question", "Hypothèse", "Effectif", "Risques"] },
  { id: "protocole", title: "Protocole", summary: "Structure, versions, amendements, cohérence et calendrier.", icon: "FileText", status: "VERIFIED", topics: ["Version", "Amendement", "Calendrier"] },
  { id: "reglementaire", title: "Réglementaire & éthique", summary: "Dossier, soumission, autorités, comité d’éthique et traçabilité.", icon: "Scale", status: "NEEDS_REVIEW", topics: ["Soumission", "Autorités", "Juridiction"] },
  { id: "consentement", title: "Consentement", summary: "Information, reconsentement, retrait et situations particulières.", icon: "ShieldCheck", status: "VERIFIED", topics: ["Consentement", "Retrait", "Vulnérabilité"] },
  { id: "screening", title: "Screening", summary: "Pré-screening, critères, examens et éligibilité.", icon: "SearchCheck", status: "VERIFIED", topics: ["Critères", "Résultats", "Éligibilité"] },
  { id: "inclusion", title: "Inclusion", summary: "Prérequis, documentation et traçabilité de l’inclusion.", icon: "UserPlus", status: "VERIFIED", topics: ["Prérequis", "Traçabilité", "Protocole"] },
  { id: "randomisation", title: "Randomisation", summary: "Allocation, IWRS/IVRS, stratification et incidents.", icon: "Shuffle", status: "NEEDS_REVIEW", topics: ["IWRS", "Allocation", "Aveugle"] },
  { id: "intervention", title: "Intervention", summary: "Dose, administration, adhésion et traitement concomitant.", icon: "Syringe", status: "NEEDS_REVIEW", topics: ["Dose", "Administration", "Produit"] },
  { id: "visites", title: "Visites", summary: "Fenêtres, retards, visites manquées et procédures.", icon: "CalendarClock", status: "VERIFIED", topics: ["Fenêtre", "Retard", "Absent"] },
  { id: "securite", title: "Sécurité", summary: "AE, SAE, grossesse, suivi et escalade prudente.", icon: "HeartPulse", status: "VERIFIED", topics: ["AE", "SAE", "Escalade"] },
  { id: "deviations", title: "Déviations", summary: "Identification, impact, CAPA et clôture des déviations.", icon: "GitBranch", status: "VERIFIED", topics: ["Impact", "CAPA", "Documentation"] },
  { id: "monitoring", title: "Monitoring", summary: "Préparation, visite sur site ou à distance et follow-up.", icon: "ClipboardCheck", status: "VERIFIED", topics: ["SDV", "Actions", "Close-out"] },
  { id: "donnees", title: "Données", summary: "eCRF, queries, corrections, audit trail et data review.", icon: "Database", status: "VERIFIED", topics: ["Query", "Audit trail", "Lock"] },
  { id: "pharmacie", title: "Pharmacie", summary: "Réception, stockage, température, accountability et dispensation.", icon: "PackageCheck", status: "NEEDS_REVIEW", topics: ["Température", "Stock", "Retour"] },
  { id: "laboratoire", title: "Laboratoire", summary: "Prélèvement, étiquetage, transport, tubes et résultats.", icon: "TestTube2", status: "NEEDS_REVIEW", topics: ["Échantillon", "Transport", "Pré-analytique"] },
  { id: "qualite", title: "Qualité", summary: "Risk assessment, analyse de cause, CAPA, audit et inspection.", icon: "BadgeCheck", status: "VERIFIED", topics: ["Risque", "Audit", "CAPA"] },
  { id: "fin-etude", title: "Fin d’étude", summary: "Dernière visite, fermeture, lock, archivage et rapport.", icon: "Archive", status: "NEEDS_REVIEW", topics: ["Close-out", "Archivage", "Rapport"] },
  { id: "step-wedge", title: "Essais step-wedge", summary: "Transitions de clusters, calendrier, formation et cohérence des données.", icon: "Steps", status: "NEEDS_REVIEW", topics: ["Transition", "Cluster", "Calendrier"] },
  { id: "cross-over", title: "Essais cross-over", summary: "Séquences, périodes, washout et traitement correct.", icon: "Repeat2", status: "NEEDS_REVIEW", topics: ["Séquence", "Washout", "Période"] },
  { id: "cluster", title: "Essais cluster", summary: "Allocation, contamination, recrutement et intervention de cluster.", icon: "Network", status: "NEEDS_REVIEW", topics: ["Allocation", "Contamination", "Cluster"] },
  { id: "adaptatif", title: "Essais adaptatifs", summary: "Adaptations, données intermédiaires, gouvernance et documentation.", icon: "SlidersHorizontal", status: "NEEDS_REVIEW", topics: ["Adaptation", "Gouvernance", "Intermédiaire"] },
  { id: "master-protocol", title: "Master protocol", summary: "Protocole maître, sous-protocoles, versions et données partagées.", icon: "Layers3", status: "NEEDS_REVIEW", topics: ["Sous-protocole", "Version", "Cohérence"] },
  { id: "formation", title: "Formation", summary: "Parcours de découverte, pratiques et expertises.", icon: "GraduationCap", status: "DRAFT", topics: ["Quiz", "Scénarios", "Références"] },
  { id: "ressources", title: "Ressources", summary: "Bibliothèque de sources, autorités et documents de référence.", icon: "Library", status: "VERIFIED", topics: ["ICH", "OMS", "Autorités"] },
  { id: "statistiques", title: "Statistiques", summary: "Estimands, hypothèses, effectifs, modèles, données manquantes et analyses de sensibilité.", icon: "BarChart3", status: "NEEDS_REVIEW", topics: ["Estimand", "Effectif", "Analyse"] },
  { id: "essais-complexes", title: "Essais complexes", summary: "Parcours spécialisés pour designs adaptatifs, cluster, step-wedge, platform, basket, umbrella et master protocol.", icon: "Layers3", status: "NEEDS_REVIEW", topics: ["Adaptive", "Cluster", "Platform"] },
  { id: "veille", title: "Veille", summary: "Centre de veille méthodologique, réglementaire, sécurité, statistique et santé numérique.", icon: "Radar", status: "NEEDS_REVIEW", topics: ["Transition", "Sources", "Revue"] },
  { id: "probleme", title: "J’ai un problème", summary: "Moteur d’orientation vers les faits, la sécurité, les documents, les escalades et les ressources pertinentes.", icon: "CircleAlert", status: "VERIFIED", topics: ["Orientation", "Escalade", "Checklist"] },
];

const standardActors: ScenarioActor[] = [
  { role: "Professionnel qui identifie la situation", responsibility: "Documente les faits observés sans les modifier rétroactivement.", when: "Dès la découverte" },
  { role: "Investigateur / responsable compétent", responsibility: "Évalue les conséquences cliniques et les actions relevant de sa responsabilité.", when: "Selon le risque et les procédures applicables" },
  { role: "Promoteur / équipe désignée", responsibility: "Coordonne l’évaluation et les décisions prévues par le protocole et les SOP.", when: "Selon le circuit d’escalade" },
];

const standardActions = [
  "Protéger en priorité les droits, la sécurité et le bien-être du participant lorsqu’ils peuvent être concernés.",
  "Documenter les faits, les dates relatives et les éléments connus sans reconstituer ni corriger rétroactivement l’historique.",
  "Vérifier la version applicable du protocole, les procédures du site et les SOP du promoteur avant toute conclusion.",
  "Informer les rôles désignés par les procédures applicables et conserver la traçabilité de l’échange.",
  "Évaluer l’impact avec les personnes compétentes puis définir les actions correctives et préventives appropriées.",
];

const makeScenario = (input: Partial<ClinicalScenario> & Pick<ClinicalScenario, "id" | "title" | "description" | "category" | "severity" | "keywords">): ClinicalScenario => ({
  roles: ["ARC / CRA", "Coordinateur de recherche clinique", "Investigateur principal"],
  studyTypes: ["Interventionnel", "Médicament", "Vaccin", "Dispositif médical"],
  phases: ["Inclusion", "Intervention", "Suivi", "Monitoring"],
  jurisdictions: ["International / à préciser"],
  questions: ["Quel fait précis a été constaté ?", "Existe-t-il un risque actuel pour le participant ?", "Quelle version du protocole et quelles procédures s’appliquent ?", "Qui a déjà été informé ?"],
  actions: standardActions,
  actors: standardActors,
  documents: ["Protocole et amendements applicables", "SOP applicables", "Dossier source et eCRF, lorsque pertinent", "Formulaire ou registre de déviation, si requis"],
  checks: ["Vérifier les éléments factuels", "Vérifier la portée de la juridiction", "Vérifier les délais et voies d’escalade dans les procédures applicables"],
  escalation: ["Escalader immédiatement si la sécurité, les droits ou l’intégrité des données peuvent être affectés.", "Ne pas qualifier seul une obligation réglementaire sans les sources et responsables compétents."],
  mistakes: ["Ne pas modifier les faits rétroactivement.", "Ne pas conclure qu’une notification est obligatoire sans vérifier le protocole, les SOP et la juridiction.", "Ne pas saisir de donnée permettant d’identifier directement un participant."],
  example: "Exemple pédagogique : une incohérence est détectée ; l’équipe conserve les faits, consulte les documents applicables, mobilise les responsables désignés et trace la décision finale.",
  checklist: ["Sécurité évaluée", "Faits documentés", "Protocole vérifié", "Acteurs informés", "Impact évalué", "Décision et clôture tracées"],
  referenceIds: ["ich-e6r3", "who-best-practices"],
  version: "1.0.0",
  status: "NEEDS_REVIEW",
  reviewDate: "2026-12-31",
  ...input,
});

export const scenarios: ClinicalScenario[] = [
  makeScenario({ id: "inclusion-critere-non-respecte", title: "Inclusion avec critère potentiellement non respecté", description: "Un participant semble avoir été inclus alors qu’un critère d’éligibilité n’était peut-être pas rempli.", category: "Inclusion", severity: "HAUTE", status: "VERIFIED", keywords: ["inclusion", "critère", "éligibilité", "eligible", "patient inclus"], phases: ["Screening", "Inclusion"], documents: ["Protocole et amendements applicables", "Critères d’éligibilité", "Source de screening", "eCRF et documentation de l’inclusion"], example: "Un ARC relève, pendant la revue, une valeur de screening dont la cohérence avec un critère doit être vérifiée. L’équipe documente la découverte et demande l’évaluation au circuit désigné." }),
  makeScenario({ id: "visite-hors-fenetre", title: "Visite hors fenêtre", description: "Une visite a été réalisée ou est prévue en dehors de la fenêtre définie.", category: "Visites", severity: "NORMALE", status: "VERIFIED", keywords: ["visite", "fenêtre", "hors fenêtre", "retard"], phases: ["Suivi"], documents: ["Calendrier des visites", "Protocole applicable", "Source de visite", "eCRF"], example: "Une visite est planifiée après la limite indiquée par le calendrier. L’équipe vérifie la fenêtre et la procédure avant de définir le suivi documenté." }),
  makeScenario({ id: "visite-manquee", title: "Visite manquée", description: "Un participant ne s’est pas présenté à une visite requise.", category: "Visites", severity: "HAUTE", status: "VERIFIED", keywords: ["visite manquée", "absent", "rendez-vous", "missed visit"], phases: ["Suivi"], example: "Le participant est absent. L’équipe suit le plan de contact autorisé, vérifie les évaluations dépendantes du temps et documente les tentatives et décisions." }),
  makeScenario({ id: "consentement-version", title: "Version de consentement potentiellement inadaptée", description: "La version du document de consentement utilisée doit être vérifiée.", category: "Consentement", severity: "HAUTE", status: "VERIFIED", keywords: ["consentement", "version", "information", "ICF"], phases: ["Screening", "Inclusion"], documents: ["Version approuvée du consentement", "Preuve d’approbation éthique", "Consentement signé", "Dossier source"], example: "Une version différente est identifiée dans le dossier. L’équipe vérifie les dates d’approbation et le processus applicable avant toute mesure." }),
  makeScenario({ id: "reconsentement", title: "Évaluer un besoin de reconsentement", description: "Une nouvelle information ou modification peut nécessiter une vérification du consentement.", category: "Consentement", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["reconsentement", "reconsent", "nouvelle information", "amendement"], phases: ["Suivi", "Qualité"], example: "Une information modifiée devient disponible. L’équipe détermine, selon les approbations et procédures applicables, les participants et étapes concernés." }),
  makeScenario({ id: "retrait-consentement", title: "Retrait du consentement", description: "Un participant exprime son souhait de ne plus participer ou de limiter l’usage de certaines informations.", category: "Consentement", severity: "HAUTE", status: "VERIFIED", keywords: ["retrait", "consentement", "arrêt", "withdrawal"], phases: ["Suivi"], documents: ["Consentement applicable", "Procédure de retrait", "Dossier source", "Documentation de communication"], example: "Un participant indique ne plus vouloir poursuivre. L’équipe évite toute pression, vérifie la procédure et explique les conséquences applicables avec les responsables compétents." }),
  makeScenario({ id: "signalement-securite", title: "Événement de sécurité à évaluer", description: "Un événement de sécurité, une hospitalisation ou une grossesse doit être évalué dans le circuit applicable.", category: "Sécurité", severity: "CRITIQUE", status: "VERIFIED", keywords: ["SAE", "événement", "hospitalisation", "grossesse", "décès", "sécurité", "adverse"], phases: ["Intervention", "Suivi", "Pharmacovigilance"], actions: ["Priorité immédiate à la sécurité et aux soins du participant.", "Appliquer sans délai le protocole et le circuit de sécurité du site ou du promoteur.", "Ne pas attribuer automatiquement une catégorie réglementaire sans informations et responsabilité compétente.", "Documenter les faits et les horodatages pertinents conformément aux procédures applicables."], example: "Un événement est porté à la connaissance de l’équipe. La plateforme oriente vers la prise en charge, le protocole et le circuit de sécurité, sans statuer elle-même sur une catégorisation réglementaire." }),
  makeScenario({ id: "erreur-randomisation", title: "Erreur de randomisation ou d’allocation", description: "Une attribution, stratification ou séquence peut ne pas correspondre au processus prévu.", category: "Randomisation", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["randomisation", "allocation", "IWRS", "IVRS", "bras", "stratification"], phases: ["Randomisation"], example: "Une incohérence d’attribution est signalée. L’équipe préserve l’aveugle lorsque nécessaire et suit le circuit d’escalade prévu." }),
  makeScenario({ id: "mauvais-traitement", title: "Traitement ou intervention potentiellement incorrecte", description: "Une administration, un produit ou une dose doit être vérifié(e).", category: "Intervention", severity: "CRITIQUE", status: "NEEDS_REVIEW", keywords: ["mauvais traitement", "mauvaise dose", "administration", "produit", "traitement oublié"], phases: ["Intervention"], example: "Une différence entre le traitement prévu et l’administration constatée est rapportée. La priorité est l’évaluation du participant et le respect du circuit prévu." }),
  makeScenario({ id: "temperature-excursion", title: "Excursion de température", description: "Une condition de stockage ou de transport du produit investigational doit être évaluée.", category: "Pharmacie", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["température", "excursion", "stockage", "pharmacie", "chaîne du froid"], phases: ["Intervention", "Qualité"], example: "Un enregistreur indique une excursion. L’équipe isole la situation selon la procédure, conserve les relevés et sollicite la décision habilitée." }),
  makeScenario({ id: "produit-manquant", title: "Produit investigational indisponible", description: "Un produit, kit ou matériel requis est indisponible pour une étape prévue.", category: "Pharmacie", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["produit manquant", "rupture", "kit", "stock", "indisponible"], phases: ["Intervention"], example: "Le produit n’est pas disponible au moment prévu. L’équipe ne substitue pas une conduite sans validation et vérifie le plan applicable." }),
  makeScenario({ id: "query-non-resolue", title: "Query ou incohérence de données non résolue", description: "Une query reste ouverte ou une donnée nécessite une clarification.", category: "Données", severity: "NORMALE", status: "VERIFIED", keywords: ["query", "DCF", "incohérence", "eCRF", "donnée"], phases: ["Gestion des données"], example: "Une query demeure ouverte. L’équipe vérifie la source, maintient l’audit trail et répond dans le processus défini." }),
  makeScenario({ id: "donnee-manquante", title: "Donnée manquante", description: "Une information attendue est absente ou non disponible dans le flux de données.", category: "Données", severity: "NORMALE", status: "VERIFIED", keywords: ["donnée manquante", "missing data", "résultat manquant", "eCRF"], phases: ["Gestion des données", "Suivi"], example: "Un résultat attendu n’est pas disponible. L’équipe établit s’il est récupérable, documente la situation et suit la stratégie définie." }),
  makeScenario({ id: "deviation-protocole", title: "Déviation au protocole", description: "Une activité semble s’écarter du protocole ou d’une procédure approuvée.", category: "Déviations", severity: "HAUTE", status: "VERIFIED", keywords: ["déviation", "protocole", "violation", "non-conformité"], phases: ["Inclusion", "Intervention", "Suivi", "Qualité"], example: "Une procédure n’a pas été réalisée comme prévu. Les faits sont sécurisés et l’impact est évalué selon la gouvernance de l’essai." }),
  makeScenario({ id: "capa", title: "CAPA à évaluer", description: "Une cause récurrente ou systémique peut nécessiter une action corrective et préventive.", category: "Qualité", severity: "NORMALE", status: "NEEDS_REVIEW", keywords: ["CAPA", "cause", "récurrent", "corrective", "préventive"], phases: ["Qualité"], example: "Plusieurs erreurs comparables sont observées. L’équipe analyse les causes avec les personnes compétentes avant de définir des mesures et leur vérification d’efficacité." }),
  makeScenario({ id: "monitoring-probleme", title: "Problème identifié au monitoring", description: "Une observation de monitoring nécessite une action, une clarification ou un suivi.", category: "Monitoring", severity: "NORMALE", status: "VERIFIED", keywords: ["monitoring", "CRA", "visite de monitoring", "observation"], phases: ["Monitoring"], example: "Le moniteur identifie une observation. L’équipe convient d’une action traçable, d’un responsable et d’une échéance définie par les procédures." }),
  makeScenario({ id: "recrutement-insuffisant", title: "Recrutement insuffisant", description: "Le centre n’atteint pas sa trajectoire de recrutement attendue.", category: "Faisabilité", severity: "NORMALE", status: "NEEDS_REVIEW", keywords: ["recrutement", "inclusion faible", "enrollment", "centre"], phases: ["Faisabilité", "Inclusion"], example: "Le recrutement est inférieur aux attentes. L’équipe vérifie les causes opérationnelles, les contraintes éthiques et le plan de recrutement autorisé." }),
  makeScenario({ id: "step-wedge-transition", title: "Transition dans un essai step-wedge", description: "Un centre doit passer de la condition contrôle à la condition intervention.", category: "Essais complexes", severity: "HAUTE", status: "NEEDS_REVIEW", complex: true, keywords: ["step-wedge", "transition", "cluster", "contrôle", "intervention"], phases: ["Intervention", "Suivi"], example: "Avant une transition, le centre vérifie le calendrier, la formation, la disponibilité des outils et les règles de capture des données autour de la date pivot." }),
  makeScenario({ id: "cross-over-periode", title: "Période ou séquence cross-over incorrecte", description: "La période, la séquence ou le washout doit être contrôlé.", category: "Essais complexes", severity: "HAUTE", status: "NEEDS_REVIEW", complex: true, keywords: ["cross-over", "washout", "séquence", "période"], phases: ["Intervention", "Suivi"], example: "Une période semble ne pas correspondre à la séquence prévue. L’équipe vérifie le calendrier et préserve l’intégrité du design." }),
  makeScenario({ id: "cluster-allocation", title: "Problème d’allocation de cluster", description: "Un cluster semble exposé à une condition différente de celle prévue.", category: "Essais complexes", severity: "HAUTE", status: "NEEDS_REVIEW", complex: true, keywords: ["cluster", "allocation", "contamination", "groupe"], phases: ["Intervention"], example: "Une possible contamination est signalée. L’équipe documente les faits et sollicite la gouvernance scientifique et opérationnelle prévue." }),
  makeScenario({ id: "master-protocol-version", title: "Incohérence dans un master protocol", description: "Un sous-protocole, une branche ou une version nécessite une vérification de cohérence.", category: "Essais complexes", severity: "HAUTE", status: "NEEDS_REVIEW", complex: true, keywords: ["master protocol", "sous-protocole", "branche", "version"], phases: ["Préparation réglementaire", "Intervention"], example: "Une version de sous-protocole diffère de la version master. L’équipe vérifie les dépendances et la gouvernance de changement avant toute action." }),
  makeScenario({ id: "audit", title: "Préparation ou constat d’audit", description: "Un audit est annoncé ou un constat doit être traité.", category: "Qualité", severity: "NORMALE", status: "NEEDS_REVIEW", keywords: ["audit", "audit finding", "constat", "inspection"], phases: ["Qualité"], example: "Un constat est reçu. L’équipe conserve les éléments, analyse la cause, élabore une réponse proportionnée et suit l’efficacité des actions." }),
  makeScenario({ id: "inspection", title: "Préparation ou constat d’inspection", description: "Une inspection ou une demande d’autorité nécessite un circuit contrôlé.", category: "Qualité", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["inspection", "autorité", "inspecteur", "réglementaire"], phases: ["Qualité", "Préparation réglementaire"], example: "Une demande d’inspection arrive. L’équipe active le circuit d’inspection, centralise les versions documentaires et évite toute réponse non validée." }),
  makeScenario({ id: "laboratoire-etiquetage", title: "Problème d’étiquetage ou d’échantillon", description: "Un prélèvement, un tube ou une étiquette peut ne pas être conforme au processus défini.", category: "Laboratoire", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["échantillon", "tube", "étiquetage", "prélèvement", "laboratoire"], phases: ["Suivi", "Laboratoire"], example: "Un échantillon est identifié comme douteux. L’équipe consulte le manuel de laboratoire et la procédure de traçabilité avant de conclure." }),
  makeScenario({ id: "amenagement-amendement", title: "Amendement ou modification à déployer", description: "Une nouvelle version de protocole ou procédure doit être mise en œuvre.", category: "Protocole", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["amendement", "nouvelle version", "protocole", "déploiement"], phases: ["Préparation réglementaire", "Formation", "Activation"], example: "Un amendement est approuvé dans un périmètre. Le centre vérifie les conditions d’activation, les formations et les documents associés." }),
  makeScenario({ id: "systeme-indisponible", title: "Système clinique indisponible", description: "Un système tel qu’IWRS, eCRF ou outil de saisie est indisponible.", category: "Système", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["système", "indisponible", "IWRS", "eCRF", "panne"], phases: ["Randomisation", "Gestion des données"], example: "Un système est indisponible. L’équipe consulte le plan de continuité et n’improvise pas de procédure de contournement non autorisée." }),
  makeScenario({ id: "centre-activation", title: "Centre non prêt à l’activation", description: "Des prérequis d’activation peuvent rester incomplets.", category: "Activation", severity: "NORMALE", status: "NEEDS_REVIEW", keywords: ["activation", "centre", "pré-requis", "formation"], phases: ["Activation"], example: "Un prérequis de centre est incomplet. L’équipe utilise la checklist d’activation et reporte la décision au circuit habilité." }),
  makeScenario({ id: "close-out", title: "Préparation de close-out", description: "Le centre prépare sa clôture et doit vérifier les activités restantes.", category: "Fin d’étude", severity: "NORMALE", status: "NEEDS_REVIEW", keywords: ["close-out", "clôture", "archivage", "dernière visite"], phases: ["Clôture", "Archivage"], example: "Avant close-out, l’équipe réconcilie les actions, produits, données et documents essentiels selon les procédures applicables." }),
  makeScenario({ id: "question-ambiguë", title: "Situation à préciser", description: "Le problème décrit ne permet pas d’identifier un workflow fiable.", category: "Clarification", severity: "NORMALE", status: "VERIFIED", keywords: ["problème", "patient", "aide", "question"], questions: ["Quel est le fait observé ?", "La sécurité ou les droits du participant sont-ils potentiellement concernés ?", "Quelle est la phase de l’étude ?", "Quelle juridiction et quelles procédures s’appliquent ?"], example: "Une question trop générale est reçue. La plateforme demande le minimum de contexte nécessaire et rappelle de ne pas saisir de données identifiantes." }),
  makeScenario({ id: "deviation-consentement", title: "Déviation liée au consentement", description: "Un écart potentiel dans le processus de consentement doit être évalué.", category: "Déviations", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["déviation consentement", "consentement signé", "signature", "date"], phases: ["Screening", "Inclusion"], example: "Une date ou signature doit être vérifiée. L’équipe conserve l’original, vérifie le processus applicable et suit l’escalade prévue." }),
  makeScenario({ id: "donnees-source", title: "Incohérence entre source et eCRF", description: "Une divergence entre une donnée source et une donnée saisie doit être revue.", category: "Données", severity: "NORMALE", status: "VERIFIED", keywords: ["source", "eCRF", "incohérence", "SDV"], phases: ["Gestion des données", "Monitoring"], example: "Une divergence est observée. L’équipe examine le dossier source et applique le processus de correction préservant l’audit trail." }),
];

export const glossary = [
  ["AE", "Événement indésirable rapporté ou observé pendant une étude ; sa qualification dépend du contexte applicable."], ["SAE", "Événement indésirable grave : la qualification et les circuits de signalement doivent être confirmés par les procédures applicables."], ["SUSAR", "Terme de pharmacovigilance dont l’application nécessite une évaluation spécialisée et les règles pertinentes."], ["ARC", "Attaché de recherche clinique ; le périmètre de ses activités dépend de son organisation et de sa délégation."], ["CRA", "Clinical Research Associate ; souvent utilisé comme équivalent d’ARC."], ["CRC", "Clinical Research Coordinator ; coordination opérationnelle du centre selon le rôle attribué."], ["TEC", "Technicien d’études cliniques."], ["GCP", "Bonnes pratiques cliniques, cadre éthique, scientifique et qualité pour les essais impliquant des participants humains."], ["CAPA", "Action corrective et préventive issue d’une analyse de cause et d’un suivi d’efficacité."], ["CRF", "Case Report Form, support de recueil des données prévues par le protocole."], ["eCRF", "CRF électronique ; les corrections doivent préserver un audit trail."], ["DCF", "Data Clarification Form ou demande de clarification de donnée."], ["IWRS", "Système interactif de réponse web utilisé selon les études, notamment pour la randomisation et le produit."], ["IVRS", "Système interactif de réponse vocale utilisé selon les études."], ["SDV", "Source Data Verification, vérification de données par rapport à leur source."], ["SDR", "Source Data Review, revue de données source."], ["RBM", "Risk-Based Monitoring, approche de monitoring basée sur les risques."], ["QTL", "Quality Tolerance Limit, limite définie pour surveiller des facteurs de qualité."], ["IRB", "Institutional Review Board, comité de revue éthique dans certains contextes."], ["IEC", "Independent Ethics Committee, comité d’éthique indépendant."], ["SOP", "Standard Operating Procedure, procédure opératoire normalisée."], ["Promoteur", "Entité assumant les responsabilités réglementaires et de gouvernance qui lui sont attribuées."], ["Investigateur", "Professionnel responsable de la conduite de l’essai au centre selon les règles applicables."], ["Monitoring", "Activité de supervision de l’essai selon une approche définie et proportionnée."], ["Audit", "Examen indépendant et systématique des activités et documents liés à l’essai."], ["Inspection", "Examen officiel conduit par une autorité compétente ou entité habilitée."], ["Déviation", "Écart par rapport au protocole ou à une procédure ; la définition et la classification applicables doivent être vérifiées."], ["Randomisation", "Affectation suivant une méthode prédéfinie pour limiter certains biais."], ["Aveugle", "Dispositif visant à limiter la connaissance d’une allocation ou information susceptible d’introduire un biais."], ["Washout", "Période d’élimination ou d’absence d’intervention prévue par certains essais cross-over."], ["Endpoint", "Critère de jugement utilisé pour répondre à un objectif de l’étude."], ["Screening", "Étapes de vérification préalables à l’inclusion."], ["Inclusion", "Entrée d’un participant dans l’étude selon les critères et procédures applicables."], ["Follow-up", "Suivi des participants ou des actions après une étape donnée."], ["Data lock", "Finalisation contrôlée de la base avant certaines analyses ; la procédure varie selon l’étude."], ["Audit trail", "Traçabilité des créations, modifications et opérations sur une donnée ou un système."], ["Amendement", "Modification formalisée d’un protocole ou document d’étude."], ["Version", "État identifié et daté d’un document ou contenu."], ["Réconciliation", "Comparaison contrôlée de sources ou jeux de données pour résoudre les divergences."], ["Accountability", "Traçabilité et rapprochement des produits investigational selon la procédure applicable."], ["Excursion", "Écart par rapport à une condition de conservation ou de transport spécifiée."], ["Cluster", "Groupe, centre ou unité pouvant être l’unité d’allocation dans un essai cluster."], ["Step-wedge", "Design dans lequel les clusters changent progressivement de condition selon un calendrier prédéfini."], ["Master protocol", "Cadre maître pouvant organiser plusieurs sous-études ou cohortes selon une gouvernance commune."], ["Basket trial", "Design regroupant généralement plusieurs cohortes autour d’une caractéristique partagée."], ["Umbrella trial", "Design couvrant plusieurs interventions ou sous-études au sein d’une population ou maladie définie."], ["Platform trial", "Infrastructure d’essai pouvant intégrer ou retirer des interventions suivant une gouvernance définie."], ["Pseudonymisation", "Traitement réduisant le lien direct avec une identité, sans équivaloir nécessairement à l’anonymisation."], ["Minimisation des données", "Principe consistant à ne collecter que les informations nécessaires à une finalité définie."], ["Juridiction", "Cadre territorial et réglementaire à confirmer avant toute conclusion normative."],
].map(([term, definition]) => ({ term, definition }));

export const sourceById = (id: string) => sources.find(source => source.id === id);
