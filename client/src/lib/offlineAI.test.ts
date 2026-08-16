import { describe, expect, it } from "vitest";
import { answerOffline, findOfflineKnowledge, rankOfflineKnowledge } from "./offlineAI";

describe("offline clinical assistant", () => {
  it("finds methodological entries through clinical synonyms", () => {
    const ranked = rankOfflineKnowledge("comment choisir le critere principal d'une etude", 3);
    expect(ranked.length).toBeGreaterThan(0);
    expect(ranked[0].matchedTerms.length).toBeGreaterThan(0);
  });
  it("returns a cited answer for a relevant query", () => {
    const answer = answerOffline("qu'est-ce qu'un estimand", "fr");
    expect(answer.needsClarification).toBe(false);
    expect(answer.entry).toBeDefined();
    expect(answer.text).toContain("Sources :");
    expect(answer.confidence).toBeGreaterThan(0);
  });
  it("does not force an unrelated answer", () => {
    const answer = answerOffline("parlez-moi de la météo demain", "fr");
    expect(answer.needsClarification).toBe(true);
    expect(answer.entry).toBeUndefined();
    expect(answer.text).toContain("confiance est insuffisante");
  });
  it("keeps lookup results bounded", () => { expect(findOfflineKnowledge("safety signal", 2)).toHaveLength(2); });
});
