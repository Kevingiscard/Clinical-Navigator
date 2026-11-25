// Structure centrale de navigation du site : rubriques, pages, fil d'Ariane et plan du site.
// Chaque entrée renvoie vers une route réelle déclarée dans App.tsx ; aucune destination n'est inventée.
// Les libellés courts passent par i18n (clés labelKey) ; les descriptions restent en français,
// langue de rédaction des pages elles-mêmes.

export type NavItem = {
  href: string;
  labelKey: string;
  description: string;
  inactive?: boolean; // fonction inactive sur l'instance statique actuelle
};

export type NavGroup = {
  id: string;
  labelKey: string;
  tagline: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    id: "travailler",
    labelKey: "navWork",
    tagline: "Agir sur une situation, un projet ou un protocole.",
    items: [
      { href: "/fr/probleme", labelKey: "problem", description: "Être orienté pas à pas à partir d'une situation décrite simplement." },
      { href: "/fr/concevoir-un-essai", labelKey: "design", description: "Atelier guidé : question, design, effectif, calendrier, protocole." },
      { href: "/fr/concevoir-un-essai/outils", labelKey: "tools", description: "Laboratoire de planification ; calculs indicatifs à faire valider." },
      { href: "/fr/auditer-un-essai", labelKey: "audit", description: "Revue de cohérence d'un projet enregistré.", inactive: true },
    ],
  },
  {
    id: "apprendre",
    labelKey: "navLearn",
    tagline: "Comprendre, progresser par niveau et se tester.",
    items: [
      { href: "/fr/campus", labelKey: "campus", description: "Apprendre par niveau, s'exercer sur cas fictifs, construire un projet pas à pas." },
      { href: "/fr/formation", labelKey: "training", description: "Parcours progressif du débutant à l'expert, avec guide embarqué." },
      { href: "/fr/entrainement", labelKey: "trainingQuiz", description: "Quiz, mises en situation et bilan expliqué, patients et professionnels." },
      { href: "/fr/explorer", labelKey: "explore", description: "Recherche filtrée dans tous les scénarios publiés." },
      { href: "/fr/modules", labelKey: "modules", description: "Modules opérationnels par domaine, du consentement aux données." },
      { href: "/fr/essais-complexes", labelKey: "complex", description: "Step-wedge, cross-over, cluster, adaptatifs, master protocols." },
    ],
  },
  {
    id: "ressources",
    labelKey: "navResources",
    tagline: "Documents, références et outils gratuits à adapter.",
    items: [
      { href: "/fr/ressources", labelKey: "resources", description: "Catalogue de ressources gratuites étiquetées et glossaire." },
      { href: "/fr/modeles", labelKey: "templates", description: "Modèles de documents prêts à adapter, avec exemple rempli." },
      { href: "/fr/consentement-cas", labelKey: "consentCases", description: "Neuf situations concrètes du consentement au Bénin." },
      { href: "/fr/consentement-audio", labelKey: "consentAudio", description: "Explication audio par la synthèse vocale du navigateur." },
      { href: "/fr/veille", labelKey: "research", description: "Actualité réglementaire et scientifique, avec dates de revue." },
      { href: "/fr/afrique-ouest", labelKey: "westAfrica", description: "Structures, autorités et repères réglementaires au Bénin et dans la région." },
    ],
  },
  {
    id: "reference",
    labelKey: "navReference",
    tagline: "Sources, limites et transparence du projet.",
    items: [
      { href: "/fr/sources", labelKey: "sources", description: "Toutes les sources utilisées, statuts et dates de vérification." },
      { href: "/fr/limites", labelKey: "limits", description: "Ce que le site ne fait pas, explicitement." },
      { href: "/fr/comment-ca-marche", labelKey: "howItWorks", description: "Fonctionnement local, contenus versionnés, mode hors ligne." },
      { href: "/fr/systeme", labelKey: "system", description: "Transparence : statuts des contenus et gouvernance." },
      { href: "/fr/auteur", labelKey: "author", description: "Parcours et expertise du créateur." },
      { href: "/fr/plan-du-site", labelKey: "sitemap", description: "Toutes les pages du site, regroupées par rubrique." },
    ],
  },
];

export type Crumb = { label: string; href?: string };

