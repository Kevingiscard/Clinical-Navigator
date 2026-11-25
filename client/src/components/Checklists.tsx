import { Button } from "@/components/ui/button";
import { CHECKLISTS, checklistProgress, checklistToText, parseStored } from "@/lib/checklists";
import { useEffect, useState } from "react";

const KEY = "cn-checklists-v1";
export function Checklists() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState("");
  useEffect(() => { try { setDone(parseStored(localStorage.getItem(KEY))); } catch { /* stockage indisponible */ } }, []);
  const save = (next: Record<string, boolean>) => { setDone(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* stockage indisponible */ } };
  return <section className="container pb-10" aria-labelledby="chk-title">
    <h2 id="chk-title" className="font-serif text-3xl font-bold text-[#0d2b36]">Listes de contrôle</h2>
    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526b67]">Sept listes génériques, cochables dans votre navigateur. Elles sont mémorisées localement sur cet appareil, sans envoi. Elles sont à adapter au protocole, aux procédures de votre organisation et à la juridiction. Ne saisissez aucune donnée de participant.</p>
    <div className="mt-6 grid gap-4 lg:grid-cols-2">{CHECKLISTS.map(def => { const p = checklistProgress(def, done); return <details key={def.id} className="rounded-2xl border border-[#dbe8e3] bg-white p-5 shadow-sm">
      <summary className="cursor-pointer text-base font-bold text-[#183f43]">{def.title}<span className="block text-xs font-normal text-[#3f635b]">{def.phase} · {p.done}/{p.total} cochés ({p.percent} %)</span></summary>
      <ul className="mt-4 grid gap-2">{def.items.map((t, i) => { const k = `${def.id}:${i}`; return <li key={k}><label className="flex items-start gap-2 text-sm text-[#3f615c]"><input type="checkbox" className="mt-1" checked={!!done[k]} onChange={() => save({ ...done, [k]: !done[k] })} />{t}</label></li>; })}</ul>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" className="border-[#bed8ce]" onClick={async () => { try { await navigator.clipboard.writeText(checklistToText(def, done)); setCopied(def.id); } catch { setCopied(""); } }}>{copied === def.id ? "Copié" : "Copier la liste"}</Button>
        <Button variant="outline" className="border-[#bed8ce]" onClick={() => { const n = { ...done }; def.items.forEach((_, i) => delete n[`${def.id}:${i}`]); save(n); }}>Réinitialiser cette liste</Button>
      </div></details>; })}</div>
  </section>;
}
