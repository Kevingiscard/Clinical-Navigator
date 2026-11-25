// Outils de pilotage exécutés dans le navigateur : matrice de risques, grille de faisabilité, suivi d'actions.
// Aucune donnée n'est envoyée. Les seuils sont pédagogiques : à remplacer par ceux de votre procédure qualité.

export type Level = "faible" | "modéré" | "élevé" | "critique";
export type Risk = { id: string; label: string; p: number; i: number; d: number; control: string; rp: number; ri: number; rd: number };

const inRange = (n: number) => Number.isInteger(n) && n >= 1 && n <= 5;
export const criticality = (p: number, i: number, d: number): number | null => (inRange(p) && inRange(i) && inRange(d) ? p * i * d : null);
/** Seuils pédagogiques sur le produit probabilité x impact x détectabilité (1 à 125). */
export function levelOf(score: number): Level {
  if (score <= 12) return "faible";
  if (score <= 40) return "modéré";
  if (score <= 75) return "élevé";
  return "critique";
}
export function validateRisk(r: Pick<Risk, "label" | "p" | "i" | "d" | "rp" | "ri" | "rd">): string | null {
  if (r.label.trim().length < 3) return "Décrivez le risque en au moins 3 caractères.";
  if (r.label.length > 200) return "La description du risque ne doit pas dépasser 200 caractères.";
  if (![r.p, r.i, r.d, r.rp, r.ri, r.rd].every(inRange)) return "Chaque note doit être un entier de 1 à 5.";
  return null;
}
const csvCell = (v: string | number) => {
  let s = String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // évite l'interprétation comme formule dans un tableur
  return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
export function risksToCsv(risks: Risk[]): string {
  const head = ["Risque", "Probabilité", "Impact", "Détectabilité", "Criticité", "Niveau", "Mesure de maîtrise", "Criticité résiduelle", "Niveau résiduel"];
  const rows = risks.map(r => {
    const c = r.p * r.i * r.d, rc = r.rp * r.ri * r.rd;
    return [r.label, r.p, r.i, r.d, c, levelOf(c), r.control, rc, levelOf(rc)].map(csvCell).join(";");
  });
  return [head.join(";"), ...rows].join("\n");
}

export type Criterion = { id: string; label: string; weight: number; score: number };
export const defaultCriteria = (): Criterion[] => [
  { id: "pop", label: "Population éligible accessible", weight: 5, score: 0 },
  { id: "team", label: "Équipe disponible et formée", weight: 4, score: 0 },
  { id: "equip", label: "Équipements et locaux adaptés", weight: 3, score: 0 },
  { id: "exp", label: "Expérience de recherche comparable", weight: 3, score: 0 },
  { id: "delay", label: "Délais de contractualisation réalistes", weight: 2, score: 0 },
];
/** Score pondéré en pourcentage : somme(poids x note) / (5 x somme des poids). */
export function feasibility(criteria: Criterion[]): { ok: true; percent: number; lines: { label: string; share: number }[] } | { ok: false; error: string } {
  if (!criteria.length) return { ok: false, error: "Ajoutez au moins un critère." };
  for (const c of criteria) {
    if (!c.label.trim()) return { ok: false, error: "Chaque critère doit avoir un nom." };
    if (!Number.isInteger(c.weight) || c.weight < 0 || c.weight > 5) return { ok: false, error: `Le poids de « ${c.label} » doit être un entier de 0 à 5.` };
    if (!Number.isInteger(c.score) || c.score < 0 || c.score > 5) return { ok: false, error: `La note de « ${c.label} » doit être un entier de 0 à 5.` };
  }
  const totalWeight = criteria.reduce((a, c) => a + c.weight, 0);
  if (totalWeight === 0) return { ok: false, error: "Au moins un critère doit avoir un poids supérieur à 0." };
  const sum = criteria.reduce((a, c) => a + c.weight * c.score, 0);
  const percent = Math.round((sum / (5 * totalWeight)) * 1000) / 10;
  return { ok: true, percent, lines: criteria.map(c => ({ label: c.label, share: Math.round((c.weight * c.score / (5 * totalWeight)) * 1000) / 10 })) };
}

export type ActionItem = { id: string; label: string; owner: string; due: string; priority: "haute" | "normale" | "basse"; done: boolean };
export function validateAction(a: Pick<ActionItem, "label" | "due">): string | null {
  if (a.label.trim().length < 3) return "Décrivez l'action en au moins 3 caractères.";
  if (a.label.length > 200) return "L'action ne doit pas dépasser 200 caractères.";
  if (a.due && !/^\d{4}-\d{2}-\d{2}$/.test(a.due)) return "L'échéance doit être une date valide.";
  return null;
}
export const isOverdue = (a: ActionItem, today: string) => !a.done && !!a.due && a.due < today;
