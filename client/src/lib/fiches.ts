// Fiches pédagogiques (lot 3). Chaque fiche sépare le principe général de ce qui dépend du type d'étude,
// du pays, du protocole et d'une personne compétente. Aucune fiche n'est un avis réglementaire, statistique ou médical.
// Sources officielles consultées le 26 novembre 2026. Statut : version pédagogique, à faire valider avant tout usage en étude.
import type { Ref } from "@/lib/rolesExtra";

export type Fiche = { id: string; domaine: string; titre: string; principe: string[]; typeEtude: string; pays: string; protocole: string; aConfirmer: string; refs: Ref[] };
export const FICHES_REVIEWED = "26 novembre 2026";

const E6: Ref = { label: "ICH E6(R3), bonnes pratiques cliniques (texte final, ICH)", url: "https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106_ErrorCorrections_2025_1024.pdf" };
const E6EMA: Ref = { label: "ICH E6 Good clinical practice (EMA)", url: "https://www.ema.europa.eu/en/scientific-guidelines/ich-e6-good-clinical-practice" };
const E9: Ref = { label: "ICH E9, principes statistiques (EMA)", url: "https://www.ema.europa.eu/en/scientific-guidelines/ich-e9-statistical-principles-clinical-trials" };
const E9R1: Ref = { label: "ICH E9(R1), addendum sur les estimands (ICH)", url: "https://database.ich.org/sites/default/files/E9-R1_Step4_Guideline_2019_1203.pdf" };
const E2A: Ref = { label: "ICH E2A, gestion des données de sécurité clinique (EMA)", url: "https://www.ema.europa.eu/en/scientific-guidelines/ich-e2a-clinical-safety-data-management-definitions-standards-expedited-reporting" };
const CDASH: Ref = { label: "CDISC, SDTM et CDASH : pourquoi les deux", url: "https://www.cdisc.org/kb/articles/sdtm-and-cdash-why-you-need-both" };

export const FICHES: Fiche[] = [
  { id: "randomisation-insu", domaine: "Méthodologie", titre: "Randomisation et insu", principe: [
    "La randomisation répartit les participants entre les groupes par tirage au sort, pour que les groupes soient comparables en moyenne.",
    "L'insu (aveugle) limite l'influence de la connaissance du groupe sur la prise en charge et sur l'évaluation des critères.",
    "La liste de randomisation et la levée d'insu sont des opérations encadrées : elles sont décrites à l'avance et tracées."],
    typeEtude: "Tous les essais ne sont pas randomisés ni en insu : cela dépend du design, de l'intervention et de la faisabilité.",
    pays: "Les exigences de documentation et d'autorisation varient selon la juridiction.",
    protocole: "Le protocole fixe la méthode d'allocation, les facteurs de stratification éventuels et les règles de levée d'insu.",
    aConfirmer: "Le choix de la méthode et la liste de randomisation relèvent de la biostatistique et de la méthodologie.", refs: [E9, E6EMA] },
  { id: "criteres-estimands", domaine: "Méthodologie", titre: "Critères de jugement et estimands", principe: [
    "Un critère de jugement est la mesure qui permet de répondre à la question de l'essai.",
    "Un estimand précise ce qui est estimé : population, variable, événements intercurrents et résumé statistique.",
    "Définir l'estimand avant l'analyse évite des écarts entre la question posée et le calcul réalisé."],
    typeEtude: "Le niveau de détail dépend de la phase, de l'objectif et du design de l'étude.",
    pays: "Les autorités peuvent avoir des attentes propres : à vérifier auprès de l'autorité compétente.",
    protocole: "Le protocole et le plan d'analyse statistique fixent critères, échéances et gestion des événements intercurrents.",
    aConfirmer: "La définition de l'estimand et le plan d'analyse doivent être validés par un biostatisticien.", refs: [E9, E9R1] },
  { id: "taille-echantillon", domaine: "Méthodologie", titre: "Taille d'échantillon : les paramètres à connaître", principe: [
    "Le calcul de la taille d'échantillon dépend d'hypothèses : effet attendu, variabilité, risque d'erreur et puissance.",
    "Un changement d'hypothèse modifie fortement le résultat : les hypothèses et leur source sont consignées.",
    "Les sorties d'étude et les données manquantes sont à prévoir dans l'effectif à recruter."],
    typeEtude: "La méthode dépend du type de critère (quantitatif, binaire, délai) et du design.",
    pays: "Pas de règle de calcul propre à un pays : la justification est examinée par les instances d'évaluation.",
    protocole: "La justification de l'effectif figure dans le protocole.",
    aConfirmer: "Tout calcul utilisé dans un protocole doit être réalisé ou validé par un biostatisticien.", refs: [E9] },
  { id: "qualite-risques", domaine: "Qualité", titre: "Qualité par la conception et approche proportionnée au risque", principe: [
    "La qualité se prépare dès la conception : on identifie ce qui est critique pour la sécurité des participants et la fiabilité des résultats.",
    "Les mesures de maîtrise sont proportionnées aux risques identifiés, puis revues pendant l'étude.",
    "Les déviations et les actions correctives et préventives (CAPA) alimentent l'amélioration continue."],
    typeEtude: "Les risques et les contrôles dépendent de l'étude : population, produit, complexité, systèmes utilisés.",
    pays: "Les attentes d'inspection et de documentation varient selon l'autorité.",
    protocole: "Le plan de gestion des risques et le plan de monitoring sont propres à l'étude.",
    aConfirmer: "Les seuils et fréquences de contrôle sont ceux des procédures de l'organisation, pas ceux des outils pédagogiques du site.", refs: [E6, E6EMA] },
  { id: "donnees-ecrf", domaine: "Données", titre: "Collecte et qualité des données", principe: [
    "Un formulaire de recueil (CRF ou eCRF) collecte les données prévues par le protocole, rien de plus.",
    "Des contrôles de cohérence et des requêtes (queries) permettent de corriger les anomalies avec traçabilité.",
    "Les standards de données, comme CDASH pour la collecte et SDTM pour la présentation, facilitent la réutilisation des données."],
    typeEtude: "La structure des formulaires dépend du protocole, du domaine thérapeutique et du système utilisé.",
    pays: "Les règles de protection des données personnelles dépendent du pays. Aucune donnée de participant n'est saisie sur ce site.",
    protocole: "Le plan de gestion des données décrit variables, contrôles, codage et gel de base.",
    aConfirmer: "La validation du système et les exigences de conservation relèvent des procédures de l'organisation et de la réglementation applicable.", refs: [CDASH, E6EMA] },
  { id: "securite-evenements", domaine: "Sécurité et vigilance", titre: "Événements indésirables : repères de vocabulaire", principe: [
    "Un événement indésirable est tout événement médical défavorable survenant chez un participant, lié ou non au produit étudié.",
    "La gravité et le lien avec le produit sont deux évaluations distinctes.",
    "La déclaration suit un circuit prévu à l'avance, avec des délais qui dépendent du cadre applicable."],
    typeEtude: "Les définitions et circuits diffèrent entre médicaments, dispositifs médicaux et recherches non interventionnelles.",
    pays: "Autorités destinataires, formulaires et délais dépendent du pays et du type de recherche. Aucun délai n'est donné ici.",
    protocole: "Le protocole précise les événements à recueillir, la période de suivi et le circuit de déclaration.",
    aConfirmer: "Toute classification et toute déclaration relèvent de l'investigateur, du promoteur et des personnes habilitées, selon les textes officiels en vigueur.", refs: [E2A, E6EMA] },
];
