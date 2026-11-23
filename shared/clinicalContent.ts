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
    id: "ich-e6r3-principles", title: "ICH E6(R3), Principles & Annex 1", publisher: "ICH / EMA",
    url: "https://www.ema.europa.eu/en/ich-e6-good-clinical-practice-scientific-guideline",
    jurisdiction: "International / UE", publishedAt: "2025-01-27", verifiedAt: "2026-08-15", nextReviewAt: "2027-01-15", status: "VERIFIED", isOfficial: true,
    scope: "Version actuellement applicable des principes et de l’Annex 1 de l’ICH E6(R3), entrée en vigueur le 23 juillet 2025. Approche qualité par la conception, facteurs critiques pour la qualité, proportionnalité et gestion des risques.",
  },
  {
    id: "ich-e6r3-consolidated", title: "ICH E6(R3), Consolidated Guideline", publisher: "ICH / EMA",
    url: "https://www.ema.europa.eu/en/ich-e6-good-clinical-practice-scientific-guideline",
    jurisdiction: "International / UE", publishedAt: "2026-07-15", verifiedAt: "2026-08-15", nextReviewAt: "2027-01-15", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Version consolidée publiée en juillet 2026. Son entrée en vigueur est annoncée au 15 janvier 2027 : elle doit donc être distinguée de la version actuellement effective.",
  },
  {
    id: "ich-e6r3-annex2", title: "ICH E6(R3), Annex 2", publisher: "ICH / EMA",
    url: "https://www.ema.europa.eu/en/ich-e6-good-clinical-practice-scientific-guideline",
    jurisdiction: "International / UE", publishedAt: "2026-07-15", verifiedAt: "2026-08-15", nextReviewAt: "2027-01-15", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Annex 2 portant notamment sur certains designs pragmatiques, décentralisés et l’usage de sources de données du monde réel. Effective annoncée au 15 janvier 2027.",
  },
  {
    id: "spirit-2025", title: "SPIRIT 2025, protocoles d’essais randomisés", publisher: "SPIRIT / BMJ",
    url: "https://www.consort-spirit.org/published-statements",
    jurisdiction: "International", publishedAt: "2025-04-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-04-01", status: "VERIFIED", isOfficial: false,
    scope: "Référence méthodologique actualisée pour la rédaction et la vérification des protocoles d’essais randomisés. Utiliser comme checklist de préparation, sans la transformer en exigence réglementaire universelle.",
  },
  {
    id: "consort-2025", title: "CONSORT 2025, reporting des essais randomisés", publisher: "CONSORT / EQUATOR",
    url: "https://www.equator-network.org/reporting-guidelines/consort/",
    jurisdiction: "International", publishedAt: "2025-04-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-04-01", status: "VERIFIED", isOfficial: false,
    scope: "Guideline de reporting pour les essais randomisés. À utiliser pour préparer la transparence du reporting, sans confondre guideline de publication et obligation réglementaire.",
  },
  {
    id: "ich-e9-r1", title: "ICH E9 / E9(R1), Statistical Principles & Estimands", publisher: "ICH / EMA",
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
    id: "eu-ctr-536-2014", title: "Règlement (UE) n° 536/2014, Clinical Trials Regulation", publisher: "Union européenne / EUR-Lex",
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
    id: "ema-ctis-handbook", title: "CTIS Sponsor Handbook", publisher: "Agence européenne des médicaments",
    url: "https://www.ema.europa.eu/en/human-regulatory-overview/research-development/clinical-trials-human-medicines/clinical-trials-information-system-ctis-training-support",
    jurisdiction: "Union européenne / EEE", publishedAt: "2026-07-17", verifiedAt: "2026-11-21", nextReviewAt: "2027-02-21", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Référence opérationnelle pour les promoteurs utilisant CTIS ; la page EMA indique une dernière mise à jour du handbook au 17 juillet 2026 et des mises à jour régulières, vérifier la version courante avant usage.",
  },
  {
    id: "cnil-mr001-2026", title: "MR-001, Recherches en santé avec recueil du consentement", publisher: "CNIL",
    url: "https://www.cnil.fr/fr/methodologie-de-reference-mr-001-recherches-sante-avec-recueil-du-consentement",
    jurisdiction: "France", publishedAt: "2026-05-26", verifiedAt: "2026-08-15", nextReviewAt: "2026-11-26", status: "VERIFIED", isOfficial: true,
    scope: "Méthodologie de référence française mise à jour en 2026 pour certains traitements de données dans les recherches en santé nécessitant le recueil du consentement.",
  },
  {
    id: "cnil-mr003-2026", title: "MR-003, Recherches en santé sans recueil du consentement", publisher: "CNIL",
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
    id: "who-trial-registration", title: "WHO, Clinical trial registration", publisher: "Organisation mondiale de la Santé",
    url: "https://www.who.int/news-room/questions-and-answers/item/clinical-trials",
    jurisdiction: "International", publishedAt: "2020-01-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-01-01", status: "VERIFIED", isOfficial: true,
    scope: "L’OMS indique que les essais doivent être enregistrés avant le recrutement du premier participant et que l’ICTRP n’est pas lui-même un registre dans lequel l’essai est enregistré directement.",
  },
  {
    id: "fda-adaptive-2019", title: "FDA, Adaptive Design Clinical Trials for Drugs and Biologics", publisher: "U.S. FDA",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/adaptive-design-clinical-trials-drugs-and-biologics-guidance-industry",
    jurisdiction: "États-Unis", publishedAt: "2019-12-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-06-01", status: "VERIFIED", isOfficial: true,
    scope: "Guidance finale sur les designs adaptatifs pour médicaments et biologiques, avec principes de planification, conduite, analyse et présentation des informations utiles à l’évaluation.",
  },
  {
    id: "fda-e20-adaptive-draft", title: "ICH E20, Adaptive Designs for Clinical Trials", publisher: "FDA / ICH",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/e20-adaptive-designs-clinical-trials",
    jurisdiction: "International / États-Unis", publishedAt: "2025-09-01", verifiedAt: "2026-08-16", nextReviewAt: "2026-12-01", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Projet de guidance ICH E20 publié en 2025. Marqué comme draft et non applicable comme guidance finale tant qu’il n’est pas adopté dans le périmètre concerné.",
  },
  {
    id: "tidier", title: "TIDieR, intervention description and replication", publisher: "EQUATOR Network / BMJ",
    url: "https://www.equator-network.org/reporting-guidelines/tidier/",
    jurisdiction: "International", publishedAt: "2014-03-01", verifiedAt: "2026-08-16", nextReviewAt: "2027-03-01", status: "VERIFIED", isOfficial: false,
    scope: "Checklist de description structurée des interventions afin de permettre leur compréhension et leur réplication.",
  },
  {
    id: "benin-loi-2010-40", title: "Loi n° 2010-40 du 8 décembre 2010, Code d’éthique et de déontologie de la recherche en santé", publisher: "République du Bénin (SGG)",
    url: "https://sgg.gouv.bj/doc/loi-2010-40/download",
    jurisdiction: "Bénin", publishedAt: "2010-12-08", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Texte authentique (SGG) créant le CNERS et encadrant l’éthique de la recherche en santé au Bénin ; la version consolidée en vigueur doit être confirmée auprès du SGG.",
  },
  {
    id: "benin-loi-2021-03", title: "Loi n° 2021-03 du 1er février 2021, organisation des activités pharmaceutiques", publisher: "République du Bénin (SGG)",
    url: "https://sgg.gouv.bj/doc/loi-2021-03/download",
    jurisdiction: "Bénin", publishedAt: "2021-02-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Texte authentique (SGG) du cadre pharmaceutique national ; son article 80 fonde la supervision des essais cliniques par l’ABMed. Version consolidée à confirmer auprès du SGG.",
  },
  {
    id: "abmed-ec-ld-0001", title: "Lignes directrices relatives à la conduite des essais cliniques au Bénin (EC-LD-0001, v1)", publisher: "ABMed, Agence béninoise du Médicament et des autres produits de santé",
    url: "https://abmed.bj/lirePDF/c8e5bd19-8591-4079-bcb7-c4485be766db",
    jurisdiction: "Bénin", publishedAt: "2025-09-12", verifiedAt: "2026-11-21", nextReviewAt: "2027-03-12", status: "VERIFIED", isOfficial: true,
    scope: "Document de 114 pages applicable depuis le 12 septembre 2025 : demande d’AEC en français via service-public.bj, redevances en ligne, instruction visée à 60 jours ouvrables (30 en voie accélérée), validité conditionnée au rapport annuel et aux inspections BPC, enregistrement PACTR exigé.",
  },
  {
    id: "cners-benin", title: "Comité national d’éthique pour la recherche en santé (CNERS)", publisher: "CNERS, République du Bénin",
    url: "https://ethique-sante.org/",
    jurisdiction: "Bénin", publishedAt: "2010-12-08", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Comité national créé par la loi n° 2010-40 ; examine les protocoles et supervise le respect des considérations éthiques pendant la recherche. Sa procédure d'évaluation détaillée n'est pas confirmée par les sources citées : à vérifier auprès du CNERS.",
  },
  {
    id: "benin-code-numerique-2017-20", title: "Loi n° 2017-20 du 20 avril 2018 portant code du numérique (Livre 5 : données personnelles)", publisher: "République du Bénin / APDP",
    url: "https://archive.apdp.bj/lois/la-loi-n-2017-20-portant-code-du-numerique-en-republique-du-benin/",
    jurisdiction: "Bénin", publishedAt: "2018-04-20", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Texte authentique (APDP) ; livre 5 relatif à la protection des données personnelles et de la vie privée, l’APDP étant l’autorité de contrôle. Version consolidée et textes d’application à confirmer.",
  },
  {
    id: "pactr", title: "Pan African Clinical Trials Registry (PACTR)", publisher: "South African Medical Research Council",
    url: "https://pactr.samrc.ac.za/",
    jurisdiction: "Afrique", publishedAt: "2009-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Registre panafricain des essais cliniques ; les lignes directrices ABMed exigent l’enregistrement PACTR et la mention du numéro dans la demande d’AEC.",
  },
  {
    id: "nida-gcp", title: "NIDA Clinical Trials Network, Good Clinical Practice course", publisher: "NIDA / NIH",
    url: "https://gcp.nidatraining.org/",
    jurisdiction: "International", publishedAt: "2020-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Formation GCP en ligne gratuite en anglais, avec certificat ; utilisée comme base de formation initiale ou de renouvellement selon les SOP.",
  },
  {
    id: "tghn-training-centre", title: "The Global Health Network, Training Centre", publisher: "The Global Health Network (University of Oxford)",
    url: "https://globalhealthtrainingcentre.tghn.org/",
    jurisdiction: "International", publishedAt: "2020-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: false,
    scope: "Plateforme gratuite de cours et ressources (GCP, éthique, data management, méthodes) particulièrement orientée recherche en contextes à ressources limitées, dont l’Afrique.",
  },
  {
    id: "citi-program", title: "CITI Program, Research, Ethics, and Compliance Training", publisher: "CITI Program",
    url: "https://www.citiprogram.org/",
    jurisdiction: "International", publishedAt: "2000-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: false,
    scope: "Formations GCP, éthique et conformité largement reconnues ; accès le plus souvent payant ou via une affiliation institutionnelle.",
  },
  {
    id: "who-ictrp", title: "WHO ICTRP, International Clinical Trials Registry Platform", publisher: "Organisation mondiale de la Santé",
    url: "https://trialsearch.who.int/",
    jurisdiction: "International", publishedAt: "2007-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Portail de recherche OMS agrégeant les registres d’essais ; l’ICTRP n’est pas un registre d’enregistrement direct.",
  },
  {
    id: "clinicaltrials-gov", title: "ClinicalTrials.gov", publisher: "U.S. National Library of Medicine",
    url: "https://clinicaltrials.gov/",
    jurisdiction: "International / États-Unis", publishedAt: "2000-02-29", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Registre public d’essais ; l’enregistrement et le dépôt de résultats y relèvent de règles propres à certains promoteurs et études.",
  },
  {
    id: "clinregs-niaid", title: "ClinRegs, country clinical research regulatory information", publisher: "NIAID / NIH",
    url: "https://clinregs.niaid.nih.gov/",
    jurisdiction: "International", publishedAt: "2015-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Base publique de synthèses réglementaires par pays ; la couverture dépend des priorités du NIAID et ne remplace pas les sources nationales.",
  },
  {
    id: "equator-network", title: "EQUATOR Network, reporting guidelines", publisher: "EQUATOR Network",
    url: "https://www.equator-network.org/",
    jurisdiction: "International", publishedAt: "2008-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: false,
    scope: "Catalogue de guidelines de reporting (CONSORT, STROBE, SPIRIT, PRISMA…) ; outil de transparence, pas une obligation réglementaire en soi.",
  },
  {
    id: "vigiaccess", title: "VigiAccess", publisher: "OMS / Uppsala Monitoring Centre",
    url: "https://vigiaccess.org/",
    jurisdiction: "International", publishedAt: "2015-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Accès public aux données déclarées de pharmacovigilance de VigiBase ; une signal statistique n’est pas une causalité établie.",
  },
  {
    id: "prisma-2020", title: "PRISMA 2020 Statement", publisher: "PRISMA Group",
    url: "https://www.prisma-statement.org/",
    jurisdiction: "International", publishedAt: "2021-03-29", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: false,
    scope: "Guideline de reporting des revues systématiques et méta-analyses ; utile pour structurer la transparence d’une revue.",
  },
  {
    id: "prospero", title: "PROSPERO, registre international des revues systématiques", publisher: "University of York / CRD / NIHR",
    url: "https://www.crd.york.ac.uk/prospero/",
    jurisdiction: "International", publishedAt: "2011-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: false,
    scope: "Enregistrement prospectif gratuit des protocoles de revues systématiques à visée santé.",
  },
  {
    id: "eu-rgpd-2016-679", title: "Règlement (UE) 2016/679, RGPD", publisher: "Union européenne / EUR-Lex",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    jurisdiction: "Union européenne / EEE", publishedAt: "2016-04-27", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Cadre européen de protection des données personnelles applicable aux traitements de données de recherche ; articulation avec les règles nationales (en France : CNIL, MR-001/003) à vérifier par traitement.",
  },
  {
    id: "fr-loi-jarde-2012-300", title: "Loi n° 2012-300 du 5 mars 2012 relative aux recherches impliquant la personne humaine (loi Jardé)", publisher: "République française / Légifrance",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000025441587",
    jurisdiction: "France", publishedAt: "2012-03-05", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "NEEDS_REVIEW", isOfficial: true,
    scope: "Texte authentique (JORF) de la loi Jardé ; l’état applicable se lit dans le code de la santé publique consolidé, vérifier la version courante avant toute conclusion.",
  },
  {
    id: "eu-mdr-2017-745", title: "Règlement (UE) 2017/745, dispositifs médicaux (MDR)", publisher: "Union européenne / EUR-Lex",
    url: "https://eur-lex.europa.eu/eli/reg/2017/745/oj",
    jurisdiction: "Union européenne / EEE", publishedAt: "2017-04-05", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Cadre européen des dispositifs médicaux, incluant les investigations cliniques de DM ; le CTR 536/2014 ne s’applique pas aux essais de DM.",
  },
  {
    id: "iso-14155-2026", title: "ISO 14155:2026, investigations cliniques de dispositifs médicaux, BPC", publisher: "ISO",
    url: "https://www.iso.org/standard/83968.html",
    jurisdiction: "International", publishedAt: "2026-03-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Norme de bonnes pratiques cliniques pour les investigations de dispositifs médicaux ; édition 4 (mars 2026), édition courante confirmée sur le site ISO, l’édition 2020 étant retirée. Norme payante.",
  },
  {
    id: "eudralex-vol-10", title: "EudraLex, Volume 10, essais cliniques", publisher: "Commission européenne",
    url: "https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-10_en",
    jurisdiction: "Union européenne / EEE", publishedAt: "2020-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Recueil des lignes directrices européennes sur les essais cliniques de médicaments ; distinguer les textes CTR des héritages de la directive 2001/20/CE.",
  },
  {
    id: "edctp", title: "EDCTP, partenariat Europe–Afrique pour les essais cliniques", publisher: "EDCTP / Global Health EDCTP3",
    url: "https://www.edctp.org/",
    jurisdiction: "Union européenne / Afrique", publishedAt: "2003-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: false,
    scope: "Partenariat public financant des essais cliniques en Afrique subsaharienne avec partenaires européens ; utile pour identifier financements et réseaux, un financement n’est pas une autorisation.",
  },
  {
    id: "adrreports-eu", title: "Base européenne des rapports d’effets indésirables (adrreports.eu)", publisher: "Agence européenne des médicaments",
    url: "https://www.adrreports.eu/",
    jurisdiction: "Union européenne / EEE", publishedAt: "2017-01-01", verifiedAt: "2026-11-21", nextReviewAt: "2027-05-21", status: "VERIFIED", isOfficial: true,
    scope: "Rapports publics d’effets indésirables suspectés issus d’EudraVigilance ; un signalement suspecté n’établit pas une relation de causalité.",
  },
  {
    id: "senegal-arp-essais", title: "Supervision des essais cliniques (ARP Sénégal)", publisher: "Agence sénégalaise de Réglementation pharmaceutique",
    url: "https://arp.sn/fonctions-reglementaires/essais-cliniques",
    jurisdiction: "Sénégal", publishedAt: "2023-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Page officielle de supervision des essais cliniques : registre public, formulaires et ligne directrice nationale ; année de publication indicative, la page n’affiche pas de date. Confirmer la version en vigueur auprès de l’ARP.",
  },
  {
    id: "senegal-decret-2023-2422", title: "Décret n° 2023-2422 du 27 décembre 2023 relatif aux essais cliniques (Sénégal)", publisher: "République du Sénégal / ARP",
    url: "https://arp.sn/publications/decret-n-2023-2422-du-27-decembre-2023-relatif-aux-essais-cliniques",
    jurisdiction: "Sénégal", publishedAt: "2023-12-27", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Texte national de référence pour les essais cliniques au Sénégal, publié par l’ARP ; à lire dans sa version authentique complète avant tout dépôt.",
  },
  {
    id: "senegal-cners", title: "Comité National d’Éthique pour la Recherche en Santé (Sénégal)", publisher: "CNERS, République du Sénégal",
    url: "https://www.cners.sn/",
    jurisdiction: "Sénégal", publishedAt: "2009-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Comité national d’éthique institué sous la loi n° 2009-17 portant Code d’éthique pour la recherche en santé ; dépôt, sessions et redevances à confirmer auprès du comité. Année indicative pour la loi, date exacte sur le texte authentique.",
  },
  {
    id: "cote-divoire-airp", title: "Registre public des essais cliniques (AIRP Côte d’Ivoire)", publisher: "Autorité Ivoirienne de Régulation Pharmaceutique",
    url: "https://sigir.airp.ci/portail-public/essais-cliniques",
    jurisdiction: "Côte d’Ivoire", publishedAt: "2017-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Registre des essais autorisés ou refusés ; un essai n’est conduit en Côte d’Ivoire qu’avec l’autorisation de l’AIRP (loi n° 2017-541). Année indicative ; le texte authentique fait foi.",
  },
  {
    id: "ghana-fda-cta", title: "Clinical Trials Authorization (Ghana FDA)", publisher: "Food and Drugs Authority, Ghana",
    url: "https://fdaghana.gov.gh/services-2/clinical-trials-authorization-service/",
    jurisdiction: "Ghana", publishedAt: "2024-01-15", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Service officiel d’autorisation des essais cliniques ; guideline associée datée du 15 janvier 2024. L’avis éthique relève notamment du Ghana Health Service Ethics Review Committee.",
  },
  {
    id: "nigeria-nafdac-ct", title: "Clinical Trial Regulation (NAFDAC)", publisher: "National Agency for Food and Drug Administration and Control",
    url: "https://nafdac.gov.ng/drugs/clinical-trial-regulation/",
    jurisdiction: "Nigeria", publishedAt: "2021-10-22", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Voie officielle d’autorisation des essais cliniques au Nigeria ; guideline DER-GDL-002-02 effective depuis le 22/10/2021, révision annoncée au 21/10/2026. Vérifier l’édition applicable avant dépôt.",
  },
  {
    id: "nigeria-nhrec", title: "National Health Research Ethics Committee (Nigeria)", publisher: "NHREC, République fédérale du Nigeria",
    url: "https://nhrec.gov.ng/",
    jurisdiction: "Nigeria", publishedAt: "2014-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Comité national d’éthique de la recherche en santé : enregistrement des comités et normes éthiques nationales ; distinct de l’autorisation NAFDAC. Année indicative, page non datée.",
  },
  {
    id: "mali-dpm", title: "Direction de la Pharmacie et du Médicament (Mali)", publisher: "DPM, République du Mali",
    url: "https://dirpharma.ml/index.php/fr/services/notre-organisation",
    jurisdiction: "Mali", publishedAt: "2011-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Autorité compétente pour les essais cliniques (décret n° 2011-753, selon la synthèse ClinRegs du NIAID) ; la division assurance qualité couvre les essais cliniques. Année indicative du décret ; circuit exact à confirmer auprès de la DPM.",
  },
  {
    id: "mali-clinregs", title: "Profil ClinRegs du Mali (NIAID)", publisher: "NIAID / NIH",
    url: "https://clinregs.niaid.nih.gov/country/mali",
    jurisdiction: "Mali", publishedAt: "2021-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: false,
    scope: "Synthèse secondaire des exigences réglementaires et éthiques maliennes ; seul profil d’Afrique de l’Ouest disponible dans ClinRegs à cette date. L’absence de profil pour un pays ne signifie pas absence de règles nationales.",
  },
  {
    id: "waho-ooas", title: "Organisation Ouest Africaine de la Santé (OOAS / WAHO)", publisher: "OOAS, CEDEAO",
    url: "https://www.wahooas.org/web-ooas/fr",
    jurisdiction: "Afrique de l’Ouest", publishedAt: "2000-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: true,
    scope: "Institution régionale de la CEDEAO pour la coopération sanitaire ; harmonise et appuie les États sans délivrer les autorisations nationales. Année indicative, page non datée.",
  },
  {
    id: "hrweb-togo-cbrs", title: "Togo : fiche réglementaire recherche en santé (Health Research Web)", publisher: "Health Research Web (COHRED)",
    url: "https://healthresearchwebafrica.org.za/en/togo/research_regulation_1132",
    jurisdiction: "Togo", publishedAt: "2020-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "NEEDS_REVIEW", isOfficial: false,
    scope: "Source secondaire identifiant le Comité de Bioéthique pour la Recherche en Santé (CBRS) ; aucun portail national officiel vérifié à ce stade. Confirmation locale obligatoire.",
  },
  {
    id: "hrweb-burkina-cers", title: "Burkina Faso : fiche réglementaire recherche en santé (Health Research Web)", publisher: "Health Research Web (COHRED)",
    url: "https://healthresearchwebafrica.org.za/en/burkina_faso/research_regulation_988",
    jurisdiction: "Burkina Faso", publishedAt: "2020-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "NEEDS_REVIEW", isOfficial: false,
    scope: "Source secondaire identifiant le Comité d’Éthique pour la Recherche en Santé (CERS) ; aucun portail national officiel vérifié à ce stade. Confirmation locale obligatoire.",
  },
  {
    id: "hrweb-niger-ccne", title: "Niger : fiche réglementaire recherche en santé (Health Research Web)", publisher: "Health Research Web (COHRED)",
    url: "https://healthresearchwebafrica.org.za/en/niger/research_regulation_4197",
    jurisdiction: "Niger", publishedAt: "2020-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "NEEDS_REVIEW", isOfficial: false,
    scope: "Source secondaire identifiant le Comité Consultatif National d’Éthique (CCNE) ; aucun portail national officiel vérifié à ce stade. Confirmation locale obligatoire.",
  },
  {
    id: "benin-crec", title: "Centre de Recherche Entomologique de Cotonou (CREC)", publisher: "CREC, République du Bénin",
    url: "https://crec.bj/",
    jurisdiction: "Bénin", publishedAt: "2020-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: false,
    scope: "Établissement béninois de recherche dédié aux maladies transmissibles ; exemple de structure d’accueil ou d’encadrement, chaque collaboration restant à établir formellement. Année indicative, page non datée.",
  },
  {
    id: "benin-irsp-caq", title: "Institut Régional de Santé Publique (IRSP-CAQ), Ouidah", publisher: "IRSP-CAQ, Université d’Abomey-Calavi",
    url: "https://irsp-ouidah.org/fr",
    jurisdiction: "Bénin", publishedAt: "1977-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: false,
    scope: "Centre d’excellence de l’Université d’Abomey-Calavi : formation accréditée, recherche appliquée et expertise en santé publique pour l’Afrique ; piste de formation et d’encadrement à contacter directement.",
  },
  {
    id: "benin-ircb", title: "Institut de Recherche Clinique du Bénin (IRCB)", publisher: "IRCB",
    url: "https://ircbenin.bj/",
    jurisdiction: "Bénin", publishedAt: "2020-01-01", verifiedAt: "2026-11-22", nextReviewAt: "2027-05-22", status: "VERIFIED", isOfficial: false,
    scope: "Centre scientifique béninois dédié à la production de connaissances médicales ; piste d’ancrage local pour la recherche clinique, à vérifier selon le projet. Année indicative, page non datée.",
  },
];

