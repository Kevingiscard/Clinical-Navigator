// Calculs de fenêtre de visite exécutés dans le navigateur (aucun serveur, aucune donnée envoyée).
// Dates traitées en UTC à midi pour éviter tout décalage lié au fuseau ou à l'heure d'été.

export type DayMode = "calendaires" | "ouvres";
export type VisitWindow = { min: string; max: string; explication: string[] };

const DAY = 86_400_000;
const parse = (iso: string): Date | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d ? date : null;
};
const fmt = (d: Date) => d.toISOString().slice(0, 10);
const isOpen = (d: Date, off: Set<string>) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6 && !off.has(fmt(d));

/** Décale une date de n jours ouvrés (lundi à vendredi, hors dates exclues). n peut être négatif. */
export function shiftOpenDays(start: Date, n: number, off: Set<string>): Date {
  const step = n < 0 ? -1 : 1;
  let left = Math.abs(n);
  let current = new Date(start.getTime());
  while (left > 0) {
    current = new Date(current.getTime() + step * DAY);
    if (isOpen(current, off)) left -= 1;
  }
  return current;
}

export function calculateWindow(reference: string, lower: number, upper: number, mode: DayMode, excluded: string[] = []): { ok: true; value: VisitWindow } | { ok: false; error: string } {
  const base = parse(reference);
  if (!base) return { ok: false, error: "Saisissez une date valide au format jj/mm/aaaa." };
  if (!Number.isInteger(lower) || !Number.isInteger(upper)) return { ok: false, error: "Les bornes de la fenêtre doivent être des nombres entiers de jours." };
  if (Math.abs(lower) > 365 || Math.abs(upper) > 365) return { ok: false, error: "Les bornes doivent rester comprises entre -365 et 365 jours." };
  if (lower > upper) return { ok: false, error: "La borne basse ne peut pas être supérieure à la borne haute." };
  const off = new Set<string>();
  for (const item of excluded) {
    if (!parse(item)) return { ok: false, error: `Date exclue non valide : ${item}.` };
    off.add(item);
  }
  const min = mode === "ouvres" ? shiftOpenDays(base, lower, off) : new Date(base.getTime() + lower * DAY);
  const max = mode === "ouvres" ? shiftOpenDays(base, upper, off) : new Date(base.getTime() + upper * DAY);
  const unit = mode === "ouvres" ? "jours ouvrés (du lundi au vendredi, hors dates exclues)" : "jours calendaires";
  return { ok: true, value: { min: fmt(min), max: fmt(max), explication: [
    `Date de référence : ${reference}.`,
    `Borne basse : ${lower >= 0 ? "+" : ""}${lower} ${unit}, soit le ${fmt(min)}.`,
    `Borne haute : ${upper >= 0 ? "+" : ""}${upper} ${unit}, soit le ${fmt(max)}.`,
    "Les bornes, le type de jours et les jours exclus doivent venir du protocole de l'étude.",
  ] } };
}

export const capaSteps = [
  "Décrire les faits et le périmètre, sans donnée permettant d'identifier un participant.",
  "Sécuriser la situation si un risque est identifié.",
  "Rassembler les éléments disponibles.",
  "Analyser les causes avec les rôles compétents (par exemple la méthode des 5 pourquoi).",
  "Définir les actions correctives et préventives.",
  "Attribuer un responsable et une échéance à chaque action.",
  "Vérifier l'efficacité selon le processus qualité applicable.",
];
export const capaWarning = "Ce canevas ne remplace pas la procédure CAPA applicable dans votre organisation.";
export function buildCapa(issue: string): { ok: true; steps: string[]; warning: string } | { ok: false; error: string } {
  const text = issue.trim();
  if (text.length < 10) return { ok: false, error: "Décrivez le problème en au moins 10 caractères." };
  if (text.length > 1000) return { ok: false, error: "La description ne doit pas dépasser 1000 caractères." };
  return { ok: true, steps: capaSteps, warning: capaWarning };
}
