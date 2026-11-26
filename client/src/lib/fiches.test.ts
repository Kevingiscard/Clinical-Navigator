import { describe, expect, it } from "vitest";
import { FICHES } from "./fiches";
describe("fiches", () => {
  it("ids uniques, sections complètes, sources https", () => {
    expect(new Set(FICHES.map(f => f.id)).size).toBe(FICHES.length);
    for (const f of FICHES) {
      expect(f.principe.length).toBeGreaterThanOrEqual(3);
      for (const s of [f.typeEtude, f.pays, f.protocole, f.aConfirmer]) expect(s.length).toBeGreaterThan(20);
      expect(f.refs.length).toBeGreaterThan(0);
      for (const r of f.refs) expect(r.url.startsWith("https://")).toBe(true);
    }
  });
  it("aucun délai réglementaire chiffré", () => {
    for (const f of FICHES) expect(JSON.stringify(f)).not.toMatch(/\b\d+\s*(jours|heures)\b/i);
  });
});
