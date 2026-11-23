import { ClinicalShell } from "@/components/ClinicalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Users, Scale, CheckCircle2, HelpCircle, UserCheck } from "lucide-react";
import { Link } from "wouter";

type CaseBlock = {
  id: string;
  title: string;
  patients: string;
  exigence: string;
  recommandation: string;
  validation: string;
  responsabilites: string;
};

const cases: CaseBlock[] = [
  {
    id: "pedagogie",
    title: "Expliquer la recherche en général, sans étude précise",
    patients: "Des explications générales sur la recherche peuvent être données librement. Elles ne concernent aucune étude précise et ne vous demandent aucune décision.",
    exigence: "Aucune autorisation spécifique n'a été identifiée dans les sources vérifiées pour une pédagogie générale sans collecte de données personnelles. Ce constat ne vaut pas exonération générale : il est limité aux sources consultées le 21/11/2026.",
    recommandation: "Indiquer clairement que le contenu est général, qu'il ne remplace ni la lettre d'information d'une étude ni l'avis d'un professionnel, et ne collecter aucune donnée personnelle.",
    validation: "Relecture médicale et linguistique par des professionnels compétents. Aucune autorité formelle spécifique n'est identifiée pour ce contenu général ; cela ne dispense pas de la fiabilité du contenu.",
    responsabilites: "L'auteur et l'éditeur du contenu pédagogique.",
  },
  {
    id: "etude",
    title: "Expliquer le consentement d'une étude précise",
    patients: "L'explication d'une étude précise fait partie du processus officiel de cette étude. Seuls les documents validés pour cette étude doivent être utilisés par son équipe.",
    exigence: "Loi n° 2010-40, art. 26 : avant la recherche, la personne doit connaître l'objectif, la méthodologie, la durée, les résultats attendus, les contraintes, les risques prévisibles et l'avis du comité d'éthique (CNERS) ; le consentement est libre, éclairé et exprès, donné par écrit ou, en cas d'impossibilité, attesté par un tiers totalement indépendant du chercheur et du promoteur. Art. 24 : direction par un chercheur qualifié. Pour les essais relevant de l'ABMed (EC-LD-0001 v1, §1.2.2) : documents en français, et tout document dans une autre langue fourni avec une traduction certifiée conforme en français ; le formulaire de consentement et toutes les traductions applicables font partie des documents essentiels du dossier.",
    recommandation: "Intégrer tout texte d'explication, y compris ses versions en langues nationales, au dossier de l'étude validé par l'instance d'éthique, puis l'ABMed selon le champ de l'essai.",
    validation: "Instance d'éthique compétente (au Bénin, le CNERS, loi 2010-40 art. 43 et suivants) et, pour les essais relevant de son champ (loi 2021-03, art. 80), l'ABMed.",
    responsabilites: "Le promoteur et l'investigateur (loi 2010-40, art. 26 et 29 : assurance responsabilité civile du promoteur).",
  },
  {
    id: "langue",
    title: "Quand la personne ne lit pas le français ou préfère une autre langue",
    patients: "Vous pouvez demander une explication dans la langue que vous comprenez le mieux, et l'aide d'une personne de confiance. Comprendre est un droit, pas une faveur.",
    exigence: "Loi n° 2010-40, art. 21 : le consentement est « éclairé » lorsque la personne comprend le but et la nature de la recherche, les obligations et les risques et avantages possibles. La loi n'impose pas de langue précise pour l'entretien ; elle exige la compréhension. ABMed EC-LD-0001 §1.9.1 : l'analphabétisme et la barrière linguistique sont des situations de vulnérabilité qui imposent des mesures renforcées (information adaptée, témoin impartial, retrait sans conséquence).",
    recommandation: "Prévoir des supports dans les langues comprises par les participants et vérifier la compréhension par des questions ouvertes. Pour les documents soumis dans un essai ABMed : français avec traductions certifiées conformes.",
    validation: "Relecture linguistique et médicale des supports par des professionnels compétents ; validation des documents dans le dossier de l'étude. Incertitude assumée : aucune exigence béninoise expresse n'a été identifiée sur la langue orale de l'entretien ; l'exigence porte sur la compréhension.",
    responsabilites: "L'investigateur, qui doit s'assurer que la personne a réellement compris avant de recueillir son consentement.",
  },
  {
    id: "mineurs",
    title: "Mineurs",
    patients: "Pour un enfant, ce sont ses parents ou son représentant légal qui donnent le consentement. L'étude doit viser un bénéfice direct pour sa santé, sauf exceptions très encadrées.",
    exigence: "Loi n° 2010-40, art. 27 : les mineurs ne peuvent être sollicités que si l'on peut attendre un bénéfice direct pour leur santé, après avis du père et/ou de la mère, du tuteur ou du curateur ; des recherches sans bénéfice individuel direct restent possibles seulement si elles ne présentent aucun risque sérieux prévisible, sont utiles à des personnes de mêmes caractéristiques et ne peuvent être réalisées autrement. Art. 28 : le consentement est donné par les titulaires de l'autorité parentale (mineurs non émancipés), par le représentant légal pour les recherches avec bénéfice direct sans risque sérieux prévisible, ou par le tuteur autorisé par le conseil de famille ou le juge des tutelles dans les autres cas.",
    recommandation: "Expliquer aussi à l'enfant, avec des mots adaptés à son âge, et noter son accord lorsqu'il peut l'exprimer, sans que cela remplace le consentement du représentant légal.",
    validation: "Instance d'éthique (CNERS) et ABMed selon le champ de l'essai ; justification spécifique de l'inclusion de mineurs dans le dossier.",
    responsabilites: "Le promoteur, l'investigateur et les titulaires de l'autorité parentale ou le représentant légal.",
  },
  {
    id: "incapacite",
    title: "Majeurs protégés ou personnes dont la capacité est limitée",
    patients: "Si une personne ne peut pas décider seule, c'est son représentant légal qui donne le consentement, avec les mêmes protections que pour les mineurs.",
    exigence: "Loi n° 2010-40, art. 27 et 28 : mêmes règles que pour les mineurs (bénéfice direct sauf conditions strictes ; consentement par le représentant légal ou le tuteur autorisé). ABMed EC-LD-0001 §1.9.1 : obtenir, le cas échéant, l'autorisation du représentant légal lorsque la capacité juridique du participant est limitée.",
    recommandation: "Associer la personne à la décision autant que possible, avec des explications adaptées, et respecter toute opposition qu'elle exprime.",
    validation: "Instance d'éthique et, selon le champ, ABMed ; vérification du mandat du représentant (loi 2010-40, art. 20 pour les personnes mandatées).",
    responsabilites: "Le promoteur, l'investigateur et le représentant légal.",
  },
  {
    id: "temoin",
    title: "Interprète et témoin impartial",
    patients: "Si vous ne lisez pas ou si le document n'est pas dans votre langue, une personne indépendante de l'équipe peut être présente pour confirmer que l'explication vous a bien été donnée.",
    exigence: "Loi n° 2010-40, art. 26 : « Le consentement est donné par écrit ou, en cas d'impossibilité, attesté par un tiers. Ce dernier doit être totalement indépendant du chercheur et du promoteur. » Le recours au tiers est prévu quand l'écrit est impossible ; ce n'est pas une forme libre de consentement oral. ABMed EC-LD-0001 §1.9.1 : présence d'un témoin impartial pour la procédure de consentement parmi les mesures renforcées pour les personnes vulnérables.",
    recommandation: "Choisir un témoin qui comprend la langue de la personne et n'a aucun lien avec l'équipe de recherche ; le faire assister à tout l'entretien, pas seulement à la signature (aligné sur les bonnes pratiques cliniques ICH E6(R3)).",
    validation: "Le processus prévu (témoin, interprète) doit être décrit dans le dossier validé par l'instance d'éthique et, selon le champ, par l'ABMed.",
    responsabilites: "L'investigateur (choix et présence du témoin) ; le témoin atteste de l'information donnée, il ne consent pas à la place de la personne.",
  },
  {
    id: "refus",
    title: "Refus et retrait à tout moment",
    patients: "Vous pouvez refuser de participer ou arrêter à tout moment, sans donner de raison, et sans perdre vos soins habituels. Personne ne peut vous menacer pour cela.",
    exigence: "Loi n° 2010-40, art. 21 : « Le refus d'une participation individuelle à une telle recherche doit être libre et respecté. » Art. 26 : le chercheur informe la personne « de son droit de refuser de participer à la recherche ou de retirer son adhésion à tout moment sans encourir aucune menace ». ABMed EC-LD-0001 §1.9.1 : possibilité de retrait sans conséquence et absence de représailles en cas de refus.",
    recommandation: "Répéter cette liberté à chaque étape importante de l'étude, pas seulement à la signature.",
    validation: "Aucune validation spécifique identifiée ; c'est une exigence permanente du processus, contrôlée par l'instance d'éthique.",
    responsabilites: "L'investigateur et toute l'équipe de l'étude.",
  },
  {
    id: "donnees",
    title: "Audio, enregistrements, traductions et données personnelles",
    patients: "Une explication audio ne doit pas vous enregistrer. Vos informations personnelles et de santé sont protégées par la loi.",
    exigence: "Loi n° 2017-20 (code du numérique, modifiée par la loi n° 2020-35) : un enregistrement vocal est une donnée personnelle lorsqu'il permet d'identifier une personne ou se rapporte à une personne identifiable ; le traitement des données de santé et des données biométriques visant à identifier une personne de manière unique est interdit sauf exceptions encadrées (art. 394 de la version 2018 ; numérotation consolidée à vérifier), sous le contrôle de l'APDP, avec déclaration ou autorisation préalable selon le cas (art. 405 et 407 ; dispenses art. 410). La collecte de données sensibles hors conditions légales est un manquement grave (art. 453).",
    recommandation: "Rester sans collecte : pas de micro, pas d'enregistrement du patient, pas de formulaire patient. Garder en tête que l'hébergement conserve des journaux techniques de connexion et que la voix de synthèse peut passer par un service du système selon l'appareil (localisation non garantie). Vérifier les droits avant d'utiliser des modèles vocaux externes : le corpus J'aime Ma Langue est ouvert sous licence CC-BY-SA-4.0, mais ses modèles ne sont pas publiés sous licence identifiable à ce jour.",
    validation: "Formalités APDP dès qu'un traitement de données personnelles est ajouté ; l'autorisation APDP n'exonère pas de la responsabilité envers les tiers (art. 407).",
    responsabilites: "Le responsable de traitement du dispositif ; pour une étude, le promoteur.",
  },
  {
    id: "connexes",
    title: "Points liés : contrepartie, examen médical préalable, recherches simultanées",
    patients: "On ne peut pas vous payer pour participer (seuls vos frais peuvent être remboursés). Un examen médical est prévu avant votre décision, et vous ne pouvez pas participer en même temps à plusieurs recherches sans bénéfice pour vous.",
    exigence: "Loi n° 2010-40, art. 30 : aucune contrepartie financière directe ou indirecte, hormis le remboursement des frais et sous réserve de dispositions particulières du CNERS. Art. 31 : examen médical préalable par un médecin agréé par le CNERS, résultats communiqués à la personne avant l'expression de son consentement. Art. 32 : nul ne peut se prêter simultanément à plusieurs recherches sans bénéfice individuel direct.",
    recommandation: "Inclure ces points dans l'explication donnée avant la décision.",
    validation: "Instance d'éthique (CNERS) dans le cadre du dossier de l'étude.",
    responsabilites: "Le promoteur et l'investigateur.",
  },
];

