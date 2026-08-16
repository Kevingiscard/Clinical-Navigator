import { ClinicalShell } from "@/components/ClinicalShell";
import { lazy, Suspense, useMemo, useState } from "react";
const ClinicalAssistant = lazy(() => import("@/components/ClinicalAssistant").then(module => ({ default: module.ClinicalAssistant })));
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { bilingualGlossary, clinicalKnowledgeBase, type ClinicalKnowledgeEntry } from "@shared/clinicalKnowledgeBase";
import { CheckCircle2, ChevronRight, GraduationCap, Languages, LockKeyhole, Sparkles, XCircle } from "lucide-react";

type Level = "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
const levels: Array<{ name: Level; description: string; minCategory: string }> = [
  { name: "Débutant", description: "Comprendre les phases, les rôles et les principes de sécurité.", minCategory: "Fondamentaux" },
  { name: "Intermédiaire", description: "Structurer une question, des données et une analyse.", minCategory: "Méthodologie" },
  { name: "Avancé", description: "Relier statistiques, qualité, opérations et gouvernance.", minCategory: "Opérations" },
  { name: "Expert", description: "Comparer les cadres internationaux et leurs limites locales.", minCategory: "Réglementaire" },
];
const quiz = [
  { question: "Quelle est la première protection d’un participant lorsqu’un écart est suspecté ?", options: ["Modifier les données pour corriger l’écart", "Préserver la sécurité, les faits et la traçabilité", "Attendre le prochain audit"], correct: 1 },
  { question: "Que signifie ITT ?", options: ["Une analyse selon le groupe assigné", "Une analyse des seuls participants adhérents", "Un registre international"], correct: 0 },
  { question: "Une source locale sans revue humaine doit être présentée comme :", options: ["VERIFIED", "Une obligation universelle", "À vérifier ou en construction"], correct: 2 },
];

function levelFor(index: number): Level {
  if (index < 35) return "Débutant";
  if (index < 75) return "Intermédiaire";
  if (index < 115) return "Avancé";
  return "Expert";
}

