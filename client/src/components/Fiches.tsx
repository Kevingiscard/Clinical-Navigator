import { useState } from "react";
import { FICHES, FICHES_REVIEWED } from "@/lib/fiches";
import { sendVote } from "@/lib/blobApi";

// Compteur « utile / pas utile » : un clic, sans cookie, sans compte, sans identifiant.
function FicheVote({ id }: { id: string }) {
  const [state, setState] = useState<"idle" | "sent" | "error">("idle");
  const [counts, setCounts] = useState<{ yes: number; no: number } | null>(null);
  const vote = async (v: 0 | 1) => {
    const r = await sendVote(id, v);
    if (r && r.ok) { setCounts({ yes: r.yes ?? 0, no: r.no ?? 0 }); setState("sent"); } else setState("error");
  };
  return <div className="mt-3 rounded-lg bg-[#f3f7f5] p-3 text-sm text-[#344d49]" role="group" aria-label="Cette fiche vous a-t-elle été utile ?">
    {state === "sent" && counts ? <p>Merci. {counts.yes} personne(s) ont trouvé cette fiche utile, {counts.no} pas utile. Compteur anonyme, sans cookie.</p> : <>
      <span className="mr-2 font-semibold">Cette fiche vous a-t-elle été utile ?</span>
      <button type="button" onClick={() => vote(1)} className="mr-2 rounded-md border border-[#b9d6ca] bg-white px-3 py-1 text-xs font-bold text-[#17645c]">Utile</button>
      <button type="button" onClick={() => vote(0)} className="rounded-md border border-[#b9d6ca] bg-white px-3 py-1 text-xs font-bold text-[#17645c]">Pas utile</button>
      <span className="ml-2 text-xs text-[#4b6460]">Un clic, aucun cookie ni identifiant.</span>
      {state === "error" && <p className="mt-1 text-xs text-[#8a4b1f]">Le vote n'a pas pu être enregistré (connexion nécessaire). Réessayez plus tard.</p>}
    </>}
  </div>;
}

export function Fiches() {
  return <section className="mt-10" aria-labelledby="fiches-title">
    <h2 id="fiches-title" className="font-serif text-3xl font-bold text-[#0d2b36]">Fiches pédagogiques</h2>
    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4b6460]">Chaque fiche sépare le principe général de ce qui dépend du type d'étude, du pays et du protocole. Sources officielles consultées le {FICHES_REVIEWED}. Statut : version pédagogique, à faire valider par une personne compétente avant tout usage dans une étude.</p>
    <div className="mt-5 grid gap-3 lg:grid-cols-2">{FICHES.map(f => <details key={f.id} className="rounded-xl border border-[#dce4e1] bg-white p-4">
      <summary className="cursor-pointer font-bold text-[#344d49]">{f.titre}<span className="block text-xs font-normal text-[#3f635b]">{f.domaine}</span></summary>
      <h3 className="mt-3 text-sm font-bold text-[#183f43]">Principe général</h3>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-[#4b6460]">{f.principe.map(p => <li key={p}>{p}</li>)}</ul>
      <dl className="mt-3 grid gap-2 text-sm leading-6 text-[#4b6460]">
        <div><dt className="font-bold text-[#183f43]">Selon le type d'étude</dt><dd>{f.typeEtude}</dd></div>
        <div><dt className="font-bold text-[#183f43]">Selon le pays</dt><dd>{f.pays}</dd></div>
        <div><dt className="font-bold text-[#183f43]">Selon le protocole</dt><dd>{f.protocole}</dd></div>
        <div><dt className="font-bold text-[#183f43]">À confirmer par une personne compétente</dt><dd>{f.aConfirmer}</dd></div></dl>
      <p className="mt-3 text-sm"><a className="font-bold text-[#1b5f55] underline" href={`/api/stats?action=doc&id=fiche-${f.id}`} download>Télécharger cette fiche (.md)</a><span className="ml-2 text-xs text-[#4b6460]">fichier texte, nécessite une connexion</span></p>
      <FicheVote id={f.id} />
      <p className="mt-3 text-xs font-bold text-[#183f43]">Sources</p>
      <ul className="mt-1 space-y-1 text-xs">{f.refs.map(r => <li key={r.url}><a className="text-[#1b5f55] underline" href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a></li>)}</ul>
    </details>)}</div>
  </section>;
}
