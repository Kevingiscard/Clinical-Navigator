import { ClinicalShell } from "@/components/ClinicalShell";
import { ArrowUpRight, Building2, Flag, Globe2, Landmark, ScrollText, ShieldAlert } from "lucide-react";
import { Link } from "wouter";

// Page documentaire : chaque fait provient des pages officielles citées, consultées le 23 novembre 2026.
// Le mandat affiché par une institution n'est pas la preuve de la procédure en vigueur : vérifier les textes actuels avant d'agir.

const beninStructures = [
  {
    icon: ScrollText,
    name: "CNERS — Comité National d'Éthique pour la Recherche en Santé",
    url: "https://ethique-sante.org/presentation/",
    urlLabel: "ethique-sante.org",
    facts: [
      "Créé par la loi n° 2010-40 du 8 décembre 2010 portant Code d'éthique et de déontologie de la recherche en santé au Bénin.",
      "Étudie tous les protocoles de recherche en santé exécutés sur le territoire béninois.",
      "Donne un avis motivé sur le plan éthique au ministère de la Santé, en vue de la délivrance de l'autorisation administrative.",
      "Supervise les recherches en cours et peut émettre un nouvel avis en cas de besoin.",
      "Fait conduire les évaluations scientifiques par deux évaluateurs indépendants, avec canevas publié sur son site.",
      "Se réunit en session ordinaire une fois par trimestre, plus souvent en pratique selon son site.",
    ],
    contact: "contact@ethique-sante.org",
  },
  {
    icon: Landmark,
    name: "ABMed — Agence béninoise du Médicament et des autres produits de Santé",
    url: "https://abmed.bj/presentation",
    urlLabel: "abmed.bj",
    facts: [
      "Établissement public doté de la personnalité juridique et de l'autonomie financière, sous tutelle du ministère de la Santé.",
      "Créée par le décret n° 2023-422 du 26 juillet 2023, en succession de l'ex-DPMED, pour coordonner la politique nationale du médicament et des produits de santé.",
      "Comprend une Direction des Homologations et des Essais cliniques (DHE) ; son site lui attribue l'homologation des produits de santé ainsi que les essais cliniques.",
      "Contrôle les établissements pharmaceutiques et lutte contre les médicaments de qualité inférieure ou falsifiés.",
    ],
    contact: "contact.abmed@gouv.bj",
    caveat: "La répartition exacte des rôles entre ABMed et CNERS dans la chaîne d'autorisation actuelle des essais n'est pas démontrée par ces pages : la séquence avis éthique / autorisation doit être confirmée dans les textes en vigueur avant tout contenu prescriptif.",
  },
  {
    icon: Building2,
    name: "FSS — Faculté des Sciences de la Santé (UAC, Cotonou)",
    url: "https://www.fss-cotonou.com/presentation/",
    urlLabel: "fss-cotonou.com",
    facts: [
      "Études de médecine au Bénin depuis 1971 ; faculté créée en 1977, avec écoles de pharmacie, kinésithérapie et odonto-stomatologie.",
      "Missions affichées : formation universitaire et continue du personnel de santé, promotion de la recherche médicale.",
    ],
    contact: "contact@fss-cotonou.com",
  },
];

const regionalStructures = [
  {
    icon: Globe2,
    name: "OOAS / WAHO — Organisation Ouest-Africaine de la Santé",
    url: "https://wahooas.org/web-ooas/about-us/who-we-are",
    urlLabel: "wahooas.org",
    facts: [
      "Institution spécialisée de la CEDEAO pour la santé, créée par le protocole A/P2/7/87 du 9 juillet 1987, siège à Bobo-Dioulasso (Burkina Faso).",
      "Mandat politique de coordination des interventions sanitaires régionales et d'harmonisation des politiques des États membres.",
    ],
    caveat: "Sa page institutionnelle mentionne une assemblée de quinze ministres de la Santé : chiffre antérieur au retrait du Burkina Faso, du Mali et du Niger de la CEDEAO, effectif le 29 janvier 2025 (communiqué CEDEAO). La CEDEAO compte depuis 12 États ; le maintien ou non des trois États du Sahel dans le périmètre statutaire propre de l'OOAS n'est pas établi par ces sources et doit être confirmé dans ses textes actuels.",
  },
  {
    icon: Flag,
    name: "Institut Pasteur de Dakar",
    url: "https://institutpasteurdakar.sn/",
    urlLabel: "institutpasteurdakar.sn",
    facts: [
      "Institution de recherche en santé basée à Dakar (Sénégal), active sur les épidémies, le diagnostic et les partenariats scientifiques en Afrique de l'Ouest.",
      "A développé avec des partenaires le premier test rapide de diagnostic de la rougeole, utilisable sans électricité, selon son site.",
    ],
  },
  {
    icon: Globe2,
    name: "EDCTP — European & Developing Countries Clinical Trials Partnership",
    url: "https://www.edctp.org/about-us/",
    urlLabel: "edctp.org",
    facts: [
      "Partenariat public-public entre pays d'Europe et d'Afrique subsaharienne, soutenu par l'Union européenne.",
      "Mission : renforcer les capacités de recherche et accélérer le développement d'interventions médicales contre les maladies infectieuses liées à la pauvreté, toutes phases d'essais cliniques, avec l'accent sur les phases II et III.",
      "Bureaux à La Haye (Pays-Bas) et au Cap (Afrique du Sud).",
    ],
  },
];

