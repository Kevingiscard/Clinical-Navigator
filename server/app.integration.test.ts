import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./_core/app";

describe("API integration", () => {
  it("exposes a public health endpoint", async () => {
    const response = await request(createApp()).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.service).toBe("clinical-navigator-api");
  });
});
