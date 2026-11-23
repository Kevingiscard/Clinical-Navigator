import { ClinicalShell } from "@/components/ClinicalShell";
import { navGroups } from "@/lib/navigation";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowRight, Map } from "lucide-react";

const secondaryPages = [
  { href: "/fr/a-propos", label: "À propos", description: "Présentation générale du projet." },
  { href: "/fr/contact", label: "Contact", description: "Joindre l'équipe éditoriale, sans données patient." },
  { href: "/fr/soutenir", label: "Soutenir le projet", description: "Comment soutenir Clinical Navigator." },
  { href: "/fr/confidentialite", label: "Confidentialité", description: "Ce qui reste sur votre appareil et pourquoi." },
  { href: "/fr/mes-donnees", label: "Mes données", description: "Voir et supprimer ce qui est conservé localement." },
  { href: "/fr/conditions", label: "Conditions d'utilisation", description: "Le cadre d'usage du site." },
  { href: "/fr/mentions-legales", label: "Mentions légales", description: "Éditeur, hébergement et propriété." },
];

const inactiveSections = [
  { href: "/fr/mon-espace", label: "Mon espace", description: "Comptes, favoris et cas enregistrés : nécessitent un serveur rattaché." },
  { href: "/fr/admin", label: "Administration", description: "Gestion éditoriale : inactive sur l'hébergement statique actuel." },
];

export default function SiteMapPage() {
  const { t } = useTranslation();
  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
      <div className="container py-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Orientation</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Plan du site</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Toutes les pages de Clinical Navigator, regroupées par rubrique. Les sections qui nécessitent un serveur sont signalées : elles restent inactives sur cette instance.</p>
      </div>
    </section>
    <section className="container py-10">
      <div className="grid gap-5 md:grid-cols-2">
        {navGroups.map(group => (
          <article key={group.id} className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f5ef] text-[#2c8271]"><Map className="h-4 w-4" aria-hidden="true" /></span>
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#143c41]">{t(group.labelKey)}</h2>
                <p className="text-xs text-[#56716c]">{group.tagline}</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-2.5">
              {group.items.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-start justify-between gap-3 rounded-xl border border-[#e4eeea] px-4 py-3 no-underline transition hover:border-[#9dcabb] hover:bg-[#f6fbf8]">
                    <span>
                      <span className="flex items-center gap-2 text-sm font-bold text-[#1b4547]">
                        {t(item.labelKey)}
                        {item.inactive ? <span className="rounded-md bg-[#f3ecd9] px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-[#7a6527]">Inactif ici</span> : null}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-[#56716c]">{item.description}</span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#7fa39a] transition group-hover:translate-x-0.5 group-hover:text-[#2c8271]" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#143c41]">Informations & cadre</h2>
          <ul className="mt-5 grid gap-2.5">
            {secondaryPages.map(page => (
              <li key={page.href}>
                <Link href={page.href} className="group flex items-start justify-between gap-3 rounded-xl border border-[#e4eeea] px-4 py-3 no-underline transition hover:border-[#9dcabb] hover:bg-[#f6fbf8]">
                  <span>
                    <span className="block text-sm font-bold text-[#1b4547]">{page.label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-[#56716c]">{page.description}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#7fa39a] transition group-hover:translate-x-0.5 group-hover:text-[#2c8271]" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-[#e3ddc9] bg-[#fbf8ef] p-6 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#143c41]">Sections inactives sur cette instance</h2>
          <p className="mt-3 text-sm leading-6 text-[#5d6d5a]">Ces espaces existent dans le projet mais demandent un serveur rattaché. Ils sont listés pour la transparence ; rien n'y est perdu en naviguant.</p>
          <ul className="mt-5 grid gap-2.5">
            {inactiveSections.map(page => (
              <li key={page.href} className="rounded-xl border border-[#e3ddc9] bg-white px-4 py-3">
                <span className="block text-sm font-bold text-[#1b4547]">{page.label}</span>
                <span className="mt-0.5 block text-xs leading-5 text-[#56716c]">{page.description}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  </ClinicalShell>;
}
