import { describe, expect, it } from "vitest";
import { glossary } from "../../../shared/clinicalContent";
import { glossaryRoleFilters, rolesForTerm } from "./glossaryRoles";

describe("filtre du glossaire par rôle", () => {
  it("chaque terme du glossaire a au moins un rôle", () => {
    const sans = glossary.filter(g => rolesForTerm(g.term).length === 0).map(g => g.term);
    expect(sans).toEqual([]);
  });
  it("les rôles utilisés existent", () => {
    const ids = glossaryRoleFilters.map(f => f.id as string);
    for (const g of glossary) for (const r of rolesForTerm(g.term)) expect(ids).toContain(r);
  });
  it("chaque rôle a au moins un terme", () => {
    for (const f of glossaryRoleFilters) expect(glossary.some(g => rolesForTerm(g.term).includes(f.id))).toBe(true);
  });
});
