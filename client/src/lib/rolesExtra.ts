// Métiers complémentaires de la recherche clinique.
// Règle de rédaction : chaque fiche dit seulement ce qu'un texte officiel lu permet de dire (sujet du texte),
// puis marque "à confirmer" tout le reste. Les intitulés et le périmètre exacts varient selon les organisations.
// Sources consultées le 25 novembre 2026. Aucune fiche n'est un avis réglementaire.

export type Ref = { label: string; url: string };
export type ExtraRole = { id: string; pole: string; name: string; focus: string; refs: Ref[]; confirm: string };

export const poles = [
  { id: "p1", name: "Sécurité et vigilance" },
  { id: "p2", name: "Biométrie et données" },
  { id: "p3", name: "Opérations" },
  { id: "p4", name: "Pharmacie et logistique" },
  { id: "p5", name: "Épidémiologie et accès" },
  { id: "p6", name: "Direction et partenaires" },
];

const E2A: Ref = { label: "ICH E2A, gestion des données de sécurité clinique (EMA)", url: "https://www.ema.europa.eu/en/scientific-guidelines/ich-e2a-clinical-safety-data-management-definitions-standards-expedited-reporting" };
const E2B: Ref = { label: "ICH E2B(R3), transmission électronique des cas (EMA)", url: "https://www.ema.europa.eu/en/scientific-guidelines/ich-e2b-r3-electronic-transmission-individual-case-safety-reports-icsrs-data-elements-message-specification-implementation-guide" };
const GVP: Ref = { label: "Bonnes pratiques de pharmacovigilance, GVP (EMA)", url: "https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/pharmacovigilance-post-authorisation/good-pharmacovigilance-practices-gvp" };
const E6: Ref = { label: "ICH E6(R3), bonnes pratiques cliniques (texte final)", url: "https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106_ErrorCorrections_2025_1024.pdf" };
const MDR: Ref = { label: "Règlement (UE) 2017/745 sur les dispositifs médicaux (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/ENG/ALL/?uri=CELEX%3A32017R0745" };
const MDCG: Ref = { label: "MDCG 2020-10/1, déclaration de sécurité en investigation clinique", url: "https://health.ec.europa.eu/system/files/2022-11/md_mdcg_2020-10-1_guidance_safety_reporting_en.pdf" };
const ISO: Ref = { label: "ISO 14155:2026, investigation clinique des dispositifs médicaux", url: "https://www.iso.org/standard/14155" };
const E9: Ref = { label: "ICH E9, principes statistiques (EMA)", url: "https://www.ema.europa.eu/en/scientific-guidelines/ich-e9-statistical-principles-clinical-trials" };
const E9R1: Ref = { label: "ICH E9(R1), addendum sur les estimands", url: "https://database.ich.org/sites/default/files/E9-R1_Step4_Guideline_2019_1203.pdf" };
const SDTM: Ref = { label: "CDISC, standard SDTM", url: "https://www.cdisc.org/standards/foundational/sdtm" };
const ADAM: Ref = { label: "CDISC, standard ADaM", url: "https://www.cdisc.org/standards/foundational/adam" };
const CDASH: Ref = { label: "CDISC, SDTM et CDASH : pourquoi les deux", url: "https://www.cdisc.org/kb/articles/sdtm-and-cdash-why-you-need-both" };
const MEDDRA: Ref = { label: "MedDRA (ICH)", url: "https://www.ich.org/page/meddra" };
const COMP: Ref = { label: "Usage compassionnel (EMA)", url: "https://www.ema.europa.eu/en/human-regulatory-overview/research-development/compassionate-use" };
const EARLY: Ref = { label: "Soutien à l'accès précoce (EMA)", url: "https://www.ema.europa.eu/en/human-regulatory-overview/support-early-access" };
const DARWIN: Ref = { label: "DARWIN EU, réseau d'analyse de données réelles (EMA)", url: "https://www.ema.europa.eu/en/about-us/how-we-work/data-regulation-big-data-other-sources/real-world-evidence/data-analysis-real-world-interrogation-network-darwin-eu" };

