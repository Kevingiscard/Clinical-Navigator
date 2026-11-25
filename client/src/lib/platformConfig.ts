// Contenu configurable des pages plateforme (fonctionnalités, cas d'usage, FAQ).
// Rien ici n'est une promesse : chaque élément porte un statut honnête.
// Pour changer un contenu ou un statut, modifier ce fichier uniquement.

export type FeatureStatus = "disponible" | "demo" | "prevu";

export const statusLabels: Record<FeatureStatus, string> = {
  disponible: "Disponible",
  demo: "Démonstration, données fictives",
  prevu: "Prévu, pas encore actif",
};

export type Feature = { id: string; title: string; text: string; status: FeatureStatus; href?: string };

export const features: Feature[] = [
  { id: "orientation", title: "Orientation par situation", text: "Décrire une situation de terrain, sans donnée patient, et obtenir des repères sourcés, des délais à vérifier et les limites.", status: "disponible", href: "/fr/probleme" },
  { id: "campus", title: "Campus par niveau", text: "Apprendre du débutant à l'expert, avec une progression gardée sur l'appareil.", status: "disponible", href: "/fr/campus" },
  { id: "ateliers", title: "Ateliers sur cas fictifs", text: "Cinq cas corrigés : événement grave, consentement, déviation, dossier source, indépendance du consentement.", status: "disponible", href: "/fr/campus/ateliers" },
  { id: "essai", title: "Atelier de conception d'essai", text: "Question, design, critères de jugement, effectif indicatif, calendrier et trame de protocole.", status: "disponible", href: "/fr/concevoir-un-essai" },
  { id: "benin", title: "Repères Bénin et Afrique de l'Ouest", text: "CNERS, APDP, ABMed et autres structures, avec date de consultation et ce qui reste à confirmer.", status: "disponible", href: "/fr/afrique-ouest" },
  { id: "modeles", title: "Modèles et ressources", text: "Documents à adapter, glossaire et ressources gratuites étiquetées.", status: "disponible", href: "/fr/modeles" },
  { id: "dashboard", title: "Tableau de bord personnel", text: "Progression, derniers parcours, rappels. Local à l'appareil d'abord.", status: "prevu" },
  { id: "roles", title: "Espaces par rôle", text: "Investigateur, ARC, chef de projet, data manager, formateur, apprenant, administrateur.", status: "prevu" },
  { id: "protocole", title: "Analyse de protocole", text: "Extraction de sections et détection d'incohérences par règles, dans le navigateur. Le fichier ne quitte pas l'appareil.", status: "prevu" },
  { id: "assistant", title: "Assistant avec références", text: "Recherche dans un corpus officiel versionné, avec citation et incertitudes visibles. Aucune génération libre.", status: "prevu" },
];

export type UseCase = { role: string; goal: string; steps: string[]; href: string };

export const useCases: UseCase[] = [
  { role: "Investigateur", goal: "Savoir quoi faire quand un événement grave est découvert tard.", steps: ["Atelier événement grave", "Repères sur les délais du protocole", "Limites à faire valider"], href: "/fr/campus/ateliers" },
  { role: "ARC / CRA", goal: "Préparer une visite et vérifier la cohérence des dossiers sources.", steps: ["Cas fictifs de dossier source", "Modèles de documents", "Glossaire"], href: "/fr/modeles" },
  { role: "Chef de projet", goal: "Structurer un projet d'essai de la question au calendrier.", steps: ["Atelier de conception", "Outils de planification", "Revue de cohérence"], href: "/fr/concevoir-un-essai" },
  { role: "Formateur", goal: "Faire pratiquer une équipe sur des cas fictifs.", steps: ["Campus par niveau", "Quiz et mises en situation", "Bilan expliqué"], href: "/fr/entrainement" },
  { role: "Équipe au Bénin", goal: "Retrouver les structures à solliciter pour un projet de recherche.", steps: ["CNERS et ABMed", "APDP pour les données personnelles", "Sources avec dates"], href: "/fr/afrique-ouest" },
];

export type FreeItem = { title: string; text: string };

// Tout est gratuit.
export const freePromise = "Clinical Navigator est entièrement gratuit.";
export const freeItems: FreeItem[] = [
  { title: "Tout le contenu public", text: "Campus, ateliers, modèles, ressources, repères Bénin et Afrique de l'Ouest." },
  { title: "Sans compte", text: "Rien à créer pour apprendre, s'exercer ou consulter les sources." },
  { title: "Progression sur votre appareil", text: "Elle reste dans votre navigateur et se supprime depuis la page Mes données." },
  { title: "Mode hors ligne", text: "Les pages déjà ouvertes restent lisibles sans connexion." },
  { title: "Hébergement gratuit", text: "Le site est servi par un hébergeur gratuit. Pas de publicité et pas de vente de données." },
];

export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  { q: "Clinical Navigator donne-t-il un avis médical ou réglementaire ?", a: "Non. C'est un appui à la réflexion. Les décisions critiques demandent le protocole, les procédures de l'étude et une personne compétente." },
  { q: "Faut-il créer un compte ?", a: "Pas aujourd'hui. Tout le contenu public fonctionne sans compte. Les comptes et les rôles sont en préparation et seront d'abord en démonstration avec des données fictives." },
  { q: "Puis-je saisir des données de patients ?", a: "Non, jamais. Le site refuse les données identifiantes. Aucun hébergement de données de santé n'est en place, et cela exigerait un hébergeur certifié." },
  { q: "Y a-t-il une intelligence artificielle ?", a: "Pas d'IA générative active. Le guide actuel rapproche des contenus du site et s'abstient quand la correspondance est faible. Un assistant avec références ne sera activé qu'après un test réel." },
  { q: "D'où viennent les informations réglementaires ?", a: "Des pages officielles des autorités, avec leur date de consultation. Ce qui n'est pas confirmé est indiqué comme tel." },
  { q: "Est-ce vraiment gratuit ?", a: "Oui. Tout est gratuit." },
  { q: "Où sont stockées mes données ?", a: "Sur votre appareil (navigateur) pour la progression. Le site est servi par Tencent EdgeOne. Voir la page Mes données." },
  { q: "Comment signaler une erreur ou demander un contenu ?", a: "Via la page Contact, qui renvoie vers le suivi public du projet sur GitHub. Ne joignez aucune donnée patient." },
];
