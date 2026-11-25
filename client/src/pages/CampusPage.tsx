import { ClinicalShell } from "@/components/ClinicalShell";
import { ArrowRight, BookOpenCheck, CheckCircle2, Circle, Compass, FlaskConical, GraduationCap, Hammer, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

// Campus : assemblage guidé de pages existantes. La progression reste sur l'appareil (aucun compte),
// les exercices sont fictifs et le parcours ne délivre aucune certification.

const PROGRESS_KEY = "cn_campus_progress_v1";

const wings = [
  {
    icon: GraduationCap,
    title: "Apprendre",
    text: "Comprendre les notions par niveau, du débutant à l'expert, avec le guide embarqué bilingue.",
    href: "/fr/formation",
    action: "Suivre la formation",
  },
  {
    icon: FlaskConical,
    title: "S'exercer",
    text: "S'entraîner sur des cas fictifs : quiz, mises en situation et scénarios versionnés, sans aucune donnée réelle.",
    href: "/fr/campus/ateliers",
    action: "Ouvrir les ateliers pratiques",
  },
  {
    icon: Hammer,
    title: "Construire",
    text: "Monter un projet pas à pas : question, design, documents et vérifications, dans l'atelier guidé.",
    href: "/fr/concevoir-un-essai",
    action: "Entrer dans l'atelier",
  },
];

// Cas guidé fictif : montre l'enchaînement concret des outils, sans données réelles.
const guidedCase = [
  {
    title: "Clarifier la question",
    does: "L'atelier aide à passer de « les patientes ne reviennent pas » à une question structurée : population, intervention, comparaison, critère de jugement.",
    doesNot: "Il ne juge ni la pertinence scientifique ni la faisabilité réelle du terrain.",
    href: "/fr/concevoir-un-essai",
    action: "Ouvrir l'atelier",
  },
  {
    title: "Choisir un design adapté",
    does: "Les contenus de formation expliquent les compromis entre essai randomisé, randomisation par grappes et étude avant/après, avec leurs limites.",
    doesNot: "Le choix final relève d'un statisticien et d'un méthodologiste, pas du site.",
    href: "/fr/essais-complexes",
    action: "Comparer les designs",
  },
  {
    title: "Vérifier le cadre applicable",
    does: "La page Bénin & Afrique de l'Ouest repère les structures à connaître et ce qui doit être confirmé dans les textes en vigueur.",
    doesNot: "Elle ne remplace ni l'avis du comité d'éthique ni la procédure officielle à jour.",
    href: "/fr/afrique-ouest",
    action: "Voir les repères régionaux",
  },
  {
    title: "Préparer les documents",
    does: "Les modèles fournissent des trames à adapter : note d'information, consentement, grilles de suivi.",
    doesNot: "Chaque document doit être relu et adapté au protocole réel ; un modèle n'est jamais validé tel quel.",
    href: "/fr/modeles",
    action: "Adapter un modèle",
  },
  {
    title: "Faire relire avant tout dépôt",
    does: "Le dossier assemblé dans l'atelier donne à un relecteur compétent une base claire : question, design, documents, sources.",
    doesNot: "Aucune relecture en ligne ne vaut validation par un comité ou une autorité habilitée.",
    href: "/fr/concevoir-un-essai",
    action: "Assembler mon dossier",
  },
];

const pathSteps = [
  { id: "bases", title: "Poser les bases", text: "Notions fondamentales : phases, rôles, sécurité des participants.", href: "/fr/formation", action: "Formation · niveau Débutant" },
  { id: "reflexes", title: "Vérifier ses réflexes", text: "Quiz de départ, mise en situation, second quiz différent, bilan expliqué.", href: "/fr/entrainement", action: "Se tester" },
  { id: "question", title: "Définir sa question", text: "Transformer une idée en question structurée, avec objectifs et critères de jugement.", href: "/fr/concevoir-un-essai", action: "Atelier de conception" },
  { id: "cas", title: "Explorer les cas de figure", text: "Voir comment les situations concrètes se traitent : visites, consentement, déviations, sécurité.", href: "/fr/explorer", action: "Explorer les scénarios" },
  { id: "cadre", title: "Situer le cadre Bénin & région", text: "Autorités, éthique, consentement : repérer les structures et ce qui reste à confirmer dans les textes.", href: "/fr/afrique-ouest", action: "Bénin & Afrique de l'Ouest" },
  { id: "documents", title: "Préparer les documents", text: "Modèles prêts à adapter : lettres, grilles et trames, avec un exemple rempli.", href: "/fr/modeles", action: "Modèles de documents" },
  { id: "revue", title: "Faire vérifier par des personnes compétentes", text: "Assembler ce qu'un relecteur attend : projet structuré dans l'atelier, documents préparés, sources citées et questions précises. L'audit en ligne prépare cette revue sans la remplacer ; il est inactif sur cette instance.", href: "/fr/concevoir-un-essai", action: "Relire mon projet dans l'atelier" },
];

function loadProgress(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(id => pathSteps.some(step => step.id === id)) : [];
  } catch {
    return [];
  }
}