// Une juridiction n’est considérée comme couverte que si le registre contient
// au moins une source explicitement marquée VERIFIED pour cette juridiction.
// Les juridictions sans source vérifiée restent sélectionnables, mais l’interface
// doit signaler que leur couverture est en construction.
export function hasVerifiedSourceForJurisdiction(jurisdiction: string) {
  return sources.some(source => source.jurisdiction === jurisdiction && source.status === "VERIFIED");
}

export { modules } from "./clinicalModules";
import { modules } from "./clinicalModules";

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
  makeScenario({ id: "soumission-aec-benin", title: "Préparer une demande d’autorisation d’essai clinique (AEC) au Bénin", description: "Un promoteur prépare la soumission d’un essai clinique de médicament au Bénin et doit réunir autorisations réglementaire et éthique.", category: "Réglementaire", severity: "HAUTE", status: "NEEDS_REVIEW", keywords: ["Bénin", "AEC", "ABMed", "CNERS", "autorisation", "service-public", "PACTR", "soumission"], phases: ["Préparation réglementaire"], jurisdictions: ["Bénin"], roles: ["Promoteur", "Regulatory", "Investigateur principal", "Coordinateur de recherche clinique"], questions: ["L’étude relève-t-elle du champ des lignes directrices ABMed EC-LD-0001 (médicament, DM, diagnostic) ?", "La version des lignes directrices utilisée est-elle celle en vigueur (v1 applicable depuis le 12/09/2025) ?", "L’essai est-il déjà enregistré au PACTR et le numéro disponible ?", "Qui porte le dossier auprès du CNERS et de l’ABMed ?"], actions: ["Confirmer auprès de l’ABMed la version en vigueur des lignes directrices EC-LD-0001 et la checklist des pièces.", "Préparer le dossier en français (protocole, fiches d’information et FCE) et confirmer auprès du CNERS les pièces d’évaluation scientifique exactes qu’il exige.", "Enregistrer l’essai au PACTR et reporter le numéro dans la lettre de demande.", "Déposer la demande d’AEC sur service-public.bj et payer les redevances en ligne, en conservant la quittance et le numéro PS attribué.", "Planifier le calendrier : instruction visée à 60 jours ouvrables, 30 en voie accélérée ; prévoir le rapport annuel d’avancement et la possibilité d’inspections BPC."], documents: ["Lignes directrices ABMed EC-LD-0001 (version en vigueur)", "Protocole et documents participants en français", "Rapports d’évaluation scientifique signés (canevas CNERS)", "Preuve d’enregistrement PACTR", "Quittance de paiement et numéro PS"], checks: ["Vérifier la version des lignes directrices et des redevances auprès de l’ABMed", "Vérifier la composition du dossier selon la checklist officielle", "Vérifier l’avis motivé du CNERS et l’autorisation administrative du ministère de la Santé", "Vérifier les obligations de protection des données (loi 2017-20, APDP)"], escalation: ["Toute incertitude sur le circuit applicable se résout auprès de l’ABMed ou du CNERS, pas par extrapolation d’un autre pays.", "Les délais indicatifs ne créent pas d’autorisation tacite : attendre la décision écrite."], mistakes: ["Ne pas déposer en anglais sans traduction certifiée conforme en français.", "Ne pas confondre avis du CNERS et autorisation d’essai clinique.", "Ne pas démarrer les inclusions avant autorisation écrite et activation des sites.", "Ne pas présenter les délais cibles comme des engagements de délai."], example: "Un promoteur prépare un essai de médicament à Cotonou : il vérifie la version EC-LD-0001 auprès de l’ABMed, confirme les pièces d’évaluation exigées par le CNERS et constitue le dossier d’avis, enregistre l’essai au PACTR, dépose la demande d’AEC sur service-public.bj avec paiement en ligne, puis suit l’instruction et conserve le numéro PS pour toute correspondance.", checklist: ["Version des lignes directrices confirmée", "Dossier complet en français", "Évaluations scientifiques jointes", "Enregistrement PACTR effectué", "Demande déposée et redevances payées", "Avis CNERS et autorisation obtenus avant inclusion", "Rapport annuel planifié"], referenceIds: ["abmed-ec-ld-0001", "benin-loi-2021-03", "benin-loi-2010-40", "pactr"] }),
  makeScenario({ id: "arc-preparation-visite-monitoring", title: "ARC : préparer et conduire une visite de monitoring", description: "Un ARC part en visite de monitoring dans un centre : préparation, conduite sur site et suivi, y compris la présentation des constats à l’équipe.", category: "Monitoring", severity: "NORMALE", status: "DRAFT", keywords: ["ARC", "monitoring", "visite", "préparation", "présentation", "constats", "SDV"], phases: ["Monitoring"], roles: ["ARC / CRA", "Coordinateur de recherche clinique", "Investigateur principal", "Chef de projet"], questions: ["La visite est-elle annoncée au centre avec un ordre du jour confirmé ?", "Le protocole, les amendements et les SOP en vigueur au centre sont-ils revus avant le départ ?", "Quelles requêtes, déviations et événements de sécurité restent ouverts ?", "Qui présente les constats de fin de visite et à qui ?", "Quels délais de réponse sont fixés dans la lettre de suivi ?"], actions: ["Avant : annoncer la visite par écrit au centre, confirmer date, ordre du jour et disponibilités (investigateur, pharmacie, laboratoire).", "Avant : revoir le protocole et ses amendements, le plan de monitoring, les lettres de suivi précédentes, les requêtes eCRF et le log de déviations ouverts.", "Avant : préparer les supports de la visite, dont la présentation d’ouverture et la trame de compte rendu.", "Pendant : vérifier les consentements, l’éligibilité, la concordance données source/eCRF, la sécurité, le produit (stock, températures) et le classeur investigateur.", "Pendant : présenter les constats à l’équipe en fin de visite, distinguer faits, risques et actions attendues, et noter les réponses immédiates.", "Après : rédiger la lettre de suivi avec constats et actions datées, suivre les réponses du centre et escalader tout blocage au chef de projet."], documents: ["Protocole et amendements applicables", "Plan de monitoring et lettres de suivi précédentes", "Log des déviations et requêtes ouvertes", "Classeur investigateur (ISF)", "Trame de présentation et de compte rendu de visite"], checks: ["Vérifier que la présentation des constats distingue faits observés et interprétations", "Vérifier les délais applicables aux réponses du centre", "Vérifier que chaque constat renvoie au protocole, aux SOP ou au document applicable"], escalation: ["Tout constat touchant la sécurité, les droits ou l’intégrité des données est escaladé sans attendre la fin de la visite.", "Un désaccord sur un constat est tranché par le circuit prévu (chef de projet, investigateur, qualité), pas par l’ARC seul."], mistakes: ["Ne pas arriver sans avoir revu les requêtes et déviations ouvertes.", "Ne pas présenter comme constat un point non vérifié dans les sources.", "Ne pas repartir sans que l’équipe ait entendu les constats principaux.", "Ne pas saisir de donnée permettant d’identifier directement un participant."], example: "Un ARC prépare sa première visite dans un centre de Cotonou : il annonce la visite deux semaines avant, revoit le protocole et les 14 requêtes ouvertes, prépare sa présentation. Sur site, il vérifie consentements et données source, puis présente 5 constats à l’investigateur en fin de journée. Sa lettre de suivi fixe une réponse à 15 jours, relancée par le chef de projet.", checklist: ["Visite annoncée et ordre du jour confirmé", "Protocole, plan de monitoring et historique revus", "Supports et présentation préparés", "Consentements, source, sécurité et produit vérifiés", "Constats présentés à l’équipe", "Lettre de suivi envoyée avec actions et délais"], referenceIds: ["ich-e6r3"] }),
  makeScenario({ id: "chef-projet-pilotage-essai", title: "Chef de projet : piloter un essai clinique", description: "Un chef de projet organise et suit un essai : planification, équipe, centres, indicateurs, incidents et clôture.", category: "Gestion de projet", severity: "NORMALE", status: "DRAFT", keywords: ["chef de projet", "pilotage", "planification", "équipe", "centres", "indicateurs", "coordination"], phases: ["Préparation", "Conduite", "Clôture"], roles: ["Chef de projet", "Promoteur", "ARC / CRA", "Data Manager"], questions: ["Le plan projet (objectifs, calendrier, budget, responsabilités) est-il validé par le promoteur ?", "La matrice de délégation et les formations de l’équipe sont-elles à jour ?", "Quels indicateurs suivent le recrutement, la qualité des données et la sécurité ?", "Quel circuit traite un incident dépassant le centre ou l’ARC ?"], actions: ["Avant : établir avec le promoteur le plan projet (calendrier, budget, livrables, responsabilités) et les SOP applicables.", "Avant : constituer l’équipe, documenter rôles et délégations, vérifier les formations BPC et spécifiques.", "Pendant : animer les réunions de suivi, suivre recrutement, requêtes, déviations et sécurité avec des indicateurs datés.", "Pendant : coordonner ARC, data management, pharmacie et centres ; escalader les blocages au promoteur.", "Après : organiser la clôture des centres, l’archivage et le rapport final avec les responsables désignés."], documents: ["Plan projet et calendrier validés", "Matrice de délégation", "Plan de monitoring et plan de gestion des données", "Comptes rendus de réunion et registres d’indicateurs"], checks: ["Vérifier que chaque responsabilité est attribuée par écrit", "Vérifier la cohérence calendrier/budget avec le protocole et les contrats", "Vérifier que les indicateurs remontent les écarts, pas seulement les avancements"], escalation: ["Un risque sécurité, éthique ou réglementaire majeur remonte immédiatement au promoteur et aux responsables désignés.", "Le chef de projet coordonne ; les décisions médicales et réglementaires restent aux rôles compétents."], mistakes: ["Ne pas piloter sans matrice de délégation écrite.", "Ne pas confondre coordination et décision médicale ou réglementaire.", "Ne pas laisser un indicateur d’alerte sans action datée.", "Ne pas saisir de donnée permettant d’identifier directement un participant."], example: "Une cheffe de projet lance un essai multicentrique : plan projet validé avec le promoteur, matrice de délégation signée, réunion de lancement, puis suivi hebdomadaire du recrutement et des requêtes ; un retard d’activation d’un centre est escaladé avec plan de rattrapage.", checklist: ["Plan projet validé", "Équipe et délégations documentées", "Formations vérifiées", "Indicateurs de suivi en place", "Incidents tracés et escaladés", "Clôture et archivage planifiés"], referenceIds: ["ich-e6r3", "who-best-practices"] }),
  makeScenario({ id: "responsabilites-investigateur", title: "Investigateur et co-investigateur : responsabilités et délégation", description: "Un investigateur principal définit ses responsabilités, délègue à des co-investigateurs qualifiés et documente cette délégation, dans le cadre juridique de son pays.", category: "Rôles et responsabilités", severity: "HAUTE", status: "DRAFT", keywords: ["investigateur", "co-investigateur", "responsabilité", "délégation", "juridique", "autorité"], phases: ["Préparation", "Conduite"], roles: ["Investigateur principal", "Co-investigateur", "Promoteur", "ARC / CRA"], questions: ["Quelles tâches l’investigateur garde-t-il sous sa responsabilité directe ?", "Chaque tâche déléguée est-elle confiée à une personne qualifiée et tracée dans le log de délégation ?", "Que prévoit le droit national sur les responsabilités de l’investigateur (ex. loi Jardé en France, lignes directrices ABMed au Bénin) ?", "Quelles autorités et comités sont compétents dans le pays de l’étude ?"], actions: ["Lister les tâches de l’étude et identifier celles qui exigent une qualification médicale.", "Déléguer par écrit à des co-investigateurs et professionnels qualifiés, avec log de délégation daté et signé.", "Vérifier le cadre juridique national applicable (promoteur, investigateur, autorité, comité d’éthique) auprès des sources officielles du pays.", "Former l’équipe au protocole et aux BPC avant toute activité déléguée.", "Superviser les tâches déléguées et documenter cette supervision."], documents: ["Log de délégation daté et signé", "CV et preuves de formation de l’équipe", "Protocole et amendements applicables", "Textes nationaux applicables (vérifiés et datés)"], checks: ["Vérifier la qualification de chaque personne délégataire", "Vérifier la version du texte national invoqué et sa date d’application", "Vérifier que la délégation ne couvre que des tâches délégables"], escalation: ["Toute question de responsabilité juridique se résout avec le promoteur, le conseil juridique ou l’autorité compétente, jamais par extrapolation d’un autre pays.", "Un co-investigateur non qualifié pour une tâche la remonte immédiatement à l’investigateur."], mistakes: ["Ne pas déléguer oralement ou sans log daté.", "Ne pas présenter une responsabilité issue des BPC comme identique dans tous les pays : le droit national prime et varie.", "Ne pas laisser une tâche médicale à une personne sans qualification requise.", "Ne pas conclure seul une obligation juridique sans source nationale vérifiée."], example: "Un investigateur principal à Cotonou délègue la prise des constantes à un infirmier de recherche formé, conserve l’évaluation médicale des critères d’éligibilité, et fait vérifier par le promoteur les exigences ABMed applicables avant la première inclusion.", checklist: ["Tâches cartographiées", "Délégations écrites et datées", "Qualifications vérifiées", "Cadre juridique national vérifié et daté", "Supervision documentée"], referenceIds: ["ich-e6r3"] }),
  makeScenario({ id: "recruter-arc-chef-de-projet", title: "Recruter un ARC ou un chef de projet", description: "Une structure de recherche recrute un attaché de recherche clinique ou un chef de projet : fiche de poste, prérequis, entretien et intégration encadrée.", category: "Ressources humaines", severity: "NORMALE", status: "DRAFT", keywords: ["recrutement", "ARC", "chef de projet", "fiche de poste", "entretien", "embauche"], phases: ["Préparation"], roles: ["Promoteur", "Chef de projet", "Investigateur principal"], questions: ["Les missions (avant, pendant et après les visites ou les études) sont-elles décrites par écrit ?", "Quels prérequis sont exigés : formation BPC, diplôme, expérience encadrée ?", "L’entretien comporte-t-il des mises en situation concrètes ?", "Quel encadrement est prévu pendant la période d’intégration ?"], actions: ["Rédiger la fiche de poste : missions, études concernées, déplacements, reporting et rattachement hiérarchique.", "Définir les prérequis : formation BPC à jour, diplôme adapté au poste, expérience encadrée attendue, langues (dont le français pour les dossiers béninois).", "Mener l’entretien avec des mises en situation : préparer une visite de monitoring, réagir à une déviation, rédiger une lettre de suivi.", "Vérifier les références et les formations déclarées.", "Prévoir une intégration encadrée : double visite avec un ARC senior, revue des premiers rapports, points réguliers."], documents: ["Fiche de poste écrite", "Grille d’entretien et mises en situation", "Attestations de formation BPC et diplômes vérifiés", "Plan d’intégration encadrée"], checks: ["Vérifier les diplômes et formations auprès des organismes émetteurs", "Vérifier la conformité du contrat au droit du travail du pays (à faire valider localement)", "Vérifier que la période d’intégration prévoit une supervision réelle"], escalation: ["Les questions de contrat, de salaire et de statut relèvent du droit du travail local : faire valider par le service compétent de la structure.", "Toute exigence réglementaire sur les qualifications se vérifie auprès de l’autorité nationale."], mistakes: ["Ne pas recruter sans fiche de poste écrite.", "Ne pas se contenter d’un CV : vérifier formations et références.", "Ne pas confier seul un centre à un nouvel ARC sans période encadrée.", "Ne pas fournir de modèle de contrat générique : le droit du travail varie selon les pays."], example: "Un centre à Parakou recrute un ARC : fiche de poste (2 essais, visites mensuelles), entretien avec mise en situation sur une déviation, vérification de l’attestation BPC, puis deux visites en binôme avec l’ARC senior avant la première visite en autonomie.", checklist: ["Fiche de poste écrite", "Prérequis définis", "Entretien avec mises en situation", "Formations et références vérifiées", "Intégration encadrée planifiée"], referenceIds: ["ich-e6r3"] }),
  makeScenario({ id: "data-manager-etude", title: "Data manager : construire et gérer les données d’une étude", description: "Un data manager met en place le recueil des données, suit leur qualité pendant l’étude et prépare la base pour l’analyse.", category: "Données", severity: "NORMALE", status: "DRAFT", keywords: ["data manager", "données", "eCRF", "requêtes", "base de données", "verrouillage"], phases: ["Préparation", "Conduite", "Clôture"], roles: ["Data Manager", "ARC / CRA", "Biostatisticien", "Chef de projet"], questions: ["Le plan de gestion des données et les règles de cohérence sont-ils validés avant la première inclusion ?", "Les dictionnaires de codage utilisés sont-ils sous licence et versionnés ?", "Quel est le taux de requêtes ouvertes par centre et son évolution ?", "Quelles conditions doivent être réunies avant le verrouillage de la base ?"], actions: ["Avant : construire le eCRF avec l’équipe, rédiger le plan de gestion des données et les règles de cohérence, tester la base avec des cas synthétiques.", "Avant : former les utilisateurs à la saisie et documenter les accès et habilitations.", "Pendant : suivre la complétude et la saisie, émettre et suivre les requêtes, coder les termes médicaux avec les dictionnaires prévus.", "Pendant : réconcilier les données externes (laboratoire, imagerie, vigilance) avec la base selon le calendrier prévu.", "Après : résoudre les requêtes restantes, documenter les décisions de nettoyage, faire valider la revue finale et verrouiller la base.", "Après : organiser le transfert à l’analyse et l’archivage selon les procédures applicables."], documents: ["Plan de gestion des données", "eCRF et guide de saisie", "Spécifications des règles de cohérence", "Rapport de verrouillage"], checks: ["Vérifier que les règles de cohérence couvrent les critères d’éligibilité et les endpoints", "Vérifier les licences et versions des dictionnaires de codage", "Vérifier que le verrouillage est autorisé par les rôles prévus"], escalation: ["Une donnée de sécurité incohérente est signalée immédiatement au circuit de vigilance, pas seulement traitée comme une requête.", "Toute modification après verrouillage suit la procédure de déverrouillage documentée."], mistakes: ["Ne pas ouvrir la base à la saisie avant validation du eCRF.", "Ne pas corriger une donnée source depuis la base : la correction se fait à la source.", "Ne pas verrouiller avec des requêtes critiques ouvertes sans décision documentée.", "Ne pas saisir de donnée permettant d’identifier directement un participant dans les outils de support."], example: "Une data manager prépare un essai à Cotonou : eCRF testé sur 5 cas synthétiques, formation des CRA à la saisie, suivi hebdomadaire des requêtes par centre, réconciliation mensuelle avec le laboratoire central, puis revue finale et verrouillage validé par le biostatisticien.", checklist: ["eCRF validé et testé", "Plan de gestion des données approuvé", "Utilisateurs formés et habilités", "Requêtes suivies avec délais", "Réconciliations à jour", "Base verrouillée après revue documentée"], referenceIds: ["ich-e6r3"] }),
  makeScenario({ id: "vigilance-evenement-indesirable-grave", title: "Vigilance : traiter un événement indésirable grave", description: "Un événement indésirable grave est signalé dans un essai : évaluation, notification dans les délais et suivi, selon le protocole et la réglementation du pays.", category: "Sécurité", severity: "HAUTE", status: "DRAFT", keywords: ["EIG", "SAE", "vigilance", "pharmacovigilance", "notification", "sécurité", "déclaration"], phases: ["Intervention", "Suivi"], roles: ["Investigateur principal", "Pharmacovigilance", "Promoteur", "ARC / CRA"], questions: ["L’événement répond-il aux critères de gravité définis par le protocole ?", "Quels délais de notification prévoient le protocole, le promoteur et la réglementation du pays ?", "L’évaluation de la relation avec le produit est-elle documentée par un médecin qualifié ?", "Le participant est-il pris en charge selon les circuits médicaux compétents ?"], actions: ["Avant : s’assurer que les circuits de déclaration, les formulaires et les délais du pays et du protocole sont connus de l’équipe.", "Pendant : prioriser la prise en charge médicale du participant par les professionnels compétents.", "Pendant : recueillir les faits sans interprétation hâtive, documenter chronologie, gravité et traitements.", "Pendant : notifier selon les délais et voies prévus (promoteur, vigilance, autorité et comité selon le pays) et conserver les accusés.", "Après : transmettre les informations complémentaires (suivi médical, évolution) dans les délais prévus.", "Après : vérifier la mise à jour des documents de l’essai si la sécurité du produit évolue, selon le circuit du promoteur."], documents: ["Formulaire de déclaration de l’essai", "Protocole (section sécurité) et plan de vigilance", "Dossier médical source", "Accusés de notification et correspondances"], checks: ["Vérifier les délais applicables : ils varient selon le pays, le type d’étude et le caractère attendu de l’événement", "Vérifier que l’évaluation de causalité est faite par un médecin qualifié", "Vérifier que tous les destinataires prévus ont été notifiés"], escalation: ["La prise en charge médicale prime toujours sur les démarches documentaires.", "Tout doute sur un délai ou un destinataire se résout avec la vigilance du promoteur et les textes du pays, sans attendre."], mistakes: ["Ne pas retarder une notification pour compléter un dossier : notifier avec les éléments disponibles, compléter ensuite.", "Ne pas qualifier soi-même la relation causale sans médecin qualifié.", "Ne pas communiquer de donnée identifiante dans les circuits non prévus.", "Ne pas appliquer les délais d’un autre pays sans vérification."], example: "Une hospitalisation est signalée un vendredi soir dans un centre : l’investigateur prend en charge le participant, notifie le promoteur dans le délai prévu avec les faits connus, puis transmet le compte rendu de sortie en information complémentaire la semaine suivante.", checklist: ["Participant pris en charge", "Faits et chronologie documentés", "Notification dans les délais avec accusé", "Évaluation médicale qualifiée", "Suivi transmis", "Traçabilité complète"], referenceIds: ["ich-e6r3", "who-best-practices"] }),
  makeScenario({ id: "recevoir-inspection-audit", title: "Recevoir une inspection ou un audit", description: "Un centre ou un promoteur est inspecté ou audité : préparation, conduite des échanges et traitement des constats.", category: "Qualité", severity: "HAUTE", status: "DRAFT", keywords: ["inspection", "audit", "constat", "CAPA", "autorité", "qualité"], phases: ["Préparation", "Conduite", "Clôture"], roles: ["Investigateur principal", "QA", "Chef de projet", "Promoteur"], questions: ["Le périmètre et le référentiel de l’inspection sont-ils confirmés par écrit ?", "Les dossiers (classeur investigateur, TMF, données source) sont-ils complets et accessibles ?", "Qui répond aux questions et qui consigne les demandes pendant la visite ?", "Quel circuit valide les réponses aux constats et les CAPA ?"], actions: ["Avant : confirmer par écrit le périmètre, les dates et les documents demandés ; briefer l’équipe sur les rôles pendant la visite.", "Avant : vérifier la complétude du classeur investigateur et la disponibilité des documents source, sans rien reconstruire.", "Pendant : répondre factuellement aux questions, fournir les documents demandés avec traçabilité, consigner chaque demande et chaque remise.", "Pendant : signaler immédiatement au promoteur toute observation touchant la sécurité ou les droits des participants.", "Après : analyser chaque constat, élaborer les actions correctives et préventives (CAPA) avec responsables et délais.", "Après : répondre dans le délai demandé et suivre la mise en œuvre jusqu’à la clôture."], documents: ["Courrier d’annonce et périmètre de l’inspection", "Classeur investigateur / TMF", "Registre des demandes pendant la visite", "Rapport d’inspection et plan CAPA"], checks: ["Vérifier l’identité et le mandat des inspecteurs", "Vérifier qu’aucun document n’est modifié ou complété rétroactivement", "Vérifier que les réponses aux constats sont validées par les rôles compétents"], escalation: ["Un constat critique touchant la sécurité est remonté sans délai au promoteur et aux responsables qualité.", "Tout désaccord sur un constat est documenté factuellement, pas débattu oralement sans trace."], mistakes: ["Ne pas reconstruire ou compléter des documents en prévision de la visite.", "Ne pas laisser un inspecteur sans référent désigné dans l’équipe.", "Ne pas promettre une action sans responsable ni délai.", "Ne pas répondre au rapport sans analyse de cause."], example: "Un centre reçoit une inspection de l’autorité nationale : le périmètre est confirmé par écrit, l’investigateur et l’ARC briefés, les demandes consignées ; deux constats donnent lieu à un plan CAPA répondu dans les 30 jours et suivi jusqu’à clôture.", checklist: ["Périmètre confirmé", "Équipe briefée et rôles attribués", "Documents accessibles et traçables", "Demandes consignées", "CAPA avec responsables et délais", "Réponse envoyée dans le délai"], referenceIds: ["ich-e6r3"] }),
  makeScenario({ id: "pharmacie-produit-etude", title: "Pharmacie : gérer le produit de l’étude", description: "Le pharmacien d’un centre reçoit, conserve, dispense et trace le produit de l’étude, et gère les écarts de température.", category: "Pharmacie", severity: "NORMALE", status: "DRAFT", keywords: ["pharmacie", "produit", "stock", "température", "excursion", "dispensation", "traçabilité"], phases: ["Préparation", "Intervention", "Clôture"], roles: ["Pharmacien", "ARC / CRA", "Investigateur principal"], questions: ["Les habilitations et formations de l’équipe de pharmacie sont-elles documentées ?", "Les conditions de conservation (température, accès, traçabilité) sont-elles conformes au protocole et à la notice du produit ?", "Quel circuit décide de l’utilisation d’un produit après une excursion de température ?", "Comment sont traités les retours et la destruction ?"], actions: ["Avant : vérifier les habilitations, la formation au protocole et la capacité de conservation (équipement, relevés, alarme, secours).", "Avant : réceptionner chaque livraison avec vérification documentée (quantité, lot, température de transport).", "Pendant : tenir la comptabilité du produit (reçu, dispensé, retourné, détruit) et les relevés de température continus.", "Pendant : délivrer uniquement sur prescription de l’essai et selon la randomisation ; documenter chaque dispensation.", "Pendant : en cas d’excursion de température, mettre le produit en quarantaine et attendre la décision écrite du promoteur avant toute utilisation.", "Après : organiser le retour ou la destruction documentée et la réconciliation finale des stocks."], documents: ["Dossier de pharmacie de l’essai", "Registres de température et comptabilité produit", "Ordonnancier de l’essai", "Procédure de gestion des excursions"], checks: ["Vérifier que la quarantaine est réelle (produit physiquement séparé et signalé)", "Vérifier la concordance comptabilité/stock physique à chaque visite", "Vérifier la traçabilité lot par lot"], escalation: ["Toute administration d’un produit concerné par une excursion non levée est un incident majeur à escalader immédiatement.", "Les décisions d’utilisation après excursion appartiennent au promoteur, jamais au centre seul."], mistakes: ["Ne pas utiliser un produit en quarantaine, même partiellement.", "Ne pas compléter un relevé de température manquant rétroactivement.", "Ne pas détruire sans autorisation écrite et traçabilité.", "Ne pas stocker avec des produits hors essai sans séparation claire."], example: "Une alarme signale une excursion nocturne : le pharmacien met les kits concernés en quarantaine le matin, informe l’ARC et le promoteur, et n’autorise la reprise de la dispensation qu’après la décision écrite du promoteur, lot par lot.", checklist: ["Habilitations et formations documentées", "Réceptions vérifiées et tracées", "Relevés de température continus", "Comptabilité produit à jour", "Excursions gérées par quarantaine et décision écrite", "Retour/destruction réconciliés"], referenceIds: ["ich-e6r3"] }),
  makeScenario({ id: "visite-initiation-siv", title: "ARC : conduire une visite d’initiation d’un centre", description: "Avant la première inclusion, l’ARC forme le centre, vérifie sa préparation et autorise avec le chef de projet son activation.", category: "Monitoring", severity: "NORMALE", status: "DRAFT", keywords: ["SIV", "initiation", "activation", "centre", "formation", "ARC", "démarrage"], phases: ["Préparation", "Monitoring"], roles: ["ARC / CRA", "Investigateur principal", "Chef de projet", "Pharmacien"], questions: ["Les contrats, assurances et autorisations du centre sont-ils finalisés ?", "L’équipe est-elle au complet, formée au protocole et aux BPC, avec délégations signées ?", "Le produit, les kits et le eCRF sont-ils disponibles et testés ?", "Le classeur investigateur est-il constitué et à jour ?"], actions: ["Avant : confirmer que contrat, assurance, autorisations et avis éthique du centre sont finalisés ; fixer la date avec l’investigateur.", "Avant : préparer l’ordre du jour de la visite d’initiation (protocole, sécurité, produit, données, logistique) et les supports de formation.", "Pendant : former l’équipe au protocole, aux critères d’éligibilité, au consentement, à la déclaration des événements et à la saisie eCRF.", "Pendant : vérifier la pharmacie (stock, températures, habilitations), le classeur investigateur, le log de délégation et les accès aux systèmes.", "Pendant : identifier avec le centre les points bloquants et fixer les actions à clore avant activation.", "Après : rédiger le compte rendu, recommander (ou différer) l’activation au chef de projet et suivre la levée des points bloquants."], documents: ["Ordre du jour et supports de la SIV", "Feuille de présence et attestations de formation", "Log de délégation signé", "Classeur investigateur", "Compte rendu de visite et lettre d’activation"], checks: ["Vérifier qu’aucune inclusion ne précède l’activation écrite", "Vérifier que chaque membre délégué a été formé avant sa première tâche", "Vérifier que les accès eCRF correspondent aux délégations"], escalation: ["Tout élément réglementaire manquant (avis éthique, autorisation, contrat) bloque l’activation : remonter au chef de projet et au promoteur.", "Un centre non prêt sur la sécurité ou le produit n’est pas activé, même sous pression de calendrier."], mistakes: ["Ne pas activer un centre avec des formations incomplètes.", "Ne pas confondre visite d’initiation et première inclusion.", "Ne pas laisser le log de délégation être signé après coup.", "Ne pas expédier le produit avant confirmation de la capacité de conservation."], example: "Un ARC initie un centre à Parakou : formation d’une demi-journée (protocole, sécurité, eCRF), vérification de la pharmacie, deux points bloquants identifiés (thermomètre de secours, signature manquante) ; activation recommandée après levée, constatée une semaine plus tard.", checklist: ["Documents réglementaires du centre finalisés", "Équipe formée et délégations signées", "Pharmacie et produit prêts", "Classeur investigateur à jour", "Points bloquants tracés et levés", "Activation écrite avant toute inclusion"], referenceIds: ["ich-e6r3"] }),
  makeScenario({ id: "visite-cloture-closeout", title: "ARC : conduire une visite de clôture d’un centre", description: "En fin de participation d’un centre, l’ARC solde les données, le produit et les documents, et organise l’archivage.", category: "Monitoring", severity: "NORMALE", status: "DRAFT", keywords: ["clôture", "close-out", "fin d’étude", "archivage", "centre", "ARC"], phases: ["Clôture", "Monitoring"], roles: ["ARC / CRA", "Investigateur principal", "Pharmacien", "Chef de projet"], questions: ["Toutes les requêtes et déviations du centre sont-elles soldées ?", "La comptabilité produit est-elle réconciliée et les reliquats retournés ou détruits ?", "Les documents essentiels sont-ils complets pour l’archivage ?", "Les obligations post-étude (suivi des participants, conservation) sont-elles confirmées par écrit ?"], actions: ["Avant : préparer la liste des points ouverts du centre (requêtes, déviations, suivi sécurité, documents manquants).", "Pendant : solder les requêtes restantes et vérifier la complétude des données et des documents essentiels.", "Pendant : réconcilier la comptabilité produit avec la pharmacie et organiser le retour ou la destruction tracée.", "Pendant : confirmer avec l’investigateur les obligations post-étude : conservation des documents, suivi des participants, disponibilité en cas d’inspection.", "Après : rédiger le compte rendu de clôture, faire valider la fermeture du centre et archiver selon les procédures et la durée prévues."], documents: ["Liste des points ouverts", "Comptabilité produit finale", "Compte rendu de clôture", "Confirmation écrite des obligations post-étude"], checks: ["Vérifier qu’aucune requête ni déviation ne reste ouverte", "Vérifier la concordance finale comptabilité/stock", "Vérifier la durée de conservation applicable (protocole et droit national)"], escalation: ["Un suivi de sécurité en cours ne se clôt pas avec le centre : vérifier le circuit prévu par le promoteur.", "Tout document essentiel manquant bloque la clôture ou fait l’objet d’un plan daté."], mistakes: ["Ne pas clôturer avec des requêtes ouvertes sans décision documentée.", "Ne pas détruire les reliquats de produit sans traçabilité complète.", "Ne pas oublier les obligations post-étude dans le compte rendu.", "Ne pas archiver avant la fin des vérifications finales."], example: "Un ARC clôt un centre à Cotonou : deux requêtes soldées sur place, comptabilité produit réconciliée (3 kits retournés), obligations post-étude confirmées par écrit (conservation 15 ans selon le protocole), compte rendu validé par le chef de projet.", checklist: ["Points ouverts soldés", "Produit réconcilié et retourné/détruit avec trace", "Documents essentiels complets", "Obligations post-étude confirmées par écrit", "Compte rendu de clôture validé"], referenceIds: ["ich-e6r3"] }),
  makeScenario({ id: "consentement-eclaire-pratique", title: "Obtenir le consentement éclairé d’un participant", description: "Un investigateur ou un professionnel délégué informe un participant et recueille son consentement, dans le respect de ses droits et de la version approuvée.", category: "Consentement", severity: "HAUTE", status: "DRAFT", keywords: ["consentement", "information", "participant", "signature", "droits", "retrait"], phases: ["Screening", "Inclusion"], roles: ["Investigateur principal", "Co-investigateur", "ARC / CRA"], questions: ["La version du document d’information et de consentement est-elle celle approuvée par le comité d’éthique ?", "La personne qui recueille le consentement est-elle qualifiée et déléguée pour cette tâche ?", "Le participant a-t-il eu le temps de réflexion et la possibilité de poser des questions ?", "La langue et le niveau de compréhension du participant sont-ils pris en compte (traduction, témoin si prévu) ?"], actions: ["Avant : vérifier la version approuvée du document, la qualification de la personne qui informe et les aménagements nécessaires (langue, témoin, proche).", "Pendant : présenter l’étude en termes simples : objectif, déroulement, risques, bénéfices attendus, alternatives, droits (retrait à tout moment, données personnelles).", "Pendant : laisser le temps de réflexion prévu, répondre aux questions et vérifier la compréhension sans pression.", "Pendant : faire dater et signer selon la procédure, remettre un exemplaire au participant et documenter le processus dans le dossier source.", "Après : tracer le consentement dans le eCRF et conserver l’original selon les règles du centre ; informer le participant de qui contacter ensuite."], documents: ["Document d’information et de consentement (version approuvée)", "Preuve d’approbation du comité d’éthique", "Dossier source", "Log de délégation"], checks: ["Vérifier que la date de signature précède toute procédure de l’étude", "Vérifier la cohérence version signée / version approuvée", "Vérifier que le participant a reçu son exemplaire"], escalation: ["Tout doute sur la compréhension ou la liberté de décision suspend le processus : l’investigateur en décide, pas le calendrier de recrutement.", "Une incapacité ou une situation particulière (mineur, tutelle) suit la procédure spécifique du protocole et du droit national."], mistakes: ["Ne pas faire signer avant le temps de réflexion ni après le début des procédures.", "Ne pas utiliser une version non approuvée ou expirée.", "Ne pas présenter la participation comme une obligation ou une condition de soins.", "Ne pas négliger la barrière de langue : prévoir traduction ou témoin selon la procédure."], example: "Un médecin à Cotonou informe une candidate en français avec documents traduits, lui laisse 48 heures de réflexion, répond à ses questions en présence de sa sœur, puis recueille la signature datée avant toute procédure de screening.", checklist: ["Version approuvée vérifiée", "Personne qualifiée et déléguée", "Information claire et temps de réflexion respecté", "Signature datée avant toute procédure", "Exemplaire remis au participant", "Traçabilité complète"], referenceIds: ["ich-e6r3", "who-best-practices"] }),
  makeScenario({ id: "biostatisticien-sap", title: "Biostatisticien : rédiger le plan d’analyse statistique", description: "Le biostatisticien rédige le SAP avant l’analyse, en cohérence avec le protocole, les endpoints et l’estimand.", category: "Statistiques", severity: "NORMALE", status: "DRAFT", keywords: ["biostatisticien", "SAP", "analyse", "estimand", "effectif", "statistiques"], phases: ["Préparation", "Clôture"], roles: ["Biostatisticien", "Investigateur principal", "Data Manager", "Chef de projet"], questions: ["Le SAP est-il finalisé avant le verrouillage de la base (et avant toute analyse) ?", "Endpoints, estimands, populations d’analyse et gestion des données manquantes sont-ils cohérents avec le protocole ?", "Le calcul d’effectif et ses hypothèses sont-ils documentés et sourcés ?", "Qui valide le SAP et comment les amendements sont-ils tracés ?"], actions: ["Avant : reprendre le protocole (objectifs, endpoints, estimands, hypothèses d’effectif) et lister les points à préciser.", "Avant : rédiger le SAP (populations, analyses, données manquantes, multiplicité, sous-groupes, présentation des résultats) avec le statisticien senior si nécessaire.", "Pendant : faire relire le SAP par l’investigateur et le promoteur, tracer les versions et les commentaires.", "Pendant : préparer les programmes d’analyse et les tester sur des données simulées ou blindées.", "Après : finaliser le SAP avant verrouillage, documenter tout écart ultérieur comme amendement daté et motivé."], documents: ["Protocole et amendements", "SAP versionné", "Documentation du calcul d’effectif", "Programmes et journaux d’analyse"], checks: ["Vérifier la cohérence estimand/population/analyse pour chaque endpoint", "Vérifier que la gestion de la multiplicité est explicite", "Vérifier que toute analyse non prévue est identifiée comme telle"], escalation: ["Une incohérence protocole/analyse se résout avant verrouillage avec l’investigateur et le promoteur.", "Toute pression pour modifier une analyse après lecture des résultats est documentée et remontée : c’est un enjeu d’intégrité."], mistakes: ["Ne pas rédiger le SAP après avoir vu les données.", "Ne pas laisser le calcul d’effectif sans hypothèses sourcées.", "Ne pas oublier la gestion des données manquantes.", "Ne pas présenter une analyse exploratoire comme confirmatoire."], example: "Une biostatisticienne rédige le SAP d’un essai multicentrique : estimand de l’endpoint principal précisé avec l’investigateur, données manquantes traitées par imputation multiple justifiée, SAP signé deux semaines avant le verrouillage ; une analyse de sous-groupe demandée ensuite est ajoutée par amendement daté et marquée exploratoire.", checklist: ["SAP rédigé avant verrouillage", "Cohérence protocole/estimands vérifiée", "Calcul d’effectif sourcé", "Versions et validations tracées", "Écarts documentés par amendement"], referenceIds: ["ich-e6r3"] }),
];

