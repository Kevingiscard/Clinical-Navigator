import { ClinicalShell } from "@/components/ClinicalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Volume2, Square, ShieldAlert, Languages, Scale } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

type Section = { id: string; title: string; text: string };

const sections: Section[] = [
  { id: "recherche", title: "Qu'est-ce qu'une recherche clinique ?", text: "Une recherche clinique est une étude faite avec des personnes pour mieux comprendre une maladie ou vérifier qu'un traitement, un vaccin ou un dispositif est sûr et utile. Elle suit un protocole, un document précis qui explique tout ce qui sera fait. Elle est examinée par un comité d'éthique et, selon le type d'étude et le pays, autorisée par une autorité nationale." },
  { id: "volontaire", title: "La participation est volontaire", text: "Participer est un choix libre. Personne ne peut vous y obliger. Vous pouvez refuser sans avoir à vous justifier, et votre refus ne change rien aux soins que vous recevez normalement." },
  { id: "deroulement", title: "Ce qui va se passer", text: "Avant de décider, l'équipe de recherche doit vous expliquer l'objectif de l'étude, ce qui vous sera demandé, combien de temps cela durera, et combien de visites sont prévues. Vous pouvez poser toutes vos questions, et demander que l'explication soit donnée dans la langue que vous comprenez le mieux, avec l'aide d'une personne de confiance si vous le souhaitez." },
  { id: "risques", title: "Les risques et les bénéfices possibles", text: "L'équipe doit vous expliquer les risques prévisibles et les bénéfices possibles, y compris s'il est possible que vous ne tiriez aucun bénéfice personnel de votre participation. En cas de problème lié à la recherche, elle doit vous dire qui contacter et comment vous serez pris en charge." },
  { id: "droits", title: "Vos droits", text: "Vous pouvez retirer votre participation à tout moment, sans raison et sans perdre vos soins habituels. Vos informations personnelles sont protégées : elles ne doivent pas permettre de vous identifier publiquement. Vous pouvez demander à tout moment comment vos données sont utilisées." },
  { id: "decision", title: "Avant de décider", text: "Prenez le temps de réfléchir et d'en parler avec vos proches ou votre médecin. La décision se confirme par le processus prévu par l'étude : une signature sur le formulaire de consentement ou, si l'écriture est impossible, une attestation par une personne indépendante de l'équipe de recherche. Une écoute ou une explication, même bien comprise, ne remplace pas cette confirmation." },
];