export default function CampusPage() {
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDone(loadProgress());
    setReady(true);
  }, []);

  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter(item => item !== id) : [...done, id];
    setDone(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      } catch {
        // Stockage indisponible : la progression reste valable pour la session affichée.
      }
    }
  };

  const percent = Math.round((done.length / pathSteps.length) * 100);

  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
      <div className="container py-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Campus · apprendre, s'exercer, construire</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Le campus de recherche clinique</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Un seul endroit pour progresser : comprendre par niveau, s'entraîner sur des cas fictifs, puis construire un projet étape par étape. Gratuit, sans compte, et pensé pour le Bénin et l'Afrique de l'Ouest.</p>
      </div>
    </section>

    <section className="container py-10" aria-labelledby="campus-wings-title">
      <h2 id="campus-wings-title" className="sr-only">Les trois ailes du campus</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {wings.map(wing => (
          <article key={wing.title} className="flex flex-col rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#2c8271]"><wing.icon className="h-5 w-5" aria-hidden="true" /></span>
            <h3 className="mt-4 font-serif text-2xl font-bold text-[#143c41]">{wing.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#4d6661]">{wing.text}</p>
            <Link href={wing.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1c7566] hover:text-[#0d2b36]">{wing.action} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </article>
        ))}
      </div>
    </section>

    <section className="container pb-10" aria-labelledby="campus-path-title">
      <div className="rounded-3xl border border-[#d8e7e1] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Parcours guidé</p>
            <h2 id="campus-path-title" className="mt-2 font-serif text-3xl font-bold text-[#143c41]">Construire un projet, de A à Z</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4d6661]">Sept étapes qui enchaînent les outils du site dans le bon ordre. Cochez ce qui est fait : la progression reste sur votre appareil, sans compte ni envoi de données.</p>
          </div>
          <span className="rounded-full bg-[#e5f3ec] px-3 py-1.5 text-xs font-bold text-[#207666]">{done.length} / {pathSteps.length} étapes · {percent}%</span>
        </div>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#e4eeea]" role="progressbar" aria-label="Progression du parcours campus" aria-valuenow={ready ? percent : 0} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-[#2c8777] transition-all" style={{ width: `${ready ? percent : 0}%` }} />
        </div>
        <ol className="mt-7 grid gap-3">
          {pathSteps.map((step, index) => {
            const checked = done.includes(step.id);
            return (
              <li key={step.id} className={`flex flex-wrap items-start gap-4 rounded-2xl border p-4 sm:p-5 ${checked ? "border-[#9dcabb] bg-[#f0f8f3]" : "border-[#e2ece7] bg-[#fbfcfc]"}`}>
                <button type="button" onClick={() => toggle(step.id)} aria-pressed={checked} aria-label={`${checked ? "Décocher" : "Cocher"} l'étape ${index + 1} : ${step.title}`} className="mt-0.5 text-[#2c8777]">
                  {checked ? <CheckCircle2 className="h-6 w-6" aria-hidden="true" /> : <Circle className="h-6 w-6 text-[#9db8b0]" aria-hidden="true" />}
                </button>
                <div className="min-w-0 flex-1 basis-60">
                  <p className="flex flex-wrap items-center gap-2 font-bold text-[#173f43]">
                    <span className="text-xs font-black uppercase tracking-wider text-[#6a8580]">Étape {index + 1}</span>
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#4d6661]">{step.text}</p>
                </div>
                <Link href={step.href} className="inline-flex items-center gap-2 self-center text-sm font-bold text-[#1c7566] hover:text-[#0d2b36]">{step.action} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>

    <section className="container pb-10" aria-labelledby="campus-case-title">
      <div className="rounded-3xl border border-[#d8e7e1] bg-[#f7faf8] p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Cas guidé · entièrement fictif</p>
        <h2 id="campus-case-title" className="mt-2 font-serif text-3xl font-bold text-[#143c41]">Le cas Awa : de l'idée au dossier à faire relire</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4d6661]">Awa, sage-femme (personnage fictif, situation imaginaire), se demande si un rappel téléphonique améliore la venue des patientes aux consultations postnatales. Ce cas montre l'ordre des étapes et le rôle exact de chaque outil du site — sans aucune donnée réelle et sans prétendre aboutir à un protocole.</p>
        <ol className="mt-6 grid gap-3">
          {guidedCase.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-[#e2ece7] bg-white p-4 sm:p-5">
              <p className="flex flex-wrap items-center gap-2 font-bold text-[#173f43]">
                <span className="text-xs font-black uppercase tracking-wider text-[#6a8580]">Moment {index + 1}</span>
                {item.title}
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <p className="rounded-lg bg-[#f0f8f3] p-3 text-sm leading-6 text-[#33524c]"><span className="font-bold text-[#207666]">Ce que le site fait : </span>{item.does}</p>
                <p className="rounded-lg bg-[#fdf7ea] p-3 text-sm leading-6 text-[#6b4f1d]"><span className="font-bold">Ce qu'il ne fait pas : </span>{item.doesNot}</p>
              </div>
              <Link href={item.href} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#1c7566] hover:text-[#0d2b36]">{item.action} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-xs leading-5 text-[#5e7671]">La décision de lancer, modifier ou abandonner un projet appartient aux personnes compétentes, aux comités d'éthique et aux autorités habilitées — jamais à un outil en ligne.</p>
      </div>
    </section>

    <section className="container pb-12" aria-labelledby="campus-rules-title">
      <div className="grid gap-5 lg:grid-cols-2">
        <aside className="rounded-2xl bg-[#0d2b36] p-7 text-white">
          <div className="flex items-center gap-3"><ShieldAlert className="h-5 w-5 text-[#a9dac6]" aria-hidden="true" /><h2 id="campus-rules-title" className="font-serif text-2xl font-bold">Les règles du campus</h2></div>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#c9ded7]">
            <li>· Tous les exercices utilisent des cas fictifs ; aucune donnée patient ne doit être saisie.</li>
            <li>· Le campus ne délivre ni diplôme ni certification : il prépare aux vraies formations et aux vraies revues.</li>
            <li>· Les décisions réelles demandent des personnes compétentes, le protocole, les SOP et les autorités de la juridiction.</li>
            <li>· La progression cochée reste dans le navigateur de l'appareil ; elle peut être effacée à tout moment depuis la page Mes données.</li>
          </ul>
        </aside>
        <aside className="flex flex-col rounded-2xl border border-[#dbe8e3] bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3"><Compass className="h-5 w-5 text-[#2c8271]" aria-hidden="true" /><h2 className="font-serif text-2xl font-bold text-[#143c41]">Perdu en chemin ?</h2></div>
          <p className="mt-3 flex-1 text-sm leading-6 text-[#4d6661]">Si une étape soulève une question concrète, décrivez la situation dans le parcours guidé : il oriente vers les vérifications à préparer, en langage simple.</p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link href="/fr/probleme" className="inline-flex items-center gap-2 text-sm font-bold text-[#1c7566] hover:text-[#0d2b36]"><BookOpenCheck className="h-4 w-4" aria-hidden="true" />Décrire ma situation</Link>
            <Link href="/fr/plan-du-site" className="inline-flex items-center gap-2 text-sm font-bold text-[#1c7566] hover:text-[#0d2b36]">Voir le plan du site<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </aside>
      </div>
    </section>
  </ClinicalShell>;
}
