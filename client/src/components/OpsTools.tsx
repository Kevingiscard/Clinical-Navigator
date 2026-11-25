import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { criticality, defaultCriteria, feasibility, isOverdue, levelOf, risksToCsv, validateAction, validateRisk, type ActionItem, type Criterion, type Risk } from "@/lib/opsTools";
import { EnrollmentSim } from "@/components/EnrollmentSim";
import { useEffect, useState } from "react";

const STORAGE = "cn-actions-v1";
const levelClass: Record<string, string> = { faible: "bg-[#e3f3ec] text-[#1b6054]", "modéré": "bg-[#fff4d6] text-[#7a5600]", "élevé": "bg-[#ffe3cf] text-[#8a3b00]", critique: "bg-[#fde0e0] text-[#8a1c1c]" };
const Note = ({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) => <label className="grid gap-1 text-xs font-bold uppercase tracking-wide text-[#5d7972]">{label}<select value={value} onChange={e => onChange(Number(e.target.value))} className="h-9 rounded-md border border-[#cbded7] bg-white px-2 text-sm font-normal normal-case text-[#183f43]">{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}</select></label>;
const Card = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => <article className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm"><h3 className="text-xl font-bold text-[#183f43]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#617771]">{subtitle}</p><div className="mt-5">{children}</div></article>;
const uid = () => Math.random().toString(36).slice(2, 10);

function RiskMatrix() {
  const blank = { label: "", p: 3, i: 3, d: 3, control: "", rp: 2, ri: 3, rd: 3 };
  const [form, setForm] = useState(blank);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [error, setError] = useState("");
  const add = () => { const e = validateRisk(form); if (e) { setError(e); return; } setError(""); setRisks([...risks, { id: uid(), ...form, label: form.label.trim(), control: form.control.trim() }]); setForm(blank); };
  const download = () => { const url = URL.createObjectURL(new Blob(["\ufeff" + risksToCsv(risks)], { type: "text/csv;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = "matrice-de-risques.csv"; a.click(); URL.revokeObjectURL(url); };
  return <Card title="Matrice de risques" subtitle="Notez la probabilité, l’impact et la détectabilité de 1 à 5. La criticité est leur produit (1 à 125). Les niveaux sont pédagogiques : utilisez les seuils de votre procédure qualité.">
    <Input value={form.label} maxLength={200} onChange={e => setForm({ ...form, label: e.target.value })} aria-label="Description du risque" placeholder="Ex. Retard de recrutement dans un centre" />
    <div className="mt-3 grid grid-cols-3 gap-3"><Note label="Probabilité" value={form.p} onChange={p => setForm({ ...form, p })} /><Note label="Impact" value={form.i} onChange={i => setForm({ ...form, i })} /><Note label="Détectabilité" value={form.d} onChange={d => setForm({ ...form, d })} /></div>
    <Input className="mt-3" value={form.control} maxLength={200} onChange={e => setForm({ ...form, control: e.target.value })} aria-label="Mesure de maîtrise" placeholder="Mesure de maîtrise (facultatif)" />
    <div className="mt-3 grid grid-cols-3 gap-3"><Note label="Probabilité après" value={form.rp} onChange={rp => setForm({ ...form, rp })} /><Note label="Impact après" value={form.ri} onChange={ri => setForm({ ...form, ri })} /><Note label="Détect. après" value={form.rd} onChange={rd => setForm({ ...form, rd })} /></div>
    <div className="mt-4 flex flex-wrap gap-2"><Button className="bg-[#0d2b36] hover:bg-[#164451]" onClick={add}>Ajouter le risque</Button>{risks.length > 0 && <Button variant="outline" className="border-[#bed8ce]" onClick={download}>Exporter en CSV</Button>}{risks.length > 0 && <Button variant="outline" className="border-[#bed8ce]" onClick={() => setRisks([])}>Tout effacer</Button>}</div>
    {error && <p role="alert" className="mt-3 text-sm font-semibold text-red-800">{error}</p>}
    <div role="status" className="mt-4 grid gap-2">{risks.length === 0 ? <p className="rounded-xl bg-[#f4f8f6] p-3 text-sm text-[#365f56]">Aucun risque ajouté. Les données restent dans cette page et disparaissent quand vous la fermez.</p> : [...risks].sort((a, b) => b.p * b.i * b.d - a.p * a.i * a.d).map(r => { const c = criticality(r.p, r.i, r.d) ?? 0; const rc = criticality(r.rp, r.ri, r.rd) ?? 0; return <div key={r.id} className="rounded-xl border border-[#dbe8e3] p-3 text-sm"><div className="flex items-start justify-between gap-2"><p className="font-semibold text-[#183f43]">{r.label}</p><button type="button" className="text-xs text-[#365f56] underline" onClick={() => setRisks(risks.filter(x => x.id !== r.id))}>Retirer</button></div><p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#526d68]">Criticité {c} <span className={`rounded px-2 py-0.5 font-bold ${levelClass[levelOf(c)]}`}>{levelOf(c)}</span> → après maîtrise {rc} <span className={`rounded px-2 py-0.5 font-bold ${levelClass[levelOf(rc)]}`}>{levelOf(rc)}</span></p>{r.control && <p className="mt-1 text-xs text-[#526d68]">Mesure : {r.control}</p>}</div>; })}</div>
  </Card>;
}

function Feasibility() {
  const [criteria, setCriteria] = useState<Criterion[]>(defaultCriteria());
  const [result, setResult] = useState<ReturnType<typeof feasibility> | null>(null);
  const set = (id: string, patch: Partial<Criterion>) => setCriteria(criteria.map(c => c.id === id ? { ...c, ...patch } : c));
  return <Card title="Grille de faisabilité d’un centre" subtitle="Pondérez chaque critère (0 à 5) et notez le centre évalué (0 à 5). Score = somme (poids × note) ÷ (5 × somme des poids). Le score aide à comparer, il ne décide pas.">
    <div className="grid gap-3">{criteria.map(c => <div key={c.id} className="grid grid-cols-[1fr_4.5rem_4.5rem] items-end gap-2"><label className="grid gap-1 text-xs font-bold text-[#5d7972]">Critère<Input value={c.label} onChange={e => set(c.id, { label: e.target.value })} /></label><label className="grid gap-1 text-xs font-bold text-[#5d7972]">Poids<Input type="number" min={0} max={5} value={c.weight} onChange={e => set(c.id, { weight: Number(e.target.value) })} /></label><label className="grid gap-1 text-xs font-bold text-[#5d7972]">Note<Input type="number" min={0} max={5} value={c.score} onChange={e => set(c.id, { score: Number(e.target.value) })} /></label></div>)}</div>
    <div className="mt-4 flex flex-wrap gap-2"><Button className="bg-[#0d2b36] hover:bg-[#164451]" onClick={() => setResult(feasibility(criteria))}>Calculer le score</Button><Button variant="outline" className="border-[#bed8ce]" onClick={() => setCriteria([...criteria, { id: uid(), label: "Nouveau critère", weight: 1, score: 0 }])}>Ajouter un critère</Button><Button variant="outline" className="border-[#bed8ce]" onClick={() => { setCriteria(defaultCriteria()); setResult(null); }}>Réinitialiser</Button></div>
    <div role="status" className="mt-4">{result && (result.ok ? <div className="rounded-xl border border-[#cfe4da] bg-[#edf8f2] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#3f635b]">Score pondéré</p><p className="mt-1 text-2xl font-bold text-[#1b6054]">{result.percent} %</p><ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-[#526d68]">{result.lines.map(l => <li key={l.label + l.share}>{l.label} : {l.share} points sur 100</li>)}</ul></div> : <p role="alert" className="text-sm font-semibold text-red-800">{result.error}</p>)}</div>
  </Card>;
}

function Actions() {
  const today = new Date().toISOString().slice(0, 10);
  const [items, setItems] = useState<ActionItem[]>([]);
  const [label, setLabel] = useState(""); const [owner, setOwner] = useState(""); const [due, setDue] = useState(""); const [priority, setPriority] = useState<ActionItem["priority"]>("normale");
  const [error, setError] = useState(""); const [loaded, setLoaded] = useState(false);
  useEffect(() => { try { const raw = localStorage.getItem(STORAGE); if (raw) setItems(JSON.parse(raw)); } catch { /* stockage indisponible */ } setLoaded(true); }, []);
  useEffect(() => { if (!loaded) return; try { localStorage.setItem(STORAGE, JSON.stringify(items)); } catch { /* stockage indisponible */ } }, [items, loaded]);
  const add = () => { const e = validateAction({ label, due }); if (e) { setError(e); return; } setError(""); setItems([...items, { id: uid(), label: label.trim(), owner: owner.trim(), due, priority, done: false }]); setLabel(""); setOwner(""); setDue(""); setPriority("normale"); };
  const rank = { haute: 0, normale: 1, basse: 2 };
  const sorted = [...items].sort((a, b) => Number(a.done) - Number(b.done) || rank[a.priority] - rank[b.priority] || (a.due || "9999").localeCompare(b.due || "9999"));
  return <Card title="Suivi d’actions enregistré" subtitle="Liste enregistrée uniquement dans ce navigateur (stockage local), triée par priorité et échéance. N’y inscrivez aucun nom de participant ni donnée personnelle.">
    <Input value={label} maxLength={200} onChange={e => setLabel(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} aria-label="Action à suivre" placeholder="Ex. Mettre à jour la liste de délégation" />
    <div className="mt-3 grid gap-3 sm:grid-cols-3"><Input value={owner} maxLength={60} onChange={e => setOwner(e.target.value)} aria-label="Fonction responsable" placeholder="Fonction (ex. ARC)" /><Input type="date" value={due} onChange={e => setDue(e.target.value)} aria-label="Échéance" /><select value={priority} onChange={e => setPriority(e.target.value as ActionItem["priority"])} aria-label="Priorité" className="h-9 rounded-md border border-[#cbded7] bg-white px-2 text-sm"><option value="haute">Priorité haute</option><option value="normale">Priorité normale</option><option value="basse">Priorité basse</option></select></div>
    <div className="mt-4 flex flex-wrap gap-2"><Button className="bg-[#0d2b36] hover:bg-[#164451]" onClick={add}>Ajouter l’action</Button>{items.length > 0 && <Button variant="outline" className="border-[#bed8ce]" onClick={() => setItems([])}>Effacer toutes les données locales</Button>}</div>
    {error && <p role="alert" className="mt-3 text-sm font-semibold text-red-800">{error}</p>}
    <div role="status" className="mt-4 grid gap-2">{sorted.length === 0 ? <p className="rounded-xl bg-[#f4f8f6] p-3 text-sm text-[#365f56]">Aucune action enregistrée.</p> : sorted.map(a => <div key={a.id} className={`flex items-start justify-between gap-2 rounded-xl border p-3 text-sm ${a.done ? "border-[#dbe8e3] bg-[#f4f8f6] text-[#6c867f]" : isOverdue(a, today) ? "border-[#e8b4b4] bg-[#fff5f5]" : "border-[#dbe8e3]"}`}><label className="flex items-start gap-2"><input type="checkbox" checked={a.done} onChange={() => setItems(items.map(x => x.id === a.id ? { ...x, done: !x.done } : x))} className="mt-1" /><span className={a.done ? "line-through" : ""}>{a.label}<span className="block text-xs text-[#526d68]">{[a.owner, a.due && `échéance ${a.due}`, `priorité ${a.priority}`, isOverdue(a, today) && "en retard"].filter(Boolean).join(" · ")}</span></span></label><button type="button" className="text-xs underline" onClick={() => setItems(items.filter(x => x.id !== a.id))}>Retirer</button></div>)}</div>
  </Card>;
}

export function OpsTools() {
  return <section className="container pb-10" aria-labelledby="ops-title"><h2 id="ops-title" className="font-serif text-3xl font-bold text-[#0d2b36]">Pilotage et qualité</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#526b67]">Quatre outils qui fonctionnent entièrement dans votre navigateur, sans compte ni envoi de données. Ce sont des aides pédagogiques à adapter au protocole et aux procédures de votre organisation.</p><div className="mt-6 grid gap-6 lg:grid-cols-2"><RiskMatrix /><Feasibility /><Actions /><EnrollmentSim /></div></section>;
}
