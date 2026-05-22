import { expect, test } from "@playwright/test";

const appUrl = process.env.APP_URL ?? "http://127.0.0.1:5173";

test("lead workflow", async ({ page }) => {
  await page.goto(appUrl);
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  await page.goto(`${appUrl}/leads`);
  await expect(page.getByText("Aina Rahman")).toBeVisible();
  await page.goto(`${appUrl}/leads/lead-dev-1`);
  await expect(page.getByText("Activity Timeline")).toBeVisible();
  await expect(page.getByText("Tasks")).toBeVisible();
});
