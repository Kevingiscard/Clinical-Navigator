import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const src = readFileSync(new URL("../pages/CampusWorkshopsPage.tsx", import.meta.url), "utf8");
describe("ateliers pratiques", () => {
  const ids = [...src.matchAll(/^\s{4}id: "([^"]+)"/gm)].map(m => m[1]);
  it("compte 7 ateliers sans doublon", () => { expect(ids.length).toBe(7); expect(new Set(ids).size).toBe(7); });
  it("chaque atelier a exactement une bonne réponse", () => {
    const blocks = src.split(/^\s{2}\{\n\s{4}id: /m).slice(1);
    expect(blocks.length).toBe(7);
    for (const b of blocks) expect((b.match(/ok: true/g) ?? []).length).toBe(1);
  });
  it("aucune mention payante", () => { expect(src.toLowerCase()).not.toMatch(/payant|tarif|abonnement/); });
});
