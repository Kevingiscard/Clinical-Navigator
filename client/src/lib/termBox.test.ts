import { describe, expect, it } from "vitest";
import { FONGBE_PENDING, termBox } from "./termBox";
describe("boîte à termes", () => {
  it("15 termes sans doublon", () => { expect(termBox.length).toBe(15); expect(new Set(termBox.map(t => t.fr)).size).toBe(15); });
  it("aucune traduction fongbe inventée : la colonne reste à faire", () => { expect(FONGBE_PENDING).toBe("À faire traduire et relire"); for (const t of termBox) expect(Object.keys(t).sort()).toEqual(["fr", "plain"]); });
  it("aucune mention payante", () => { expect(JSON.stringify(termBox).toLowerCase()).not.toMatch(/payant|tarif|abonnement/); });
});
