import { describe, expect, it } from "vitest";
import { buildGuidance, calculateVisitWindow, containsDirectIdentifier } from "./clinical";
import { appRouter } from "./routers";

const base = {
  role: "ARC / CRA", studyType: "Interventionnel", phase: "Inclusion", situation: "Revue de dossier", problem: "Un critère d’éligibilité semble non respecté.", jurisdiction: "International / à préciser", urgency: "Haute" as const, mode: "detaille" as const, immediateRisk: false,
};

describe("moteur de guidance clinique", () => {
  it("associe une inclusion potentiellement non conforme au scénario approprié", () => {
    const result = buildGuidance(base);
    expect(result.scenario.id).toBe("inclusion-critere-non-respecte");
    expect(result.priority).toBe("HAUTE");
    expect(result.limits.length).toBeGreaterThan(1);
  });

  it("interrompt logiquement le parcours en cas de risque immédiat", () => {
    const result = buildGuidance({ ...base, immediateRisk: true, problem: "Un événement de sécurité peut concerner le participant." });
    expect(result.priority).toBe("CRITIQUE");
    expect(result.immediateAction).toMatch(/questionnaire/i);
  });

  it("détecte des identifiants directs sans conserver le texte", () => {
    expect(containsDirectIdentifier("Contact : participant@example.org")).toBe(true);
    const result = buildGuidance({ ...base, problem: "Le dossier ID AB-12345 doit être revu." });
    expect(result.blocked).toBe(true);
  });

  it("calcule une fenêtre de visite de façon déterministe", () => {
    const result = calculateVisitWindow(new Date("2026-08-15T00:00:00.000Z"), -2, 3);
    expect(result.min).toBe("2026-08-13T00:00:00.000Z");
    expect(result.max).toBe("2026-08-18T00:00:00.000Z");
  });

  it("rend les modes et les délais explicites dans le contrat de réponse", () => {
    const quick = buildGuidance({ ...base, mode: "rapide" });
    const expert = buildGuidance({ ...base, mode: "expert" });
    expect(quick.mode).toBe("rapide");
    expect(expert.mode).toBe("expert");
    expect(expert.deadlines.length).toBeGreaterThan(0);
    expect(expert.deadlines[0]?.source).toMatch(/protocole|circuit/i);
  });

  it("refuse l’accès à l’administration au niveau du serveur pour un utilisateur non administrateur", async () => {
    const caller = appRouter.createCaller({
      user: { id: 2, openId: "user", name: "User", email: null, loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
      req: {} as never,
      res: {} as never,
    });
    await expect(caller.clinical.admin()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
