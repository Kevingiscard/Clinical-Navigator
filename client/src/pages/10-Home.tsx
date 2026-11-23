import { ClinicalShell } from "@/components/ClinicalShell";
import { IllustratedPrimer, TrialIllustration } from "@/components/IllustratedPrimer";
import { modules } from "@shared/clinicalModules";
import { scenarios } from "@shared/clinicalContent";
import { navGroups } from "@/lib/navigation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ArrowRight, BookOpenCheck, CheckCircle2, ClipboardCheck, Compass, GraduationCap, Search, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "wouter";
import "@/styles/editorial.css";

const paths = [
  { n:"01", title:"J'ai une question de terrain", text:"Décrire une situation et repérer les vérifications à préparer.", action:"Trouver mes repères", href:"/fr/probleme", icon:Compass },
  { n:"02", title:"Je prépare un essai", text:"Relier question scientifique, design, critères de jugement et hypothèses.", action:"Ouvrir l'atelier", href:"/fr/concevoir-un-essai", icon:Wrench },
  { n:"03", title:"Je vérifie un projet", text:"Explorer sa cohérence scientifique, statistique et opérationnelle.", action:"Préparer une revue", href:"/fr/auditer-un-essai", icon:ClipboardCheck },
  { n:"04", title:"Je veux apprendre", text:"Comprendre les termes, consulter les sources et travailler par niveau.", action:"Explorer la formation", href:"/fr/formation", icon:BookOpenCheck },
];
const orientations = [
  { id:"decouvrir", icon:GraduationCap, title:"Je découvre la recherche clinique", text:"Comprendre les notions, avancer par niveau, me tester.", primary:{ href:"/fr/campus", label:"Entrer au campus" }, links:[{ href:"/fr/formation", label:"Formation par niveau" },{ href:"/fr/entrainement", label:"Quiz et mises en situation" }] },
  { id:"situation", icon:Compass, title:"J'ai une situation concrète", text:"Être orienté pas à pas, en langage simple, sans données patient.", primary:{ href:"/fr/probleme", label:"Décrire ma situation" }, links:[{ href:"/fr/explorer", label:"Explorer les scénarios" },{ href:"/fr/consentement-cas", label:"Consentement, cas par cas" }] },
  { id:"projet", icon:Wrench, title:"Je prépare ou vérifie un essai", text:"Atelier guidé, outils de planification, revue de cohérence.", primary:{ href:"/fr/concevoir-un-essai", label:"Ouvrir l'atelier" }, links:[{ href:"/fr/concevoir-un-essai/outils", label:"Outils avancés" },{ href:"/fr/auditer-un-essai", label:"Auditer un essai" }] },
  { id:"reference", icon:BookOpenCheck, title:"Je cherche un document ou une référence", text:"Ressources gratuites, modèles, sources et structures de la région.", primary:{ href:"/fr/ressources", label:"Explorer les ressources" }, links:[{ href:"/fr/modeles", label:"Modèles de documents" },{ href:"/fr/afrique-ouest", label:"Bénin & Afrique de l'Ouest" }] },
];

function OrientationSection() {
  const [selected, setSelected] = useState(0);
  const current = orientations[selected];
  return <section className="container cn-orient" id="orientation" aria-labelledby="cn-orient-title">
    <div className="cn-section-heading"><div><p className="cn-eyebrow">Orientation immédiate</p><h2 id="cn-orient-title">Qu'est-ce qui vous amène ?</h2></div><p>Un choix suffit : la suite vous montre directement les bonnes portes d'entrée, sans chercher dans tout le site.</p></div>
    <div className="cn-orient-grid" role="group" aria-label="Choisir ce qui vous amène">
      {orientations.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className="cn-orient-btn"><item.icon size={24} strokeWidth={1.6} aria-hidden="true" /><span className="cn-orient-btn-title">{item.title}</span><span className="cn-orient-btn-text">{item.text}</span></button>)}
    </div>
    <div className="cn-orient-panel" aria-live="polite">
      <div><p className="cn-orient-panel-eyebrow">Votre point de départ</p><p className="cn-orient-panel-title">{current.title}</p><p className="cn-orient-panel-text">{current.text}</p></div>
      <div className="cn-orient-panel-actions">
        <Link className="cn-action-primary" href={current.primary.href}>{current.primary.label} <ArrowRight size={17} aria-hidden="true"/></Link>
        {current.links.map(link => <Link key={link.href} className="cn-action-text" href={link.href}>{link.label} <ArrowRight size={15} aria-hidden="true"/></Link>)}
      </div>
    </div>
  </section>;
}

function SiteOverviewSection() {
  const { t } = useTranslation();
  return <section className="cn-map" aria-labelledby="cn-map-title">
    <div className="container">
      <div className="cn-section-heading cn-section-heading-light"><div><p className="cn-eyebrow">Se repérer</p><h2 id="cn-map-title">Tout le site, en quatre rubriques.</h2></div><Link className="cn-action-text cn-action-text-light" href="/fr/plan-du-site">Plan du site détaillé <ArrowRight size={17} aria-hidden="true"/></Link></div>
      <div className="cn-map-grid">
        {navGroups.map(group => <div key={group.id} className="cn-map-col">
          <p className="cn-map-col-title">{t(group.labelKey)}</p>
          <p className="cn-map-col-tagline">{group.tagline}</p>
          <ul>{group.items.map(item => <li key={item.href}><Link href={item.href}>{t(item.labelKey)}{item.inactive ? <span className="cn-map-inactive">inactif ici</span> : null}</Link></li>)}</ul>
        </div>)}
      </div>
      <p className="cn-map-counts">{modules.length} modules · {scenarios.length} scénarios · {navGroups.reduce((total, group) => total + group.items.length, 0)} pages de rubrique, sans compter les guides, modèles et outils.</p>
    </div>
  </section>;
}

