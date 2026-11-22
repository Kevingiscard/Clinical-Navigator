import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Check, Copy, Download } from "lucide-react";
import { ClinicalShell } from "@/components/ClinicalShell";
import { Button } from "@/components/ui/button";
import { templateDocuments } from "@shared/templates";

export default function TemplatesPage() {
  const [, params] = useRoute("/fr/modeles/:id");
  const document = templateDocuments.find(item => item.id === params?.id);
  const [copied, setCopied] = useState(false);

  const copy = async (body: string) => {
    try { await navigator.clipboard.writeText(body); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard indisponible */ }
  };
  const download = (doc: { id: string; body: string }) => {
    const url = URL.createObjectURL(new Blob([doc.body], { type: "text/plain;charset=utf-8" }));
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `${doc.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]"><div className="container py-10">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Bibliothèque</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Modèles et exemples</h1>
      <p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Des documents complets à copier, télécharger et adapter à votre structure. Ce sont des brouillons pédagogiques (statut DRAFT) : faites-les valider par votre structure avant tout usage réel. L'exemple rempli utilise des données entièrement fictives.</p>
    </div></section>
    <section className="container max-w-4xl py-8">
      {!document ? <div className="grid gap-4">
        {templateDocuments.map(item => <Link key={item.id} href={`/fr/modeles/${item.id}`} className="group rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9dcabb]">
          <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${item.kind === "example" ? "bg-[#eef2fb] text-[#4a5e9e]" : "bg-[#e8f5ef] text-[#2c8271]"}`}>{item.kind === "example" ? "EXEMPLE FICTIF" : "TRAME"}</span>
          <h2 className="mt-4 text-xl font-bold text-[#173f43]">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#365f56]">{item.summary}</p>
        </Link>)}
      </div> : <div>
        <Link href="/fr/modeles" className="inline-flex items-center gap-2 text-sm font-bold text-[#1c7566]"><ArrowLeft className="h-4 w-4" />Tous les modèles</Link>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${document.kind === "example" ? "bg-[#eef2fb] text-[#4a5e9e]" : "bg-[#e8f5ef] text-[#2c8271]"}`}>{document.kind === "example" ? "EXEMPLE FICTIF" : "TRAME À ADAPTER"}</span>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#143a40]">{document.title}</h2>
            <p className="mt-1 text-sm text-[#365f56]">{document.summary}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => copy(document.body)} className="border-[#c9ddd6] bg-white text-[#23464a]">{copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}{copied ? "Copié" : "Copier"}</Button>
            <Button onClick={() => download(document)} className="bg-[#0d2b36]"><Download className="mr-2 h-4 w-4" />Télécharger (.txt)</Button>
          </div>
        </div>
        <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-2xl border border-[#dbe8e3] bg-white p-5 font-sans text-sm leading-6 text-[#365652]">{document.body}</pre>
        <p className="mt-4 rounded-xl bg-[#f5f8f6] p-3 text-xs leading-5 text-[#66817c]">Brouillon pédagogique : adaptez chaque élément entre crochets, faites valider le document par votre structure et vérifiez le droit applicable dans votre pays avant tout usage réel.</p>
      </div>}
    </section>
  </ClinicalShell>;
}