export const glossary = [
  ["AE", "Événement indésirable rapporté ou observé pendant une étude ; sa qualification dépend du contexte applicable."], ["SAE", "Événement indésirable grave : la qualification et les circuits de signalement doivent être confirmés par les procédures applicables."], ["SUSAR", "Terme de pharmacovigilance dont l’application nécessite une évaluation spécialisée et les règles pertinentes."], ["ARC", "Attaché de recherche clinique ; le périmètre de ses activités dépend de son organisation et de sa délégation."], ["CRA", "Clinical Research Associate ; souvent utilisé comme équivalent d’ARC."], ["CRC", "Clinical Research Coordinator ; coordination opérationnelle du centre selon le rôle attribué."], ["TEC", "Technicien d’études cliniques."], ["GCP", "Bonnes pratiques cliniques, cadre éthique, scientifique et qualité pour les essais impliquant des participants humains."], ["CAPA", "Action corrective et préventive issue d’une analyse de cause et d’un suivi d’efficacité."], ["CRF", "Case Report Form, support de recueil des données prévues par le protocole."], ["eCRF", "CRF électronique ; les corrections doivent préserver un audit trail."], ["DCF", "Data Clarification Form ou demande de clarification de donnée."], ["IWRS", "Système interactif de réponse web utilisé selon les études, notamment pour la randomisation et le produit."], ["IVRS", "Système interactif de réponse vocale utilisé selon les études."], ["SDV", "Source Data Verification, vérification de données par rapport à leur source."], ["SDR", "Source Data Review, revue de données source."], ["RBM", "Risk-Based Monitoring, approche de monitoring basée sur les risques."], ["QTL", "Quality Tolerance Limit, limite définie pour surveiller des facteurs de qualité."], ["IRB", "Institutional Review Board, comité de revue éthique dans certains contextes."], ["IEC", "Independent Ethics Committee, comité d’éthique indépendant."], ["SOP", "Standard Operating Procedure, procédure opératoire normalisée."], ["Promoteur", "Entité assumant les responsabilités réglementaires et de gouvernance qui lui sont attribuées."], ["Investigateur", "Professionnel responsable de la conduite de l’essai au centre selon les règles applicables."], ["Monitoring", "Activité de supervision de l’essai selon une approche définie et proportionnée."], ["Audit", "Examen indépendant et systématique des activités et documents liés à l’essai."], ["Inspection", "Examen officiel conduit par une autorité compétente ou entité habilitée."], ["Déviation", "Écart par rapport au protocole ou à une procédure ; la définition et la classification applicables doivent être vérifiées."], ["Randomisation", "Affectation suivant une méthode prédéfinie pour limiter certains biais."], ["Aveugle", "Dispositif visant à limiter la connaissance d’une allocation ou information susceptible d’introduire un biais."], ["Washout", "Période d’élimination ou d’absence d’intervention prévue par certains essais cross-over."], ["Endpoint", "Critère de jugement utilisé pour répondre à un objectif de l’étude."], ["Screening", "Étapes de vérification préalables à l’inclusion."], ["Inclusion", "Entrée d’un participant dans l’étude selon les critères et procédures applicables."], ["Follow-up", "Suivi des participants ou des actions après une étape donnée."], ["Data lock", "Finalisation contrôlée de la base avant certaines analyses ; la procédure varie selon l’étude."], ["Audit trail", "Traçabilité des créations, modifications et opérations sur une donnée ou un système."], ["Amendement", "Modification formalisée d’un protocole ou document d’étude."], ["Version", "État identifié et daté d’un document ou contenu."], ["Réconciliation", "Comparaison contrôlée de sources ou jeux de données pour résoudre les divergences."], ["Accountability", "Traçabilité et rapprochement des produits investigational selon la procédure applicable."], ["Excursion", "Écart par rapport à une condition de conservation ou de transport spécifiée."], ["Cluster", "Groupe, centre ou unité pouvant être l’unité d’allocation dans un essai cluster."], ["Step-wedge", "Design dans lequel les clusters changent progressivement de condition selon un calendrier prédéfini."], ["Master protocol", "Cadre maître pouvant organiser plusieurs sous-études ou cohortes selon une gouvernance commune."], ["Basket trial", "Design regroupant généralement plusieurs cohortes autour d’une caractéristique partagée."], ["Umbrella trial", "Design couvrant plusieurs interventions ou sous-études au sein d’une population ou maladie définie."], ["Platform trial", "Infrastructure d’essai pouvant intégrer ou retirer des interventions suivant une gouvernance définie."], ["Pseudonymisation", "Traitement réduisant le lien direct avec une identité, sans équivaloir nécessairement à l’anonymisation."], ["Minimisation des données", "Principe consistant à ne collecter que les informations nécessaires à une finalité définie."], ["Juridiction", "Cadre territorial et réglementaire à confirmer avant toute conclusion normative."],
].map(([term, definition]) => ({ term, definition }));

export const sourceById = (id: string) => sources.find(source => source.id === id);
