import { test, expect } from "@playwright/test";
import { DEFAULT_MARKETPLACE, MARKETPLACES } from "../../utils/Constants.js";
import { HomePage } from "../../pages/HomePage.js";

test.setTimeout(60000);

test.describe("Marketplace Selection Tests", () => {
  test.beforeEach("Navigate to the Tool", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await page.waitForTimeout(2000);
  });
  MARKETPLACES.forEach((marketplace) => {
    test(`Should be able to select ${marketplace.name} (${marketplace.channel})`, async ({
      page,
    }) => {
      const marketplacedropdown = page.getByTestId("marketplace-select");
      try {
        await marketplacedropdown.click();
      } catch (e) {
        await page.screenshot({ path: "marketplace-dropdown-error.png" });
        await page.pause();
        console.log(e);
      }

      const marketplaceOption = page
        .getByTestId(`${marketplace.name}-marketplace`)
        .last();
      await marketplaceOption.click();

      const selectedMarketplace = page
        .getByTestId(`${marketplace.name}-marketplace`)
        .last();
      const selectedChannel = page
        .getByTestId(`${marketplace.channel}-channel`)
        .first();

      await expect(selectedMarketplace).toBeVisible();
      await expect(selectedMarketplace).toHaveText(marketplace.name);

      await expect(selectedChannel).toBeVisible();
      await expect(selectedChannel).toHaveText(`(${marketplace.channel})`);

      const flag = page.getByTestId(`${marketplace.name}-flag`).first();
      await expect(flag).toBeVisible();
    });
  });
});
