import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { STATIC_ONLY } from "@/lib/runtime";

export function StaticModeNotice() {
  const [dismissed, setDismissed] = useState(false);
  if (!STATIC_ONLY || dismissed) return null;

  return (
    <div role="status" className="border-b border-[#f2c94c]/60 bg-[#fdf6e3] px-4 py-2 text-sm text-[#6b5300]">
      <div className="container flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Démo statique : connexion, compte, favoris, mes cas et les espaces admin ne sont pas actifs sur cette instance. Le parcours « J’ai un problème » et « Concevoir un essai » restent pleinement utilisables.
        </span>
        <button type="button" onClick={() => setDismissed(true)} aria-label="Fermer ce message" className="shrink-0 rounded p-1 hover:bg-[#f2c94c]/30">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
