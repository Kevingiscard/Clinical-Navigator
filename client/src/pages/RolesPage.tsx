import { ClinicalShell } from "@/components/ClinicalShell";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import "@/styles/platform.css";

// Parcours par rôle : chaque étape renvoie vers une page qui existe déjà. Aucune règle nouvelle n'est affirmée ici.
type Step = { label: string; href: string };
type Role = { id: string; name: string; goal: string; steps: Step[] };

const GLOSS: Step = { label: "Glossaire et ressources", href: "/fr/ressources" };
const roles: Role[] = [
  { id: "investigateur", name: "Investigateur", goal: "Savoir réagir devant un événement grave, un consentement délicat ou une déviation.", steps: [{ label: "Ateliers sur cas fictifs", href: "/fr/campus/ateliers" }, { label: "Cas de consentement", href: "/fr/consentement-cas" }, { label: "Quiz d'entraînement", href: "/fr/entrainement" }, GLOSS] },
  { id: "arc", name: "ARC / CRA", goal: "Préparer une visite et vérifier la cohérence des dossiers sources.", steps: [{ label: "Ateliers : dossier source et déviation", href: "/fr/campus/ateliers" }, { label: "Auditer un essai", href: "/fr/auditer-un-essai" }, { label: "Quiz d'entraînement", href: "/fr/entrainement" }, GLOSS] },
  { id: "chef-projet", name: "Chef de projet", goal: "Structurer un projet d'essai de la question au calendrier.", steps: [{ label: "Atelier de conception d'essai", href: "/fr/concevoir-un-essai" }, { label: "Outils de conception", href: "/fr/concevoir-un-essai/outils" }, { label: "Modules thématiques", href: "/fr/modules" }, GLOSS] },
  { id: "data-manager", name: "Data manager", goal: "Repérer les points de données à cadrer avant de commencer.", steps: [{ label: "Modules thématiques", href: "/fr/modules" }, { label: "Auditer un essai", href: "/fr/auditer-un-essai" }, { label: "Sources officielles", href: "/fr/sources" }, GLOSS] },
  { id: "formateur", name: "Formateur", goal: "Faire pratiquer une équipe sur des cas fictifs.", steps: [{ label: "Campus par niveau", href: "/fr/campus" }, { label: "Ateliers sur cas fictifs", href: "/fr/campus/ateliers" }, { label: "Quiz d'entraînement", href: "/fr/entrainement" }, { label: "Écouter le consentement", href: "/fr/consentement-audio" }] },
  { id: "apprenant", name: "Apprenant", goal: "Apprendre du débutant à l'expert, à son rythme.", steps: [{ label: "Formation", href: "/fr/formation" }, { label: "Campus", href: "/fr/campus" }, { label: "Quiz d'entraînement", href: "/fr/entrainement" }, { label: "Mon tableau de bord", href: "/fr/tableau-de-bord" }] },
  { id: "benin", name: "Équipe au Bénin", goal: "Retrouver les structures à solliciter pour un projet de recherche.", steps: [{ label: "Repères Bénin et Afrique de l'Ouest", href: "/fr/afrique-ouest" }, { label: "Sources avec dates", href: "/fr/sources" }, { label: "Limites du site", href: "/fr/limites" }, GLOSS] },
  { id: "admin", name: "Administrateur du site", goal: "Suivre ce que le site fait et ne fait pas aujourd'hui.", steps: [{ label: "La plateforme et son état", href: "/fr/plateforme" }, { label: "Diagnostic du système", href: "/fr/systeme" }, { label: "Mes données", href: "/fr/mes-donnees" }, { label: "Questions fréquentes", href: "/fr/faq" }] },
];

export default function RolesPage() {
  const [sel, setSel] = useState<string>("");
  const shown = sel ? roles.filter(r => r.id === sel) : roles;
  return <ClinicalShell><div className="pf">
    <header className="pf-head"><div className="container"><p className="pf-eyebrow">Campus</p><h1>Parcours par rôle</h1><p className="pf-intro">Choisissez votre rôle : une suite de pages du site, dans l'ordre utile. Rien n'est enregistré et aucun compte n'est demandé.</p></div></header>
    <section className="container pf-section">
      <div role="group" aria-label="Choisir un rôle" className="pf-chips">
        <button type="button" className={"pf-chip" + (sel === "" ? " is-on" : "")} aria-pressed={sel === ""} onClick={() => setSel("")}>Tous les rôles</button>
        {roles.map(r => <button key={r.id} type="button" className={"pf-chip" + (sel === r.id ? " is-on" : "")} aria-pressed={sel === r.id} onClick={() => setSel(r.id)}>{r.name}</button>)}
      </div>
      <div className="pf-grid" aria-live="polite">{shown.map(r => <article key={r.id} className="pf-card" id={r.id}><p className="pf-role">{r.name}</p><h3>{r.goal}</h3><ol className="pf-steps">{r.steps.map(s => <li key={s.href + s.label}><Link href={s.href}>{s.label} <ArrowRight size={14} aria-hidden="true" /></Link></li>)}</ol></article>)}</div>
    </section>
    <section className="pf-note"><div className="container"><ShieldCheck size={20} aria-hidden="true" /><p><strong>Données fictives uniquement.</strong> Ces parcours aident à réfléchir et à s'entraîner. Le protocole, les procédures de votre structure et les textes locaux en vigueur priment toujours.</p></div></section>
  </div></ClinicalShell>;
}
