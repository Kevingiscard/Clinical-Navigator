// Boîte à termes FR / fongbe. Les cases fongbe sont volontairement non remplies : aucune traduction
// n'est publiée tant qu'une personne qualifiée (locuteur du fongbe, formée à la traduction médicale) ne l'a pas fournie et relue.
export type TermRow = { fr: string; plain: string };
export const termBox: TermRow[] = [
  { fr: "Consentement", plain: "L'accord libre d'une personne, donné après avoir compris l'information." },
  { fr: "Participer librement", plain: "On peut dire non, sans conséquence sur ses soins." },
  { fr: "Se retirer de l'étude", plain: "On peut arrêter à tout moment, sans avoir à se justifier." },
  { fr: "Recherche", plain: "Une étude pour mieux connaître une maladie ou un traitement." },
  { fr: "Traitement testé", plain: "Le produit ou la méthode que l'étude veut évaluer." },
  { fr: "Tirage au sort", plain: "Le hasard décide qui reçoit quel traitement." },
  { fr: "Effet indésirable", plain: "Un problème de santé qui peut apparaître pendant l'étude." },
  { fr: "Événement grave", plain: "Un problème sérieux, par exemple une hospitalisation, à signaler tout de suite à l'équipe." },
  { fr: "Risque", plain: "Ce qui pourrait mal se passer." },
  { fr: "Bénéfice possible", plain: "Ce que la personne pourrait en retirer, sans promesse." },
  { fr: "Confidentialité", plain: "Les informations personnelles ne sont pas montrées à n'importe qui." },
  { fr: "Comité d'éthique", plain: "Un groupe indépendant qui examine l'étude pour protéger les participants." },
  { fr: "Témoin impartial", plain: "Une personne sans lien avec l'étude, présente quand l'information est donnée oralement." },
  { fr: "Prise de sang", plain: "Un prélèvement de sang, avec le nombre de prélèvements et leur but expliqués." },
  { fr: "Qui contacter", plain: "La personne de l'équipe et le numéro à appeler en cas de question ou de problème." },
];
export const FONGBE_PENDING = "À faire traduire et relire";
export const translationSteps = [
  "Choisir un traducteur qui parle le fongbe et connaît le vocabulaire de la santé.",
  "Faire une seconde traduction, vers le français, par une autre personne qui n'a pas vu l'original (double traduction).",
  "Comparer, corriger les écarts de sens, puis faire relire par une personne de l'équipe et, si possible, par un membre de la communauté concernée.",
  "Tester à l'oral sur quelques personnes : comprennent-elles ce qu'elles acceptent ou refusent ?",
  "Soumettre la version au comité d'éthique concerné avec le reste du dossier, et ne l'utiliser qu'après son avis.",
];
