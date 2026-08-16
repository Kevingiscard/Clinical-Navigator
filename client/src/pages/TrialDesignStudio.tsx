import { ClinicalShell } from "@/components/ClinicalShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle, ArrowLeft, ArrowRight, BarChart3, BookOpenCheck, CheckCircle2, ClipboardCheck,
  Download, FlaskConical, GitBranch, Lightbulb, Save, ShieldCheck, Sparkles, Target, UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type StudyState = {
  title: string;
  question: string;
  population: string;
  intervention: string;
  comparator: string;
  outcome: string;
  time: string;
  objective: string;
  design: string;
  endpointType: string;
  estimandStrategy: string;
  randomisation: string;
  blinding: string;
  alpha: string;
  power: string;
  pControl: string;
  pTreatment: string;
  meanDifference: string;
  sd: string;
  events: string;
  hazardRatio: string;
  attrition: string;
  clusters: string;
  clusterSize: string;
  icc: string;
  periods: string;
  sequenceNote: string;
  recruitmentCenters: string;
  monthlyPerCenter: string;
  followUp: string;
  visits: string;
  safety: string;
  quality: string;
  risks: string;
  analysis: string;
  missingData: string;
  references: string;
};

const initial: StudyState = {
  title: "", question: "", population: "", intervention: "", comparator: "", outcome: "", time: "",
  objective: "", design: "Groupes parallèles randomisés", endpointType: "Binaire", estimandStrategy: "À définir",
  randomisation: "Stratifiée", blinding: "Ouvert", alpha: "0.05", power: "0.80", pControl: "0.30", pTreatment: "0.50",
  meanDifference: "5", sd: "10", events: "100", hazardRatio: "0.75", attrition: "0.10", clusters: "10", clusterSize: "20", icc: "0.05",
  periods: "5", sequenceNote: "", recruitmentCenters: "5", monthlyPerCenter: "5", followUp: "12 mois", visits: "",
  safety: "", quality: "", risks: "", analysis: "", missingData: "", references: "",
};

const steps = [
  ["question", "Question", "Question scientifique et PICO(T)"],
  ["objective", "Objectifs", "Objectif principal, secondaires et hypothèses"],
  ["population", "Population", "Population cible et éligibilité"],
  ["intervention", "Intervention", "Intervention et comparateur"],
  ["outcome", "Endpoints", "Endpoint, temporalité et estimand"],
  ["design", "Design", "Design, randomisation et aveugle"],
  ["sample", "Effectif", "Hypothèses, calcul et sensibilité"],
  ["schedule", "Calendrier", "Visites, fenêtres et évaluations"],
  ["operations", "Opérations", "Centres, recrutement et charge"],
  ["statistics", "Statistiques", "Analyse, données manquantes et sensibilité"],
  ["quality", "Qualité", "CTQ, risques, QTL et monitoring"],
  ["protocol", "Protocole", "SPIRIT 2025, SAP et registration"],
  ["audit", "Audit", "Challenge, cohérence et score de préparation"],
] as const;

type StepId = typeof steps[number][0];

const spiritItems = [
  "Titre et identifiant du protocole", "Version et dates", "Rôles et responsabilités", "Résumé structuré",
  "Contexte et justification", "Bénéfices/risques", "Objectifs spécifiques", "Design d’étude",
  "Cadre et centres", "Population et critères d’éligibilité", "Interventions", "Stratégie d’adhérence",
  "Outcomes et méthodes de mesure", "Calendrier des évaluations", "Allocation et séquence", "Génération de la séquence",
  "Dissimulation de l’allocation", "Aveugle", "Taille d’échantillon", "Analyses statistiques principales",
  "Analyses secondaires", "Jeux d’analyse", "Données manquantes", "Analyses de sensibilité",
  "Analyses intermédiaires", "Règles d’arrêt", "Surveillance sécurité", "Éthique et consentement",
  "Confidentialité et gestion des données", "Accès aux données", "Gouvernance et financement",
  "Enregistrement et diffusion", "Amendements", "Plan de publication",
];

