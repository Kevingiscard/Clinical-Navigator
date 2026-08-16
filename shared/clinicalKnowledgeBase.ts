export type KnowledgeCategory =
  | "Fondamentaux"
  | "Méthodologie"
  | "Statistiques"
  | "Éthique"
  | "Réglementaire"
  | "Opérations"
  | "Sécurité"
  | "Données"
  | "Qualité"
  | "Soumissions"
  | "Glossaire";

export type EvidenceLevel = "A" | "B" | "C";

export type ClinicalKnowledgeEntry = {
  id: string;
  category: KnowledgeCategory;
  keywords: { fr: string[]; en: string[] };
  question: { fr: string; en: string };
  answer: { fr: string; en: string };
  sources: string[];
  geographicScope: string[];
  evidenceLevel: EvidenceLevel;
  localVerificationRequired?: boolean;
};

type TopicTuple = [fr: string, en: string, frAnswer: string, enAnswer: string];

const international = ["International / à préciser"];
const africa = ["Afrique subsaharienne", "International / à préciser"];
const coreSources = [
  "https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106.pdf",
  "https://www.who.int/publications/i/item/9789240097711",
];
const statsSources = [
  "https://database.ich.org/sites/default/files/ICH_E9-R1_Step4_Guideline_2019_1110.pdf",
  "https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106.pdf",
];
const topics: Array<{ category: KnowledgeCategory; items: TopicTuple[] }> = [
  {
    category: "Fondamentaux",
    items: [
      ["Phase I", "Phase I", "explore généralement la tolérance, la pharmacocinétique et la dose chez des participants sélectionnés; le protocole et la population peuvent différer selon le produit.", "usually explores tolerability, pharmacokinetics and dose in a selected population; the protocol and population depend on the product."],
      ["Phase II", "Phase II", "évalue un signal d’efficacité et affine la dose tout en poursuivant l’évaluation de la sécurité. Elle ne garantit pas une efficacité confirmatoire.", "assesses a signal of efficacy and refines dose while continuing safety assessment. It is not confirmatory evidence by itself."],
      ["Phase III", "Phase III", "compare l’intervention à un contrôle dans une population plus large avec des critères préspécifiés et une analyse confirmatoire.", "compares an intervention with a control in a larger population using prespecified endpoints and confirmatory analysis."],
      ["Phase IV", "Phase IV", "survient après l’autorisation ou dans un contexte post-commercialisation; elle vise notamment la sécurité et l’utilisation en conditions plus larges.", "takes place after authorisation or in a post-marketing setting and may examine safety and broader use."],
      ["Essai parallèle", "Parallel-group trial", "attribue chaque participant à un groupe qui conserve généralement son intervention pendant la période d’étude définie.", "assigns each participant to a group that generally retains its intervention for the defined study period."],
      ["Essai croisé", "Cross-over trial", "fait recevoir plusieurs interventions dans un ordre planifié; la période de wash-out, l’effet de période et la persistance d’effet doivent être justifiés.", "gives participants multiple interventions in a planned sequence; washout, period effects and carry-over must be justified."],
      ["Essai factoriel", "Factorial trial", "évalue simultanément plusieurs interventions ou facteurs lorsque leur combinaison et l’hypothèse d’interaction sont compatibles.", "evaluates multiple interventions or factors simultaneously when the combination and interaction assumptions are compatible."],
      ["Essai adaptatif", "Adaptive design", "prévoit des adaptations planifiées fondées sur des données accumulées, avec contrôle du risque statistique et gouvernance documentée.", "allows prespecified adaptations based on accumulating data with control of statistical risk and documented governance."],
      ["Essai en grappes", "Cluster trial", "randomise des groupes comme des centres, écoles ou communautés; l’analyse doit tenir compte de la corrélation intra-grappe.", "randomises groups such as sites, schools or communities; analysis must account for within-cluster correlation."],
      ["Randomisation", "Randomisation", "utilise une procédure définie à l’avance pour réduire le biais de sélection et équilibrer les facteurs connus ou inconnus.", "uses a prespecified procedure to reduce selection bias and balance known or unknown factors."],
      ["Double insu", "Double blinding", "maintient l’aveugle des participants et d’une autre partie pertinente de l’équipe; les exceptions et le déblindage doivent être gouvernés.", "keeps participants and another relevant party blinded; exceptions and unblinding must be governed."],
      ["Contrôle placebo", "Placebo control", "offre un comparateur conçu pour distinguer l’effet de l’intervention des effets contextuels, sous réserve d’une justification éthique.", "provides a comparator intended to separate intervention effects from contextual effects, subject to ethical justification."],
      ["Supériorité", "Superiority", "teste si l’intervention produit un résultat meilleur que le comparateur selon l’hypothèse et l’estimand spécifiés.", "tests whether the intervention produces a better result than the comparator under the specified hypothesis and estimand."],
      ["Non-infériorité", "Non-inferiority", "cherche à exclure une perte d’efficacité supérieure à une marge justifiée; la marge, la constance et la sensibilité de l’essai sont critiques.", "seeks to exclude a loss of efficacy beyond a justified margin; the margin, constancy and assay sensitivity are critical."],
    ],
  },
  {
    category: "Méthodologie",
    items: [
      ["Critères d’inclusion", "Inclusion criteria", "définissent qui peut entrer dans l’étude; ils doivent être mesurables, cohérents avec la question et applicables avant l’inclusion.", "define who may enter the study; they should be measurable, aligned with the question and applicable before enrolment."],
      ["Critères d’exclusion", "Exclusion criteria", "limitent les situations qui peuvent compromettre la sécurité, l’interprétation ou la faisabilité; chaque critère doit avoir une justification.", "limit situations that may compromise safety, interpretation or feasibility; each criterion should have a justification."],
      ["Endpoint primaire", "Primary endpoint", "est le résultat principal sur lequel repose l’objectif confirmatoire; sa définition, son temps et son analyse doivent être préspécifiés.", "is the main outcome supporting the confirmatory objective; its definition, timing and analysis must be prespecified."],
      ["Endpoints secondaires", "Secondary endpoints", "complètent l’interprétation de l’effet et doivent être distingués des analyses exploratoires.", "complement interpretation of the effect and must be distinguished from exploratory analyses."],
      ["Estimand", "Estimand", "décrit précisément le traitement, la population, le résultat et la gestion des événements intercurrents qui définissent la question d’effet.", "precisely describes treatment, population, outcome and handling of intercurrent events defining the treatment-effect question."],
      ["Population d’analyse", "Analysis population", "doit correspondre à l’estimand et au plan statistique; les écarts entre ITT, per-protocol et sécurité doivent être explicités.", "must match the estimand and statistical plan; differences among ITT, per-protocol and safety sets must be explicit."],
      ["ITT", "Intention-to-treat", "analyse les participants selon le groupe assigné, avec une stratégie prédéfinie pour les données post-randomisation.", "analyses participants according to assigned group, with a prespecified strategy for post-randomisation data."],
      ["Per-protocol", "Per-protocol", "analyse un sous-ensemble défini par l’adhésion aux conditions importantes du protocole; elle complète mais ne remplace pas l’analyse principale sans justification.", "analyses a subset defined by adherence to important protocol conditions; it complements rather than automatically replaces the primary analysis."],
      ["Taille d’échantillon", "Sample size", "dépend de l’effet cible, de la variabilité, du niveau alpha, de la puissance, de l’attrition et de la structure du design.", "depends on target effect, variability, alpha, power, attrition and design structure."],
      ["Puissance statistique", "Statistical power", "représente la probabilité de détecter l’effet supposé si les hypothèses du calcul sont suffisamment proches de la réalité.", "is the probability of detecting the assumed effect when the sample-size assumptions are sufficiently close to reality."],
      ["Biais de sélection", "Selection bias", "apparaît lorsque l’inclusion ou l’allocation produit des groupes systématiquement différents; la randomisation et la transparence du recrutement réduisent ce risque.", "occurs when enrolment or allocation creates systematically different groups; randomisation and recruitment transparency reduce the risk."],
      ["Biais de mesure", "Measurement bias", "résulte d’une mesure différente selon le groupe ou le contexte; l’aveugle, la formation et la standardisation sont des contrôles possibles.", "results from measurement differing by group or context; blinding, training and standardisation are possible controls."],
      ["Données manquantes", "Missing data", "doivent être décrites, reliées à leur mécanisme plausible et traitées par une stratégie compatible avec l’estimand et des analyses de sensibilité.", "must be described, linked to a plausible mechanism and handled with a strategy consistent with the estimand and sensitivity analyses."],
      ["Analyse de sensibilité", "Sensitivity analysis", "évalue si la conclusion change lorsque des hypothèses raisonnables ou des choix analytiques alternatifs sont utilisés.", "assesses whether the conclusion changes under reasonable alternative assumptions or analytical choices."],
    ],
  },
  {
    category: "Statistiques",
    items: [
      ["Hypothèse nulle", "Null hypothesis", "formalise l’absence d’effet ou la relation de référence; elle doit être cohérente avec le critère et le test planifiés.", "formalises no effect or the reference relationship and must match the endpoint and planned test."],
      ["Intervalle de confiance", "Confidence interval", "présente une plage compatible avec les données et le modèle; il renseigne sur la précision, pas seulement sur la significativité.", "presents a range compatible with data and the model; it informs precision, not only significance."],
      ["Valeur p", "P-value", "mesure la compatibilité des données avec l’hypothèse nulle dans le modèle utilisé; elle ne mesure ni l’importance clinique ni la probabilité que l’hypothèse soit vraie.", "measures data compatibility with the null hypothesis under the model used; it is neither clinical importance nor the probability the hypothesis is true."],
      ["Erreur de type I", "Type I error", "correspond au risque de conclure à tort à un effet sous l’hypothèse nulle; la multiplicité peut l’augmenter.", "is the risk of incorrectly concluding an effect under the null; multiplicity can increase it."],
      ["Erreur de type II", "Type II error", "correspond au risque de ne pas détecter un effet réellement présent selon les hypothèses du calcul.", "is the risk of failing to detect an effect that is present under the sample-size assumptions."],
      ["Multiplicité", "Multiplicity", "couvre plusieurs critères, temps, groupes ou analyses qui peuvent accroître les faux positifs; une stratégie doit être préspécifiée.", "covers multiple endpoints, times, groups or analyses that can increase false positives; a strategy must be prespecified."],
      ["Stratification", "Stratification", "organise la randomisation ou l’analyse autour de facteurs pronostiques afin d’améliorer l’équilibre ou la précision.", "organises randomisation or analysis around prognostic factors to improve balance or precision."],
      ["Covariable", "Covariate", "est une variable utilisée pour expliquer une partie de la variabilité ou ajuster une analyse lorsque son rôle est prévu et justifié.", "is a variable used to explain variability or adjust an analysis when its role is planned and justified."],
      ["Analyse intermédiaire", "Interim analysis", "est conduite avant la fin selon un plan gouverné, avec contrôle de la confidentialité, de la multiplicité et des règles d’arrêt.", "is conducted before completion under a governed plan with control of confidentiality, multiplicity and stopping rules."],
      ["Comité indépendant", "Independent committee", "apporte une revue séparée lorsque la sécurité, l’intégrité des données ou les décisions d’arrêt exigent une indépendance documentée.", "provides separate review when safety, data integrity or stopping decisions require documented independence."],
      ["Modèle mixte", "Mixed model", "peut gérer des mesures répétées en tenant compte de la corrélation et des hypothèses de données manquantes.", "may handle repeated measures by accounting for correlation and missing-data assumptions."],
      ["Survie", "Time-to-event analysis", "analyse le temps jusqu’à un événement avec une méthode adaptée à la censure et aux risques concurrents si nécessaire.", "analyses time to an event with methods suited to censoring and competing risks when necessary."],
      ["Sous-groupe", "Subgroup", "explore l’hétérogénéité d’effet selon des facteurs préspécifiés; les résultats exploratoires nécessitent prudence et interaction statistique.", "explores effect heterogeneity by prespecified factors; exploratory results require caution and interaction assessment."],
      ["Validation statistique", "Statistical validation", "vérifie la traçabilité des programmes, des jeux de données, des versions et des sorties avant une utilisation critique.", "checks traceability of programs, datasets, versions and outputs before critical use."],
    ],
  },
  {
    category: "Éthique",
    items: [
      ["Consentement éclairé", "Informed consent", "est un processus d’information et de décision libre, compréhensible et documenté; il ne se réduit pas à une signature.", "is a free, understandable and documented information and decision process; it is not merely a signature."],
      ["Retrait du consentement", "Withdrawal of consent", "doit être respecté selon la portée exprimée, sans représailles, avec clarification de ce qui peut être conservé légalement.", "must be respected according to the expressed scope, without retaliation, clarifying what may legally be retained."],
      ["Personne vulnérable", "Vulnerable participant", "nécessite une attention renforcée à la compréhension, à la liberté de décision et aux protections prévues par le cadre applicable.", "requires enhanced attention to understanding, freedom of decision and protections under the applicable framework."],
      ["Équité de recrutement", "Equitable recruitment", "cherche à distribuer équitablement les bénéfices et contraintes sans exclure ou inclure abusivement un groupe.", "seeks fair distribution of benefits and burdens without unjustified exclusion or inclusion of a group."],
      ["Déclaration d’Helsinki", "Declaration of Helsinki", "fournit des principes éthiques internationaux pour la recherche médicale impliquant des participants; elle doit être lue dans sa version applicable.", "provides international ethical principles for medical research involving participants and should be read in the applicable version."],
      ["ICH-GCP E6(R3)", "ICH-GCP E6(R3)", "met l’accent sur la protection des participants, la fiabilité des résultats, la qualité par la conception et la proportionnalité.", "emphasises participant protection, reliable results, quality by design and proportionality."],
      ["Comité d’éthique", "Research ethics committee", "évalue notamment le rapport bénéfice-risque, l’information, la sélection et la protection des participants selon son mandat.", "reviews benefit-risk, information, selection and participant protection according to its mandate."],
      ["Assent", "Assent", "désigne la participation exprimée par un mineur ou une personne dont la capacité décisionnelle est particulière, en complément des autorisations requises.", "is agreement expressed by a minor or person with particular decision capacity, in addition to required permissions."],
      ["Compensation", "Compensation", "doit être proportionnée, transparente et conçue pour ne pas exercer une influence indue sur la décision de participer.", "should be proportionate, transparent and designed not to exert undue influence on participation."],
      ["Confidentialité", "Confidentiality", "impose de limiter l’accès aux informations identifiantes, de définir les responsabilités et de protéger les transmissions.", "requires limiting access to identifiable information, defining responsibilities and protecting transmissions."],
      ["Minimisation des données", "Data minimisation", "consiste à ne collecter que les données nécessaires à une finalité définie, avec des durées et accès proportionnés.", "means collecting only data necessary for a defined purpose, with proportionate retention and access."],
      ["Conflit d’intérêts", "Conflict of interest", "doit être identifié, évalué et géré pour protéger l’indépendance de la décision et la confiance dans la recherche.", "must be identified, assessed and managed to protect decision independence and trust in research."],
      ["Retour aux participants", "Return of information", "doit respecter le protocole, le consentement, la validité de l’information et les responsabilités éthiques applicables.", "must respect the protocol, consent, information validity and applicable ethical responsibilities."],
      ["Engagement communautaire", "Community engagement", "peut améliorer la pertinence, l’acceptabilité et l’équité d’une recherche lorsqu’il est planifié et non symbolique.", "can improve relevance, acceptability and equity when planned and meaningful."],
    ],
  },
  {
    category: "Réglementaire",
    items: [
      ["FDA", "FDA", "aux États-Unis, les exigences dépendent du produit, du type d’étude, du statut IND/IDE et des textes applicables; vérifier les pages et guidances officielles.", "in the United States, requirements depend on product, study type, IND/IDE status and applicable rules; verify official guidance."],
      ["EMA", "EMA", "dans l’Union européenne, le CTR et CTIS structurent de nombreuses demandes de médicaments; la compétence nationale et le dossier concret restent déterminants.", "in the European Union, the CTR and CTIS structure many medicine applications; national competence and the specific dossier remain decisive."],
      ["ANSM", "ANSM", "en France, l’ANSM intervient dans le cadre applicable aux recherches et produits de santé; il faut vérifier le type de recherche et les autorités compétentes.", "in France, ANSM operates within the applicable framework for research and health products; verify research type and competent authorities."],
      ["Health Canada", "Health Canada", "les essais et produits de santé au Canada relèvent de voies et exigences documentaires spécifiques à confirmer auprès des sources officielles.", "Canadian trials and health products follow specific pathways and documentary requirements to confirm with official sources."],
      ["PMDA", "PMDA", "au Japon, la PMDA et les autorités compétentes appliquent un cadre national à confronter au protocole et au produit concernés.", "in Japan, PMDA and competent authorities apply a national framework to be checked against the study and product."],
      ["TGA", "TGA", "en Australie, la voie réglementaire dépend notamment du produit, du sponsor et du dispositif applicable; les sources TGA doivent être vérifiées.", "in Australia, the pathway depends on product, sponsor and applicable scheme; TGA sources must be checked."],
      ["AVAREF", "AVAREF", "l’initiative AVAREF vise à renforcer la coopération et les capacités de revue éthique et réglementaire en Afrique; elle ne remplace pas les autorités nationales.", "AVAREF supports cooperation and capacity for ethical and regulatory review in Africa; it does not replace national authorities."],
      ["AMRH", "AMRH", "l’initiative d’harmonisation réglementaire africaine cherche à faciliter la convergence; la décision applicable reste celle des autorités compétentes.", "the African regulatory harmonisation initiative seeks convergence; the applicable decision remains with competent authorities."],
      ["Bénin", "Benin", "pour le Bénin, les autorités, le comité d’éthique, les exigences linguistiques et les circuits de soumission doivent être confirmés dans les sources nationales avant toute décision.", "for Benin, authorities, ethics committee, language requirements and submission pathways must be confirmed in national sources before decisions."],
      ["Nigeria NAFDAC", "Nigeria NAFDAC", "au Nigeria, NAFDAC et les autres instances pertinentes doivent être distinguées selon le produit, le protocole et la responsabilité concernée.", "in Nigeria, NAFDAC and other relevant bodies must be distinguished by product, protocol and responsibility."],
      ["Afrique du Sud SAHPRA", "South Africa SAHPRA", "en Afrique du Sud, SAHPRA et les comités d’éthique interviennent selon le cadre applicable; la source officielle et la version doivent être vérifiées.", "in South Africa, SAHPRA and ethics committees act under the applicable framework; official source and version must be checked."],
      ["Kenya PPB", "Kenya PPB", "au Kenya, le Pharmacy and Poisons Board et les instances éthiques pertinentes doivent être consultés selon le type d’étude et de produit.", "in Kenya, the Pharmacy and Poisons Board and relevant ethics bodies should be consulted according to study and product type."],
      ["WHO prequalification", "WHO prequalification", "la préqualification OMS est un programme d’évaluation de produits et de fabricants; elle ne constitue pas une autorisation nationale universelle.", "WHO prequalification evaluates products and manufacturers; it is not a universal national authorisation."],
      ["Registre d’essais", "Trial registry", "l’enregistrement prospectif améliore la transparence; le registre, les champs obligatoires et les délais dépendent du cadre concerné.", "prospective registration improves transparency; registry, required fields and timelines depend on the applicable framework."],
    ],
  },
  {
    category: "Opérations",
    items: [
      ["Monitoring", "Monitoring", "vérifie de manière proportionnée la protection des participants, la qualité des données et le respect des processus convenus.", "proportionately checks participant protection, data quality and adherence to agreed processes."],
      ["CRA", "CRA", "coordonne ou réalise des activités de suivi selon son rôle, son plan de monitoring, ses compétences et les responsabilités documentées.", "coordinates or performs monitoring activities according to role, plan, competence and documented responsibilities."],
      ["eCRF", "eCRF", "doit traduire le protocole et le plan de données sans collecter des informations inutiles ou ambiguës.", "should translate protocol and data-plan requirements without collecting unnecessary or ambiguous information."],
      ["Pharmacovigilance", "Pharmacovigilance", "organise la détection, l’évaluation, la documentation et la notification des informations de sécurité selon les délais applicables.", "organises detection, assessment, documentation and reporting of safety information under applicable timelines."],
      ["Audit", "Audit", "évalue de façon indépendante et documentée un système ou processus selon des critères définis; il ne doit pas devenir une correction rétroactive.", "independently and documentedly evaluates a system or process against defined criteria; it is not a retroactive correction."],
      ["Inspection", "Inspection", "est une évaluation officielle par une autorité; l’organisation doit pouvoir présenter des preuves traçables et des réponses maîtrisées.", "is an official authority evaluation; the organisation must present traceable evidence and controlled responses."],
      ["Écart au protocole", "Protocol deviation", "doit être décrit factuellement, évalué pour son impact et traité selon le processus qualité applicable.", "must be described factually, assessed for impact and handled under the applicable quality process."],
      ["CAPA", "CAPA", "relie une cause identifiée à une action corrective et préventive vérifiable, avec responsable, délai et preuve d’efficacité.", "links an identified cause to verifiable corrective and preventive action with owner, due date and effectiveness evidence."],
      ["Faisabilité", "Feasibility", "évalue si les centres, la population, les procédures, les ressources et les délais rendent l’étude réaliste.", "assesses whether sites, population, procedures, resources and timelines make the study realistic."],
      ["Activation de centre", "Site activation", "confirme que les prérequis réglementaires, contractuels, matériels, humains et de formation sont satisfaits.", "confirms regulatory, contractual, equipment, staffing and training prerequisites are met."],
      ["Formation", "Training", "doit être adaptée au rôle, datée, traçable et renouvelée lorsque le protocole ou les procédures changent.", "should be role-based, dated, traceable and renewed when protocol or procedures change."],
      ["Délégation", "Delegation", "documente les tâches confiées, les compétences, les dates et la supervision sans transférer la responsabilité ultime de façon implicite.", "documents delegated tasks, competence, dates and oversight without implicitly transferring ultimate responsibility."],
      ["Réconciliation", "Reconciliation", "compare deux sources ou systèmes pour identifier les discordances, les décisions et la résolution traçable.", "compares two sources or systems to identify discrepancies, decisions and traceable resolution."],
      ["Clôture de centre", "Site close-out", "vérifie les données, les produits, les documents essentiels, les actions ouvertes et la conservation prévue.", "checks data, product, essential documents, open actions and planned retention."],
    ],
  },
  {
    category: "Sécurité",
    items: [
      ["Événement indésirable", "Adverse event", "est tout événement médical défavorable après exposition ou participation, sans préjuger de la causalité.", "is any unfavourable medical occurrence after exposure or participation, without presuming causality."],
      ["Événement grave", "Serious adverse event", "est qualifié selon des critères réglementaires de gravité; la gravité et l’intensité ne sont pas synonymes.", "is classified by regulatory seriousness criteria; seriousness and severity are not synonyms."],
      ["Réaction indésirable", "Adverse drug reaction", "implique une relation causale raisonnable avec le médicament dans le contexte applicable.", "implies a reasonable causal relationship with the medicine in the applicable context."],
      ["Grossesse", "Pregnancy reporting", "doit suivre le protocole et les procédures de sécurité, avec respect de la confidentialité et des obligations de suivi.", "should follow protocol and safety procedures while respecting confidentiality and follow-up obligations."],
      ["Signal de sécurité", "Safety signal", "est une information suggérant une association nouvelle ou modifiée qui nécessite une évaluation structurée.", "is information suggesting a new or changed association requiring structured evaluation."],
      ["Déblindage", "Unblinding", "doit être limité aux situations prévues ou nécessaires pour la prise en charge et documenté avec le motif et les conséquences.", "should be limited to prespecified or necessary situations and documented with reason and consequences."],
      ["Comité de surveillance", "Data monitoring committee", "peut examiner des données non aveugles selon une charte et formuler des recommandations indépendantes.", "may review unblinded data under a charter and make independent recommendations."],
      ["Plan de gestion des risques", "Risk management plan", "décrit les risques importants, les activités de surveillance et les mesures de réduction selon le produit et le cadre.", "describes important risks, surveillance activities and minimisation measures according to product and framework."],
      ["Imputabilité", "Causality assessment", "évalue la relation entre événement et intervention avec une méthode définie et sans confondre chronologie et causalité.", "assesses the relationship between event and intervention using a defined method without confusing chronology and causality."],
      ["Intensité", "Intensity", "décrit le niveau d’expression d’un événement; elle doit être distinguée de la qualification réglementaire grave.", "describes how intense an event is and must be distinguished from regulatory seriousness."],
      ["Issue de sécurité", "Safety outcome", "est un résultat de sécurité défini dans le protocole, avec période, méthode et règle d’escalade.", "is a protocol-defined safety outcome with period, method and escalation rule."],
      ["Urgence médicale", "Medical emergency", "privilégie la prise en charge immédiate et les procédures locales; l’outil documentaire ne remplace jamais les soins.", "prioritises immediate care and local procedures; a documentary tool never replaces care."],
      ["Notification accélérée", "Expedited reporting", "s’applique lorsque les critères et délais de la juridiction sont remplis; la source officielle et la version priment.", "applies when jurisdictional criteria and timelines are met; official current sources take precedence."],
      ["Surveillance post-autorisation", "Post-authorisation surveillance", "complète les données pré-autorisation dans des populations et usages plus larges selon le plan applicable.", "complements pre-authorisation data in broader populations and uses under the applicable plan."],
    ],
  },
  {
    category: "Données",
    items: [
      ["ALCOA+", "ALCOA+", "rappelle les qualités attendues d’une donnée attribuable, lisible, contemporaine, originale, exacte, complète, cohérente, durable et disponible.", "summarises expectations for data that are attributable, legible, contemporaneous, original, accurate, complete, consistent, enduring and available."],
      ["Audit trail", "Audit trail", "conserve l’historique des créations, modifications et suppressions pertinentes avec utilisateur, date, heure et justification lorsque requise.", "retains relevant creation, change and deletion history with user, date, time and rationale where required."],
      ["Data management plan", "Data management plan", "décrit les flux, contrôles, responsabilités, codages, queries, réconciliations et règles de gel des données.", "describes flows, controls, responsibilities, coding, queries, reconciliations and database-freeze rules."],
      ["Query", "Data query", "est une demande tracée de clarification ou correction; elle ne doit pas conduire à altérer les faits sans preuve.", "is a traceable request for clarification or correction and must not alter facts without evidence."],
      ["Gel de base", "Database freeze", "fige temporairement les modifications pour réaliser des contrôles définis avant le verrouillage final.", "temporarily freezes changes for defined checks before final lock."],
      ["Verrouillage", "Database lock", "est une décision gouvernée qui clôt la possibilité normale de modifier la base après vérifications et approbations.", "is a governed decision closing normal database modification after checks and approvals."],
      ["Codage médical", "Medical coding", "utilise une terminologie définie et une version traçable; les règles et contrôles doivent être documentés.", "uses a defined, traceable terminology version; rules and controls must be documented."],
      ["eSource", "eSource", "désigne des données saisies ou conservées dans une source électronique; l’origine, l’accès et la traçabilité restent essentiels.", "refers to data captured or retained electronically; origin, access and traceability remain essential."],
      ["Interopérabilité", "Interoperability", "facilite un échange contrôlé entre systèmes sans perdre le contexte, le sens, la version et la traçabilité.", "supports controlled exchange between systems without losing context, meaning, version or traceability."],
      ["Protection des données", "Data protection", "combine base légale, transparence, minimisation, sécurité, droits et gouvernance selon la juridiction.", "combines lawful basis, transparency, minimisation, security, rights and governance by jurisdiction."],
      ["Pseudonymisation", "Pseudonymisation", "réduit le lien direct avec une personne mais ne rend pas nécessairement la donnée anonyme; les clés restent protégées.", "reduces direct linkage but does not necessarily make data anonymous; keys remain protected."],
      ["Anonymisation", "Anonymisation", "suppose une impossibilité raisonnable de réidentifier selon les moyens plausibles; elle ne doit pas être déclarée sans analyse.", "requires a reasonably irreversible inability to re-identify using plausible means and should not be claimed without analysis."],
      ["Dictionnaire de données", "Data dictionary", "définit les variables, formats, valeurs permises, unités, origines et règles d’édition.", "defines variables, formats, permitted values, units, origins and edit rules."],
      ["Revue de données", "Data review", "identifie les incohérences et tendances avant une décision, avec responsabilités, critères et résolution documentés.", "identifies inconsistencies and trends before a decision, with documented owners, criteria and resolution."],
    ],
  },
  {
    category: "Qualité",
    items: [
      ["Qualité par la conception", "Quality by design", "intègre les facteurs critiques pour la qualité dès la conception plutôt que de compter uniquement sur la détection finale.", "builds critical-to-quality factors into design rather than relying only on final detection."],
      ["Facteur critique de qualité", "Critical-to-quality factor", "est un attribut dont la maîtrise est essentielle pour protéger les participants ou produire des résultats fiables.", "is an attribute whose control is essential to protect participants or produce reliable results."],
      ["Gestion des risques", "Risk management", "identifie, évalue, contrôle, communique et réévalue les risques selon leur importance et leur détectabilité.", "identifies, assesses, controls, communicates and reassesses risks by importance and detectability."],
      ["Cause racine", "Root cause", "explique pourquoi un problème s’est produit au niveau du système ou du processus, plutôt que de désigner seulement une personne.", "explains why a problem occurred at system or process level rather than merely naming a person."],
      ["Tendance", "Trend", "met en évidence une évolution répétée ou significative qui peut nécessiter une investigation proportionnée.", "highlights a repeated or meaningful evolution that may require proportionate investigation."],
      ["Effectivité CAPA", "CAPA effectiveness", "vérifie si l’action a réduit la cause ou le risque dans le temps et pas seulement si elle a été clôturée.", "checks whether action reduced cause or risk over time rather than merely being closed."],
      ["Document essentiel", "Essential document", "permet d’évaluer la conduite, la qualité des données et la conformité; sa localisation et sa version doivent être maîtrisées.", "allows assessment of conduct, data quality and compliance; location and version must be controlled."],
      ["Contrôle qualité", "Quality control", "consiste à appliquer des techniques opérationnelles pour vérifier que les activités répondent aux exigences.", "applies operational techniques to verify activities meet requirements."],
      ["Assurance qualité", "Quality assurance", "est un ensemble planifié et systématique donnant confiance dans la maîtrise des processus.", "is a planned and systematic set of activities providing confidence in process control."],
      ["Non-conformité", "Non-conformance", "est un écart à une exigence définie; elle doit être évaluée, documentée et traitée selon le système qualité.", "is a deviation from a defined requirement and must be assessed, documented and handled under the quality system."],
      ["Change control", "Change control", "évalue l’impact d’une modification, ses approbations, sa mise en œuvre et sa vérification avant clôture.", "assesses impact, approvals, implementation and verification of a change before closure."],
      ["Gestion documentaire", "Document management", "maintient version, approbation, accès, archivage et historique des documents contrôlés.", "maintains version, approval, access, archiving and history of controlled documents."],
      ["Inspection readiness", "Inspection readiness", "consiste à être capable de retrouver des preuves cohérentes et de répondre factuellement sans préparer des dossiers artificiels.", "means being able to retrieve coherent evidence and answer factually without creating artificial records."],
      ["Amélioration continue", "Continuous improvement", "utilise les données de qualité et les retours pour réduire les causes récurrentes sans masquer les événements.", "uses quality data and feedback to reduce recurring causes without hiding events."],
    ],
  },
  {
    category: "Soumissions",
    items: [
      ["Dossier de soumission", "Submission dossier", "regroupe les documents requis par la voie et la juridiction, avec cohérence entre protocole, consentement, sécurité et données.", "collects documents required by pathway and jurisdiction with consistency across protocol, consent, safety and data."],
      ["Protocole", "Protocol", "décrit la question, la conception, la population, les procédures, les analyses, la sécurité et la gouvernance de l’étude.", "describes study question, design, population, procedures, analyses, safety and governance."],
      ["Brochure investigateur", "Investigator brochure", "synthétise les informations cliniques et non cliniques pertinentes pour l’évaluation du produit par les investigateurs.", "summarises relevant clinical and non-clinical product information for investigators."],
      ["Formulaire de consentement", "Informed consent form", "traduit l’information pertinente dans une forme compréhensible, approuvée et adaptée à la population.", "translates relevant information into an understandable, approved form suited to the population."],
      ["Amendement substantiel", "Substantial amendment", "doit être qualifié selon la définition et la procédure de la juridiction; son impact sur participants, sécurité et données doit être évalué.", "must be qualified under jurisdictional definition and procedure, assessing impact on participants, safety and data."],
      ["Version de document", "Document version", "permet de démontrer quel contenu était applicable à une date et à un centre donnés.", "demonstrates which content applied at a given date and site."],
      ["Autorité compétente", "Competent authority", "est l’organisme public habilité pour le périmètre concerné; son rôle ne doit pas être confondu avec celui du comité d’éthique.", "is the public body authorised for the relevant scope and should not be confused with the ethics committee."],
      ["Réponse aux questions", "Regulatory response", "doit relier chaque réponse à la question reçue, à une preuve vérifiable et à une décision approuvée.", "should link each answer to the received question, verifiable evidence and an approved decision."],
      ["Traduction réglementaire", "Regulatory translation", "doit préserver le sens, les avertissements, la terminologie et la traçabilité de la révision linguistique.", "must preserve meaning, warnings, terminology and linguistic-review traceability."],
      ["Soumission éthique", "Ethics submission", "présente les informations nécessaires au comité compétent et respecte ses modèles, délais et demandes de clarification.", "presents information needed by the competent committee and follows its templates, timelines and queries."],
      ["Soumission initiale", "Initial submission", "établit le dossier de départ et les responsabilités de suivi avant toute activité autorisée auprès des participants.", "establishes the starting dossier and follow-up responsibilities before authorised participant activities."],
      ["Accusé de réception", "Acknowledgement of receipt", "confirme la réception administrative mais ne vaut pas nécessairement approbation ou autorisation de commencer.", "confirms administrative receipt but does not necessarily mean approval or permission to start."],
      ["Publication des résultats", "Results reporting", "doit respecter les obligations de transparence, les registres et les règles de publication applicables.", "should comply with transparency obligations, registries and applicable publication rules."],
      ["Archivage réglementaire", "Regulatory archiving", "conserve les preuves pendant la durée applicable, avec contrôle d’accès, lisibilité et capacité de restitution.", "retains evidence for the applicable period with access control, readability and retrieval capability."],
    ],
  },
  {
    category: "Glossaire",
    items: [
      ["Investigateur", "Investigator", "personne responsable de la conduite de l’étude sur un site selon ses qualifications, son rôle et les exigences applicables.", "person responsible for study conduct at a site according to qualifications, role and applicable requirements."],
      ["Promoteur", "Sponsor", "organisation qui prend la responsabilité de l’initiation, de la gestion et du financement ou de l’organisation de l’étude.", "organisation responsible for initiation, management and financing or organisation of the study."],
      ["Participant", "Participant", "personne qui prend part à une recherche selon les conditions d’éligibilité et le consentement applicables.", "person taking part in research under applicable eligibility and consent conditions."],
      ["Site", "Site", "lieu ou organisation où des activités de recherche sont conduites ou coordonnées.", "place or organisation where research activities are conducted or coordinated."],
      ["SOP", "SOP", "procédure opératoire standardisée approuvée décrivant une manière contrôlée de réaliser une activité.", "approved standard operating procedure describing a controlled way to perform an activity."],
      ["CRF", "CRF", "formulaire de recueil des données prévues par le protocole.", "form used to collect protocol-required data."],
      ["SAE", "SAE", "événement indésirable grave selon les critères applicables.", "serious adverse event under applicable criteria."],
      ["AE", "AE", "événement indésirable sans présumer de la causalité.", "adverse event without presuming causality."],
      ["GCP", "GCP", "bonnes pratiques cliniques encadrant la protection des participants et la fiabilité des résultats.", "good clinical practice protecting participants and supporting reliable results."],
      ["ICH", "ICH", "Conseil international d’harmonisation des exigences techniques pour les médicaments à usage humain.", "International Council for Harmonisation of technical requirements for human medicines."],
      ["CTIS", "CTIS", "système européen d’information sur les essais cliniques de médicaments relevant du cadre applicable.", "European clinical trials information system for medicines under the applicable framework."],
      ["IND", "IND", "demande ou statut réglementaire américain lié à l’investigation clinique d’un médicament.", "US regulatory application or status related to clinical investigation of a drug."],
      ["IDE", "IDE", "dispositif réglementaire américain concernant l’investigation d’un dispositif médical.", "US regulatory framework for investigation of a medical device."],
      ["Risque", "Risk", "combinaison de la probabilité et de l’impact d’un événement indésirable ou d’une défaillance.", "combination of likelihood and impact of an undesirable event or failure."],
    ],
  },
];

