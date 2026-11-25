import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { simulateEnrollment, type EnrollmentResult } from "@/lib/enrollment";
import { useState } from "react";

const fields: { key: string; label: string; step?: string }[] = [
  { key: "completers", label: "Participants à terminer l'étude" },
  { key: "centres", label: "Nombre de centres" },
  { key: "screenedPerCentreMonth", label: "Présélectionnés par centre et par mois", step: "any" },
  { key: "screenFailPct", label: "Échecs de présélection (%)", step: "any" },
  { key: "dropoutPct", label: "Sorties d'étude (%)", step: "any" },
  { key: "activationLagMonths", label: "Délai d'activation des centres (mois)" },
];
export function EnrollmentSim() {
  const [v, setV] = useState<Record<string, string>>({ completers: "90", centres: "5", screenedPerCentreMonth: "4", screenFailPct: "20", dropoutPct: "10", activationLagMonths: "2" });
  const [res, setRes] = useState<EnrollmentResult | null>(null);
  const run = () => setRes(simulateEnrollment({ completers: Number(v.completers), centres: Number(v.centres), screenedPerCentreMonth: Number(v.screenedPerCentreMonth), screenFailPct: Number(v.screenFailPct), dropoutPct: Number(v.dropoutPct), activationLagMonths: Number(v.activationLagMonths) }));
  return <article className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm lg:col-span-2" aria-labelledby="enr-title">
    <h3 id="enr-title" className="text-xl font-bold text-[#183f43]">Simulateur d'inclusion</h3>
    <p className="mt-1 text-sm leading-6 text-[#526d68]">Estime la durée de recrutement à partir d'hypothèses agrégées. Ne saisissez aucune donnée de participant. Calcul local, rien n'est envoyé.</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-3">{fields.map(f => <label key={f.key} className="grid gap-1 text-xs font-bold text-[#3f635b]">{f.label}<Input type="number" inputMode="decimal" step={f.step} value={v[f.key]} onChange={e => setV({ ...v, [f.key]: e.target.value })} /></label>)}</div>
    <div className="mt-4 flex gap-2"><Button className="bg-[#0d2b36] hover:bg-[#164451]" onClick={run}>Simuler le recrutement</Button><Button variant="outline" className="border-[#bed8ce]" onClick={() => setRes(null)}>Effacer le résultat</Button></div>
    {res && !res.ok && <p role="alert" className="mt-4 text-sm font-semibold text-red-800">{res.error}</p>}
    {res && res.ok && <div role="status" className="mt-5"><div className="grid gap-3 sm:grid-cols-3">
      <p className="rounded-xl bg-[#f2f8f5] p-3 text-sm"><span className="block text-xs font-bold text-[#3f635b]">À randomiser</span>{res.randomised}</p>
      <p className="rounded-xl bg-[#f2f8f5] p-3 text-sm"><span className="block text-xs font-bold text-[#3f635b]">À présélectionner</span>{res.screened}</p>
      <p className="rounded-xl bg-[#f2f8f5] p-3 text-sm"><span className="block text-xs font-bold text-[#3f635b]">Durée estimée</span>{res.monthsToTarget} mois</p></div>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-xs leading-5 text-[#526d68]">{res.explanation.map(l => <li key={l}>{l}</li>)}</ul></div>}
  </article>;
}
