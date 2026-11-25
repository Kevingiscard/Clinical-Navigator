import { ClinicalShell } from "@/components/ClinicalShell";
import { ArrowRight, CheckCircle2, ShieldAlert, XCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

// Ateliers pratiques : cas entièrement fictifs. Les réponses reposent sur les principes généraux de bonnes pratiques
// cliniques (ICH E6) et d'éthique ; aucune procédure nationale n'est affirmée ici. Le protocole, les SOP et les textes
// locaux en vigueur priment toujours.

type Choice = { label: string; ok: boolean; why: string };
type Workshop = { id: string; role: string; title: string; story: string; question: string; choices: Choice[]; retain: string };

const workshops: Workshop[] = [
  {
    id: "eig",
    role: "Investigateur · infirmier de recherche",
    title: "Un événement grave découvert avec retard",
    story: "Dans une étude fictive au centre de Parakou, une participante a été hospitalisée samedi. L'infirmière de l'étude l'apprend le mardi en lisant le dossier. Le protocole prévoit que tout événement indésirable grave soit signalé au promoteur dans un délai court.",
    question: "Que faites-vous en premier ?",
    choices: [
      { label: "Attendre la prochaine visite de suivi pour tout rapporter d'un coup", ok: false, why: "Le délai court à partir du moment où l'équipe a connaissance de l'événement. Attendre augmente le retard et expose la participante et l'étude." },
      { label: "Informer l'investigateur tout de suite, puis déclarer l'événement au promoteur dans le délai du protocole, en notant la date de connaissance réelle", ok: true, why: "Le retard déjà acquis ne s'efface pas, mais il se documente honnêtement. L'investigateur évalue la gravité et le lien possible avec l'intervention, et la déclaration part sans attendre." },
      { label: "Écrire que l'équipe l'a su samedi pour rester dans le délai", ok: false, why: "Modifier une date pour paraître conforme est une falsification. Une déviation se déclare et s'explique, elle ne se cache pas." },
      { label: "Ne rien déclarer parce que l'hospitalisation a probablement une autre cause", ok: false, why: "Le lien avec l'étude n'est pas jugé par l'infirmière seule. Tout événement grave se déclare, puis l'investigateur l'évalue." },
    ],
    retain: "Déclarer vite, dater honnêtement, laisser l'investigateur évaluer le lien.",
  },
  {
    id: "consentement",
    role: "Investigateur · coordinateur",
    title: "Une participante qui ne sait pas lire",
    story: "Une femme de 52 ans accepte de participer à une étude fictive sur l'hypertension. Elle parle fon et ne lit pas le français. Son fils propose de lire la note d'information et de signer à sa place.",
    question: "Quelle conduite respecte le consentement ?",
    choices: [
      { label: "Laisser le fils signer, il connaît bien sa mère", ok: false, why: "Un proche n'a pas le droit de consentir à la place d'une adulte capable. Le consentement est personnel." },
      { label: "Expliquer oralement dans sa langue, avec un témoin impartial présent tout au long, puis recueillir son accord selon le processus approuvé par le comité d'éthique", ok: true, why: "Le principe général est qu'un témoin indépendant de l'équipe assiste à toute la discussion, et atteste que l'information a été comprise et donnée librement. La forme exacte (empreinte, signature du témoin) suit ce que le comité a approuvé." },
      { label: "Faire signer maintenant, expliquer plus tard", ok: false, why: "L'information vient avant l'accord, jamais après." },
      { label: "L'exclure parce qu'elle ne lit pas", ok: false, why: "L'analphabétisme n'est pas un critère d'exclusion en soi. Il demande une procédure adaptée pour ne pas écarter injustement des personnes." },
    ],
    retain: "Information orale adaptée, témoin impartial, accord personnel, procédure approuvée.",
  },
  {
    id: "deviation",
    role: "Coordinateur · assistant de recherche clinique",
    title: "Un participant inclus alors qu'il ne remplit pas un critère",
    story: "Lors d'une relecture de dossiers fictifs, on découvre qu'un participant inclus la semaine dernière avait une valeur biologique hors des limites du protocole. Le résultat était dans son dossier, mais n'avait pas été lu avant l'inclusion.",
    question: "Quelle réponse est la bonne ?",
    choices: [
      { label: "Corriger le dossier pour que la valeur paraisse dans les limites", ok: false, why: "Altérer une donnée source est grave. Les données doivent rester fidèles à ce qui s'est passé." },
      { label: "Signaler la déviation à l'investigateur et au promoteur, la documenter, assurer la sécurité du participant, puis chercher la cause pour éviter que cela recommence", ok: true, why: "On protège d'abord le participant, on déclare, on décide avec le promoteur de la suite, et on corrige le processus, par exemple une liste de contrôle avant inclusion." },
      { label: "Ne rien dire, le participant va bien", ok: false, why: "Que le participant aille bien ne règle pas le problème de conformité au protocole ni le risque pour les suivants." },
      { label: "Retirer le participant en silence et supprimer son dossier", ok: false, why: "Supprimer des documents est interdit. Le participant garde ses droits et ses données restent traçables." },
    ],
    retain: "Sécurité d'abord, déclaration, documentation, correction du processus.",
  },
  {
    id: "source",
    role: "Tout membre de l'équipe",
    title: "Une erreur dans le cahier papier",
    story: "Une infirmière note une tension de 148/90 au lieu de 138/90 dans le dossier papier d'un participant fictif. Elle s'en rend compte le lendemain.",
    question: "Comment corriger ?",
    choices: [
      { label: "Effacer avec du correcteur blanc et réécrire", ok: false, why: "La valeur d'origine doit rester lisible. Le correcteur la cache, ce qui rend la correction suspecte." },
      { label: "Barrer d'un seul trait en gardant la valeur lisible, écrire la bonne valeur, dater, parapher et indiquer brièvement la raison", ok: true, why: "C'est le principe de traçabilité des données sources : qui a corrigé, quand, pourquoi, sans effacer l'ancienne valeur." },
      { label: "Arracher la page et la refaire", ok: false, why: "On ne détruit pas une page de dossier source." },
      { label: "Laisser l'erreur, personne ne verra", ok: false, why: "Une donnée erronée connue doit être corrigée de façon traçable, car elle peut fausser l'analyse." },
    ],
    retain: "Un trait, la bonne valeur, la date, le paraphe, la raison.",
  },
  {
    id: "pression",
    role: "Investigateur · chef de projet",
    title: "Recruter des étudiants de son propre service",
    story: "Un chef de service fictif veut inclure rapidement des participants. Il propose de recruter les étudiants et le personnel de son service, pour lesquels il est responsable de la notation et de l'évaluation.",
    question: "Quel est le principal risque éthique ?",
    choices: [
      { label: "Aucun, ce sont des adultes", ok: false, why: "Être adulte ne suffit pas : un lien de subordination peut empêcher de refuser librement." },
      { label: "Une pression implicite : refuser pourrait sembler risqué pour leur évaluation ou leur carrière, donc le consentement peut ne pas être libre", ok: true, why: "On parle de dépendance hiérarchique. Le comité d'éthique doit examiner la situation, et l'information doit être donnée par quelqu'un qui n'a pas de pouvoir sur la personne." },
      { label: "Le seul risque est d'aller trop lentement", ok: false, why: "La vitesse ne justifie jamais de contourner la liberté de consentir." },
      { label: "Le risque est uniquement administratif", ok: false, why: "C'est d'abord un risque pour la liberté et les droits des personnes." },
    ],
    retain: "Un consentement n'est valable que s'il peut être refusé sans conséquence.",
  },
  {
    id: "audit-trail",
    role: "Data manager · ARC",
    title: "Une valeur corrigée sans laisser de trace",
    story: "Dans une étude fictive, un data manager voit qu'une pression artérielle a été saisie 1800 au lieu de 180. Un collègue propose d'écraser la valeur directement dans la base pour gagner du temps, sans rien noter.",
    question: "Que faites-vous ?",
    choices: [
      { label: "Écraser la valeur : l'erreur est évidente", ok: false, why: "Même évidente, une correction doit pouvoir être retracée : qui a changé quoi, quand et pourquoi." },
      { label: "Émettre une demande de clarification au centre, faire corriger par la personne autorisée, avec la trace de la modification et sa justification", ok: true, why: "La modification d'une donnée suit la procédure de l'étude et reste traçable (piste d'audit). La donnée d'origine reste consultable." },
      { label: "Supprimer la ligne pour éviter la confusion", ok: false, why: "Supprimer fait disparaître l'historique. Une donnée ne s'efface pas pour éviter une question." },
      { label: "Laisser la valeur telle quelle et ne rien dire", ok: false, why: "Une anomalie connue et non traitée peut fausser les analyses. Elle doit être signalée." },
    ],
    retain: "On ne corrige pas en silence : demande, correction autorisée, trace et justification.",
  },
  {
    id: "amendement",
    role: "Chef de projet · investigateur",
    title: "Appliquer un changement avant qu'il soit approuvé",
    story: "Dans une étude fictive, l'équipe veut ajouter un examen sanguin supplémentaire à la visite 2. Le promoteur dit que le texte modifié est en cours de rédaction, et qu'on peut déjà commencer pour ne pas perdre de temps.",
    question: "Quelle est la bonne conduite ?",
    choices: [
      { label: "Commencer tout de suite : c'est un petit examen", ok: false, why: "Une modification du protocole suit la procédure d'amendement et les approbations requises avant d'être appliquée, sauf cas particulier prévu pour la sécurité immédiate des participants." },
      { label: "Attendre l'amendement approuvé par les instances concernées et la version à jour du protocole, puis informer et former l'équipe avant de l'appliquer", ok: true, why: "Les participants et l'équipe travaillent sur la version approuvée. Selon le cas, un nouveau consentement peut être nécessaire : à vérifier avec le comité d'éthique et le promoteur." },
      { label: "Appliquer sans le dire dans le dossier de l'étude", ok: false, why: "Un écart non documenté est une déviation et empêche de justifier ce qui a été fait." },
      { label: "Laisser chaque centre décider seul", ok: false, why: "Un protocole commun doit être appliqué de la même façon dans tous les centres." },
    ],
    retain: "Pas d'application avant approbation : version à jour, équipe informée, dossier tenu.",
  },
];

function WorkshopCard({ item, index }: { item: Workshop; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  return (
    <article className="rounded-3xl border border-[#d8e7e1] bg-white p-6 shadow-sm sm:p-8" aria-labelledby={`ws-${item.id}`}>
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Atelier {index + 1} · {item.role}</p>
      <h2 id={`ws-${item.id}`} className="mt-2 font-serif text-2xl font-bold text-[#143c41]">{item.title}</h2>
      <p className="mt-3 text-sm leading-6 text-[#4d6661]">{item.story}</p>
      <p className="mt-4 font-bold text-[#173f43]">{item.question}</p>
      <ul className="mt-3 grid gap-2">
        {item.choices.map((choice, i) => {
          const isPicked = picked === i;
          const show = answered && (isPicked || choice.ok);
          return (
            <li key={choice.label}>
              <button
                type="button"
                disabled={answered}
                onClick={() => setPicked(i)}
                className={`w-full rounded-xl border p-3 text-left text-sm leading-6 transition ${show ? (choice.ok ? "border-[#9dcabb] bg-[#f0f8f3] text-[#1d4d44]" : "border-[#e8c9c0] bg-[#fdf3f0] text-[#6b3a2d]") : "border-[#e2ece7] bg-[#fbfcfc] text-[#33524c] hover:border-[#9dcabb]"}`}
              >
                <span className="flex items-start gap-2">
                  {show ? (choice.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />) : <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[#9db8b0]" aria-hidden="true" />}
                  <span>{choice.label}</span>
                </span>
                {show ? <span className="mt-2 block pl-6 text-xs leading-5">{choice.why}</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
      {answered ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="rounded-lg bg-[#edf5f1] px-3 py-2 text-sm font-bold text-[#207666]">À retenir : {item.retain}</p>
          <button type="button" onClick={() => setPicked(null)} className="text-sm font-bold text-[#1c7566] hover:text-[#0d2b36]">Refaire cet atelier</button>
        </div>
      ) : null}
    </article>
  );
}

export default function CampusWorkshopsPage() {
  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
      <div className="container py-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Campus · s'exercer</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Ateliers pratiques : sept cas fictifs</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Chaque atelier met en situation un rôle de la recherche clinique : déclaration d'un événement grave, consentement, déviation, correction d'un dossier, indépendance du consentement, correction de données tracée, amendement. Choisissez une réponse, lisez pourquoi, puis refaites-la si vous voulez. Aucun compte, aucune donnée enregistrée.</p>
      </div>
    </section>
    <section className="container grid gap-6 py-10">
      {workshops.map((item, index) => <WorkshopCard key={item.id} item={item} index={index} />)}
    </section>
    <section className="container pb-12">
      <aside className="rounded-2xl bg-[#0d2b36] p-7 text-white">
        <div className="flex items-center gap-3"><ShieldAlert className="h-5 w-5 text-[#a9dac6]" aria-hidden="true" /><h2 className="font-serif text-2xl font-bold">Ce que ces ateliers ne sont pas</h2></div>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#c9ded7]">
          <li>· Tous les cas sont inventés ; ils illustrent des principes généraux de bonnes pratiques cliniques et d'éthique.</li>
          <li>· Dans une vraie étude, le protocole, les procédures du centre et les textes en vigueur dans le pays fixent les délais et les formes exactes.</li>
          <li>· Aucune certification n'est délivrée ; ne saisissez jamais de donnée de patient réel.</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/fr/campus" className="inline-flex items-center gap-2 text-[#a9dac6] hover:text-white">Retour au campus <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/fr/afrique-ouest" className="inline-flex items-center gap-2 text-[#a9dac6] hover:text-white">Repères Bénin et région <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </aside>
    </section>
  </ClinicalShell>;
}
