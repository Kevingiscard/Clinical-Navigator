import type { Express, Request, Response } from "express";
import { sources } from "../shared/clinicalContent";
import { sdk } from "./_core/sdk";

type LinkCheck = { sourceId: string; url: string; ok: boolean; status: number | null; detail?: string };

async function inspectSourceLink(sourceId: string, url: string): Promise<LinkCheck> {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(12_000) });
    return { sourceId, url, ok: response.ok, status: response.status };
  } catch (error) {
    return { sourceId, url, ok: false, status: null, detail: error instanceof Error ? error.message : "Échec de vérification" };
  }
}

export async function runDailyMaintenance() {
  const checkedAt = new Date().toISOString();
  const checks = await Promise.all(sources.map(source => inspectSourceLink(source.id, source.url)));
  return { checkedAt, checked: checks.length, failed: checks.filter(item => !item.ok).length, checks };
}

export function registerScheduledRoutes(app: Express) {
  app.post("/api/scheduled/source-review", async (req: Request, res: Response) => {
    const startedAt = new Date().toISOString();
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user.isCron || !user.taskUid) return res.status(403).json({ error: "cron-only", timestamp: startedAt });
      return res.json({ ok: true, taskUid: user.taskUid, ...(await runDailyMaintenance()) });
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : "Erreur de maintenance", timestamp: startedAt });
    }
  });
}
