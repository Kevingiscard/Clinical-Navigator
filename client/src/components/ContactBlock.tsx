import { useEffect, useState } from "react";
import { contactEmail, instagramHandle, instagramUrl } from "@/lib/contactInfo";

/** Bloc Contact : e-mail (assemblé au chargement pour limiter les robots) et Instagram. Sans formulaire. */
export function ContactBlock({ compact = false }: { compact?: boolean }) {
  const [mail, setMail] = useState("");
  useEffect(() => setMail(contactEmail()), []);
  return <div className={compact ? "pf-contactblock pf-contactblock-compact" : "pf-contactblock"} data-testid="contact-block">
    <p className="pf-contactblock-title">Contact</p>
    <p>E-mail : {mail ? <a href={`mailto:${mail}`}>{mail}</a> : <span>affichage en cours…</span>}</p>
    <p>Instagram : <a href={instagramUrl} target="_blank" rel="noreferrer noopener">{instagramHandle}</a></p>
    {!compact && <p className="pf-foot">Ne transmettez aucun nom, identifiant ou donnée de patient par ces canaux.</p>}
  </div>;
}
