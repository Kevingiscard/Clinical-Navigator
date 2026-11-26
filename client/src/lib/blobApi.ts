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
