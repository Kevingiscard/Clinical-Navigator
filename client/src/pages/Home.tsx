import { ClinicalShell } from "@/components/ClinicalShell";
import { Button } from "@/components/ui/button";
import { modules, scenarios } from "@shared/clinicalContent";
import { ArrowRight, BookOpenCheck, CheckCircle2, ClipboardCheck, Compass, Search, ShieldCheck, Sparkles, Wrench, FlaskConical } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const featured = modules.slice(0, 6);
  return (
    <ClinicalShell>
      <section className="relative overflow-hidden border-b border-[#dce9e4] bg-[#f7fbf9]">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="container relative grid gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9e0d6] bg-[#eff9f4] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#237162]">
              <ShieldCheck className="h-3.5 w-3.5" /> Outil d’aide méthodologique et opérationnelle
            </div>
            <h1 className="font-serif text-5xl font-bold leading-[0.98] tracking-tight text-[#0d2b36] sm:text-6xl lg:text-7xl">
              Concevoir, vérifier et conduire vos essais cliniques.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#49625f]">
              Clinical Navigator relie question scientifique, design, endpoints, estimands, effectif, calendrier, qualité, références et audit de cohérence dans un même espace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/fr/concevoir-un-essai">
                <Button size="lg" className="h-12 rounded-xl bg-[#0d2b36] px-6 text-base font-bold text-white shadow-lg shadow-[#0d2b36]/15 hover:bg-[#164451]
                ">Concevoir un essai <FlaskConical className="ml-2 h-4 w-4" /></Button>
              </Link>
              <Link href="/fr/probleme">
                <Button size="lg" variant="outline" className="h-12 rounded-xl border-[#b9d7cd] bg-white px-6 text-base font-bold text-[#1e4c4e] hover:bg-[#eff8f4]">J’ai un problème</Button>
              </Link>
              <Link href="/fr/auditer-un-essai">
                <Button size="lg" variant="outline" className="h-12 rounded-xl border-[#b9d7cd] bg-white px-6 text-base font-bold text-[#1e4c4e] hover:bg-[#eff8f4]">Auditer un essai</Button>
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[#53716b]">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2e8b78]" />Références visibles</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2e8b78]" />Pas de données patient nécessaires</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2e8b78]" />Calculs explicitement hypothétiques</span>
            </div>
          </div>

          <div className="relative self-center">
            <div className="rounded-[2rem] border border-[#cbe3d9] bg-white/90 p-4 shadow-[0_30px_80px_rgba(20,57,57,0.14)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-[#0d2b36] p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#b8e2d1]">TRIAL DESIGN WORKSPACE</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2f8577]"><Compass className="h-5 w-5" /></span>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#9ccdbd]">Chaînage méthodologique</p>
                <div className="mt-4 grid gap-2">
                  {[
                    ["Question", "Objectif principal"],
                    ["Outcome", "Estimand"],
                    ["Design", "Effectif"],
                    ["Calendrier", "SAP / Protocole"],
                  ].map(([a, b]) => (
                    <div key={a} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                      <span className="text-white/65">{a}</span><span className="font-semibold text-[#d6efe5]">→ {b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                <MiniCard icon={<ClipboardCheck />} title="Audit" text="Détection des incohérences structurées." />
                <MiniCard icon={<Wrench />} title="Outils" text="Effectif, recrutement, calendrier et charge." />
                <MiniCard icon={<BookOpenCheck />} title="Références" text="Sources, versions et dates de revue." />
                <MiniCard icon={<Sparkles />} title="Veille" text="Distinction entre applicable, à venir et à vérifier." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dce9e4] bg-white">
        <div className="container py-5">
          <div className="grid gap-4 md:grid-cols-4">
            <Pillar number="01" title="Naviguer" text="Comprendre une situation et trouver les prochaines vérifications." href="/fr/probleme" />
            <Pillar number="02" title="Concevoir" text="Construire un essai depuis la question jusqu’au protocole." href="/fr/concevoir-un-essai" />
            <Pillar number="03" title="Vérifier" text="Tester la cohérence scientifique, statistique et opérationnelle." href="/fr/auditer-un-essai" />
            <Pillar number="04" title="Maintenir" text="Surveiller références, sources, liens et état technique." href="/fr/veille" />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#39806f]">Bibliothèque</p>
            <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#0d2b36]">Les briques du quotidien.</h2>
          </div>
          <Link href="/fr/modules" className="inline-flex items-center gap-2 text-sm font-bold text-[#176d60]">Voir les modules <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((module, index) => (
            <Link href={`/fr/modules/${module.id}`} key={module.id} className="group rounded-2xl border border-[#dbe8e3] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#a8d1c2] hover:shadow-md">
              <div className="flex items-start justify-between gap-3"><span className="text-sm font-bold text-[#3c8978]">{String(index + 1).padStart(2, "0")}</span><span className="rounded-full bg-[#edf5f1] px-2.5 py-1 text-xs font-bold text-[#297968]">{module.status}</span></div>
              <h3 className="mt-6 text-lg font-bold text-[#153d42] group-hover:text-[#1d7869]">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#607771]">{module.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">{module.topics.slice(0, 3).map(topic => <span key={topic} className="rounded-md bg-[#f0f6f3] px-2 py-1 text-xs font-medium text-[#53716b]">{topic}</span>)}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#dbe8e3] bg-[#eaf3ef]"><div className="container py-16"><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#39806f]">Règle de confiance</p><h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#0d2b36]">L’IA ne remplace pas les sources.</h2><p className="mt-5 text-base leading-7 text-[#536c68]">Le moteur doit préférer les règles explicites, les sources officielles et les contenus vérifiés. Lorsque les informations manquent ou sont contradictoires, Clinical Navigator doit le dire.</p><Link href="/fr/sources" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176d60]">Consulter les sources <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-3 sm:grid-cols-2"><Trust title="Aucune donnée patient" text="Les scénarios et projets de conception restent abstraits et non identifiants." /><Trust title="Traçabilité" text="Les décisions, calculs et sources peuvent être versionnés." /><Trust title="Juridiction" text="Les exigences ne sont pas mélangées automatiquement entre pays." /><Trust title="Vérification humaine" text="Les décisions critiques restent soumises aux compétences appropriées." /></div></div></div></section>

      <section className="container py-16"><div className="rounded-[2rem] bg-[#0d2b36] px-6 py-12 text-center text-white sm:px-12"><Search className="mx-auto h-7 w-7 text-[#9ed9c3]" /><h2 className="mt-4 font-serif text-4xl font-bold">Commencer par une vraie question.</h2><p className="mx-auto mt-3 max-w-2xl text-[#c2d9d2]">Le workspace vous guide étape par étape et expose ce qui reste à vérifier avant toute utilisation scientifique, opérationnelle ou réglementaire.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/fr/concevoir-un-essai"><Button size="lg" className="rounded-xl bg-[#b8dfce] px-6 font-bold text-[#0d2b36] hover:bg-white">Concevoir un essai <ArrowRight className="ml-2 h-4 w-4" /></Button></Link><Link href="/fr/ressources"><Button size="lg" variant="outline" className="rounded-xl border-white/25 bg-white/5 px-6 font-bold text-white hover:bg-white/10">Explorer les ressources</Button></Link></div></div></section>
    </ClinicalShell>
  );
}
function MiniCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="flex items-start gap-3 rounded-xl border border-[#d8e7e1] bg-[#fbfdfc] p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f3ec] text-[#277e6e]">{icon}</span><div><p className="text-sm font-bold text-[#173e43]">{title}</p><p className="mt-1 text-xs leading-5 text-[#607771]">{text}</p></div></div>; }
function Pillar({ number, title, text, href }: { number: string; title: string; text: string; href: string }) { return <Link href={href} className="rounded-2xl border border-[#dbe8e3] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#b8d7cd]"><span className="text-xs font-bold tracking-[0.15em] text-[#39806f]">{number}</span><h2 className="mt-3 font-bold text-[#173e43]">{title}</h2><p className="mt-1 text-sm leading-6 text-[#607771]">{text}</p></Link>; }
function Trust({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-[#d7e7df] bg-white p-5"><h3 className="font-bold text-[#173e43]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#607771]">{text}</p></div>; }
