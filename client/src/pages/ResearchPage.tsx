import { ClinicalShell } from "@/components/ClinicalShell";
import { ContentStatusBadge } from "@/components/StatusBadge";
import { sources } from "@shared/clinicalContent";
import { AlertTriangle, ArrowRight, BookOpenCheck, CalendarClock, ExternalLink, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";

const currentDate = "15 août 2026";

const lanes = [
  {
    title: "Actuellement applicable",
    tone: "border-[#b9ddce] bg-[#f0faf5]",
    icon: ShieldCheck,
    description: "Références que le produit peut présenter comme socle actuel, sous réserve du périmètre et de la juridiction.",
    items: sources.filter(s => ["ich-e6r3-principles", "ich-e9-r1", "who-best-practices", "eu-ctr-536-2014", "ema-ctis", "ema-ctis-handbook", "cnil-mr001-2026", "cnil-mr003-2026"].includes(s.id)),
  },
  {
    title: "À anticiper / date d’effet à surveiller",
    tone: "border-[#ead8ad] bg-[#fffaf0]",
    icon: CalendarClock,
    description: "Documents déjà publiés mais dont l’entrée en vigueur annoncée intervient ultérieurement.",
    items: sources.filter(s => ["ich-e6r3-consolidated", "ich-e6r3-annex2"].includes(s.id)),
  },
];

export default function ResearchPage() {
  return (
    <ClinicalShell>
      <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
        <div className="container py-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c9e0d6] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#237162]">
              <Sparkles className="h-3.5 w-3.5" /> Recherche approfondie
            </span>
            <span className="text-xs font-semibold text-[#68817b]">Veille arrêtée au {currentDate}</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#0d2b36]">
            Veille scientifique, statistique et réglementaire
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#526b67]">
            Une couche de référence qui distingue les textes actuellement applicables, les documents à venir et les ressources nécessitant une revue de juridiction. Clinical Navigator ne transforme pas une source en décision automatique.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/fr/concevoir-un-essai" className="inline-flex items-center gap-2 rounded-xl bg-[#0d2b36] px-5 py-3 text-sm font-bold text-white hover:bg-[#164451]">
              Concevoir un essai <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/fr/ressources" className="inline-flex items-center gap-2 rounded-xl border border-[#b9d7cd] bg-white px-5 py-3 text-sm font-bold text-[#1e4c4e] hover:bg-[#eff8f4]">
              Voir toutes les ressources
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {lanes.map(({ title, tone, icon: Icon, description, items }) => (
            <article key={title} className={`rounded-2xl border p-6 ${tone}`}>
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#287c71]" />
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#173e43]">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#607771]">{description}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {items.map(source => (
                  <SourceCard key={source.id} source={source} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-[#287c71]" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#143c41]">Lecture par juridiction</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#607771]">
                Le socle international peut aider à structurer une conception, mais les obligations locales restent déterminantes. Pour la France, le site distingue notamment le CTR/CTIS et les référentiels CNIL 2026. Pour le Bénin et les autres pays, aucune règle locale n’est inventée : le parcours doit renvoyer vers les autorités et textes applicables avant toute conclusion.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-[#f2f8f5] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#4d716a]">International</p><p className="mt-1 font-bold text-[#173e43]">ICH + OMS</p><p className="mt-1 text-sm text-[#607771]">Socle méthodologique et qualité.</p></div>
            <div className="rounded-xl bg-[#f2f8f5] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#4d716a]">Union européenne</p><p className="mt-1 font-bold text-[#173e43]">CTR + CTIS</p><p className="mt-1 text-sm text-[#607771]">Cadre des essais de médicaments.</p></div>
            <div className="rounded-xl bg-[#f2f8f5] p-4"><p className="text-xs font-bold uppercase tracking-wide text-[#4d716a]">France</p><p className="mt-1 font-bold text-[#173e43]">ANSM + CNIL</p><p className="mt-1 text-sm text-[#607771]">Réglementation et données de recherche.</p></div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#ead8ad] bg-[#fffaf0] p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#a96b16]" />
            <div>
              <h2 className="font-bold text-[#6f4b1b]">Règle de prudence</h2>
              <p className="mt-2 text-sm leading-6 text-[#765d34]">
                Une source peut être officielle sans être applicable à votre étude. Vérifiez toujours le produit de santé, le type d’étude, le pays, la date d’effet, la version du protocole et les procédures du promoteur. Les calculs de puissance et les contrôles de cohérence restent des aides préparatoires et doivent être revus par les compétences appropriées.
              </p>
            </div>
          </div>
        </section>
      </section>
    </ClinicalShell>
  );
}

function SourceCard({ source }: { source: (typeof sources)[number] }) {
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="block rounded-xl border border-[#d8e7e1] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#9ecdbd] hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <BookOpenCheck className="h-4 w-4 shrink-0 text-[#287c71]" />
        <ContentStatusBadge status={source.status} />
      </div>
      <h3 className="mt-3 font-bold leading-6 text-[#1a4245]">{source.title}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#5e7d76]">{source.publisher} · {source.jurisdiction}</p>
      <p className="mt-2 text-sm leading-6 text-[#617771]">{source.scope}</p>
      <p className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#1d7566]">Ouvrir la référence <ExternalLink className="h-3.5 w-3.5" /></p>
    </a>
  );
}
