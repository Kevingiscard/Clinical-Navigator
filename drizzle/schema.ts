import { boolean, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const contentStatusValues = ["VERIFIED", "NEEDS_REVIEW", "OUTDATED", "DRAFT", "ARCHIVED"] as const;
export const priorityValues = ["CRITIQUE", "HAUTE", "NORMALE", "FAIBLE"] as const;

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const jurisdictions = mysqlTable("jurisdictions", {
  id: int("id").autoincrement().primaryKey(), slug: varchar("slug", { length: 100 }).notNull().unique(), name: varchar("name", { length: 160 }).notNull(),
  scope: text("scope"), status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(),
  lastVerifiedAt: timestamp("lastVerifiedAt"), nextReviewAt: timestamp("nextReviewAt"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const authorities = mysqlTable("authorities", {
  id: int("id").autoincrement().primaryKey(), jurisdictionId: int("jurisdictionId"), name: varchar("name", { length: 200 }).notNull(), websiteUrl: varchar("websiteUrl", { length: 1000 }),
  status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const sources = mysqlTable("sources", {
  id: int("id").autoincrement().primaryKey(), externalId: varchar("externalId", { length: 128 }).notNull().unique(), title: varchar("title", { length: 400 }).notNull(), publisher: varchar("publisher", { length: 240 }).notNull(),
  sourceUrl: varchar("sourceUrl", { length: 1000 }).notNull(), jurisdiction: varchar("jurisdiction", { length: 160 }).notNull(), versionLabel: varchar("versionLabel", { length: 160 }),
  publishedAt: timestamp("publishedAt"), verifiedAt: timestamp("verifiedAt"), nextReviewAt: timestamp("nextReviewAt"), isOfficial: boolean("isOfficial").default(false).notNull(),
  status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), scope: text("scope"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(), sourceId: int("sourceId"), title: varchar("title", { length: 400 }).notNull(), category: varchar("category", { length: 120 }).notNull(),
  documentUrl: varchar("documentUrl", { length: 1000 }), contentSummary: text("contentSummary"), versionLabel: varchar("versionLabel", { length: 160 }), status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(),
  publishedAt: timestamp("publishedAt"), verifiedAt: timestamp("verifiedAt"), reviewAt: timestamp("reviewAt"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const modules = mysqlTable("modules", {
  id: int("id").autoincrement().primaryKey(), slug: varchar("slug", { length: 120 }).notNull().unique(), title: varchar("title", { length: 180 }).notNull(), summary: text("summary"),
  icon: varchar("icon", { length: 80 }), position: int("position").default(0).notNull(), status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const scenarios = mysqlTable("scenarios", {
  id: int("id").autoincrement().primaryKey(), slug: varchar("slug", { length: 160 }).notNull().unique(), title: varchar("title", { length: 300 }).notNull(), description: text("description"), category: varchar("category", { length: 120 }).notNull(),
  severity: mysqlEnum("severity", priorityValues).default("NORMALE").notNull(), jurisdiction: varchar("jurisdiction", { length: 160 }).default("International / à préciser").notNull(),
  roleTags: json("roleTags"), studyTypeTags: json("studyTypeTags"), phaseTags: json("phaseTags"), keywordTags: json("keywordTags"), versionLabel: varchar("versionLabel", { length: 80 }).notNull(),
  status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), effectiveAt: timestamp("effectiveAt"), reviewAt: timestamp("reviewAt"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const workflows = mysqlTable("workflows", {
  id: int("id").autoincrement().primaryKey(), scenarioId: int("scenarioId").notNull(), workflowId: varchar("workflowId", { length: 128 }).notNull().unique(), versionLabel: varchar("versionLabel", { length: 80 }).notNull(),
  status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), jurisdiction: varchar("jurisdiction", { length: 160 }).default("International / à préciser").notNull(), sourceIds: json("sourceIds"), effectiveAt: timestamp("effectiveAt"), reviewAt: timestamp("reviewAt"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const workflowNodes = mysqlTable("workflowNodes", {
  id: int("id").autoincrement().primaryKey(), workflowId: int("workflowId").notNull(), nodeKey: varchar("nodeKey", { length: 128 }).notNull(), nodeType: varchar("nodeType", { length: 64 }).notNull(), question: text("question"),
  answers: json("answers"), conditions: json("conditions"), nextNodeKey: varchar("nextNodeKey", { length: 128 }), action: text("action"), severity: mysqlEnum("severity", priorityValues), sourceIds: json("sourceIds"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const actions = mysqlTable("actions", {
  id: int("id").autoincrement().primaryKey(), scenarioId: int("scenarioId").notNull(), title: varchar("title", { length: 300 }).notNull(), detail: text("detail").notNull(), actionOrder: int("actionOrder").default(0).notNull(), actorRole: varchar("actorRole", { length: 160 }), sourceIds: json("sourceIds"), status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const checklists = mysqlTable("checklists", {
  id: int("id").autoincrement().primaryKey(), scenarioId: int("scenarioId"), slug: varchar("slug", { length: 160 }).notNull().unique(), title: varchar("title", { length: 300 }).notNull(), items: json("items").notNull(), versionLabel: varchar("versionLabel", { length: 80 }).notNull(), status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), reviewAt: timestamp("reviewAt"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const examples = mysqlTable("examples", {
  id: int("id").autoincrement().primaryKey(), scenarioId: int("scenarioId"), title: varchar("title", { length: 300 }).notNull(), content: text("content").notNull(), isSimulated: boolean("isSimulated").default(true).notNull(), status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const contentVersions = mysqlTable("contentVersions", {
  id: int("id").autoincrement().primaryKey(), entityType: varchar("entityType", { length: 80 }).notNull(), entityId: int("entityId").notNull(), versionLabel: varchar("versionLabel", { length: 80 }).notNull(), changeReason: text("changeReason"), authorLabel: varchar("authorLabel", { length: 180 }), snapshot: json("snapshot"), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const contentItems = mysqlTable("contentItems", {
  id: int("id").autoincrement().primaryKey(), slug: varchar("slug", { length: 160 }).notNull().unique(), contentType: mysqlEnum("contentType", ["SCENARIO", "GUIDE", "MODULE", "SOURCE_NOTE"]).notNull(), title: varchar("title", { length: 300 }).notNull(), summary: text("summary").notNull(), body: text("body"), jurisdiction: varchar("jurisdiction", { length: 160 }).default("International / à préciser").notNull(), versionLabel: varchar("versionLabel", { length: 80 }).notNull(), status: mysqlEnum("status", contentStatusValues).default("DRAFT").notNull(), reviewAt: timestamp("reviewAt"), publishedAt: timestamp("publishedAt"), createdByUserId: int("createdByUserId").notNull(), updatedByUserId: int("updatedByUserId"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull(), scenarioSlug: varchar("scenarioSlug", { length: 160 }).notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const savedCases = mysqlTable("savedCases", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull(), title: varchar("title", { length: 180 }).notNull(), scenarioSlug: varchar("scenarioSlug", { length: 160 }), role: varchar("role", { length: 120 }), phase: varchar("phase", { length: 120 }), jurisdiction: varchar("jurisdiction", { length: 160 }),
  note: text("note"), dataSafetyConfirmed: boolean("dataSafetyConfirmed").default(false).notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const savedCaseItems = mysqlTable("savedCaseItems", {
  id: int("id").autoincrement().primaryKey(), savedCaseId: int("savedCaseId").notNull(), itemType: mysqlEnum("itemType", ["ACTION", "CHECKLIST", "MILESTONE"]).notNull(), title: varchar("title", { length: 300 }).notNull(), dueAt: timestamp("dueAt"), completed: boolean("completed").default(false).notNull(), itemOrder: int("itemOrder").default(0).notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const feedback = mysqlTable("feedback", {
  id: int("id").autoincrement().primaryKey(), helpful: boolean("helpful").notNull(), comment: text("comment"), scenarioSlug: varchar("scenarioSlug", { length: 160 }), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const contentBacklog = mysqlTable("contentBacklog", {
  id: int("id").autoincrement().primaryKey(), role: varchar("role", { length: 120 }), studyType: varchar("studyType", { length: 120 }), phase: varchar("phase", { length: 120 }), jurisdiction: varchar("jurisdiction", { length: 160 }), requestSummary: text("requestSummary").notNull(), status: varchar("status", { length: 64 }).default("NOUVEAU").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const anonymousUsage = mysqlTable("anonymousUsage", {
  id: int("id").autoincrement().primaryKey(), eventName: varchar("eventName", { length: 100 }).notNull(), route: varchar("route", { length: 255 }), contentSlug: varchar("contentSlug", { length: 160 }), properties: json("properties"), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const analyticsConsents = mysqlTable("analyticsConsents", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull().unique(), status: mysqlEnum("status", ["GRANTED", "DENIED"]).notNull(), policyVersion: varchar("policyVersion", { length: 40 }).notNull(), grantedAt: timestamp("grantedAt"), revokedAt: timestamp("revokedAt"), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const loginEvents = mysqlTable("loginEvents", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull(), occurredAt: timestamp("occurredAt").defaultNow().notNull(), loginMethod: varchar("loginMethod", { length: 64 }),
});

export const exportAuditLogs = mysqlTable("exportAuditLogs", {
  id: int("id").autoincrement().primaryKey(), requestedByUserId: int("requestedByUserId").notNull(), exportType: varchar("exportType", { length: 80 }).notNull(), destination: varchar("destination", { length: 320 }), rowCount: int("rowCount").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const systemChecks = mysqlTable("systemChecks", {
  id: int("id").autoincrement().primaryKey(), checkType: varchar("checkType", { length: 100 }).notNull(), status: varchar("status", { length: 64 }).notNull(), detail: text("detail"), checkedAt: timestamp("checkedAt").defaultNow().notNull(),
});

export const studyProjects = mysqlTable("studyProjects", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull(), studyId: varchar("studyId", { length: 80 }).notNull().unique(), acronym: varchar("acronym", { length: 80 }), title: varchar("title", { length: 500 }).notNull(), shortTitle: varchar("shortTitle", { length: 240 }), studyQuestion: text("studyQuestion"), indication: varchar("indication", { length: 300 }), condition: varchar("condition", { length: 300 }), sponsor: varchar("sponsor", { length: 300 }), coordinatingCenter: varchar("coordinatingCenter", { length: 300 }), principalInvestigator: varchar("principalInvestigator", { length: 300 }), studyType: varchar("studyType", { length: 120 }), interventionType: varchar("interventionType", { length: 160 }), phase: varchar("phase", { length: 120 }), jurisdiction: varchar("jurisdiction", { length: 160 }).default("International / à préciser").notNull(), status: mysqlEnum("status", ["DRAFT", "IN_REVIEW", "READY_FOR_REVIEW", "ARCHIVED"]).default("DRAFT").notNull(), protocolVersion: varchar("protocolVersion", { length: 80 }).default("v0.1").notNull(), dataSafetyConfirmed: boolean("dataSafetyConfirmed").default(false).notNull(), lastReviewDate: timestamp("lastReviewDate"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const studyProjectSections = mysqlTable("studyProjectSections", {
  id: int("id").autoincrement().primaryKey(), studyProjectId: int("studyProjectId").notNull(), sectionKey: varchar("sectionKey", { length: 80 }).notNull(), title: varchar("title", { length: 240 }).notNull(), payload: json("payload").notNull(), completionState: mysqlEnum("completionState", ["NOT_STARTED", "IN_PROGRESS", "COMPLETE", "NEEDS_REVIEW"]).default("NOT_STARTED").notNull(), versionNumber: int("versionNumber").default(1).notNull(), updatedByUserId: int("updatedByUserId").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const studyProjectVersions = mysqlTable("studyProjectVersions", {
  id: int("id").autoincrement().primaryKey(), studyProjectId: int("studyProjectId").notNull(), versionLabel: varchar("versionLabel", { length: 80 }).notNull(), changeReason: text("changeReason").notNull(), snapshot: json("snapshot").notNull(), createdByUserId: int("createdByUserId").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const studyProjectCalculations = mysqlTable("studyProjectCalculations", {
  id: int("id").autoincrement().primaryKey(), studyProjectId: int("studyProjectId").notNull(), calculationType: varchar("calculationType", { length: 100 }).notNull(), assumptions: json("assumptions").notNull(), result: json("result").notNull(), warning: text("warning").notNull(), createdByUserId: int("createdByUserId").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const studyProjectMembers = mysqlTable("studyProjectMembers", {
  id: int("id").autoincrement().primaryKey(), studyProjectId: int("studyProjectId").notNull(), userId: int("userId").notNull(), projectRole: mysqlEnum("projectRole", ["OWNER", "EDITOR", "REVIEWER", "VIEWER"]).notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const studyProjectVisits = mysqlTable("studyProjectVisits", {
  id: int("id").autoincrement().primaryKey(), studyProjectId: int("studyProjectId").notNull(), label: varchar("label", { length: 180 }).notNull(), visitOrder: int("visitOrder").default(0).notNull(), targetDay: int("targetDay").notNull(), windowBeforeDays: int("windowBeforeDays").default(0).notNull(), windowAfterDays: int("windowAfterDays").default(0).notNull(), assessments: json("assessments").notNull(), participantStage: varchar("participantStage", { length: 120 }), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const studyProjectReferences = mysqlTable("studyProjectReferences", {
  id: int("id").autoincrement().primaryKey(), studyProjectId: int("studyProjectId").notNull(), sectionKey: varchar("sectionKey", { length: 80 }).notNull(), citation: text("citation").notNull(), sourceUrl: varchar("sourceUrl", { length: 1000 }), referenceStatus: mysqlEnum("referenceStatus", contentStatusValues).default("DRAFT").notNull(), versionLabel: varchar("versionLabel", { length: 80 }).default("v1.0").notNull(), versionNumber: int("versionNumber").default(1).notNull(), reviewedAt: timestamp("reviewedAt"), createdByUserId: int("createdByUserId").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const studyProjectReferenceVersions = mysqlTable("studyProjectReferenceVersions", {
  id: int("id").autoincrement().primaryKey(), studyProjectReferenceId: int("studyProjectReferenceId").notNull(), versionNumber: int("versionNumber").notNull(), versionLabel: varchar("versionLabel", { length: 80 }).notNull(), changeReason: text("changeReason").notNull(), snapshot: json("snapshot").notNull(), reviewedAt: timestamp("reviewedAt"), createdByUserId: int("createdByUserId").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
