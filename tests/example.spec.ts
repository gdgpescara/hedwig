import { test, expect } from "@playwright/test";

test("contains hedwig in the document", async ({ page }) => {
  await page.goto("/");

  const title = page.getByRole("heading");

  await expect(title).toHaveText(/Hedwig/i);
});
