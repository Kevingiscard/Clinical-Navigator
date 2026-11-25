import { describe, expect, it } from "vitest";
import { extraRoles, poles } from "./rolesExtra";

describe("métiers complémentaires", () => {
  it("compte 23 métiers sans doublon d'identifiant", () => {
    expect(extraRoles.length).toBe(23);
    expect(new Set(extraRoles.map(r => r.id)).size).toBe(23);
  });
  it("chaque métier appartient à un pôle connu", () => {
    for (const r of extraRoles) expect(poles.some(p => p.id === r.pole)).toBe(true);
  });
  it("les sources sont en https", () => {
    for (const r of extraRoles) for (const x of r.refs) expect(x.url.startsWith("https://")).toBe(true);
  });
  it("sans source, la fiche le dit et ne décrit pas de règle", () => {
    for (const r of extraRoles.filter(x => x.refs.length === 0)) expect(r.confirm).toContain("à confirmer");
  });
  it("aucune mention payante", () => {
    expect(JSON.stringify(extraRoles).toLowerCase()).not.toMatch(/payant|tarif|abonnement/);
  });
});