const consortItems = [
  "Titre identifiant l’essai randomisé", "Abstract structuré", "Registration", "Accès au protocole/SAP et données", "Financement et conflits d’intérêts",
  "Rôle des patients/public", "Design", "Sites et intervenants", "Randomisation", "Aveugle", "Intervention prévue", "Intervention effectivement délivrée",
  "Outcomes", "Mesure des outcomes", "Harms", "Participants analysés", "Méthodes statistiques", "Effets estimés", "Incertitude", "Analyse de sensibilité",
  "Manquants", "Déviations", "Pertes de suivi", "Concomitants", "Flow diagram", "Interprétation", "Limites", "Généralisabilité/contextualisation",
  "Open science", "Conclusion",
];

function normalCdfInverse(p: number) {
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const pl = 0.02425;
  const ph = 1 - pl;
  if (p <= 0 || p >= 1) return NaN;
  if (p < pl) {
    const q = Math.sqrt(-2 * Math.log(p));
    const numerator = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q) + c[5];
    const denominator = ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q) + 1;
    return numerator / denominator;
  }
  if (p > ph) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    const numerator = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q) + c[5];
    const denominator = ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q) + 1;
    return -(numerator / denominator);
  }
  const q = p - 0.5;
  const r = q * q;
  const numerator = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q;
  const denominator = ((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1;
  return numerator / denominator;
}

function binarySampleSize(p1: number, p2: number, alpha: number, power: number) {
  if ([p1, p2, alpha, power].some(v => !Number.isFinite(v)) || p1 <= 0 || p1 >= 1 || p2 <= 0 || p2 >= 1 || p1 === p2) return null;
  const zA = normalCdfInverse(1 - alpha / 2); const zB = normalCdfInverse(power); const pbar = (p1 + p2) / 2;
  const n = Math.pow(zA * Math.sqrt(2 * pbar * (1 - pbar)) + zB * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)), 2) / Math.pow(p2 - p1, 2);
  return Math.ceil(n);
}

function continuousSampleSize(delta: number, sd: number, alpha: number, power: number) {
  if (![delta, sd, alpha, power].every(Number.isFinite) || delta <= 0 || sd <= 0) return null;
  const zA = normalCdfInverse(1 - alpha / 2); const zB = normalCdfInverse(power);
  return Math.ceil(2 * Math.pow((zA + zB) * sd / delta, 2));
}

function survivalEvents(hr: number, alpha: number, power: number) {
  if (![hr, alpha, power].every(Number.isFinite) || hr <= 0 || hr === 1) return null;
  const zA = normalCdfInverse(1 - alpha / 2); const zB = normalCdfInverse(power);
  return Math.ceil(Math.pow(zA + zB, 2) / Math.pow(Math.log(hr), 2));
}

function designEffect(m: number, icc: number) { return 1 + Math.max(0, m - 1) * Math.max(0, icc); }

function formatPct(v: number) { return `${(v * 100).toFixed(1)}%`; }

