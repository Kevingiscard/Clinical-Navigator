import express, { type Express, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerScheduledRoutes, runDailyMaintenance } from "../scheduled";
import { knowledgeItems, clinicalKnowledgeGraph } from "../../shared/knowledgeDatasets";
import { referenceRegistry } from "../../shared/referenceRegistry";
import { jurisdictionRegistry } from "../../shared/jurisdictionRegistry";

function isAuthorizedCronRequest(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.header("authorization") === `Bearer ${secret}`;
}

const authLimiter = rateLimit({ windowMs: 60_000, limit: 10, standardHeaders: "draft-7", legacyHeaders: false });
const aiLimiter = rateLimit({ windowMs: 60_000, limit: 20, standardHeaders: "draft-7", legacyHeaders: false });

export function createApp(): Express {
  const app = express();
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ limit: "2mb", extended: true }));

  app.get("/api/health", (_req: Request, res: Response) => {
    const databaseConfigured = Boolean(process.env.DATABASE_URL);
    res.status(200).json({
      ok: true,
      service: "clinical-navigator-api",
      version: process.env.npm_package_version ?? "4.1.0",
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT_SHA ?? "unknown",
      uptimeSeconds: Math.round(process.uptime()),
      database: databaseConfigured ? "configured" : "not-configured",
      timestamp: new Date().toISOString(),
    });
  });

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  app.get("/api/knowledge/search", (req: Request, res: Response) => {
    const query = String(req.query.q ?? "").trim().toLocaleLowerCase().slice(0, 160);
    const limit = Math.min(Math.max(Number(req.query.limit ?? 20) || 20, 1), 50);
    const results = knowledgeItems.filter(item => { const text = `${item.title} ${item.shortDescription} ${item.keywords.join(" ")} ${item.synonyms.join(" ")}`.toLocaleLowerCase(); return !query || text.includes(query); }).slice(0, limit);
    res.json({ query, datasetVersion: "1.0.0", generatedAt: new Date().toISOString(), results });
  });
  app.get("/api/knowledge/:id/related", (req: Request, res: Response) => {
    const relations = clinicalKnowledgeGraph.filter(relation => relation.from === req.params.id || relation.to === req.params.id);
    res.json({ id: req.params.id, relations });
  });
  app.get("/api/knowledge/:id", (req: Request, res: Response) => {
    const item = knowledgeItems.find(candidate => candidate.id === req.params.id);
    if (!item) return res.status(404).json({ error: "knowledge-not-found" });
    return res.json({ item, datasetVersion: "1.0.0" });
  });
  app.get("/api/sources", (_req: Request, res: Response) => res.json({ generatedAt: new Date().toISOString(), references: referenceRegistry }));
  app.get("/api/jurisdictions", (_req: Request, res: Response) => res.json({ generatedAt: new Date().toISOString(), jurisdictions: jurisdictionRegistry }));
  registerScheduledRoutes(app);

  app.post("/api/cron/daily-maintenance", async (req: Request, res: Response) => {
    if (!isAuthorizedCronRequest(req)) return res.status(401).json({ ok: false, error: "unauthorized" });
    try {
      const result = await runDailyMaintenance();
      return res.status(200).json({ ok: true, ...result });
    } catch (error) {
      return res.status(500).json({ ok: false, error: error instanceof Error ? error.message : "maintenance-failed" });
    }
  });

  app.use("/api/trpc/auth", authLimiter);
  app.use("/api/trpc/ai", aiLimiter);
  app.use(
    "/api/trpc",
    createExpressMiddleware({ router: appRouter, createContext })
  );

  return app;
}
