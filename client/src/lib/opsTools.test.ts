import { describe, expect, it } from "vitest";
import { criticality, defaultCriteria, feasibility, isOverdue, levelOf, risksToCsv, validateAction, validateRisk } from "./opsTools";

describe("risques", () => {
  it("criticité et niveaux", () => {
    expect(criticality(2, 3, 4)).toBe(24);
    expect(criticality(0, 3, 4)).toBeNull();
    expect(criticality(2, 3, 6)).toBeNull();
    expect(levelOf(12)).toBe("faible"); expect(levelOf(13)).toBe("modéré"); expect(levelOf(40)).toBe("modéré");
    expect(levelOf(41)).toBe("élevé"); expect(levelOf(75)).toBe("élevé"); expect(levelOf(76)).toBe("critique"); expect(levelOf(125)).toBe("critique");
  });
  it("validation", () => {
    expect(validateRisk({ label: "ab", p: 1, i: 1, d: 1, rp: 1, ri: 1, rd: 1 })).not.toBeNull();
    expect(validateRisk({ label: "Retard de recrutement", p: 3, i: 4, d: 2, rp: 2, ri: 4, rd: 2 })).toBeNull();
    expect(validateRisk({ label: "Retard de recrutement", p: 3.5, i: 4, d: 2, rp: 2, ri: 4, rd: 2 })).not.toBeNull();
  });
  it("CSV protégé contre les formules et les séparateurs", () => {
    const csv = risksToCsv([{ id: "1", label: "=CMD(\"x\")", p: 5, i: 5, d: 5, control: "a;b", rp: 1, ri: 1, rd: 1 }]);
    expect(csv.split("\n")[1].startsWith("\"'=CMD(")).toBe(true);
    expect(csv).toContain("125;critique");
    expect(csv).toContain("\"a;b\"");
  });
});
describe("faisabilité", () => {
  it("score pondéré", () => {
    const c = defaultCriteria().map(x => ({ ...x, score: 5 }));
    const r = feasibility(c);
    expect(r.ok && r.percent).toBe(100);
    const z = feasibility(defaultCriteria());
    expect(z.ok && z.percent).toBe(0);
    const m = feasibility([{ id: "a", label: "A", weight: 1, score: 5 }, { id: "b", label: "B", weight: 3, score: 1 }]);
    expect(m.ok && m.percent).toBe(40);
  });
  it("erreurs", () => {
    expect(feasibility([]).ok).toBe(false);
    expect(feasibility([{ id: "a", label: "A", weight: 0, score: 3 }]).ok).toBe(false);
    expect(feasibility([{ id: "a", label: "A", weight: 6, score: 3 }]).ok).toBe(false);
    expect(feasibility([{ id: "a", label: "", weight: 1, score: 3 }]).ok).toBe(false);
  });
});
describe("actions", () => {
  it("validation et retard", () => {
    expect(validateAction({ label: "x", due: "" })).not.toBeNull();
    expect(validateAction({ label: "Relire le plan", due: "demain" })).not.toBeNull();
    expect(validateAction({ label: "Relire le plan", due: "2026-12-01" })).toBeNull();
    const a = { id: "1", label: "L", owner: "ARC", due: "2026-11-01", priority: "haute" as const, done: false };
    expect(isOverdue(a, "2026-11-25")).toBe(true);
    expect(isOverdue({ ...a, done: true }, "2026-11-25")).toBe(false);
    expect(isOverdue({ ...a, due: "" }, "2026-11-25")).toBe(false);
  });
});
