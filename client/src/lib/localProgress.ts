// Progression locale : tout reste dans le navigateur de l'appareil. Rien n'est envoyé.
// Lecture des clés déjà utilisées par le site, plus un historique des pages vues (8 dernières).

export const VISITS_KEY = "cn_visits_v1";
export const CAMPUS_KEY = "cn_campus_progress_v1";
const KNOWN_KEYS = [VISITS_KEY, CAMPUS_KEY, "clinical-navigator-design", "clinical-navigator-design-draft"];
const KNOWN_PREFIX = "cn-module-checklist-";

export type Visit = { route: string; at: number };

function read<T>(key: string, fallback: T): T {
  try { const raw = window.localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}

export function loadVisits(): Visit[] {
  const v = read<unknown>(VISITS_KEY, []);
  return Array.isArray(v) ? v.filter((x): x is Visit => !!x && typeof (x as Visit).route === "string" && typeof (x as Visit).at === "number").slice(0, 8) : [];
}

export function recordVisit(rawRoute: string, now = Date.now()) {
  const route = rawRoute.replace(/\/+$/, "") || "/";
  if (!route.startsWith("/fr/") || route === "/fr/tableau-de-bord") return;
  const next = [{ route, at: now }, ...loadVisits().filter(v => v.route !== route)].slice(0, 8);
  try { window.localStorage.setItem(VISITS_KEY, JSON.stringify(next)); } catch { /* stockage indisponible */ }
}

export function loadCampusDone(): string[] {
  const v = read<unknown>(CAMPUS_KEY, []);
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

export function loadModuleChecks(moduleId: string): number {
  const v = read<Record<string, boolean>>(`${KNOWN_PREFIX}${moduleId}`, {});
  return Object.values(v || {}).filter(Boolean).length;
}

export function hasDesignDraft(): boolean {
  try { return !!(window.localStorage.getItem("clinical-navigator-design") || window.localStorage.getItem("clinical-navigator-design-draft")); } catch { return false; }
}

// Efface uniquement les clés de progression connues (pas le thème, pas la langue).
export function clearLocalProgress() {
  try {
    for (const k of KNOWN_KEYS) window.localStorage.removeItem(k);
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(KNOWN_PREFIX)) window.localStorage.removeItem(k);
    }
  } catch { /* rien à effacer */ }
}
