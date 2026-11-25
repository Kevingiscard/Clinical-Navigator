// Listes de contrôle génériques et pédagogiques. À adapter au protocole, aux procédures (SOP) et à la juridiction.
export type ChecklistDef = { id: string; title: string; phase: string; items: string[] };
export const CHECKLISTS: ChecklistDef[] = [
  { id: "selection-centre", title: "Sélection et qualification d'un centre", phase: "Mise en place", items: [
    "Population éligible estimée à partir de données agrégées",
    "Investigateur et équipe disponibles, expérience de recherche documentée",
    "Locaux et équipements adaptés aux examens du protocole",
    "Circuits du produit expérimental et des échantillons possibles",
    "Délais de contractualisation et d'avis éthique réalistes",
    "Compte rendu de qualification rédigé et archivé"] },
  { id: "mise-en-place", title: "Visite de mise en place et activation", phase: "Mise en place", items: [
    "Protocole, version en vigueur et documents d'information remis à l'équipe",
    "Formation au protocole et aux systèmes documentée",
    "Délégation des tâches signée avant toute activité sur l'étude",
    "Accès aux systèmes (eCRF, randomisation) créés et testés",
    "Produit expérimental et matériel reçus et contrôlés",
    "Autorisations et avis requis disponibles dans le dossier",
    "Décision d'activation du centre tracée"] },
  { id: "monitoring", title: "Visite de monitoring : trame de préparation", phase: "Conduite", items: [
    "Plan de monitoring et points à vérifier relus",
    "Actions et requêtes de la visite précédente revues",
    "Versions du consentement et du protocole vérifiées",
    "Données sources à comparer avec l'eCRF identifiées",
    "Déviations et événements de sécurité à discuter listés",
    "Produit expérimental : réception, stockage, traçabilité",
    "Compte rendu et lettre de suivi planifiés dans les délais des procédures"] },
  { id: "tmf-isf", title: "Complétude du dossier de l'essai (TMF) et du dossier investigateur (ISF)", phase: "Documentation", items: [
    "Liste des documents essentiels du cadre retenu définie",
    "Versions, dates et signatures contrôlées",
    "Curriculum vitae et formations de l'équipe à jour",
    "Délégations, avis et autorisations classés",
    "Documents en attente identifiés avec un responsable",
    "Contrôle de complétude daté et tracé"] },
  { id: "audit", title: "Préparation d'audit ou d'inspection", phase: "Qualité", items: [
    "Périmètre et calendrier connus, personnes disponibles",
    "Dossiers essentiels à jour et accessibles",
    "Déviations et CAPA ouvertes revues",
    "Formations et délégations vérifiées",
    "Salle, accès aux systèmes et personne référente prévus",
    "Réponses factuelles préparées, sans extrapolation"] },
  { id: "gel-base", title: "Revue des données et gel de base", phase: "Données", items: [
    "Requêtes ouvertes résolues ou justifiées",
    "Contrôles de cohérence exécutés et revus",
    "Codage (événements, traitements) finalisé",
    "Données manquantes et déviations documentées",
    "Droits d'accès revus avant verrouillage",
    "Décision de gel signée selon la procédure"] },
  { id: "cloture", title: "Clôture d'un centre et fin d'étude", phase: "Clôture", items: [
    "Dernière visite du dernier participant confirmée",
    "Données et requêtes finalisées",
    "Produit expérimental : bilan, retour ou destruction tracés",
    "Dossier investigateur complet et archivage prévu",
    "Informations de fin d'étude transmises selon le cadre applicable",
    "Rapport d'étude et diffusion des résultats planifiés"] },
];
export const checklistProgress = (def: ChecklistDef, done: Record<string, boolean>) => {
  const n = def.items.filter((_, i) => done[`${def.id}:${i}`]).length;
  return { done: n, total: def.items.length, percent: Math.round((n / def.items.length) * 100) };
};
export function checklistToText(def: ChecklistDef, done: Record<string, boolean>): string {
  return [def.title, ...def.items.map((t, i) => `${done[`${def.id}:${i}`] ? "[x]" : "[ ]"} ${t}`), "", "Liste générique : à adapter au protocole, aux procédures et à la juridiction."].join("\n");
}
export const parseStored = (raw: string | null): Record<string, boolean> => {
  try { const v = JSON.parse(raw ?? "{}"); return v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).filter(([, x]) => typeof x === "boolean")) as Record<string, boolean> : {}; } catch { return {}; }
};
