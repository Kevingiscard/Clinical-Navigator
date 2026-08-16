import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  reporter: [["list"], ["json", { outputFile: "client/public/diagnostics/e2e-results.json" }]],
  use: { baseURL: "http://127.0.0.1:3000", trace: "retain-on-failure", ...devices["Desktop Chrome"] },
  webServer: { command: "NODE_ENV=development pnpm dev", url: "http://127.0.0.1:3000", reuseExistingServer: true, timeout: 120_000 },
});
