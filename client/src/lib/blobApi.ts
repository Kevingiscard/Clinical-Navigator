// Appels à la fonction gratuite /api/stats (Blob). Aucune donnée nominative : ni cookie, ni compte, ni e-mail.
// En mode hors ligne ou si le service est indisponible, tout échoue en silence et le site reste utilisable.
const API = "/api/stats";

export function qid(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h * 33) ^ text.charCodeAt(i)) >>> 0;
  return "q" + h.toString(36);
}

async function post(action: string, body: unknown): Promise<any | null> {
  try {
    const r = await fetch(`${API}?action=${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return await r.json();
  } catch { return null; }
}
async function get(query: string): Promise<any | null> {
  try { const r = await fetch(`${API}?${query}`); return r.ok ? await r.json() : null; } catch { return null; }
}

export const sendScore = (quiz: string, missedTexts: string[]) => post("score", { quiz, missed: missedTexts.map(qid) });
export const fetchTop = (quiz: string): Promise<{ attempts: number; top: { q: string; n: number }[] } | null> => get(`action=top&quiz=${encodeURIComponent(quiz)}`);
export const sendVote = (fiche: string, v: 0 | 1): Promise<{ ok?: boolean; yes?: number; no?: number } | null> => post("vote", { fiche, v });
export const fetchVotes = (fiche: string): Promise<{ yes: number; no: number } | null> => get(`action=votes&fiche=${encodeURIComponent(fiche)}`);

// Sauvegarde de progression par code personnel aléatoire (sans e-mail, sans compte).
export const createCode = (): Promise<{ code?: string; error?: string } | null> => post("create", {});
export const saveProgress = (code: string, data: Record<string, string>) => post("save", { code, data });
export const forgetProgress = (code: string) => post("forget", { code });
export const loadProgress = (code: string): Promise<{ data?: Record<string, string>; error?: string } | null> => get(`action=load&code=${encodeURIComponent(code)}`);

// Signalement d'erreur : jamais publié automatiquement, relu avant toute correction.
export async function sendReport(page: string, text: string): Promise<{ ok: boolean; error?: string }> {
  const r = await post("report", { page, text });
  return r && r.ok ? { ok: true } : { ok: false, error: (r && r.error) || "Le signalement n'a pas pu être envoyé (connexion nécessaire)." };
}
