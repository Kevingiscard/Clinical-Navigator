import { describe, expect, it } from "vitest";
import { moduleDefinitions, moduleResources } from "../shared/moduleResources";
import { referenceRegistry } from "../shared/referenceRegistry";

describe("module resource architecture", () => {
  it("exposes an operational hub for every clinical module", () => {
    expect(moduleDefinitions.length).toBeGreaterThanOrEqual(20);
    for (const module of moduleDefinitions) {
      expect(module.slug).toBeTruthy();
      expect(module.title).toBeTruthy();
      expect(module.description).toBeTruthy();
      expect(module.steps.length).toBeGreaterThanOrEqual(5);
      expect(module.resourceIds.length).toBeGreaterThan(0);
      expect(module.relatedModules.length).toBeGreaterThan(0);
      expect(module.version).toBeTruthy();
      expect(module.lastReviewed).toBeTruthy();
      expect(module.nextReview).toBeTruthy();
    }
  });

  it("resolves all resource and source relations", () => {
    const resourceIds = new Set(moduleResources.map(resource => resource.id));
    const sourceIds = new Set(referenceRegistry.map(reference => reference.id));
    for (const resource of moduleResources) {
      expect(resource.moduleIds.length).toBeGreaterThan(0);
      expect(resource.title).toBeTruthy();
      expect(resource.status).toMatch(/^(VERIFIED|NEEDS_REVIEW|DRAFT|OUTDATED)$/);
      if (resource.internalRoute) expect(resource.internalRoute).toMatch(/^\/fr\//);
      if (resource.url) expect(resource.url).toMatch(/^https:\/\//);
      for (const sourceId of resource.sourceIds) expect(sourceIds.has(sourceId)).toBe(true);
    }
    for (const module of moduleDefinitions) for (const resourceId of module.resourceIds) expect(resourceIds.has(resourceId)).toBe(true);
  });
});
