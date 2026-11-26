import { ClinicalShell } from "@/components/ClinicalShell";
import { composeSession } from "@/lib/quizComposer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, GraduationCap, RotateCcw, CheckCircle2, XCircle, Users, Stethoscope, Hammer } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTop, qid, sendScore } from "@/lib/blobApi";
import { Link } from "wouter";

type Question = { q: string; options: string[]; answer: number; explain: string; source: string | null };
type Topic = { id: string; title: string; validated: boolean; note: string; questions: Question[]; questionsB: Question[] };
type Audience = { id: string; title: string; icon: typeof Users; intro: string; topics: Topic[] };

const SRC_2010_40 = "Loi n° 2010-40 (sgg.gouv.bj), vérifiée le 21/11/2026";
const SRC_ABMED = "Lignes directrices ABMed EC-LD-0001 v1 (abmed.bj), vérifiées le 21/11/2026";

const audiences: Audience[] = [
  {
    id: "patients",
    title: "Je suis patient ou proche",
    icon: Users,
    intro: "Des questions simples pour vérifier que les explications sont bien comprises. Le résultat vous appartient : il n'est pas enregistré à votre nom, et il ne décide jamais à votre place.",
    topics: [
      {
        id: "droits",
        title: "Consentement et droits des participants",
        validated: true,
        note: "Quiz construit à partir de sources primaires vérifiées le 21/11/2026 (loi 2010-40, lignes directrices ABMed) ; sa conception (choix et formulation des questions) n'a pas encore été validée par un expert médical ou juridique.",
        questions: [
          { q: "Quelqu'un vous propose de participer à une recherche. Avez-vous le droit de refuser ?", options: ["Non, si le médecin le propose il faut accepter", "Oui, et sans avoir à me justifier", "Oui, mais seulement avec l'accord de ma famille"], answer: 1, explain: "Le refus est libre et doit être respecté. Personne ne peut vous obliger, et votre refus ne change rien à vos soins habituels.", source: SRC_2010_40 + " (art. 21 et 26)" },
          { q: "Vous avez dit oui à une recherche. Pouvez-vous changer d'avis plus tard ?", options: ["Oui, à tout moment et sans menace", "Non, une fois le formulaire signé c'est définitif", "Oui, mais seulement la première semaine"], answer: 0, explain: "Vous pouvez retirer votre participation à tout moment, sans raison et sans encourir aucune menace.", source: SRC_2010_40 + " (art. 26)" },
          { q: "Avant de décider, que doit vous expliquer l'équipe de recherche ?", options: ["Seulement les avantages", "L'objectif, ce qui sera fait, la durée, les contraintes, les risques et les résultats attendus", "Rien, c'est à moi de me renseigner"], answer: 1, explain: "Le chercheur doit vous faire connaître l'objectif, la méthodologie, la durée, les résultats attendus, les contraintes et les risques prévisibles, ainsi que l'avis du comité d'éthique.", source: SRC_2010_40 + " (art. 26)" },
          { q: "Vous ne lisez pas le français. Comment votre accord peut-il être confirmé ?", options: ["Il ne peut pas l'être", "Par écrit ou, si l'écriture est impossible, par l'attestation d'une personne indépendante de l'équipe", "Par un membre de l'équipe qui signe pour moi"], answer: 1, explain: "Le consentement est donné par écrit ou, en cas d'impossibilité, attesté par un tiers totalement indépendant du chercheur et du promoteur. Vous pouvez aussi demander une explication dans la langue que vous comprenez.", source: SRC_2010_40 + " (art. 26) ; " + SRC_ABMED + " (§1.9.1)" },
          { q: "Peut-on vous payer pour participer à une recherche ?", options: ["Oui, un salaire est prévu", "Non, seuls vos frais peuvent être remboursés", "Oui, si l'étude est longue"], answer: 1, explain: "La recherche ne donne lieu à aucune contrepartie financière directe ou indirecte, hormis le remboursement de vos frais.", source: SRC_2010_40 + " (art. 30)" },
          { q: "Un enfant peut-il participer à une recherche ?", options: ["Oui, dans les cas prévus par la loi, avec le consentement de ses parents ou de son représentant légal", "Non, jamais", "Oui, avec son seul accord"], answer: 0, explain: "Pour un mineur, le consentement est donné par les titulaires de l'autorité parentale ou le représentant légal, et l'étude doit en principe viser un bénéfice direct pour sa santé.", source: SRC_2010_40 + " (art. 27 et 28)" },
        ],
        questionsB: [
          { q: "Avant votre décision, un examen médical est-il prévu ?", options: ["Non, jamais", "Oui, fait par un médecin désigné parmi ceux agréés par le comité d'éthique, et ses résultats vous sont communiqués avant votre décision", "Seulement si je le demande"], answer: 1, explain: "L'étude doit être précédée d'un examen médical, et ses résultats vous sont communiqués par le médecin de votre choix avant l'expression de votre consentement.", source: SRC_2010_40 + " (art. 31)" },
          { q: "Peut-on vous faire participer en même temps à deux recherches qui ne vous apportent aucun bénéfice direct ?", options: ["Oui, si les deux équipes sont d'accord", "Non, ce n'est pas permis", "Oui, si je signe deux formulaires"], answer: 1, explain: "Nul ne peut se prêter simultanément à plusieurs recherches cliniques ou biomédicales sans bénéfice individuel direct.", source: SRC_2010_40 + " (art. 32)" },
          { q: "Un proche majeur ne peut pas décider seul. Qui donne le consentement pour lui ?", options: ["Son représentant légal", "Son médecin traitant", "Le chef du service hospitalier"], answer: 0, explain: "Pour les majeurs protégés par la loi, le consentement est donné par le représentant légal ou le tuteur autorisé, avec les mêmes protections que pour les mineurs.", source: SRC_2010_40 + " (art. 27 et 28)" },
          { q: "Qui vérifie le projet de recherche avant qu'il commence ?", options: ["Personne, c'est le chercheur qui décide", "Un comité national d'éthique, dont l'avis doit vous être communiqué", "Uniquement l'hôpital où il travaille"], answer: 1, explain: "Le chercheur doit vous faire connaître l'avis du Comité national d'éthique pour la recherche en santé (CNERS) avant de recueillir votre consentement.", source: SRC_2010_40 + " (art. 26 et 43 et suivants)" },
          { q: "Si la recherche vous cause un problème, qui est assuré pour cela ?", options: ["Personne", "Le promoteur de la recherche, qui doit avoir souscrit une assurance responsabilité civile", "Seulement l'État"], answer: 1, explain: "Le promoteur doit souscrire une assurance garantissant sa responsabilité civile et celle de tout intervenant.", source: SRC_2010_40 + " (art. 29)" },
        ],
      },
      {
        id: "visite",
        title: "Le déroulement d'une visite d'étude (exemple)",
        validated: false,
        note: "Contenu d'exemple, non validé : les déroulés réels dépendent du protocole de chaque étude. Un seul quiz pour l'instant.",
        questions: [
          { q: "Exemple — À quoi sert la première visite d'une étude ?", options: ["À signer sans explication", "À recevoir les explications, poser des questions et vérifier que l'étude vous concerne", "À recevoir directement le traitement"], answer: 1, explain: "En pratique, la première étape sert à comprendre l'étude et à vérifier l'éligibilité avant toute décision. Exemple pédagogique à valider par l'équipe de l'étude.", source: null },
        ],
        questionsB: [],
      },
    ],
  },
  {
    id: "pros",
    title: "Je suis professionnel",
    icon: Stethoscope,
    intro: "Un auto-test sur le cadre vérifié du consentement au Bénin. Ce n'est ni une certification ni une habilitation : la pratique réelle se vérifie sous supervision, pas par un quiz.",
    topics: [
      {
        id: "cadre",
        title: "Cadre du consentement au Bénin",
        validated: true,
        note: "Quiz construit à partir de sources primaires vérifiées le 21/11/2026 ; sa conception n'a pas encore été validée par un expert médical ou juridique. Ne vaut ni certification ni qualification.",
        questions: [
          { q: "Selon la loi 2010-40, quelles informations doivent précéder le consentement ?", options: ["Objectif, méthodologie, durée, résultats attendus, contraintes, risques prévisibles, avis du CNERS", "Uniquement les risques majeurs", "Le protocole complet, article par article"], answer: 0, explain: "Art. 26 : information sur objectif, méthodologie, durée, résultats attendus, contraintes et risques prévisibles (même en cas d'arrêt avant terme), et avis du CNERS.", source: SRC_2010_40 + " (art. 26)" },
          { q: "Un participant ne peut pas écrire. Quelle forme prend le consentement ?", options: ["Consentement verbal simple devant l'équipe", "Attestation par un tiers totalement indépendant du chercheur et du promoteur", "Signature d'un membre de sa famille"], answer: 1, explain: "Art. 26 : l'écrit est la règle ; en cas d'impossibilité, attestation par un tiers totalement indépendant. Le recours au tiers n'est pas une forme libre de consentement oral.", source: SRC_2010_40 + " (art. 26)" },
          { q: "Pour un essai relevant de l'ABMed, un document d'information en langue nationale est-il suffisant seul dans le dossier ?", options: ["Oui, la langue du participant prime", "Non : documents en français ; tout document dans une autre langue est fourni avec une traduction certifiée conforme en français", "Non, seul l'anglais est accepté"], answer: 1, explain: "EC-LD-0001 §1.2.2 : demandes et annexes (dont fiches d'information et FCE) en français ; document non rédigé en français = original + traduction certifiée conforme en français. Champ : demandes soumises à l'ABMed.", source: SRC_ABMED + " (§1.2.2)" },
          { q: "Qui dirige une recherche clinique ou biomédicale ?", options: ["N'importe quel soignant motivé", "Un chercheur qualifié, assisté d'un médecin expérimenté s'il n'est pas médecin", "Le promoteur seul"], answer: 1, explain: "Art. 24 : direction par un chercheur qualifié ; s'il n'est pas médecin, assistance d'un médecin justifiant d'au moins cinq ans d'expérience dans le domaine.", source: SRC_2010_40 + " (art. 24)" },
          { q: "Dans quels cas des mineurs peuvent-ils être inclus sans bénéfice individuel direct ?", options: ["Jamais", "Si aucun risque sérieux prévisible, utilité pour des personnes de mêmes caractéristiques, et impossibilité de procéder autrement", "Si les parents sont d'accord, sans autre condition"], answer: 1, explain: "Art. 27 : trois conditions cumulatives ; et art. 28 fixe qui donne le consentement selon les cas.", source: SRC_2010_40 + " (art. 27 et 28)" },
          { q: "Une personne en situation d'analphabétisme participe à un essai. Quelles mesures ?", options: ["Aucune mesure particulière", "Mesures renforcées : information adaptée, témoin impartial pour la procédure de consentement, retrait sans conséquence", "Exclusion automatique"], answer: 1, explain: "EC-LD-0001 §1.9.1 : analphabétisme et barrière linguistique = vulnérabilité ; mesures renforcées et justification de l'inclusion.", source: SRC_ABMED + " (§1.9.1)" },
        ],
        questionsB: [
          { q: "Qui souscrit l'assurance responsabilité civile et qui couvre-t-elle ?", options: ["Le participant, pour lui-même", "Le promoteur, pour sa responsabilité et celle de tout intervenant", "L'assurance maladie du participant"], answer: 1, explain: "Art. 29 : souscription préalable par le promoteur d'une assurance garantissant sa responsabilité civile et celle de tout intervenant, indépendamment des liens entre eux.", source: SRC_2010_40 + " (art. 29)" },
          { q: "Quand les résultats de l'examen médical préalable sont-ils communiqués au participant ?", options: ["Après la signature du consentement", "Avant l'expression de son consentement éclairé, par l'intermédiaire du médecin de son choix", "Seulement à la fin de l'étude"], answer: 1, explain: "Art. 31 : examen par un médecin agréé par le CNERS ; résultats communiqués avant l'expression du consentement éclairé.", source: SRC_2010_40 + " (art. 31)" },
          { q: "Qui peut attester le consentement quand l'écrit est impossible ?", options: ["L'infirmier de l'étude", "Un tiers totalement indépendant du chercheur et du promoteur", "Le promoteur lui-même"], answer: 1, explain: "Art. 26 : le tiers doit être totalement indépendant du chercheur et du promoteur. Un membre de l'équipe ne remplit pas cette condition.", source: SRC_2010_40 + " (art. 26)" },
          { q: "Quelles obligations pour inclure des personnes vulnérables dans un essai relevant de l'ABMed ?", options: ["Justifier l'inclusion, minimiser les risques, mesures renforcées de protection, pas de contrainte ni représailles, autorisation du représentant légal si capacité limitée", "Une simple note dans le protocole", "Une autorisation verbale du directeur du site"], answer: 0, explain: "EC-LD-0001 §1.9.1 liste ces obligations et renvoie à la Déclaration d'Helsinki et aux directives CIOMS.", source: SRC_ABMED + " (§1.9.1)" },
          { q: "La contrepartie financière d'une participation est-elle possible ?", options: ["Oui, librement négociée", "Non : aucune contrepartie directe ou indirecte hormis le remboursement des frais, sous réserve de dispositions particulières du CNERS", "Oui, si l'essai est de phase I"], answer: 1, explain: "Art. 30 : pas de contrepartie financière directe ou indirecte, hormis remboursement des frais et sous réserve de dispositions particulières prises par le CNERS.", source: SRC_2010_40 + " (art. 30)" },
        ],
      },
      {
        id: "dossier",
        title: "Constitution d'un dossier de soumission (exemple)",
        validated: false,
        note: "Contenu d'exemple, non validé : les exigences de dossier dépendent de l'instance et du type d'étude. Un seul quiz pour l'instant.",
        questions: [
          { q: "Exemple — Quel document atteste que le participant a compris et accepté ?", options: ["Le protocole", "Le formulaire de consentement éclairé (et ses traductions applicables)", "La facture de l'étude"], answer: 1, explain: "Le FCE et toutes ses traductions applicables font partie des documents essentiels. Exemple pédagogique à valider selon l'instance.", source: null },
        ],
        questionsB: [],
      },
    ],
  },
];

