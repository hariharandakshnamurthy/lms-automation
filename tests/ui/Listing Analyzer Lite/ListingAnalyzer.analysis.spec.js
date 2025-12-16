import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage.js";
import { ERROR_MESSAGES } from "../../utils/Constants.js";

test.describe("Listing analyzer functional flow", () => {
  test.beforeEach("Navigate to the Tool", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await page.waitForTimeout(2000);
  });

  test("Error should be thrown for invalid ASIN", async ({ page }) => {
    const input = page.getByTestId("product-input");
    await input.fill("B0EXAPLE");
    const analyzeButton = page.getByRole("button", { name: "Analyze listing" });
    await analyzeButton.click();
    await expect(
      page.getByText(ERROR_MESSAGES.EMPTY_PRODUCT_LINK)
    ).toBeVisible();
  });
});
