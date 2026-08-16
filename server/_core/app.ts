import express, { type Express, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerScheduledRoutes, runDailyMaintenance } from "../scheduled";

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