// Pages hors rubriques principales : libellé direct et parent logique pour le fil d'Ariane.
const extraRoutes: Record<string, { label: string; parent?: string }> = {
  "/fr/scenarios": { label: "Scénarios", parent: "/fr/explorer" },
  "/fr/guides": { label: "Guides", parent: "/fr/explorer" },
  "/fr/mentions-legales": { label: "Mentions légales" },
  "/fr/conditions": { label: "Conditions d'utilisation" },
  "/fr/confidentialite": { label: "Confidentialité" },
  "/fr/a-propos": { label: "À propos" },
  "/fr/soutenir": { label: "Soutenir le projet" },
  "/fr/contact": { label: "Contact" },
  "/fr/plateforme": { label: "La plateforme" },
  "/fr/gratuit": { label: "Gratuit" },
  "/fr/faq": { label: "Questions fréquentes" },
  "/fr/mes-donnees": { label: "Mes données" },
  "/fr/mes-cas": { label: "Mes cas" },
  "/fr/favoris": { label: "Favoris" },
  "/fr/mon-espace": { label: "Mon espace" },
  "/fr/knowledge": { label: "Tableau de connaissances", parent: "/fr/formation" },
  "/fr/diagnostic": { label: "Diagnostic", parent: "/fr/systeme" },
  "/fr/admin": { label: "Administration" },
};

// Alias de routes pointant vers une page de rubrique (ex. /fr/scenarios -> page Explorer).
const aliasTargets: Record<string, string> = {
  "/fr/scenarios": "/fr/explorer",
  "/fr/guides": "/fr/explorer",
};

export function normalizePath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

function findNavItem(path: string): { group: NavGroup; item: NavItem } | null {
  const target = aliasTargets[path] ?? path;
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.href === target) return { group, item };
    }
  }
  return null;
}

function labelForPath(path: string, translate: (key: string) => string): string | null {
  const found = findNavItem(path);
  if (found) return translate(found.item.labelKey);
  const extra = extraRoutes[path];
  if (extra) return extra.label;
  return null;
}

// Construit le fil d'Ariane d'une page. Renvoie null sur l'accueil, où il n'apporte rien.
// translate fournit les libellés de navigation ; les segments inconnus gardent un libellé générique.
export function breadcrumbFor(path: string, translate: (key: string) => string): Crumb[] | null {
  const clean = normalizePath(path);
  if (clean === "/") return null;
  const crumbs: Crumb[] = [{ label: translate("home"), href: "/" }];

  const direct = findNavItem(clean);
  if (direct) {
    crumbs.push({ label: translate(direct.group.labelKey) });
    crumbs.push({ label: translate(direct.item.labelKey) });
    return crumbs;
  }

  // Sous-pages paramétrées : /fr/modules/<slug>, /fr/modeles/<id>, /fr/scenarios/<slug>, /fr/guides/<slug>, /fr/admin/<section>.
  const segments = clean.split("/").filter(Boolean);
  if (segments.length >= 3) {
    const parentPath = `/${segments[0]}/${segments[1]}`;
    const parentLabel = labelForPath(parentPath, translate);
    if (parentLabel) {
      const parent = findNavItem(parentPath);
      if (parent) crumbs.push({ label: translate(parent.group.labelKey) });
      crumbs.push({ label: parentLabel, href: parentPath });
      const detailLabels: Record<string, string> = {
        "/fr/modules": "Module",
        "/fr/modeles": "Modèle",
        "/fr/scenarios": "Scénario",
        "/fr/guides": "Guide",
        "/fr/admin": "Section",
      };
      crumbs.push({ label: detailLabels[parentPath] ?? "Détail" });
      return crumbs;
    }
  }

  const extra = extraRoutes[clean];
  if (extra) {
    if (extra.parent) {
      const parent = findNavItem(extra.parent);
      if (parent) crumbs.push({ label: translate(parent.group.labelKey) });
      const parentLabel = labelForPath(extra.parent, translate);
      if (parentLabel) crumbs.push({ label: parentLabel, href: extra.parent });
    }
    crumbs.push({ label: extra.label });
    return crumbs;
  }

  // Page connue sans rubrique : accroche minimale pour garder un repère.
  crumbs.push({ label: segments[segments.length - 1] ?? clean });
  return crumbs;
}
