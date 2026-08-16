import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { localStorage.removeItem("cn_disclaimer_v1"); localStorage.removeItem("theme"); });
});

test("home affiche le disclaimer médical au premier accès", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Clinical Navigator est un outil d'aide à la réflexion.")).toBeVisible();
  await expect(page.getByRole("button", { name: "J'ai compris" })).toBeVisible();
});

test("le parcours problème charge son interface", async ({ page }) => {
  await page.goto("/fr/probleme");
  await expect(page).toHaveURL(/fr\/probleme/);
  await expect(page.locator("main")).toBeVisible();
});

test("la formation expose la base bilingue et la couverture juridictionnelle", async ({ page }) => {
  await page.goto("/fr/formation");
  await expect(page.getByRole("heading", { name: /Apprendre par situation/ })).toBeVisible();
  await expect(page.getByText(/154 entrées/)).toBeVisible();
  await expect(page.getByText("Revue locale obligatoire")).toBeVisible();
});

test("l’assistant offline refuse une question hors périmètre", async ({ page }) => {
  await page.goto("/fr/formation");
  const input = page.getByPlaceholder("Ex. Quelle différence entre ITT et per-protocol ?");
  await expect(input).toBeVisible({ timeout: 10_000 });
  await input.fill("parlez-moi de la météo demain");
  await input.press("Enter");
  await expect(page.getByText(/confiance est insuffisante/)).toBeVisible({ timeout: 10_000 });
});

test("la page formation respecte le contrôle accessibilité axe", async ({ page }) => {
  await page.goto("/fr/formation");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(item => item.impact === "critical")).toEqual([]);
});

test("une route inconnue affiche la page NotFound", async ({ page }) => {
  const response = await page.goto("/fr/route-inconnue");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page.getByText("Page Not Found")).toBeVisible();
});

import AxeBuilder from "@axe-core/playwright";

test("le mode system respecte la préférence sombre et reste lisible", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/fr/formation");
  await expect.poll(() => page.locator("html").evaluate(element => element.classList.contains("dark"))).toBe(true);
  const colors = await page.locator("body").evaluate(element => { const style = getComputedStyle(element); return { background: style.backgroundColor, color: style.color }; });
  expect(colors.background).not.toBe("rgb(255, 255, 255)");
  expect(colors.color).not.toBe("rgb(0, 0, 0)");
});

test("la page formation ne déborde pas à 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/fr/formation");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("home respecte le contrôle accessibilité axe de base", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(item => item.impact === "critical")).toEqual([]);
});
