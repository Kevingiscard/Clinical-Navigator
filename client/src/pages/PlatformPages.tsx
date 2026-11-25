import { ContactBlock } from "@/components/ContactBlock";
import { ClinicalShell } from "@/components/ClinicalShell";
import { faq, features, freeItems, freePromise, statusLabels, useCases, type FeatureStatus } from "@/lib/platformConfig";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import "@/styles/platform.css";

const ISSUES_URL = "https://github.com/Kevingiscard/Clinical-Navigator/issues/new";

function Shell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <ClinicalShell><div className="pf">
    <header className="pf-head"><div className="container"><p className="pf-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="pf-intro">{intro}</p></div></header>
    {children}
    <section className="pf-note"><div className="container"><ShieldCheck size={20} aria-hidden="true" /><p><strong>Un appui à la réflexion, pas une validation.</strong> Aucune donnée patient. Les fonctions « prévu » ne sont pas actives.</p><Link href="/fr/limites">Lire les limites</Link></div></section>
  </div></ClinicalShell>;
}

function Badge({ status }: { status: FeatureStatus }) { return <span className={`pf-badge pf-badge-${status}`}>{statusLabels[status]}</span>; }

export function PlatformPage() {
  return <Shell eyebrow="La plateforme" title="Ce que Clinical Navigator fait, et ce qui arrive." intro="Chaque fonction porte son état réel : disponible, démonstration ou prévu. Rien n'est présenté comme actif s'il ne l'est pas.">
    <section className="container pf-section" aria-labelledby="pf-feat"><h2 id="pf-feat">Fonctionnalités</h2>
      <div className="pf-grid">{features.map(f => <article key={f.id} className="pf-card"><Badge status={f.status} /><h3>{f.title}</h3><p>{f.text}</p>{f.href ? <Link className="pf-link" href={f.href}>Ouvrir <ArrowRight size={15} aria-hidden="true" /></Link> : <span className="pf-soon">Pas encore ouvert</span>}</article>)}</div>
    </section>
    <section className="container pf-section" aria-labelledby="pf-cases"><h2 id="pf-cases">Cas d'usage par rôle</h2>
      <div className="pf-cases">{useCases.map(u => <article key={u.role} className="pf-case"><p className="pf-role">{u.role}</p><h3>{u.goal}</h3><ol>{u.steps.map(s => <li key={s}>{s}</li>)}</ol><Link className="pf-link" href={u.href}>Commencer <ArrowRight size={15} aria-hidden="true" /></Link></article>)}</div>
    </section>
  </Shell>;
}

export function FreePage() {
  return <Shell eyebrow="Gratuit" title="Tout est gratuit." intro={freePromise}>
    <section className="container pf-section" aria-label="Ce qui est gratuit">
      <div className="pf-grid">{freeItems.map(i => <article key={i.title} className="pf-card"><CheckCircle2 size={20} className="pf-ok" aria-hidden="true" /><h3>{i.title}</h3><p>{i.text}</p></article>)}</div>
      <p className="pf-cta"><Link className="pf-btn" href="/fr/campus">Entrer au campus</Link></p>
    </section>
  </Shell>;
}

export function FaqPage() {
  return <Shell eyebrow="Questions fréquentes" title="Les réponses courtes, sans promesse en trop." intro="Si une réponse manque, la page Contact permet de la demander.">
    <section className="container pf-section pf-faq" aria-label="Questions">{faq.map(item => <details key={item.q} className="pf-q"><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
  </Shell>;
}

export function ContactStaticPage() {
  return <Shell eyebrow="Contact" title="Signaler une erreur ou demander un contenu." intro="Pas de formulaire sur cette version. Écrivez par e-mail, par Instagram, ou ouvrez une demande publique sur GitHub.">
    <section className="container pf-section pf-contact"><article className="pf-card"><h3>Ouvrir une demande</h3><p>Décrivez le besoin de façon générale. N'écrivez aucun nom, identifiant ou donnée de patient : le suivi est public.</p><a className="pf-btn" href={ISSUES_URL} target="_blank" rel="noreferrer noopener">Ouvrir une demande sur GitHub</a><p className="pf-foot">Un compte GitHub est nécessaire pour cette voie.</p></article><article className="pf-card"><h3>Écrire directement</h3><ContactBlock /></article></section>
  </Shell>;
}