export default function Home() {
  return <ClinicalShell>
    <div className="cn-editorial">
      <section className="cn-hero"><div className="container cn-hero-grid">
        <div><p className="cn-eyebrow"><span className="cn-small-rule"/> Recherche clinique · Repères & méthode</p><h1>Concevoir avec méthode.<br/><em>Comprendre à chaque étape.</em></h1><p className="cn-hero-intro">De la question scientifique aux vérifications du protocole, un espace pour apprendre, structurer et documenter votre réflexion.</p><div className="cn-hero-actions"><Link className="cn-action-primary" href="/fr/concevoir-un-essai">Concevoir un essai <ArrowRight size={18}/></Link><a className="cn-action-text" href="#orientation">Trouver mon point de départ <span aria-hidden="true">↓</span></a></div><ul className="cn-hero-reassurance"><li><CheckCircle2 size={16}/>Sources à portée de lecture</li><li><CheckCircle2 size={16}/>Sans données patient</li><li><CheckCircle2 size={16}/>Hypothèses à vérifier</li></ul></div>
        <figure className="cn-hero-figure"><div className="cn-figure-label"><span>Le carnet de recherche</span><span>Édition méthodologique / 01</span></div><TrialIllustration/><figcaption><span>Une question bien définie,<br/><strong>avant un résultat chiffré.</strong></span><a href="#cn-primer-title" aria-label="Explorer le carnet méthodologique"><ArrowRight size={23}/></a></figcaption><p className="cn-figure-footnote">Représentation pédagogique originale, sans données réelles.</p></figure>
      </div></section>
      <div className="cn-scope-strip"><div className="container"><ShieldCheck size={21}/><p><strong>Un appui à la réflexion, pas une validation.</strong> Ni conseil médical individuel, ni autorisation réglementaire. Les décisions critiques demandent une revue compétente.</p><Link href="/fr/limites">Lire les limites ↗</Link></div></div>
      <OrientationSection/>
      <section className="container cn-paths" id="choisir-parcours" aria-labelledby="cn-path-title"><div className="cn-section-heading"><div><p className="cn-eyebrow">Votre point de départ</p><h2 id="cn-path-title">Un parcours pour votre question.</h2></div><p>Entrez par votre besoin. Les outils, les références et les limites restent accessibles tout au long du parcours.</p></div><div className="cn-path-grid">{paths.map(p=><Link key={p.n} href={p.href} className="cn-path-card"><div className="cn-path-top"><span>{p.n}</span><p.icon size={27} strokeWidth={1.5}/></div><h3>{p.title}</h3><p>{p.text}</p><span className="cn-card-action">{p.action}<ArrowRight size={17}/></span></Link>)}</div></section>
      <div className="container"><IllustratedPrimer/></div>
      <section className="container cn-library" aria-labelledby="cn-library-title"><div className="cn-section-heading"><div><p className="cn-eyebrow">La bibliothèque de travail</p><h2 id="cn-library-title">Les briques du quotidien.</h2></div><Link className="cn-action-text" href="/fr/modules">Tous les modules <ArrowRight size={17}/></Link></div><div className="cn-module-grid">{modules.slice(0,6).map((m,i)=><Link href={`/fr/modules/${m.id}`} key={m.id} className="cn-module-card"><div className="cn-module-top"><span>0{i+1}</span><span>{m.status}</span></div><h3>{m.title}</h3><p>{m.summary}</p><div className="cn-topic-list">{m.topics.slice(0,3).map(t=><span key={t}>{t}</span>)}</div><ArrowRight className="cn-module-arrow" size={18}/></Link>)}</div></section>
      <SiteOverviewSection/>
      <section className="cn-trust-section"><div className="container cn-trust-grid"><div><p className="cn-eyebrow">La règle de confiance</p><h2>Les sources d'abord.<br/><em>Les limites aussi.</em></h2><p>La présentation facilite la lecture. Elle ne transforme pas un repère documentaire en preuve de conformité.</p><Link className="cn-action-text" href="/fr/sources">Consulter les sources <ArrowRight size={17}/></Link><Link className="cn-action-text" href="/fr/veille">Consulter la veille <ArrowRight size={17}/></Link></div><div className="cn-trust-notes">{[["Aucune donnée patient","Les scénarios et projets restent abstraits et non identifiants."],["Traçabilité","Calculs, sources, versions et hypothèses doivent rester visibles."],["Juridictions distinctes","Une règle européenne ne devient pas automatiquement une règle béninoise."],["Revue humaine","Un audit de cohérence ne remplace ni une expertise ni une approbation."]].map(([title,text],i)=><div key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>
      <section className="container cn-start-section"><Search size={26}/><p className="cn-eyebrow">Du repère au travail</p><h2>Commencer par une vraie question.</h2><p>L'atelier vous aide à relier design, critères de jugement, estimands, effectif, calendrier et revue de cohérence. Les calculs restent hypothétiques.</p><div className="cn-start-links"><Link className="cn-action-primary" href="/fr/concevoir-un-essai">Ouvrir l'atelier <ArrowRight size={18}/></Link><Link className="cn-action-text" href="/fr/ressources">Explorer les ressources ↗</Link><Link className="cn-action-text" href="/fr/formation">Consulter le guide embarqué ↗</Link></div><p className="cn-start-note">Le guide embarqué rapproche des contenus du site et s'abstient sans correspondance suffisante. Ce n'est pas une IA générative. L'activation d'un modèle reste suspendue.</p></section>
    </div>
  </ClinicalShell>;
}
