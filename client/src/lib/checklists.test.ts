import { describe, expect, it } from "vitest";
import { CHECKLISTS, checklistProgress, checklistToText, parseStored } from "./checklists";
describe("checklists", () => {
  it("ids uniques et listes non vides", () => {
    expect(new Set(CHECKLISTS.map(c => c.id)).size).toBe(CHECKLISTS.length);
    expect(CHECKLISTS.every(c => c.items.length >= 5)).toBe(true);
  });
  it("progression", () => {
    const c = CHECKLISTS[0];
    expect(checklistProgress(c, {})).toEqual({ done: 0, total: c.items.length, percent: 0 });
    expect(checklistProgress(c, { [`${c.id}:0`]: true, [`${c.id}:1`]: true }).done).toBe(2);
  });
  it("texte copié", () => {
    const c = CHECKLISTS[0];
    const t = checklistToText(c, { [`${c.id}:0`]: true });
    expect(t).toContain("[x] " + c.items[0]);
    expect(t).toContain("[ ] " + c.items[1]);
  });
  it("lecture du stockage tolérante", () => {
    expect(parseStored("nimporte quoi")).toEqual({});
    expect(parseStored("[1]")).toEqual({});
    expect(parseStored('{"a":true,"b":3}')).toEqual({ a: true });
    expect(parseStored(null)).toEqual({});
  });
});
