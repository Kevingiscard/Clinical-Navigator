import { beforeEach, describe, expect, it } from "vitest";
import { CAMPUS_KEY, clearLocalProgress, hasDesignDraft, loadCampusDone, loadModuleChecks, loadVisits, recordVisit } from "./localProgress";

class MemoryStorage {
  private m = new Map<string, string>();
  get length() { return this.m.size; }
  key(i: number) { return [...this.m.keys()][i] ?? null; }
  getItem(k: string) { return this.m.has(k) ? this.m.get(k)! : null; }
  setItem(k: string, v: string) { this.m.set(k, String(v)); }
  removeItem(k: string) { this.m.delete(k); }
  clear() { this.m.clear(); }
}
const storage = new MemoryStorage();
(globalThis as unknown as { window: unknown }).window = { localStorage: storage };

describe("progression locale", () => {
  beforeEach(() => window.localStorage.clear());
  it("garde les 8 dernières pages, sans doublon, la plus récente d'abord", () => {
    for (let i = 0; i < 10; i++) recordVisit(`/fr/p${i}`, 1000 + i);
    recordVisit("/fr/p5", 5000);
    const v = loadVisits();
    expect(v).toHaveLength(8);
    expect(v[0].route).toBe("/fr/p5");
    expect(v.filter(x => x.route === "/fr/p5")).toHaveLength(1);
  });
  it("ignore le slash final", () => {
    recordVisit("/fr/campus/", 1); recordVisit("/fr/tableau-de-bord/", 2);
    expect(loadVisits().map(v => v.route)).toEqual(["/fr/campus"]);
  });
  it("ignore l'accueil et le tableau de bord", () => {
    recordVisit("/", 1); recordVisit("/fr/tableau-de-bord", 2);
    expect(loadVisits()).toHaveLength(0);
  });
  it("lit les clés existantes et résiste aux données corrompues", () => {
    window.localStorage.setItem(CAMPUS_KEY, JSON.stringify(["bases", 3]));
    window.localStorage.setItem("cn-module-checklist-protocole", JSON.stringify({ a: true, b: false, c: true }));
    expect(loadCampusDone()).toEqual(["bases"]);
    expect(loadModuleChecks("protocole")).toBe(2);
    window.localStorage.setItem("cn_visits_v1", "{pas du json");
    expect(loadVisits()).toEqual([]);
  });
  it("efface la progression mais garde thème et langue", () => {
    window.localStorage.setItem("theme", "dark");
    window.localStorage.setItem(CAMPUS_KEY, "[\"bases\"]");
    window.localStorage.setItem("cn-module-checklist-x", "{}");
    window.localStorage.setItem("clinical-navigator-design", "{}");
    expect(hasDesignDraft()).toBe(true);
    clearLocalProgress();
    expect(window.localStorage.getItem("theme")).toBe("dark");
    expect(window.localStorage.length).toBe(1);
  });
});
