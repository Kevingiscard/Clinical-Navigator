import { ClinicalShell } from "@/components/ClinicalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, ArrowLeft, ArrowRight, BookOpenCheck, Calculator, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, Download, FlaskConical, LockKeyhole, Save, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type Step = { key: string; label: string; group: string; fields: Field[] };
type Field = { key: string; label: string; type?: "text" | "textarea" | "number" | "select"; options?: string[]; hint?: string };

const steps: Step[] = [
  { key: "idea", group: "Fondation", label: "Idée & besoin", fields: [
    { key: "need", label: "Besoin ou problème à étudier", type: "textarea" },
    { key: "rationale", label: "Rationnel scientifique", type: "textarea" },
    { key: "decision", label: "Décision à éclairer", hint: "Quelle décision le résultat devra-t-il réellement aider à prendre ?" },
  ]},
  { key: "question", group: "Fondation", label: "Question & PICO(T)", fields: [
    { key: "question", label: "Question clinique", type: "textarea" },
    { key: "population", label: "Population" }, { key: "intervention", label: "Intervention / exposition" }, { key: "comparator", label: "Comparateur" }, { key: "outcome", label: "Outcome" }, { key: "time", label: "Horizon temporel" },
  ]},
  { key: "objectives", group: "Fondation", label: "Objectifs & hypothèses", fields: [
    { key: "primary", label: "Objectif principal", type: "textarea" }, { key: "secondary", label: "Objectifs secondaires", type: "textarea" }, { key: "exploratory", label: "Objectifs exploratoires", type: "textarea" },
    { key: "h0", label: "Hypothèse nulle", type: "textarea" }, { key: "h1", label: "Hypothèse alternative", type: "textarea" },
  ]},
  { key: "population", group: "Méthodologie", label: "Population", fields: [
    { key: "target", label: "Population cible", type: "textarea" }, { key: "accessible", label: "Population accessible", type: "textarea" }, { key: "analysis", label: "Populations d’analyse (ITT, PP, sécurité)", type: "textarea" }, { key: "subgroups", label: "Sous-groupes préspécifiés", type: "textarea" },
  ]},
  { key: "eligibility", group: "Méthodologie", label: "Éligibilité", fields: [
    { key: "inclusion", label: "Critères d’inclusion", type: "textarea" }, { key: "exclusion", label: "Critères d’exclusion", type: "textarea" }, { key: "measurement", label: "Méthodes de confirmation", type: "textarea" }, { key: "feasibility", label: "Faisabilité opérationnelle des critères", type: "textarea" },
  ]},
  { key: "intervention", group: "Méthodologie", label: "Intervention & comparateur", fields: [
    { key: "intervention", label: "Intervention", type: "textarea" }, { key: "dose", label: "Dose / intensité" }, { key: "duration", label: "Durée" }, { key: "adherence", label: "Adhérence / fidelity", type: "textarea" }, { key: "comparator", label: "Comparateur", type: "textarea" }, { key: "comparatorRationale", label: "Justification du comparateur", type: "textarea" },
  ]},
  { key: "outcomes", group: "Méthodologie", label: "Outcomes & endpoints", fields: [
    { key: "primaryEndpoint", label: "Endpoint principal", type: "textarea" }, { key: "endpointType", label: "Type d’endpoint", type: "select", options: ["Binaire", "Continu", "Ordinal", "Temps jusqu’à événement", "Survie", "Composite", "Mesures répétées", "PRO / QoL", "Biomarqueur", "Digital endpoint"] }, { key: "instrument", label: "Instrument / source de mesure" }, { key: "timepoint", label: "Temps de mesure" }, { key: "secondaryEndpoints", label: "Endpoints secondaires", type: "textarea" }, { key: "multiplicity", label: "Multiplicité / hiérarchie", type: "textarea" },
  ]},
  { key: "estimand", group: "Méthodologie", label: "Estimand", fields: [
    { key: "population", label: "Population" }, { key: "treatment", label: "Treatment condition" }, { key: "variable", label: "Variable" }, { key: "intercurrent", label: "Événements intercurrents", type: "textarea" }, { key: "strategy", label: "Stratégie", type: "select", options: ["Treatment policy", "Hypothetical", "Composite", "While on treatment", "Principal stratum"] }, { key: "summary", label: "Mesure de synthèse" },
  ]},
  { key: "design", group: "Design", label: "Design de l’essai", fields: [
    { key: "design", label: "Design", type: "select", options: ["Groupes parallèles randomisés", "Cross-over", "Cluster randomisé", "Stepped-wedge", "Factoriel", "Bras unique", "Supériorité", "Non-infériorité", "Équivalence", "Pragmatique", "Adaptatif", "Master protocol", "Basket", "Umbrella", "Platform"] },
    { key: "blinding", label: "Aveugle", type: "select", options: ["Ouvert", "Simple aveugle", "Double aveugle", "Évaluation endpoint en aveugle", "Statisticien en aveugle"] }, { key: "rationale", label: "Pourquoi ce design ?", type: "textarea" }, { key: "alternatives", label: "Alternatives considérées", type: "textarea" },
  ]},
  { key: "randomization", group: "Design", label: "Randomisation & allocation", fields: [
    { key: "ratio", label: "Ratio d’allocation", hint: "Ex. 1:1" }, { key: "method", label: "Méthode", type: "select", options: ["Simple", "Blocs", "Stratifiée", "Par centre", "Minimisation", "Cluster", "Covariate-adaptive"] }, { key: "strata", label: "Facteurs de stratification", type: "textarea" }, { key: "concealment", label: "Dissimulation de l’allocation", type: "textarea" },
  ]},
  { key: "sample_size", group: "Statistiques", label: "Effectif", fields: [
    { key: "type", label: "Calculateur", type: "select", options: ["Binaire", "Continu", "Temps jusqu’à événement", "Non-infériorité", "Équivalence", "Cluster", "Stepped-wedge", "Cross-over"] }, { key: "alpha", label: "Alpha", type: "number" }, { key: "power", label: "Puissance", type: "number" }, { key: "effect", label: "Effet attendu / différence" }, { key: "attrition", label: "Attrition", type: "number" }, { key: "notes", label: "Hypothèses / justification", type: "textarea" },
  ]},
  { key: "schedule", group: "Opérations", label: "Calendrier & visites", fields: [
    { key: "screening", label: "Screening" }, { key: "followup", label: "Follow-up" }, { key: "visits", label: "Visites et fenêtres", type: "textarea" }, { key: "assessments", label: "Assessments par visite", type: "textarea" }, { key: "transition", label: "Transitions / règles spécifiques", type: "textarea" },
  ]},
  { key: "recruitment", group: "Opérations", label: "Recrutement & faisabilité", fields: [
    { key: "centers", label: "Nombre de centres", type: "number" }, { key: "monthly", label: "Participants évaluables / centre / mois", type: "number" }, { key: "eligibilityRate", label: "Taux d’éligibilité", type: "number" }, { key: "consentRate", label: "Taux de consentement", type: "number" }, { key: "plan", label: "Plan de recrutement", type: "textarea" }, { key: "contingency", label: "Scénarios de contingence", type: "textarea" },
  ]},
  { key: "statistics", group: "Statistiques", label: "Analyse statistique", fields: [
    { key: "primary", label: "Analyse principale", type: "textarea" }, { key: "models", label: "Modèles / covariables", type: "textarea" }, { key: "missing", label: "Données manquantes", type: "textarea" }, { key: "sensitivity", label: "Analyses de sensibilité", type: "textarea" }, { key: "subgroups", label: "Sous-groupes", type: "textarea" }, { key: "interim", label: "Analyses intermédiaires / multiplicité", type: "textarea" },
  ]},
  { key: "quality", group: "Qualité", label: "Qualité, risques & sécurité", fields: [
    { key: "ctq", label: "Facteurs critiques pour la qualité", type: "textarea" }, { key: "criticalData", label: "Données critiques", type: "textarea" }, { key: "risks", label: "Risques et mitigations", type: "textarea" }, { key: "safety", label: "Plan de sécurité", type: "textarea" }, { key: "qtl", label: "QTL / métriques / seuils", type: "textarea" },
  ]},
  { key: "data", group: "Données", label: "CRF, données & eCRF", fields: [
    { key: "dictionary", label: "Dictionnaire de données", type: "textarea" }, { key: "crf", label: "Structure eCRF", type: "textarea" }, { key: "checks", label: "Edit checks / contrôles", type: "textarea" }, { key: "reconciliation", label: "Réconciliations prévues", type: "textarea" },
  ]},
  { key: "protocol", group: "Documents", label: "Protocole & SAP", fields: [
    { key: "synopsis", label: "Synopsis", type: "textarea" }, { key: "protocolStatus", label: "Statut du protocole", type: "select", options: ["DRAFT", "IN_REVIEW", "READY_FOR_REVIEW"] }, { key: "protocolVersion", label: "Version protocole" }, { key: "sap", label: "Structure du SAP", type: "textarea" },
  ]},
  { key: "registration", group: "Réglementaire", label: "Enregistrement & juridiction", fields: [
    { key: "jurisdiction", label: "Juridiction", type: "select", options: ["France", "Union européenne", "Bénin", "Sénégal", "Côte d’Ivoire", "Togo", "Ghana", "Nigeria", "Afrique du Sud", "Royaume-Uni", "États-Unis", "Canada", "International / à préciser"] }, { key: "registry", label: "Registre cible", hint: "À confirmer selon le contexte." }, { key: "regulatory", label: "Questions réglementaires à vérifier", type: "textarea" },
  ]},
  { key: "references", group: "Références", label: "Références & sources", fields: [
    { key: "sources", label: "Sources principales", type: "textarea" }, { key: "evidence", label: "Evidence supporting assumptions", type: "textarea" }, { key: "review", label: "Points nécessitant une revue humaine", type: "textarea" },
  ]},
  { key: "final_review", group: "Audit", label: "Audit final", fields: [] },
];

