import { describe, expect, it } from "vitest";
import { simulateEnrollment } from "./enrollment";
const base = { completers: 90, centres: 5, screenedPerCentreMonth: 4, screenFailPct: 20, dropoutPct: 10, activationLagMonths: 2 };
describe("simulateEnrollment", () => {
  it("calcule randomisés, présélectionnés et durée", () => {
    const r = simulateEnrollment(base);
    expect(r.ok).toBe(true);
    if (r.ok) { expect(r.randomised).toBe(100); expect(r.screened).toBe(125); expect(r.randomisedPerMonth).toBe(16); expect(r.monthsToTarget).toBe(9); }
  });
  it("sans délai ni échec", () => {
    const r = simulateEnrollment({ ...base, completers: 10, centres: 1, screenedPerCentreMonth: 5, screenFailPct: 0, dropoutPct: 0, activationLagMonths: 0 });
    expect(r.ok && r.monthsToTarget).toBe(2);
  });
  it("rejette les valeurs invalides", () => {
    expect(simulateEnrollment({ ...base, completers: 0 }).ok).toBe(false);
    expect(simulateEnrollment({ ...base, screenFailPct: 100 }).ok).toBe(false);
    expect(simulateEnrollment({ ...base, dropoutPct: -1 }).ok).toBe(false);
    expect(simulateEnrollment({ ...base, screenedPerCentreMonth: 0 }).ok).toBe(false);
    expect(simulateEnrollment({ ...base, activationLagMonths: 1.5 }).ok).toBe(false);
  });
  it("signale une cible hors de portée", () => {
    expect(simulateEnrollment({ ...base, completers: 100000, centres: 1, screenedPerCentreMonth: 0.01 }).ok).toBe(false);
  });
});
