import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3005",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npx next start -p 3005",
    port: 3005,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
