import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./_core/app";

describe("Knowledge API", () => {
  it("searches the public knowledge index with a bounded response", async () => {
    const response = await request(createApp()).get("/api/knowledge/search?q=estimand&limit=3");
    expect(response.status).toBe(200);
    expect(response.body.datasetVersion).toBe("1.0.0");
    expect(response.body.results.length).toBeLessThanOrEqual(3);
    expect(response.body.results.some((item: { id: string }) => item.id === "CN-ESTIMAND-001")).toBe(true);
  });
  it("returns a knowledge item and its relations", async () => {
    const item = await request(createApp()).get("/api/knowledge/CN-ENDPOINT-001");
    expect(item.status).toBe(200);
    expect(item.body.item.aiAllowed).toBe(true);
    const related = await request(createApp()).get("/api/knowledge/CN-ENDPOINT-001/related");
    expect(related.status).toBe(200);
    expect(related.body.relations.length).toBeGreaterThan(0);
  });
  it("does not pretend that an unknown item exists", async () => {
    const response = await request(createApp()).get("/api/knowledge/unknown-id");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("knowledge-not-found");
  });
});