const scenario = {
  title: "Mise en situation",
  text: "Une personne âgée, ne lisant pas le français, est sollicitée pour un essai. L'équipe lui lit la lettre d'information en français, puis lui demande de signer.",
  q: "Qu'est-ce qui ne va pas dans ce déroulé ?",
  options: ["Rien, la lecture à voix haute suffit", "L'explication doit être donnée dans une langue qu'elle comprend, avec un témoin impartial, et l'écrit n'est pas possible pour elle : l'attestation par un tiers indépendant est prévue", "Elle doit être exclue de l'essai"],
  answer: 1,
  explain: "Compréhension exigée (loi 2010-40 art. 21), mesures renforcées pour l'analphabétisme et la barrière linguistique (ABMed §1.9.1), attestation par un tiers indépendant en cas d'impossibilité de l'écrit (art. 26).",
  source: SRC_2010_40 + " (art. 21 et 26) ; " + SRC_ABMED + " (§1.9.1)",
};

type Phase = "audience" | "topics" | "quiz1" | "scenario" | "quiz2" | "done";

export default function TrainingQuizPage() {
  const [phase, setPhase] = useState<Phase>("audience");
  const [ai, setAi] = useState(0);
  const [ti, setTi] = useState(0);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score1, setScore1] = useState(0);
  const [missed1, setMissed1] = useState<number[]>([]);
  const [score2, setScore2] = useState(0);
  const [missed2, setMissed2] = useState<number[]>([]);
  const [scenarioPicked, setScenarioPicked] = useState<number | null>(null);
  const [custom, setCustom] = useState<{ q1: Question[]; q2: Question[] } | null>(null);

  const [share, setShare] = useState(true);
  const [stats, setStats] = useState<{ attempts: number; top: { q: string; n: number }[] } | null>(null);

  const topic = audiences[ai]?.topics[ti];
  const pool1 = custom?.q1 ?? topic?.questions;
  const pool2 = custom?.q2 ?? topic?.questionsB;
  const hasSecond = (pool2?.length ?? 0) > 0;
  const activeQuestions = phase === "quiz2" ? pool2 : pool1;

  useEffect(() => {
    if (phase !== "done" || !topic) return;
    const quizId = `${audiences[ai].id}-${topic.id}`;
    let cancelled = false;
    (async () => {
      if (share) {
        const texts = [...missed1.map(i => pool1?.[i]?.q), ...missed2.map(i => pool2?.[i]?.q)].filter((x): x is string => !!x);
        await sendScore(quizId, texts);
      }
      const t = await fetchTop(quizId);
      if (!cancelled) setStats(t);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const startQuiz = (a: number, t: number) => {
    setStats(null);
    setAi(a); setTi(t); setPhase("quiz1"); setQi(0); setPicked(null);
    setScore1(0); setMissed1([]); setScore2(0); setMissed2([]); setScenarioPicked(null); setCustom(null);
  };

  const startComposed = (a: number, t: number) => {
    setStats(null);
    const topicSel = audiences[a]?.topics[t];
    if (!topicSel) return;
    const q1 = composeSession(topicSel.questions);
    const q2 = topicSel.questionsB.length > 0 ? composeSession(topicSel.questionsB) : composeSession(topicSel.questions);
    setCustom({ q1, q2 });
    setAi(a); setTi(t); setPhase("quiz1"); setQi(0); setPicked(null);
    setScore1(0); setMissed1([]); setScore2(0); setMissed2([]); setScenarioPicked(null);
  };

  const pick = (i: number) => {
    if (picked !== null || !topic || !activeQuestions) return;
    setPicked(i);
    const good = i === activeQuestions[qi].answer;
    if (phase === "quiz2") { if (good) setScore2(s => s + 1); else setMissed2(m => [...m, qi]); }
    else { if (good) setScore1(s => s + 1); else setMissed1(m => [...m, qi]); }
  };

  const next = () => {
    if (!topic || !activeQuestions) return;
    if (qi + 1 < activeQuestions.length) { setQi(qi + 1); setPicked(null); }
    else if (phase === "quiz1") { setPhase("scenario"); setQi(0); setPicked(null); }
    else setPhase("done");
  };

  const pickScenario = (i: number) => { if (scenarioPicked !== null) return; setScenarioPicked(i); };
  const scenarioOk = scenarioPicked !== null ? scenarioPicked === scenario.answer : null;

  const afterScenario = () => {
    if (hasSecond) { setPhase("quiz2"); setQi(0); setPicked(null); }
    else setPhase("done");
  };

  const quizBlock = (label: string, questions: Question[]) => (
    <div className="rounded-2xl border border-[#d8e7e1] bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-[#365f56]">{topic?.title} — {label}, question {qi + 1} / {questions.length}</p>
      <h2 className="mt-3 font-serif text-xl font-bold text-[#11373d]">{questions[qi].q}</h2>
      <div className="mt-4 grid gap-2">
        {questions[qi].options.map((opt, oi) => {
          const isPicked = picked === oi;
          const isAnswer = questions[qi].answer === oi;
          const cls = picked === null ? "border-[#d8e7e1] hover:border-[#207666]" : isAnswer ? "border-[#2f8f5b] bg-[#eef7f1]" : isPicked ? "border-[#c25b4e] bg-[#fdf0ee]" : "border-[#e2ebe7] opacity-70";
          return <button key={oi} onClick={() => pick(oi)} className={`flex items-start gap-2 rounded-xl border p-4 text-left text-sm leading-6 text-[#264b4c] transition ${cls}`}>
            {picked !== null && (isAnswer ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f8f5b]" /> : isPicked ? <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#c25b4e]" /> : null)}
            <span>{opt}</span>
          </button>;
        })}
      </div>
      {picked !== null && (
        <div className="mt-4 rounded-xl bg-[#edf5f1] p-4 text-sm leading-6 text-[#264b4c]">
          <p><strong>{picked === questions[qi].answer ? "Exact. " : "Pas tout à fait. "}</strong>{questions[qi].explain}</p>
          {questions[qi].source && <p className="mt-1 text-xs text-[#536d67]">Source : {questions[qi].source}</p>}
          <Button className="mt-3 bg-[#0d2b36]" onClick={next}>{qi + 1 < questions.length ? "Question suivante" : phase === "quiz1" ? "Passer à la mise en situation" : "Voir le bilan"}</Button>
        </div>
      )}
    </div>
  );

  const missedList = (missed: number[], questions: Question[]) => missed.map(mi => (
    <li key={mi} className="rounded-xl bg-[#fdf6e9] p-4 text-sm leading-6 text-[#6b4a1b]">
      <strong>{questions[mi].q}</strong><br />{questions[mi].explain}
      {questions[mi].source && <span className="mt-1 block text-xs">Source : {questions[mi].source}</span>}
    </li>
  ));

  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
      <div className="container max-w-4xl py-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Entraînement · maquette privée</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Se tester et s'entraîner</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Un quiz de départ pour repérer ce que vous connaissez, des explications sourcées à chaque erreur, une mise en situation, puis un second quiz avec des questions différentes pour vérifier les acquis. Patients et professionnels ont des parcours distincts.</p>
      </div>
    </section>
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Alert className="mb-6 border-[#f0d9b5] bg-[#fdf6e9] text-[#6b4a1b]">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Maquette en préparation, pas un certificat</AlertTitle>
        <AlertDescription>Aucun compte, aucune donnée identifiante : votre résultat reste sur cette page et disparaît dès qu'on la quitte. Un score ne vaut ni certification professionnelle ni consentement : pour un patient, il ne sert jamais à pousser une décision ; pour un professionnel, la pratique se vérifie sous supervision. Les sujets marqués « contenu vérifié » s'appuient sur des sources primaires datées, sans que la conception des quiz (choix et formulation des questions) ait encore été validée par un expert médical ou juridique ; les autres sujets sont des exemples à valider.</AlertDescription>
      </Alert>
      <div className="mb-8 rounded-2xl border border-[#d8e7e1] bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#365f56]"><Hammer className="h-4 w-4" />Ce qui fonctionne ici, ce qui reste maquette</p>
        <p className="mt-2 text-sm leading-6 text-[#536d67]"><strong className="text-[#264b4c]">Fonctionne :</strong> quiz de départ, corrections expliquées et sourcées, mise en situation, second quiz différent, bilan des erreurs affiché en local sur la page (seul un décompte anonyme des questions manquées peut être envoyé, si la case est cochée).</p>
        <p className="mt-1 text-sm leading-6 text-[#536d67]"><strong className="text-[#264b4c]">Reste maquette :</strong> deux sujets seulement par profil (dont un exemple non validé), pas de banques complètes par sujet, pas de suivi de progression entre les visites (volontaire, car il demanderait comptes ou stockage), pas d'adaptation automatique du parcours.</p>
      </div>

      {phase === "audience" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {audiences.map((a, i) => (
            <button key={a.id} onClick={() => { setAi(i); setPhase("topics"); }} className="rounded-2xl border border-[#d8e7e1] bg-white p-6 text-left shadow-sm transition hover:border-[#207666]">
              <a.icon className="h-6 w-6 text-[#207666]" />
              <h2 className="mt-3 font-serif text-xl font-bold text-[#11373d]">{a.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#536d67]">{a.intro}</p>
            </button>
          ))}
        </div>
      )}

      {phase === "topics" && (
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#11373d]">{audiences[ai].title}</h2>
          <label className="mt-3 flex items-start gap-2 rounded-xl border border-[#d8e7e1] bg-white p-3 text-xs leading-5 text-[#536d67]"><input type="checkbox" className="mt-1" checked={share} onChange={e => setShare(e.target.checked)} /><span>À la fin d'une session, compter anonymement les questions que j'ai manquées dans les statistiques « questions les plus ratées ». Rien d'autre n'est envoyé : ni nom, ni score personnel, ni identifiant, ni cookie. Décochez pour ne rien envoyer.</span></label>
          <div className="mt-4 grid gap-4">
            {audiences[ai].topics.map((t, tix) => (
              <div key={t.id} className="rounded-2xl border border-[#d8e7e1] bg-white p-6 text-left shadow-sm transition hover:border-[#207666]">
                <button onClick={() => startQuiz(ai, tix)} className="block w-full text-left">
                  <p className={`text-xs font-bold uppercase tracking-wide ${t.validated ? "text-[#207666]" : "text-[#b07a2a]"}`}>{t.validated ? "Contenu vérifié, sources datées" : "Exemple à valider"}</p>
                  <h3 className="mt-2 font-serif text-lg font-bold text-[#11373d]">{t.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#536d67]">{t.note}</p>
                  <p className="mt-2 text-xs text-[#718682]">Quiz de départ ({t.questions.length} questions) + mise en situation{t.questionsB.length > 0 ? ` + second quiz (${t.questionsB.length} questions différentes)` : ""}</p>
                </button>
                <button onClick={() => startComposed(ai, tix)} className="mt-3 inline-block rounded-lg border border-[#b9d6ca] px-3 py-2 text-xs font-bold text-[#17645c] hover:bg-[#eef6f2]">Nouvelle session mélangée — mêmes questions de la banque, ordre et options mélangés ; aucune question n'est générée automatiquement.</button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4" onClick={() => setPhase("audience")}>Changer de profil</Button>
        </div>
      )}

      {phase === "quiz1" && topic && quizBlock("Étape 1 · quiz de départ", topic.questions)}

      {phase === "scenario" && topic && (
        <div className="rounded-2xl border border-[#d8e7e1] bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-[#365f56]">Étape 2 · {scenario.title}</p>
          <p className="mt-3 text-sm leading-6 text-[#536d67]">{scenario.text}</p>
          <h2 className="mt-3 font-serif text-xl font-bold text-[#11373d]">{scenario.q}</h2>
          <div className="mt-4 grid gap-2">
            {scenario.options.map((opt, oi) => {
              const isPicked = scenarioPicked === oi;
              const isAnswer = scenario.answer === oi;
              const cls = scenarioPicked === null ? "border-[#d8e7e1] hover:border-[#207666]" : isAnswer ? "border-[#2f8f5b] bg-[#eef7f1]" : isPicked ? "border-[#c25b4e] bg-[#fdf0ee]" : "border-[#e2ebe7] opacity-70";
              return <button key={oi} onClick={() => pickScenario(oi)} className={`flex items-start gap-2 rounded-xl border p-4 text-left text-sm leading-6 text-[#264b4c] transition ${cls}`}>
                {scenarioPicked !== null && (isAnswer ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f8f5b]" /> : isPicked ? <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#c25b4e]" /> : null)}
                <span>{opt}</span>
              </button>;
            })}
          </div>
          {scenarioPicked !== null && (
            <div className="mt-4 rounded-xl bg-[#edf5f1] p-4 text-sm leading-6 text-[#264b4c]">
              <p><strong>{scenarioOk ? "Bonne analyse. " : "À revoir. "}</strong>{scenario.explain}</p>
              <p className="mt-1 text-xs text-[#536d67]">Source : {scenario.source}</p>
              <Button className="mt-3 bg-[#0d2b36]" onClick={afterScenario}>{hasSecond ? "Passer au second quiz" : "Voir le bilan"}</Button>
            </div>
          )}
        </div>
      )}

      {phase === "quiz2" && topic && quizBlock("Étape 3 · second quiz, questions différentes", topic.questionsB)}

      {phase === "done" && topic && (
        <div className="rounded-2xl border border-[#d8e7e1] bg-white p-6 shadow-sm">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#365f56]"><GraduationCap className="h-4 w-4" />Bilan de la session</p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[#11373d]">
            Quiz de départ : {score1} / {topic.questions.length}
            {hasSecond ? ` · second quiz : ${score2} / ${topic.questionsB.length}` : ""}
            {scenarioOk === true ? " · mise en situation réussie" : scenarioOk === false ? " · mise en situation à revoir" : ""}
          </h2>
          {hasSecond && missed1.length > 0 && missed2.length === 0 && (
            <p className="mt-3 rounded-xl bg-[#eef7f1] p-4 text-sm leading-6 text-[#1e5c3a]">Les points manqués au quiz de départ sont réussis au second quiz : les explications ont porté. La compréhension réelle se confirme toujours dans l'échange, pas par un score.</p>
          )}
          {hasSecond && missed2.length > 0 && (
            <p className="mt-3 rounded-xl bg-[#fdf6e9] p-4 text-sm leading-6 text-[#6b4a1b]">Des difficultés restent au second quiz : reprenez les explications ci-dessous, puis refaites la session.</p>
          )}
          {(missed1.length > 0 || missed2.length > 0) ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#264b4c]">Points à retravailler :</p>
              <ul className="mt-2 grid gap-3">
                {missedList(missed1, topic.questions)}
                {missedList(missed2, topic.questionsB)}
              </ul>
            </div>
          ) : <p className="mt-3 text-sm leading-6 text-[#536d67]">Aucune erreur. La compréhension réelle se confirme dans l'échange, pas par un score.</p>}
          <p className="mt-4 text-xs leading-5 text-[#718682]">Votre bilan n'est pas enregistré et disparaît en quittant la page. Il ne vaut ni certification, ni qualification, ni consentement.</p>
          {(() => {
            const known = new Map<string, string>([...topic.questions, ...topic.questionsB].map(q => [qid(q.q), q.q]));
            const rows = (stats?.top ?? []).filter(r => known.has(r.q)).slice(0, 3);
            return stats && stats.attempts >= 5 && rows.length > 0 ? <div className="mt-4 rounded-xl bg-[#f3f7f5] p-4 text-sm leading-6 text-[#264b4c]">
              <p className="font-semibold">Questions les plus ratées par les autres participants ({stats.attempts} sessions anonymes)</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">{rows.map(r => <li key={r.q}>{known.get(r.q)} <span className="text-xs text-[#536d67]">({r.n} erreurs)</span></li>)}</ol>
            </div> : null;
          })()}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="bg-[#0d2b36]" onClick={() => startQuiz(ai, ti)}><RotateCcw className="mr-2 h-4 w-4" />Refaire la session</Button>
            <Button variant="outline" onClick={() => setPhase("topics")}>Autre sujet</Button>
          </div>
        </div>
      )}

      <p className="mt-8 text-xs [overflow-wrap:anywhere] leading-5 text-[#718682]">Pistes d'évolution, non intégrées : banques de questions par sujet, nouvelles mises en situation à chaque session, suivi de progression (demanderait comptes ou stockage, avec son propre encadrement). Voir aussi : <Link className="underline" href="/fr/consentement-cas">chaque cas de figure du consentement</Link>.</p>
    </section>
  </ClinicalShell>;
}
