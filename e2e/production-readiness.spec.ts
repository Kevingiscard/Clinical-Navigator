import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("cn_disclaimer_v1"));
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

test("une route inconnue affiche la page NotFound", async ({ page }) => {
  const response = await page.goto("/fr/route-inconnue");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page.getByText("Page Not Found")).toBeVisible();
});

import AxeBuilder from "@axe-core/playwright";

test("home respecte le contrôle accessibilité axe de base", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(item => item.impact === "critical")).toEqual([]);
});