const NOSRC = "Aucune source officielle lue pour ce métier : tout le contenu est à confirmer.";

export const extraRoles: ExtraRole[] = [
  { id: "charge-pv", pole: "p1", name: "Chargé de pharmacovigilance", focus: "Travaille sur la gestion des cas de sécurité : définitions des événements, déclaration accélérée, transmission électronique des cas, terminologie MedDRA.", refs: [E2A, E2B, MEDDRA, GVP], confirm: "À confirmer : les délais et le circuit exacts selon le pays, le promoteur et le type d'étude." },
  { id: "medecin-pv", pole: "p1", name: "Médecin de pharmacovigilance", focus: "Évalue médicalement les événements de sécurité. Le cadre de référence est le même que pour le chargé de pharmacovigilance.", refs: [E2A, GVP], confirm: "À confirmer : la répartition des tâches entre médecin et chargé de pharmacovigilance varie selon les organisations ; aucun texte lu ne la fixe." },
  { id: "materiovigilant", pole: "p1", name: "Matériovigilant (dispositifs médicaux)", focus: "Concerne la déclaration de sécurité dans les investigations cliniques de dispositifs médicaux, selon le règlement européen sur les dispositifs médicaux et sa guidance.", refs: [MDR, MDCG, ISO], confirm: "À confirmer : applicabilité hors Union européenne, y compris au Bénin, et délais précis (non relevés ici)." },
  { id: "medecin-moniteur", pole: "p1", name: "Médecin moniteur", focus: "Intervient sur l'évaluation médicale de la sécurité des participants. ICH E6(R3) traite de l'évaluation et de la déclaration de sécurité par le promoteur.", refs: [E6, E2A], confirm: "À confirmer : le titre « médecin moniteur » n'est pas défini dans les textes lus ; son périmètre dépend du promoteur." },
  { id: "msl", pole: "p1", name: "Medical Science Liaison", focus: "Métier d'échange scientifique avec les professionnels de santé.", refs: [], confirm: NOSRC },
  { id: "biostatisticien", pole: "p2", name: "Biostatisticien", focus: "Participe à la conception, à la conduite, à l'analyse et à l'évaluation des essais (ICH E9). L'addendum E9(R1) cadre les estimands et les analyses de sensibilité.", refs: [E9, E9R1], confirm: "À confirmer : outils et logiciels utilisés (non couverts par les textes lus)." },
  { id: "programmeur-cdisc", pole: "p2", name: "Programmeur statistique CDISC", focus: "Met en forme les données avec les standards CDISC : SDTM pour les données d'étude, ADaM pour les jeux de données d'analyse et leur traçabilité.", refs: [SDTM, ADAM], confirm: "À confirmer : versions exigées par chaque autorité, langages de programmation." },
  { id: "concepteur-ecrf", pole: "p2", name: "Concepteur eCRF / EDC", focus: "Conçoit le cahier d'observation électronique. CDASH cadre la collecte des données, en lien avec SDTM. ICH E6(R3) traite des systèmes informatisés (section 4.3).", refs: [CDASH, E6], confirm: "À confirmer : exigences de validation d'un EDC selon l'autorité locale." },
  { id: "bioinfo", pole: "p2", name: "Bio-informaticien biomarqueurs", focus: "Analyse des données de biomarqueurs.", refs: [], confirm: NOSRC },
  { id: "cta-etmf", pole: "p3", name: "Clinical Trial Assistant / eTMF", focus: "Tient le dossier de l'essai. ICH E6(R3) a une annexe C sur les documents essentiels et leur gestion.", refs: [E6], confirm: "À confirmer : liste exacte des documents exigés localement, et règles propres à un eTMF." },
  { id: "faisabilite", pole: "p3", name: "Faisabilité et sélection des centres", focus: "ICH E6(R3) a une section sur la sélection des investigateurs (3.7) et sur les ressources (3.2).", refs: [E6], confirm: "À confirmer : méthodes et critères de faisabilité utilisés en pratique." },
  { id: "contrats-budgets", pole: "p3", name: "Contrats et budgets", focus: "ICH E6(R3) traite du financement (3.5) et des accords (3.6) entre le promoteur, l'investigateur et les prestataires.", refs: [E6], confirm: "À confirmer : modèles de contrat et règles de rémunération au niveau national." },
  { id: "infirmier-recherche", pole: "p3", name: "Infirmier de recherche clinique", focus: "Travaille auprès de l'investigateur. ICH E6(R3) section 2 couvre le consentement, la prise en charge, la sécurité et les documents de l'investigateur.", refs: [E6], confirm: "À confirmer : ce qui peut être délégué à un infirmier, selon la loi du pays et la délégation de l'étude." },
  { id: "rbqm", pole: "p3", name: "Moniteur centralisé / RBQM", focus: "ICH E6(R3) traite de la gestion de la qualité (3.10) et du contrôle qualité (3.11), avec une approche fondée sur les risques.", refs: [E6], confirm: "À confirmer : le terme « moniteur centralisé » et les méthodes de surveillance à distance ne sont pas définis dans la partie lue." },
  { id: "pharmacien-essais", pole: "p4", name: "Pharmacien d'essais cliniques", focus: "ICH E6(R3) traite de la gestion du produit expérimental chez l'investigateur (2.10) et côté promoteur (3.15).", refs: [E6], confirm: "À confirmer : règles pharmaceutiques nationales et rôle exact du pharmacien dans chaque centre." },
  { id: "clinical-supply", pole: "p4", name: "Clinical supply", focus: "ICH E6(R3) a une section sur la fourniture et la manipulation des produits expérimentaux (3.15.3).", refs: [E6], confirm: "À confirmer : chaîne du froid, importation et étiquetage selon les pays." },
  { id: "biobanque", pole: "p4", name: "Coordinateur d'échantillons / biobanque", focus: "Gère les échantillons biologiques d'une étude.", refs: [], confirm: NOSRC },
  { id: "epidemio-rwe", pole: "p5", name: "Épidémiologiste RWE", focus: "Travaille sur des données de la vie réelle. L'EMA décrit DARWIN EU comme un réseau qui produit des données sur l'usage, la sécurité et l'efficacité des médicaments.", refs: [DARWIN], confirm: "À confirmer : méthodes d'analyse et sources de données utilisables en Afrique de l'Ouest." },
  { id: "acces-precoce", pole: "p5", name: "Accès précoce et usage compassionnel", focus: "L'EMA décrit l'usage compassionnel comme une option qui permet d'utiliser un médicament non autorisé dans des conditions strictes.", refs: [COMP, EARLY], confirm: "À confirmer : tout ce qui concerne le Bénin et la France (autorités et procédures nationales non lues)." },
  { id: "heor", pole: "p5", name: "HEOR / market access", focus: "Évaluation économique et accès au marché.", refs: [], confirm: NOSRC },
  { id: "dir-ops", pole: "p6", name: "Directeur des opérations cliniques", focus: "ICH E6(R3) place la supervision de l'essai et la gestion de la qualité sous la responsabilité du promoteur (3.9 et 3.10).", refs: [E6], confirm: "À confirmer : organisation interne, qui répond de quoi dans chaque structure." },
  { id: "cro", pole: "p6", name: "Outsourcing / CRO", focus: "ICH E6(R3) traite de la répartition des activités (3.3), des accords (3.6) et de la supervision (3.9) quand le promoteur confie des tâches à un prestataire.", refs: [E6], confirm: "À confirmer : modèle de sous-traitance, au-delà des principes de l'ICH." },
  { id: "engagement-patient", pole: "p6", name: "Engagement patient et diversité", focus: "ICH E6(R3) parle d'impliquer les parties intéressées dans la conception de la qualité d'un essai.", refs: [E6], confirm: "À confirmer : méthodes d'engagement des patients et exigences sur la diversité ; non couvertes par la partie lue." },
];
