import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage.js";
import {
  TITLES,
  DEFAULT_MARKETPLACE,
  STATUS,
  ERROR_MESSAGES,
} from "../../utils/Constants.js";

test.describe("ListingAnalyzer - Lite", () => {
  test.beforeEach("Navigate to the Tool", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
  });

  test("should have title", async ({ page }) => {
    await expect(page).toHaveTitle(TITLES.LISTING_ANALYZER_LITE);
  });

  test("should have idle status", async ({ page }) => {
    const status = page.getByTestId("status");
    try {
      await expect(status).toContainText(STATUS.IDLE);
    } catch (e) {
      console.error(e);
      await expect(status).toContainText(STATUS.FAILED);
    }
  });

  test("Check presence and visibility of logo", async ({ page }) => {
    const logo = page.getByTestId("KM-logo");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("alt", "Kwickmetrics");
    await expect(logo).toHaveAttribute("src", /km-logo-large\.svg$/);
  });

  test("Marketplace dropdown should be visible", async ({ page }) => {
    const label = page.getByLabel("Marketplace");
    await expect(label).toBeVisible();
    const marketplacedropdown = page.getByTestId("marketplace-select");
    await expect(marketplacedropdown).toBeVisible();
    const marketplaceOption = page.getByTestId(
      `${DEFAULT_MARKETPLACE.NAME}-marketplace`
    );
    await expect(marketplaceOption).toBeVisible();
    const flag = page.getByTestId(`${DEFAULT_MARKETPLACE.NAME}-flag`);
    await expect(flag).toBeVisible();
  });

  test("Product Input Field should be visible", async ({ page }) => {
    const label = page.getByLabel("Product link or ASIN");
    await expect(label).toBeVisible();

    const input = page.getByTestId("product-input");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute(
      "placeholder",
      "https://www.amazon.com/dp/B0EXAMPLE or B0EXAMPLE"
    );
  });

  test("Analyze Button should be visible", async ({ page }) => {
    const analyzeButton = page.getByRole("button", { name: "Analyze listing" });
    await expect(analyzeButton).toBeVisible();
    await expect(analyzeButton).toBeEnabled();
  });
  test("Validation message should be visible", async ({ page }) => {
    const analyzeButton = page.getByRole("button", { name: "Analyze listing" });
    await analyzeButton.click();
    await expect(
      page.getByText(ERROR_MESSAGES.EMPTY_PRODUCT_LINK)
    ).toBeVisible();

    const productInput = page.getByTestId("product-input");
    await expect(productInput).toHaveAttribute("aria-invalid", "true");
  });
});
