export type ReferenceStatus =
  | "VERIFIED_CURRENT"
  | "VERIFIED_TRANSITIONAL"
  | "ADOPTED_NOT_YET_EFFECTIVE"
  | "NEEDS_REVIEW"
  | "DRAFT"
  | "OUTDATED"
  | "ARCHIVED"
  | "CONFLICTING"
  | "NOT_APPLICABLE";

export type ReferenceRecord = {
  id: string;
  title: string;
  publisher: string;
  jurisdiction: string;
  sourceType: "guideline" | "regulation" | "authority" | "methodology" | "registry";
  version: string;
  publicationDate?: string;
  effectiveDate?: string;
  verifiedAt: string;
  nextReviewAt: string;
  status: ReferenceStatus;
  official: boolean;
  scope: string;
  supersedes?: string;
  supersededBy?: string;
  sourceUrl: string;
  notes: string;
};

const verifiedAt = "2026-08-16";
const nextReviewAt = "2027-02-16";

export const referenceRegistry: ReferenceRecord[] = [
  {
    id: "ich-e6-r3",
    title: "Guideline for Good Clinical Practice E6(R3)",
    publisher: "ICH",
    jurisdiction: "International",
    sourceType: "guideline",
    version: "E6(R3)",
    publicationDate: "2025-01-06",
    effectiveDate: "2025-01-06",
    verifiedAt,
    nextReviewAt,
    status: "VERIFIED_CURRENT",
    official: true,
    scope: "Ethical and scientific quality standard for clinical trial conduct, documentation and reporting.",
    sourceUrl: "https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106.pdf",
    notes: "This is a methodological reference; national implementation and competent-authority requirements remain jurisdiction-specific.",
  },
  {
    id: "ich-e8-r1",
    title: "General Considerations for Clinical Studies E8(R1)",
    publisher: "ICH",
    jurisdiction: "International",
    sourceType: "guideline",
    version: "E8(R1)",
    publicationDate: "2022-02-04",
    effectiveDate: "2022-02-04",
    verifiedAt,
    nextReviewAt,
    status: "VERIFIED_CURRENT",
    official: true,
    scope: "Quality by design and general considerations for clinical studies.",
    sourceUrl: "https://database.ich.org/sites/default/files/E8-R1_Guideline_Step4_2022_0204%20%281%29.pdf",
    notes: "Use for educational and design support; it does not approve a protocol.",
  },
  {
    id: "ich-e9-r1",
    title: "Statistical Principles for Clinical Trials E9(R1)",
    publisher: "ICH",
    jurisdiction: "International",
    sourceType: "guideline",
    version: "E9(R1)",
    publicationDate: "2019-11-20",
    effectiveDate: "2019-11-20",
    verifiedAt,
    nextReviewAt,
    status: "VERIFIED_CURRENT",
    official: true,
    scope: "Estimands, sensitivity analysis and statistical principles for clinical trials.",
    sourceUrl: "https://database.ich.org/sites/default/files/ICH_E9-R1_Step4_Guideline_2019_1110.pdf",
    notes: "Calculations remain pedagogical and require biostatistical review.",
  },
  {
    id: "eu-ctr-536-2014",
    title: "Clinical Trials Regulation (EU) No 536/2014",
    publisher: "European Union / EMA",
    jurisdiction: "European Union",
    sourceType: "regulation",
    version: "536/2014",
    publicationDate: "2014-05-16",
    effectiveDate: "2022-01-31",
    verifiedAt,
    nextReviewAt,
    status: "VERIFIED_TRANSITIONAL",
    official: true,
    scope: "Applications and oversight for interventional clinical trials on medicinal products in the EU/EEA.",
    sourceUrl: "https://www.ema.europa.eu/en/human-regulatory-overview/research-development/clinical-trials-human-medicines/clinical-trials-regulation",
    notes: "Member State competent authorities and ethics bodies retain responsibilities; check current transition and product scope.",
  },
  {
    id: "ema-ctis",
    title: "Clinical Trials Information System",
    publisher: "European Medicines Agency",
    jurisdiction: "European Union",
    sourceType: "registry",
    version: "Portal",
    verifiedAt,
    nextReviewAt,
    status: "VERIFIED_CURRENT",
    official: true,
    scope: "Public and sponsor-facing information system supporting the EU Clinical Trials Regulation.",
    sourceUrl: "https://www.ema.europa.eu/en/human-regulatory-overview/research-development/clinical-trials-human-medicines/clinical-trials-information-system",
    notes: "A portal link is not a determination that a specific study is eligible or authorized.",
  },
  {
    id: "cnil-mr-001",
    title: "Méthodologie de référence MR-001 — recherches avec recueil du consentement",
    publisher: "CNIL",
    jurisdiction: "France",
    sourceType: "methodology",
    version: "Current page",
    verifiedAt,
    nextReviewAt,
    status: "NEEDS_REVIEW",
    official: true,
    scope: "French data-protection reference methodology for health research involving consent, subject to applicability checks.",
    sourceUrl: "https://www.cnil.fr/fr/methodologie-de-reference-mr-001-recherches-sante-avec-recueil-du-consentement",
    notes: "The current French version and applicability questionnaire prevail; do not infer compliance from a link alone.",
  },
  {
    id: "cnil-mr-003",
    title: "Méthodologie de référence MR-003 — recherches sans recueil du consentement",
    publisher: "CNIL",
    jurisdiction: "France",
    sourceType: "methodology",
    version: "Current page",
    verifiedAt,
    nextReviewAt,
    status: "NEEDS_REVIEW",
    official: true,
    scope: "French data-protection reference methodology for certain health research without consent, subject to applicability checks.",
    sourceUrl: "https://www.cnil.fr/fr/methodologies-de-reference-pour-les-recherches-en-sante-verifier-sa-conformite-aux-mr-001-et-mr-003",
    notes: "Applicability depends on the processing and the research category; local DPO/legal review remains required.",
  },
  {
    id: "who-clinical-trial-best-practices",
    title: "Guidance for best practices for clinical trials",
    publisher: "World Health Organization",
    jurisdiction: "International",
    sourceType: "guideline",
    version: "2024 guidance",
    publicationDate: "2024-09-25",
    verifiedAt,
    nextReviewAt,
    status: "VERIFIED_CURRENT",
    official: true,
    scope: "Framework for robust, ethical and well-designed clinical trial practices.",
    sourceUrl: "https://www.who.int/publications/i/item/9789240097711",
    notes: "Global guidance does not replace national legislation or ethics review.",
  },
];

export const referenceRegistryVersion = "1.0.0";
