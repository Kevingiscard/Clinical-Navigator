import { useState } from "react";
import { useLocation } from "wouter";
import { sendReport } from "@/lib/blobApi";

// Signalement d'erreur modéré : texte libre court, sans nom, sans coordonnées, relu par l'auteur avant toute correction.
export function ReportError() {
  const [location] = useLocation();
  const [text, setText] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  const send = async () => {
    setState("busy");
    const page = location.split("?")[0].split("#")[0] || "/";
    const r = await sendReport(page, text);
    if (r.ok) { setState("sent"); setText(""); } else { setErr(r.error || ""); setState("error"); }
  };
  return <details className="mt-3 text-sm text-[#355a57]">
    <summary className="cursor-pointer font-semibold">Signaler une erreur sur cette page</summary>
    {state === "sent" ? <p role="status" className="mt-2">Merci. Votre signalement sera relu avant toute correction. Il n'est pas publié.</p> : <div className="mt-2">
      <label htmlFor="report-text" className="block text-xs">Décrivez l'erreur en une ou deux phrases (10 à 500 caractères). Pas de nom, pas d'e-mail, pas de lien, pas de donnée patient : ils seraient refusés. Aucune réponse individuelle n'est envoyée.</label>
      <textarea id="report-text" value={text} onChange={e => setText(e.target.value)} maxLength={500} rows={3} className="mt-1 w-full rounded-md border border-[#c9ddd6] bg-white p-2 text-sm" />
      <button type="button" disabled={state === "busy" || text.trim().length < 10} onClick={send} className="mt-2 rounded-md bg-[#0d2b36] px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50">Envoyer le signalement</button>
      {state === "error" ? <p role="alert" className="mt-1 text-xs text-[#8a4b1f]">{err}</p> : null}
    </div>}
  </details>;
}
