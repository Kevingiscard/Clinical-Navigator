// Index des pages du site pour la redirection du guide embarqué.
// Chaque entrée décrit une page réelle du site ; aucun contenu n'est inventé.
export type SitePageRef = {
  route: string;
  title: string;
  description: string;
  keywords: string[];
};

export const sitePagesIndex: SitePageRef[] = [
  { route: "/fr/probleme", title: "J'ai un problème", description: "Orientation par besoin, en langage simple, quand on ne sait pas par où commencer.", keywords: ["probleme", "aide", "orientation", "bloque", "commencer", "besoin", "question"] },
  { route: "/fr/concevoir-un-essai", title: "Concevoir un essai", description: "Atelier guidé : question, objectifs, population, intervention, design, effectif, calendrier, statistiques, protocole.", keywords: ["concevoir", "design", "protocole", "effectif", "estimand", "endpoint", "population", "essai", "atelier"] },
  { route: "/fr/concevoir-un-essai/outils", title: "Outils avancés de conception", description: "Laboratoire d'outils de planification : calculs indicatifs à faire valider par un méthodologiste.", keywords: ["outils", "calcul", "effectif", "puissance", "randomisation", "planification"] },
  { route: "/fr/auditer-un-essai", title: "Auditer un essai", description: "Revue de cohérence d'un projet enregistré. Nécessite un serveur et des comptes : inactif sur l'hébergement actuel.", keywords: ["audit", "coherence", "verification", "revue", "ecart"] },
  { route: "/fr/modules", title: "Modules opérationnels", description: "Modules par domaine : réglementaire, qualité, données, sécurité, consentement.", keywords: ["modules", "reglementaire", "qualite", "donnees", "securite", "consentement", "parcours", "aec", "abmed", "cners", "soumission", "autorisation"] },
  { route: "/fr/formation", title: "Formation", description: "Apprendre par situation, du débutant à l'expert ; accès au guide embarqué.", keywords: ["formation", "apprendre", "cours", "debutant", "expert", "guide"] },
  { route: "/fr/entrainement", title: "Se tester et s'entraîner", description: "Quiz de départ, mise en situation, second quiz différent, bilan expliqué ; parcours patients et professionnels distincts.", keywords: ["quiz", "entrainement", "tester", "exercice", "bilan", "situation", "questions"] },
  { route: "/fr/consentement-cas", title: "Consentement, cas par cas", description: "Neuf situations concrètes du consentement au Bénin : exigence vérifiée, recommandation, points à valider, responsabilités.", keywords: ["consentement", "cas", "patient", "mineur", "temoin", "refus", "retrait", "benin", "cners"] },
  { route: "/fr/consentement-audio", title: "Explication audio du consentement", description: "Prototype : textes simples lus par la synthèse vocale du navigateur, sans micro ni donnée patient.", keywords: ["audio", "ecouter", "voix", "oral", "consentement", "prototype"] },
  { route: "/fr/ressources", title: "Ressources et glossaire", description: "Catalogue de ressources gratuites étiquetées et glossaire des termes.", keywords: ["ressources", "glossaire", "definition", "terme", "catalogue", "gratuit"] },
  { route: "/fr/explorer", title: "Explorer", description: "Recherche filtrée dans les contenus publiés du site.", keywords: ["explorer", "recherche", "filtrer", "contenu"] },
  { route: "/fr/veille", title: "Veille", description: "Actualité réglementaire et scientifique suivie avec dates de revue.", keywords: ["veille", "actualite", "reglementaire", "nouveaute"] },
  { route: "/fr/sources", title: "Sources", description: "Toutes les sources utilisées, avec dates de vérification et statuts.", keywords: ["sources", "references", "verification", "dates"] },
  { route: "/fr/limites", title: "Limites", description: "Ce que le site ne fait pas : ni avis médical, ni validation réglementaire, ni exhaustivité.", keywords: ["limites", "avertissement", "portee"] },
  { route: "/fr/systeme", title: "État du système", description: "Transparence : statuts des contenus, gouvernance, fonctionnement local.", keywords: ["systeme", "etat", "statut", "gouvernance", "hors ligne"] },
  { route: "/fr/mes-donnees", title: "Mes données", description: "Ce qui reste sur l'appareil et comment le supprimer.", keywords: ["donnees", "vie privee", "supprimer", "local", "confidentialite"] },
  { route: "/fr/soutenir", title: "Soutenir le projet", description: "Comment soutenir Clinical Navigator.", keywords: ["soutenir", "don", "sponsor"] },
  { route: "/fr/auteur", title: "À propos du créateur", description: "Parcours et expertise de Kevin HOUNSINOU.", keywords: ["auteur", "createur", "kevin", "contact", "apropos"] },
  { route: "/fr/tableau-de-bord", title: "Mon tableau de bord", description: "Progression du campus, pages vues et travaux en cours, gardés sur cet appareil.", keywords: ["tableau de bord", "progression", "dashboard", "avancement", "suivi"] },
  { route: "/fr/plateforme", title: "La plateforme", description: "Fonctionnalités et cas d'usage par rôle, avec le statut réel de chaque fonction.", keywords: ["plateforme", "fonctionnalites", "cas d'usage", "roles", "produit"] },
  { route: "/fr/gratuit", title: "Gratuit", description: "Tout est gratuit, sans compte obligatoire.", keywords: ["gratuit", "free", "prix"] },
  { route: "/fr/faq", title: "Questions fréquentes", description: "Réponses courtes sur les limites, les comptes, les données et l'IA.", keywords: ["faq", "questions", "aide", "comptes", "ia"] },
  { route: "/fr/campus", title: "Campus", description: "Apprendre par niveau, s'exercer sur des cas fictifs et construire un projet de A à Z, avec progression locale.", keywords: ["campus", "apprendre", "exercer", "construire", "parcours", "projet", "etapes", "quiz", "cas fictifs"] },
  { route: "/fr/campus/ateliers", title: "Ateliers pratiques", description: "Cinq cas fictifs corrigés : événement grave, consentement, déviation, dossier source, indépendance du consentement.", keywords: ["ateliers", "cas fictifs", "exercices", "consentement", "deviation", "evenement grave", "bonnes pratiques"] },
  { route: "/fr/afrique-ouest", title: "Bénin & Afrique de l'Ouest", description: "Structures, autorités et repères réglementaires vérifiés : CNERS, ABMed, FSS, OOAS, Pasteur Dakar, EDCTP.", keywords: ["benin", "afrique", "cners", "abmed", "ethique", "autorisation", "ooas", "cedeao", "pasteur", "edctp", "reglementaire", "soumission"] },
  { route: "/fr/plan-du-site", title: "Plan du site", description: "Toutes les pages du site, regroupées par rubrique.", keywords: ["plan", "sommaire", "pages", "navigation", "reperer"] },
];
