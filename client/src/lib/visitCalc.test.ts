import { describe, expect, it } from "vitest";
import { buildCapa, calculateWindow, shiftOpenDays } from "./visitCalc";

describe("calculateWindow", () => {
  it("jours calendaires", () => {
    const r = calculateWindow("2026-12-01", -2, 3, "calendaires");
    expect(r.ok && r.value.min).toBe("2026-11-29");
    expect(r.ok && r.value.max).toBe("2026-12-04");
  });
  it("jours ouvrés: saute le week-end", () => {
    // 2026-12-04 est un vendredi; +1 jour ouvré = lundi 7
    const r = calculateWindow("2026-12-04", 0, 1, "ouvres");
    expect(r.ok && r.value.max).toBe("2026-12-07");
    // -1 depuis lundi 7 = vendredi 4
    const s = calculateWindow("2026-12-07", -1, 0, "ouvres");
    expect(s.ok && s.value.min).toBe("2026-12-04");
  });
  it("jours exclus", () => {
    const r = calculateWindow("2026-12-04", 0, 1, "ouvres", ["2026-12-07"]);
    expect(r.ok && r.value.max).toBe("2026-12-08");
  });
  it("passage heure d'été et fin d'année", () => {
    const r = calculateWindow("2026-03-28", 0, 3, "calendaires");
    expect(r.ok && r.value.max).toBe("2026-03-31");
    const y = calculateWindow("2026-12-30", 0, 3, "calendaires");
    expect(y.ok && y.value.max).toBe("2027-01-02");
  });
  it("erreurs", () => {
    expect(calculateWindow("", 0, 1, "calendaires").ok).toBe(false);
    expect(calculateWindow("2026-02-30", 0, 1, "calendaires").ok).toBe(false);
    expect(calculateWindow("2026-12-01", 3, 1, "calendaires").ok).toBe(false);
    expect(calculateWindow("2026-12-01", 0.5, 1, "calendaires").ok).toBe(false);
    expect(calculateWindow("2026-12-01", 0, 400, "calendaires").ok).toBe(false);
    expect(calculateWindow("2026-12-01", 0, 1, "ouvres", ["abc"]).ok).toBe(false);
  });
  it("shiftOpenDays 0", () => {
    expect(shiftOpenDays(new Date(Date.UTC(2026, 11, 5, 12)), 0, new Set()).getUTCDate()).toBe(5);
  });
});
describe("buildCapa", () => {
  it("valide la longueur", () => {
    expect(buildCapa("court").ok).toBe(false);
    expect(buildCapa("x".repeat(1001)).ok).toBe(false);
    const r = buildCapa("Un écart de procédure générique");
    expect(r.ok && r.steps.length).toBe(7);
  });
});
