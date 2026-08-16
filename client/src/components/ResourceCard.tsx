import { ArrowUpRight, ExternalLink, FileCheck2, FileText, GraduationCap, Link2, Wrench } from "lucide-react";
import { Link } from "wouter";
import type { ModuleResource } from "@shared/moduleResources";

const icons = { GUIDE: FileText, TOOL: Wrench, CHECKLIST: FileCheck2, TEMPLATE: FileText, SOURCE: ExternalLink, TRAINING: GraduationCap, EXAMPLE: FileText, CASE_STUDY: FileText, CALCULATOR: Wrench, FAQ: Link2, DOCUMENTATION: FileText } as const;
const labels: Record<ModuleResource["type"], string> = { GUIDE: "Guide", TOOL: "Outil", CHECKLIST: "Checklist", TEMPLATE: "Modèle", SOURCE: "Source", TRAINING: "Formation", EXAMPLE: "Exemple", CASE_STUDY: "Cas", CALCULATOR: "Calculateur", FAQ: "FAQ", DOCUMENTATION: "Documentation" };
const statusLabels = { VERIFIED: "Vérifié", NEEDS_REVIEW: "À revoir", DRAFT: "Brouillon", OUTDATED: "À actualiser" } as const;

export function ResourceCard({ resource, compact = false }: { resource: ModuleResource; compact?: boolean }) {
  const Icon = icons[resource.type];
  const content = <>
    <div className="flex items-start justify-between gap-3">
      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f1f4f3] px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-[#405451]"><Icon className="h-3.5 w-3.5" />{labels[resource.type]}</span>
      <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${resource.status === "VERIFIED" ? "bg-[#e7eee9] text-[#244d42]" : resource.status === "DRAFT" ? "bg-[#f1f1f1] text-[#666]" : "bg-[#f5eee2] text-[#73552b]"}`}>{statusLabels[resource.status]}</span>
    </div>
    <h3 className={`${compact ? "mt-3 text-base" : "mt-4 text-lg"} font-bold text-[#172c2d]`}>{resource.title}</h3>
    <p className="mt-2 text-sm leading-6 text-[#5c6b69]">{resource.description}</p>
    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-[#687775]">
      <span>{resource.level}</span><span aria-hidden="true">·</span><span>{resource.jurisdiction.slice(0, 2).join(" / ")}</span><span aria-hidden="true">·</span><span>{resource.offlineAvailable ? "Disponible hors ligne" : "Nécessite Internet"}</span>
    </div>
    <div className="mt-4 flex flex-wrap gap-1.5">{resource.tags.slice(0, 4).map(tag => <span key={tag} className="rounded bg-[#f6f8f7] px-2 py-1 text-[11px] text-[#566662]">{tag}</span>)}</div>
    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e9edeb] pt-3 text-xs text-[#71807d]"><span>Revu le {resource.lastReviewed}</span><span className="inline-flex items-center gap-1 font-bold text-[#263f3d]">Ouvrir <ArrowUpRight className="h-3.5 w-3.5" /></span></div>
  </>;
  const className = "block rounded-xl border border-[#dce4e1] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#7d918c] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#314b47]";
  if (resource.internalRoute) return <Link href={resource.internalRoute} className={className}>{content}</Link>;
  if (resource.url) return <a href={resource.url} target="_blank" rel="noreferrer" className={className} aria-label={`${resource.title} — source externe`}>{content}</a>;
  return <article className={className}>{content}</article>;
}
