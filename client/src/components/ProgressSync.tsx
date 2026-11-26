import { useState } from "react";
import { createCode, forgetProgress, loadProgress, saveProgress } from "@/lib/blobApi";

// Clés de progression envoyées (mêmes règles que le serveur) : jamais le thème, la langue ni le code lui-même.
const SYNC_KEY = /^(cn_(visits|campus_progress)_v1|cn-module-checklist-[a-z0-9-]{1,60}|clinical-navigator-design(-draft)?)$/;
const CODE = /^[a-hj-km-np-z2-9]{16}$/;

function collect(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      const v = k ? window.localStorage.getItem(k) : null;
      if (k && v && SYNC_KEY.test(k) && v.length <= 8000) out[k] = v;
    }
  } catch { /* stockage indisponible */ }
  return out;
}

export function ProgressSync({ onRestored }: { onRestored: () => void }) {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [newCode, setNewCode] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const code = input.trim().toLowerCase().replace(/[\s-]/g, "");
  const validCode = CODE.test(code);

  const save = async () => {
    setBusy(true); setMsg(null); setNewCode(null);
    try {
      const data = collect();
      if (Object.keys(data).length === 0) { setMsg("Rien à sauvegarder pour l'instant : cochez une étape ou une liste d'abord."); return; }
      let target = code;
      if (!target) {
        const c = await createCode();
        if (!c || !c.code) { setMsg("Le service de sauvegarde n'est pas disponible pour l'instant (connexion nécessaire)."); return; }
        target = c.code;
      } else if (!validCode) { setMsg("Ce code n'a pas le bon format (16 caractères)."); return; }
      const r = await saveProgress(target, data);
      if (r && r.ok) { setNewCode(target); setMsg("Sauvegarde enregistrée."); } else setMsg((r && r.error) || "La sauvegarde a échoué. Réessayez plus tard.");
    } finally { setBusy(false); }
  };
  const restore = async () => {
    if (!validCode) { setMsg("Saisissez votre code de 16 caractères."); return; }
    if (!window.confirm("Remplacer la progression de cet appareil par celle de la sauvegarde ?")) return;
    setBusy(true); setMsg(null); setNewCode(null);
    try {
      const r = await loadProgress(code);
      if (!r || !r.data) { setMsg("Aucune sauvegarde trouvée pour ce code."); return; }
      let n = 0;
      for (const [k, v] of Object.entries(r.data)) if (SYNC_KEY.test(k) && typeof v === "string") { try { window.localStorage.setItem(k, v); n++; } catch { /* plein */ } }
      setMsg(`Progression restaurée (${n} élément${n > 1 ? "s" : ""}).`); onRestored();
    } finally { setBusy(false); }
  };
  const forget = async () => {
    if (!validCode) { setMsg("Saisissez votre code de 16 caractères."); return; }
    if (!window.confirm("Supprimer définitivement la sauvegarde liée à ce code ?")) return;
    setBusy(true); setMsg(null); setNewCode(null);
    try { const r = await forgetProgress(code); setMsg(r && r.ok ? "Sauvegarde supprimée." : "La suppression a échoué. Réessayez plus tard."); } finally { setBusy(false); }
  };

  return <article className="pf-card" aria-labelledby="sync-title">
    <h3 id="sync-title">Sauvegarder avec un code (facultatif)</h3>
    <p role="note" className="text-sm">Pour retrouver votre progression sur un autre appareil, sans compte ni e-mail : un code personnel aléatoire est créé. <strong>Notez-le : il ne peut pas être retrouvé.</strong> Toute personne qui connaît ce code peut lire cette sauvegarde. Seuls vos repères (étapes du campus, listes de modules, brouillon de l'atelier, dernières pages vues) sont envoyés. Ne mettez jamais de donnée patient dans le brouillon. Vous pouvez supprimer la sauvegarde à tout moment avec votre code.</p>
    <label htmlFor="sync-code" className="mt-2 block text-sm font-semibold">Mon code (laisser vide pour en créer un nouveau)</label>
    <input id="sync-code" value={input} onChange={e => setInput(e.target.value)} autoComplete="off" spellCheck={false} maxLength={24} className="mt-1 w-full rounded-md border border-[#c9ddd6] bg-white px-3 py-2 font-mono text-sm" />
    <div className="mt-3 flex flex-wrap gap-2">
      <button type="button" className="pf-btn" disabled={busy} onClick={save}>Sauvegarder</button>
      <button type="button" className="pf-btn" disabled={busy} onClick={restore}>Restaurer</button>
      <button type="button" className="pf-btn pf-btn-danger" disabled={busy} onClick={forget}>Supprimer la sauvegarde</button>
    </div>
    {msg ? <p role="status" className="mt-2 text-sm">{msg}</p> : null}
    {newCode ? <p className="mt-2 rounded-md bg-[#fdf6e9] p-3 text-sm">Votre code : <strong className="font-mono text-base tracking-wider">{newCode}</strong><br />Notez-le maintenant. Il n'est pas gardé sur cet appareil.</p> : null}
  </article>;
}
