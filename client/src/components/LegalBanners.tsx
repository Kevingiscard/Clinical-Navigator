import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const DISCLAIMER_KEY = "cn_disclaimer_v1";
const CONSENT_KEY = "cn_consent_v1";

export function MedicalDisclaimerBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(localStorage.getItem(DISCLAIMER_KEY) !== "accepted"), []);
  if (!visible) return null;
  return (
    <aside className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-[#b9d8cc] bg-[#0d2b36] p-4 text-white shadow-2xl" role="dialog" aria-label="Avertissement médical">
      <p className="text-sm leading-6">Clinical Navigator est un outil d'aide à la réflexion. Il ne remplace pas l'avis d'un professionnel de santé.</p>
      <Button className="mt-3 bg-[#b7e0cf] text-[#0d2b36] hover:bg-white" onClick={() => { localStorage.setItem(DISCLAIMER_KEY, "accepted"); setVisible(false); }}>J'ai compris</Button>
    </aside>
  );
}

export function CookieConsentBanner() {
  const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (analyticsEnabled) setVisible(!localStorage.getItem(CONSENT_KEY)); }, [analyticsEnabled]);
  if (!analyticsEnabled || !visible) return null;
  const save = (value: "accepted" | "refused") => { localStorage.setItem(CONSENT_KEY, value); setVisible(false); };
  return (
    <aside className="fixed inset-x-3 bottom-3 z-[59] mx-auto max-w-3xl rounded-2xl border border-[#b9d8cc] bg-white p-4 text-[#18323a] shadow-2xl" role="dialog" aria-label="Préférences de cookies">
      <p className="text-sm leading-6">Les mesures d'audience sont activées. Vous pouvez accepter ou refuser les cookies analytiques.</p><Link className="mt-1 inline-block text-xs underline" href="/fr/mes-donnees">Gérer mes préférences</Link>
      <div className="mt-3 flex flex-wrap gap-2"><Button className="bg-[#0d2b36]" onClick={() => save("accepted")}>Accepter</Button><Button variant="outline" onClick={() => save("refused")}>Refuser</Button></div>
    </aside>
  );
}
