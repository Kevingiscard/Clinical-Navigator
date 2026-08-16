import type { ReactNode } from "react";
import { ServerOff } from "lucide-react";
import { STATIC_ONLY } from "@/lib/runtime";
import { ClinicalShell } from "./ClinicalShell";

export function RequiresBackend({ children }: { children: ReactNode }) {
  if (!STATIC_ONLY) return <>{children}</>;

  return (
    <ClinicalShell>
      <section className="container max-w-3xl py-16">
        <ServerOff className="h-10 w-10 text-[#39806f]" aria-hidden="true" />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-[#39806f]">Mode statique</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Cette section nécessite un serveur rattaché</h1>
        <p className="mt-5 text-lg leading-8 text-[#526b67]">
          Cette instance publique sert le contenu et les parcours sans compte. Les fonctions de connexion, compte, favoris, cas enregistrés, administration et analytics sont désactivées tant qu’un backend tRPC sécurisé n’est pas configuré.
        </p>
        <p className="mt-4 leading-7 text-[#526b67]">
          Utilisez « J’ai un problème » ou « Concevoir un essai » pour les parcours disponibles sans serveur, et ne saisissez aucune donnée patient.
        </p>
      </section>
    </ClinicalShell>
  );
}