function createEntry(category: KnowledgeCategory, topic: TopicTuple, index: number): ClinicalKnowledgeEntry {
  const [fr, en, frAnswer, enAnswer] = topic;
  const scope = category === "Réglementaire" || category === "Éthique" ? international : ["International"];
  return {
    id: `ckb-${String(index + 1).padStart(3, "0")}`,
    category,
    keywords: { fr: [fr, category], en: [en, category] },
    question: { fr: `Que faut-il savoir sur « ${fr} » ?`, en: `What should be known about “${en}”?` },
    answer: {
      fr: `${frAnswer} Toujours vérifier la version du protocole, les SOP et les exigences de la juridiction avant d’agir.`,
      en: `${enAnswer} Always verify the protocol version, SOPs and jurisdictional requirements before acting.`,
    },
    sources: category === "Statistiques" || category === "Méthodologie" ? statsSources : coreSources,
    geographicScope: scope,
    evidenceLevel: category === "Glossaire" ? "C" : "B",
    localVerificationRequired: category === "Réglementaire" && ["Bénin", "Nigeria NAFDAC", "Afrique du Sud SAHPRA", "Kenya PPB"].includes(fr),
  };
}

export const clinicalKnowledgeBase: ClinicalKnowledgeEntry[] = topics.flatMap(({ category, items }) => items.map((item, index) => createEntry(category, item, index)));

export const knowledgeBase = clinicalKnowledgeBase;
export const clinicalKnowledgeBaseVersion = "2.0.0";
export const clinicalKnowledgeBaseEntryCount = clinicalKnowledgeBase.length;

export const bilingualGlossary = clinicalKnowledgeBase
  .filter(entry => entry.category === "Glossaire")
  .map(entry => ({ fr: entry.keywords.fr[0], en: entry.keywords.en[0], entryId: entry.id }));

if (clinicalKnowledgeBase.length < 150) {
  throw new Error(`Clinical knowledge base must contain at least 150 entries; got ${clinicalKnowledgeBase.length}`);
}