export default function LearningPage() {
  const [level, setLevel] = useState<Level>("Débutant");
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [selected, setSelected] = useState<ClinicalKnowledgeEntry | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Level[]>([]);
  const available = useMemo(() => clinicalKnowledgeBase.filter((_, index) => levelFor(index) === level).slice(0, 12), [level]);
  const currentQuiz = quiz[quizIndex];
  const chooseLevel = (next: Level) => { setLevel(next); setSelected(null); setAnswer(null); };
  const submitAnswer = (option: number) => { setAnswer(option); if (option === currentQuiz.correct && !completed.includes(level)) setCompleted([...completed, level]); };

  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]"><div className="container py-10"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#39806f]">Formation · {clinicalKnowledgeBase.length} entrées</p><h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Apprendre par situation, du débutant à l’expert.</h1><p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Un parcours progressif alimenté par le guide bilingue embarqué. Les réponses sont pédagogiques, sourcées et ne remplacent ni un protocole, ni une SOP, ni une décision habilitée.</p></div><Button variant="outline" onClick={() => setLanguage(language === "fr" ? "en" : "fr")} className="border-[#bcd8ce] text-[#1c6659]"><Languages className="mr-2 h-4 w-4" />{language === "fr" ? "English" : "Français"}</Button></div></div></section>
    <section className="container py-10"><div className="grid gap-4 md:grid-cols-4">{levels.map(item => <button type="button" key={item.name} onClick={() => chooseLevel(item.name)} className={`rounded-2xl border p-5 text-left transition ${level === item.name ? "border-[#2d8878] bg-[#eaf7f1] shadow-sm" : "border-[#dbe8e3] bg-white hover:border-[#9bcab9]"}`}>{completed.includes(item.name) ? <CheckCircle2 className="h-5 w-5 text-[#227766]" /> : level === item.name ? <Sparkles className="h-5 w-5 text-[#2c8271]" /> : <LockKeyhole className="h-5 w-5 text-[#829a94]" />}<p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#39806f]">{item.name}</p><p className="mt-2 text-sm leading-6 text-[#526b67]">{item.description}</p></button>)}</div>
      <div className="mt-8 grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#39806f]">Module {level}</p><h2 className="mt-2 font-serif text-2xl font-bold text-[#143c41]">Entrées recommandées</h2></div><span className="text-sm text-[#607771]">{available.length} cartes</span></div><div className="mt-5 grid gap-3">{available.map(entry => <button type="button" key={entry.id} onClick={() => setSelected(entry)} className={`rounded-xl border p-4 text-left ${selected?.id === entry.id ? "border-[#2d8878] bg-[#eef9f4]" : "border-[#e0ece7] hover:bg-[#f6fbf8]"}`}><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-[#1b4547]">{language === "fr" ? entry.question.fr : entry.question.en}</p><p className="mt-1 text-xs text-[#6d8780]">{entry.category} · preuve indicative {entry.evidenceLevel}</p></div><ChevronRight className="h-4 w-4 shrink-0 text-[#39806f]" /></div></button>)}</div>{selected && <article className="mt-6 rounded-2xl bg-[#0d2b36] p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a7dac7]">Réponse guidée · {selected.category}</p><p className="mt-4 leading-7 text-[#e2f1eb]">{language === "fr" ? selected.answer.fr : selected.answer.en}</p><p className="mt-5 border-t border-white/15 pt-4 text-xs leading-5 text-[#b8d4ca]">Sources : {selected.sources.join(", ")} · Portée : {selected.geographicScope.join(", ")}</p></article>}</section>
        <aside className="rounded-2xl bg-[#f5f8f6] p-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#39806f]">Quiz auto-corrigé</p><h2 className="mt-3 font-serif text-2xl font-bold text-[#143c41]">Vérifier sa compréhension</h2><p className="mt-3 text-sm leading-6 text-[#607771]">Question {quizIndex + 1} sur {quiz.length}. Les résultats sont conservés uniquement dans cette session.</p><h3 className="mt-6 font-semibold leading-6 text-[#21484a]">{currentQuiz.question}</h3><div className="mt-4 grid gap-2">{currentQuiz.options.map((option, index) => <button type="button" key={option} onClick={() => submitAnswer(index)} className={`flex items-start gap-2 rounded-xl border p-3 text-left text-sm ${answer === index ? index === currentQuiz.correct ? "border-[#2d8878] bg-[#e7f6ef]" : "border-rose-300 bg-rose-50" : "border-[#dbe8e3] bg-white hover:bg-[#f7fbf9]"}`}>{answer === index && (index === currentQuiz.correct ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#227766]" /> : <XCircle className="mt-0.5 h-4 w-4 text-rose-700" />)}<span>{option}</span></button>)}</div>{answer !== null && <div className="mt-4 flex items-center justify-between gap-3"><p className="text-sm font-semibold text-[#365a55]">{answer === currentQuiz.correct ? "Bonne réponse." : "À revoir dans le guide."}</p><Button size="sm" onClick={() => { setQuizIndex((quizIndex + 1) % quiz.length); setAnswer(null); }} className="bg-[#0d2b36]">Suivant</Button></div>}</aside>
      </div>
      <section className="mt-8 rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#39806f]">Assistant pédagogique</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#143c41]">Poser une question au guide embarqué</h2></div><span className="text-xs font-semibold text-[#607771]">Fallback hors connexion activé</span></div><div className="mt-5"><Suspense fallback={<div className="rounded-xl bg-[#f5faf7] p-5 text-sm text-[#607771]">Chargement de l’assistant…</div>}><ClinicalAssistant language={language} /></Suspense></div></section>
      <div className="mt-8 rounded-2xl bg-[#0d2b36] p-7 text-white"><div className="flex items-center gap-3"><GraduationCap className="h-6 w-6 text-[#a9dac6]" /><h2 className="font-serif text-2xl font-bold">Glossaire bilingue</h2></div><p className="mt-3 max-w-3xl text-sm leading-6 text-[#c9ded7]">{bilingualGlossary.length} termes FR/EN sont reliés aux entrées du guide. Une traduction ne change pas la portée juridique d’une règle locale.</p><Accordion type="single" collapsible className="mt-4 text-[#d5e8e1]"><AccordionItem value="method" className="border-white/10"><AccordionTrigger>Comment utiliser ce parcours ?</AccordionTrigger><AccordionContent>Commencez par les fondamentaux, répondez au quiz, puis consultez les entrées méthodologiques et réglementaires correspondant à votre étude et à votre juridiction.</AccordionContent></AccordionItem><AccordionItem value="evidence" className="border-white/10"><AccordionTrigger>Que signifie le niveau de preuve ?</AccordionTrigger><AccordionContent>A indique un cadre ou une source fortement établi, B un repère méthodologique nécessitant contextualisation, et C un glossaire ou une définition pédagogique. Ce classement n’est pas une décision réglementaire.</AccordionContent></AccordionItem></Accordion></div>
    </section>
  </ClinicalShell>;
}