export default function ConsentAudioPage() {
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [hasFrVoice, setHasFrVoice] = useState<boolean | null>(null);

  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setSupported(ok);
    if (!ok) return;
    const check = () => setHasFrVoice(window.speechSynthesis.getVoices().some(v => v.lang.toLowerCase().startsWith("fr")));
    check();
    window.speechSynthesis.addEventListener("voiceschanged", check);
    return () => { window.speechSynthesis.removeEventListener("voiceschanged", check); window.speechSynthesis.cancel(); };
  }, []);

  const speak = (section: Section) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(section.text);
    utterance.lang = "fr-FR";
    const voice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith("fr"));
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(null);
    utterance.onerror = () => setSpeaking(null);
    setSpeaking(section.id);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => { window.speechSynthesis.cancel(); setSpeaking(null); };

  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
      <div className="container max-w-4xl py-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Patients · brouillon à valider</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Explication audio du consentement</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Des explications simples sur la recherche clinique et le consentement, à lire ou à écouter, pour aider à comprendre avant de décider. Ces textes sont des brouillons pédagogiques : ils ne remplacent ni la lettre d'information d'une étude, ni le processus de consentement validé pour cette étude.</p>
      </div>
    </section>
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Alert className="mb-6 border-[#f0d9b5] bg-[#fdf6e9] text-[#6b4a1b]">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Brouillons à faire valider avant tout usage réel</AlertTitle>
        <AlertDescription>Ces textes doivent être relus et validés par l'équipe de l'étude et l'instance d'éthique concernée avant d'être utilisés avec de vrais patients. Une simple mise en garde ne suffit pas : sans cette validation, cette page ne doit pas servir à informer un participant ni à recueillir un consentement. Cette page lit uniquement un texte pédagogique général : pas de micro, pas d'enregistrement par l'application, aucune donnée de patient à saisir.</AlertDescription>
      </Alert>

      <div className="rounded-2xl border border-[#d8e7e1] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl font-bold text-[#11373d]">Écouter en français</h2>
          <p className="text-xs text-[#718682]">Voix de synthèse du navigateur ou du système, produite localement ou par un service selon l'appareil, qualité variable ; ce n'est pas une traduction validée.</p>
        </div>
        {supported === false && <p className="mt-3 rounded-lg bg-[#f5f7f6] p-3 text-sm text-[#596a66]">La synthèse vocale n'est pas disponible sur cet appareil ou ce navigateur ; les textes restent lisibles ci-dessous.</p>}
        {supported && hasFrVoice === false && <p className="mt-3 rounded-lg bg-[#f5f7f6] p-3 text-sm text-[#596a66]">Aucune voix française n'est installée sur cet appareil ; la lecture peut être indisponible ou utiliser une autre langue.</p>}
        <div className="mt-5 grid gap-4">
          {sections.map(section => (
            <div key={section.id} className="rounded-xl border border-[#e3e9e7] p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-[#264b4c]">{section.title}</h3>
                {supported && (speaking === section.id
                  ? <Button variant="ghost" className="shrink-0 text-[#b3452e]" onClick={stop}><Square className="mr-1.5 h-4 w-4" />Arrêter</Button>
                  : <Button variant="ghost" className="shrink-0 text-[#207666]" onClick={() => speak(section)}><Volume2 className="mr-1.5 h-4 w-4" />Écouter</Button>)}
              </div>
              <p className="mt-2 text-sm leading-6 text-[#536d67]">{section.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#d8e7e1] bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-[#11373d]"><Languages className="h-5 w-5 text-[#207666]" />Langues disponibles</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[#536d67]">
          <p><strong className="text-[#264b4c]">Français :</strong> lecture possible sur l'appareil lorsqu'une voix française est installée (voir indication ci-dessus).</p>
          <p><strong className="text-[#264b4c]">Fongbé et autres langues nationales du Bénin :</strong> non disponible dans cette version. Les navigateurs courants ne proposent pas ces voix ; y répondre suppose des modèles externes, des droits d'utilisation confirmés et une validation linguistique et médicale. Piste repérée, non intégrée : le projet J'aime Ma Langue (voir la fiche dans le module Patients).</p>
        </div>
      </div>

      <div id="encadrement" className="mt-6 rounded-2xl border border-[#d8e7e1] bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-[#11373d]"><Scale className="h-5 w-5 text-[#207666]" />Encadrement à respecter (Bénin)</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-[#536d67]">
          <li><strong className="text-[#264b4c]">Consentement :</strong> la loi n° 2010-40 (art. 21 et 26) exige un consentement libre, éclairé et exprès : la personne doit comprendre l'objectif, les contraintes et les risques. Le consentement est donné par écrit ou, en cas d'impossibilité, attesté par un tiers indépendant du chercheur et du promoteur. Une explication audio peut aider à comprendre ; elle ne constitue pas le consentement.</li>
          <li><strong className="text-[#264b4c]">Documents de l'étude :</strong> pour les essais relevant de l'ABMed (lignes directrices EC-LD-0001, §1.2.2), lettres d'information et formulaires de consentement sont rédigés en français, et tout document dans une autre langue exige une traduction certifiée conforme en français ; les traductions applicables font partie des documents essentiels. Les textes d'explication propres à une étude doivent donc être intégrés au dossier validé (CNERS puis ABMed selon le cas).</li>
          <li><strong className="text-[#264b4c]">Données :</strong> la loi n° 2017-20 (code du numérique, modifiée par la loi n° 2020-35) encadre les données personnelles : un enregistrement vocal en est une lorsqu'il permet d'identifier une personne ou se rapporte à une personne identifiable ; les données de santé et les traitements biométriques visant à identifier une personne de manière unique sont interdits sauf exceptions encadrées (art. 394 de la version 2018), sous le contrôle de l'APDP. Cette page n'a ni formulaire patient, ni micro, ni enregistrement applicatif ; l'hébergement conserve des journaux techniques de connexion et, selon l'appareil, la voix peut passer par un service du système. Toute évolution qui enregistrerait la voix ou des informations de santé tomberait sous ce régime.</li>
          <li><strong className="text-[#264b4c]">Droits sur les modèles et contenus :</strong> le corpus J'aime Ma Langue est ouvert sous licence CC-BY-SA-4.0 ; les modèles vocaux ne sont pas publiés sous licence identifiable à ce jour : leur usage ne peut pas être présumé.</li>
          <li><strong className="text-[#264b4c]">Responsabilité :</strong> le promoteur et l'investigateur restent responsables du processus de consentement (loi 2010-40, art. 26 et 29). Ce qui précède est une orientation documentaire, pas un avis juridique ; chaque étude et chaque pays exige une vérification propre.</li>
        </ul>
        <p className="mt-4 text-xs [overflow-wrap:anywhere] text-[#718682]">Sources datées du 21/11/2026 : loi n° 2010-40 (sgg.gouv.bj), lignes directrices ABMed EC-LD-0001 v1 (abmed.bj), loi n° 2017-20 modifiée par la loi n° 2020-35 (sgg.gouv.bj), huggingface.co/JaimeMaLangue. Détail dans docs/consentement-audio-encadrement.md.</p>
      </div>

      <Alert className="mt-6 border-[#c9e2d6] bg-[#eff9f4] text-[#1b4a43]">
        <ShieldAlert className="h-5 w-5" />
        <AlertTitle>En pratique</AlertTitle>
        <AlertDescription>Pour une vraie étude : faire valider les textes et leurs traductions, prévoir une personne compétente pour répondre aux questions, et suivre le processus de consentement approuvé. Pour le contexte général, voir <Link href="/fr/consentement-cas" className="font-bold underline">chaque cas de figure du consentement expliqué</Link>, le <Link href="/fr/modules/consentement" className="font-bold underline">module Consentement</Link> et le <Link href="/fr/modules/patients" className="font-bold underline">module Patients</Link>.</AlertDescription>
      </Alert>
    </section>
  </ClinicalShell>;
}
