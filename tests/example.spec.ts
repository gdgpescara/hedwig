import { test, expect } from "@playwright/test";

test("has heading in the document", async ({ page }) => {
  await page.goto("/");

  const title = page.getByRole("heading");

  await expect(title).toHaveText("Hedwxig");
});

test("contains hedwig in the document", async ({ page }) => {
  await page.goto("/");

  const title = page.getByRole("heading");

  await expect(title).toHaveText(/Hedwig/i);
});