const defaultForm: Record<string, Record<string, string>> = {};
for (const step of steps) { defaultForm[step.key] = {}; for (const field of step.fields) defaultForm[step.key][field.key] = ""; }

function localSampleSize(type: string, alpha: number, power: number, p1 = 0.4, p2 = 0.55, sd = 1, effect = 0.5, attrition = 0.1) {
  const zAlpha = alpha <= 0.01 ? 2.576 : alpha <= 0.05 ? 1.96 : 1.645;
  const zPower = power >= 0.9 ? 1.282 : power >= 0.8 ? 0.842 : 0.524;
  const inflate = Math.max(1, 1 / Math.max(0.05, 1 - attrition));
  if (type === "Binaire") {
    const p = (p1 + p2) / 2; const diff = Math.abs(p2 - p1); const n = Math.ceil(((zAlpha * Math.sqrt(2 * p * (1 - p)) + zPower * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2) / Math.max(diff ** 2, 1e-8));
    return { nPerGroup: Math.ceil(n * inflate), total: Math.ceil(2 * n * inflate), label: "Approximation asymptotique pour deux proportions" };
  }
  const n = Math.ceil((2 * ((zAlpha + zPower) * sd / Math.max(Math.abs(effect), 1e-9)) ** 2) * inflate);
  return { nPerGroup: Math.ceil(n / 2), total: n, label: "Approximation indicative pour deux moyennes indépendantes" };
}
function health(form: Record<string, Record<string, string>>) {
  const required = ["question","objectives","population","outcomes","estimand","design","sample_size","schedule","statistics","quality","protocol","registration"];
  const done = required.filter(key => Object.values(form[key] ?? {}).some(Boolean)).length;
  const score = Math.round((done / required.length) * 100);
  const blockers: string[] = [];
  if (!form.question?.question) blockers.push("Question scientifique non définie.");
  if (!form.objectives?.primary) blockers.push("Objectif principal non défini.");
  if (!form.outcomes?.primaryEndpoint) blockers.push("Endpoint principal non défini.");
  if (!form.estimand?.variable) blockers.push("Variable d’estimand non définie.");
  if (!form.design?.design) blockers.push("Design non sélectionné.");
  if (!form.sample_size?.type) blockers.push("Méthode de calcul d’effectif non sélectionnée.");
  if (!form.statistics?.primary) blockers.push("Analyse principale absente.");
  if (!form.protocol?.synopsis) blockers.push("Synopsis protocole absent.");
  if (!form.registration?.jurisdiction) blockers.push("Juridiction non précisée.");
  return { score, blockers, status: blockers.length === 0 && score >= 90 ? "PRÊT POUR REVUE" : blockers.length <= 2 ? "À COMPLÉTER" : "DRAFT" };
}

export default function TrialDesignPage() {
  const { isAuthenticated } = useAuth();
  const [active, setActive] = useState(0);
  const [form, setForm] = useState<Record<string, Record<string, string>>>(() => {
    try { return JSON.parse(localStorage.getItem("clinical-navigator-design-draft") || JSON.stringify(defaultForm)); } catch { return defaultForm; }
  });
  const [saved, setSaved] = useState(false);
  const [sample, setSample] = useState<any>(null);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const healthState = useMemo(() => health(form), [form]);
  const step = steps[active];
  const next = () => setActive(index => Math.min(index + 1, steps.length - 1));
  const previous = () => setActive(index => Math.max(index - 1, 0));
  const update = (key: string, value: string) => { setForm(current => ({ ...current, [step.key]: { ...current[step.key], [key]: value } })); setSaved(false); };
  const saveLocal = () => { localStorage.setItem("clinical-navigator-design-draft", JSON.stringify(form)); setSaved(true); };
  const exportDesign = () => {
    const payload = { product: "Clinical Navigator", exportedAt: new Date().toISOString(), status: healthState.status, health: healthState.score, design: form };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "clinical-navigator-study-design.json"; a.click(); URL.revokeObjectURL(url);
  };

  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
      <div className="container py-10">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div><div className="inline-flex items-center gap-2 rounded-full border border-[#c9e0d6] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#237162]"><FlaskConical className="h-3.5 w-3.5" />Clinical Trial Design Workspace</div><h1 className="mt-4 font-serif text-5xl font-bold tracking-tight text-[#0d2b36]">Concevoir un essai clinique.</h1><p className="mt-3 max-w-3xl text-lg leading-8 text-[#526b67]">Passez de la question scientifique à une architecture de protocole cohérente. Les calculs sont indicatifs, les sources sont visibles et les décisions critiques restent soumises à une revue qualifiée.</p></div>
          <div className="rounded-2xl border border-[#cfe2da] bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#5d7972]">Santé du design</p><div className="mt-2 flex items-end gap-2"><span className="font-serif text-4xl font-bold text-[#0d2b36]">{healthState.score}%</span><span className="pb-1 text-sm font-semibold text-[#4d7068]">{healthState.status}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5efea]"><div className="h-full rounded-full bg-[#2b8575] transition-all" style={{ width: `${healthState.score}%` }} /></div></div>
        </div>
      </div>
    </section>

    <section className="container py-8">
      <Alert className="border-[#d9e7e2] bg-white"><ShieldCheck className="h-4 w-4 text-[#2d8273]" /><AlertTitle>Important</AlertTitle><AlertDescription>Ne saisissez aucune donnée permettant d’identifier directement un participant. Clinical Navigator aide à structurer et vérifier ; il ne constitue pas une approbation scientifique, éthique ou réglementaire.</AlertDescription></Alert>

      <div className="mt-6 grid gap-6 xl:grid-cols-[270px_1fr_310px]">
        <aside className="rounded-2xl border border-[#dbe8e3] bg-white p-3 shadow-sm xl:sticky xl:top-24 xl:h-[calc(100vh-7rem)] xl:overflow-auto">
          <div className="px-3 py-3"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#63817a]">Parcours</p><p className="mt-1 text-sm font-semibold text-[#24494a]">Étape {active + 1} / {steps.length}</p></div>
          <div className="grid gap-1">{steps.map((item, index) => <button key={item.key} onClick={() => setActive(index)} className={`flex items-start gap-3 rounded-xl px-3 py-3 text-left transition ${index === active ? "bg-[#e8f4ee] text-[#0d5b52]" : "text-[#59726d] hover:bg-[#f3f7f5]"}`}><span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${index === active ? "bg-[#0d5b52] text-white" : "bg-[#eef3f0] text-[#5a726d]"}`}>{index + 1}</span><span><span className="block text-xs font-bold uppercase tracking-wide opacity-70">{item.group}</span><span className="mt-0.5 block text-sm font-semibold">{item.label}</span></span></button>)}</div>
        </aside>

        <main className="min-w-0 rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#39806f]">{step.group}</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#0d2b36]">{step.label}</h2></div><div className="flex flex-wrap gap-2"><Button variant="outline" className="border-[#c9ddd6]" onClick={saveLocal}><Save className="mr-2 h-4 w-4" />{saved ? "Enregistré" : "Enregistrer"}</Button><Button variant="outline" className="border-[#c9ddd6]" onClick={exportDesign}><Download className="mr-2 h-4 w-4" />Exporter</Button></div></div>
          {active === steps.length - 1 ? <FinalReview healthState={healthState} form={form} onChallenge={() => setChallengeOpen(true)} /> : <div className="mt-8 grid gap-6">{step.fields.map(field => <Field key={field.key} field={field} value={form[step.key]?.[field.key] || ""} onChange={value => update(field.key, value)} />)}</div>}

          {step.key === "sample_size" && <SampleLab form={form.sample_size} onResult={setSample} result={sample} />}
          {step.key === "design" && <DesignLab selected={form.design?.design} />}
          {step.key === "statistics" && <StatisticsHints outcome={form.outcomes?.endpointType} design={form.design?.design} />}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#e7efeb] pt-5"><Button variant="outline" className="border-[#c9ddd6]" disabled={active === 0} onClick={previous}><ChevronLeft className="mr-2 h-4 w-4" />Précédent</Button><div className="text-xs font-semibold text-[#658079]">Brouillon local · {healthState.score}%</div><Button className="bg-[#0d2b36]" onClick={next} disabled={active === steps.length - 1}>Étape suivante<ChevronRight className="ml-2 h-4 w-4" /></Button></div>
        </main>

        <aside className="grid content-start gap-4">
          <section className="rounded-2xl border border-[#dbe8e3] bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-[#2b8575]" /><h3 className="font-bold text-[#1d4546]">À vérifier</h3></div><div className="mt-4 grid gap-2">{healthState.blockers.slice(0, 5).map(item => <div key={item} className="rounded-xl bg-[#fff8ea] p-3 text-xs leading-5 text-[#765d34]">{item}</div>)}{healthState.blockers.length === 0 && <div className="rounded-xl bg-[#edf8f2] p-3 text-sm text-[#226d5d]">Aucun blocage structurel détecté par les règles locales actuelles.</div>}</div></section>
          <section className="rounded-2xl border border-[#dbe8e3] bg-[#f7fbf9] p-5"><div className="flex items-center gap-2"><BookOpenCheck className="h-5 w-5 text-[#2b8575]" /><h3 className="font-bold text-[#1d4546]">Références intégrées</h3></div><ul className="mt-4 space-y-2 text-sm text-[#526d67]"><li>ICH E8(R1) — conception et qualité</li><li>ICH E9 / E9(R1) — statistiques, estimands</li><li>ICH E6(R3) — GCP</li><li>SPIRIT 2025 — protocoles randomisés</li><li>CONSORT 2025 — reporting randomisé</li></ul><Link href="/fr/veille" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#176d60]">Ouvrir la veille <ArrowRight className="h-3.5 w-3.5" /></Link></section>
          <section className="rounded-2xl border border-[#dbe8e3] bg-white p-5"><div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-[#2b8575]" /><h3 className="font-bold text-[#1d4546]">Défier le design</h3></div><p className="mt-3 text-sm leading-6 text-[#617972]">Le moteur de revue doit chercher les incohérences entre question, endpoint, estimand, effectif, calendrier et analyse.</p><Button variant="outline" className="mt-4 w-full border-[#bdd7cd]" onClick={() => setChallengeOpen(true)}>Challenger maintenant</Button></section>
        </aside>
      </div>
    </section>

    {challengeOpen && <ChallengeDialog form={form} onClose={() => setChallengeOpen(false)} />}
  </ClinicalShell>;
}

function Field({ field, value, onChange }: { field: Field; value: string; onChange: (value: string) => void }) { return <div><label className="mb-2 block text-sm font-bold text-[#214847]">{field.label}</label>{field.hint && <p className="mb-2 text-xs leading-5 text-[#6a817b]">{field.hint}</p>}{field.type === "textarea" ? <Textarea value={value} onChange={e => onChange(e.target.value)} className="min-h-28 rounded-xl border-[#cbded7]" /> : field.type === "select" ? <select value={value} onChange={e => onChange(e.target.value)} className="h-11 w-full rounded-xl border border-[#cbded7] bg-white px-3 text-sm text-[#31534f]"><option value="">Sélectionner…</option>{field.options?.map(option => <option key={option}>{option}</option>)}</select> : <Input type={field.type === "number" ? "number" : "text"} value={value} onChange={e => onChange(e.target.value)} className="h-11 rounded-xl border-[#cbded7]" />}</div>; }

function SampleLab({ form, onResult, result }: { form: Record<string, string>; onResult: (value: any) => void; result: any }) { const [p1, setP1] = useState("0.40"); const [p2, setP2] = useState("0.55"); const [sd, setSd] = useState("1"); const [effect, setEffect] = useState("0.5"); return <div className="mt-8 rounded-2xl border border-[#cde4d9] bg-[#f2f9f5] p-5"><div className="flex items-center gap-2"><Calculator className="h-5 w-5 text-[#2c8271]" /><h3 className="font-bold text-[#234b49]">Sample Size Lab</h3></div><p className="mt-2 text-xs leading-5 text-[#647b75]">Calculateur local indicatif pour explorer les hypothèses. Ce résultat ne remplace pas un calcul statistique validé.</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Input value={form.alpha || "0.05"} readOnly placeholder="Alpha" /><Input value={form.power || "0.80"} readOnly placeholder="Puissance" /><Input value={p1} onChange={e => setP1(e.target.value)} placeholder="p1" /><Input value={p2} onChange={e => setP2(e.target.value)} placeholder="p2" /><Input value={sd} onChange={e => setSd(e.target.value)} placeholder="SD" /><Input value={effect} onChange={e => setEffect(e.target.value)} placeholder="Effet" /></div><Button className="mt-4 bg-[#0d2b36]" onClick={() => { const calc = localSampleSize(form.type || "Binaire", Number(form.alpha || 0.05), Number(form.power || 0.8), Number(p1), Number(p2), Number(sd), Number(effect), Number(form.attrition || 0.1)); onResult(calc); }}>Calculer localement</Button>{result && <div className="mt-4 rounded-xl bg-white p-4"><p className="font-bold text-[#234b49]">{result.total} participants indicatifs au total</p><p className="mt-1 text-sm text-[#5f7770]">{result.nPerGroup} par groupe · {result.label}</p><p className="mt-2 text-xs text-amber-800">Validation biostatistique requise avant utilisation.</p></div>}</div>; }
function DesignLab({ selected }: { selected?: string }) { const cards = [{ title: "Groupes parallèles", desc: "Souvent adapté à la comparaison prospective entre groupes.", note: "Vérifier allocation, comparateur et outcome." }, { title: "Cluster", desc: "L’allocation se fait au niveau d’un groupe/centre.", note: "ICC et inflation d’effectif déterminants." }, { title: "Stepped-wedge", desc: "Les clusters passent successivement au dispositif d’intervention.", note: "Calendrier et corrélation temporelle à traiter explicitement." }, { title: "Cross-over", desc: "Chaque participant reçoit plusieurs conditions selon une séquence.", note: "Carry-over, période et washout à vérifier." }]; return <div className="mt-8 grid gap-3 md:grid-cols-2">{cards.map(card => <div key={card.title} className={`rounded-2xl border p-4 ${selected?.toLowerCase().includes(card.title.toLowerCase().split(" ")[0]) ? "border-[#7dbba9] bg-[#f0f8f4]" : "border-[#dbe8e3] bg-white"}`}><p className="font-bold text-[#214847]">{card.title}</p><p className="mt-2 text-sm leading-6 text-[#607771]">{card.desc}</p><p className="mt-2 text-xs font-semibold text-[#8a6440]">{card.note}</p></div>)}</div>; }
function StatisticsHints({ outcome, design }: { outcome?: string; design?: string }) { const hint = outcome === "Temps jusqu’à événement" || outcome === "Survie" ? "Analyse à articuler avec un temps zéro défini, une règle de censure, les événements et une approche de survie appropriée." : design === "Cluster randomisé" || design === "Stepped-wedge" ? "L’analyse doit tenir compte de la corrélation intra-cluster et de la structure temporelle du design." : "L’analyse doit être alignée sur l’endpoint primaire, l’estimand et la population d’analyse."; return <div className="mt-8 rounded-2xl border border-[#dbe8e3] bg-[#f7fbf9] p-5"><p className="text-xs font-bold uppercase tracking-wide text-[#54726c]">Aide contextuelle</p><p className="mt-2 text-sm leading-6 text-[#45645e]">{hint}</p></div>; }
function FinalReview({ healthState, form, onChallenge }: { healthState: ReturnType<typeof health>; form: Record<string, Record<string, string>>; onChallenge: () => void }) { const checks = [{ name: "Question → objectif", ok: Boolean(form.question?.question && form.objectives?.primary) }, { name: "Objectif → endpoint", ok: Boolean(form.objectives?.primary && form.outcomes?.primaryEndpoint) }, { name: "Endpoint → estimand", ok: Boolean(form.outcomes?.primaryEndpoint && form.estimand?.variable) }, { name: "Design → effectif", ok: Boolean(form.design?.design && form.sample_size?.type) }, { name: "Effectif → statistiques", ok: Boolean(form.sample_size?.type && form.statistics?.primary) }, { name: "Protocole → registre", ok: Boolean(form.protocol?.synopsis && form.registration?.registry) }]; return <div className="mt-8 space-y-5"><div className="rounded-2xl border border-[#dce9e4] bg-[#f7fbf9] p-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#55746d]">Audit structurel</p><p className="mt-2 font-serif text-3xl font-bold text-[#0d2b36]">{healthState.score}% · {healthState.status}</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{checks.map(item => <div key={item.name} className={`rounded-xl p-3 text-sm ${item.ok ? "bg-[#eaf7f0] text-[#226d5d]" : "bg-[#fff7e8] text-[#765d34]"}`}>{item.ok ? "✓" : "!"} {item.name}</div>)}</div></div><div className="flex flex-wrap gap-3"><Button className="bg-[#0d2b36]" onClick={onChallenge}>Challenger le design</Button><Link href="/fr/auditer-un-essai"><Button variant="outline" className="border-[#c9ddd6]">Audit projet enregistré</Button></Link></div></div>; }
function ChallengeDialog({ form, onClose }: { form: Record<string, Record<string, string>>; onClose: () => void }) { const findings: string[] = []; if (!form.question?.question) findings.push("La question scientifique n'est pas suffisamment explicite."); if (!form.outcomes?.primaryEndpoint) findings.push("L’endpoint principal n’est pas défini."); if (form.outcomes?.primaryEndpoint && !form.estimand?.variable) findings.push("L’endpoint principal existe mais la variable d’estimand n’est pas renseignée."); if (form.design?.design === "Stepped-wedge" && !form.schedule?.visits) findings.push("Un design stepped-wedge sans calendrier des périodes et transitions est incomplet."); if (form.design?.design === "Cluster randomisé" && !form.sample_size?.notes) findings.push("Un design cluster doit expliciter notamment les hypothèses liées à la corrélation intra-cluster."); if (!form.statistics?.missing) findings.push("La stratégie de données manquantes reste à documenter."); if (!form.registration?.jurisdiction) findings.push("La juridiction n’est pas précisée."); return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d2b36]/45 p-4"><div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#39806f]">Red team</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#0d2b36]">Challenge du design</h2></div><button onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-bold text-[#58716c] hover:bg-[#f0f5f2]">Fermer</button></div><div className="mt-6 grid gap-3">{findings.length ? findings.map(item => <div key={item} className="rounded-xl border border-[#ead8ad] bg-[#fffaf0] p-4 text-sm leading-6 text-[#765d34]">{item}</div>) : <div className="rounded-xl border border-[#b8ddcc] bg-[#eff9f4] p-4 text-sm leading-6 text-[#236c5d]">Aucun signal critique détecté par le jeu de règles locales. Cela ne constitue pas une validation méthodologique.</div>}</div><p className="mt-6 text-xs leading-5 text-[#71847f]">Le challenge recherche des signaux de préparation. Il ne remplace pas une revue par le promoteur, le méthodologiste, le biostatisticien, le clinicien, le comité d’éthique ou l’autorité compétente.</p></div></div>; }
