// Filtre du glossaire par rôle. Repère de lecture éditorial : il indique où un terme est le plus souvent utile,
// pas qui "doit" le connaître. Les définitions elles-mêmes restent celles du glossaire existant.
export const glossaryRoleFilters = [
  { id: "investigateur", label: "Investigateur" },
  { id: "arc", label: "ARC / CRA" },
  { id: "chef-projet", label: "Chef de projet" },
  { id: "data-manager", label: "Data manager" },
  { id: "formateur", label: "Formateur" },
  { id: "apprenant", label: "Apprenant" },
  { id: "benin", label: "Équipe au Bénin" },
  { id: "admin", label: "Administrateur du site" },
] as const;

const A = "investigateur arc chef-projet data-manager formateur apprenant benin admin";
const map: Record<string, string> = {
  AE: "investigateur arc apprenant benin", SAE: "investigateur arc apprenant benin", SUSAR: "investigateur arc chef-projet apprenant",
  ARC: "arc chef-projet apprenant", CRA: "arc chef-projet apprenant", CRC: "investigateur arc apprenant benin", TEC: "arc chef-projet apprenant",
  GCP: A, CAPA: "investigateur arc chef-projet formateur", CRF: "investigateur arc data-manager apprenant", eCRF: "investigateur arc data-manager",
  DCF: "arc data-manager", IWRS: "chef-projet data-manager", IVRS: "chef-projet data-manager", SDV: "arc data-manager apprenant", SDR: "arc apprenant",
  RBM: "arc chef-projet data-manager", QTL: "chef-projet data-manager", IRB: "investigateur chef-projet benin apprenant", IEC: "investigateur chef-projet benin apprenant",
  SOP: "investigateur arc chef-projet formateur admin", "Promoteur": "investigateur arc chef-projet apprenant benin", "Investigateur": "investigateur arc apprenant benin",
  Monitoring: "investigateur arc chef-projet apprenant", Audit: "investigateur arc chef-projet admin", Inspection: "investigateur arc chef-projet benin",
  "Déviation": "investigateur arc chef-projet formateur apprenant", Randomisation: "investigateur data-manager apprenant", Aveugle: "investigateur data-manager apprenant",
  Washout: "investigateur apprenant", Endpoint: "chef-projet data-manager apprenant", Screening: "investigateur arc apprenant", Inclusion: "investigateur arc chef-projet apprenant benin",
  "Follow-up": "investigateur arc apprenant", "Data lock": "data-manager chef-projet", "Audit trail": "arc data-manager admin", Amendement: "investigateur arc chef-projet benin",
  Version: "arc chef-projet data-manager admin", "Réconciliation": "data-manager arc", Accountability: "investigateur arc", Excursion: "investigateur arc",
  Cluster: "chef-projet data-manager apprenant", "Step-wedge": "chef-projet data-manager apprenant", "Master protocol": "chef-projet apprenant", "Basket trial": "chef-projet apprenant",
  "Umbrella trial": "chef-projet apprenant", "Platform trial": "chef-projet apprenant", Pseudonymisation: "data-manager admin benin chef-projet",
  "Minimisation des données": "data-manager admin benin chef-projet", "Juridiction": "chef-projet benin admin investigateur",
};
export const rolesForTerm = (term: string): string[] => (map[term] ?? "").split(" ").filter(Boolean);