const proSections: { key: keyof Pick<CaseBlock, "exigence" | "recommandation" | "validation" | "responsabilites">; label: string; icon: typeof Scale }[] = [
  { key: "exigence", label: "Exigence légale vérifiée", icon: Scale },
  { key: "recommandation", label: "Recommandation pratique", icon: CheckCircle2 },
  { key: "validation", label: "Validation et incertitudes", icon: HelpCircle },
  { key: "responsabilites", label: "Responsabilités", icon: UserCheck },
];

export default function ConsentCasesPage() {
  return <ClinicalShell>
    <section className="border-b border-[#dce9e4] bg-[#edf5f1]">
      <div className="container max-w-4xl py-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#365f56]">Consentement · Bénin</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#0d2b36]">Chaque cas de figure, expliqué</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[#526b67]">Les situations concrètes autour du consentement, une par une : pour chaque cas, ce que la règle vérifiée exige, ce qui est recommandé, ce qui reste à valider et qui est responsable. Sources officielles béninoises vérifiées le 21/11/2026 ; ce cadre ne prétend pas couvrir tous les pays ni toutes les situations.</p>
      </div>
    </section>
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Alert className="mb-8 border-[#f0d9b5] bg-[#fdf6e9] text-[#6b4a1b]">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Orientation documentaire, pas un avis juridique</AlertTitle>
        <AlertDescription>Cette page distingue pour chaque cas l'exigence légale vérifiée dans une source officielle, la recommandation pratique et ce qui reste à valider. Chaque étude et chaque pays exige une vérification propre. Un avertissement affiché ne remplace aucune des validations indiquées.</AlertDescription>
      </Alert>
      <div className="grid gap-6">
        {cases.map((c, index) => (
          <article key={c.id} id={c.id} className="rounded-2xl border border-[#d8e7e1] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#11373d]"><span className="mr-2 text-[#207666]">{index + 1}.</span>{c.title}</h2>
            <div className="mt-4 rounded-xl bg-[#edf5f1] p-4">
              <p className="flex items-start gap-2 text-sm leading-6 text-[#264b4c]"><Users className="mt-1 h-4 w-4 shrink-0 text-[#207666]" /><span><strong>Pour les patients :</strong> {c.patients}</span></p>
            </div>
            <dl className="mt-4 grid gap-3">
              {proSections.map(({ key, label, icon: Icon }) => (
                <div key={key} className="text-sm leading-6 text-[#536d67]">
                  <dt className="flex items-center gap-2 font-semibold text-[#264b4c]"><Icon className="h-4 w-4 text-[#207666]" />{label}</dt>
                  <dd className="mt-1 pl-6">{c[key]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <p className="mt-6 text-xs [overflow-wrap:anywhere] leading-5 text-[#718682]">Sources datées du 21/11/2026 : loi n° 2010-40, art. 20 à 32 et 43 et suivants (https://sgg.gouv.bj/doc/loi-2010-40/download) ; lignes directrices ABMed EC-LD-0001 v1, §1.2.2 et §1.9.1 (https://abmed.bj/lirePDF/c8e5bd19-8591-4079-bcb7-c4485be766db) ; loi n° 2017-20 modifiée par la loi n° 2020-35 et guide APDP (https://apiprod.apdp.bj/storage/981ba962bcdcc7a77b21b05e784b69e1/GUIDE-DE-MISE-EN-CONFORMITE_Pt_YD_revu.pdf) ; corpus J'aime Ma Langue (https://huggingface.co/datasets/JaimeMaLangue/JML-fon-speech-v1). Détail et citations complètes dans docs/consentement-cas-de-figure.md. Voir aussi la page <Link className="underline" href="/fr/consentement-audio">Explication audio du consentement</Link>.</p>
    </section>
  </ClinicalShell>;
}