export default function TrialDesignStudio() {
  const [study, setStudy] = useState<StudyState>(() => { try { return { ...initial, ...JSON.parse(localStorage.getItem("clinical-navigator-design") || "{}") }; } catch { return initial; } });
  const [step, setStep] = useState<StepId>("question");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [challengeOpen, setChallengeOpen] = useState(false);

  useEffect(() => { localStorage.setItem("clinical-navigator-design", JSON.stringify(study)); setSavedAt(new Date().toLocaleString("fr-FR")); }, [study]);

  const update = <K extends keyof StudyState>(key: K, value: StudyState[K]) => setStudy(prev => ({ ...prev, [key]: value }));
  const alpha = Math.max(0.0001, Math.min(0.5, Number(study.alpha) || 0.05));
  const power = Math.max(0.5, Math.min(0.999, Number(study.power) || 0.8));
  const binaryN = binarySampleSize(Number(study.pControl), Number(study.pTreatment), alpha, power);
  const continuousN = continuousSampleSize(Number(study.meanDifference), Number(study.sd), alpha, power);
  const survivalD = survivalEvents(Number(study.hazardRatio) || 0.75, alpha, power);
  const clusterDE = designEffect(Number(study.clusterSize), Number(study.icc));
  const clusterN = binaryN ? Math.ceil(binaryN * clusterDE * (1 + Number(study.attrition || 0))) : null;
  const completeness = useMemo(() => {
    const checks = [study.title, study.question, study.population, study.intervention, study.comparator, study.outcome, study.objective, study.design, study.endpointType, study.analysis, study.quality, study.risks, study.references];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [study]);
  const challenge = useMemo(() => {
    const issues: Array<{ level: "CRITIQUE" | "ATTENTION" | "INFO"; text: string }> = [];
    if (!study.question) issues.push({ level: "CRITIQUE", text: "Question scientifique non formulée." });
    if (!study.objective) issues.push({ level: "CRITIQUE", text: "Objectif principal absent." });
    if (!study.outcome) issues.push({ level: "CRITIQUE", text: "Endpoint principal absent." });
    if (!study.estimandStrategy || study.estimandStrategy === "À définir") issues.push({ level: "ATTENTION", text: "Estimand non finalisé." });
    if (study.design.includes("Stepped-wedge") && !study.periods) issues.push({ level: "ATTENTION", text: "Stepped-wedge choisi sans nombre de périodes." });
    if (study.design.includes("cluster") && Number(study.icc) <= 0) issues.push({ level: "ATTENTION", text: "ICC à documenter pour un design en cluster." });
    if (study.endpointType === "Temps jusqu’à événement" && !study.analysis) issues.push({ level: "ATTENTION", text: "Analyse de survie non documentée." });
    if (completeness < 70) issues.push({ level: "INFO", text: "Le design est encore incomplet ; commencez par les éléments critiques." });
    if (!study.references) issues.push({ level: "ATTENTION", text: "Aucune référence méthodologique saisie dans le projet." });
    return issues;
  }, [study, completeness]);

  const exportDesign = () => {
    const payload = { application: "Clinical Navigator", version: "4.0", exportedAt: new Date().toISOString(), study, completeness, challenge };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${(study.title || "clinical-trial-design").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`; a.click(); URL.revokeObjectURL(url);
  };

  const activeIndex = steps.findIndex(([id]) => id === step);
  const currentStep = steps[activeIndex];

  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]"><div className="container py-8"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#1c7566]"><ArrowLeft className="h-4 w-4" />Accueil</Link><div className="mt-6 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#39806f]">Clinical Trial Design Studio · v4.0</p><h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#0d2b36] sm:text-5xl">Concevoir un essai de bout en bout</h1><p className="mt-3 max-w-3xl text-lg leading-8 text-[#526b67]">Un atelier guidé qui relie question, endpoints, estimand, design, effectif, calendrier, statistiques, qualité, protocole, registration et audit. Les calculs sont des outils de planification et exigent une validation méthodologique.</p></div><div className="flex items-center gap-2"><Button onClick={exportDesign} variant="outline" className="border-[#b8d7cd]"><Download className="mr-2 h-4 w-4" />Exporter</Button><Button onClick={() => { localStorage.setItem("clinical-navigator-design", JSON.stringify(study)); setSavedAt(new Date().toLocaleString("fr-FR")); }} className="bg-[#0d2b36]"><Save className="mr-2 h-4 w-4" />Sauvegarder</Button></div></div>{savedAt && <p className="mt-3 text-xs text-[#6a817c]">Brouillon local sauvegardé · {savedAt}</p>}</div></section>

    <section className="container py-8"><div className="grid gap-6 lg:grid-cols-[270px_1fr]">
      <aside className="h-fit rounded-2xl border border-[#dbe8e3] bg-white p-4 shadow-sm lg:sticky lg:top-24"><div className="mb-4 rounded-xl bg-[#0d2b36] p-4 text-white"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a6d6c6]">Design Health</p><p className="mt-2 text-3xl font-bold">{completeness}%</p><p className="mt-1 text-xs text-[#c7ddd7]">Complétude structurelle indicative</p></div><div className="grid gap-1">{steps.map(([id, label], index) => <button type="button" key={id} onClick={() => setStep(id)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${step === id ? "bg-[#e7f3ed] font-bold text-[#0d5b52]" : "text-[#526d68] hover:bg-[#f3f7f5]"}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${index <= activeIndex ? "bg-[#2b8372] text-white" : "bg-[#eaf0ee] text-[#68827b]"}`}>{index + 1}</span>{label}</button>)}</div></aside>
      <main><div className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#39806f]">Étape {activeIndex + 1} / {steps.length}</p><h2 className="mt-1 font-serif text-3xl font-bold text-[#0d2b36]">{currentStep[1]}</h2><p className="mt-1 text-sm text-[#657c77]">{currentStep[2]}</p></div><span className="rounded-full bg-[#eaf6ef] px-3 py-1.5 text-xs font-bold text-[#1d6e60]">Brouillon · revue humaine requise</span></div>
          <div className="mt-8">{step === "question" && <QuestionStep study={study} update={update} />}{step === "objective" && <ObjectiveStep study={study} update={update} />}{step === "population" && <PopulationStep study={study} update={update} />}{step === "intervention" && <InterventionStep study={study} update={update} />}{step === "outcome" && <OutcomeStep study={study} update={update} />}{step === "design" && <DesignStep study={study} update={update} />}{step === "sample" && <SampleStep study={study} update={update} binaryN={binaryN} continuousN={continuousN} survivalD={survivalD} clusterDE={clusterDE} clusterN={clusterN} />}{step === "schedule" && <ScheduleStep study={study} update={update} />}{step === "operations" && <OperationsStep study={study} update={update} />}{step === "statistics" && <StatisticsStep study={study} update={update} />}{step === "quality" && <QualityStep study={study} update={update} />}{step === "protocol" && <ProtocolStep study={study} spiritItems={spiritItems} consortItems={consortItems} />}{step === "audit" && <AuditStep completeness={completeness} challenge={challenge} open={challengeOpen} setOpen={setChallengeOpen} />}</div>
          <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[#e3ece8] pt-5"><Button variant="outline" disabled={activeIndex === 0} onClick={() => setStep(steps[Math.max(0, activeIndex - 1)][0])}><ArrowLeft className="mr-2 h-4 w-4" />Précédent</Button><Button className="bg-[#0d2b36]" onClick={() => setStep(steps[Math.min(steps.length - 1, activeIndex + 1)][0])}>{activeIndex === steps.length - 1 ? "Rester sur l’audit" : "Continuer"}<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
        </div></main>
      </div></section>
  </ClinicalShell>;
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) { return <div className="grid gap-2"><Label className="font-semibold text-[#29484a]">{label}</Label>{children}{hint && <p className="text-xs leading-5 text-[#70857f]">{hint}</p>}</div>; }
function Text({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) { return <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />; }
function Area({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) { return <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="min-h-28" />; }

function QuestionStep({ study, update }: { study: StudyState; update: any }) { return <div className="grid gap-5"> <Field label="Titre provisoire"><Text value={study.title} onChange={v => update("title", v)} placeholder="Ex. Essai randomisé multicentrique…" /></Field><Field label="Question scientifique" hint="Une question claire doit relier population, intervention, comparateur, outcome et horizon temporel."><Area value={study.question} onChange={v => update("question", v)} /></Field><div className="grid gap-5 md:grid-cols-2"><Field label="Population"><Text value={study.population} onChange={v => update("population", v)} /></Field><Field label="Intervention / exposition"><Text value={study.intervention} onChange={v => update("intervention", v)} /></Field><Field label="Comparateur"><Text value={study.comparator} onChange={v => update("comparator", v)} /></Field><Field label="Horizon temporel"><Text value={study.time} onChange={v => update("time", v)} placeholder="Ex. 12 mois" /></Field></div></div>; }
function ObjectiveStep({ study, update }: { study: StudyState; update: any }) { return <div className="grid gap-5"><Field label="Objectif principal"><Area value={study.objective} onChange={v => update("objective", v)} /></Field><div className="rounded-xl border border-[#dbe8e3] bg-[#f7fbf9] p-5"><p className="flex items-center gap-2 font-bold text-[#173f43]"><Target className="h-4 w-4 text-[#2a8171]" />Question de qualité</p><p className="mt-2 text-sm leading-6 text-[#607771]">L’objectif principal doit pouvoir être relié à un endpoint primaire, un estimand, une analyse principale et un calcul d’effectif.</p></div></div>; }
function PopulationStep({ study, update }: { study: StudyState; update: any }) { return <div className="grid gap-5"><Field label="Population étudiée"><Area value={study.population} onChange={v => update("population", v)} placeholder="Population cible, contexte, maladie, stade, âge…" /></Field><div className="grid gap-5 md:grid-cols-2"><Field label="Critères d’inclusion"><Area value={study.quality} onChange={v => update("quality", v)} placeholder="Critères opérationnels…" /></Field><Field label="Critères d’exclusion"><Area value={study.risks} onChange={v => update("risks", v)} placeholder="Critères d'exclusion…" /></Field></div></div>; }
function InterventionStep({ study, update }: { study: StudyState; update: any }) { return <div className="grid gap-5"><Field label="Intervention"><Area value={study.intervention} onChange={v => update("intervention", v)} /></Field><Field label="Comparateur"><Area value={study.comparator} onChange={v => update("comparator", v)} /></Field><div className="grid gap-5 md:grid-cols-2"><Field label="Suivi / adhérence"><Text value={study.followUp} onChange={v => update("followUp", v)} /></Field><Field label="Sécurité"><Area value={study.safety} onChange={v => update("safety", v)} /></Field></div></div>; }
function OutcomeStep({ study, update }: { study: StudyState; update: any }) { return <div className="grid gap-5"><Field label="Endpoint principal"><Area value={study.outcome} onChange={v => update("outcome", v)} /></Field><div className="grid gap-5 md:grid-cols-2"><Field label="Type d’endpoint"><select className="h-10 rounded-md border border-[#cbded7] bg-white px-3 text-sm" value={study.endpointType} onChange={e => update("endpointType", e.target.value)}><option>Binaire</option><option>Continu</option><option>Temps jusqu’à événement</option><option>Composite</option><option>Ordinal</option><option>Répété / longitudinal</option></select></Field><Field label="Temps d’évaluation"><Text value={study.time} onChange={v => update("time", v)} /></Field><Field label="Stratégie d’estimand"><select className="h-10 rounded-md border border-[#cbded7] bg-white px-3 text-sm" value={study.estimandStrategy} onChange={e => update("estimandStrategy", e.target.value)}><option>À définir</option><option>Treatment policy</option><option>Hypothetical</option><option>Composite</option><option>While on treatment</option><option>Principal stratum</option></select></Field></div><div className="rounded-xl bg-[#fff9ed] p-4 text-sm text-[#725725]"><strong>ICH E9(R1) :</strong> documenter les événements intercurrents et leur stratégie d’analyse avant de figer l’estimand.</div></div>; }
function DesignStep({ study, update }: { study: StudyState; update: any }) { const designs = ["Groupes parallèles randomisés", "Supériorité", "Non-infériorité", "Équivalence", "Cross-over", "Cluster randomisé", "Stepped-wedge", "Factoriel", "Adaptatif", "Bras unique", "Master protocol / Basket / Umbrella / Platform", "Pragmatique / Décentralisé / Hybride"]; return <div className="grid gap-5"><Field label="Design"><select className="h-10 rounded-md border border-[#cbded7] bg-white px-3 text-sm" value={study.design} onChange={e => update("design", e.target.value)}>{designs.map(d => <option key={d}>{d}</option>)}</select></Field><div className="grid gap-5 md:grid-cols-2"><Field label="Randomisation"><select className="h-10 rounded-md border border-[#cbded7] bg-white px-3 text-sm" value={study.randomisation} onChange={e => update("randomisation", e.target.value)}><option>Simple</option><option>Blocs</option><option>Stratifiée</option><option>Stratifiée par centre</option><option>Minimisation</option><option>Cluster</option><option>Adaptative par covariables</option></select></Field><Field label="Aveugle"><select className="h-10 rounded-md border border-[#cbded7] bg-white px-3 text-sm" value={study.blinding} onChange={e => update("blinding", e.target.value)}><option>Ouvert</option><option>Simple aveugle</option><option>Double aveugle</option><option>Évaluation d’endpoint en aveugle</option><option>Statisticien en aveugle</option></select></Field></div><div className="grid gap-5 md:grid-cols-2"><Field label="Design : justification conceptuelle"><Area value={study.sequenceNote} onChange={v => update("sequenceNote", v)} placeholder="Pourquoi ce design est-il compatible avec la question, l’intervention, le comparateur et le contexte ?" /></Field><Field label="Note de séquence / strates"><Area value={study.sequenceNote} onChange={v => update("sequenceNote", v)} /></Field></div></div>; }
function SampleStep({ study, update, binaryN, continuousN, survivalD, clusterDE, clusterN }: { study: StudyState; update: any; binaryN: number | null; continuousN: number | null; survivalD: number | null; clusterDE: number; clusterN: number | null }) { return <div className="grid gap-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Binaire" value={binaryN ? `${binaryN}/groupe` : "—"} /><Metric label="Continu" value={continuousN ? `${continuousN} total` : "—"} /><Metric label="Événements" value={survivalD ? `${survivalD}` : "—"} /><Metric label="Design effect cluster" value={clusterDE.toFixed(2)} /></div><div className="grid gap-5 md:grid-cols-2"><Field label="Alpha"><Input value={study.alpha} onChange={e => update("alpha", e.target.value)} /></Field><Field label="Puissance"><Input value={study.power} onChange={e => update("power", e.target.value)} /></Field><Field label="Attrition"><Input value={study.attrition} onChange={e => update("attrition", e.target.value)} /></Field><Field label="Hazard ratio (time-to-event)"><Input value={study.hazardRatio} onChange={e => update("hazardRatio", e.target.value)} /></Field><Field label="Risque contrôle (binaire)"><Input value={study.pControl} onChange={e => update("pControl", e.target.value)} /></Field><Field label="Risque intervention (binaire)"><Input value={study.pTreatment} onChange={e => update("pTreatment", e.target.value)} /></Field><Field label="Différence moyenne"><Input value={study.meanDifference} onChange={e => update("meanDifference", e.target.value)} /></Field><Field label="Écart-type"><Input value={study.sd} onChange={e => update("sd", e.target.value)} /></Field><Field label="ICC"><Input value={study.icc} onChange={e => update("icc", e.target.value)} /></Field><Field label="Taille de cluster"><Input value={study.clusterSize} onChange={e => update("clusterSize", e.target.value)} /></Field><Field label="Événements visés"><Input value={study.events} onChange={e => update("events", e.target.value)} /></Field><Field label="Cluster total ajusté (indicatif)"><Input value={clusterN ? String(clusterN) : "—"} readOnly /></Field></div><section className="rounded-xl border border-[#edd8aa] bg-[#fffaf0] p-5"><p className="font-bold text-[#704c1b]">Avertissement statistique</p><p className="mt-2 text-sm leading-6 text-[#765d35]">Ces formules sont des outils de planification génériques. Le stepped-wedge, les designs adaptatifs, la non-infériorité, l’équivalence, les analyses longitudinales et les contextes complexes nécessitent une méthode spécifique et, souvent, une simulation ou un calcul spécialisé par un biostatisticien.</p></section></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-[#dbe8e3] bg-[#f7fbf9] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#6e8580]">{label}</p><p className="mt-2 text-xl font-bold text-[#0d2b36]">{value}</p></div>; }
function ScheduleStep({ study, update }: { study: StudyState; update: any }) { return <div className="grid gap-5"><Field label="Durée de suivi"><Text value={study.followUp} onChange={v => update("followUp", v)} /></Field><Field label="Visites et fenêtres"><Area value={study.visits} onChange={v => update("visits", v)} placeholder="Ex. Screening J-28 à J0 ; Baseline J0 ; M3 ±14j ; M6 ±14j ; M12 ±30j" /></Field><div className="rounded-xl border border-[#dbe8e3] p-5"><div className="flex items-center gap-2 font-bold text-[#173f43]"><GitBranch className="h-4 w-4 text-[#2a8171]" />Règle de cohérence</div><p className="mt-2 text-sm leading-6 text-[#607771]">Chaque endpoint doit avoir un moment de mesure et chaque procédure critique doit être présente dans le Schedule of Assessments.</p></div></div>; }
function OperationsStep({ study, update }: { study: StudyState; update: any }) { const n = Math.max(0, Number(study.recruitmentCenters) || 0) * Math.max(0, Number(study.monthlyPerCenter) || 0); return <div className="grid gap-5"><div className="grid gap-5 md:grid-cols-2"><Field label="Nombre de centres"><Input type="number" value={study.recruitmentCenters} onChange={e => update("recruitmentCenters", e.target.value)} /></Field><Field label="Patients / centre / mois"><Input type="number" value={study.monthlyPerCenter} onChange={e => update("monthlyPerCenter", e.target.value)} /></Field></div><div className="rounded-xl bg-[#edf7f2] p-5"><div className="flex items-center gap-2 font-bold text-[#174b46]"><UsersRound className="h-4 w-4" />Capacité indicative : {n} inclusions / mois</div><p className="mt-2 text-sm text-[#5c746e]">Cette estimation ne remplace pas une étude de faisabilité centre par centre.</p></div><Field label="Contraintes opérationnelles"><Area value={study.risks} onChange={v => update("risks", v)} /></Field></div>; }
function StatisticsStep({ study, update }: { study: StudyState; update: any }) { return <div className="grid gap-5"><Field label="Analyse principale"><Area value={study.analysis} onChange={v => update("analysis", v)} placeholder="Décrire estimand → estimateur → modèle → covariables → population d’analyse." /></Field><Field label="Données manquantes"><Area value={study.missingData} onChange={v => update("missingData", v)} /></Field><Field label="Analyses de sensibilité"><Area value={study.references} onChange={v => update("references", v)} /></Field></div>; }
function QualityStep({ study, update }: { study: StudyState; update: any }) { return <div className="grid gap-5"><Field label="Facteurs critiques pour la qualité"><Area value={study.quality} onChange={v => update("quality", v)} /></Field><Field label="Risques et mitigations"><Area value={study.risks} onChange={v => update("risks", v)} /></Field><Field label="Sécurité et arrêt"><Area value={study.safety} onChange={v => update("safety", v)} /></Field><div className="grid gap-3 rounded-xl bg-[#f7fbf9] p-5 sm:grid-cols-3"><MiniStat label="CTQ" value={study.quality ? "Documenté" : "À définir"} /><MiniStat label="Risques" value={study.risks ? "Documentés" : "À définir"} /><MiniStat label="Sécurité" value={study.safety ? "Documentée" : "À définir"} /></div></div>; }
function MiniStat({ label, value }: { label: string; value: string }) { return <div><p className="text-xs uppercase tracking-wide text-[#748982]">{label}</p><p className="mt-1 font-bold text-[#1a4143]">{value}</p></div>; }
function ProtocolStep({ study, spiritItems, consortItems }: { study: StudyState; spiritItems: string[]; consortItems: string[] }) { const doneSpirit = [study.title, study.objective, study.population, study.intervention, study.outcome, study.design, study.analysis].filter(Boolean).length; const doneConsort = [study.title, study.objective, study.population, study.intervention, study.outcome, study.analysis].filter(Boolean).length; return <div className="grid gap-6"><div className="grid gap-4 md:grid-cols-2"><ChecklistCard title="SPIRIT 2025" total={34} done={doneSpirit} items={spiritItems.slice(0, 10)} href="/fr/veille" /><ChecklistCard title="CONSORT 2025" total={30} done={doneConsort} items={consortItems.slice(0, 10)} href="/fr/veille" /></div><div className="rounded-xl border border-[#dbe8e3] bg-[#f8fbfa] p-5"><p className="font-bold text-[#173f43]">Livrables à préparer</p><div className="mt-3 grid gap-2 sm:grid-cols-2"><Tag text="Synopsis protocole" /><Tag text="Schedule of Assessments" /><Tag text="SAP draft" /><Tag text="Registration dataset" /><Tag text="Risk register" /><Tag text="Reference report" /></div></div></div>; }
function ChecklistCard({ title, total, done, items, href }: { title: string; total: number; done: number; items: string[]; href: string }) { return <article className="rounded-2xl border border-[#dbe8e3] p-5"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-[#39806f]">Checklist</p><h3 className="mt-1 font-serif text-xl font-bold text-[#173e43]">{title}</h3></div><div className="text-right"><p className="text-2xl font-bold text-[#0d2b36]">{Math.min(done, total)}/{total}</p><p className="text-xs text-[#6b827c]">indicatif</p></div></div><div className="mt-4 grid gap-2">{items.map((x, i) => <div className="flex items-start gap-2 text-sm text-[#536e68]" key={`${title}-${i}`}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2b8372]" />{x}</div>)}</div><Link href={href} className="mt-4 inline-flex text-sm font-bold text-[#1c7566]">Voir les références <ArrowRight className="ml-1 h-4 w-4" /></Link></article>; }
function Tag({ text }: { text: string }) { return <span className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#315652] shadow-sm ring-1 ring-[#dbe8e3]">{text}</span>; }
function AuditStep({ completeness, challenge, open, setOpen }: { completeness: number; challenge: Array<{ level: string; text: string }>; open: boolean; setOpen: (v: boolean) => void }) { return <div className="grid gap-6"><div className="rounded-2xl bg-[#0d2b36] p-6 text-white"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a6d6c6]">Design Health</p><p className="mt-2 text-5xl font-bold">{completeness}%</p><p className="mt-2 max-w-xl text-sm leading-6 text-[#c6ddd6]">Score indicatif de complétude du projet. Il ne constitue ni une validation scientifique, ni statistique, ni réglementaire.</p></div><Sparkles className="h-9 w-9 text-[#9fd7c4]" /></div></div><section className="rounded-2xl border border-[#dbe8e3] bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-serif text-2xl font-bold text-[#153e43]">Challenge My Design</h3><Button variant="outline" onClick={() => setOpen(!open)}>{open ? "Masquer" : "Analyser"}</Button></div>{open && <div className="mt-5 grid gap-3">{challenge.length ? challenge.map((x, i) => <div key={i} className={`rounded-xl p-4 ${x.level === "CRITIQUE" ? "bg-rose-50 text-rose-900" : x.level === "ATTENTION" ? "bg-[#fff9ed] text-[#735522]" : "bg-[#f2f7f5] text-[#4f6b66]"}`}><strong>{x.level}</strong> — {x.text}</div>) : <div className="rounded-xl bg-[#edf7f2] p-4 text-[#195f53]">Aucune alerte structurelle parmi les règles actuelles. Cela ne remplace pas une revue experte.</div>}</div>}</section><div className="grid gap-4 sm:grid-cols-3"><Metric label="Références" value="ICH / WHO / EMA / FDA / SPIRIT / CONSORT" /><Metric label="Données patient" value="Non nécessaires" /><Metric label="Statut" value="À revoir humainement" /></div></div>; }
