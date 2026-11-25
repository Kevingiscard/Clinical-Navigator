import { Link, useLocation } from "wouter";
import { BookOpenCheck, ChevronDown, ChevronRight, CircleHelp, Compass, Menu, ShieldCheck, X } from "lucide-react";
import { ContactBlock } from "@/components/ContactBlock";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { breadcrumbFor, navGroups, normalizePath, type NavGroup } from "@/lib/navigation";

function GroupPanel({ group, align, onNavigate }: { group: NavGroup; align: "left" | "right"; onNavigate: () => void }) {
  const { t } = useTranslation();
  const [location] = useLocation();
  return (
    <div id={`nav-panel-${group.id}`} className={`absolute top-full z-50 mt-1 w-[21rem] rounded-2xl border border-[#d7e4de] bg-white p-2 shadow-xl shadow-[#0d2b36]/10 ${align === "right" ? "right-0" : "left-0"}`}>
      <p className="px-3 pb-1.5 pt-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#6a8580]">{group.tagline}</p>
      {group.items.map(item => {
        const active = normalizePath(location) === item.href;
        return (
          <Link key={item.href} href={item.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={`block rounded-xl px-3 py-2.5 no-underline transition-colors ${active ? "bg-[#e7f3ed]" : "hover:bg-[#f0f6f3]"}`}>
            <span className="flex items-center justify-between gap-2 text-sm font-semibold text-[#123c40]">
              {t(item.labelKey)}
              {item.inactive ? <span className="rounded-md bg-[#f3ecd9] px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-[#7a6527]">Inactif ici</span> : null}
            </span>
            <span className="mt-0.5 block text-xs leading-5 text-[#56716c]">{item.description}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function ClinicalShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [location] = useLocation();
  const { t } = useTranslation();
  const crumbs = breadcrumbFor(location, t);
  const current = normalizePath(location);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [location]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (openGroup) {
          const trigger = document.getElementById(`nav-group-button-${openGroup}`);
          setOpenGroup(null);
          trigger?.focus();
        }
        if (open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (openGroup && navRef.current && !navRef.current.contains(event.target as Node)) setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, openGroup]);

  const groupIsActive = (group: NavGroup) => group.items.some(item => current === item.href || current.startsWith(`${item.href}/`));

  return <div className="min-h-screen bg-[#f5f8f7] text-[#18323a]">
    <header className="sticky top-0 z-40 border-b border-[#dfe9e6]/90 bg-[#f8fbfa]/92 backdrop-blur-lg">
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-3 no-underline">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d2b36] text-[#b7e0cf] shadow-sm"><Compass className="h-5 w-5" /></span>
            <span className="leading-none">
              <span className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#58716f]">Clinical</span>
              <span className="mt-1 block font-serif text-xl font-bold tracking-tight text-[#0d2b36]">Navigator</span>
            </span>
          </Link>
        </div>
        <nav ref={navRef} className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navGroups.map((group, index) => (
            <div key={group.id} className="relative">
              <button
                id={`nav-group-button-${group.id}`}
                type="button"
                aria-expanded={openGroup === group.id}
                aria-controls={`nav-panel-${group.id}`}
                onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${groupIsActive(group) ? "bg-[#e7f3ed] text-[#0d5b52]" : "text-[#49615f] hover:bg-[#edf3f0] hover:text-[#0d2b36]"}`}
              >
                {t(group.labelKey)}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openGroup === group.id ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {openGroup === group.id ? <GroupPanel group={group} align={index >= navGroups.length - 2 ? "right" : "left"} onNavigate={() => setOpenGroup(null)} /> : null}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/fr/probleme" className="hidden rounded-lg bg-[#0d2b36] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#164451] sm:inline-flex">Démarrer <ChevronRight className="ml-1 h-4 w-4" /></Link>
          <button ref={menuButton} type="button" onClick={() => setOpen(!open)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#cfe0da] text-[#0d2b36] lg:hidden" aria-expanded={open} aria-controls="cn-mobile-nav" aria-label={open ? "Fermer la navigation" : "Ouvrir la navigation"}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-[#dfe9e6] bg-[#f8fbfa] px-4 py-4 lg:hidden">
        <nav className="container grid gap-4" id="cn-mobile-nav" aria-label="Navigation mobile">
          <Link onClick={() => setOpen(false)} href="/" className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${current === "/" ? "bg-[#e7f3ed] text-[#0d5b52]" : "text-[#29454a] hover:bg-[#e7f3ed]"}`}>{t("home")}</Link>
          {navGroups.map(group => (
            <div key={group.id}>
              <p className="px-3 pb-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#6a8580]">{t(group.labelKey)}</p>
              <div className="grid gap-0.5">
                {group.items.map(item => (
                  <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${current === item.href ? "bg-[#e7f3ed] text-[#0d5b52]" : "text-[#29454a] hover:bg-[#e7f3ed]"}`}>
                    {t(item.labelKey)}
                    {item.inactive ? <span className="rounded-md bg-[#f3ecd9] px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-[#7a6527]">Inactif ici</span> : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>}
    </header>
    {crumbs ? <nav aria-label="Fil d'Ariane" className="border-b border-[#e2ece8] bg-[#f2f7f4]">
      <ol className="container flex flex-wrap items-center gap-x-1.5 gap-y-1 py-2.5 text-xs text-[#56716c]">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? <ChevronRight className="h-3 w-3 text-[#9fb5af]" aria-hidden="true" /> : null}
              {crumb.href && !last ? <Link href={crumb.href} className="font-medium text-[#2c6b60] hover:text-[#0d2b36] hover:underline">{crumb.label}</Link> : <span aria-current={last ? "page" : undefined} className={last ? "font-semibold text-[#1c3f3d]" : "font-medium"}>{crumb.label}</span>}
            </li>
          );
        })}
      </ol>
    </nav> : null}
    <main id="main-content" tabIndex={-1}>{children}</main>
    <footer className="mt-16 border-t border-[#dfe9e6] bg-[#edf4f1]">
      <div className="container py-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 font-serif text-xl font-bold text-[#0d2b36]"><Compass className="h-5 w-5 text-[#287c71]" />Clinical Navigator</div>
          <p className="mt-3 text-sm leading-6 text-[#526b68]">Un outil d’orientation opérationnelle et documentaire pour la recherche clinique. Il ne remplace ni le protocole, ni les SOP, ni les responsables compétents.</p>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {navGroups.map(group => (
            <div key={group.id}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#4f716c]">{t(group.labelKey)}</p>
              <div className="grid gap-2 text-sm">
                {group.items.map(item => <Link key={item.href} href={item.href} className="text-[#355a57] hover:text-[#0d2b36]">{t(item.labelKey)}</Link>)}
              </div>
            </div>
          ))}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#4f716c]">Confiance</p>
            <div className="grid gap-2 text-sm">
              <Link href="/fr/sources" className="flex items-center gap-2 text-[#355a57] hover:text-[#0d2b36]"><BookOpenCheck className="h-4 w-4" />Sources</Link>
              <Link href="/fr/limites" className="flex items-center gap-2 text-[#355a57] hover:text-[#0d2b36]"><CircleHelp className="h-4 w-4" />Limites</Link>
              <Link href="/fr/confidentialite" className="flex items-center gap-2 text-[#355a57] hover:text-[#0d2b36]"><ShieldCheck className="h-4 w-4" />Confidentialité</Link>
              <Link href="/fr/mentions-legales" className="text-[#355a57] hover:text-[#0d2b36]">Mentions légales</Link>
              <Link href="/fr/soutenir" className="text-[#355a57] hover:text-[#0d2b36]">Soutenir le projet</Link>
            </div>
          </div>
          <div><ContactBlock compact /></div>
        </div>
      </div>
      <div className="border-t border-[#d8e5df] py-4 text-center text-xs text-[#365f56]">Clinical Navigator · Créé et développé par Kevin HOUNSINOU · Contenu versionné · Ne saisissez aucune donnée permettant d’identifier directement un participant.</div>
    </footer>
  </div>;
}