function StructureCard({ structure }: { structure: { icon: any; name: string; url: string; urlLabel: string; facts: string[]; contact?: string; caveat?: string } }) {
  const Icon = structure.icon;
  return (
    <article className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#2c8271]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
        <div>
          <h3 className="font-serif text-xl font-bold leading-snug text-[#143c41]">{structure.name}</h3>
          <a href={structure.url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#1c7566] hover:text-[#0d2b36]">
            {structure.urlLabel} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <ul className="mt-4 grid gap-2">
        {structure.facts.map(fact => <li key={fact.slice(0, 40)} className="rounded-lg bg-[#f5f9f7] p-3 text-sm leading-6 text-[#46605b]">{fact}</li>)}
      </ul>
      {structure.contact ? <p className="mt-3 text-xs text-[#5e7671]">Contact public mentionné : {structure.contact}. Une adresse publiée n'implique ni partenariat ni disponibilité.</p> : null}
      {structure.caveat ? (
        <p className="mt-3 flex items-start gap-2 rounded-xl border border-[#f0e2c0] bg-[#fdf7ea] p-3 text-xs leading-5 text-[#6b4f1d]">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {structure.caveat}
        </p>
      ) : null}
    </article>
  );
}

export default function WestAfricaPage() {
  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
      <div className="container py-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Repères régionaux vérifiés</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Bénin & Afrique de l'Ouest</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Les structures qui comptent pour la recherche clinique au Bénin et dans la région, décrites à partir de leurs pages officielles. Chaque encadré distingue ce qui est documenté de ce qui reste à confirmer : un mandat affiché n'est pas la preuve d'une procédure en vigueur.</p>
      </div>
    </section>
    <section className="container py-10">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-[#0d2b36] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#b7e0cf]">Bénin</span>
        <h2 className="font-serif text-2xl font-bold text-[#143c41]">Autorités et formation</h2>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {beninStructures.map(structure => <StructureCard key={structure.name} structure={structure} />)}
      </div>
      <div className="mt-10 flex items-center gap-3">
        <span className="rounded-lg bg-[#0d2b36] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#b7e0cf]">Région</span>
        <h2 className="font-serif text-2xl font-bold text-[#143c41]">Afrique de l'Ouest et partenariats</h2>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {regionalStructures.map(structure => <StructureCard key={structure.name} structure={structure} />)}
      </div>
      <div className="mt-10 flex items-center gap-3">
        <span className="rounded-lg bg-[#0d2b36] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#b7e0cf]">Patients</span>
        <h2 className="font-serif text-2xl font-bold text-[#143c41]">Expliquer dans les langues du Bénin</h2>
      </div>
      <div className="mt-5">
        <article className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#2c8271]"><Flag className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <h3 className="font-serif text-xl font-bold leading-snug text-[#143c41]">J'aime Ma Langue — voix et traduction en langues nationales</h3>
              <a href="https://www.jaimemalangue.bj/" target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#1c7566] hover:text-[#0d2b36]">jaimemalangue.bj <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
            </div>
          </div>
          <ul className="mt-4 grid gap-2">
            <li className="rounded-lg bg-[#f5f9f7] p-3 text-sm leading-6 text-[#46605b]">Projet public béninois de reconnaissance, synthèse et traduction vocales des langues nationales, avec des démonstrations en santé et un corpus ouvert.</li>
            <li className="rounded-lg bg-[#f5f9f7] p-3 text-sm leading-6 text-[#46605b]">Piste d'accessibilité pour expliquer la recherche à un patient dans la langue qu'il comprend le mieux ; site et démos vérifiés le 21 novembre 2026.</li>
          </ul>
          <p className="mt-3 flex items-start gap-2 rounded-xl border border-[#f0e2c0] bg-[#fdf7ea] p-3 text-xs leading-5 text-[#6b4f1d]">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Aucune traduction médicale automatique n'est validée : l'information et le consentement se conduisent selon le processus approuvé de l'étude, avec des personnes compétentes. L'audio aide à comprendre, il ne remplace jamais le consentement propre à l'étude.
          </p>
          <Link href="/fr/consentement-audio" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1c7566] hover:text-[#0d2b36]">Écouter le prototype d'explication audio du site <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </article>
      </div>
      <aside className="mt-10 rounded-2xl bg-[#0d2b36] p-7 text-white">
        <h2 className="font-serif text-2xl font-bold">Avant de citer une structure</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#c9ded7]">
          <li>· Vérifier le texte en vigueur, pas seulement la page de présentation : lois, décrets et arrêtés priment.</li>
          <li>· Confirmer la séquence exacte des autorisations auprès des textes actuels avant de décrire une démarche.</li>
          <li>· Ne déduire ni partenariat, ni disponibilité, ni réponse d'une adresse ou d'un formulaire publié.</li>
          <li>· Dater chaque consultation : ces pages ont été vérifiées le 23 novembre 2026.</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/fr/sources" className="inline-flex items-center gap-2 text-[#a9dac6] hover:text-white">Consulter les sources du site <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/fr/consentement-cas" className="inline-flex items-center gap-2 text-[#a9dac6] hover:text-white">Voir le consentement au Bénin, cas par cas <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </aside>
    </section>

    <section className="border-t border-[#dce9e4] bg-[#f7faf8]" aria-labelledby="wa-checklist-title">
      <div className="container py-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">En pratique</p>
        <h2 id="wa-checklist-title" className="mt-2 font-serif text-3xl font-bold text-[#143c41]">Avant de démarrer un projet : cinq vérifications concrètes</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4d6661]">Au-delà des structures à connaître, voici les contrôles qui évitent les faux départs. Cette liste n'est pas une procédure officielle : chaque point se confirme dans les textes en vigueur du pays concerné et auprès des structures elles-mêmes.</p>
        <ol className="mt-6 grid gap-3 lg:grid-cols-2">
          <li className="rounded-2xl border border-[#e2ece7] bg-white p-5">
            <p className="font-bold text-[#173f43]"><span className="mr-2 text-xs font-black uppercase tracking-wider text-[#6a8580]">1</span>Le comité d'éthique compétent</p>
            <p className="mt-2 text-sm leading-6 text-[#4d6661]">Identifier quel comité est compétent pour votre type de projet et votre site d'étude, puis vérifier dans le texte en vigueur qu'il est bien l'instance à saisir. Au Bénin, le CNERS — créé par la loi n° 2010-40 du 8 décembre 2010 — indique sur son site officiel étudier tous les protocoles de recherche en santé exécutés sur le territoire et donner l'avis éthique au ministère de la Santé ; la saisine exacte de votre projet se confirme dans les textes.</p>
          </li>
          <li className="rounded-2xl border border-[#e2ece7] bg-white p-5">
            <p className="font-bold text-[#173f43]"><span className="mr-2 text-xs font-black uppercase tracking-wider text-[#6a8580]">2</span>L'autorisation réglementaire</p>
            <p className="mt-2 text-sm leading-6 text-[#4d6661]">Déterminer si votre projet nécessite une autorisation d'une autorité nationale et laquelle. Ne pas déduire la procédure d'un autre pays ou d'un cadre européen : les exigences ne se transposent pas d'elles-mêmes.</p>
          </li>
          <li className="rounded-2xl border border-[#e2ece7] bg-white p-5">
            <p className="font-bold text-[#173f43]"><span className="mr-2 text-xs font-black uppercase tracking-wider text-[#6a8580]">3</span>L'enregistrement du protocole</p>
            <p className="mt-2 text-sm leading-6 text-[#4d6661]">Si votre projet est un essai — il assigne prospectivement des participants à une intervention liée à la santé pour en évaluer les effets — prévoyez l'enregistrement sur un registre public reconnu (registre primaire OMS/ICTRP ou ClinicalTrials.gov) au plus tard au consentement du premier participant : les revues ICMJE l'exigent. Pour les études sans intervention décidée par le chercheur, l'ICMJE encourage l'enregistrement sans l'exiger ; vérifiez les règles applicables à votre projet.</p>
          </li>
          <li className="rounded-2xl border border-[#e2ece7] bg-white p-5">
            <p className="font-bold text-[#173f43]"><span className="mr-2 text-xs font-black uppercase tracking-wider text-[#6a8580]">4</span>La protection des données</p>
            <p className="mt-2 text-sm leading-6 text-[#4d6661]">Identifier les règles applicables au pays et à la structure qui héberge les données : qui est responsable de traitement, où les données séjournent, quelles autorisations ou déclarations sont requises.</p>
          </li>
          <li className="rounded-2xl border border-[#e2ece7] bg-white p-5 lg:col-span-2">
            <p className="font-bold text-[#173f43]"><span className="mr-2 text-xs font-black uppercase tracking-wider text-[#6a8580]">5</span>Un calendrier réaliste</p>
            <p className="mt-2 text-sm leading-6 text-[#4d6661]">Construire le calendrier à partir des délais réellement constatés : demander aux équipes ayant déposé récemment leurs délais d'instruction, prévoir les allers-retours documentaires, et ne jamais promettre une date de début avant les autorisations.</p>
          </li>
        </ol>
      </div>
    </section>
  </ClinicalShell>;
}
