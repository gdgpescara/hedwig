import { test, expect } from "@playwright/test";

test("has title in the document", async ({ page }) => {
  await page.goto("/");

  const title = page.getByRole("heading");

  await expect(title).toHaveText("Hedwig");
});
