import { z } from "zod";
import { glossary, modules, scenarios, sources } from "../../shared/clinicalContent";
import { buildGuidance, calculateVisitWindow, containsDirectIdentifier } from "../clinical";
import * as db from "../db";
import { adminProcedure, publicProcedure, protectedProcedure, router } from "../_core/trpc";

const statusSchema = z.enum(["VERIFIED", "NEEDS_REVIEW", "OUTDATED", "DRAFT", "ARCHIVED"]);
const responseModeSchema = z.enum(["rapide", "detaille", "expert"]);
const safeText = (value: string | undefined) => !value || !containsDirectIdentifier(value);
const contentItemSchema = z.object({ slug: z.string().min(3).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), contentType: z.enum(["SCENARIO", "GUIDE", "MODULE", "SOURCE_NOTE"]), title: z.string().min(5).max(300), summary: z.string().min(20).max(4000), body: z.string().max(12000).nullable().optional(), jurisdiction: z.string().min(3).max(160), versionLabel: z.string().min(1).max(80), status: statusSchema, reviewAt: z.date().nullable().optional() });

export const clinicalRouter = router({
  catalog: publicProcedure.query(() => ({ modules, scenarios, sources, glossary })),
  search: publicProcedure.input(z.object({ query: z.string().max(160).default(""), status: statusSchema.optional() })).query(({ input }) => {
    const query = input.query.toLocaleLowerCase("fr-FR").trim(); const matches = scenarios.filter(scenario => { const searchable = `${scenario.title} ${scenario.description} ${scenario.category} ${scenario.keywords.join(" ")}`.toLocaleLowerCase("fr-FR"); return (!query || searchable.includes(query)) && (!input.status || scenario.status === input.status); }); return { scenarios: matches, total: matches.length };
  }),
  analyze: publicProcedure.input(z.object({ role: z.string().min(1).max(80), studyType: z.string().min(1).max(80), phase: z.string().min(1).max(80), situation: z.string().max(1200).default(""), problem: z.string().max(1200).default(""), jurisdiction: z.string().min(1).max(100), urgency: z.enum(["Faible", "Normale", "Haute", "Critique"]), mode: responseModeSchema, immediateRisk: z.boolean() })).mutation(({ input }) => buildGuidance(input)),
  tools: router({
    visitWindow: publicProcedure.input(z.object({ date: z.string().datetime(), lowerOffset: z.number().int().min(-365).max(365), upperOffset: z.number().int().min(-365).max(365) })).mutation(({ input }) => { if (input.lowerOffset > input.upperOffset) throw new Error("La fenêtre minimale ne peut pas être supérieure à la fenêtre maximale."); return calculateVisitWindow(new Date(input.date), input.lowerOffset, input.upperOffset); }),
    capaStarter: publicProcedure.input(z.object({ issue: z.string().min(10).max(1000) })).mutation(({ input }) => ({ problemStatement: input.issue, steps: ["Décrire les faits et le périmètre.", "Sécuriser la situation si un risque est identifié.", "Rassembler les éléments disponibles.", "Analyser les causes avec les rôles compétents.", "Définir les actions correctives et préventives.", "Attribuer un responsable et une échéance.", "Vérifier l’efficacité selon le processus qualité applicable."], warning: "Ce canevas ne remplace pas la procédure CAPA applicable dans votre organisation." })),
  }),
  feedback: publicProcedure.input(z.object({ helpful: z.boolean(), comment: z.string().max(600).optional(), scenarioId: z.string().max(96).optional() })).mutation(async ({ input }) => { if (!safeText(input.comment)) throw new Error("Le retour contient un élément potentiellement identifiant. Reformulez-le de façon générale."); return db.recordFeedback({ helpful: input.helpful, comment: input.comment, scenarioSlug: input.scenarioId }); }),
  backlog: publicProcedure.input(z.object({ role: z.string().max(80).optional(), studyType: z.string().max(80).optional(), phase: z.string().max(80).optional(), jurisdiction: z.string().max(100).optional(), requestSummary: z.string().min(10).max(800) })).mutation(async ({ input }) => { if (!safeText(input.requestSummary)) throw new Error("La demande contient un élément potentiellement identifiant. Reformulez-la de façon générale."); return db.createContentBacklog(input); }),
  analytics: protectedProcedure.input(z.object({ eventName: z.enum(["guide_opened", "workflow_started", "workflow_completed", "source_opened", "tool_used"]), route: z.string().max(200).optional(), contentSlug: z.string().max(160).optional(), properties: z.record(z.string(), z.union([z.string().max(80), z.number(), z.boolean()])).optional() })).mutation(async ({ ctx, input }) => {
    const consent = await db.getAnalyticsConsent(ctx.user.id);
    if (consent?.status !== "GRANTED") return { stored: false, reason: "consent-required" as const };
    return db.recordAnonymousUsage(input);
  }),
  publishedContent: publicProcedure.query(() => db.listPublicContentItems()),
  user: router({
    favorites: router({ list: protectedProcedure.query(({ ctx }) => db.listFavoritesForUser(ctx.user.id)), toggle: protectedProcedure.input(z.object({ scenarioSlug: z.string().min(3).max(160) })).mutation(({ ctx, input }) => db.toggleFavoriteForUser(ctx.user.id, input.scenarioSlug)) }),
    cases: router({
      list: protectedProcedure.query(({ ctx }) => db.listSavedCasesForUser(ctx.user.id)),
      detail: protectedProcedure.input(z.object({ id: z.number().int().positive() })).query(async ({ ctx, input }) => { const result = await db.getSavedCaseForUser(ctx.user.id, input.id); if (!result) throw new Error("Cas introuvable ou non autorisé."); return result; }),
      create: protectedProcedure.input(z.object({ title: z.string().min(3).max(180), scenarioSlug: z.string().max(160).optional(), role: z.string().max(120).optional(), phase: z.string().max(120).optional(), jurisdiction: z.string().max(160).optional(), note: z.string().max(800).optional() })).mutation(({ ctx, input }) => { if (!safeText(`${input.title} ${input.note ?? ""}`)) throw new Error("Le cas contient un élément potentiellement identifiant. Supprimez-le avant l’enregistrement."); return db.createSavedCaseForUser({ userId: ctx.user.id, ...input }); }),
      update: protectedProcedure.input(z.object({ id: z.number().int().positive(), title: z.string().min(3).max(180).optional(), note: z.string().max(800).nullable().optional() })).mutation(async ({ ctx, input }) => { if (!safeText(`${input.title ?? ""} ${input.note ?? ""}`)) throw new Error("Le cas contient un élément potentiellement identifiant."); const { id, ...patch } = input; const updated = await db.updateSavedCaseForUser(ctx.user.id, id, patch); if (!updated) throw new Error("Cas introuvable ou non autorisé."); return { updated: true }; }),
      delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => { const deleted = await db.deleteSavedCaseForUser(ctx.user.id, input.id); if (!deleted) throw new Error("Cas introuvable ou non autorisé."); return { deleted: true }; }),
      items: router({
        create: protectedProcedure.input(z.object({ savedCaseId: z.number().int().positive(), itemType: z.enum(["ACTION", "CHECKLIST", "MILESTONE"]), title: z.string().min(2).max(300), dueAt: z.date().nullable().optional() })).mutation(({ ctx, input }) => { if (!safeText(input.title)) throw new Error("L’élément contient un identifiant potentiel."); return db.createSavedCaseItemForUser(ctx.user.id, input); }),
        update: protectedProcedure.input(z.object({ id: z.number().int().positive(), title: z.string().min(2).max(300).optional(), completed: z.boolean().optional(), dueAt: z.date().nullable().optional() })).mutation(async ({ ctx, input }) => { if (!safeText(input.title)) throw new Error("L’élément contient un identifiant potentiel."); const { id, ...patch } = input; const updated = await db.updateSavedCaseItemForUser(ctx.user.id, id, patch); if (!updated) throw new Error("Élément introuvable ou non autorisé."); return { updated: true }; }),
        delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => { const deleted = await db.deleteSavedCaseItemForUser(ctx.user.id, input.id); if (!deleted) throw new Error("Élément introuvable ou non autorisé."); return { deleted: true }; }),
      }),
    }),
    analyticsConsent: router({
      get: protectedProcedure.query(async ({ ctx }) => (await db.getAnalyticsConsent(ctx.user.id)) ?? { userId: ctx.user.id, status: "UNSET", policyVersion: null, grantedAt: null, revokedAt: null, updatedAt: null }),
      set: protectedProcedure.input(z.object({ granted: z.boolean(), policyVersion: z.string().min(1).max(40) })).mutation(({ ctx, input }) => db.setAnalyticsConsent(ctx.user.id, input.granted, input.policyVersion)),
    }),
  }),
  admin: adminProcedure.query(async () => {
    const [recentFeedback, backlog, usage] = await Promise.all([db.listRecentFeedback(), db.listContentBacklog(), db.listUsageAggregates()]);
    return { metrics: { scenarios: scenarios.length, modules: modules.length, sources: sources.length, verified: scenarios.filter(item => item.status === "VERIFIED").length, needsReview: scenarios.filter(item => item.status === "NEEDS_REVIEW").length }, contentStatus: ["VERIFIED", "NEEDS_REVIEW", "OUTDATED", "DRAFT", "ARCHIVED"].map(status => ({ status, count: scenarios.filter(item => item.status === status).length })), sourceQueue: sources.map(source => ({ id: source.id, title: source.title, status: source.status, nextReviewAt: source.nextReviewAt, official: source.isOfficial })), recentFeedback, backlog, usage, systemHealth: [{ name: "Base de contenu", status: "opérationnel", detail: "Catalogue versionné chargé." }, { name: "Moteur de workflow", status: "opérationnel", detail: "Règles déterministes et protections de confidentialité actives." }, { name: "Vérification réglementaire", status: "surveillance", detail: "Toute information contextuelle doit rester soumise à validation humaine." }] };
  }),
  adminContent: router({
    list: adminProcedure.query(() => db.listAdminContentItems()),
    versions: adminProcedure.input(z.object({ id: z.number().int().positive() })).query(({ input }) => db.listContentVersions(input.id)),
    create: adminProcedure.input(contentItemSchema).mutation(async ({ ctx, input }) => { if (!safeText(`${input.title} ${input.summary} ${input.body ?? ""}`)) throw new Error("Le contenu contient un identifiant potentiel. Retirez toute donnée personnelle."); return db.createContentItem(ctx.user.id, input); }),
    update: adminProcedure.input(contentItemSchema.extend({ id: z.number().int().positive(), reason: z.string().max(600).optional() })).mutation(async ({ ctx, input }) => { if (!safeText(`${input.title} ${input.summary} ${input.body ?? ""}`)) throw new Error("Le contenu contient un identifiant potentiel. Retirez toute donnée personnelle."); const { id, reason, ...payload } = input; const updated = await db.updateContentItem(ctx.user.id, id, payload, reason ?? "Révision administrative"); if (!updated) throw new Error("Contenu introuvable."); return { updated: true }; }),
    archive: adminProcedure.input(z.object({ id: z.number().int().positive(), reason: z.string().min(3).max(600) })).mutation(async ({ ctx, input }) => { const archived = await db.archiveContentItem(ctx.user.id, input.id, input.reason); if (!archived) throw new Error("Contenu introuvable."); return { archived: true }; }),
  }),
  adminCatalog: router({
    sources: router({
      list: adminProcedure.query(() => db.listAdminSources()),
      create: adminProcedure.input(z.object({ externalId: z.string().min(3).max(128).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), title: z.string().min(5).max(400), publisher: z.string().min(2).max(240), sourceUrl: z.string().url().max(1000), jurisdiction: z.string().min(2).max(160), versionLabel: z.string().max(160).nullable().optional(), scope: z.string().max(2000).nullable().optional(), status: statusSchema, isOfficial: z.boolean(), nextReviewAt: z.date().nullable().optional() })).mutation(({ ctx, input }) => db.createSourceRecord(ctx.user.id, input)),
      update: adminProcedure.input(z.object({ id: z.number().int().positive(), reason: z.string().max(600).optional(), externalId: z.string().min(3).max(128).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), title: z.string().min(5).max(400), publisher: z.string().min(2).max(240), sourceUrl: z.string().url().max(1000), jurisdiction: z.string().min(2).max(160), versionLabel: z.string().max(160).nullable().optional(), scope: z.string().max(2000).nullable().optional(), status: statusSchema, isOfficial: z.boolean(), nextReviewAt: z.date().nullable().optional() })).mutation(async ({ ctx, input }) => { const { id, reason, ...payload } = input; const updated = await db.updateSourceRecord(ctx.user.id, id, payload, reason ?? "Révision de source"); if (!updated) throw new Error("Source introuvable."); return { updated: true }; }),
    }),
    jurisdictions: router({
      list: adminProcedure.query(() => db.listAdminJurisdictions()),
      create: adminProcedure.input(z.object({ slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), name: z.string().min(2).max(160), scope: z.string().max(2000).nullable().optional(), status: statusSchema, nextReviewAt: z.date().nullable().optional() })).mutation(({ ctx, input }) => db.createJurisdictionRecord(ctx.user.id, input)),
      update: adminProcedure.input(z.object({ id: z.number().int().positive(), reason: z.string().max(600).optional(), slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), name: z.string().min(2).max(160), scope: z.string().max(2000).nullable().optional(), status: statusSchema, nextReviewAt: z.date().nullable().optional() })).mutation(async ({ ctx, input }) => { const { id, reason, ...payload } = input; const updated = await db.updateJurisdictionRecord(ctx.user.id, id, payload, reason ?? "Révision de juridiction"); if (!updated) throw new Error("Juridiction introuvable."); return { updated: true }; }),
    }),
  }),
  adminAnalytics: router({
    dashboard: adminProcedure.query(() => db.getAdminAnalyticsExport()),
    recordExport: adminProcedure.input(z.object({ exportType: z.string().min(1).max(80), destination: z.string().email().nullable().optional(), rowCount: z.number().int().nonnegative() })).mutation(({ ctx, input }) => db.recordExportAudit(ctx.user.id, input.exportType, input.destination ?? null, input.rowCount)),
  }),
});
