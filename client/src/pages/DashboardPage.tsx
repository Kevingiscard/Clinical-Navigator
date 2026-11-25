import { ClinicalShell } from "@/components/ClinicalShell";
import { clearLocalProgress, hasDesignDraft, loadCampusDone, loadModuleChecks, loadVisits, type Visit } from "@/lib/localProgress";
import { sitePagesIndex } from "@/lib/sitePages";
import { modules } from "@shared/clinicalModules";
import { ArrowRight, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import "@/styles/platform.css";

// Les 7 étapes du campus (mêmes identifiants que la page Campus).
const CAMPUS_STEPS = [
  { id: "bases", title: "Poser les bases", href: "/fr/formation" },
  { id: "reflexes", title: "Vérifier ses réflexes", href: "/fr/entrainement" },
  { id: "question", title: "Définir sa question", href: "/fr/concevoir-un-essai" },
  { id: "cas", title: "Explorer les cas de figure", href: "/fr/explorer" },
  { id: "cadre", title: "Situer le cadre Bénin et région", href: "/fr/afrique-ouest" },
  { id: "documents", title: "Préparer les documents", href: "/fr/modeles" },
  { id: "revue", title: "Faire vérifier par des personnes compétentes", href: "/fr/campus" },
];

const titleOf = (route: string) => sitePagesIndex.find(p => p.route === route)?.title ?? route.replace("/fr/", "").replace(/-/g, " ");
const when = (at: number) => new Date(at).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

export default function DashboardPage() {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [checks, setChecks] = useState<Record<string, number>>({});
  const [draft, setDraft] = useState(false);
  const [cleared, setCleared] = useState(false);

  const refresh = () => {
    setDone(loadCampusDone());
    setVisits(loadVisits());
    setChecks(Object.fromEntries(modules.map(m => [m.id, loadModuleChecks(m.id)])));
    setDraft(hasDesignDraft());
    setReady(true);
  };
  useEffect(refresh, []);

  const percent = Math.round((done.length / CAMPUS_STEPS.length) * 100);
  const next = CAMPUS_STEPS.find(s => !done.includes(s.id));
  const activeModules = modules.filter(m => (checks[m.id] ?? 0) > 0);

  return <ClinicalShell><div className="pf">
    <header className="pf-head"><div className="container"><p className="pf-eyebrow">Mon tableau de bord</p><h1>Où j'en suis.</h1><p className="pf-intro">Votre progression, gardée sur cet appareil. Pas de compte, rien n'est envoyé.</p></div></header>
    <section className="container pf-section" aria-live="polite">
      {!ready ? <p>Chargement…</p> : <div className="pf-dash">
        <article className="pf-card pf-dash-main">
          <p className="pf-role">Campus</p>
          <p className="pf-bigpct" aria-label={`${percent} pour cent du campus fait`}>{percent}<span>%</span></p>
          <div className="pf-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Progression du campus"><div style={{ width: `${percent}%` }} /></div>
          <p>{done.length} étape{done.length > 1 ? "s" : ""} sur {CAMPUS_STEPS.length}.</p>
          {next ? <Link className="pf-btn" href={next.href}>Prochaine étape : {next.title} <ArrowRight size={16} aria-hidden="true" /></Link> : <p><strong>Les 7 étapes sont cochées.</strong> Faites relire votre travail par une personne compétente.</p>}
        </article>
        <article className="pf-card"><h3>Étapes du campus</h3><ul className="pf-steps">{CAMPUS_STEPS.map(s => <li key={s.id} className={done.includes(s.id) ? "is-done" : ""}><span aria-hidden="true">{done.includes(s.id) ? "✓" : "○"}</span><Link href={s.href}>{s.title}</Link><span className="pf-sr">{done.includes(s.id) ? " (fait)" : " (à faire)"}</span></li>)}</ul><Link className="pf-link" href="/fr/campus">Cocher mes étapes <ArrowRight size={15} aria-hidden="true" /></Link></article>
        <article className="pf-card"><h3>Dernières pages vues</h3>{visits.length === 0 ? <p>Rien pour l'instant. Visitez le site : les 8 dernières pages apparaîtront ici.</p> : <ul className="pf-steps">{visits.map(v => <li key={v.route}><Link href={v.route}>{titleOf(v.route)}</Link><span className="pf-when">{when(v.at)}</span></li>)}</ul>}</article>
        <article className="pf-card"><h3>Mes travaux</h3>
          <p>Atelier de conception : <strong>{draft ? "brouillon enregistré sur cet appareil" : "aucun brouillon"}</strong>.</p>
          {activeModules.length === 0 ? <p>Aucune liste de module commencée.</p> : <ul className="pf-steps">{activeModules.map(m => <li key={m.id}><Link href={`/fr/modules/${m.id}`}>{m.title}</Link><span className="pf-when">{checks[m.id]} point{checks[m.id] > 1 ? "s" : ""} coché{checks[m.id] > 1 ? "s" : ""}</span></li>)}</ul>}
          <Link className="pf-link" href="/fr/concevoir-un-essai">Ouvrir l'atelier <ArrowRight size={15} aria-hidden="true" /></Link></article>
        <article className="pf-card"><h3>Mes données</h3><p>Tout est stocké dans ce navigateur. Effacer ici supprime la progression, les listes et le brouillon, pas le thème ni la langue.</p>
          <button type="button" className="pf-btn pf-btn-danger" onClick={() => { if (window.confirm("Effacer ma progression sur cet appareil ?")) { clearLocalProgress(); refresh(); setCleared(true); } }}><Trash2 size={16} aria-hidden="true" /> Effacer ma progression</button>
          {cleared ? <p role="status">Progression effacée.</p> : null}</article>
      </div>}
    </section>
    <section className="pf-note"><div className="container"><ShieldCheck size={20} aria-hidden="true" /><p><strong>Aucune donnée patient.</strong> Ce tableau de bord ne mesure pas des compétences : il garde vos repères de lecture.</p><Link href="/fr/mes-donnees">Mes données</Link></div></section>
  </div></ClinicalShell>;
}
