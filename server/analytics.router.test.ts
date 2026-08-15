import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAnalyticsConsent: vi.fn(),
  setAnalyticsConsent: vi.fn(),
  getAdminAnalyticsExport: vi.fn(),
  recordExportAudit: vi.fn(),
}));

vi.mock("./db", () => ({
  getAnalyticsConsent: mocks.getAnalyticsConsent,
  setAnalyticsConsent: mocks.setAnalyticsConsent,
  getAdminAnalyticsExport: mocks.getAdminAnalyticsExport,
  recordExportAudit: mocks.recordExportAudit,
}));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function context(role: "user" | "admin"): TrpcContext {
  return {
    user: { id: role === "admin" ? 1 : 2, openId: role, name: role, email: null, loginMethod: "manus", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("analytics consent and export permissions", () => {
  it("allows an authenticated user to read and update their own analytics consent", async () => {
    mocks.getAnalyticsConsent.mockResolvedValueOnce({ userId: 2, status: "DENIED" });
    mocks.setAnalyticsConsent.mockResolvedValueOnce({ stored: true, granted: true });
    const caller = appRouter.createCaller(context("user"));
    await expect(caller.clinical.user.analyticsConsent.get()).resolves.toMatchObject({ userId: 2, status: "DENIED" });
    await expect(caller.clinical.user.analyticsConsent.set({ granted: true, policyVersion: "analytics-v1.0" })).resolves.toEqual({ stored: true, granted: true });
    expect(mocks.setAnalyticsConsent).toHaveBeenCalledWith(2, true, "analytics-v1.0");
  });

  it("does not record optional analytics without an explicit grant", async () => {
    mocks.getAnalyticsConsent.mockResolvedValueOnce({ userId: 2, status: "DENIED" });
    const caller = appRouter.createCaller(context("user"));
    await expect(caller.clinical.analytics({ eventName: "guide_opened", route: "/fr/guides" })).resolves.toEqual({ stored: false, reason: "consent-required" });
  });

  it("refuses analytics exports to non-admin users", async () => {
    const caller = appRouter.createCaller(context("user"));
    await expect(caller.clinical.adminAnalytics.dashboard()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows an administrator to generate audited export data", async () => {
    mocks.getAdminAnalyticsExport.mockResolvedValueOnce({ users: [], usage: [], exports: [] });
    mocks.recordExportAudit.mockResolvedValueOnce({ stored: true });
    const caller = appRouter.createCaller(context("admin"));
    await expect(caller.clinical.adminAnalytics.dashboard()).resolves.toEqual({ users: [], usage: [], exports: [] });
    await expect(caller.clinical.adminAnalytics.recordExport({ exportType: "xlsx_administrateur", destination: null, rowCount: 0 })).resolves.toEqual({ stored: true });
    expect(mocks.recordExportAudit).toHaveBeenCalledWith(1, "xlsx_administrateur", null, 0);
  });
});
